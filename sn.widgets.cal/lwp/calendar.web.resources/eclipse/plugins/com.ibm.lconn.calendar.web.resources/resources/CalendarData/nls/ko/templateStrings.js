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
TITLE: "이벤트",

CREATE_BUTTON: "이벤트 작성",
CREATE_BUTTON_TOOLTIP: "선택한 요일에 새 이벤트를 작성합니다",
EDIT_BUTTON: "이벤트 편집",
EDIT_BUTTON_TOOLTIP: "선택한 이벤트를 편집합니다",
DELETE_BUTTON: "이벤트 삭제",
DELETE_BUTTON_TOOLTIP: "선택한 이벤트를 삭제합니다",
BACKTOCAL: "커뮤니티 이벤트로 돌아가기",
BACKTOCAL2: "커뮤니티 이벤트로 돌아가려면 클릭하십시오",
MORE_ACTIONS: "추가 조치",

DAY_VIEW_TOOLTIP: "1일 보기",
TWODAY_VIEW_TOOLTIP: "2일 보기",
FIVEDAY_VIEW_TOOLTIP: "5일 보기",
WEEK_VIEW_TOOLTIP: "주별 보기",
MONTH_VIEW_TOOLTIP: "월별 보기",

DAY_VIEW: "1일",
TWODAY_VIEW: "2일",
FIVEDAY_VIEW: "5일",
WEEK_VIEW: "주",
MONTH_VIEW: "월",

ICAL_FEED: "개인 일정관리에 추가",
ICAL_FEED_DIALOG_TITLE: "개인 일정관리에 추가",

ICAL_FEED_HINT: "다음 URL을 복사하여 일정관리 애플리케이션에 iCal 피드로 등록하십시오:",
ICAL_FEED_SUBSCRIBE_HINT: "HCL Notes, Microsoft Outlook 등의 다양한 애플리케이션에 HCL Connections 이벤트를 등록할 수 있습니다. 이 커뮤니티의 모든 이벤트를 등록하려면 다음 URL을 클릭하십시오. 일정관리 애플리케이션에 따라 해당 애플리케이션에 URL을 복사해야 할 수도 있습니다.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "HCL Notes, Microsoft Outlook 등의 다양한 애플리케이션에 HCL Connections 이벤트를 등록할 수 있습니다. 팔로우하거나 참석하는 모든 이벤트를 등록하려면 다음 URL을 클릭하십시오. 일정관리 애플리케이션에 따라 해당 애플리케이션에 URL을 복사해야 할 수도 있습니다.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "HCL Notes, Microsoft Outlook 등의 다양한 애플리케이션에 HCL Connections 이벤트를 등록할 수 있습니다. 팔로우하는 모든 이벤트를 등록하려면 다음 URL을 클릭하십시오. 일정관리 애플리케이션에 따라 해당 애플리케이션에 URL을 복사해야 할 수도 있습니다.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "HCL Notes, Microsoft Outlook 등의 다양한 애플리케이션에 HCL Connections 이벤트를 등록할 수 있습니다. 참석하는 모든 이벤트를 등록하려면 다음 URL을 클릭하십시오. 일정관리 애플리케이션에 따라 해당 애플리케이션에 URL을 복사해야 할 수도 있습니다.",
ICAL_FEED_HINT_POPUP: "마우스 오른쪽 단추를 클릭하고 이 URL을 복사한 다음, 일정관리 애플리케이션에 iCal 피드로 등록하십시오",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "아래 피드를 클릭하여 Notes 또는 Outlook 개인 일정관리에 커뮤니티 이벤트를 표시하십시오:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "방법:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Notes 일정관리에 커뮤니티 이벤트 추가",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Outlook에 커뮤니티 이벤트 추가",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Google 일정관리에 커뮤니티 이벤트 추가",

ICAL_FEED_EXPORT_ICS:	"일정관리(.ics)로 내보내기",

DELETE_CONFIRM_SINGLE: "이 이벤트를 삭제하시겠습니까?",
DELETE_CONFIRM_SERIES: "단일 인스턴스를 삭제하시겠습니까, 아니면 전체 시리즈를 삭제하시겠습니까?",
DELETE_INSTACE_OPTION: "이 인스턴스만 삭제",
DELETE_SERIES_OPTION: "전체 시리즈 삭제",
DELETE_DIALOG_BUTTON: "삭제",

