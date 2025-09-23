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
TITLE: "Tapahtumat",

CREATE_BUTTON: "Luo tapahtuma",
CREATE_BUTTON_TOOLTIP: "Luo uusi tapahtuma valittuna päivänä",
EDIT_BUTTON: "Muokkaa tapahtumaa",
EDIT_BUTTON_TOOLTIP: "Muokkaa valittua tapahtumaa",
DELETE_BUTTON: "Poista tapahtuma",
DELETE_BUTTON_TOOLTIP: "Poista valittu tapahtuma",
BACKTOCAL: "Palaa yhteisön tapahtumiin",
BACKTOCAL2: "Palaa yhteisön tapahtumiin napsauttamalla",
MORE_ACTIONS: "Lisää toimintoja",

DAY_VIEW_TOOLTIP: "Yhden päivän näkymä",
TWODAY_VIEW_TOOLTIP: "Kahden päivän näkymä",
FIVEDAY_VIEW_TOOLTIP: "Viiden päivän näkymä",
WEEK_VIEW_TOOLTIP: "Viikkonäkymä",
MONTH_VIEW_TOOLTIP: "Kuukausinäkymä",

DAY_VIEW: "Yksi päivä",
TWODAY_VIEW: "Kaksi päivää",
FIVEDAY_VIEW: "Viisi päivää",
WEEK_VIEW: "Viikko",
MONTH_VIEW: "Kuukausi",

ICAL_FEED: "Lisää henkilökohtaiseen kalenteriin",
ICAL_FEED_DIALOG_TITLE: "Lisää henkilökohtaiseen kalenteriin",

ICAL_FEED_HINT: "Kopioi tämä URL-osoite ja tilaa se kalenterisovellukseesi iCal-syötteenä:",
ICAL_FEED_SUBSCRIBE_HINT: "Voit tilata HCL Connections -tapahtumia missä tahansa sovelluksessa, kuten HCL Notesissa ja Microsoft Outlookissa. Tilaa kaikki tämän yhteisön tapahtumat napsauttamalla seuraavaa URL-osoitetta. Käyttämäsi kalenterisovellus voi edellyttää URL-osoitteen kopioimista sovellukseen.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "Voit tilata HCL Connections -tapahtumia missä tahansa sovelluksessa, kuten HCL Notesissa ja Microsoft Outlookissa. Tilaa kaikki tapahtumat, joita seuraat tai joihin olet osallistumassa, napsauttamalla seuraavaa URL-osoitetta. Käyttämäsi kalenterisovellus voi edellyttää URL-osoitteen kopioimista sovellukseen.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "Voit tilata HCL Connections -tapahtumia missä tahansa sovelluksessa, kuten HCL Notesissa ja Microsoft Outlookissa. Tilaa kaikki tapahtumat, joita seuraat, napsauttamalla seuraavaa URL-osoitetta. Käyttämäsi kalenterisovellus voi edellyttää URL-osoitteen kopioimista sovellukseen.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "Voit tilata HCL Connections -tapahtumia missä tahansa sovelluksessa, kuten HCL Notesissa ja Microsoft Outlookissa. Tilaa kaikki tapahtumat, joihin olet osallistumassa, napsauttamalla seuraavaa URL-osoitetta. Käyttämäsi kalenterisovellus voi edellyttää URL-osoitteen kopioimista sovellukseen.",
ICAL_FEED_HINT_POPUP: "Napsauta hiiren kakkospainikkeella ja kopioi tämä URL-osoite. Tilaa se kalenterisovellukseesi iCal-syötteenä.",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Näytä yhteisön tapahtumat omassa Notes- tai Outlook-kalenterissasi napsauttamalla syötettä alla:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Ohjeet:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Lisää yhteisön tapahtumia Notes-kalenteriin",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Lisää yhteisön tapahtumia Outlookiin",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Lisää yhteisön tapahtumia Google Kalenteriin",

ICAL_FEED_EXPORT_ICS:	"Vie kalenteriin (.ics)",

DELETE_CONFIRM_SINGLE: "Haluatko varmasti poistaa tämän tapahtuman?",
DELETE_CONFIRM_SERIES: "Poistetaanko yksittäinen ilmentymä tai poistetaanko koko sarja?",
DELETE_INSTACE_OPTION: "Poista vain tämä ilmentymä",
DELETE_SERIES_OPTION: "Poista koko sarja",
DELETE_DIALOG_BUTTON: "Poista",

