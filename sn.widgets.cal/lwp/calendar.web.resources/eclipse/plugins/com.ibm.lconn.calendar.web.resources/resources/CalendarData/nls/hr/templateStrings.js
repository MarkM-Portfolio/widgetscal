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
TITLE: "Događaji",

CREATE_BUTTON: "Kreiraj događaj",
CREATE_BUTTON_TOOLTIP: "Kreiraj novi događaj na izabranom danu",
EDIT_BUTTON: "Uređivanje događaja",
EDIT_BUTTON_TOOLTIP: "Uredi izabrani događaj",
DELETE_BUTTON: "Izbriši događaj",
DELETE_BUTTON_TOOLTIP: "Izbriši izabrani događaj",
BACKTOCAL: "Natrag na događaje zajednice",
BACKTOCAL2: "Kliknite za povratak na događaje zajednice",
MORE_ACTIONS: "Više akcija",

DAY_VIEW_TOOLTIP: "Jednodnevni pogled",
TWODAY_VIEW_TOOLTIP: "Dvodnevni pogled",
FIVEDAY_VIEW_TOOLTIP: "Petodnevni pogled",
WEEK_VIEW_TOOLTIP: "Tjedni pogled",
MONTH_VIEW_TOOLTIP: "Mjesečni pogled",

DAY_VIEW: "Jedan dan",
TWODAY_VIEW: "Dva dana",
FIVEDAY_VIEW: "Pet dana",
WEEK_VIEW: "Tjedan",
MONTH_VIEW: "Mjesec",

ICAL_FEED: "Dodaj u osobni kalendar",
ICAL_FEED_DIALOG_TITLE: "Dodaj u osobni kalendar",

ICAL_FEED_HINT: "Kopirajte ovaj URL i pretplatite se na njega u vašoj aplikaciji kalendara kao iCal tekuće informacije:",
ICAL_FEED_SUBSCRIBE_HINT: "Možete se pretplatiti na HCL Connections događaje u mnogim aplikacijama, kao što su HCL Notes i Microsoft Outlook.  Kliknite na sljedeći URL da biste se pretplatili na sve događaje za tu zajednicu.  Ovisno o aplikaciji kalendara, možda ćete trebati kopirati URL u tu aplikaciju.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "Možete se pretplatiti na HCL Connections događaje u mnogim aplikacijama, kao što su HCL Notes i Microsoft Outlook.  Kliknite na sljedeći URL da biste se pretplatili na sve događaje koje pratite ili kojima prisustvujete.  Ovisno o aplikaciji kalendara, možda ćete trebati kopirati URL u tu aplikaciju.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "Možete se pretplatiti na HCL Connections događaje u mnogim aplikacijama, kao što su HCL Notes i Microsoft Outlook.  Kliknite na sljedeći URL da biste se pretplatili na sve događaje koje pratite.  Ovisno o aplikaciji kalendara, možda ćete trebati kopirati URL u tu aplikaciju.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "Možete se pretplatiti na HCL Connections događaje u mnogim aplikacijama, kao što su HCL Notes i Microsoft Outlook.  Kliknite na sljedeći URL da biste se pretplatili na sve događaje kojima prisustvujete.  Ovisno o aplikaciji kalendara, možda ćete trebati kopirati URL u tu aplikaciju.",
ICAL_FEED_HINT_POPUP: "Desni klik i kopirajte ovaj URL, pretplatite se na njega u vašoj aplikaciji kalendara kao iCal tekuće informacije:",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Neka se vaši događaji zajednice pojavljuju u vašem osobnom kalendaru Notesa ili Outlooka tako da kliknete na donje tekuće informacije:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Kako:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Dodati događaje zajednice u Notes kalendar",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Dodati događaje zajednice u Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Dodati događaje zajednice u Google kalendar",

ICAL_FEED_EXPORT_ICS:	"Eksportiranje u kalendar (.ics)",

DELETE_CONFIRM_SINGLE: "Da li ste sigurni da želite izbrisati ovaj događaj?",
DELETE_CONFIRM_SERIES: "Izbrisati jednu instancu ili izbrisati cijelu seriju?",
DELETE_INSTACE_OPTION: "Izbrisati samo ovu instancu",
DELETE_SERIES_OPTION: "Izbrisati cijelu seriju",
DELETE_DIALOG_BUTTON: "Izbriši",

