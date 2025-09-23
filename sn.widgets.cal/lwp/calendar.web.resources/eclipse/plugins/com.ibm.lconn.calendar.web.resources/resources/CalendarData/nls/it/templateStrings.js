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
TITLE: "Eventi",

CREATE_BUTTON: "Crea un evento",
CREATE_BUTTON_TOOLTIP: "Crea un nuovo evento il giorno selezionato",
EDIT_BUTTON: "Modifica evento",
EDIT_BUTTON_TOOLTIP: "Modifica l'evento selezionato",
DELETE_BUTTON: "Elimina evento",
DELETE_BUTTON_TOOLTIP: "Elimina l'evento selezionato",
BACKTOCAL: "Torna agli eventi della comunità",
BACKTOCAL2: "Fare clic per tornare agli eventi della comunità",
MORE_ACTIONS: "Ulteriori azioni",

DAY_VIEW_TOOLTIP: "Vista giornaliera",
TWODAY_VIEW_TOOLTIP: "Vista di due giorni",
FIVEDAY_VIEW_TOOLTIP: "Vista di cinque giorni",
WEEK_VIEW_TOOLTIP: "Vista settimanale",
MONTH_VIEW_TOOLTIP: "Vista mensile",

DAY_VIEW: "Un giorno",
TWODAY_VIEW: "Due giorni",
FIVEDAY_VIEW: "Cinque giorni",
WEEK_VIEW: "Settimana",
MONTH_VIEW: "Mese",

ICAL_FEED: "Aggiungi al calendario personale",
ICAL_FEED_DIALOG_TITLE: "Aggiungi al calendario personale",

ICAL_FEED_HINT: "Copiare questo URL e iscriverlo nell'applicazione di calendario come feed di iCal:",
ICAL_FEED_SUBSCRIBE_HINT: "È possibile iscriversi agli eventi di HCL Connections in molte applicazioni come HCL Notes e Microsoft Outlook. Fare clic sull'URL seguente per iscriversi a tutti gli eventi di questa comunità. A seconda dell'applicazione di calendario utilizzata, potrebbe essere necessario copiarvi l'URL.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "È possibile iscriversi agli eventi di HCL Connections in molte applicazioni come HCL Notes e Microsoft Outlook. Fare clic sull'URL seguente per iscriversi a tutti gli eventi che si seguiranno o a cui si parteciperà. A seconda dell'applicazione di calendario utilizzata, potrebbe essere necessario copiarvi l'URL.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "È possibile iscriversi agli eventi di HCL Connections in molte applicazioni come HCL Notes e Microsoft Outlook. Fare clic sull'URL seguente per iscriversi a tutti gli eventi che si seguiranno. A seconda dell'applicazione di calendario utilizzata, potrebbe essere necessario copiarvi l'URL.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "È possibile iscriversi agli eventi di HCL Connections in molte applicazioni come HCL Notes e Microsoft Outlook. Fare clic sull'URL seguente per iscriversi a tutti gli eventi a cui si parteciperà. A seconda dell'applicazione di calendario utilizzata, potrebbe essere necessario copiarvi l'URL.",
ICAL_FEED_HINT_POPUP: "Fare clic con il pulsante destro del mouse e copiare questo URL e iscriverlo nell'applicazione di calendario come feed di iCal",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Fare clic sul feed di seguito per visualizzare gli eventi della comunità nel calendario personale di Notes o Outlook:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Istruzioni:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Aggiungi eventi della comunità al calendario di Notes",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Aggiungi eventi della comunità a Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Aggiungi eventi della comunità a Google Calendar",

ICAL_FEED_EXPORT_ICS:	"Esporta in calendario (.ics)",

DELETE_CONFIRM_SINGLE: "Eliminare questo evento?",
DELETE_CONFIRM_SERIES: "Eliminare l'istanza singola o l'intera serie?",
DELETE_INSTACE_OPTION: "Elimina solo questa istanza",
DELETE_SERIES_OPTION: "Elimina l'intera serie",
DELETE_DIALOG_BUTTON: "Elimina",

