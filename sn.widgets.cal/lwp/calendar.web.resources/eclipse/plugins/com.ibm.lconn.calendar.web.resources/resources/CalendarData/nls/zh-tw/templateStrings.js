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

CREATE_BUTTON: "建立事件",
CREATE_BUTTON_TOOLTIP: "在選取的日子建立新事件",
EDIT_BUTTON: "編輯事件",
EDIT_BUTTON_TOOLTIP: "編輯選取的事件",
DELETE_BUTTON: "刪除事件",
DELETE_BUTTON_TOOLTIP: "刪除選取的事件",
BACKTOCAL: "回到社群事件",
BACKTOCAL2: "按一下以回到社群事件",
MORE_ACTIONS: "其他動作",

DAY_VIEW_TOOLTIP: "一日視圖",
TWODAY_VIEW_TOOLTIP: "兩日視圖",
FIVEDAY_VIEW_TOOLTIP: "五日視圖",
WEEK_VIEW_TOOLTIP: "週視圖",
MONTH_VIEW_TOOLTIP: "月視圖",

DAY_VIEW: "一日",
TWODAY_VIEW: "兩日",
FIVEDAY_VIEW: "五日",
WEEK_VIEW: "週",
MONTH_VIEW: "月",

ICAL_FEED: "新增至個人行事曆",
ICAL_FEED_DIALOG_TITLE: "新增至個人行事曆",

ICAL_FEED_HINT: "複製此 URL，並在您的行事曆應用程式訂閱此 URL 作為 iCal 資訊來源：",
ICAL_FEED_SUBSCRIBE_HINT: "您可以在 HCL Notes 及 Microsoft Outlook 等許多應用程式中訂閱 HCL Connections 事件。按一下以下 URL 以訂閱此社群的所有事件。根據您的行事曆應用程式而定，您可能需要將 URL 複製到該應用程式。",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "您可以在 HCL Notes 及 Microsoft Outlook 等許多應用程式中訂閱 HCL Connections 事件。按一下以下 URL 以訂閱您正在追蹤或參加的所有事件。根據您的行事曆應用程式而定，您可能需要將 URL 複製到該應用程式。",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "您可以在 HCL Notes 及 Microsoft Outlook 等許多應用程式中訂閱 HCL Connections 事件。按一下以下 URL 以訂閱您正在追蹤的所有事件。根據您的行事曆應用程式而定，您可能需要將 URL 複製到該應用程式。",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "您可以在 HCL Notes 及 Microsoft Outlook 等許多應用程式中訂閱 HCL Connections 事件。按一下以下 URL 以訂閱您正要參加的所有事件。根據您的行事曆應用程式而定，您可能需要將 URL 複製到該應用程式。",
ICAL_FEED_HINT_POPUP: "按一下滑鼠右鍵並複製此 URL，在行事曆應用程式訂閱此 URL 作為 iCal 資訊來源",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "按一下底下的資訊來源，讓社群事件出現在 Notes 或 Outlook 個人行事曆中：",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "作法：",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "將社群事件新增至 Notes 行事曆",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "將社群事件新增至 Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "將社群事件新增至 Google 行事曆",

ICAL_FEED_EXPORT_ICS:	"匯出至行事曆 (.ics)",

DELETE_CONFIRM_SINGLE: "確定要刪除此事件嗎？",
DELETE_CONFIRM_SERIES: "要刪除單一實例或刪除整個系列？",
DELETE_INSTACE_OPTION: "僅刪除此實例",
DELETE_SERIES_OPTION: "刪除整個系列",
DELETE_DIALOG_BUTTON: "刪除",

FOLLOW_CONFIRM_SERIES: "要追蹤單一實例或追蹤整個系列？",
FOLLOW_INSTACE_OPTION: "僅追蹤此實例",
FOLLOW_SERIES_OPTION: "追蹤整個系列",
FOLLOW_DIALOG_BUTTON: "追蹤",
FOLLOW_CONFIRM: "您已追蹤此事件。透過 <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal 資訊來源</a>在行事曆應用程式訂閱此事件。",
FOLLOW_ENTIRESERIES_CONFIRM: "您已追蹤此事件系列。透過 <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal 資訊來源</a>在行事曆應用程式訂閱此事件系列。",
UNFOLLOW_CONFIRM: "您已停止追蹤此事件。",
UNFOLLOW_ENTIRESERIES_CONFIRM: "您已停止追蹤此事件系列。",

