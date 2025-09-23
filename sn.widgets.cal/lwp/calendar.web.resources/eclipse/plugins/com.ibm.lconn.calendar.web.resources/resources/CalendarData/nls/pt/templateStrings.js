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
TITLE: "Eventos",

CREATE_BUTTON: "Criar um evento",
CREATE_BUTTON_TOOLTIP: "Criar um novo evento no dia seleccionado",
EDIT_BUTTON: "Editar evento",
EDIT_BUTTON_TOOLTIP: "Editar o evento seleccionado",
DELETE_BUTTON: "Eliminar evento",
DELETE_BUTTON_TOOLTIP: "Eliminar o evento seleccionado",
BACKTOCAL: "Regressar aos eventos da comunidade",
BACKTOCAL2: "Faça clique para regressar aos eventos da comunidade",
MORE_ACTIONS: "Mais acções",

DAY_VIEW_TOOLTIP: "Vista de um dia",
TWODAY_VIEW_TOOLTIP: "Vista de dois dias",
FIVEDAY_VIEW_TOOLTIP: "Vista de cinco dias",
WEEK_VIEW_TOOLTIP: "Vista de uma semana",
MONTH_VIEW_TOOLTIP: "Vista de um mês",

DAY_VIEW: "Um dia",
TWODAY_VIEW: "Dois dias",
FIVEDAY_VIEW: "Cinco dias",
WEEK_VIEW: "Semana",
MONTH_VIEW: "Mês",

ICAL_FEED: "Adicionar à agenda pessoal",
ICAL_FEED_DIALOG_TITLE: "Adicionar à agenda pessoal",

ICAL_FEED_HINT: "Copie este URL e subscreva o mesmo para a aplicação da agenda como um feed de iCal:",
ICAL_FEED_SUBSCRIBE_HINT: "Pode subscrever os seus eventos do HCL Connections em muitas aplicações, como o HCL Notes e o Microsoft Outlook. Clique no seguinte URL para subscrever todos os eventos desta comunidade. Consoante a sua aplicação de agenda, poderá ter de copiar o URL para essa aplicação.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "Pode subscrever os seus eventos do HCL Connections em muitas aplicações, como o HCL Notes e o Microsoft Outlook. Clique no seguinte URL para subscrever todos os eventos que acompanha ou em que participa. Consoante a sua aplicação de agenda, poderá ter de copiar o URL para essa aplicação.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "Pode subscrever os seus eventos do HCL Connections em muitas aplicações, como o HCL Notes e o Microsoft Outlook. Clique no seguinte URL para subscrever todos os eventos que acompanha. Consoante a sua aplicação de agenda, poderá ter de copiar o URL para essa aplicação.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "Pode subscrever os seus eventos do HCL Connections em muitas aplicações, como o HCL Notes e o Microsoft Outlook. Clique no seguinte URL para subscrever todos os eventos em que participa. Consoante a sua aplicação de agenda, poderá ter de copiar o URL para essa aplicação.",
ICAL_FEED_HINT_POPUP: "Faça clique com o botão direito do rato e copie este URL e subscreva o mesmo para a aplicação da agenda como um feed de iCal",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Opte por apresentar os seus eventos da comunidade na agenda pessoal do Notes ou do Outlook, fazendo clique no feed abaixo:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Como:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Adicionar eventos da comunidade à agenda do Notes",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Adicionar eventos da comunidade ao Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Adicionar eventos da comunidade ao Google Calendar",

ICAL_FEED_EXPORT_ICS:	"Exportar para agenda (.ics)",

DELETE_CONFIRM_SINGLE: "Tem a certeza de que pretende eliminar este evento?",
DELETE_CONFIRM_SERIES: "Eliminar uma única ocorrência ou a série completa?",
DELETE_INSTACE_OPTION: "Eliminar apenas esta ocorrência",
DELETE_SERIES_OPTION: "Eliminar a série completa",
DELETE_DIALOG_BUTTON: "Eliminar",

