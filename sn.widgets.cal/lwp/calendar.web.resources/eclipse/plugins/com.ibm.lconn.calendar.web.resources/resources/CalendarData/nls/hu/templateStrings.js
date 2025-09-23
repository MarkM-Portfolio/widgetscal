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
TITLE: "Események",

CREATE_BUTTON: "Esemény létrehozása",
CREATE_BUTTON_TOOLTIP: "Új esemény létrehozása a kiválasztott napon",
EDIT_BUTTON: "Esemény szerkesztése",
EDIT_BUTTON_TOOLTIP: "Kiválasztott esemény szerkesztése",
DELETE_BUTTON: "Esemény törlése",
DELETE_BUTTON_TOOLTIP: "Kiválasztott esemény törlése",
BACKTOCAL: "Vissza a közösségi eseményekhez",
BACKTOCAL2: "Ide kattintva visszaléphet a közösségi eseményekhez",
MORE_ACTIONS: "További műveletek",

DAY_VIEW_TOOLTIP: "Egy napi nézet",
TWODAY_VIEW_TOOLTIP: "Két napi nézet",
FIVEDAY_VIEW_TOOLTIP: "Öt napi nézet",
WEEK_VIEW_TOOLTIP: "Heti nézet",
MONTH_VIEW_TOOLTIP: "Havi nézet",

DAY_VIEW: "Egy nap",
TWODAY_VIEW: "Két nap",
FIVEDAY_VIEW: "Öt nap",
WEEK_VIEW: "Hét",
MONTH_VIEW: "Hónap",

ICAL_FEED: "Hozzáadás személyes naptárhoz",
ICAL_FEED_DIALOG_TITLE: "Hozzáadás személyes naptárhoz",

ICAL_FEED_HINT: "Másolja ki az URL címet és adja hozzá a naptár alkalmazásához iCal hírforrásként:",
ICAL_FEED_SUBSCRIBE_HINT: "A HCL Connections-eseményekre számos alkalmazásban, például a HCL Notesban és a Microsoft Outlookban is feliratkozhat. Kattintson a következő URL-re, ha fel szeretne iratkozni a közösség összes eseményére. A naptáralkalmazástól függően előfordulhat, hogy az URL-t be kell másolnia az adott alkalmazásba.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "A HCL Connections-eseményekre számos alkalmazásban, például a HCL Notesban és a Microsoft Outlookban is feliratkozhat. Az alábbi URL-re kattintva feliratkozhat az összes olyan eseményre, amelyet követ vagy amelyen részt vesz. A naptáralkalmazástól függően előfordulhat, hogy az URL-t be kell másolnia az adott alkalmazásba.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "A HCL Connections-eseményekre számos alkalmazásban, például a HCL Notesban és a Microsoft Outlookban is feliratkozhat. Az alábbi URL-re kattintva feliratkozhat az összes olyan eseményre, amelyet követ. A naptáralkalmazástól függően előfordulhat, hogy az URL-t be kell másolnia az adott alkalmazásba.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "A HCL Connections-eseményekre számos alkalmazásban, például a HCL Notesban és a Microsoft Outlookban is feliratkozhat. Az alábbi URL-re kattintva feliratkozhat az összes olyan eseményre, amelyen részt vesz. A naptáralkalmazástól függően előfordulhat, hogy az URL-t be kell másolnia az adott alkalmazásba.",
ICAL_FEED_HINT_POPUP: "Kattintson a jobb egérgombbal és másolja az URL-címet, majd adja hozzá a naptár alkalmazásához iCal hírfolyamként",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "A közösségi események megjelennek a Notes vagy Outlook személyes naptárában, ha az alábbi hírfolyamra kattint:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Hogyan kell:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Közösségi eseményeket hozzáadni a Notes naptárhoz",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Közösségi eseményeket hozzáadni az Outlook alkalmazáshoz",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Közösségi eseményeket hozzáadni a Google naptárhoz",

ICAL_FEED_EXPORT_ICS:	"Exportálás naptárba (.ics)",

DELETE_CONFIRM_SINGLE: "Biztosan törli ezt az eseményt?",
DELETE_CONFIRM_SERIES: "Egyetlen példányt vagy a teljes sorozatot törli?",
DELETE_INSTACE_OPTION: "Csak a példány törlése",
DELETE_SERIES_OPTION: "Teljes sorozat törlése",
DELETE_DIALOG_BUTTON: "Törlés",

