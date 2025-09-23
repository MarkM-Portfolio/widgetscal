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
TITLE: "Мероприятия",

CREATE_BUTTON: "Создать мероприятие",
CREATE_BUTTON_TOOLTIP: "Создать новое мероприятие в выбранный день",
EDIT_BUTTON: "Изменить мероприятие",
EDIT_BUTTON_TOOLTIP: "Изменить выбранное мероприятие.",
DELETE_BUTTON: "Удалить мероприятие",
DELETE_BUTTON_TOOLTIP: "Удалить выбранное мероприятие",
BACKTOCAL: "Вернуться к мероприятиям сообщества",
BACKTOCAL2: "Нажмите, чтобы вернуться к мероприятиям сообщества",
MORE_ACTIONS: "Дополнительные действия",

DAY_VIEW_TOOLTIP: "Просмотр за один день",
TWODAY_VIEW_TOOLTIP: "Просмотр за два дня",
FIVEDAY_VIEW_TOOLTIP: "Просмотр за пять дней",
WEEK_VIEW_TOOLTIP: "Просмотр за неделю",
MONTH_VIEW_TOOLTIP: "Просмотр за месяц",

DAY_VIEW: "Один день",
TWODAY_VIEW: "Два дня",
FIVEDAY_VIEW: "Пять дней",
WEEK_VIEW: "Неделя",
MONTH_VIEW: "Месяц",

ICAL_FEED: "Добавить в личный календарь",
ICAL_FEED_DIALOG_TITLE: "Добавить в личный календарь",

ICAL_FEED_HINT: "Скопируйте этот URL-адрес и подпишитесь на него для своего приложения календаря как на ленту iCal:",
ICAL_FEED_SUBSCRIBE_HINT: "Вы можете подписаться на мероприятия HCL Connections во многих приложениях, например в HCL Notes и Microsoft Outlook. Щелкните следующий URL-адрес, чтобы подписаться на все мероприятия этого сообщества.  В зависимости от приложения календаря может потребоваться скопировать URL-адрес в это приложение.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "Вы можете подписаться на мероприятия HCL Connections во многих приложениях, например в HCL Notes и Microsoft Outlook. Щелкните следующий URL-адрес, чтобы подписаться на все мероприятия, за которыми вы следите или в которых участвуете.  В зависимости от приложения календаря может потребоваться скопировать URL-адрес в это приложение.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "Вы можете подписаться на мероприятия HCL Connections во многих приложениях, например в HCL Notes и Microsoft Outlook. Щелкните следующий URL-адрес, чтобы подписаться на все мероприятия, за которыми вы следите.  В зависимости от приложения календаря может потребоваться скопировать URL-адрес в это приложение.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "Вы можете подписаться на мероприятия HCL Connections во многих приложениях, например в HCL Notes и Microsoft Outlook. Щелкните следующий URL-адрес, чтобы подписаться на все мероприятия, в которых вы участвуете.  В зависимости от приложения календаря может потребоваться скопировать URL-адрес в это приложение.",
ICAL_FEED_HINT_POPUP: "Щелкните правой кнопкой мыши и скопируйте этот URL-адрес, а затем подпишитесь на него для своего приложения календаря как на ленту iCal",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Разместите мероприятия сообщества в своем личном календаре Notes или Outlook, щелкнув ленту ниже:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Как:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Добавить мероприятия сообщества в календарь Notes",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Добавить мероприятия сообщества в Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Добавить мероприятия сообщества в календарь Google",

ICAL_FEED_EXPORT_ICS:	"Экспортировать в календарь (.ics)",

DELETE_CONFIRM_SINGLE: "Вы действительно хотите удалить это мероприятие?",
DELETE_CONFIRM_SERIES: "Удалить один экземпляр или всю серию?",
DELETE_INSTACE_OPTION: "Удалить только этот экземпляр",
DELETE_SERIES_OPTION: "Удалить всю серию",
DELETE_DIALOG_BUTTON: "Удалить",

