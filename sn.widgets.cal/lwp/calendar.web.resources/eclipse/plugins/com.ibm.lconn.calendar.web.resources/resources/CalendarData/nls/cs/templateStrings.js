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
TITLE: "Události",

CREATE_BUTTON: "Vytvořit událost",
CREATE_BUTTON_TOOLTIP: "Vytvořit novou událost ve zvolený den",
EDIT_BUTTON: "Upravit událost",
EDIT_BUTTON_TOOLTIP: "Upravit vybranou událost",
DELETE_BUTTON: "Odstranit událost",
DELETE_BUTTON_TOOLTIP: "Odstranit vybranou událost",
BACKTOCAL: "Zpět k událostem komunity",
BACKTOCAL2: "Kliknutím se vraťte k událostem komunity",
MORE_ACTIONS: "Další akce",

DAY_VIEW_TOOLTIP: "Zobrazení jednoho dne",
TWODAY_VIEW_TOOLTIP: "Zobrazení dvou dnů",
FIVEDAY_VIEW_TOOLTIP: "Zobrazení pěti dnů",
WEEK_VIEW_TOOLTIP: "Zobrazení týdne",
MONTH_VIEW_TOOLTIP: "Zobrazení měsíce",

DAY_VIEW: "Jeden den",
TWODAY_VIEW: "Dva dny",
FIVEDAY_VIEW: "Pět dní",
WEEK_VIEW: "Týden",
MONTH_VIEW: "Měsíc",

ICAL_FEED: "Přidat do osobního kalendáře",
ICAL_FEED_DIALOG_TITLE: "Přidat do osobního kalendáře",

ICAL_FEED_HINT: "Kopírujte tuto adresu URL a přihlaste se k jejímu odběru ve vaší aplikaci kalendáře jako ke kanálu iCal:",
ICAL_FEED_SUBSCRIBE_HINT: "K odběru událostí aplikace HCL Connections se můžete přihlásit v mnoha aplikacím, například HCL Notes a Microsoft Outlook. Kliknutím na následující adresu URL se přihlásíte k odběru všech událostí pro tuto komunitu. Podle konkrétní aplikace kalendáře může být potřeba kopírovat adresu URL do dané aplikace.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "K odběru událostí aplikace HCL Connections se můžete přihlásit v mnoha aplikacím, například HCL Notes a Microsoft Outlook. Kliknutím na následující adresu URL se přihlásíte k odběru všech událostí, které sledujete nebo se jich účastníte. Podle konkrétní aplikace kalendáře může být potřeba kopírovat adresu URL do dané aplikace.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "K odběru událostí aplikace HCL Connections se můžete přihlásit v mnoha aplikacím, například HCL Notes a Microsoft Outlook. Kliknutím na následující adresu URL se přihlásíte k odběru všech událostí, které sledujete. Podle konkrétní aplikace kalendáře může být potřeba kopírovat adresu URL do dané aplikace.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "K odběru událostí aplikace HCL Connections se můžete přihlásit v mnoha aplikacím, například HCL Notes a Microsoft Outlook. Kliknutím na následující adresu URL se přihlásíte k odběru všech událostí, kterých se účastníte. Podle konkrétní aplikace kalendáře může být potřeba kopírovat adresu URL do dané aplikace.",
ICAL_FEED_HINT_POPUP: "Klikněte pravým tlačítkem a kopírujte tuto adresu URL, přihlaste se k jejímu odběru jako kanálu iCal",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Události komunity se budou ve vašich osobních kalendářích aplikací Notes nebo Outlook zobrazovat po kliknutí na kanál níže:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Jak na to:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Přidání události komunity do kalendáře aplikace Notes",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Přidání událostí komunity do aplikace Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Přidání událostí komunity do Kalendáře Google",

ICAL_FEED_EXPORT_ICS:	"Export do kalendáře (.ics)",

