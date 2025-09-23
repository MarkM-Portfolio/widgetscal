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
TITLE: "Hendelser",

CREATE_BUTTON: "Opprett en hendelse",
CREATE_BUTTON_TOOLTIP: "Opprett en ny hendelse på valgt dag",
EDIT_BUTTON: "Rediger hendelse",
EDIT_BUTTON_TOOLTIP: "Rediger den valgte hendelsen",
DELETE_BUTTON: "Slett hendelse",
DELETE_BUTTON_TOOLTIP: "Slett den valgte hendelsen",
BACKTOCAL: "Tilbake til fellesskapshendelser",
BACKTOCAL2: "Klikk for å gå tilbake til fellesskapshendelser",
MORE_ACTIONS: "Flere handlinger",

DAY_VIEW_TOOLTIP: "Endagsoversikt",
TWODAY_VIEW_TOOLTIP: "Todagersoversikt",
FIVEDAY_VIEW_TOOLTIP: "Femdagersoversikt",
WEEK_VIEW_TOOLTIP: "Ukesoversikt",
MONTH_VIEW_TOOLTIP: "Månedsoversikt",

DAY_VIEW: "En dag",
TWODAY_VIEW: "To dager",
FIVEDAY_VIEW: "Fem dager",
WEEK_VIEW: "Uke",
MONTH_VIEW: "Måned",

ICAL_FEED: "Legg til i personlig kalender",
ICAL_FEED_DIALOG_TITLE: "Legg til i personlig kalender",

ICAL_FEED_HINT: "Kopier denne URLen og abonner på den i din personlige kalender som en iCal-kanal:",
ICAL_FEED_SUBSCRIBE_HINT: "Du kan abonnere på HCL Connections-hendelser i mange programmer, som HCL Notes og Microsoft Outlook. Klikk på følgende URL for å abonnere på alle hendelser for dette fellesskapet. Avhengig av kalenderprogram, kan det hende du må kopiere URL-en inn i programmet.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "Du kan abonnere på HCL Connections-hendelser i mange programmer, som HCL Notes og Microsoft Outlook. Klikk på følgende URL for å abonnere på alle hendelsene som du følger eller deltar på. Avhengig av kalenderprogram, kan det hende du må kopiere URL-enn inn i programmet.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "Du kan abonnere på HCL Connections-hendelser i mange programmer, som HCL Notes og Microsoft Outlook. Klikk på følgende URL for å abonnere på alle hendelsene du følger. Avhengig av kalenderprogram kan det hende du må kopiere URL-en inn i programmet.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "Du kan abonnere på HCL Connections-hendelser i mange programmer, som HCL Notes og Microsoft Outlook. Klikk på følgende URL for å abonnere på alle hendelsene du deltar på. Avhengig av kalenderprogram kan det hende du må kopiere URL-en inn i programmet.",
ICAL_FEED_HINT_POPUP: "Høyreklikk og kopier denne URLen og abonner på den i din personlige kalender som en iCal-kanal",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Få fellesskapshendelsene til å bli vist i din personlige Notes- eller Outlook-kalender ved å klikke på kanalen nedenfor:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Slik kan du:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Legge til fellesskapshendelser i Notes-kalenderen",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Legge til fellesskapshendelser i Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Legge til fellesskapshendelser i Google-kalenderen",

ICAL_FEED_EXPORT_ICS:	"Eksporter til kalender (.ics)",

DELETE_CONFIRM_SINGLE: "Er du sikker på at du vil slette denne hendelsen?",
DELETE_CONFIRM_SERIES: "Slette enkeltforekomst eller slette hele serien?",
DELETE_INSTACE_OPTION: "Slett bare denne forekomsten",
DELETE_SERIES_OPTION: "Slett hele serien",
DELETE_DIALOG_BUTTON: "Slett",

