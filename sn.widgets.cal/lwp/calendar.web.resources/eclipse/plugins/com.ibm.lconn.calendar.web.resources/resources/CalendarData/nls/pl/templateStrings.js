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
TITLE: "Zdarzenia",

CREATE_BUTTON: "Utwórz zdarzenie",
CREATE_BUTTON_TOOLTIP: "Utwórz nowe zdarzenie w wybranym dniu",
EDIT_BUTTON: "Edytuj zdarzenie",
EDIT_BUTTON_TOOLTIP: "Edytuj wybrane zdarzenie",
DELETE_BUTTON: "Usuń zdarzenie",
DELETE_BUTTON_TOOLTIP: "Usuń wybrane zdarzenie",
BACKTOCAL: "Wróć do zdarzeń społeczności",
BACKTOCAL2: "Kliknij, aby wrócić do zdarzeń społeczności",
MORE_ACTIONS: "Więcej działań",

DAY_VIEW_TOOLTIP: "Widok jednodniowy",
TWODAY_VIEW_TOOLTIP: "Widok dwudniowy",
FIVEDAY_VIEW_TOOLTIP: "Widok pięciodniowy",
WEEK_VIEW_TOOLTIP: "Widok tygodniowy",
MONTH_VIEW_TOOLTIP: "Widok miesięczny",

DAY_VIEW: "Jeden dzień",
TWODAY_VIEW: "Dwa dni",
FIVEDAY_VIEW: "Pięć dni",
WEEK_VIEW: "Tydzień",
MONTH_VIEW: "Miesiąc",

ICAL_FEED: "Dodaj do kalendarza osobistego",
ICAL_FEED_DIALOG_TITLE: "Dodaj do kalendarza osobistego",

ICAL_FEED_HINT: "Skopiuj ten adres URL i zasubskrybuj go w swojej aplikacji kalendarza jako kanał iCal:",
ICAL_FEED_SUBSCRIBE_HINT: "Zdarzenia programu HCL Connections można subskrybować w wielu aplikacjach, takich jak HCL Notes i Microsoft Outlook. Kliknij następujący adres URL, aby subskrybować wszystkie zdarzenia tej społeczności. W zależności od używanej aplikacji kalendarza, konieczne może być skopiowanie tego adresu URL do aplikacji.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "Zdarzenia programu HCL Connections można subskrybować w wielu aplikacjach, takich jak HCL Notes i Microsoft Outlook. Kliknij poniższy adres URL, aby subskrybować wszystkie zdarzenia, które śledzisz lub w których uczestniczysz. W zależności od używanej aplikacji kalendarza, konieczne może być skopiowanie tego adresu URL do aplikacji.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "Zdarzenia programu HCL Connections można subskrybować w wielu aplikacjach, takich jak HCL Notes i Microsoft Outlook. Kliknij następujący adres URL, aby subskrybować wszystkie zdarzenia, które śledzisz. W zależności od używanej aplikacji kalendarza, konieczne może być skopiowanie tego adresu URL do aplikacji.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "Zdarzenia programu HCL Connections można subskrybować w wielu aplikacjach, takich jak HCL Notes i Microsoft Outlook. Kliknij następujący adres URL, aby subskrybować wszystkie zdarzenia, w których uczestniczysz. W zależności od używanej aplikacji kalendarza, konieczne może być skopiowanie tego adresu URL do aplikacji.",
ICAL_FEED_HINT_POPUP: "Kliknij prawym przyciskiem myszy i skopiuj ten adres URL. Zasubskrybuj go w swojej aplikacji kalendarza jako kanał iCal.",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Wyświetlaj zdarzenia swojej społeczności w kalendarzu osobistym aplikacji Notes lub Outlook, klikając poniższy kanał:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Instrukcje:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Dodawanie zdarzeń społeczności do kalendarza aplikacji Notes",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Dodawanie zdarzeń społeczności do aplikacji Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Dodawanie zdarzeń społeczności do kalendarza Google",

