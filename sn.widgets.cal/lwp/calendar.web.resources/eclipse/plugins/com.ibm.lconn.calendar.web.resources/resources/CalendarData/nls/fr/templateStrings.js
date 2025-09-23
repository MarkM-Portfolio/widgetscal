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
TITLE: "Evénements",

CREATE_BUTTON: "Créer un événement",
CREATE_BUTTON_TOOLTIP: "Créer un nouvel événement le jour choisi",
EDIT_BUTTON: "Modifier un événement",
EDIT_BUTTON_TOOLTIP: "Modifier l'événement sélectionné",
DELETE_BUTTON: "Supprimer un événement",
DELETE_BUTTON_TOOLTIP: "Supprime l'événement sélectionné",
BACKTOCAL: "Revenir aux événements communautaires",
BACKTOCAL2: "Cliquer pour revenir aux événements communautaires",
MORE_ACTIONS: "Autres actions",

DAY_VIEW_TOOLTIP: "Vue sur un jour",
TWODAY_VIEW_TOOLTIP: "Vue sur deux jours",
FIVEDAY_VIEW_TOOLTIP: "Vue sur cinq jours",
WEEK_VIEW_TOOLTIP: "Vue hebdomadaire",
MONTH_VIEW_TOOLTIP: "Vue mensuelle",

DAY_VIEW: "Un jour",
TWODAY_VIEW: "Deux jours",
FIVEDAY_VIEW: "Cinq jours",
WEEK_VIEW: "Semaine",
MONTH_VIEW: "Mois",

ICAL_FEED: "Ajouter au calendrier personnel",
ICAL_FEED_DIALOG_TITLE: "Ajouter au calendrier personnel",

ICAL_FEED_HINT: "Copiez cette URL et abonnez-la à votre application de calendrier en tant que flux iCal :",
ICAL_FEED_SUBSCRIBE_HINT: "Vous pouvez vous inscrire à vos événements HCL Connections dans de nombreuses applications telles que HCL Notes ou Microsoft Outlook. Cliquez sur l'URL suivante pour vous abonner à tous les événements de cette communauté. Selon votre application de calendrier, vous devrez peut-être copier l'URL dans cette application.",
ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT: "Vous pouvez vous inscrire à vos événements HCL Connections dans de nombreuses applications telles que HCL Notes ou Microsoft Outlook. Cliquez sur l'URL suivante pour vous abonner à tous les événements que vous suivez ou auxquels vous participez. Selon votre application de calendrier, vous devrez peut-être copier l'URL dans cette application.",
ICAL_FEED_FOLLOW_SUBSCRIBE_HINT: "Vous pouvez vous inscrire à vos événements HCL Connections dans de nombreuses applications telles que HCL Notes ou Microsoft Outlook. Cliquez sur l'URL suivante pour vous abonner à tous les événements que vous suivez. Selon votre application de calendrier, vous devrez peut-être copier l'URL dans cette application.",
ICAL_FEED_ATTEND_SUBSCRIBE_HINT: "Vous pouvez vous inscrire à vos événements HCL Connections dans de nombreuses applications telles que HCL Notes ou Microsoft Outlook. Cliquez sur l'URL suivante pour vous abonner à tous les événements auxquels vous participez. Selon votre application de calendrier, vous devrez peut-être copier l'URL dans cette application.",
ICAL_FEED_HINT_POPUP: "Cliquez avec le bouton droit et copiez cette URL, puis abonnez-la à votre application de calendrier en tant que flux iCal.",
ICAL_ADD_FEED_TO_PERSONAL_HINT: "Faites apparaître vos événements communautaires dans votre calendrier personnel Notes ou Outlook en cliquant sur le flux ci-dessous :",
ICAL_FEED_SUBSCRIBE_HELP_TITLE: "Comment :",
ICAL_FEED_SUBSCRIBE_HELP_NOTES: "Ajouter des événements communautaires au calendrier Notes",
ICAL_FEED_SUBSCRIBE_HELP_OUTLOOK: "Ajouter des événements communautaires à Outlook",
ICAL_FEED_SUBSCRIBE_HELP_GOOGEL_CALENDER: "Ajouter des événements communautaires à Google Agenda",

