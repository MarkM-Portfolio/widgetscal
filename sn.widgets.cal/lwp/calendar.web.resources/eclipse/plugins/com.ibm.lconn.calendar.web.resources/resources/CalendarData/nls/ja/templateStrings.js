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
TITLE: "イベント",

CREATE_BUTTON: "イベントを作成する",
CREATE_BUTTON_TOOLTIP: "選択した日に新しいイベントを作成します",
EDIT_BUTTON: "イベントの編集",
EDIT_BUTTON_TOOLTIP: "選択したイベントを編集する",
DELETE_BUTTON: "イベントの削除",
DELETE_BUTTON_TOOLTIP: "選択したイベントを削除する",
BACKTOCAL: "コミュニティー・イベントに戻る",
BACKTOCAL2: "クリックしてコミュニティー・イベントに戻ります",
MORE_ACTIONS: "他のアクション",

DAY_VIEW_TOOLTIP: "1 日のビュー",
TWODAY_VIEW_TOOLTIP: "2 日のビュー",
FIVEDAY_VIEW_TOOLTIP: "5 日のビュー",
WEEK_VIEW_TOOLTIP: "週間ビュー",
MONTH_VIEW_TOOLTIP: "月間ビュー",

DAY_VIEW: "1 日",
TWODAY_VIEW: "2 日",
FIVEDAY_VIEW: "5 日",
WEEK_VIEW: "1 週間",
MONTH_VIEW: "月",

ICAL_FEED: "個人カレンダーに追加",
ICAL_FEED_DIALOG_TITLE: "個人カレンダーに追加",

ICAL_FEED_HINT: "この URL をコピーして、カレンダー・アプリケーションで iCal フィードとして購読します:",
ICAL_FEED_SUBSCRIBE_HINT: "HCL Notes および Microsoft Outlook などの多くのアプリケーションで、HCL Connections イベントを購読できます。次の URL をクリックして、このコミュニティーのすべてのイベントを購読します。カレンダー・アプリケーションによっては、URL をそのアプリケーションにコピーする必要がある場合があります。",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "HCL Notes および Microsoft Outlook などの多くのアプリケーションで、HCL Connections イベントを購読できます。次の URL をクリックして、フォローしているまたは参加しているのすべてのイベントを購読します。カレンダー・アプリケーションによっては、URL をそのアプリケーションにコピーする必要がある場合があります。",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "HCL Notes および Microsoft Outlook などの多くのアプリケーションで、HCL Connections イベントを購読できます。次の URL をクリックして、フォローしているすべてのイベントを購読します。カレンダー・アプリケーションによっては、URL をそのアプリケーションにコピーする必要がある場合があります。",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "HCL Notes および Microsoft Outlook などの多くのアプリケーションで、HCL Connections イベントを購読できます。次の URL をクリックして、参加しているすべてのイベントを購読します。カレンダー・アプリケーションによっては、URL をそのアプリケーションにコピーする必要がある場合があります。",
ICAL_FEED_HINT_POPUP: "この URL を右クリックしてコピーし、iCal フィードとしてカレンダー・アプリケーションで購読します",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "以下のフィードをクリックして、コミュニティー・イベントを Notes または Outlook 個人カレンダーに表示させます。",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "方法:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "コミュニティー・イベントを Notes Calendar に追加",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "コミュニティー・イベントを Outlook に追加",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "コミュニティー・イベントを Google Calendar に追加",

ICAL_FEED_EXPORT_ICS:	"カレンダーにエクスポート (.ics)",

DELETE_CONFIRM_SINGLE: "このイベントを削除しますか?",
DELETE_CONFIRM_SERIES: "1 つのインスタンスを削除するか、または全シリーズを削除しますか?",
DELETE_INSTACE_OPTION: "このインスタンスのみ削除",
DELETE_SERIES_OPTION: "全シリーズを削除",
DELETE_DIALOG_BUTTON: "削除",