FOLLOW_CONFIRM_SERIES: "단일 인스턴스를 관심 대상으로 등록하시겠습니까, 아니면 전체 시리즈를 관심 대상으로 등록하시겠습니까?",
FOLLOW_INSTACE_OPTION: "이 인스턴스만 관심 대상으로 등록",
FOLLOW_SERIES_OPTION: "전체 시리즈를 관심 대상으로 등록",
FOLLOW_DIALOG_BUTTON: "관심 대상으로 등록",
FOLLOW_CONFIRM: "이 이벤트를 관심 대상으로 등록했습니다. <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal 피드</a>를 통해 일정관리 애플리케이션에 등록하십시오.",
FOLLOW_ENTIRESERIES_CONFIRM: "이 이벤트 시리즈를 관심 대상으로 등록했습니다. <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal 피드</a>를 통해 일정관리 애플리케이션에 등록하십시오.",
UNFOLLOW_CONFIRM: "이 이벤트를 관심 대상에서 제거했습니다.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "이 이벤트 시리즈를 관심 대상에서 제거했습니다.",

RSVP_CONFIRM_SERIES: "단일 인스턴스에 참석하시겠습니까, 아니면 전체 시리즈에 참석하시겠습니까?",
RSVP_INSTACE_OPTION: "이 인스턴스만 참석",
RSVP_SERIES_OPTION: "전체 시리즈에 참석",
RSVP_DIALOG_BUTTON: "참석",
RSVP_CONFIRM: "이 이벤트에 참석하고 있습니다. <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal 피드</a>를 통해 일정관리 애플리케이션에 등록하십시오.",
RSVP_ENTIRESERIES_CONFIRM: "이 이벤트 시리즈에 참석하고 있습니다. <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal 피드</a>를 통해 일정관리 애플리케이션에 등록하십시오.",
UNRSVP_CONFIRM: "이 이벤트 참석을 중지했습니다.",
UNRSVP_ENTIRESERIES_CONFIRM: "이 이벤트 시리즈 참석을 중지했습니다.",


SU: "일",
MO: "월",
TU: "화",
WE: "수",
TH: "목",
FR: "금",
SA: "토",
SU_FULL: "일요일",
MO_FULL: "월요일",
TU_FULL: "화요일",
WE_FULL: "수요일",
TH_FULL: "목요일",
FR_FULL: "금요일",
SA_FULL: "토요일",

DAYS: "일",
WEEKS: "주",
MONTHS: "월",
YEARS: "년",
DAY: "일",
WEEK: "주",
MONTH: "월",
YEAR: "년",

ON_THE_MONTHLY_DAY: "그 달의 ||에.",
ON_THE_MONTHLY_WEEKDAY: "그 달의 ||에.",

REMOVE: "제거",

ERROR: "오류",
ERROR_HEADER: "다음을 확인하십시오",

WARNING: "경고",
WARNING_HEADER: "경고",

CREATED_BY: "${0}이(가) 작성",
CREATED_ON: "${0}에 작성됨",
UPDATED_ON: "${0}에 업데이트됨",
CREATED_ON_TODAY_OR_TOMORROW: "${0}에 작성됨",
UPDATED_ON_TODAY_OR_TOMORROW: "${0}에 업데이트됨",
WHEN: "시기:",
REPEATS: "반복:",
DATE: "날짜",
ON: "날짜:",
ALL_DAY_EVENT:"종일 이벤트",
ALL_DAY:"종일",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, 종일",
RECURRENCE: "반복",
SUBJECT: "제목:",
EVENT_TITLE: "이벤트 제목:",
TAGS: "태그:",
DESCRIPTION: "설명:",
LOCATION: "위치:",
IMAGE_URL: "이미지 URL:",
SUBMIT: "제출",
SAVE: "저장",
CANCEL: "취소",
SAVECLOSE: "저장 후 닫기",
DELETE: "인스턴스 삭제",
FROM: "시작",
TO: "종료",
CLOSE: "닫기",
OPEN: "열기",
CLOSE_SECTION: "섹션 닫기",
OPEN_SECTION: "섹션 열기",
NO: "아니오",
CONFIRM: "확인",
CLEAR_EXCEPTIONS_CONFIRM: "여러 개의 반복 미팅 인스턴스 스케줄을 변경합니다. 이전에 스케줄이 변경된 인스턴스를 포함하여 모든 인스턴스가 동일한 상대 시간만큼 이동됩니다. 변경사항의 영향을 검토하십시오.\n\n계속하시겠습니까?",