FOLLOW_CONFIRM_SERIES: "Egyetlen példány vagy a teljes sorozat követése?",
FOLLOW_INSTACE_OPTION: "Csak ennek a példánynak a követése",
FOLLOW_SERIES_OPTION: "A teljes sorozat követése",
FOLLOW_DIALOG_BUTTON: "Követés",
FOLLOW_CONFIRM: "Követi ezt az eseményt. Adja hozzá a naptár alkalmazásához <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal hírfolyamon</a> keresztül.",
FOLLOW_ENTIRESERIES_CONFIRM: "Követi ezt az eseménysorozatot. Adja hozzá a naptár alkalmazásához <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal hírfolyamon</a> keresztül.",
UNFOLLOW_CONFIRM: "Abbahagyta az esemény követését.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Abbahagyta az eseménysorozat követését.",

RSVP_CONFIRM_SERIES: "Részvétel egyetlen példányon vagy a teljes sorozaton?",
RSVP_INSTACE_OPTION: "Részvétel csak ezen a példányon",
RSVP_SERIES_OPTION: "Részvétel a teljes sorozaton",
RSVP_DIALOG_BUTTON: "Részvétel",
RSVP_CONFIRM: "Részt vesz ezen az eseményen. Adja hozzá a naptár alkalmazásához <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal hírfolyamon</a> keresztül.",
RSVP_ENTIRESERIES_CONFIRM: "Részt vesz ezen az eseménysorozaton. Adja hozzá a naptár alkalmazásához <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal hírfolyamon</a> keresztül.",
UNRSVP_CONFIRM: "Visszavonta a részvételét az eseményen.",
UNRSVP_ENTIRESERIES_CONFIRM: "Visszavonta a részvételét az eseménysorozaton.",


SU: "Vas",
MO: "Hét",
TU: "Ked",
WE: "Sze",
TH: "Csü",
FR: "Pén",
SA: "Szo",
SU_FULL: "Vasárnap",
MO_FULL: "Hétfő",
TU_FULL: "Kedd",
WE_FULL: "Szerda",
TH_FULL: "Csütörtök",
FR_FULL: "Péntek",
SA_FULL: "Szombat",

DAYS: "nap",
WEEKS: "Hét",
MONTHS: "havi tartalom archiválása",
YEARS: "év",
DAY: "nap",
WEEK: "Hét",
MONTH: "hónap",
YEAR: "év",

ON_THE_MONTHLY_DAY: "A hónap napján: ||",
ON_THE_MONTHLY_WEEKDAY: "A hónap napján: ||",

REMOVE: "Eltávolítás",

ERROR: "Hiba",
ERROR_HEADER: "Ellenőrizze a következőket:",

WARNING: "Figyelmeztetés",
WARNING_HEADER: "Figyelmeztetés",

CREATED_BY: "Létrehozta: ${0}",
CREATED_ON: "Létrehozva: ${0}",
UPDATED_ON: "Frissítve: ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Létrehozva ekkor: ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Frissítés ideje: ${0}",
WHEN: "Ha:",
REPEATS: "Ismétlések:",
DATE: "Dátum",
ON: "Ekkor:",
ALL_DAY_EVENT:"Egész napos esemény",
ALL_DAY:"Egész napos esemény",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, Egész nap",
RECURRENCE: "Ismétlődés",
SUBJECT: "Tárgy:",
EVENT_TITLE: "Esemény címe:",
TAGS: "Címkék:",
DESCRIPTION: "Leírás:",
LOCATION: "Hely:",
IMAGE_URL: "Kép URL címe:",
SUBMIT: "Elküldés",
SAVE: "Mentés",
CANCEL: "Mégse",
SAVECLOSE: "Mentés és bezárás",
DELETE: "Példány törlése",
FROM: "kezdete:",
TO: "-",
CLOSE: "Bezárás",
OPEN: "Megnyitás",
CLOSE_SECTION: "Szakasz bezárása",
OPEN_SECTION: "Szakasz megnyitása",
NO: "Nem",
CONFIRM: "Megerősítés",
CLEAR_EXCEPTIONS_CONFIRM: "Újraütemezi egy ismétlődő találkozó több példányát. Az összes ilyen példány ugyanazzal a relatív időmennyiséggel lesz eltolva, beleértve a korábban újraütemezetteket is. Nézze át a módosítások hatásait.\n\nBiztosan folytatja?",