FOLLOW_CONFIRM_SERIES: "Følge enkeltforekomst eller følge hele serien?",
FOLLOW_INSTACE_OPTION: "Følg bare denne forekomsten",
FOLLOW_SERIES_OPTION: "Følg hele serien",
FOLLOW_DIALOG_BUTTON: "Følg",
FOLLOW_CONFIRM: "Du følger denne hendelsen. Abonner på den i kalenderapplikasjonen din via <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal-kanal</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Du følger denne hendelsesserien. Abonner på den i kalenderapplikasjonen din via <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal-kanal</a>.",
UNFOLLOW_CONFIRM: "Du har sluttet å følge denne hendelsen.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Du har sluttet å følge denne hendelsesserien.",

RSVP_CONFIRM_SERIES: "Delta i en enkelt forekomst eller delta i hele serien?",
RSVP_INSTACE_OPTION: "Delta bare i denne forekomsten",
RSVP_SERIES_OPTION: "Delta i hele serien",
RSVP_DIALOG_BUTTON: "Delta",
RSVP_CONFIRM: "Du deltar på denne hendelsen. Abonner på den i kalenderapplikasjonen din via <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal-kanal</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Du deltar på denne hendelsesserien. Abonner på den i kalenderapplikasjonen din via <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal-kanal</a>.",
UNRSVP_CONFIRM: "Du har sluttet å delta i denne hendelsen.",
UNRSVP_ENTIRESERIES_CONFIRM: "Du har sluttet å delta i denne hendelsesserien.",


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

DAYS: "dager",
WEEKS: "Uker",
MONTHS: "måneder",
YEARS: "år",
DAY: "dag",
WEEK: "Uke",
MONTH: "måned",
YEAR: "år",

ON_THE_MONTHLY_DAY: "På den || i måneden.",
ON_THE_MONTHLY_WEEKDAY: "På den || i måneden.",

REMOVE: "Fjern",

ERROR: "Feil",
ERROR_HEADER: "Kontroller følgende",

WARNING: "Advarsel",
WARNING_HEADER: "Advarsel",

CREATED_BY: "Opprettet av ${0}",
CREATED_ON: "Opprettet ${0}",
UPDATED_ON: "Oppdatert ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Opprettet den ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Oppdatert den ${0}",
WHEN: "Når:",
REPEATS: "Gjentas:",
DATE: "Dato",
ON: "På:",
ALL_DAY_EVENT:"Heldagshendelse",
ALL_DAY:"Hele dagen",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, Hele dagen",
RECURRENCE: "Gjentas",
SUBJECT: "Emne:",
EVENT_TITLE: "Hendelsestittel:",
TAGS: "Tagger:",
DESCRIPTION: "Beskrivelse:",
LOCATION: "Sted:",
IMAGE_URL: "Bilde-URL:",
SUBMIT: "Send",
SAVE: "Lagre",
CANCEL: "Avbryt",
SAVECLOSE: "Lagre og lukk",
DELETE: "Slett forekomst",
FROM: "fra",
TO: "til",
CLOSE: "Lukk",
OPEN: "Åpne",
CLOSE_SECTION: "Lukk seksjon",
OPEN_SECTION: "Åpne seksjon",
NO: "Nei",
CONFIRM: "Bekreft",
CLEAR_EXCEPTIONS_CONFIRM: "Du endrer tidspunkt for flere forekomster av et gjentakende møte. Alle disse forekomstene vil bli flyttet med samme relative tidsrom, inkludert de som tidligere er endret. Kontroller virkningen av disse endringene.\n\nEr du sikker på at du vil fortsette?",

DAILY: "Daglig",
WEEKLY: "Ukentlig",
BIWEEKLY: "Annenhver uke",
EVERY_X_WEEK: "Hver ${0}. uke",
MONTHLY: "Månedlig",
MONTHLY_BY_DAY: "Månedlig etter dag",
MONTHLY_BY_WEEKDAY: "Månedlig etter ukedag",
YEARLY: "Årlig",
CUSTOM: "Tilpasset",
NONE: "Ingen",
REPEAT_NONE: "Denne oppføringen blir ikke gjentatt",
REPEAT_DAILY: "Denne oppføringen blir gjentatt daglig",
REPEAT_WEEKLY: "Denne oppføringen blir gjentatt ukentlig",
REPEAT_DAILY_SHORT: "Daglig",
REPEAT_WEEKLY_SHORT: "Ukentlig",
REPEAT_MONTHLY_SHORT: "Månedlig",

