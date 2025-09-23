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

package com.ibm.lconn.calendar.atom;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.sql.Timestamp;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.abdera.i18n.iri.IRISyntaxException;
import org.apache.abdera.model.AtomDate;
import org.apache.abdera.model.Categories;
import org.apache.abdera.model.Category;
import org.apache.abdera.model.Collection;
import org.apache.abdera.model.Content.Type;
import org.apache.abdera.model.Element;
import org.apache.abdera.model.Entry;
import org.apache.abdera.model.Feed;
import org.apache.abdera.model.Generator;
import org.apache.abdera.model.Person;
import org.apache.abdera.model.Service;
import org.apache.abdera.model.Source;
import org.apache.abdera.model.Workspace;
import org.apache.commons.lang.StringUtils;

import com.ibm.icu.util.Calendar;
import com.ibm.icu.util.TimeZone;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventComment;
import com.ibm.lconn.calendar.db.model.DBEventFollowingRecord;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBRecurrence;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.BadAtomEntryException;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.servlet.PermissionHelper;
import com.ibm.lconn.calendar.util.CalendarOperation;
import com.ibm.lconn.calendar.util.CalendarRole;
import com.ibm.lconn.calendar.util.FrequencyCode;
import com.ibm.lconn.calendar.util.MentionHelper;
import com.ibm.lconn.calendar.util.ResourceMessageUtils;
import com.ibm.lconn.calendar.util.RuntimeConfiguration;
import com.ibm.lconn.calendar.util.Utilities;
import com.ibm.lconn.core.util.Build;
import com.ibm.lconn.calendar.db.CalendarService;

public class AtomGenerator implements AtomConstants {
	private static final String CLASS_NAME = AtomGenerator.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	protected static PermissionHelper permissionHelper = null;

	static {
		try {
			permissionHelper = new PermissionHelper();
		} catch (DSProviderException e) {
		}
	}
	
	public AtomGenerator() {
	}

	public final void declareConnectionsNS(Element element) {
		element.declareNS(NS_CONNECTIONS_ATOM_EXT, NS_NAME_CONNECTIONS);
		element.declareNS(NS_ATOM, NS_NAME_ATOM);
		element.declareNS(NS_THREADING_EXT, NS_NAME_THREADING);
	}

