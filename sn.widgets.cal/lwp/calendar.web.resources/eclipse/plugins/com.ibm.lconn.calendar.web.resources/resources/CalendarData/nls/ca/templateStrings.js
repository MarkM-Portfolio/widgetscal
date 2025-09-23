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
TITLE: "Esdeveniments",

CREATE_BUTTON: "Crea un esdeveniment",
CREATE_BUTTON_TOOLTIP: "Crea un esdeveniment nou el dia seleccionat",
EDIT_BUTTON: "Edita l'esdeveniment",
EDIT_BUTTON_TOOLTIP: "Edita l'esdeveniment seleccionat",
DELETE_BUTTON: "Suprimeix l'esdeveniment",
DELETE_BUTTON_TOOLTIP: "Suprimeix l'esdeveniment seleccionat",
BACKTOCAL: "Torna als esdeveniments de la comunitat",
BACKTOCAL2: "Feu clic per tornar als esdeveniments de la comunitat",
MORE_ACTIONS: "Més accions",

DAY_VIEW_TOOLTIP: "Vista d'un dia",
TWODAY_VIEW_TOOLTIP: "Vista de dos dies",
FIVEDAY_VIEW_TOOLTIP: "Vista de cinc dies",
WEEK_VIEW_TOOLTIP: "Vista d'una setmana",
MONTH_VIEW_TOOLTIP: "Vista d'un mes",

DAY_VIEW: "Un dia",
TWODAY_VIEW: "Dos dies",
FIVEDAY_VIEW: "Cinc dies",
WEEK_VIEW: "Setmana",
MONTH_VIEW: "Mes",

ICAL_FEED: "Afegeix-ho al calendari personal",
ICAL_FEED_DIALOG_TITLE: "Afegeix-ho al calendari personal",

ICAL_FEED_HINT: "Copieu aquest URL i subscriviu-lo a la vostra aplicació de calendari com a canal d'informació d'iCal:",
ICAL_FEED_SUBSCRIBE_HINT: "Podeu subscriure-us als esdeveniments de l’HCL Connections en moltes aplicacions com ara l’HCL Notes i el Microsoft Outlook. Feu clic al següent URL per subscriure-us a tots els esdeveniments d'aquesta comunitat. Segons l'aplicació del calendari, és possible que hàgiu de copiar l'URL a l’aplicació.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "Podeu subscriure-us als esdeveniments de l’HCL Connections en moltes aplicacions com ara l’HCL Notes i el Microsoft Outlook. Feu clic al següent URL per subscriure-us a tots els esdeveniments que seguiu o als quals assistireu. Segons l'aplicació del calendari, és possible que hàgiu de copiar l'URL a l’aplicació.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "Podeu subscriure-us als esdeveniments de l’HCL Connections en moltes aplicacions com ara l’HCL Notes i el Microsoft Outlook. Feu clic al següent URL per subscriure-us a tots els esdeveniments que seguiu. Segons l'aplicació del calendari, és possible que hàgiu de copiar l'URL a l’aplicació.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "Podeu subscriure-us als esdeveniments de l’HCL Connections en moltes aplicacions com ara l’HCL Notes i el Microsoft Outlook. Feu clic al següent URL per subscriure-us a tots els esdeveniments als quals assistireu. Segons l'aplicació del calendari, és possible que hàgiu de copiar l'URL a l’aplicació.",
ICAL_FEED_HINT_POPUP: "Feu clic amb el botó dret, copieu aquest URL i subscriviu-lo a la vostra aplicació de calendari com a canal d'informació d'iCal",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Feu que els esdeveniments de la comunitat apareguin al vostre calendari personal del Notes o de l'Outlook fent clic al canal d'informació següent:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Procediment:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Afegeix esdeveniments de la comunitat al Notes Calendar",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Afegeix esdeveniments de la comunitat a l'Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Afegeix esdeveniments de la comunitat al Google Calendar",

ICAL_FEED_EXPORT_ICS:	"Exporta al calendari (.ics)",

DELETE_CONFIRM_SINGLE: "Confirmeu que voleu suprimir aquest esdeveniment?",
DELETE_CONFIRM_SERIES: "Voleu suprimir una única instància o la sèrie completa?",
DELETE_INSTACE_OPTION: "Suprimeix només aquesta instància",
DELETE_SERIES_OPTION: "Suprimeix la sèrie completa",
DELETE_DIALOG_BUTTON: "Suprimeix",

