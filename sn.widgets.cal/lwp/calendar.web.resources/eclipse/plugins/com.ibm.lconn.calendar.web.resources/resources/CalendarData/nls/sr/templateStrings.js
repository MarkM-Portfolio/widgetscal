/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Technologies Limited 2011, 2019                                    */
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
CREATE_BUTTON_TOOLTIP: "Kreira novi događaj u toku izabranog dana",
EDIT_BUTTON: "Uredi događaj",
EDIT_BUTTON_TOOLTIP: "Uređuje izabrani događaj",
DELETE_BUTTON: "Izbriši događaj",
DELETE_BUTTON_TOOLTIP: "Briše izabrani događaj",
BACKTOCAL: "Povratak na događaje Zajednice",
BACKTOCAL2: "Kliknite ovde da biste se vratili na događaje Zajednice",
MORE_ACTIONS: "Više radnji",

DAY_VIEW_TOOLTIP: "Prikazuje jedan dan",
TWODAY_VIEW_TOOLTIP: "Prikazuje dva dana",
FIVEDAY_VIEW_TOOLTIP: "Prikazuje pet dana",
WEEK_VIEW_TOOLTIP: "Prikazuje sedmicu",
MONTH_VIEW_TOOLTIP: "Prikazuje mesec",

DAY_VIEW: "Jedan dan",
TWODAY_VIEW: "Dva dana",
FIVEDAY_VIEW: "Pet dana",
WEEK_VIEW: "Sedmica",
MONTH_VIEW: "Mesec",

ICAL_FEED: "Dodaj u lični kalendar",
ICAL_FEED_DIALOG_TITLE: "Dodaj u lični kalendar",

ICAL_FEED_HINT: "Kopirajte ovaj URL i dodajte ga u svoj kalendar kao iCal fid:",
ICAL_FEED_SUBSCRIBE_HINT: "Možete da se prijavite na HCL Connections događaje kroz razne aplikacije, uključujući HCL Notes i Microsoft Outlook.  Kliknite na sledeći URL da biste se prijavili na sve događaje ove Zajednice.  U zavisnosti od toga koju aplikaciju koristite za kalendar, možda ćete morati da kopirate URL u samu aplikaciju.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "Možete da se prijavite na HCL Connections događaje kroz razne aplikacije, kao što su HCL Notes i Microsoft Outlook.  Kliknite na sledeći URL da biste se prijavili na sve događaje koje pratite ili u kojima učestvujete.  U zavisnosti od toga koju aplikaciju koristite za kalendar, možda ćete morati da kopirate URL u samu aplikaciju.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "Možete da se prijavite na svoje HCL Connections događaje kroz razne aplikacije, uključujući HCL Notes i Microsoft Outlook.  Kliknite na sledeći URL da biste se prijavili na sve događaje koje pratite.  U zavisnosti od toga koju aplikaciju koristite za kalendar, možda ćete morati da kopirate URL u svoju aplikaciju.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "Možete da se prijavite na svoje HCL Connections događaje kroz razne aplikacije, uključujući HCL Notes i Microsoft Outlook.  Kliknite na sledeći URL da biste se prijavili na sve događaje u kojima učestvujete.  U zavisnosti od toga koju aplikaciju koristite za kalendar, možda ćete morati da kopirate URL u svoju aplikaciju.",
ICAL_FEED_SUBSCRIBE_HINT_OCS: "Možete da se prijavite na IBM Connections Social Cloud događaje kroz razne aplikacije, kao što su IBM SmartCloud Notes i Microsoft Outlook.  Kliknite na sledeći URL da biste se prijavili na sve događaje ove Zajednice.  U zavisnosti od toga koju aplikaciju koristite za kalendar, možda ćete morati da kopirate URL u svoju aplikaciju.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT_OCS: "Možete da se prijavite na IBM Connections Social Cloud događaje kroz razne aplikacije, kao što su IBM SmartCloud Notes i Microsoft Outlook.  Kliknite na sledeći URL da biste se prijavili na sve događaje koje pratite ili u kojima učestvujete.  U zavisnosti od toga koju aplikaciju koristite za kalendar, možda ćete morati da kopirate URL u svoju aplikaciju.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT_OCS: "Možete da se prijavite na IBM Connections Social Cloud događaje kroz razne aplikacije, kao što su IBM SmartCloud Notes i Microsoft Outlook.  Kliknite na sledeći URL da biste se prijavili na sve događaje koje pratite.  U zavisnosti od toga koju aplikaciju koristite za kalendar, možda ćete morati da kopirate URL u svoju aplikaciju.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT_OCS: "Možete da se prijavite na IBM Connections Social Cloud događaje kroz razne aplikacije, kao što su IBM SmartCloud Notes i Microsoft Outlook.  Kliknite na sledeći URL da biste se prijavili na sve događaje u kojima učestvujete.  U zavisnosti od toga koju aplikaciju koristite za kalendar, možda ćete morati da kopirate URL u svoju aplikaciju.",
ICAL_FEED_HINT_POPUP: "Kliknite desnim tasterom miša i kopirajte ovaj URL, prijavite ga u aplikaciju za kalendar kao iCal fid",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Možete da dodate događaje Zajednice u svoj lični Notes ili Outlook kalendar ako kliknete na sledeći fid:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Kako da:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Dodate događaje Zajednice u Notes kalendar",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Dodate događaje Zajednice u Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Dodate događaje Zajednice u Google kalendar",

