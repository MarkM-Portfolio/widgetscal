/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.calendar.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.ibm.connections.directory.services.DSProvider;
import com.ibm.connections.directory.services.DSProviderFactory;
import com.ibm.connections.directory.services.data.DSGroupEntityCollection;
import com.ibm.connections.directory.services.data.DSObject;
import com.ibm.connections.directory.services.exception.DSException;
import com.ibm.lconn.calendar.audit.CalendarEvents;
import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.dao.model.CalendarDAO;
import com.ibm.lconn.calendar.db.dao.model.MiscDataDAO;
import com.ibm.lconn.calendar.db.dao.model.UserInfoDAO;
import com.ibm.lconn.calendar.db.exception.DatabaseException;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBMembership;
import com.ibm.lconn.calendar.db.model.DBMiscData;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.core.gatekeeper.LCGatekeeper;
import com.ibm.lconn.core.gatekeeper.LCGatekeeperException;
import com.ibm.lconn.core.gatekeeper.LCSupportedFeature;

/**
 * Synchronize role between container and calendar
 * 
 * In the current implement, we assume that 1. each blog will only be associated
 * to one container 
 * 
 * @author Zhang Qiwei
 * 
 */

public class MemberPermissionSynchronizer {
	private static final String CLASS_NAME = MemberPermissionSynchronizer.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	protected static ExpiringLRUCacheImpl<String, Boolean> cache = null;
	
	private CalendarEvents audit = new CalendarEvents();
	
	static {
		try {
			cache = new ExpiringLRUCacheImpl<String, Boolean>(RuntimeConfiguration.getIntValue("membership.synchronization.cache"), RuntimeConfiguration.getLongValue("membership.synchronization.timeout"));
		} catch (Exception ex) {
			cache = new ExpiringLRUCacheImpl<String, Boolean>(1000, 600);
		}
	}
	
