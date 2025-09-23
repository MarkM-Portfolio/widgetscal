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
TITLE: "Händelser",

CREATE_BUTTON: "Skapa en händelse",
CREATE_BUTTON_TOOLTIP: "Skapa en händelse på den valda dagen",
EDIT_BUTTON: "Redigera händelse",
EDIT_BUTTON_TOOLTIP: "Redigera den valda händelsen",
DELETE_BUTTON: "Ta bort händelse",
DELETE_BUTTON_TOOLTIP: "Ta bort den valda händelsen",
BACKTOCAL: "Tillbaka till gemenskapshändelser",
BACKTOCAL2: "Gå tillbaka till gemenskapshändelserna",
MORE_ACTIONS: "Fler åtgärder",

DAY_VIEW_TOOLTIP: "Endagsvy",
TWODAY_VIEW_TOOLTIP: "Tvådagarsvy",
FIVEDAY_VIEW_TOOLTIP: "Femdagarsvy",
WEEK_VIEW_TOOLTIP: "Veckovy",
MONTH_VIEW_TOOLTIP: "Månadsvy",

DAY_VIEW: "En dag",
TWODAY_VIEW: "Två dagar",
FIVEDAY_VIEW: "Fem dagar",
WEEK_VIEW: "Vecka",
MONTH_VIEW: "Månad",

ICAL_FEED: "Lägg till i privat kalender",
ICAL_FEED_DIALOG_TITLE: "Lägg till i privat kalender",

ICAL_FEED_HINT: "Kopiera den här URL-adressen och prenumerera på den som ett iCal-flöde i en kalenderapplikation:",
ICAL_FEED_SUBSCRIBE_HINT: "Du kan prenumerera på dina HCL Connections-händelser i många program som HCL Notes och Microsoft Outlook.  Klicka på följande URL för att prenumerera på alla evenemang för den här gruppen.  Beroende på vilket kalenderprogram du använder kan du behöva kopiera webbadressen till programmet.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "Du kan prenumerera på dina HCL Connections-händelser i många program som HCL Notes och Microsoft Outlook.  Klicka på följande URL för att prenumerera på alla evenemang som du följer eller deltar i.  Beroende på vilket kalenderprogram du använder kan du behöva kopiera URL:en till det programmet.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "Du kan prenumerera på dina HCL Connections-händelser i många program som HCL Notes och Microsoft Outlook.  Klicka på följande URL för att prenumerera på alla händelser som du följer.  Beroende på vilket kalenderprogram du använder kan du behöva kopiera URL:en till det programmet.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "Du kan prenumerera på dina HCL Connections-händelser i många program som HCL Notes och Microsoft Outlook.  Klicka på följande URL för att prenumerera på alla evenemang som du deltar i.  Beroende på vilket kalenderprogram du använder kan du behöva kopiera URL:en till det programmet.",
ICAL_FEED_HINT_POPUP: "Kopiera den här URL-adressen och prenumerera på den som ett iCal-flöde i en kalenderapplikation.",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Om du vill att dina gemenskapshändelser ska visas i din privata Notes- eller Outlook-kalender klickar du på flödet nedan:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Så här:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "lägger du till gemenskapshändelser i Notes-kalendern",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "lägger du till gemenskapshändelser i Outlook-kalendern",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "lägger du till gemenskapshändelser i Google-kalendern",

ICAL_FEED_EXPORT_ICS:	"Exportera till kalender (.ics)",

DELETE_CONFIRM_SINGLE: "Vill du ta bort den här händelsen?",
DELETE_CONFIRM_SERIES: "Vill du ta bort den här förekomsten eller hela serien?",
DELETE_INSTACE_OPTION: "Ta endast bort den här förekomsten",
DELETE_SERIES_OPTION: "Ta bort hela serien",
DELETE_DIALOG_BUTTON: "Ta bort",