FOLLOW_CONFIRM_SERIES: "Voleu seguir una única instància o la sèrie completa?",
FOLLOW_INSTACE_OPTION: "Segueix només aquesta instància",
FOLLOW_SERIES_OPTION: "Segueix la sèrie completa",
FOLLOW_DIALOG_BUTTON: "Segueix",
FOLLOW_CONFIRM: "Heu seguit aquest esdeveniment. Subscriviu-lo a la vostra aplicació de calendari a través del <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">canal d'informació d'iCal</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Heu seguit aquesta sèrie d'esdeveniments. Subscriviu-la a la vostra aplicació de calendari a través del <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">canal d'informació d'iCal</a>.",
UNFOLLOW_CONFIRM: "Heu deixat de seguir aquest esdeveniment.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Heu deixat de seguir aquesta sèrie d'esdeveniments.",

RSVP_CONFIRM_SERIES: "Voleu assistir a una única instància o a la sèrie completa?",
RSVP_INSTACE_OPTION: "Assisteix només a aquesta instància",
RSVP_SERIES_OPTION: "Assisteix a la sèrie completa",
RSVP_DIALOG_BUTTON: "Assisteix",
RSVP_CONFIRM: "Assistireu a aquest esdeveniment. Subscriviu-lo a la vostra aplicació de calendari a través del <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">canal d'informació d'iCal</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Assistireu a aquesta sèrie d'esdeveniments. Subscriviu-la a la vostra aplicació de calendari a través del <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">canal d'informació d'iCal</a>.",
UNRSVP_CONFIRM: "Heu deixat d'assistir a aquest esdeveniment.",
UNRSVP_ENTIRESERIES_CONFIRM: "Heu deixat d'assistir a aquesta sèrie d'esdeveniments.",


SU: "Dg.",
MO: "Dl.",
TU: "Dt.",
WE: "Dc.",
TH: "Dj.",
FR: "Dv.",
SA: "Ds.",
SU_FULL: "Diumenge",
MO_FULL: "Dilluns",
TU_FULL: "Dimarts",
WE_FULL: "Dimecres",
TH_FULL: "Dijous",
FR_FULL: "Divendres",
SA_FULL: "Dissabte",

DAYS: "dies",
WEEKS: "Setmanes",
MONTHS: "mesos",
YEARS: "anys",
DAY: "dia",
WEEK: "Setmana",
MONTH: "mes",
YEAR: "any",

ON_THE_MONTHLY_DAY: "|| del mes.",
ON_THE_MONTHLY_WEEKDAY: "|| del mes.",

REMOVE: "Elimina",

ERROR: "Error",
ERROR_HEADER: "Comproveu el següent",

WARNING: "Advertiment",
WARNING_HEADER: "Advertiment",

CREATED_BY: "Creat per ${0}",
CREATED_ON: "Creat el ${0}",
UPDATED_ON: "Actualitzat el ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Creat el ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Actualitzat el ${0}",
WHEN: "Quan:",
REPEATS: "Repeticions:",
DATE: "Data",
ON: "A:",
ALL_DAY_EVENT:"Esdeveniment durant tot el dia",
ALL_DAY:"Tot el dia",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, tot el dia",
RECURRENCE: "Repeticions",
SUBJECT: "Assumpte:",
EVENT_TITLE: "Títol de l'esdeveniment:",
TAGS: "Etiquetes:",
DESCRIPTION: "Descripció:",
LOCATION: "Ubicació:",
IMAGE_URL: "URL de la imatge:",
SUBMIT: "Envia",
SAVE: "Desa",
CANCEL: "Cancel·la",
SAVECLOSE: "Desa i tanca",
DELETE: "Suprimeix la instància",
FROM: "de",
TO: "per a",
CLOSE: "Tanca",
OPEN: "Obre",
CLOSE_SECTION: "Tanca la secció",
OPEN_SECTION: "Obre la secció",
NO: "No",
CONFIRM: "Confirma",
CLEAR_EXCEPTIONS_CONFIRM: "Esteu tornant a programar diverses instàncies d'una reunió que es repeteix. Totes aquestes instàncies es desplaçaran per la mateixa quantitat relativa de temps, inclosos els que s'hagin tornat a programar prèviament. Assegureu-vos de revisar els efectes d'aquests canvis.\n\nConfirmeu que voleu continuar?",