FOLLOW_CONFIRM_SERIES: "Seguire l'istanza singola o l'intera serie?",
FOLLOW_INSTACE_OPTION: "Segui solo questa istanza",
FOLLOW_SERIES_OPTION: "Segui l'intera serie",
FOLLOW_DIALOG_BUTTON: "Segui",
FOLLOW_CONFIRM: "Si è scelto di seguire questo evento. Iscriverlo nell'applicazione di calendario tramite il <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">feed di iCal</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Si è scelto di seguire questa serie di eventi. Iscriverla nell'applicazione di calendario tramite il<a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">feed di iCal</a>.",
UNFOLLOW_CONFIRM: "Non si segue più questo evento.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Non si segue più questa serie di eventi.",

RSVP_CONFIRM_SERIES: "Partecipare all'istanza singola o all'intera serie?",
RSVP_INSTACE_OPTION: "Partecipa solo a questa istanza",
RSVP_SERIES_OPTION: "Partecipa all'intera serie",
RSVP_DIALOG_BUTTON: "Partecipa",
RSVP_CONFIRM: "Si è scelto di partecipare a questo evento. Iscriverlo all'applicazione di calendario tramite il<a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">feed di iCal</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Si è scelto di partecipare a questa serie di eventi. Iscriverla nell'applicazione di calendario tramite il<a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">feed di iCal</a>.",
UNRSVP_CONFIRM: "Non si partecipa più a questo evento.",
UNRSVP_ENTIRESERIES_CONFIRM: "Non si partecipa più a questa serie di eventi.",


SU: "Dom",
MO: "Lun",
TU: "Mar",
WE: "Mer",
TH: "Gio",
FR: "Ven",
SA: "Sab",
SU_FULL: "Domenica",
MO_FULL: "Lunedì",
TU_FULL: "Martedì",
WE_FULL: "Mercoledì",
TH_FULL: "Giovedì",
FR_FULL: "Venerdì",
SA_FULL: "Sabato",

DAYS: "giorni",
WEEKS: "Settimane",
MONTHS: "mesi",
YEARS: "anni",
DAY: "giorno",
WEEK: "Settimana",
MONTH: "mese",
YEAR: "anno",

ON_THE_MONTHLY_DAY: "Il giorno || del mese.",
ON_THE_MONTHLY_WEEKDAY: "Il giorno || del mese.",

REMOVE: "Rimuovi",

ERROR: "Errore",
ERROR_HEADER: "Controllare quanto segue",

WARNING: "Avvertimento",
WARNING_HEADER: "Avvertimento",

CREATED_BY: "Creato da ${0}",
CREATED_ON: "Creato il ${0}",
UPDATED_ON: "Aggiornato il ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Creato il ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Aggiornato il ${0}",
WHEN: "Quando:",
REPEATS: "Ripetizioni:",
DATE: "Data",
ON: "Il:",
ALL_DAY_EVENT:"Evento per l'intera giornata",
ALL_DAY:"Intera giornata",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, intera giornata",
RECURRENCE: "Ripetizioni",
SUBJECT: "Oggetto:",
EVENT_TITLE: "Titolo evento:",
TAGS: "Tag:",
DESCRIPTION: "Descrizione:",
LOCATION: "Ubicazione:",
IMAGE_URL: "URL immagine:",
SUBMIT: "Inoltra",
SAVE: "Salvare",
CANCEL: "Annulla",
SAVECLOSE: "Salva e chiudi",
DELETE: "Elimina istanza",
FROM: "da",
TO: "a",
CLOSE: "Chiudi",
OPEN: "Apri",
CLOSE_SECTION: "Chiudi sezione",
OPEN_SECTION: "Apri sezione",
NO: "No",
CONFIRM: "Conferma",
CLEAR_EXCEPTIONS_CONFIRM: "Verranno ripianificate più istanze di una riunione ripetuta. Queste istanze, comprese quelle ripianificate in precedenza, verranno spostate in base allo stesso intervallo di tempo corrispondente. Assicurarsi di controllare gli effetti di queste modifiche.\n\nContinuare?",

