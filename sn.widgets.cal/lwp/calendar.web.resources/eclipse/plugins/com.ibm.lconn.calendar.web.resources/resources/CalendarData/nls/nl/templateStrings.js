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
TITLE: "Evenementen",

CREATE_BUTTON: "Een evenement aanmaken",
CREATE_BUTTON_TOOLTIP: "Maak een nieuw evenement aan op de geselecteerde dag",
EDIT_BUTTON: "Evenement bewerken",
EDIT_BUTTON_TOOLTIP: "Wijzig het geselecteerde evenement",
DELETE_BUTTON: "Evenement wissen",
DELETE_BUTTON_TOOLTIP: "Wis het geselecteerde evenement",
BACKTOCAL: "Terug naar community-evenementen",
BACKTOCAL2: "Klik om terug te keren naar community-evenementen",
MORE_ACTIONS: "Meer acties",

DAY_VIEW_TOOLTIP: "Weergave van één dag",
TWODAY_VIEW_TOOLTIP: "Weergave van 2 dagen",
FIVEDAY_VIEW_TOOLTIP: "Weergave van 5 dagen",
WEEK_VIEW_TOOLTIP: "Weergave van week",
MONTH_VIEW_TOOLTIP: "Weergave van maand",

DAY_VIEW: "Eén dag",
TWODAY_VIEW: "2 dagen",
FIVEDAY_VIEW: "5 dagen",
WEEK_VIEW: "Week",
MONTH_VIEW: "Maand",

ICAL_FEED: "Toevoegen aan persoonlijke kalender",
ICAL_FEED_DIALOG_TITLE: "Toevoegen aan persoonlijke kalender",

ICAL_FEED_HINT: "Kopieer deze URL en voeg deze toe aan uw kalenderapplicatie als een iCal feed:",
ICAL_FEED_SUBSCRIBE_HINT: "U kunt zich aanmelden voor uw HCL Connections evenementen in vele applicaties zoals HCL Notes en Microsoft Outlook.  Klik op de volgende URL om u aan te melden voor alle evenementen voor deze community.  Afhankelijk van uw kalenderapplicatie, moet u mogelijk de URL in die applicatie kopiëren.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "U kunt zich aanmelden voor uw HCL Connections evenementen in vele applicaties zoals HCL Notes en Microsoft Outlook.  Klik op de volgende URL om u aan te melden voor alle evenementen die u volgt of bijwoont.  Afhankelijk van uw kalenderapplicatie, moet u mogelijk de URL in die applicatie kopiëren.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "U kunt zich aanmelden voor uw HCL Connections evenementen in vele applicaties zoals HCL Notes en Microsoft Outlook.  Klik op de volgende URL om u aan te melden voor alle evenementen die u volgt.  Afhankelijk van uw kalenderapplicatie, moet u mogelijk de URL in die applicatie kopiëren.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "U kunt zich aanmelden voor uw HCL Connections evenementen in vele applicaties zoals HCL Notes en Microsoft Outlook. Klik op de volgende URL om u aan te melden voor alle evenementen die u volgt.  Afhankelijk van uw kalenderapplicatie, moet u mogelijk de URL in die applicatie kopiëren.",
ICAL_FEED_HINT_POPUP: "Klik op de rechtermuisknop en kopieer deze URL, en voeg deze toe aan uw kalenderapplicatie als een iCal feed",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Geef uw community-evenementen weer in uw persoonlijke kalender van Notes of Outlook door op de feed hieronder te klikken:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Hoe:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Community-evenementen toevoegen aan de kalender in Notes",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Community-evenementen toevoegen aan Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Community-evenementen toevoegen aan de kalender in Google",

ICAL_FEED_EXPORT_ICS:	"Exporteren naar kalender (.ics)",

DELETE_CONFIRM_SINGLE: "Weet u zeker dat u dit evenement wilt wissen?",
DELETE_CONFIRM_SERIES: "Enkel item of volledige reeks wissen?",
DELETE_INSTACE_OPTION: "Alleen deze instance wissen",
DELETE_SERIES_OPTION: "De volledige reeks wissen",
DELETE_DIALOG_BUTTON: "Verwijderen",

