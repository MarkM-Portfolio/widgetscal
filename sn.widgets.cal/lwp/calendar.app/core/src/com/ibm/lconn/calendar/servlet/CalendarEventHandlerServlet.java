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
 * @author skomard
 */

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.namespace.QName;

import org.apache.abdera.Abdera;
import org.apache.abdera.model.Category;
import org.apache.abdera.model.Document;
import org.apache.abdera.model.Element;
import org.apache.abdera.model.Entry;
import org.apache.abdera.model.Person;

import com.ibatis.dao.client.DaoException;
import com.ibm.connections.directory.services.DSProviderFactory;
import com.ibm.connections.directory.services.data.DSObject;
import com.ibm.lconn.calendar.audit.CalendarEvents;
import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.exception.DatabaseException;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBMembership;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.BadAtomEntryException;
import com.ibm.lconn.calendar.exception.CalendarException;
import com.ibm.lconn.calendar.util.CalendarRole;
import com.ibm.lconn.calendar.util.ExecutionContext;
import com.ibm.lconn.calendar.util.UserUtilities;
import com.ibm.lconn.calendar.util.Utilities;
import com.ibm.lconn.core.gatekeeper.LCGatekeeper;
import com.ibm.lconn.core.gatekeeper.LCGatekeeperException;
import com.ibm.lconn.core.gatekeeper.LCSupportedFeature;