FOLLOW_CONFIRM_SERIES: "Acompanhar uma única ocorrência ou a série completa?",
FOLLOW_INSTACE_OPTION: "Acompanhar apenas esta ocorrência",
FOLLOW_SERIES_OPTION: "Acompanhar a série completa",
FOLLOW_DIALOG_BUTTON: "Acompanhar",
FOLLOW_CONFIRM: "Acompanhou este evento. Subscreva o mesmo para a aplicação da agenda através do <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">feed de iCal</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Acompanhou esta série de eventos. Subscreva o mesmo para a aplicação da agenda através do <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">feed de iCal</a>.",
UNFOLLOW_CONFIRM: "Parou de acompanhar este evento.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Parou de acompanhar esta série de eventos.",

RSVP_CONFIRM_SERIES: "Participar numa única ocorrência ou na série completa?",
RSVP_INSTACE_OPTION: "Participar apenas numa ocorrência",
RSVP_SERIES_OPTION: "Participar na série completa",
RSVP_DIALOG_BUTTON: "Participar",
RSVP_CONFIRM: "Está a participar neste evento. Subscreva o mesmo para a aplicação da agenda através do <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">feed de iCal</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Está a participar nesta série de eventos. Subscreva o mesmo para a aplicação da agenda através do <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">feed de iCal</a>.",
UNRSVP_CONFIRM: "Parou de participar neste evento.",
UNRSVP_ENTIRESERIES_CONFIRM: "Parou de participar nesta série de eventos.",


SU: "Dom",
MO: "Seg",
TU: "Ter",
WE: "Qua",
TH: "Qui",
FR: "Sex",
SA: "Sáb",
SU_FULL: "Domingo",
MO_FULL: "Segunda-feira",
TU_FULL: "Terça-feira",
WE_FULL: "Quarta-feira",
TH_FULL: "Quinta-feira",
FR_FULL: "Sexta-feira",
SA_FULL: "Sábado",

DAYS: "dias",
WEEKS: "semanas",
MONTHS: "meses",
YEARS: "anos",
DAY: "dia",
WEEK: "Semana",
MONTH: "mês",
YEAR: "ano",

ON_THE_MONTHLY_DAY: "No || do mês.",
ON_THE_MONTHLY_WEEKDAY: "No || do mês.",

REMOVE: "Remover",

ERROR: "Erro",
ERROR_HEADER: "Verifique o seguinte",

WARNING: "Aviso",
WARNING_HEADER: "Aviso",

CREATED_BY: "Criado por ${0}",
CREATED_ON: "Criado a ${0}",
UPDATED_ON: "Actualizado a ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Criado em ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Atualizado em ${0}",
WHEN: "Quando:",
REPEATS: "Repete-se:",
DATE: "Data",
ON: "A:",
ALL_DAY_EVENT:"Evento para todo o dia",
ALL_DAY:"Todo o dia",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, todo o dia",
RECURRENCE: "Repete-se",
SUBJECT: "Assunto:",
EVENT_TITLE: "Título do evento:",
TAGS: "Etiquetas:",
DESCRIPTION: "Descrição:",
LOCATION: "Localização:",
IMAGE_URL: "URL da imagem:",
SUBMIT: "Submeter",
SAVE: "Guardar",
CANCEL: "Cancelar",
SAVECLOSE: "Guardar e fechar",
DELETE: "Eliminar ocorrência",
FROM: "de",
TO: "a",
CLOSE: "Fechar",
OPEN: "Abrir",
CLOSE_SECTION: "Fechar secção",
OPEN_SECTION: "Abrir secção",
NO: "Não",
CONFIRM: "Confirmar",
CLEAR_EXCEPTIONS_CONFIRM: "Está a agendar novamente várias ocorrências de uma reunião recorrente. Todas estas ocorrências serão deslocadas com a mesma quantidade relativa de tempo, incluindo as que já foram agendadas novamente. Certifique-se de que revê os efeitos destas alterações.\n\nTem a certeza de que pretende continuar?",

