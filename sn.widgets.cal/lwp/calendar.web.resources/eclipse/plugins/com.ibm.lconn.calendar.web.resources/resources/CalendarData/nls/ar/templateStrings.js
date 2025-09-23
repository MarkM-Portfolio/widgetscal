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
TITLE: "الأحداث",

CREATE_BUTTON: "تكوين حدث",
CREATE_BUTTON_TOOLTIP: "تكوين حدث جديد في يوم محدد",
EDIT_BUTTON: "تحرير حدث",
EDIT_BUTTON_TOOLTIP: "تحرير الحدث المحدد",
DELETE_BUTTON: "حذف الحدث",
DELETE_BUTTON_TOOLTIP: "حذف الحدث المحدد",
BACKTOCAL: "العودة إلى أحداث المجتمع",
BACKTOCAL2: "اضغط للرجوع إلى أحداث المجتمع",
MORE_ACTIONS: "‏إجراءات إضافية‏",

DAY_VIEW_TOOLTIP: "مشاهدة اليوم الواحد",
TWODAY_VIEW_TOOLTIP: "مشاهدة يومين",
FIVEDAY_VIEW_TOOLTIP: "مشاهدة خمسة أيام",
WEEK_VIEW_TOOLTIP: "مشاهدة الأسبوع",
MONTH_VIEW_TOOLTIP: "مشاهدة الشهر",

DAY_VIEW: "يوم واحد",
TWODAY_VIEW: "يومان",
FIVEDAY_VIEW: "خمسة أيام",
WEEK_VIEW: "الأسبوع",
MONTH_VIEW: "‏الشهر‏",

ICAL_FEED: "إضافة إلى التقويم الشخصي",
ICAL_FEED_DIALOG_TITLE: "إضافة إلى التقويم الشخصي",

ICAL_FEED_HINT: "انسخ عنوان URL هذا واشترك في تطبيق التقويم الخاص بك كوحدة المعلومات المسترجعة لـ iCal:",
ICAL_FEED_SUBSCRIBE_HINT: "يمكنك الاشتراك في أحداث HCL Connections الخاصة بك في العديد من التطبيقات، مثل HCL Notes وMicrosoft Outlook. اضغط على عنوان URL التالي للاشتراك في جميع الأحداث الخاصة بهذا المجتمع. وبناءً على تطبيق التقويم، قد تحتاج إلى نسخ عنوان URL إلى ذلك التطبيق.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "يمكنك الاشتراك في أحداث HCL Connections الخاصة بك في العديد من التطبيقات، مثل HCL Notes وMicrosoft Outlook. اضغط على عنوان URL التالي للاشتراك في جميع الأحداث التي تتابعها أو تحضرها. وبناءً على تطبيق التقويم الخاص بك، قد تحتاج إلى نسخ عنوان URL إلى ذلك التطبيق.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "يمكنك الاشتراك في أحداث HCL Connections الخاصة بك في العديد من التطبيقات، مثل HCL Notes وMicrosoft Outlook. اضغط على عنوان URL التالي للاشتراك في جميع الأحداث التي تتابعها. وبناءً على تطبيق التقويم الخاص بك، قد تحتاج إلى نسخ عنوان URL إلى ذلك التطبيق.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "يمكنك الاشتراك في أحداث HCL Connections الخاصة بك في العديد من التطبيقات، مثل HCL Notes وMicrosoft Outlook. اضغط على عنوان URL التالي للاشتراك في جميع الأحداث التي تحضرها. وبناءً على تطبيق التقويم الخاص بك، قد تحتاج إلى نسخ عنوان URL إلى ذلك التطبيق.",
ICAL_FEED_HINT_POPUP: "اضغط على مفتاح الفأرة الأيمن وانسخ عنوان URL هذا، واشترك في تطبيق التقويم الخاص بك كوحدة المعلومات المسترجعة لـ iCal",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "اجعل أحداث المجتمع تظهر في تطبيق Notes لديك أو تقويمك الشخصي في Outlook بالضغط على وحدة المعلومات المسترجعة أدناه:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "كيفية:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "إضافة أحداث مجتمع إلى تقويم Notes",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "إضافة أحداث مجتمع إلى Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "إضافة أحداث مجتمع إلى تقويم Google",

