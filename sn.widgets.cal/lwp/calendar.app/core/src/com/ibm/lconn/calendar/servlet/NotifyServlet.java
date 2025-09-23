/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.ResourceBundle;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;

import com.ibm.json.java.JSONObject;
import com.ibm.lconn.calendar.audit.CalendarEvents;
import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.util.CalendarOperation;
import com.ibm.lconn.calendar.util.MemberPermissionSynchronizer;
import com.ibm.lconn.calendar.util.MentionHelper;
import com.ibm.lconn.calendar.util.ResourceBundleUtils;
import com.ibm.lconn.calendar.util.UserUtilities;
import com.ibm.lconn.calendar.util.Utilities;
import com.ibm.lconn.events.internal.ItemDetails;
import com.ibm.lconn.events.internal.EventConstants.ContentType;
import com.ibm.lconn.events.internal.EventConstants.Scope;
import com.ibm.lconn.events.internal.next.ItemDetails35;
import com.ibm.lconn.events.internal.object.DefaultEventFactory;
import com.ibm.lotus.connections.core.notify.INotification;
import com.ibm.lotus.connections.core.notify.INotificationGroup;
import com.ibm.lotus.connections.core.notify.INotificationPerson;
import com.ibm.lotus.connections.core.notify.INotificationProperty;
import com.ibm.lotus.connections.core.notify.INotificationRecipients;
import com.ibm.lotus.connections.core.notify.impl.NotificationRecipients;
import com.ibm.lotus.connections.core.notify.impl.NotificationRecipients.GroupType;
import com.ibm.lotus.connections.core.notify.impl.Notifications;

public class NotifyServlet extends BaseServlet {
	private static final long serialVersionUID = -6094899792582774370L;