ICAL_FEED_EXPORT_ICS:	"Izvezi u Kalendar (.ics)",

DELETE_CONFIRM_SINGLE: "Želite li zaista da izbrišete ovaj događaj?",
DELETE_CONFIRM_SERIES: "Želite li da izbrišete samo jednu instancu ovog događaja ili celu seriju?",
DELETE_INSTACE_OPTION: "Izbriši samo ovu instancu",
DELETE_SERIES_OPTION: "Izbriši celu seriju",
DELETE_DIALOG_BUTTON: "Izbriši",

FOLLOW_CONFIRM_SERIES: "Želite li da pratite samo jednu instancu događaja ili celu seriju?",
FOLLOW_INSTACE_OPTION: "Prati samo ovu instancu",
FOLLOW_SERIES_OPTION: "Prati celu seriju",
FOLLOW_DIALOG_BUTTON: "Prati",
FOLLOW_CONFIRM: "Sada pratite ovaj događaj. Prijavite na aplikaciju kalendara preko<a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal fid-a</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Sada pratite ovu seriju događaja. Prijavite na aplikaciju kalendara preko<a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal fid-a</a>.",
UNFOLLOW_CONFIRM: "Više ne pratite ovaj događaj.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Više ne pratite ovu seriju događaja.",

RSVP_CONFIRM_SERIES: "Želite li da učestvujete samo u jednoj instanci događaja ili u celoj seriji?",
RSVP_INSTACE_OPTION: "Učestvuj samo u ovoj instanci",
RSVP_SERIES_OPTION: "Učestvuj u celoj seriji",
RSVP_DIALOG_BUTTON: "Učestvuj",
RSVP_CONFIRM: "Učestvujete u ovom događaju. Prijavite na aplikaciju kalendara preko<a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal fid-a</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Učestvujete u ovoj seriji događaja. Prijavite na aplikaciju kalendara preko<a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal fid-a</a>.",
UNRSVP_CONFIRM: "Više ne učestvujete u ovom događaju.",
UNRSVP_ENTIRESERIES_CONFIRM: "Više ne učestvujete u ovoj seriji događaja.",


SU: "Ned",
MO: "Pon",
TU: "Uto",
WE: "Sre",
TH: "Čet",
FR: "Pet",
SA: "Sub",
SU_FULL: "Nedelja",
MO_FULL: "Ponedeljak",
TU_FULL: "Utorak",
WE_FULL: "Sreda",
TH_FULL: "Četvrtak",
FR_FULL: "Petak",
SA_FULL: "Subota",

DAYS: "dana",
WEEKS: "sedmica",
MONTHS: "meseci",
YEARS: "godina",
DAY: "dan",
WEEK: "sedmica",
MONTH: "mesec",
YEAR: "godina",

ON_THE_MONTHLY_DAY: "Na || u mesecu.",
ON_THE_MONTHLY_WEEKDAY: "Na || u mesecu.",

REMOVE: "Ukloni",

ERROR: "Greška",
ERROR_HEADER: "Proverite sledeće",

WARNING: "Upozorenje",
WARNING_HEADER: "Upozorenje",