DAILY: "Naponta",
WEEKLY: "Hetente",
BIWEEKLY: "Kéthetente",
EVERY_X_WEEK: "Minden ${0}. héten",
MONTHLY: "Havonta",
MONTHLY_BY_DAY: "Havonta nap szerint",
MONTHLY_BY_WEEKDAY: "Havonta hét napja szerint",
YEARLY: "Évente",
CUSTOM: "Egyéni",
NONE: "Nincs",
REPEAT_NONE: "Ez a bejegyzés nem ismétlődik",
REPEAT_DAILY: "Ez a bejegyzés naponta ismétlődik",
REPEAT_WEEKLY: "Ez a bejegyzés hetente ismétlődik",
REPEAT_DAILY_SHORT: "Naponta",
REPEAT_WEEKLY_SHORT: "Hetente",
REPEAT_MONTHLY_SHORT: "Havonta",

REPEATS: "Ismétlődés",
REPEATS_LABEL: "Ismétlések:",

REPEAT_FREQUENCY_ONEWEEK: "Hét",
REPEAT_FREQUENCY_TWOWEEKS: "2 hetente",
REPEAT_FREQUENCY_THREEWEEKS: "3 hetente",
REPEAT_FREQUENCY_FOURWEEKS: "4 hetente",
REPEAT_FREQUENCY_FIVEWEEKS: "5 hetente",

REPEAT_MONTHLY_ON_THIS_DATE: "Ezen a dátumon:",
REPEAT_MONTHLY_ON_THIS_DAY: "Ezen a napon:",

DATE_OF_MONTH_1: "az 1.",
DATE_OF_MONTH_2: "a 2.",
DATE_OF_MONTH_3: "a 3.",
DATE_OF_MONTH_4: "a 4.",
DATE_OF_MONTH_5: "az 5.",
DATE_OF_MONTH_6: "a 6.",
DATE_OF_MONTH_7: "a 7.",
DATE_OF_MONTH_8: "a 8.",
DATE_OF_MONTH_9: "a 9.",
DATE_OF_MONTH_10: "a 10.",
DATE_OF_MONTH_11: "a 11.",
DATE_OF_MONTH_12: "a 12.",
DATE_OF_MONTH_13: "a 13.",
DATE_OF_MONTH_14: "a 14.",
DATE_OF_MONTH_15: "a 15.",
DATE_OF_MONTH_16: "a 16.",
DATE_OF_MONTH_17: "a 17.",
DATE_OF_MONTH_18: "a 18.",
DATE_OF_MONTH_19: "a 19.",
DATE_OF_MONTH_20: "a 20.",
DATE_OF_MONTH_21: "a 21.",
DATE_OF_MONTH_22: "a 22.",
DATE_OF_MONTH_23: "a 23.",
DATE_OF_MONTH_24: "a 24.",
DATE_OF_MONTH_25: "a 25.",
DATE_OF_MONTH_26: "a 26.",
DATE_OF_MONTH_27: "a 27.",
DATE_OF_MONTH_28: "a 28.",
DATE_OF_MONTH_29: "a 29.",
DATE_OF_MONTH_30: "a 30.",
DATE_OF_MONTH_31: "a 31.",

First_WEEK_OF_MONTH:"az 1.",
Second_WEEK_OF_MONTH:"a 2.",
Third_WEEK_OF_MONTH:"a 3.",
Fourth_WEEK_OF_MONTH:"a 4.",
LAST_WEEK_OF_MONTH:"az utolsó",

First_WEEK_OF_MONTH_FEMALE:"az 1.", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"a 2.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"a 3.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"a 4.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"az utolsó",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"az 1.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"a 2.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"a 3.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"a 4.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"az utolsó",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Válassza ki a hét napját",
SELECT_WEEK_OF_MONTH:"Válassza ki a hónap hetét",
SELECT_DATE_OF_MONTH:"Válassza ki a hónapon belüli dátumot",
Fieldset_Event:"Mezők az esemény létrehozásához vagy szerkesztéséhez",

MESSAGE_BY_DATE_SKIPPED : "A dátumot nem tartalmazó hónapok ki lesznek hagyva.",

EVERY: "Minden",
UNTIL: "Eddig:",
ON: "Ekkor:",

ADD_ANOTHER: "Másik hozzáadása",
REPEAT_ON: "Ismétlődés:",

ADD_EVENT: "Esemény létrehozása",
EDIT_EVENT: "Esemény szerkesztése",