DAILY: "Diariamente",
WEEKLY: "Semanalmente",
BIWEEKLY: "Bissemanalmente",
EVERY_X_WEEK: "A cada ${0} semanas",
MONTHLY: "Mensalmente",
MONTHLY_BY_DAY: "Mensalmente por dia",
MONTHLY_BY_WEEKDAY: "Mensalmente por dia do mês",
YEARLY: "Anualmente",
CUSTOM: "Personalizada",
NONE: "Nenhum",
REPEAT_NONE: "Esta entrada não se repete",
REPEAT_DAILY: "Esta entrada repete-se diariamente",
REPEAT_WEEKLY: "Esta entrada repete-se semanalmente",
REPEAT_DAILY_SHORT: "Diariamente",
REPEAT_WEEKLY_SHORT: "Semanalmente",
REPEAT_MONTHLY_SHORT: "Mensalmente",

REPEATS: "Repete-se",
REPEATS_LABEL: "Repete-se:",

REPEAT_FREQUENCY_ONEWEEK: "Semana",
REPEAT_FREQUENCY_TWOWEEKS: "2 semanas",
REPEAT_FREQUENCY_THREEWEEKS: "3 semanas",
REPEAT_FREQUENCY_FOURWEEKS: "4 semanas",
REPEAT_FREQUENCY_FIVEWEEKS: "5 semanas",

REPEAT_MONTHLY_ON_THIS_DATE: "Nesta data:",
REPEAT_MONTHLY_ON_THIS_DAY: "Neste dia:",

DATE_OF_MONTH_1: "o 1º",
DATE_OF_MONTH_2: "o 2º",
DATE_OF_MONTH_3: "o 3º",
DATE_OF_MONTH_4: "o 4º",
DATE_OF_MONTH_5: "o 5º",
DATE_OF_MONTH_6: "o 6º",
DATE_OF_MONTH_7: "o 7º",
DATE_OF_MONTH_8: "o 8º",
DATE_OF_MONTH_9: "o 9º",
DATE_OF_MONTH_10: "o 10º",
DATE_OF_MONTH_11: "o 11º",
DATE_OF_MONTH_12: "o 12º",
DATE_OF_MONTH_13: "o 13º",
DATE_OF_MONTH_14: "o 14º",
DATE_OF_MONTH_15: "o 15º",
DATE_OF_MONTH_16: "o 16º",
DATE_OF_MONTH_17: "o 17º",
DATE_OF_MONTH_18: "o 18º",
DATE_OF_MONTH_19: "o 19º",
DATE_OF_MONTH_20: "o 20º",
DATE_OF_MONTH_21: "o 21º",
DATE_OF_MONTH_22: "o 22º",
DATE_OF_MONTH_23: "o 23º",
DATE_OF_MONTH_24: "o 24º",
DATE_OF_MONTH_25: "o 25º",
DATE_OF_MONTH_26: "o 26º",
DATE_OF_MONTH_27: "o 27º",
DATE_OF_MONTH_28: "o 28º",
DATE_OF_MONTH_29: "o 29º",
DATE_OF_MONTH_30: "o 30º",
DATE_OF_MONTH_31: "o 31º",

First_WEEK_OF_MONTH:"a 1ª",
Second_WEEK_OF_MONTH:"a 2ª",
Third_WEEK_OF_MONTH:"a 3ª",
Fourth_WEEK_OF_MONTH:"a 4ª",
LAST_WEEK_OF_MONTH:"a última",

First_WEEK_OF_MONTH_FEMALE:"a 1ª", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"a 2ª",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"a 3ª",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"a 4ª",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"a última",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"a 1ª",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"a 2ª",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"a 3ª",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"a 4ª",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"a última",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Seleccione o dia da semana",
SELECT_WEEK_OF_MONTH:"Seleccione a semana do mês",
SELECT_DATE_OF_MONTH:"Seleccione o dia do mês",
Fieldset_Event:"Campos para criar ou editar o evento",

MESSAGE_BY_DATE_SKIPPED : "Meses que não contêm esta data serão ignorados",

EVERY: "A cada:",
UNTIL: "Até:",
ON: "A:",

ADD_ANOTHER: "Adicionar outro",
REPEAT_ON: "Repetir a",

ADD_EVENT: "Criar evento",
EDIT_EVENT: "Editar evento",

