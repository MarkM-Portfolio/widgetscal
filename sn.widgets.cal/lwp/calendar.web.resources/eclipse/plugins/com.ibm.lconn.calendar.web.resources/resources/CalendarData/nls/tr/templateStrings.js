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
TITLE: "Takvim Etkinlikleri",

CREATE_BUTTON: "Takvim Etkinliği Oluştur",
CREATE_BUTTON_TOOLTIP: "Seçilen günde yeni bir takvim etkinliği oluşturun",
EDIT_BUTTON: "Takvim Etkinliğini Düzenle",
EDIT_BUTTON_TOOLTIP: "Seçilen takvim etkinliğini düzenleyin",
DELETE_BUTTON: "Takvim Etkinliğini Sil",
DELETE_BUTTON_TOOLTIP: "Seçilen takvim etkinliğini silin",
BACKTOCAL: "Topluluk etkinliklerine dön",
BACKTOCAL2: "Topluluk etkinliklerine geri dönmek için tıklatın",
MORE_ACTIONS: "Diğer Eylemler",

DAY_VIEW_TOOLTIP: "Bir günlük görünüm",
TWODAY_VIEW_TOOLTIP: "İki günlük görünüm",
FIVEDAY_VIEW_TOOLTIP: "Beş günlük görünüm",
WEEK_VIEW_TOOLTIP: "Hafta görünümü",
MONTH_VIEW_TOOLTIP: "Ay görünümü",

DAY_VIEW: "Bir Gün",
TWODAY_VIEW: "İki Gün",
FIVEDAY_VIEW: "Beş Gün",
WEEK_VIEW: "Hafta",
MONTH_VIEW: "Ay",

ICAL_FEED: "Kişisel Takvime Ekle",
ICAL_FEED_DIALOG_TITLE: "Kişisel Takvime Ekle",

ICAL_FEED_HINT: "Bu URL'yi kopyalayın ve takvim uygulamanıza bir iCal özet akışı olarak abone yapın:",
ICAL_FEED_SUBSCRIBE_HINT: "HCL Connections takvim etkinliklerinize, HCL Notes ve Microsoft Outlook gibi pek çok uygulamadan abone olabilirsiniz. Bu topluluk için tüm takvim etkinlerine abone olmak için takip eden URL'yi tıklatın. Takvim uygulamanıza bağlı olarak URL'yi uygulamaya kopyalamanız gerekebilir.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "HCL Connections takvim etkinliklerinize, HCL Notes ve Microsoft Outlook gibi pek çok uygulamadan abone olabilirsiniz. Takip ettiğiniz veya katıldığınız tüm takvim etkinlerine abone olmak için takip eden URL'yi tıklatın. Takvim uygulamanıza bağlı olarak URL'yi uygulamaya kopyalamanız gerekebilir.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "HCL Connections takvim etkinliklerinize, HCL Notes ve Microsoft Outlook gibi pek çok uygulamadan abone olabilirsiniz. Takip ettiğiniz tüm takvim etkinlerine abone olmak için takip eden URL'yi tıklatın. Takvim uygulamanıza bağlı olarak URL'yi uygulamaya kopyalamanız gerekebilir.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "HCL Connections takvim etkinliklerinize, HCL Notes ve Microsoft Outlook gibi pek çok uygulamadan abone olabilirsiniz. Katıldığınız tüm takvim etkinlerine abone olmak için takip eden URL'yi tıklatın. Takvim uygulamanıza bağlı olarak URL'yi uygulamaya kopyalamanız gerekebilir.",
ICAL_FEED_HINT_POPUP: "Bu URL'yi sağ tıklatın ve kopyalayın, bunu takvim uygulamanıza bir iCal özet akışı olarak abone yapın:",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Aşağıdaki özet akışını tıklatarak, topluluk etkinliklerinin Notes veya Outlook kişisel takviminizde görüntülenmesini sağlayın:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Nasıl yapılır:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Topluluk etkinliklerini Notes Takvim uygulamasına ekleme",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Topluluk etkinliklerini Outlook uygulamasına ekleme",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Topluluk etkinliklerini Google Calendar uygulamasına ekleme",