ICAL_FEED_EXPORT_ICS:	"Eksportuj do kalendarza (.ics)",

DELETE_CONFIRM_SINGLE: "Czy na pewno usunąć to zdarzenie?",
DELETE_CONFIRM_SERIES: "Usunąć pojedyncze wystąpienie czy całą serię?",
DELETE_INSTACE_OPTION: "Usuń tylko to wystąpienie",
DELETE_SERIES_OPTION: "Usuń całą serię",
DELETE_DIALOG_BUTTON: "Usuń",

FOLLOW_CONFIRM_SERIES: "Śledzić pojedyncze wystąpienie czy całą serię?",
FOLLOW_INSTACE_OPTION: "Śledź tylko to wystąpienie",
FOLLOW_SERIES_OPTION: "Śledź całą serię",
FOLLOW_DIALOG_BUTTON: "Śledź",
FOLLOW_CONFIRM: "To zdarzenie było przez Ciebie śledzone. Zasubskrybuj je w swojej aplikacji kalendarza za pomocą <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">kanału iCal</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Ta seria zdarzeń była przez Ciebie śledzona. Zasubskrybuj je w swojej aplikacji kalendarza za pomocą <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">kanału iCal</a>.",
UNFOLLOW_CONFIRM: "Anulowano śledzenie tego zdarzenia.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Anulowano śledzenie tej serii zdarzeń.",

RSVP_CONFIRM_SERIES: "Chcesz wziąć udział w pojedynczym wystąpieniu czy w całej serii?",
RSVP_INSTACE_OPTION: "Weź udział tylko w tym wystąpieniu",
RSVP_SERIES_OPTION: "Weź udział w całej serii",
RSVP_DIALOG_BUTTON: "Weź udział",
RSVP_CONFIRM: "Uczestniczysz w tym zdarzeniu. Zasubskrybuj je w swojej aplikacji kalendarza za pomocą <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">kanału iCal</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Uczestniczysz w tej serii zdarzeń. Zasubskrybuj je w swojej aplikacji kalendarza za pomocą <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">kanału iCal</a>.",
UNRSVP_CONFIRM: "Anulowano uczestnictwo w tym wydarzeniu.",
UNRSVP_ENTIRESERIES_CONFIRM: "Anulowano uczestnictwo w tej serii zdarzeń.",


SU: "nie",
MO: "pon",
TU: "wto",
WE: "śro",
TH: "czw",
FR: "pią",
SA: "sob",
SU_FULL: "niedziela",
MO_FULL: "Poniedziałek",
TU_FULL: "wtorek",
WE_FULL: "Środa",
TH_FULL: "Czwartek",
FR_FULL: "Piątek",
SA_FULL: "sobota",

DAYS: "dni",
WEEKS: "tygodni",
MONTHS: "miesięcy",
YEARS: "lat",
DAY: "dzień",
WEEK: "Tydzień",
MONTH: "miesiąc",
YEAR: "rok",

ON_THE_MONTHLY_DAY: "|| dnia miesiąca.",
ON_THE_MONTHLY_WEEKDAY: "|| dnia miesiąca.",

REMOVE: "Usuń",

ERROR: "Błąd",
ERROR_HEADER: "Sprawdź następujące elementy",

WARNING: "Ostrzeżenie",
WARNING_HEADER: "Ostrzeżenie",

