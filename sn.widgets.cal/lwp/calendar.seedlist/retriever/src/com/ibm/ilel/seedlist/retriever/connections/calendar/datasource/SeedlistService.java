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
package com.ibm.ilel.seedlist.retriever.connections.calendar.datasource;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.ibm.ilel.seedlist.retriever.connections.calendar.CalendarState;
import com.ibm.ilel.seedlist.retriever.connections.calendar.data.CalendarDataSourceException;
import com.ibm.ilel.seedlist.retriever.connections.calendar.data.CalendarEntry;
import com.ibm.ilel.seedlist.retriever.connections.calendar.data.User;
import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.dao.model.SeedlistDAO;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBDeletionHistory;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventComment;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBRecurrence;
import com.ibm.lconn.calendar.db.model.DBSubstitution;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.util.MentionHelper;
import com.ibm.lconn.calendar.util.UserUtilities;
import com.ibm.ventura.internal.config.exception.VenturaConfigHelperException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper.ComponentEntry;

public class SeedlistService {
	private static final String CLASSNAME = SeedlistService.class.getName();
	private static Logger logger = Logger.getLogger(CLASSNAME);

	private CalendarService cs = null;
	private String componentUrl = null;

	public SeedlistService() throws CalendarDataSourceException {
		String method = "constructor";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		try {
			cs = CalendarServiceFactory.INSTANCE.create();

			// component url
			VenturaConfigurationHelper vcp = VenturaConfigurationHelper.Factory.getInstance();
			ComponentEntry componentConfig = vcp.getComponentConfig("communities");
			if (componentConfig.isSecureUrlEnabled() && vcp.getForceConfidentialCommunications()) {
				componentUrl = componentConfig.getSecureServiceUrl().toString();
			} else {
				componentUrl = componentConfig.getServiceUrl().toString();
			}

			if (logger.isLoggable(Level.FINER)) {
				logger.exiting(CLASSNAME, method);
			}
		} catch (VenturaConfigHelperException e) {
			if (logger.isLoggable(Level.FINER)) {
				logger.throwing(CLASSNAME, method, e);
			}

			throw new CalendarDataSourceException("Exception building events url using connections config xml.", e);
		} catch (Exception e) {
			if (logger.isLoggable(Level.FINER)) {
				logger.throwing(CLASSNAME, method, e);
			}

			throw new CalendarDataSourceException(e);
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public CalendarEntry[] getCalendarEntries(CalendarState state, int length) throws CalendarDataSourceException {
		String method = "getCalendarEntries";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		SeedlistDAO seedlistDao = cs.getSeedlistDao();
		List<CalendarEntry> ret = new ArrayList<CalendarEntry>();

		try {
			
			Date startTime = state.getLastModified();
			Date endTime = state.getFinishDate();
			int offset = state.getOffset();
			if(offset < 0) {
				offset = 0;
			}

			List items = new ArrayList();
			items.addAll(seedlistDao.getUpdatedEventsSince(startTime, endTime, length + offset));
			items.addAll(seedlistDao.getUpdatedRecurrenceEventsSince(startTime, endTime, length + offset));
			items.addAll(seedlistDao.getUpdatedExceptionInstancesSince(startTime, endTime, length + offset));
			items.addAll(seedlistDao.getDeletionHistorySince(startTime, endTime, length + offset));

			Collections.sort(items, new Comparator() {
				public int compare(Object obj1, Object obj2) {
					Date date1 = null, date2 = null;

					if (obj1 instanceof DBEvent) {
						date1 = ((DBEvent) obj1).getDbModifiedOn();
					} else if (obj1 instanceof DBRecurrence) {
						date1 = ((DBRecurrence) obj1).getModifiedOn();
					} else if (obj1 instanceof DBSubstitution) {
						date1 = ((DBSubstitution) obj1).getModifiedOn();
					} else if (obj1 instanceof DBDeletionHistory) {
						date1 = ((DBDeletionHistory) obj1).getDbmodtime();
					}
					if (obj2 instanceof DBEvent) {
						date2 = ((DBEvent) obj2).getDbModifiedOn();
					} else if (obj2 instanceof DBRecurrence) {
						date2 = ((DBRecurrence) obj2).getModifiedOn();
					} else if (obj2 instanceof DBSubstitution) {
						date2 = ((DBSubstitution) obj2).getModifiedOn();
					} else if (obj2 instanceof DBDeletionHistory) {
						date2 = ((DBDeletionHistory) obj2).getDbmodtime();
					}

					return date1.compareTo(date2);
				}
			});
			if(items.size() < offset) {
				items = new ArrayList();
			} else if(items.size() < offset + length) {
				items = items.subList(offset, items.size());
			} else {
				items = items.subList(offset, offset + length);
			}

			Date lastModified = null;
			for (int i = 0; i < items.size(); i++) {
				Object o = items.get(i);
				if (o instanceof DBEvent) {
					CalendarEntry ce = convert((DBEvent) o);
					if (null != ce) {
						ret.add(ce);
						lastModified = ((DBEvent) o).getDbModifiedOn();
					}
				} else if (o instanceof DBRecurrence) {
					ret.addAll(convert((DBRecurrence) o));
					lastModified = ((DBRecurrence)o).getModifiedOn();
				} else if (o instanceof DBSubstitution) {
					CalendarEntry ce = convert((DBSubstitution) o);
					if (null != ce) {
						ret.add(ce);
						lastModified = ((DBSubstitution)o).getModifiedOn();
					}
				} else if (o instanceof DBDeletionHistory) {
					ret.add(convert((DBDeletionHistory) o));
					lastModified = ((DBDeletionHistory)o).getDbmodtime();
				}
			}

			if (logger.isLoggable(Level.FINER)) {
				logger.exiting(CLASSNAME, method);
			}
			
			if(lastModified != null) {
				if (state.getLastModified().equals(lastModified)) {
					state.setOffset(offset + items.size());
				} else {
					state.setLastModified(lastModified);
					state.setOffset(1);
				}
			}

		} catch (Exception e) {
			if (logger.isLoggable(Level.FINER)) {
				logger.throwing(CLASSNAME, method, e);
			}

			/*
			 * commenting throw CalendarDataSourceException below, because throwing any exception will break 
			 * building search index process, see OCS defect 223216
			 */
			// throw new CalendarDataSourceException(e.getMessage());
		}
		return ret.toArray(new CalendarEntry[0]);
	}

	public CalendarEntry getCalendarEntry(String id) throws CalendarDataSourceException {
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence(id);
		if (recurrence != null) {
			return convert(recurrence).get(0);
		}

		DBEvent event = cs.getEventDAO().getEvent(id);
		if (event != null && !event.getIsRecurrence()) {
			return convert(event);
		}

		DBSubstitution substitution = cs.getSubstitutionDao().getSubstitution(id);
		if (substitution != null && substitution.getEventInfo_UUID() == null && !substitution.getIsCancelled()) {
			return convert(substitution);
		}
		
		DBEventInstance instance = cs.getEventInstanceDao().getEventInstance(id);
		if (instance != null) {
			return convert(instance);
		}

		return null;
	}

	public CalendarEntry[] getCalendarEntriesWithAclUpdated(CalendarState state, int length) throws CalendarDataSourceException {
		String method = "getCalendarEntriesWithAclUpdated";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		try {
			List<CalendarEntry> ret = new ArrayList<CalendarEntry>();
			
			Date startTime = state.getLastModified();
			int offset = state.getAclStart();
			int totalOffset = state.getAclStart();
			
			DBCalendar cal = null;
			List<DBCalendar> cals = cs.getSeedlistDao().getACLUpdatedCalendarsSince(startTime, state.getFinishDate(), state.getStartDate(), offset, 300);
			while(cals.size() > 0) {
				int i = 0;
				for(; i < cals.size(); i++) {
					cal = cals.get(i);
					
					int evtOffset = 0;
					List<DBEvent> events = cs.getEventDAO().getEventsByCalendar(cal.getCalendar_UUID(), null, null, null, evtOffset, 300);
					while(events.size() > 0) {
						for(DBEvent event : events) {
							if(event.getCreatedOn().after(state.getStartDate())) {
								continue;
							}
							
							if(!event.getIsRecurrence()) {
								if(event.getModifiedOn().before(state.getStartDate())) {
									ret.add(convert(event));
								}
							} else {
								DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence(event.getEvent_UUID());
								if(recurrence.getModifiedOn().before(state.getStartDate())) {
									ret.addAll(convert(recurrence));
								}
								
								List<DBSubstitution> substitutions = cs.getSubstitutionDao().getSubstitutions(cal.getCalendar_UUID(), event.getEvent_UUID());
								for(DBSubstitution substitution : substitutions) {
									if(substitution.getEventInfo_UUID() != null && substitution.getModifiedOn().before(state.getStartDate())) {
										ret.add(convert(substitution));
									}
								}
							}
						}
						
						if(events.size() < 300) {
							break;
						}
						evtOffset += 300;
						
						events = cs.getEventDAO().getEventsByCalendar(cal.getCalendar_UUID(), null, null, null, evtOffset, 300);
					}
					
					if (ret.size() >= length) {
						i++;
						break;
					}
				}
				
				if(!startTime.equals(cal.getAclModtime())) {
					startTime = cal.getAclModtime();
					offset = 1;
				} else {
					offset = offset + i;
				}
				
				totalOffset = totalOffset + i;
				
				if (ret.size() >= length || cals.size() < 300) {
					break;
				}
				cals = cs.getSeedlistDao().getACLUpdatedCalendarsSince(startTime, state.getFinishDate(), state.getStartDate(), offset, 300);
			}
			
			if(cal != null) {
				if (state.getLastModified().equals(cal.getAclModtime())) {
					state.setAclStart(totalOffset);
				} else {
					state.setLastModified(cal.getAclModtime());
					state.setAclStart(1);
				}
			}

			if (logger.isLoggable(Level.FINER)) {
				logger.exiting(CLASSNAME, method);
			}

			return ret.toArray(new CalendarEntry[0]);

		} catch (Exception e) {
			if (logger.isLoggable(Level.FINER)) {
				logger.throwing(CLASSNAME, method, e);
			}

			throw new CalendarDataSourceException(e);
		}
	}
	
	
	public CalendarEntry[] getCalendarEntriesWithCommentUpdated(CalendarState state, int length) throws CalendarDataSourceException {
		String method = "getCalendarEntriesWithCommentUpdated";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		List<CalendarEntry> ret = new ArrayList<CalendarEntry>();
		
		try {
			Date startTime = state.getLastModified();
			int offset = state.getCommentStart();
			int totalOffset = state.getCommentStart();
			
			DBEvent event = null;
			List<DBEventInstance> eventInstances = cs.getSeedlistDao().getCommentUpdatedEventInstancesSince(startTime, state.getFinishDate(), state.getStartDate(), offset, 300);
			DBEventInstance eventInstance = null;
			int i = 0;
			for(; i < eventInstances.size(); i++) {
				eventInstance = eventInstances.get(i);
				
				if(eventInstance.getEvent().getCreatedOn().after(state.getStartDate())) {
					continue;
				}
				CalendarEntry evt_inst = convert(eventInstance);
				if (null != evt_inst) {
					ret.add(evt_inst);
				}
				if (ret.size() >= length) {
					break;
				}
			}
			
			totalOffset = totalOffset + i;
			
			if(eventInstance != null) {
				if (state.getLastModified().equals(eventInstance.getDbModifiedOn())) {
					state.setCommentStart(totalOffset);
				} else {
					state.setLastModified(eventInstance.getDbModifiedOn());
					state.setCommentStart(1);
				}
			}

			if (logger.isLoggable(Level.FINER)) {
				logger.exiting(CLASSNAME, method);
			}
		} catch (Exception e) {
			if (logger.isLoggable(Level.FINER)) {
				logger.throwing(CLASSNAME, method, e);
			}

			/*
			 * commenting throw CalendarDataSourceException below, because throwing any exception will break 
			 * building search index process, see OCS defect 223216
			 */
			//throw new CalendarDataSourceException(e);
		}
		return ret.toArray(new CalendarEntry[0]);
	}
	
	public int getNumberOfCalendarEntries(Date lastModifiedDate, Date finishedDate) throws CalendarDataSourceException {
		String method = "getNumberOfCalendarEntries";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		try {
			int num = 0;
			
			SeedlistDAO seedlistDao = cs.getSeedlistDao();
			num += seedlistDao.getUpdatedEventsSinceCount(lastModifiedDate, finishedDate);
			num += seedlistDao.getUpdatedRecurrenceEventsSinceCount(lastModifiedDate, finishedDate);
			num += seedlistDao.getUpdatedExceptionInstancesSinceCount(lastModifiedDate, finishedDate);
			num += seedlistDao.getDeletionHistorySinceCount(lastModifiedDate, finishedDate);
			num += seedlistDao.getACLUpdatedCalendarsSinceCount(lastModifiedDate, finishedDate, null);
			num += seedlistDao.getCommentUpdatedEventInstancesSinceCount(lastModifiedDate, finishedDate, null);

			if (logger.isLoggable(Level.FINER)) {
				logger.exiting(CLASSNAME, method);
			}

			return num;
		} catch (Exception e) {
			if (logger.isLoggable(Level.FINER)) {
				logger.throwing(CLASSNAME, method, e);
			}

			throw new CalendarDataSourceException(e);
		}
	}
	
	protected void populateCommentsInfo(CalendarEntry entry, DBEventInstance inst) {
		List<DBEventComment> comments = inst.getComments();
		for(DBEventComment comment : comments) {
			DBUser author = UserUtilities.findUserById(comment.getCreatedBy());
			User user = new User(author.getUserExtID(), author.getUserEmail(), author.getUserName());
			entry.addComment(comment.getComment_UUID(), "", comment.getRenderedContent(DBEventComment.CONTENT_TYPE_PLAIN_TEXT), comment.getCreateOn(), user);
		}
	}

	protected CalendarEntry convert(DBEvent event) {
		if (event.getIsRecurrence()) {
			// should not happen
			/*
			 * should not throw exception here otherwise building search index will be broken
			 * comment throw statement, replace as log the error
			 */
			//throw new RuntimeException();
			if (logger.isLoggable(Level.FINER)) {
				logger.log(Level.FINER, "Invalid event with uuid: " + event.getEvent_UUID());
			}
			return null;
		}

		CalendarEntry ret = new CalendarEntry();
		String method = "convertEvent";
		
		try {
			DBCalendar calendar = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
			DBEventInfo info = event.getEventInfo();
			
			List<DBEventInstance> instances = event.getEventInstances();
			DBEventInstance instance = null;
			if(instances != null && instances.size() > 0) {
				instance = instances.get(0);
			}
			
			if(calendar == null || instance == null || info == null) {
				ret.setId(event.getEvent_UUID());
				ret.setDeleted(true);
				ret.setLastModifiedDate(event.getModifiedOn());
				return ret;
			}
			
			if (instance.getEventInfo() != null) {
				info.update(instance.getEventInfo());
			}

			ret.setId(event.getEvent_UUID());
			ret.setTitle(info.getName());
			ret.setPublishDate(event.getCreatedOn());
			ret.setLastModifiedDate(event.getModifiedOn());
			
			ret.setTags(event.getTagNames().toArray(new String[0]));

			ret.setUrl(getEventHtmlUrl(calendar, event));

			ret.setContent(info.getDescription(MentionHelper.PLAIN_TEXT_MENTION_FORMATTER));

			DBUser author = UserUtilities.findUserById(event.getModifiedBy());
			ret.setAuthor(author.getUserExtID(), author.getUserName(), author.getUserEmail());

			ret.setLocation(info.getLocation());
			ret.setAllDay(info.getIsAllDay());
			ret.setPublic(calendar.getVisibility() == DBCalendar.PUBLIC);

			ret.setParentCommunityUID(calendar.getCommunity_UUID());

			ret.addInstance(instance.getStartDate(), instance.getEndDate());
			ret.setOrgId(calendar.getExternalOrgId());
			
			// comments
			populateCommentsInfo(ret, instance);
			
			return ret;
		} catch (Exception e) {
			/*
			 * logging calendar uuid, event uuid and event info in case any exception occured  
			 * see OCS defect 223216
			 */
			if (logger.isLoggable(Level.FINER)) {
				logger.log(Level.FINER, "Exception thrown as retrieving event data:");
				logger.log(Level.FINER, "event calendar uuid: " + event.getCalendar_UUID());
				logger.log(Level.FINER, "event uuid: " + event.getEvent_UUID());
				logger.log(Level.FINER, "event info: " + event.getEventInfo());
				logger.throwing(CLASSNAME, method, e);
			}
			
			return null;
		}
	}

	protected List<CalendarEntry> convert(DBRecurrence recurrence) {
		List<CalendarEntry> ret = new ArrayList<CalendarEntry>();

		CalendarEntry ce = new CalendarEntry();
		String method = "convertRecurrenceEvent";
		
		try {
			ret.add(ce);
			DBCalendar calendar = cs.getCalendarDAO().getCalendar(recurrence.getCalendar_UUID());
			DBEvent event = cs.getEventDAO().getEvent(recurrence.getEvent_UUID());
			DBEventInfo info = event.getEventInfo();
			
			List<DBEventInstance> instances = event.getEventInstances();
			
			if(calendar == null || event == null || info == null || instances == null || instances.size() == 0) {
				ce.setId(recurrence.getEvent_UUID());
				ce.setDeleted(true);
				ce.setLastModifiedDate(recurrence.getModifiedOn());
				return ret;
			}

			ce.setId(event.getEvent_UUID());
			ce.setTitle(info.getName());
			ce.setPublishDate(event.getCreatedOn());
			ce.setLastModifiedDate(recurrence.getModifiedOn());
			
			ce.setTags(event.getTagNames().toArray(new String[0]));

			ce.setUrl(getEventHtmlUrl(calendar, event));

			ce.setContent(info.getDescription(MentionHelper.PLAIN_TEXT_MENTION_FORMATTER));

			DBUser author = UserUtilities.findUserById(event.getModifiedBy());
			ce.setAuthor(author.getUserExtID(), author.getUserName(), author.getUserEmail());

			ce.setLocation(info.getLocation());
			ce.setAllDay(info.getIsAllDay());
			ce.setRepeating(true);
			ce.setPublic(calendar.getVisibility() == DBCalendar.PUBLIC);

			ce.setParentCommunityUID(calendar.getCommunity_UUID());
			ce.setOrgId(calendar.getExternalOrgId());

			for (Iterator<DBEventInstance> iter = instances.iterator(); iter.hasNext();) {
				DBEventInstance inst = iter.next();
				if (inst.getEventInfo_UUID() == null) {
					List<DBEventComment> comments = inst.getComments();
					if(comments == null || comments.size() == 0) {
						ce.addInstance(inst.getStartDate(), inst.getEndDate());
					} else {
						CalendarEntry evt_inst = convert(inst);
						if (null != evt_inst) {
							ret.add(evt_inst);
						}
					}
				}
			}
		} catch (Exception e) {
			/*
			 * logging calendar uuid, event uuid and event info in case any exception occured  
			 * see OCS defect 223216
			 */
			if (logger.isLoggable(Level.FINER)) {
				logger.log(Level.FINER, "Exception thrown as retrieving recurrence event data:");
				logger.log(Level.FINER, "event calendar uuid: " + recurrence.getCalendar_UUID());
				logger.log(Level.FINER, "event uuid: " + recurrence.getEvent_UUID());
				logger.throwing(CLASSNAME, method, e);
			}
			ret.clear();
		}

		return ret;
	}
	
	protected CalendarEntry convert(DBEventInstance instance) {
		CalendarEntry ret = new CalendarEntry();
		String method = "convertEventInstance";
		
		try {
			DBCalendar calendar = cs.getCalendarDAO().getCalendar(instance.getCalendar_UUID());
			DBEvent event = cs.getEventDAO().getEvent(instance.getEvent_UUID());
			DBEventInfo info = event.getEventInfo();
			
			if(calendar == null || event == null || info == null) {
				ret.setId(event.getEvent_UUID());
				ret.setDeleted(true);
				ret.setLastModifiedDate(instance.getModifiedOn());
				return ret;
			}
			
			info.update(instance.getEventInfo());

			ret.setId(instance.getEventInst_UUID());
			ret.setOrgId(calendar.getExternalOrgId());
			ret.setTitle(info.getName());
			ret.setPublishDate(event.getCreatedOn());
			
			Date modifiedOn = instance.getModifiedOn();
			List<DBEventComment> comments = instance.getComments();
			if(comments == null || comments.size() == 0) { // OCS 176315, NullPointerException if user add a comment and delete comment
				if(modifiedOn != null) { // use event instance modifiedOn field
					ret.setLastModifiedDate(modifiedOn);
				} else { // best guess, the last modified time is on event creation
					ret.setLastModifiedDate(event.getCreatedOn());
				}
			} else {
				Date lastCommentDate = instance.getComments().get(instance.getCommentsCount() - 1).getCreateOn();
				if(modifiedOn != null && modifiedOn.after(lastCommentDate)) {
					ret.setLastModifiedDate(modifiedOn);
				} else {
					ret.setLastModifiedDate(lastCommentDate);
				}
			}
			
			ret.setTags(event.getTagNames().toArray(new String[0]));

			ret.setUrl(getInstanceHtmlUrl(calendar, instance));

			ret.setContent(info.getDescription(MentionHelper.PLAIN_TEXT_MENTION_FORMATTER));

			DBUser author = null;
			if(instance.getModifiedBy() != null)
				author = UserUtilities.findUserById(instance.getModifiedBy());
			else 
				author = UserUtilities.findUserById(event.getModifiedBy());
			ret.setAuthor(author.getUserExtID(), author.getUserName(), author.getUserEmail());

			ret.setLocation(info.getLocation());
			ret.setAllDay(info.getIsAllDay());
			ret.setRepeating(true);
			ret.setPublic(calendar.getVisibility() == DBCalendar.PUBLIC);

			ret.setParentCommunityUID(calendar.getCommunity_UUID());
			ret.setParentEventID(instance.getEvent_UUID());
			ret.setParentEventURL(getEventHtmlUrl(calendar, event));

			Date startDate = instance.getStartDate(), endDate = instance.getEndDate();
			ret.addInstance(startDate, endDate);
			
			// comments
			populateCommentsInfo(ret, instance);

			return ret;
		} catch (Exception e) {
			/*
			 * logging calendar uuid, event uuid and event info in case any exception occured  
			 * see OCS defect 223216
			 */
			if (logger.isLoggable(Level.FINER)) {
				logger.log(Level.FINER, "Exception thrown as retrieving event instance data:");
				logger.log(Level.FINER, "event calendar uuid: " + instance.getCalendar_UUID());
				logger.log(Level.FINER, "event uuid: " + instance.getEvent_UUID());
				logger.throwing(CLASSNAME, method, e);
			}
			
			return null;
		}

	}

	protected CalendarEntry convert(DBSubstitution substitution) {
		if (substitution.getEventInfo_UUID() == null) {
			// should not happen
			/*
			 * should not throw exception here otherwise building search index will be broken
			 * comment throw statement, replace as log the error
			 */
			//throw new RuntimeException();
			if (logger.isLoggable(Level.FINER)) {
				logger.log(Level.FINER, "Invalid Substitution");
			}
			return null;
		}
	
		String method = "convertSubstitution";
		
		try {

			CalendarEntry ret = new CalendarEntry();

			DBCalendar calendar = cs.getCalendarDAO().getCalendar(substitution.getCalendar_UUID());
			DBEvent event = cs.getEventDAO().getEvent(substitution.getEvent_UUID());
			DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence(substitution.getEvent_UUID());
			DBEventInstance instance = cs.getEventInstanceDao().getEventInstance(substitution.getSubstitution_UUID());
			DBEventInfo info = event.getEventInfo();
			
			if(calendar == null || event == null || recurrence == null || instance == null || info == null) {
				ret.setId(substitution.getSubstitution_UUID());
				ret.setDeleted(true);
				ret.setLastModifiedDate(substitution.getModifiedOn());
				return ret;
			}
			
			info.update(substitution.getEventInfo());

			ret.setOrgId(calendar.getExternalOrgId());
			ret.setId(substitution.getSubstitution_UUID());
			ret.setTitle(info.getName());
			ret.setPublishDate(event.getCreatedOn());
			
			Date modifiedOn = substitution.getModifiedOn();
			ret.setLastModifiedDate(modifiedOn);
			
			ret.setTags(event.getTagNames().toArray(new String[0]));

			ret.setUrl(getInstanceHtmlUrl(calendar, substitution));

			ret.setContent(info.getDescription(MentionHelper.PLAIN_TEXT_MENTION_FORMATTER));

			DBUser author = null;
			if(instance.getModifiedBy() != null)
				author = UserUtilities.findUserById(instance.getModifiedBy());
			else 
				author = UserUtilities.findUserById(event.getModifiedBy());
			ret.setAuthor(author.getUserExtID(), author.getUserName(), author.getUserEmail());

			ret.setLocation(info.getLocation());
			ret.setAllDay(info.getIsAllDay());
			ret.setRepeating(true);
			ret.setPublic(calendar.getVisibility() == DBCalendar.PUBLIC);

			ret.setParentCommunityUID(calendar.getCommunity_UUID());
			ret.setParentEventID(substitution.getEvent_UUID());
			ret.setParentEventURL(getEventHtmlUrl(calendar, event));

			Date startDate = substitution.getNewStartDate(), endDate = substitution.getNewEndDate();
			if (startDate == null)
				startDate = substitution.getStartDate();
			if (endDate == null)
				endDate = new Date(startDate.getTime() + recurrence.getDuration());
			ret.addInstance(startDate, endDate);
			
			// comments
			populateCommentsInfo(ret, instance);

			return ret;
		} catch (Exception e) {
			/*
			 * logging calendar uuid, event uuid and event info in case any exception occured  
			 * see OCS defect 223216
			 */
			if (logger.isLoggable(Level.FINER)) {
				logger.log(Level.FINER, "Exception thrown as retrieving substitution event data:");
				logger.log(Level.FINER, "event calendar uuid: " + substitution.getCalendar_UUID());
				logger.log(Level.FINER, "event uuid: " + substitution.getEvent_UUID());
				logger.throwing(CLASSNAME, method, e);
			}
			
			return null;
		}
	}

	protected CalendarEntry convert(DBDeletionHistory deletion) {
		CalendarEntry ret = new CalendarEntry();
		ret.setId(deletion.getObjectId());
		ret.setDeleted(true);
		ret.setLastModifiedDate(deletion.getDbmodtime());
		return ret;
	}
	
	private String getCalendarHtmlUrl(DBCalendar calendar) {
		String commHtmlUrl = componentUrl + "/service/html/communityview?communityUuid=" + calendar.getCommunity_UUID();
		return commHtmlUrl + "#fullpageWidgetId=" + calendar.getWidgetId();
	}
	
	private String getEventHtmlUrl(DBCalendar calendar, DBEvent event) {
		return getCalendarHtmlUrl(calendar) + "&eventUuid=" + event.getEvent_UUID();
	}
	
	private String getInstanceHtmlUrl(DBCalendar calendar, DBSubstitution instance) {
		return getCalendarHtmlUrl(calendar) + "&eventInstUuid=" + instance.getSubstitution_UUID();
	}
	
	private String getInstanceHtmlUrl(DBCalendar calendar, DBEventInstance instance) {
		return getCalendarHtmlUrl(calendar) + "&eventInstUuid=" + instance.getEventInst_UUID();
	}
}