FOLLOW_CONFIRM_SERIES: "Pratiti jednu instancu ili cijelu seriju?",
FOLLOW_INSTACE_OPTION: "Prati samo jednu instancu",
FOLLOW_SERIES_OPTION: "Prati cijelu seriju",
FOLLOW_DIALOG_BUTTON: "Prati",
FOLLOW_CONFIRM: "Pratili ste ovaj događaj. Pretplatite ga u vašu aplikaciju kalendara kroz <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal feed</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Pratili ste ovu seriju događaja. Pretplatite ga u vašu aplikaciju kalendara kroz <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal feed</a>.",
UNFOLLOW_CONFIRM: "Zaustavili ste praćenje ovog događaja.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Zaustavili ste praćenje ove serije događaja.",

RSVP_CONFIRM_SERIES: "Nadzirati jednu instancu ili nadzirati cijelu seriju?",
RSVP_INSTACE_OPTION: "Nadziri samo jednu instancu",
RSVP_SERIES_OPTION: "Nadziri cijelu seriju",
RSVP_DIALOG_BUTTON: "Nadzirati",
RSVP_CONFIRM: "Vi nadzirete ovaj događaj. Pretplatite ga u vašu aplikaciju kalendara kroz <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal feed</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Prisustvujete ovoj seriji događaja. Pretplatite ga u vašu aplikaciju kalendara kroz <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal feed</a>.",
UNRSVP_CONFIRM: "Prestali ste prisustvovati ovom događaju.",
UNRSVP_ENTIRESERIES_CONFIRM: "Prestali ste prisustvovati ovoj seriji događaja.",


SU: "Ned",
MO: "Pon",
TU: "Uto",
WE: "Sri",
TH: "Čet",
FR: "Pet",
SA: "Sub",
SU_FULL: "Nedjelja",
MO_FULL: "Ponedjeljak",
TU_FULL: "Utorak",
WE_FULL: "Srijeda",
TH_FULL: "Četvrtak",
FR_FULL: "Petak",
SA_FULL: "Subota",

DAYS: "dani",
WEEKS: "tjedni",
MONTHS: "mjeseci",
YEARS: "godine",
DAY: "dan",
WEEK: "Tjedan",
MONTH: "mjesec",
YEAR: "godina",

ON_THE_MONTHLY_DAY: "Na || u mjesecu.",
ON_THE_MONTHLY_WEEKDAY: "Na || u mjesecu.",

REMOVE: "Ukloni",

ERROR: "Greška",
ERROR_HEADER: "Molim provjerite sljedeće",

WARNING: "Upozorenje",
WARNING_HEADER: "Upozorenje",

CREATED_BY: "Kreirao ${0}",
CREATED_ON: "Kreirano ${0}",
UPDATED_ON: "Ažurirano ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Kreirano ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Ažurirano ${0}",
WHEN: "Kada:",
REPEATS: "Ponavljanja:",
DATE: "Datum",
ON: "Na:",
ALL_DAY_EVENT:"Cjelodnevni događaj",
ALL_DAY:"Cijeli dan",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, cijeli dan",
RECURRENCE: "Ponavljanja",
SUBJECT: "Predmet:",
EVENT_TITLE: "Naslov događaja:",
TAGS: "Oznake:",
DESCRIPTION: "Opis:",
LOCATION: "Lokacija:",
IMAGE_URL: "URL slike:",
SUBMIT: "Pošalji",
SAVE: "Spremi",
CANCEL: "Opoziv",
SAVECLOSE: "Spremi i zatvori",
DELETE: "Izbriši instancu",
FROM: "od",
TO: "za",
CLOSE: "Zatvori",
OPEN: "Otvori",
CLOSE_SECTION: "Zatvori odjeljak",
OPEN_SECTION: "Otvori odjeljak",
NO: "Ne",
CONFIRM: "Potvrda",
CLEAR_EXCEPTIONS_CONFIRM: "Ponovno raspoređujete višestruke instance ponavljajućeg sastanka. Ove instance će sve biti pomaknute za istu relativnu količinu vremena uključujući one koje su bile prethodno ponovno raspodijeljene. Molim, pregledajte učinke ovih promjena. \n\nJeste li sigurni da želite nastaviti?",

