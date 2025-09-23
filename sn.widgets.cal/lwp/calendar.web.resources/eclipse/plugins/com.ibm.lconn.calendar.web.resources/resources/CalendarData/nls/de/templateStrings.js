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
TITLE: "Ereignisse",

CREATE_BUTTON: "Ein Ereignis erstellen",
CREATE_BUTTON_TOOLTIP: "Ein neues Ereignis am ausgewählten Tag erstellen",
EDIT_BUTTON: "Ereignis bearbeiten",
EDIT_BUTTON_TOOLTIP: "Ausgewähltes Ereignis bearbeiten",
DELETE_BUTTON: "Ereignis löschen",
DELETE_BUTTON_TOOLTIP: "Ausgewähltes Ereignis löschen",
BACKTOCAL: "Zurück zu Community-Ereignissen",
BACKTOCAL2: "Klicken Sie, um zu den Community-Ereignissen zurückzukehren",
MORE_ACTIONS: "Weitere Aktionen",

DAY_VIEW_TOOLTIP: "Ansicht für einen Tag",
TWODAY_VIEW_TOOLTIP: "Ansicht für zwei Tage",
FIVEDAY_VIEW_TOOLTIP: "Ansicht für fünf Tage",
WEEK_VIEW_TOOLTIP: "Wochenansicht",
MONTH_VIEW_TOOLTIP: "Monatsansicht",

DAY_VIEW: "Ein Tag",
TWODAY_VIEW: "Zwei Tage",
FIVEDAY_VIEW: "Fünf Tage",
WEEK_VIEW: "Woche",
MONTH_VIEW: "Monat",

ICAL_FEED: "Zum persönlichen Kalender hinzufügen",
ICAL_FEED_DIALOG_TITLE: "Zum persönlichen Kalender hinzufügen",

ICAL_FEED_HINT: "Kopieren Sie diese URL und abonnieren Sie sie in Ihrer Kalender-Anwendung als iCal-Feed:",
ICAL_FEED_SUBSCRIBE_HINT: "Sie können Ihre HCL Connections-Ereignisse in mehreren Anwendungen wie HCL Notes und Microsoft Outlook abonnieren.  Klicken Sie auf die folgende URL, um alle Ereignisse für diese Community zu abonnieren.  Abhängig von Ihrer Kalender-Anwendung müssen Sie die URL möglicherweise in diese Anwendung kopieren.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "Sie können Ihre HCL Connections-Ereignisse in mehreren Anwendungen wie HCL Notes und Microsoft Outlook abonnieren.  Klicken Sie auf die folgende URL, um alle Ereignisse zu abonnieren, denen Sie folgen oder an denen Sie teilnehmen.  Abhängig von Ihrer Kalender-Anwendung müssen Sie die URL möglicherweise in diese Anwendung kopieren.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "Sie können Ihre HCL Connections-Ereignisse in mehreren Anwendungen wie HCL Notes und Microsoft Outlook abonnieren.  Klicken Sie auf die folgende URL, um alle Ereignisse zu abonnieren, denen Sie folgen.  Abhängig von Ihrer Kalender-Anwendung müssen Sie die URL möglicherweise in diese Anwendung kopieren.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "Sie können Ihre HCL Connections-Ereignisse in mehreren Anwendungen wie HCL Notes und Microsoft Outlook abonnieren.  Klicken Sie auf die folgende URL, um alle Ereignisse zu abonnieren, an denen Sie teilnehmen.  Abhängig von Ihrer Kalender-Anwendung müssen Sie die URL möglicherweise in diese Anwendung kopieren.",
ICAL_FEED_HINT_POPUP: "Klicken Sie mit der rechten Maustaste auf diese URL und kopieren Sie sie, abonnieren Sie sie in Ihrer Kalender-Anwendung als iCal-Feed",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Lassen Sie Ihre Community-Ereignisse in Ihrem persönlichen Notes- oder Outlook-Kalender angezeigt werden, indem Sie auf den Feed unten klicken:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Anleitung:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Community-Ereignisse zum Notes-Kalender hinzufügen",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Community-Ereignisse zu Outlook hinzufügen",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Community-Ereignisse zu Google-Kalender hinzufügen",

