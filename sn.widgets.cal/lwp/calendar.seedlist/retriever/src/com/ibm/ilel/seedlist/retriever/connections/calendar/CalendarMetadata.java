/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.ilel.seedlist.retriever.connections.calendar;

public class CalendarMetadata {
    public static final String FEATURE_TAXONOMY_TYPE = "feature_taxonomy";
    public static final String CONTENT_SOURCE_TYPE_CATEGORY = "ContentSourceType";
    public static final String CALENDAR_CATEGORY = "CommunityEvents";
    public static final String CALENDAR_CATEGORY_DESC = "Community Events";
    
    public static final String DEFAULT_ENCODING = "UTF-16";
    public static final String TEXT_MIME_TYPE = "text/plain";
    public static final String HTML_MIME_TYPE = "text/html";
    
    public static final String FIELD_ENTRY_TYPE = "FIELD_ENTRY_TYPE";
    public static final String FIELD_ENTRY_TYPE_NAME = "Entry type";
    public static final String FIELD_ENTRY_TYPE_DESC = "Entry type";
    
    public static final String FIELD_PARENT_EVENT_ID = "FIELD_PARENT_EVENT_ID";
    public static final String FIELD_PARENT_EVENT_ID_NAME = "Parent event id";
    public static final String FIELD_PARENT_EVENT_ID_DESC = "ID of the parent event. Only exist for repeating event exception instance.";
    
    public static final String FIELD_PARENT_EVENT_URL = "FIELD_PARENT_EVENT_URL";
    public static final String FIELD_PARENT_EVENT_URL_NAME = "Parent event url";
    public static final String FIELD_PARENT_EVENT_URL_DESC = "URL of the parent event. Only exist for repeating event exception instance.";
    
    public static final String FIELD_EVENT_LOCATION = "FIELD_EVENT_LOCATION";
    public static final String FIELD_EVENT_LOCATION_NAME = "Event location";
    public static final String FIELD_EVENT_LOCATION_DESC = "Event location";
    
    public static final String FIELD_TAG = "FIELD_TAG";
    public static final String FIELD_TAG_NAME = "Tag";
    public static final String FIELD_TAG_DESC = "Tag associated with community event";
    
    public static final String FIELD_ISREPEATING = "FIELD_ISREPEATING";
    public static final String FIELD_ISREPEATING_NAME = "Repeating";
    public static final String FIELD_ISREPEATING_DESC = "Value that indicates whether an event is repeating event or normal event";
    
    public static final String FIELD_ISALLDAY = "FIELD_ISALLDAY";
    public static final String FIELD_ISALLDAY_NAME = "Allday";
    public static final String FIELD_ISALLDAY_DESC = "Value that indicates whether an event is all day or not";
    
    public static final String FIELD_PERIOD = "FIELD_PERIOD";
    public static final String FIELD_PERIOD_NAME = "Period";
    public static final String FIELD_PERIOD_DESC = "Represent a special instance of the event entry. It must contains a pair of child element 'FIELD_STARTDATE' and 'FIELD_ENDDATE'";
    
    public static final String FIELD_STARTDATE = "FIELD_STARTDATE";
    public static final String FIELD_STARTDATE_NAME = "Start date";
    public static final String FIELD_STARTDATE_DESC = "The start date of this specific instance of the event entry";
    
    public static final String FIELD_ENDDATE = "FIELD_ENDDATE";
    public static final String FIELD_ENDDATE_NAME = "End date";
    public static final String FIELD_ENDDATE_DESC = "The end date of this specific instance of the event entry";
    
    public static final String FIELD_COMMENT_COUNT = "FIELD_COMMENTS_COUNT";
    public static final String FIELD_COMMENT_COUNT_NAME = "Comments count";
    public static final String FIELD_COMMENT_COUNT_DESC = "Count of the number of comments";
    
    public static final String FIELD_COMMENT_ID = "FIELD_COMMENT_ID";
    public static final String FIELD_COMMENT_ID_NAME = "Comment ID";
    public static final String FIELD_COMMENT_ID_DESC = "Comment ID";
    
    public static final String FIELD_COMMENT_URL = "FIELD_COMMENT_URL";
    public static final String FIELD_COMMENT_URL_NAME = "Comment URL";
    public static final String FIELD_COMMENT_URL_DESC = "Comment URL";
    
    public static final String FIELD_COMMENT_CONTENT = "FIELD_COMMENT_CONTENT";
    public static final String FIELD_COMMENT_CONTENT_NAME = "Comment content";
    public static final String FIELD_COMMENT_CONTENT_DESC = "Comment content";  
    
    public static final String FIELD_COMMENT_DATE = "FIELD_COMMENT_DATE";
    public static final String FIELD_COMMENT_DATE_NAME = "Comment Date";
    public static final String FIELD_COMMENT_DATE_DESC = "Date when comment was created";

    public static final String FIELD_COMMENT_AUTHOR_NAME = "FIELD_COMMENT_AUTHOR_NAME";
    public static final String FIELD_COMMENT_AUTHOR_NAME_NAME = "Comment Author Name";
    public static final String FIELD_COMMENT_AUTHOR_NAME_DESC = "Calendar event comment author name";
    
    public static final String FIELD_COMMENT_AUTHOR_EMAIL = "FIELD_COMMENT_AUTHOR_EMAIL";
    public static final String FIELD_COMMENT_AUTHOR_EMAIL_NAME = "Comment Author Email";
    public static final String FIELD_COMMENT_AUTHOR_EMAIL_DESC = "Calendar event comment author email";

    public static final String FIELD_COMMENT_AUTHOR_UUID = "FIELD_COMMENT_AUTHOR_UUID";
    public static final String FIELD_COMMENT_AUTHOR_UUID_NAME = "Comment Author UUID";
    public static final String FIELD_COMMENT_AUTHOR_UUID_DESC = "Calendar event comment author UUID";
    
    public static final String FIELD_PARENT_COMMUNITY_DBINTERNAL_UID = "FIELD_PARENT_COMMUNITY_DBINTERNAL_UID";
    public static final String FIELD_PARENT_COMMUNITY_DBINTERNAL_UID_NAME = "Parent community database internal UID";
    public static final String FIELD_PARENT_COMMUNITY_DBINTERNAL_UID_DESC = "Parent community database internal UID";
    
    public static final String FIELD_ORGANISATION_ID = "FIELD_ORGANISATIONAL_ID";
    public static final String FIELD_ORGANISATION_ID_NAME = "Organisation id";
    public static final String FIELD_ORGANISATION_ID_DESC = "Organisationally scoped id";
}