NOTIFY: "Notificar outras pessoas",
NOTIFY_TITLE: "Notificar outras pessoas",
NOTIFY_OK: "Notificar",
DELETE: "Eliminar",
EDIT: "Editar",
EDIT_LABEL: "Editar:",
EDIT_THIS_INSTANCE: "Editar esta ocorrência",
EDIT_THIS_SERIES: "Editar a série completa",
FOLLOW: "Acompanhar",
FOLLOW_THIS_INSTANCE: "Acompanhar esta ocorrência",
FOLLOW_THIS_SERIES: "Acompanhar a série completa",
UNFOLLOW: "Parar o acompanhamento",

RSVP: "Irá participar",
RSVP_THIS_INSTANCE: "Participar nesta ocorrência",
RSVP_THIS_SERIES: "Participar na série completa",
UNRSVP: "Não irá participar",

START_TIME_AFTER_END: "A hora de início do evento tem de ser antes da hora de fim",
START_DAY_AFTER_UNTIL_DAY: "A data de início de um evento recorrente não pode ser após a respectiva data Repetir até",
DURATION_LARGER_THAN_24H: "A duração do evento não deverá ser superior a 24 horas. Em alternativa, crie um evento repetido.",
DESCRIPTION_LENGTH: 'A descrição é demasiado longa',
SUBJECT_LENGTH: 'O título do evento é demasiado longo',
LOCATION_LENGTH: 'A localização é demasiado longa',
IMAGE_URL_INVALID: 'O URL da imagem não é válido',
UNTIL_DATE: 'Especifique uma data de conclusão do evento válida',
NO_REPEAT_ON: 'Deverá ser seleccionado, pelo menos, um dia para um evento recorrente',
START_DATE_IN_PAST: 'O evento começa no passado',

SUBJECT_INVALID: 'O título do evento tem de ser válido',
START_DATE_INVALID: 'A data de início tem de ser válida',
START_TIME_INVALID: 'A hora de início tem de ser válida',
END_DATE_INVALID: 'A data de conclusão tem de ser válida',
END_TIME_INVALID: 'A hora de fim tem de ser válida',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Não foram seleccionados quaisquer membros. Seleccione, pelo menos, um membro para notificar.',

NEXT_MONTH: "Apresentar mês seguinte",
PREVIOUS_MONTH: "Apresentar mês anterior",
CALENDAR_SUMMARY: "Agenda mensal com tarefas",

SEND: "Enviar",
MAP_ROLE: "Os membros têm a função de:",
READ_ACCESS: "Leitor",
AUTHOR_ACCESS: "Autor (criar e editar os respectivos eventos)",
SAVE: "Guardar",
PREF_FORM_TITLE: "Editar definições da Agenda",
TAB_UPCOMING: "Eventos",
TAB_CALENDAR: "Vista da agenda",
SUMMARY: "Resumo",
DETAILS: "Detalhes",
EVENT_TIME: "Hora do evento",
UPDATED: "Actualizado",
SORT_ASC: "Ordenação ascendente",
SORT_DESC: "Ordenação descendente",
TODAY: "Hoje",
TOMORROW: "Amanhã",
YESTERDAY: "Ontem",
EVENT_NAME: "Nome do evento",
SHOW_DETAILS: "mostrar detalhes",
SHOW_PASTEVENTS: "Mostrar eventos passados",
SHOW_UPCOMINGEVENTS: "Mostrar eventos futuros",
HIDE_DETAILS: "ocultar detalhes",
SELECT_CHECKBOX: "faça clique para seleccionar",
UNSELECT_CHECKBOX: "faça clique para desmarcar",
NO_DESCRIPTION: "Não foi fornecida qualquer descrição",
DISPLAY: "Apresentar",
REPEATS_FLAG: "(repetições)",
STR_VIEW: "Ver:",
DISP_CALENDAR: "Grelha da agenda",
DISP_LIST: "Lista de resumos",

GOTO_EDIT_INFO: "É necessário aceder a Acções da comunidade -> Editar comunidade -> Agenda para editar as preferências.",
VIEW_ALL_EVENTS: "Ver todos os eventos",
NO_EVENT_TODAY: "Nenhum evento hoje",
ONE_EVENT_TODAY: "1 evento hoje",
X_EVENTS_TODAY: "${0} eventos hoje",