CREATED_BY: "Utworzony przez użytkownika ${0}",
CREATED_ON: "Utworzony: ${0}",
UPDATED_ON: "Zaktualizowany: ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Utworzony: ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Zaktualizowany: ${0}",
WHEN: "Kiedy:",
REPEATS: "Powtarzanie:",
DATE: "Data",
ON: "Dnia:",
ALL_DAY_EVENT:"Zdarzenie całodzienne",
ALL_DAY:"Cały dzień",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, cały dzień",
RECURRENCE: "Powtarzanie",
SUBJECT: "Temat:",
EVENT_TITLE: "Tytuł zdarzenia:",
TAGS: "Znaczniki:",
DESCRIPTION: "Opis:",
LOCATION: "Miejsce:",
IMAGE_URL: "Adres URL obrazu:",
SUBMIT: "Wyślij",
SAVE: "Zapisz",
CANCEL: "Anuluj",
SAVECLOSE: "Zapisz i zamknij",
DELETE: "Usuń wystąpienie",
FROM: "od",
TO: "do",
CLOSE: "Zamknij",
OPEN: "Otwórz",
CLOSE_SECTION: "Zamknij sekcję",
OPEN_SECTION: "Otwórz sekcję",
NO: "Nie",
CONFIRM: "Potwierdź",
CLEAR_EXCEPTIONS_CONFIRM: "Zmieniasz harmonogram wielu wystąpień spotkania cyklicznego. Wszystkie wystąpienia zostaną przesunięte o tyle samo czasu, łącznie z tymi, dla których już wcześniej zmieniono harmonogram. Zapoznaj się ze skutkami tych zmian.\n\nCzy na pewno chcesz kontynuować?",

DAILY: "Codziennie",
WEEKLY: "Co tydzień",
BIWEEKLY: "Co dwa tygodnie",
EVERY_X_WEEK: "Co ${0} tygodni(-e)",
MONTHLY: "Co miesiąc",
MONTHLY_BY_DAY: "Co miesiąc wg dnia",
MONTHLY_BY_WEEKDAY: "Co miesiąc wg dnia roboczego",
YEARLY: "Co roku",
CUSTOM: "Niestandardowy",
NONE: "Brak",
REPEAT_NONE: "Ten wpis nie powtarza się",
REPEAT_DAILY: "Ten wpis powtarza się codziennie",
REPEAT_WEEKLY: "Ten wpis powtarza się co tydzień",
REPEAT_DAILY_SHORT: "Codziennie",
REPEAT_WEEKLY_SHORT: "Co tydzień",
REPEAT_MONTHLY_SHORT: "Co miesiąc",

REPEATS: "Powtarzanie",
REPEATS_LABEL: "Powtarzanie:",

REPEAT_FREQUENCY_ONEWEEK: "Tydzień",
REPEAT_FREQUENCY_TWOWEEKS: "2 tygodnie",
REPEAT_FREQUENCY_THREEWEEKS: "3 tygodnie",
REPEAT_FREQUENCY_FOURWEEKS: "4 tygodnie",
REPEAT_FREQUENCY_FIVEWEEKS: "5 tygodni",

REPEAT_MONTHLY_ON_THIS_DATE: "W tym dniu:",
REPEAT_MONTHLY_ON_THIS_DAY: "W tym dniu:",

DATE_OF_MONTH_1: "pierwszy",
DATE_OF_MONTH_2: "drugi",
DATE_OF_MONTH_3: "trzeci",
DATE_OF_MONTH_4: "czwarty",
DATE_OF_MONTH_5: "piąty",
DATE_OF_MONTH_6: "szósty",
DATE_OF_MONTH_7: "siódmy",
DATE_OF_MONTH_8: "ósmy",
DATE_OF_MONTH_9: "dziewiąty",
DATE_OF_MONTH_10: "dziesiąty",
DATE_OF_MONTH_11: "jedenasty",
DATE_OF_MONTH_12: "dwunasty",
DATE_OF_MONTH_13: "trzynasty",
DATE_OF_MONTH_14: "czternasty",
DATE_OF_MONTH_15: "piętnasty",
DATE_OF_MONTH_16: "szesnasty",
DATE_OF_MONTH_17: "siedemnasty",
DATE_OF_MONTH_18: "osiemnasty",
DATE_OF_MONTH_19: "dziewiętnasty",
DATE_OF_MONTH_20: "dwudziesty",
DATE_OF_MONTH_21: "dwudziesty pierwszy",
DATE_OF_MONTH_22: "dwudziesty drugi",
DATE_OF_MONTH_23: "dwudziesty trzeci",
DATE_OF_MONTH_24: "dwudziesty czwarty",
DATE_OF_MONTH_25: "dwudziesty piąty",
DATE_OF_MONTH_26: "dwudziesty szósty",
DATE_OF_MONTH_27: "dwudziesty siódmy",
DATE_OF_MONTH_28: "dwudziesty ósmy",
DATE_OF_MONTH_29: "dwudziesty dziewiąty",
DATE_OF_MONTH_30: "trzydziesty",
DATE_OF_MONTH_31: "trzydziesty pierwszy",

