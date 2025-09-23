/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.audit;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Logger;

import org.apache.abdera.model.AtomDate;

import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventComment;
import com.ibm.lconn.calendar.db.model.DBEventFollowingRecord;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBRecurrence;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.util.CalendarRole;
import com.ibm.lconn.calendar.util.FrequencyCode;
import com.ibm.lconn.calendar.util.MentionHelper;
import com.ibm.lconn.calendar.util.UserUtilities;
import com.ibm.lconn.calendar.util.Utilities;
import com.ibm.lconn.calendar.util.events.Verifier;
import com.ibm.lconn.events.internal.ContainerDetails;
import com.ibm.lconn.events.internal.CorrelationData;
import com.ibm.lconn.events.internal.Event;
import com.ibm.lconn.events.internal.EventConstants.ContentType;
import com.ibm.lconn.events.internal.EventConstants.InvocationPoint;
import com.ibm.lconn.events.internal.EventConstants.Scope;
import com.ibm.lconn.events.internal.EventConstants.Source;
import com.ibm.lconn.events.internal.EventConstants.Type;
import com.ibm.lconn.events.internal.ItemDetails;
import com.ibm.lconn.events.internal.Person;
import com.ibm.lconn.events.internal.TargetingData;
import com.ibm.lconn.events.internal.impl.Events;
import com.ibm.lconn.events.internal.impl.FatalEventException;
import com.ibm.lconn.events.internal.next.CorrelationData35;
import com.ibm.lconn.events.internal.next.ItemDetails35;
import com.ibm.lconn.events.internal.object.DefaultEventFactory;

public class CalendarEvents {
	private final static String CLASS_NAME = CalendarEvents.class.getName();

	private final static Logger logger = Logger.getLogger(CLASS_NAME);

	public final static String MEMBERSHIP_READER = "reader";
	public final static String MEMBERSHIP_AUTHOR = "author";
	public final static String MEMBERSHIP_MEMBER = "member";

	private final static String EVENT_NAME_NULL = "NULL";

	private final static String EVENT_CALENDAR_CREATED = "community.calendar.created";
	private final static String EVENT_CALENDAR_DELETED = "community.calendar.deleted";
	private final static String EVENT_CALENDAR_UPDATED = "community.calendar.updated";
	private final static String EVENT_MEMBERSHIP_SYNC = "community.calendar.membership.synchronized";
	private final static String EVENT_SINGLE_CREATED = "community.calendar.event.entry.created";
	private final static String EVENT_SINGLE_UPDATED = "community.calendar.event.entry.updated";
	private final static String EVENT_SINGLE_DELETED = "community.calendar.event.entry.deleted";
	private final static String EVENT_SINGLE_MENTIONED = "community.calendar.event.entry.notification.mention";
	private final static String EVENT_SINGLE_INSTANCE_DELETED = "community.calendar.event.instance.deleted";
	private final static String EVENT_SERIES_CREATED = "community.calendar.series.entry.created";
	private final static String EVENT_SERIES_UPDATED = "community.calendar.series.entry.updated";
	private final static String EVENT_SERIES_DELETED = "community.calendar.series.entry.deleted";
	private final static String EVENT_SERIES_MENTIONED = "community.calendar.series.entry.notification.mention";
	private final static String EVENT_SERIES_INSTANCE_UPDATED = "community.calendar.series.instance.updated";
	private final static String EVENT_SERIES_INSTANCE_DELETED = "community.calendar.series.instance.deleted";
	private final static String EVENT_SERIES_INSTANCE_MENTIONED = "community.calendar.series.instance.notification.mention";
	private final static String EVENT_COMMENT_CREATED = "community.calendar.event.entry.comment.created";
	private final static String EVENT_COMMENT_DELETED = "community.calendar.event.entry.comment.deleted";
	private final static String EVENT_COMMENT_MENTIONED = "community.calendar.event.entry.comment.notification.mention";

	// following
	private final static String EVENT_SINGLE_FOLLOWED = "community.calendar.event.entry.followed";
	private final static String EVENT_SINGLE_UNFOLLOWED = "community.calendar.event.entry.unfollowed";
	private final static String EVENT_SERIES_FOLLOWED = "community.calendar.series.entry.followed";
	private final static String EVENT_SERIES_UNFOLLOWED = "community.calendar.series.entry.unfollowed";
	private final static String EVENT_INSTANCE_FOLLOWED = "community.calendar.series.instance.followed";
	private final static String EVENT_INSTANCE_UNFOLLOWED = "community.calendar.series.instance.unfollowed";

	// RSVP
	private final static String EVENT_SINGLE_RSVPED = "community.calendar.event.entry.rsvped";
	private final static String EVENT_SINGLE_UNRSVPED = "community.calendar.event.entry.unrsvped";
	private final static String EVENT_SERIES_RSVPED = "community.calendar.series.entry.rsvped";
	private final static String EVENT_SERIES_UNRSVPED = "community.calendar.series.entry.unrsvped";
	private final static String EVENT_INSTANCE_RSVPED = "community.calendar.series.instance.rsvped";
	private final static String EVENT_INSTANCE_UNRSVPED = "community.calendar.series.instance.unrsvped";

	private Event createEvent(String eventName, Type type) {
		Event event = DefaultEventFactory.createEvent(Source.COMMUNITIES, type, Scope.COMMUNITY, eventName);
		return event;
	}