FOLLOW_CONFIRM_SERIES: "1 つのインスタンスをフォローするか、または全シリーズをフォローしますか?",
FOLLOW_INSTACE_OPTION: "このインスタンスのみをフォロー",
FOLLOW_SERIES_OPTION: "全シリーズをフォロー",
FOLLOW_DIALOG_BUTTON: "フォロー",
FOLLOW_CONFIRM: "このイベントをフォローしました。<a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal フィード</a>を使用して、カレンダー・アプリケーションで購読します。",
FOLLOW_ENTIRESERIES_CONFIRM: "このイベント・シリーズをフォローしました。<a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal フィード</a>を使用して、カレンダー・アプリケーションで購読します。",
UNFOLLOW_CONFIRM: "このイベントのフォローを停止しました。",
UNFOLLOW_ENTIRESERIES_CONFIRM: "このイベント・シリーズのフォローを停止しました。",

RSVP_CONFIRM_SERIES: "1 つのインスタンスに参加するか、または全シリーズに参加しますか?",
RSVP_INSTACE_OPTION: "このインスタンスのみに参加",
RSVP_SERIES_OPTION: "全シリーズに参加",
RSVP_DIALOG_BUTTON: "参加",
RSVP_CONFIRM: "このイベントに参加しています。<a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal フィード</a>を使用して、カレンダー・アプリケーションで購読します。",
RSVP_ENTIRESERIES_CONFIRM: "このイベント・シリーズに参加しています。<a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal フィード</a>を使用して、カレンダー・アプリケーションで購読します。",
UNRSVP_CONFIRM: "このイベントへの参加を停止しました。",
UNRSVP_ENTIRESERIES_CONFIRM: "このイベント・シリーズへの参加を停止しました。",


SU: "日",
MO: "月",
TU: "火",
WE: "水",
TH: "木",
FR: "金",
SA: "土",
SU_FULL: "日曜日",
MO_FULL: "月曜日",
TU_FULL: "火曜日",
WE_FULL: "水曜日",
TH_FULL: "木曜日",
FR_FULL: "金曜日",
SA_FULL: "土曜日",

DAYS: "日",
WEEKS: "週",
MONTHS: "月",
YEARS: "年",
DAY: "日",
WEEK: "1 週間",
MONTH: "月",
YEAR: "年",

ON_THE_MONTHLY_DAY: "月の特定の || 。",
ON_THE_MONTHLY_WEEKDAY: "月の特定の || 。",

REMOVE: "削除",

ERROR: "エラー",
ERROR_HEADER: "以下を確認してください",

WARNING: "警告",
WARNING_HEADER: "警告",

CREATED_BY: "${0} が作成",
CREATED_ON: "作成日: ${0}",
UPDATED_ON: "更新日: ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "作成日: ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "更新日: ${0}",
WHEN: "条件:",
REPEATS: "繰り返し:",
DATE: "日付",
ON: "サーバー: ",
ALL_DAY_EVENT:"終日イベント",
ALL_DAY:"終日",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}、終日",
RECURRENCE: "繰り返し",
SUBJECT: "件名:",
EVENT_TITLE: "イベント・タイトル:",
TAGS: "タグ:",
DESCRIPTION: "説明:",
LOCATION: "場所:",
IMAGE_URL: "イメージ URL:",
SUBMIT: "送信",
SAVE: "保存",
CANCEL: "キャンセル",
SAVECLOSE: "保存して閉じる",
DELETE: "インスタンスの削除",
FROM: "送信元:",
TO: "終了:",
CLOSE: "閉じる",
OPEN: "開く",
CLOSE_SECTION: "セクションを閉じる",
OPEN_SECTION: "セクションを開く",
NO: "いいえ",
CONFIRM: "確認",
CLEAR_EXCEPTIONS_CONFIRM: "繰り返しミーティングの複数のインスタンスを再スケジュールしています。これらのインスタンスは、以前に再スケジュールされたものを含む、同じ相対時間だけ移動されます。必ずこれらの変更の影響を確認してください。\n\n続行しますか?",