ICAL_FEED_EXPORT_ICS:	"Zum Kalender exportieren (.ics)",

DELETE_CONFIRM_SINGLE: "Möchten Sie dieses Ereignis wirklich löschen?",
DELETE_CONFIRM_SERIES: "Einzelne Instanz oder gesamte Serie löschen?",
DELETE_INSTACE_OPTION: "Lediglich diese Instanz löschen",
DELETE_SERIES_OPTION: "Gesamte Serie löschen",
DELETE_DIALOG_BUTTON: "Löschen",

FOLLOW_CONFIRM_SERIES: "Einzelner Instanz oder gesamten Serie folgen?",
FOLLOW_INSTACE_OPTION: "Lediglich dieser Instanz folgen",
FOLLOW_SERIES_OPTION: "Gesamter Serie folgen",
FOLLOW_DIALOG_BUTTON: "Folgen",
FOLLOW_CONFIRM: "Sie sind diesem Ereignis gefolgt. Abonnieren Sie es auf Ihrer Kalender-Anwendung über <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal-Feed</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Sie sind dieser Ereignis-Serie gefolgt. Abonnieren Sie sie auf Ihrer Kalender-Anwendung über <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal-Feed</a>.",
UNFOLLOW_CONFIRM: "Sie folgen diesem Ereignis nicht mehr.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Sie folgen dieser Ereignis-Serie nicht mehr.",

RSVP_CONFIRM_SERIES: "An einzelner Instanz oder an gesamter Serie teilnehmen?",
RSVP_INSTACE_OPTION: "Lediglich an dieser Instanz teilnehmen",
RSVP_SERIES_OPTION: "An gesamter Serie teilnehmen",
RSVP_DIALOG_BUTTON: "Teilnehmen",
RSVP_CONFIRM: "Sie nehmen an diesem Ereignis teil. Abonnieren Sie es auf Ihrer Kalender-Anwendung über <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal-Feed</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Sie nehmen an dieser Ereignis-Serie teil. Abonnieren Sie sie auf Ihrer Kalender-Anwendung über <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal-Feed</a>.",
UNRSVP_CONFIRM: "Sie haben die Teilnahme an diesem Ereignis gestoppt.",
UNRSVP_ENTIRESERIES_CONFIRM: "Sie haben die Teilnahme an dieser Ereignis-Serie gestoppt.",


SU: "So",
MO: "Mo",
TU: "Di",
WE: "Mi",
TH: "Do",
FR: "Fr",
SA: "Sa",
SU_FULL: "Sonntag",
MO_FULL: "Montag",
TU_FULL: "Dienstag",
WE_FULL: "Mittwoch",
TH_FULL: "Donnerstag",
FR_FULL: "Freitag",
SA_FULL: "Samstag",

DAYS: "Tage",
WEEKS: "Wochen",
MONTHS: "Monate",
YEARS: "Jahre",
DAY: "Tag",
WEEK: "Woche",
MONTH: "Monat",
YEAR: "Jahr",

ON_THE_MONTHLY_DAY: "Am || des Monats.",
ON_THE_MONTHLY_WEEKDAY: "Am || des Monats.",

REMOVE: "Entfernen",

ERROR: "Fehler beim Erstellen des Boards",
ERROR_HEADER: "Überprüfen Sie Folgendes",

WARNING: "Warnung",
WARNING_HEADER: "Warnung",