	public static boolean isEventRequired(InvocationPoint invocationPoint, Source source, Type type, String eventName, boolean flg) {
		return !Verifier.enabled && Events.isEventRequired(invocationPoint, source, type, eventName, flg);
	}

	private void fireCalendarEvent(DBCalendar calendar, DBUser user, Event auditEvent, boolean isDelete) {
		auditEvent.setActor(getPersonFromDBUser(user));
		auditEvent.setContainerDetails(getContainerFromDBCalendar(calendar));
		auditEvent.setRelatedCommunity(calendar.getCommunity_UUID());
		if (!isDelete) {
			auditEvent.setProperties(getCalendarProperties(calendar));
		}
		try {
			Events.invokeAsync(auditEvent);
		} catch (FatalEventException fee) {
			fee.printStackTrace();
		}
	}

	// community.calendar.created
	public void calendarCreated(DBCalendar calendar, DBUser user) {
		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.CREATE, EVENT_CALENDAR_CREATED, false)) {
			Event event = createEvent(EVENT_CALENDAR_CREATED, Type.CREATE);
			fireCalendarEvent(calendar, user, event, false);
		}
	}

	// community.calendar.updated
	public void calendarUpdated(DBCalendar calendar, DBUser user) {
		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.UPDATE, EVENT_CALENDAR_UPDATED, false)) {
			Event event = createEvent(EVENT_CALENDAR_UPDATED, Type.UPDATE);
			fireCalendarEvent(calendar, user, event, false);
		}
	}

	// community.calendar.deleted
	public void calendarDeleted(DBCalendar calendar, DBUser user) {
		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.DELETE, EVENT_CALENDAR_DELETED, false)) {
			Event event = createEvent(EVENT_CALENDAR_DELETED, Type.DELETE);
			fireCalendarEvent(calendar, user, event, true);
		}
	}

	// community.calendar.membership.synchronized
	public void membershipSynced(DBUser user) {
		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.UPDATE, EVENT_MEMBERSHIP_SYNC, false)) {
			Event event = createEvent(EVENT_MEMBERSHIP_SYNC, Type.UPDATE);

			Person admin = DefaultEventFactory.createPerson("admin", "Community Events Admin");
			event.setActor(admin);

			Map<String, String> properties = new HashMap<String, String>();
			properties.put("user.id", user.getUserExtID());
			event.setProperties(properties);
			try {
				Events.invokeAsync(event);
			} catch (FatalEventException fee) {
				fee.printStackTrace();
			}
		}
	}

	private void fireSingleEventEvent(DBCalendar calendar, DBEvent event, DBUser user, Event auditEvent, boolean isDelete, boolean isMentionEvent, DBUser impersonator) {
		auditEvent.setActor(getPersonFromDBUser(user));
		// RTC 159502 For QuickResult, JMS will publish eventUuid in 'ContainerDetails htmlPath' parameter for certain events 
		if (auditEvent != null && (auditEvent.getName().equals(EVENT_SINGLE_CREATED)
				|| auditEvent.getName().equals(EVENT_SERIES_CREATED)
				|| auditEvent.getName().equals(EVENT_SINGLE_UPDATED)
				|| auditEvent.getName().equals(EVENT_SERIES_UPDATED))) {
			auditEvent.setContainerDetails(getContainerFromDBCalendar(calendar, event));
		} else {
			auditEvent.setContainerDetails(getContainerFromDBCalendar(calendar));
		}
		auditEvent.setItemDetails(getItemFromDBEvent(calendar, event));
		auditEvent.setRelatedCommunity(calendar.getCommunity_UUID());
		if(impersonator != null){
			auditEvent.setImpersonatedByExtID(impersonator.getUserExtID());
		}
		if (!isDelete) {
			auditEvent.setProperties(getSingleEventProperties(event));
			auditEvent.getContentData().setContent(getSingleEventDescription(event), ContentType.HTML);
			auditEvent.getContentData().setTags(event.getTagNames());

			if (isMentionEvent) {
				TargetingData targetingData = auditEvent.getTargetingData();
				for (MentionHelper.MentionRecord usr : event.getEventInfo().getRecentMentionedPeople()) {
					targetingData.getTargetPeople().add(usr.getExtid());
				}
			}
		}
		try {
			Events.invokeAsync(auditEvent);
		} catch (FatalEventException fee) {
			fee.printStackTrace();
		}
	}

	// community.calendar.event.entry.created
	public void eventSingleCreated(DBCalendar calendar, DBEvent event, DBUser user, DBUser impersonator) {
		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.CREATE, EVENT_SINGLE_CREATED, false)) {
			Event auditEvent = createEvent(EVENT_SINGLE_CREATED, Type.CREATE);
			fireSingleEventEvent(calendar, event, user, auditEvent, false, false, impersonator);
		}

		List<MentionHelper.MentionRecord> mentioned = event.getEventInfo().getRecentMentionedPeople();
		logger.finest("mentioned people in event (before filter): " + mentioned.size());
		for (Iterator<MentionHelper.MentionRecord> iter = mentioned.iterator(); iter.hasNext();) {
			MentionHelper.MentionRecord t = iter.next();
			if (!t.hasPermission())
				iter.remove();
		}
		logger.finest("mentioned people in event: " + mentioned.size());
		if (mentioned.size() > 0) {
			if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.NOTIFY, EVENT_SINGLE_MENTIONED, false)) {
				Event auditEvent = createEvent(EVENT_SINGLE_MENTIONED, Type.NOTIFY);
				fireSingleEventEvent(calendar, event, user, auditEvent, false, true, impersonator);
			}
		}
	}

	// community.calendar.event.entry.updated
	public void eventSingleUpdated(DBCalendar calendar, DBEvent event, DBUser user, DBUser impersonator) {
		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.UPDATE, EVENT_SINGLE_UPDATED, false)) {
			Event auditEvent = createEvent(EVENT_SINGLE_UPDATED, Type.UPDATE);
			fireSingleEventEvent(calendar, event, user, auditEvent, false, false, impersonator);
		}

		List<MentionHelper.MentionRecord> mentioned = event.getEventInfo().getRecentMentionedPeople();
		for (Iterator<MentionHelper.MentionRecord> iter = mentioned.iterator(); iter.hasNext();) {
			MentionHelper.MentionRecord t = iter.next();
			if (!t.hasPermission())
				iter.remove();
		}
		logger.finest("mentioned people in event: " + mentioned.size());
		if (mentioned.size() > 0) {
			if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.NOTIFY, EVENT_SINGLE_MENTIONED, false)) {
				Event auditEvent = createEvent(EVENT_SINGLE_MENTIONED, Type.NOTIFY);
				fireSingleEventEvent(calendar, event, user, auditEvent, false, true, impersonator);
			}
		}
	}

	// community.calendar.event.entry.deleted
	public void eventSingleDeleted(DBCalendar calendar, DBEvent event, DBUser user) {
		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.DELETE, EVENT_SINGLE_DELETED, false)) {
			Event auditEvent = createEvent(EVENT_SINGLE_DELETED, Type.DELETE);
			fireSingleEventEvent(calendar, event, user, auditEvent, true, false, null);
		}
	}

	private void fireEventSeriesEvent(DBCalendar calendar, DBEvent event, DBUser user, Event auditEvent, boolean isDelete, boolean isMentionEvent, DBUser impersonator) {
		auditEvent.setActor(getPersonFromDBUser(user));
		auditEvent.setContainerDetails(getContainerFromDBCalendar(calendar));
		auditEvent.setItemDetails(getItemFromDBEvent(calendar, event));
		auditEvent.setRelatedCommunity(calendar.getCommunity_UUID());
		if(impersonator != null){
			auditEvent.setImpersonatedByExtID(impersonator.getUserExtID());
		}
		if (!isDelete) {
			auditEvent.setProperties(getSeriesEventProperties(event));
			auditEvent.getContentData().setContent(getSeriesEventDescription(event), ContentType.HTML);
			auditEvent.getContentData().setTags(event.getTagNames());
			
			if (isMentionEvent) {
				TargetingData targetingData = auditEvent.getTargetingData();
				for (MentionHelper.MentionRecord usr : event.getEventInfo().getRecentMentionedPeople()) {
					targetingData.getTargetPeople().add(usr.getExtid());
				}
			}
		}
		try {
			Events.invokeAsync(auditEvent);
		} catch (FatalEventException fee) {
			fee.printStackTrace();
		}
	}

	// community.calendar.series.entry.created
	public void eventSeriesCreated(DBCalendar calendar, DBEvent event, DBUser user, DBUser impersonator) {
		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.CREATE, EVENT_SERIES_CREATED, false)) {
			Event auditEvent = createEvent(EVENT_SERIES_CREATED, Type.CREATE);
			fireEventSeriesEvent(calendar, event, user, auditEvent, false, false, impersonator);
		}
		
		List<MentionHelper.MentionRecord> mentioned = event.getEventInfo().getRecentMentionedPeople();
		for (Iterator<MentionHelper.MentionRecord> iter = mentioned.iterator(); iter.hasNext();) {
			MentionHelper.MentionRecord t = iter.next();
			if (!t.hasPermission())
				iter.remove();
		}
		logger.finest("mentioned people in event: " + mentioned.size());
		if (mentioned.size() > 0) {
			if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.NOTIFY, EVENT_SERIES_MENTIONED, false)) {
				Event auditEvent = createEvent(EVENT_SERIES_MENTIONED, Type.NOTIFY);
				fireEventSeriesEvent(calendar, event, user, auditEvent, false, true, impersonator);
			}
		}
	}

	// community.calendar.series.entry.updated
	public void eventSeriesUpdated(DBCalendar calendar, DBEvent event, DBUser user, DBUser impersonator) {
		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.UPDATE, EVENT_SERIES_UPDATED, false)) {
			Event auditEvent = createEvent(EVENT_SERIES_UPDATED, Type.UPDATE);
			fireEventSeriesEvent(calendar, event, user, auditEvent, false, false, impersonator);
		}
		
		List<MentionHelper.MentionRecord> mentioned = event.getEventInfo().getRecentMentionedPeople();
		for (Iterator<MentionHelper.MentionRecord> iter = mentioned.iterator(); iter.hasNext();) {
			MentionHelper.MentionRecord t = iter.next();
			if (!t.hasPermission())
				iter.remove();
		}
		logger.finest("mentioned people in event: " + mentioned.size());
		if (mentioned.size() > 0) {
			if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.NOTIFY, EVENT_SERIES_MENTIONED, false)) {
				Event auditEvent = createEvent(EVENT_SERIES_MENTIONED, Type.NOTIFY);
				fireEventSeriesEvent(calendar, event, user, auditEvent, false, true, impersonator);
			}
		}
	}

	// community.calendar.series.entry.deleted
	public void eventSeriesDeleted(DBCalendar calendar, DBEvent event, DBUser user) {
		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.DELETE, EVENT_SERIES_DELETED, false)) {
			Event auditEvent = createEvent(EVENT_SERIES_DELETED, Type.DELETE);
			fireEventSeriesEvent(calendar, event, user, auditEvent, true, false, null);
		}
	}

	private void fireEventInstanceEvent(DBCalendar calendar, DBEvent event, DBEventInstance inst, DBUser user, Event auditEvent, boolean isDelete, boolean isMentionEvent, DBUser impersonator) {
		auditEvent.setActor(getPersonFromDBUser(user));
		auditEvent.setContainerDetails(getContainerFromDBCalendar(calendar));
		auditEvent.setItemDetails(getItemFromDBEventInstance(calendar, event, inst));
		auditEvent.setRelatedCommunity(calendar.getCommunity_UUID());
		if(impersonator != null){
			auditEvent.setImpersonatedByExtID(impersonator.getUserExtID());
		}
		if (!isDelete) {
			auditEvent.setProperties(getEventInstanceProperties(calendar, inst));
			auditEvent.getContentData().setContent(getEventInstanceDescription(inst), ContentType.HTML);
			auditEvent.getContentData().setTags(event.getTagNames());
			
			if (isMentionEvent && inst.getEventInfo() != null) {
				TargetingData targetingData = auditEvent.getTargetingData();
				for (MentionHelper.MentionRecord usr : event.getEventInfo().getRecentMentionedPeople()) {
					targetingData.getTargetPeople().add(usr.getExtid());
				}
			}
		}
		try {
			Events.invokeAsync(auditEvent);
		} catch (FatalEventException fee) {
			fee.printStackTrace();
		}
	}

	// community.calendar.series.instance.updated
	public void eventInstanceUpdated(DBCalendar calendar, DBEvent event, DBEventInstance inst, DBUser user, DBUser impersonator) {
		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.UPDATE, EVENT_SERIES_INSTANCE_UPDATED, false)) {
			Event auditEvent = createEvent(EVENT_SERIES_INSTANCE_UPDATED, Type.UPDATE);
			fireEventInstanceEvent(calendar, event, inst, user, auditEvent, false, false, impersonator);
		}
		
		if(inst.getEventInfo() != null) {
			List<MentionHelper.MentionRecord> mentioned = inst.getEventInfo().getRecentMentionedPeople();
			for (Iterator<MentionHelper.MentionRecord> iter = mentioned.iterator(); iter.hasNext();) {
				MentionHelper.MentionRecord t = iter.next();
				if (!t.hasPermission())
					iter.remove();
			}
			logger.finest("mentioned people in event instance: " + mentioned.size());
			if (mentioned.size() > 0) {
				if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.NOTIFY, EVENT_SERIES_INSTANCE_MENTIONED, false)) {
					Event auditEvent = createEvent(EVENT_SERIES_INSTANCE_MENTIONED, Type.NOTIFY);
					fireEventInstanceEvent(calendar, event, inst, user, auditEvent, false, true, impersonator);
				}
			}
		}
	}

	// community.calendar.series.instance.deleated
	public void eventInstanceDeleted(DBCalendar calendar, DBEvent event, DBEventInstance inst, DBUser user) {
		String eventName = event.getIsRecurrence() ? EVENT_SERIES_INSTANCE_DELETED : EVENT_SINGLE_INSTANCE_DELETED;

		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.DELETE, eventName, false)) {
			Event auditEvent = createEvent(eventName, Type.DELETE);
			fireEventInstanceEvent(calendar, event, inst, user, auditEvent, true, false, null);
		}
	}

	private void fireEventCommentEvent(DBCalendar calendar, DBEvent event, DBEventInstance inst, DBEventComment comment, DBUser user, Event auditEvent, boolean isDelete, boolean isMentionEvent, DBUser impersonator) {
		auditEvent.setActor(getPersonFromDBUser(user));
		auditEvent.setContainerDetails(getContainerFromDBCalendar(calendar));
		auditEvent.setItemDetails(getItemFromDBEventComment(comment, event, calendar));
		auditEvent.setRelatedCommunity(calendar.getCommunity_UUID());
		CorrelationData data = auditEvent.getCorrelationData();
		// RTC 143381, for comment on single event, correlcation data should be the event itself
		if(event.getIsRecurrence()) {
			data.setCorrelationItemUUID(inst.getEventInst_UUID());
			data.setCorrelationItemName(event.getEventInfo().getName());
			data.setCorrelationItemHTMLPath(getInstanceHtmlUrl(calendar, inst));
		} else {
			data.setCorrelationItemUUID(event.getEvent_UUID());
			data.setCorrelationItemName(event.getEventInfo().getName());
			data.setCorrelationItemHTMLPath(getEventHtmlUrl(calendar, event));
		}

		if (!isDelete) {
			if (data instanceof CorrelationData35) {
				CorrelationData35 data35 = (CorrelationData35) data;
				data35.setTags(event.getTagNames());
				data35.setNumberComments(inst.getCommentsCount());
				data35.setScope(Scope.COMMUNITY);

				if (inst.getModifiedOn() != null)
					data35.setLastUpdate(inst.getModifiedOn());
				else
					data35.setLastUpdate(event.getModifiedOn());

				Set<String> authorPeople = new HashSet<String>();
				authorPeople.add(UserUtilities.findUserById(event.getCreatedBy()).getUserExtID());
				data35.setAuthorPeople(authorPeople);

				data35.setContent(getEventInstanceDescription(inst), ContentType.HTML);
			}
		}

		if (!isDelete) {
			auditEvent.getContentData().setContent(comment.getRenderedContentForAS(), ContentType.HTML);
		}

		if (event != null && !isDelete) {
			Map<String, String> properties = new HashMap<String, String>();
			properties.put("parent.event.id", event.getEvent_UUID());
			properties.put("parent.event.link", getEventHtmlUrl(calendar, event));
			auditEvent.setProperties(properties);
		}

		if (!isMentionEvent) {
			// RTC 146633: You are first commenter on calendar event news story surfacing in "My Notifications" (Bosh)
			// ie. only done if not first commenter of event owned by you
			DBUser targetUser = UserUtilities.findUserById(event.getCreatedBy());
			if (inst.getCommentsCount() > 1 || !user.getUserExtID().equals(targetUser.getUserExtID())) {
				if (Utilities.checkAccess(targetUser, calendar)) {
					TargetingData targetingData = auditEvent.getTargetingData();
					targetingData.getTargetPeople().add(targetUser.getUserExtID());
				}
			}
		} else {
			TargetingData targetingData = auditEvent.getTargetingData();
			for (MentionHelper.MentionRecord usr : comment.getRecentMentionedPeople()) {
				targetingData.getTargetPeople().add(usr.getExtid());
			}
		}

		if(impersonator!=null)
			auditEvent.setImpersonatedByExtID(impersonator.getUserExtID());
		
		try {
			Events.invokeAsync(auditEvent);
		} catch (FatalEventException fee) {
			fee.printStackTrace();
		}
	}

	// community.calendar.event.entry.comment.created
	public void eventCommentCreated(DBCalendar calendar, DBEvent event, DBEventInstance inst, DBEventComment comment, DBUser user, DBUser impersonator) {
		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.CREATE, EVENT_COMMENT_CREATED, false)) {
			Event auditEvent = createEvent(EVENT_COMMENT_CREATED, Type.CREATE);
			fireEventCommentEvent(calendar, event, inst, comment, user, auditEvent, false, false, impersonator);
		}

		List<MentionHelper.MentionRecord> mentioned = comment.getRecentMentionedPeople();
		for (Iterator<MentionHelper.MentionRecord> iter = mentioned.iterator(); iter.hasNext();) {
			MentionHelper.MentionRecord t = iter.next();
			if (!t.hasPermission())
				iter.remove();
		}
		logger.finest("mentioned people in comment: " + mentioned.size());
		if (mentioned.size() > 0) {
			if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.NOTIFY, EVENT_COMMENT_MENTIONED, false)) {
				Event auditEvent = createEvent(EVENT_COMMENT_MENTIONED, Type.NOTIFY);
				fireEventCommentEvent(calendar, event, inst, comment, user, auditEvent, false, true, impersonator);
			}
		}
	}

	// community.calendar.event.entry.comment.deleted
	public void eventCommentDeleted(DBCalendar calendar, DBEvent event, DBEventInstance inst, DBEventComment comment, DBUser user) {
		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.DELETE, EVENT_COMMENT_DELETED, false)) {
			Event auditEvent = createEvent(EVENT_COMMENT_DELETED, Type.DELETE);
			fireEventCommentEvent(calendar, event, inst, comment, user, auditEvent, true, false, null);
		}
	}

	public void eventFollowed(DBCalendar calendar, DBEvent event, DBUser user, int type, DBUser impersonator) {
		String eventName = event.getIsRecurrence() ? EVENT_SERIES_FOLLOWED : EVENT_SINGLE_FOLLOWED;
		if (DBEventFollowingRecord.ATTEND == type) {
			eventName = event.getIsRecurrence() ? EVENT_SERIES_RSVPED : EVENT_SINGLE_RSVPED;
		}

		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.CREATE, eventName, false)) {
			Event auditEvent = createEvent(eventName, Type.CREATE);

			auditEvent.setActor(getPersonFromDBUser(user));
			auditEvent.setContainerDetails(getContainerFromDBCalendar(calendar));
			auditEvent.setItemDetails(getItemFromDBEvent(calendar, event));
			auditEvent.setRelatedCommunity(calendar.getCommunity_UUID());
			if(impersonator != null){
				auditEvent.setImpersonatedByExtID(impersonator.getUserExtID());
			}

			DBUser targetUser = UserUtilities.findUserById(event.getCreatedBy());
			if (Utilities.checkAccess(targetUser, calendar)) {
				TargetingData targetingData = auditEvent.getTargetingData();
				targetingData.getTargetPeople().add(targetUser.getUserExtID());
			}

			try {
				Events.invokeAsync(auditEvent);
			} catch (FatalEventException fee) {
				fee.printStackTrace();
			}
		}
	}

	public void eventUnfollowed(DBCalendar calendar, DBEvent event, DBUser user, int type) {
		String eventName = event.getIsRecurrence() ? EVENT_SERIES_UNFOLLOWED : EVENT_SINGLE_UNFOLLOWED;
		if (DBEventFollowingRecord.ATTEND == type) {
			eventName = event.getIsRecurrence() ? EVENT_SERIES_UNRSVPED : EVENT_SINGLE_UNRSVPED;
		}

		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.CREATE, eventName, false)) {
			Event auditEvent = createEvent(eventName, Type.CREATE);

			auditEvent.setActor(getPersonFromDBUser(user));
			auditEvent.setContainerDetails(getContainerFromDBCalendar(calendar));
			auditEvent.setItemDetails(getItemFromDBEvent(calendar, event));
			auditEvent.setRelatedCommunity(calendar.getCommunity_UUID());

			DBUser targetUser = UserUtilities.findUserById(event.getCreatedBy());
			if (Utilities.checkAccess(targetUser, calendar)) {
				TargetingData targetingData = auditEvent.getTargetingData();
				targetingData.getTargetPeople().add(targetUser.getUserExtID());
			}

			try {
				Events.invokeAsync(auditEvent);
			} catch (FatalEventException fee) {
				fee.printStackTrace();
			}
		}
	}

	public void eventFollowed(DBCalendar calendar, DBEvent event, DBEventInstance inst, DBUser user, int type, DBUser impersonator) {
		String eventName = event.getIsRecurrence() ? EVENT_INSTANCE_FOLLOWED : EVENT_SINGLE_FOLLOWED;
		if (DBEventFollowingRecord.ATTEND == type) {
			eventName = event.getIsRecurrence() ? EVENT_INSTANCE_RSVPED : EVENT_SINGLE_RSVPED;
		}
		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.CREATE, eventName, false)) {
			Event auditEvent = createEvent(eventName, Type.CREATE);

			auditEvent.setActor(getPersonFromDBUser(user));
			auditEvent.setContainerDetails(getContainerFromDBCalendar(calendar));
			auditEvent.setItemDetails(getItemFromDBEventInstance(calendar, event, inst));
			
			Map<String, String> properties = new HashMap<String, String>();
			properties.put("eventUuid", event.getEvent_UUID());
			auditEvent.setProperties(properties);
			
			auditEvent.setRelatedCommunity(calendar.getCommunity_UUID());
			if(impersonator != null){
				auditEvent.setImpersonatedByExtID(impersonator.getUserExtID());
			}
			DBUser targetUser = UserUtilities.findUserById(event.getCreatedBy());
			if (Utilities.checkAccess(targetUser, calendar)) {
				TargetingData targetingData = auditEvent.getTargetingData();
				targetingData.getTargetPeople().add(targetUser.getUserExtID());
			}

			try {
				Events.invokeAsync(auditEvent);
			} catch (FatalEventException fee) {
				fee.printStackTrace();
			}
		}
	}

	public void eventUnfollowed(DBCalendar calendar, DBEvent event, DBEventInstance inst, DBUser user, int type) {
		String eventName = event.getIsRecurrence() ? EVENT_INSTANCE_UNFOLLOWED : EVENT_SINGLE_UNFOLLOWED;
		if (DBEventFollowingRecord.ATTEND == type) {
			eventName = event.getIsRecurrence() ? EVENT_INSTANCE_UNRSVPED : EVENT_SINGLE_UNRSVPED;
		}
		if (CalendarEvents.isEventRequired(InvocationPoint.ASYNC, Source.COMMUNITIES, Type.CREATE, eventName, false)) {
			Event auditEvent = createEvent(eventName, Type.CREATE);

			auditEvent.setActor(getPersonFromDBUser(user));
			auditEvent.setContainerDetails(getContainerFromDBCalendar(calendar));
			auditEvent.setItemDetails(getItemFromDBEventInstance(calendar, event, inst));

			Map<String, String> properties = new HashMap<String, String>();
			properties.put("eventUuid", event.getEvent_UUID());
			auditEvent.setProperties(properties);
			
			auditEvent.setRelatedCommunity(calendar.getCommunity_UUID());

			DBUser targetUser = UserUtilities.findUserById(event.getCreatedBy());
			if (Utilities.checkAccess(targetUser, calendar)) {
				TargetingData targetingData = auditEvent.getTargetingData();
				targetingData.getTargetPeople().add(targetUser.getUserExtID());
			}

			try {
				Events.invokeAsync(auditEvent);
			} catch (FatalEventException fee) {
				fee.printStackTrace();
			}
		}
	}

	// /////////////////////////////////////////////////////
	private static Map<String, String> getCalendarProperties(DBCalendar calendar) {
		Map<String, String> properties = new HashMap<String, String>();
		properties.put("calendar.visibility", calendar.getVisibility().toString());
		properties.put("calendar.member.roleMapping", calendar.getMembers_Role().intValue() == CalendarRole.AUTHOR ? MEMBERSHIP_AUTHOR : MEMBERSHIP_READER);
		return properties;
	}

	private static String getSingleEventDescription(DBEvent event) {
		String desp = "";
		DBEventInstance inst = null;
		DBEventInfo info = null;
		if (event.getEventInstances() != null && event.getEventInstances().size() > 0)
			inst = event.getEventInstances().get(0);
		if (inst != null)
			info = inst.getEventInfo();
		if (info == null)
			info = event.getEventInfo();
		if (info != null)
			desp = info.getDescriptionForAS();
		return desp;
	}

	private static String getSeriesEventDescription(DBEvent event) {
		String desp = "";
		DBEventInfo info = event.getEventInfo();
		if (info != null)
			desp = info.getDescriptionForAS();
		return desp;
	}

	private static String getEventInstanceDescription(DBEventInstance instance) {
		String desp = "";
		DBEventInfo info = instance.getEventInfo();
		if (info == null)
			info = instance.getEvent().getEventInfo();
		if (info != null)
			desp = info.getDescriptionForAS();
		return desp;
	}

	private static Map<String, String> getSingleEventProperties(DBEvent event) {
		Map<String, String> properties = new HashMap<String, String>();
		DBEventInstance inst = null;
		DBEventInfo info = null;
		if (event.getEventInstances() != null && event.getEventInstances().size() > 0)
			inst = event.getEventInstances().get(0);
		if (inst != null) {
			properties.put("event.startDate", AtomDate.valueOf(inst.getStartDate()).toString());
			properties.put("event.endDate", AtomDate.valueOf(inst.getEndDate()).toString());
			info = inst.getEventInfo();
		}
		if (info == null)
			info = event.getEventInfo();
		if (info != null) {
			properties.put("event.imageUrl", info.getImageUrl());
			properties.put("event.location", info.getLocation());
			properties.put("event.allday", info.getIsAllDay() != null ? info.getIsAllDay().toString() : "false");
		}
		return properties;
	}

	private Map<String, String> getSeriesEventProperties(DBEvent event) {
		Map<String, String> properties = new HashMap<String, String>();
		DBEventInfo info = event.getEventInfo();
		if (info != null) {
			properties.put("event.imageUrl", info.getImageUrl());
			properties.put("event.location", info.getLocation());
			properties.put("event.allday", info.getIsAllDay() != null ? info.getIsAllDay().toString() : "false");
		}
		DBRecurrence rec = event.getRecurrence();
		if (rec != null) {
			properties.put("event.startDate", AtomDate.valueOf(rec.getStartDate()).toString());
			properties.put("event.endDate", AtomDate.valueOf(rec.getEndDate()).toString());

			properties.put("event.series.frequency", rec.getFrequencyName());
			if (rec.getFrequencyCode() == FrequencyCode.WEEKLY) {
				properties.put("event.series.interval", rec.getInterval().toString());
			}

			Integer byDay = rec.getByDay();
			if (byDay != null) {
				if(rec.getFrequencyCode().equals(FrequencyCode.MONTHLY)){
					if(Utilities.isRepeatByDate(rec.getByDay())){
						
						properties.put("event.series.bydate",String.valueOf(Utilities.getNthDayInMonth(rec.getByDay())));
					} else {
						properties.put("event.series.bydayofweek",Utilities.getNthWeekOfMonth(rec.getByDay()) + "," + Utilities.formatDayOfWeek(Utilities.getNthDayOfWeek(rec.getByDay())));
					}
				} else {
					String t = "";
					for (int i = 0; i < 7; i++) {
						if (((byDay >> i) & 1) == 1) {
							t = t + i + ",";
						}
					}
					if (t.length() > 0) {
						t = t.substring(0, t.length() - 1);
					}
					properties.put("event.series.byday", t);
				}
			}

			properties.put("event.series.untilDate", AtomDate.valueOf(rec.getUntilRule()).toString());
		}
		return properties;
	}

	private Map<String, String> getEventInstanceProperties(DBCalendar calendar, DBEventInstance instance) {
		Map<String, String> properties = new HashMap<String, String>();
		DBEvent event = instance.getEvent();
		if (event != null) {
			properties.put("parent.event.id", event.getEvent_UUID());
			properties.put("parent.event.link", getEventHtmlUrl(calendar, event));
		}

		DBEventInfo info = event!=null?event.getEventInfo():null;
		if (info!=null&&instance.getEventInfo() != null) {
			info.update(instance.getEventInfo());
			properties.put("event.imageUrl", info.getImageUrl());
			properties.put("event.location", info.getLocation());
			properties.put("event.allday", info.getIsAllDay() != null ? info.getIsAllDay().toString() : "false");
			properties.put("event.startDate", AtomDate.valueOf(instance.getStartDate()).toString());
			properties.put("event.endDate", AtomDate.valueOf(instance.getEndDate()).toString());
		}
		return properties;
	}

	private static String getCalendarHtmlUrl(DBCalendar calendar) {
		String commHtmlUrl = "/service/html/communityview?communityUuid=" + calendar.getCommunity_UUID();
		return commHtmlUrl + "#fullpageWidgetId=" + calendar.getWidgetId();
	}

	private static String getCalendarAtomUrl(DBCalendar calendar) {
		return "/calendar/atom/calendar?calendarUuid=" + calendar.getCalendar_UUID();
	}

	private static String getEventAtomUrl(DBEvent event) {
		return "/calendar/atom/calendar/event/?eventUuid=" + event.getEvent_UUID();
	}

	private static String getEventHtmlUrl(DBCalendar calendar, DBEvent event) {
		return getCalendarHtmlUrl(calendar) + "&eventUuid=" + event.getEvent_UUID();
	}

	private static String getInstanceAtomUrl(DBEventInstance instance) {
		return "/calendar/atom/calendar/event/?eventInstUuid=" + instance.getEventInst_UUID();
	}

	private static String getInstanceHtmlUrl(DBCalendar calendar, DBEventInstance instance) {
		return getCalendarHtmlUrl(calendar) + "&eventInstUuid=" + instance.getEventInst_UUID();
	}

	private static String getCommentAtomUrl(DBEventComment comment) {
		return "/calendar/atom/calendar/event/comment?commentUuid=" + comment.getComment_UUID();
	}

	private static String getCommentHtmlUrl(DBCalendar calendar, DBEventComment comment) {
		return getCalendarHtmlUrl(calendar) + "&eventInstUuid=" + comment.getEventInst_UUID();
	}

	public static ItemDetails getItemFromDBEventInstance(DBCalendar calendar, DBEvent event, DBEventInstance instance) {
		String atomUrl = getInstanceAtomUrl(instance);
		String htmlUrl = getInstanceHtmlUrl(calendar, instance);
		String name = EVENT_NAME_NULL;
		if (event.getEventInfo() != null)
			name = event.getEventInfo().getName();

		ItemDetails item = DefaultEventFactory.createInternalItemDetails(instance.getEventInst_UUID(), name, htmlUrl, atomUrl);

		if (item instanceof ItemDetails35) {
			ItemDetails35 item35 = (ItemDetails35) item;
			item35.setTags(event.getTagNames());
			item35.setNumberComments(instance.getCommentsCount());
			item35.setScope(Scope.COMMUNITY);
			item35.setLastUpdate(event.getModifiedOn());

			Set<String> authorPeople = new HashSet<String>();
			authorPeople.add(UserUtilities.findUserById(event.getCreatedBy()).getUserExtID());
			item35.setAuthorPeople(authorPeople);

			if (instance.getEvent() == null) {
				instance.setEvent(event);
			}
			item35.setContent(getEventInstanceDescription(instance), ContentType.HTML);
			
			// mention data
			if(instance.getEventInfo() != null) {
				List<String> mentionedPeople = new ArrayList<String>();
				for(MentionHelper.MentionRecord usr : instance.getEventInfo().getRecentMentionedPeople()) {
					mentionedPeople.add(usr.getExtid());
				}
				item35.setMentionedPeople(mentionedPeople);
			}
		}

		return item;
	}

	public static ItemDetails getItemFromDBEvent(DBCalendar calendar, DBEvent event) {
		String atomUrl = getEventAtomUrl(event);
		String htmlUrl = getEventHtmlUrl(calendar, event);
		String name = EVENT_NAME_NULL;
		if (event.getEventInfo() != null)
			name = event.getEventInfo().getName();

		ItemDetails item = DefaultEventFactory.createInternalItemDetails(event.getEvent_UUID(), name, htmlUrl, atomUrl);

		if (item instanceof ItemDetails35) {
			ItemDetails35 item35 = (ItemDetails35) item;
			item35.setTags(event.getTagNames());
			item35.setNumberComments(0);
			item35.setScope(Scope.COMMUNITY);
			item35.setLastUpdate(event.getModifiedOn());

			Set<String> authorPeople = new HashSet<String>();
			authorPeople.add(UserUtilities.findUserById(event.getCreatedBy()).getUserExtID());
			item35.setAuthorPeople(authorPeople);

			if (event.getIsRecurrence()) {
				item35.setContent(getSeriesEventDescription(event), ContentType.HTML);
			} else {
				item35.setContent(getSingleEventDescription(event), ContentType.HTML);
			}
			
			// mention data
			List<String> mentionedPeople = new ArrayList<String>();
			for(MentionHelper.MentionRecord usr : event.getEventInfo().getRecentMentionedPeople()) {
				mentionedPeople.add(usr.getExtid());
			}
			item35.setMentionedPeople(mentionedPeople);
		}

		return item;
	}

	public static ItemDetails getItemFromDBEventComment(DBEventComment comment, DBEvent event, DBCalendar calendar) {
		String atomUrl = getCommentAtomUrl(comment);
		String htmlUrl = getCommentHtmlUrl(calendar, comment);
		String name = "RE: " + event.getEventInfo().getName();
		ItemDetails item = DefaultEventFactory.createInternalItemDetails(comment.getComment_UUID(), name, htmlUrl, atomUrl);

		if (item instanceof ItemDetails35) {
			ItemDetails35 item35 = (ItemDetails35) item;
			item35.setScope(Scope.COMMUNITY);
			item35.setLastUpdate(comment.getCreateOn());

			Set<String> authorPeople = new HashSet<String>();
			authorPeople.add(UserUtilities.findUserById(comment.getCreatedBy()).getUserExtID());
			item35.setAuthorPeople(authorPeople);

			item35.setContent(comment.getRenderedContentForAS(), ContentType.HTML);

			// mention data
			List<String> mentionedPeople = new ArrayList<String>();
			for (MentionHelper.MentionRecord usr : comment.getRecentMentionedPeople()) {
				mentionedPeople.add(usr.getExtid());
			}
			item35.setMentionedPeople(mentionedPeople);
		}

		return item;
	}

	public static ContainerDetails getContainerFromDBCalendar(DBCalendar calendar) {
		return getContainerFromDBCalendar(calendar, null);
	}

	public static ContainerDetails getContainerFromDBCalendar(DBCalendar calendar, DBEvent event) {
		String calendarHtmlUrl = null;
		calendarHtmlUrl = (event == null ? getCalendarHtmlUrl(calendar) : getEventHtmlUrl(calendar, event));
		ContainerDetails containerDetail = DefaultEventFactory.createContainerDetails(calendar.getCalendar_UUID(), calendar.getCommunityName(), calendarHtmlUrl);
		containerDetail.setOwningOrganization(DefaultEventFactory.createOrganizationByID(calendar.getExternalOrgId()));
		containerDetail.setAtomPath(getCalendarAtomUrl(calendar));
		return containerDetail;
	}
	
	public static Person getPersonFromDBUser(DBUser user) {
		return DefaultEventFactory.createPerson(user.getUserExtID(), user.getUserName(), user.getUserEmail());
	}
}
