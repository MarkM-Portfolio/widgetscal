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
CREATE_BUTTON_TOOLTIP: "Criar um novo evento no dia selecionado",
EDIT_BUTTON: "Editar evento",
EDIT_BUTTON_TOOLTIP: "Editar o evento selecionado",
DELETE_BUTTON: "Excluir evento",
DELETE_BUTTON_TOOLTIP: "Excluir o evento selecionado",
BACKTOCAL: "Voltar para eventos da comunidade",
BACKTOCAL2: "Clique para voltar aos eventos da comunidade",
MORE_ACTIONS: "Mais Ações",

DAY_VIEW_TOOLTIP: "Visualização de um dia",
TWODAY_VIEW_TOOLTIP: "Visualização de dois dias",
FIVEDAY_VIEW_TOOLTIP: "Visualização de cinco dias",
WEEK_VIEW_TOOLTIP: "Visualização semanal",
MONTH_VIEW_TOOLTIP: "Visualização mensal",

DAY_VIEW: "Um dia",
TWODAY_VIEW: "Dois dias",
FIVEDAY_VIEW: "Cinco dias",
WEEK_VIEW: "Semana",
MONTH_VIEW: "Mês",

ICAL_FEED: "Incluir ao calendário pessoal",
ICAL_FEED_DIALOG_TITLE: "Incluir ao calendário pessoal",

ICAL_FEED_HINT: "Copiar este URL e assiná-lo em seu aplicativo de calendário como um feed iCal:",
ICAL_FEED_SUBSCRIBE_HINT: "Você pode se inscrever para seus eventos do HCL Connections em muitos aplicativos, como HCL Notes e Microsoft Outlook. Clique no URL a seguir para inscrever-se em todos os eventos desta comunidade. Dependendo do aplicativo de calendário, talvez seja necessário copiar o URL para o aplicativo.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "Você pode inscrever-se nos eventos do HCL Connections em muitos aplicativos, como o HCL Notes e o Microsoft Outlook. Clique no URL a seguir para inscrever-se em todos os eventos que você está acompanhando ou dos quais está participando. Dependendo do aplicativo de calendário, talvez seja necessário copiar o URL para o aplicativo.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "Você pode inscrever-se nos eventos do HCL Connections em muitos aplicativos, como o HCL Notes e o Microsoft Outlook. Clique no URL a seguir para inscrever-se em todos os eventos que você está acompanhando. Dependendo do aplicativo de calendário, talvez seja necessário copiar o URL para o aplicativo.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "Você pode inscrever-se nos eventos do HCL Connections em muitos aplicativos, como o HCL Notes e o Microsoft Outlook. Clique no URL a seguir para inscrever-se em todos os eventos dos quais você está participando. Dependendo do aplicativo de calendário, talvez seja necessário copiar o URL para o aplicativo.",
ICAL_FEED_HINT_POPUP: "Clique com o botão direito do mouse neste URL, copie-o e inscreva-o em seu aplicativo de calendário como um feed iCal",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Faça com que os eventos da sua comunidade apareçam no seu calendário pessoal do Notes ou do Outlook clicando no feed abaixo:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Como:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Incluir eventos da comunidade no calendário do Notes",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Incluir eventos da comunidade no Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Incluir eventos da comunidade no Google Calendar",

ICAL_FEED_EXPORT_ICS:	"Exportar para calendário (.ics)",

DELETE_CONFIRM_SINGLE: "Tem certeza de que deseja excluir este evento?",
DELETE_CONFIRM_SERIES: "Excluir uma única instância ou a série inteira?",
DELETE_INSTACE_OPTION: "Excluir apenas esta instância",
DELETE_SERIES_OPTION: "Excluir a série inteira",
DELETE_DIALOG_BUTTON: "Excluir",