FOLLOW_CONFIRM_SERIES: "Отслеживать отдельный экземпляр или всю серию?",
FOLLOW_INSTACE_OPTION: "Отслеживать только этот экземпляр",
FOLLOW_SERIES_OPTION: "Отслеживать всю серию",
FOLLOW_DIALOG_BUTTON: "Отслеживать",
FOLLOW_CONFIRM: "Вы отслеживали это мероприятие. Подпишитесь на него для своего приложения календаря посредством <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">ленты iCal</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Вы отслеживали эту серию мероприятий. Подпишитесь на нее для своего приложения календаря посредством <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">ленты iCal</a>.",
UNFOLLOW_CONFIRM: "Вы прекратили отслеживание этого мероприятия.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Вы прекратили отслеживание этой серии мероприятий.",

RSVP_CONFIRM_SERIES: "Принять участие в одном экземпляре или во всей серии?",
RSVP_INSTACE_OPTION: "Принять участие только в этом экземпляре",
RSVP_SERIES_OPTION: "Принять участие во всей серии",
RSVP_DIALOG_BUTTON: "Принять участие",
RSVP_CONFIRM: "Вы участвуете в этом мероприятии. Подпишитесь на него для своего приложения календаря посредством <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">ленты iCal</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Вы участвуете в этой серии мероприятий. Подпишитесь на нее для своего приложения календаря посредством <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">ленты iCal</a>.",
UNRSVP_CONFIRM: "Вы прекратили участие в этом мероприятии.",
UNRSVP_ENTIRESERIES_CONFIRM: "Вы прекратили участие в этой серии мероприятий.",


SU: "вс",
MO: "пн",
TU: "вт",
WE: "ср",
TH: "чт",
FR: "пт",
SA: "сб",
SU_FULL: "Воскресенье",
MO_FULL: "Понедельник",
TU_FULL: "Вторник",
WE_FULL: "Среда",
TH_FULL: "Четверг",
FR_FULL: "Пятница",
SA_FULL: "Суббота",

DAYS: "дни",
WEEKS: "Недели",
MONTHS: "месяцы",
YEARS: "годы",
DAY: "день",
WEEK: "Неделя",
MONTH: "месяц",
YEAR: "год",

ON_THE_MONTHLY_DAY: "В || месяца.",
ON_THE_MONTHLY_WEEKDAY: "В || месяца.",

REMOVE: "Удалить",

ERROR: "Ошибка",
ERROR_HEADER: "Проверьте следующее",

WARNING: "Предупреждение",
WARNING_HEADER: "Предупреждение",

CREATED_BY: "Создано пользователем ${0}",
CREATED_ON: "Дата создания: ${0}",
UPDATED_ON: "Дата обновления ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Дата создания: ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Дата обновления: ${0}",
WHEN: "Когда:",
REPEATS: "Повторяется:",
DATE: "Дата",
ON: "В:",
ALL_DAY_EVENT:"Мероприятие на весь день",
ALL_DAY:"Весь день",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, весь день",
RECURRENCE: "Повторяется",
SUBJECT: "Тема:",
EVENT_TITLE: "Заголовок мероприятия:",
TAGS: "Теги:",
DESCRIPTION: "Описание:",
LOCATION: "Расположение:",
IMAGE_URL: "URL-адрес изображения:",
SUBMIT: "Передать на выполнение",
SAVE: "Сохранить",
CANCEL: "Отмена",
SAVECLOSE: "Сохранить и закрыть",
DELETE: "Удалить экземпляр",
FROM: "от",
TO: "до",
CLOSE: "Закрыть",
OPEN: "Открыть",
CLOSE_SECTION: "Закрыть раздел",
OPEN_SECTION: "Открыть раздел",
NO: "Нет",
CONFIRM: "Подтвердить",
CLEAR_EXCEPTIONS_CONFIRM: "Вы переносите несколько экземпляров повторяющейся встречи. Все эти экземпляры, включая перенесенные ранее, будут перенесены на одно и то же количество времени. Обязательно ознакомьтесь с последствиями этих изменений. \n\nВы действительно хотите продолжить?",