FOLLOW_CONFIRM_SERIES: "Vill du följa den här förekomsten eller hela serien?",
FOLLOW_INSTACE_OPTION: "Följ endast den här förekomsten",
FOLLOW_SERIES_OPTION: "Följ hela serien",
FOLLOW_DIALOG_BUTTON: "Följ",
FOLLOW_CONFIRM: "Du följer den här händelsen. Om du vill prenumerera på den i en kalenderapplikation använder du ett <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal-flöde</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Du följer den här händelseserien. Om du vill prenumerera på den i en kalenderapplikation använder du ett <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal-flöde</a>.",
UNFOLLOW_CONFIRM: "Du följer inte längre den här händelsen.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Du följer inte längre den här händelseserien.",

RSVP_CONFIRM_SERIES: "Vill du delta i den här förekomsten eller i hela serien?",
RSVP_INSTACE_OPTION: "Delta endast i den här förekomsten",
RSVP_SERIES_OPTION: "Delta i hela serien",
RSVP_DIALOG_BUTTON: "Delta",
RSVP_CONFIRM: "Du deltar i den här händelsen. Om du vill prenumerera på den i en kalenderapplikation använder du ett <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal-flöde</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Du deltar i den här händelseserien. Om du vill prenumerera på den i en kalenderapplikation använder du ett <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal-flöde</a>.",
UNRSVP_CONFIRM: "Du deltar inte längre i den här händelsen.",
UNRSVP_ENTIRESERIES_CONFIRM: "Du deltar inte längre i den här händelseserien.",


SU: "sön",
MO: "mån",
TU: "tis",
WE: "ons",
TH: "tor",
FR: "fre",
SA: "lör",
SU_FULL: "söndag",
MO_FULL: "måndag",
TU_FULL: "tisdag",
WE_FULL: "onsdag",
TH_FULL: "torsdag",
FR_FULL: "fredag",
SA_FULL: "lördag",

DAYS: "dagar",
WEEKS: "veckor",
MONTHS: "månader",
YEARS: "år",
DAY: "dag",
WEEK: "vecka",
MONTH: "månad",
YEAR: "år",

ON_THE_MONTHLY_DAY: "På den || i månaden.",
ON_THE_MONTHLY_WEEKDAY: "På den || i månaden.",

REMOVE: "Ta bort",

ERROR: "Fel",
ERROR_HEADER: "Kontrollera följande",

WARNING: "Varning",
WARNING_HEADER: "Varning",

CREATED_BY: "Skapades av ${0}",
CREATED_ON: "Skapades ${0}",
UPDATED_ON: "Uppdaterades ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Skapades av ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Uppdaterat av ${0}",
WHEN: "När:",
REPEATS: "Upprepas:",
DATE: "Datum",
ON: "Den:",
ALL_DAY_EVENT:"Heldagshändelse",
ALL_DAY:"Hela dagen",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, hela dagen",
RECURRENCE: "Upprepas",
SUBJECT: "Ärende:",
EVENT_TITLE: "Händelsenamn:",
TAGS: "Taggar:",
DESCRIPTION: "Beskrivning:",
LOCATION: "Plats:",
IMAGE_URL: "Bild-URL:",
SUBMIT: "Skicka in",
SAVE: "Spara",
CANCEL: "Avbryt",
SAVECLOSE: "Spara och stäng",
DELETE: "Ta bort förekomst",
FROM: "från",
TO: "till",
CLOSE: "Stäng",
OPEN: "Öppna",
CLOSE_SECTION: "Stäng avsnittet",
OPEN_SECTION: "Öppna avsnittet",
NO: "Nej",
CONFIRM: "Bekräfta",
CLEAR_EXCEPTIONS_CONFIRM: "Du ändrar schemaläggning för flera förekomster av ett upprepat möte. De här förekomsterna kommer att flyttas med samma relativa tid, även de du har ändrat schemaläggning för tidigare. Du bör kontrollera effekten av de här ändringarna. \n\nVill du fortsätta?",