FOLLOW_CONFIRM_SERIES: "Seurataanko yksittäistä ilmentymää vai seurataanko koko sarjaa?",
FOLLOW_INSTACE_OPTION: "Vain tämän ilmentymän seuranta",
FOLLOW_SERIES_OPTION: "Seuraa koko sarjaa",
FOLLOW_DIALOG_BUTTON: "Seuraa",
FOLLOW_CONFIRM: "Olet seurannut tätä tapahtumaaa. Tilaa se kalenterisovellukseesi <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal-syötteellä</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Olet seurannut tätä tapahtumasarjaa. Tilaa se kalenterisovellukseesi <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal-syötteellä</a>.",
UNFOLLOW_CONFIRM: "Olet lopettanut tämän tapahtuman seurannan.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Olet lopettanut tämän tapahtumasarjan seurannan.",

RSVP_CONFIRM_SERIES: "Osallistutaanko yhteen ilmentymään vai osallistutaanko koko sarjaan?",
RSVP_INSTACE_OPTION: "Osallistu vain tähän ilmentymään",
RSVP_SERIES_OPTION: "Osallistu koko sarjaan",
RSVP_DIALOG_BUTTON: "Osallistu",
RSVP_CONFIRM: "Olet osallistumassa tähän tapahtumaan. Tilaa se kalenterisovellukseesi <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal-syötteellä</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Olet osallistumassa tähän tapahtumasarjaan. Tilaa se kalenterisovellukseesi <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal-syötteellä</a>.",
UNRSVP_CONFIRM: "Olet lopettanut tähän tapahtumaan osallistumisen.",
UNRSVP_ENTIRESERIES_CONFIRM: "Olet lopettanut tähän tapahtumasarjaan osallistumisen.",


SU: "su",
MO: "ma",
TU: "ti",
WE: "ke",
TH: "to",
FR: "pe",
SA: "la",
SU_FULL: "Sunnuntai",
MO_FULL: "Maanantai",
TU_FULL: "Tiistai",
WE_FULL: "Keskiviikko",
TH_FULL: "Torstai",
FR_FULL: "Perjantai",
SA_FULL: "Lauantai",

DAYS: "päivää",
WEEKS: "Viikot",
MONTHS: "kuukautta",
YEARS: "vuotta",
DAY: "päivä",
WEEK: "Viikko",
MONTH: "kuukausi",
YEAR: "vuosi",

ON_THE_MONTHLY_DAY: "Kuukauden || päivänä.",
ON_THE_MONTHLY_WEEKDAY: "Kuukauden || päivänä.",

REMOVE: "Poista",

ERROR: "Virhe",
ERROR_HEADER: "Tarkista seuraavat",

WARNING: "Varoitus",
WARNING_HEADER: "Varoitus",

CREATED_BY: "Laatinut ${0}",
CREATED_ON: "Luotu ${0}",
UPDATED_ON: "Päivitetty ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Luotu ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Päivitetty ${0}",
WHEN: "Ajankohta:",
REPEATS: "Toistuu:",
DATE: "Päivämäärä",
ON: "Kohteessa:",
ALL_DAY_EVENT:"Koko päivän tapahtuma",
ALL_DAY:"Koko päivä",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, koko päivän",
RECURRENCE: "Toistuu",
SUBJECT: "Aihe:",
EVENT_TITLE: "Tapahtuman nimi:",
TAGS: "Tunnisteet:",
DESCRIPTION: "Kuvaus:",
LOCATION: "Sijainti:",
IMAGE_URL: "Kuvan URL-osoite:",
SUBMIT: "Lähetä",
SAVE: "Tallenna",
CANCEL: "Peruuta",
SAVECLOSE: "Tallenna ja sulje",
DELETE: "Poista ilmentymä",
FROM: "kohteesta",
TO: "kohde:",
CLOSE: "Sulje",
OPEN: "Avaa",
CLOSE_SECTION: "Sulje osa",
OPEN_SECTION: "Avaa osa",
NO: "Ei",
CONFIRM: "Vahvista",
CLEAR_EXCEPTIONS_CONFIRM: "Olet ajastamassa uudelleen useita toistuvan kokouksen ilmentymiä. Nämä ilmentymät siirretään saman suhteellisen ajan verran, aiemmin uudelleenajastetut mukaan lukien. Muista tarkistaa näiden muutosten vaikutukset.\n\nHaluatko varmasti jatkaa?",