DAILY: "Ежедневно",
WEEKLY: "Еженедельно",
BIWEEKLY: "Раз в две недели",
EVERY_X_WEEK: "Каждые ${0} недель",
MONTHLY: "Ежемесячно",
MONTHLY_BY_DAY: "Ежемесячно по дням",
MONTHLY_BY_WEEKDAY: "Ежемесячно по будням",
YEARLY: "Ежегодно",
CUSTOM: "Пользовательский",
NONE: "Нет",
REPEAT_NONE: "Эта запись не повторяется",
REPEAT_DAILY: "Эта запись повторяется ежедневно",
REPEAT_WEEKLY: "Эта запись повторяется еженедельно",
REPEAT_DAILY_SHORT: "Ежедневно",
REPEAT_WEEKLY_SHORT: "Еженедельно",
REPEAT_MONTHLY_SHORT: "Ежемесячно",

REPEATS: "Повторяется",
REPEATS_LABEL: "Повторяется:",

REPEAT_FREQUENCY_ONEWEEK: "Неделя",
REPEAT_FREQUENCY_TWOWEEKS: "2 недели",
REPEAT_FREQUENCY_THREEWEEKS: "3 недели",
REPEAT_FREQUENCY_FOURWEEKS: "4 недели",
REPEAT_FREQUENCY_FIVEWEEKS: "5 недель",

REPEAT_MONTHLY_ON_THIS_DATE: "В эту дату:",
REPEAT_MONTHLY_ON_THIS_DAY: "В этот день:",

DATE_OF_MONTH_1: "1-го",
DATE_OF_MONTH_2: "2-го",
DATE_OF_MONTH_3: "3-го",
DATE_OF_MONTH_4: "4-го",
DATE_OF_MONTH_5: "5-го",
DATE_OF_MONTH_6: "6-го",
DATE_OF_MONTH_7: "7-го",
DATE_OF_MONTH_8: "8-го",
DATE_OF_MONTH_9: "9-го",
DATE_OF_MONTH_10: "10-го",
DATE_OF_MONTH_11: "11-го",
DATE_OF_MONTH_12: "12-го",
DATE_OF_MONTH_13: "13-го",
DATE_OF_MONTH_14: "14-го",
DATE_OF_MONTH_15: "15-го",
DATE_OF_MONTH_16: "16-го",
DATE_OF_MONTH_17: "17-го",
DATE_OF_MONTH_18: "18-го",
DATE_OF_MONTH_19: "19-го",
DATE_OF_MONTH_20: "20-го",
DATE_OF_MONTH_21: "21-го",
DATE_OF_MONTH_22: "22-го",
DATE_OF_MONTH_23: "23-го",
DATE_OF_MONTH_24: "24-го",
DATE_OF_MONTH_25: "25-го",
DATE_OF_MONTH_26: "26-го",
DATE_OF_MONTH_27: "27-го",
DATE_OF_MONTH_28: "28-го",
DATE_OF_MONTH_29: "29-го",
DATE_OF_MONTH_30: "30-го",
DATE_OF_MONTH_31: "31-го",

First_WEEK_OF_MONTH:"1-я",
Second_WEEK_OF_MONTH:"2-я",
Third_WEEK_OF_MONTH:"3-я",
Fourth_WEEK_OF_MONTH:"4-я",
LAST_WEEK_OF_MONTH:"последняя",

First_WEEK_OF_MONTH_FEMALE:"1-я", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"2-я",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"3-я",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"4-я",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"последняя",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"1-я",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"2-я",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"3-я",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"4-я",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"последняя",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Выберите день недели",
SELECT_WEEK_OF_MONTH:"Выберите неделю месяца",
SELECT_DATE_OF_MONTH:"Выберите дату месяца",
Fieldset_Event:"Поля для создания или редактирования мероприятия",

MESSAGE_BY_DATE_SKIPPED : "Месяцы, в которых нет этой даты, будут пропущены.",

EVERY: "Каждые:",
UNTIL: "До:",
ON: "В:",

ADD_ANOTHER: "Добавить другое",
REPEAT_ON: "Повторять на",

ADD_EVENT: "Создать мероприятие",
EDIT_EVENT: "Изменить мероприятие",