DAILY: "Dnevno",
WEEKLY: "Tjedno",
BIWEEKLY: "Dvotjedno",
EVERY_X_WEEK: "Svakih ${0} tjedana",
MONTHLY: "Mjesečno",
MONTHLY_BY_DAY: "Mjesečno po danu",
MONTHLY_BY_WEEKDAY: "Mjesečno radnim danom",
YEARLY: "Godišnje",
CUSTOM: "Prilagođeno",
NONE: "Ništa",
REPEAT_NONE: "Ovaj se unos ne ponavlja",
REPEAT_DAILY: "Ovaj se unos ponavlja dnevno",
REPEAT_WEEKLY: "Ovaj se unos ponavlja tjedno",
REPEAT_DAILY_SHORT: "Dnevno",
REPEAT_WEEKLY_SHORT: "Tjedno",
REPEAT_MONTHLY_SHORT: "Mjesečno",

REPEATS: "Ponavljanja",
REPEATS_LABEL: "Ponavljanja:",

REPEAT_FREQUENCY_ONEWEEK: "Tjedan",
REPEAT_FREQUENCY_TWOWEEKS: "2 tjedna",
REPEAT_FREQUENCY_THREEWEEKS: "3 tjedna",
REPEAT_FREQUENCY_FOURWEEKS: "4 tjedna",
REPEAT_FREQUENCY_FIVEWEEKS: "5 tjedana",

REPEAT_MONTHLY_ON_THIS_DATE: "Na ovaj datum:",
REPEAT_MONTHLY_ON_THIS_DAY: "Na ovaj datum:",

DATE_OF_MONTH_1: "prvi",
DATE_OF_MONTH_2: "drugi",
DATE_OF_MONTH_3: "treći",
DATE_OF_MONTH_4: "četvrti",
DATE_OF_MONTH_5: "peti",
DATE_OF_MONTH_6: "šesti",
DATE_OF_MONTH_7: "sedmi",
DATE_OF_MONTH_8: "osmi",
DATE_OF_MONTH_9: "deveti",
DATE_OF_MONTH_10: "deseti",
DATE_OF_MONTH_11: "jedanaesti",
DATE_OF_MONTH_12: "dvanaesti",
DATE_OF_MONTH_13: "trinaesti",
DATE_OF_MONTH_14: "četrnaesti",
DATE_OF_MONTH_15: "petnaesti",
DATE_OF_MONTH_16: "šesnaesti",
DATE_OF_MONTH_17: "sedamnaesti",
DATE_OF_MONTH_18: "osamnaesti",
DATE_OF_MONTH_19: "devetnaesti",
DATE_OF_MONTH_20: "dvadeseti",
DATE_OF_MONTH_21: "dvadeset i prvi",
DATE_OF_MONTH_22: "dvadeset i drugi",
DATE_OF_MONTH_23: "dvadeset i treći",
DATE_OF_MONTH_24: "dvadeset i četvrti",
DATE_OF_MONTH_25: "dvadeset i peti",
DATE_OF_MONTH_26: "dvadeset i šesti",
DATE_OF_MONTH_27: "dvadeset i sedmi",
DATE_OF_MONTH_28: "dvadeset i osmi",
DATE_OF_MONTH_29: "dvadeset i deveti",
DATE_OF_MONTH_30: "trideseti",
DATE_OF_MONTH_31: "trideset i prvi",

First_WEEK_OF_MONTH:"prvi",
Second_WEEK_OF_MONTH:"drugi",
Third_WEEK_OF_MONTH:"treći",
Fourth_WEEK_OF_MONTH:"četvrti",
LAST_WEEK_OF_MONTH:"zadnji",

First_WEEK_OF_MONTH_FEMALE:"prvi", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"drugi",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"treći",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"četvrti",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"zadnji",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"prvi",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"drugi",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"treći",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"četvrti",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"zadnji",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Izaberite dan u tjednu",
SELECT_WEEK_OF_MONTH:"Izaberite tjedan u mjesecu",
SELECT_DATE_OF_MONTH:"Izaberite dan u mjesecu",
Fieldset_Event:"Polja za kreiranje ili uređivanje događaja",

MESSAGE_BY_DATE_SKIPPED : "Mjeseci koji ne sadrže ovaj datum bit će preskočeni",

EVERY: "Svakih:",
UNTIL: "Do:",
ON: "Na:",

ADD_ANOTHER: "Dodaj drugi",
REPEAT_ON: "Ponovi",

ADD_EVENT: "Kreiranje događaja",
EDIT_EVENT: "Uređivanje događaja",