FOLLOW_CONFIRM_SERIES: "Enkele item of volledige reeks volgen?",
FOLLOW_INSTACE_OPTION: "Alleen deze instance volgen",
FOLLOW_SERIES_OPTION: "De volledige reeks volgen",
FOLLOW_DIALOG_BUTTON: "Volgen",
FOLLOW_CONFIRM: "U volgt vanaf nu dit evenement. Voeg het toe aan uw kalenderapplicatie via <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal feed</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "U volgt vanaf nu deze reeks evenementen. Voeg deze toe aan uw kalenderapplicatie via <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal feed</a>.",
UNFOLLOW_CONFIRM: "U bent gestopt met het volgen van het evenement.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "U bent gestopt met het volgen van deze reeks evenementen.",

RSVP_CONFIRM_SERIES: "Enkel item of volledige reeks bijwonen?",
RSVP_INSTACE_OPTION: "Alleen deelnemen aan deze instance",
RSVP_SERIES_OPTION: "De volledige reeks bijwonen",
RSVP_DIALOG_BUTTON: "Deelnemen",
RSVP_CONFIRM: "U woont dit evenement bij. Voeg deze toe aan uw kalenderapplicatie via <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal feed</a>.",
RSVP_ENTIRESERIES_CONFIRM: "U woont deze reeks evenementen bij. Voeg deze toe aan uw kalenderapplicatie via <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal feed</a>.",
UNRSVP_CONFIRM: "U woont dit evenement niet langer bij.",
UNRSVP_ENTIRESERIES_CONFIRM: "U woont deze reeks evenementen niet langer bij.",


SU: "zo",
MO: "ma",
TU: "di",
WE: "wo",
TH: "do",
FR: "vr",
SA: "za",
SU_FULL: "zondag",
MO_FULL: "Maandag",
TU_FULL: "Dinsdag",
WE_FULL: "Woensdag",
TH_FULL: "Donderdag",
FR_FULL: "Vrijdag",
SA_FULL: "zaterdag",

DAYS: "dagen",
WEEKS: "Weken",
MONTHS: "maanden",
YEARS: "jaren",
DAY: "dag",
WEEK: "Week",
MONTH: "maand",
YEAR: "jaar",

ON_THE_MONTHLY_DAY: "Op de ||van de maand.",
ON_THE_MONTHLY_WEEKDAY: "Op de ||van de maand.",

REMOVE: "Verwijderen",

ERROR: "Fout",
ERROR_HEADER: "Controleer het volgende",

WARNING: "Waarschuwing",
WARNING_HEADER: "Waarschuwing",

CREATED_BY: "Gemaakt door ${0}",
CREATED_ON: "Gemaakt op ${0}",
UPDATED_ON: "Bijgewerkt op ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Gemaakt op ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Bijgewerkt op ${0}",
WHEN: "Wanneer:",
REPEATS: "Herhalingen:",
DATE: "Datum",
ON: "Aan:",
ALL_DAY_EVENT:"Evenement van een volledige dag",
ALL_DAY:"Hele dag",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, Volledige dag",
RECURRENCE: "Herhalingen",
SUBJECT: "Onderwerp:",
EVENT_TITLE: "Titel van evenement:",
TAGS: "Tags:",
DESCRIPTION: "Beschrijving:",
LOCATION: "Locatie:",
IMAGE_URL: "Afbeeldings-URL:",
SUBMIT: "Verzenden",
SAVE: "Opslaan",
CANCEL: "Annuleren",
SAVECLOSE: "Opslaan en sluiten",
DELETE: "Item verwijderen",
FROM: "van",
TO: "tot",
CLOSE: "Sluiten",
OPEN: "Openen",
CLOSE_SECTION: "Sectie sluiten",
OPEN_SECTION: "Sectie openen",
NO: "Nee",
CONFIRM: "Bevestigen",
CLEAR_EXCEPTIONS_CONFIRM: "U staat op het punt meerdere items van een terugkerende vergadering te verzetten. Deze items zullen allemaal worden verzet met dezelfde relatieve tijdsduur waaronder deze die eerder werden verzet. Controleer eerst de gevolgen van deze wijzigingen.\n\nBent u zeker dat u wilt verdergaan?",