NOTIFY: "Уведомить других пользователей",
NOTIFY_TITLE: "Уведомить других пользователей",
NOTIFY_OK: "Уведомление",
DELETE: "Удалить",
EDIT: "Изменить",
EDIT_LABEL: "Изменить:",
EDIT_THIS_INSTANCE: "Изменить только этот экземпляр",
EDIT_THIS_SERIES: "Изменить всю серию",
FOLLOW: "Отслеживать",
FOLLOW_THIS_INSTANCE: "Отслеживать этот экземпляр",
FOLLOW_THIS_SERIES: "Отслеживать всю серию",
UNFOLLOW: "Больше не отслеживать",

RSVP: "Буду участвовать",
RSVP_THIS_INSTANCE: "Принять участие в этом экземпляре",
RSVP_THIS_SERIES: "Принять участие во всей серии",
UNRSVP: "Не буду участвовать",

START_TIME_AFTER_END: "Время начала мероприятия должно наступать до его окончания",
START_DAY_AFTER_UNTIL_DAY: "Дата начала повторяющегося мероприятия не должна наступать после его повторения до даты",
DURATION_LARGER_THAN_24H: "Продолжительность мероприятия не должна превышать 24 часа. Вместо этого создайте повторяющееся мероприятие.",
DESCRIPTION_LENGTH: 'Слишком длинное описание',
SUBJECT_LENGTH: 'Слишком длинный заголовок мероприятия',
LOCATION_LENGTH: 'Слишком длинное расположение',
IMAGE_URL_INVALID: 'Недопустимый URL-адрес изображения',
UNTIL_DATE: 'Укажите допустимую дату окончания мероприятия',
NO_REPEAT_ON: 'Для повторяющегося мероприятия необходимо выбрать хотя бы один день.',
START_DATE_IN_PAST: 'Мероприятие начинается в прошлом',

SUBJECT_INVALID: 'Недопустимый заголовок мероприятия',
START_DATE_INVALID: 'Недопустимая дата начала',
START_TIME_INVALID: 'Недопустимое время начала',
END_DATE_INVALID: 'Недопустимая дата окончания',
END_TIME_INVALID: 'Недопустимое время окончания',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Не выбраны участники. Выберите хотя бы одного участника для уведомления.',

NEXT_MONTH: "Показать следующий месяц",
PREVIOUS_MONTH: "Показать предыдущий месяц",
CALENDAR_SUMMARY: "Ежемесячный календарь с задачами",

SEND: "Отправить",
MAP_ROLE: "Роль участников:",
READ_ACCESS: "Читатель",
AUTHOR_ACCESS: "Автор (создает и изменяет собственные мероприятия)",
SAVE: "Сохранить",
PREF_FORM_TITLE: "Изменить настройки календаря",
TAB_UPCOMING: "Мероприятия",
TAB_CALENDAR: "Представление календаря",
SUMMARY: "Сводка",
DETAILS: "Сведения",
EVENT_TIME: "Время мероприятия",
UPDATED: "Обновлено",
SORT_ASC: "Сортировать по возрастанию",
SORT_DESC: "Сортировать по убыванию",
TODAY: "Сегодня",
TOMORROW: "Завтра",
YESTERDAY: "Вчера",
EVENT_NAME: "Имя мероприятия",
SHOW_DETAILS: "показать сведения",
SHOW_PASTEVENTS: "Показать прошедшие мероприятия",
SHOW_UPCOMINGEVENTS: "Показать предстоящие мероприятия",
HIDE_DETAILS: "скрыть сведения",
SELECT_CHECKBOX: "щелкните, чтобы выбрать",
UNSELECT_CHECKBOX: "Щелкните, чтобы отменить выбор",
NO_DESCRIPTION: "Описание отсутствует",
DISPLAY: "Показать",
REPEATS_FLAG: "(повторяется)",
STR_VIEW: "Представление:",
DISP_CALENDAR: "Сетка календаря",
DISP_LIST: "Список сводки",

GOTO_EDIT_INFO: "Чтобы изменить настройки, нажмите Действия над сообществами -> Изменить сообщество -> Календарь.",
VIEW_ALL_EVENTS: "Показать все мероприятия",
NO_EVENT_TODAY: "Сегодня нет мероприятий",
ONE_EVENT_TODAY: "Сегодня 1 мероприятие",
X_EVENTS_TODAY: "Сегодня мероприятий: ${0}",

