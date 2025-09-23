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
TITLE: "אירועים",

CREATE_BUTTON: "יצירת אירוע",
CREATE_BUTTON_TOOLTIP: "יצירת אירוע חדש ביום שנבחר",
EDIT_BUTTON: "עריכת אירוע",
EDIT_BUTTON_TOOLTIP: "עריכת האירוע שנבחר",
DELETE_BUTTON: "מחיקת אירוע",
DELETE_BUTTON_TOOLTIP: "מחקו את האירוע שנבחר",
BACKTOCAL: "בחזרה לאירועי הקהילה",
BACKTOCAL2: "לחצו כדי לחזור לאירועי הקהילה",
MORE_ACTIONS: "פעולות נוספות",

DAY_VIEW_TOOLTIP: "תצוגה של יום אחד",
TWODAY_VIEW_TOOLTIP: "תצוגה של יומיים",
FIVEDAY_VIEW_TOOLTIP: "תצוגה של חמישה ימים",
WEEK_VIEW_TOOLTIP: "תצוגה שבועית",
MONTH_VIEW_TOOLTIP: "תצוגה חודשית",

DAY_VIEW: "יום אחד",
TWODAY_VIEW: "יומיים",
FIVEDAY_VIEW: "חמישה ימים",
WEEK_VIEW: "שבוע",
MONTH_VIEW: "חודש",

ICAL_FEED: "הוספה ללוח שנה אישי",
ICAL_FEED_DIALOG_TITLE: "הוספה ללוח שנה אישי",

ICAL_FEED_HINT: "העתיקו URL זה ורשמו אותו ביישום לוח השנה שלכם כערוץ תוכן של iCal:",
ICAL_FEED_SUBSCRIBE_HINT: "תוכלו להירשם כמנויים לאירועי HCL Connections ביישומים רבים, כגון HCL Notes ו-Microsoft Outlook.  לחצו על ה-URL הבא כדי להירשם כמנויים לכל האירועים של קהילה זו. בהתאם ליישום לוח השנה שלכם, ייתכן שתצטרכו להעתיק את ה-URL ליישום.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "תוכלו להירשם כמנויים לאירועי HCL Connections ביישומים רבים, כגון HCL Notes ו-Microsoft Outlook.  לחצו על ה-URL הבא כדי להירשם כמנויים לכל האירועים שאחריהם אתם עוקבים או שבהם אתם משתתפים. בהתאם ליישום לוח השנה שלכם, ייתכן שתצטרכו להעתיק את ה-URL ליישום.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "תוכלו להירשם כמנויים לאירועי HCL Connections ביישומים רבים, כגון HCL Notes ו-Microsoft Outlook.  לחצו על ה-URL הבא כדי להירשם כמנויים לכל האירועים שאחריהם אתם עוקבים. בהתאם ליישום לוח השנה שלכם, ייתכן שתצטרכו להעתיק את ה-URL ליישום.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "תוכלו להירשם כמנויים לאירועי HCL Connections ביישומים רבים, כגון HCL Notes ו-Microsoft Outlook.  לחצו על ה-URL הבא כדי להירשם כמנויים לכל האירועים שבהם אתם משתתפים. בהתאם ליישום לוח השנה שלכם, ייתכן שתצטרכו להעתיק את ה-URL ליישום.",
ICAL_FEED_HINT_POPUP: "לחצו באמצעות לחצן העכבר הימני העתיקו URL זה, רשמו אותו ביישום לוח השנה שלכם כערוץ תוכן של iCal",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "כדי שאירועי הקהילה יופיעו בלוח השנה האישי שלכם ב-Notes או ב-Outlook, לחצו על ערוץ התוכן למטה:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "כיצד:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "להוסיף אירועי קהילה ללוח שנה של Notes",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "להוסיף אירועי קהילה ל-Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "להוסיף אירועי קהילה ללוח שנה של Google",

ICAL_FEED_EXPORT_ICS:	"יצוא ללוח שנה (.ics)",

DELETE_CONFIRM_SINGLE: "אתם בטוחים שברצונכם למחוק אירוע זה?",
DELETE_CONFIRM_SERIES: "למחוק מופיע יחיד או למחוק את הסדרה כולה?",
DELETE_INSTACE_OPTION: "מחיקת מופע זה בלבד",
DELETE_SERIES_OPTION: "מחיקת הסדרה כולה",
DELETE_DIALOG_BUTTON: "מחיקה",

