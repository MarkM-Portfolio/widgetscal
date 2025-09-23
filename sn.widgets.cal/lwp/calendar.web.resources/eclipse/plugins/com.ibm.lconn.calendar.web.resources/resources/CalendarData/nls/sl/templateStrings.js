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
TITLE: "Dogodki",

CREATE_BUTTON: "Ustvari dogodek",
CREATE_BUTTON_TOOLTIP: "Ustvarite nov dogodek na izbran dan",
EDIT_BUTTON: "Urejanje dogodka",
EDIT_BUTTON_TOOLTIP: "Uredite izbran dogodek",
DELETE_BUTTON: "Izbriši dogodek",
DELETE_BUTTON_TOOLTIP: "Izbrišite izbran dogodek",
BACKTOCAL: "Nazaj na dogodke skupnosti",
BACKTOCAL2: "Kliknite, če se želite vrniti na dogodke skupnosti",
MORE_ACTIONS: "Več dejanj",

DAY_VIEW_TOOLTIP: "Dnevni pogled",
TWODAY_VIEW_TOOLTIP: "Dvodnevni pogled",
FIVEDAY_VIEW_TOOLTIP: "Petdnevni pogled",
WEEK_VIEW_TOOLTIP: "Tedenski pogled",
MONTH_VIEW_TOOLTIP: "Mesečni pogled",

DAY_VIEW: "En dan",
TWODAY_VIEW: "Dva dni",
FIVEDAY_VIEW: "Pet dni",
WEEK_VIEW: "Teden",
MONTH_VIEW: "Mesec",

ICAL_FEED: "Dodaj v osebni koledar",
ICAL_FEED_DIALOG_TITLE: "Dodaj v osebni koledar",

ICAL_FEED_HINT: "Prekopirajte ta URL in ga naročite na aplikacijo koledarja kot vir iCal:",
ICAL_FEED_SUBSCRIBE_HINT: "Na dogodke HCL Connections se lahko naročite v aplikacijah, kot sta HCL Notes in Microsoft Outlook. Kliknite naslednji URL, da se naročite na vse dogodke v tej skupnosti. Glede na koledarsko aplikacijo, ki jo uporabljate, boste morda morali URL kopirati vanjo.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "Na dogodke HCL Connections se lahko naročite v aplikacijah, kot sta HCL Notes in Microsoft Outlook. Kliknite naslednji URL, da se naročite na vse dogodke, ki jih spremljate ali se jih boste udeležili. Glede na koledarsko aplikacijo, ki jo uporabljate, boste morda morali URL kopirati vanjo.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "Na dogodke HCL Connections se lahko naročite v aplikacijah, kot sta HCL Notes in Microsoft Outlook. Kliknite naslednji URL, da se naročite na vse dogodke, ki jih spremljate. Glede na koledarsko aplikacijo, ki jo uporabljate, boste morda morali URL kopirati vanjo.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "Na dogodke HCL Connections se lahko naročite v aplikacijah, kot sta HCL Notes in Microsoft Outlook. Kliknite naslednji URL, da se naročite na vse dogodke, ki se jih boste udeležili. Glede na koledarsko aplikacijo, ki jo uporabljate, boste morda morali URL kopirati vanjo.",
ICAL_FEED_HINT_POPUP: "Kliknite z desno miškino tipko in prekopirajte ta URL in ga naročite na aplikacijo koledarja kot vir iCal",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Kliknite spodnji vir, če želite, da se dogodki skupnosti pojavijo v vašem koledarju Notes ali Outlook:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Nasveti za:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Dodajanje dogodkov skupnosti v koledar Notes",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Dodajanje dogodkov skupnosti v koledar Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Dodajanje dogodkov skupnosti v koledar Google",

ICAL_FEED_EXPORT_ICS:	"Izvozi v koledar (.ics)",

DELETE_CONFIRM_SINGLE: "Ali ste prepričani, da želite izbrisati ta dogodek?",
DELETE_CONFIRM_SERIES: "Ali želite izbrisati en primerek ali celoten niz?",
DELETE_INSTACE_OPTION: "Izbriši samo ta primerek",
DELETE_SERIES_OPTION: "Izbriši celoten niz",
DELETE_DIALOG_BUTTON: "Izbriši",