DAILY: "Quotidiana",
WEEKLY: "Settimanale",
BIWEEKLY: "Bisettimanale",
EVERY_X_WEEK: "Ogni ${0} settimane",
MONTHLY: "Mensile",
MONTHLY_BY_DAY: "Mensile per giorno",
MONTHLY_BY_WEEKDAY: "Mensile per giorno feriale",
YEARLY: "Annuale",
CUSTOM: "Personalizzata",
NONE: "Nessuno",
REPEAT_NONE: "Questa voce non si ripete",
REPEAT_DAILY: "Questa voce si ripete ogni giorno",
REPEAT_WEEKLY: "Questa voce si ripete ogni settimana",
REPEAT_DAILY_SHORT: "Quotidiana",
REPEAT_WEEKLY_SHORT: "Settimanale",
REPEAT_MONTHLY_SHORT: "Mensile",

REPEATS: "Ripetizione",
REPEATS_LABEL: "Si ripete:",

REPEAT_FREQUENCY_ONEWEEK: "Settimana",
REPEAT_FREQUENCY_TWOWEEKS: "2 settimane",
REPEAT_FREQUENCY_THREEWEEKS: "3 settimane",
REPEAT_FREQUENCY_FOURWEEKS: "4 settimane",
REPEAT_FREQUENCY_FIVEWEEKS: "5 settimane",

REPEAT_MONTHLY_ON_THIS_DATE: "In questa data:",
REPEAT_MONTHLY_ON_THIS_DAY: "In questo giorno:",

DATE_OF_MONTH_1: "l'1",
DATE_OF_MONTH_2: "il 2",
DATE_OF_MONTH_3: "il 3",
DATE_OF_MONTH_4: "il 4",
DATE_OF_MONTH_5: "il 5",
DATE_OF_MONTH_6: "il 6",
DATE_OF_MONTH_7: "il 7",
DATE_OF_MONTH_8: "l'8",
DATE_OF_MONTH_9: "il 9",
DATE_OF_MONTH_10: "il 10",
DATE_OF_MONTH_11: "l'11",
DATE_OF_MONTH_12: "il 12",
DATE_OF_MONTH_13: "il 13",
DATE_OF_MONTH_14: "il 14",
DATE_OF_MONTH_15: "il 15",
DATE_OF_MONTH_16: "il 16",
DATE_OF_MONTH_17: "il 17",
DATE_OF_MONTH_18: "il 18",
DATE_OF_MONTH_19: "il 19",
DATE_OF_MONTH_20: "il 20",
DATE_OF_MONTH_21: "il 21",
DATE_OF_MONTH_22: "il 22",
DATE_OF_MONTH_23: "il 23",
DATE_OF_MONTH_24: "il 24",
DATE_OF_MONTH_25: "il 25",
DATE_OF_MONTH_26: "il 26",
DATE_OF_MONTH_27: "il 27",
DATE_OF_MONTH_28: "il 28",
DATE_OF_MONTH_29: "il 29",
DATE_OF_MONTH_30: "il 30",
DATE_OF_MONTH_31: "il 31",

First_WEEK_OF_MONTH:"la prima",
Second_WEEK_OF_MONTH:"la seconda",
Third_WEEK_OF_MONTH:"la terza",
Fourth_WEEK_OF_MONTH:"la quarta",
LAST_WEEK_OF_MONTH:"l'ultima",

First_WEEK_OF_MONTH_FEMALE:"la prima", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"la seconda",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"la terza",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"la quarta",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"l'ultima",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"la prima",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"la seconda",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"la terza",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"la quarta",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"l'ultima",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Seleziona il giorno della settimana",
SELECT_WEEK_OF_MONTH:"Seleziona la settimana del mese",
SELECT_DATE_OF_MONTH:"Seleziona la data del mese",
Fieldset_Event:"Campi per la creazione o la modifica dell'evento",

MESSAGE_BY_DATE_SKIPPED : "I mesi che non contengono questa data verranno ignorati",

EVERY: "Ogni:",
UNTIL: "Fino:",
ON: "Il:",

ADD_ANOTHER: "Aggiungi altro",
REPEAT_ON: "Ripeti il",

ADD_EVENT: "Crea evento",
EDIT_EVENT: "Modifica evento",