FOLLOW_CONFIRM_SERIES: "לעקוב אחר מופיע יחיד או לעקוב אחר הסדרה כולה?",
FOLLOW_INSTACE_OPTION: "מעקב אחר מופע זה בלבד",
FOLLOW_SERIES_OPTION: "מעקב אחר הסדרה כולה",
FOLLOW_DIALOG_BUTTON: "מעקב",
FOLLOW_CONFIRM: "עקבתם אחרי אירוע זה. רשמו אותו ביישום לוח השנה באמצעות <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">ערוץ תוכן של iCal</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "עקבתם אחרי סדרת אירועים זו. רשמו אותה ביישום לוח השנה באמצעות <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">ערוץ תוכן של iCal</a>.",
UNFOLLOW_CONFIRM: "הפסקתם לעקוב אחר אירוע זה.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "הפסקתם לעקוב אחר סדרת אירועים זו.",

RSVP_CONFIRM_SERIES: "להשתתף במופיע יחיד או להשתתף בסדרה כולה?",
RSVP_INSTACE_OPTION: "השתתפות במופע זה בלבד",
RSVP_SERIES_OPTION: "השתתפות בסדרה כולה",
RSVP_DIALOG_BUTTON: "השתתפות",
RSVP_CONFIRM: "אתם משתתפים באירוע זה. רשמו אותו ביישום לוח השנה באמצעות <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">ערוץ תוכן של iCal</a>.",
RSVP_ENTIRESERIES_CONFIRM: "אתם משתתפים בסדרת אירועים זו. רשמו אותו ביישום לוח השנה באמצעות <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">ערוץ התוכן של iCal</a>.",
UNRSVP_CONFIRM: "הפסקתם להשתתף באירוע זה.",
UNRSVP_ENTIRESERIES_CONFIRM: "הפסקתם להשתתף בסדרת אירועים זו.",


SU: "א",
MO: "ב",
TU: "ג",
WE: "ד",
TH: "ה",
FR: "ו",
SA: "ש",
SU_FULL: "ראשון",
MO_FULL: "שני",
TU_FULL: "שלישי",
WE_FULL: "רביעי",
TH_FULL: "חמישי",
FR_FULL: "שישי",
SA_FULL: "שבת",

DAYS: "ימים",
WEEKS: "שבועות",
MONTHS: "חודשים",
YEARS: "שנים",
DAY: "יום",
WEEK: "שבוע",
MONTH: "חודש",
YEAR: "שנה",

ON_THE_MONTHLY_DAY: "ב-|| בחודש.",
ON_THE_MONTHLY_WEEKDAY: "ב-|| בחודש.",

REMOVE: "סילוק",

ERROR: "שגיאה",
ERROR_HEADER: "נא לבדוק את הפריטים שלהלן",

WARNING: "אזהרה",
WARNING_HEADER: "אזהרה",

CREATED_BY: "נוצר על ידי ${0}",
CREATED_ON: "נוצר ב-${0}",
UPDATED_ON: "עודכן ב-${0}",
CREATED_ON_TODAY_OR_TOMORROW: "נוצר ב-${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "עודכן ב-${0}",
WHEN: "מתי:",
REPEATS: "חזרות:",
DATE: "תאריך",
ON: "ב:",
ALL_DAY_EVENT:"אירוע שנמשך כל היום",
ALL_DAY:"יום שלם",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, כל היום",
RECURRENCE: "חזרות",
SUBJECT: "נושא:",
EVENT_TITLE: "כותרת אירוע:",
TAGS: "תגים:",
DESCRIPTION: "תיאור:",
LOCATION: "מיקום:",
IMAGE_URL: "URL של תמונה:",
SUBMIT: "הגשה",
SAVE: "שמירה",
CANCEL: "ביטול",
SAVECLOSE: "שמירה וסגירה",
DELETE: "מחיקת מופע",
FROM: "מ-",
TO: "עד",
CLOSE: "סגירה",
OPEN: "פתיחה",
CLOSE_SECTION: "סגירת חלק",
OPEN_SECTION: "פתיחת חלק",
NO: "לא",
CONFIRM: "אישור",
CLEAR_EXCEPTIONS_CONFIRM: "אתם מתזמנים מחדש מופעים מרובים של פגישה חוזרת. מופעים מרובים אלה יזוזו באותו פרק זמן יחסי, כולל אלה שתוזמנו מחדש בעבר. הקפידו לבדוק את ההשפעות של שינויים אלה.\n\nאתם בטוחים שברצונכם להמשיך?",