FOLLOW_CONFIRM_SERIES: "Ali želite spremljati en primerek ali celoten niz?",
FOLLOW_INSTACE_OPTION: "Spremljaj samo ta primerek",
FOLLOW_SERIES_OPTION: "Spremljaj celoten niz",
FOLLOW_DIALOG_BUTTON: "Spremljaj",
FOLLOW_CONFIRM: "Ta dogodek spremljate. Naročite ga na aplikacijo koledarja prek <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">vira iCal</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "To serijo dogodkov spremljate. Naročite ga na aplikacijo koledarja prek <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">vira iCal</a>.",
UNFOLLOW_CONFIRM: "Prenehali ste spremljati ta dogodek.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Prenehali ste spremljati to serijo dogodkov.",

RSVP_CONFIRM_SERIES: "Ali se želite udeležiti enega samega primerka ali celotnega niza?",
RSVP_INSTACE_OPTION: "Udeleži se samo tega primerka",
RSVP_SERIES_OPTION: "Udeleži se celotnega niza",
RSVP_DIALOG_BUTTON: "Udeleži se",
RSVP_CONFIRM: "Tega dogodka se boste udeležili. Naročite ga na aplikacijo koledarja prek <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">vira iCal</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Te serije dogodkov se boste udeležili. Naročite ga na aplikacijo koledarja prek <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">vira iCal</a>.",
UNRSVP_CONFIRM: "Tega dogodka se ne udeležujete več.",
UNRSVP_ENTIRESERIES_CONFIRM: "Te serije dogodkov se ne udeležujete več.",


SU: "Ned",
MO: "Pon",
TU: "Tor",
WE: "Sre",
TH: "Čet",
FR: "Pet",
SA: "Sob",
SU_FULL: "Nedelja",
MO_FULL: "Ponedeljek",
TU_FULL: "Torek",
WE_FULL: "Sreda",
TH_FULL: "Četrtek",
FR_FULL: "Petek",
SA_FULL: "Sobota",

DAYS: "dnevi",
WEEKS: "tedni",
MONTHS: "meseci",
YEARS: "leta",
DAY: "dan",
WEEK: "Teden",
MONTH: "mesec",
YEAR: "leto",

ON_THE_MONTHLY_DAY: "|| v mesecu.",
ON_THE_MONTHLY_WEEKDAY: "|| v mesecu.",

REMOVE: "Odstrani",

ERROR: "Napaka",
ERROR_HEADER: "Preverite naslednje",

WARNING: "Opozorilo",
WARNING_HEADER: "Opozorilo",

CREATED_BY: "Ustvarila oseba ${0}",
CREATED_ON: "Ustvarjeno ${0}",
UPDATED_ON: "Posodobljeno ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Ustvarjeno: ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Posodobil(-a) ${0}",
WHEN: "Kdaj:",
REPEATS: "Ponovitve:",
DATE: "Datum",
ON: "Dan:",
ALL_DAY_EVENT:"Celodnevni dogodek",
ALL_DAY:"Celodnevni dogodek",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, celodnevni dogodek",
RECURRENCE: "Ponovitve",
SUBJECT: "Zadeva:",
EVENT_TITLE: "Naslov dogodka:",
TAGS: "Oznake:",
DESCRIPTION: "Opis:",
LOCATION: "Mesto:",
IMAGE_URL: "URL slike:",
SUBMIT: "Predloži",
SAVE: "Shrani",
CANCEL: "Prekliči",
SAVECLOSE: "Shrani in zapri",
DELETE: "Izbriši primerek",
FROM: "od",
TO: "do",
CLOSE: "Zapri",
OPEN: "Odpri",
CLOSE_SECTION: "Zapri razdelek",
OPEN_SECTION: "Odpri razdelek",
NO: "Ne",
CONFIRM: "Potrdi",
CLEAR_EXCEPTIONS_CONFIRM: "Znova načrtujete več primerkov ponavljajočega se sestanka. Ti primerki bodo premaknjeni za isti relativni čas, vključno s tistimi, ki ste jih znova dodali na urnik pred tem. Preglejte učinke teh sprememb.\n\nAli ste prepričani, da želite nadaljevati?",