REPEATS: "Gjentas",
REPEATS_LABEL: "Gjentas:",

REPEAT_FREQUENCY_ONEWEEK: "Uke",
REPEAT_FREQUENCY_TWOWEEKS: "2. uke",
REPEAT_FREQUENCY_THREEWEEKS: "3. uke",
REPEAT_FREQUENCY_FOURWEEKS: "4. uke",
REPEAT_FREQUENCY_FIVEWEEKS: "5. uke",

REPEAT_MONTHLY_ON_THIS_DATE: "På denne datoen:",
REPEAT_MONTHLY_ON_THIS_DAY: "På denne dagen:",

DATE_OF_MONTH_1: "den 1.",
DATE_OF_MONTH_2: "den 2.",
DATE_OF_MONTH_3: "den 3.",
DATE_OF_MONTH_4: "den 4.",
DATE_OF_MONTH_5: "den 5.",
DATE_OF_MONTH_6: "den 6.",
DATE_OF_MONTH_7: "den 7.",
DATE_OF_MONTH_8: "den 8.",
DATE_OF_MONTH_9: "den 9.",
DATE_OF_MONTH_10: "den 10.",
DATE_OF_MONTH_11: "den 11.",
DATE_OF_MONTH_12: "den 12.",
DATE_OF_MONTH_13: "den 13.",
DATE_OF_MONTH_14: "den 14.",
DATE_OF_MONTH_15: "den 15.",
DATE_OF_MONTH_16: "den 16.",
DATE_OF_MONTH_17: "den 17.",
DATE_OF_MONTH_18: "den 18.",
DATE_OF_MONTH_19: "den 19.",
DATE_OF_MONTH_20: "den 20.",
DATE_OF_MONTH_21: "den 21.",
DATE_OF_MONTH_22: "den 22.",
DATE_OF_MONTH_23: "den 23.",
DATE_OF_MONTH_24: "den 24.",
DATE_OF_MONTH_25: "den 25.",
DATE_OF_MONTH_26: "den 26.",
DATE_OF_MONTH_27: "den 27.",
DATE_OF_MONTH_28: "den 28.",
DATE_OF_MONTH_29: "den 29.",
DATE_OF_MONTH_30: "den 30.",
DATE_OF_MONTH_31: "den 31.",

First_WEEK_OF_MONTH:"den 1.",
Second_WEEK_OF_MONTH:"den 2.",
Third_WEEK_OF_MONTH:"den 3.",
Fourth_WEEK_OF_MONTH:"den 4.",
LAST_WEEK_OF_MONTH:"den siste",

First_WEEK_OF_MONTH_FEMALE:"den 1.", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"den 2.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"den 3.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"den 4.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"den siste",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"den 1.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"den 2.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"den 3.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"den 4.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"den siste",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Velg dag i uken",
SELECT_WEEK_OF_MONTH:"Velg uke i måneden",
SELECT_DATE_OF_MONTH:"Velg dato i måneden",
Fieldset_Event:"Felt for å opprette eller redigere hendelsen",

MESSAGE_BY_DATE_SKIPPED : "Måneder som ikke inneholder denne datoen, vil bli hoppet over",

EVERY: "Hver:",
UNTIL: "Til:",
ON: "På:",

ADD_ANOTHER: "Legg til en til",
REPEAT_ON: "Gjenta på",

ADD_EVENT: "Opprett hendelse",
EDIT_EVENT: "Rediger hendelse",

NOTIFY: "Varsle andre personer",
NOTIFY_TITLE: "Varsle andre personer",
NOTIFY_OK: "Varsle",
DELETE: "Slett",
EDIT: "Rediger",
EDIT_LABEL: "Rediger:",
EDIT_THIS_INSTANCE: "Rediger denne forekomsten",
EDIT_THIS_SERIES: "Rediger hele serien",
FOLLOW: "Følg",
FOLLOW_THIS_INSTANCE: "Følg denne forekomsten",
FOLLOW_THIS_SERIES: "Følg hele serien",
UNFOLLOW: "Ikke følg lenger",