CREATED_BY: "Erstellt von ${0}",
CREATED_ON: "Erstellt am ${0}",
UPDATED_ON: "Aktualisiert am ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Erstellt am ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Aktualisiert am ${0}",
WHEN: "Wann:",
REPEATS: "Wiederholungen:",
DATE: "Datum",
ON: "Am:",
ALL_DAY_EVENT:"Ganztägiges Ereignis",
ALL_DAY:"Ganztägig",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, Ganztägig",
RECURRENCE: "Wiederholungen",
SUBJECT: "Betreff:",
EVENT_TITLE: "Titel des Ereignisses:",
TAGS: "Tags:",
DESCRIPTION: "Beschreibung:",
LOCATION: "Standort:",
IMAGE_URL: "Bild-URL:",
SUBMIT: "Senden",
SAVE: "Speichern",
CANCEL: "Abbrechen",
SAVECLOSE: "Speichern und schließen",
DELETE: "Instanz löschen",
FROM: "von",
TO: "bis",
CLOSE: "Schließen",
OPEN: "Öffnen",
CLOSE_SECTION: "Abschnitt schließen",
OPEN_SECTION: "Abschnitt öffnen",
NO: "Nein",
CONFIRM: "Bestätigen",
CLEAR_EXCEPTIONS_CONFIRM: "Sie verschieben mehrere Instanzen einer sich wiederholenden Besprechung. Diese Instanzen werden alle um denselben relativen Zeitbetrag verschoben, inklusive derjenigen, die bereits verschoben wurden. Bitte überprüfen Sie die Auswirkungen dieser Änderungen.\n\nMöchten Sie wirklich fortfahren ?",

DAILY: "Täglich",
WEEKLY: "Wöchentlich",
BIWEEKLY: "Zweiwöchentlich",
EVERY_X_WEEK: "Alle ${0} Wochen",
MONTHLY: "Monatlich",
MONTHLY_BY_DAY: "Monatlich nach Tagen",
MONTHLY_BY_WEEKDAY: "Monatlich nach Wochentag",
YEARLY: "Jährlich",
CUSTOM: "Benutzerdefiniert",
NONE: "Keine",
REPEAT_NONE: "Dieser Eintrag wiederholt sich nicht",
REPEAT_DAILY: "Dieser Eintrag wiederholt sich täglich",
REPEAT_WEEKLY: "Dieser Eintrag wiederholt sich wöchentlich",
REPEAT_DAILY_SHORT: "Täglich",
REPEAT_WEEKLY_SHORT: "Wöchentlich",
REPEAT_MONTHLY_SHORT: "Monatlich",

REPEATS: "Wiederholungen",
REPEATS_LABEL: "Wiederholungen:",

REPEAT_FREQUENCY_ONEWEEK: "Woche",
REPEAT_FREQUENCY_TWOWEEKS: "2 Wochen",
REPEAT_FREQUENCY_THREEWEEKS: "3 Wochen",
REPEAT_FREQUENCY_FOURWEEKS: "4 Wochen",
REPEAT_FREQUENCY_FIVEWEEKS: "5 Wochen",

REPEAT_MONTHLY_ON_THIS_DATE: "An diesem Datum:",
REPEAT_MONTHLY_ON_THIS_DAY: "An diesem Tag:",

DATE_OF_MONTH_1: "Am 1.",
DATE_OF_MONTH_2: "Am 2.",
DATE_OF_MONTH_3: "Am 3.",
DATE_OF_MONTH_4: "Am 4.",
DATE_OF_MONTH_5: "Am 5.",
DATE_OF_MONTH_6: "Am 6.",
DATE_OF_MONTH_7: "Am 7.",
DATE_OF_MONTH_8: "Am 8.",
DATE_OF_MONTH_9: "Am 9.",
DATE_OF_MONTH_10: "Am 10.",
DATE_OF_MONTH_11: "Am 11.",
DATE_OF_MONTH_12: "Am 12.",
DATE_OF_MONTH_13: "Am 13.",
DATE_OF_MONTH_14: "Am 14.",
DATE_OF_MONTH_15: "Am 15.",
DATE_OF_MONTH_16: "Am 16.",
DATE_OF_MONTH_17: "Am 17.",
DATE_OF_MONTH_18: "Am 18.",
DATE_OF_MONTH_19: "Am 19.",
DATE_OF_MONTH_20: "Am 20.",
DATE_OF_MONTH_21: "Am 21.",
DATE_OF_MONTH_22: "Am 22.",
DATE_OF_MONTH_23: "Am 23.",
DATE_OF_MONTH_24: "Am 24.",
DATE_OF_MONTH_25: "Am 25.",
DATE_OF_MONTH_26: "Am 26.",
DATE_OF_MONTH_27: "Am 27.",
DATE_OF_MONTH_28: "Am 28.",
DATE_OF_MONTH_29: "Am 29.",
DATE_OF_MONTH_30: "Am 30.",
DATE_OF_MONTH_31: "Am 31.",

