/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Technologies Limited 2009, 2019                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.atom;

import javax.xml.namespace.QName;
import org.apache.abdera.factory.Factory;
import org.apache.abdera.parser.Parser;


public interface AtomConstants {
	static final Factory factory = AtomFactory.getFactory();
	static final Parser parser = AtomFactory.getParser();

	/*
	 * Generator uri
	 */
	public static final String APP_GENERATOR_URL = "http://www.ibm.com/xmlns/prod/sn";
	public static final String APP_GENERATOR_NAME = "HCL Connections - Community Events";

	/*
	 * Common MIME types
	 */
	public static final String MIME_ATOM_ENTRY = "entry";
	public static final String MIME_HCARD = "text/x-hcard";
	public static final String MIME_VCARD = "text/directory";
	public static final String MIME_ATOM_CATEGORIES_CHARSET_UTF8 = "application/atomcat+xml;charset=UTF-8";
	public static final String MIME_ATOM_CATEGORIES = "application/atomcat+xml";
	public static final String MIME_ATOM_INTROSPECTION_CHARSET_UTF8 = "application/atomsvc+xml;charset=UTF-8";
	public static final String MIME_ATOM_INTROSPECTION = "application/atomsvc+xml";
	public static final String MIME_ATOM_XML_CHARSET_UTF8 = "application/atom+xml;charset=UTF-8";
	public static final String MIME_ATOM_XML = "application/atom+xml";
	public static final String MIME_TEXT_HTML = "text/html";
	public static final String MIME_TEXT_JAVASCRIPT = "text/javascript";
	public static final String MIME_TEXT_PLAIN = "text/plain";


	/*
	 * Common namespaces
	 */
	public static final String NS_XHTML_1999 = "http://www.w3.org/1999/xhtml";
	public static final String NS_CONNECTIONS_ATOM_EXT = "http://www.ibm.com/xmlns/prod/sn";
	public static final String NS_OPENSEARCH_EXT = "http://a9.com/-/spec/opensearch/1.1/";
	public static final String NS_ATOM_APP = "http://www.w3.org/2007/app";
	public static final String NS_ATOM = "http://www.w3.org/2005/Atom";
	public static final String NS_THREADING_EXT = "http://purl.org/syndication/thread/1.0";

	public static final String NS_NAME_CONNECTIONS = "snx";
	public static final String NS_NAME_OPENSEARCH = "opensearch";
	public static final String NS_NAME_ATOM = "atom";
	public static final String NS_NAME_ATOM_APP = "app";
	public static final String NS_NAME_THREADING = "thr";

	/*
	 * Type categories
	 */
	public static final String CATEGORY_SCHEME_TYPE = "http://www.ibm.com/xmlns/prod/sn/type";
	public static final String CATEGORY_SCHEME_WORKSPACE = "http://www.ibm.com/xmlns/prod/sn/workspace";
	public static final String CATEGORY_SCHEME_COLLECTION = "http://www.ibm.com/xmlns/prod/sn/collection";