DAILY: "매일",
WEEKLY: "매주",
BIWEEKLY: "격주",
EVERY_X_WEEK: "${0}주마다",
MONTHLY: "매월",
MONTHLY_BY_DAY: "매월 일별",
MONTHLY_BY_WEEKDAY: "매월 평일별",
YEARLY: "매년",
CUSTOM: "사용자 정의",
NONE: "없음",
REPEAT_NONE: "이 항목은 반복되지 않습니다",
REPEAT_DAILY: "이 항목은 매일 반복됩니다",
REPEAT_WEEKLY: "이 항목은 매주 반복됩니다",
REPEAT_DAILY_SHORT: "매일",
REPEAT_WEEKLY_SHORT: "매주",
REPEAT_MONTHLY_SHORT: "매월",

REPEATS: "반복",
REPEATS_LABEL: "반복:",

REPEAT_FREQUENCY_ONEWEEK: "주",
REPEAT_FREQUENCY_TWOWEEKS: "2주",
REPEAT_FREQUENCY_THREEWEEKS: "3주",
REPEAT_FREQUENCY_FOURWEEKS: "4주",
REPEAT_FREQUENCY_FIVEWEEKS: "5주",

REPEAT_MONTHLY_ON_THIS_DATE: "날짜:",
REPEAT_MONTHLY_ON_THIS_DAY: "요일:",

DATE_OF_MONTH_1: "1일",
DATE_OF_MONTH_2: "2일",
DATE_OF_MONTH_3: "3일",
DATE_OF_MONTH_4: "4일",
DATE_OF_MONTH_5: "5일",
DATE_OF_MONTH_6: "6일",
DATE_OF_MONTH_7: "7일",
DATE_OF_MONTH_8: "8일",
DATE_OF_MONTH_9: "9일",
DATE_OF_MONTH_10: "10일",
DATE_OF_MONTH_11: "11일",
DATE_OF_MONTH_12: "12일",
DATE_OF_MONTH_13: "13일",
DATE_OF_MONTH_14: "14일",
DATE_OF_MONTH_15: "15일",
DATE_OF_MONTH_16: "16일",
DATE_OF_MONTH_17: "17일",
DATE_OF_MONTH_18: "18일",
DATE_OF_MONTH_19: "19일",
DATE_OF_MONTH_20: "20일",
DATE_OF_MONTH_21: "21일",
DATE_OF_MONTH_22: "22일",
DATE_OF_MONTH_23: "23일",
DATE_OF_MONTH_24: "24일",
DATE_OF_MONTH_25: "25일",
DATE_OF_MONTH_26: "26일",
DATE_OF_MONTH_27: "27일",
DATE_OF_MONTH_28: "28일",
DATE_OF_MONTH_29: "29일",
DATE_OF_MONTH_30: "30일",
DATE_OF_MONTH_31: "31일",

First_WEEK_OF_MONTH:"1일",
Second_WEEK_OF_MONTH:"2일",
Third_WEEK_OF_MONTH:"3일",
Fourth_WEEK_OF_MONTH:"4일",
LAST_WEEK_OF_MONTH:"마지막 날",

First_WEEK_OF_MONTH_FEMALE:"1일", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"2일",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"3일",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"4일",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"마지막 날",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"1일",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"2일",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"3일",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"4일",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"마지막 날",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"요일 선택",
SELECT_WEEK_OF_MONTH:"월간 주 선택",
SELECT_DATE_OF_MONTH:"날짜 선택",
Fieldset_Event:"이벤트를 작성하거나 편집할 필드",

MESSAGE_BY_DATE_SKIPPED : "이 날짜가 없는 월은 건너뜁니다",

EVERY: "매:",
UNTIL: "종료:",
ON: "날짜:",

ADD_ANOTHER: "기타 추가",
REPEAT_ON: "반복 날짜",

ADD_EVENT: "이벤트 작성",
EDIT_EVENT: "이벤트 편집",