	private static final String CLASS_NAME = NotifyServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);

	private static final String RECIPIENT_COMMUNITY = "COMMUNITY";
	private static final String NOTIFICATION_SOURCE = "Communities";
	private static final String NOTIFICATION_TYPE = "notifyEvent";

	protected void onError(String err, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=utf-8");
		JSONObject obj = new JSONObject();
		obj.put("success", false);
		obj.put("error", err);
		response.getWriter().print("{}&&"+obj.toString());
		response.flushBuffer();
	}

	protected void onSuccess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=utf-8");
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		response.getWriter().print("{}&&"+obj.toString());
		response.flushBuffer();
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		response.sendError(HttpServletResponse.SC_FORBIDDEN);
		return;
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doPost", new Object[] { request, response });
		}
		
		if(!"XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
			request.getRequestDispatcher("/WEB-INF/jsps/403.jsp").forward(request, response);
			return;
		}
		
		ResourceBundle bundle = ResourceBundleUtils.getUIBundle(request.getLocale());

		try {
			if (Notifications.isEnabled(NOTIFICATION_SOURCE, NOTIFICATION_TYPE)) {
				if (LOGGER.isLoggable(Level.FINER)) {
					LOGGER.log(Level.FINER, "doPost", "Notification is enabled for calendar events notification");
				}
				
				String eventOrInstance = request.getParameter("eventOrInstance");
				String uuid = request.getParameter("uuid");
				String body = request.getParameter("body");
				String recipients = request.getParameter("recipients");
				boolean isEvent = eventOrInstance.equals("event")?true:false;
				
				if (LOGGER.isLoggable(Level.FINER)) {
					LOGGER.log(Level.FINER, "eventId = " + uuid + ", body = " + body + ", recipients = " + recipients + ", isEvent = " + isEvent);
				}

				if ( uuid == null || eventOrInstance == null || recipients == null) {
					onError(bundle.getString("notification.error.badrequest"), request, response);
					return;
				}

				// check permission
				DBUser user = permissionHelper.getUser(request);
				DBCalendar calendar = null;
				DBEvent event = null;
				DBEventInstance instance = null;
				if (isEvent) {
					event = crud.getEventDAO().getEvent(uuid);
					calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
				} else {
					instance = crud.getEventInstanceDao().getEventInstance(uuid);
					event = crud.getEventDAO().getEvent(instance.getEvent_UUID());
					calendar = crud.getCalendarDAO().getCalendar(instance.getCalendar_UUID());
				}

				int status = permissionHelper.isUserAuthorized(request, calendar, null, CalendarOperation.VIEW);
				if (status != HttpServletResponse.SC_OK) {
					response.sendError(HttpServletResponse.SC_FORBIDDEN);
					return;
				}

				// send notification
				INotificationPerson sender = null;
				if (Utilities.isEmailExposed() && StringUtils.isNotBlank(user.getUserEmail())) {
					sender = NotificationRecipients.createPersonWithExt(user.getUserExtID(), user.getUserName(), user.getUserEmail());
				} else {
					sender = NotificationRecipients.createPersonWithExt(user.getUserExtID(), Notifications.getSender(NOTIFICATION_SOURCE, NOTIFICATION_TYPE, "email"));
				}

				INotificationRecipients notificationRecipients = new NotificationRecipients();
				if (recipients.equals(RECIPIENT_COMMUNITY)) {
					INotificationGroup group = NotificationRecipients.createGroup(calendar.getCommunity_UUID(), GroupType.COMMUNITY);
					group.setGroupMembers(new ArrayList<INotificationPerson>());
					notificationRecipients.addBCC(group);
				} else {
					String[] memberIds = recipients.split(";");
					for (String memberId : memberIds) {
						DBUser recipientDTO = UserUtilities.findUserByExtId(memberId, false);
						if (LOGGER.isLoggable(Level.FINER)) {
							LOGGER.log(Level.FINER, "recipientDTO = " + recipientDTO);
							LOGGER.log(Level.FINER, "recipientEmail = " + recipientDTO.getUserEmail() + ", recipientName = " + recipientDTO.getUserName() + ", recipientId = " + recipientDTO.getUserExtID());
						}
						
						if(!Utilities.checkAccess(recipientDTO, calendar)) {
							LOGGER.log(Level.FINER, "user no longer has access to this community, skip!");
							
							// user do not has permission
							continue;
						}
						
						INotificationPerson recipient = NotificationRecipients.createPersonWithExt(recipientDTO.getUserExtID(), recipientDTO.getUserName(), recipientDTO.getUserEmail());
						notificationRecipients.addBCC(recipient);
					}
				}
				
				INotification notification = Notifications.createNotification(sender, NOTIFICATION_SOURCE, NOTIFICATION_TYPE, getServiceUrlPath("calendar", request));
				
				DBEventInfo eventInfo = null;
				Date startDate = null;
				String commHtmlUrl = getServiceUrlPath("communities", request) 
					+ "/service/html/communityview?communityUuid=" + calendar.getCommunity_UUID();
				String calendarHtmlUrl = commHtmlUrl + "#fullpageWidgetId=" + calendar.getWidgetId();
				String eventHtmlUrl = "";
				if (isEvent) {
					eventInfo = event.getEventInfo();
					eventHtmlUrl = calendarHtmlUrl + "&eventUuid=" + event.getEvent_UUID();
					List<DBEventInstance> instances = event.getEventInstances();
					if (instances != null && instances.size() > 0) {
						startDate = instances.get(0).getStartDate();
					}
				} else {	// instance
					// merge the info from event & instance
					eventInfo = instance.getEvent().getEventInfo();
					if (eventInfo != null && instance.getEventInfo() != null)
						eventInfo.update(instance.getEventInfo());
					eventHtmlUrl = calendarHtmlUrl + "&eventInstUuid=" + instance.getEventInst_UUID();
					startDate = instance.getStartDate();
				}
				
				notification.setProperty("notify.sender", user.getUserExtID(), INotificationProperty.Type.USER);
				notification.setProperty("event.name", eventInfo!=null?eventInfo.getName():"", INotificationProperty.Type.ITEMNAME);
				notification.setProperty("event.location", eventInfo!=null?eventInfo.getLocation():"");
				if(eventInfo!=null && eventInfo.getIsAllDay()) {
					notification.setProperty("event.time", startDate, INotificationProperty.Type.DATE);
				} else {
					notification.setProperty("event.time", startDate, INotificationProperty.Type.DATETIME);
				}
				notification.setProperty("event.description", StringEscapeUtils.unescapeHtml(Utilities.removeHTML(eventInfo!=null?eventInfo.getDescription(MentionHelper.PLAIN_TEXT_MENTION_FORMATTER).replace("&nbsp;", " "):"")));
				
				notification.setProperty("community.name", calendar.getCommunityName());
				notification.setProperty("community.url", commHtmlUrl);
				notification.setProperty("about.communities.url", getServiceUrlPath("communities", request) + "/service/html/about");
				notification.setProperty("calendar.url", calendarHtmlUrl);
				notification.setProperty("event.url", eventHtmlUrl);
			
				if (body == null) body = "";
				notification.setProperty("body", body);
				
				//////
				notification.setContainerDetails(CalendarEvents.getContainerFromDBCalendar(calendar));
				
				if (isEvent) {
					notification.setItemDetails((ItemDetails35)CalendarEvents.getItemFromDBEvent(calendar, event));
				} else {
					notification.setItemDetails((ItemDetails35)CalendarEvents.getItemFromDBEventInstance(calendar, event, instance));
				}
				
				Set<String> relatedCommunities = new HashSet<String>();
				relatedCommunities.add(calendar.getCommunity_UUID());
				
				Notifications.notify(notification, notificationRecipients);
			} else {
				if (LOGGER.isLoggable(Level.FINER)) {
					LOGGER.log(Level.FINER, "Notification is NOT enabled for calendar events notification");
				}
			}
			
			onSuccess(request, response);
		} catch (Exception e) {
			if (LOGGER.isLoggable(Level.FINER)) {
				LOGGER.throwing(CLASS_NAME, "doPost", e);
			}
			String err = e.getLocalizedMessage();
			if(StringUtils.isBlank(err)) err = e.getMessage();
			if(StringUtils.isBlank(err)) err = bundle.getString("notification.error.unknown");
			onError(err, request, response);
		}
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "doPost", "void");
		}
	}
}