FOLLOW_CONFIRM_SERIES: "Seguir uma única instância ou a série inteira?",
FOLLOW_INSTACE_OPTION: "Seguir somente esta instância",
FOLLOW_SERIES_OPTION: "Seguir a série inteira",
FOLLOW_DIALOG_BUTTON: "Seguir",
FOLLOW_CONFIRM: "Você está seguindo este evento. Inscreva-o no seu aplicativo de calendário por meio de <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal feed</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Você está seguindo esta série de eventos. Inscreva-o no seu aplicativo de calendário por meio de <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">iCal feed</a>.",
UNFOLLOW_CONFIRM: "Você parou de seguir este evento.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Você parou de seguir esta série de eventos.",

RSVP_CONFIRM_SERIES: "Participar de uma única instância ou da série inteira?",
RSVP_INSTACE_OPTION: "Participar apenas desta instância",
RSVP_SERIES_OPTION: "Participar da série inteira",
RSVP_DIALOG_BUTTON: "Participar",
RSVP_CONFIRM: "Você participará deste evento. Inscreva-o no seu aplicativo de calendário por meio de <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal feed</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Você participará desta série de eventos. Inscreva-a no seu aplicativo de calendário por meio de <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">iCal feed</a>.",
UNRSVP_CONFIRM: "Você interrompeu sua participação neste evento.",
UNRSVP_ENTIRESERIES_CONFIRM: "Você interrompeu sua participação nesta série de eventos.",


SU: "dom",
MO: "seg",
TU: "ter",
WE: "qua",
TH: "qui",
FR: "sex",
SA: "sab",
SU_FULL: "Domingo",
MO_FULL: "Segunda-feira",
TU_FULL: "Terça-feira",
WE_FULL: "Quarta-feira",
TH_FULL: "Quinta-feira",
FR_FULL: "Sexta-feira",
SA_FULL: "Sábado",

DAYS: "dias",
WEEKS: "semana",
MONTHS: "meses",
YEARS: "anos",
DAY: "dia",
WEEK: "Semana",
MONTH: "mês",
YEAR: "ano",

ON_THE_MONTHLY_DAY: "No || do mês.",
ON_THE_MONTHLY_WEEKDAY: "No || do mês.",

REMOVE: "Remover",

ERROR: "erro",
ERROR_HEADER: "Verifique o seguinte",

WARNING: "Aviso",
WARNING_HEADER: "Aviso",

CREATED_BY: "Criado por${0}",
CREATED_ON: "Criado em ${0}",
UPDATED_ON: "Atualizado em ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Criado em: ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Atualizado em ${0}",
WHEN: "Quando:",
REPEATS: "Repetições:",
DATE: "Data",
ON: "Em:",
ALL_DAY_EVENT:"Evento de dia inteiro",
ALL_DAY:"Todo o dia",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, Dia inteiro",
RECURRENCE: "Repetições",
SUBJECT: "Assunto:",
EVENT_TITLE: "Título do evento:",
TAGS: "Marcações:",
DESCRIPTION: "Descrição:",
LOCATION: "Localização:",
IMAGE_URL: "URL da imagem:",
SUBMIT: "Enviar",
SAVE: "Salvar",
CANCEL: "Cancelar",
SAVECLOSE: "Salvar e Fechar",
DELETE: "Excluir instância",
FROM: "de",
TO: "para",
CLOSE: "Fechar",
OPEN: "Abrir",
CLOSE_SECTION: "Fechar Seção",
OPEN_SECTION: "Abrir Seção",
NO: "Não",
CONFIRM: "Confirmar",
CLEAR_EXCEPTIONS_CONFIRM: "Você está reprogramando várias instâncias de uma reunião que se repete. Essas instâncias serão todas alteradas de acordo com a mesma quantidade relativa de tempo, incluindo aquelas que foram reprogramadas anteriormente. Não deixe de analisar os efeitos dessas alterações.\n\nTem certeza de que deseja continuar?",