ICAL_FEED_EXPORT_ICS:	"Takvime (.ics) aktar",

DELETE_CONFIRM_SINGLE: "Bu takvim etkinliğini silmek istediğinizden emin misiniz?",
DELETE_CONFIRM_SERIES: "Tek bir örnek mi, yoksa dizinin tamamı mı silinsin?",
DELETE_INSTACE_OPTION: "Yalnızca bu örneği sil",
DELETE_SERIES_OPTION: "Dizinin tamamını sil",
DELETE_DIALOG_BUTTON: "Sil",

FOLLOW_CONFIRM_SERIES: "Tek bir örnek mi, yoksa dizinin tamamı mı izlensin?",
FOLLOW_INSTACE_OPTION: "Yalnızca bu örneği izle",
FOLLOW_SERIES_OPTION: "Dizinin tamamını izle",
FOLLOW_DIALOG_BUTTON: "İzle",
FOLLOW_CONFIRM: "Bu takvim etkinliğini izlemeye başladınız. <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal özet akışı</a> aracılığıyla bunu takvim uygulamanıza abone yapın.",
FOLLOW_ENTIRESERIES_CONFIRM: "Bu takvim etkinliği dizisini izlemeye başladınız. <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal özet akışı</a> aracılığıyla bunu takvim uygulamanıza abone yapın.",
UNFOLLOW_CONFIRM: "Bu takvim etkinliğini izlemeyi durdurdunuz.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Bu takvim etkinliği dizisini izlemeyi durdurdunuz.",

RSVP_CONFIRM_SERIES: "Tek bir örneğe mi, yoksa dizinin tamamına mı katılacaksınız?",
RSVP_INSTACE_OPTION: "Yalnızca bu örneğe katıl",
RSVP_SERIES_OPTION: "Dizinin tamamına katıl",
RSVP_DIALOG_BUTTON: "Katıl",
RSVP_CONFIRM: "Bu takvim etkinliğine katılıyorsunuz. <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal özet akışı</a> aracılığıyla bunu takvim uygulamanıza abone yapın.",
RSVP_ENTIRESERIES_CONFIRM: "Bu takvim etkinliği dizisine katılıyorsunuz. <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal özet akışı</a> aracılığıyla bunu takvim uygulamanıza abone yapın.",
UNRSVP_CONFIRM: "Bu takvim etkinliğine katılmayı durdurdunuz.",
UNRSVP_ENTIRESERIES_CONFIRM: "Bu takvim etkinliği dizisine katılmayı durdurdunuz.",


SU: "Paz",
MO: "Pzt",
TU: "Sal",
WE: "Çar",
TH: "Per",
FR: "Cum",
SA: "Cts",
SU_FULL: "Pazar",
MO_FULL: "Pazartesi",
TU_FULL: "Salı",
WE_FULL: "Çarşamba",
TH_FULL: "Perşembe",
FR_FULL: "Cuma",
SA_FULL: "Cumartesi",

DAYS: "gün",
WEEKS: "Hafta",
MONTHS: "ay",
YEARS: "yıl",
DAY: "gün",
WEEK: "Hafta",
MONTH: "ay",
YEAR: "yıl",

ON_THE_MONTHLY_DAY: "Ayın ||. gününde.",
ON_THE_MONTHLY_WEEKDAY: "Ayın ||. gününde.",

REMOVE: "Kaldır",

ERROR: "Hata",
ERROR_HEADER: "Lütfen aşağıdaki bilgileri denetleyin",

WARNING: "Uyarı",
WARNING_HEADER: "Uyarı",

