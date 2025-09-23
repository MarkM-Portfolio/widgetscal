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
TITLE: "Begivenheder",

CREATE_BUTTON: "Opret en begivenhed",
CREATE_BUTTON_TOOLTIP: "Opret en ny begivenhed den valgte dag",
EDIT_BUTTON: "Redigér begivenhed",
EDIT_BUTTON_TOOLTIP: "Redigér den valgte begivenhed",
DELETE_BUTTON: "Slet begivenhed",
DELETE_BUTTON_TOOLTIP: "Slet den valgte begivenhed",
BACKTOCAL: "Tilbage til fællesskabsbegivenheder",
BACKTOCAL2: "Klik for at gå tilbage til fællesskabsbegivenheder",
MORE_ACTIONS: "Flere handlinger",

DAY_VIEW_TOOLTIP: "Dagsoversigt - 1 dag",
TWODAY_VIEW_TOOLTIP: "2-dages oversigt",
FIVEDAY_VIEW_TOOLTIP: "5-dages oversigt",
WEEK_VIEW_TOOLTIP: "Ugeoversigt",
MONTH_VIEW_TOOLTIP: "Månedsoversigt",

DAY_VIEW: "1 dag",
TWODAY_VIEW: "2 dage",
FIVEDAY_VIEW: "5 dage",
WEEK_VIEW: "Uge",
MONTH_VIEW: "Måned",

ICAL_FEED: "Tilføj til personlig kalender",
ICAL_FEED_DIALOG_TITLE: "Tilføj til personlig kalender",

ICAL_FEED_HINT: "Kopiér denne URL, og abonnér på den i din kalenderapplikation i form af en iCal-feed:",
ICAL_FEED_SUBSCRIBE_HINT: "Du kan abonnere på din HCL Connections -begivenheder i mange applikationer, f.eks. HCL Notes og Microsoft Outlook. Klik på følgende webadresse for at abonnere på alle begivenhederne for dette fælleskab. Afhængigt af din kalenderapplikation skal du muligvis kopiere webadressen til den pågældende applikation.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "Du kan abonnere på dine HCL Connections -begivenheder i mange applikationer, f.eks. HCL Notes og Microsoft Outlook. Klik på følgende webadresse for at abonnere på alle begivenheder du følger eller deltager i. Afhængigt af din kalenderapplikation skal du muligvis kopiere webadressen til den pågældende applikation.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "Du kan abonnere på dine HCL Connections -begivenheder i mange applikationer, f.eks. HCL Notes og Microsoft Outlook. Klik på følgende webadresse for at abonnere på alle begivenheder du følger. Afhængigt af din kalenderapplikation skal du muligvis kopiere webadressen til den pågældende applikation.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "Du kan abonnere på dine HCL Connections -begivenheder i mange applikationer, f.eks. HCL Notes og Microsoft Outlook. Klik på følgende webadresse for at abonnere på alle begivenheder du deltager i. Afhængigt af din kalenderapplikation skal du muligvis kopiere webadressen til den pågældende applikation.",
ICAL_FEED_HINT_POPUP: "Højreklik og kopiér denne URL, og abonnér på den i din kalenderapplikation i form af en iCal-feed.",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Få dine fællesskabsbegivenheder vist i din personlige kalender i Notes eller Outlook ved at klikke på nedenstående feed:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Sådan gør du:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Tilføj fællesskabsbegivenheder til Notes-kalender",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Tilføj fællesskabsbegivenheder til Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Tilføj fællesskabsbegivenheder til Google-kalender",

ICAL_FEED_EXPORT_ICS:	"Eksportér til kalender (.ics)",

DELETE_CONFIRM_SINGLE: "Er du sikker på, at du vil slette denne begivenhed?",
DELETE_CONFIRM_SERIES: "Slet en enkelt forekomst eller hele serien?",
DELETE_INSTACE_OPTION: "Slet kun denne forekomst",
DELETE_SERIES_OPTION: "Slet hele serien",
DELETE_DIALOG_BUTTON: "Slet",