DAILY: "Dagelijks",
WEEKLY: "Wekelijks",
BIWEEKLY: "Twee keer per week",
EVERY_X_WEEK: "Om de ${0} weken",
MONTHLY: "Maandelijks",
MONTHLY_BY_DAY: "Maandelijks per dag",
MONTHLY_BY_WEEKDAY: "Maandelijks per weekdag",
YEARLY: "Jaarlijks",
CUSTOM: "Aangepast",
NONE: "Geen",
REPEAT_NONE: "Dit item wordt niet herhaald",
REPEAT_DAILY: "Dit item wordt dagelijks herhaald",
REPEAT_WEEKLY: "Dit item wordt wekelijks herhaald",
REPEAT_DAILY_SHORT: "Dagelijks",
REPEAT_WEEKLY_SHORT: "Wekelijks",
REPEAT_MONTHLY_SHORT: "Maandelijks",

REPEATS: "Herhalingen",
REPEATS_LABEL: "Herhalingen:",

REPEAT_FREQUENCY_ONEWEEK: "Week",
REPEAT_FREQUENCY_TWOWEEKS: "2 weken",
REPEAT_FREQUENCY_THREEWEEKS: "3 weken",
REPEAT_FREQUENCY_FOURWEEKS: "4 weken",
REPEAT_FREQUENCY_FIVEWEEKS: "5 weken",

REPEAT_MONTHLY_ON_THIS_DATE: "Op deze datum:",
REPEAT_MONTHLY_ON_THIS_DAY: "Op deze dag:",

DATE_OF_MONTH_1: "de 1e",
DATE_OF_MONTH_2: "de 2e",
DATE_OF_MONTH_3: "de 3e",
DATE_OF_MONTH_4: "de 4e",
DATE_OF_MONTH_5: "de 5e",
DATE_OF_MONTH_6: "de 6e",
DATE_OF_MONTH_7: "de 7e",
DATE_OF_MONTH_8: "de 8e",
DATE_OF_MONTH_9: "de 9e",
DATE_OF_MONTH_10: "de 10e",
DATE_OF_MONTH_11: "de 11e",
DATE_OF_MONTH_12: "de 12e",
DATE_OF_MONTH_13: "de 13e",
DATE_OF_MONTH_14: "de 14e",
DATE_OF_MONTH_15: "de 15e",
DATE_OF_MONTH_16: "de 16e",
DATE_OF_MONTH_17: "de 17e",
DATE_OF_MONTH_18: "de 18e",
DATE_OF_MONTH_19: "de 19e",
DATE_OF_MONTH_20: "de 20e",
DATE_OF_MONTH_21: "de 21e",
DATE_OF_MONTH_22: "de 22e",
DATE_OF_MONTH_23: "de 23e",
DATE_OF_MONTH_24: "de 24e",
DATE_OF_MONTH_25: "de 25e",
DATE_OF_MONTH_26: "de 26e",
DATE_OF_MONTH_27: "de 27e",
DATE_OF_MONTH_28: "de 28e",
DATE_OF_MONTH_29: "de 29e",
DATE_OF_MONTH_30: "de 30e",
DATE_OF_MONTH_31: "de 31e",

First_WEEK_OF_MONTH:"de 1e",
Second_WEEK_OF_MONTH:"de 2e",
Third_WEEK_OF_MONTH:"de 3e",
Fourth_WEEK_OF_MONTH:"de 4e",
LAST_WEEK_OF_MONTH:"de laatste",

First_WEEK_OF_MONTH_FEMALE:"de 1e", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"de 2e",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"de 3e",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"de 4e",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"de laatste",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"de 1e",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"de 2e",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"de 3e",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"de 4e",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"de laatste",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Selecteer de dag van de week",
SELECT_WEEK_OF_MONTH:"Selecteer de week van de maand",
SELECT_DATE_OF_MONTH:"Selecteer de datum van de maand",
Fieldset_Event:"Velden om het evenement aan te maken of te bewerken",

MESSAGE_BY_DATE_SKIPPED : "Maanden die deze datum niet bevatten, zullen worden overgeslagen",

EVERY: "Elke:",
UNTIL: "Tot:",
ON: "Aan:",

ADD_ANOTHER: "Nog een toevoegen",
REPEAT_ON: "Herhalen op",

ADD_EVENT: "Evenement aanmaken",
EDIT_EVENT: "Evenement bewerken",