DAILY: "Dnevno",
WEEKLY: "Tedensko",
BIWEEKLY: "Dvotedensko",
EVERY_X_WEEK: "Vsakih ${0} tednov",
MONTHLY: "Mesečno",
MONTHLY_BY_DAY: "Mesečno po dnevu",
MONTHLY_BY_WEEKDAY: "Mesečno po delovnem dnevu",
YEARLY: "Letno",
CUSTOM: "Po meri",
NONE: "Brez",
REPEAT_NONE: "Ta vnos se ne ponavlja",
REPEAT_DAILY: "Ta vnos se ponavlja dnevno",
REPEAT_WEEKLY: "Ta vnos se ponavlja tedensko",
REPEAT_DAILY_SHORT: "Dnevno",
REPEAT_WEEKLY_SHORT: "Tedensko",
REPEAT_MONTHLY_SHORT: "Mesečno",

REPEATS: "Ponovitve",
REPEATS_LABEL: "Ponovitve:",

REPEAT_FREQUENCY_ONEWEEK: "Teden",
REPEAT_FREQUENCY_TWOWEEKS: "2 tedna",
REPEAT_FREQUENCY_THREEWEEKS: "3 tedne",
REPEAT_FREQUENCY_FOURWEEKS: "4 tedne",
REPEAT_FREQUENCY_FIVEWEEKS: "5 tednov",

REPEAT_MONTHLY_ON_THIS_DATE: "Na ta datum:",
REPEAT_MONTHLY_ON_THIS_DAY: "Na ta dan:",

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
LAST_WEEK_OF_MONTH:"zadnji",

First_WEEK_OF_MONTH_FEMALE:"1.", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"2.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"3.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"4.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"zadnji",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"1.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"2.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"3.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"4.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"zadnji",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Izberi dan v tednu",
SELECT_WEEK_OF_MONTH:"Izberi teden v mesecu",
SELECT_DATE_OF_MONTH:"Izberi datum v mesecu",
Fieldset_Event:"Polja za ustvarjanje ali urejanje dogodka",

MESSAGE_BY_DATE_SKIPPED : "Meseci, ki ne vsebujejo tega datuma, bodo preskočeni",

EVERY: "Vsakih:",
UNTIL: "Do:",
ON: "Dan:",

ADD_ANOTHER: "Dodaj drugega",
REPEAT_ON: "Ponovi",

ADD_EVENT: "Ustvari dogodek",
EDIT_EVENT: "Urejanje dogodka",

NOTIFY: "Obvesti druge osebe",
NOTIFY_TITLE: "Obvesti druge osebe",
NOTIFY_OK: "Obvesti",
DELETE: "Izbriši",
EDIT: "Urejanje",
EDIT_LABEL: "Urejanje:",
EDIT_THIS_INSTANCE: "Urejanje tega primerka",
EDIT_THIS_SERIES: "Urejanje celotnega niza",
FOLLOW: "Spremljaj",
FOLLOW_THIS_INSTANCE: "Spremljaj ta primerek",
FOLLOW_THIS_SERIES: "Spremljaj celoten niz",
UNFOLLOW: "Prenehaj spremljati",

RSVP: "Se bom udeležil",
RSVP_THIS_INSTANCE: "Udeleži se tega primerka",
RSVP_THIS_SERIES: "Udeleži se celotnega niza",
UNRSVP: "Se ne bom udeležil",

