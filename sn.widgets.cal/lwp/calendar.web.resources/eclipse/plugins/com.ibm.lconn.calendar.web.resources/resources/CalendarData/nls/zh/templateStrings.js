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
TITLE: "事件",

CREATE_BUTTON: "创建事件",
CREATE_BUTTON_TOOLTIP: "在所选日期创建新事件",
EDIT_BUTTON: "编辑事件",
EDIT_BUTTON_TOOLTIP: "编辑所选事件",
DELETE_BUTTON: "删除事件",
DELETE_BUTTON_TOOLTIP: "删除所选事件",
BACKTOCAL: "返回到社区事件",
BACKTOCAL2: "单击以返回社区事件",
MORE_ACTIONS: "更多操作",

DAY_VIEW_TOOLTIP: "一天视图",
TWODAY_VIEW_TOOLTIP: "两天视图",
FIVEDAY_VIEW_TOOLTIP: "五天视图",
WEEK_VIEW_TOOLTIP: "周视图",
MONTH_VIEW_TOOLTIP: "月视图",

DAY_VIEW: "一天",
TWODAY_VIEW: "两天",
FIVEDAY_VIEW: "五天",
WEEK_VIEW: "周",
MONTH_VIEW: "月",

ICAL_FEED: "添加到“个人日历”",
ICAL_FEED_DIALOG_TITLE: "添加到“个人日历”",

ICAL_FEED_HINT: "复制此 URL 并将其作为 iCal 订阅源订阅到您的日历应用程序：",
ICAL_FEED_SUBSCRIBE_HINT: "您可以在 HCL Notes 和 Microsoft Outlook 等许多应用程序中订阅 HCL Connections 事件。单击以下 URL 可订阅此社区的所有事件。根据您的日历应用程序，您可能需要将此 URL 复制到该应用程序中。",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "您可以在 HCL Notes 和 Microsoft Outlook 等许多应用程序中订阅 HCL Connections 事件。单击以下 URL 可订阅您关注或参与的所有事件。根据您的日历应用程序，您可能需要将此 URL 复制到该应用程序中。",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "您可以在 HCL Notes 和 Microsoft Outlook 等许多应用程序中订阅 HCL Connections 事件。单击以下 URL 可订阅您关注的所有事件。根据您的日历应用程序，您可能需要将此 URL 复制到该应用程序中。",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "您可以在 HCL Notes 和 Microsoft Outlook 等许多应用程序中订阅 HCL Connections 事件。单击以下 URL 可订阅您参与的所有事件。根据您的日历应用程序，您可能需要将此 URL 复制到该应用程序中。",
ICAL_FEED_HINT_POPUP: "右键单击并复制此 URL，将其作为 iCal 订阅源订阅到您的日历应用程序",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "单击下面的订阅源，使您的社区事件显示在您的 Notes 或 Outlook 个人日历中：",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "方式：",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "将社区事件添加到 Notes 日历",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "将社区事件添加到 Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "将社区事件添加到 Google 日历",

ICAL_FEED_EXPORT_ICS:	"导出到日历 (.ics)",

DELETE_CONFIRM_SINGLE: "确定要删除此事件吗？",
DELETE_CONFIRM_SERIES: "删除单个实例还是删除整个系列？",
DELETE_INSTACE_OPTION: "仅删除此实例",
DELETE_SERIES_OPTION: "删除整个系列",
DELETE_DIALOG_BUTTON: "删除",

FOLLOW_CONFIRM_SERIES: "关注单个实例还是关注整个系列？",
FOLLOW_INSTACE_OPTION: "仅关注此实例",
FOLLOW_SERIES_OPTION: "关注整个系列",
FOLLOW_DIALOG_BUTTON: "关注",
FOLLOW_CONFIRM: "您已关注此事件。通过 <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal 订阅源</a>将其订阅到您的日历应用程序。",
FOLLOW_ENTIRESERIES_CONFIRM: "您已关注此事件系列。通过 <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal 订阅源</a>将其订阅到您的日历应用程序。",
UNFOLLOW_CONFIRM: "您已停止关注此事件。",
UNFOLLOW_ENTIRESERIES_CONFIRM: "您已停止关注此事件系列。",