public class CalendarEventHandlerServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;

	private static final String CLASS_NAME = CalendarEventHandlerServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CalendarEventHandlerServlet.class.getName());

	private static final String SNX_NAMESPACE = "http://www.ibm.com/xmlns/prod/sn";
	private static final String SNX_EVENT_TYPE_SCHEME = "http://www.ibm.com/prod/sn/type/event";

	public static final QName SNX_USERID = new QName("http://www.ibm.com/xmlns/prod/sn", "userid", "snx");
	public static final QName SNX_CONTAINER = new QName(SNX_NAMESPACE, "container", "snx");
	public static final QName SNX_PROPERTY = new QName(SNX_NAMESPACE, "property", "snx");
	public static final QName QN_CONNECTIONS_MANAGED_APPLICATION = new QName("http://www.ibm.com/xmlns/prod/sn", "managedApplication", "snx");
	public static final QName QN_CONNECTIONS_REMOTE_APPLICATION = new QName("http://www.ibm.com/xmlns/prod/sn", "remoteApplication", "snx");

	private static final String STR_VISIBILITY_CHANGED = "community.visibility.changed";
	private static final String STR_PREPARE_DELETE = "community.prepare.delete";
	private static final String STR_WIDGET_REMOVED = "remote.app.removed";
	private static final String STR_WIDGET_ADDED = "remote.app.added";
	private static final String STR_COMMUNITY_UPDATED = "community.updated";
	
	private static final String STR_COMMUNITY_ORG_CHANGED = "community.org.changed";
	private static final String STR_COMMUNITY_MEMBER_ADDED = "community.members.added";
	private static final String STR_COMMUNITY_MEMBER_MODIFIED = "community.members.modified";
	private static final String STR_COMMUNITY_MEMBER_REMOVED = "community.members.removed";

	private CalendarEvents audit = new CalendarEvents();

	public void init(ServletConfig config) throws ServletException {
		super.init(config);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doPost", new Object[] { request, response });
		}
		try {
			InputStream in = request.getInputStream();

			if (in != null) {
				Abdera abdera = new Abdera();
				Document<Entry> doc = abdera.getParser().parse(in);
				if (doc == null) {
					setHeadersForWidget(response);
					response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					return;
				}

				Entry entry = (Entry) doc.getRoot();
				if (entry == null) {
					setHeadersForWidget(response);
					response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					return;
				}
				
				String eventType = null;
				List<Category> categories = (List<Category>) entry.getCategories(SNX_EVENT_TYPE_SCHEME);
				if (categories != null && categories.size() > 0) {
					// Shouldn't get more than one category of
					Category category = (Category) categories.get(0);
					if (category != null && category.getTerm() != null) {
						eventType = category.getTerm(); 
					}
				}
				
				if (eventType == null
						|| !(eventType.equals(STR_VISIBILITY_CHANGED) || eventType.equals(STR_PREPARE_DELETE) || eventType.equals(STR_WIDGET_REMOVED) || eventType.equals(STR_WIDGET_ADDED) || eventType
								.equals(STR_COMMUNITY_UPDATED)|| eventType.equals(STR_COMMUNITY_MEMBER_ADDED) || eventType.equals(STR_COMMUNITY_MEMBER_MODIFIED)
								||eventType.equals(STR_COMMUNITY_MEMBER_REMOVED) || eventType.equals(STR_COMMUNITY_ORG_CHANGED))) {
					setHeadersForWidget(response);
					response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					return;
				}
				
				Element container = entry.getExtension(SNX_CONTAINER);
				if (container == null) {
					setHeadersForWidget(response);
					response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					return;
				}

				String commUuid = container.getAttributeValue("id");
				if (commUuid == null || commUuid.equals("")) {
					setHeadersForWidget(response);
					response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					return;
				}
				
				String commName = container.getAttributeValue("name");
				if (commName == null || commName.equals("")) {
					setHeadersForWidget(response);
					response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					return;
				}
				
				Boolean isPrivate = null;
				String orgId = null, owners = null, members = null;
				List<Element> properties = container.getElements();
				if (properties != null) {
					for (Iterator<Element> iter = properties.iterator(); iter.hasNext();) {
						Element property = iter.next();
						if (property.getQName().equals(SNX_PROPERTY)){
							String attrName = property.getAttributeValue("name");
							
							if("communityType".equals(attrName)) {
								isPrivate = "private".equalsIgnoreCase(property.getText().trim());
							} else if("communityOrgId".equals(attrName)) {	
								orgId = property.getText().trim();
							} else if("owners".equals(attrName)){
								owners = property.getText().trim();
							} else if("members".equals(attrName)){
								members = property.getText().trim();
							}
						}
					}
				}
				if(Utilities.isLotusLiveEnabled() && orgId == null && ("remote.app.added".equals(eventType) || "community.org.changed".equals(eventType))) {
					throw new BadAtomEntryException("orgId is null in cloud env", new Object[] { eventType });
				}
				
				String widgetId = null;
				Element remoteApp = entry.getExtension(QN_CONNECTIONS_REMOTE_APPLICATION);
				if (remoteApp != null) {
					widgetId = remoteApp.getAttributeValue("instanceId");
				} else {
					Element managedApp = entry.getExtension(QN_CONNECTIONS_MANAGED_APPLICATION);
					if (managedApp != null) {
						widgetId = managedApp.getAttributeValue("instanceId");
					}
				}

				String userId = null;
				Person author = entry.getAuthor();
				Element useridElem = author.getExtension(SNX_USERID);
				if (useridElem != null) {
					userId = useridElem.getText().trim();
				}			

				if (LOGGER.isLoggable(Level.FINEST)) {
					LOGGER.finest("processWidgetEvent: commUuid=" + commUuid + ", commName=" + commName + ", widgetId=" + widgetId + ", eventType=" + eventType + ", isPrivate=" + isPrivate);
				}
				
				String useOrg = null;
				
				ExecutionContext.runAs(ExecutionContext.IGNORE_TENANTKEY);
				try {
					if(orgId != null) {
						useOrg = orgId;
					} else {
						CalendarService cs = CalendarServiceFactory.INSTANCE.create();
						DBCalendar calendar = cs.getCalendarDAO().getCalendar(commUuid);
						if(calendar != null) {
							useOrg = calendar.getORG_ID();
						}
					}
					useOrg = Utilities.normalizeTenantKey(useOrg);
				} finally {
					ExecutionContext.exit();
				}
				
				ExecutionContext.runAs(useOrg);
				try {
					DBUser user = null;
					if(userId != null) {
						user = UserUtilities.findUserByExtId(userId, false);
					}
	
					boolean answ = processWidgetEvent(user, commUuid, commName, widgetId, eventType, isPrivate, orgId, owners, members);
					setHeadersForWidget(response);
	
					if (answ) {
						response.setStatus(HttpServletResponse.SC_OK);
					} else if (!answ && eventType.equals(STR_WIDGET_ADDED)) {
						response.setStatus(HttpServletResponse.SC_CONFLICT); 
					} else if (!answ && eventType.equals(STR_WIDGET_REMOVED)) {
						response.setStatus(HttpServletResponse.SC_GONE); 
					} else if (!answ && eventType.equals(STR_PREPARE_DELETE)) {
						response.setStatus(HttpServletResponse.SC_GONE); 
					}
				} finally {
					ExecutionContext.exit();
				}
			} else {
				// Request body is missing
				setHeadersForWidget(response);
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			}
		} catch (IOException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPost", ex);
		} catch (BadAtomEntryException ex) {
			respondBadRequest(request, response, ex);
			if (LOGGER.isLoggable(Level.FINER)) {
				LOGGER.throwing(CLASS_NAME, "doPost", ex);
			}
		} catch (CalendarException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPost", ex);
		} catch (IllegalArgumentException ex) {
			respondBadRequest(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPost", ex);
		} catch (Exception ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPost", ex);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "doPost", "void");
		}
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
		response.setHeader("Allow", "POST");
	}

	public void doDelete(HttpServletRequest request, HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
		response.setHeader("Allow", "POST");
	}

	public void doPut(HttpServletRequest request, HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
		response.setHeader("Allow", "POST");
	}

	/**
	 * Processes iWidget events catched in the View (add/remove calendar widget,
	 * remove community)
	 * 
	 * @param commUuid
	 * @param eventType
	 * @return true if event was processed correctly
	 * @throws CalendarException
	 */
	private boolean processWidgetEvent(DBUser user, String commUuid, String commName, String widgetId, String eventType, Boolean isPrivate, String orgId,String owners,String members) throws CalendarException {
		DBCalendar dbCalendar = new DBCalendar();

		dbCalendar.setCalendar_UUID(commUuid); // right now, one calendar per
												// community. same uuid.
		dbCalendar.setCommunity_UUID(commUuid);
		dbCalendar.setCommunityName(commName);
		dbCalendar.setWidgetId(widgetId);
		dbCalendar.setORG_ID(orgId);

		if (eventType.equals("remote.app.added")) {
			try {
				dbCalendar.setMembers_Role(CalendarRole.DEFAULT);
				dbCalendar.setVisibility(isPrivate ? DBCalendar.PRIVATE : DBCalendar.PUBLIC);
				dbCalendar.setLastModified(new Date());
				dbCalendar.setCreatedOn(new Date());
				dbCalendar.setAclModtime(new Date());
				dbCalendar.setORG_ID(ExecutionContext.getCurrentOrgId());
				crud.getCalendarDAO().addCalendar(dbCalendar);

				crud.flush();
				audit.calendarCreated(dbCalendar, user);

				Integer role = crud.getUserInfoDao().getUserMembership(user.getUserUUID(), commUuid);
				DBMembership membership = new DBMembership(user.getUserUUID(), commUuid, DBMembership.OWNER);
				if (role == null) {
					crud.getUserInfoDao().addUserMembership(membership);
				} else if (role != DBMembership.OWNER) {
					crud.getUserInfoDao().updateUserMembership(membership);
				}
				crud.flush();

			} catch (DaoException ex) {
				DatabaseException dbe = new DatabaseException(ex);
				if (dbe.isDuplicateKeyException()) {
					// don't throw the exception if the calendar already exists.
					return false;
				} else {
					throw dbe;
				}
			} catch (CalendarException ex) {
				throw ex;
			} catch (Exception ex) {
				throw new CalendarException(ex);
			}

			return true;
		} else if (eventType.equals("remote.app.removed") || eventType.equals("community.prepare.delete")) {
			return crud.removeCalendar(commUuid, user) == 1;
		} else if (eventType.equals("community.visibility.changed")) {
			crud.updateCalendarVisibility(commUuid, isPrivate ? DBCalendar.PRIVATE : DBCalendar.PUBLIC, user);
			return true;
		} else if (eventType.equals("community.updated")) {
			try {
				Map<String, Object> updates = new HashMap<String, Object>();
				updates.put("communityName", commName);
				crud.getCalendarDAO().updateCalendar(commUuid, updates);

				crud.flush();

				// audit
				audit.calendarUpdated(crud.getCalendarDAO().getCalendar(commUuid), user);
			} catch (CalendarException ex) {
				throw ex;
			} catch (Exception ex) {
				throw new CalendarException(ex);
			}
			return true;
		} else if (eventType.equals("community.org.changed")) {
			ExecutionContext.runAs(ExecutionContext.IGNORE_TENANTKEY);
			try {
				crud.getCalendarDAO().updateOrgId(commUuid, orgId);
				crud.flush();

				// audit
				audit.calendarUpdated(crud.getCalendarDAO().getCalendar(commUuid), user);
			} catch (CalendarException ex) {
				throw ex;
			} catch (Exception ex) {
				throw new CalendarException(ex);
			} finally {
				ExecutionContext.exit();
			}
			return true;
		} else if(eventType.equals(STR_COMMUNITY_MEMBER_ADDED)){
             if(members!=null){
        		savePermissions(commUuid, members, DBMembership.MEMBER);
             }
             if(owners!=null){
            	 savePermissions(commUuid, owners, DBMembership.OWNER);
              }
			 return true;
			
		} else if(eventType.equals(STR_COMMUNITY_MEMBER_MODIFIED)){
			if(members!=null){
        		savePermissions(commUuid, members, DBMembership.MEMBER);
             }
             if(owners!=null){
            	 savePermissions(commUuid, owners, DBMembership.OWNER);
              }
			return true;
			
		} else if(eventType.equals(STR_COMMUNITY_MEMBER_REMOVED)){
			if(owners!=null)
				removePermissions(commUuid, owners,DBMembership.OWNER);
			if(members!=null)
				removePermissions(commUuid,members,DBMembership.MEMBER);
			return true;
		}else {
			throw new CalendarException("error.service.unsupported.event.paramater", new Object[] { eventType });
		}

	}

	private void removePermissions(String commUuid, String owners, int membershipType) {
		StringTokenizer tokens = new StringTokenizer(owners, ",");
		while (tokens.hasMoreTokens()) {
			String userExtID = tokens.nextToken();
			try{
				DBUser theUser = UserUtilities.findUserByExtId(userExtID, true);
				crud.getUserInfoDao().deleteUserMembership(new DBMembership(theUser.getUserUUID(), commUuid, membershipType ));
				crud.flush();
			}catch(CalendarException e){
				if (LOGGER.isLoggable(Level.FINER)) {
					LOGGER.entering(CLASS_NAME, "removePermissions", new Object[] {commUuid, userExtID,membershipType });
				}
			}
		}
	}

	private void savePermissions(String commUuid, String userIDs, int membershipType) {
		StringTokenizer tokens = new StringTokenizer(userIDs, ",");
		while (tokens.hasMoreTokens()) {
			String userExtID = tokens.nextToken();
			try{
				DBUser theUser = UserUtilities.findUserByExtId(userExtID, true);
				if(theUser!=null) {
			    	Integer role = crud.getUserInfoDao().getUserMembership(theUser.getUserUUID(), commUuid);
					DBMembership membership = new DBMembership(theUser.getUserUUID(), commUuid, membershipType);
					if (role == null) {
						crud.getUserInfoDao().addUserMembership(membership);
					} else if (role != membershipType) {
						crud.getUserInfoDao().updateUserMembership(membership);
					}
					crud.flush();
				}
			}catch(CalendarException e){
				if (LOGGER.isLoggable(Level.FINER)) {
					LOGGER.entering(CLASS_NAME, "savePermissions", new Object[] {commUuid, userExtID, membershipType });
				}
			}
		}
	}

	private void setHeadersForWidget(HttpServletResponse response) {
		// This two headers are required for Widget Event Handling process. If
		// X-LConn-Auth is missing, Connections would throw authentication error
		response.setHeader("Content-Length", "0");
		response.setHeader("X-LConn-Auth", "true");
	}
}