First_WEEK_OF_MONTH:"pierwszy",
Second_WEEK_OF_MONTH:"drugi",
Third_WEEK_OF_MONTH:"trzeci",
Fourth_WEEK_OF_MONTH:"czwarty",
LAST_WEEK_OF_MONTH:"ostatni",

First_WEEK_OF_MONTH_FEMALE:"pierwszy", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"drugi",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"trzeci",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"czwarty",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"ostatni",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"pierwszy",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"drugi",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"trzeci",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"czwarty",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"ostatni",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Wybierz dzień tygodnia",
SELECT_WEEK_OF_MONTH:"Wybierz tydzień miesiąca",
SELECT_DATE_OF_MONTH:"Wybierz datę miesiąca",
Fieldset_Event:"Pola do utworzenia lub edytowania zdarzenia",

MESSAGE_BY_DATE_SKIPPED : "Miesiące, w których nie występuje ta data, zostaną pominięte",

EVERY: "Co:",
UNTIL: "Do:",
ON: "W dniu:",

ADD_ANOTHER: "Dodaj inne",
REPEAT_ON: "Powtórz w dniu",

ADD_EVENT: "Utwórz zdarzenie",
EDIT_EVENT: "Edytuj zdarzenie",

NOTIFY: "Powiadom inne osoby",
NOTIFY_TITLE: "Powiadom inne osoby",
NOTIFY_OK: "Powiadom",
DELETE: "Usuń",
EDIT: "Edytuj",
EDIT_LABEL: "Edytuj:",
EDIT_THIS_INSTANCE: "Edytuj wystąpienie",
EDIT_THIS_SERIES: "Edytuj całą serię",
FOLLOW: "Śledź",
FOLLOW_THIS_INSTANCE: "Śledź to wystąpienie",
FOLLOW_THIS_SERIES: "Śledź całą serię",
UNFOLLOW: "Anuluj śledzenie",

RSVP: "Weź udział",
RSVP_THIS_INSTANCE: "Weź udział w tym wystąpieniu",
RSVP_THIS_SERIES: "Weź udział w całej serii",
UNRSVP: "Nie bierz udziału",

START_TIME_AFTER_END: "Godzina rozpoczęcia zdarzenia musi przypadać przed godziną jego zakończenia",
START_DAY_AFTER_UNTIL_DAY: "Data rozpoczęcia zdarzenia cyklicznego nie może przypadać później data zakończenia powtarzania",
DURATION_LARGER_THAN_24H: "Czas trwania zdarzenia nie powinien być dłuższy niż 24 godziny. Utwórz zamiast tego zdarzenie cykliczne.",
DESCRIPTION_LENGTH: 'Opis jest zbyt długi',
SUBJECT_LENGTH: 'Tytuł zdarzenia jest zbyt długi',
LOCATION_LENGTH: 'Lokalizacja jest zbyt długa',
IMAGE_URL_INVALID: 'Adres URL obrazu jest niepoprawny',
UNTIL_DATE: 'Podaj poprawną datę zakończenia zdarzenia',
NO_REPEAT_ON: 'Dla zdarzenia cyklicznego należy wybrać co najmniej jeden dzień',
START_DATE_IN_PAST: 'Zdarzenie zaczyna się w przeszłości',