DAILY: "Päivittäin",
WEEKLY: "Viikoittain",
BIWEEKLY: "Kahdesti viikossa",
EVERY_X_WEEK: "${0} viikon välein",
MONTHLY: "Kuukausittain",
MONTHLY_BY_DAY: "Kuukausittain päivämäärän mukaan",
MONTHLY_BY_WEEKDAY: "Kuukausittain viikonpäivän mukaan",
YEARLY: "Vuosittain",
CUSTOM: "Mukautettu",
NONE: "Ei mitään",
REPEAT_NONE: "Tämä merkintä ei toistu",
REPEAT_DAILY: "Tämä merkintä toistuu päivittäin",
REPEAT_WEEKLY: "Tämä merkintä toistuu viikoittain",
REPEAT_DAILY_SHORT: "Päivittäin",
REPEAT_WEEKLY_SHORT: "Viikoittain",
REPEAT_MONTHLY_SHORT: "Kuukausittain",

REPEATS: "Toistuu",
REPEATS_LABEL: "Toistuu:",

REPEAT_FREQUENCY_ONEWEEK: "Viikko",
REPEAT_FREQUENCY_TWOWEEKS: "2 viikkoa",
REPEAT_FREQUENCY_THREEWEEKS: "3 viikkoa",
REPEAT_FREQUENCY_FOURWEEKS: "4 viikkoa",
REPEAT_FREQUENCY_FIVEWEEKS: "5 viikkoa",

REPEAT_MONTHLY_ON_THIS_DATE: "Tänä päivämääränä:",
REPEAT_MONTHLY_ON_THIS_DAY: "Tänä viikonpäivänä:",

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
LAST_WEEK_OF_MONTH:"viimeinen",

First_WEEK_OF_MONTH_FEMALE:"1.", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"2.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"3.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"4.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"viimeinen",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"1.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"2.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"3.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"4.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"viimeinen",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Valitse viikonpäivä",
SELECT_WEEK_OF_MONTH:"Valitse kuukauden viikko",
SELECT_DATE_OF_MONTH:"Valitse kuukauden päivä",
Fieldset_Event:"Kentät tapahtuman luomiseen tai muokkaamiseen",

MESSAGE_BY_DATE_SKIPPED : "Kuukaudet, joissa ei ole tätä päivämäärää, ohitetaan",

EVERY: "Väli:",
UNTIL: "Päättyen:",
ON: "Kohteessa:",

ADD_ANOTHER: "Lisää toinen",
REPEAT_ON: "Toista:",

ADD_EVENT: "Luo tapahtuma",
EDIT_EVENT: "Muokkaa tapahtumaa",

NOTIFY: "Ilmoita muille henkilöille",
NOTIFY_TITLE: "Ilmoita muille henkilöille",
NOTIFY_OK: "Ilmoita",
DELETE: "Poista",
EDIT: "Muokkaa",
EDIT_LABEL: "Muokkaa:",
EDIT_THIS_INSTANCE: "Muokkaa tätä ilmentymää",
EDIT_THIS_SERIES: "Muokkaa koko sarjaa",
FOLLOW: "Seuraa",
FOLLOW_THIS_INSTANCE: "Seuraa tätä ilmentymää",
FOLLOW_THIS_SERIES: "Seuraa koko sarjaa",
UNFOLLOW: "Lopeta seuranta",

RSVP: "Osallistuu",
RSVP_THIS_INSTANCE: "Osallistu tähän ilmentymään",
RSVP_THIS_SERIES: "Osallistu koko sarjaan",
UNRSVP: "Ei osallistu",