ICAL_FEED_EXPORT_ICS:	"تصدير إلى التقويم (.ics)",

DELETE_CONFIRM_SINGLE: "هل تريد بالتأكيد حذف هذا الحدث؟",
DELETE_CONFIRM_SERIES: "هل تريد حذف نسخة فردية أو حذف السلسلة بالكامل؟",
DELETE_INSTACE_OPTION: "حذف هذه النسخة فقط",
DELETE_SERIES_OPTION: "حذف هذه السلسلة بالكامل",
DELETE_DIALOG_BUTTON: "حذف",

FOLLOW_CONFIRM_SERIES: "هل تريد تتبع نسخة فردية أم تتبع السلسلة بالكامل؟",
FOLLOW_INSTACE_OPTION: "تتبع هذه النسخة فقط",
FOLLOW_SERIES_OPTION: "تتبع النسخة بالكامل",
FOLLOW_DIALOG_BUTTON: "متابعة",
FOLLOW_CONFIRM: "لقد تتبعت هذا الحدث. اشترك في تطبيق التقويم لديك عبر <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4)؛ تعرض خطأ؛\">وحدة معلومات iCal المسترجعة</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "لقد تتبعت سلسلة الأحداث هذه. اشترك في تطبيق التقويم لديك عبر <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4)؛ تعرض خطأ؛\">وحدة معلومات iCal المسترجعة</a>.",
UNFOLLOW_CONFIRM: "قمت بإيقاف تتبع هذا الحدث.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "قمت بإيقاف تتبع سلسلة الأحداث هذه.",

RSVP_CONFIRM_SERIES: "هل تريد حضور نسخة فردية أم حضور النسخة بأكملها؟",
RSVP_INSTACE_OPTION: "حضور هذه النسخة فقط",
RSVP_SERIES_OPTION: "حضور هذه السلسلة بالكامل",
RSVP_DIALOG_BUTTON: "حضور",
RSVP_CONFIRM: "أنت تحضر هذا الحدث. اشترك في تطبيق التقويم لديك عبر <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3)؛ تعرض خطأ؛\">وحدة معلومات iCal المسترجعة</a>.",
RSVP_ENTIRESERIES_CONFIRM: "أنت تحضر سلسلة الأحداث هذه. اشترك في تطبيق التقويم لديك عبر <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3)؛ تعرض خطأ؛\">وحدة معلومات iCal المسترجعة</a>.",
UNRSVP_CONFIRM: "قمت بإيقاف حضور هذا الحدث.",
UNRSVP_ENTIRESERIES_CONFIRM: "قمت بإيقاف حضور سلسلة الأحداث هذه.",


SU: "أحد",
MO: "اثنين",
TU: "ثلاثاء",
WE: "أربعاء",
TH: "خميس",
FR: "جمعة",
SA: "سبت",
SU_FULL: "أحد",
MO_FULL: "اثنين",
TU_FULL: "ثلاثاء",
WE_FULL: "أربعاء",
TH_FULL: "خميس",
FR_FULL: "جمعة",
SA_FULL: "سبت",

DAYS: "أيام",
WEEKS: "أسابيع",
MONTHS: "أشهر",
YEARS: "سنوات",
DAY: "يوم",
WEEK: "الأسبوع",
MONTH: "شهر",
YEAR: "‏سنة‏",

ON_THE_MONTHLY_DAY: "في || من الشهر.",
ON_THE_MONTHLY_WEEKDAY: "في || من الشهر.",

REMOVE: "ازالة",

ERROR: "لا يمكن لوحدة الخدمة اجراء البحث الآن.  حاول اجراء البحث في وقت لاحق.",
ERROR_HEADER: "برجاء التحقق مما يلي",

WARNING: "تحذير",
WARNING_HEADER: "تحذير",