OK: "OK",
UPCOMING_EVENTS: "Ближайшие мероприятия",
PICK_MEMBERS: "Выбрать участников сообщества",
NOTIFICATION_MESSAGE: "Сообщение",
NOTIFY_OTHERS: "Уведомить участников сообщества",
NOTIFY_DEFAULT_MESSAGE: "Здравствуйте! Возможно, вас заинтересует это мероприятие.",
NOTIFY_ERROR: "Произошла ошибка при уведомлении пользователей: ${0}",
NOTIFY_SUCCESS: "Уведомление отправлено.",
NOTIFY_ERROR_2: "Ваше мероприятие сохранено, но при уведомлении других участников возникает ошибка: ${0}",
INTERNAL_SERVER_ERR: "внутренняя ошибка сервера",
INTERNAL_SERVER_NOT_AVAILABLE: "Произошла ошибка при отображении содержимого. Обратитесь к системному администратору.",

ALT_WARNING_ICON: "Значок предупреждения",
ALT_CONFIRM_ICON: "Значок подтверждения",
ALT_ERROR_ICON: "Значок ошибки",
A11Y_WARNING_LABEL: "Предупреждение:",
A11Y_CONFIRM_LABEL: "Подтверждение:",
A11Y_ERROR_LABEL: "Ошибка:",

TAB_ABOUT: "Сведения",
TAB_COMMENT: "Комментарии (${0})",
ADD_COMMENT: "Добавьте комментарий...",
ENTER_COMMENT: "Введите комментарий:",
ENTER_COMMENT_ERROR: "Введите комментарий и нажмите кнопку 'Сохранить'. Если комментарий больше не требуется, нажмите кнопку 'Отмена'.",
COMMENT_META: "${0} комментариев на ${1}",
CONFIRM_DELETE_COMMENT: "Вы действительно хотите удалить комментарий?",
NO_COMMENT: "Нет комментариев.",

EVENT_DELETE_ERROR: "Не удалось удалить мероприятие. Возможно, оно уже было удалено. Обновите страницу и повторите попытку.",


TAB_ATTENDEE: "Число участников: ${0}",
NO_ATTENDEE: "Нет участников.",
NO_INSTANCE: "Нет предстоящих мероприятий.",
NO_UPCOMING_FOLLOWED: "Нет отслеживаемых вами предстоящих мероприятий.",
NO_UPCOMING_ATTENDED: "Вы не участвует в предстоящих мероприятиях.",
NO_UPCOMING_FOLLOWATTENDED: "Вы не отслеживаете предстоящие мероприятия и не посещаете их.",

FOLLOWED_EVENTS_LABEL: "Мероприятия, которые вы отслеживаете:",
ATTENDED_EVENTS_LABEL: "Мероприятия, в которых вы планируете принять участие:",
FOLLOWATTENDED_EVENTS_LABEL: "Мероприятия, которые вы отслеживаете и в которых планируете принять участие:",

PAGING_INFO: "${0} – ${1} из ${2}",
PAGING_INFO_TITLE: "Показать элементы с ${0} по ${1} из ${2}",
PAGING_PREVIOUS: "Назад",
PAGING_PREVIOUS_TITLE: "Предыдущая страница",
PAGING_NEXT: "Далее",
PAGING_NEXT_TITLE: "Следующая страница",
PAGING_SHOW: "Показать",
PAGING_LABEL: "Разбиение на страницы",

PAGING_COMMENT_LABEL:"Разбиение комментариев на страницы (управляющий элемент вверху)",
PAGING_COMMENT_BOTTOM_LABEL:"Разбиение комментариев на страницы (управляющий элемент внизу)",
PAGING_ATTENDEE_LABEL:"Разбиение участников на страницы (управляющий элемент вверху)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Разбиение участников на страницы (управляющий элемент внизу)",