NOTIFY: "Andere personen op de hoogte stellen",
NOTIFY_TITLE: "Andere personen op de hoogte stellen",
NOTIFY_OK: "Melden",
DELETE: "Verwijderen",
EDIT: "Bewerken",
EDIT_LABEL: "Bewerken:",
EDIT_THIS_INSTANCE: "Deze instance bewerken",
EDIT_THIS_SERIES: "Volledige reeks bewerken",
FOLLOW: "Volgen",
FOLLOW_THIS_INSTANCE: "Alleen deze instance volgen",
FOLLOW_THIS_SERIES: "Volledige reeks volgen",
UNFOLLOW: "Volgen stoppen",

RSVP: "Zal deelnemen",
RSVP_THIS_INSTANCE: "Deelnemen aan deze instance",
RSVP_THIS_SERIES: "Volledige reeks bijwonen",
UNRSVP: "Zal niet deelnemen",

START_TIME_AFTER_END: "De starttijd van het evenement moet plaatsvinden voor de eindtijd",
START_DAY_AFTER_UNTIL_DAY: "De startdatum van een terugkerend evenement mag niet vallen na de terugkerende einddatum",
DURATION_LARGER_THAN_24H: "De duur van het evenement mag niet groter zijn dan 24 uur. Maak in plaats daarvan een terugkerend event.",
DESCRIPTION_LENGTH: 'De beschrijving is te lang',
SUBJECT_LENGTH: 'De titel van het evenement is te lang',
LOCATION_LENGTH: 'De locatie is te lang',
IMAGE_URL_INVALID: 'De afbeeldings-URL is ongeldig',
UNTIL_DATE: 'Gelieve een geldige einddatum voor het evenement te specificeren',
NO_REPEAT_ON: 'Er moet minstens één dag voor een terugkerend evenement worden geselecteerd',
START_DATE_IN_PAST: 'Evenement begint in het verleden',

SUBJECT_INVALID: 'De titel van het evenement moet geldig zijn',
START_DATE_INVALID: 'De startdatum moet geldig zijn',
START_TIME_INVALID: 'De starttijd moet geldig zijn',
END_DATE_INVALID: 'De einddatum moet geldig zijn',
END_TIME_INVALID: 'De eindtijd moet geldig zijn',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Er werden geen leden geselecteerd. Selecteer minstens één lid om te verwittigen.',

NEXT_MONTH: "Volgende maand afbeelden",
PREVIOUS_MONTH: "Vorige maand afbeelden",
CALENDAR_SUMMARY: "Maandkalender met actiepunten",

SEND: "Verzenden",
MAP_ROLE: "Leden hebben de rol:",
READ_ACCESS: "Lezer",
AUTHOR_ACCESS: "Auteur (maken en bewerken eigen evenementen)",
SAVE: "Opslaan",
PREF_FORM_TITLE: "Kalenderinstellingen bewerken",
TAB_UPCOMING: "Evenementen",
TAB_CALENDAR: "Kalenderweergave",
SUMMARY: "Samenvatting",
DETAILS: "Details",
EVENT_TIME: "Tijd van evenement",
UPDATED: "Bijgewerkt",
SORT_ASC: "Sorteren in oplopende volgorde",
SORT_DESC: "Sorteren in aflopende volgorde",
TODAY: "Vandaag",
TOMORROW: "Morgen",
YESTERDAY: "Gisteren",
EVENT_NAME: "Naam van evenement",
SHOW_DETAILS: "details weergeven",
SHOW_PASTEVENTS: "Eerdere evenementen weergeven",
SHOW_UPCOMINGEVENTS: "Toekomstige evenementen weergeven",
HIDE_DETAILS: "details verbergen",
SELECT_CHECKBOX: "klik om te selecteren",
UNSELECT_CHECKBOX: "klik om te deselecteren",
NO_DESCRIPTION: "Geen beschrijving opgegeven",
DISPLAY: "Weergeven",
REPEATS_FLAG: "(herhalingen)",
STR_VIEW: "Weergave:",
DISP_CALENDAR: "Kalenderrooster",
DISP_LIST: "Overzichtslijst",

GOTO_EDIT_INFO: "U moet de Community-acties volgen -> Community bewerken -> Kalender om de voorkeuren te bewerken",
VIEW_ALL_EVENTS: "Alle evenementen weergeven",
NO_EVENT_TODAY: "Geen evenement vandaag",
ONE_EVENT_TODAY: "Eén evenement vandaag",
X_EVENTS_TODAY: "${0} evenementen vandaag",