CREATED_BY: "Kreirao korisnik ${0}",
CREATED_ON: "Kreirano na datum ${0}",
UPDATED_ON: "Ažurirano na datum ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Kreirano na datum ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Ažurirano na datum ${0}",
WHEN: "Kada:",
REPEATS: "Ponavlja se:",
DATE: "Datum",
ON: "Na:",
ALL_DAY_EVENT:"Celodnevni događaj",
ALL_DAY:"Celi dan",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, ceo dan",
RECURRENCE: "Ponavlja se",
SUBJECT: "Predmet:",
EVENT_TITLE: "Naziv događaja:",
TAGS: "Oznake:",
DESCRIPTION: "Opis:",
LOCATION: "Lokacija:",
IMAGE_URL: "URL slike:",
SUBMIT: "Podnesi",
SAVE: "Sačuvaj",
CANCEL: "Otkaži",
SAVECLOSE: "Sačuvaj i zatvori",
DELETE: "Izbriši instancu",
FROM: "od",
TO: "za",
CLOSE: "Zatvori",
OPEN: "Otvori",
CLOSE_SECTION: "Zatvori odeljak",
OPEN_SECTION: "Otvori odeljak",
NO: "Ne",
CONFIRM: "Potvrđivanje",
CLEAR_EXCEPTIONS_CONFIRM: "Menjate raspored za više instanci sastanka koji se ponavlja. Sve instance će biti pomerene za isti vremenski interval, uključujući i one kojima je ranije promenjen raspored. Proverite koji je rezultat ovih promena.\n\nŽelite li zaista da nastavite?",

DAILY: "Dnevno",
WEEKLY: "Sedmično",
BIWEEKLY: "Dvonedeljno",
EVERY_X_WEEK: "Na svakih ${0} sedmica",
MONTHLY: "Mesečno",
MONTHLY_BY_DAY: "Mesečno na određeni datum",
MONTHLY_BY_WEEKDAY: "Mesečno na određeni dan u sedmici",
YEARLY: "Godišnje",
CUSTOM: "Prilagođeno",
NONE: "Nema",
REPEAT_NONE: "Ovaj unos se ne ponavlja",
REPEAT_DAILY: "Ovaj unos se ponavlja svakog dana",
REPEAT_WEEKLY: "Ovaj unos se ponavlja svake sedmice",
REPEAT_DAILY_SHORT: "Dnevno",
REPEAT_WEEKLY_SHORT: "Sedmično",
REPEAT_MONTHLY_SHORT: "Mesečno",

REPEATS: "Ponavlja se",
REPEATS_LABEL: "Ponavlja se:",

REPEAT_FREQUENCY_ONEWEEK: "sedmica",
REPEAT_FREQUENCY_TWOWEEKS: "2 sedmice",
REPEAT_FREQUENCY_THREEWEEKS: "3 sedmice",
REPEAT_FREQUENCY_FOURWEEKS: "4 sedmice",
REPEAT_FREQUENCY_FIVEWEEKS: "5 sedmica",

REPEAT_MONTHLY_ON_THIS_DATE: "Na ovaj datum:",
REPEAT_MONTHLY_ON_THIS_DAY: "Na ovaj dan:",

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
DATE_OF_MONTH_21: "dvadeset prvi",
DATE_OF_MONTH_22: "dvadeset drugi",
DATE_OF_MONTH_23: "dvadeset treći",
DATE_OF_MONTH_24: "dvadeset četvrti",
DATE_OF_MONTH_25: "dvadeset peti",
DATE_OF_MONTH_26: "dvadeset šesti",
DATE_OF_MONTH_27: "dvadeset sedmi",
DATE_OF_MONTH_28: "dvadeset osmi",
DATE_OF_MONTH_29: "dvadeset deveti",
DATE_OF_MONTH_30: "trideseti",
DATE_OF_MONTH_31: "trideset prvi",

First_WEEK_OF_MONTH:"prvi",
Second_WEEK_OF_MONTH:"drugi",
Third_WEEK_OF_MONTH:"treći",
Fourth_WEEK_OF_MONTH:"četvrti",
LAST_WEEK_OF_MONTH:"poslednji",

First_WEEK_OF_MONTH_FEMALE:"prvi", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"drugi",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"treći",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"četvrti",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"poslednji",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"prvi",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"drugi",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"treći",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"četvrti",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"poslednji",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Izaberite dan u sedmici",
SELECT_WEEK_OF_MONTH:"Izaberite sedmicu u mesecu",
SELECT_DATE_OF_MONTH:"Izaberite datum u mesecu",
Fieldset_Event:"Polja za kreiranje ili uređivanje događaja",