RSVP_CONFIRM_SERIES: "参与单个实例还是参与整个系列？",
RSVP_INSTACE_OPTION: "仅参与该实例",
RSVP_SERIES_OPTION: "参与整个系列",
RSVP_DIALOG_BUTTON: "参与",
RSVP_CONFIRM: "您正在参与此事件。通过 <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal 订阅源</a>将其订阅到您的日历应用程序。",
RSVP_ENTIRESERIES_CONFIRM: "您正在参与此事件系列。通过 <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal 订阅源</a>将其订阅到您的日历应用程序。",
UNRSVP_CONFIRM: "您已停止参与此事件。",
UNRSVP_ENTIRESERIES_CONFIRM: "您已停止参与此事件系列。",


SU: "周日",
MO: "周一",
TU: "周二",
WE: "周三",
TH: "周四",
FR: "周五",
SA: "周六",
SU_FULL: "星期日",
MO_FULL: "星期一",
TU_FULL: "星期二",
WE_FULL: "星期三",
TH_FULL: "星期四",
FR_FULL: "星期五",
SA_FULL: "星期六",

DAYS: "天",
WEEKS: "周",
MONTHS: "月",
YEARS: "年",
DAY: "天",
WEEK: "周",
MONTH: "月",
YEAR: "年",

ON_THE_MONTHLY_DAY: "在一个月的 || 。",
ON_THE_MONTHLY_WEEKDAY: "在一个月的 || 。",

REMOVE: "除去",

ERROR: "错误",
ERROR_HEADER: "请检查以下内容",

WARNING: "警告",
WARNING_HEADER: "警告",

CREATED_BY: "由 ${0} 创建",
CREATED_ON: "创建日期：${0}",
UPDATED_ON: "更新日期：${0}",
CREATED_ON_TODAY_OR_TOMORROW: "创建日期：${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "更新日期：${0}",
WHEN: "时间：",
REPEATS: "重复：",
DATE: "日期",
ON: "日期：",
ALL_DAY_EVENT:"全天事件",
ALL_DAY:"全天",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}，全天",
RECURRENCE: "重复",
SUBJECT: "主题：",
EVENT_TITLE: "事件标题：",
TAGS: "标签：",
DESCRIPTION: "描述：",
LOCATION: "位置：",
IMAGE_URL: "图像 URL：",
SUBMIT: "提交",
SAVE: "保存",
CANCEL: "取消",
SAVECLOSE: "保存并关闭",
DELETE: "删除实例",
FROM: "自",
TO: "至",
CLOSE: "关闭",
OPEN: "打开",
CLOSE_SECTION: "关闭区段",
OPEN_SECTION: "打开区段",
NO: "否",
CONFIRM: "确认",
CLEAR_EXCEPTIONS_CONFIRM: "您正在重新调度重复会议的多个实例。这些实例将被移动相同的相对时间量，包括先前已重新调度的那些实例。请务必查看这些更改的影响。\n\n确定要继续吗？",

DAILY: "每日",
WEEKLY: "每周",
BIWEEKLY: "每两周",
EVERY_X_WEEK: "每 ${0} 周",
MONTHLY: "月度",
MONTHLY_BY_DAY: "每月的某一天",
MONTHLY_BY_WEEKDAY: "每月的某个工作日",
YEARLY: "年度",
CUSTOM: "定制",
NONE: "无人",
REPEAT_NONE: "此条目不重复",
REPEAT_DAILY: "此条目每天重复",
REPEAT_WEEKLY: "此条目每周重复",
REPEAT_DAILY_SHORT: "每日",
REPEAT_WEEKLY_SHORT: "每周",
REPEAT_MONTHLY_SHORT: "月度",

REPEATS: "重复",
REPEATS_LABEL: "重复：",

REPEAT_FREQUENCY_ONEWEEK: "周",
REPEAT_FREQUENCY_TWOWEEKS: "2 周",
REPEAT_FREQUENCY_THREEWEEKS: "3 周",
REPEAT_FREQUENCY_FOURWEEKS: "4 周",
REPEAT_FREQUENCY_FIVEWEEKS: "5 周",

REPEAT_MONTHLY_ON_THIS_DATE: "在此日期：",
REPEAT_MONTHLY_ON_THIS_DAY: "在这一天：",