NOTIFY: "다른 사용자에게 알림",
NOTIFY_TITLE: "다른 사용자에게 알림",
NOTIFY_OK: "알림",
DELETE: "삭제",
EDIT: "편집",
EDIT_LABEL: "편집:",
EDIT_THIS_INSTANCE: "이 인스턴스 편집",
EDIT_THIS_SERIES: "전체 시리즈 편집",
FOLLOW: "관심 대상으로 등록",
FOLLOW_THIS_INSTANCE: "이 인스턴스를 관심 대상으로 등록",
FOLLOW_THIS_SERIES: "전체 시리즈를 관심 대상으로 등록",
UNFOLLOW: "관심 대상에서 제거",

RSVP: "참석 예정",
RSVP_THIS_INSTANCE: "이 인스턴스에 참석",
RSVP_THIS_SERIES: "전체 시리즈에 참석",
UNRSVP: "불참 예정",

START_TIME_AFTER_END: "이벤트 시작 시간은 종료 시간보다 이전이어야 합니다",
START_DAY_AFTER_UNTIL_DAY: "반복 이벤트 시작 날짜는 반복 종료 날짜보다 이후일 수 없습니다",
DURATION_LARGER_THAN_24H: "이벤트 지속 기간은 24시간 이내여야 합니다. 대신 반복 이벤트를 작성하십시오.",
DESCRIPTION_LENGTH: '설명이 너무 깁니다',
SUBJECT_LENGTH: '이벤트 제목이 너무 깁니다',
LOCATION_LENGTH: '위치가 너무 깁니다',
IMAGE_URL_INVALID: '이미지 URL이 유효하지 않습니다',
UNTIL_DATE: '유효한 이벤트 종료 날짜를 지정하십시오',
NO_REPEAT_ON: '반복 이벤트에 대해 최소한 하루를 선택해야 합니다',
START_DATE_IN_PAST: '이벤트 시작 시간이 과거 시간입니다',

SUBJECT_INVALID: '이벤트 제목이 유효해야 합니다',
START_DATE_INVALID: '시작 날짜가 유효해야 합니다',
START_TIME_INVALID: '시작 시간이 유효해야 합니다',
END_DATE_INVALID: '종료 날짜가 유효해야 합니다',
END_TIME_INVALID: '종료 시간이 유효해야 합니다',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: '회원을 선택하지 않았습니다. 알림을 받을 회원을 한 명 이상 선택하십시오.',

NEXT_MONTH: "다음 월 표시",
PREVIOUS_MONTH: "이전 월 표시",
CALENDAR_SUMMARY: "작업 항목이 있는 월별 일정관리",

SEND: "발송",
MAP_ROLE: "커뮤니티 회원의 기본 역할:",
READ_ACCESS: "독자",
AUTHOR_ACCESS: "작성자(본인 소유의 이벤트 작성 및 편집)",
SAVE: "저장",
PREF_FORM_TITLE: "일정관리 설정 편집",
TAB_UPCOMING: "이벤트",
TAB_CALENDAR: "일정관리 보기",
SUMMARY: "요약",
DETAILS: "세부사항",
EVENT_TIME: "이벤트 시간",
UPDATED: "업데이트한 사용자",
SORT_ASC: "오름차순 정렬",
SORT_DESC: "내림차순 정렬",
TODAY: "오늘",
TOMORROW: "내일",
YESTERDAY: "어제",
EVENT_NAME: "이벤트 이름",
SHOW_DETAILS: "세부사항 표시",
SHOW_PASTEVENTS: "과거 이벤트 표시",
SHOW_UPCOMINGEVENTS: "미래 이벤트 표시",
HIDE_DETAILS: "세부사항 숨기기",
SELECT_CHECKBOX: "클릭하여 선택",
UNSELECT_CHECKBOX: "클릭하여 선택 취소",
NO_DESCRIPTION: "설명이 제공되지 않음",
DISPLAY: "표시 방식",
REPEATS_FLAG: "(반복)",
STR_VIEW: "보기:",
DISP_CALENDAR: "일정관리 그리드",
DISP_LIST: "요약 목록",

GOTO_EDIT_INFO: "커뮤니티 조치 -> 커뮤니티 편집 -> 일정관리로 이동하여 환경 설정을 편집해야 합니다.",
VIEW_ALL_EVENTS: "모든 이벤트 보기",
NO_EVENT_TODAY: "오늘 이벤트 없음",
ONE_EVENT_TODAY: "오늘 이벤트 1개",
X_EVENTS_TODAY: "오늘 이벤트 ${0}개",