NOTIFY: "Mások értesítése",
NOTIFY_TITLE: "Mások értesítése",
NOTIFY_OK: "Értesítés",
DELETE: "Törlés",
EDIT: "Szerkesztés",
EDIT_LABEL: "Szerkesztés:",
EDIT_THIS_INSTANCE: "Példány szerkesztése",
EDIT_THIS_SERIES: "Teljes sorozat szerkesztése",
FOLLOW: "Követés",
FOLLOW_THIS_INSTANCE: "Példány követése",
FOLLOW_THIS_SERIES: "Teljes sorozat követése",
UNFOLLOW: "Követés leállítása",

RSVP: "Részvétel",
RSVP_THIS_INSTANCE: "Részvétel ezen a példányon",
RSVP_THIS_SERIES: "Részvétel a teljes sorozaton",
UNRSVP: "Nem vesz részt",

START_TIME_AFTER_END: "Az esemény kezdeti idejének a befejezési idő előtt kell lennie",
START_DAY_AFTER_UNTIL_DAY: "Egy ismétlődő esemény kezdődátuma nem lehet az ismétlődés befejezési dátumánál későbbi",
DURATION_LARGER_THAN_24H: "Az esemény időtartama nem lehet nagyobb 24 óránál. Hozzon létre inkább egy ismétlődő eseményt.",
DESCRIPTION_LENGTH: 'A leírás túl hosszú',
SUBJECT_LENGTH: 'Az esemény neve túl hosszú',
LOCATION_LENGTH: 'A hely túl hosszú',
IMAGE_URL_INVALID: 'A kép url címe érvénytelen',
UNTIL_DATE: 'Adjon meg érvényes befejezési dátumot az eseményhez',
NO_REPEAT_ON: 'Legalább egy napot ki kell választani egy ismétlődő eseményhez',
START_DATE_IN_PAST: 'Az események a múltban kezdődnek',

SUBJECT_INVALID: 'Az esemény címének érvényesnek kell lennie',
START_DATE_INVALID: 'A kezdődátumnak érvényesnek kell lennie',
START_TIME_INVALID: 'A kezdőidőnek érvényesnek kell lennie',
END_DATE_INVALID: 'A befejezési dátumnak érvényesnek kell lennie',
END_TIME_INVALID: 'A befejezési időnek érvényesnek kell lennie',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Nem volt kiválasztva tag. Válasszon ki legalább egy értesítendő tagot.',

NEXT_MONTH: "Következő hónap megjelenítése",
PREVIOUS_MONTH: "Előző hónap megjelenítése",
CALENDAR_SUMMARY: "Havi naptár tennivaló elemekkel",

SEND: "Küldés",
MAP_ROLE: "Tagok szerepköre:",
READ_ACCESS: "Olvasó",
AUTHOR_ACCESS: "Szerző (saját események létrehozása és szerkesztése)",
SAVE: "Mentés",
PREF_FORM_TITLE: "Naptárbeállítások szerkesztése",
TAB_UPCOMING: "Események",
TAB_CALENDAR: "Naptár nézet",
SUMMARY: "Összegzés",
DETAILS: "Részletek",
EVENT_TIME: "Esemény időpontja",
UPDATED: "Frissítve",
SORT_ASC: "Növekvő rendezés",
SORT_DESC: "Csökkenő rendezés",
TODAY: "Ma",
TOMORROW: "Holnap",
YESTERDAY: "Tegnap",
EVENT_NAME: "Esemény neve",
SHOW_DETAILS: "részletek megjelenítése",
SHOW_PASTEVENTS: "Múltbeli események megjelenítése",
SHOW_UPCOMINGEVENTS: "Jövőbeli események megjelenítése",
HIDE_DETAILS: "részletek elrejtése",
SELECT_CHECKBOX: "kattintson ide a kiválasztáshoz",
UNSELECT_CHECKBOX: "kattintson ide a kiválasztás megszüntetéséhez",
NO_DESCRIPTION: "Nincs megadva leírás",
DISPLAY: "Megjelenítés",
REPEATS_FLAG: "(ismétlődés)",
STR_VIEW: "Megjelenítés:",
DISP_CALENDAR: "Naptár rács",
DISP_LIST: "Összefoglaló lista",

GOTO_EDIT_INFO: "A beállítások szerkesztéséhez használja a Közösségi műveletek -> Közösség szerkesztése -> Naptár menüpontot.",
VIEW_ALL_EVENTS: "Összes esemény megtekintése",
NO_EVENT_TODAY: "Ma nincs esemény",
ONE_EVENT_TODAY: "1 esemény van ma",
X_EVENTS_TODAY: "${0} esemény van ma",