DAILY: "Diàriament",
WEEKLY: "Setmanalment",
BIWEEKLY: "Cada dues setmanes",
EVERY_X_WEEK: "Cada ${0} setmanes",
MONTHLY: "Mensual",
MONTHLY_BY_DAY: "Mensual per dia",
MONTHLY_BY_WEEKDAY: "Mensual per dia de la setmana",
YEARLY: "Anualment",
CUSTOM: "Personalitza",
NONE: "Cap",
REPEAT_NONE: "Aquesta entrada no es repeteix",
REPEAT_DAILY: "Aquesta entrada es repeteix diàriament",
REPEAT_WEEKLY: "Aquesta entrada es repeteix setmanalment",
REPEAT_DAILY_SHORT: "Diàriament",
REPEAT_WEEKLY_SHORT: "Setmanalment",
REPEAT_MONTHLY_SHORT: "Mensual",

REPEATS: "Repeticions",
REPEATS_LABEL: "Repeticions:",

REPEAT_FREQUENCY_ONEWEEK: "Setmana",
REPEAT_FREQUENCY_TWOWEEKS: "2 setmanes",
REPEAT_FREQUENCY_THREEWEEKS: "3 setmanes",
REPEAT_FREQUENCY_FOURWEEKS: "4 setmanes",
REPEAT_FREQUENCY_FIVEWEEKS: "5 setmanes",

REPEAT_MONTHLY_ON_THIS_DATE: "En aquesta data:",
REPEAT_MONTHLY_ON_THIS_DAY: "En aquest dia:",

DATE_OF_MONTH_1: "1r dia",
DATE_OF_MONTH_2: "2n dia",
DATE_OF_MONTH_3: "3r dia",
DATE_OF_MONTH_4: "4t dia",
DATE_OF_MONTH_5: "5è dia",
DATE_OF_MONTH_6: "6è dia",
DATE_OF_MONTH_7: "7è dia",
DATE_OF_MONTH_8: "8è dia",
DATE_OF_MONTH_9: "9è dia",
DATE_OF_MONTH_10: "10è dia",
DATE_OF_MONTH_11: "11è dia",
DATE_OF_MONTH_12: "12è dia",
DATE_OF_MONTH_13: "13è dia",
DATE_OF_MONTH_14: "14è dia",
DATE_OF_MONTH_15: "15è dia",
DATE_OF_MONTH_16: "16è dia",
DATE_OF_MONTH_17: "17è dia",
DATE_OF_MONTH_18: "18è dia",
DATE_OF_MONTH_19: "19è dia",
DATE_OF_MONTH_20: "20è dia",
DATE_OF_MONTH_21: "21è dia",
DATE_OF_MONTH_22: "22è dia",
DATE_OF_MONTH_23: "23è dia",
DATE_OF_MONTH_24: "24è dia",
DATE_OF_MONTH_25: "25è dia",
DATE_OF_MONTH_26: "26è dia",
DATE_OF_MONTH_27: "27è dia",
DATE_OF_MONTH_28: "28è dia",
DATE_OF_MONTH_29: "29è dia",
DATE_OF_MONTH_30: "30è dia",
DATE_OF_MONTH_31: "31è dia",

First_WEEK_OF_MONTH:"1a setmana",
Second_WEEK_OF_MONTH:"2a setmana",
Third_WEEK_OF_MONTH:"3a setmana",
Fourth_WEEK_OF_MONTH:"4a setmana",
LAST_WEEK_OF_MONTH:"l'última setmana",

First_WEEK_OF_MONTH_FEMALE:"1a setmana", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"2a setmana",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"3a setmana",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"4a setmana",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"l'última setmana",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"1a setmana",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"2a setmana",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"3a setmana",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"4a setmana",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"l'última setmana",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Seleccioneu el dia de la setmana",
SELECT_WEEK_OF_MONTH:"Seleccioneu la setmana del mes",
SELECT_DATE_OF_MONTH:"Seleccioneu la data del mes",
Fieldset_Event:"Camps per crear o editar l'esdeveniment",

MESSAGE_BY_DATE_SKIPPED : "Els mesos que no continguin aquesta data s'ometran",

EVERY: "Cada:",
UNTIL: "Fins a:",
ON: "A:",

ADD_ANOTHER: "Afegeix-ne un altre",
REPEAT_ON: "Repeteix el",

ADD_EVENT: "Crea un esdeveniment",
EDIT_EVENT: "Edita l'esdeveniment",