OK: "확인",
UPCOMING_EVENTS: "미래 이벤트",
PICK_MEMBERS: "커뮤니티 회원 선택",
NOTIFICATION_MESSAGE: "메시지",
NOTIFY_OTHERS: "커뮤니티 회원에게 알림",
NOTIFY_DEFAULT_MESSAGE: "안녕하세요. 흥미로운 이벤트 정보를 공유하고자 합니다.",
NOTIFY_ERROR: "사용자에게 알리는 중에 오류가 발생함: ${0}",
NOTIFY_SUCCESS: "알림이 발송되었습니다.",
NOTIFY_ERROR_2: "이벤트가 저장되었지만 다른 사용자에게 알리는 중에 오류가 발생함: ${0}",
INTERNAL_SERVER_ERR: "내부 서버 오류",
INTERNAL_SERVER_NOT_AVAILABLE: "컨텐츠를 표시하는 중에 오류가 발생했습니다. 시스템 관리자에게 문의하십시오.",

ALT_WARNING_ICON: "경고 아이콘",
ALT_CONFIRM_ICON: "확인 아이콘",
ALT_ERROR_ICON: "오류 아이콘",
A11Y_WARNING_LABEL: "경고:",
A11Y_CONFIRM_LABEL: "확인:",
A11Y_ERROR_LABEL: "오류:",

TAB_ABOUT: "파일 정보",
TAB_COMMENT: "댓글(${0})",
ADD_COMMENT: "댓글 추가...",
ENTER_COMMENT: "댓글 입력:",
ENTER_COMMENT_ERROR: "댓글을 입력하고 '저장'을 클릭하십시오. 댓글을 더 이상 남기지 않으려면 '취소'를 클릭하십시오.",
COMMENT_META: "${0} 님이 ${1}에 댓글을 작성함",
CONFIRM_DELETE_COMMENT: "댓글을 삭제하시겠습니까?",
NO_COMMENT: "댓글이 없습니다.",

EVENT_DELETE_ERROR: "이벤트를 삭제하지 못했습니다. 이벤트가 삭제되었을 수 있습니다. 페이지를 새로 고친 후 다시 시도하십시오.",


TAB_ATTENDEE: "${0}명 참석 중",
NO_ATTENDEE: "참석자가 없습니다.",
NO_INSTANCE: "미래 이벤트가 없습니다.",
NO_UPCOMING_FOLLOWED: "관심 대상으로 등록한 미래 이벤트가 없습니다.",
NO_UPCOMING_ATTENDED: "참석 예정인 미래 이벤트가 없습니다.",
NO_UPCOMING_FOLLOWATTENDED: "관심 대상으로 등록했거나 참석 예정인 미래 이벤트가 없습니다.",

FOLLOWED_EVENTS_LABEL: "관심 대상으로 등록한 이벤트:",
ATTENDED_EVENTS_LABEL: "참석 예정인 이벤트:",
FOLLOWATTENDED_EVENTS_LABEL: "관심 대상으로 등록했거나 참석 예정인 이벤트:",

PAGING_INFO: "${0} - ${1}/${2}",
PAGING_INFO_TITLE: "${0}~${1}/${2} 항목 표시",
PAGING_PREVIOUS: "이전",
PAGING_PREVIOUS_TITLE: "이전 페이지",
PAGING_NEXT: "다음",
PAGING_NEXT_TITLE: "다음 페이지",
PAGING_SHOW: "표시",
PAGING_LABEL: "페이징",

PAGING_COMMENT_LABEL:"댓글 페이징(상단 컨트롤)",
PAGING_COMMENT_BOTTOM_LABEL:"댓글 페이징(하단 컨트롤)",
PAGING_ATTENDEE_LABEL:"참석자 페이징(상단 컨트롤)",
PAGING_ATTENDEE_BOTTOM_LABEL:"참석자 페이징(하단 컨트롤)",

PAGING_ITEMS: "항목",
PAGING_PAGE_TITLE: "페이지당 ${0}개 항목 표시",
PAGING_PAGE_TITLE2: "${0} 페이지",
PAGING_PAGE_TITLE3: "페이지당 ${0}개 항목을 표시하려면 클릭하십시오",
PAGING_JUMPTO: "페이지 이동: ${0}/${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "페이지 번호",
PAGEING_JUMP_LABEL:"값을 변경하면 페이지 결과가 새로 고쳐집니다.",