DAILY: "Diariamente",
WEEKLY: "Semanalmente",
BIWEEKLY: "Quinzenalmente",
EVERY_X_WEEK: "A cada ${0} semanas",
MONTHLY: "Mensalmente",
MONTHLY_BY_DAY: "Mensalmente por dia",
MONTHLY_BY_WEEKDAY: "Mensalmente por dia da semana",
YEARLY: "Anualmente",
CUSTOM: "Customizar",
NONE: "Nenhum",
REPEAT_NONE: "Esta entrada não se repete",
REPEAT_DAILY: "Esta entrada se repete diariamente",
REPEAT_WEEKLY: "Esta entrada se repete semanalmente",
REPEAT_DAILY_SHORT: "Diariamente",
REPEAT_WEEKLY_SHORT: "Semanalmente",
REPEAT_MONTHLY_SHORT: "Mensalmente",

REPEATS: "Repetições",
REPEATS_LABEL: "Repetições:",

REPEAT_FREQUENCY_ONEWEEK: "Semana",
REPEAT_FREQUENCY_TWOWEEKS: "2 semanas",
REPEAT_FREQUENCY_THREEWEEKS: "3 semanas",
REPEAT_FREQUENCY_FOURWEEKS: "4 semanas",
REPEAT_FREQUENCY_FIVEWEEKS: "5 semanas",

REPEAT_MONTHLY_ON_THIS_DATE: "Nesta data:",
REPEAT_MONTHLY_ON_THIS_DAY: "Neste dia:",

DATE_OF_MONTH_1: "1°/1ª",
DATE_OF_MONTH_2: "2º/2ª",
DATE_OF_MONTH_3: "3º/3ª",
DATE_OF_MONTH_4: "4º/4ª",
DATE_OF_MONTH_5: "5º/5ª",
DATE_OF_MONTH_6: "6º/6ª",
DATE_OF_MONTH_7: "7º/7ª",
DATE_OF_MONTH_8: "8º/8ª",
DATE_OF_MONTH_9: "9º/9ª",
DATE_OF_MONTH_10: "10º/10ª",
DATE_OF_MONTH_11: "11º/11ª",
DATE_OF_MONTH_12: "12º/12ª",
DATE_OF_MONTH_13: "13º/13ª",
DATE_OF_MONTH_14: "14º/14ª",
DATE_OF_MONTH_15: "15º/15ª",
DATE_OF_MONTH_16: "16º/16ª",
DATE_OF_MONTH_17: "17º/17ª",
DATE_OF_MONTH_18: "18º/18ª",
DATE_OF_MONTH_19: "19º/19ª",
DATE_OF_MONTH_20: "20º/20ª",
DATE_OF_MONTH_21: "21º/21ª",
DATE_OF_MONTH_22: "22º/22ª",
DATE_OF_MONTH_23: "23º/23ª",
DATE_OF_MONTH_24: "24º/24ª",
DATE_OF_MONTH_25: "25º/25ª",
DATE_OF_MONTH_26: "26º/26ª",
DATE_OF_MONTH_27: "27º/27ª",
DATE_OF_MONTH_28: "28º/28ª",
DATE_OF_MONTH_29: "29º/29ª",
DATE_OF_MONTH_30: "30º/30ª",
DATE_OF_MONTH_31: "31º/31ª",

First_WEEK_OF_MONTH:"1º/1ª",
Second_WEEK_OF_MONTH:"2º/2ª",
Third_WEEK_OF_MONTH:"3º/3ª",
Fourth_WEEK_OF_MONTH:"4º/4ª",
LAST_WEEK_OF_MONTH:"último(a)",

First_WEEK_OF_MONTH_FEMALE:"1º/1ª", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"2º/2ª",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"3º/3ª",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"4º/4ª",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"último(a)",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"1º/1ª",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"2º/2ª",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"3º/3ª",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"4º/4ª",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"último(a)",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Selecionar o dia da semana",
SELECT_WEEK_OF_MONTH:"Selecionar a semana do mês",
SELECT_DATE_OF_MONTH:"Selecionar a data do mês",
Fieldset_Event:"Campos para criar ou editar o evento",

MESSAGE_BY_DATE_SKIPPED : "Os meses que não contiverem esta data serão ignorados",

EVERY: "A cada:",
UNTIL: "Até:",
ON: "Em:",

ADD_ANOTHER: "Incluir outro",
REPEAT_ON: "Repetir em",