First_WEEK_OF_MONTH:"Am 1.",
Second_WEEK_OF_MONTH:"Am 2.",
Third_WEEK_OF_MONTH:"Am 3.",
Fourth_WEEK_OF_MONTH:"Am 4.",
LAST_WEEK_OF_MONTH:"Am letzten",

First_WEEK_OF_MONTH_FEMALE:"Am 1.", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"Am 2.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"Am 3.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"Am 4.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"Am letzten",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"Am 1.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"Am 2.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"Am 3.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"Am 4.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"Am letzten",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Wählen Sie den Wochentag aus",
SELECT_WEEK_OF_MONTH:"Wählen sie die Woche des Monats aus",
SELECT_DATE_OF_MONTH:"Wählen Sie das Datum des Monats aus",
Fieldset_Event:"Felder, um das Ereignis zu erstellen oder zu bearbeiten",

MESSAGE_BY_DATE_SKIPPED : "Monate, die dieses Datum nicht enthalten, werden übersprungen",

EVERY: "Alle:",
UNTIL: "Bis:",
ON: "Am:",

ADD_ANOTHER: "Weitere hinzufügen",
REPEAT_ON: "Wiederholen am",

ADD_EVENT: "Ereignis erstellen",
EDIT_EVENT: "Ereignis bearbeiten",

NOTIFY: "Andere Personen benachrichtigen",
NOTIFY_TITLE: "Andere Personen benachrichtigen",
NOTIFY_OK: "Benachrichtigen",
DELETE: "Löschen",
EDIT: "Ändern",
EDIT_LABEL: "Bearbeiten:",
EDIT_THIS_INSTANCE: "Diese Instanz bearbeiten",
EDIT_THIS_SERIES: "Gesamte Serie bearbeiten",
FOLLOW: "Folgen",
FOLLOW_THIS_INSTANCE: "Dieser Instanz folgen",
FOLLOW_THIS_SERIES: "Gesamter Serie folgen",
UNFOLLOW: "Nicht mehr folgen",

RSVP: "Nimmt teil",
RSVP_THIS_INSTANCE: "An dieser Instanz teilnehmen",
RSVP_THIS_SERIES: "An gesamter Serie teilnehmen",
UNRSVP: "Nicht teilnehmen",

START_TIME_AFTER_END: "Die Startzeit des Ereignisses muss vor der Endzeit liegen.",
START_DAY_AFTER_UNTIL_DAY: "Das Startdatum eines wiederholten Ereignisses darf nicht nach dem Datum liegen, bis zu welchem es wiederholt werden soll",
DURATION_LARGER_THAN_24H: "Die Dauer des Ereignisses sollte 24 Stunden nicht übersteigen. Bitte erstellen Sie stattdessen ein sich wiederholendes Ereignis.",
DESCRIPTION_LENGTH: 'Die Beschreibung ist zu lang',
SUBJECT_LENGTH: 'Der Ereignistitel ist zu lang',
LOCATION_LENGTH: 'Der Standort ist zu lang',
IMAGE_URL_INVALID: 'Die Bild-Url ist ungültig',
UNTIL_DATE: 'Bitte geben Sie ein gültiges Enddatum des Ereignisses an',
NO_REPEAT_ON: 'Bei einem sich wiederholenden Ereignis sollte mindestens ein Tag ausgewählt werden',
START_DATE_IN_PAST: 'Ereignis beginnt in der Vergangenheit',