CREATED_BY: "تم التكوين بواسطة ${0}",
CREATED_ON: "تم التكوين في ${0}",
UPDATED_ON: "تم التحديث في ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "تم التكوين في ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "تم التحديث في ${0}",
WHEN: "متى:",
REPEATS: "تكرارات:",
DATE: "تاريخ",
ON: "تشغيل:",
ALL_DAY_EVENT:"حدث طوال اليوم",
ALL_DAY:"كل الأيام",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}، طوال اليوم",
RECURRENCE: "تكرارات",
SUBJECT: "‏الموضوع‏:",
EVENT_TITLE: "عنوان الحدث:",
TAGS: "شارات التعليم:",
DESCRIPTION: "‏الوصف:‏",
LOCATION: "المكان:",
IMAGE_URL: "عنوان URL للصورة:",
SUBMIT: "إحالة",
SAVE: "حفظ",
CANCEL: "الغاء",
SAVECLOSE: "حفظ واغلاق",
DELETE: "حذف النسخة",
FROM: "من",
TO: "إلى",
CLOSE: "‏اغلاق‏",
OPEN: "فتح",
CLOSE_SECTION: "اغلاق القسم",
OPEN_SECTION: "فتح القسم",
NO: "‏لا‏",
CONFIRM: "تأكيد",
CLEAR_EXCEPTIONS_CONFIRM: "تقوم بإعادة جدولة نسخ متعددة لاجتماع متكرر. سيتم نقل جميع هذه النسخ بنفس المقدار الزمني النسبي بما في ذلك تلك التي تمت إعادة جدولتها مسبقًا. الرجاء التأكد من مراجعة تأثيرات هذه التغييرات.\n\n هل تريد بالتأكيد المتابعة؟",

DAILY: "يوميا",
WEEKLY: "أسبوعيا",
BIWEEKLY: "نصف أسبوعي",
EVERY_X_WEEK: "كل ${0} من الأسابيع",
MONTHLY: "شهريا",
MONTHLY_BY_DAY: "شهريًا في يوم",
MONTHLY_BY_WEEKDAY: "شهريًا في يوم الأسبوع",
YEARLY: "سنويًا",
CUSTOM: "تهيئة",
NONE: "‏لا شيء‏",
REPEAT_NONE: "هذا الإدخال لا يتكرر",
REPEAT_DAILY: "هذا الإدخال يتكرر يوميًا",
REPEAT_WEEKLY: "هذا الإدخال يتكرر أسبوعيًا",
REPEAT_DAILY_SHORT: "يوميا",
REPEAT_WEEKLY_SHORT: "أسبوعيا",
REPEAT_MONTHLY_SHORT: "شهريا",

REPEATS: "تكرارات",
REPEATS_LABEL: "تكرارات:",

REPEAT_FREQUENCY_ONEWEEK: "الأسبوع",
REPEAT_FREQUENCY_TWOWEEKS: "أسبوعان",
REPEAT_FREQUENCY_THREEWEEKS: "3 أسابيع",
REPEAT_FREQUENCY_FOURWEEKS: "4 أسابيع",
REPEAT_FREQUENCY_FIVEWEEKS: "5 أسابيع",

REPEAT_MONTHLY_ON_THIS_DATE: "في هذا التاريخ:",
REPEAT_MONTHLY_ON_THIS_DAY: "في هذا اليوم:",

DATE_OF_MONTH_1: "الأول",
DATE_OF_MONTH_2: "الثاني",
DATE_OF_MONTH_3: "الثالث",
DATE_OF_MONTH_4: "الرابع",
DATE_OF_MONTH_5: "الخامس",
DATE_OF_MONTH_6: "السادس",
DATE_OF_MONTH_7: "السابع",
DATE_OF_MONTH_8: "الثامن ",
DATE_OF_MONTH_9: "التاسع",
DATE_OF_MONTH_10: "العاشر",
DATE_OF_MONTH_11: "الحادي عشر",
DATE_OF_MONTH_12: "الثاني عشر",
DATE_OF_MONTH_13: "الثالث عشر",
DATE_OF_MONTH_14: "الرابع عشر",
DATE_OF_MONTH_15: "الخامس عشر",
DATE_OF_MONTH_16: "السادس عشر",
DATE_OF_MONTH_17: "السابع عشر",
DATE_OF_MONTH_18: "الثامن عشر",
DATE_OF_MONTH_19: "التاسع عشر",
DATE_OF_MONTH_20: "العشرون",
DATE_OF_MONTH_21: "الحادي والعشرون",
DATE_OF_MONTH_22: "الثاني والعشرون",
DATE_OF_MONTH_23: "الثالث والعشرون",
DATE_OF_MONTH_24: "الرابع والعشرون ",
DATE_OF_MONTH_25: "الخامس والعشرون",
DATE_OF_MONTH_26: "السادس والعشرون",
DATE_OF_MONTH_27: "السابع والعشرون",
DATE_OF_MONTH_28: "الثامن والعشرون",
DATE_OF_MONTH_29: "التاسع والعشرون",
DATE_OF_MONTH_30: "الثلاثون",
DATE_OF_MONTH_31: "الحادي والثلاثون",