RSVP_CONFIRM_SERIES: "要參加單一事件或參加整個系列？",
RSVP_INSTACE_OPTION: "僅參加該事件",
RSVP_SERIES_OPTION: "參加整個系列",
RSVP_DIALOG_BUTTON: "參加",
RSVP_CONFIRM: "您將要參加此事件。透過 <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal 資訊來源</a>在行事曆應用程式訂閱此事件。",
RSVP_ENTIRESERIES_CONFIRM: "您將要參加此事件系列。透過 <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal 資訊來源</a>在行事曆應用程式訂閱此事件系列。",
UNRSVP_CONFIRM: "您已停止參加此事件。",
UNRSVP_ENTIRESERIES_CONFIRM: "您已停止參加此事件系列。",


SU: "週日",
MO: "週一",
TU: "週二",
WE: "週三",
TH: "週四",
FR: "週五",
SA: "週六",
SU_FULL: "星期日",
MO_FULL: "星期一",
TU_FULL: "星期二",
WE_FULL: "星期三",
TH_FULL: "星期四",
FR_FULL: "星期五",
SA_FULL: "星期六",

DAYS: "天",
WEEKS: "週",
MONTHS: "月",
YEARS: "年",
DAY: "日",
WEEK: "週",
MONTH: "月",
YEAR: "年",

ON_THE_MONTHLY_DAY: "在當月的 ||。",
ON_THE_MONTHLY_WEEKDAY: "在當月的 ||。",

REMOVE: "移除",

ERROR: "錯誤",
ERROR_HEADER: "請檢查下列內容",

WARNING: "警告",
WARNING_HEADER: "警告",

CREATED_BY: "建立者：${0}",
CREATED_ON: "已建立於 ${0}",
UPDATED_ON: "已更新於 ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "已建立於 ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "已更新於 ${0}",
WHEN: "時間：",
REPEATS: "重複：",
DATE: "日期",
ON: "於：",
ALL_DAY_EVENT:"全天事件",
ALL_DAY:"全天",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}，全天",
RECURRENCE: "重複",
SUBJECT: "主旨：",
EVENT_TITLE: "事件標題：",
TAGS: "標籤：",
DESCRIPTION: "說明：",
LOCATION: "位置：",
IMAGE_URL: "影像 URL：",
SUBMIT: "提交",
SAVE: "儲存",
CANCEL: "取消",
SAVECLOSE: "儲存並關閉",
DELETE: "刪除實例",
FROM: "來源",
TO: "目標",
CLOSE: "關閉",
OPEN: "開啟",
CLOSE_SECTION: "關閉區段",
OPEN_SECTION: "開啟區段",
NO: "否",
CONFIRM: "確認",
CLEAR_EXCEPTIONS_CONFIRM: "您正在重新排定重複會議的多個實例。這些實例將全部轉移相同的相對時間量，包括先前重新排定的實例。請務必檢閱這些變更的效果。\n\n確定要繼續嗎？",

DAILY: "每日",
WEEKLY: "每週",
BIWEEKLY: "雙週",
EVERY_X_WEEK: "每隔 ${0} 週",
MONTHLY: "每月",
MONTHLY_BY_DAY: "每月按日",
MONTHLY_BY_WEEKDAY: "每月按工作日",
YEARLY: "每年",
CUSTOM: "自訂",
NONE: "無",
REPEAT_NONE: "此文章不重複",
REPEAT_DAILY: "此文章每日重複",
REPEAT_WEEKLY: "此文章每週重複",
REPEAT_DAILY_SHORT: "每日",
REPEAT_WEEKLY_SHORT: "每週",
REPEAT_MONTHLY_SHORT: "每月",

REPEATS: "重複",
REPEATS_LABEL: "重複：",

REPEAT_FREQUENCY_ONEWEEK: "週",
REPEAT_FREQUENCY_TWOWEEKS: "2 週",
REPEAT_FREQUENCY_THREEWEEKS: "3 週",
REPEAT_FREQUENCY_FOURWEEKS: "4 週",
REPEAT_FREQUENCY_FIVEWEEKS: "5 週",

REPEAT_MONTHLY_ON_THIS_DATE: "在此日期：",
REPEAT_MONTHLY_ON_THIS_DAY: "在此日：",