SUBJECT_INVALID: 'Ereignistitel muss gültig sein',
START_DATE_INVALID: 'Startdatum muss gültig sein',
START_TIME_INVALID: 'Startzeit muss gültig sein',
END_DATE_INVALID: 'Enddatum muss gültig sein',
END_TIME_INVALID: 'Endzeit muss gültig sein',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Es wurden keine Mitglieder ausgewählt. Bitte wählen Sie mindestens ein Mitglied aus, das benachrichtigt werden soll.',

NEXT_MONTH: "Nächsten Monat anzeigen",
PREVIOUS_MONTH: "Vormonat anzeigen",
CALENDAR_SUMMARY: "Monatskalender mit Aufgaben",

SEND: "Senden",
MAP_ROLE: "Mitglieder haben folgende Rolle:",
READ_ACCESS: "Leser",
AUTHOR_ACCESS: "Autor (erstellen und bearbeiten ihre eigenen Ereignisse)",
SAVE: "Speichern",
PREF_FORM_TITLE: "Kalendereinstellungen bearbeiten",
TAB_UPCOMING: "Ereignisse",
TAB_CALENDAR: "Kalenderansicht",
SUMMARY: "Zusammenfassung der Bestellung",
DETAILS: "Details",
EVENT_TIME: "Ereigniszeit",
UPDATED: "Aktualisiert",
SORT_ASC: "Aufsteigend sortieren",
SORT_DESC: "Absteigend sortieren",
TODAY: "Heute",
TOMORROW: "Morgen",
YESTERDAY: "Gestern",
EVENT_NAME: "Ereignisname",
SHOW_DETAILS: "Details anzeigen",
SHOW_PASTEVENTS: "Vergangene Ereignisse anzeigen",
SHOW_UPCOMINGEVENTS: "Anstehende Ereignisse anzeigen",
HIDE_DETAILS: "Details ausblenden",
SELECT_CHECKBOX: "Zum Auswählen klicken",
UNSELECT_CHECKBOX: "Zum Abwählen klicken",
NO_DESCRIPTION: "Keine Beschreibung angegeben",
DISPLAY: "Anzeigen",
REPEATS_FLAG: "(Wiederholung)",
STR_VIEW: "Ansicht:",
DISP_CALENDAR: "Kalendergitter",
DISP_LIST: "Übersichtsliste",

GOTO_EDIT_INFO: "Folgen Sie Community-Aktionen -> Community bearbeiten -> Kalender, um die Vorgaben zu bearbeiten.",
VIEW_ALL_EVENTS: "Alle Ereignisse sehen",
NO_EVENT_TODAY: "Kein Ereignis heute",
ONE_EVENT_TODAY: "1 Ereignis heute",
X_EVENTS_TODAY: "${0} Ereignisse heute",

OK: "OK",
UPCOMING_EVENTS: "Anstehende Ereignisse",
PICK_MEMBERS: "Community-Mitglieder auswählen",
NOTIFICATION_MESSAGE: "Nachricht",
NOTIFY_OTHERS: "Community-Mitglieder benachrichtigen",
NOTIFY_DEFAULT_MESSAGE: "Hallo -  Ich dachte, Sie interessieren sich möglicherweise für dieses Ereignis.",
NOTIFY_ERROR: "Beim Benachrichtigen von Personen ist ein Fehler aufgetreten: ${0}",
NOTIFY_SUCCESS: "Benachrichtigung erfolgreich gesendet.",
NOTIFY_ERROR_2: "Ihr Ereignis wurde gespeichert, aber es liegt ein Fehler beim Benachrichtigen anderer vor: ${0}",
INTERNAL_SERVER_ERR: "Interner Serverfehler",
INTERNAL_SERVER_NOT_AVAILABLE: "Beim Anzeigen von Inhalt ist ein Fehler aufgetreten. Benachrichtigen Sie Ihren Systemadministrator.",

ALT_WARNING_ICON: "Warnsymbol",
ALT_CONFIRM_ICON: "Bestätigungssymbol",
ALT_ERROR_ICON: "Fehlersymbol",
A11Y_WARNING_LABEL: "Warnung:",
A11Y_CONFIRM_LABEL: "Bestätigung:",
A11Y_ERROR_LABEL: "Fehler:",