First_WEEK_OF_MONTH:"الأول",
Second_WEEK_OF_MONTH:"الثاني",
Third_WEEK_OF_MONTH:"الثالث",
Fourth_WEEK_OF_MONTH:"الرابع",
LAST_WEEK_OF_MONTH:"الأخير",

First_WEEK_OF_MONTH_FEMALE:"الأول", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"الثاني",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"الثالث",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"الرابع",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"الأخير",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"الأول",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"الثاني",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"الثالث",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"الرابع",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"الأخير",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"تحديد يوم الأسبوع",
SELECT_WEEK_OF_MONTH:"تحديد الأسبوع من الشهر",
SELECT_DATE_OF_MONTH:"تحديد تاريخ من الشهر",
Fieldset_Event:"المجالات المطلوبة لتكوين أو تحرير الحدث",

MESSAGE_BY_DATE_SKIPPED : "سيتم تخطي الأشهر التي لا تحتوي على هذا التاريخ",

EVERY: "كل:",
UNTIL: "حتى:",
ON: "تشغيل:",

ADD_ANOTHER: "إضافة آخر",
REPEAT_ON: "التكرار في",

ADD_EVENT: "تكوين حدث",
EDIT_EVENT: "تحرير حدث",

NOTIFY: "اعلام الأشخاص الآخرين",
NOTIFY_TITLE: "اعلام الأشخاص الآخرين",
NOTIFY_OK: "اعلام",
DELETE: "حذف",
EDIT: "تعديل",
EDIT_LABEL: "تحرير:",
EDIT_THIS_INSTANCE: "تحرير هذه النسخة",
EDIT_THIS_SERIES: "تحرير السلسلة بالكامل",
FOLLOW: "متابعة",
FOLLOW_THIS_INSTANCE: "تتبع هذه النسخة",
FOLLOW_THIS_SERIES: "تتبع السلسلة بالكامل",
UNFOLLOW: "ايقاف المتابعة",

RSVP: "سأقوم بالحضور",
RSVP_THIS_INSTANCE: "حضور هذه النسخة",
RSVP_THIS_SERIES: "حضور السلسلة بالكامل",
UNRSVP: "لن أقوم بالحضور",

START_TIME_AFTER_END: "يجب أن يكون وقت بدء الحدث أقدم من وقت الانتهاء",
START_DAY_AFTER_UNTIL_DAY: "يجب ألا يكون تاريخ بدء الحدث المتكرر بعد تكراره حتى تاريخه",
DURATION_LARGER_THAN_24H: "يجب ألا تزيد مدة الحدث عن 24 ساعة. برجاء إنشاء حدث متكرر بدلاً من ذلك.",
DESCRIPTION_LENGTH: 'الوصف طويل للغاية',
SUBJECT_LENGTH: 'عنوان الحدث طويل للغاية',
LOCATION_LENGTH: 'الموقع طويل للغاية',
IMAGE_URL_INVALID: 'عنوان URL للصورة غير صالح',
UNTIL_DATE: 'يرجى تحديد تاريخ انتهاء حدث صالح',
NO_REPEAT_ON: 'يجب على الأقل تحديد يوم واحد لحدث متكرر',
START_DATE_IN_PAST: 'يبدأ الحدث في الماضي',