START_TIME_AFTER_END: "Tapahtuman alkamisajan on oltava ennen päättymisaikaa",
START_DAY_AFTER_UNTIL_DAY: "Toistuvan tapahtuman alkamispäivä ei saa olla sen toiston päättymispäivän jälkeen",
DURATION_LARGER_THAN_24H: "Tapahtuman keston ei tulisi olla yli 24 tuntia. Luo sen sijaan toistuva tapahtuma.",
DESCRIPTION_LENGTH: 'Kuvaus on liian pitkä',
SUBJECT_LENGTH: 'Tapahtuman nimi on liian pitkä',
LOCATION_LENGTH: 'Sijainti on liian pitkä',
IMAGE_URL_INVALID: 'Kuvan URL-osoite ei kelpaa',
UNTIL_DATE: 'Määritä kelvollinen tapahtuman päättymispäivämäärä',
NO_REPEAT_ON: 'Toistuvalle tapahtumalle on valittava ainakin yksi päivä',
START_DATE_IN_PAST: 'Tapahtuma alkaa menneisyydessä',

SUBJECT_INVALID: 'Tapahtuman nimen on oltava kelvollinen',
START_DATE_INVALID: 'Alkamispäivämäärän on oltava kelvollinen',
START_TIME_INVALID: 'Alkamisajan on oltava kelvollinen',
END_DATE_INVALID: 'Päättymispäivän on oltava kelvollinen',
END_TIME_INVALID: 'Päättymisajan on oltava kelvollinen',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Jäseniä ei ole valittu. Valitse ainakin yksi jäsen, jolle lähettää ilmoitus.',

NEXT_MONTH: "Näytä seuraava kuukausi",
PREVIOUS_MONTH: "Näytä edellinen kuukausi",
CALENDAR_SUMMARY: "Kuukausikalenteri, tehtävät näkyvissä",

SEND: "Lähetä",
MAP_ROLE: "Jäsenten rooli on seuraava:",
READ_ACCESS: "Lukija",
AUTHOR_ACCESS: "Tekijä (luo ja muokkaa omia tapahtumiaan)",
SAVE: "Tallenna",
PREF_FORM_TITLE: "Muokkaa kalenteriasetuksia",
TAB_UPCOMING: "Tapahtumat",
TAB_CALENDAR: "Kalenterinäkymä",
SUMMARY: "Tiivistelmä",
DETAILS: "Tiedot",
EVENT_TIME: "Tapahtuman aika",
UPDATED: "Päivitetty",
SORT_ASC: "Lajittele nousevaan järjestykseen",
SORT_DESC: "Lajittele laskevaan järjestykseen",
TODAY: "tänään",
TOMORROW: "huomenna",
YESTERDAY: "eilen",
EVENT_NAME: "Tapahtuman nimi",
SHOW_DETAILS: "näytä tiedot",
SHOW_PASTEVENTS: "Näytä menneet tapahtumat",
SHOW_UPCOMINGEVENTS: "Näytä tulevat tapahtumat",
HIDE_DETAILS: "piilota tiedot",
SELECT_CHECKBOX: "valitse napsauttamalla",
UNSELECT_CHECKBOX: "poista valinta napsauttamalla",
NO_DESCRIPTION: "Kuvausta ei ole",
DISPLAY: "Näyttö",
REPEATS_FLAG: "(toistuu)",
STR_VIEW: "Näkymä:",
DISP_CALENDAR: "Kalenteriruudukko",
DISP_LIST: "Yhteenvetoluettelo",

GOTO_EDIT_INFO: "Jos haluat muokata asetuksia, sinun on seurattava Yhteisön toiminnot -> Muokkaa yhteisöä -> Kalenteri.",
VIEW_ALL_EVENTS: "Näytä kaikki tapahtumat",
NO_EVENT_TODAY: "Ei tapahtumia tänään",
ONE_EVENT_TODAY: "1 tapahtuma tänään",
X_EVENTS_TODAY: "${0} tapahtumaa tänään",

OK: "OK",
UPCOMING_EVENTS: "Tulevat tapahtumat",
PICK_MEMBERS: "Valitse yhteisön jäsenet",
NOTIFICATION_MESSAGE: "Viesti",
NOTIFY_OTHERS: "Ilmoita yhteisön jäsenille",
NOTIFY_DEFAULT_MESSAGE: "Hei. Ajattelin, että saattaisit olla kiinnostunut tästä tapahtumasta.",
NOTIFY_ERROR: "Virhe henkilöille ilmoitettaessa: ${0}",
NOTIFY_SUCCESS: "Ilmoitus lähetettiin.",
NOTIFY_ERROR_2: "Tapahtumasi on tallennettu, mutta muille ilmoitettaessa ilmeni virhe: ${0}",
INTERNAL_SERVER_ERR: "sisäinen palvelinvirhe",
INTERNAL_SERVER_NOT_AVAILABLE: "Virhe sisältöä näytettäessä. Ota yhteyttä pääkäyttäjään.",