	/*
	 * Common QName's
	 */
	public static final QName QN_CONNECTIONS_FEED_FORMAT = new QName(NS_CONNECTIONS_ATOM_EXT,"feedFormat",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_MEMBER_COUNT = new QName(NS_CONNECTIONS_ATOM_EXT,"membercount",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_ROLE = new QName(NS_CONNECTIONS_ATOM_EXT,"role",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_ROLEGROUP = new QName(NS_CONNECTIONS_ATOM_EXT,"roleGroup",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_COMMUNITY_TYPE = new QName(NS_CONNECTIONS_ATOM_EXT,"communityType",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_FREQUENCY = new QName(NS_CONNECTIONS_ATOM_EXT,"frequency",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_USERID = new QName(NS_CONNECTIONS_ATOM_EXT,"userid",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_USERSTATE = new QName(NS_CONNECTIONS_ATOM_EXT,"userState",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_ISEXTERNAL = new QName(NS_CONNECTIONS_ATOM_EXT,"isExternal",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_USERROLE = new QName(NS_CONNECTIONS_ATOM_EXT,"role",NS_NAME_CONNECTIONS);
	public static final QName QN_OPENSEARCH_TOTALRESULTS = new QName("http://a9.com/-/spec/opensearch/1.1/", "totalResults", "opensearch");
	public static final QName QN_THREADING_INREPLYTO = new QName(NS_THREADING_EXT, "in-reply-to", NS_NAME_THREADING);
	public static final QName QN_ATOM_APP_EDITED = new QName(NS_ATOM_APP, "edited", NS_NAME_ATOM_APP);

	/*
	 * Calendar
	 */
	public static final String CALENDAR_CANCELLED_FLAG = "cancelled";
	public static final String CALENDAR_ENTRY_ATTRIBUTE_TERM = "term";
	public static final String CALENDAR_STARTDATE_ATTRIBUTE_TYPE = "type";
	public static final String CALENDAR_RECURRENCE_ATTRIBUTE_FREQUENCY = "frequency";
	public static final String CALENDAR_RECURRENCE_ATTRIBUTE_INTERVAL = "interval";
	public static final String CALENDAR_RECURRENCE_ATTRIBUTE_COUNT = "count";
	public static final String CALENDAR_RECURRENCE_ATTRIBUTE_WKST = "wkst";
	public static final String CALENDAR_RECURRENCE_ATTRIBUTE_CUSTOM = "custom";

	public static final QName QN_CONNECTIONS_DAYLIGHT = new QName(NS_CONNECTIONS_ATOM_EXT,"daylight",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_TIMEZONE = new QName(NS_CONNECTIONS_ATOM_EXT,"timezone",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_STARTDATE = new QName(NS_CONNECTIONS_ATOM_EXT,"startDate",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_ENDDATE = new QName(NS_CONNECTIONS_ATOM_EXT,"endDate",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_BYDAY = new QName(NS_CONNECTIONS_ATOM_EXT,"byDay",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_BYDAYOFWEEK = new QName(NS_CONNECTIONS_ATOM_EXT,"byDayOfWeek",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_BYDATE = new QName(NS_CONNECTIONS_ATOM_EXT,"byDate",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_IMAGE_URL = new QName(NS_CONNECTIONS_ATOM_EXT,"imageUrl",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_LOCATION = new QName(NS_CONNECTIONS_ATOM_EXT,"location",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_ALLDAY = new QName(NS_CONNECTIONS_ATOM_EXT,"allday",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_RECURRENCE = new QName(NS_CONNECTIONS_ATOM_EXT,"recurrence",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_PERIOD = new QName(NS_CONNECTIONS_ATOM_EXT,"period",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_UNTIL = new QName(NS_CONNECTIONS_ATOM_EXT,"until",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_REPEATS = new QName(NS_CONNECTIONS_ATOM_EXT,"repeats",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_PARENTEVENT = new QName(NS_CONNECTIONS_ATOM_EXT,"parentEvent",NS_NAME_CONNECTIONS);

	public static final QName QN_CONNECTIONS_FOLLOWED = new QName(NS_CONNECTIONS_ATOM_EXT,"followed",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_ATTENDED = new QName(NS_CONNECTIONS_ATOM_EXT,"attended",NS_NAME_CONNECTIONS);

	public static final QName QN_CONNECTIONS_MAPROLE = new QName(NS_CONNECTIONS_ATOM_EXT,"maprole",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_ALLOWCOMMENT = new QName(NS_CONNECTIONS_ATOM_EXT,"allowComment",NS_NAME_CONNECTIONS);

	public static final QName QN_CONNECTIONS_COMMUNITYUUID = new QName(NS_CONNECTIONS_ATOM_EXT,"communityUuid",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_EVENTUUID = new QName(NS_CONNECTIONS_ATOM_EXT,"eventUuid",NS_NAME_CONNECTIONS);
	public static final QName QN_CONNECTIONS_EVENTINSTUUID = new QName(NS_CONNECTIONS_ATOM_EXT,"eventInstUuid",NS_NAME_CONNECTIONS);

	public static final String ID_CALENDAR_PREFIX = "urn:lsid:ibm.com:calendar:";
	public static final String ID_CALENDAR_SEARCH_PREFIX = "urn:lsid:ibm.com:calendar:search:";
	public static final String ID_EVENTS_PREFIX = "urn:lsid:ibm.com:calendar:events:";
	public static final String ID_EVENT_PREFIX = "urn:lsid:ibm.com:calendar:event:";
	public static final String ID_EVENT_COMMENTS_PREFIX = "urn:lsid:ibm.com:calendar:event:comments:";
	public static final String ID_EVENT_COMMENT_PREFIX = "urn:lsid:ibm.com:calendar:event:comment:";
	public static final String ID_FOLLOWED_PREFIX = "urn:lsid:ibm.com:calendar:followed:";
	public static final String ID_ATTENDED_PREFIX = "urn:lsid:ibm.com:calendar:attended:";
	public static final String ID_FOLLOWED_ATTENDED_PREFIX = "urn:lsid:ibm.com:calendar:followed_attended:";

	public static final String ID_EVENT_ATTENDEES_PREFIX = "urn:lsid:ibm.com:calendar:event:attendees:";
	public static final String ID_EVENT_ATTENDEE_PREFIX = "urn:lsid:ibm.com:calendar:event:attendee:";
	public static final String ID_EVENT_FOLLOWERS_PREFIX = "urn:lsid:ibm.com:calendar:event:followers:";
	public static final String ID_EVENT_FOLLOWER_PREFIX = "urn:lsid:ibm.com:calendar:event:follow:";

	public static final String LINK_KEY_BASE_CALENDAR = "/atom/calendar";
	public static final String LINK_KEY_FBA_BASE_CALENDAR = "/atom_form/calendar";
	public static final String LINK_KEY_BASE_EVENT = "/atom/calendar/event";
	public static final String LINK_KEY_FBA_BASE_EVENT = "/atom_form/calendar/event";
	public static final String LINK_KEY_BASE_COMMENT = "/atom/calendar/event/comment";
	public static final String LINK_KEY_FBA_BASE_COMMENT = "/atom_form/calendar/event/comment";
	public static final String LINK_KEY_BASE_FOLLOW = "/atom/follow";
	public static final String LINK_KEY_FBA_BASE_FOLLOW = "/atom_form/follow";

	public static final String LINK_KEY_BASE_ATTENDEE = "/atom/calendar/event/attendees";
	public static final String LINK_KEY_FBA_BASE_ATTENDEE = "/atom_form/calendar/event/attendees";

	public static final String LINK_KEY_BASE_SEARCH = "/atom/search";
	public static final String LINK_KEY_FBA_BASE_SEARCH = "/atom_form/search";

	/*
	 * Link relations
	 */
	public static final String LINK_REL_SELF = "self";
	public static final String LINK_REL_ALTERNATE = "alternate";
	public static final String LINK_REL_EDIT = "edit";
	public static final String LINK_REL_ATTEND = "http://www.ibm.com/xmlns/prod/sn/calendar/event/attend";
	public static final String LINK_REL_FOLLOW = "http://www.ibm.com/xmlns/prod/sn/calendar/event/follow";
	public static final String LINK_REL_ATTENDEE = "http://www.ibm.com/xmlns/prod/sn/calendar/event/attendees";
	public static final String LINK_REL_SERVICE = "http://www.ibm.com/xmlns/prod/sn/service";
	public static final String LINK_REL_ENCLOSURE = "enclosure";

	public static final String LINK_REL_PAGE_FIRST = "first";
	public static final String LINK_REL_PAGE_LAST = "last";
	public static final String LINK_REL_PAGE_PREVIOUS = "prev";
	public static final String LINK_REL_PAGE_NEXT = "next";

}