CREATED_BY: "Oluşturan: ${0}",
CREATED_ON: "Oluşturulduğu tarih: ${0}",
UPDATED_ON: "Güncelleştirildiği tarih: ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Oluşturma tarihi: ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "${0} tarihinde güncelleştirildi",
WHEN: "Ne zaman:",
REPEATS: "Yinelensin:",
DATE: "Tarih",
ON: "Şu günlerde:",
ALL_DAY_EVENT:"Tam günlük takvim etkinliği",
ALL_DAY:"Tam Gün",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, Tam Gün",
RECURRENCE: "Yinelensin",
SUBJECT: "Konu:",
EVENT_TITLE: "Takvim Etkinliğinin Başlığı:",
TAGS: "Etiketler:",
DESCRIPTION: "Açıklama:",
LOCATION: "Yer:",
IMAGE_URL: "Resim URL'si:",
SUBMIT: "Gönder",
SAVE: "Kaydet",
CANCEL: "İptal",
SAVECLOSE: "Kaydet ve Kapat",
DELETE: "Örneği Sil",
FROM: "başlangıç:",
TO: "bitiş:",
CLOSE: "Kapat",
OPEN: "Aç",
CLOSE_SECTION: "Bölümü Kapat",
OPEN_SECTION: "Bölümü Aç",
NO: "Hayır",
CONFIRM: "Onayla",
CLEAR_EXCEPTIONS_CONFIRM: "Yinelenen bir toplantının birden çok örneğini yeniden zamanlıyorsunuz. Bu örneklerin tamamı, önceden yeniden zamanlananlar da dahil olmak üzere aynı göreli süre kadar kaydırılacak. Lütfen bu değişikliklerin etkilerini gözden geçirdiğinizden emin olun.\n\nDevam etmek istediğinizden emin misiniz?",

DAILY: "Günlük",
WEEKLY: "Haftalık",
BIWEEKLY: "İki haftada bir",
EVERY_X_WEEK: "Her ${0} haftada bir",
MONTHLY: "Aylık",
MONTHLY_BY_DAY: "Güne göre aylık",
MONTHLY_BY_WEEKDAY: "Haftanın gününe göre aylık",
YEARLY: "Yıllık",
CUSTOM: "Özel",
NONE: "Yok",
REPEAT_NONE: "Bu girdi yinelenmez",
REPEAT_DAILY: "Bu girdi günlük olarak yinelenir",
REPEAT_WEEKLY: "Bu girdi haftalık olarak yinelenir",
REPEAT_DAILY_SHORT: "Günlük",
REPEAT_WEEKLY_SHORT: "Haftalık",
REPEAT_MONTHLY_SHORT: "Aylık",

REPEATS: "Yinelensin",
REPEATS_LABEL: "Yinelensin:",

REPEAT_FREQUENCY_ONEWEEK: "Hafta",
REPEAT_FREQUENCY_TWOWEEKS: "2 Hafta",
REPEAT_FREQUENCY_THREEWEEKS: "3 Hafta",
REPEAT_FREQUENCY_FOURWEEKS: "4 Hafta",
REPEAT_FREQUENCY_FIVEWEEKS: "5 Hafta",

REPEAT_MONTHLY_ON_THIS_DATE: "Şu tarihte:",
REPEAT_MONTHLY_ON_THIS_DAY: "Şu günde:",

DATE_OF_MONTH_1: "birinci",
DATE_OF_MONTH_2: "ikinci",
DATE_OF_MONTH_3: "üçüncü",
DATE_OF_MONTH_4: "dördüncü",
DATE_OF_MONTH_5: "beşinde",
DATE_OF_MONTH_6: "altısında",
DATE_OF_MONTH_7: "yedisinde",
DATE_OF_MONTH_8: "sekizinde",
DATE_OF_MONTH_9: "dokuzunda",
DATE_OF_MONTH_10: "onunda",
DATE_OF_MONTH_11: "on birinde",
DATE_OF_MONTH_12: "on ikisinde",
DATE_OF_MONTH_13: "on üçünde",
DATE_OF_MONTH_14: "on dördünde",
DATE_OF_MONTH_15: "on beşinde",
DATE_OF_MONTH_16: "on altısında",
DATE_OF_MONTH_17: "on yedinsinde",
DATE_OF_MONTH_18: "on sekizinde",
DATE_OF_MONTH_19: "on dokuzunda",
DATE_OF_MONTH_20: "yirminsinde",
DATE_OF_MONTH_21: "yirmi birinde",
DATE_OF_MONTH_22: "yirmi ikinsinde",
DATE_OF_MONTH_23: "yirmi üçünde",
DATE_OF_MONTH_24: "yirmi dördünde",
DATE_OF_MONTH_25: "yirmi beşinde",
DATE_OF_MONTH_26: "yirmi altısında",
DATE_OF_MONTH_27: "yirmi yedisinde",
DATE_OF_MONTH_28: "yirmi sekizinde",
DATE_OF_MONTH_29: "yirmi dokuzunda",
DATE_OF_MONTH_30: "otuzunda",
DATE_OF_MONTH_31: "otuz birinde",