NOTIFY: "Notifica-ho a altres persones",
NOTIFY_TITLE: "Notifica-ho a altres persones",
NOTIFY_OK: "Notifica",
DELETE: "Suprimeix",
EDIT: "Edita",
EDIT_LABEL: "Edita:",
EDIT_THIS_INSTANCE: "Edita aquesta instància",
EDIT_THIS_SERIES: "Edita la sèrie completa",
FOLLOW: "Segueix",
FOLLOW_THIS_INSTANCE: "Segueix aquesta instància",
FOLLOW_THIS_SERIES: "Segueix la sèrie completa",
UNFOLLOW: "Deixa de seguir",

RSVP: "Hi assistiré",
RSVP_THIS_INSTANCE: "Assisteix només a aquesta instància",
RSVP_THIS_SERIES: "Assisteix a la sèrie completa",
UNRSVP: "No hi assistiré",

START_TIME_AFTER_END: "L'hora d'inici de l'esdeveniment ha de ser abans de l'hora de finalització",
START_DAY_AFTER_UNTIL_DAY: "La data d'inici d'un esdeveniment que es repeteix no pot ser posterior a la data de l'última repetició",
DURATION_LARGER_THAN_24H: "La durada de l'esdeveniment no ha de ser superior a 24 hores. Creeu un esdeveniment repetitiu.",
DESCRIPTION_LENGTH: 'La descripció és massa llarga',
SUBJECT_LENGTH: 'El títol de l\'esdeveniment és massa llarg',
LOCATION_LENGTH: 'La ubicació és massa llarga',
IMAGE_URL_INVALID: 'L\'URL de la imatge no és vàlid',
UNTIL_DATE: 'Especifiqueu una data de finalització vàlida per a l\'esdeveniment',
NO_REPEAT_ON: 'S\'ha de seleccionar almenys un dia per a un esdeveniment que es repeteix',
START_DATE_IN_PAST: 'L\'hora d\'inici de l\'esdeveniment ja ha passat',

SUBJECT_INVALID: 'El títol de l\'esdeveniment ha de ser vàlid',
START_DATE_INVALID: 'La data d\'inici ha de ser vàlida',
START_TIME_INVALID: 'L\'hora d\'inici ha de ser vàlida',
END_DATE_INVALID: 'La data de finalització ha de ser vàlida',
END_TIME_INVALID: 'L\'hora de finalització ha de ser vàlida',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'No s\'ha seleccionat cap membre. Seleccioneu-ne un com a mínim per enviar-li una notificació.',

NEXT_MONTH: "Visualitza el mes proper",
PREVIOUS_MONTH: "Visualitza el mes anterior",
CALENDAR_SUMMARY: "Calendari mensual amb elements de tasques pendents",

SEND: "Envia",
MAP_ROLE: "Els membres tenen el rol de:",
READ_ACCESS: "Lector",
AUTHOR_ACCESS: "Autor (crea i edita els seus propis esdeveniments)",
SAVE: "Desa",
PREF_FORM_TITLE: "Edita els paràmetres del calendari",
TAB_UPCOMING: "Esdeveniments",
TAB_CALENDAR: "Vista del calendari",
SUMMARY: "Resum",
DETAILS: "Detalls",
EVENT_TIME: "Hora de l'esdeveniment",
UPDATED: "Actualitzat",
SORT_ASC: "Ordena en sentit ascendent",
SORT_DESC: "Ordena en sentit descendent",
TODAY: "Avui",
TOMORROW: "Demà",
YESTERDAY: "Ahir",
EVENT_NAME: "Nom de l'esdeveniment",
SHOW_DETAILS: "mostra els detalls",
SHOW_PASTEVENTS: "Mostra els esdeveniments passats",
SHOW_UPCOMINGEVENTS: "Mosta els esdeveniments propers",
HIDE_DETAILS: "amaga els detalls",
SELECT_CHECKBOX: "fes clic per seleccionar-ho",
UNSELECT_CHECKBOX: "fes clic per desseleccionar-ho",
NO_DESCRIPTION: "No s'ha proporcionat cap descripció",
DISPLAY: "Visualitza",
REPEATS_FLAG: "(repeticions)",
STR_VIEW: "Vista:",
DISP_CALENDAR: "Quadrícula del calendari",
DISP_LIST: "Llista resum",

GOTO_EDIT_INFO: "Per editar les preferències, heu d'anar a Accions de la comunitat -> Edita la comunitat -> Calendari.",
VIEW_ALL_EVENTS: "Mostra tots els esdeveniments",
NO_EVENT_TODAY: "Avui no hi ha cap esdeveniment",
ONE_EVENT_TODAY: "Avui hi ha un esdeveniment",
X_EVENTS_TODAY: "Avui hi ha ${0} esdeveniments",