ICAL_FEED_EXPORT_ICS:	"Exporter vers le calendrier (.ics)",

DELETE_CONFIRM_SINGLE: "Voulez-vous vraiment supprimer cet événement ?",
DELETE_CONFIRM_SERIES: "Supprimer une seule instance ou supprimer la série entière ?",
DELETE_INSTACE_OPTION: "Supprimer uniquement cette instance",
DELETE_SERIES_OPTION: "Supprimer la série entière",
DELETE_DIALOG_BUTTON: "Supprimer",

FOLLOW_CONFIRM_SERIES: "Suivre une seule instance ou suivre la série entière ?",
FOLLOW_INSTACE_OPTION: "Suivre uniquement cette instance",
FOLLOW_SERIES_OPTION: "Suivre la série entière",
FOLLOW_DIALOG_BUTTON: "Suivre",
FOLLOW_CONFIRM: "Vous avez suivi cet événement. Abonnez-le à votre application de calendrier via un <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">flux iCal</a>.",
FOLLOW_ENTIRESERIES_CONFIRM: "Vous avez suivi cette série d'événements. Abonnez-la à votre application de calendrier via un <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',4); return false;\">flux iCal</a>.",
UNFOLLOW_CONFIRM: "Vous avez cessé de suivre cet événement.",
UNFOLLOW_ENTIRESERIES_CONFIRM: "Vous avez cessé de suivre cette série d'événements.",

RSVP_CONFIRM_SERIES: "Assister à une seule instance ou à une série entière ?",
RSVP_INSTACE_OPTION: "Assister uniquement à cette instance",
RSVP_SERIES_OPTION: "Assistez à la série entière",
RSVP_DIALOG_BUTTON: "Assister",
RSVP_CONFIRM: "Vous assistez à cet événement. Abonnez-le à votre application de calendrier via un <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">flux iCal</a>.",
RSVP_ENTIRESERIES_CONFIRM: "Vous assistez à cette série d'événements. Abonnez-la à votre application de calendrier via un <a href=\"javascript:;\" onclick=\"lconn.calendar.CalendarUtil.popupICalDialog('{0}',3); return false;\">flux iCal</a>.",
UNRSVP_CONFIRM: "Vous avez cessé d'assister à cet événement.",
UNRSVP_ENTIRESERIES_CONFIRM: "Vous avez cessé d'assister à cette série d'événements.",


SU: "Dim",
MO: "Lun",
TU: "Mar",
WE: "Mer",
TH: "Jeu",
FR: "Ven",
SA: "Sam",
SU_FULL: "Dimanche",
MO_FULL: "Lundi",
TU_FULL: "Mardi",
WE_FULL: "Mercredi",
TH_FULL: "Jeudi",
FR_FULL: "Vendredi",
SA_FULL: "Samedi",

DAYS: "jours",
WEEKS: "Semaines",
MONTHS: "mois",
YEARS: "années",
DAY: "jour",
WEEK: "Semaine",
MONTH: "mois",
YEAR: "année",

ON_THE_MONTHLY_DAY: "Le || du mois.",
ON_THE_MONTHLY_WEEKDAY: "Le || du mois.",

REMOVE: "Retirer",

ERROR: "Erreur",
ERROR_HEADER: "Veuillez vérifier l'élément ci-dessous :",

WARNING: "Avertissement",
WARNING_HEADER: "Avertissement",