SUBJECT_INVALID: 'يجب أن يكون عنوان الحدث صالحًا',
START_DATE_INVALID: 'يجب أن يكون تاريخ البدء صالحًا',
START_TIME_INVALID: 'يجب أن يكون وقت البدء صالحًا',
END_DATE_INVALID: 'يجب أن يكون تاريخ الانتهاء صالحًا',
END_TIME_INVALID: 'وقت الانتهاء يجب أن يكون صالحًا',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'لم يتم تحديد أي أعضاء. برجاء تحديد عضو واحد على الأقل لإخطاره.',

NEXT_MONTH: "عرض الشهر التالي",
PREVIOUS_MONTH: "عرض الشهر السابق",
CALENDAR_SUMMARY: "التقويم الشهري مع بنود المهام الواجبة",

SEND: "ارسال",
MAP_ROLE: "الأعضاء المخصص لهم الوظيفة:",
READ_ACCESS: "القارئ",
AUTHOR_ACCESS: "المؤلف (يقوم بتكوين وتحرير الأحداث الخاصة به)",
SAVE: "حفظ",
PREF_FORM_TITLE: "تحرير محددات التقويم",
TAB_UPCOMING: "الأحداث",
TAB_CALENDAR: "مشاهدة التقويم",
SUMMARY: "الملخص",
DETAILS: "تفاصيل",
EVENT_TIME: "وقت الحدث",
UPDATED: "تحديث في",
SORT_ASC: "الفرز تصاعديًا",
SORT_DESC: "الفرز تنازليًا",
TODAY: "اليوم",
TOMORROW: "غدًا",
YESTERDAY: "أمس",
EVENT_NAME: "اسم الحدث",
SHOW_DETAILS: "عرض التفاصيل",
SHOW_PASTEVENTS: "عرض الأحداث الماضية",
SHOW_UPCOMINGEVENTS: "عرض الأحداث المقبلة",
HIDE_DETAILS: "إخفاء التفاصيل",
SELECT_CHECKBOX: "الضغط للتحديد",
UNSELECT_CHECKBOX: "الضغط لإلغاء التحديد",
NO_DESCRIPTION: "لم يتم اتاحة وصف",
DISPLAY: "عرض",
REPEATS_FLAG: "(تكرارات)",
STR_VIEW: "مشاهدة:",
DISP_CALENDAR: "شبكة التقويم",
DISP_LIST: "كشف الملخص",

GOTO_EDIT_INFO: "أنت تحتاج إلى تتبع تصرفات المجتمع -> تحرير مجتمع -> التقويم لتحرير الأفضليات.",
VIEW_ALL_EVENTS: "مشاهدة كل الأحداث",
NO_EVENT_TODAY: "لا يوجد حدث اليوم",
ONE_EVENT_TODAY: "حدث واحد اليوم",
X_EVENTS_TODAY: "${0} من الأحداث اليوم",

OK: "حسنا",
UPCOMING_EVENTS: "الأحداث المقبلة",
PICK_MEMBERS: "تحديد أعضاء المجتمع",
NOTIFICATION_MESSAGE: "‏رسالة‏",
NOTIFY_OTHERS: "إخطار أعضاء المجتمع",
NOTIFY_DEFAULT_MESSAGE: "مرحبًا - أعتقد أنك قد تكون مهتمًا بهذا الحدث.",
NOTIFY_ERROR: "حدث خطأ أثناء إخطار الأشخاص: ${0}",
NOTIFY_SUCCESS: "تم إرسال الإخطار بنجاح.",
NOTIFY_ERROR_2: "تم حفظ الحدث الخاص بك، ولكن يوجد خطأ عند إخطار الآخرين: ${0}",
INTERNAL_SERVER_ERR: "خطأ داخلي بوحدة الخدمة",
INTERNAL_SERVER_NOT_AVAILABLE: "حدث خطأ أثناء عرض المحتوى. اتصل بموجه النظام لديك.",