NOTIFY: "Obavijesti druge osobe",
NOTIFY_TITLE: "Obavijesti druge osobe",
NOTIFY_OK: "Obavijesti",
DELETE: "Izbriši",
EDIT: "Uredi",
EDIT_LABEL: "Uredi:",
EDIT_THIS_INSTANCE: "Uredi ovu instancu",
EDIT_THIS_SERIES: "Uredi cijelu seriju",
FOLLOW: "Prati",
FOLLOW_THIS_INSTANCE: "Prati ovu instancu",
FOLLOW_THIS_SERIES: "Prati cijelu seriju",
UNFOLLOW: "Zaustavi praćenje",

RSVP: "Prisustvovat će",
RSVP_THIS_INSTANCE: "Prisustvuje ovoj instanci",
RSVP_THIS_SERIES: "Prisustvuje cijeloj seriji",
UNRSVP: "Neće prisustvovati",

START_TIME_AFTER_END: "Vrijeme početka događaja mora biti prije vremena završetka",
START_DAY_AFTER_UNTIL_DAY: "Datum početka ponavljajućeg događaja ne smije biti nakon njegovog ponavljanja do datuma",
DURATION_LARGER_THAN_24H: "Događaj ne bi trebao trajati više od 24 sata. Umjesto toga kreirajte ponavljajući događaj.",
DESCRIPTION_LENGTH: 'Opis je predug',
SUBJECT_LENGTH: 'Naslov događaja je predug',
LOCATION_LENGTH: 'Lokacija je preduga',
IMAGE_URL_INVALID: 'Url slike je neispravan',
UNTIL_DATE: 'Molim, navedite ispravan krajnji datum događaja',
NO_REPEAT_ON: 'Najmanje jedan dan se treba izabrati za ponavljajući događaj',
START_DATE_IN_PAST: 'Događaj počinje u prošlosti',

SUBJECT_INVALID: 'Naslov događaja mora biti ispravan',
START_DATE_INVALID: 'Datum početka mora biti ispravan',
START_TIME_INVALID: 'Vrijeme početka mora biti ispravno',
END_DATE_INVALID: 'Krajnji datum mora biti ispravan',
END_TIME_INVALID: 'Vrijeme završetka mora biti ispravno',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Nisu izabrani članovi. Molimo izaberite najmanje jednog člana za obavještavanje.',

NEXT_MONTH: "Prikaži sljedeći mjesec",
PREVIOUS_MONTH: "Prikaži prethodni mjesec",
CALENDAR_SUMMARY: "Mjesečni kalendar sa stavkama Za napraviti",

SEND: "Pošalji",
MAP_ROLE: "Članovi imaju ulogu:",
READ_ACCESS: "Čitač",
AUTHOR_ACCESS: "Autor (kreirajte i uredite njihove vlastite događaje)",
SAVE: "Spremi",
PREF_FORM_TITLE: "Uredi postavke kalendara",
TAB_UPCOMING: "Događaji",
TAB_CALENDAR: "Pogled kalendara",
SUMMARY: "Sažetak",
DETAILS: "Detalji",
EVENT_TIME: "Vrijeme događaja",
UPDATED: "Ažurirano",
SORT_ASC: "Sortiraj uzlazno",
SORT_DESC: "Sortiraj silazno",
TODAY: "Danas",
TOMORROW: "Sutra",
YESTERDAY: "Jučer",
EVENT_NAME: "Naziv događaja",
SHOW_DETAILS: "Pokaži detalje",
SHOW_PASTEVENTS: "Pokaži prošle događaje",
SHOW_UPCOMINGEVENTS: "Pokaži nadolazeće događaje",
HIDE_DETAILS: "Sakrij detalje",
SELECT_CHECKBOX: "kliknite za izbor",
UNSELECT_CHECKBOX: "kliknite za poništavanje izbora",
NO_DESCRIPTION: "Nije dan opis",
DISPLAY: "Prikaz",
REPEATS_FLAG: "(ponavljanja)",
STR_VIEW: "Pogled:",
DISP_CALENDAR: "Mreža kalendara",
DISP_LIST: "Lista sažetka",

GOTO_EDIT_INFO: "Trebate pratiti Akcije zajednice -> Uredi zajednicu -> Kalendar za uređivanje preferenca.",
VIEW_ALL_EVENTS: "Pogled svih događaja",
NO_EVENT_TODAY: "Nema događaja danas",
ONE_EVENT_TODAY: "1 događaj danas",
X_EVENTS_TODAY: "${0} događaja danas",