DAILY: "יומי",
WEEKLY: "שבועי",
BIWEEKLY: "דו-שבועי",
EVERY_X_WEEK: "כל ${0} שבועות",
MONTHLY: "חודשי",
MONTHLY_BY_DAY: "חודשי לפי יום",
MONTHLY_BY_WEEKDAY: "חודשי לפי יום בשבוע",
YEARLY: "שנתי",
CUSTOM: "מותאם",
NONE: "ללא",
REPEAT_NONE: "רשומה זו אינה חוזרת",
REPEAT_DAILY: "רשומה זו חוזרת מדי יום",
REPEAT_WEEKLY: "רשומה זו חוזרת מדי שבוע",
REPEAT_DAILY_SHORT: "יומי",
REPEAT_WEEKLY_SHORT: "שבועי",
REPEAT_MONTHLY_SHORT: "חודשי",

REPEATS: "חזרות",
REPEATS_LABEL: "חזרות:",

REPEAT_FREQUENCY_ONEWEEK: "שבוע",
REPEAT_FREQUENCY_TWOWEEKS: "שבועיים",
REPEAT_FREQUENCY_THREEWEEKS: "3 שבועות",
REPEAT_FREQUENCY_FOURWEEKS: "4 שבועות",
REPEAT_FREQUENCY_FIVEWEEKS: "5 שבועות",

REPEAT_MONTHLY_ON_THIS_DATE: "בתאריך זה:",
REPEAT_MONTHLY_ON_THIS_DAY: "ביום זה:",

DATE_OF_MONTH_1: "1",
DATE_OF_MONTH_2: "2",
DATE_OF_MONTH_3: "3",
DATE_OF_MONTH_4: "4",
DATE_OF_MONTH_5: "5",
DATE_OF_MONTH_6: "6",
DATE_OF_MONTH_7: "7",
DATE_OF_MONTH_8: "8",
DATE_OF_MONTH_9: "9",
DATE_OF_MONTH_10: "10",
DATE_OF_MONTH_11: "11",
DATE_OF_MONTH_12: "12",
DATE_OF_MONTH_13: "13",
DATE_OF_MONTH_14: "14",
DATE_OF_MONTH_15: "15",
DATE_OF_MONTH_16: "16",
DATE_OF_MONTH_17: "17",
DATE_OF_MONTH_18: "18",
DATE_OF_MONTH_19: "19",
DATE_OF_MONTH_20: "20",
DATE_OF_MONTH_21: "21",
DATE_OF_MONTH_22: "22",
DATE_OF_MONTH_23: "23",
DATE_OF_MONTH_24: "24",
DATE_OF_MONTH_25: "25",
DATE_OF_MONTH_26: "26",
DATE_OF_MONTH_27: "27",
DATE_OF_MONTH_28: "28",
DATE_OF_MONTH_29: "29",
DATE_OF_MONTH_30: "30",
DATE_OF_MONTH_31: "31",

First_WEEK_OF_MONTH:"1",
Second_WEEK_OF_MONTH:"2",
Third_WEEK_OF_MONTH:"3",
Fourth_WEEK_OF_MONTH:"4",
LAST_WEEK_OF_MONTH:"האחרון",

First_WEEK_OF_MONTH_FEMALE:"1", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"2",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"3",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"4",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"האחרון",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"1",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"2",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"3",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"the 4rd",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"האחרון",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"בחירת היום בשבוע",
SELECT_WEEK_OF_MONTH:"בחירת השבוע בחודש",
SELECT_DATE_OF_MONTH:"בחירת התאריך בחודש",
Fieldset_Event:"שדות ליצירה או עריכה של האירוע",

MESSAGE_BY_DATE_SKIPPED : "המערכת תדלג על חודשים שאינם כוללים תאריך זה",

EVERY: "מדי:",
UNTIL: "עד:",
ON: "ב:",

ADD_ANOTHER: "הוספת אחר",
REPEAT_ON: "חזרה ב",

ADD_EVENT: "יצירת אירוע",
EDIT_EVENT: "עריכת אירוע",