NOTIFY: "Invia notifica ad altre persone",
NOTIFY_TITLE: "Invia notifica ad altre persone",
NOTIFY_OK: "Notifica",
DELETE: "Elimina",
EDIT: "Modifica",
EDIT_LABEL: "Modifica:",
EDIT_THIS_INSTANCE: "Modifica questa istanza",
EDIT_THIS_SERIES: "Modifica intera serie",
FOLLOW: "Segui",
FOLLOW_THIS_INSTANCE: "Segui questa istanza",
FOLLOW_THIS_SERIES: "Segui intera serie",
UNFOLLOW: "Non seguire più",

RSVP: "Parteciperò",
RSVP_THIS_INSTANCE: "Partecipa a questa istanza",
RSVP_THIS_SERIES: "Partecipa a intera serie",
UNRSVP: "Non parteciperò",

START_TIME_AFTER_END: "L'ora di inizio dell'evento deve essere precedente all'ora di fine",
START_DAY_AFTER_UNTIL_DAY: "La data di inizio di un evento ripetuto non deve essere successiva alla data di fine della ripetizione",
DURATION_LARGER_THAN_24H: "La durata dell'evento non deve superare le 24 ore. In alternativa, creare un evento di ripetizione.",
DESCRIPTION_LENGTH: 'La descrizione è troppo lunga',
SUBJECT_LENGTH: 'Il titolo dell\'evento è troppo lungo',
LOCATION_LENGTH: 'La posizione è troppo lunga',
IMAGE_URL_INVALID: 'L\'URL dell\'immagine non è valido',
UNTIL_DATE: 'Specificare una data di fine dell\'evento valida',
NO_REPEAT_ON: 'Occorre selezionare almeno un giorno per un evento ripetuto',
START_DATE_IN_PAST: 'L\'evento inizia nel passato',

SUBJECT_INVALID: 'Il titolo dell\'evento deve essere valido',
START_DATE_INVALID: 'La data di inizio deve essere valida',
START_TIME_INVALID: 'L\'ora di inizio deve essere valida',
END_DATE_INVALID: 'La data di fine deve essere valida',
END_TIME_INVALID: 'L\'ora di fine deve essere valida',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Nessun membro selezionato. Selezionare almeno un membro a cui inviare la notifica.',

NEXT_MONTH: "Visualizza mese successivo",
PREVIOUS_MONTH: "Visualizza mese precedente",
CALENDAR_SUMMARY: "Calendario mensile con elementi To-Do",

SEND: "Invia",
MAP_ROLE: "I membri hanno il ruolo:",
READ_ACCESS: "Lettore",
AUTHOR_ACCESS: "Autore (crea e modifica i propri eventi)",
SAVE: "Salvare",
PREF_FORM_TITLE: "Modifica impostazioni calendario",
TAB_UPCOMING: "Eventi",
TAB_CALENDAR: "Vista calendario",
SUMMARY: "Riepilogo",
DETAILS: "Dettagli",
EVENT_TIME: "Ora evento",
UPDATED: "Aggiornato",
SORT_ASC: "Ordinamento crescente",
SORT_DESC: "Ordinamento decrescente",
TODAY: "Oggi",
TOMORROW: "Domani",
YESTERDAY: "Ieri",
EVENT_NAME: "Nome evento",
SHOW_DETAILS: "mostra dettagli",
SHOW_PASTEVENTS: "Mostra eventi precedenti",
SHOW_UPCOMINGEVENTS: "Mostra eventi imminenti",
HIDE_DETAILS: "nascondi dettagli",
SELECT_CHECKBOX: "fare clic per selezionare",
UNSELECT_CHECKBOX: "fare clic per deselezionare",
NO_DESCRIPTION: "Nessuna descrizione fornita",
DISPLAY: "Visualizza",
REPEATS_FLAG: "(si ripete)",
STR_VIEW: "Vista:",
DISP_CALENDAR: "Griglia calendario",
DISP_LIST: "Elenco riepilogo",