FOLLOW_CONFIRM_SERIES: "Følg en enkelt forekomst eller hele serien?",
FOLLOW_INSTACE_OPTION: "Følg kun denne forekomst",
FOLLOW_SERIES_OPTION: "Følg hele serien",
FOLLOW_DIALOG_BUTTON: "Følg",
FOLLOW_CONFIRM: "Du følger denne begivenhed. Abonnér på den i din kalenderapplikation via en <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal-feed</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Du følger denne række af begivenheder. Abonnér på den i din kalenderapplikation via en <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal-feed</a>.",
UNFOLLOW_CONFIRM: "Du er holdt op med at følge denne begivenhed.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Du er holdt op med at følge denne række af begivenheder.",

RSVP_CONFIRM_SERIES: "Deltag i en enkelt forekomst eller hele serien?",
RSVP_INSTACE_OPTION: "Deltag kun i denne forekomst",
RSVP_SERIES_OPTION: "Deltag i hele serien",
RSVP_DIALOG_BUTTON: "Deltag",
RSVP_CONFIRM: "Du deltager i denne begivenhed. Abonnér på den i din kalenderapplikation via en <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal-feed</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Du deltager i denne række af begivenheder. Abonnér på den i din kalenderapplikation via en <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal-feed</a>.",
UNRSVP_CONFIRM: "Du er holdt op med at deltage i denne begivenhed.",
UNRSVP_ENTIRESERIES_CONFIRM: "Du er holdt op med at deltage i denne række af begivenheder.",


SU: "Søn",
MO: "Man",
TU: "Tir",
WE: "Ons",
TH: "Tor",
FR: "Fre",
SA: "Lør",
SU_FULL: "Søndag",
MO_FULL: "Mandag",
TU_FULL: "Tirsdag",
WE_FULL: "Onsdag",
TH_FULL: "Torsdag",
FR_FULL: "Fredag",
SA_FULL: "Lørdag",

DAYS: "dage",
WEEKS: "uger",
MONTHS: "måneder",
YEARS: "år",
DAY: "dag",
WEEK: "Uge",
MONTH: "måned",
YEAR: "år",

ON_THE_MONTHLY_DAY: "Den || i måneden.",
ON_THE_MONTHLY_WEEKDAY: "Den || i måneden.",

REMOVE: "Fjern",

ERROR: "Fejl",
ERROR_HEADER: "Kontrollér følgende",

WARNING: "Advarsel",
WARNING_HEADER: "Advarsel",

CREATED_BY: "Oprettet af ${0}",
CREATED_ON: "Oprettet ${0}",
UPDATED_ON: "Opdateret ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Oprettet på ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Opdateret d. ${0}",
WHEN: "Hvornår:",
REPEATS: "Gentagelser:",
DATE: "Dato",
ON: "På:",
ALL_DAY_EVENT:"Heldagsbegivenhed",
ALL_DAY:"Hele dagen",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, hele dagen",
RECURRENCE: "Gentagelser",
SUBJECT: "Emne:",
EVENT_TITLE: "Titel på begivenhed:",
TAGS: "Emneord:",
DESCRIPTION: "Beskrivelse:",
LOCATION: "Placering:",
IMAGE_URL: "Billed-URL:",
SUBMIT: "Afsend",
SAVE: "Gem",
CANCEL: "Annullér",
SAVECLOSE: "Gem og luk",
DELETE: "Slet forekomst",
FROM: "fra",
TO: "til",
CLOSE: "Luk",
OPEN: "Åbn",
CLOSE_SECTION: "Luk sektion",
OPEN_SECTION: "Åbn sektion",
NO: "Nej",
CONFIRM: "Bekræft",
CLEAR_EXCEPTIONS_CONFIRM: "Du er ved at ændre flere forekomster af en gentaget møde. Disse forekomster vil alle blive ændret med den samme relative mængde tid, inkl. dem, der tidligere er ændret. Sørg for at kontrollere virkningen af ændringerne.\n\nEr du sikker på, at du vil fortsætte?",

