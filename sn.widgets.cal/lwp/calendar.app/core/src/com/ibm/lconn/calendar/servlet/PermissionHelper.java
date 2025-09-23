/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.servlet;

/**
 * @author damianoa, skomard
 */

import java.util.Enumeration;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ibm.connections.directory.services.DSProvider;
import com.ibm.connections.directory.services.DSProviderFactory;
import com.ibm.connections.directory.services.data.DSObject;
import com.ibm.connections.directory.services.exception.DSException;
import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.util.CalendarOperation;
import com.ibm.lconn.calendar.util.CalendarRole;
import com.ibm.lconn.calendar.util.HighwayConfig;
import com.ibm.lconn.calendar.util.MemberPermissionSynchronizer;
import com.ibm.lconn.calendar.util.RuntimeConfiguration;
import com.ibm.lconn.calendar.util.UserUtilities;
import com.ibm.lconn.calendar.util.Utilities;
import com.ibm.lconn.core.gatekeeper.LCGatekeeper;
import com.ibm.lconn.core.gatekeeper.LCGatekeeperException;
import com.ibm.lconn.core.gatekeeper.LCSupportedFeature;
import com.ibm.lconn.core.url.ThreadHttpRequest;
import com.ibm.lconn.core.web.mt.TenantLookupFilter;
import com.ibm.lconn.core.web.orgadmin.OrgAdminHelper;


public class PermissionHelper implements IPermissionHelper {
	
	private static final String CLASS_NAME = PermissionHelper.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	CalendarService cs;
	
	DSProviderFactory dsf;
	DSProvider ds;
	
	public PermissionHelper() throws DSProviderException {
		dsf = DSProviderFactory.INSTANCE;
		if ( dsf == null ) {
			LOGGER.log(Level.FINER,"DSProviderFactory.INSTANCE is null ");
			throw new DSProviderException();
		}
		
		ds = dsf.getProfileProvider();
		if ( ds == null ) {
			LOGGER.log(Level.FINER,"DSProviderFactory returned null for getProfileProvider");
			throw new DSProviderException();
		}
		
		cs = CalendarServiceFactory.INSTANCE.create();
	}
	
	/* (non-Javadoc)
	 * @see com.ibm.lconn.calendar.servlet.IPermissionHelper#getUserHighwayConfig(javax.servlet.http.HttpServletRequest)
	 */
	@Override
	public HighwayConfig getUserHighwayConfig(HttpServletRequest request) throws DSProviderException{
		DBUser user =  getUser(request);
		if(user == null) return null;
		HttpSession session = request.getSession(false);
		if(session == null) return null;
		if(session.getAttribute("CAL_SESSION_HIGHWAY_CONFIG") == null){
			session.setAttribute("CAL_SESSION_HIGHWAY_CONFIG", user.getHighwayConfig());
		}
		return (HighwayConfig)session.getAttribute("CAL_SESSION_HIGHWAY_CONFIG");
	}
	