	public final Service newAtomService(DBCalendar calendar, HttpServletRequest request) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "newAtomService", new Object[] { calendar, request });
		}
		
		boolean isSecure = request.isSecure();
		boolean isFBA = Utilities.isFBARequest(request);
		String  calendarUUID = calendar.getCalendar_UUID();

		Service service = factory.newService();
		service.addExtension(newAtomGeneratorElement());
		
		// calendars workspace
		{
			Workspace workspace = factory.newWorkspace();
			workspace.setTitle(ResourceMessageUtils.uiMessage("api.svcdoc.workspaces.calendar.title", request.getLocale()));
			
			{
				Collection collection = factory.newCollection();
				collection.setHref(Utilities.getCalendarAtomSvcURL(isSecure, isFBA, calendarUUID));
				collection.setTitle(ResourceMessageUtils.uiMessage("api.svcdoc.collections.calendar.title", request.getLocale()));
				collection.setAccept("application/atom+xml;type=entry");
				
				Category category = factory.newCategory();
				category.setScheme("http://www.ibm.com/xmlns/prod/sn/collection");
				category.setTerm("calendars");
				collection.addExtension(category);
				
				Categories categories = factory.newCategories();
				categories.setFixed(true);
				collection.addCategories(categories);
				
				workspace.addCollection(collection);
			}
			
			service.addWorkspace(workspace);
		}
		
		// events/comments/etc workspace
		{
			Workspace workspace = factory.newWorkspace();
			workspace.setTitle(calendar.getCommunityName());
			
			{
				Category category = factory.newCategory();
				category.setScheme("http://www.ibm.com/xmlns/prod/sn/workspace");
				category.setTerm("calendar");
				workspace.addExtension(category);
			}
			
			// event collection
			{
				Collection collection = newEventFeedCollection(null, calendarUUID, request);
				workspace.addCollection(collection);
			}
			
			service.addWorkspace(workspace);
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "newAtomService", service);
		}

		return service;
	}
	
	public Entry newAtomCalendarEntry(DBCalendar calendar, DBUser user, HttpServletRequest request) throws DSProviderException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "newAtomCalendarEntry", new Object[] {calendar, request});
		}
		
		boolean isSecure = request.isSecure();
		boolean isFBA = Utilities.isFBARequest(request); 
		
		Entry entry = factory.newEntry();
		declareConnectionsNS(entry);
		
		entry.setId(ID_CALENDAR_PREFIX + calendar.getCalendar_UUID());
		entry.setTitle(StringUtils.trim(calendar.getCommunityName()));
		entry.addAuthor(getPersonFromDBUser(user, true));
		entry.setPublished(calendar.getCreatedOn());
		entry.setUpdated(calendar.getAclModtime());
		entry.setEdited(calendar.getAclModtime());
		
		Category cat = factory.newCategory();
		cat.setScheme(CATEGORY_SCHEME_TYPE);
		cat.setAttributeValue(CALENDAR_ENTRY_ATTRIBUTE_TERM, "calendar");
		entry.addCategory(cat);
		
		entry.addLink(Utilities.getCalendarAtomSvcURL(isSecure, isFBA, calendar.getCalendar_UUID()), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
		if(permissionHelper.isUserOwnerOf(request, calendar)) {
			entry.addLink(Utilities.getCalendarAtomSvcURL(isSecure, isFBA, calendar.getCalendar_UUID()), LINK_REL_EDIT).setMimeType(MIME_ATOM_XML);
		}
		entry.addLink(Utilities.getCalendarHtmlURL(isSecure, calendar, null), LINK_REL_ALTERNATE).setMimeType(MIME_TEXT_HTML);
		
		Element rolemappingElem = factory.newElement(QN_CONNECTIONS_MAPROLE, entry);
		rolemappingElem.setAttributeValue("membership", "member");
		rolemappingElem.setText(calendar.getMembers_Role().equals(CalendarRole.AUTHOR) ? "author" : "reader");
		
		Element allCommentElem = factory.newElement(QN_CONNECTIONS_ALLOWCOMMENT, entry);
		allCommentElem.setText(RuntimeConfiguration.getBooleanValue("allowCommentsFromNonCommunityMember") ? "all" : "member");
		
		// community relationship
		{
			String communityUuid = calendar.getCalendar_UUID(); // for current implement, community id == calendar id, always
			String communityUrl = Utilities.getVenturaAppUrl("communities", isSecure) + "/service/atom/community/instance?communityUuid=" + communityUuid;
			addCommunityRelationshipElements(entry, communityUuid, communityUrl);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "newAtomCalendarEntry", new Object[] {entry});
		}
		
		return entry;
	}
	
	public final Feed newAtomEventFeed(String uri, HttpServletRequest request) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "newAtomEventFeed", new Object[] { uri, request });
		}
		
		Feed feed = factory.newFeed();
		declareConnectionsNS(feed);

		feed.setId(uri);
		feed.addExtension(newAtomGeneratorElement());
		feed.setUpdated(new Date());
		
		// self link
		feed.addLink(uri, LINK_REL_SELF).setMimeType(MIME_ATOM_XML);

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "newAtomEventFeed", feed);
		}
		
		return feed;
	}

	public final Feed newAtomEventFeed(DBCalendar calendar, Date viewStart, Date viewEnd, DBUser user, List<String> tags, String type, int page, int pageSize, int totalCount, HttpServletRequest request) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "newAtomEventFeed", new Object[] { calendar, viewStart, viewEnd, user, tags, type, page, pageSize, totalCount, request });
		}
		
		boolean isSecure = request.isSecure();
		boolean isFBA = Utilities.isFBARequest(request);
		boolean isAnonymous = isAnonymous(request);
		String lang = getLang(request);
		
		Feed feed = factory.newFeed();
		declareConnectionsNS(feed);
		feed.addExtension(newAtomGeneratorElement());
		
		if(calendar != null) {
			// community relationship
			{
				String communityUuid = calendar.getCommunity_UUID();
				String communityUrl = Utilities.getVenturaAppUrl("communities", isSecure) + "/service/atom/community/instance?communityUuid=" + communityUuid;
				addCommunityRelationshipElements(feed, communityUuid, communityUrl);
			}
			
			feed.setId(ID_EVENTS_PREFIX + calendar.getCalendar_UUID());
			
			{
				String title = calendar.getCommunityName() + " - " + ResourceMessageUtils.uiMessage("api.collections.communityevents.title", request.getLocale());
				if(tags != null) {
					title = title + " (" + ResourceMessageUtils.uiMessage("label.tags", request.getLocale()) + " " + StringUtils.join(tags, " ") + ")";
				}
				feed.setTitle(StringUtils.trim(title));
			}
	
			feed.setUpdated(calendar.getLastModified());
		} else if(user != null){
			feed.setId(ID_EVENTS_PREFIX + "user-" + user.getUserExtID());
			
			{
				String title = user.getUserName() + " - " + ResourceMessageUtils.uiMessage("api.collections.communityevents.title", request.getLocale());
				if(tags != null) {
					title = title + " (" + ResourceMessageUtils.uiMessage("label.tags", request.getLocale()) + " " + StringUtils.join(tags, " ") + ")";
				}
				feed.setTitle(StringUtils.trim(title));
			}
			
			feed.setUpdated(new Date());
		}
		
		// links
		{
			String calendarUuid = null;
			if(calendar != null) {
				calendarUuid = calendar.getCalendar_UUID();
			}
			
			Map<String, String> params = new HashMap<String, String>();
			if(viewStart != null) {
				params.put("startDate", AtomDate.valueOf(viewStart).getValue());
			} 
			if(viewEnd != null) {
				params.put("endDate", AtomDate.valueOf(viewEnd).getValue());
			}
			if(tags != null) 
				params.put("tags", Utilities.encodeURIComponent(StringUtils.join(tags, " ")));
			if(pageSize > 0) 
				params.put("ps", Integer.toString(pageSize));
			if(user != null) 
				params.put("userid", user.getUserExtID());
			if(type != null) 
				params.put("type", type);
			if(isAnonymous) 
				params.put("anonymous", "true");
			if(lang != null) 
				params.put("lang", lang);
			
			// self link
			{
				if(page > 0) 
					params.put("page", Integer.toString(page));
				feed.addLink(Utilities.getEventAtomSvcURL(isSecure, isFBA, calendarUuid, null, params), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
			}
			
			// previous link
			if(page > 1 && pageSize > 0) {
				params.put("page", Integer.toString(page - 1));
				feed.addLink(Utilities.getEventAtomSvcURL(isSecure, isFBA, calendarUuid, null, params), LINK_REL_PAGE_PREVIOUS).setMimeType(MIME_ATOM_XML);
			}
			
			// next link
			if(page > 0 && pageSize > 0 && totalCount > 0 && page * pageSize < totalCount) {
				params.put("page", Integer.toString(page + 1));
				feed.addLink(Utilities.getEventAtomSvcURL(isSecure, isFBA, calendarUuid, null, params), LINK_REL_PAGE_NEXT).setMimeType(MIME_ATOM_XML);
			}
			
			// html alternative
			if(calendar != null) {
				if(page > 0) 
					params.put("page", Integer.toString(page));
				params.put("calendarUuid", calendarUuid);
				feed.addLink(Utilities.getCalendarHtmlURL(isSecure, calendar, params), LINK_REL_ALTERNATE).setMimeType(MIME_TEXT_HTML);
			}
		}
		
		if(totalCount >= 0) {
			newOpenSearchTotalResults(feed, totalCount);
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "newAtomEventFeed", feed);
		}
		return feed;
	}
	
	public final Feed newAtomEventFeed(DBUser user, Date viewStart, int page, int pageSize, int totalCount, HttpServletRequest request, int type) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "newAtomEventFeed", new Object[] { user, viewStart, page, pageSize, totalCount, request });
		}
		
		boolean isSecure = request.isSecure();
		boolean isFBA = Utilities.isFBARequest(request);
		String lang = getLang(request);
		
		Feed feed = factory.newFeed();
		declareConnectionsNS(feed);
		feed.addExtension(newAtomGeneratorElement());
		
		if(DBEventFollowingRecord.FOLLOW == type) {
			feed.setId(ID_FOLLOWED_PREFIX + "user-" + user.getUserExtID());
		} else if (DBEventFollowingRecord.ATTEND == type ) {
			feed.setId(ID_ATTENDED_PREFIX + "user-" + user.getUserExtID());
		} else if (0x10 == type ) {
			feed.setId(ID_FOLLOWED_ATTENDED_PREFIX + "user-" + user.getUserExtID());
		}
		
		{
			String title = "";
			if (DBEventFollowingRecord.FOLLOW == type ) {
				title = user.getUserName() + " - " + ResourceMessageUtils.uiMessage("api.collections.eventinstances.followed.title", request.getLocale());
			} else if (DBEventFollowingRecord.ATTEND == type ) {
				title = user.getUserName() + " - " + ResourceMessageUtils.uiMessage("api.collections.eventinstances.rsvped.title", request.getLocale());
			} else if (0x10 == type) {
				title = user.getUserName() + " - " + ResourceMessageUtils.uiMessage("api.collections.eventinstances.followedandrsvped.title", request.getLocale());
			}
			feed.setTitle(StringUtils.trim(title));
		}
		
		feed.setUpdated(new Date());
		
		// links
		{	
			Map<String, String> params = new HashMap<String, String>();
			params.put("startDate", AtomDate.valueOf(viewStart).getValue());
			params.put("type", Integer.toString(type));
			
			if(pageSize > 0) 
				params.put("ps", Integer.toString(pageSize));
			if(lang != null) 
				params.put("lang", lang);
			
			// self link
			{
				if(page > 0) 
					params.put("page", Integer.toString(page));
				feed.addLink(Utilities.getAtomSvcURL("follow", isSecure, isFBA, params), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
			}
			
			// previous link
			if(page > 1 && pageSize > 0) {
				params.put("page", Integer.toString(page - 1));
				feed.addLink(Utilities.getAtomSvcURL("follow", isSecure, isFBA, params), LINK_REL_PAGE_PREVIOUS).setMimeType(MIME_ATOM_XML);
			}
			
			// next link
			if(page > 0 && pageSize > 0 && totalCount > 0 && page * pageSize < totalCount) {
				params.put("page", Integer.toString(page + 1));
				feed.addLink(Utilities.getAtomSvcURL("follow", isSecure, isFBA, params), LINK_REL_PAGE_NEXT).setMimeType(MIME_ATOM_XML);
			}
		}
		
		if(totalCount >= 0) {
			newOpenSearchTotalResults(feed, totalCount);
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "newAtomEventFeed", feed);
		}
		return feed;
	}
	
	public final Feed newAtomEventFeed(DBEvent event, Date updated, String mode, HttpServletRequest request) throws DSProviderException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "newAtomEventFeed", new Object[] { event, request });
		}
		
		boolean isSecure = request.isSecure();
		boolean isFBA = Utilities.isFBARequest(request);
		String  eventUuid = event.getEvent_UUID();
		String  calendarUuid = event.getCalendar_UUID();
		boolean isAnonymous = isAnonymous(request);
		String lang = getLang(request);
		
		Feed feed = factory.newFeed();
		declareConnectionsNS(feed);

		feed.setId(ID_EVENT_PREFIX + eventUuid);
		feed.addExtension(newAtomGeneratorElement());
		feed.setTitle(ResourceMessageUtils.uiMessage("api.collections.eventinstances.title", request.getLocale()) + " - " + event.getEventInfo().getName());
		feed.setUpdated(updated);
		
		// community relationship
		{
			String communityUuid = calendarUuid; // for current implement, community id == calendar id, always
			String communityUrl = Utilities.getVenturaAppUrl("communities", isSecure) + "/service/atom/community/instance?communityUuid=" + communityUuid;
			addCommunityRelationshipElements(feed, communityUuid, communityUrl);
		}
		
		// self link
		{
			Map<String, String> params = new HashMap<String, String>();
			if(mode != null) 
				params.put("mode", mode);
			if(isAnonymous) 
				params.put("anonymous", "true");
			if(lang != null) 
				params.put("lang", lang);
			feed.addLink(Utilities.getEventAtomSvcURL(isSecure, isFBA, null, eventUuid, params), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "newAtomEventFeed", feed);
		}
		
		return feed;
	}
	
	public final Feed newAtomEventFeed(DBCalendar calendar, String searchString, int page, int pageSize, int totalCount, HttpServletRequest request) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "newAtomEventFeed", new Object[] { calendar, searchString, page, pageSize, totalCount, request });
		}
		
		boolean isSecure = request.isSecure();
		boolean isFBA = Utilities.isFBARequest(request);
		String lang = getLang(request);
		
		Feed feed = factory.newFeed();
		declareConnectionsNS(feed);
		feed.addExtension(newAtomGeneratorElement());
		
		if(calendar != null) {
			// community relationship
			{
				String communityUuid = calendar.getCommunity_UUID();
				String communityUrl = Utilities.getVenturaAppUrl("communities", isSecure) + "/service/atom/community/instance?communityUuid=" + communityUuid;
				addCommunityRelationshipElements(feed, communityUuid, communityUrl);
			}
			
			feed.setId(ID_CALENDAR_SEARCH_PREFIX + calendar.getCalendar_UUID());
			
			{
				String title = calendar.getCommunityName() + " - " + ResourceMessageUtils.uiMessage("api.collections.communityevents.search.title", request.getLocale());
				feed.setTitle(StringUtils.trim(title));
			}
		} else {
			feed.setId(ID_CALENDAR_SEARCH_PREFIX.substring(0, ID_CALENDAR_SEARCH_PREFIX.length()-1));
			
			{
				String title = ResourceMessageUtils.uiMessage("api.collections.communityevents.search.title", request.getLocale());
				feed.setTitle(StringUtils.trim(title));
			}
		}
		
		feed.setUpdated(new Date());
		
		// links
		{
			Map<String, String> params = new HashMap<String, String>();
			params.put("search", Utilities.encodeURIComponent(searchString));
			if(calendar != null) {
				String calendarUuid = calendar.getCalendar_UUID();
				params.put("calendarUuid", calendarUuid);
			}
			if(lang != null) 
				params.put("lang", lang);
			
			if(pageSize > 0) 
				params.put("ps", Integer.toString(pageSize));
			
			// self link
			{
				if(page > 0) 
					params.put("page", Integer.toString(page));
				feed.addLink(Utilities.getAtomSvcURL("search", isSecure, isFBA, params), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
			}
			
			// previous link
			if(page > 1 && pageSize > 0) {
				params.put("page", Integer.toString(page - 1));
				feed.addLink(Utilities.getAtomSvcURL("search", isSecure, isFBA, params), LINK_REL_PAGE_PREVIOUS).setMimeType(MIME_ATOM_XML);
			}
			
			// next link
			if(page > 0 && pageSize > 0 && totalCount > 0 && page * pageSize < totalCount) {
				params.put("page", Integer.toString(page + 1));
				feed.addLink(Utilities.getAtomSvcURL("search", isSecure, isFBA, params), LINK_REL_PAGE_NEXT).setMimeType(MIME_ATOM_XML);
			}
		}
		
		if(totalCount >= 0) {
			newOpenSearchTotalResults(feed, totalCount);
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "newAtomEventFeed", feed);
		}
		return feed;
	}

	public final Entry newAtomEventEntry(DBEvent event, DBCalendar calendar, Date updated, HttpServletRequest request) throws DSProviderException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "newAtomEventEntryBase", new Object[] { event, request });
		}
		
		boolean isSecure = request.isSecure();
		boolean isFBA = Utilities.isFBARequest(request);
		boolean isAnonymous = isAnonymous(request);
		String lang = getLang(request);
		
		String  eventUuid = event.getEvent_UUID();
		String  calendarUuid = event.getCalendar_UUID();

		Entry entry = factory.newEntry();
		declareConnectionsNS(entry);

		entry.setId(ID_EVENT_PREFIX + event.getEvent_UUID());
		
		Element eventUuidElem = factory.newElement(QN_CONNECTIONS_EVENTUUID, entry);
		eventUuidElem.setText(event.getEvent_UUID());

		boolean minimalMode = "true".equals(request.getParameter("___MINIMAL___"));
		if(!minimalMode) {
			
			entry.setTitle(StringUtils.trim(event.getEventInfo().getName()));
			entry.setPublished(event.getCreatedOn());
			entry.setUpdated(updated);
	
			entry.addAuthor(getPersonFromDBUser(event.getCreatedBy(), true));
			entry.addContributor(getPersonFromDBUser(event.getModifiedBy(), false));
	
			Category cat = factory.newCategory();
			cat.setScheme(CATEGORY_SCHEME_TYPE);
			cat.setAttributeValue(CALENDAR_ENTRY_ATTRIBUTE_TERM, "event");
			entry.addCategory(cat);
			
			Element location = factory.newElement(QN_CONNECTIONS_LOCATION, entry);
			location.setText(StringUtils.trim(event.getEventInfo().getLocation()));
			
			Element allday = factory.newElement(QN_CONNECTIONS_ALLDAY, entry);
			allday.setText(event.getEventInfo().getIsAllDay() ? "1" : "0");
			
			// tags
			Set<String> tags = event.getTagNames();
			for(String tag : tags) {
				Category tagCat = factory.newCategory();
				tagCat.setAttributeValue(CALENDAR_ENTRY_ATTRIBUTE_TERM, StringUtils.trim(tag));
				entry.addCategory(tagCat);
			}
	
			entry.setContentAsHtml(StringUtils.trim(event.getEventInfo().getDescription()));
	
			addRecurrenceTag(event, entry);
	
			// self link
			{
				Map<String, String> params = new HashMap<String, String>();
				params.put("mode", "summary");
				if(isAnonymous) 
					params.put("anonymous", "true");
				if(lang != null) 
					params.put("lang", lang);
				entry.addLink(Utilities.getEventAtomSvcURL(isSecure, isFBA, null, eventUuid, params), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
			}
			
			// edit link
			if(!isAnonymous && permissionHelper.isUserAuthorized(request, calendar, event.getCreatedBy(), CalendarOperation.EDIT) == HttpServletResponse.SC_OK) {
				entry.addLink(Utilities.getEventAtomSvcURL(isSecure, isFBA, null, eventUuid), LINK_REL_EDIT).setMimeType(MIME_ATOM_XML);
			}
			
			DBUser loginUser = permissionHelper.getUser(request);
			
			// attend/follow action link
			if(!isAnonymous && loginUser != null) {
				{
					Map<String, String> params = new HashMap<String, String>();
					params.put("type", "attend");
					params.put("eventUuid", event.getEvent_UUID());
					entry.addLink(Utilities.getAtomSvcURL("follow", isSecure, isFBA, params), LINK_REL_ATTEND).setMimeType(MIME_ATOM_XML);
				}
				{
					Map<String, String> params = new HashMap<String, String>();
					params.put("type", "follow");
					params.put("eventUuid", event.getEvent_UUID());
					entry.addLink(Utilities.getAtomSvcURL("follow", isSecure, isFBA, params), LINK_REL_FOLLOW).setMimeType(MIME_ATOM_XML);
				}
			}
			
			// instance list link
			{
				Map<String, String> params = new HashMap<String, String>();
				params.put("mode", "list");
				if(isAnonymous) 
					params.put("anonymous", "true");
				if(lang != null) 
					params.put("lang", lang);
				entry.addLink(Utilities.getEventAtomSvcURL(isSecure, isFBA, null, event.getEvent_UUID(), params), "http://www.ibm.com/xmlns/prod/sn/calendar/event/instances").setMimeType(MIME_ATOM_XML);
			}
			
			// source
			{
				Source source = factory.newSource(entry);
				source.setId(ID_EVENTS_PREFIX + calendarUuid);
				{
					String title = calendar.getCommunityName() + " - " + ResourceMessageUtils.uiMessage("api.collections.communityevents.title", request.getLocale());
					source.setTitle(title);
				}
				
				{
					Map<String, String> params = new HashMap<String, String>();
					params.put("type", "event");
					if(isAnonymous) 
						params.put("anonymous", "true");
					if(lang != null) 
						params.put("lang", lang);
					source.addLink(Utilities.getEventAtomSvcURL(isSecure, isFBA, calendarUuid, null, params), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
				}
				
				if(!isAnonymous && permissionHelper.isUserAuthorized(request, calendar, null, CalendarOperation.CREATE) == HttpServletResponse.SC_OK) {
					source.addLink(Utilities.getEventAtomSvcURL(isSecure, isFBA, calendarUuid, null), LINK_REL_EDIT).setMimeType(MIME_ATOM_XML);
				}
			}
			
			// community relationship
			{
				String communityUuid = calendarUuid; // for current implement, community id == calendar id, always
				String communityUrl = Utilities.getVenturaAppUrl("communities", isSecure) + "/service/atom/community/instance?communityUuid=" + communityUuid;
				addCommunityRelationshipElements(entry, communityUuid, communityUrl);
			}
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "newAtomEventEntryBase", entry);
		}
		
		return entry;
	}

	public final Entry newAtomEventInstanceEntry(DBEventInstance instance, DBEvent event, DBCalendar calendar, Boolean isShort, HttpServletRequest request) throws BadAtomEntryException, DSProviderException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "newAtomEventInstanceEntry", new Object[] { event, isShort, request });
		}
		
		boolean isSecure = request.isSecure();
		boolean isFBA = Utilities.isFBARequest(request);
		boolean isAnonymous = isAnonymous(request);
		String lang = getLang(request);
		
		Entry entry = factory.newEntry();
		declareConnectionsNS(entry);
		
		entry.setId(ID_EVENT_PREFIX + instance.getEventInst_UUID());
		
		Element eventUuidElem = factory.newElement(QN_CONNECTIONS_EVENTUUID, entry);
		eventUuidElem.setText(event.getEvent_UUID());
		
		Element eventInstUuidElem = factory.newElement(QN_CONNECTIONS_EVENTINSTUUID, entry);
		eventInstUuidElem.setText(instance.getEventInst_UUID());
		
		boolean minimalMode = "true".equals(request.getParameter("___MINIMAL___"));
		if(!minimalMode) {
			
			// prepare event info
			DBEventInfo eventInfo = instance.getEventInfo();
			if(eventInfo == null) {
				eventInfo = new DBEventInfo();
			}
		
			LOGGER.finer("Instance event name: " + (eventInfo.getName() == null ? "<null>" : eventInfo.getName()));
			LOGGER.finer("Default event name: " + (event.getEventInfo().getName() == null ? "<null>" : event.getEventInfo().getName()));
			entry.setTitle(StringUtils.trim(Utilities.coalesce(eventInfo.getName(), event.getEventInfo().getName())));
			entry.setPublished(event.getCreatedOn());
			entry.addAuthor(getPersonFromDBUser(event.getCreatedBy(), true));
			
			if(instance.getModifiedOn() != null) {
				entry.setUpdated(instance.getModifiedOn());
				entry.addContributor(getPersonFromDBUser(instance.getModifiedBy(), false));
			} else {
				entry.setUpdated(event.getModifiedOn());
				entry.addContributor(getPersonFromDBUser(event.getModifiedBy(), false));
			}
	
			Element startDate = factory.newElement(QN_CONNECTIONS_STARTDATE, entry);
			startDate.setText(AtomDate.valueOf(instance.getStartDate()).getValue());
			Element endDate = factory.newElement(QN_CONNECTIONS_ENDDATE, entry);
			endDate.setText(AtomDate.valueOf(instance.getEndDate()).getValue());
	
			Element elRepeats = factory.newElement(QN_CONNECTIONS_REPEATS, entry);
			elRepeats.setText(event.getIsRecurrence() ? "true" : "false");
	
			Category cat = factory.newCategory();
			cat.setScheme(CATEGORY_SCHEME_TYPE);
			cat.setAttributeValue(CALENDAR_ENTRY_ATTRIBUTE_TERM, "event-instance");
			entry.addCategory(cat);
			
			Element location = factory.newElement(QN_CONNECTIONS_LOCATION, entry);
			location.setText(StringUtils.trim(Utilities.coalesce(eventInfo.getLocation(), event.getEventInfo().getLocation())));
	
			Element allday = factory.newElement(QN_CONNECTIONS_ALLDAY, entry);
			allday.setText(Utilities.coalesce(eventInfo.getIsAllDay(), event.getEventInfo().getIsAllDay()) ? "1" : "0");
			
			// tags
			Set<String> tags = event.getTagNames();
			for(String tag : tags) {
				Category tagCat = factory.newCategory();
				tagCat.setAttributeValue(CALENDAR_ENTRY_ATTRIBUTE_TERM, tag);
				entry.addCategory(tagCat);
			}
	
			if (!isShort) {
				// If the full entry is needed: deal with recurrence
				String desc = Utilities.coalesce(eventInfo.getDescription(), event.getEventInfo().getDescription());
				if(desc == null) {
					desc = "";
				}
				entry.setContentAsHtml(StringUtils.trim(desc));
				addRecurrenceTag(event, entry);
			} else {
				// If the shortened entry is needed
				String desc = Utilities.coalesce(eventInfo.getDescription(MentionHelper.PLAIN_TEXT_MENTION_FORMATTER), event.getEventInfo().getDescription(MentionHelper.PLAIN_TEXT_MENTION_FORMATTER));
				if(desc == null) {
					desc = "";
				}
				String s = Utilities.truncateNicely(Utilities.removeHTML(desc), 100, 100, "...");
				entry.setSummaryAsHtml(StringUtils.trim(s));
			}
			
			// self link
			{
				Map<String, String> params = new HashMap<String, String>();
				if(isAnonymous) 
					params.put("anonymous", "true");
				if(lang != null) 
					params.put("lang", lang);
				entry.addLink(Utilities.getEventInstanceAtomSvcURL(isSecure, isFBA, instance.getEventInst_UUID(), params), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
			}
				
			// edit link
			if(!isAnonymous && permissionHelper.isUserAuthorized(request, calendar, event.getCreatedBy(), CalendarOperation.EDIT) == HttpServletResponse.SC_OK) {
				entry.addLink(Utilities.getEventInstanceAtomSvcURL(isSecure, isFBA, instance.getEventInst_UUID()), LINK_REL_EDIT).setMimeType(MIME_ATOM_XML);
			}
			
			// html alternative
			{
				Map<String, String> params = new HashMap<String, String>();
				params.put("eventInstUuid", instance.getEventInst_UUID());
				entry.addLink(Utilities.getCalendarHtmlURL(isSecure, calendar, params), LINK_REL_ALTERNATE).setMimeType(MIME_TEXT_HTML);
			}
			
			// parent event link & id
			{
				Element parentEventElement = factory.newElement(QN_CONNECTIONS_PARENTEVENT, entry);
				parentEventElement.setText(event.getEvent_UUID());
				
				Map<String, String> params = new HashMap<String, String>();
				params.put("mode", "summary");
				if(isAnonymous) 
					params.put("anonymous", "true");
				if(lang != null) 
					params.put("lang", lang);
				entry.addLink(Utilities.getEventAtomSvcURL(isSecure, isFBA, null, event.getEvent_UUID(), params), "http://www.ibm.com/xmlns/prod/sn/calendar/event/parentevent").setMimeType(MIME_ATOM_XML);
			}
			
			DBUser loginUser = permissionHelper.getUser(request);
			
			// attend/follow action link
			if(!isAnonymous && loginUser != null) {
				{
					Map<String, String> params = new HashMap<String, String>();
					params.put("type", "attend");
					params.put("eventInstUuid", instance.getEventInst_UUID());
					entry.addLink(Utilities.getAtomSvcURL("follow", isSecure, isFBA, params), LINK_REL_ATTEND).setMimeType(MIME_ATOM_XML);
				}
				{
					Map<String, String> params = new HashMap<String, String>();
					params.put("type", "follow");
					params.put("eventInstUuid", instance.getEventInst_UUID());
					entry.addLink(Utilities.getAtomSvcURL("follow", isSecure, isFBA, params), LINK_REL_FOLLOW).setMimeType(MIME_ATOM_XML);
				}
				
				CalendarService crud = CalendarServiceFactory.INSTANCE.create();
				
				// following info
				int followed = crud.hasUserFollowedEvent(loginUser, instance, DBEventFollowingRecord.FOLLOW);
				if(!event.getIsRecurrence() && followed == 2) {
					followed = 1;
				}
				Element followedElem = factory.newElement(QN_CONNECTIONS_FOLLOWED, entry);
				followedElem.setText((followed == 1 ? "instance" : (followed == 2 ? "series" : "none")));

				// rsvp info
				int rsvped = crud.hasUserFollowedEvent(loginUser, instance, DBEventFollowingRecord.ATTEND);
				if(!instance.getEvent().getIsRecurrence() && rsvped == 2) {
					rsvped = 1;
				}
				Element rsvpedElem = factory.newElement(QN_CONNECTIONS_ATTENDED, entry);
				rsvpedElem.setText((rsvped == 1 ? "instance" : (rsvped == 2 ? "series" : "none")));
			}
			
			//attendees link
			{
				Map<String, String> params = new HashMap<String, String>();
				if(lang != null) 
					params.put("lang", lang);
				params.put("type", "attend");
				entry.addLink(Utilities.getAttendeeAtomSvcURL(isSecure, isFBA, null, instance.getEventInst_UUID(), null, params), LINK_REL_ATTENDEE).setMimeType(MIME_ATOM_XML);
			}
			
			
			// source
			String calendarUuid = calendar.getCalendar_UUID();
				
			Source source = factory.newSource(entry);
			source.setId(ID_EVENTS_PREFIX + calendarUuid);
			{
				String title = calendar.getCommunityName() + " - " + ResourceMessageUtils.uiMessage("api.collections.communityevents.title", request.getLocale());
				source.setTitle(title);
			}
				
			{
				Map<String, String> params = new HashMap<String, String>();
				if(isAnonymous) 
					params.put("anonymous", "true");
				if(lang != null) 
					params.put("lang", lang);
				source.addLink(Utilities.getEventAtomSvcURL(isSecure, isFBA, calendarUuid, null, params), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
			}
					
			if(!isAnonymous && permissionHelper.isUserAuthorized(request, calendar, null, CalendarOperation.CREATE) == HttpServletResponse.SC_OK) {
				source.addLink(Utilities.getEventAtomSvcURL(isSecure, isFBA, calendarUuid, null), LINK_REL_EDIT).setMimeType(MIME_ATOM_XML);
			}
			
			// community relationship
			{
				String communityUuid = instance.getCalendar_UUID(); // for current implement, community id == calendar id, always
				String communityUrl = Utilities.getVenturaAppUrl("communities", isSecure) + "/service/atom/community/instance?communityUuid=" + communityUuid;
				addCommunityRelationshipElements(entry, communityUuid, communityUrl);
			}
			
			// comment collection
			newCommentFeedCollection(entry, instance.getEventInst_UUID(), request);

		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "newAtomEventInstanceEntry", entry);
		}
		
		return entry;
	}
	
	public Feed newAtomCommentFeed(DBEventInstance inst, DBEvent event, DBCalendar calendar, int page, int pageSize, int totalCount, Timestamp lastUpdated, HttpServletRequest request) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "newAtomCommentFeed", new Object[] {event, request});
		}
		
		boolean isSecure = request.isSecure();
		boolean isFBA = Utilities.isFBARequest(request);
		boolean isAnonymous = isAnonymous(request);
		String lang = getLang(request);
		
		Feed feed = factory.newFeed();
		declareConnectionsNS(feed);
		
		feed.setId(ID_EVENT_COMMENTS_PREFIX + inst.getEventInst_UUID());
		feed.addExtension(newAtomGeneratorElement());
		feed.setTitle(ResourceMessageUtils.uiMessage("api.collections.eventcomments.title", request.getLocale()) + " - " + event.getEventInfo().getName());
		if(lastUpdated != null) {
			feed.setUpdated(lastUpdated);
		} else {
			feed.setUpdated(event.getCreatedOn());
		}
		
		// links
		{
			Map<String, String> params = new HashMap<String, String>();
			if(pageSize > 0) 
				params.put("ps", Integer.toString(pageSize));
			if(isAnonymous) 
				params.put("anonymous", "true");
			if(lang != null) 
				params.put("lang", lang);
			
			// self link
			{
				if(page > 0) {
					params.put("page", Integer.toString(page));
				}
				feed.addLink(Utilities.getCommentAtomSvcURL(isSecure, isFBA, inst.getEventInst_UUID(), null, params), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
			}
			
			// previous link
			if(page > 1 && pageSize > 0) {
				params.put("page", Integer.toString(page - 1));
				feed.addLink(Utilities.getCommentAtomSvcURL(isSecure, isFBA, inst.getEventInst_UUID(), null, params), LINK_REL_PAGE_PREVIOUS).setMimeType(MIME_ATOM_XML);
			}
			
			// next link
			if(page > 0 && pageSize > 0 && page * pageSize < totalCount) {
				params.put("page", Integer.toString(page + 1));
				feed.addLink(Utilities.getCommentAtomSvcURL(isSecure, isFBA, inst.getEventInst_UUID(), null, params), LINK_REL_PAGE_NEXT).setMimeType(MIME_ATOM_XML);
			}
		}
		
		if(totalCount >= 0) {
			newOpenSearchTotalResults(feed, totalCount);
		}
		
		// community relationship
		{
			String communityUuid = calendar.getCalendar_UUID(); // for current implement, community id == calendar id, always
			String communityUrl = Utilities.getVenturaAppUrl("communities", isSecure) + "/service/atom/community/instance?communityUuid=" + communityUuid;
			addCommunityRelationshipElements(feed, communityUuid, communityUrl);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "newAtomCommentFeed", new Object[] {feed});
		}
		
		return feed;
	}

	public Feed newAtomAttendeeFeed(DBEventInstance instance, DBEvent event, DBCalendar calendar, int page, int pageSize, int totalCount, HttpServletRequest request, int typeInt) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "newAtomAttendeeFeed", new Object[] {instance, event, request});
		}
		
		boolean isSecure = request.isSecure();
		boolean isFBA = Utilities.isFBARequest(request);
		String lang = getLang(request);
		
		String type = (typeInt == DBEventFollowingRecord.ATTEND) ? "attend" : "follow";
		
		Feed feed = factory.newFeed();
		declareConnectionsNS(feed);
		
		String feedIdPrefix = (typeInt == DBEventFollowingRecord.ATTEND) ? ID_EVENT_ATTENDEES_PREFIX : ID_EVENT_FOLLOWERS_PREFIX;
		if(instance != null) {
			feed.setId(feedIdPrefix + instance.getEventInst_UUID());
		} else {
			feed.setId(feedIdPrefix + event.getEvent_UUID());
		}
		
		feed.addExtension(newAtomGeneratorElement());
		
		String titleKey = (typeInt == DBEventFollowingRecord.ATTEND) ? "api.collections.eventattendees.title" : "api.collections.eventfollowers.title";
		feed.setTitle(ResourceMessageUtils.uiMessage(titleKey, request.getLocale()) + " - " + event.getEventInfo().getName());
		feed.setUpdated(new Date());
		
		// links
		{
			Map<String, String> params = new HashMap<String, String>();
			if(pageSize > 0) 
				params.put("ps", Integer.toString(pageSize));
			if(lang != null) 
				params.put("lang", lang);
			
			params.put("type", type);
			if(instance != null) {
				params.put("eventInstUuid", instance.getEventInst_UUID());
			} else {
				params.put("eventUuid", event.getEvent_UUID());
			}
			
			// self link
			{
				if(page > 0) {
					params.put("page", Integer.toString(page));
				}
				feed.addLink(Utilities.getAttendeeAtomSvcURL(isSecure, isFBA, null, null, null, params), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
			}
			
			// previous link
			if(page > 1 && pageSize > 0) {
				params.put("page", Integer.toString(page - 1));
				feed.addLink(Utilities.getAttendeeAtomSvcURL(isSecure, isFBA, null, null, null, params), LINK_REL_PAGE_PREVIOUS).setMimeType(MIME_ATOM_XML);
			}
			
			// next link
			if(page > 0 && pageSize > 0 && page * pageSize < totalCount) {
				params.put("page", Integer.toString(page + 1));
				feed.addLink(Utilities.getAttendeeAtomSvcURL(isSecure, isFBA, null, null, null, params), LINK_REL_PAGE_NEXT).setMimeType(MIME_ATOM_XML);
			}
		}
		
		if(totalCount >= 0) {
			newOpenSearchTotalResults(feed, totalCount);
		}
		
		// community relationship
		{
			String communityUuid = calendar.getCalendar_UUID(); // for current implement, community id == calendar id, always
			String communityUrl = Utilities.getVenturaAppUrl("communities", isSecure) + "/service/atom/community/instance?communityUuid=" + communityUuid;
			addCommunityRelationshipElements(feed, communityUuid, communityUrl);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "newAtomCommentFeed", new Object[] {feed});
		}
		
		return feed;
	}
	
	public Entry newAtomCommentEntry(DBEventComment comment, DBEventInstance inst, DBEvent event, DBCalendar calendar, HttpServletRequest request) throws DSProviderException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "newAtomCommentEntry", new Object[] {comment, event, request});
		}
		
		boolean isSecure = request.isSecure();
		boolean isFBA = Utilities.isFBARequest(request); 
		String lang = getLang(request);
		
		DBUser loginUser = permissionHelper.getUser(request);
		
		Entry entry = factory.newEntry();
		declareConnectionsNS(entry);
		
		entry.setId(ID_EVENT_COMMENT_PREFIX + comment.getComment_UUID());
		entry.setTitle(ResourceMessageUtils.uiMessage("comment.re", request.getLocale()) + StringUtils.trim(event.getEventInfo().getName()));
		entry.addAuthor(getPersonFromDBUser(comment.getCreatedBy(), true));
		entry.setPublished(comment.getCreateOn());
		entry.setUpdated(comment.getCreateOn());
		if("html".equals(request.getParameter("contentFormat"))) {
		    entry.setContent(StringUtils.trim(comment.getRenderedContent(DBEventComment.CONTENT_TYPE_HTML)), Type.HTML);
		} else {
			entry.setContent(StringUtils.trim(comment.getRenderedContent(DBEventComment.CONTENT_TYPE_PLAIN_TEXT)), Type.TEXT);
		}
		
		Category cat = factory.newCategory(entry);
		cat.setScheme(CATEGORY_SCHEME_TYPE);
		cat.setAttributeValue(CALENDAR_ENTRY_ATTRIBUTE_TERM, "comment");
		
		{
			Map<String, String> params1 = new ConcurrentHashMap<String, String>();
			if(lang != null) 
				params1.put("lang", lang);
			entry.addLink(Utilities.getCommentAtomSvcURL(isSecure, isFBA, null, comment.getComment_UUID(), params1), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
		}
		
		if(permissionHelper.isUserOwnerOf(request, calendar) || (loginUser != null && loginUser.getUserUUID().equals(comment.getCreatedBy()))) {
			entry.addLink(Utilities.getCommentAtomSvcURL(isSecure, isFBA, null, comment.getComment_UUID()), LINK_REL_EDIT).setMimeType(MIME_ATOM_XML);
		}
			
		String eventInstAtomSvcUrl = null, eventInstHtmlUrl = null;
		{
			Map<String, String> params2 = new ConcurrentHashMap<String, String>();
			if(lang != null) 
				params2.put("lang", lang);
			eventInstAtomSvcUrl = Utilities.getEventInstanceAtomSvcURL(isSecure, isFBA, inst.getEventInst_UUID(), params2);
		}
		{
			Map<String, String> params3 = new ConcurrentHashMap<String, String>();
			params3.put("eventInstUuid", inst.getEventInst_UUID());
			eventInstHtmlUrl = Utilities.getCalendarHtmlURL(isSecure, calendar, params3);;
		}
		
		Element replyto = factory.newElement(QN_THREADING_INREPLYTO, entry);
		replyto.setAttributeValue("ref", ID_EVENT_PREFIX + inst.getEventInst_UUID());
		replyto.setAttributeValue("source", eventInstAtomSvcUrl);
		replyto.setAttributeValue("href", eventInstHtmlUrl);
		replyto.setAttributeValue("type", "text/html");
		
		// source
		{
			Source source = factory.newSource(entry);
			source.setId(ID_EVENT_COMMENTS_PREFIX + inst.getEventInst_UUID());
			source.setTitle(ResourceMessageUtils.uiMessage("api.collections.eventcomments.title", request.getLocale()) + " - " + event.getEventInfo().getName());
			
			{
				Map<String, String> params4 = new ConcurrentHashMap<String, String>();
				if(lang != null) 
					params4.put("lang", lang);
				source.addLink(Utilities.getCommentAtomSvcURL(isSecure, isFBA, inst.getEventInst_UUID(), null), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
			}
			
			if(permissionHelper.getRole(request, calendar.getCommunity_UUID(), calendar.getORG_ID()) != -1) {
				source.addLink(Utilities.getCommentAtomSvcURL(isSecure, isFBA, inst.getEventInst_UUID(), null), LINK_REL_EDIT).setMimeType(MIME_ATOM_XML);
			}
		}
		
		// community relationship
		{
			String communityUuid = calendar.getCalendar_UUID(); // for current implement, community id == calendar id, always
			String communityUrl = Utilities.getVenturaAppUrl("communities", isSecure) + "/service/atom/community/instance?communityUuid=" + communityUuid;
			addCommunityRelationshipElements(entry, communityUuid, communityUrl);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "newAtomCommentEntry", new Object[] {entry});
		}
		
		return entry;
	}

	public Entry newAtomAttendeeEntry(DBEventFollowingRecord attendee, DBEventInstance instance, DBEvent event, DBCalendar calendar, HttpServletRequest request) throws DSProviderException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "newAtomAttendeeEntry", new Object[] {attendee, event, request});
		}
		
		boolean isSecure = request.isSecure();
		boolean isFBA = Utilities.isFBARequest(request); 
		String lang = getLang(request);
		
		String type = (attendee.getFollowType() == DBEventFollowingRecord.ATTEND) ? "attend" : "follow";
		
		DBUser user = permissionHelper.getUserByUUID(attendee.getUserUuid());
		
		Entry entry = factory.newEntry();
		declareConnectionsNS(entry);
		
		String entryIdPrefix = (attendee.getFollowType() == DBEventFollowingRecord.ATTEND) ? ID_EVENT_ATTENDEE_PREFIX : ID_EVENT_FOLLOWER_PREFIX;
		entry.setId(entryIdPrefix + attendee.getUuid());
		
		String title = user.getUserName();
		entry.setTitle(title);
		
		entry.addAuthor(getPersonFromDBUser(attendee.getUserUuid(), true));
		
		int role = permissionHelper.getRole(user, event.getCalendar_UUID());
		if (role == 1) {
			Element roleElement = factory.newElement(QN_CONNECTIONS_USERROLE, entry);
			roleElement.setAttributeValue("component", "http://www.ibm.com/xmlns/prod/sn/communities");
			roleElement.setText("member");
		} else if (role == 2) {
			Element roleElement = factory.newElement(QN_CONNECTIONS_USERROLE, entry);
			roleElement.setAttributeValue("component", "http://www.ibm.com/xmlns/prod/sn/communities");
			roleElement.setText("owner");
		}
		
		Category cat = factory.newCategory(entry);
		cat.setScheme(CATEGORY_SCHEME_TYPE);
		if("attend".equals(type)) {
			cat.setAttributeValue(CALENDAR_ENTRY_ATTRIBUTE_TERM, "attendee");
		} else {
			cat.setAttributeValue(CALENDAR_ENTRY_ATTRIBUTE_TERM, "follower");
		}
		
		{
			Map<String, String> params = new HashMap<String, String>();
			params.put("type", type);
			if(lang != null) 
				params.put("lang", lang);
			entry.addLink(Utilities.getAttendeeAtomSvcURL(isSecure, isFBA, null,null, attendee.getUuid(), params), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
		}
		
		DBUser loginUser = permissionHelper.getUser(request);
		if(loginUser != null && loginUser.getUserUUID() != null && loginUser.getUserUUID().equals(attendee.getUserUuid())) {
			Map<String, String> params = new HashMap<String, String>();
			params.put("type", type);
			if(attendee.getItemType() == DBEventFollowingRecord.EVENT_INSTANCE) {
				params.put("eventInstUuid", instance.getEventInst_UUID());
			} 
			if(attendee.getItemType() == DBEventFollowingRecord.EVENT_SERIES) {
				params.put("eventUuid", event.getEvent_UUID());
			}
			
			if(lang != null) 
				params.put("lang", lang);
			entry.addLink(Utilities.getAtomSvcURL("follow", isSecure, isFBA, params), LINK_REL_EDIT).setMimeType(MIME_ATOM_XML);
		}
		
		// source
		{
			Source source = factory.newSource(entry);
			String sourceIdPrefix = (attendee.getFollowType() == DBEventFollowingRecord.ATTEND) ? ID_EVENT_ATTENDEES_PREFIX : ID_EVENT_FOLLOWERS_PREFIX;
			if(instance != null) {
				source.setId(sourceIdPrefix + instance.getEventInst_UUID());
			} else {
				source.setId(sourceIdPrefix + event.getEvent_UUID());
			}
			
			String sourceTitleKey = (attendee.getFollowType() == DBEventFollowingRecord.ATTEND) ? "api.collections.eventattendees.title" : "api.collections.eventfollowers.title";
			source.setTitle(ResourceMessageUtils.uiMessage(sourceTitleKey, request.getLocale()) + " - " + event.getEventInfo().getName());
			
			{
				Map<String, String> params = new HashMap<String, String>();
				params.put("type", type);
				if(lang != null) 
					params.put("lang", lang);
				if(instance == null) {
					source.addLink(Utilities.getAttendeeAtomSvcURL(isSecure, isFBA, event.getEvent_UUID(), null, null, params), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
				} else {
					source.addLink(Utilities.getAttendeeAtomSvcURL(isSecure, isFBA, null, instance.getEventInst_UUID(), null, params), LINK_REL_SELF).setMimeType(MIME_ATOM_XML);
				}
			}
		}
		
		// community relationship
		{
			String communityUuid = event.getCalendar_UUID(); // for current implement, community id == calendar id, always
			String communityUrl = Utilities.getVenturaAppUrl("communities", isSecure) + "/service/atom/community/instance?communityUuid=" + communityUuid;
			addCommunityRelationshipElements(entry, communityUuid, communityUrl);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "newAtomCommentEntry", new Object[] {entry});
		}
		
		return entry;
	}
	
	private Person getPersonFromDBUser(String userUUID, boolean isAuthor) {
		DBUser user = permissionHelper.getUserByUUID(userUUID);
		return getPersonFromDBUser(user, isAuthor);
	}
	
	private Person getPersonFromDBUser(DBUser user, boolean isAuthor) {
		Person p = null;
		if (isAuthor)
			p = factory.newAuthor();
		else
			p = factory.newContributor();
		if(user != null) {
			Element userIdElement = factory.newElement(QN_CONNECTIONS_USERID, p);
			userIdElement.setText(user.getUserExtID());
			if(Utilities.isEmailExposed()) {
				p.setEmail(user.getUserEmail());
			}
			p.setName(user.getUserName());
			Element userStateElement = factory.newElement(QN_CONNECTIONS_USERSTATE, p);
			userStateElement.setText(user.getUserState() == 0 ? "active" : "inactive");
			
			Element isExternalElement = factory.newElement(QN_CONNECTIONS_ISEXTERNAL, p);
			isExternalElement.setText(user.getIsExternal() == 1 ? "true" : "false");
		} else {
			p.setName("anonymous");
		}
		return p;
	}
	
	private void addRecurrenceTag(DBEvent event, Entry entry) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "addRecurrenceTag", new Object[] { event, entry });
		}
		
		Element recurrenceTag = factory.newExtensionElement(QN_CONNECTIONS_RECURRENCE, entry);
		
		DBRecurrence recurrence = event.getRecurrence();
		if(recurrence == null) {
			recurrenceTag.setAttributeValue(CALENDAR_RECURRENCE_ATTRIBUTE_CUSTOM, "yes");
			for (Iterator<DBEventInstance> iter = event.getEventInstances().iterator(); iter.hasNext(); ) {
				DBEventInstance instance = iter.next();
				Element periodElement = factory.newExtensionElement(QN_CONNECTIONS_PERIOD, recurrenceTag);
				Element startDateElement = factory.newExtensionElement(QN_CONNECTIONS_STARTDATE, periodElement);
				startDateElement.setText(AtomDate.valueOf(instance.getStartDate()).getValue());
				Element endDateElement = factory.newExtensionElement(QN_CONNECTIONS_ENDDATE, periodElement);
				endDateElement.setText(AtomDate.valueOf(instance.getEndDate()).getValue());
			}
		} else {
			recurrenceTag.setAttributeValue(CALENDAR_RECURRENCE_ATTRIBUTE_FREQUENCY, recurrence.getFrequencyName().toString().toLowerCase());
			recurrenceTag.setAttributeValue(CALENDAR_RECURRENCE_ATTRIBUTE_INTERVAL, String.valueOf(recurrence.getInterval()));
			recurrenceTag.setAttributeValue(CALENDAR_RECURRENCE_ATTRIBUTE_CUSTOM, "no");

			Date until = recurrence.getUntilRule();
			Element untilElement = factory.newExtensionElement(QN_CONNECTIONS_UNTIL, recurrenceTag);
			untilElement.setText(AtomDate.valueOf(until).getValue());
			
			Element allday = factory.newElement(QN_CONNECTIONS_ALLDAY, recurrenceTag);
			allday.setText(event.getEventInfo().getIsAllDay() ? "1" : "0");
			
			String startDate = AtomDate.valueOf(recurrence.getStartDate()).toString();
			Element startDateElement = factory.newExtensionElement(QN_CONNECTIONS_STARTDATE, recurrenceTag);
			startDateElement.setText(startDate);
			
			String endDate = AtomDate.valueOf(recurrence.getEndDate()).toString();
			Element endDateElement = factory.newExtensionElement(QN_CONNECTIONS_ENDDATE, recurrenceTag);
			endDateElement.setText(endDate);

			Integer byDay = recurrence.getByDay();
			if(byDay != null) {
				if(recurrence.getFrequencyCode().equals(FrequencyCode.MONTHLY)){
					if(Utilities.isRepeatByDate(recurrence.getByDay())){
						
						Element bydayElement = factory.newExtensionElement(QN_CONNECTIONS_BYDATE, recurrenceTag);
						bydayElement.setText(String.valueOf(Utilities.getNthDayInMonth(recurrence.getByDay())));
					} else {
						Element bydayElement = factory.newExtensionElement(QN_CONNECTIONS_BYDAYOFWEEK, recurrenceTag);
						bydayElement.setText( Utilities.getNthWeekOfMonth(recurrence.getByDay()) + "," + Utilities.formatDayOfWeek(Utilities.getNthDayOfWeek(recurrence.getByDay())));
					}
				} else {
					String t = "";
					Calendar tStartDate = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
					tStartDate.setTimeInMillis(recurrence.getStartDate().getTime());
					for(int i = 0; i < 7; i++) {
						if(((byDay >> i) & 1) == 1) {
							String dn = Utilities.formatDayOfWeek(tStartDate.get(Calendar.DAY_OF_WEEK));
							t = t + dn + ",";
						}
						tStartDate.add(Calendar.HOUR_OF_DAY, 24);
					}
					if(t.length() > 0) {
						t = t.substring(0, t.length() - 1);
					}
					
					Element bydayElement = factory.newExtensionElement(QN_CONNECTIONS_BYDAY, recurrenceTag);
					bydayElement.setText(t);
				}
			}	
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "addRecurrenceTag", "void");
		}
	}

	public final Generator newAtomGeneratorElement() throws IRISyntaxException {
		return newAtomGeneratorElement(null);
	}

	public final Generator newAtomGeneratorElement(Element base) throws IRISyntaxException {
		Generator generator = (base == null) ? factory.newGenerator() : factory.newGenerator(base);
		generator.setUri(APP_GENERATOR_URL);
		generator.setText(APP_GENERATOR_NAME);
		generator.setVersion(Build.getRelease());
		return generator;
	}

	public final Element newOpenSearchTotalResults(Element base, int totalResults) {
		Element el = (base == null) ? factory.newExtensionElement(QN_OPENSEARCH_TOTALRESULTS) : factory.newExtensionElement(QN_OPENSEARCH_TOTALRESULTS, base);
		el.setText(String.valueOf(totalResults));
		return el;
	}
	
	public final void addCommunityRelationshipElements(Feed feed, String communityUuid, String communityURL) {
		Element communityUuidElem = factory.newElement(QN_CONNECTIONS_COMMUNITYUUID, feed);
		communityUuidElem.setText(communityUuid);
		feed.addLink(communityURL, "http://www.ibm.com/xmlns/prod/sn/container").setMimeType(MIME_ATOM_XML);
	}
	
	public final void addCommunityRelationshipElements(Entry entry, String communityUuid, String communityURL) {
		Element communityUuidElem = factory.newElement(QN_CONNECTIONS_COMMUNITYUUID, entry);
		communityUuidElem.setText(communityUuid);
		entry.addLink(communityURL, "http://www.ibm.com/xmlns/prod/sn/container").setMimeType(MIME_ATOM_XML);
	}
	
	public final Collection newCommentFeedCollection(Element base, String eventInstUuid, HttpServletRequest request) {
		Collection collection = factory.newCollection(base);
		collection.setHref(Utilities.getCommentAtomSvcURL(request.isSecure(), Utilities.isFBARequest(request), eventInstUuid, null));
		collection.setTitle(ResourceMessageUtils.uiMessage("api.collections.eventcomments.title", request.getLocale()));
		
		Category commentsCategory = factory.newCategory();
		commentsCategory.setScheme("http://www.ibm.com/xmlns/prod/sn/collection");
		commentsCategory.setTerm("comments");
		collection.addExtension(commentsCategory);
		
		collection.setAccept("application/atom+xml;type=entry");
		
		return collection;
	}
	
	public final Collection newEventFeedCollection(Element base, String calendarUuid, HttpServletRequest request) {
		boolean isSecure = request.isSecure();
		boolean isFBA = Utilities.isFBARequest(request);
		
		Collection collection = factory.newCollection(base);
		collection.setHref(Utilities.getEventAtomSvcURL(isSecure, isFBA, calendarUuid, null));
		collection.setTitle(ResourceMessageUtils.uiMessage("api.svcdoc.collections.events.title", request.getLocale()));
		
		Category eventsCategory = factory.newCategory();
		eventsCategory.setScheme("http://www.ibm.com/xmlns/prod/sn/collection");
		eventsCategory.setTerm("events");
		collection.addExtension(eventsCategory);
		
		collection.setAccept("application/atom+xml;type=entry");
		
		Categories categories = factory.newCategories();
		categories.setFixed(false);
		categories.setHref(Utilities.getTagCloudAtomSvcURL(isSecure, isFBA, calendarUuid));
		collection.addCategories(categories);
		
		return collection;
	}
	
	protected boolean isAnonymous(HttpServletRequest request) {
		return "true".equalsIgnoreCase(request.getParameter("anonymous"));
	}
	
	protected String getLang(HttpServletRequest request) {
		return request.getParameter("lang");
	}
}