OK: "OK",
UPCOMING_EVENTS: "Toekomstige evenementen",
PICK_MEMBERS: "Alle communityleden selecteren",
NOTIFICATION_MESSAGE: "Bericht",
NOTIFY_OTHERS: "Communityleden verwittigen",
NOTIFY_DEFAULT_MESSAGE: "Hoi-  Dit evenement zou weleens interessant voor u kunnen zijn.",
NOTIFY_ERROR: "Er is een fout opgetreden tijdens het verwittigen van personen: ${0}",
NOTIFY_SUCCESS: "De melding werd succesvol verzonden.",
NOTIFY_ERROR_2: "Uw evenement is opgeslagen, maar er is een fout opgetreden tijdens het verwittigen van anderen: ${0}",
INTERNAL_SERVER_ERR: "interne serverfout",
INTERNAL_SERVER_NOT_AVAILABLE: "Er is een fout opgetreden tijdens het weergeven van inhoud. Neem contact op met uw beheerder.",

ALT_WARNING_ICON: "Waarschuwingspictogram",
ALT_CONFIRM_ICON: "Bevestigingspictogram",
ALT_ERROR_ICON: "Foutpictogram",
A11Y_WARNING_LABEL: "Waarschuwing:",
A11Y_CONFIRM_LABEL: "Bevestiging:",
A11Y_ERROR_LABEL: "Fout:",

TAB_ABOUT: "Info",
TAB_COMMENT: "Reacties (${0})",
ADD_COMMENT: "Reactie toevoegen...",
ENTER_COMMENT: "Geef uw reactie op:",
ENTER_COMMENT_ERROR: "Geef uw reactie en klik op 'Opslaan'. Als u toch geen reactie wilt achterlaten, kiest u 'Annuleren'.",
COMMENT_META: "${0} reageerde op ${1}",
CONFIRM_DELETE_COMMENT: "Weet u zeker dat u deze reactie wilt wissen?",
NO_COMMENT: "Er zijn geen reacties.",

EVENT_DELETE_ERROR: "Wissen van evenement mislukt. Het evenement is mogelijk gewist. Vernieuw de pagina en probeer opnieuw.",


TAB_ATTENDEE: "${0} personen die bijwonen",
NO_ATTENDEE: "Er zijn geen deelnemers.",
NO_INSTANCE: "Er zijn geen toekomstige evenementen.",
NO_UPCOMING_FOLLOWED: "U volgt nog geen toekomstige evenementen.",
NO_UPCOMING_ATTENDED: "U woont geen toekomstige evenementen bij.",
NO_UPCOMING_FOLLOWATTENDED: "U volgt of woont geen toekomstige evenementen bij.",

FOLLOWED_EVENTS_LABEL: "Evenementen die u volgt:",
ATTENDED_EVENTS_LABEL: "Evenementen die u van plan bent bij te wonen:",
FOLLOWATTENDED_EVENTS_LABEL: "Evenementen die u volgt en van plan bent bij te wonen:",

PAGING_INFO: "${0}-${1} van ${2}",
PAGING_INFO_TITLE: "Items ${0} t/m ${1} van ${2} weergeven",
PAGING_PREVIOUS: "Vorige",
PAGING_PREVIOUS_TITLE: "Vorige pagina",
PAGING_NEXT: "Volgende",
PAGING_NEXT_TITLE: "Volgende pagina",
PAGING_SHOW: "Show",
PAGING_LABEL: "Paginering",

PAGING_COMMENT_LABEL:"Opmerkingen oproepen (Bovenste bedieningselement)",
PAGING_COMMENT_BOTTOM_LABEL:"Opmerkingen oproepen (Onderste bedieningselement)",
PAGING_ATTENDEE_LABEL:"Aanwezige personen oproepen (Bovenste bedieningselement)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Aanwezige personen oproepen (Onderste bedieningselement)",

PAGING_ITEMS: "Items",
PAGING_PAGE_TITLE: "${0} items per pagina afbeelden",
PAGING_PAGE_TITLE2: "Pagina ${0}",
PAGING_PAGE_TITLE3: "Klik om ${0} items per pagina weer te geven",
PAGING_JUMPTO: "Naar pagina ${0} van ${1} gaan", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Paginanummer",
PAGEING_JUMP_LABEL:"Door de waarde te wijzigen, worden de paginaresultaten vernieuwd.",