DELETE_CONFIRM_SINGLE: "Opravdu chcete tuto událost odstranit?",
DELETE_CONFIRM_SERIES: "Odstranit jednu instanci nebo odstranit celou sérii?",
DELETE_INSTACE_OPTION: "Odstranit pouze tuto instanci",
DELETE_SERIES_OPTION: "Odstranit celou sérii",
DELETE_DIALOG_BUTTON: "Odstranit",

FOLLOW_CONFIRM_SERIES: "Sledovat jednu instanci nebo sledovat celou sérii?",
FOLLOW_INSTACE_OPTION: "Sledovat pouze tuto instanci",
FOLLOW_SERIES_OPTION: "Sledovat celou sérii",
FOLLOW_DIALOG_BUTTON: "Sledovat",
FOLLOW_CONFIRM: "Sledujete tuto událost. Přihlaste se k jejímu odběru ve své aplikaci kalendáře prostřednictvím <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">kanálu iCal</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Sledujete tuto sérii událostí. Přihlaste se k jejímu odběru ve své aplikaci kalendáře prostřednictvím <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">kanálu iCal</a>.",
UNFOLLOW_CONFIRM: "Přestali jste sledovat tuto událost.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Přestali jste sledovat následující sérii událostí.",

RSVP_CONFIRM_SERIES: "Zúčastnit se jedné instance nebo se zúčastnit celé série?",
RSVP_INSTACE_OPTION: "Zúčastnit se pouze této instance",
RSVP_SERIES_OPTION: "Zúčastnit se celé série",
RSVP_DIALOG_BUTTON: "Účastnit se",
RSVP_CONFIRM: "Účastníte se této události. Přihlaste se k jejímu odběru ve své aplikaci kalendáře prostřednictvím <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">kanálu iCal</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Účastníte se této série událostí. Přihlaste se k jejímu odběru ve své aplikaci kalendáře prostřednictvím <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">kanálu iCal</a>.",
UNRSVP_CONFIRM: "Přestali jste se této události účastnit.",
UNRSVP_ENTIRESERIES_CONFIRM: "Přestali jste se této série události účastnit.",


SU: "Ne",
MO: "Po",
TU: "Út",
WE: "St",
TH: "Čt",
FR: "Pá",
SA: "So",
SU_FULL: "Neděle",
MO_FULL: "Pondělí",
TU_FULL: "Úterý",
WE_FULL: "Středa",
TH_FULL: "Čtvrtek",
FR_FULL: "Pátek",
SA_FULL: "Sobota",

DAYS: "dny",
WEEKS: "Týdny",
MONTHS: "měsíce/měsíců",
YEARS: "roky/let",
DAY: "den",
WEEK: "Týden",
MONTH: "měsíc",
YEAR: "rok",

ON_THE_MONTHLY_DAY: "||. v měsíci.",
ON_THE_MONTHLY_WEEKDAY: "||. v měsíci.",

REMOVE: "Odebrat",

ERROR: "Chyba",
ERROR_HEADER: "Zkontrolujte následující položky",

WARNING: "Varování",
WARNING_HEADER: "Varování",

CREATED_BY: "Vytvořeno uživatelem ${0}",
CREATED_ON: "Vytvořeno ${0}",
UPDATED_ON: "Aktualizováno ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Vytvořeno ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Aktualizováno ${0}",
WHEN: "Kdy:",
REPEATS: "Opakování:",
DATE: "Datum",
ON: "Na:",
ALL_DAY_EVENT:"Celodenní událost",
ALL_DAY:"Celý den",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, celý den",
RECURRENCE: "Opakování",
SUBJECT: "Předmět:",
EVENT_TITLE: "Název události:",
TAGS: "Značky:",
DESCRIPTION: "Popis:",
LOCATION: "Umístění:",
IMAGE_URL: "Adresa URL obrázku:",
SUBMIT: "Odeslat",
SAVE: "Uložit",
CANCEL: "Storno",
SAVECLOSE: "Uložit a zavřít",
DELETE: "Odstranit instanci",
FROM: "od",
TO: "do",
CLOSE: "Zavřít",
OPEN: "Otevřít",
CLOSE_SECTION: "Zavřít sekci",
OPEN_SECTION: "Otevřít sekci",
NO: "Ne",
CONFIRM: "Potvrdit",
CLEAR_EXCEPTIONS_CONFIRM: "Znovu plánujete více instancí opakující se schůzky. Všechny tyto instance budou přesunuty o stejnou relativní dobu – včetně těch, které byli přeplánovány již dříve. Zkontrolujte si dopady těchto změn.\n\nOpravdu chcete pokračovat?",