NOTIFY: "דיווח לאנשים אחרים",
NOTIFY_TITLE: "דיווח לאנשים אחרים",
NOTIFY_OK: "דיווח",
DELETE: "מחיקה",
EDIT: "עריכה",
EDIT_LABEL: "עריכה:",
EDIT_THIS_INSTANCE: "עריכת מופע זה",
EDIT_THIS_SERIES: "עריכת הסדרה כולה",
FOLLOW: "מעקב",
FOLLOW_THIS_INSTANCE: "מעקב אחר מופע זה",
FOLLOW_THIS_SERIES: "מעקב אחר הסדרה כולה",
UNFOLLOW: "הפסקת מעקב",

RSVP: "אשתתף",
RSVP_THIS_INSTANCE: "השתתפות במופע זה",
RSVP_THIS_SERIES: "השתתפות בסדרה כולה",
UNRSVP: "לא אשתתף",

START_TIME_AFTER_END: "שעת ההתחלה של האירוע צריכה להתרחש לפני שעת הסיום",
START_DAY_AFTER_UNTIL_DAY: "תאריך התחלה של אירוע חוזר לא יכול להתרחש אחרי התאריך 'חזרה עד'",
DURATION_LARGER_THAN_24H: "משך האירוע לא יכול להיות גדול מ-24 שעות. ניתן ליצור אירוע חוזר.",
DESCRIPTION_LENGTH: 'התיאור ארוך מדי',
SUBJECT_LENGTH: 'כותרת האירוע ארוכה מדי',
LOCATION_LENGTH: 'המיקום ארוך מדי',
IMAGE_URL_INVALID: 'ה-URL של התמונה אינו חוקי',
UNTIL_DATE: 'ציין תאריך סיום אירוע חוקי',
NO_REPEAT_ON: 'יש לבחור יום אחד לפחות עבור אירוע חוזר',
START_DATE_IN_PAST: 'האירוע מתחיל בעבר',

SUBJECT_INVALID: 'כותרת האירוע חייבת להיות חוקית',
START_DATE_INVALID: 'תאריך ההתחלה חייב להיות חוקי',
START_TIME_INVALID: 'שעת ההתחלה חייבת להיות חוקית',
END_DATE_INVALID: 'תאריך הסיום חייב להיות חוקי',
END_TIME_INVALID: 'שעת הסיום חייבת להיות חוקית',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'לא נבחרו חברים. יש לבחור חבר אחד לפחות שלו יש לדווח.',

NEXT_MONTH: "הצגת החודש הבא",
PREVIOUS_MONTH: "הצגת החודש הקודם",
CALENDAR_SUMMARY: "יומן חודשי עם מטלות",

SEND: "משלוח",
MAP_ROLE: "לחברים יש התפקיד:",
READ_ACCESS: "קורא",
AUTHOR_ACCESS: "מחבר (יוצר ועורך את האירועים שלו)",
SAVE: "שמירה",
PREF_FORM_TITLE: "עריכת הגדרות לוח שנה",
TAB_UPCOMING: "אירועים",
TAB_CALENDAR: "תצוגת לוח שנה",
SUMMARY: "סיכום",
DETAILS: "פרטים",
EVENT_TIME: "שעת אירוע",
UPDATED: "עודכן",
SORT_ASC: "מיון בסדר עולה",
SORT_DESC: "מיון בסדר יורד",
TODAY: "היום",
TOMORROW: "מחר",
YESTERDAY: "אתמול",
EVENT_NAME: "שם האירוע",
SHOW_DETAILS: "הצגת פרטים",
SHOW_PASTEVENTS: "הצגת אירועים שהתרחשו בעבר",
SHOW_UPCOMINGEVENTS: "הצגת אירועים שיתרחשו בקרוב",
HIDE_DETAILS: "הסתרת פרטים",
SELECT_CHECKBOX: "לחצו כדי לבחור",
UNSELECT_CHECKBOX: "לחצו כדי לבטל בחירה",
NO_DESCRIPTION: "לא סופק תיאור.‏",
DISPLAY: "הצגה",
REPEATS_FLAG: "(חוזר)",
STR_VIEW: "תצוגה:",
DISP_CALENDAR: "רשת של יומן",
DISP_LIST: "רשימת סיכום",

GOTO_EDIT_INFO: "עליכם לעקוב אחר 'פעילות הקהילה -> עריכת קהילה -> לוח שנה' כדי לערוך את ההעדפות.",
VIEW_ALL_EVENTS: "הצגת כל האירועים",
NO_EVENT_TODAY: "אין אירוע היום",
ONE_EVENT_TODAY: "1 אירוע היום",
X_EVENTS_TODAY: "${0} אירועים היום",