MESSAGE_BY_DATE_SKIPPED : "Meseci koji ne sadrže ovaj datum biće preskočeni",

EVERY: "Na svakih:",
UNTIL: "Do:",
ON: "Na:",

ADD_ANOTHER: "Dodaj još jedan",
REPEAT_ON: "Ponovi na",

ADD_EVENT: "Kreiraj događaj",
EDIT_EVENT: "Uredi događaj",

NOTIFY: "Obavesti druge osobe",
NOTIFY_TITLE: "Obavesti druge osobe",
NOTIFY_OK: "Obavesti",
DELETE: "Izbriši",
EDIT: "Uredi",
EDIT_LABEL: "Uredi:",
EDIT_THIS_INSTANCE: "Uredi ovu instancu",
EDIT_THIS_SERIES: "Uredi celu seriju",
FOLLOW: "Prati",
FOLLOW_THIS_INSTANCE: "Prati ovu instancu",
FOLLOW_THIS_SERIES: "Prati celu seriju",
UNFOLLOW: "Prekini praćenje",

RSVP: "Potvrđujem da ću učestvovati",
RSVP_THIS_INSTANCE: "Učestvuj u ovoj instanci",
RSVP_THIS_SERIES: "Učestvuj u celoj seriji",
UNRSVP: "Neću učestvovati",

START_TIME_AFTER_END: "Vreme početka događaja mora biti pre vremena završetka",
START_DAY_AFTER_UNTIL_DAY: "Datum početka događaja koji se ponavlja ne sme biti posle datuma do kada se događaj ponavlja",
DURATION_LARGER_THAN_24H: "Događaj ne bi trebalo da bude traje više od 24 sata",
DESCRIPTION_LENGTH: 'Opis je predugačak',
SUBJECT_LENGTH: 'Naziv događaja je predugačak',
LOCATION_LENGTH: 'Lokacija je predugačka',
IMAGE_URL_INVALID: 'URL slike nije ispravan',
UNTIL_DATE: 'Navedite ispravan datum završetka događaja',
NO_REPEAT_ON: 'Za događaj koji se ponavlja morate izabrati najmanje jedan dan',
START_DATE_IN_PAST: 'Događaj počinje u prošlosti',

SUBJECT_INVALID: 'Naziv događaja mora biti ispravan',
START_DATE_INVALID: 'Datum početka mora biti ispravan',
START_TIME_INVALID: 'Vreme početka mora biti ispravno',
END_DATE_INVALID: 'Datum završetka mora biti ispravan',
END_TIME_INVALID: 'Vreme završetka mora biti ispravno',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Nije izabran ni jedan član. Izaberite najmanje jednog člana za obaveštenje.',

NEXT_MONTH: "Prikaži sledeći mesec",
PREVIOUS_MONTH: "Prikaži prethodni mesec",
CALENDAR_SUMMARY: "Mesečni kalendar sa spiskom obaveza",

SEND: "Pošalji",
MAP_ROLE: "Članovi imaju ulogu:",
READ_ACCESS: "Čitalac",
AUTHOR_ACCESS: "Autor (može da kreira i uređuje svoje događaje)",
SAVE: "Sačuvaj",
PREF_FORM_TITLE: "Uredi postavke kalendara",
TAB_UPCOMING: "Događaji",
TAB_CALENDAR: "Prikaz kalendara",
SUMMARY: "Rezime",
DETAILS: "Detalji",
EVENT_TIME: "Vreme događaja",
UPDATED: "Ažurirano",
SORT_ASC: "Sortiraj rastuće",
SORT_DESC: "Sortiraj opadajuće",
TODAY: "Danas",
TOMORROW: "Sutra",
YESTERDAY: "Juče",
EVENT_NAME: "Naziv događaja",
SHOW_DETAILS: "prikaži detalje",
SHOW_PASTEVENTS: "Prikaži završene događaje",
SHOW_UPCOMINGEVENTS: "Prikaži predstojeće događaje",
HIDE_DETAILS: "sakrij detalje",
SELECT_CHECKBOX: "kliknite da biste izabrali",
UNSELECT_CHECKBOX: "kliknite da biste poništili izbor",
NO_DESCRIPTION: "Nema opisa",
DISPLAY: "Prikaz",
REPEATS_FLAG: "(ponavljanje)",
STR_VIEW: "Prikaz:",
DISP_CALENDAR: "Tabela kalendara",
DISP_LIST: "Rezime lista",