ADD_EVENT: "Criar evento",
EDIT_EVENT: "Editar evento",

NOTIFY: "Notificar Outras Pessoas",
NOTIFY_TITLE: "Notificar Outras Pessoas",
NOTIFY_OK: "Notificar",
DELETE: "Excluir",
EDIT: "Editar",
EDIT_LABEL: "Editar:",
EDIT_THIS_INSTANCE: "Editar esta instância",
EDIT_THIS_SERIES: "Editar série inteira",
FOLLOW: "Seguir",
FOLLOW_THIS_INSTANCE: "Seguir esta instância",
FOLLOW_THIS_SERIES: "Seguir a série inteira",
UNFOLLOW: "Parar de seguir",

RSVP: "Participarei",
RSVP_THIS_INSTANCE: "Participar desta instância",
RSVP_THIS_SERIES: "Participar da série inteira",
UNRSVP: "Não participarei",

START_TIME_AFTER_END: "A hora de início do evento deve ser anterior à hora de término",
START_DAY_AFTER_UNTIL_DAY: "A data de início de um evento repetido não deve ser posterior à sua repetição até a data",
DURATION_LARGER_THAN_24H: "A duração do evento não deve ser superior a 24 horas. Em vez disso, crie um evento repetido.",
DESCRIPTION_LENGTH: 'A descrição é muito longa',
SUBJECT_LENGTH: 'O título do evento é muito longo',
LOCATION_LENGTH: 'O local é muito longo',
IMAGE_URL_INVALID: 'O URL da imagem é inválido',
UNTIL_DATE: 'Especifique uma data de término de evento válida',
NO_REPEAT_ON: 'Deve ser selecionado pelo menos um dia para um evento repetido',
START_DATE_IN_PAST: 'O evento inicia no passado',

SUBJECT_INVALID: 'O título do evento deve ser válido',
START_DATE_INVALID: 'A data de início deve ser válida',
START_TIME_INVALID: 'A hora de início deve ser válida',
END_DATE_INVALID: 'A data de término deve ser válida',
END_TIME_INVALID: 'A hora de término deve ser válida',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Nenhum membro foi selecionado. Selecione pelo menos um membro a ser notificado.',

NEXT_MONTH: "Exibir o próximo mês",
PREVIOUS_MONTH: "Exibir o mês anterior",
CALENDAR_SUMMARY: "Calendário mensal com os itens de Pendências",

SEND: "Enviar",
MAP_ROLE: "Membros com a função:",
READ_ACCESS: "Leitor",
AUTHOR_ACCESS: "Autor (criar e editar seus próprios eventos)",
SAVE: "Salvar",
PREF_FORM_TITLE: "Editar configurações do calendário",
TAB_UPCOMING: "Eventos",
TAB_CALENDAR: "Visualização do calendário",
SUMMARY: "Resumo",
DETAILS: "Detalhes",
EVENT_TIME: "Hora do evento",
UPDATED: "Atualizado",
SORT_ASC: "Classificar em ordem crescente",
SORT_DESC: "Classificar em ordem decrescente",
TODAY: "Hoje",
TOMORROW: "Amanhã",
YESTERDAY: "Ontem",
EVENT_NAME: "Nome do evento",
SHOW_DETAILS: "mostrar detalhes",
SHOW_PASTEVENTS: "Mostrar eventos passados",
SHOW_UPCOMINGEVENTS: "Mostrar eventos futuros",
HIDE_DETAILS: "ocultar detalhes",
SELECT_CHECKBOX: "clicar para selecionar",
UNSELECT_CHECKBOX: "clicar para cancelar seleção",
NO_DESCRIPTION: "Nenhuma descrição fornecida",
DISPLAY: "Exibir",
REPEATS_FLAG: "(repetições)",
STR_VIEW: "Visualização:",
DISP_CALENDAR: "Grade do calendário",
DISP_LIST: "Lista de resumo",