DAILY: "Denně",
WEEKLY: "Týdně",
BIWEEKLY: "Každý druhý týden",
EVERY_X_WEEK: "Každé ${0} týdny",
MONTHLY: "Měsíčně",
MONTHLY_BY_DAY: "Měsíčně podle dne",
MONTHLY_BY_WEEKDAY: "Měsíčně podle dne v týdnu",
YEARLY: "Ročně",
CUSTOM: "Vlastní",
NONE: "Žádná položka",
REPEAT_NONE: "Tento záznam se neopakuje",
REPEAT_DAILY: "Tento záznam se opakuje každý den",
REPEAT_WEEKLY: "Tento záznam se opakuje každý týden",
REPEAT_DAILY_SHORT: "Denně",
REPEAT_WEEKLY_SHORT: "Týdně",
REPEAT_MONTHLY_SHORT: "Měsíčně",

REPEATS: "Opakování",
REPEATS_LABEL: "Opakování:",

REPEAT_FREQUENCY_ONEWEEK: "Týden",
REPEAT_FREQUENCY_TWOWEEKS: "2 týdny",
REPEAT_FREQUENCY_THREEWEEKS: "3 týdny",
REPEAT_FREQUENCY_FOURWEEKS: "4 týdny",
REPEAT_FREQUENCY_FIVEWEEKS: "5 týdnů",

REPEAT_MONTHLY_ON_THIS_DATE: "V toto datum:",
REPEAT_MONTHLY_ON_THIS_DAY: "V tento den:",

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
LAST_WEEK_OF_MONTH:"poslední",

First_WEEK_OF_MONTH_FEMALE:"1.", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"2.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"3.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"4.",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"poslední",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"1.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"2.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"3.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"4.",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"poslední",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Vyberte den v týdnu",
SELECT_WEEK_OF_MONTH:"Vyberte týden v měsíci",
SELECT_DATE_OF_MONTH:"Vyberte datum v měsíci",
Fieldset_Event:"Pole pro vytvoření nebo úpravu události",

MESSAGE_BY_DATE_SKIPPED : "Měsíce, které neobsahují toto datum, budou přeskočeny",

EVERY: "Každý:",
UNTIL: "Do:",
ON: "Na:",

ADD_ANOTHER: "Přidat další",
REPEAT_ON: "Opakovat",

ADD_EVENT: "Vytvořit událost",
EDIT_EVENT: "Upravit událost",

NOTIFY: "Odeslat oznámení dalším lidem",
NOTIFY_TITLE: "Odeslat oznámení dalším lidem",
NOTIFY_OK: "Oznámit",
DELETE: "Odstranit",
EDIT: "Upravit",
EDIT_LABEL: "Upravit:",
EDIT_THIS_INSTANCE: "Upravit tuto instanci",
EDIT_THIS_SERIES: "Upravit celou sérii",
FOLLOW: "Sledovat",
FOLLOW_THIS_INSTANCE: "Sledovat tuto instanci",
FOLLOW_THIS_SERIES: "Sledovat celou sérii",
UNFOLLOW: "Ukončit sledování",

RSVP: "Zúčastním se",
RSVP_THIS_INSTANCE: "Zúčastnit se této instance",
RSVP_THIS_SERIES: "Účastnit se celé série",
UNRSVP: "Nezúčastním se",