First_WEEK_OF_MONTH:"birinci",
Second_WEEK_OF_MONTH:"ikinci",
Third_WEEK_OF_MONTH:"üçüncü",
Fourth_WEEK_OF_MONTH:"dördüncü",
LAST_WEEK_OF_MONTH:"sonuncu",

First_WEEK_OF_MONTH_FEMALE:"birinci", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"ikinci",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"üçüncü",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"dördüncü",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"sonuncu",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"birinci",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"ikinci",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"üçüncü",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"dördüncü",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"sonuncu",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Haftanın gününü seçin",
SELECT_WEEK_OF_MONTH:"Ayın haftasını seçin",
SELECT_DATE_OF_MONTH:"Ayın tarihini seçin",
Fieldset_Event:"Etkinliği oluşturmak ya da düzenlemek için alanlar",

MESSAGE_BY_DATE_SKIPPED : "Bu tarihi içermeyen aylar atlanacak",

EVERY: "Her:",
UNTIL: "Şu tarihe kadar:",
ON: "Şu günlerde:",

ADD_ANOTHER: "Başka ekle",
REPEAT_ON: "Yineleme zamanı",

ADD_EVENT: "Takvim Etkinliği Oluştur",
EDIT_EVENT: "Takvim Etkinliğini Düzenle",

NOTIFY: "Diğer Kişilere Bildir",
NOTIFY_TITLE: "Diğer Kişilere Bildir",
NOTIFY_OK: "Bildir",
DELETE: "Sil",
EDIT: "Düzenle",
EDIT_LABEL: "Düzenle:",
EDIT_THIS_INSTANCE: "Bu örneği düzenle",
EDIT_THIS_SERIES: "Dizinin tamamını düzenle",
FOLLOW: "İzle",
FOLLOW_THIS_INSTANCE: "Bu örneği izle",
FOLLOW_THIS_SERIES: "Dizinin tamamını izle",
UNFOLLOW: "İzlemeyi Durdur",

RSVP: "Katılacağım",
RSVP_THIS_INSTANCE: "Bu örneğe katıl",
RSVP_THIS_SERIES: "Dizinin tamamına katıl",
UNRSVP: "Katılmayacağım",

START_TIME_AFTER_END: "Takvim etkinliğinin başlangıç saati, bitiş saatinden önce olmalıdır",
START_DAY_AFTER_UNTIL_DAY: "Yinelenen bir takvim etkinliğinin başlangıç tarihi, yineleme bitiş tarihinden sonra olmamalıdır",
DURATION_LARGER_THAN_24H: "Takvim etkinliği süresi 24 saatten uzun olmamalıdır. Bunun yerine lütfen yineleyen bir takvim etkinliği oluşturun.",
DESCRIPTION_LENGTH: 'Açıklama çok uzun',
SUBJECT_LENGTH: 'Takvim Etkinliğinin Başlığı çok uzun',
LOCATION_LENGTH: 'Yer çok uzun',
IMAGE_URL_INVALID: 'Resim URL adresi geçersiz',
UNTIL_DATE: 'Lütfen takvim etkinliği için geçerli bir bitiş tarihi belirtin',
NO_REPEAT_ON: 'Yinelenen bir takvim etkinliği için en az bir gün seçilmelidir',
START_DATE_IN_PAST: 'Etkinlik geçmişte başlıyor',

