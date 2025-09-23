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

CREATE_BUTTON: "Crear un evento",
CREATE_BUTTON_TOOLTIP: "Crear un evento nuevo el día seleccionado",
EDIT_BUTTON: "Editar evento",
EDIT_BUTTON_TOOLTIP: "Editar el evento seleccionado",
DELETE_BUTTON: "Eliminar evento",
DELETE_BUTTON_TOOLTIP: "Suprime los elementos seleccionados",
BACKTOCAL: "Volver a los eventos de comunidad",
BACKTOCAL2: "Pulse para volver a los eventos de la comunidad",
MORE_ACTIONS: "Más acciones",

DAY_VIEW_TOOLTIP: "Vista de un día",
TWODAY_VIEW_TOOLTIP: "Vista de dos días",
FIVEDAY_VIEW_TOOLTIP: "Vista de cinco días",
WEEK_VIEW_TOOLTIP: "Vista de semana",
MONTH_VIEW_TOOLTIP: "Vista de mes",

DAY_VIEW: "Un día",
TWODAY_VIEW: "Dos días",
FIVEDAY_VIEW: "Cinco días",
WEEK_VIEW: "Semana",
MONTH_VIEW: "Mes",

ICAL_FEED: "Añadir al calendario personal",
ICAL_FEED_DIALOG_TITLE: "Añadir al calendario personal",

ICAL_FEED_HINT: "Copiar esta URL y suscribirla a su aplicación de calendario como una fuente de iCal:",
ICAL_FEED_SUBSCRIBE_HINT: "Puede suscribirse a los eventos de HCL Connections en muchas aplicaciones, como por ejemplo HCL Notes y Microsoft Outlook.  Haga clic en la siguiente URL para suscribirse a todos los eventos de esta comunidad.  Dependiendo de la aplicación de calendario que use, puede que tenga que copiar el URL en la aplicación.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "Puede suscribirse a los eventos de HCL Connections en muchas aplicaciones, como por ejemplo HCL Notes y Microsoft Outlook.  Haga clic en la siguiente URL para suscribirse a todos los eventos que está siguiendo o a los que está asistiendo.  Dependiendo de la aplicación de calendario que use, puede que tenga que copiar la URL en la aplicación.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "Puede suscribirse a los eventos de HCL Connections en muchas aplicaciones, como por ejemplo HCL Notes y Microsoft Outlook.  Haga clic en la siguiente URL para suscribirse a todos los eventos que está siguiendo.  Dependiendo de la aplicación de calendario que use, puede que tenga que copiar la URL en la aplicación.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "Puede suscribirse a los eventos de HCL Connections en muchas aplicaciones, como por ejemplo HCL Notes y Microsoft Outlook.  Haga clic en la siguiente URL para suscribirse a todos los eventos a los que está asistiendo.  Dependiendo de la aplicación de calendario que use, puede que tenga que copiar la URL en la aplicación.",
ICAL_FEED_HINT_POPUP: "Haga clic con el botón derecho en esta URL y cópiela; suscríbala a la aplicación de calendario como fuente de iCal",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Añada los eventos de la comunidad a su calendario personal de Notes o Outlook pulsando la siguiente fuente:",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Cómo:",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Añadir eventos de la comunidad al calendario de Notes",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Añadir eventos de la comunidad a Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Añadir eventos de la comunidad al calendario de Google",

ICAL_FEED_EXPORT_ICS:	"Exportar al calendario (.ics)",

DELETE_CONFIRM_SINGLE: "¿Está seguro de que desea suprimir este evento?",
DELETE_CONFIRM_SERIES: "¿Suprimir una única instancia o la serie completa?",
DELETE_INSTACE_OPTION: "Eliminar solo en esta ocasión",
DELETE_SERIES_OPTION: "Suprimir la serie completa",
DELETE_DIALOG_BUTTON: "Suprimir",