GOTO_EDIT_INFO: "Da biste promenili lična podešavanja, treba da pratite Radnje na uređenju Zajednice -> Uredi Zajednicu -> Kalendar.",
VIEW_ALL_EVENTS: "Prikaži sve događaje",
NO_EVENT_TODAY: "Danas nema događaja",
ONE_EVENT_TODAY: "1 događaj danas",
X_EVENTS_TODAY: "${0} događaja danas",

OK: "U redu",
UPCOMING_EVENTS: "Predstojeći događaji",
PICK_MEMBERS: "Izaberite članove Zajednice",
NOTIFICATION_MESSAGE: "Poruka",
NOTIFY_OTHERS: "Obavesti članove Zajednice",
NOTIFY_DEFAULT_MESSAGE: "Zdravo-  Mislim da bi vam ovaj događaj mogao biti zanimljiv.",
NOTIFY_ERROR: "Došlo je do greške prilikom obaveštavanja osoba: ${0}",
NOTIFY_SUCCESS: "Obaveštenje je uspešno poslato.",
NOTIFY_ERROR_2: "Događaj je sačuvan ali došlo je do greške prilikom slanja obaveštenja: ${0}",
INTERNAL_SERVER_ERR: "unutrašnja greška servera",
INTERNAL_SERVER_NOT_AVAILABLE: "Došlo je do greške u prikazu sadržaja. Kontaktirajte administratora sistema.",

ALT_WARNING_ICON: "Ikona upozorenja",
ALT_CONFIRM_ICON: "Ikona potvrde",
ALT_ERROR_ICON: "Ikona greške",
A11Y_WARNING_LABEL: "Upozorenje:",
A11Y_CONFIRM_LABEL: "Potvrda:",
A11Y_ERROR_LABEL: "Greška:",

TAB_ABOUT: "O nama",
TAB_COMMENT: "Komentari (${0})",
ADD_COMMENT: "Dodajte komentar...",
ENTER_COMMENT: "Unesite komentar:",
ENTER_COMMENT_ERROR: "Unesite komentar i kliknite na 'Sačuvaj.' Ako više ne želite ostaviti komentar, kliknite na 'Otkaži.'",
COMMENT_META: "${0} je komentarisao ${1}",
CONFIRM_DELETE_COMMENT: "Želite li zaista da izbrišete komentar?",
NO_COMMENT: "Nema komentara.",

EVENT_DELETE_ERROR: "Problem prilikom brisanja događaja. Moguće je da je događaj već izbrisan. Osvežite stranicu i pokušajte ponovo.",


TAB_ATTENDEE: "${0} osoba učestvuje",
NO_ATTENDEE: "Nema učesnika.",
NO_INSTANCE: "Nema predstojećih događaja.",
NO_UPCOMING_FOLLOWED: "Ne pratite nijedan predstojeći događaj.",
NO_UPCOMING_ATTENDED: "Ne učestvujete ni na jednom predstojećem događaju.",
NO_UPCOMING_FOLLOWATTENDED: "Ne pratite i ne učestvujete ni na jednom predstojećem događaju.",

FOLLOWED_EVENTS_LABEL: "Događaji koje pratite:",
ATTENDED_EVENTS_LABEL: "Događaji u kojima planirate da učestvujete:",
FOLLOWATTENDED_EVENTS_LABEL: "Događaji koje pratite i u kojima planirate da učestvujete:",

PAGING_INFO: "${0} - ${1} od ${2}",
PAGING_INFO_TITLE: "Prikaži stavke od ${0} do ${1} od ${2}",
PAGING_PREVIOUS: "Prethodno",
PAGING_PREVIOUS_TITLE: "Prethodna stranica",
PAGING_NEXT: "Sledeće",
PAGING_NEXT_TITLE: "Sledeća stranica",
PAGING_SHOW: "Prikaži",
PAGING_LABEL: "Straničenje",

PAGING_COMMENT_LABEL:"Komentari straničenja (Gornja kontrola)",
PAGING_COMMENT_BOTTOM_LABEL:"Komentari straničenja (Donja kontrola)",
PAGING_ATTENDEE_LABEL:"Straničenje prisutnih osoba (Gornja kontrola)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Straničenje prisutnih osoba (Donja kontrola)",