SUBJECT_INVALID: 'Takvim etkinliğinin başlığı geçerli olmalıdır',
START_DATE_INVALID: 'Başlangıç tarihi geçerli olmalıdır',
START_TIME_INVALID: 'Başlangıç saati geçerli olmalıdır',
END_DATE_INVALID: 'Bitiş tarihi geçerli olmalıdır',
END_TIME_INVALID: 'Bitiş saati geçerli olmalıdır',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Üye seçilmedi. Lütfen bildirimde bulunulacak en az bir üye seçin.',

NEXT_MONTH: "Sonraki ayı görüntüle",
PREVIOUS_MONTH: "Önceki ayı görüntüle",
CALENDAR_SUMMARY: "Yapılacak İş Öğelerinin Bulunduğu Aylık Takvim",

SEND: "Gönder",
MAP_ROLE: "Üyelerin rolü:",
READ_ACCESS: "Okuyucu",
AUTHOR_ACCESS: "Yazar (kendi takvim etkinliklerini oluşturur ve düzenler)",
SAVE: "Kaydet",
PREF_FORM_TITLE: "Takvim Ayarlarını Düzenle",
TAB_UPCOMING: "Takvim Etkinlikleri",
TAB_CALENDAR: "Takvim Görünümü",
SUMMARY: "Özet",
DETAILS: "Ayrıntılar",
EVENT_TIME: "Takvim Etkinliği Saati",
UPDATED: "Güncelleştirilme Zamanı",
SORT_ASC: "Artan düzende sırala",
SORT_DESC: "Azalan düzende sırala",
TODAY: "Bugün",
TOMORROW: "Yarın",
YESTERDAY: "Dün",
EVENT_NAME: "Takvim Etkinliği Adı",
SHOW_DETAILS: "ayrıntıları göster",
SHOW_PASTEVENTS: "Geçmiş Takvim Etkinliklerini Göster",
SHOW_UPCOMINGEVENTS: "Yaklaşan Takvim Etkinliklerini Göster",
HIDE_DETAILS: "ayrıntıları gizle",
SELECT_CHECKBOX: "seçmek için tıklatın",
UNSELECT_CHECKBOX: "seçimi kaldırmak için tıklatın",
NO_DESCRIPTION: "Açıklama girilmedi",
DISPLAY: "Görüntüle",
REPEATS_FLAG: "(yinelenir)",
STR_VIEW: "Görünüm:",
DISP_CALENDAR: "Takvim ızgarası",
DISP_LIST: "Özet listesi",

GOTO_EDIT_INFO: "Tercihleri düzenlemek için Topluluk Eylemleri -> Topluluğu Düzenle -> Takvim seçeneklerini izlemeniz gerekir.",
VIEW_ALL_EVENTS: "Tüm Takvim Etkinliklerini Görüntüle",
NO_EVENT_TODAY: "Bugün Etkinlik Yok",
ONE_EVENT_TODAY: "Bugün 1 Etkinlik Var",
X_EVENTS_TODAY: "Bugün ${0} Etkinlik Var",

OK: "Tamam",
UPCOMING_EVENTS: "Yaklaşan Takvim Etkinlikleri",
PICK_MEMBERS: "Topluluk üyelerini seç",
NOTIFICATION_MESSAGE: "İleti",
NOTIFY_OTHERS: "Topluluk üyelerine bildirim gönder",
NOTIFY_DEFAULT_MESSAGE: "Merhaba, bu etkinliğin ilginizi çekeceğini düşündüm.",
NOTIFY_ERROR: "Kişilere bildirim gönderilirken hata oluştu: ${0}",
NOTIFY_SUCCESS: "Bildirim başarıyla gönderildi.",
NOTIFY_ERROR_2: "Takvim etkinliğiniz kaydedildi, ancak başkalarına bildirim gönderilirken hata oluştu: ${0}",
INTERNAL_SERVER_ERR: "iç sunucu hatası",
INTERNAL_SERVER_NOT_AVAILABLE: "İçerik görüntülenirken bir hata oluştu. Sistem yöneticinize başvurun.",