START_TIME_AFTER_END: "Čas zahájení události musí předcházet času ukončení",
START_DAY_AFTER_UNTIL_DAY: "Datum zahájení opakované události nesmí být až po datu, do kdy má opakování probíhat",
DURATION_LARGER_THAN_24H: "Doba trvání události nemůže být delší než 24 hodin. Místo toho vytvořte opakující se událost.",
DESCRIPTION_LENGTH: 'Popis je příliš dlouhý',
SUBJECT_LENGTH: 'Název události je příliš dlouhý',
LOCATION_LENGTH: 'Umístění je příliš dlouhé',
IMAGE_URL_INVALID: 'Adresa URL obrázku je neplatná',
UNTIL_DATE: 'Určete platné datum ukončení události',
NO_REPEAT_ON: 'Pro opakující se události se musí vybrat alespoň jeden den',
START_DATE_IN_PAST: 'Zahájení události v minulosti',

SUBJECT_INVALID: 'Název události musí být platný',
START_DATE_INVALID: 'Datum zahájení musí být platné',
START_TIME_INVALID: 'Čas zahájení musí být platný',
END_DATE_INVALID: 'Datum ukončení musí být platné',
END_TIME_INVALID: 'Čas ukončení musí být platný',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Nebyli vybráni žádní členové. Vyberte alespoň jednoho člena pro upozornění.',

NEXT_MONTH: "Zobrazit další měsíc",
PREVIOUS_MONTH: "Zobrazit předchozí měsíc",
CALENDAR_SUMMARY: "Měsíční kalendář s položkami úkolů",

SEND: "Odeslat",
MAP_ROLE: "Členové mají roli:",
READ_ACCESS: "Čtenář",
AUTHOR_ACCESS: "Autor (vytvořit a upravit jejich vlastní události)",
SAVE: "Uložit",
PREF_FORM_TITLE: "Upravit nastavení kalendáře",
TAB_UPCOMING: "Události",
TAB_CALENDAR: "Zobrazení kalendáře",
SUMMARY: "Souhrn",
DETAILS: "Podrobnosti",
EVENT_TIME: "Čas události",
UPDATED: "Aktualizováno",
SORT_ASC: "Seřadit vzestupně",
SORT_DESC: "Seřadit sestupně",
TODAY: "Dnes",
TOMORROW: "Zítra",
YESTERDAY: "Včera",
EVENT_NAME: "Název události",
SHOW_DETAILS: "zobrazit podrobnosti",
SHOW_PASTEVENTS: "Zobrazit události v minulosti",
SHOW_UPCOMINGEVENTS: "Zobrazit nadcházející události",
HIDE_DETAILS: "skrýt podrobnosti",
SELECT_CHECKBOX: "kliknutím vyberete",
UNSELECT_CHECKBOX: "kliknutím zrušíte výběr",
NO_DESCRIPTION: "Není zadán popis",
DISPLAY: "Zobrazit",
REPEATS_FLAG: "(opakování)",
STR_VIEW: "Zobrazit:",
DISP_CALENDAR: "Mřížka kalendáře",
DISP_LIST: "Seznam souhrnu",

GOTO_EDIT_INFO: "Předvolby můžete upravit v části Akce komunity -> Upravit komunitu -> Kalendář.",
VIEW_ALL_EVENTS: "Zobrazit všechny události",
NO_EVENT_TODAY: "Dnes žádná událost",
ONE_EVENT_TODAY: "Dnes 1 událost",
X_EVENTS_TODAY: "Dnes několik ${0} událostí",