CREATED_BY: "Créé par ${0}",
CREATED_ON: "Créé le ${0}",
UPDATED_ON: "Mis à jour le ${0}",
CREATED_ON_TODAY_OR_TOMORROW: "Créé le ${0}",
UPDATED_ON_TODAY_OR_TOMORROW: "Mis à jour le ${0}",
WHEN: "Quand :",
REPEATS: "Périodicité :",
DATE: "Date",
ON: "Le :",
ALL_DAY_EVENT:"Toute la journée",
ALL_DAY:"Toute la journée",
//e.g. "Tomorrow, All Day", which means a calendar event on tomorrow, which is an all day event
//e.g. "Feb 16, All Day", which means a calendar event on Feb 16, which is an all day event
DATE_ALL_DAY: "${0}, toute la journée",
RECURRENCE: "Périodicité",
SUBJECT: "Sujet :",
EVENT_TITLE: "Titre de l'événement :",
TAGS: "Etiquettes :",
DESCRIPTION: "Description :",
LOCATION: "Emplacement :",
IMAGE_URL: "URL de l'image :",
SUBMIT: "Soumettre",
SAVE: "Sauvegarder",
CANCEL: "Annuler",
SAVECLOSE: "Enregistrer et fermer",
DELETE: "Supprimer l'instance",
FROM: "De",
TO: "Pour",
CLOSE: "Fermer",
OPEN: "Ouvrir",
CLOSE_SECTION: "Fermer la section",
OPEN_SECTION: "Ouvrir la section",
NO: "Non",
CONFIRM: "Confirmer",
CLEAR_EXCEPTIONS_CONFIRM: "Vous reprogrammez plusieurs fois une réunion qui se répète. Ces instances seront toutes décalées d'une durée relative identique, y compris celles qui ont été reprogrammées précédemment. Assurez-vous d'examiner les effets de ces changements. \n\nVoulez-vous vraiment continuer ?",

DAILY: "Quotidien",
WEEKLY: "Hebdomadaire",
BIWEEKLY: "Bihebdomadaire",
EVERY_X_WEEK: "Toutes les ${0} semaine(s)",
MONTHLY: "Mensuel",
MONTHLY_BY_DAY: "Mensuellement par jour",
MONTHLY_BY_WEEKDAY: "Mensuellement par jour de la semaine",
YEARLY: "Annuel",
CUSTOM: "Personnalisée",
NONE: "Aucun",
REPEAT_NONE: "Cette entrée ne répète pas",
REPEAT_DAILY: "Cette entrée se répète quotidiennement",
REPEAT_WEEKLY: "Cette entrée se répète chaque semaine",
REPEAT_DAILY_SHORT: "quotidienne",
REPEAT_WEEKLY_SHORT: "hebdomadaire",
REPEAT_MONTHLY_SHORT: "mensuelle",

REPEATS: "Périodicité",
REPEATS_LABEL: "Périodicité :",

REPEAT_FREQUENCY_ONEWEEK: "Semaine",
REPEAT_FREQUENCY_TWOWEEKS: "2 semaines",
REPEAT_FREQUENCY_THREEWEEKS: "3 semaines",
REPEAT_FREQUENCY_FOURWEEKS: "4 semaines",
REPEAT_FREQUENCY_FIVEWEEKS: "5 semaines",

REPEAT_MONTHLY_ON_THIS_DATE: "Date :",
REPEAT_MONTHLY_ON_THIS_DAY: "Jour :",

DATE_OF_MONTH_1: "1e",
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

First_WEEK_OF_MONTH:"1er",
Second_WEEK_OF_MONTH:"2e",
Third_WEEK_OF_MONTH:"3e",
Fourth_WEEK_OF_MONTH:"4e",
LAST_WEEK_OF_MONTH:"dernier/dernière",

First_WEEK_OF_MONTH_FEMALE:"1er", //Need to translate into all language string, translation as female for pt/pt-br only, other locale same as First_WEEK_OF_MONTH
Second_WEEK_OF_MONTH_FEMALE:"2e",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Second_WEEK_OF_MONTH
Third_WEEK_OF_MONTH_FEMALE:"3e",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Third_WEEK_OF_MONTH
Fourth_WEEK_OF_MONTH_FEMALE:"4e",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as Fourth_WEEK_OF_MONTH
LAST_WEEK_OF_MONTH_FEMALE:"dernier/dernière",//Need to translate into all language string, translation as female for pt/pt-br only, other locale same as LAST_WEEK_OF_MONTH