ALT_WARNING_ICON: "Uyarı simgesi",
ALT_CONFIRM_ICON: "Onay simgesi",
ALT_ERROR_ICON: "Hata simgesi",
A11Y_WARNING_LABEL: "Uyarı:",
A11Y_CONFIRM_LABEL: "Onay:",
A11Y_ERROR_LABEL: "Hata:",

TAB_ABOUT: "Hakkında",
TAB_COMMENT: "Yorumlar (${0})",
ADD_COMMENT: "Yorum ekle...",
ENTER_COMMENT: "Yorumunuzu girin:",
ENTER_COMMENT_ERROR: "Lütfen yorumunuzu girin ve 'Gönder' düğmesini tıklatın. Artık yorum bırakmak istemiyorsanız 'İptal' düğmesini tıklatın.",
COMMENT_META: "${0} kullanıcısı yorum yaptı: ${1}",
CONFIRM_DELETE_COMMENT: "Yorumu silmek istediğinizden emin misiniz?",
NO_COMMENT: "Yorum yok.",

EVENT_DELETE_ERROR: "Takvim etkinliği silinemedi. Takvim etkinliği silinmiş olabilir. Lütfen sayfayı yenileyin ve yeniden deneyin.",


TAB_ATTENDEE: "${0} Kişi Katılıyor",
NO_ATTENDEE: "Katılımcı yok.",
NO_INSTANCE: "Yaklaşan bir takvim etkinliği yok.",
NO_UPCOMING_FOLLOWED: "İzlediğiniz yaklaşan bir takvim etkinliği yok.",
NO_UPCOMING_ATTENDED: "Katıldığınız yaklaşan bir takvim etkinliği yok.",
NO_UPCOMING_FOLLOWATTENDED: "İzlediğiniz ya da katıldığınız yaklaşan bir takvim etkinliği yok.",

FOLLOWED_EVENTS_LABEL: "İzlediğiniz takvim etkinlikleri:",
ATTENDED_EVENTS_LABEL: "Katılmayı planladığınız takvim etkinlikleri:",
FOLLOWATTENDED_EVENTS_LABEL: "İzlediğiniz ve katılmayı planladığınız takvim etkinlikleri:",

PAGING_INFO: "${0} - ${1} / ${2}",
PAGING_INFO_TITLE: "${0} - ${1} / ${2} arasındaki öğeleri göster",
PAGING_PREVIOUS: "Önceki",
PAGING_PREVIOUS_TITLE: "Önceki sayfa",
PAGING_NEXT: "Sonraki",
PAGING_NEXT_TITLE: "Sonraki sayfa",
PAGING_SHOW: "Göster",
PAGING_LABEL: "Sayfalama",

PAGING_COMMENT_LABEL:"Yorumlar sayfalanıyor (Üst denetim)",
PAGING_COMMENT_BOTTOM_LABEL:"Yorumlar sayfalanıyor (Alt denetim)",
PAGING_ATTENDEE_LABEL:"Katılan kişier sayfalanıyor (Üst denetim)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Katılan kişier sayfalanıyor (Alt denetim)",

PAGING_ITEMS: "öğe",
PAGING_PAGE_TITLE: "Her sayfada ${0} öğe göster",
PAGING_PAGE_TITLE2: "Sayfa ${0}",
PAGING_PAGE_TITLE3: "Her sayfada ${0} öğe göstermek için tıklatın",
PAGING_JUMPTO: "Şu sayfaya git: ${0} / ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Sayfa Numarası",
PAGEING_JUMP_LABEL:"Değer değiştirildiğinde sayfa sonuçları yenilenir",

DETAIL_WHEN: "Ne zaman: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Saat: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0}, kullanıcı: ${1}",
ABOUT_ADDED: "Oluşturma:",
ABOUT_UPDATED: "Güncelleştirme:",

WITH_TAGS: "Etiketli:",
TAGS_TITLE: "Etiketler",
TAGS_REMOVE_HINT: "${0} etiketini seçili süzgeç etiketlerinden kaldır",

HELP: "Yardım",
CLOSE_HELP: "Yardımı Kapat",