DAILY: "Hver dag",
WEEKLY: "Hver uge",
BIWEEKLY: "Hver 2. uge",
EVERY_X_WEEK: "Hver ${0}. uge",
MONTHLY: "Hver måned",
MONTHLY_BY_DAY: "Månedligt efter dag",
MONTHLY_BY_WEEKDAY: "Månedligt efter ugedag",
YEARLY: "Hvert år",
CUSTOM: "Tilpasset",
NONE: "Ingen",
REPEAT_NONE: "Denne indgang gentages ikke",
REPEAT_DAILY: "Denne indgang gentages hver dag",
REPEAT_WEEKLY: "Denne indgang gentages hver uge",
REPEAT_DAILY_SHORT: "Hver dag",
REPEAT_WEEKLY_SHORT: "Hver uge",
REPEAT_MONTHLY_SHORT: "Hver måned",

REPEATS: "Gentagelser",
REPEATS_LABEL: "Gentagelser:",

REPEAT_FREQUENCY_ONEWEEK: "Uge",
REPEAT_FREQUENCY_TWOWEEKS: "2. uge",
REPEAT_FREQUENCY_THREEWEEKS: "3. uge",
REPEAT_FREQUENCY_FOURWEEKS: "4. uge",
REPEAT_FREQUENCY_FIVEWEEKS: "5. uge",

REPEAT_MONTHLY_ON_THIS_DATE: "Denne dato:",
REPEAT_MONTHLY_ON_THIS_DAY: "Denne dag:",

DATE_OF_MONTH_1: "1.",
DATE_OF_MONTH_2: "2.",
DATE_OF_MONTH_3: "3.",
DATE_OF_MONTH_4: "4.",
DATE_OF_MONTH_5: "5.",
DATE_OF_MONTH_6: "6.",
DATE_OF_MONTH_7: "7.",
DATE_OF_MONTH_8: "8.",
DATE_OF_MONTH_9: "9.",
DATE_OF_MONTH_10: "10.",
DATE_OF_MONTH_11: "11.",
DATE_OF_MONTH_12: "12.",
DATE_OF_MONTH_13: "13.",
DATE_OF_MONTH_14: "14.",
DATE_OF_MONTH_15: "15.",
DATE_OF_MONTH_16: "16.",
DATE_OF_MONTH_17: "17.",
DATE_OF_MONTH_18: "18.",
DATE_OF_MONTH_19: "19.",
DATE_OF_MONTH_20: "20.",
DATE_OF_MONTH_21: "21.",
DATE_OF_MONTH_22: "22.",
DATE_OF_MONTH_23: "23.",
DATE_OF_MONTH_24: "24.",
DATE_OF_MONTH_25: "25.",
DATE_OF_MONTH_26: "26.",
DATE_OF_MONTH_27: "27.",
DATE_OF_MONTH_28: "28.",
DATE_OF_MONTH_29: "29.",
DATE_OF_MONTH_30: "30.",
DATE_OF_MONTH_31: "31.",

First_WEEK_OF_MONTH:"1.",
Second_WEEK_OF_MONTH:"2.",
Third_WEEK_OF_MONTH:"3.",
Fourth_WEEK_OF_MONTH:"4.",
LAST_WEEK_OF_MONTH:"sidste",

First_WEEK_OF_MONTH_FEMALE:"1.", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"2.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"3.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"4.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"sidste",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"1.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"2.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"3.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"4.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"sidste",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Vælg dagen i ugen",
SELECT_WEEK_OF_MONTH:"Vælg ugen i måneden",
SELECT_DATE_OF_MONTH:"Vælg datoen i måneden",
Fieldset_Event:"Felter til oprettelse eller redigering af begivenheden",

MESSAGE_BY_DATE_SKIPPED : "Måneder, der ikke indeholder denne dato, springes over",

EVERY: "Hver:",
UNTIL: "Indtil:",
ON: "På:",

ADD_ANOTHER: "Tilføj en anden",
REPEAT_ON: "Gentag hver",

ADD_EVENT: "Opret begivenhed",
EDIT_EVENT: "Redigér begivenhed",