TAB_ABOUT: "Infos",
TAB_COMMENT: "Kommentare (${0})",
ADD_COMMENT: "Kommentar hinzufügen...",
ENTER_COMMENT: "Kommentar eingeben:",
ENTER_COMMENT_ERROR: "Geben Sie Ihren Kommentar ein und klicken Sie auf 'Speichern'. Wenn Sie keinen Kommentar mehr eingeben möchten, klicken Sie auf 'Abbrechen'.",
COMMENT_META: "${0} hat ${1} kommentiert",
CONFIRM_DELETE_COMMENT: "Möchten Sie diesen Kommentar wirklich löschen?",
NO_COMMENT: "Es sind keine Kommentare vorhanden.",

EVENT_DELETE_ERROR: "Das Löschen des Ereignisses ist fehlgeschlagen. Das Ereignis könnte gelöscht worden sein. Bitte aktualisieren Sie die Seite und versuchen Sie es erneut.",


TAB_ATTENDEE: "${0} Personen nehmen teil",
NO_ATTENDEE: "Es gibt keine Teilnehmer.",
NO_INSTANCE: "Es gibt keine anstehenden Ereignisse.",
NO_UPCOMING_FOLLOWED: "Sie folgen keinen anstehenden Ereignissen.",
NO_UPCOMING_ATTENDED: "Sie nehmen an keinen Ereignissen teil, die folgen.",
NO_UPCOMING_FOLLOWATTENDED: "Sie folgen oder nehmen an keinen anstehenden Ereignissen teil.",

FOLLOWED_EVENTS_LABEL: "Ereignisse, denen Sie folgen:",
ATTENDED_EVENTS_LABEL: "Ereignisse, an denen Sie eine Teilnahme planen:",
FOLLOWATTENDED_EVENTS_LABEL: "Ereignisse, denen Sie folgen und an denen Sie eine Teilnahme planen:",

PAGING_INFO: "${0} - ${1} von ${2}",
PAGING_INFO_TITLE: "Elemente ${0} bis ${1} von ${2} anzeigen",
PAGING_PREVIOUS: "Vorherige",
PAGING_PREVIOUS_TITLE: "Vorherige Seite",
PAGING_NEXT: "Weiter",
PAGING_NEXT_TITLE: "Nächste Seite",
PAGING_SHOW: "Anzeigen",
PAGING_LABEL: "Seitenwechsel",

PAGING_COMMENT_LABEL:"Benachrichtigen von Kommentaren (obere Kontrolle)",
PAGING_COMMENT_BOTTOM_LABEL:"Benachrichtigen von Kommentaren (untere Kontrolle)",
PAGING_ATTENDEE_LABEL:"Benachrichtigen von Personen, die teilnehmen (obere Kontrolle)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Benachrichtigen von Personen, die teilnehmen (untere Kontrolle)",

PAGING_ITEMS: "Elemente",
PAGING_PAGE_TITLE: "${0} Elemente pro Seite anzeigen",
PAGING_PAGE_TITLE2: "Seite ${0}",
PAGING_PAGE_TITLE3: "Klicken Sie, um ${0} Elemente pro Seite anzuzeigen",
PAGING_JUMPTO: "Zu Seite ${0} von ${1} wechseln", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Seitennummer",
PAGEING_JUMP_LABEL:"Durch Ändern des Werts werden die Seitenergebnisse aktualisiert",

DETAIL_WHEN: "Wann: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Uhrzeit: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} von ${1}",
ABOUT_ADDED: "Erstellt:",
ABOUT_UPDATED: "Aktualisiert:",

WITH_TAGS: "Mit Tags:",
TAGS_TITLE: "Tags",
TAGS_REMOVE_HINT: "Entfernen Sie den Tag ${0} von den ausgewählten Filter-Tags",

HELP: "Hilfe",
CLOSE_HELP: "Hilfe schließen",