First_WEEK_OF_MONTH_UNFEMALE:"1er",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Second_WEEK_OF_MONTH_UNFEMALE:"2e",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Third_WEEK_OF_MONTH_UNFEMALE:"3e",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
Fourth_WEEK_OF_MONTH_UNFEMALE:"4e",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939
LAST_WEEK_OF_MONTH_UNFEMALE:"dernier/dernière",//Please translate to all language files, pay attention to Greek neutral days & Portuguese male days, related defect 141684/132939

SELECT_DAY_OF_WEEK:"Sélectionner le jour de la semaine",
SELECT_WEEK_OF_MONTH:"Sélectionner la semaine du mois",
SELECT_DATE_OF_MONTH:"Sélectionner la date du mois",
Fieldset_Event:"Champs pour créer ou modifier l'événement",

MESSAGE_BY_DATE_SKIPPED : "Les mois qui ne contiennent pas cette date seront ignorés",

EVERY: "Chaque :",
UNTIL: "Jusqu'au :",
ON: "Le :",

ADD_ANOTHER: "Ajouter un autre",
REPEAT_ON: "Répéter",

ADD_EVENT: "Créer un événement",
EDIT_EVENT: "Modifier un événement",

NOTIFY: "Notifier d'autres personnes",
NOTIFY_TITLE: "Notifier d'autres personnes",
NOTIFY_OK: "Notifier",
DELETE: "Supprimer",
EDIT: "Editer",
EDIT_LABEL: "Modifier :",
EDIT_THIS_INSTANCE: "Modifier cette instance",
EDIT_THIS_SERIES: "Modifier la série entière",
FOLLOW: "Suivre",
FOLLOW_THIS_INSTANCE: "Suivre cette instance",
FOLLOW_THIS_SERIES: "Suivre la série entière",
UNFOLLOW: "Arrêter de suivre",

RSVP: "J'assisterai",
RSVP_THIS_INSTANCE: "Assister à cette instance",
RSVP_THIS_SERIES: "Assister à la série entière",
UNRSVP: "N'assistera pas",

START_TIME_AFTER_END: "L'heure de début de l'événement doit être antérieure à l'heure de fin",
START_DAY_AFTER_UNTIL_DAY: "La date de début d'un événement répété doit être antérieure à sa date de répétition",
DURATION_LARGER_THAN_24H: "La durée de l'événement ne doit pas dépasser 24 heures. Veuillez plutôt créer un événement répétitif.",
DESCRIPTION_LENGTH: 'La description est trop longue.',
SUBJECT_LENGTH: 'Le titre de l\'événement est trop long',
LOCATION_LENGTH: 'L\'emplacement est trop long',
IMAGE_URL_INVALID: 'L\'adresse URL de l\'image n\'est pas valide.',
UNTIL_DATE: 'Veuillez spécifier une date de fin d\'événement valide',
NO_REPEAT_ON: 'Au moins un jour doit être sélectionné pour un événement répétitif',
START_DATE_IN_PAST: 'L\'événement commence dans le passé',

SUBJECT_INVALID: 'Le titre de l\'événement doit être valide',
START_DATE_INVALID: 'La date de début doit être valide',
START_TIME_INVALID: 'L\'heure de début doit être valide',
END_DATE_INVALID: 'La date de fin doit être valide',
END_TIME_INVALID: 'L\'heure de fin doit être valide',
NO_MEMBER_SELECTED_NOTIFICATION_INVALID: 'Aucun membre n\'a été sélectionné. Sélectionnez au moins un membre à notifier.',

NEXT_MONTH: "Afficher le mois suivant",
PREVIOUS_MONTH: "Afficher le mois précédent",
CALENDAR_SUMMARY: "Agenda mensuel avec des tâches",

