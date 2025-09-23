/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Technologies Limited 2011, 2020                     */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

// NLS_CHARSET=UTF-8
({
TITLE: "Events",

CREATE_BUTTON: "Create an Event",
CREATE_BUTTON_TOOLTIP: "Create a new event on selected day",
EDIT_BUTTON: "Edit Event",
EDIT_BUTTON_TOOLTIP: "Edit the selected event",
DELETE_BUTTON: "Delete Event",
DELETE_BUTTON_TOOLTIP: "Delete the selected event",
BACKTOCAL: "Back to community events",
BACKTOCAL2: "Click to go back to community events",
MORE_ACTIONS: "More Actions",

DAY_VIEW_TOOLTIP: "One day view",
TWODAY_VIEW_TOOLTIP: "Two day view",
FIVEDAY_VIEW_TOOLTIP: "Five day view",
WEEK_VIEW_TOOLTIP: "Week view",
MONTH_VIEW_TOOLTIP: "Month view",

DAY_VIEW: "One Day",
TWODAY_VIEW: "Two Days",
FIVEDAY_VIEW: "Five Days",
WEEK_VIEW: "Week",
MONTH_VIEW: "Month",

ICAL_FEED: "Add to Personal Calendar",
ICAL_FEED_DIALOG_TITLE: "Add to Personal Calendar",

ICAL_FEED_HINT: "Copy this URL and subscribe it to your calendar application as an iCal feed:",
ICAL_FEED_SUBSCRIBE_HINT: "You can subscribe to your HCL Connections events in many applications such as HCL Notes and Microsoft Outlook.  Click the following URL to subscribe to all the events for this community.  Depending on your calendar application, you might need to copy the URL into that application.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "You can subscribe to your HCL Connections events in many applications such as HCL Notes and Microsoft Outlook.  Click the following URL to subscribe to all the events that you are following or attending.  Depending on your calendar application, you might need to copy the URL into that application.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "You can subscribe to your HCL Connections events in many applications such as HCL Notes and Microsoft Outlook.  Click the following URL to subscribe to all the events that you are following.  Depending on your calendar application, you might need to copy the URL into that application.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "You can subscribe to your HCL Connections events in many applications such as HCL Notes and Microsoft Outlook.  Click the following URL to subscribe to all the events that you are attending.  Depending on your calendar application, you might need to copy the URL into that application.",
ICAL_FEED_HINT_POPUP: "Right click and copy this URL, subscribe it to your calendar application as an iCal feed",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Have your community events appear in your Notes or Outlook personal calendar by clicking the feed below:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "How to:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Add Community events to Notes Calendar",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Add Community events to Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Add Community events to Google Calendar",

ICAL_FEED_EXPORT_ICS:	"Export to Calendar (.ics)",

DELETE_CONFIRM_SINGLE: "Are you sure you want to delete this event?",
DELETE_CONFIRM_SERIES: "Delete single instance or delete entire series?",
DELETE_INSTACE_OPTION: "Delete just this instance",
DELETE_SERIES_OPTION: "Delete the entire series",
DELETE_DIALOG_BUTTON: "Delete",

FOLLOW_CONFIRM_SERIES: "Follow single instance or follow entire series?",
FOLLOW_INSTACE_OPTION: "Follow just this instance",
FOLLOW_SERIES_OPTION: "Follow the entire series",
FOLLOW_DIALOG_BUTTON: "Follow",
FOLLOW_CONFIRM: "You have followed this event. Subscribe it to your calendar application through <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal feed</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "You have followed this event series. Subscribe it to your calendar application through <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal feed</a>.",
UNFOLLOW_CONFIRM: "You have stopped following this event.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "You have stopped following this event series.",

RSVP_CONFIRM_SERIES: "Attend single instance or attend entire series?",
RSVP_INSTACE_OPTION: "Attend just this instance",
RSVP_SERIES_OPTION: "Attend the entire series",
RSVP_DIALOG_BUTTON: "Attend",
RSVP_CONFIRM: "You are attending this event. Subscribe it to your calendar application through <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal feed</a>.",
RSVP_ENTIRESERIES_CONFIRM: "You are attending this event series. Subscribe it to your calendar application through <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal feed</a>.",
UNRSVP_CONFIRM: "You have stopped attending this event.",
UNRSVP_ENTIRESERIES_CONFIRM: "You have stopped attending this event series.",


SU: "Sun",
MO: "Mon",
TU: "Tue",
WE: "Wed",
TH: "Thu",
FR: "Fri",
SA: "Sat",
SU_FULL: "Sunday",
MO_FULL: "Monday",
TU_FULL: "Tuesday",
WE_FULL: "Wednesday",
TH_FULL: "Thursday",
FR_FULL: "Friday",
SA_FULL: "Saturday",

DAYS: "days",
WEEKS: "Weeks",
MONTHS: "months",
YEARS: "years",
DAY: "day",
WEEK: "Week",
MONTH: "month",
YEAR: "year",

ON_THE_MONTHLY_DAY: "On the || of the month.",
ON_THE_MONTHLY_WEEKDAY: "On the || of the month.",

REMOVE: "Remove",

ERROR: "Error",
ERROR_HEADER: "Please check the following",

WARNING: "Warning",
WARNING_HEADER: "Warning",

CREATED_BY: "Created by ${0}",
CREATED_ON: "Created on ${0}",
UPDATED_ON: "Updated on ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Created on ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Updated on ${0}",
WHEN: "When:",
REPEATS: "Repeats:",
DATE: "Date",
ON: "On:",
ALL_DAY_EVENT:"All-day event",
ALL_DAY:"All Day",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, All Day",
RECURRENCE: "Repeats",
SUBJECT: "Subject:",
EVENT_TITLE: "Event Title:",
TAGS: "Tags:",
DESCRIPTION: "Description:",
LOCATION: "Location:",
IMAGE_URL: "Image URL:",
SUBMIT: "Submit",
SAVE: "Save",
CANCEL: "Cancel",
SAVECLOSE: "Save and Close",
DELETE: "Delete Instance",
FROM: "from",
TO: "to",
CLOSE: "Close",
OPEN: "Open",
CLOSE_SECTION: "Close Section",
OPEN_SECTION: "Open Section",
NO: "No",
CONFIRM: "Confirm",
CLEAR_EXCEPTIONS_CONFIRM: "You are rescheduling multiple instances of a repeating meeting. These instances will all be shifted by the same relative amount of time including those that have been previously rescheduled. Please be sure to review the effects of these changes.\n\nAre you sure you want to continue?",

DAILY: "Daily",
WEEKLY: "Weekly",
BIWEEKLY: "Biweekly",
EVERY_X_WEEK: "Every ${0} weeks",
MONTHLY: "Monthly",
MONTHLY_BY_DAY: "Monthly by day",
MONTHLY_BY_WEEKDAY: "Monthly by weekday",
YEARLY: "Yearly",
CUSTOM: "Custom",
NONE: "None",
REPEAT_NONE: "This entry does not repeat",
REPEAT_DAILY: "This entry repeats daily",
REPEAT_WEEKLY: "This entry repeats weekly",
REPEAT_DAILY_SHORT: "Daily",
REPEAT_WEEKLY_SHORT: "Weekly",
REPEAT_MONTHLY_SHORT: "Monthly",

REPEATS: "Repeats",
REPEATS_LABEL: "Repeats:",

REPEAT_FREQUENCY_ONEWEEK: "Week",
REPEAT_FREQUENCY_TWOWEEKS: "2 Weeks",
REPEAT_FREQUENCY_THREEWEEKS: "3 Weeks",
REPEAT_FREQUENCY_FOURWEEKS: "4 Weeks",
REPEAT_FREQUENCY_FIVEWEEKS: "5 Weeks",

REPEAT_MONTHLY_ON_THIS_DATE: "On this date:",
REPEAT_MONTHLY_ON_THIS_DAY: "On this day:",

DATE_OF_MONTH_1: "the 1st",
DATE_OF_MONTH_2: "the 2nd",
DATE_OF_MONTH_3: "the 3rd",
DATE_OF_MONTH_4: "the 4th",
DATE_OF_MONTH_5: "the 5th",
DATE_OF_MONTH_6: "the 6th",
DATE_OF_MONTH_7: "the 7th",
DATE_OF_MONTH_8: "the 8th",
DATE_OF_MONTH_9: "the 9th",
DATE_OF_MONTH_10: "the 10th",
DATE_OF_MONTH_11: "the 11th",
DATE_OF_MONTH_12: "the 12th",
DATE_OF_MONTH_13: "the 13th",
DATE_OF_MONTH_14: "the 14th",
DATE_OF_MONTH_15: "the 15th",
DATE_OF_MONTH_16: "the 16th",
DATE_OF_MONTH_17: "the 17th",
DATE_OF_MONTH_18: "the 18th",
DATE_OF_MONTH_19: "the 19th",
DATE_OF_MONTH_20: "the 20th",
DATE_OF_MONTH_21: "the 21st",
DATE_OF_MONTH_22: "the 22nd",
DATE_OF_MONTH_23: "the 23rd",
DATE_OF_MONTH_24: "the 24rd",
DATE_OF_MONTH_25: "the 25th",
DATE_OF_MONTH_26: "the 26th",
DATE_OF_MONTH_27: "the 27th",
DATE_OF_MONTH_28: "the 28th",
DATE_OF_MONTH_29: "the 29th",
DATE_OF_MONTH_30: "the 30th",
DATE_OF_MONTH_31: "the 31st",

First_WEEK_OF_MONTH:"the 1st",
Second_WEEK_OF_MONTH:"the 2nd",
Third_WEEK_OF_MONTH:"the 3rd",
Fourth_WEEK_OF_MONTH:"the 4th",
LAST_WEEK_OF_MONTH:"the last",

First_WEEK_OF_MONTH_FEMALE:"the 1st", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"the 2nd",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"the 3rd",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"the 4th",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"the last",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"the 1st",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"the 2nd",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"the 3rd",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"the 4rd",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"the last",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Select the day of week",
SELECT_WEEK_OF_MONTH:"Select the week of month",
SELECT_DATE_OF_MONTH:"Select the date of month",
Fieldset_Event:"Fields to creat or edit the Event",

MESSAGE_BY_DATE_SKIPPED : "Months that do not contain this date will be skipped",

EVERY: "Every:",
UNTIL: "Until:",
ON: "On:",

ADD_ANOTHER: "Add another",
REPEAT_ON: "Repeat on",

ADD_EVENT: "Create Event",
EDIT_EVENT: "Edit Event",

NOTIFY: "Notify Other People",
NOTIFY_TITLE: "Notify Other People",
NOTIFY_OK: "Notify",
DELETE: "Delete",
EDIT: "Edit",
EDIT_LABEL: "Edit:",
EDIT_THIS_INSTANCE: "Edit this instance",
EDIT_THIS_SERIES: "Edit entire series",
FOLLOW: "Follow",
FOLLOW_THIS_INSTANCE: "Follow this instance",
FOLLOW_THIS_SERIES: "Follow entire series",
UNFOLLOW: "Stop Following",

RSVP: "Will Attend",
RSVP_THIS_INSTANCE: "Attend this instance",
RSVP_THIS_SERIES: "Attend entire series",
UNRSVP: "Will Not Attend",

START_TIME_AFTER_END: "Event start time must be before end time",
START_DAY_AFTER_UNTIL_DAY: "The start date of a repeat event must not be after its repeat until date",
DURATION_LARGER_THAN_24H: "The event duration should not be larger than 24 hours. Please create a repeating event instead.",
DESCRIPTION_LENGTH: 'Description is too long',
SUBJECT_LENGTH: 'Event Title is too long',
LOCATION_LENGTH: 'Location is too long',
IMAGE_URL_INVALID: 'Image url is invalid',
UNTIL_DATE: 'Please specify valid event end date',
NO_REPEAT_ON: 'At least one day should be selected for a repeating event',
START_DATE_IN_PAST: 'Event starts in the past',

SUBJECT_INVALID: 'Event title must be valid',
START_DATE_INVALID: 'Start date must be valid',
START_TIME_INVALID: 'Start time must be valid',
END_DATE_INVALID: 'End date must be valid',
END_TIME_INVALID: 'End time must be valid',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'No members were selected. Please select at least one member to notify.',

NEXT_MONTH: "Display next month",
PREVIOUS_MONTH: "Display previous month",
CALENDAR_SUMMARY: "Monthly Calendar with To Do items",

SEND: "Send",
MAP_ROLE: "Members have the role of:",
READ_ACCESS: "Reader",
AUTHOR_ACCESS: "Author (create and edit their own events)",
SAVE: "Save",
PREF_FORM_TITLE: "Edit Calendar Settings",
TAB_UPCOMING: "Events",
TAB_CALENDAR: "Calendar View",
SUMMARY: "Summary",
DETAILS: "Details",
EVENT_TIME: "Event Time",
UPDATED: "Updated",
SORT_ASC: "Sort ascending",
SORT_DESC: "Sort descending",
TODAY: "Today",
TOMORROW: "Tomorrow",
YESTERDAY: "Yesterday",
EVENT_NAME: "Event Name",
SHOW_DETAILS: "show details",
SHOW_PASTEVENTS: "Show Past Events",
SHOW_UPCOMINGEVENTS: "Show Upcoming Events",
HIDE_DETAILS: "hide details",
SELECT_CHECKBOX: "click to select",
UNSELECT_CHECKBOX: "click to unselect",
NO_DESCRIPTION: "No description provided",
DISPLAY: "Display",
REPEATS_FLAG: "(repeats)",
STR_VIEW: "View:",
DISP_CALENDAR: "Calendar grid",
DISP_LIST: "Summary list",

GOTO_EDIT_INFO: "You need to follow Community Actions -> Edit Community -> Calendar to edit the preferences.",
VIEW_ALL_EVENTS: "View All Events",
NO_EVENT_TODAY: "No Event Today",
ONE_EVENT_TODAY: "1 Event Today",
X_EVENTS_TODAY: "${0} Events Today",

OK: "OK",
UPCOMING_EVENTS: "Upcoming Events",
PICK_MEMBERS: "Select community members",
NOTIFICATION_MESSAGE: "Message",
NOTIFY_OTHERS: "Notify community members",
NOTIFY_DEFAULT_MESSAGE: "Hi-  I thought you might be interested in this event.",
NOTIFY_ERROR: "Error occurred when notifying persons: ${0}",
NOTIFY_SUCCESS: "Notification sent successfully.",
NOTIFY_ERROR_2: "Your event is saved, but there is error when notifying others: ${0}",
INTERNAL_SERVER_ERR: "internal server error",
INTERNAL_SERVER_NOT_AVAILABLE: "An error occurred while displaying content. Contact your system administrator.",

ALT_WARNING_ICON: "Warning icon",
ALT_CONFIRM_ICON: "Confirmation icon",
ALT_ERROR_ICON: "Error icon",
A11Y_WARNING_LABEL: "Warning:",
A11Y_CONFIRM_LABEL: "Confirmation:",
A11Y_ERROR_LABEL: "Error:",

TAB_ABOUT: "About",
TAB_COMMENT: "Comments (${0})",
ADD_COMMENT: "Add a comment...",
ENTER_COMMENT: "Enter your comment:",
ENTER_COMMENT_ERROR: "Please enter your comment and click 'Save.' If you no longer want to leave a comment click 'Cancel.'",
COMMENT_META: "${0} commented on ${1}",
CONFIRM_DELETE_COMMENT: "Are you sure you want to delete the comment?",
NO_COMMENT: "There are no comments.",

EVENT_DELETE_ERROR: "Fail to delete the event. The event might have been deleted. Pls refresh page and try again.",


TAB_ATTENDEE: "${0} People Attending",
NO_ATTENDEE: "There are no attendees.",
NO_INSTANCE: "There are no upcoming events.",
NO_UPCOMING_FOLLOWED: "You are not following any upcoming events.",
NO_UPCOMING_ATTENDED: "You are not attending any upcoming events.",
NO_UPCOMING_FOLLOWATTENDED: "You are not following or attending any upcoming events.",

FOLLOWED_EVENTS_LABEL: "Events that you are following:",
ATTENDED_EVENTS_LABEL: "Events that you are planning to attend:",
FOLLOWATTENDED_EVENTS_LABEL: "Events that you are following and planning to attend:",

PAGING_INFO: "${0} - ${1} of ${2}",
PAGING_INFO_TITLE: "Show items ${0} through ${1} of ${2}",
PAGING_PREVIOUS: "Previous",
PAGING_PREVIOUS_TITLE: "Previous page",
PAGING_NEXT: "Next",
PAGING_NEXT_TITLE: "Next page",
PAGING_SHOW: "Show",
PAGING_LABEL: "Paging",

PAGING_COMMENT_LABEL:"Paging comments (Top control)",
PAGING_COMMENT_BOTTOM_LABEL:"Paging comments (Bottom control)",
PAGING_ATTENDEE_LABEL:"Paging people attending (Top control)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Paging people attending (Bottom control)",

PAGING_ITEMS: "items",
PAGING_PAGE_TITLE: "Show ${0} items per page",
PAGING_PAGE_TITLE2: "Page ${0}",
PAGING_PAGE_TITLE3: "Click to show ${0} items per page",
PAGING_JUMPTO: "Jump to page ${0} of ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Page Number",
PAGEING_JUMP_LABEL:"Changing the value will refresh page results",

DETAIL_WHEN: "When: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Time: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} by ${1}",
ABOUT_ADDED: "Created:",
ABOUT_UPDATED: "Updated:",

WITH_TAGS: "With tags:",
TAGS_TITLE: "Tags",
TAGS_REMOVE_HINT: "Remove the tag ${0} from the selected filter tags",

HELP: "Help",
CLOSE_HELP: "Close Help",

TAGCLOUD_HELP: "A tag is a keyword that you assign to a community event to categorize it and make it easy to find. Type or click a tag to see the community events associated with it. Popular tags appear in larger, darker text in the tag cloud.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Loading...",
NOT_AUTHORIZED: "You are not authorized to perform the action.",
STARTS:"Starts:",
ENDS:"Ends:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} at ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "A tag is a keyword you assign to content to make it easier to find. Tags must be single words, like payroll or human_resources, separated by commas or spaces.",
INVALID_CHAR_IN_TAG: "The tag list you entered contains invalid character '&'.  Please remove this character from the tag list.",

NO_UPCOMING_EVENTS_MSG_SHORT: "There are no upcoming events.",
NO_UPCOMING_EVENTS_MSG: "There are no upcoming events in this community.",
NO_PAST_EVENTS_MSG: "There are no events in the past in this community.",

OWNER: "Owner",
MEMBER: "Member",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Event Actions",
EVENT_VIEWS_NAVIGATION: "Event Views",

EVENTS_VIEW_TOOLBAR_LABEL: "Event Actions",

ALLDAY_UPDATED_MSG_HINT: "Event start time and event end time has been updated accordingly.",

EVENT_STARTTIME_LABEL: "Event start time",
EVENT_ENDTIME_LABEL: "Event end time",

REPEATS_ENABLE_DISABLE_HINT: "Click to enable or disable the repeating options",
REPEATING_OPTIONS_HINT: "Repeating options",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Enter a date. Example: ${0}",
ENTER_TIME_EXAMPLE: "Enter a time. Example: ${0}",

REQUIRED: "Required",

COLLAPSED_SECTION: "Collapsed section",
EXPANDED_SECTION: "Expanded section",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Edit just this instance or edit the entire series.  Editing the entire series does not overwrite the changes that you previously made on single instances of this event.",

REPEATING_FREQUENCY: "Repeat frequency",
REPEATING_UNTIL: "Repeat until",
REPEATING_ON: "Repeat on",

CALENDAR_PREF_SAVE_CONFIRM: "Your changes for Calendar have been saved.",
HIDE_THIS_MESSAGE: "Hide this message",

EVENT_OPEN_ERR_NOTFOUND: "Fail to open the community event. Possible cause: the event has already been deleted.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (time:${1}, location:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (time:${1}).",
LINK_OPEN_INFO: "${0} (time:${1}, location:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (time:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Click link will open in new window.",

WARNING_ICON: "Warning icon",

MENTION: {
	NOT_MEMBER_WARNING: "The following people mentioned will not be able to view the message because they are not members of the community.",
	NOT_SAME_ORGANIZATION_WARNING: "The following people mentioned will not be able to see the message as they are in a different organization"
},
SELECT_ALL: "Select all"
})