GOTO_EDIT_INFO: "Você precisa seguir Ações da comunidade -> Editar comunidade -> Calendário para editar as preferências.",
VIEW_ALL_EVENTS: "Visualizar todos os eventos",
NO_EVENT_TODAY: "Nenhum evento hoje",
ONE_EVENT_TODAY: "1 evento hoje",
X_EVENTS_TODAY: "${0} eventos hoje",

OK: "OK",
UPCOMING_EVENTS: "Eventos futuros",
PICK_MEMBERS: "Selecionar membros da comunidade",
NOTIFICATION_MESSAGE: "Mensagem",
NOTIFY_OTHERS: "Notificar membros da comunidade",
NOTIFY_DEFAULT_MESSAGE: "Olá! Acho que você pode se interessar por este evento.",
NOTIFY_ERROR: "Ocorreu um erro ao notificar pessoas: ${0}",
NOTIFY_SUCCESS: "Notificação enviada com êxito.",
NOTIFY_ERROR_2: "Seu evento foi salvo, mas ocorreu um erro ao notificar outras pessoas: ${0}",
INTERNAL_SERVER_ERR: "erro interno de servidor",
INTERNAL_SERVER_NOT_AVAILABLE: "Ocorreu um erro ao exibir o conteúdo. Entre em contato com o administrador do sistema.",

ALT_WARNING_ICON: "Ícone de aviso",
ALT_CONFIRM_ICON: "Ícone de confirmação",
ALT_ERROR_ICON: "Ícone de erro",
A11Y_WARNING_LABEL: "Aviso:",
A11Y_CONFIRM_LABEL: "Confirmação:",
A11Y_ERROR_LABEL: "Erro:",

TAB_ABOUT: "Sobre",
TAB_COMMENT: "Comentários (${0})",
ADD_COMMENT: "Incluir um comentário...",
ENTER_COMMENT: "Inserir Comentário:",
ENTER_COMMENT_ERROR: "Insira seu comentário e clique em \"Salvar\". Se você não deseja mais deixar um comentário, clique em \"Cancelar\".",
COMMENT_META: "${0} comentado em ${1}",
CONFIRM_DELETE_COMMENT: "Tem certeza de que deseja excluir o comentário?",
NO_COMMENT: "Não há comentários.",

EVENT_DELETE_ERROR: "Falha ao excluir o evento. O evento pode ter sido excluído. Atualize a página e tente novamente.",


TAB_ATTENDEE: "${0} pessoas participarão",
NO_ATTENDEE: "Não há participantes.",
NO_INSTANCE: "Não há eventos futuros.",
NO_UPCOMING_FOLLOWED: "Você não está seguindo nenhum evento futuro.",
NO_UPCOMING_ATTENDED: "Você não participará de nenhum evento futuro.",
NO_UPCOMING_FOLLOWATTENDED: "Você não está seguindo ou não participará de nenhum evento futuro.",

FOLLOWED_EVENTS_LABEL: "Eventos que você está seguindo:",
ATTENDED_EVENTS_LABEL: "Eventos dos quais você planeja participar:",
FOLLOWATTENDED_EVENTS_LABEL: "Eventos que você está seguindo e dos quais planeja participar:",

PAGING_INFO: "${0} - ${1} de ${2}",
PAGING_INFO_TITLE: "Mostrar itens de ${0} a ${1} de ${2}",
PAGING_PREVIOUS: "Anterior",
PAGING_PREVIOUS_TITLE: "Página anterior",
PAGING_NEXT: "Próximo",
PAGING_NEXT_TITLE: "Próxima página",
PAGING_SHOW: "Mostrar",
PAGING_LABEL: "Paginação",

PAGING_COMMENT_LABEL:"Comentários de paginação (controle superior)",
PAGING_COMMENT_BOTTOM_LABEL:"Comentários de paginação (controle inferior)",
PAGING_ATTENDEE_LABEL:"Paginação das pessoas que participarão (controle superior)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Paginação das pessoas que participarão (controle inferior)",