SEND: "Envoyer",
MAP_ROLE: "Les membres ont le rôle suivant :",
READ_ACCESS: "Lecteur",
AUTHOR_ACCESS: "Auteur (crée et édite ses propres événements)",
SAVE: "Sauvegarder",
PREF_FORM_TITLE: "Modifier les paramètres du calendrier",
TAB_UPCOMING: "Evénements",
TAB_CALENDAR: "Vue calendrier",
SUMMARY: "Résumé",
DETAILS: "Détails",
EVENT_TIME: "Heure de l'événement",
UPDATED: "Actualisé",
SORT_ASC: "Trier par ordre croissant",
SORT_DESC: "Trier par ordre décroissant",
TODAY: "Aujourd'hui",
TOMORROW: "Demain",
YESTERDAY: "Hier",
EVENT_NAME: "Nom de l'événement",
SHOW_DETAILS: "Afficher les détails",
SHOW_PASTEVENTS: "Afficher les événements passés",
SHOW_UPCOMINGEVENTS: "Afficher les événements à venir",
HIDE_DETAILS: "Masquer les détails",
SELECT_CHECKBOX: "Cliquer pour sélectionner",
UNSELECT_CHECKBOX: "Cliquer pour désélectionner",
NO_DESCRIPTION: "Aucune description fournie",
DISPLAY: "Afficher",
REPEATS_FLAG: "(récurrent)",
STR_VIEW: "Vue :",
DISP_CALENDAR: "Grille de calendrier",
DISP_LIST: "Liste récapitulative",

GOTO_EDIT_INFO: "Vous devez suivre Actions communautaires -> Modifier la communauté -> Calendrier pour modifier les préférences.",
VIEW_ALL_EVENTS: "Afficher tous les événements",
NO_EVENT_TODAY: "Aucun événement aujourd'hui",
ONE_EVENT_TODAY: "1 événement aujourd'hui",
X_EVENTS_TODAY: "${0} événements aujourd'hui",

OK: "OK",
UPCOMING_EVENTS: "Événements à venir",
PICK_MEMBERS: "Sélectionner les membres de la communauté",
NOTIFICATION_MESSAGE: "Message",
NOTIFY_OTHERS: "Notifier les membres de la communauté",
NOTIFY_DEFAULT_MESSAGE: "Bonjour, je pense que cet événement pourrait vous intéresser.",
NOTIFY_ERROR: "Erreur lors de la notification des personnes : ${0}",
NOTIFY_SUCCESS: "Notification envoyée avec succès.",
NOTIFY_ERROR_2: "Votre événement a été enregistré, mais une erreur s'est produite lors de la notification des autres : ${0}",
INTERNAL_SERVER_ERR: "Erreur interne du serveur",
INTERNAL_SERVER_NOT_AVAILABLE: "Une erreur s'est produite lors de l'affichage du contenu. Contactez votre administrateur système.",

ALT_WARNING_ICON: "Icône d'avertissement",
ALT_CONFIRM_ICON: "Icône de confirmation",
ALT_ERROR_ICON: "Icône d'erreur",
A11Y_WARNING_LABEL: "Avertissement :",
A11Y_CONFIRM_LABEL: "Confirmation :",
A11Y_ERROR_LABEL: "Erreur :",

TAB_ABOUT: "A propos de",
TAB_COMMENT: "Commentaires (${0})",
ADD_COMMENT: "Ajouter un commentaire...",
ENTER_COMMENT: "Entrez votre commentaire :",
ENTER_COMMENT_ERROR: "Entrez votre commentaire et cliquez sur Enregistrer. Si vous ne souhaitez plus laisser de commentaire, cliquez sur Annuler.",
COMMENT_META: "${0} a commenté sur/le ${1}",
CONFIRM_DELETE_COMMENT: "Voulez-vous vraiment supprimer ce commentaire ?",
NO_COMMENT: "Il n'y a aucun commentaire.",