START_TIME_AFTER_END: "Čas začetka dogodka mora biti pred časom zaključka.",
START_DAY_AFTER_UNTIL_DAY: "Datum začetka ponavljajočega se dogodka ne sme biti po datumu, dokler naj se dogodek ponavlja.",
DURATION_LARGER_THAN_24H: "Dogodek ne sme trajati več kot 24 ur. Namesto tega ustvarite ponavljajoči se dogodek.",
DESCRIPTION_LENGTH: 'Opis je predolg.',
SUBJECT_LENGTH: 'Naslov dogodka je predolg.',
LOCATION_LENGTH: 'Mesto je predolgo.',
IMAGE_URL_INVALID: 'URL slike ni veljaven.',
UNTIL_DATE: 'Podajte veljaven datum zaključka dogodka.',
NO_REPEAT_ON: 'Za ponavljajoč se dogodek morate izbrati vsaj en dan.',
START_DATE_IN_PAST: 'Dogodek se začne v preteklosti',

SUBJECT_INVALID: 'Naslov dogodka mora biti veljaven.',
START_DATE_INVALID: 'Datum začetka mora biti veljaven.',
START_TIME_INVALID: 'Čas začetka mora biti veljaven.',
END_DATE_INVALID: 'Datum zaključka mora biti veljaven.',
END_TIME_INVALID: 'Čas zaključka mora biti veljaven.',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Izbran ni bil noben član. Za obveščanje izberite vsaj enega člana.',

NEXT_MONTH: "Prikaži naslednji mesec",
PREVIOUS_MONTH: "Prikaži prejšnji mesec",
CALENDAR_SUMMARY: "Mesečni koledar z opravili",

SEND: "Pošlji",
MAP_ROLE: "Člani imajo naslednjo vlogo:",
READ_ACCESS: "Bralec",
AUTHOR_ACCESS: "Avtor (ustvarjanje in urejanje lastnih dogodkov)",
SAVE: "Shrani",
PREF_FORM_TITLE: "Urejanje nastavitev koledarja",
TAB_UPCOMING: "Dogodki",
TAB_CALENDAR: "Pogled koledarja",
SUMMARY: "Povzetek",
DETAILS: "Podrobnosti",
EVENT_TIME: "Čas dogodka",
UPDATED: "Posodobljeno",
SORT_ASC: "Razvrsti naraščajoče",
SORT_DESC: "Razvrsti padajoče",
TODAY: "Danes",
TOMORROW: "Jutri",
YESTERDAY: "Včeraj",
EVENT_NAME: "Ime dogodka",
SHOW_DETAILS: "Pokaži podrobnosti",
SHOW_PASTEVENTS: "Pokaži pretekle dogodke",
SHOW_UPCOMINGEVENTS: "Pokaži prihajajoče dogodke",
HIDE_DETAILS: "Skrij podrobnosti",
SELECT_CHECKBOX: "Kliknite, če želite izbrati",
UNSELECT_CHECKBOX: "Kliknite, da razveljavite izbiro",
NO_DESCRIPTION: "Opis ni bil podan.",
DISPLAY: "Prikaži",
REPEATS_FLAG: "(se ponavlja)",
STR_VIEW: "Pogled:",
DISP_CALENDAR: "Mreža koledarja",
DISP_LIST: "Seznam povzetka",

GOTO_EDIT_INFO: "Če želite urejati nastavitve, izberite Dejanja skupnosti -> Urejanje skupnosti -> Koledar.",
VIEW_ALL_EVENTS: "Pokaži vse dogodke",
NO_EVENT_TODAY: "Danes ni dogodka",
ONE_EVENT_TODAY: "Danes je 1 dogodek",
X_EVENTS_TODAY: "Danes je ${0} dogodkov",

OK: "V redu",
UPCOMING_EVENTS: "Prihajajoči dogodki",
PICK_MEMBERS: "Izberite člane skupnosti",
NOTIFICATION_MESSAGE: "Sporočilo",
NOTIFY_OTHERS: "Obvesti člane skupnosti",
NOTIFY_DEFAULT_MESSAGE: "Pozdravljeni, mislim, da bi vas lahko zanimal ta dogodek.",
NOTIFY_ERROR: "Med obveščanjem oseb je prišlo do napake: ${0}",
NOTIFY_SUCCESS: "Obvestilo je bilo uspešno poslano.",
NOTIFY_ERROR_2: "Vaš dogodek je shranjen, vendar je med obveščanjem drugih prišlo do napake: ${0}",
INTERNAL_SERVER_ERR: "notranja napaka strežnika",
INTERNAL_SERVER_NOT_AVAILABLE: "Med prikazovanjem vsebine je prišlo do napake. Obrnite se na skrbnika sistema.",