DATE_OF_MONTH_1: "1",
DATE_OF_MONTH_2: "2",
DATE_OF_MONTH_3: "3",
DATE_OF_MONTH_4: "4",
DATE_OF_MONTH_5: "5",
DATE_OF_MONTH_6: "6",
DATE_OF_MONTH_7: "7",
DATE_OF_MONTH_8: "8",
DATE_OF_MONTH_9: "9",
DATE_OF_MONTH_10: "10",
DATE_OF_MONTH_11: "11",
DATE_OF_MONTH_12: "12",
DATE_OF_MONTH_13: "13",
DATE_OF_MONTH_14: "14",
DATE_OF_MONTH_15: "15",
DATE_OF_MONTH_16: "16",
DATE_OF_MONTH_17: "17",
DATE_OF_MONTH_18: "18",
DATE_OF_MONTH_19: "19",
DATE_OF_MONTH_20: "20",
DATE_OF_MONTH_21: "21",
DATE_OF_MONTH_22: "22",
DATE_OF_MONTH_23: "23",
DATE_OF_MONTH_24: "24",
DATE_OF_MONTH_25: "25",
DATE_OF_MONTH_26: "26",
DATE_OF_MONTH_27: "27",
DATE_OF_MONTH_28: "28",
DATE_OF_MONTH_29: "29",
DATE_OF_MONTH_30: "30",
DATE_OF_MONTH_31: "31",

First_WEEK_OF_MONTH:"1",
Second_WEEK_OF_MONTH:"2",
Third_WEEK_OF_MONTH:"3",
Fourth_WEEK_OF_MONTH:"4",
LAST_WEEK_OF_MONTH:"最后",

First_WEEK_OF_MONTH_FEMALE:"1", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"2",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"3",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"4",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"最后",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"1",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"2",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"3",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"4",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"最后",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"选择星期几",
SELECT_WEEK_OF_MONTH:"选择每月的第几周",
SELECT_DATE_OF_MONTH:"选择每月的日期",
Fieldset_Event:"用于创建或编辑事件的字段",

MESSAGE_BY_DATE_SKIPPED : "不包含此日期的月份将被跳过",

EVERY: "每隔：",
UNTIL: "截止日期：",
ON: "日期：",

ADD_ANOTHER: "添加另一个",
REPEAT_ON: "重复日期",

ADD_EVENT: "创建事件",
EDIT_EVENT: "编辑事件",

NOTIFY: "通知其他人",
NOTIFY_TITLE: "通知其他人",
NOTIFY_OK: "通知",
DELETE: "删除",
EDIT: "编辑",
EDIT_LABEL: "编辑：",
EDIT_THIS_INSTANCE: "编辑此实例",
EDIT_THIS_SERIES: "编辑整个系列",
FOLLOW: "关注",
FOLLOW_THIS_INSTANCE: "关注此实例",
FOLLOW_THIS_SERIES: "关注整个系列",
UNFOLLOW: "停止关注",

RSVP: "参与",
RSVP_THIS_INSTANCE: "参与此实例",
RSVP_THIS_SERIES: "参与整个系列",
UNRSVP: "不参与",

START_TIME_AFTER_END: "事件开始时间必须在结束时间之前",
START_DAY_AFTER_UNTIL_DAY: "重复事件的开始日期不得晚于其重复截止日期",
DURATION_LARGER_THAN_24H: "事件持续时间不应超过 24 小时。请改为创建重复事件。",
DESCRIPTION_LENGTH: '描述过长',
SUBJECT_LENGTH: '事件标题过长',
LOCATION_LENGTH: '位置过长',
IMAGE_URL_INVALID: '图像 URL 无效',
UNTIL_DATE: '请指定有效的事件结束日期',
NO_REPEAT_ON: '至少应为重复事件选择一天',
START_DATE_IN_PAST: '事件开始日期在过去',

SUBJECT_INVALID: '事件标题必须有效',
START_DATE_INVALID: '开始日期必须有效',
START_TIME_INVALID: '开始时间必须有效',
END_DATE_INVALID: '结束日期必须有效',
END_TIME_INVALID: '结束时间必须有效',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: '未选择任何成员。请至少选择一个要通知的成员。',

NEXT_MONTH: "显示下月",
PREVIOUS_MONTH: "显示上月",
CALENDAR_SUMMARY: "带有待办事宜的月历",