EVENT_DELETE_ERROR: "La suppression de l'événement a échoué. Il se peut que l'événement ait déjà été supprimé. Veuillez actualiser la page et réessayer.",


TAB_ATTENDEE: "Personnes assistant à l'événement : ${0}",
NO_ATTENDEE: "Aucune personne n'assiste à l'événement.",
NO_INSTANCE: "Il n'y a aucun événement à venir.",
NO_UPCOMING_FOLLOWED: "Vous ne suivez aucun événement à venir.",
NO_UPCOMING_ATTENDED: "Vous n'assistez à aucun événement à venir.",
NO_UPCOMING_FOLLOWATTENDED: "Vous ne suivez ni n'assistez à aucun événement à venir.",

FOLLOWED_EVENTS_LABEL: "Evénements que vous suivez :",
ATTENDED_EVENTS_LABEL: "Evénements auxquels vous prévoyez d'assister :",
FOLLOWATTENDED_EVENTS_LABEL: "Evénements que vous suivez et auxquels vous prévoyez d'assister :",

PAGING_INFO: "${0} à ${1} sur ${2}",
PAGING_INFO_TITLE: "Affichage des éléments ${0} à ${1} sur ${2}",
PAGING_PREVIOUS: "Précédent",
PAGING_PREVIOUS_TITLE: "Page précédente",
PAGING_NEXT: "Suivant",
PAGING_NEXT_TITLE: "Page suivante",
PAGING_SHOW: "Afficher",
PAGING_LABEL: "Pagination",

PAGING_COMMENT_LABEL:"Envoi de commentaires (contrôle supérieur)",
PAGING_COMMENT_BOTTOM_LABEL:"Envoi de commentaires (contrôle inférieur)",
PAGING_ATTENDEE_LABEL:"Avertissement des participants (contrôle supérieur)",
PAGING_ATTENDEE_BOTTOM_LABEL:"Avertissement des participants (contrôle inférieur)",

PAGING_ITEMS: "éléments",
PAGING_PAGE_TITLE: "Afficher ${0} éléments par page",
PAGING_PAGE_TITLE2: "Page ${0}",
PAGING_PAGE_TITLE3: "Cliquer pour afficher ${0} articles par page",
PAGING_JUMPTO: "Aller à la page ${0} sur ${1}", // e.g. jump to page 1 of 10, here ${1} is the total number of item pages, ${0} is an input box that allow user to specify a page to jump to
PAGEING_PAGE_NUM_TITLE: "Numéro de page",
PAGEING_JUMP_LABEL:"Un changement de la valeur actualisera les résultats de la page",

DETAIL_WHEN: "Lorsque : ${0} ${1}",		// eg, When: Monday Aug 11,2011
DETAIL_TIME: "Heure : ${0} - ${1}",	// eg, Time: 10:00 AM - 11:AM

ABOUT_BY: "${0} par ${1}",
ABOUT_ADDED: "Créé :",
ABOUT_UPDATED: "Mise à jour :",

WITH_TAGS: "Avec étiquettes :",
TAGS_TITLE: "Mots clés",
TAGS_REMOVE_HINT: "Supprimer la balise ${0} des balises de filtrage sélectionnées",

HELP: "Aide",
CLOSE_HELP: "Fermer l'aide",

TAGCLOUD_HELP: "Une étiquette est un mot-clé que vous attribuez à une communauté pour la catégoriser et faciliter sa recherche. Entrez un nom ou cliquez sur une étiquette pour afficher les événements communautaires associés. Les étiquettes populaires sont affichées dans une police de caractères plus grande dans le nuage d'étiquettes.",
//start - end
DURATION_SPAN: "${0} - ${1}",
LOADING: "Chargement...",
NOT_AUTHORIZED: "Vous n'êtes pas autorisé(e) à exécuter cette action.",
STARTS:"Début :",
ENDS:"Fin :",