DETAIL_WHEN: "날짜: ${1} ${0}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "시간: ${0}~${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0}(${1})",
ABOUT_ADDED: "작성한 날짜:",
ABOUT_UPDATED: "업데이트 날짜:",

WITH_TAGS: "태그:",
TAGS_TITLE: "태그",
TAGS_REMOVE_HINT: "선택한 필터 태그에서 ${0} 태그를 제거합니다",

HELP: "도움말",
CLOSE_HELP: "도움말 닫기",

TAGCLOUD_HELP: "태그는 커뮤니티 이벤트를 분류하고 쉽게 검색할 수 있도록 만들기 위해 커뮤니티 이벤트에 지정하는 키워드입니다. 연관된 커뮤니티 이벤트를 보려면 태그를 입력하거나 클릭하십시오. 인기 있는 태그는 태그 클라우드에서 더 크고 어두운 텍스트로 표시됩니다.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "로드 중...",
NOT_AUTHORIZED: "조치를 수행할 수 있는 권한이 없습니다.",
STARTS:"시작:",
ENDS:"종료:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "태그는 컨텐츠에 지정한 키워드로서 그 대상을 분류하여 찾기 쉽게 해줍니다. 태그는 급여 또는 인적_자원과 같은 한 단어여야 하며 각 태그는 쉼표 또는 공백으로 구분합니다.",
INVALID_CHAR_IN_TAG: "입력한 태그 목록에 올바르지 않은 문자('&')가 포함되어 있습니다. 태그 목록에서 이 문자를 제거하십시오.",

NO_UPCOMING_EVENTS_MSG_SHORT: "미래 이벤트가 없습니다.",
NO_UPCOMING_EVENTS_MSG: "이 커뮤니티에는 미래 이벤트가 없습니다.",
NO_PAST_EVENTS_MSG: "이 커뮤니티에는 과거 이벤트가 없습니다.",

OWNER: "소유자",
MEMBER: "회원",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "이벤트 조치",
EVENT_VIEWS_NAVIGATION: "이벤트 보기",

EVENTS_VIEW_TOOLBAR_LABEL: "이벤트 조치",

ALLDAY_UPDATED_MSG_HINT: "이벤트 시작 시간과 이벤트 종료 시간이 적절하게 업데이트되었습니다.",

EVENT_STARTTIME_LABEL: "이벤트 시작 시간",
EVENT_ENDTIME_LABEL: "이벤트 종료 시간",

REPEATS_ENABLE_DISABLE_HINT: "반복 옵션을 활성화하거나 비활성화하려면 클릭하십시오",
REPEATING_OPTIONS_HINT: "반복 옵션",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "날짜를 입력하십시오. 예: ${0}",
ENTER_TIME_EXAMPLE: "시간을 입력하십시오. 예: ${0}",

REQUIRED: "필수",

COLLAPSED_SECTION: "접혀진 섹션",
EXPANDED_SECTION: "펼쳐진 섹션",

REPEATING_EVENTS_EDIT_TYPE_HELP: "이 인스턴스만 편집하거나 전체 시리즈를 편집하십시오. 전체 시리즈를 편집하는 경우 이 이벤트의 단일 인스턴스에서 이전에 변경한 사항을 겹쳐쓰지 않습니다.",

REPEATING_FREQUENCY: "반복 빈도",
REPEATING_UNTIL: "반복 종료",
REPEATING_ON: "반복 날짜",

CALENDAR_PREF_SAVE_CONFIRM: "일정관리 변경사항이 저장되었습니다.",
HIDE_THIS_MESSAGE: "이 메시지 숨기기",

EVENT_OPEN_ERR_NOTFOUND: "커뮤니티 이벤트를 열지 못했습니다. 가능한 원인: 이벤트가 이미 삭제되었습니다.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0}(시간:${1}, 위치:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0}(시간:${1}).",
LINK_OPEN_INFO: "${0}(시간:${1}, 위치:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0}(시간:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"링크를 클릭하면 새 창이 열립니다.",

WARNING_ICON: "경고 아이콘",

MENTION: {
	NOT_MEMBER_WARNING: "멘션된 다음 사용자는 커뮤니티 회원이 아니기 때문에 메시지를 볼 수 없습니다.",
	NOT_SAME_ORGANIZATION_WARNING: "멘션된 다음 사용자는 다른 조직에 속해 있기 때문에 메시지를 볼 수 없습니다"
},
SELECT_ALL: "모두 선택"
})