SUBJECT_INVALID: 'Tytuł zdarzenia musi być poprawny',
START_DATE_INVALID: 'Data rozpoczęcia musi być poprawna',
START_TIME_INVALID: 'Godzina rozpoczęcia musi być poprawna',
END_DATE_INVALID: 'Data zakończenia musi być poprawna',
END_TIME_INVALID: 'Godzina zakończenia musi być poprawna',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Nie wybrano członków. Wybierz co najmniej jednego członka, który ma zostać powiadomiony.',

NEXT_MONTH: "Wyświetl następny miesiąc",
PREVIOUS_MONTH: "Wyświetl poprzedni miesiąc",
CALENDAR_SUMMARY: "Kalendarz miesięczny zawierający czynności do wykonania",

SEND: "Wyślij",
MAP_ROLE: "Członkowie w następującej roli:",
READ_ACCESS: "Czytelnik",
AUTHOR_ACCESS: "Autor (tworzenie i edytowanie własnych zdarzeń)",
SAVE: "Zapisz",
PREF_FORM_TITLE: "Edytowanie ustawień kalendarza",
TAB_UPCOMING: "Zdarzenia",
TAB_CALENDAR: "Widok kalendarza",
SUMMARY: "Podsumowanie",
DETAILS: "Szczegóły",
EVENT_TIME: "Godzina zdarzenia",
UPDATED: "Zaktualizowane",
SORT_ASC: "Sortuj rosnąco",
SORT_DESC: "Sortuj malejąco",
TODAY: "Dzisiaj",
TOMORROW: "Jutro",
YESTERDAY: "Wczoraj",
EVENT_NAME: "Nazwa zdarzenia",
SHOW_DETAILS: "pokaż szczegóły",
SHOW_PASTEVENTS: "Pokaż przeszłe zdarzenia",
SHOW_UPCOMINGEVENTS: "Pokaż nadchodzące zdarzenia",
HIDE_DETAILS: "ukryj szczegóły",
SELECT_CHECKBOX: "kliknij, aby zaznaczyć",
UNSELECT_CHECKBOX: "kliknij, aby usunąć zaznaczenie",
NO_DESCRIPTION: "Nie podano opisu",
DISPLAY: "Wyświetl",
REPEATS_FLAG: "(cykliczne)",
STR_VIEW: "Widok:",
DISP_CALENDAR: "Siatka kalendarza",
DISP_LIST: "Lista podsumowania",

GOTO_EDIT_INFO: "Należy wybrać kolejno następujące opcje: Działania dotyczące społeczności -> Edytuj społeczność-> Kalendarz, aby edytować preferencje.",
VIEW_ALL_EVENTS: "Wyświetl wszystkie zdarzenia",
NO_EVENT_TODAY: "Dzisiaj brak zdarzeń",
ONE_EVENT_TODAY: "Dzisiaj jest 1 zdarzenie",
X_EVENTS_TODAY: "Liczba zdarzeń dzisiaj: ${0}",

OK: "OK",
UPCOMING_EVENTS: "Nadchodzące zdarzenia",
PICK_MEMBERS: "Wybierz członków społeczności",
NOTIFICATION_MESSAGE: "Wiadomość",
NOTIFY_OTHERS: "Powiadom członków społeczności",
NOTIFY_DEFAULT_MESSAGE: "Witaj, myślę, że to zdarzenie może być interesujące.",
NOTIFY_ERROR: "Wystąpił błąd podczas powiadamiania osób: ${0}",
NOTIFY_SUCCESS: "Powiadomienie zostało wysłane.",
NOTIFY_ERROR_2: "Zdarzenie zostało zapisane, ale wystąpił błąd podczas powiadamiania innych: ${0}",
INTERNAL_SERVER_ERR: "wewnętrzny błąd serwera",
INTERNAL_SERVER_NOT_AVAILABLE: "Wystąpił błąd podczas wyświetlania treści. Skontaktuj się z administratorem systemu.",

ALT_WARNING_ICON: "Ikona ostrzeżenia",
ALT_CONFIRM_ICON: "Ikona potwierdzenia",
ALT_ERROR_ICON: "Ikona błędu",
A11Y_WARNING_LABEL: "Ostrzeżenie:",
A11Y_CONFIRM_LABEL: "Potwierdzenie:",
A11Y_ERROR_LABEL: "Błąd:",