//e.g. Today at 4:00 PM - 5:00 PM,
//Here, ${0} could be "Today", "Tomorrow", "Feb 20, 2013", etc
//      ${1} could should be a time range, e.g. "4:00 PM - 5:00 PM", etc
AT:"${0} à ${1}",

// EDIT FORM
EVENT_EDITOR_TAGS_HELP: "Une étiquette est un mot clé que vous affectez au contenu pour en faciliter la recherche. Les étiquettes doivent être un seul mot, comme paie ou ressources_humaines, séparés par des virgules ou des tirets bas.",
INVALID_CHAR_IN_TAG: "La liste des étiquettes que vous avez entrée contient le caractère non valide '&'.  Veuillez retirer ce caractère de la liste des étiquettes.",

NO_UPCOMING_EVENTS_MSG_SHORT: "Il n'y a aucun événement à venir.",
NO_UPCOMING_EVENTS_MSG: "Il n'y a aucun événement à venir dans cette communauté.",
NO_PAST_EVENTS_MSG: "Il n'y a aucun événement passé dans cette communauté.",

OWNER: "Propriétaire",
MEMBER: "Membre",

EVENT_DETAIL_VIEW_TOOLBAR_LABEL: "Actions d'événement",
EVENT_VIEWS_NAVIGATION: "Vues des événements",

EVENTS_VIEW_TOOLBAR_LABEL: "Actions d'événement",

ALLDAY_UPDATED_MSG_HINT: "Les heures de début et de fin de l'événement ont été mises à jour en conséquence.",

EVENT_STARTTIME_LABEL: "Heure de début de l'événement",
EVENT_ENDTIME_LABEL: "Heure de fin de l'événement",

REPEATS_ENABLE_DISABLE_HINT: "Cliquer pour activer ou désactiver les options de répétition",
REPEATING_OPTIONS_HINT: "Options de répétition",

// e.g. Enter a date. Example: April 15, 2012.
ENTER_DATE_EXAMPLE: "Entrez une date. Exemple : ${0}",
ENTER_TIME_EXAMPLE: "Saisir une heure. Exemple : ${0}",

REQUIRED: "Obligatoire",

COLLAPSED_SECTION: "Section réduite",
EXPANDED_SECTION: "Section développée",

REPEATING_EVENTS_EDIT_TYPE_HELP: "Modifiez seulement cette instance ou la série entière. L'édition de la série entière n'annulera pas les modifications que vous avez précédemment apportées aux instances unitaires de cet événement.",

REPEATING_FREQUENCY: "Fréquence de répétition",
REPEATING_UNTIL: "Répéter jusqu'à",
REPEATING_ON: "Répéter",

CALENDAR_PREF_SAVE_CONFIRM: "Vos modifications apportées au calendrier ont été enregistrées.",
HIDE_THIS_MESSAGE: "Masquer ce message",

EVENT_OPEN_ERR_NOTFOUND: "L'ouverture de l'événement communautaire a échoué. Cause possible : l'événement a déjà été supprimé.",

LINK_OPEN_IN_NEW_WINDOW_INFO: "${0} (heure :${1}, lieu :${2}).",
LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION: "${0} (heure :${1}).",
LINK_OPEN_INFO: "${0} (heure :${1}, lieu :${2}).",
LINK_OPEN_INFO_NOLOCATION: "${0} (heure :${1}).",
LINK_OPEN_IN_NEW_WINDOW:"Cliquez sur le lien pour l'ouvrir dans une nouvelle fenêtre.",

WARNING_ICON: "Icône d'avertissement",

MENTION: {
	NOT_MEMBER_WARNING: "Les personnes mentionnées suivantes ne pourront pas voir le message car elles ne sont pas membres de la communauté.",
	NOT_SAME_ORGANIZATION_WARNING: "Les personnes mentionnées suivantes ne pourront pas voir le message car elles appartiennent à une autre organisation."
},
SELECT_ALL: "Sélectionner tout"
})