DAILY: "Varje dag",
WEEKLY: "Varje vecka",
BIWEEKLY: "Varannan vecka",
EVERY_X_WEEK: "Var ${0}:e vecka",
MONTHLY: "Varje månad",
MONTHLY_BY_DAY: "Varje månad efter dag",
MONTHLY_BY_WEEKDAY: "Varje månad efter veckodag",
YEARLY: "Varje år",
CUSTOM: "Anpassat",
NONE: "Inget",
REPEAT_NONE: "Den här posten upprepas inte",
REPEAT_DAILY: "Den här posten upprepas varje dag",
REPEAT_WEEKLY: "Den här posten upprepas varje vecka",
REPEAT_DAILY_SHORT: "Varje dag",
REPEAT_WEEKLY_SHORT: "Varje vecka",
REPEAT_MONTHLY_SHORT: "Varje månad",

REPEATS: "Upprepas",
REPEATS_LABEL: "Upprepas:",

REPEAT_FREQUENCY_ONEWEEK: "Varje vecka",
REPEAT_FREQUENCY_TWOWEEKS: "Varannan vecka",
REPEAT_FREQUENCY_THREEWEEKS: "Var tredje vecka",
REPEAT_FREQUENCY_FOURWEEKS: "Var fjärde vecka",
REPEAT_FREQUENCY_FIVEWEEKS: "Var femte vecka",

REPEAT_MONTHLY_ON_THIS_DATE: "Datum:",
REPEAT_MONTHLY_ON_THIS_DAY: "Dag:",

DATE_OF_MONTH_1: "1:a",
DATE_OF_MONTH_2: "2:a",
DATE_OF_MONTH_3: "3:e",
DATE_OF_MONTH_4: "4:e",
DATE_OF_MONTH_5: "5:e",
DATE_OF_MONTH_6: "6:e",
DATE_OF_MONTH_7: "7:e",
DATE_OF_MONTH_8: "8:e",
DATE_OF_MONTH_9: "9:e",
DATE_OF_MONTH_10: "10:e",
DATE_OF_MONTH_11: "11:e",
DATE_OF_MONTH_12: "12:e",
DATE_OF_MONTH_13: "13:e",
DATE_OF_MONTH_14: "14:e",
DATE_OF_MONTH_15: "15:e",
DATE_OF_MONTH_16: "16:e",
DATE_OF_MONTH_17: "17:e",
DATE_OF_MONTH_18: "18:e",
DATE_OF_MONTH_19: "19:e",
DATE_OF_MONTH_20: "20:e",
DATE_OF_MONTH_21: "21:a",
DATE_OF_MONTH_22: "22:a",
DATE_OF_MONTH_23: "23:e",
DATE_OF_MONTH_24: "24:e",
DATE_OF_MONTH_25: "25:e",
DATE_OF_MONTH_26: "26:e",
DATE_OF_MONTH_27: "27:e",
DATE_OF_MONTH_28: "28:e",
DATE_OF_MONTH_29: "29:e",
DATE_OF_MONTH_30: "30:e",
DATE_OF_MONTH_31: "31:a",

First_WEEK_OF_MONTH:"1:a",
Second_WEEK_OF_MONTH:"2:a",
Third_WEEK_OF_MONTH:"3:e",
Fourth_WEEK_OF_MONTH:"4:e",
LAST_WEEK_OF_MONTH:"sista",

First_WEEK_OF_MONTH_FEMALE:"1:a", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"2:a",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"3:e",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"4:e",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"sista",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"1:a",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"2:a",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"3:e",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"4:e",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"sista",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Välj dagen i veckan",
SELECT_WEEK_OF_MONTH:"Välj veckan i månaden",
SELECT_DATE_OF_MONTH:"Välj datumet i månaden",
Fieldset_Event:"Fält för att skapa eller redigera händelsen",

MESSAGE_BY_DATE_SKIPPED : "Månader som inte innehåller det här datumet hoppas över",

EVERY: "Varje:",
UNTIL: "Till:",
ON: "Den:",

ADD_ANOTHER: "Lägg till en till",
REPEAT_ON: "Upprepa",

ADD_EVENT: "Skapa händelse",
EDIT_EVENT: "Redigera händelse",