DATE_OF_MONTH_1: "第 1",
DATE_OF_MONTH_2: "第 2",
DATE_OF_MONTH_3: "第 3",
DATE_OF_MONTH_4: "第 4",
DATE_OF_MONTH_5: "第 5",
DATE_OF_MONTH_6: "第 6",
DATE_OF_MONTH_7: "第 7",
DATE_OF_MONTH_8: "第 8",
DATE_OF_MONTH_9: "第 9",
DATE_OF_MONTH_10: "第 10",
DATE_OF_MONTH_11: "第 11",
DATE_OF_MONTH_12: "第 12",
DATE_OF_MONTH_13: "第 13",
DATE_OF_MONTH_14: "第 14",
DATE_OF_MONTH_15: "第 15",
DATE_OF_MONTH_16: "第 16",
DATE_OF_MONTH_17: "第 17",
DATE_OF_MONTH_18: "第 18",
DATE_OF_MONTH_19: "第 19",
DATE_OF_MONTH_20: "第 20",
DATE_OF_MONTH_21: "第 21",
DATE_OF_MONTH_22: "第 22",
DATE_OF_MONTH_23: "第 23",
DATE_OF_MONTH_24: "第 24",
DATE_OF_MONTH_25: "第 25",
DATE_OF_MONTH_26: "第 26",
DATE_OF_MONTH_27: "第 27",
DATE_OF_MONTH_28: "第 28",
DATE_OF_MONTH_29: "第 29",
DATE_OF_MONTH_30: "第 30",
DATE_OF_MONTH_31: "第 31",

First_WEEK_OF_MONTH:"第 1",
Second_WEEK_OF_MONTH:"第 2",
Third_WEEK_OF_MONTH:"第 3",
Fourth_WEEK_OF_MONTH:"第 4",
LAST_WEEK_OF_MONTH:"最後一個",

First_WEEK_OF_MONTH_FEMALE:"第 1", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"第 2",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"第 3",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"第 4",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"最後一個",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"第 1",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"第 2",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"第 3",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"第四",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"最後一個",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"選取星期幾",
SELECT_WEEK_OF_MONTH:"選取當月星期",
SELECT_DATE_OF_MONTH:"選取當月日期",
Fieldset_Event:"要建立或編輯事件的欄位",

MESSAGE_BY_DATE_SKIPPED : "將跳過未包含此日期的月份",

EVERY: "每隔：",
UNTIL: "直到：",
ON: "於：",

ADD_ANOTHER: "新增另一個",
REPEAT_ON: "重複於",

ADD_EVENT: "建立事件",
EDIT_EVENT: "編輯事件",

NOTIFY: "通知其他人員",
NOTIFY_TITLE: "通知其他人員",
NOTIFY_OK: "通知",
DELETE: "刪除",
EDIT: "編輯",
EDIT_LABEL: "編輯：",
EDIT_THIS_INSTANCE: "編輯此實例",
EDIT_THIS_SERIES: "編輯整個系列",
FOLLOW: "追蹤",
FOLLOW_THIS_INSTANCE: "追蹤此實例",
FOLLOW_THIS_SERIES: "追蹤整個系列",
UNFOLLOW: "停止追蹤",

RSVP: "將參加",
RSVP_THIS_INSTANCE: "參加此事件",
RSVP_THIS_SERIES: "參加整個系列",
UNRSVP: "將不參加",

START_TIME_AFTER_END: "事件開始時間必須在結束時間之前",
START_DAY_AFTER_UNTIL_DAY: "重複事件的開始時間不得在其重複截止日期之後",
DURATION_LARGER_THAN_24H: "事件持續時間不應該大於 24 小時。請改為建立重複事件。",
DESCRIPTION_LENGTH: '說明太長',
SUBJECT_LENGTH: '事件標題太長',
LOCATION_LENGTH: '位置太長',
IMAGE_URL_INVALID: '影像 URL 無效',
UNTIL_DATE: '請指定有效的事件結束日期',
NO_REPEAT_ON: '應該為重複事件至少選取一日',
START_DATE_IN_PAST: '事件開始於過去時間',

SUBJECT_INVALID: '事件標題必須有效',
START_DATE_INVALID: '開始日期必須有效',
START_TIME_INVALID: '開始時間必須有效',
END_DATE_INVALID: '結束日期必須有效',
END_TIME_INVALID: '結束時間必須有效',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: '未選取任何成員。請至少選取一名要通知的成員。',

NEXT_MONTH: "顯示下個月",
PREVIOUS_MONTH: "顯示上個月",
CALENDAR_SUMMARY: "具有待辦事項的每月行事曆",