NOTIFY: "Advisér andre personer",
NOTIFY_TITLE: "Advisér andre personer",
NOTIFY_OK: "Advisér",
DELETE: "Slet",
EDIT: "Redigér",
EDIT_LABEL: "Redigér:",
EDIT_THIS_INSTANCE: "Redigér denne forekomst",
EDIT_THIS_SERIES: "Redigér hele serien",
FOLLOW: "Følg",
FOLLOW_THIS_INSTANCE: "Følg denne forekomst",
FOLLOW_THIS_SERIES: "Følg hele serien",
UNFOLLOW: "Hold op med at følge",

RSVP: "Deltager",
RSVP_THIS_INSTANCE: "Deltag i denne forekomst",
RSVP_THIS_SERIES: "Deltag i hele serien",
UNRSVP: "Deltager ikke",

START_TIME_AFTER_END: "Begivenhedens starttidspunkt skal være før sluttidspunkt",
START_DAY_AFTER_UNTIL_DAY: "Startdatoen for en gentaget begivenhed må ikke være efter dens indtil-dato.",
DURATION_LARGER_THAN_24H: "Begivenhedens varighed bør ikke være længere end 24 timer. Opret i stedet en gentagende begivenhed.",
DESCRIPTION_LENGTH: 'Beskrivelse er for lang',
SUBJECT_LENGTH: 'Titel på begivenhed er for lang',
LOCATION_LENGTH: 'Lokalitet er for lang',
IMAGE_URL_INVALID: 'Billed-URL er ugyldig',
UNTIL_DATE: 'Angiv en gyldig slutdato for begivenhed',
NO_REPEAT_ON: 'Vælg mindst én dag for en gentaget begivenhed',
START_DATE_IN_PAST: 'Begivenhed starter i fortiden',

SUBJECT_INVALID: 'Titel på begivenhed skal være gyldig',
START_DATE_INVALID: 'Startdato skal være gyldig',
START_TIME_INVALID: 'Starttidspunkt skal være gyldig',
END_DATE_INVALID: 'Slutdato skal være gyldig',
END_TIME_INVALID: 'Sluttidspunkt skal være gyldig',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Der er ikke valgt nogen medlemmer. Du skal vælge mindst ét medlem, du vil advisere.',

NEXT_MONTH: "Vis næste måned",
PREVIOUS_MONTH: "Vis forrige måned",
CALENDAR_SUMMARY: "Månedskalender med opgaver",

SEND: "Send",
MAP_ROLE: "Medlemmer skal have rollen:",
READ_ACCESS: "Læser",
AUTHOR_ACCESS: "Forfatter (kan oprette og redigere sine egne begivenheder)",
SAVE: "Gem",
PREF_FORM_TITLE: "Redigér kalenderindstillinger",
TAB_UPCOMING: "Begivenheder",
TAB_CALENDAR: "Kalenderoversigt",
SUMMARY: "Resumé",
DETAILS: "Detaljer",
EVENT_TIME: "Tidspunkt for begivenhed",
UPDATED: "Opdateret",
SORT_ASC: "Sortér stigende",
SORT_DESC: "Sortér faldende",
TODAY: "I dag",
TOMORROW: "I morgen",
YESTERDAY: "I går",
EVENT_NAME: "Navn på begivenhed",
SHOW_DETAILS: "vis detaljer",
SHOW_PASTEVENTS: "Vis tidligere begivenheder",
SHOW_UPCOMINGEVENTS: "Vis kommende begivenheder",
HIDE_DETAILS: "skjul detaljer",
SELECT_CHECKBOX: "klik for at vælge",
UNSELECT_CHECKBOX: "klik for at fravælge",
NO_DESCRIPTION: "Der er ikke angivet nogen beskrivelse",
DISPLAY: "Vis",
REPEATS_FLAG: "(gentages)",
STR_VIEW: "Vis:",
DISP_CALENDAR: "Kalendergitter",
DISP_LIST: "Resuméliste",

GOTO_EDIT_INFO: "Klik på Fællesskab -> Redigér fællesskab -> Kalender for at redigere indstillingerne.",
VIEW_ALL_EVENTS: "Vis alle begivenheder",
NO_EVENT_TODAY: "Ingen begivenhed i dag",
ONE_EVENT_TODAY: "1 begivenhed i dag",
X_EVENTS_TODAY: "${0} begivenheder i dag",