GOTO_EDIT_INFO: "Seguire Azioni comunità -> Modifica comunità -> Calendario per modificare le preferenze.",
VIEW_ALL_EVENTS: "Visualizza tutti gli eventi",
NO_EVENT_TODAY: "Nessun evento per oggi",
ONE_EVENT_TODAY: "1 evento per oggi",
X_EVENTS_TODAY: "${0} eventi per oggi",

OK: "OK",
UPCOMING_EVENTS: "Eventi imminenti",
PICK_MEMBERS: "Seleziona membri della comunità",
NOTIFICATION_MESSAGE: "Messaggio",
NOTIFY_OTHERS: "Invia notifica ai membri della comunità",
NOTIFY_DEFAULT_MESSAGE: "Ciao, forse potresti essere interessato a questo evento.",
NOTIFY_ERROR: "Si è verificato un errore durante l'invio di una notifica alle persone: ${0}",
NOTIFY_SUCCESS: "Notifica inviata correttamente.",
NOTIFY_ERROR_2: "L'evento è stato salvato, ma si è verificato un errore durante l'invio della notifica agli altri: ${0}",
INTERNAL_SERVER_ERR: "errore interno del server",
INTERNAL_SERVER_NOT_AVAILABLE: "Si è verificato un errore durante la visualizzazione del contenuto. Contattare l'amministratore di sistema.",

ALT_WARNING_ICON: "Icona di avviso",
ALT_CONFIRM_ICON: "Icona di conferma",
ALT_ERROR_ICON: "Icona errore",
A11Y_WARNING_LABEL: "Avviso:",
A11Y_CONFIRM_LABEL: "Conferma:",
A11Y_ERROR_LABEL: "Errore:",

TAB_ABOUT: "Informazioni",
TAB_COMMENT: "Commenti (${0})",
ADD_COMMENT: "Aggiungi un commento...",
ENTER_COMMENT: "Inserire un commento:",
ENTER_COMMENT_ERROR: "Immettere un commento e fare clic su \"Salva\". Se non si desidera più lasciare un commento, fare clic su \"Annulla\".",
COMMENT_META: "${0} ha scritto un commento su ${1}",
CONFIRM_DELETE_COMMENT: "Eliminare questo commento?",
NO_COMMENT: "Non esistono commenti.",

EVENT_DELETE_ERROR: "Impossibile eliminare l'evento. L'evento potrebbe essere già stato eliminato. Aggiornare la pagina e riprovare.",


TAB_ATTENDEE: "${0} partecipanti",
NO_ATTENDEE: "Nessun partecipante.",
NO_INSTANCE: "Nessun evento imminente.",
NO_UPCOMING_FOLLOWED: "Non si seguirà alcun evento imminente.",
NO_UPCOMING_ATTENDED: "Non si parteciperà ad alcun evento imminente.",
NO_UPCOMING_FOLLOWATTENDED: "Non si seguiranno o non si parteciperà ad alcun evento imminente.",

FOLLOWED_EVENTS_LABEL: "Eventi che si seguiranno:",
ATTENDED_EVENTS_LABEL: "Eventi a cui si prevede di partecipare:",
FOLLOWATTENDED_EVENTS_LABEL: "Eventi che si seguiranno e a cui si prevede di partecipare:",

PAGING_INFO: "${0} - ${1} di ${2}",
PAGING_INFO_TITLE: "Mostra elementi da ${0} a ${1} di ${2}",
PAGING_PREVIOUS: "Precedente",
PAGING_PREVIOUS_TITLE: "Pagina precedente",
PAGING_NEXT: "Successivo",
PAGING_NEXT_TITLE: "Pagina successiva",
PAGING_SHOW: "Visualizza",
PAGING_LABEL: "Impaginazione",

PAGING_COMMENT_LABEL:"Impaginazione commenti (comando superiore)",
PAGING_COMMENT_BOTTOM_LABEL:"Impaginazione commenti (comando inferiore)",
PAGING_ATTENDEE_LABEL:"Impaginazione partecipanti (comando superiore)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Impaginazione partecipanti (comando inferiore)",

PAGING_ITEMS: "voci",
PAGING_PAGE_TITLE: "Visualizzare ${0} elementi per pagina",
PAGING_PAGE_TITLE2: "Pagina ${0}",
PAGING_PAGE_TITLE3: "Fare clic per mostrare ${0} elementi per pagina",
PAGING_JUMPTO: "Vai a pagina ${0} di ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Numero pagina",
PAGEING_JUMP_LABEL:"La modifica del valore aggiornerà i risultati della pagina",