OK: "אישור",
UPCOMING_EVENTS: "אירועים שיתרחשו בקרוב",
PICK_MEMBERS: "בחירת חברי קהילה",
NOTIFICATION_MESSAGE: "הודעה",
NOTIFY_OTHERS: "דווחו לחברי קהילה",
NOTIFY_DEFAULT_MESSAGE: "הי - חשבתי שאירוע זה עשוי לעניין אותך.",
NOTIFY_ERROR: "אירעה שגיאה בעת דיווח לאנשים: ${0}",
NOTIFY_SUCCESS: "ההודעה נשלחה בהצלחה.",
NOTIFY_ERROR_2: "האירוע נזמר, אך אירעה שגיאה בעת דיווח לאחרים: ${0}",
INTERNAL_SERVER_ERR: "שגיאת שרת פנימית",
INTERNAL_SERVER_NOT_AVAILABLE: "אירעה שגיאה בעת הצגת התוכן. נא לפנות למנהלן.",

ALT_WARNING_ICON: "סמל אזהרה",
ALT_CONFIRM_ICON: "סמל אישור",
ALT_ERROR_ICON: "איקון שגיאה",
A11Y_WARNING_LABEL: "אזהרה:",
A11Y_CONFIRM_LABEL: "אישור:",
A11Y_ERROR_LABEL: "שגיאה:",

TAB_ABOUT: "אודות",
TAB_COMMENT: "הערות (${0})",
ADD_COMMENT: "הוספת הערה...‏",
ENTER_COMMENT: "הקלידו את הערתכם:",
ENTER_COMMENT_ERROR: "הזינו הערה ולחצו על 'שמור'. אם אינכם מעוניינים עוד להוסיף הערה, לחצו על 'ביטול'.",
COMMENT_META: "${0} העירו על ${1}",
CONFIRM_DELETE_COMMENT: "אתם בטוחים שברצונכם למחוק את ההערה?",
NO_COMMENT: "אין הערות.",

EVENT_DELETE_ERROR: "מחיקת האירוע נכשלה. ייתכן שהאירוע נמחק. רעננו את הדף ונסו שוב.",


TAB_ATTENDEE: "${0} אנשים משתתפים",
NO_ATTENDEE: "אין משתתפים.",
NO_INSTANCE: "אין אירועים שיתרחשו בקרוב.",
NO_UPCOMING_FOLLOWED: "אינכם עוקבים אחר אירועים נכנסים כלשהם.",
NO_UPCOMING_ATTENDED: "אינכם משתתפים באירועים כלשהם שיתרחשו בקרוב.",
NO_UPCOMING_FOLLOWATTENDED: "אינכם עוקבים אחר אירועים כלשהם שיתרחשו בקרוב או משתתפים בהם.",

FOLLOWED_EVENTS_LABEL: "אירועים שאחריהם אתם עוקבים:",
ATTENDED_EVENTS_LABEL: "אירועים שבהם אתם מתכננים להשתתף:",
FOLLOWATTENDED_EVENTS_LABEL: "אירועים שאחריהם אתם עוקבים ובהם אתם מתכננים להשתתף:",

PAGING_INFO: "${0} - ${1} מתוך ${2}",
PAGING_INFO_TITLE: "מוצגים פריטים ${0} עד ${1} מתוך ${2}",
PAGING_PREVIOUS: "הקודם",
PAGING_PREVIOUS_TITLE: "הדף הקודם",
PAGING_NEXT: "הבא",
PAGING_NEXT_TITLE: "הדף הבא",
PAGING_SHOW: "הצגת",
PAGING_LABEL: "דפדוף",

PAGING_COMMENT_LABEL:"דפדוף בהערות (פקד עליון)",
PAGING_COMMENT_BOTTOM_LABEL:"דפדוף בהערות (פקד תחתון)",
PAGING_ATTENDEE_LABEL:"דפדוף באנשים משתתפים (פקד עליון)",
PAGING_ATTENDEE_BOTTOM_LABEL:"דפדוף באנשים משתתפים (פקד תחתון)",

PAGING_ITEMS: "פריטים",
PAGING_PAGE_TITLE: "הצגת ${0} פריטים בדף",
PAGING_PAGE_TITLE2: "עמוד ${0}",
PAGING_PAGE_TITLE3: "לחצו כדי להציג ${0} פריטים בדף",
PAGING_JUMPTO: "קפיצה לדף ${0} מתוך ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "מספר עמוד",
PAGEING_JUMP_LABEL:"שינוי הערך ירענן את התוצאות בדף",