RSVP: "Skal delta",
RSVP_THIS_INSTANCE: "Delta i denne forekomsten",
RSVP_THIS_SERIES: "Delta i hele serien",
UNRSVP: "Skal ikke delta",

START_TIME_AFTER_END: "Starttidspunktet for hendelsen må være før sluttidspunktet",
START_DAY_AFTER_UNTIL_DAY: "Startdatoen for en gjentakende hendelse kan ikke være etter siste dato for gjentakelse",
DURATION_LARGER_THAN_24H: "Varigheten på hendelsen kan ikke være lengre enn 24 timer",
DESCRIPTION_LENGTH: 'Beskrivelsen er for lang',
SUBJECT_LENGTH: 'Hendelsetittelen er for lang',
LOCATION_LENGTH: 'Stedet er for langt',
IMAGE_URL_INVALID: 'Bilde-URL er ugyldig',
UNTIL_DATE: 'Oppgi en gyldig sluttdato for hendelsen',
NO_REPEAT_ON: 'Du må velge minst en dag for en gjentakende hendelse',
START_DATE_IN_PAST: 'Hendelse starter i fortiden',

SUBJECT_INVALID: 'Hendelsestittelen må være gyldig',
START_DATE_INVALID: 'Startdatoen må være gyldig',
START_TIME_INVALID: 'Startklokkeslettet må være gyldig',
END_DATE_INVALID: 'Sluttdatoen må være gyldig',
END_TIME_INVALID: 'Sluttklokkeslettet må være gyldig',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Ingen medlemmer var valgt. Velg minst ett medlem som skal varsles.',

NEXT_MONTH: "Vis neste måned",
PREVIOUS_MONTH: "Vis forrige måned",
CALENDAR_SUMMARY: "Månedlig kalender med huskelisteoppføringer",

SEND: "Send",
MAP_ROLE: "Medlemmer har rollen:",
READ_ACCESS: "Leser",
AUTHOR_ACCESS: "Forfatter (opprette og redigere egne hendelser)",
SAVE: "Lagre",
PREF_FORM_TITLE: "Rediger innstillinger for Kalender",
TAB_UPCOMING: "Hendelser",
TAB_CALENDAR: "Kalendervisning",
SUMMARY: "Sammendrag",
DETAILS: "Detaljer",
EVENT_TIME: "Hendelsestidspunkt",
UPDATED: "Oppdatert",
SORT_ASC: "Sorter stigende",
SORT_DESC: "Sorter synkende",
TODAY: "I dag",
TOMORROW: "I morgen",
YESTERDAY: "I går",
EVENT_NAME: "Hendelsesnavn",
SHOW_DETAILS: "vis detaljer",
SHOW_PASTEVENTS: "Vis tidligere hendelser",
SHOW_UPCOMINGEVENTS: "Vis forestående hendelser",
HIDE_DETAILS: "skjul detaljer",
SELECT_CHECKBOX: "klikk for å velge",
UNSELECT_CHECKBOX: "klikk for å oppheve valg",
NO_DESCRIPTION: "Ingen beskrivelse er gitt",
DISPLAY: "Vis",
REPEATS_FLAG: "(gjentas)",
STR_VIEW: "Vis:",
DISP_CALENDAR: "Kalenderrutenett",
DISP_LIST: "Sammendragsliste",

GOTO_EDIT_INFO: "Du må velge Fellesskapshandlinger -> Rediger fellesskap -> Kalender for å redigere innstillingene.",
VIEW_ALL_EVENTS: "Vis alle hendelser",
NO_EVENT_TODAY: "Ingen hendelse i dag",
ONE_EVENT_TODAY: "1 hendelse i dag",
X_EVENTS_TODAY: "${0} hendelser i dag",