DETAIL_WHEN: "Quando: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Ora: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} di ${1}",
ABOUT_ADDED: "Creato:",
ABOUT_UPDATED: "Aggiornato:",

WITH_TAGS: "Con tag:",
TAGS_TITLE: "Tags",
TAGS_REMOVE_HINT: "Rimuovi il tag ${0} dai tag di filtro selezionati",

HELP: "Guida",
CLOSE_HELP: "Chiudi la guida",

TAGCLOUD_HELP: "Un tag è una parola chiave assegnata a un evento della comunità per categorizzarla e consentire di trovarla facilmente. Digitare o fare clic su un tag per visualizzare gli eventi della comunità ad esso associati. I tag più utilizzati vengono visualizzati in testo più grande e più scuro nel cloud del tag.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Carica...",
NOT_AUTHORIZED: "Non si è autorizzati ad eseguire questa azione.",
STARTS:"Inizia:",
ENDS:"Termina:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} alle ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Un tag è una parola chiave che si assegna a un contenuto per semplificarne l'individuazione. I tag devono essere parole singole, ad esempio importo o risorse_umane, separate da virgole o spazi.",
INVALID_CHAR_IN_TAG: "L'elenco dei tag inserito contiene caratteri non validi come '&'.  Rimuovere questi caratteri dall'elenco dei tag.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Nessun evento imminente.",
NO_UPCOMING_EVENTS_MSG: "Nessun evento imminente in questa comunità.",
NO_PAST_EVENTS_MSG: "Nessun evento precedente in questa comunità.",

OWNER: "Proprietario",
MEMBER: "Membro",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Azioni evento",
EVENT_VIEWS_NAVIGATION: "Viste evento",

EVENTS_VIEW_TOOLBAR_LABEL: "Azioni evento",

ALLDAY_UPDATED_MSG_HINT: "L'ora di inizio e l'ora di fine dell'evento sono state aggiornate di conseguenza.",

EVENT_STARTTIME_LABEL: "Ora di inizio evento",
EVENT_ENDTIME_LABEL: "Ora di fine evento",

REPEATS_ENABLE_DISABLE_HINT: "Fare clic per abilitare o disabilitare le opzioni di ripetizione",
REPEATING_OPTIONS_HINT: "Opzioni di ripetizione",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Immettere una data. Esempio: ${0}",
ENTER_TIME_EXAMPLE: "Immettere un orario. Esempio: ${0}",

REQUIRED: "Richiesto",

COLLAPSED_SECTION: "Sezione compressa",
EXPANDED_SECTION: "Sezione espansa",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Modificare soltanto questa istanza o l'intera serie. La modifica dell'intera serie non sovrascrive le modifiche apportate in precedenza alle istanze singole di questo evento.",

REPEATING_FREQUENCY: "Frequenza ripetizione",
REPEATING_UNTIL: "Ripeti fino",
REPEATING_ON: "Ripeti il",

CALENDAR_PREF_SAVE_CONFIRM: "Le modifiche a Calendario sono state salvate.",
HIDE_THIS_MESSAGE: "Nascondi questo messaggio",

EVENT_OPEN_ERR_NOTFOUND: "Impossibile aprire l'evento della comunità. Possibile causa: l'evento è già stato eliminato.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (ora:${1}, posizione:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (ora:${1}).",
LINK_OPEN_INFO: "${0} (ora:${1}, posizione:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (ora:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Quando viene selezionato, il collegamento si apre in una nuova finestra.",

WARNING_ICON: "Icona di avviso",

MENTION: {
	NOT_MEMBER_WARNING: "Le persone seguenti menzionate non potranno vedere il messaggio perché non sono membri della comunità.",
	NOT_SAME_ORGANIZATION_WARNING: "Le persone seguenti menzionate non potranno vedere il messaggio perché appartengono a un'altra organizzazione"
},
SELECT_ALL: "Seleziona tutto"
})