FOLLOW_CONFIRM_SERIES: "¿Seguir una única instancia o la serie completa?",
FOLLOW_INSTACE_OPTION: "Seguir solo esta instancia",
FOLLOW_SERIES_OPTION: "Seguir la serie completa",
FOLLOW_DIALOG_BUTTON: "Seguir",
FOLLOW_CONFIRM: "Ha seguido este evento. Suscríbalo a la aplicación de calendario a través de la fuente de iCal <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\"></a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Ha seguido esta serie de eventos. Suscríbala a la aplicación de calendario a través de la fuente de iCal <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\"></a>.",
UNFOLLOW_CONFIRM: "Ha dejado de seguir este evento.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Ha dejado de seguir esta serie de eventos.",

RSVP_CONFIRM_SERIES: "¿Asistir a una única instancia o asistir a la serie completa?",
RSVP_INSTACE_OPTION: "Asistir solo en esta ocasión",
RSVP_SERIES_OPTION: "Asistir a la serie completa",
RSVP_DIALOG_BUTTON: "Asistir",
RSVP_CONFIRM: "Asistirá a este evento. Suscríbalo a la aplicación de calendario a través de la fuente de iCal <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\"></a>.",
RSVP_ENTIRESERIES_CONFIRM: "Asistirá a esta serie de eventos. Suscríbala a la aplicación de calendario a través de la fuente de iCal <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\"></a>.",
UNRSVP_CONFIRM: "Ha dejado de asistir a este evento.",
UNRSVP_ENTIRESERIES_CONFIRM: "Ha dejado de asistir a esta serie de eventos.",


SU: "Dom",
MO: "Lun",
TU: "Mar",
WE: "Mié",
TH: "Jue",
FR: "Vie",
SA: "Sáb",
SU_FULL: "Domingo",
MO_FULL: "Lunes",
TU_FULL: "Martes",
WE_FULL: "Miércoles",
TH_FULL: "Jueves",
FR_FULL: "Viernes",
SA_FULL: "Sábado",

DAYS: "días",
WEEKS: "Semanas",
MONTHS: "meses",
YEARS: "años",
DAY: "día",
WEEK: "Semana",
MONTH: "mes",
YEAR: "año",

ON_THE_MONTHLY_DAY: "El || del mes.",
ON_THE_MONTHLY_WEEKDAY: "El || del mes.",

REMOVE: "Suprimir",

ERROR: "Error",
ERROR_HEADER: "Tenga en cuenta lo siguiente",

WARNING: "Aviso",
WARNING_HEADER: "Aviso",

CREATED_BY: "Creado por ${0}",
CREATED_ON: "Creado el ${0}",
UPDATED_ON: "Actualizado el ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Creado el ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Actualizado el ${0}",
WHEN: "Cuando:",
REPEATS: "Se repite:",
DATE: "Fecha",
ON: "En:",
ALL_DAY_EVENT:"Evento que dura todo el día",
ALL_DAY:"Todo el día",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, todo el día",
RECURRENCE: "Se repite",
SUBJECT: "Asunto:",
EVENT_TITLE: "Título del evento:",
TAGS: "Etiquetas:",
DESCRIPTION: "Descripción:",
LOCATION: "Ubicación:",
IMAGE_URL: "URL de la imagen:",
SUBMIT: "Enviar",
SAVE: "Guardar",
CANCEL: "Cancelar",
SAVECLOSE: "Guardar y cerrar",
DELETE: "Suprimir la instancia",
FROM: "de:",
TO: "a",
CLOSE: "Cerrar",
OPEN: "Abrir",
CLOSE_SECTION: "Cerrar sección",
OPEN_SECTION: "Abrir sección",
NO: "No",
CONFIRM: "Confirmar",
CLEAR_EXCEPTIONS_CONFIRM: "Está reprogramando varias instancias de una reunión que se repite. Todas las instancias se desplazarán el mismo periodo de tiempo relativo, incluidas aquellas que se habían reprogramado con anterioridad. Asegúrese de revisar los efectos de dichos cambios.\n\n¿Está seguro de que desea continuar?",