OK: "OK",
UPCOMING_EVENTS: "Forestående hendelser",
PICK_MEMBERS: "Velg fellesskapsmedlemmer",
NOTIFICATION_MESSAGE: "Melding",
NOTIFY_OTHERS: "Varsle fellesskapsmedlemmer",
NOTIFY_DEFAULT_MESSAGE: "Hei. Jeg tenkte kanskje du kunne være interessert i denne hendelsen.",
NOTIFY_ERROR: "Det oppstod en feil ved varsling av personer: ${0}",
NOTIFY_SUCCESS: "Varselet ble sendt.",
NOTIFY_ERROR_2: "Hendelsen din er lagret, men det oppstod en feil da andre skulle varsles: ${0}",
INTERNAL_SERVER_ERR: "intern serverfeil",
INTERNAL_SERVER_NOT_AVAILABLE: "Det oppstod en feil ved visning av innhold. Kontakt systemadministratoren.",

ALT_WARNING_ICON: "Advarselsikon",
ALT_CONFIRM_ICON: "Bekreftelsesikon",
ALT_ERROR_ICON: "Feilikon",
A11Y_WARNING_LABEL: "Advarsel:",
A11Y_CONFIRM_LABEL: "Bekreftelse:",
A11Y_ERROR_LABEL: "Feil:",

TAB_ABOUT: "Om",
TAB_COMMENT: "Kommentarer (${0})",
ADD_COMMENT: "Legg til en kommentar...",
ENTER_COMMENT: "Skriv inn kommentaren din:",
ENTER_COMMENT_ERROR: "Skriv inn kommentaren din og klikk på Lagre. Hvis du ikke vil lage en kommentar likevel, klikker du på Avbryt.",
COMMENT_META: "${0} kommenterte ${1}",
CONFIRM_DELETE_COMMENT: "Er du sikker på at du vil slette kommentaren?",
NO_COMMENT: "Det er ingen kommentarer.",

EVENT_DELETE_ERROR: "Kunne ikke slette hendelsen. Hendelsen er kanskje slettet. Oppdater (forny) siden og prøv igjen.",


TAB_ATTENDEE: "${0} personer deltar",
NO_ATTENDEE: "Det er ingen deltakere.",
NO_INSTANCE: "Det er ingen forestående hendelser.",
NO_UPCOMING_FOLLOWED: "Du følger ingen forestående hendelser.",
NO_UPCOMING_ATTENDED: "Du deltar ikke i noen forestående hendelser.",
NO_UPCOMING_FOLLOWATTENDED: "Du følger eller deltar ikke i noen forestående hendelser.",

FOLLOWED_EVENTS_LABEL: "Hendelser du følger:",
ATTENDED_EVENTS_LABEL: "Hendelser du planlegger å delta i:",
FOLLOWATTENDED_EVENTS_LABEL: "Hendelser du følger og planlegger å delta i:",

PAGING_INFO: "${0} - ${1} av ${2}",
PAGING_INFO_TITLE: "Vis elementene ${0} til og med ${1} av ${2}",
PAGING_PREVIOUS: "Forrige",
PAGING_PREVIOUS_TITLE: "Forrige side",
PAGING_NEXT: "Neste",
PAGING_NEXT_TITLE: "Neste side",
PAGING_SHOW: "Vis",
PAGING_LABEL: "Sideveksling",

PAGING_COMMENT_LABEL:"Sideveksling for kommentarer (toppkontroll)",
PAGING_COMMENT_BOTTOM_LABEL:"Sideveksling for kommentarer (bunnkontroll)",
PAGING_ATTENDEE_LABEL:"Sideveksling for deltakere (toppkontroll)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Sideveksling for deltakere (bunnkontroll)",

PAGING_ITEMS: "elementer",
PAGING_PAGE_TITLE: "Vis ${0} elementer per side",
PAGING_PAGE_TITLE2: "Side ${0}",
PAGING_PAGE_TITLE3: "Klikk for å vise ${0} elementer per side",
PAGING_JUMPTO: "Gå til side ${0} av ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Sidetall",
PAGEING_JUMP_LABEL:"Hvis du endrer verdien, blir sideresultatene oppdatert",