NOTIFY: "Avisera andra personer",
NOTIFY_TITLE: "Avisera andra personer",
NOTIFY_OK: "Avisera",
DELETE: "Ta bort",
EDIT: "Redigera",
EDIT_LABEL: "Redigera:",
EDIT_THIS_INSTANCE: "Redigera den här förekomsten",
EDIT_THIS_SERIES: "Redigera hela serien",
FOLLOW: "Följ",
FOLLOW_THIS_INSTANCE: "Följ den här förekomsten",
FOLLOW_THIS_SERIES: "Följ hela serien",
UNFOLLOW: "Sluta följa",

RSVP: "Kommer att delta",
RSVP_THIS_INSTANCE: "Delta i den här förekomsten",
RSVP_THIS_SERIES: "Delta i hela serien",
UNRSVP: "Kommer inte att delta",

START_TIME_AFTER_END: "Starttiden för händelsen måste vara tidigare än sluttiden",
START_DAY_AFTER_UNTIL_DAY: "Startdatumet för en upprepad händelse får inte vara senare än det senaste upprepningsdatumet för händelsen",
DURATION_LARGER_THAN_24H: "Händelselängden får inte vara längre än 24 timmar. Skapa en återkommande händelse istället.",
DESCRIPTION_LENGTH: 'Beskrivningen är för lång',
SUBJECT_LENGTH: 'Händelsenamnet är för långt',
LOCATION_LENGTH: 'Platsen är för lång',
IMAGE_URL_INVALID: 'Ogiltig bild-URL',
UNTIL_DATE: 'Du måste ange ett giltigt slutdatum för händelsen',
NO_REPEAT_ON: 'Du måste välja minst en dag för upprepade händelser',
START_DATE_IN_PAST: 'Händelsen inträffade i det förgångna',

SUBJECT_INVALID: 'Du måste ange ett giltigt händelsenamn',
START_DATE_INVALID: 'Du måste ange ett giltigt startdatum',
START_TIME_INVALID: 'Du måste ange en giltig starttid',
END_DATE_INVALID: 'Du måste ange ett giltigt slutdatum',
END_TIME_INVALID: 'Du måste ange en giltig sluttid',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Du har inte valt några medlemmar. Du måste välja minst en medlem att meddela.',

NEXT_MONTH: "Visa nästa månad",
PREVIOUS_MONTH: "Visa föregående månad",
CALENDAR_SUMMARY: "Månadskalender med Att göra-uppgifter",

SEND: "Sänd",
MAP_ROLE: "Medlemmar har följande roll:",
READ_ACCESS: "Läsare",
AUTHOR_ACCESS: "Författare (får skapa och redigera sina egna händelser)",
SAVE: "Spara",
PREF_FORM_TITLE: "Redigera kalenderinställningarna",
TAB_UPCOMING: "Händelser",
TAB_CALENDAR: "Kalendervy",
SUMMARY: "Sammanfattning",
DETAILS: "Detaljer",
EVENT_TIME: "Händelsetid",
UPDATED: "Uppdaterades",
SORT_ASC: "Sortera stigande",
SORT_DESC: "Sortera fallande",
TODAY: "I dag",
TOMORROW: "I morgon",
YESTERDAY: "I går",
EVENT_NAME: "Händelsenamn",
SHOW_DETAILS: "Visa detaljer",
SHOW_PASTEVENTS: "Visa tidigare händelser",
SHOW_UPCOMINGEVENTS: "Visa kommande händelser",
HIDE_DETAILS: "Dölj detaljer",
SELECT_CHECKBOX: "klicka här om du vill markera",
UNSELECT_CHECKBOX: "klicka här om du vill avmarkera",
NO_DESCRIPTION: "Det finns ingen beskrivning",
DISPLAY: "Visa",
REPEATS_FLAG: "(upprepas)",
STR_VIEW: "Visa:",
DISP_CALENDAR: "Kalenderrutnät",
DISP_LIST: "Sammanfattningslista",

GOTO_EDIT_INFO: "Om du vill redigera inställningarna väljer du Gemenskap... -> Redigera gemenskapen -> Kalender.",
VIEW_ALL_EVENTS: "Visa alla händelser",
NO_EVENT_TODAY: "Det finns inga händelser för i dag",
ONE_EVENT_TODAY: "1 händelse i dag",
X_EVENTS_TODAY: "${0} händelser i dag",