OK: "OK",
UPCOMING_EVENTS: "Eventos futuros",
PICK_MEMBERS: "Seleccionar membros da comunidade",
NOTIFICATION_MESSAGE: "Mensagem",
NOTIFY_OTHERS: "Notificar membros da comunidade",
NOTIFY_DEFAULT_MESSAGE: "Olá! Pensei que poderia estar interessado neste evento.",
NOTIFY_ERROR: "Ocorreu um erro ao notificar pessoas: ${0}",
NOTIFY_SUCCESS: "Notificação enviada com êxito.",
NOTIFY_ERROR_2: "O seu evento foi guardado, mas ocorreu um erro ao notificar outras pessoas: ${0}",
INTERNAL_SERVER_ERR: "erro de servidor interno",
INTERNAL_SERVER_NOT_AVAILABLE: "Ocorreu um erro ao apresentar o conteúdo. Contacte o administrador do sistema.",

ALT_WARNING_ICON: "Ícone Aviso",
ALT_CONFIRM_ICON: "Ícone Confirmação",
ALT_ERROR_ICON: "Ícone Erro",
A11Y_WARNING_LABEL: "Aviso:",
A11Y_CONFIRM_LABEL: "Confirmação:",
A11Y_ERROR_LABEL: "Erro:",

TAB_ABOUT: "Acerca de",
TAB_COMMENT: "Comentários (${0})",
ADD_COMMENT: "Adicionar um comentário...",
ENTER_COMMENT: "Introduza o comentário:",
ENTER_COMMENT_ERROR: "Introduza o comentário e faça clique em 'Guardar.' Caso já não pretenda deixar um comentário, faça clique em 'Cancelar'.",
COMMENT_META: "${0} comentou ${1}",
CONFIRM_DELETE_COMMENT: "Tem a certeza de que pretende eliminar o comentário?",
NO_COMMENT: "Não existem comentários.",

EVENT_DELETE_ERROR: "Falha ao eliminar o evento. O evento poderá ter sido eliminado. Actualize a página e tente novamente.",


TAB_ATTENDEE: "${0} pessoas a participar",
NO_ATTENDEE: "Não existem participantes.",
NO_INSTANCE: "Não existem eventos futuros.",
NO_UPCOMING_FOLLOWED: "Não está a acompanhar quaisquer eventos futuros.",
NO_UPCOMING_ATTENDED: "Não está a participar em quaisquer eventos futuros.",
NO_UPCOMING_FOLLOWATTENDED: "Não está a acompanhar ou a participar em quaisquer eventos futuros.",

FOLLOWED_EVENTS_LABEL: "Eventos que está a acompanhar:",
ATTENDED_EVENTS_LABEL: "Eventos nos quais pretende participar:",
FOLLOWATTENDED_EVENTS_LABEL: "Eventos que está a acompanhar e nos quais pretende participar:",

PAGING_INFO: "${0} - ${1} de ${2}",
PAGING_INFO_TITLE: "Mostrar itens ${0} até ${1} de ${2}",
PAGING_PREVIOUS: "Anterior",
PAGING_PREVIOUS_TITLE: "Página anterior",
PAGING_NEXT: "Seguinte",
PAGING_NEXT_TITLE: "Página seguinte",
PAGING_SHOW: "Mostrar",
PAGING_LABEL: "Paginação",

PAGING_COMMENT_LABEL:"Paginar comentários (Controlo superior)",
PAGING_COMMENT_BOTTOM_LABEL:"Paginar comentários (Controlo inferior)",
PAGING_ATTENDEE_LABEL:"Paginar pessoas a participar (Controlo superior)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Paginar pessoas a participar (Controlo inferior)",

PAGING_ITEMS: "itens",
PAGING_PAGE_TITLE: "Mostrar ${0} itens por página",
PAGING_PAGE_TITLE2: "Página ${0}",
PAGING_PAGE_TITLE3: "Faça clique para mostrar ${0} itens por página",
PAGING_JUMPTO: "Avançar para a página ${0} de ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Número de página",
PAGEING_JUMP_LABEL:"A alteração do valor irá actualizar os resultados das páginas",