SEND: "傳送",
MAP_ROLE: "成員具有下列的角色：",
READ_ACCESS: "讀者",
AUTHOR_ACCESS: "作者（建立及編輯其專屬事件）",
SAVE: "儲存",
PREF_FORM_TITLE: "編輯行事曆設定",
TAB_UPCOMING: "事件",
TAB_CALENDAR: "行事曆視圖",
SUMMARY: "摘要",
DETAILS: "詳細資料",
EVENT_TIME: "事件時間",
UPDATED: "更新者",
SORT_ASC: "遞增排序",
SORT_DESC: "遞減排序",
TODAY: "今天",
TOMORROW: "明天",
YESTERDAY: "昨天",
EVENT_NAME: "事件名稱",
SHOW_DETAILS: "顯示詳細資料",
SHOW_PASTEVENTS: "顯示過去事件",
SHOW_UPCOMINGEVENTS: "顯示即將發生的事件",
HIDE_DETAILS: "隱藏詳細資料",
SELECT_CHECKBOX: "按一下以選取",
UNSELECT_CHECKBOX: "按一下以取消選取",
NO_DESCRIPTION: "未提供任何說明",
DISPLAY: "顯示",
REPEATS_FLAG: "（重複）",
STR_VIEW: "視圖：",
DISP_CALENDAR: "行事曆網格",
DISP_LIST: "摘要清單",

GOTO_EDIT_INFO: "您需要遵循「社群動作」->「編輯社群」->「行事曆」來編輯喜好設定。",
VIEW_ALL_EVENTS: "檢視所有事件",
NO_EVENT_TODAY: "今天沒有事件",
ONE_EVENT_TODAY: "今天 1 個事件",
X_EVENTS_TODAY: "今天 ${0} 個事件",

OK: "確定",
UPCOMING_EVENTS: "即將發生的事件",
PICK_MEMBERS: "選取社群成員",
NOTIFICATION_MESSAGE: "訊息",
NOTIFY_OTHERS: "通知社群成員",
NOTIFY_DEFAULT_MESSAGE: "您好，我認為您可能會對此事件感到興趣。",
NOTIFY_ERROR: "通知人員時發生錯誤：${0}",
NOTIFY_SUCCESS: "已順利傳送通知。",
NOTIFY_ERROR_2: "已儲存您的事件，但通知其他人時發生錯誤：${0}",
INTERNAL_SERVER_ERR: "內部伺服器錯誤",
INTERNAL_SERVER_NOT_AVAILABLE: "顯示內容時發生錯誤。請聯絡系統管理員。",

ALT_WARNING_ICON: "警告圖示",
ALT_CONFIRM_ICON: "確認圖示",
ALT_ERROR_ICON: "錯誤圖示",
A11Y_WARNING_LABEL: "警告：",
A11Y_CONFIRM_LABEL: "確認：",
A11Y_ERROR_LABEL: "錯誤：",

TAB_ABOUT: "關於",
TAB_COMMENT: "評論 (${0})",
ADD_COMMENT: "新增評論...",
ENTER_COMMENT: "輸入評論：",
ENTER_COMMENT_ERROR: "請輸入您的評論，然後按一下「儲存」。如果您不再想留下評論，請按一下「取消」。",
COMMENT_META: "${0} 已對 ${1} 發表評論",
CONFIRM_DELETE_COMMENT: "確定要刪除評論嗎？",
NO_COMMENT: "沒有任何評論。",

EVENT_DELETE_ERROR: "無法刪除事件。該事件可能已遭刪除。請重新整理頁面，然後再試一次。",


TAB_ATTENDEE: "${0} 個參加者",
NO_ATTENDEE: "沒有與會者。",
NO_INSTANCE: "沒有即將發生的事件。",
NO_UPCOMING_FOLLOWED: "您未追蹤任何即將發生的事件。",
NO_UPCOMING_ATTENDED: "您未參加任何即將發生的事件。",
NO_UPCOMING_FOLLOWATTENDED: "您未追蹤或參加任何即將發生的事件。",

FOLLOWED_EVENTS_LABEL: "您正在追蹤的事件：",
ATTENDED_EVENTS_LABEL: "您正在計劃參加的事件：",
FOLLOWATTENDED_EVENTS_LABEL: "您正在追蹤並計劃參加的事件：",

PAGING_INFO: "${0} - ${1} 個（共 ${2} 個）",
PAGING_INFO_TITLE: "顯示項目 ${0} 至 ${1}（共 ${2} 個）",
PAGING_PREVIOUS: "上一頁",
PAGING_PREVIOUS_TITLE: "上一頁",
PAGING_NEXT: "下一頁",
PAGING_NEXT_TITLE: "下一頁",
PAGING_SHOW: "顯示",
PAGING_LABEL: "分頁",