	public void execute(DBUser user, boolean forceUpdate, final String commUuid) {
		LOGGER.entering(CLASS_NAME, "execute", new Object[]{user, forceUpdate});
		
		LOGGER.finer("synchronize membership for user: [UUID=" + user.getUserUUID() + ",EXTID=" + user.getUserExtID() + "]");
		
		ExecutionContext.runAs(ExecutionContext.IGNORE_TENANTKEY);
		
		try {
			if(user.getUserUUID() == null)
				return;
			
			boolean doUpdate = true;
			if(!forceUpdate && (cache.get(user.getUserUUID()) != null)) {
				LOGGER.finer("user hit in cache, skip membership synchronization for this user [UUID=" + user.getUserUUID() + "]");
				doUpdate = false;
			}
			
			if(doUpdate) {
				synchronized(cache) {
					if(!forceUpdate && (cache.get(user.getUserUUID()) != null)) {
						LOGGER.finer("user hit in cache, skip membership synchronization for this user [UUID=" + user.getUserUUID() + "]");
						doUpdate = false;
					}
					else {
						cache.put(user.getUserUUID(), Boolean.TRUE);
					}
				}
			}
			
			CalendarService cs = CalendarServiceFactory.INSTANCE.create();
			CalendarDAO calendarDao = cs.getCalendarDAO();
			UserInfoDAO userInfoDao = cs.getUserInfoDao();
			MiscDataDAO miscDataDao = cs.getMiscDataDao();
			
			if (doUpdate) {
				LOGGER.finer("synchronize membership for user [UUID=" + user.getUserUUID() + "]: try to obtain the lock, avoid concurrent update per user...");
				
				int attempt = 0;
				while(attempt < 2) {
					attempt++;
					
					DBMiscData misc = new DBMiscData();
					misc.setName("USER.SYNC: " + user.getUserUUID());
					misc.setValue(UUID.randomUUID().toString());
					misc.setModifiedOn(new Date());
					try {
						miscDataDao.insertData(misc);
					} catch(Throwable ex) {
						if(LOGGER.isLoggable(Level.FINER)) {
							LOGGER.log(Level.FINER, "Fail to obtain the membership sync lock.", ex);
						}
						misc = miscDataDao.getData("USER.SYNC: " + user.getUserUUID());
						long l = System.currentTimeMillis() - misc.getModifiedOn().getTime();
						if(misc != null && (l > 10 * 60 * 1000L || l < -10 * 60 * 1000L)) {
							if(LOGGER.isLoggable(Level.FINER)) {
								LOGGER.log(Level.FINER, "Too long a time since last membership sync. Clear the existing lock and try again...");
							}
							miscDataDao.deleteData(misc.getName(), misc.getValue());
							cs.flush();
							continue;
						} 
						doUpdate = false;
					}
					
					break;
				}
			}
			
			if (!doUpdate && forceUpdate) {
				// do trick, wait a second, make sure the "membership sync" in other thread has been finished
				LOGGER.finer("There is a concurrent membership sync for user [UUID=" + user.getUserUUID() + "] under way. This is a force update request. Do tricky, wait a second to ensure that the membership sync in other thread has been finished");
				Thread.sleep(RuntimeConfiguration.getIntValue("membership.synchronization.concurrent.waiting"));
			}
			
			if (doUpdate) {
				LOGGER.finer("synchronize membership for user [UUID=" + user.getUserUUID() + "]: start...");
				
				try {
					// get user's community membership list
					List<String> membersOf = new ArrayList<String>(), ownerOf = new ArrayList<String>();
					
					try {
						DSProvider provider = DSProviderFactory.INSTANCE.getProfileProvider();
						if(null != provider) {
							LOGGER.finer("synchronize membership for user [UUID=" + user.getUserUUID() + "]: query user membership through WCI interface...");
							
							boolean hasVisitorModelEnabled = LCGatekeeper.isEnabledGlobally(LCSupportedFeature.CONNECTIONS_VISITOR_MODEL);
					    	if(hasVisitorModelEnabled){
					    		ownerOf = provider.findCommunitiesByOwner(user.getUserExtID(), user.getORG_ID());
					    		membersOf = provider.findCommunitiesByMember(user.getUserExtID(), user.getORG_ID());
					    	}else{
					    		DSGroupEntityCollection dsGroupEntityCollection = provider.searchGroupEntitiesByMemberId(user.getUserExtID(), DSObject.Role.ALL, DSObject.ObjectType.COMMUNITY);
								DSObject[] t = null;
								
								t = dsGroupEntityCollection.getGroupEntitiesByRole(DSObject.Role.OWNER) ;
								if (t != null) {
									for (DSObject comm : t) {
										ownerOf.add(comm.get_id());
									}
								}
								t = dsGroupEntityCollection.getGroupEntitiesByRole(DSObject.Role.MEMBER) ;
								if (t != null) {
									for (DSObject comm : t) {
										membersOf.add(comm.get_id());
									}
								}
					    	}
							
							LOGGER.finer("synchronize membership for user [UUID=" + user.getUserUUID() + "]: user is member of " + membersOf.size() + " communities");
							LOGGER.finer("synchronize membership for user [UUID=" + user.getUserUUID() + "]: user is owner of " + ownerOf.size() + " communities");
						}
					} catch (DSException ex) {
						if(LOGGER.isLoggable(Level.FINER)) {
							LOGGER.log(Level.FINER, "unexpected exception during WCI invocation...", ex);
							ex.printStackTrace();
						}
					}
					
					// get user's current membership list
					LOGGER.finer("synchronize membership for user [UUID=" + user.getUserUUID() + "]: query user membership in local db...");
					List<DBMembership> currentMemberships = userInfoDao.getUserMemberships(user.getUserUUID());
					
					// compare
					List<DBMembership> toAdd = new ArrayList<DBMembership>(), toUpdate = new ArrayList<DBMembership>(), toDel = new ArrayList<DBMembership>();
					DBMembership toAddTargetCommunity = null, toUpdateTargetCommunity = null;
					
					for(String comm: membersOf) {
						boolean b = false;
						for(Iterator<DBMembership> iter = currentMemberships.iterator(); iter.hasNext(); ) {
							DBMembership membership = iter.next();
							if(membership.getCalendar_UUID().equals(comm)) {
								b = true;
								if(membership.getRole() != DBMembership.MEMBER) {
									LOGGER.finer("synchronize membership for user [UUID=" + user.getUserUUID() + "]: membership needs update, community uuid=" + comm);
									membership.setRole(DBMembership.MEMBER);
									if(commUuid != null && commUuid.equals(comm)) {
										toUpdateTargetCommunity = membership;
									} else {
										toUpdate.add(membership);
									}
								}
								iter.remove();
								break;
							}
						}
						if(!b) {
							LOGGER.finer("synchronize membership for user [UUID=" + user.getUserUUID() + "]: membership needs update, new membership, community uuid=" + comm);
							DBCalendar cal = calendarDao.getCalendar(comm);
							if(cal != null) {
								if(commUuid != null && commUuid.equals(comm)) {
									toAddTargetCommunity = new DBMembership(user.getUserUUID(), comm, DBMembership.MEMBER);
									toAddTargetCommunity.setORG_ID(cal.getORG_ID());
								} else {
									DBMembership t = new DBMembership(user.getUserUUID(), comm, DBMembership.MEMBER);
									t.setORG_ID(cal.getORG_ID());
									toAdd.add(t);
								}
							}
						}
					}
					for(String comm: ownerOf) {
						boolean b = false;
						for(Iterator<DBMembership> iter = currentMemberships.iterator(); iter.hasNext(); ) {
							DBMembership membership = iter.next();
							if(membership.getCalendar_UUID().equals(comm)) {
								b = true;
								if(membership.getRole() != DBMembership.OWNER) {
									LOGGER.finer("synchronize membership for user [UUID=" + user.getUserUUID() + "]: membership needs update, community uuid=" + comm);
									membership.setRole(DBMembership.OWNER);
									if(commUuid != null && commUuid.equals(comm)) {
										toUpdateTargetCommunity = membership;
									} else {
										toUpdate.add(membership);
									}
								}
								iter.remove();
								break;
							}
						}
						if(!b) {
							LOGGER.finer("synchronize membership for user [UUID=" + user.getUserUUID() + "]: membership needs update, new membership, community uuid=" + comm);
							DBCalendar cal = calendarDao.getCalendar(comm);
							if(cal != null) {
								if(commUuid != null && commUuid.equals(comm)) {
									toAddTargetCommunity = new DBMembership(user.getUserUUID(), comm, DBMembership.OWNER);
									toAddTargetCommunity.setORG_ID(cal.getORG_ID());
								} else {
									DBMembership t = new DBMembership(user.getUserUUID(), comm, DBMembership.OWNER);
									t.setORG_ID(cal.getORG_ID());
									toAdd.add(t);
								}
							}
						}
					}
					if(LOGGER.isLoggable(Level.FINER)) {
						for(DBMembership membership : currentMemberships) {
							LOGGER.finer("synchronize membership for user [UUID=" + user.getUserUUID() + "]: membership needs update, obsolete membership record, community uuid=" + membership.getCalendar_UUID());
						}
					}
					toDel.addAll(currentMemberships);
					
					// firstly, do update for the target community, in case there some concurrent thread is waiting for it
					if(toAddTargetCommunity != null) {
						try {
							userInfoDao.addUserMembership(toAddTargetCommunity);
						} catch (Exception ex) {
							if(!DatabaseException.isDuplicateKeyException(ex)) throw ex;
						}
					}
					if(toUpdateTargetCommunity != null) {
						userInfoDao.updateUserMembership(toUpdateTargetCommunity);
					}
					cs.flush();
					
					// sort before update, to avoid deadlock, conflict, etc
					Comparator<DBMembership> comparator = new Comparator<DBMembership>() {
						public int compare(DBMembership object1, DBMembership object2) {
							return object1.getCalendar_UUID().compareTo(object2.getCalendar_UUID());
						}
					};
					Collections.sort(toAdd, comparator);
					Collections.sort(toDel, comparator);
					Collections.sort(toUpdate, comparator);
					
					// do updates
					{
						int i = 0;
						for(; i < toAdd.size(); i++) {
							try {
								userInfoDao.addUserMembership(toAdd.get(i));
							} catch(Exception ex) {
								if(!DatabaseException.isDuplicateKeyException(ex)) {
									throw ex;
								}
							}
						}
						cs.flush();
					}
					
					{
						for(int i = 0; i < toDel.size(); i++) {
							userInfoDao.deleteUserMembership(toDel.get(i));
						}
						cs.flush();
					}
					
					{
						for(int i = 0; i < toUpdate.size(); i++) {
							userInfoDao.updateUserMembership(toUpdate.get(i));
						}
						cs.flush();
					}
					
					audit.membershipSynced(user);
					
					LOGGER.finer("synchronize membership for user [UUID=" + user.getUserUUID() + "]: updated '" + (toAdd.size() + toDel.size() + toUpdate.size()) + "'");
				} finally {
					miscDataDao.deleteData("USER.SYNC: " + user.getUserUUID(), null);
					cs.flush();
				}
			}
		} catch (Throwable ex) {
			// permission table is not updated successfully, force an update
			// next time to ensure consistency
			cache.remove(user.getUserUUID());
			if(LOGGER.isLoggable(Level.WARNING)) {
				LOGGER.log(Level.WARNING, ResourceBundleUtils.getMessageBundle().getString("warn.ui.security.member_permission.sync"), ex);
				if(LOGGER.isLoggable(Level.FINER)) {
					ex.printStackTrace();
				}
			}
		} finally {
			ExecutionContext.exit();
		}
			
		LOGGER.exiting(CLASS_NAME, "execute");
	}
}