DAILY: "Diariamente",
WEEKLY: "Semanalmente",
BIWEEKLY: "Cada dos semanas",
EVERY_X_WEEK: "Cada ${0} semanas",
MONTHLY: "Mensualmente",
MONTHLY_BY_DAY: "Mensualmente por día",
MONTHLY_BY_WEEKDAY: "Mensualmente por día de la semana",
YEARLY: "Anualmente",
CUSTOM: "Personalizada",
NONE: "Ninguno",
REPEAT_NONE: "Esta entrada no se repite",
REPEAT_DAILY: "Esta entrada se repite diariamente",
REPEAT_WEEKLY: "Esta entrada se repite semanalmente",
REPEAT_DAILY_SHORT: "Diariamente",
REPEAT_WEEKLY_SHORT: "Semanalmente",
REPEAT_MONTHLY_SHORT: "Mensualmente",

REPEATS: "Se repite",
REPEATS_LABEL: "Se repite:",

REPEAT_FREQUENCY_ONEWEEK: "Semana",
REPEAT_FREQUENCY_TWOWEEKS: "2 semanas",
REPEAT_FREQUENCY_THREEWEEKS: "3 semanas",
REPEAT_FREQUENCY_FOURWEEKS: "4 semanas",
REPEAT_FREQUENCY_FIVEWEEKS: "5 semanas",

REPEAT_MONTHLY_ON_THIS_DATE: "En esta fecha:",
REPEAT_MONTHLY_ON_THIS_DAY: "En este día:",

DATE_OF_MONTH_1: "el 1",
DATE_OF_MONTH_2: "el 2",
DATE_OF_MONTH_3: "el 3",
DATE_OF_MONTH_4: "el 4",
DATE_OF_MONTH_5: "el 5",
DATE_OF_MONTH_6: "el 6",
DATE_OF_MONTH_7: "el 7",
DATE_OF_MONTH_8: "el 8",
DATE_OF_MONTH_9: "el 9",
DATE_OF_MONTH_10: "el 10",
DATE_OF_MONTH_11: "el 11",
DATE_OF_MONTH_12: "el 12",
DATE_OF_MONTH_13: "el 13",
DATE_OF_MONTH_14: "el 14",
DATE_OF_MONTH_15: "el 15",
DATE_OF_MONTH_16: "el 16",
DATE_OF_MONTH_17: "el 17",
DATE_OF_MONTH_18: "el 18",
DATE_OF_MONTH_19: "el 19",
DATE_OF_MONTH_20: "el 20",
DATE_OF_MONTH_21: "el 21",
DATE_OF_MONTH_22: "el 22",
DATE_OF_MONTH_23: "el 23",
DATE_OF_MONTH_24: "el 24",
DATE_OF_MONTH_25: "el 25",
DATE_OF_MONTH_26: "el 26",
DATE_OF_MONTH_27: "el 27",
DATE_OF_MONTH_28: "el 28",
DATE_OF_MONTH_29: "el 29",
DATE_OF_MONTH_30: "el 30",
DATE_OF_MONTH_31: "el 31",

First_WEEK_OF_MONTH:"el 1",
Second_WEEK_OF_MONTH:"el 2",
Third_WEEK_OF_MONTH:"el 3",
Fourth_WEEK_OF_MONTH:"el 4",
LAST_WEEK_OF_MONTH:"el último",

First_WEEK_OF_MONTH_FEMALE:"el 1", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"el 2",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"el 3",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"el 4",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"el último",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"el 1",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"el 2",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"el 3",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"el 4",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"el último",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Seleccione el día de la semana",
SELECT_WEEK_OF_MONTH:"Seleccione la semana del mes",
SELECT_DATE_OF_MONTH:"Seleccione el día del mes",
Fieldset_Event:"Campos para crear o editar el evento",

MESSAGE_BY_DATE_SKIPPED : "Se omitirán los meses que no contengan esta fecha",

EVERY: "Cada:",
UNTIL: "Hasta:",
ON: "En:",

ADD_ANOTHER: "Añadir otro",
REPEAT_ON: "Repetir en",

ADD_EVENT: "Crear evento",
EDIT_EVENT: "Editar evento",