DETAIL_WHEN: "מתי: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "שעה: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} עד ${1}",
ABOUT_ADDED: "נוצר:",
ABOUT_UPDATED: "עודכן:",

WITH_TAGS: "עם התגים:",
TAGS_TITLE: "תגים",
TAGS_REMOVE_HINT: "סלקו את התג ${0} מתגי הסינון שנבחרו",

HELP: "עזרה",
CLOSE_HELP: "סגירת העזרה",

TAGCLOUD_HELP: "תג הוא מילת מפתח המוקצית לאירוע קהילה כדי לסווג אותו ולהקל על איתורו. הקלידו או לחצו על תג כדי לראות את אירוע הקהילה המשויכים לתג זה. תגים פופולריים מופיעים בתמליל גדול וכהה יותר בענן התגים.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "טעינה בביצוע...",
NOT_AUTHORIZED: "אינכם מורשים לבצע את הפעולה.",
STARTS:"מתחיל ב:",
ENDS:"מסתיים:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} בשעה ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "תג הוא מילת מפתח המוקצית לתוכן כדי להקל על איתורו. תגים חייבים להיות מילים יחידות, מופרדות בפסיקים או רווחים, כגון משכורת או משאבי_אנוש.",
INVALID_CHAR_IN_TAG: "רשימת התגיות שציינתם מכילה תו לא חוקי '&'. סלקו תו זה מרשימת התגיות.",

NO_UPCOMING_EVENTS_MSG_SHORT: "אין אירועים שיתרחשו בקרוב.",
NO_UPCOMING_EVENTS_MSG: "אין אירועים שעומדים להתרחש בקרוב בקהילה זו.",
NO_PAST_EVENTS_MSG: "אין אירועים שנערכו בעבר בקהילה זו.",

OWNER: "בעלים",
MEMBER: "חבר",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "פעולות אירוע",
EVENT_VIEWS_NAVIGATION: "תצוגות אירועים",

EVENTS_VIEW_TOOLBAR_LABEL: "פעולות אירוע",

ALLDAY_UPDATED_MSG_HINT: "שעת ההתחלה של אירוע ושעת הסיום של אירוע עודכנו בהתאם.",

EVENT_STARTTIME_LABEL: "שעת התחלה של אירוע",
EVENT_ENDTIME_LABEL: "שעת סיום של אירוע",

REPEATS_ENABLE_DISABLE_HINT: "לחצו כדי להפעיל או להשבית את אפשרויות החזרה",
REPEATING_OPTIONS_HINT: "אפשרויות חזרה",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "הזינו תאריך. דוגמה: ${0}",
ENTER_TIME_EXAMPLE: "הזינו שעה. דוגמה: ${0}",

REQUIRED: "דרוש",

COLLAPSED_SECTION: "חלק מכווץ",
EXPANDED_SECTION: "חלק מורחב",

REPEATING_EVENTS_EDIT_TYPE_HELP: "ערכו מופע זה בלבד או ערכו את הסדרה כולה. עריכת הסדרה כולה לא מבטלת את השינויים שביצעתם בעבר במופעים בודדים של אירוע זה.",

REPEATING_FREQUENCY: "תדירות חזרה",
REPEATING_UNTIL: "חזרה עד",
REPEATING_ON: "חזרה ב",

CALENDAR_PREF_SAVE_CONFIRM: "השינויים בלוח השנה נשמרו.",
HIDE_THIS_MESSAGE: "הסתרת הודעה זו.",

EVENT_OPEN_ERR_NOTFOUND: "פתיחת אירוע הקהילה נכשלה. דיבה אפשרית: האירוע כבר נמחק.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (שעה:${1}, מיקום:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (שעה:${1}).",
LINK_OPEN_INFO: "${0} (שעה:${1}, מיקום:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (שעה:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"לחיצה על קישור תפתח אותו בחלון חדש.",

WARNING_ICON: "סמל אזהרה",

MENTION: {
	NOT_MEMBER_WARNING: "האנשים הבאים שאוזכרו לא יוכלו להציג את ההודעה מאחר שאינם חברים בקהילה.",
	NOT_SAME_ORGANIZATION_WARNING: "האנשים שלהלן שאזכרתם לא יוכלו לראות את ההודעה מאחר שהם שייכים לארגון אחר"
},
SELECT_ALL: "בחירת הכל"
})