ALT_WARNING_ICON: "شارة التحذير",
ALT_CONFIRM_ICON: "شارة التأكيد",
ALT_ERROR_ICON: "شارة الخطأ",
A11Y_WARNING_LABEL: "تحذير:",
A11Y_CONFIRM_LABEL: "تأكيد:",
A11Y_ERROR_LABEL: "خطأ:",

TAB_ABOUT: "نبذة عن",
TAB_COMMENT: "تعقيبات (${0})",
ADD_COMMENT: "إضافة تعقيب...",
ENTER_COMMENT: "أدخل التعقيب الخاص بك:",
ENTER_COMMENT_ERROR: "برجاء إدخال التعقيب الخاص بك ثم اضغط 'حفظ'. إذا لم تعد تريد ترك تعقيب اضغط 'إلغاء'.",
COMMENT_META: "قام ${0} بالتعقيب في ${1}",
CONFIRM_DELETE_COMMENT: "هل تريد بالتأكيد حذف هذا التعقيب؟",
NO_COMMENT: "لا توجد أية تعقيبات.",

EVENT_DELETE_ERROR: "فشل في حذف الحدث. ربما تم حذف الحدث. يرجى تحديث الصفحة والمحاولة مرة أخرى.",


TAB_ATTENDEE: "حضور ${0} من الأفراد",
NO_ATTENDEE: "لا يوجد حاضرون.",
NO_INSTANCE: "لا توجد أحداث مقبلة.",
NO_UPCOMING_FOLLOWED: "أنت لا تتبع أي أحداث مقبلة.",
NO_UPCOMING_ATTENDED: "أنت لا تحضر أي أحداث مقبلة.",
NO_UPCOMING_FOLLOWATTENDED: "أنت لا تتتبع أو تحضر أي أحداث مقبلة.",

FOLLOWED_EVENTS_LABEL: "الأحداث التي تتبعها:",
ATTENDED_EVENTS_LABEL: "الأحداث التي تخطط إلى تتبعها:",
FOLLOWATTENDED_EVENTS_LABEL: "الأحداث التي تتتبعها وتخطط إلى حضورها:",

PAGING_INFO: "${0} - ${1} من ${2}",
PAGING_INFO_TITLE: "عرض البنود ${0} خلال ${1} من ${2}",
PAGING_PREVIOUS: "‏السابق‏",
PAGING_PREVIOUS_TITLE: "صفحة سابقة",
PAGING_NEXT: "التالي",
PAGING_NEXT_TITLE: "صفحة تالية",
PAGING_SHOW: "عرض",
PAGING_LABEL: "تصفح",

PAGING_COMMENT_LABEL:"تعقيبات التصفح (التحكم بالأعلى)",
PAGING_COMMENT_BOTTOM_LABEL:"تعقيبات التصفح (التحكم بالأسفل)",
PAGING_ATTENDEE_LABEL:"حضور الأشخاص في التصفح (التحكم بالأعلى)",
PAGING_ATTENDEE_BOTTOM_LABEL:"حضور الأشخاص في التصفح (التحكم بالأسفل)",

PAGING_ITEMS: "العناصر",
PAGING_PAGE_TITLE: "عرض ${0} بنود بالصفحة",
PAGING_PAGE_TITLE2: "الصفحة ${0}",
PAGING_PAGE_TITLE3: "اضغط لعرض ${0} من العناصر لكل صفحة",
PAGING_JUMPTO: "الانتقال إلى صفحة ${0} من ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "رقم الصفحة",
PAGEING_JUMP_LABEL:"تغيير القيمة، سيؤدي الى تجديد نتائج الصفحة",

DETAIL_WHEN: "متى: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "الوقت: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} بواسطة ${1}",
ABOUT_ADDED: "تاريخ ووقت التكوين:",
ABOUT_UPDATED: "تاريخ التحديث:",

WITH_TAGS: "يتضمن شارات تعليم:",
TAGS_TITLE: "شارات التعليم",
TAGS_REMOVE_HINT: "إزالة الشارة ${0} من شارات المرشح المحدد",

HELP: "‏مساعدة‏",
CLOSE_HELP: "اغلاق المساعدة",