OK: "OK",
UPCOMING_EVENTS: "Kommande händelser",
PICK_MEMBERS: "Välj gemenskapsmedlemmar",
NOTIFICATION_MESSAGE: "Meddelande",
NOTIFY_OTHERS: "Avisera gemenskapsmedlemmar",
NOTIFY_DEFAULT_MESSAGE: "Hej! Jag tror att du eventuellt kan vara intresserad av den här händelsen.",
NOTIFY_ERROR: "Det uppstod ett fel när personer skulle meddelas: ${0}",
NOTIFY_SUCCESS: "Meddelandet sändes.",
NOTIFY_ERROR_2: "Händelsen sparades men det uppstod ett fel när andra skulle meddelas: ${0}",
INTERNAL_SERVER_ERR: "Internt serverfel",
INTERNAL_SERVER_NOT_AVAILABLE: "Det uppstod ett fel när innehåll skulle visas. Kontakta systemadministratören.",

ALT_WARNING_ICON: "Varningsikon",
ALT_CONFIRM_ICON: "Bekräftelseikon",
ALT_ERROR_ICON: "Felikon",
A11Y_WARNING_LABEL: "Varning!",
A11Y_CONFIRM_LABEL: "Bekräfta:",
A11Y_ERROR_LABEL: "Fel:",

TAB_ABOUT: "Om",
TAB_COMMENT: "Kommentarer (${0})",
ADD_COMMENT: "Lägg till en kommentar...",
ENTER_COMMENT: "Ange din kommentar:",
ENTER_COMMENT_ERROR: "Ange din kommentar och klicka sedan på Spara. Om du inte vill ange någon kommentar klickar du på Avbryt.",
COMMENT_META: "${0} kommenterade ${1}",
CONFIRM_DELETE_COMMENT: "Vill du ta bort kommentaren?",
NO_COMMENT: "Det finns inga kommentarer.",

EVENT_DELETE_ERROR: "Det gick inte att ta bort händelsen. Händelsen har eventuellt tagits bort. Uppdatera sidan och försök sedan igen.",


TAB_ATTENDEE: "${0} person/personer deltar",
NO_ATTENDEE: "Det finns inga deltagare.",
NO_INSTANCE: "Det finns inga kommande händelser.",
NO_UPCOMING_FOLLOWED: "Du följer inte några kommande händelser.",
NO_UPCOMING_ATTENDED: "Du har inte planerat att delta i några kommande händelser.",
NO_UPCOMING_FOLLOWATTENDED: "Du följer inte och har inte planerat att delta i några kommande händelser.",

FOLLOWED_EVENTS_LABEL: "Händelser du följer",
ATTENDED_EVENTS_LABEL: "Händelser du har planerat att delta i:",
FOLLOWATTENDED_EVENTS_LABEL: "Händelser du följer eller har planerat att delta i:",

PAGING_INFO: "${0} - ${1} av ${2}",
PAGING_INFO_TITLE: "Visar objekt ${0} - ${1} av ${2}",
PAGING_PREVIOUS: "Föregående",
PAGING_PREVIOUS_TITLE: "Föregående sida",
PAGING_NEXT: "Nästa",
PAGING_NEXT_TITLE: "Nästa sida",
PAGING_SHOW: "Visa",
PAGING_LABEL: "Sidkontroller",

PAGING_COMMENT_LABEL:"Kommentarer för sidkontroller (Övre kontroller)",
PAGING_COMMENT_BOTTOM_LABEL:"Kommentarer för sidkontroller (Nedre kontroller)",
PAGING_ATTENDEE_LABEL:"Deltagande personer för sidkontroller (Övre kontroller)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Deltagande personer för sidkontroller (Nedre kontroller)",

PAGING_ITEMS: "objekt",
PAGING_PAGE_TITLE: "Visa ${0} objekt per sida",
PAGING_PAGE_TITLE2: "Sida ${0}",
PAGING_PAGE_TITLE3: "Se ${0} objekt per sida",
PAGING_JUMPTO: "Gå till sidan ${0} av ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Sidnummer",
PAGEING_JUMP_LABEL:"Om du ändrar värdet kommer sidresultatet att uppdateras",