OK: "OK",
UPCOMING_EVENTS: "Nadcházející události",
PICK_MEMBERS: "Vybrat členy komunity",
NOTIFICATION_MESSAGE: "Zpráva",
NOTIFY_OTHERS: "Informovat členy komunity",
NOTIFY_DEFAULT_MESSAGE: "Dobrý den! Myslím, že by vás mohla zajímat tato událost.",
NOTIFY_ERROR: "Došlo k chybě při informování osob: ${0}",
NOTIFY_SUCCESS: "Oznámení úspěšně odesláno.",
NOTIFY_ERROR_2: "Událost je uložena, ale došlo k chybě při informování ostatních: ${0}",
INTERNAL_SERVER_ERR: "interní chyba serveru",
INTERNAL_SERVER_NOT_AVAILABLE: "Došlo k chybě při zobrazování obsahu. Obraťte se na svého administrátora systému.",

ALT_WARNING_ICON: "Výstražná ikona",
ALT_CONFIRM_ICON: "Potvrzovací ikona",
ALT_ERROR_ICON: "Ikona chyby",
A11Y_WARNING_LABEL: "Varování:",
A11Y_CONFIRM_LABEL: "Potvrzení:",
A11Y_ERROR_LABEL: "Chyba:",

TAB_ABOUT: "Informace",
TAB_COMMENT: "Komentáře (${0})",
ADD_COMMENT: "Přidat komentář...",
ENTER_COMMENT: "Zadejte komentář:",
ENTER_COMMENT_ERROR: "Zadejte komentář a klepněte na volbu Uložit. Pokud již nechcete přidat komentář, klepněte na volbu Storno.",
COMMENT_META: "${0} okomentoval ${1}",
CONFIRM_DELETE_COMMENT: "Opravdu chcete tento komentář odstranit?",
NO_COMMENT: "Nejsou k dispozici žádné komentáře.",

EVENT_DELETE_ERROR: "Událost se nepodařilo odstranit. Událost již možná byla odstraněna. Aktualizujte stránku a zkuste to znovu.",


TAB_ATTENDEE: "Účastnících se osob: ${0}",
NO_ATTENDEE: "Žádní účastníci.",
NO_INSTANCE: "Žádné nadcházející události.",
NO_UPCOMING_FOLLOWED: "Nesledujete žádné nadcházející události.",
NO_UPCOMING_ATTENDED: "Neúčastníte se žádných nadcházejících událostí.",
NO_UPCOMING_FOLLOWATTENDED: "Nesledujete ani se neúčastníte žádných nadcházejících událostí.",

FOLLOWED_EVENTS_LABEL: "Události, které sledujete:",
ATTENDED_EVENTS_LABEL: "Události, kterých se plánujete účastnit:",
FOLLOWATTENDED_EVENTS_LABEL: "Události, které sledujete a kterých se plánujete zúčastnit:",

PAGING_INFO: "${0} až ${1} z ${2}",
PAGING_INFO_TITLE: "Zobrazení položek ${0} až ${1} z ${2}",
PAGING_PREVIOUS: "Předchozí",
PAGING_PREVIOUS_TITLE: "Předchozí stránka",
PAGING_NEXT: "Další",
PAGING_NEXT_TITLE: "Další stránka",
PAGING_SHOW: "Zobrazit",
PAGING_LABEL: "Stránkování",

PAGING_COMMENT_LABEL:"Stránkování komentářů (ovládání nahoře)",
PAGING_COMMENT_BOTTOM_LABEL:"Stránkování komentářů (ovládání dole)",
PAGING_ATTENDEE_LABEL:"Stránkování účastnících se osob (ovládání nahoře)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Stránkování účastnících se osob (ovládání dole)",

PAGING_ITEMS: "položky",
PAGING_PAGE_TITLE: "Zobrazit ${0} položek na stránce",
PAGING_PAGE_TITLE2: "Stránka ${0}",
PAGING_PAGE_TITLE3: "Kliknutím zobrazíte ${0} položek na stránce",
PAGING_JUMPTO: "Přejít na stránku ${0} z ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Číslo stránky",
PAGEING_JUMP_LABEL:"Při změně hodnoty budou výsledky na stránce aktualizovány.",