DETAIL_WHEN: "Dato: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Klokkeslett: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} av ${1}",
ABOUT_ADDED: "Opprettet:",
ABOUT_UPDATED: "Oppdatert:",

WITH_TAGS: "Med tagger:",
TAGS_TITLE: "Tagger",
TAGS_REMOVE_HINT: "Fjern taggen ${0} fra de valgte filtertaggene",

HELP: "Hjelp",
CLOSE_HELP: "Lukk hjelpen",

TAGCLOUD_HELP: "En tagg er et nøkkelord som du tildeler til en fellesskapshendelse for å kategorisere den og gjøre det lett å finne den. Skriv inn eller klikk på en tagg for å se fellesskapshendelsene som er knyttet til den. Populære tagger blir vist i større, mørkere tekst i taggskyen.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Laster inn...",
NOT_AUTHORIZED: "Du har ikke autorisasjon til å utføre handlingen.",
STARTS:"Starter:",
ENDS:"Slutter:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} klokken ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "En tagg er et nøkkelord du tildeler innhold for å gjøre det enklere å finne det. Tagger må være enkeltord, for eksempel lønning eller personale, atskilt med komma eller mellomrom.",
INVALID_CHAR_IN_TAG: "Listen over merker du skrev inn, inneholder det ugyldige tegnet &. Fjern dette tegnet fra listen over merker.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Det er ingen forestående hendelser.",
NO_UPCOMING_EVENTS_MSG: "Det er ingen forestående hendelser i dette fellesskapet.",
NO_PAST_EVENTS_MSG: "Det er ingen tidligere hendelser i dette fellesskapet.",

OWNER: "Eier",
MEMBER: "Medlem",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Hendelseshandlinger",
EVENT_VIEWS_NAVIGATION: "Hendelsesvisninger",

EVENTS_VIEW_TOOLBAR_LABEL: "Hendelseshandlinger",

ALLDAY_UPDATED_MSG_HINT: "Start- og sluttidspunkt for hendelsen er oppdatert tilsvarende.",

EVENT_STARTTIME_LABEL: "Starttidspunkt for hendelse",
EVENT_ENDTIME_LABEL: "Sluttidspunkt for hendelse",

REPEATS_ENABLE_DISABLE_HINT: "Klikk for å aktivere eller deaktivere gjentakelsesalternativene",
REPEATING_OPTIONS_HINT: "Gjentakelsesalternativer",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Oppgi dato. Eksempel: ${0}",
ENTER_TIME_EXAMPLE: "Oppgi klokkeslett. Eksempel: ${0}",

REQUIRED: "Obligatorisk",

COLLAPSED_SECTION: "Sammentrukket seksjon",
EXPANDED_SECTION: "Utvidet seksjon",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Rediger bare denne forekomsten eller rediger hele serien. Hvis du redigerer hele serien, overskriver du ikke endringene du tidligere har gjort for enkeltforekomster av denne hendelsen.",

REPEATING_FREQUENCY: "Gjentakelsesfrekvens",
REPEATING_UNTIL: "Gjenta til",
REPEATING_ON: "Gjenta på",

CALENDAR_PREF_SAVE_CONFIRM: "Endringene for Kalender er lagret.",
HIDE_THIS_MESSAGE: "Skjul denne meldingen",

EVENT_OPEN_ERR_NOTFOUND: "Kunne ikke åpne fellesskapshendelsen. Mulig årsak: Hendelsen er allerede slettet.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (tid:${1}, sted:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (tid:${1}).",
LINK_OPEN_INFO: "${0} (tid:${1}, sted:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (tid:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Hvis du klikker på koblingen, åpnes den i et nytt vindu.",

WARNING_ICON: "Advarselsikon",

MENTION: {
	NOT_MEMBER_WARNING: "Følgende personer som er omtalt, vil ikke kunne vise meldingen fordi de ikke er medlemmer av fellesskapet.",
	NOT_SAME_ORGANIZATION_WARNING: "Følgende personer som er omtalt, vil ikke kunne se meldingen fordi de er i en annen organisasjon."
},
SELECT_ALL: "&Velg alle"
})