OK: "OK",
UPCOMING_EVENTS: "Nadolazeći događaji",
PICK_MEMBERS: "Izaberite članove zajednice",
NOTIFICATION_MESSAGE: "Poruka",
NOTIFY_OTHERS: "Obavijesti članove zajednice",
NOTIFY_DEFAULT_MESSAGE: "Bok-  Možda bi bili zainteresirani za ovaj događaj.",
NOTIFY_ERROR: "Dogodila se greška pri slanju obavijesti osobama: ${0}",
NOTIFY_SUCCESS: "Obavijest je uspješno poslana.",
NOTIFY_ERROR_2: "Vaš događaj je spremljen, ali je došlo do greške pri slanju obavijesti drugima: ${0}",
INTERNAL_SERVER_ERR: "interna greška poslužitelja",
INTERNAL_SERVER_NOT_AVAILABLE: "Dogodila se greška kod prikaza sadržaja. Kontaktirajte vašeg sistemskog administratora.",

ALT_WARNING_ICON: "ikona Upozorenje",
ALT_CONFIRM_ICON: "ikona Potvrda",
ALT_ERROR_ICON: "ikona Greške",
A11Y_WARNING_LABEL: "Upozorenje:",
A11Y_CONFIRM_LABEL: "Potvrda:",
A11Y_ERROR_LABEL: "Greška:",

TAB_ABOUT: "O proizvodu",
TAB_COMMENT: "Komentari (${0})",
ADD_COMMENT: "Dodavanje komentara...",
ENTER_COMMENT: "Unesite komentar:",
ENTER_COMMENT_ERROR: "Molim unesite vaš komentar i kliknite 'Spremi.' Ako ne želite ostaviti komentar kliknite 'Opoziv'.",
COMMENT_META: "${0} je komentirao o ${1}",
CONFIRM_DELETE_COMMENT: "Da li ste sigurni da želite brisati komentar?",
NO_COMMENT: "Nema komentara.",

EVENT_DELETE_ERROR: "Nije uspjelo brisanje događaja. Događaj je možda izbrisan. Molim, osvježite stranicu i pokušajte ponovno.",


TAB_ATTENDEE: "${0} ljudi prisustvuje",
NO_ATTENDEE: "Nema prisutnih.",
NO_INSTANCE: "Nema nadolazećih događaja.",
NO_UPCOMING_FOLLOWED: "Ne pratite nikakve nadolazeće događaje.",
NO_UPCOMING_ATTENDED: "Ne prisustvujete nikakvim nadolazećim događajima.",
NO_UPCOMING_FOLLOWATTENDED: "Ne pratite i prisustvujete nikakvim nadolazećim događajima.",

FOLLOWED_EVENTS_LABEL: "Događaji koje pratite:",
ATTENDED_EVENTS_LABEL: "Događaji na kojima planirate prisustvovati:",
FOLLOWATTENDED_EVENTS_LABEL: "Događaji koje pratite i na kojima planirate prisustvovati:",

PAGING_INFO: "${0} - ${1} od ${2}",
PAGING_INFO_TITLE: "Pokaži stavke ${0} do ${1} od ${2}",
PAGING_PREVIOUS: "Prethodno",
PAGING_PREVIOUS_TITLE: "Prethodna stranica",
PAGING_NEXT: "Sljedeće",
PAGING_NEXT_TITLE: "Sljedeća stranica",
PAGING_SHOW: "Pokaži",
PAGING_LABEL: "Podjela u stranice",

PAGING_COMMENT_LABEL:"Podjela komentara u stranice (kontrola na vrhu)",
PAGING_COMMENT_BOTTOM_LABEL:"Podjela komentara u stranice (kontrola na dnu)",
PAGING_ATTENDEE_LABEL:"Podjela prisutnih osoba u stranice (kontrola na vrhu)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Podjela prisutnih osoba u stranice (kontrola na dnu)",

PAGING_ITEMS: "stavke",
PAGING_PAGE_TITLE: "Pokaži ${0} stavaka po stranici",
PAGING_PAGE_TITLE2: "Stranica ${0}",
PAGING_PAGE_TITLE3: "Kliknite za prikaz ${0} stavaka po stranici",
PAGING_JUMPTO: "Skok na stranicu ${0} od ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Broj stranice",
PAGEING_JUMP_LABEL:"Promjena vrijednosti će osvježiti rezultate stranice",