DAILY: "毎日",
WEEKLY: "毎週",
BIWEEKLY: "隔週",
EVERY_X_WEEK: "${0} 週ごと",
MONTHLY: "毎月",
MONTHLY_BY_DAY: "毎月の特定の日",
MONTHLY_BY_WEEKDAY: "毎月の特定の平日",
YEARLY: "毎年",
CUSTOM: "カスタム",
NONE: "なし",
REPEAT_NONE: "このエントリーは繰り返しません",
REPEAT_DAILY: "このエントリーは毎日繰り返します",
REPEAT_WEEKLY: "このエントリーは毎週繰り返します",
REPEAT_DAILY_SHORT: "毎日",
REPEAT_WEEKLY_SHORT: "毎週",
REPEAT_MONTHLY_SHORT: "毎月",

REPEATS: "繰り返し",
REPEATS_LABEL: "繰り返し:",

REPEAT_FREQUENCY_ONEWEEK: "1 週間",
REPEAT_FREQUENCY_TWOWEEKS: "2 週間",
REPEAT_FREQUENCY_THREEWEEKS: "3 週間",
REPEAT_FREQUENCY_FOURWEEKS: "4 週間",
REPEAT_FREQUENCY_FIVEWEEKS: "5 週間",

REPEAT_MONTHLY_ON_THIS_DATE: "本日:",
REPEAT_MONTHLY_ON_THIS_DAY: "当日:",

DATE_OF_MONTH_1: "最初",
DATE_OF_MONTH_2: "2 番目",
DATE_OF_MONTH_3: "3 番目",
DATE_OF_MONTH_4: "4 番目",
DATE_OF_MONTH_5: "5 番目",
DATE_OF_MONTH_6: "6 番目",
DATE_OF_MONTH_7: "7 番目",
DATE_OF_MONTH_8: "8 番目",
DATE_OF_MONTH_9: "9 番目",
DATE_OF_MONTH_10: "10 番目",
DATE_OF_MONTH_11: "11 番目",
DATE_OF_MONTH_12: "12 番目",
DATE_OF_MONTH_13: "13 番目",
DATE_OF_MONTH_14: "14 番目",
DATE_OF_MONTH_15: "15 番目",
DATE_OF_MONTH_16: "16 番目",
DATE_OF_MONTH_17: "17 番目",
DATE_OF_MONTH_18: "18 番目",
DATE_OF_MONTH_19: "19 番目",
DATE_OF_MONTH_20: "20 番目",
DATE_OF_MONTH_21: "21 番目",
DATE_OF_MONTH_22: "22 番目",
DATE_OF_MONTH_23: "23 番目",
DATE_OF_MONTH_24: "24 番目",
DATE_OF_MONTH_25: "25 番目",
DATE_OF_MONTH_26: "26 番目",
DATE_OF_MONTH_27: "27 番目",
DATE_OF_MONTH_28: "28 番目",
DATE_OF_MONTH_29: "29 番目",
DATE_OF_MONTH_30: "30 番目",
DATE_OF_MONTH_31: "31 番目",

First_WEEK_OF_MONTH:"最初",
Second_WEEK_OF_MONTH:"2 番目",
Third_WEEK_OF_MONTH:"3 番目",
Fourth_WEEK_OF_MONTH:"4 番目",
LAST_WEEK_OF_MONTH:"最後",

First_WEEK_OF_MONTH_FEMALE:"最初", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"2 番目",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"3 番目",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"4 番目",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"最後",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"最初",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"2 番目",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"3 番目",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"4 番目",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"最後",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"曜日を選択",
SELECT_WEEK_OF_MONTH:"月の何週目かを選択",
SELECT_DATE_OF_MONTH:"月の特定の日を選択",
Fieldset_Event:"イベントを作成または編集するフィールド",

MESSAGE_BY_DATE_SKIPPED : "この日を含まない月はスキップされます",

EVERY: "間隔:",
UNTIL: "終了:",
ON: "サーバー: ",

ADD_ANOTHER: "その他を追加",
REPEAT_ON: "繰り返し",

ADD_EVENT: "イベントの作成",
EDIT_EVENT: "イベントの編集",