OK: "OK",
UPCOMING_EVENTS: "Kommende begivenheder",
PICK_MEMBERS: "Vælg fællesskabsmedlemmer",
NOTIFICATION_MESSAGE: "Meddelelse",
NOTIFY_OTHERS: "Advisér fællesskabsmedlemmer",
NOTIFY_DEFAULT_MESSAGE: "Hej! Du vil måske være interesseret i denne begivenhed.",
NOTIFY_ERROR: "Der er opstået en fejl under notifikation af personer: ${0}",
NOTIFY_SUCCESS: "Notifikation sendt.",
NOTIFY_ERROR_2: "Din begivenhed er gemt, men der opstod fejl i notifikationen af andre: ${0}",
INTERNAL_SERVER_ERR: "Intern serverfejl",
INTERNAL_SERVER_NOT_AVAILABLE: "Der er opstået en fejl under fremvisning af indhold. Kontakt systemadministratoren.",

ALT_WARNING_ICON: "Advarselsikon",
ALT_CONFIRM_ICON: "Bekræftelsesikon",
ALT_ERROR_ICON: "Fejlikon",
A11Y_WARNING_LABEL: "Advarsel:",
A11Y_CONFIRM_LABEL: "Bekræftelse:",
A11Y_ERROR_LABEL: "Fejl:",

TAB_ABOUT: "Om",
TAB_COMMENT: "Kommentarer (${0})",
ADD_COMMENT: "Tilføj en kommentar...",
ENTER_COMMENT: "Skriv din kommentar:",
ENTER_COMMENT_ERROR: "Skriv din kommentar, og klik på Gem. Hvis du ikke længere vil skrive en kommentar, skal du klikke på Annullér.",
COMMENT_META: "${0} kommenterede ${1}",
CONFIRM_DELETE_COMMENT: "Er du sikker på, at du vil slette kommentaren?",
NO_COMMENT: "Der er ingen kommentarer.",

EVENT_DELETE_ERROR: "Kan ikke slette begivenheden. Begivenheden er muligvis allerede slettet. Opfrisk siden, og prøv igen.",


TAB_ATTENDEE: "${0} personer deltager",
NO_ATTENDEE: "Der er ingen deltagere.",
NO_INSTANCE: "Der er ingen kommende begivenheder.",
NO_UPCOMING_FOLLOWED: "Du følger ikke nogen kommende begivenheder.",
NO_UPCOMING_ATTENDED: "Du deltager ikke i nogen kommende begivenheder.",
NO_UPCOMING_FOLLOWATTENDED: "Du følger ikke eller deltager ikke i nogen kommende begivenheder.",

FOLLOWED_EVENTS_LABEL: "Begivenheder, du følger:",
ATTENDED_EVENTS_LABEL: "Begivenheder, du planlægger at deltage i:",
FOLLOWATTENDED_EVENTS_LABEL: "Begivenheder, du følger og planlægger at deltage i:",

PAGING_INFO: "${0}-${1} af ${2}",
PAGING_INFO_TITLE: "Vis ${0} til ${1} af ${2} elementer",
PAGING_PREVIOUS: "Forrige",
PAGING_PREVIOUS_TITLE: "Forrige side",
PAGING_NEXT: "Næste",
PAGING_NEXT_TITLE: "Næste side",
PAGING_SHOW: "Vis",
PAGING_LABEL: "Side",

PAGING_COMMENT_LABEL:"Bladring i kommentarer (topkontrolelement)",
PAGING_COMMENT_BOTTOM_LABEL:"Bladring i kommentarer (bundkontrolelement)",
PAGING_ATTENDEE_LABEL:"Bladring i deltagere (topkontrolelement)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Bladring i deltagere (bundkontrolelement)",

PAGING_ITEMS: "elementer",
PAGING_PAGE_TITLE: "Vis ${0} elementer pr. side",
PAGING_PAGE_TITLE2: "Side ${0}",
PAGING_PAGE_TITLE3: "Klik for at vise ${0} elementer pr. side",
PAGING_JUMPTO: "Skift til side ${0} af ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Sidetal",
PAGEING_JUMP_LABEL:"Ændring af værdien medfører opfriskning af sideresultater",