ALT_WARNING_ICON: "Varoituskuvake",
ALT_CONFIRM_ICON: "Vahvistuskuvake",
ALT_ERROR_ICON: "Virhekuvake",
A11Y_WARNING_LABEL: "Varoitus:",
A11Y_CONFIRM_LABEL: "Vahvistus:",
A11Y_ERROR_LABEL: "Virhe:",

TAB_ABOUT: "Tietoja",
TAB_COMMENT: "Kommentit (${0})",
ADD_COMMENT: "Lisää kommentti...",
ENTER_COMMENT: "Kirjoita kommentti:",
ENTER_COMMENT_ERROR: "Anna kommentti ja napsauta Tallenna. Jos et enää halua jättää kommenttia, napsauta Peruuta.",
COMMENT_META: "${0} kommentoi kohdetta ${1}",
CONFIRM_DELETE_COMMENT: "Haluatko varmasti poistaa kommentin?",
NO_COMMENT: "Kommentteja ei ole.",

EVENT_DELETE_ERROR: "Tapahtumaa ei voitu poistaa. Tapahtuma on ehkä jo poistettu. Päivitä sivu ja yritä uudelleen.",


TAB_ATTENDEE: "${0} henkilöä osallistuu",
NO_ATTENDEE: "Osallistujia ei ole.",
NO_INSTANCE: "Ei tulevia tapahtumia.",
NO_UPCOMING_FOLLOWED: "Et seuraa yhtään tulevaa tapahtumaa.",
NO_UPCOMING_ATTENDED: "Et ole osallistumassa mihinkään tulevaan tapahtumaan.",
NO_UPCOMING_FOLLOWATTENDED: "Et seuraa etkä ole osallistumassa mihinkään tulevaan tapahtumaan.",

FOLLOWED_EVENTS_LABEL: "Tapahtumat, joita seuraat:",
ATTENDED_EVENTS_LABEL: "Tapahtumat, joihin olet suunnitellut osallistuvasi:",
FOLLOWATTENDED_EVENTS_LABEL: "Tapahtumat, joita seuraat ja joihin olet suunnitellut osallistuvasi:",

PAGING_INFO: "${0}–${1}/${2}",
PAGING_INFO_TITLE: "Näytä kohteet ${0}–${1}/${2}",
PAGING_PREVIOUS: "Edellinen",
PAGING_PREVIOUS_TITLE: "Edellinen sivu",
PAGING_NEXT: "Seuraava",
PAGING_NEXT_TITLE: "Seuraava sivu",
PAGING_SHOW: "Näytä",
PAGING_LABEL: "Sivunumerot",

PAGING_COMMENT_LABEL:"Sivutetaan kommentteja (yläosan säädin)",
PAGING_COMMENT_BOTTOM_LABEL:"Sivutetaan kommentteja (alaosan säädin)",
PAGING_ATTENDEE_LABEL:"Sivutetaan osallistujia (yläosan säädin)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Sivutetaan osallistujia (alaosan säädin)",

PAGING_ITEMS: "kohdetta",
PAGING_PAGE_TITLE: "Näytä ${0} kohdetta sivulla",
PAGING_PAGE_TITLE2: "Sivu ${0}",
PAGING_PAGE_TITLE3: "Näytä ${0} kohdetta sivua kohden napsauttamalla",
PAGING_JUMPTO: "Siirry sivulle ${0}/${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Sivun numero",
PAGEING_JUMP_LABEL:"Jos arvoa muutetaan, järjestelmä päivittää sivulla näkyvät tulokset",

DETAIL_WHEN: "Kun: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Aika: ${0}–${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0}: ${1}",
ABOUT_ADDED: "Luotu:",
ABOUT_UPDATED: "Päivitetty:",