NOTIFY: "Notificar a otras personas",
NOTIFY_TITLE: "Notificar a otras personas",
NOTIFY_OK: "Notificar",
DELETE: "Suprimir",
EDIT: "Editar",
EDIT_LABEL: "Editar:",
EDIT_THIS_INSTANCE: "Editar esta instancia",
EDIT_THIS_SERIES: "Editar la serie completa",
FOLLOW: "Seguir",
FOLLOW_THIS_INSTANCE: "Seguir esta instancia",
FOLLOW_THIS_SERIES: "Seguir la serie completa",
UNFOLLOW: "Dejar de seguir",

RSVP: "Asistir",
RSVP_THIS_INSTANCE: "Asistir en esta ocasión",
RSVP_THIS_SERIES: "Asistir a la serie completa",
UNRSVP: "No asistir",

START_TIME_AFTER_END: "La hora de inicio del evento tiene que ser anterior a la hora de finalización",
START_DAY_AFTER_UNTIL_DAY: "La fecha de inicio de un evento periódico no puede ser posterior a la fecha de la última repetición",
DURATION_LARGER_THAN_24H: "La duración del evento no debería superar las 24 horas. Cree un evento repetido si es el caso.",
DESCRIPTION_LENGTH: 'La descripción es demasiado larga',
SUBJECT_LENGTH: 'El título del evento es demasiado largo',
LOCATION_LENGTH: 'La ubicación es demasiado larga',
IMAGE_URL_INVALID: 'La URL de la imagen no es válida',
UNTIL_DATE: 'Especifique una fecha de finalización del evento válida',
NO_REPEAT_ON: 'Debe seleccionarse por lo menos un día para los eventos que se repiten',
START_DATE_IN_PAST: 'El evento empieza en el pasado',

SUBJECT_INVALID: 'El título del evento debe ser válido',
START_DATE_INVALID: 'La fecha de inicio debe ser válida',
START_TIME_INVALID: 'La hora de inicio debe ser válida',
END_DATE_INVALID: 'La fecha de finalización debe ser válida',
END_TIME_INVALID: 'La hora de finalización debe ser válida',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'No se seleccionó ningún miembro. Seleccione al menos uno para realizar la notificación.',

NEXT_MONTH: "Mostrar mes siguiente",
PREVIOUS_MONTH: "Mostrar mes anterior",
CALENDAR_SUMMARY: "Calendario mensual con tareas pendientes",

SEND: "Enviar",
MAP_ROLE: "Los miembros tienen el rol de:",
READ_ACCESS: "Lector",
AUTHOR_ACCESS: "Autor (crear y editar sus propios eventos)",
SAVE: "Guardar",
PREF_FORM_TITLE: "Editar la configuración del calendario",
TAB_UPCOMING: "Eventos",
TAB_CALENDAR: "Vista de calendario",
SUMMARY: "Resumen",
DETAILS: "Detalles",
EVENT_TIME: "Hora del evento",
UPDATED: "Actualizada",
SORT_ASC: "Orden ascendente",
SORT_DESC: "Orden descendente",
TODAY: "Hoy",
TOMORROW: "Mañana",
YESTERDAY: "Ayer",
EVENT_NAME: "Nombre del evento",
SHOW_DETAILS: "mostrar detalles",
SHOW_PASTEVENTS: "Mostrar eventos pasados",
SHOW_UPCOMINGEVENTS: "Mostrar próximos eventos",
HIDE_DETAILS: "ocultar detalles",
SELECT_CHECKBOX: "haga clic para seleccionar",
UNSELECT_CHECKBOX: "haga clic para anular la selección",
NO_DESCRIPTION: "No se ha proporcionado ninguna descripción",
DISPLAY: "Visualizar",
REPEATS_FLAG: "(se repite)",
STR_VIEW: "Ver:",
DISP_CALENDAR: "Tabla de calendario",
DISP_LIST: "Lista de resumen",

GOTO_EDIT_INFO: "Para editar las preferencias, debe ir a Acciones de la comunidad -> Editar comunidad -> Calendario.",
VIEW_ALL_EVENTS: "Ver todos los eventos",
NO_EVENT_TODAY: "Ningún evento hoy",
ONE_EVENT_TODAY: "1 evento hoy",
X_EVENTS_TODAY: "${0} eventos hoy",