ALT_WARNING_ICON: "Ikona Opozorilo",
ALT_CONFIRM_ICON: "Ikona Potrditev",
ALT_ERROR_ICON: "Ikona napake",
A11Y_WARNING_LABEL: "Opozorilo:",
A11Y_CONFIRM_LABEL: "Potrditev:",
A11Y_ERROR_LABEL: "Napaka:",

TAB_ABOUT: "Vizitka",
TAB_COMMENT: "Komentarji (${0})",
ADD_COMMENT: "Dodaj komentar ...",
ENTER_COMMENT: "Vnesite komentar:",
ENTER_COMMENT_ERROR: "Vnesite komentar in kliknite 'Shrani'. Če komentarja ne želite pustiti, kliknite 'Prekliči'.",
COMMENT_META: "Oseba ${0} je komentirala ${1}",
CONFIRM_DELETE_COMMENT: "Ali ste prepričani, da želite izbrisati komentar?",
NO_COMMENT: "Ni komentarjev.",

EVENT_DELETE_ERROR: "Izbris dogodka ni uspel. Dogodek je bil morda že izbrisan. Osvežite stran in poskusite znova.",


TAB_ATTENDEE: "Udeleženci (${0})",
NO_ATTENDEE: "Ni udeležencev.",
NO_INSTANCE: "Ni prihajajočih dogodkov.",
NO_UPCOMING_FOLLOWED: "Ne spremljate nobenega od prihajajočih dogodkov.",
NO_UPCOMING_ATTENDED: "Udeležili se ne boste nobenega od prihajajočih dogodkov.",
NO_UPCOMING_FOLLOWATTENDED: "Prihajajočih dogodkov ne spremljate ali se jih ne boste udeležili.",

FOLLOWED_EVENTS_LABEL: "Dogodki, ki jih spremljate:",
ATTENDED_EVENTS_LABEL: "Dogodki, ki se jih nameravate udeležiti:",
FOLLOWATTENDED_EVENTS_LABEL: "Dogodki, ki jih spremljate ali se jih nameravate udeležiti:",

PAGING_INFO: "${0} - ${1} od ${2}",
PAGING_INFO_TITLE: "Pokaži postavke ${0} do ${1} od skupno ${2}",
PAGING_PREVIOUS: "Nazaj",
PAGING_PREVIOUS_TITLE: "Prejšnja stran",
PAGING_NEXT: "Naprej",
PAGING_NEXT_TITLE: "Naslednja stran",
PAGING_SHOW: "Pokaži",
PAGING_LABEL: "Ostranjevanje",

PAGING_COMMENT_LABEL:"Ostranjevanje komentarjev (Zgornji kontrolnik)",
PAGING_COMMENT_BOTTOM_LABEL:"Ostranjevanje komentarjev (Spodnji kontrolnik)",
PAGING_ATTENDEE_LABEL:"Ostranjevanje udeležencev (Zgornji kontrolnik)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Ostranjevanje udeležencev (Spodnji kontrolnik)",

PAGING_ITEMS: "postavk",
PAGING_PAGE_TITLE: "Pokaži ${0} postavk na stran",
PAGING_PAGE_TITLE2: "Stran ${0}",
PAGING_PAGE_TITLE3: "Kliknite, da prikažete ${0} postavk na stran",
PAGING_JUMPTO: "Skoči na stran ${0} od ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Številka strani",
PAGEING_JUMP_LABEL:"Če spremenite vrednost, se bodo rezultati strani osvežili",

DETAIL_WHEN: "Kdaj: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Čas: ${0}-${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} uporabnik ${1}",
ABOUT_ADDED: "Ustvarjeno:",
ABOUT_UPDATED: "Posodobljeno:",