SEND: "发送",
MAP_ROLE: "成员具有以下角色：",
READ_ACCESS: "读者",
AUTHOR_ACCESS: "作者（创建和编辑他们自己的事件）",
SAVE: "保存",
PREF_FORM_TITLE: "编辑日历设置",
TAB_UPCOMING: "事件",
TAB_CALENDAR: "日历视图",
SUMMARY: "总结",
DETAILS: "详情",
EVENT_TIME: "事件时间",
UPDATED: "已更新",
SORT_ASC: "按升序排序",
SORT_DESC: "按降序排序",
TODAY: "今天",
TOMORROW: "明天",
YESTERDAY: "昨天",
EVENT_NAME: "事件名称",
SHOW_DETAILS: "显示详细信息",
SHOW_PASTEVENTS: "显示过去的事件",
SHOW_UPCOMINGEVENTS: "显示即将开始的事件",
HIDE_DETAILS: "隐藏详细信息",
SELECT_CHECKBOX: "单击以选择",
UNSELECT_CHECKBOX: "单击以取消选择",
NO_DESCRIPTION: "未提供描述",
DISPLAY: "显示",
REPEATS_FLAG: "（重复）",
STR_VIEW: "视图：",
DISP_CALENDAR: "日历网格",
DISP_LIST: "摘要列表",

GOTO_EDIT_INFO: "您需要按照“社区操作”->“编辑社区”->“日历”来编辑首选项。",
VIEW_ALL_EVENTS: "查看所有事件",
NO_EVENT_TODAY: "今天没有事件",
ONE_EVENT_TODAY: "今天有 1 个事件",
X_EVENTS_TODAY: "今天有 ${0} 个事件",

OK: "确定",
UPCOMING_EVENTS: "即将开始的事件",
PICK_MEMBERS: "选择社区成员",
NOTIFICATION_MESSAGE: "消息",
NOTIFY_OTHERS: "通知社区成员",
NOTIFY_DEFAULT_MESSAGE: "您好 - 我认为您可能对此事件感兴趣。",
NOTIFY_ERROR: "通知人员时出错：${0}",
NOTIFY_SUCCESS: "通知已成功发送。",
NOTIFY_ERROR_2: "您的事件已保存，但通知他人时出错： ${0}",
INTERNAL_SERVER_ERR: "内部服务器出错",
INTERNAL_SERVER_NOT_AVAILABLE: "显示内容时出错。请与系统管理员联系。",

ALT_WARNING_ICON: "警告图标",
ALT_CONFIRM_ICON: "确认图标",
ALT_ERROR_ICON: "错误图标",
A11Y_WARNING_LABEL: "警告：",
A11Y_CONFIRM_LABEL: "确认：",
A11Y_ERROR_LABEL: "错误：",

TAB_ABOUT: "关于",
TAB_COMMENT: "评论 (${0})",
ADD_COMMENT: "添加评论...",
ENTER_COMMENT: "输入您的评论：",
ENTER_COMMENT_ERROR: "请输入您的评论，然后单击“保存”。如果不想发表评论，请单击“取消”。",
COMMENT_META: "${0} 于 ${1} 评论",
CONFIRM_DELETE_COMMENT: "确定要删除此评论吗？",
NO_COMMENT: "没有评论。",

EVENT_DELETE_ERROR: "删除事件失败。此事件可能已被删除。请刷新页面，然后重试。",


TAB_ATTENDEE: "${0} 个参与人员",
NO_ATTENDEE: "没有参与者。",
NO_INSTANCE: "没有即将开始的事件。",
NO_UPCOMING_FOLLOWED: "您没有关注任何即将开始的事件。",
NO_UPCOMING_ATTENDED: "您没有参与任何即将开始的事件。",
NO_UPCOMING_FOLLOWATTENDED: "您没有关注或参与任何即将开始的事件。",

FOLLOWED_EVENTS_LABEL: "您正关注的事件：",
ATTENDED_EVENTS_LABEL: "您正计划参与的事件：",
FOLLOWATTENDED_EVENTS_LABEL: "您正关注和计划参与的事件：",

PAGING_INFO: "${0} - ${1}/${2}",
PAGING_INFO_TITLE: "显示第 ${0} 到 ${1} 项（共 ${2} 项）",
PAGING_PREVIOUS: "上一步",
PAGING_PREVIOUS_TITLE: "上一页",
PAGING_NEXT: "下一步",
PAGING_NEXT_TITLE: "下一页",
PAGING_SHOW: "显示",
PAGING_LABEL: "页面调度",