DETAIL_WHEN: "Kada: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Vrijeme: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} od ${1}",
ABOUT_ADDED: "Kreirano:",
ABOUT_UPDATED: "Ažurirano:",

WITH_TAGS: "S oznakama:",
TAGS_TITLE: "Oznake",
TAGS_REMOVE_HINT: "Ukloni oznaku ${0} iz izabranih oznaka filtera",

HELP: "Pomoć",
CLOSE_HELP: "Zatvori pomoć",

TAGCLOUD_HELP: "Oznaka je ključna riječ koju dodjeljujete događaju zajednice da bi ga kategorizirali i da ga lakše pronađete. Upišite ili kliknite oznaku da vidite događaje zajednice koji su joj pridruženi. Popularne oznake se pojavljuju s većim, tamnijim tekstom u oblaku oznake.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Učitavanje...",
NOT_AUTHORIZED: "Niste ovlašteni za izvođenje akcije.",
STARTS:"Počinje:",
ENDS:"Završava:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} u ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Oznaka je ključna riječ koju dodjeljujete sadržaju da bi se on lakše pronalazio. Oznake moraju biti jedna riječ, kao plaće ili ljudski_resursi i trebaju se odvojiti zarezima ili praznim mjestom.",
INVALID_CHAR_IN_TAG: "Lista oznaka koju ste unijeli sadrži nevažeći znak \"&\".  Uklonite ovaj znak s liste oznaka.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Nema nadolazećih događaja.",
NO_UPCOMING_EVENTS_MSG: "Nema nadolazećih događaja u ovoj zajednici.",
NO_PAST_EVENTS_MSG: "Nema događaja u prošlosti u ovoj zajednici.",

OWNER: "Vlasnik",
MEMBER: "Član",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Akcije događaja",
EVENT_VIEWS_NAVIGATION: "Pogledi na događaj",

EVENTS_VIEW_TOOLBAR_LABEL: "Akcije događaja",

ALLDAY_UPDATED_MSG_HINT: "Vrijeme početka događaja i vrijeme završetka događaja su u skladu toga ažurirani.",

EVENT_STARTTIME_LABEL: "Vrijeme početka događaja",
EVENT_ENDTIME_LABEL: "Vrijeme završetka događaja",

REPEATS_ENABLE_DISABLE_HINT: "Kliknite za omogućavanje ili onemogućavanje ponavljajućih opcija",
REPEATING_OPTIONS_HINT: "Ponavljajuće opcije",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Unesite datum. Primjer: ${0}",
ENTER_TIME_EXAMPLE: "Unesite vrijeme. Primjer: ${0}",

REQUIRED: "Obavezno",

COLLAPSED_SECTION: "Skupljeni odjeljak",
EXPANDED_SECTION: "Prošireni odjeljak",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Uredite samo ovu instancu ili uredite cijelu seriju.  Uređivanje cijele serije neće pregaziti promjene koje ste prethodno napravili na jednoj instanci ovog događaja.",

REPEATING_FREQUENCY: "Frekvencija ponavljanja",
REPEATING_UNTIL: "Ponavljaj do",
REPEATING_ON: "Ponovi",

CALENDAR_PREF_SAVE_CONFIRM: "Vaše promjene za Kalendar su spremljene.",
HIDE_THIS_MESSAGE: "Sakrij ovu poruku",

EVENT_OPEN_ERR_NOTFOUND: "Neuspješno otvaranje događaja zajednice. Mogući uzrok: događaj je već izbrisan.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (vrijeme:${1}, lokacija:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (vrijeme:${1}).",
LINK_OPEN_INFO: "${0} (vrijeme:${1}, lokacija:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (vrijeme:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Veza će se otvoriti u novom prozoru.",

WARNING_ICON: "ikona Upozorenje",

MENTION: {
	NOT_MEMBER_WARNING: "Sljedeće spomenute osobe neće moći pregledati poruku jer nisu članovi zajednice.",
	NOT_SAME_ORGANIZATION_WARNING: "Sljedeće spomenute osobe neće moći vidjeti poruku jer su u drugoj organizaciji"
},
SELECT_ALL: "Odaberi sve"
})