DETAIL_WHEN: "Quando: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Hora: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} por ${1}",
ABOUT_ADDED: "Criado:",
ABOUT_UPDATED: "Actualizado:",

WITH_TAGS: "Com etiquetas:",
TAGS_TITLE: "Etiquetas",
TAGS_REMOVE_HINT: "Remover a etiqueta ${0} das etiquetas filtradas seleccionadas",

HELP: "Ajuda",
CLOSE_HELP: "Fechar Ajuda",

TAGCLOUD_HELP: "Uma etiqueta consiste numa palavra-chave atribuída a um evento da comunidade para efectuar a respectiva categorização e facilitar a respectiva localização. Introduza ou faça clique numa etiqueta para visualizar os eventos da comunidade associados à mesma. As etiquetas populares são apresentadas com um tipo de letra maior e mais escuro na nuvem de etiquetas.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "A carregar...",
NOT_AUTHORIZED: "Não está autorizado a executar a acção.",
STARTS:"Começa:",
ENDS:"Termina:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} às ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Uma etiqueta consiste numa palavra-chave atribuída a conteúdo, de modo a facilitar a respectiva localização. As etiquetas têm de corresponder a palavras únicas, tal como pagamentos ou recursos_humanos, separadas por vírgulas ou espaços.",
INVALID_CHAR_IN_TAG: "A lista de etiquetas introduzida contém o caráter inválido '&'. Remova este caráter da lista de etiquetas.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Não existem eventos futuros.",
NO_UPCOMING_EVENTS_MSG: "Não existem eventos futuros nesta comunidade.",
NO_PAST_EVENTS_MSG: "Não existem eventos passados nesta comunidade.",

OWNER: "Proprietário",
MEMBER: "Membro",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Acções de eventos",
EVENT_VIEWS_NAVIGATION: "Vistas de eventos",

EVENTS_VIEW_TOOLBAR_LABEL: "Acções de eventos",

ALLDAY_UPDATED_MSG_HINT: "As horas de início e de fim do evento foram actualizadas de modo adequado.",

EVENT_STARTTIME_LABEL: "Hora de início do evento",
EVENT_ENDTIME_LABEL: "Hora de fim do evento",

REPEATS_ENABLE_DISABLE_HINT: "Faça clique para activar ou desactivar as opções recorrentes",
REPEATING_OPTIONS_HINT: "Opções recorrentes",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Introduza uma data. Exemplo: ${0}",
ENTER_TIME_EXAMPLE: "Introduza uma hora. Exemplo: ${0}",

REQUIRED: "Obrigatório",

COLLAPSED_SECTION: "Secção contraída",
EXPANDED_SECTION: "Secção expandida",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Edite apenas esta ocorrência ou edite a série completa.  A edição da série completa não substitui as alterações anteriormente efectuadas em ocorrências únicas deste evento.",

REPEATING_FREQUENCY: "Frequência de repetição",
REPEATING_UNTIL: "Repetir até",
REPEATING_ON: "Repetir a",

CALENDAR_PREF_SAVE_CONFIRM: "As suas alterações efectuadas à Agenda foram guardadas.",
HIDE_THIS_MESSAGE: "Ocultar esta mensagem",

EVENT_OPEN_ERR_NOTFOUND: "Falha ao abrir o evento da comunidade. Causa possível: o evento já foi eliminado.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (hora:${1}, localização:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (hora:${1}).",
LINK_OPEN_INFO: "${0} (hora:${1}, localização:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (hora:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Fazer clique na ligação abre uma nova janela.",

WARNING_ICON: "Ícone Aviso",

MENTION: {
	NOT_MEMBER_WARNING: "As pessoas referidas em seguida não poderão visualizar a mensagem, uma vez que não são membros da comunidade.",
	NOT_SAME_ORGANIZATION_WARNING: "As pessoas referidas em seguida não poderão visualizar a mensagem, já que se encontram numa organização diferente."
},
SELECT_ALL: "Selecionar tudo"
})