OK: "Aceptar",
UPCOMING_EVENTS: "Próximos eventos",
PICK_MEMBERS: "Seleccionar miembros de la comunidad",
NOTIFICATION_MESSAGE: "Mensaje",
NOTIFY_OTHERS: "Notificar a miembros de comunidad",
NOTIFY_DEFAULT_MESSAGE: "Hola. He pensado que podría estar interesado en este evento.",
NOTIFY_ERROR: "Se ha producido un error cuando se notificaba a los usuarios: ${0}",
NOTIFY_SUCCESS: "La notificación se ha enviado correctamente.",
NOTIFY_ERROR_2: "Se ha guardado el evento, pero se produce un error al notificar a otras personas: ${0}",
INTERNAL_SERVER_ERR: "error de servidor interno",
INTERNAL_SERVER_NOT_AVAILABLE: "Se ha producido un error al mostrar el contenido. Póngase en contacto con el administrador de su sistema.",

ALT_WARNING_ICON: "Icono de advertencia",
ALT_CONFIRM_ICON: "Icono de confirmación",
ALT_ERROR_ICON: "Icono de error",
A11Y_WARNING_LABEL: "Aviso:",
A11Y_CONFIRM_LABEL: "Confirmación:",
A11Y_ERROR_LABEL: "Error:",

TAB_ABOUT: "Acerca de",
TAB_COMMENT: "Comentarios (${0})",
ADD_COMMENT: "Añadir un comentario...",
ENTER_COMMENT: "Escriba su comentario:",
ENTER_COMMENT_ERROR: "Escriba su comentario y pulse 'Guardar'. Si ya no desea realizar un comentario, pulse 'Cancelar'.",
COMMENT_META: "${0} comentó en ${1}",
CONFIRM_DELETE_COMMENT: "¿Está seguro de que desea eliminar este comentario?",
NO_COMMENT: "No hay comentarios.",

EVENT_DELETE_ERROR: "No se ha podido suprimir el evento. Puede que se haya suprimido el evento. Actualice la página y vuelva a intentarlo.",


TAB_ATTENDEE: "${0} asistentes",
NO_ATTENDEE: "No hay asistentes.",
NO_INSTANCE: "No hay eventos próximamente.",
NO_UPCOMING_FOLLOWED: "No está siguiendo ningún evento próximo.",
NO_UPCOMING_ATTENDED: "No va a asistir a ningún evento próximo.",
NO_UPCOMING_FOLLOWATTENDED: "No está siguiendo ni va a asistir a ningún evento próximo.",

FOLLOWED_EVENTS_LABEL: "Eventos que sigue:",
ATTENDED_EVENTS_LABEL: "Eventos a los que planea asistir:",
FOLLOWATTENDED_EVENTS_LABEL: "Eventos que sigue y a los que planea asistir:",

PAGING_INFO: "${0} - ${1} de ${2}",
PAGING_INFO_TITLE: "Mostrando elementos de ${0} a ${1} de ${2}",
PAGING_PREVIOUS: "Anterior",
PAGING_PREVIOUS_TITLE: "Página anterior",
PAGING_NEXT: "Siguiente",
PAGING_NEXT_TITLE: "Página siguiente",
PAGING_SHOW: "Mostrar",
PAGING_LABEL: "Transferencia de páginas",

PAGING_COMMENT_LABEL:"Paginación de comentarios (control superior)",
PAGING_COMMENT_BOTTOM_LABEL:"Paginación de comentarios (control inferior)",
PAGING_ATTENDEE_LABEL:"Paginación de asistentes (control superior)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Paginación de asistentes (control inferior)",

PAGING_ITEMS: "elementos",
PAGING_PAGE_TITLE: "Mostrar ${0} elementos por página",
PAGING_PAGE_TITLE2: "Página ${0}",
PAGING_PAGE_TITLE3: "Haga clic para mostrar ${0} elementos por página",
PAGING_JUMPTO: "Ir a la página ${0} de ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Número de página",
PAGEING_JUMP_LABEL:"Si cambia el valor se renovarán los resultados de la página",