OK: "OK",
UPCOMING_EVENTS: "Események a közeljövőben",
PICK_MEMBERS: "Közösségi tagok kiválasztása",
NOTIFICATION_MESSAGE: "Üzenet",
NOTIFY_OTHERS: "Közösségi tagok értesítése",
NOTIFY_DEFAULT_MESSAGE: "Szia! Úgy gondoltam, érdekelhet ez az esemény.",
NOTIFY_ERROR: "Hiba történt a személyek értesítésekor: ${0}",
NOTIFY_SUCCESS: "Az értesítés elküldése sikerült.",
NOTIFY_ERROR_2: "Az esemény el lett mentve, de hiba történt mások értesítésekor: ${0}",
INTERNAL_SERVER_ERR: "Belső kiszolgálóhiba",
INTERNAL_SERVER_NOT_AVAILABLE: "Hiba történt a tartalom megjelenítésekor. Lépjen kapcsolatba a rendszeradminisztrátorral.",

ALT_WARNING_ICON: "Figyelmeztetés ikon",
ALT_CONFIRM_ICON: "Megerősítés ikon",
ALT_ERROR_ICON: "Hiba ikon",
A11Y_WARNING_LABEL: "Figyelem:",
A11Y_CONFIRM_LABEL: "Megerősítés:",
A11Y_ERROR_LABEL: "Hiba:",

TAB_ABOUT: "Névjegy",
TAB_COMMENT: "Megjegyzések (${0})",
ADD_COMMENT: "Megjegyzés hozzáadása...",
ENTER_COMMENT: "Írja be a megjegyzést:",
ENTER_COMMENT_ERROR: "Adja meg a megjegyzését és kattintson a 'Mentés' gombra. Ha mégsem akar megjegyzést hagyni, akkor kattintson a 'Mégse' gombra.",
COMMENT_META: "${0} megjegyzést írt: ${1}",
CONFIRM_DELETE_COMMENT: "Biztosan törli a megjegyzést?",
NO_COMMENT: "Nincsenek megjegyzések",

EVENT_DELETE_ERROR: "Nem sikerült az esemény törlése. Lehet, hogy az eseményt már törölték. Frissítse az oldalt és próbálkozzon újra.",


TAB_ATTENDEE: "${0} személy vesz részt",
NO_ATTENDEE: "Nincsenek résztvevők.",
NO_INSTANCE: "Nincsenek események a közeljövőben.",
NO_UPCOMING_FOLLOWED: "Nem követ semmilyen közelgő eseményt.",
NO_UPCOMING_ATTENDED: "Nem vesz részt semmilyen közelgő eseményen.",
NO_UPCOMING_FOLLOWATTENDED: "Nem követ semmilyen közelgő eseményt és nem tervezi a részvételt semmilyen közelgő eseményen.",

FOLLOWED_EVENTS_LABEL: "Követett események:",
ATTENDED_EVENTS_LABEL: "Események, amelyeken tervezi a részvételt:",
FOLLOWATTENDED_EVENTS_LABEL: "Azon események, amelyeket követ és amelyeken tervezi a részvételt:",

PAGING_INFO: "${0} - ${1} / ${2}",
PAGING_INFO_TITLE: "${0} - ${1} elem megjelenítése, összesen: ${2}",
PAGING_PREVIOUS: "Előző",
PAGING_PREVIOUS_TITLE: "Előző oldal",
PAGING_NEXT: "Következő",
PAGING_NEXT_TITLE: "Következő oldal",
PAGING_SHOW: "Megjelenítés",
PAGING_LABEL: "Lapozás",

PAGING_COMMENT_LABEL:"Megjegyzések lapozása (Felső vezérlőelem)",
PAGING_COMMENT_BOTTOM_LABEL:"Megjegyzések lapozása (Alsó vezérlőelem)",
PAGING_ATTENDEE_LABEL:"Résztvevő személyek lapozása (Felső vezérlőelem)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Résztvevő személyek lapozása (Alsó vezérlőelem)",

PAGING_ITEMS: "elem",
PAGING_PAGE_TITLE: "${0} elem megjelenítése oldalanként",
PAGING_PAGE_TITLE2: "${0}. oldal",
PAGING_PAGE_TITLE3: "Kattintson ide oldalanként ${0} elem megjelenítéséhez",
PAGING_JUMPTO: "Ugrás a következő oldalra: ${0}, összesen: ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Oldalszám",
PAGEING_JUMP_LABEL:"Az érték módosítása frissíti az oldal eredményeit",