DETAIL_WHEN: "Wanneer: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Tijd: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} van ${1}",
ABOUT_ADDED: "Gemaakt:",
ABOUT_UPDATED: "Bijgewerkt:",

WITH_TAGS: "Met tags:",
TAGS_TITLE: "Tags",
TAGS_REMOVE_HINT: "Verwijder de tag ${0} van de geselecteerde filtertags",

HELP: "Help",
CLOSE_HELP: "Help sluiten",

TAGCLOUD_HELP: "Een tag is een trefwoord dat u toewijst aan een community-evenement om deze te categoriseren en makkelijker te kunnen vinden. Typ of selecteer een tag om de bijbehorende community-evenementen af te beelden. Populaire tags worden in de tagwolk met een groter, donkerder lettertype weergegeven.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Bezig met laden...",
NOT_AUTHORIZED: "U bent niet gemachtigd om deze actie uit te voeren.",
STARTS:"Begint:",
ENDS:"Eindigt:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} om ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Een tag is een trefwoord dat u toewijst aan content om deze gemakkelijker te kunnen vinden. Tags moeten bestaan uit één woord, zoals salaris of human_resources, en worden van elkaar gescheiden door een komma of spatie.",
INVALID_CHAR_IN_TAG: "De tag-lijst die u hebt ingevoerd, bevat ongeldige tekens zoals  & .  Verwijder deze tekens uit de tag-lijst.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Er zijn geen toekomstige evenementen.",
NO_UPCOMING_EVENTS_MSG: "Er zijn geen toekomstige evenementen in deze community.",
NO_PAST_EVENTS_MSG: "Er zijn geen oude evenementen in deze community.",

OWNER: "Eigenaar",
MEMBER: "Lid",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Evenementacties",
EVENT_VIEWS_NAVIGATION: "Evenementweergaven",

EVENTS_VIEW_TOOLBAR_LABEL: "Evenementacties",

ALLDAY_UPDATED_MSG_HINT: "De starttijd en eindtijd van het evenement werd succesvol bijgewerkt.",

EVENT_STARTTIME_LABEL: "Starttijd van het evenement",
EVENT_ENDTIME_LABEL: "Eindtijd van het evenement",

REPEATS_ENABLE_DISABLE_HINT: "Klik om de terugkerende opties in of uit te schakelen",
REPEATING_OPTIONS_HINT: "Herhalende opties",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Voer een datum in. Voorbeeld: ${0}",
ENTER_TIME_EXAMPLE: "Voer een tijd in. Voorbeeld: ${0}",

REQUIRED: "Verplicht",

COLLAPSED_SECTION: "Samengevouwen sectie",
EXPANDED_SECTION: "Uitgevouwen sectie",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Bewerk alleen deze instance of de volledige reeks.  Het bewerken van de volledige reeks overschrijft de eerder gemaakte wijzigingen aan individuele items van dit evenement niet.",

REPEATING_FREQUENCY: "Herhalingsfrequentie",
REPEATING_UNTIL: "Herhalen tot",
REPEATING_ON: "Herhalen op",

CALENDAR_PREF_SAVE_CONFIRM: "Uw wijzigingen voor kalender zijn opgeslagen.",
HIDE_THIS_MESSAGE: "Dit bericht verbergen",

EVENT_OPEN_ERR_NOTFOUND: "Openen van community-evenement mislukt. Mogelijke oorzaak: het evenement werd reeds verwijderd.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (tijd:${1}, locatie:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (tijd:${1}).",
LINK_OPEN_INFO: "${0} (tijd:${1}, locatie:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (tijd:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Klik om de link te openen in een nieuw venster.",

WARNING_ICON: "Waarschuwingspictogram",

MENTION: {
	NOT_MEMBER_WARNING: "De volgende vermelde personen zullen dit bericht niet kunnen zien omdat ze geen lid van de community zijn.",
	NOT_SAME_ORGANIZATION_WARNING: "De volgende vermelde personen zullen dit bericht niet kunnen zien omdat ze in een verschillende organisatie zitten"
},
SELECT_ALL: "Alle selecteren"
})