PAGING_ITEMS: "элементы",
PAGING_PAGE_TITLE: "Показать ${0} элементов на странице",
PAGING_PAGE_TITLE2: "Страница ${0}",
PAGING_PAGE_TITLE3: "Нажмите, чтобы показать на странице ${0} элементов",
PAGING_JUMPTO: "Перейти к стр. ${0} из ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Номер страницы",
PAGEING_JUMP_LABEL:"При изменении значения будут обновлены результаты на странице",

DETAIL_WHEN: "Когда: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Время: ${0} – ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} по ${1}",
ABOUT_ADDED: "Создано:",
ABOUT_UPDATED: "Обновлено:",

WITH_TAGS: "С тегами:",
TAGS_TITLE: "Теги",
TAGS_REMOVE_HINT: "Удалить тег ${0} из выбранных тегов фильтра",

HELP: "Справка",
CLOSE_HELP: "Закрыть справку",

TAGCLOUD_HELP: "Тег — это ключевое слово, которое назначается мероприятию сообщества для классификации и облегчения поиска. Введите или выберите тег, чтобы просмотреть связанные с ним мероприятия сообщества. Популярные теги показываются в облаке и списке тегов более крупным и темным шрифтом.",
//start - end
DURATION_SPAN: "${0} – ${1}",
LOADING: "Загрузка...",
NOT_AUTHORIZED: "Вы не имеете права выполнять это действие.",
STARTS:"Начинается:",
ENDS:"Заканчивается:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} в ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Тег - это ключевое слово, присваиваемое содержимому для упрощения поиска. Теги должны состоять из одного слова, например состав или списочный_состав, и разделяться запятыми или пробелами.",
INVALID_CHAR_IN_TAG: "Введенный список владельцев содержит недопустимые символы, например '&'.  Удалите эти символы из списка тегов.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Нет предстоящих мероприятий.",
NO_UPCOMING_EVENTS_MSG: "В этом сообществе нет предстоящих мероприятий.",
NO_PAST_EVENTS_MSG: "Нет прошедших мероприятий в этом сообществе.",

OWNER: "Владелец",
MEMBER: "Участник",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Действия мероприятия",
EVENT_VIEWS_NAVIGATION: "Просмотры мероприятий",

EVENTS_VIEW_TOOLBAR_LABEL: "Действия мероприятия",

ALLDAY_UPDATED_MSG_HINT: "Время начала и окончания мероприятия обновлено соответственно.",

EVENT_STARTTIME_LABEL: "Время начала мероприятия",
EVENT_ENDTIME_LABEL: "Время окончания мероприятия",

REPEATS_ENABLE_DISABLE_HINT: "Нажмите, чтобы включить или отключить повторяющиеся параметры",
REPEATING_OPTIONS_HINT: "Параметры повторения",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Введите дату. Пример: ${0}",
ENTER_TIME_EXAMPLE: "Введите время. Пример: ${0}",

REQUIRED: "Обязательно",

COLLAPSED_SECTION: "Свернутый раздел",
EXPANDED_SECTION: "Развернутый раздел",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Изменить только этот экземпляр или всю серию. Изменение всей серии не перезаписывает изменения, которые вы ранее внесли в отдельные экземпляры этого мероприятия.",

REPEATING_FREQUENCY: "Частота повтора",
REPEATING_UNTIL: "Повторять до",
REPEATING_ON: "Повторять на",

CALENDAR_PREF_SAVE_CONFIRM: "Ваши изменения в Календаре сохранены.",
HIDE_THIS_MESSAGE: "Скрыть это сообщение",

EVENT_OPEN_ERR_NOTFOUND: "Не удалось открыть мероприятие сообщества. Возможная причина: мероприятие уже удалено.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (время: ${1}, расположение: ${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (время: ${1}).",
LINK_OPEN_INFO: "${0} (время: ${1}, расположение: ${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (время: ${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Нажмите ссылку, чтобы открыть ее в новом окне.",

WARNING_ICON: "Значок предупреждения",

MENTION: {
	NOT_MEMBER_WARNING: "Следующие пользователи не смогут просмотреть сообщение, поскольку не являются участниками сообщества.",
	NOT_SAME_ORGANIZATION_WARNING: "Следующие пользователи не смогут просмотреть сообщение, поскольку находятся в другой организации."
},
SELECT_ALL: "Выбрать все"
})