TAB_ABOUT: "Informacje",
TAB_COMMENT: "Komentarze (${0})",
ADD_COMMENT: "Dodaj komentarz...",
ENTER_COMMENT: "Wprowadź komentarz:",
ENTER_COMMENT_ERROR: "Wprowadź komentarz i kliknij przycisk Zapisz. Aby zrezygnować z wprowadzania komentarza, kliknij przycisk Anuluj.",
COMMENT_META: "Użytkownik ${0} skomentował dnia ${1}",
CONFIRM_DELETE_COMMENT: "Czy na pewno chcesz usunąć ten komentarz?",
NO_COMMENT: "Brak komentarzy.",

EVENT_DELETE_ERROR: "Nie udało się usunąć zdarzenia. Zdarzenie mogło zostać usunięte. Odśwież stronę i spróbuj ponownie.",


TAB_ATTENDEE: "Liczba uczestników: ${0}",
NO_ATTENDEE: "Brak uczestników.",
NO_INSTANCE: "Brak nadchodzących zdarzeń.",
NO_UPCOMING_FOLLOWED: "Nie śledzisz żadnych nadchodzących zdarzeń.",
NO_UPCOMING_ATTENDED: "Nie uczestniczysz w żadnym nadchodzącym zdarzeniu.",
NO_UPCOMING_FOLLOWATTENDED: "Nie śledzisz żadnych nadchodzących zdarzeń ani w nich nie uczestniczysz.",

FOLLOWED_EVENTS_LABEL: "Zdarzenia, które śledzisz:",
ATTENDED_EVENTS_LABEL: "Zdarzenia, w których planujesz uczestniczyć:",
FOLLOWATTENDED_EVENTS_LABEL: "Zdarzenia, które śledzisz i planujesz wziąć w nich udział:",

PAGING_INFO: "${0} — ${1} z ${2}",
PAGING_INFO_TITLE: "Wyświetlanie elementów od ${0} do ${1} z ${2}",
PAGING_PREVIOUS: "Wstecz",
PAGING_PREVIOUS_TITLE: "Poprzednia strona",
PAGING_NEXT: "Dalej",
PAGING_NEXT_TITLE: "Następna strona",
PAGING_SHOW: "Pokaż",
PAGING_LABEL: "Stronicowanie",

PAGING_COMMENT_LABEL:"Stronicowanie komentarzy (element sterujący Góra)",
PAGING_COMMENT_BOTTOM_LABEL:"Stronicowanie komentarzy (element sterujący Dół)",
PAGING_ATTENDEE_LABEL:"Stronicowanie osób uczestniczących (element sterujący Góra)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Stronicowanie osób uczestniczących (element sterujący Dół)",

PAGING_ITEMS: "poz.",
PAGING_PAGE_TITLE: "Liczba pozycji wyświetlanych na stronie: ${0}",
PAGING_PAGE_TITLE2: "Strona ${0}",
PAGING_PAGE_TITLE3: "Kliknij, aby wyświetlić następującą liczbę pozycji na stronie: ${0}",
PAGING_JUMPTO: "Idź do strony ${0} z ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Numer strony",
PAGEING_JUMP_LABEL:"Zmiana wartości spowoduje odświeżenie wyników stron",

DETAIL_WHEN: "Kiedy: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Godzina: ${0} — ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} przez: ${1}",
ABOUT_ADDED: "Utworzono:",
ABOUT_UPDATED: "Zaktualizowano:",

WITH_TAGS: "Ze znacznikami:",
TAGS_TITLE: "Znaczniki",
TAGS_REMOVE_HINT: "Usuń znacznik ${0} z wybranych znaczników filtru",

HELP: "Pomoc",
CLOSE_HELP: "Zamknij pomoc",