OK: "D'acord",
UPCOMING_EVENTS: "Esdeveniments propers",
PICK_MEMBERS: "Seleccioneu els membres de la comunitat",
NOTIFICATION_MESSAGE: "Missatge",
NOTIFY_OTHERS: "Notifica-ho als membres de la comunitat",
NOTIFY_DEFAULT_MESSAGE: "Hola. Crec que us podria interessar aquest esdeveniment.",
NOTIFY_ERROR: "S'ha produït un error en notificar a les persones: ${0}",
NOTIFY_SUCCESS: "La notificació s'ha enviat correctament.",
NOTIFY_ERROR_2: "L'esdeveniment s'ha desat, però s'ha produït un error en notificar-ho a les altres persones: ${0}",
INTERNAL_SERVER_ERR: "error de servidor intern",
INTERNAL_SERVER_NOT_AVAILABLE: "S'ha produït un error en mostrar el contingut. Contacteu amb l'administrador del sistema.",

ALT_WARNING_ICON: "Icona d'advertiment",
ALT_CONFIRM_ICON: "Icona de confirmació",
ALT_ERROR_ICON: "Icona Error",
A11Y_WARNING_LABEL: "Advertiment:",
A11Y_CONFIRM_LABEL: "Confirmació:",
A11Y_ERROR_LABEL: "Error:",

TAB_ABOUT: "Quant a",
TAB_COMMENT: "Comentaris (${0})",
ADD_COMMENT: "Afegeix un comentari...",
ENTER_COMMENT: "Introduïu el vostre comentari:",
ENTER_COMMENT_ERROR: "Introduïu el comentari i feu clic a \"Desa\". Si ja no voleu deixar cap comentari, feu clic a \"Cancel·la\".",
COMMENT_META: "${0} ha comentat a ${1}",
CONFIRM_DELETE_COMMENT: "Confirmeu que voleu suprimir aquest comentari?",
NO_COMMENT: "No hi ha cap comentari.",

EVENT_DELETE_ERROR: "No s'ha pogut suprimir l'esdeveniment. Pot ser que ja s'hagués suprimit l'esdeveniment. Actualitzeu la pàgina i torneu-ho a provar.",


TAB_ATTENDEE: "Hi assisteixen ${0} persones",
NO_ATTENDEE: "No hi ha cap assistent.",
NO_INSTANCE: "No hi ha cap esdeveniment proper.",
NO_UPCOMING_FOLLOWED: "No seguiu cap esdeveniment proper.",
NO_UPCOMING_ATTENDED: "No assistireu a cap esdeveniment proper.",
NO_UPCOMING_FOLLOWATTENDED: "No seguiu ni assistireu a cap esdeveniment proper.",

FOLLOWED_EVENTS_LABEL: "Esdeveniments que seguiu:",
ATTENDED_EVENTS_LABEL: "Esdeveniments als quals teniu pensat assistir:",
FOLLOWATTENDED_EVENTS_LABEL: "Esdeveniments que seguiu i als quals teniu pensat assistir:",

PAGING_INFO: "${0}-${1} de ${2}",
PAGING_INFO_TITLE: "Mostra els elements ${0} a través de ${1} de ${2}",
PAGING_PREVIOUS: "Anterior",
PAGING_PREVIOUS_TITLE: "Pàgina anterior",
PAGING_NEXT: "Següent",
PAGING_NEXT_TITLE: "Pàgina següent",
PAGING_SHOW: "Mostra",
PAGING_LABEL: "Paginació",

PAGING_COMMENT_LABEL:"Paginació de comentaris (control superior)",
PAGING_COMMENT_BOTTOM_LABEL:"Paginació de comentaris (control inferior)",
PAGING_ATTENDEE_LABEL:"Paginació de persones que hi assisteixen (control superior)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Paginació de persones que hi assisteixen (control inferior)",

PAGING_ITEMS: "elements",
PAGING_PAGE_TITLE: "Mostra ${0} ítems per pàgina",
PAGING_PAGE_TITLE2: "Pàgina ${0}",
PAGING_PAGE_TITLE3: "Feu clic per mostrar ${0} elements per pàgina",
PAGING_JUMPTO: "Salta a la pàgina ${0} de ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Número de pàgina",
PAGEING_JUMP_LABEL:"Si canvieu el valor, s'actualitzaran els resultats de la pàgina.",