PAGING_COMMENT_LABEL:"评论页面调度（顶部控件）",
PAGING_COMMENT_BOTTOM_LABEL:"评论页面调度（底部控件）",
PAGING_ATTENDEE_LABEL:"参与人员页面调度（顶部控件）",
PAGING_ATTENDEE_BOTTOM_LABEL:"参与人员页面调度（底部控件）",

PAGING_ITEMS: "项",
PAGING_PAGE_TITLE: "每页显示 ${0} 项",
PAGING_PAGE_TITLE2: "页面：${0}",
PAGING_PAGE_TITLE3: "单击以每页显示 ${0} 项",
PAGING_JUMPTO: "跳到第 ${0} 页（共 ${1} 页）", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "页码",
PAGEING_JUMP_LABEL:"更改该值将刷新页面结果",

DETAIL_WHEN: "日期：${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "时间：${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0}，按 ${1}",
ABOUT_ADDED: "创建时间：",
ABOUT_UPDATED: "更新时间：",

WITH_TAGS: "所带标签：",
TAGS_TITLE: "标签",
TAGS_REMOVE_HINT: "从所选过滤标签中除去 ${0}",

HELP: "帮助",
CLOSE_HELP: "关闭帮助",

TAGCLOUD_HELP: "标签是为社区事件分配的关键字，用于对其进行分类，从而方便进行查找。输入或单击标签可查看与其相关联的社区事件。热门标签在标签云中显示为大字体深色文本。",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "正在装入...",
NOT_AUTHORIZED: "您没有执行此操作的权限。",
STARTS:"开始日期：",
ENDS:"结束日期：",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "标签是为了能更轻松查找内容而分配给内容的关键字。 标签必须是单个单词（如：payroll 或 human_resources），并以逗号或空格分隔。",
INVALID_CHAR_IN_TAG: "您输入的标签列表包含无效字符“&”。请从标签列表中除去该字符。",

NO_UPCOMING_EVENTS_MSG_SHORT: "没有即将开始的事件。",
NO_UPCOMING_EVENTS_MSG: "此社区没有任何即将开始的事件。",
NO_PAST_EVENTS_MSG: "此社区过去没有任何事件。",

OWNER: "所有者",
MEMBER: "成员",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "事件操作",
EVENT_VIEWS_NAVIGATION: "事件视图",

EVENTS_VIEW_TOOLBAR_LABEL: "事件操作",

ALLDAY_UPDATED_MSG_HINT: "事件开始时间和事件结束时间已相应更新。",

EVENT_STARTTIME_LABEL: "事件开始时间",
EVENT_ENDTIME_LABEL: "事件结束时间",

REPEATS_ENABLE_DISABLE_HINT: "单击以启用或禁用重复选项",
REPEATING_OPTIONS_HINT: "重复选项",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "输入日期。示例：${0}",
ENTER_TIME_EXAMPLE: "输入时间。示例：${0}",

REQUIRED: "必需的",

COLLAPSED_SECTION: "折叠区段",
EXPANDED_SECTION: "展开区段",

REPEATING_EVENTS_EDIT_TYPE_HELP: "仅编辑此实例还是编辑整个系列。编辑整个系列不会覆盖您以前对此事件的单个实例所作的更改。",

REPEATING_FREQUENCY: "重复频率",
REPEATING_UNTIL: "重复截止日期",
REPEATING_ON: "重复日期",

CALENDAR_PREF_SAVE_CONFIRM: "您对“日历”所作的更改已保存。",
HIDE_THIS_MESSAGE: "隐藏此消息",

EVENT_OPEN_ERR_NOTFOUND: "未能打开社区事件。可能原因：此事件已被删除。",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0}（时间：${1}，位置：${2}）。",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0}（时间：${1}）。",
LINK_OPEN_INFO: "${0}（时间：${1}，位置：${2}）。",
LINK_OPEN_INFO_NOLOCATION: "${0}（时间：${1}）。",
LINK_OPEN_IN_NEW_WINDOW:"单击链接将在新窗口中打开。",

WARNING_ICON: "警告图标",

MENTION: {
	NOT_MEMBER_WARNING: "以下提及的人员将无法查看该消息，因为他们不是社区的成员。",
	NOT_SAME_ORGANIZATION_WARNING: "以下提及的人员将无法查看该消息，因为他们在不同的组织中"
},
SELECT_ALL: "全选"
})