DETAIL_WHEN: "Fecha: ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Hora: ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} por ${1}",
ABOUT_ADDED: "Creada:",
ABOUT_UPDATED: "Actualizado:",

WITH_TAGS: "Con etiquetas:",
TAGS_TITLE: "Etiquetas",
TAGS_REMOVE_HINT: "Suprimir la etiqueta ${0} de las etiquetas de filtro seleccionadas",

HELP: "Ayuda",
CLOSE_HELP: "Cerrar ayuda",

TAGCLOUD_HELP: "Una etiqueta es una palabra clave que se asigna a un evento de comunidad para asignarle una categoría y hacer que sea fácil de encontrar. Escriba o haga clic en una etiqueta para ver los eventos de comunidad que se asocian con esta etiqueta. Las etiquetas más populares aparecen en un texto más grande en la lista o la nube de etiquetas.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Cargando...",
NOT_AUTHORIZED: "No está autorizado a realizar la acción.",
STARTS:"Empieza:",
ENDS:"Finaliza:",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} a las ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Una etiqueta es una palabra clave que se asigna al contenido para que resulte más fácil encontrarlo. Los códigos deben ser palabras únicas, como nómina o recursos_humanos, separadas por comas o espacios.",
INVALID_CHAR_IN_TAG: "La lista de etiquetas que ha introducido contiene el carácter no válido '&'.  Elimine este carácter de la lista de etiquetas.",

NO_UPCOMING_EVENTS_MSG_SHORT: "No hay eventos próximamente.",
NO_UPCOMING_EVENTS_MSG: "No hay ningún evento próximamente en esta comunidad.",
NO_PAST_EVENTS_MSG: "No hay eventos en el pasado de esta comunidad.",

OWNER: "Propietario",
MEMBER: "Miembro",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Acciones de evento",
EVENT_VIEWS_NAVIGATION: "Vistas de evento",

EVENTS_VIEW_TOOLBAR_LABEL: "Acciones de evento",

ALLDAY_UPDATED_MSG_HINT: "La hora de inicio y de finalización del evento se han actualizado respectivamente.",

EVENT_STARTTIME_LABEL: "Hora de inicio del evento",
EVENT_ENDTIME_LABEL: "Hora de finalización del evento",

REPEATS_ENABLE_DISABLE_HINT: "Pulse para habilitar o deshabilitar las opciones que se repiten",
REPEATING_OPTIONS_HINT: "Opciones de repetición",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Especifique una fecha. Ejemplo: ${0}",
ENTER_TIME_EXAMPLE: "Especifique una hora. Ejemplo: ${0}",

REQUIRED: "Obligatorio",

COLLAPSED_SECTION: "Sección contraída",
EXPANDED_SECTION: "Sección expandida",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Editar solamente esta instancia o editar la serie completa. Si edita la serie completa no se sobrescriben los cambios que haya realizado previamente en las diferentes instancias de este evento.",

REPEATING_FREQUENCY: "Frecuencia de repetición",
REPEATING_UNTIL: "Repetir hasta",
REPEATING_ON: "Repetir en",

CALENDAR_PREF_SAVE_CONFIRM: "Se han guardado los cambios para Calendario.",
HIDE_THIS_MESSAGE: "Ocultar este mensaje",

EVENT_OPEN_ERR_NOTFOUND: "No se ha podido abrir el evento de la comunidad. Posible causa: el evento ya se había eliminado.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (hora:${1}, ubicación:${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (hora:${1}).",
LINK_OPEN_INFO: "${0} (hora:${1}, ubicación:${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (hora:${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Al pulsar el enlace se abrirá una ventana nueva.",

WARNING_ICON: "Icono de advertencia",

MENTION: {
	NOT_MEMBER_WARNING: "Las siguientes personas mencionadas no podrán ver el mensaje porque no son miembros de la comunidad.",
	NOT_SAME_ORGANIZATION_WARNING: "Las siguientes personas mencionadas no podrán ver el mensaje porque están en una organización diferente"
},
SELECT_ALL: "Seleccionar todo"
})