NOTIFY: "他のユーザーに通知",
NOTIFY_TITLE: "他のユーザーに通知",
NOTIFY_OK: "通知",
DELETE: "削除",
EDIT: "編集",
EDIT_LABEL: "編集:",
EDIT_THIS_INSTANCE: "このインスタンスの編集",
EDIT_THIS_SERIES: "全シリーズの編集",
FOLLOW: "フォロー",
FOLLOW_THIS_INSTANCE: "このインスタンスをフォロー",
FOLLOW_THIS_SERIES: "全シリーズをフォロー",
UNFOLLOW: "フォローの停止",

RSVP: "参加する",
RSVP_THIS_INSTANCE: "このインスタンスに参加",
RSVP_THIS_SERIES: "全シリーズに参加",
UNRSVP: "参加しない",

START_TIME_AFTER_END: "すべての開始時刻は終了時刻よりも前である必要があります",
START_DAY_AFTER_UNTIL_DAY: "繰り返しイベントの開始日は、その繰り返しの最終日よりも後にすることはできません",
DURATION_LARGER_THAN_24H: "イベントの期間は 24 時間よりも長くはできません。代わりに繰り返しイベントを作成してください。",
DESCRIPTION_LENGTH: '説明が長すぎます',
SUBJECT_LENGTH: 'イベント・タイトルが長すぎます',
LOCATION_LENGTH: '場所が長すぎます',
IMAGE_URL_INVALID: 'イメージ URL が無効です',
UNTIL_DATE: '有効なイベント終了日を指定してください',
NO_REPEAT_ON: '繰り返しイベントには少なくとも 1 日を選択する必要があります',
START_DATE_IN_PAST: 'イベントが過去に開始します',

SUBJECT_INVALID: 'イベント・タイトルは有効である必要があります',
START_DATE_INVALID: '開始日は有効である必要があります',
START_TIME_INVALID: '開始時刻は有効である必要があります',
END_DATE_INVALID: '終了日は有効である必要があります',
END_TIME_INVALID: '終了時刻は有効である必要があります',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'メンバーが選択されていません。通知するメンバーを少なくとも 1 人選択してください。',

NEXT_MONTH: "翌月の表示",
PREVIOUS_MONTH: "前月の表示",
CALENDAR_SUMMARY: "To Do 項目を記載した月次カレンダー",

SEND: "送信",
MAP_ROLE: "メンバーの役割:",
READ_ACCESS: "読者",
AUTHOR_ACCESS: "作成者 (自身のイベントを作成および編集)",
SAVE: "保存",
PREF_FORM_TITLE: "カレンダー設定の編集",
TAB_UPCOMING: "イベント",
TAB_CALENDAR: "カレンダーの表示",
SUMMARY: "要約",
DETAILS: "詳細",
EVENT_TIME: "イベント時間",
UPDATED: "更新完了",
SORT_ASC: "昇順にソート",
SORT_DESC: "降順にソート",
TODAY: "今日",
TOMORROW: "明日",
YESTERDAY: "昨日",
EVENT_NAME: "イベント名",
SHOW_DETAILS: "詳細の表示",
SHOW_PASTEVENTS: "過去のイベントを表示",
SHOW_UPCOMINGEVENTS: "近日中のイベントを表示",
HIDE_DETAILS: "詳細の非表示",
SELECT_CHECKBOX: "クリックして選択",
UNSELECT_CHECKBOX: "クリックして選択解除",
NO_DESCRIPTION: "説明が提供されていません",
DISPLAY: "表示",
REPEATS_FLAG: "(繰り返し)",
STR_VIEW: "ビュー:",
DISP_CALENDAR: "カレンダーのグリッド",
DISP_LIST: "要約リスト",

GOTO_EDIT_INFO: "設定を編集するには、「コミュニティー・アクション」->「コミュニティーの編集」->「カレンダー」の順に実行する必要があります。",
VIEW_ALL_EVENTS: "すべてのイベントを表示",
NO_EVENT_TODAY: "今日のイベントはありません",
ONE_EVENT_TODAY: "今日の 1 イベント",
X_EVENTS_TODAY: "今日の ${0} イベント",