TAGCLOUD_HELP: "Etiket, sınıflandırmak ve daha sonra bulunmasını kolaylaştırmak üzere bir topluluk etkinliğine atadığınız anahtar sözcüktür. Bir etiketle ilişkilendirilmiş topluluk etkinliklerini görmek için etiketi girin ya da tıklatın. Sık kullanılan etiketler, etiket bulutunda daha büyük ve daha koyu yazı tipiyle görüntülenir.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Yükleniyor...",
NOT_AUTHORIZED: "Bu eylemi gerçekleştirmek için yetkiniz yok.",
STARTS:"Başlangıç Tarihi:",
ENDS:"Bitiş Tarihi:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0}, ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Etiket, daha sonra bulunmasını kolaylaştırmak üzere içeriğe atadığınız anahtar sözcüktür. Etiketler, bordro ya da insan_kaynakları gibi virgülle ya da boşlukla ayrılmış tek sözcükler olmalıdır.",
INVALID_CHAR_IN_TAG: "Girdiğiniz etiket listesi geçersiz '&' karakteri içeriyor. Lütfen bu karakteri etiket listesinden kaldırın.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Yaklaşan bir takvim etkinliği yok.",
NO_UPCOMING_EVENTS_MSG: "Bu toplulukta yaklaşan bir takvim etkinliği yok.",
NO_PAST_EVENTS_MSG: "Bu toplulukta geçmiş bir takvim etkinliği yok.",

OWNER: "Sahip",
MEMBER: "Üye",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Takvim Etkinliği Eylemleri",
EVENT_VIEWS_NAVIGATION: "Takvim Etkinliği Görünümleri",

EVENTS_VIEW_TOOLBAR_LABEL: "Takvim Etkinliği Eylemleri",

ALLDAY_UPDATED_MSG_HINT: "Takvim etkinliği başlangıç saati ve takvim etkinliği bitiş saati uygun bir şekilde güncelleştirildi.",

EVENT_STARTTIME_LABEL: "Takvim etkinliği başlangıç saati",
EVENT_ENDTIME_LABEL: "Takvim etkinliği bitiş saati",

REPEATS_ENABLE_DISABLE_HINT: "Yineleme seçeneklerini etkinleştirmek ya da devre dışı bırakmak için tıklatın",
REPEATING_OPTIONS_HINT: "Yineleme seçenekleri",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Bir tarih girin. Örnek: ${0}",
ENTER_TIME_EXAMPLE: "Bir saat girin. Örnek: ${0}",

REQUIRED: "Zorunlu",

COLLAPSED_SECTION: "Daraltılmış bölüm",
EXPANDED_SECTION: "Genişletilmiş bölüm",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Yalnızca bu örneği ya da dizinin tamamını düzenleyin.  Dizinin tamamının düzenlenmesi, bu takvim etkinliğinin tek tek örneklerinde önceden yaptığınız değişikliklerin üzerine yazmaz.",

REPEATING_FREQUENCY: "Yineleme sıklığı",
REPEATING_UNTIL: "Yineleme sonu",
REPEATING_ON: "Yineleme zamanı",

CALENDAR_PREF_SAVE_CONFIRM: "Yaptığınız Takvim değişiklikleri kaydedildi.",
HIDE_THIS_MESSAGE: "Bu iletiyi gizle",

EVENT_OPEN_ERR_NOTFOUND: "Topluluk etkinliği açılamadı. Olası neden: Takvim etkinliği zaten silinmiş.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (tarih/saat:${1}, konum:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (tarih/saat:${1}).",
LINK_OPEN_INFO: "${0} (tarih/saat:${1}, konum:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (tarih/saat:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Bağlantı tıklatılınca yeni pencerede açılır.",

WARNING_ICON: "Uyarı simgesi",

MENTION: {
	NOT_MEMBER_WARNING: "Aşağıdaki söz edilen kişiler, topluluğun üyesi olmadığından bu iletiyi göremeyeceklerdir.",
	NOT_SAME_ORGANIZATION_WARNING: "Aşağıdaki söz edilen kişiler, farklı bir kuruluşta olduklarından bu iletiyi göremeyeceklerdir."
},
SELECT_ALL: "Tümünü seç"
})