TAGCLOUD_HELP: "Ein Tag ist ein Schlüsselwort, das Sie einem Community-Ereignis zuweisen können, um es zu kategorisieren und es leichter auffindbar zu machen. Geben Sie einen Tag ein oder klicken Sie darauf, um die ihm zugeordneten Community-Ereignisse anzuzeigen. Beliebte Tags werden in der Tagcloud in größerer, dunklerer Schrift angezeigt.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Ladevorgang läuft...",
NOT_AUTHORIZED: "Sie sind zum nicht Durchführen dieser Aktion berechtigt.",
STARTS:"Beginnt:",
ENDS:"Endet:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} um ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Ein Tag ist ein Schlüsselwort, das Sie Inhalten zuordnen, damit diese leichter zu finden sind. Bei Tags muss es sich um einzelne Wörter handeln, wie z. B. 'Gehalt' oder 'Personalabteilung', die durch Kommata oder Leerzeichen voneinander getrennt sind.",
INVALID_CHAR_IN_TAG: "Die von Ihnen eingegebene Tag-Liste enthält das ungültige Zeichen '&'. Bitte entfernen Sie dieses aus der Tag-Liste.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Es gibt keine anstehenden Ereignisse.",
NO_UPCOMING_EVENTS_MSG: "Es gibt keine anstehemden Ereignisse in dieser Community.",
NO_PAST_EVENTS_MSG: "In dieser Community sind keine vergangenen Ereignisse vorhanden.",

OWNER: "Eigentümer",
MEMBER: "Mitglied",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Ereignisaktionen",
EVENT_VIEWS_NAVIGATION: "Ereignisansichten",

EVENTS_VIEW_TOOLBAR_LABEL: "Ereignisaktionen",

ALLDAY_UPDATED_MSG_HINT: "Startzeit und Endzeit des Ereignisses wurden entsprechend aktualisiert.",

EVENT_STARTTIME_LABEL: "Startzeit des Ereignisses",
EVENT_ENDTIME_LABEL: "Endzeit des Ereignisses",

REPEATS_ENABLE_DISABLE_HINT: "Klicken Sie, um die Wiederholungsoptionen zu aktivieren oder zu deaktivieren",
REPEATING_OPTIONS_HINT: "Wiederholungsoptionen",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Geben Sie ein Datum ein. Beispiel: ${0}",
ENTER_TIME_EXAMPLE: "Geben Sie eine Zeit ein. Beispiel: ${0}",

REQUIRED: "Erforderlich",

COLLAPSED_SECTION: "Ausgeblendeter Abschnitt",
EXPANDED_SECTION: "Eingeblendeter Abschnitt",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Bearbeiten Sie allein diese Instanz oder bearbeiten Sie die gesamte Serie. Das Bearbeiten der gesamten Serie überschreibt die Änderungen nicht, die Sie zuvor an einzelnen Instanzen dieses Ereignisses vorgenommen haben.",

REPEATING_FREQUENCY: "Wiederholungshäufigkeit",
REPEATING_UNTIL: "Wiederholen bis",
REPEATING_ON: "Wiederholen am",

CALENDAR_PREF_SAVE_CONFIRM: "Ihre Änderungen für den Kalender wurden gespeichert.",
HIDE_THIS_MESSAGE: "Diese Nachricht ausblenden",

EVENT_OPEN_ERR_NOTFOUND: "Das Öffnen des Community-Ereignisses ist fehlgeschlagen. Mögliche Ursache: Das Ereignis wurde bereits gelöscht.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (Zeit:${1}, Ort:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (Zeit:${1}).",
LINK_OPEN_INFO: "${0} (Zeit:${1}, Ort:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (Zeit:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Klicken Sie auf den Link, welcher in einem neuen Fenster geöffnet wird.",

WARNING_ICON: "Warnsymbol",

MENTION: {
	NOT_MEMBER_WARNING: "Die folgenden Personen, die erwähnt wurden, können die Nachricht nicht anzeigen, da sie keine Community-Mitglieder sind.",
	NOT_SAME_ORGANIZATION_WARNING: "Die folgenden Personen können die Nachricht nicht sehen, da sie sich in einem anderen Unternehmen befinden"
},
SELECT_ALL: "Alle auswählen"
})