DETAIL_WHEN: "Hvornår: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Kl.: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} af ${1}",
ABOUT_ADDED: "Oprettet:",
ABOUT_UPDATED: "Opdateret:",

WITH_TAGS: "Med emneord:",
TAGS_TITLE: "Emneord",
TAGS_REMOVE_HINT: "Fjern emneordet ${0} fra de valgte filteremneord",

HELP: "Hjælp",
CLOSE_HELP: "Luk hjælpen",

TAGCLOUD_HELP: "Et emneord er et nøgleord, som du knytter til en fællesskabsbegivenhed for at kategorisere den og gøre den let at finde. Skriv eller klik på et emneord for at få vist de fællesskabsbegivenheder, der er knyttet til det. Populære emneord vises med større og federe tekst i emneskyen.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Indlæser...",
NOT_AUTHORIZED: "Du har ikke autorisation til at udføre funktionen.",
STARTS:"Starter:",
ENDS:"Slutter:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} kl. ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Et emneord er et nøgleord, som du tildeler til indhold for at gøre det lettere at finde. Emneord skal være enkeltord, f.eks. lønninger eller sociale_netværk, adskilt med mellemrum eller kommaer.",
INVALID_CHAR_IN_TAG: "Den emneordsliste, du har angivet, indeholder det ugyldige tegn '&'.  Fjern dette tegn fra emneordslisten.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Der er ingen kommende begivenheder.",
NO_UPCOMING_EVENTS_MSG: "Der er ingen kommende begivenheder i dette fællesskab.",
NO_PAST_EVENTS_MSG: "Der er ingen tidligere begivenheder i dette fællesskab.",

OWNER: "Ejer",
MEMBER: "Medlem",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Handlinger for begivenhed",
EVENT_VIEWS_NAVIGATION: "Oversigter over begivenheder",

EVENTS_VIEW_TOOLBAR_LABEL: "Handlinger for begivenhed",

ALLDAY_UPDATED_MSG_HINT: "Start- og sluttidspunkt for begivenhed er opdateret.",

EVENT_STARTTIME_LABEL: "Starttidspunkt for begivenhed",
EVENT_ENDTIME_LABEL: "Sluttidspunkt for begivenhed",

REPEATS_ENABLE_DISABLE_HINT: "Klik for at aktivere eller deaktivere indstillinger for gentagelse",
REPEATING_OPTIONS_HINT: "Indstillinger for gentagelse",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Angiv en dato. Eksempel: ${0}",
ENTER_TIME_EXAMPLE: "Angiv et klokkeslæt. Eksempel: ${0}",

REQUIRED: "Påkrævet",

COLLAPSED_SECTION: "Skjult sektion",
EXPANDED_SECTION: "Udvidet sektion",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Redigér kun denne forekomst, eller redigér hele serien. En redigering af hele serien overskriver ikke de ændringer, du tidligere har foretaget af enkelte forekomster af begivenheden.",

REPEATING_FREQUENCY: "Gentagelsesfrekvens",
REPEATING_UNTIL: "Gentag indtil",
REPEATING_ON: "Gentag hver",

CALENDAR_PREF_SAVE_CONFIRM: "Ændringerne af kalenderen er gemt.",
HIDE_THIS_MESSAGE: "Skjul denne meddelelse",

EVENT_OPEN_ERR_NOTFOUND: "Kan ikke åbne fællesskabsbegivenheden. Mulig årsag: Begivenheden er allerede slettet.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (tid:${1}, sted:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (tid:${1}).",
LINK_OPEN_INFO: "${0} (tid:${1}, sted:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (tid:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Klik på linket for at åbne det i et nyt vindue.",

WARNING_ICON: "Advarselsikon",

MENTION: {
	NOT_MEMBER_WARNING: "Følgende personer kan ikke se beskeden, fordi de ikke er medlemmer af fællesskabet.",
	NOT_SAME_ORGANIZATION_WARNING: "Følgende personer kan ikke se beskeden, fordi de er i en anden organisation."
},
SELECT_ALL: "Vælg alle"
})