OK: "OK",
UPCOMING_EVENTS: "近日中のイベント",
PICK_MEMBERS: "コミュニティー・メンバーを選択",
NOTIFICATION_MESSAGE: "メッセージ",
NOTIFY_OTHERS: "コミュニティー・メンバーに通知",
NOTIFY_DEFAULT_MESSAGE: "こんにちは。次のイベントに関心をお持ちではありませんか。",
NOTIFY_ERROR: "ユーザーへの通知中にエラーが発生しました: ${0}",
NOTIFY_SUCCESS: "通知は正常に送信されました。",
NOTIFY_ERROR_2: "イベントは保存されましたが、他ユーザーへの通知中にエラーが発生しました: ${0}",
INTERNAL_SERVER_ERR: "内部サーバー・エラー",
INTERNAL_SERVER_NOT_AVAILABLE: "コンテンツの表示中にエラーが発生しました。システム管理者にお問い合わせください。",

ALT_WARNING_ICON: "警告アイコン",
ALT_CONFIRM_ICON: "確認アイコン",
ALT_ERROR_ICON: "「エラー」アイコン",
A11Y_WARNING_LABEL: "警告:",
A11Y_CONFIRM_LABEL: "確認:",
A11Y_ERROR_LABEL: "エラー:",

TAB_ABOUT: "詳細情報",
TAB_COMMENT: "コメント (${0})",
ADD_COMMENT: "コメントの追加...",
ENTER_COMMENT: "コメントの入力:",
ENTER_COMMENT_ERROR: "コメントを入力して「保存」をクリックしてください。コメントを残さない場合は「キャンセル」をクリックしてください。",
COMMENT_META: "${0} は ${1} にコメントしました",
CONFIRM_DELETE_COMMENT: "コメントを削除しますか?",
NO_COMMENT: "コメントがありません。",

EVENT_DELETE_ERROR: "イベントの削除に失敗しました。イベントは削除された可能性があります。ページを更新してもう一度実行してください。",


TAB_ATTENDEE: "${0} 人が参加中",
NO_ATTENDEE: "参加者がいません。",
NO_INSTANCE: "近日中のイベントはありません。",
NO_UPCOMING_FOLLOWED: "フォローしている近日中のイベントはありません。",
NO_UPCOMING_ATTENDED: "近日中のイベントに参加していません。",
NO_UPCOMING_FOLLOWATTENDED: "近日中のイベントをフォローまたは参加していません。",

FOLLOWED_EVENTS_LABEL: "フォローしているイベントは次のとおりです:",
ATTENDED_EVENTS_LABEL: "参加を計画しているイベントは次のとおりです:",
FOLLOWATTENDED_EVENTS_LABEL: "フォローしている、および参加を計画しているイベント:",

PAGING_INFO: "${0} - ${1}/${2}",
PAGING_INFO_TITLE: "項目 ${0} を表示します (${1}/${2})",
PAGING_PREVIOUS: "前へ",
PAGING_PREVIOUS_TITLE: "前のページ",
PAGING_NEXT: "次へ",
PAGING_NEXT_TITLE: "次のページ",
PAGING_SHOW: "表示",
PAGING_LABEL: "ページング",

PAGING_COMMENT_LABEL:"コメントのページング・(先頭コントロール)",
PAGING_COMMENT_BOTTOM_LABEL:"コメントのページング・(末尾コントロール)",
PAGING_ATTENDEE_LABEL:"参加中のユーザーのページング (先頭コントロール)",
PAGING_ATTENDEE_BOTTOM_LABEL:"参加中のユーザーのページング (末尾コントロール)",

PAGING_ITEMS: "項目",
PAGING_PAGE_TITLE: "ページあたり ${0} 個の項目を表示",
PAGING_PAGE_TITLE2: "ページ ${0}",
PAGING_PAGE_TITLE3: "クリックしてページごとに ${0} 項目を表示",
PAGING_JUMPTO: "${0}/${1} ページへジャンプ", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "ページ番号",
PAGEING_JUMP_LABEL:"値を変更するとページの結果が最新表示されます",