PAGING_COMMENT_LABEL:"將評論分頁（頂端控制）",
PAGING_COMMENT_BOTTOM_LABEL:"將評論分頁（底端控制）",
PAGING_ATTENDEE_LABEL:"將參加人員分頁（頂端控制）",
PAGING_ATTENDEE_BOTTOM_LABEL:"將參加人員分頁（底端控制）",

PAGING_ITEMS: "項目",
PAGING_PAGE_TITLE: "每頁顯示 ${0} 個項目",
PAGING_PAGE_TITLE2: "第 ${0} 頁",
PAGING_PAGE_TITLE3: "按一下以每頁顯示 ${0} 個項目",
PAGING_JUMPTO: "跳至 ${0} / ${1} 頁", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "頁碼",
PAGEING_JUMP_LABEL:"變更此值將會重新整理頁面結果",

DETAIL_WHEN: "時機：${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "時間：${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "由 ${1} 進行 ${0}",
ABOUT_ADDED: "建立日期：",
ABOUT_UPDATED: "更新日期：",

WITH_TAGS: "具有標籤：",
TAGS_TITLE: "標籤",
TAGS_REMOVE_HINT: "從選取的過濾標籤中移除標籤 ${0}",

HELP: "說明",
CLOSE_HELP: "關閉說明",

TAGCLOUD_HELP: "標籤是一個關鍵字，您可以將其指派給社群事件以進行分類，也能更輕鬆地尋找社群事件。鍵入或按一下標籤，以查看與其相關聯的社群事件。熱門標籤在標籤雲中會以較大且更深的文字顯示。",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "載入中...",
NOT_AUTHORIZED: "您無權執行動作。",
STARTS:"開始：",
ENDS:"結束：",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} 的${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "標籤是指派給內容的關鍵字，以方便尋找。 標籤必須是以逗點或空格區隔的單字，如 payroll 或 human_resources。",
INVALID_CHAR_IN_TAG: "您輸入的標籤清單包含無效的字元「&」。請從標籤清單中移除這個字元。",

NO_UPCOMING_EVENTS_MSG_SHORT: "沒有即將發生的事件。",
NO_UPCOMING_EVENTS_MSG: "在此社群中沒有即將發生的事件。",
NO_PAST_EVENTS_MSG: "此社群中沒有過去的事件。",

OWNER: "擁有者",
MEMBER: "成員",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "事件動作",
EVENT_VIEWS_NAVIGATION: "事件視圖",

EVENTS_VIEW_TOOLBAR_LABEL: "事件動作",

ALLDAY_UPDATED_MSG_HINT: "已相應地更新事件開始時間及事件結束時間。",

EVENT_STARTTIME_LABEL: "事件開始時間",
EVENT_ENDTIME_LABEL: "事件結束時間",

REPEATS_ENABLE_DISABLE_HINT: "按一下以啟用或停用重複選項",
REPEATING_OPTIONS_HINT: "重複選項",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "輸入日期。範例：${0}",
ENTER_TIME_EXAMPLE: "輸入時間。範例：${0}",

REQUIRED: "必要",

COLLAPSED_SECTION: "收合的區段",
EXPANDED_SECTION: "展開的區段",

REPEATING_EVENTS_EDIT_TYPE_HELP: "只編輯此實例或編輯整個系列。編輯整個系列不會改寫您先前在此事件的單一實例上所做的變更。",

REPEATING_FREQUENCY: "重複頻率",
REPEATING_UNTIL: "重複截止時間",
REPEATING_ON: "重複於",

CALENDAR_PREF_SAVE_CONFIRM: "已儲存對行事曆所做的變更。",
HIDE_THIS_MESSAGE: "隱藏此訊息",

EVENT_OPEN_ERR_NOTFOUND: "無法開啟社群事件。可能原因：已刪除該事件。",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0}（時間：${1}，位置：${2}）。",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0}（時間：${1}）。",
LINK_OPEN_INFO: "${0}（時間：${1}，位置：${2}）。",
LINK_OPEN_INFO_NOLOCATION: "${0}（時間：${1}）。",
LINK_OPEN_IN_NEW_WINDOW:"按一下鏈結將在新視窗中開啟。",

WARNING_ICON: "警告圖示",

MENTION: {
	NOT_MEMBER_WARNING: "下列提及的人員將無法檢視訊息，因為他們不是社群的成員。",
	NOT_SAME_ORGANIZATION_WARNING: "下列提及的人員將看不到訊息，因為他們位於不同的組織中"
},
SELECT_ALL: "全選"
})