DETAIL_WHEN: "Kdy: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Čas: ${0} – ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} uživatelem ${1}",
ABOUT_ADDED: "Vytvořeno:",
ABOUT_UPDATED: "Aktualizováno:",

WITH_TAGS: "Se značkami:",
TAGS_TITLE: "Značky",
TAGS_REMOVE_HINT: "Odeberte značku ${0} z vybraných značek filtru",

HELP: "Nápověda",
CLOSE_HELP: "Zavřít nápovědu",

TAGCLOUD_HELP: "Značka je klíčové slovo přiřazené k události komunity, pomocí kterého ji lze snadno kategorizovat a usnadnit její hledání. Zadáním značky nebo kliknutím na ni můžete zobrazit události komunity, které jsou k ní přidruženy. Oblíbené značky jsou ve shluku značek zobrazeny větším, tmavším písmem.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Načítání...",
NOT_AUTHORIZED: "Pro provedení této akce nemáte oprávnění.",
STARTS:"Začíná:",
ENDS:"Končí:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} v ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Značka je klíčové slovo, které přiřadíte obsahu, abyste usnadnili jeho hledání. Značky musí být jednoslovné, jako například výplaty nebo lidské_zdroje, a oddělené čárkami nebo mezerami.",
INVALID_CHAR_IN_TAG: "Seznam značek, který jste vytvořili, obsahuje neplatný znak '&'. Odeberte tento znak ze seznamu značek.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Žádné nadcházející události.",
NO_UPCOMING_EVENTS_MSG: "V této komunitě nejsou žádné nadcházející události.",
NO_PAST_EVENTS_MSG: "V minulosti této komunity nejsou žádné události.",

OWNER: "Vlastník",
MEMBER: "Člen",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Akce událostí",
EVENT_VIEWS_NAVIGATION: "Zobrazení událostí",

EVENTS_VIEW_TOOLBAR_LABEL: "Akce událostí",

ALLDAY_UPDATED_MSG_HINT: "Čas zahájení události a čas ukončení události byly náležitě aktualizovány.",

EVENT_STARTTIME_LABEL: "Čas zahájení události",
EVENT_ENDTIME_LABEL: "Čas ukončení události",

REPEATS_ENABLE_DISABLE_HINT: "Kliknutím povolíte nebo zakážete možnosti opakování",
REPEATING_OPTIONS_HINT: "Volby opakování",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Zadejte datum. Příklad: ${0}",
ENTER_TIME_EXAMPLE: "Zadejte čas. Příklad: ${0}",

REQUIRED: "Povinné",

COLLAPSED_SECTION: "Sbalená sekce",
EXPANDED_SECTION: "Rozbalená sekce",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Upravte jen tuto instanci, nebo upravte celou sérii. Úprava celé série nepřepíše změny, které jste provedli v minulosti na jednotlivých instancích této události.",

REPEATING_FREQUENCY: "Frekvence opakování",
REPEATING_UNTIL: "Opakovat do",
REPEATING_ON: "Opakovat",

CALENDAR_PREF_SAVE_CONFIRM: "Změny provedené v aplikaci kalendář byly uloženy.",
HIDE_THIS_MESSAGE: "Skrýt tuto zprávu",

EVENT_OPEN_ERR_NOTFOUND: "Událost komunity se nepodařilo otevřít. Možná příčina: událost již možná byla odstraněna.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (čas:${1}, umístění:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (čas:${1}).",
LINK_OPEN_INFO: "${0} (čas:${1}, umístění:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (čas:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Kliknutím na odkaz ho otevřete v novém okně.",

WARNING_ICON: "Výstražná ikona",

MENTION: {
	NOT_MEMBER_WARNING: "Následující zmínění lidé nebudou moci zprávu zobrazit, protože nejsou členy komunity.",
	NOT_SAME_ORGANIZATION_WARNING: "Následující zmínění lidé nebudou moci zprávu zobrazit, protože jsou v jiné organizaci."
},
SELECT_ALL: "Vybrat vše"
})