PAGING_ITEMS: "stavke",
PAGING_PAGE_TITLE: "Prikaži ${0} stavki po stranici",
PAGING_PAGE_TITLE2: "Stranica ${0}",
PAGING_PAGE_TITLE3: "Kliknite da biste prikazali ${0} stavki po stranici",
PAGING_JUMPTO: "Skoči na stranicu ${0} od ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Broj stranice",
PAGEING_JUMP_LABEL:"Promena vrednosti će osvežiti rezultate stranice",

DETAIL_WHEN: "Kada: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Vreme: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} od strane ${1}",
ABOUT_ADDED: "Kreirano:",
ABOUT_UPDATED: "Ažurirano:",

WITH_TAGS: "Sa oznakama:",
TAGS_TITLE: "Oznake",
TAGS_REMOVE_HINT: "Ukloni oznaku ${0} iz izabranih oznaka filtera",

HELP: "Pomoć",
CLOSE_HELP: "Zatvori Pomoć",

TAGCLOUD_HELP: "Oznaka je ključna reč koju možete dodeliti događaju Zajednice da biste naznačili kategoriju i da bi ga druge osobe mogle lakše da pronađu. Unesite oznaku ili kliknite na oznaku da biste videli sve događaje Zajednice koji su joj pridruženi. Popularne oznake prikazane su većim, tamnijim slovima u oblaku oznaka.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Učitavanje...",
NOT_AUTHORIZED: "Niste ovlašćeni da izvršite tu radnju.",
STARTS:"Počinje:",
ENDS:"Završava se:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} u ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Oznaka je ključna reč koju dodeljujete sadržaju da bi bio lakši za pronalaženje. Oznake moraju biti pojedinačne reči, kao što su plata ili ljudski_resursi, odvojene zarezima ili razmacima.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Nema predstojećih događaja.",
NO_UPCOMING_EVENTS_MSG: "Nema predstojećih događaja u ovoj Zajednici.",
NO_PAST_EVENTS_MSG: "Nema završenih događaja u ovoj Zajednici.",

OWNER: "Vlasnik",
MEMBER: "Član",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Akcije događaja",
EVENT_VIEWS_NAVIGATION: "Prikaz događaja",

EVENTS_VIEW_TOOLBAR_LABEL: "Akcije događaja",

ALLDAY_UPDATED_MSG_HINT: "Vremena početka i završetka događaja su ažurirana na odgovarajući način.",

EVENT_STARTTIME_LABEL: "Vreme početka događaja",
EVENT_ENDTIME_LABEL: "Vreme završetka događaja",

REPEATS_ENABLE_DISABLE_HINT: "Kliknite da biste omogućili ili onemogućili opcije za ponavljanje",
REPEATING_OPTIONS_HINT: "Opcije za ponavljanje",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Unesite datum. Primer: ${0}",
ENTER_TIME_EXAMPLE: "Unesite vreme. Primer: ${0}",

REQUIRED: "Potrebno",

COLLAPSED_SECTION: "Skupljeni odeljak",
EXPANDED_SECTION: "Prošireni odeljak",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Uredite samo ovu instancu ili uredite celu seriju.  Uređivanjem cele serije nećete zameniti promene koje ste prethodno izvršili na pojedinačnim instancama ovog događaja.",

REPEATING_FREQUENCY: "Učestalost ponavljanja",
REPEATING_UNTIL: "Ponavljaj do",
REPEATING_ON: "Ponovi na",

CALENDAR_PREF_SAVE_CONFIRM: "Promene kalendara su sačuvane.",
HIDE_THIS_MESSAGE: "Sakrij ovu poruku",

EVENT_OPEN_ERR_NOTFOUND: "Problem prilikom otvaranja događaja Zajednice. Mogući razlog: događaj je već izbrisan.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (vreme:${1}, mesto:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (vreme:${1}).",
LINK_OPEN_INFO: "${0} (vreme:${1}, mesto:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (vreme:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Link na koji kliknete otvoriće se u novom prozoru.",

WARNING_ICON: "Ikona upozorenja",

MENTION: {
	NOT_MEMBER_WARNING: "Sledeći pomenuti ljudi neće biti u mogućnosti da prikažu poruku jer nisu članovi zajednice.",
	NOT_SAME_ORGANIZATION_WARNING: "Sledeće pomenute osobe neće biti u mogućnosti da prikažu poruku jer pripadaju drugoj organizaciji"
},
SELECT_ALL: "Select all"
})