WITH_TAGS: "Tunnisteilla:",
TAGS_TITLE: "Tunnisteet",
TAGS_REMOVE_HINT: "Poista merkintä ${0} valituista suodatinmerkinnöistä",

HELP: "Ohje",
CLOSE_HELP: "Sulje ohje",

TAGCLOUD_HELP: "Tunniste on avainsana, jonka voit liittää yhteisöön luokittelua varten ja joka helpottaa yhteisön löytämistä. Saat tunnisteeseen liittyvät yhteisöt näkyviin kirjoittamalla tunnisteen tai napsauttamalla sitä. Suositut tunnisteet näkyvät suurempana tekstinä tunnistejoukossa.",
//start - end
DURATION_SPAN: "${0}–${1}",
LOADING: "Ladataan...",
NOT_AUTHORIZED: "Sinulla ei ole valtuuksia tehdä toimintoa.",
STARTS:"Alkaa:",
ENDS:"Päättyy:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} kello ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Tunniste on sisältöön liitettävä avainsana, jonka avulla sisältö on helpompi löytää. Tunnisteiden on oltava yksittäisiä sanoja, kuten palkkalista tai henkilöstö_resurssit, ja ne tulee erotella pilkuin tai välilyönnein.",
INVALID_CHAR_IN_TAG: "Annettu tunnisteluettelo sisältää virheellisen merkin &. Poista tämä merkki tunnisteluettelosta.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Ei tulevia tapahtumia.",
NO_UPCOMING_EVENTS_MSG: "Tässä yhteisössä ei ole tulevia tapahtumia.",
NO_PAST_EVENTS_MSG: "Yhteisöllä ei ole menneitä tapahtumia.",

OWNER: "Omistaja",
MEMBER: "Jäsen",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Tapahtumatoiminnot",
EVENT_VIEWS_NAVIGATION: "Tapahtuman näyttökerrat",

EVENTS_VIEW_TOOLBAR_LABEL: "Tapahtumatoiminnot",

ALLDAY_UPDATED_MSG_HINT: "Tapahtuman alkamisaika ja tapahtuman päättymisaika on päivitetty vastaavasti.",

EVENT_STARTTIME_LABEL: "Tapahtuman alkamisaika",
EVENT_ENDTIME_LABEL: "Tapahtuman päättymisaika",

REPEATS_ENABLE_DISABLE_HINT: "Ota toistoasetukset käyttöön tai poista ne käytöstä napsauttamalla",
REPEATING_OPTIONS_HINT: "Toistoasetukset",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Anna päivämäärä. Esimerkki: ${0}",
ENTER_TIME_EXAMPLE: "Anna aika. Esimerkki: ${0}",

REQUIRED: "Pakollinen",

COLLAPSED_SECTION: "Pienennetty osa",
EXPANDED_SECTION: "Laajennettu osa",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Muokkaa vain tätä ilmentymää tai muokkaa koko sarjaa. Koko sarjan muokkaaminen ei korvaa muutoksia, jotka olet aiemmin tehnyt tämän esiintymän yksittäisiin ilmentymiin.",

REPEATING_FREQUENCY: "Toistotiheys",
REPEATING_UNTIL: "Toiston päättyminen",
REPEATING_ON: "Toista:",

CALENDAR_PREF_SAVE_CONFIRM: "Kalenteriin tekemäsi muutokset on tallennettu.",
HIDE_THIS_MESSAGE: "Piilota tämä sanoma",

EVENT_OPEN_ERR_NOTFOUND: "Yhteisötapahtumaa ei voitu avata. Mahdollinen syy: Tapahtuma on jo poistettu.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (aika:${1}, sijainti:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (aika:${1}).",
LINK_OPEN_INFO: "${0} (aika:${1}, sijainti:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (aika:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Linkin napsauttaminen avaa sen uuteen ikkunaan.",

WARNING_ICON: "Varoituskuvake",

MENTION: {
	NOT_MEMBER_WARNING: "Seuraavat mainitut henkilöt eivät voi tarkastella viestiä, koska he eivät ole yhteisön jäseniä.",
	NOT_SAME_ORGANIZATION_WARNING: "Seuraavat mainitut henkilöt eivät voi nähdä viestiä, koska he ovat toisessa organisaatiossa"
},
SELECT_ALL: "Valitse kaikki"
})