TAGCLOUD_HELP: "شارة التعليم هي الكلمة المرشدة التي تقوم بتخصيصها لحدث مجتمع لتصنيفها وتسهيل العثور عليها. أدخل أو اضغط على شارة تعليم لمشاهدة أحداث المجتمع المرتبطة بها. يتم عرض شارات التعليم الشائعة بنص أكبر وأغمق في وحدة شارات التعليم المجمعة.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "جاري التحميل...",
NOT_AUTHORIZED: "غير مصرح لك بتنفيذ هذا التصرف.",
STARTS:"البدء:",
ENDS:"الانتهاء:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} في ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "شارة التعليم هي الكلمة المرشدة التي تقوم بتخصيصها للمحتويات لتسهيل ايجادها.يجب أن تكون شارات التعليم كلمات منفردة مثل المرتبات أو الموارد_البشرية، مفصولة بفاصلات أو مسافات.",
INVALID_CHAR_IN_TAG: "يحتوي كشف الشارة الذي قمت بإدخاله على حرف غير صحيح وهو '&'.  برجاء إزالة هذا الحرف من كشف الشارة.",

NO_UPCOMING_EVENTS_MSG_SHORT: "لا توجد أحداث مقبلة.",
NO_UPCOMING_EVENTS_MSG: "لا توجد أحداث مقبلة في هذا المجتمع.",
NO_PAST_EVENTS_MSG: "لا توجد أحداث في الماضي في هذا المجتمع.",

OWNER: "المالك",
MEMBER: "العضو",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "تصرفات الحدث",
EVENT_VIEWS_NAVIGATION: "مشاهدات الأحداث",

EVENTS_VIEW_TOOLBAR_LABEL: "تصرفات الحدث",

ALLDAY_UPDATED_MSG_HINT: "تم تحديث وقت بدء الحدث ووقت انتهائه وفقًا لذلك.",

EVENT_STARTTIME_LABEL: "وقت بدء الحدث",
EVENT_ENDTIME_LABEL: "وقت انتهاء الحدث",

REPEATS_ENABLE_DISABLE_HINT: "اضغط لإتاحة أو إلغاء إتاحة خيارات التكرار",
REPEATING_OPTIONS_HINT: "خيارات التكرار",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "أدخل تاريخًا. مثال: ${0}",
ENTER_TIME_EXAMPLE: "أدخل تاريخًا. مثال: ${0}",

REQUIRED: "مطلوب",

COLLAPSED_SECTION: "القسم الذي تم طيه",
EXPANDED_SECTION: "القسم الذي تم عرضه",

REPEATING_EVENTS_EDIT_TYPE_HELP: "قم بتحرير هذه النسخة فقط أو قم بتحرير السلسلة بالكامل. لا يؤدي تحرير السلسلة بأكملها إلى الكتابة فوق التغييرات التي أجريتها مسبقًا على نسخ فردية من هذا الحدث.",

REPEATING_FREQUENCY: "معدل التكرار",
REPEATING_UNTIL: "التكرار حتى",
REPEATING_ON: "التكرار في",

CALENDAR_PREF_SAVE_CONFIRM: "تم حفظ التغييرات الخاصة بك للتقويم.",
HIDE_THIS_MESSAGE: "اخفاء هذه الرسالة",

EVENT_OPEN_ERR_NOTFOUND: "فشل فتح حدث المجتمع. السبب المحتمل: تم حذف الحدث بالفعل.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (الوقت:${1}، المكان:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (الوقت:${1}).",
LINK_OPEN_INFO: "${0} (الوقت:${1}، المكان:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (الوقت:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"سيؤدي الضغط على الرابط إلى الفتح في نافذة جديدة.",

WARNING_ICON: "شارة التحذير",

MENTION: {
	NOT_MEMBER_WARNING: "لن يتمكن الأشخاص التالية أسماؤهم من مشاهدة الرسالة لأنهم ليسوا أعضاءً في المجتمع.",
	NOT_SAME_ORGANIZATION_WARNING: "لن يتمكن الأشخاص التالية أسماؤهم من رؤية الرسالة نظرًا لأنهم في مؤسسة مختلفة"
},
SELECT_ALL: "اختيار الكل"
})