PAGING_ITEMS: "itens",
PAGING_PAGE_TITLE: "Mostrar ${0} itens por página",
PAGING_PAGE_TITLE2: "Página ${0}",
PAGING_PAGE_TITLE3: "Clicar para mostrar ${0} itens por página",
PAGING_JUMPTO: "Ir para a página ${0} de ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Número da página",
PAGEING_JUMP_LABEL:"Alterar o valor irá atualizar os resultados da página",

DETAIL_WHEN: "Quando: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Hora: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} por ${1}",
ABOUT_ADDED: "Criado:",
ABOUT_UPDATED: "Atualizado:",

WITH_TAGS: "Com marcações:",
TAGS_TITLE: "Marcações",
TAGS_REMOVE_HINT: "Remover a tag ${0} das tags de filtro selecionadas",

HELP: "Ajuda",
CLOSE_HELP: "Fechar Ajuda",

TAGCLOUD_HELP: "Uma tag é uma palavra-chave designada a um evento de comunidade para categorizá-la e facilitar sua localização. Digite ou clique em uma tag para ver os eventos de comunidade associados a ela. As tags populares aparecem em texto maior e mais escuro na nuvem de tags.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Carregando...",
NOT_AUTHORIZED: "Você não tem autorização para executar a ação.",
STARTS:"Inicia em:",
ENDS:"Termina em:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} às ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Uma marcação é uma palavra-chave que você designa ao conteúdo para torná-lo mais fácil de localizar. As marcações devem ser palavras únicas, como payroll ou human_resources, separadas por vírgulas ou espaços.",
INVALID_CHAR_IN_TAG: "A lista de marcações digitada contém o caractere inválido \"&\".  Remova esse caractere da lista de marcações.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Não há eventos futuros.",
NO_UPCOMING_EVENTS_MSG: "Não há eventos futuros nesta comunidade.",
NO_PAST_EVENTS_MSG: "Não há eventos anteriores nesta comunidade.",

OWNER: "Proprietário",
MEMBER: "Membro",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Ações de evento",
EVENT_VIEWS_NAVIGATION: "Visualizações de evento",

EVENTS_VIEW_TOOLBAR_LABEL: "Ações de evento",

ALLDAY_UPDATED_MSG_HINT: "A hora de início e a de término do evento foram atualizadas apropriadamente.",

EVENT_STARTTIME_LABEL: "Hora de início do evento",
EVENT_ENDTIME_LABEL: "Hora de término do evento",

REPEATS_ENABLE_DISABLE_HINT: "Clique para ativar ou desativar as opções de repetição",
REPEATING_OPTIONS_HINT: "Opções de repetição",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Insira uma data. Exemplo: ${0}",
ENTER_TIME_EXAMPLE: "Insira uma hora. Exemplo: ${0}",

REQUIRED: "Obrigatório",

COLLAPSED_SECTION: "Seção reduzida",
EXPANDED_SECTION: "Seção expandida",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Edite apenas esta instância ou a série inteira. A edição da série inteira não sobrescreve as alterações feitas anteriormente em instâncias únicas deste evento.",

REPEATING_FREQUENCY: "Frequência da repetição",
REPEATING_UNTIL: "Repetir até",
REPEATING_ON: "Repetir em",

CALENDAR_PREF_SAVE_CONFIRM: "As alterações do calendário foram salvas.",
HIDE_THIS_MESSAGE: "Ocultar esta mensagem",

EVENT_OPEN_ERR_NOTFOUND: "Falha ao abrir o evento da comunidade. Causa possível: o evento já foi excluído.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (hora:${1}, local:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (hora:${1}).",
LINK_OPEN_INFO: "${0} (hora:${1}, local:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (hora:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"O clique no link abrirá uma nova janela.",

WARNING_ICON: "Ícone de aviso",

MENTION: {
	NOT_MEMBER_WARNING: "As pessoas mencionadas a seguir não poderão visualizar a mensagem porque não são membros da comunidade.",
	NOT_SAME_ORGANIZATION_WARNING: "As pessoas mencionadas a seguir não poderão ver a mensagem porque são de outra organização"
},
SELECT_ALL: "Selecionar tudo"
})