	/* (non-Javadoc)
	 * @see com.ibm.lconn.calendar.servlet.IPermissionHelper#getUser(javax.servlet.http.HttpServletRequest)
	 */
	@Override
	public DBUser getUser(HttpServletRequest request) throws DSProviderException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "getUser", new Object[] { request });
		}
		
		String remoteUser = request.getRemoteUser();
		
		HttpSession session = request.getSession(false);
		if(session != null) {
			String sessionUser = (String)session.getAttribute("CAL_SESSION_USERNAME");
    		if((remoteUser == null && sessionUser != null)
    				||(remoteUser != null && !remoteUser.equals(sessionUser))) {
    			Enumeration e = session.getAttributeNames();
    	        while (e.hasMoreElements()) {
    	            session.removeAttribute((String)e.nextElement());
    	        } 
    	        // Due to a potential WAS bug, we do not call session.invalidate()
    	        // SPR #ZNJN7UT8SP, #XNKG7UGAG3
        		session = null;
    		}
    	}
		
		if(remoteUser == null)
			return null;
		
		if(session == null || session.getAttribute("CAL_SESSION_USER") == null) {
			DBUser user = getUser(remoteUser);
			session = request.getSession(true);
			session.setAttribute("CAL_SESSION_USER", user);
			session.setAttribute("CAL_SESSION_USERNAME", remoteUser);
			
			// synchronize user's membership, on user login, cache every 10 minutes
			new MemberPermissionSynchronizer().execute(user, false, null);
		}
		
		return (DBUser) session.getAttribute("CAL_SESSION_USER");
	}
	
	/* (non-Javadoc)
	 * @see com.ibm.lconn.calendar.servlet.IPermissionHelper#getUser(java.lang.String)
	 */
	@Override
	public DBUser getUser(String remoteUser) throws DSProviderException {
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "getUser", new Object[] { remoteUser });
		}
		
		DBUser user = null;
		
		try {
			String orgId = (String)ThreadHttpRequest.get().getAttribute(TenantLookupFilter.ORGANIZATION_ID_ATTRIBUTE);
	    	DSObject dso = null;
	    	boolean hasVisitorModelEnabled = LCGatekeeper.isEnabledGlobally(LCSupportedFeature.CONNECTIONS_VISITOR_MODEL);
	    	if(hasVisitorModelEnabled){
	    		dso = ds.findUserByPrincipal(remoteUser, orgId);
	    	}else{
	    		dso = ds.searchUserByExactLoginUserNameMatch(remoteUser, orgId);
	    	}

			if ( dso == null ) {
				return null;
			} else {
				user = UserUtilities.findUserByExtId(dso.get_id(), false);
				if(user == null) {
					user = new DBUser();
					user.setUserExtID(dso.get_id());
					user.setUserEmail(dso.get_email());
					user.setUserName(dso.get_name());
				}
			}
		} catch (LCGatekeeperException dse) {
			LOGGER.throwing(CLASS_NAME, "getUser", dse);
			throw new DSProviderException(dse);
		} catch (DSException dse) {
			LOGGER.throwing(CLASS_NAME, "getUser", dse);
			throw new DSProviderException(dse);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "getUser", user);
		}
		return user;
	}
	
	
	/* (non-Javadoc)
	 * @see com.ibm.lconn.calendar.servlet.IPermissionHelper#getUserByUUID(java.lang.String)
	 */
	@Override
	public DBUser getUserByUUID(String userUUID) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "getUserByUUID",
					new Object[] { userUUID });
		}
		
		DBUser user = UserUtilities.findUserById(userUUID);
		if(user == null) {
			return null;
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "getUserByUUID", user);
		}
		
		return user;
	}
	

	/* (non-Javadoc)
	 * @see com.ibm.lconn.calendar.servlet.IPermissionHelper#getRole(javax.servlet.http.HttpServletRequest, java.lang.String, java.lang.String)
	 */
	@Override
	public int getRole(HttpServletRequest request, String commID, String orgID) throws DSProviderException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "getRole", new Object[] { request, commID, orgID });
		}
		
		DBUser user = getUser(request);

		if(user == null) {
			return -1;
		}
		
		//Add org-admin in 'admin' scope		
		OrgAdminHelper orgad = new OrgAdminHelper(request);
		
		//If the user is org-admin, he has the same access with app-admin user, RETURN 2
		if(request.isUserInRole("admin") || orgad.isOrgAdmin(orgID)) {
			return 2;
		}
		
		return getRole(user, commID);
	}

	/* (non-Javadoc)
	 * @see com.ibm.lconn.calendar.servlet.IPermissionHelper#getRole(com.ibm.lconn.calendar.db.model.DBUser, java.lang.String)
	 */
	@Override
	public int getRole(DBUser user, String commID) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "getRole", new Object[] { user, commID });
		}
		
		if ( user == null ) {
			return -1;
		} else if(user.getUserUUID() == null) {
			return 0;
		} else {
			Integer t = cs.getUserInfoDao().getUserMembership(user.getUserUUID(), commID);
			if(t == null) {
				return 0;
			} 
			return t;
		}
	}
	
	/* (non-Javadoc)
	 * @see com.ibm.lconn.calendar.servlet.IPermissionHelper#isUserAuthorizedToAccess(com.ibm.lconn.calendar.db.model.DBUser, com.ibm.lconn.calendar.db.model.DBCalendar)
	 */
	@Override
	public boolean isUserAuthorizedToAccess(DBUser user, DBCalendar calendar) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "isUserAuthorizedToAccess", new Object[] { user, calendar });
		}
		
		new MemberPermissionSynchronizer().execute(user, false, calendar.getCommunity_UUID());
		
		boolean ret = false;
		
		int userRole = getRole(user, calendar.getCommunity_UUID());
		if (userRole == -1 || userRole == 0) {
			if (calendar.getVisibility().equals(DBCalendar.PRIVATE)) {
				ret = false;
			} else {
				if(RuntimeConfiguration.isVisitorModeEnabled() && user != null) {
					HighwayConfig config = user.getHighwayConfig();
					if(config!=null && config.isExternalUser() && !config.allowPublicCommunities()) {
						return false;
					}
					return true;
				} else {
					ret = true;
				}
			}
		} else {
			ret = true;
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "isUserAuthorizedToAccess", ret);
		}
		return ret;
	}

	/* (non-Javadoc)
	 * @see com.ibm.lconn.calendar.servlet.IPermissionHelper#isUserAuthorized(javax.servlet.http.HttpServletRequest, com.ibm.lconn.calendar.db.model.DBCalendar, java.lang.String, int)
	 */
	@Override
	public int isUserAuthorized(HttpServletRequest request, DBCalendar calendar, String evtAuthor, int operation) throws DSProviderException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "isUserAuthorized", new Object[] { request, calendar, evtAuthor, operation });
		}
		
		DBUser user = getUser(request);

		int result = HttpServletResponse.SC_OK;
		
		boolean bFirst = true;
		
		while(true) {
			int userRole = getRole(request, calendar.getCommunity_UUID(), calendar.getORG_ID());
			
			if(userRole == 0 && RuntimeConfiguration.isVisitorModeEnabled()){
				HighwayConfig config = getUserHighwayConfig(request);
				if(config!=null && config.isExternalUser() && !config.allowPublicCommunities()) {
					return HttpServletResponse.SC_FORBIDDEN;
				}
			}
	
			if (userRole == -1 || userRole == 0) {
				// user is not logged in, or non community member
				if(Utilities.isMultitenancyContext(calendar.getORG_ID()) && (user == null || !Utilities.isSameOrganization(calendar.getORG_ID(), user.getORG_ID()))) {
					result = HttpServletResponse.SC_FORBIDDEN;
				} else {
					if (calendar.getVisibility().equals(DBCalendar.PRIVATE)) {
						if(userRole == -1) {
							result = HttpServletResponse.SC_UNAUTHORIZED;
						} else {
							result = HttpServletResponse.SC_FORBIDDEN;
						}
					} else {
						switch (operation) {
						case CalendarOperation.VIEW:
							result = HttpServletResponse.SC_OK;
							break;
						default:
							result = HttpServletResponse.SC_FORBIDDEN;
						}
					}
				}
			} else if (userRole == 1) {
				// community member
	
				if (LOGGER.isLoggable(Level.FINEST)) {
					LOGGER.log(Level.FINEST, "userRole = " + userRole + ", members_Role=" + calendar.getMembers_Role().intValue());
				}
				switch (operation) {
				case CalendarOperation.VIEW:
					result = HttpServletResponse.SC_OK;
					break;
				case CalendarOperation.CREATE:
					if (CalendarRole.AUTHOR.equals(calendar.getMembers_Role()))
						result = HttpServletResponse.SC_OK;
					else
						result = HttpServletResponse.SC_FORBIDDEN;
					break;
				case CalendarOperation.EDIT:
					if (user.getUserUUID().equals(evtAuthor) && CalendarRole.AUTHOR.equals(calendar.getMembers_Role()))
						result = HttpServletResponse.SC_OK;
					else
						result = HttpServletResponse.SC_FORBIDDEN;
					break;
				case CalendarOperation.DELETE:
					if (user.getUserUUID().equals(evtAuthor) && CalendarRole.AUTHOR.equals(calendar.getMembers_Role()))
						result = HttpServletResponse.SC_OK;
					else
						result = HttpServletResponse.SC_FORBIDDEN;
					break;
				}
			} else {
				// community owner
	
				result = HttpServletResponse.SC_OK;
			}
			
			if(bFirst && userRole != -1 && result != HttpServletResponse.SC_OK) {
				// check the user "role" hint, from request header, 
				// do membership sync if not match,
				// and try the permission check again
				String rmh = request.getHeader("X-CALENDAR-MEMBERSHIP");
				if(rmh != null) {
					int expected = "OWNER".equals(rmh) ? 2 : ("MEMBER".equals(rmh) ? 1 : 0);
					if(expected != userRole) {
						new MemberPermissionSynchronizer().execute(user, true, calendar.getCommunity_UUID());
						bFirst = false;
						continue;
					}
				}
			}
			
			break;
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "isUserAuthorized", result);
		}
		return result;
	}
	
	/* (non-Javadoc)
	 * @see com.ibm.lconn.calendar.servlet.IPermissionHelper#isUserMemberOf(javax.servlet.http.HttpServletRequest, com.ibm.lconn.calendar.db.model.DBCalendar)
	 */
	@Override
	public boolean isUserMemberOf(HttpServletRequest request, DBCalendar calendar) throws DSProviderException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "isUserMemberOf", new Object[] { request, calendar });
		}
		
		DBUser user = getUser(request);
		if(user == null) {
			return false;
		}
		
		boolean result = false;
		
		boolean bFirst = true;
		while(true) {
			int userRole = getRole(request, calendar.getCommunity_UUID(), calendar.getORG_ID());
			result = (userRole != 0);
			if(bFirst && userRole != -1 && result != true) {
				// check the user "role" hint, from request header, 
				// do membership sync if not match,
				// and try the permission check again
				String rmh = request.getHeader("X-CALENDAR-MEMBERSHIP");
				if(rmh != null) {
					if("OWNER".equals(rmh) || "MEMBER".equals(rmh)) {
						new MemberPermissionSynchronizer().execute(user, true, calendar.getCommunity_UUID());
						bFirst = false;
						continue;
					}
				}
			}
			break;
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "isUserMemberOf", result);
		}
		
		return result;
	}
	
	/* (non-Javadoc)
	 * @see com.ibm.lconn.calendar.servlet.IPermissionHelper#isUserOwnerOf(javax.servlet.http.HttpServletRequest, com.ibm.lconn.calendar.db.model.DBCalendar)
	 */
	@Override
	public boolean isUserOwnerOf(HttpServletRequest request, DBCalendar calendar) throws DSProviderException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "isUserOwnerOf", new Object[] { request, calendar });
		}
		
		DBUser user = getUser(request);
		if(user == null) {
			return false;
		}
		
		boolean result = false;
		
		boolean bFirst = true;
		while(true) {
			int userRole = getRole(request, calendar.getCommunity_UUID(), calendar.getORG_ID());
			result = (userRole == 2);
			if(bFirst && userRole != -1 && result != true) {
				// check the user "role" hint, from request header, 
				// do membership sync if not match,
				// and try the permission check again
				String rmh = request.getHeader("X-CALENDAR-MEMBERSHIP");
				if(rmh != null) {
					if("OWNER".equals(rmh)) {
						new MemberPermissionSynchronizer().execute(user, true, calendar.getCommunity_UUID());
						bFirst = false;
						continue;
					}
				}
			}
			break;
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "isUserOwnerOf", result);
		}
		
		return result;
	}
}