DETAIL_WHEN: "Quan: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Hora: ${0}-${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} per ${1}",
ABOUT_ADDED: "Creat:",
ABOUT_UPDATED: "Actualitzat:",

WITH_TAGS: "Amb etiquetes:",
TAGS_TITLE: "Etiquetes",
TAGS_REMOVE_HINT: "Suprimeix l'etiqueta ${0} de les etiquetes filtrades seleccionades",

HELP: "Ajuda",
CLOSE_HELP: "Tanca l'ajuda",

TAGCLOUD_HELP: "Una etiqueta és una paraula clau que s'assigna a una comunitat per categoritzar-la i trobar-la més fàcilment. Escriviu o feu clic a una etiqueta per veure els esdeveniments de la comunitat que hi estan associats. Les etiquetes populars apareixen en un text més gran i fosc al grup d'etiquetes.",
//start - end
DURATION_SPAN: "${0}-${1}",
LOADING: "S'està carregant...",
NOT_AUTHORIZED: "No teniu permís per dur a terme aquesta acció.",
STARTS:"Comença:",
ENDS:"Acaba:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} a les ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Una etiqueta és una paraula clau que s'assigna al contingut per tal de trobar-lo més fàcilment. Les etiquetes han de ser paraules simples, com ara nòmina o recursos_humans, separades per comes o espais.",
INVALID_CHAR_IN_TAG: "La llista d'etiquetes que heu especificat conté el caràcter no vàlid \"&\". Elimineu-lo de la llista d'etiquetes.",

NO_UPCOMING_EVENTS_MSG_SHORT: "No hi ha cap esdeveniment proper.",
NO_UPCOMING_EVENTS_MSG: "No hi ha cap esdeveniment proper en aquesta comunitat.",
NO_PAST_EVENTS_MSG: "No hi ha cap esdeveniment passat en aquesta comunitat.",

OWNER: "Propietari",
MEMBER: "Membre",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Accions d'esdeveniments",
EVENT_VIEWS_NAVIGATION: "Vistes d'esdeveniments",

EVENTS_VIEW_TOOLBAR_LABEL: "Accions d'esdeveniments",

ALLDAY_UPDATED_MSG_HINT: "L'hora d'inici i l'hora de finalització de l'esdeveniment s'han actualitzat en conseqüència.",

EVENT_STARTTIME_LABEL: "Hora d'inici de l'esdeveniment",
EVENT_ENDTIME_LABEL: "Hora de finalització de l'esdeveniment",

REPEATS_ENABLE_DISABLE_HINT: "Feu clic per activar o desactivar les opcions de repetició",
REPEATING_OPTIONS_HINT: "Opcions de repetició",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Introduïu una data. Exemple: ${0}",
ENTER_TIME_EXAMPLE: "Introduïu una hora. Exemple: ${0}",

REQUIRED: "Obligatori",

COLLAPSED_SECTION: "Secció reduïda",
EXPANDED_SECTION: "Secció expandida",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Editeu només aquesta instància o la sèrie completa. L'edició de la sèrie completa no sobreescriurà els canvis que heu fet prèviament en una única instància d'aquest esdeveniment.",

REPEATING_FREQUENCY: "Freqüència de repetició",
REPEATING_UNTIL: "Repeteix fins a",
REPEATING_ON: "Repeteix el",

CALENDAR_PREF_SAVE_CONFIRM: "S'han desat els canvis al calendari.",
HIDE_THIS_MESSAGE: "Oculta aquest missatge",

EVENT_OPEN_ERR_NOTFOUND: "No s'ha pogut obrir l'esdeveniment de la comunitat. Possible causa: l'esdeveniment ja s'ha suprimit.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (hora:${1}, lloc: ${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (hora:${1}).",
LINK_OPEN_INFO: "${0} (hora:${1}, lloc: ${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (hora:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Si feu clic a l'enllaç, s'obrirà una finestra nova.",

WARNING_ICON: "Icona d'advertiment",

MENTION: {
	NOT_MEMBER_WARNING: "Les següents persones esmentades no podran veure el missatge perquè no són membres de la comunitat.",
	NOT_SAME_ORGANIZATION_WARNING: "Les següents persones esmentades no podran veure el missatge perquè formen part d'una organització diferent"
},
SELECT_ALL: "Selecciona-ho tot"
})