DETAIL_WHEN: "いつ: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "時間: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} × ${1}",
ABOUT_ADDED: "作成日時:",
ABOUT_UPDATED: "更新日時:",

WITH_TAGS: "使用タグ:",
TAGS_TITLE: "タグ",
TAGS_REMOVE_HINT: "選択したフィルター・タグからタグ ${0} を削除",

HELP: "ヘルプ",
CLOSE_HELP: "ヘルプを閉じる",

TAGCLOUD_HELP: "タグは、コミュニティー・イベントを分類して見つけやすくするためにコミュニティー・イベントに割り当てるキーワードです。タグを入力するかクリックすると、そのタグに関連付けられたコミュニティー・イベントが表示されます。人気のタグは、タグ・クラウドに大きな濃いテキストで表示されます。",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "ロード中...",
NOT_AUTHORIZED: "このアクションの実行を許可されていません。",
STARTS:"開始:",
ENDS:"終了:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} の ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "タグは、コンテンツに割り当てるキーワードです。タグを割り当てると、コンテンツをより簡単に検索できます。 タグは単語 (payroll や human_resources など) で指定し、複数のタグを指定する場合は、コンマまたはスペースで区切ります。",
INVALID_CHAR_IN_TAG: "入力したタグ・リストに、無効な文字 '&' が含まれています。タグ・リストからこの文字を削除してください。",

NO_UPCOMING_EVENTS_MSG_SHORT: "近日中のイベントはありません。",
NO_UPCOMING_EVENTS_MSG: "このコミュニティーに近日中のイベントはありません。",
NO_PAST_EVENTS_MSG: "このコミュニティーに過去のイベントはありません。",

OWNER: "所有者",
MEMBER: "メンバー",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "イベント・アクション",
EVENT_VIEWS_NAVIGATION: "イベント・ビュー",

EVENTS_VIEW_TOOLBAR_LABEL: "イベント・アクション",

ALLDAY_UPDATED_MSG_HINT: "イベントの開始時刻と終了時刻は、それに応じて更新されました。",

EVENT_STARTTIME_LABEL: "イベントの開始時刻",
EVENT_ENDTIME_LABEL: "イベントの終了時刻",

REPEATS_ENABLE_DISABLE_HINT: "クリックして、繰り返しオプションを有効化または無効化します",
REPEATING_OPTIONS_HINT: "繰り返しオプション",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "日付を入力します。例: ${0}",
ENTER_TIME_EXAMPLE: "時刻を入力します。例: ${0}",

REQUIRED: "必須",

COLLAPSED_SECTION: "省略表示されたセクション",
EXPANDED_SECTION: "展開されたセクション",

REPEATING_EVENTS_EDIT_TYPE_HELP: "このインスタンスだけを編集するか、全シリーズを編集します。全シリーズの編集により、このイベントの 1 つのインスタンスで以前に行われた変更は上書きされません。",

REPEATING_FREQUENCY: "繰り返し頻度",
REPEATING_UNTIL: "繰返しの最後",
REPEATING_ON: "繰り返し",

CALENDAR_PREF_SAVE_CONFIRM: "カレンダーに対して行った変更が保存されました。",
HIDE_THIS_MESSAGE: "このメッセージの非表示",

EVENT_OPEN_ERR_NOTFOUND: "コミュニティー・イベントを開くことができません。考えられる原因: イベントが既に削除されています。",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (時刻:${1}、場所:${2})。",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (時刻:${1})。",
LINK_OPEN_INFO: "${0} (時刻:${1}、場所:${2})。",
LINK_OPEN_INFO_NOLOCATION: "${0} (時刻:${1})。",
LINK_OPEN_IN_NEW_WINDOW:"リンクをクリックすると新しいウィンドウで開きます。",

WARNING_ICON: "警告アイコン",

MENTION: {
	NOT_MEMBER_WARNING: "以下の言及されたユーザーはコミュニティーのメンバーではないため、メッセージを表示できません。",
	NOT_SAME_ORGANIZATION_WARNING: "以下の言及されたユーザーは別の組織に所属しているため、メッセージを表示できません"
},
SELECT_ALL: "すべて選択"
})