DETAIL_WHEN: "Mikor: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Időpont: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} ${1} által",
ABOUT_ADDED: "Létrehozva:",
ABOUT_UPDATED: "Frissítve:",

WITH_TAGS: "Címkékkel:",
TAGS_TITLE: "Címkék",
TAGS_REMOVE_HINT: "${0} címke eltávolítása a kijelölt szűrőcímkék közül",

HELP: "Súgó",
CLOSE_HELP: "Súgó bezárása",

TAGCLOUD_HELP: "A címke egy közösségi eseményhez hozzárendelt kulcsszó, amely kategorizálja azt és megkönnyíti a keresését. Írjon be egy címkét, vagy kattintson rá a hozzá tartozó közösségi események megtekintéséhez. A népszerű címkék nagyobb, sötétebb szöveggel jelennek meg a címketerületen.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Betöltés...",
NOT_AUTHORIZED: "Nem jogosult a művelet végrehajtására.",
STARTS:"Kezdete:",
ENDS:"Vége:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0}, ${1} időpontban",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "A címke tartalomhoz rendelt kulcsszó, amely megkönnyíti a keresést. A címkék csak egyetlen szóból állhatnak, mint például fizetés vagy emberi_erőforrások, és vesszővel vagy szóközzel kell elválasztania őket egymástól.",
INVALID_CHAR_IN_TAG: "A megadott címkelista a következő érvénytelen karaktert tartalmazza: &.  Távolítsa el ezt a karaktert a címkelistából.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Nincsenek események a közeljövőben.",
NO_UPCOMING_EVENTS_MSG: "Ebben a közösségben nincsenek események a közeljövőben.",
NO_PAST_EVENTS_MSG: "Ebben a közösségben nincsenek múltbeli események.",

OWNER: "Tulajdonos",
MEMBER: "Tag",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Eseményműveletek",
EVENT_VIEWS_NAVIGATION: "Eseménynézetek",

EVENTS_VIEW_TOOLBAR_LABEL: "Eseményműveletek",

ALLDAY_UPDATED_MSG_HINT: "Az esemény kezdési és befejezési ideje megfelelően frissült.",

EVENT_STARTTIME_LABEL: "Esemény kezdési ideje",
EVENT_ENDTIME_LABEL: "Esemény befejezési ideje",

REPEATS_ENABLE_DISABLE_HINT: "Kattintson az ismétlési beállítások engedélyezéséhez vagy letiltásához",
REPEATING_OPTIONS_HINT: "Ismétlési beállítások",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Adjon meg egy dátumot. Például: ${0}",
ENTER_TIME_EXAMPLE: "Adjon meg egy időpontot. Például: ${0}",

REQUIRED: "Kötelező",

COLLAPSED_SECTION: "Összezárt szakasz",
EXPANDED_SECTION: "Kibontott szakasz",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Szerkessze csak ezt a példányt vagy a teljes sorozatot.  A teljes sorozat szerkesztésével nem írja felül az esemény egyetlen példányán korábban végrehajtott módosításokat.",

REPEATING_FREQUENCY: "Ismétlődés gyakorisága",
REPEATING_UNTIL: "Ismétlődés vége",
REPEATING_ON: "Ismétlődés:",

CALENDAR_PREF_SAVE_CONFIRM: "A naptár módosításainak mentése sikerült.",
HIDE_THIS_MESSAGE: "Üzenet elrejtése",

EVENT_OPEN_ERR_NOTFOUND: "Nem sikerült a közösségi esemény megnyitása. Lehetséges ok: az eseményt már törölték.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (idő:${1}, hely:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (idő:${1}).",
LINK_OPEN_INFO: "${0} (idő:${1}, hely:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (idő:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"A hivatkozásra kattintva új ablak nyílik meg.",

WARNING_ICON: "Figyelmeztetés ikon",

MENTION: {
	NOT_MEMBER_WARNING: "A következő említett személyek nem tekinthetik meg az üzenetet, mert nem tagjai a közösségnek.",
	NOT_SAME_ORGANIZATION_WARNING: "A következő említett személyek nem láthatják az üzenetet, mert más szervezet tagjai."
},
SELECT_ALL: "Összes kijelölése"
})