TAGCLOUD_HELP: "Znacznik to słowo kluczowe przypisywane przez użytkownika do zdarzenia społeczności w celu jego sklasyfikowania i ułatwienia wyszukiwania. Wpisz lub kliknij znacznik, aby wyświetlić powiązane z nim zdarzenia społeczności. Popularne znaczniki są wyświetlane w chmurze znaczników przy użyciu większej czcionki.",
//start - end
DURATION_SPAN: "${0} — ${1}",
LOADING: "Ładowanie...",
NOT_AUTHORIZED: "Nie masz uprawnienia do wykonywania tego działania.",
STARTS:"Rozpoczyna się:",
ENDS:"Kończy się:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} o ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Znacznik jest słowem kluczowym przypisywanym do treści w celu ułatwienia jej znalezienia. Znacznikami muszą być pojedyncze słowa, takie jak płace lub zasoby_ludzkie, oddzielone przecinkami lub spacjami.",
INVALID_CHAR_IN_TAG: "Wprowadzona lista znaczników zawiera nieprawidłowy znak &. Usuń go z listy znaczników.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Brak nadchodzących zdarzeń.",
NO_UPCOMING_EVENTS_MSG: "Brak nadchodzących zdarzeń dla tej społeczności.",
NO_PAST_EVENTS_MSG: "Brak zdarzeń w przeszłości dla tej społeczności.",

OWNER: "Właściciel",
MEMBER: "Członek",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Działania dotyczące zdarzenia",
EVENT_VIEWS_NAVIGATION: "Widoki zdarzenia",

EVENTS_VIEW_TOOLBAR_LABEL: "Działania dotyczące zdarzenia",

ALLDAY_UPDATED_MSG_HINT: "Godziny rozpoczęcia i zakończenia zdarzenia zostały odpowiednio zaktualizowane.",

EVENT_STARTTIME_LABEL: "Godzina rozpoczęcia zdarzenia",
EVENT_ENDTIME_LABEL: "Godzina zakończenia zdarzenia",

REPEATS_ENABLE_DISABLE_HINT: "Kliknij, aby włączyć lub wyłączyć opcje powtarzania",
REPEATING_OPTIONS_HINT: "Opcje powtarzania",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Wprowadź datę. Przykład: ${0}",
ENTER_TIME_EXAMPLE: "Wprowadź godzinę. Przykład: ${0}",

REQUIRED: "Wymagane",

COLLAPSED_SECTION: "Zwinięta sekcja",
EXPANDED_SECTION: "Rozwinięta sekcja",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Edytuj tylko to wystąpienie lub całą serię. Edytowanie całej serii nie spowoduje nadpisania zmian wprowadzonych wcześniej dla pojedynczych wystąpień tego zdarzenia.",

REPEATING_FREQUENCY: "Częstotliwość powtarzania",
REPEATING_UNTIL: "Powtarzaj do",
REPEATING_ON: "Powtórz w dniu",

CALENDAR_PREF_SAVE_CONFIRM: "Zmiany w kalendarzu zostały zapisane.",
HIDE_THIS_MESSAGE: "Ukryj ten komunikat",

EVENT_OPEN_ERR_NOTFOUND: "Nie można otworzyć zdarzenia społeczności. Możliwa przyczyna: zdarzenie zostało już usunięte.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (godz.:${1}, lokalizacja:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (godz.:${1}).",
LINK_OPEN_INFO: "${0} (godz.:${1}, lokalizacja:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (godz.:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Kliknięcie odsyłacza spowoduje otwarcie w nowym oknie.",

WARNING_ICON: "Ikona ostrzeżenia",

MENTION: {
	NOT_MEMBER_WARNING: "Następujące wymienione osoby nie będą mogły wyświetlić wiadomości, ponieważ nie są członkami społeczności.",
	NOT_SAME_ORGANIZATION_WARNING: "Następujące wymienione osoby nie będą mogły zobaczyć wiadomości, ponieważ są w innej organizacji."
},
SELECT_ALL: "Wybierz wszystko"
})