WITH_TAGS: "Z oznakami:",
TAGS_TITLE: "Oznake",
TAGS_REMOVE_HINT: "Odstrani oznako ${0} iz izbranih filtrirnih oznak",

HELP: "Pomoč",
CLOSE_HELP: "Zapri pomoč",

TAGCLOUD_HELP: "Oznaka je ključna beseda, ki jo dodelite dogodku skupnosti, da ga kategorizirate in poenostavite njegovo iskanje. Vnesite ali kliknite oznako, da prikažete dogodke skupnosti, povezane z njo. Popularne oznake so v oblaku oznak prikazane v večjem, temnejšem besedilu.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Nalaganje ...",
NOT_AUTHORIZED: "Za izvedbo dejanja nimate pooblastila.",
STARTS:"Začetek:",
ENDS:"Zaključek:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} ob ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Oznaka je ključna beseda, ki jo dodelite vsebini, da jo lažje najdete. Oznake morajo biti posamezne besede, kot sta plačilna_lista ali kadrovska_služba, ki jih ločite z vejicami ali presledki.",
INVALID_CHAR_IN_TAG: "Seznam oznak, ki ste ga vnesli, vsebuje neveljaven znak »&«. Odstranite ga s seznama oznak.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Ni prihajajočih dogodkov.",
NO_UPCOMING_EVENTS_MSG: "V tej skupnosti ni prihajajočih dogodkov.",
NO_PAST_EVENTS_MSG: "V tej skupnosti ni preteklih dogodkov.",

OWNER: "Lastnik",
MEMBER: "Član",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Dejanja dogodkov",
EVENT_VIEWS_NAVIGATION: "Pogledi dogodkov",

EVENTS_VIEW_TOOLBAR_LABEL: "Dejanja dogodkov",

ALLDAY_UPDATED_MSG_HINT: "Čas začetka in čas zaključka dogodka sta bila ustrezno posodobljena.",

EVENT_STARTTIME_LABEL: "Čas začetka dogodka",
EVENT_ENDTIME_LABEL: "Čas zaključka dogodka",

REPEATS_ENABLE_DISABLE_HINT: "Kliknite, če želite omogočiti ali onemogočiti ponavljanje možnosti",
REPEATING_OPTIONS_HINT: "Ponavljanje možnosti",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Vnesite datum. Primer: ${0}",
ENTER_TIME_EXAMPLE: "Vnesite čas. Primer: ${0}",

REQUIRED: "Obvezno",

COLLAPSED_SECTION: "Strnjen razdelek",
EXPANDED_SECTION: "Razširjen razdelek",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Uredite samo ta primerek ali celoten niz.  Z urejanjem celotnega niza ne prepišete sprememb, ki ste jih izvedli pred tem v posameznih primerkih tega dogodka.",

REPEATING_FREQUENCY: "Pogostost ponavljanja",
REPEATING_UNTIL: "Ponavljaj do",
REPEATING_ON: "Ponovi",

CALENDAR_PREF_SAVE_CONFIRM: "Spremembe koledarja so bile shranjene.",
HIDE_THIS_MESSAGE: "Skrij to sporočilo",

EVENT_OPEN_ERR_NOTFOUND: "Odpiranje dogodka skupnosti ni uspelo. Možen vzrok: dogodek je bil že izbrisan.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (time:${1}, location:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (time:${1}).",
LINK_OPEN_INFO: "${0} (time:${1}, location:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (time:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Povezava, ki jo kliknete, se bo odprla v novem oknu.",

WARNING_ICON: "Ikona Opozorilo",

MENTION: {
	NOT_MEMBER_WARNING: "Naslednje omenjene osebe si ne bodo mogle ogledati sporočila, ker niso člani skupnosti.",
	NOT_SAME_ORGANIZATION_WARNING: "Naslednje omenjene osebe si ne bodo mogle ogledati sporočila, ker so v drugi organizaciji."
},
SELECT_ALL: "Izberi vse"
})