DETAIL_WHEN: "När: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Tid: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} av ${1}",
ABOUT_ADDED: "Skapades:",
ABOUT_UPDATED: "Uppdaterades:",

WITH_TAGS: "Med följande taggar:",
TAGS_TITLE: "Taggar",
TAGS_REMOVE_HINT: "Ta bort taggen ${0} från valda filtertaggar",

HELP: "Hjälp",
CLOSE_HELP: "Stäng hjälpen",

TAGCLOUD_HELP: "Taggar är nyckelord som du tilldelar gemenskapshändelser för att kategorisera dem och för att göra det enklare att hitta dem. Om du vill se vilka gemenskapshändelser som är associerade med en viss tagg anger eller klickar du på den. Populära taggar visas med större och fetare stil i taggmolnet.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Läser in...",
NOT_AUTHORIZED: "Du har inte behörighet att utföra den begärda åtgärden.",
STARTS:"Börjar:",
ENDS:"Slutar:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Taggar är nyckelord som du tilldelar innehåll för att det ska gå enklare att hitta det. Taggar måste vara ord, som \"lönelista\" eller \"viktig_information\", avgränsade med komman eller blanktecken.",
INVALID_CHAR_IN_TAG: "Den tagglista du har angett innehåller det ogiltiga tecknet \"&\". Du måste ta bort detta tecken från tagglistan.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Det finns inga kommande händelser.",
NO_UPCOMING_EVENTS_MSG: "Det finns inga kommande händelser i den här gemenskapen.",
NO_PAST_EVENTS_MSG: "Det finns inga tidigare händelser i den här gemenskapen.",

OWNER: "Ägare",
MEMBER: "Medlem",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Händelse...",
EVENT_VIEWS_NAVIGATION: "Händelsevyer",

EVENTS_VIEW_TOOLBAR_LABEL: "Händelse...",

ALLDAY_UPDATED_MSG_HINT: "Händelsestarttiden och -sluttiden uppdaterades.",

EVENT_STARTTIME_LABEL: "Händelsestarttid",
EVENT_ENDTIME_LABEL: "Händelsesluttid",

REPEATS_ENABLE_DISABLE_HINT: "Aktivera eller avaktivera upprepningsalternativen",
REPEATING_OPTIONS_HINT: "Upprepningsalternativ",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Ange ett datum. Exempel: ${0}",
ENTER_TIME_EXAMPLE: "Ange en tid. Exempel: ${0}",

REQUIRED: "Obligatoriskt",

COLLAPSED_SECTION: "Komprimerat avsnitt",
EXPANDED_SECTION: "Expanderat avsnitt",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Redigera endast den här förekomsten eller hela serien. Om du redigerar hela serien kommer eventuella tidigare ändringar av enstaka förekomster av händelsen inte att skrivas över.",

REPEATING_FREQUENCY: "Upprepningsfrekvens",
REPEATING_UNTIL: "Upprepas till och med",
REPEATING_ON: "Upprepa",

CALENDAR_PREF_SAVE_CONFIRM: "Dina ändringar för kalendern sparades.",
HIDE_THIS_MESSAGE: "Dölj meddelandet",

EVENT_OPEN_ERR_NOTFOUND: "Det gick inte att öppna gemenskapshändelsen. Det kan bero på att händelsen redan har tagits bort.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (tid: ${1}, plats: ${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (tid: ${1}).",
LINK_OPEN_INFO: "${0} (tid: ${1}, plats: ${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (tid: ${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Om du klickar på länken öppnas händelse i ett nytt fönster.",

WARNING_ICON: "Varningsikon",

MENTION: {
	NOT_MEMBER_WARNING: "Följande personer som du har nämnt kommer inte att kunna se meddelandet eftersom de inte är medlemmar av gemenskapen:",
	NOT_SAME_ORGANIZATION_WARNING: "Följande personer som du har nämnt kommer inte att kunna se meddelandet eftersom de finns i ett annat företag:"
},
SELECT_ALL: "Markera alla"
})
