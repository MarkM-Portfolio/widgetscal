/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("dwa.cv.calendarView");
dojo.require("dijit._Widget");
dojo.require("dwa.date.calendar");
dojo.require("dwa.date.dateFormatter");
dojo.require("dwa.common.utils");
dojo.require("dwa.common.commonProperty");
dojo.require("dwa.common.notesValue");
dojo.require("dwa.common.graphics");
dojo.require("dwa.common.listeners");
dojo.require("dwa.cv.calendarDataStore");
dojo.require("dwa.date.altCalendarFormatter");
dojo.require("lconn.core.globalization.bidiUtil");
dojo.requireLocalization("dwa.date", "calendar");
dojo.requireLocalization("dwa.date", "calendarConfig");
dojo.requireLocalization("dwa.cv", "calendarView");
dojo.requireLocalization("dwa.cv", "calendarViewConfig");

/*--Bidi Start--*/
dojo.require("dojox.date.islamic");
dojo.require("dojox.date.islamic.Date");
dojo.require("dojox.date.islamic.locale");

dojo.require("dojox.date.hebrew");
dojo.require("dojox.date.hebrew.Date");
dojo.require("dojox.date.hebrew.locale");
dojo.require("lconn.core.globalization.api");
var api = lconn.core.globalization.api, 
cfg = lconn.core.globalization.config.CALENDAR,
___hd = dojox.date.hebrew,
___id = dojox.date.islamic,
___gd = dojo.date;

/*--Bidi End--*/
var D_LITECAL_TEXT_WIDTH           = 8;	// Width of normal text
var D_LITECAL_TEXT_HEIGHT         = 16;	// height of normal text (used for status bar, navigator and footer)
var D_LITECAL_HOVER_MINWIDTH=200;

var D_ALIGN_DEFAULT = "left";
var D_ALIGN_REVERSE = "right";
var D_PADDING_DEFAULT = "padding-left";
var D_PADDING_REVERSE = "padding-right";
var D_BORDER_DEFAULT = "border-left";
var D_BORDER_REVERSE = "border-right";

var D_DateFmt_Medium=3;
var D_DateFmt_FullMonth4Yr=10;
var D_TimeFmt_NoAMPM = 100;
var D_TimeFmt_Default=101;
var D_TimeFmt_Hour=102;
var D_TimeFmt_Space=103;
var D_DateFmt_Full=4;
var D_DateFmt_Month4Yr = 16;

var D_RLE="&#8235";
var D_PDF="&#8236";
var CS_ENTRY_TYPE_MEETING="Meeting";
var CS_ENTRY_TYPE_EVENT= "Event";
var CS_ENTRY_TYPE_ANNIVERSARY= "Anniversary";
var CS_ENTRY_TYPE_UNPROCESSED= "Unprocessed";
var CS_ENTRY_TYPE_TODO= "Todo"



var _isIE = (function() {
	if ( navigator.userAgent.indexOf("Trident/7.0") >= 0){
		return function(){ 
			return dojo.isIE || 11; 
		}
	} else if (navigator.userAgent.indexOf("Edge/") > 0) {
		return function() {
			return dojo.isIE || 14;
		}
	} else {
		return function(){ 
			return dojo.isIE; 
		}
	}		
})();

dojo.declare(
	"dwa.cv.calendarView",
	dijit._Widget,
{
	baseClass: "s-panel-content-border",

	store: "",
	actions: "",
	type: "W",
	summarize: false,
	date: "", // ex. "2009/10/06"
	query: {},
	autoRender: true,

	isRTL: false,

	// com_ibm_dwa_globals.oSettings
	sLanguagePreference: "en",
	bNamePreference: "",
	bIsArchive: false,

	// com_ibm_dwa_globals.oSettings.oCalendarData
	fDisableInPlaceEdit: false,

	CalendarTimeSlotStart: "T0700",
	CalendarTimeSlotEnd: "T1900",
	CalendarTimeSlotDuration: '30',

	UseCurrentTimeZone: '',
	CurTimeZoneLabel: '',
	UseAddlTimeZone: '',
	AddlTimeZoneLabel: '',
	AdditionalTimeZone: '',
	WorkDays: '',

	sDateFormat: "",
	sDateSep: "",
	sDateFormatLong: "",
	sTimeFormat: "",
	sTimeSep: "",

	// nFirstDayMonth: 1, // we assume nobody wants the calendar to start from Sunday...
	nFirstDayMonth: "",
	nFirstDayFiveDay: -1,
	nFirstDayWeek: -1,

	// 0 - Alternate (Secondary) calendar is disabled
	// 1 - Hijri (Not implemented yet)
	// 2 - Hebrew
	// 3 - Japanese Six Day
	nCalViewAltCal: 0,

	// 0 - Drag and Drop is not supported in calendar view
	// 1 - Smooth Drag and Drop
	// 2 - Discrete (Snapping) Drag and Drop
	nCalViewDragDrop: 1,

	monthCounter: 0,
	
	useFooterMenu: false,
	fUseCalendarLite: false,
	fEmulateDblClick: false,
	isMouseOver: true,

	// Display AM/PM
	f24Hour: dojo.date.locale.format(new Date(1111, 0, 1, 22, 0, 0)).indexOf('22') != -1,
	
	_stores: null,
	_actionsObjs: null,

	postMixInProperties: function(){
		this._msgs = {};
		dojo.mixin(this._msgs, dojo.i18n.getLocalization("dwa.date", "calendar", this.lang));
		dojo.mixin(this._msgs, dojo.i18n.getLocalization("dwa.date", "calendarConfig", this.lang));
		dojo.mixin(this._msgs, dojo.i18n.getLocalization("dwa.cv", "calendarView", this.lang));
		dojo.mixin(this._msgs, dojo.i18n.getLocalization("dwa.cv", "calendarViewConfig", this.lang));
		var c = new dwa.date.dateFormatter().oCalendarData;
		dojo.forEach(["sDateFormat", "sDateSep", "sDateFormatLong", "sTimeFormat", "sTimeSep", "nFirstDayMonth", "nFirstDayFiveDay", "nFirstDayWeek"],
		function(s){
			if(this[s] === "" || this[s] === -1){
				this[s] = c[s]; // copy the default nls value
			}else{
				c[s] = this[s]; // use the given parameter
			}
		}, this);

		if(this.f24Hour && !this.sTimeFormat){
			this.sTimeFormat = "HH:mm";
		}

		this.fSummarize = this.summarize;
		if(!dojo._isBodyLtr()){
			this.isRTL = true;
		}
		if(this.isRTL){
			D_ALIGN_DEFAULT = "right";
			D_ALIGN_REVERSE = "left";
			D_PADDING_DEFAULT = "padding-right";
			D_PADDING_REVERSE = "padding-left";
			D_BORDER_DEFAULT = "border-right";
			D_BORDER_REVERSE = "border-left";
		}
		this._stores = [];
		if(this.store){
			if(typeof(this.store) == "string"){
				var arr = this.store.split(',');
				for(var i in arr){
					this._stores.push(dojo.getObject(arr[i]));
				}
			}else if(this.store instanceof Array){
				this._stores = this.store;
			}else{
				this._stores.push(this.store);
			}
		}
		this._actionsObjs = [];
		if(this.actions){
			if(typeof(this.actions) == "string"){
				var arr = this.actions.split(',');
				for(var i in arr){
					this._actionsObjs.push(dojo.getObject(arr[i]));
				}
			}else if(this.actions instanceof Array){
				this._actionsObjs = this.actions;
			}else{
				this._actionsObjs.push(this.actions);
			}
		}
		for(var i = 0; i < this._actionsObjs; i++) {
			this._actionsObjs[i].widget = this;
		}
		this.inherited(arguments);
	},

	preRender: function(){
		var sId = this.id;
		this.sId = sId;

		// UI for Thema
		this.sConflictBar = this.getComputedStyle('timeslot-entry-conflict', 'right')? 'right':
		                    this.getComputedStyle('timeslot-entry-conflict', 'left')? 'left': '';
		this.fRoundCouner = this.getComputedStyle('timeslot-entry-roundcorner', 'display') != 'none';
		this.sColorBar    = this.getComputedStyle('timeslot-entry-colorbar', 'textAlign') || '';
		this.nPadding     = this.getComputedStyle('timeslot-entry', 'paddingTop') || 0;
		this.nTimeslotIndicatorWidth = this.f24Hour ? 40 : 32;
		this.nTimeslotHeaderHeight = this.getComputedStyle('timeslot-header', 'height');
		this.nGridHeaderHeight = this.getComputedStyle('grid-header', 'height');

		// Time format for Thema
		this.sTimeFmtNav = D_DateFmt_Full;
		this.sTimeFmtTimeSlot = this.nTimeslotIndicatorWidth < 40? D_TimeFmt_Hour: D_TimeFmt_NoAMPM;
		this.sTimeFmtHeaderWeekEnd = this.nTimeslotHeaderHeight < 32? this._msgs["D_DTFMT_CALVIEW_FLAT_SHORT"]: this._msgs["D_DTFMT_CALVIEW_TINY"];
		this.sTimeFmtHeaderNarrow  = this.nTimeslotHeaderHeight < 32? this._msgs["D_DTFMT_CALVIEW_FLAT_SHORT"]: this._msgs["D_DTFMT_CALVIEW_SHORT"];
		this.sTimeFmtHeader        = this.nTimeslotHeaderHeight < 32? this._msgs["D_DTFMT_CALVIEW_FLAT_LONG"]: this._msgs["D_DTFMT_CALVIEW_LONG"];
		this.nTimeFmtSummary       = this.nTimeslotHeaderHeight < 32? D_TimeFmt_Space: D_TimeFmt_Default;

		// Position of date and icon in summary view
		this.sExpandIcon = this.getComputedStyle('summary-icon-expand', 'textAlign') || '';

		this.sTimeSlotStart = this.CalendarTimeSlotStart;
		this.sTimeSlotEnd = this.CalendarTimeSlotEnd;

		dojo.attr(this.domNode, "role", "grid");
		this.domNode.style.overflow = "hidden";
		if(_isIE() && dojo.hasClass(dojo.body(), "dijit_a11y"))
			dojo.addClass(this.domNode, "s-background-none-iebug-in-hc");
	
		// Images
		this.sTransparent = this._blankGif;
		this.sBasicIcons = this.getComputedStyle('basicicons', 'backgroundImage') || this.buildResourcesUrl('basicicons_ll.png');
		if(this.sBasicIcons.uri){
			this.sBasicIcons = this.sBasicIcons.uri;
		}
		this.sColIcons = this.getComputedStyle('colicons', 'backgroundImage') || this.buildResourcesUrl('colicons.gif');
		if(this.sColIcons.uri) {
			this.sColIcons = this.sColIcons.uri;
		}
		this.sDateColumnIcon = this.getComputedStyle('datecolicon', 'backgroundImage');
		if (this.sDateColumnIcon)
			this.sDateColumnIcon += ' 16 16 151 85';

		this.sTimeSlotStart = this.CalendarTimeSlotStart;
		this.sTimeSlotEnd = this.CalendarTimeSlotEnd;

		// set current date time
		if(this.date){
			this.oCalendar = (new dwa.date.calendar).setISO8601String(this.date);
		}else{
			this.oCalendar = (new dwa.date.calendar).setDate(new Date());
		}
		this.oCalendar.fDateOnly = false;
		this.oCalendar.nHours = (new dwa.date.calendar).setISO8601String(this.sTimeSlotStart).nHours;
		this.oCalendar.nMinutes = this.oCalendar.nSeconds = this.oCalendar.nMilliseconds = 0;
		this.oCalendar.setUTCDate(this.oCalendar.getUTCDate()); // Obtain day of the week
	
		// do not select time slot by default so that new entry has current time until user apparently selects time slot (SPR BCOE7F3SJY)
		this.bDateSelected = true;
	
		// clear array for calendar enrty
		this.aoData = [];
		this.nEntries = 0;
	
		// get width of scroll bar
		this.getScrollBarWidth('s-cv-timeslot lotusStyledScroll');
	
		// get height of text element
		this.nTextHeight = this.getTextHeight('s-cv-text');
		this.nMinCellHeightDef = this.getComputedStyle('timeslot-cell-15', 'height');
		this.nMinCellHeight	 = Math.max(Math.floor(this.nTextHeight * 1.25), this.nMinCellHeightDef);
	
		// Set the activity handler for use
		this.sActivityHandler = this.domNode.getAttribute('com_ibm_dwa_ui_calendarView_indicatorTab');

//_ak//need to call this to make date related members be in sync with oCalendar
		this.setViewDateRange(this.oCalendar);
		// kami (register dojo.data datastores)
		this.oCalendarDataStore = dwa.cv.calendarDataStore.getInstance();//maybe to be revised.
		this.oCalendarDataStore.registerViewWidget(this);
		for(var i = 0; i < this._stores.length; i++){
			this.oCalendarDataStore.registerDataLoader(this._stores[i]);
		}
		this.oCalendarDataStore.setActivityHandler(this.sActivityHandler);

		// Message to display in status indictor
		this.sStatus = '';
	
		// True if this calendar widget is activated
		this.fActivated = true;
	
		// Support for additional time zone
		this.fUseTimeZone = (this.UseCurrentTimeZone == '1');
		// Always display time zone label in time slot views. System time zone is unavailable in Safari. (SPR JLJE7VQPD2)
		this.sTimeZone = this.CurTimeZoneLabel;
		this.fUseAddTimeZone = (this.UseAddlTimeZone == '1');
		if (this.fUseAddTimeZone) {
			this.oAddTimeZone = new dwa.date.zoneInfo(this.AdditionalTimeZone);
			this.sAddTimeZone = this.AddlTimeZoneLabel;
		}
	
		// Disable Drag&Drop and In-Place Edit (SPR NYWU7ES59M)
		this.fDisableDragDrop = this.nCalViewDragDrop == 0;
	
		// Time slot duration
		this.nCellHeight60  = this.getComputedStyle('timeslot-cell-60', 'height');
		this.nCellHeight30 = this.getComputedStyle('timeslot-cell-30', 'height');
		this.nCellHeight15 = this.getComputedStyle('timeslot-cell-15', 'height');
		var sTmp = this.CalendarTimeSlotDuration;
		if (sTmp == '15' || sTmp == '30') {
			this.nTimeSlotDur   = sTmp - 0;
			this.nMinGridHeight = (sTmp == '15'? this.nCellHeight15: this.nCellHeight30);
			this.nCellHeight    = (sTmp == '15'? 4: 2) * this.nMinGridHeight;
		} else {
			this.nTimeSlotDur   = 60;
			this.nMinGridHeight = this.nCellHeight = this.nCellHeight60;
		}
	
	
		// show alternate name
		this.bShowAlternateName = this.sLanguagePreference && this.bNamePreference;
	
		// consolidated images
		this.asConsolidateImages = {};
	
		if(_isIE()){
			// dotted border of <A> tag sometimes disappear in IE7 on Vista.
			// We can't put it under our control so we use <DIV> tag with dotted border for IE7.
			// The reason why we don't use it for other browser is that:
			//   IE6 - There is not problem with <A> tag in IE6. Also, dotted border looks like dashed border in IE6.
			//   Firefox - There is not problem with <A> tag in Firefox.
			//   Safari - There is not problem with <A> tag. Also, focus is displayed with blue shadow in Safari.
			var i = navigator.appVersion.indexOf('MSIE');
			//this.fIE7Hack = (i != -1 && parseInt(navigator.appVersion.substr(i + 4)) == 7);
			//LC Doesn't support IE7 , On IE8,9 with "compatible; MSIE 7.0;" it has no such issue
			this.fIE7Hack = false;
		}
	
		this.sWorkDays = this.WorkDays;
		if (this.sWorkDays) {
			this.oWeekEnd = [];
			this.oDaysMap['F'] = 0;
			for (var i=0; i<7; i++) {
				this.oWeekEnd[i] = this.sWorkDays.indexOf(i + 1) == -1;
				this.oDaysMap['F'] += this.oWeekEnd[i]? 0: 1;
			}
		}
	
		this.nFirstDayInYear = this.nFirstDayInYear;
		this.nMinDaysInFirstWeek = this.nMinDaysInFirstWeek;
	
		this.bCanCreate = !this.bIsArchive;

		if(dojo.isWebKit){
			var gbIsIPod = /iPhone|iPod|iPad|Android/.test(navigator.userAgent);
			this.fEmulateDblClick = this.fEmulateDblClick || gbIsIPod;
			this.fDisableHover = gbIsIPod;
		}

		if(_isIE()){
			// Should not move focus in Portal environment or scroll bar of visible area may be unexpectedly moved in Internet Explorer. (SPR THIO89S6U5)
			this.fPreventFocusInPortal = this.fPreventFocusInPortal;
		}

		this.isMac = (navigator.userAgent.match(/Mac|iPhone/i));

		this.initColorMap();
		if (!this.oColorMap['header-bg-light'])
			this.fDelayed = true;

		this.bDisableHover = this.getComputedStyle('entry-hover', 'display') == 'none';
	},
	startup: function(){
		if(this._started){return;}
		this.inherited(arguments);
		this.preRender();
		if(this.autoRender){
			this.render();
		}
	},
	destroy: function(){
		this.datePicker && this.datePicker.destroy();

		if(this.oCalendarDataStore){
			for(var i = 0; i < this._stores.length; i++){
				this.oCalendarDataStore.unregisterDataLoader(this._stores[i]);
			}
			this.oCalendarDataStore.unregisterViewWidget(this);
		}
		dwa.common.commonProperty.get('p-contentarea-width').detach(this);
		dwa.common.commonProperty.get('p-body-height').detach(this);
		dwa.common.commonProperty.get('p-e-calendarview-currentselected').detach(this);
		this.inherited(arguments);
	},
	resize: function(changeSize, resultSize){
		if(changeSize || resultSize){
			dojo.marginBox(this.domNode, changeSize||resultSize);
		}
		this.adjustCalendar();
	},
	render: function(){
		dwa.common.commonProperty.get('p-e-calendarview-currentselected').attach(this); // kami (to call observe())
		this.drawCalendar(this.type, this.fSummarize);
		this.onActivated();
	},
	oDaysMap: {
		'D':1, 'T':2, 'F':5, 'W':7, '2':14, 'M':30, 'Y':365
	},
	getScrollBarWidth: function(sClass){
		if(this.nScrollBarWidth)
			return this.nScrollBarWidth;
	
		var oDiv = dojo.doc.getElementById('com_ibm_dwa_ui_calendarView_scrollBarDiv');
		// create temporary element if not exist
		if (!oDiv) {
			oDiv = dojo.doc.body.appendChild(dojo.doc.createElement('DIV'));
			oDiv.id = 'com_ibm_dwa_ui_calendarView_scrollBarDiv';
			if (sClass)
				oDiv.className = sClass;
			this.setStyle(oDiv, {
				D_ALIGN_DEFAULT: '-100px',
				top: '0px',
				width: '100px',
				height: '100px',
				overflow: 'scroll',
				// visibility: 'hidden',
				position: 'absolute'
			});

			if(!_isIE()){
				oDiv.style.mozBoxSizing = 'border-box';
			}
		}
	    this.nScrollBarWidth = oDiv.offsetWidth - oDiv.clientWidth;
		dojo.doc.body.removeChild(oDiv);
	    return this.nScrollBarWidth;
	},
	// nakakura
	// use this function only in timeslot view
	getScrollTopMinutes: function() {
		var nScrollTop = dojo.doc.getElementById(this.sId + '-timeslot').scrollTop;
		var nMinutes = Math.ceil(nScrollTop / this.nMinGridHeight) * this.nTimeSlotDur;
		return (0 <= nMinutes && nMinutes < 24 * 60) ? nMinutes : 0;
	},
	getTextSize: function(sClass, fForceReset, sHtml, oStyle){
		if(this.tmpTextHeight && !fForceReset)
			return this.tmpTextHeight;
	
		var oDiv = dojo.doc.getElementById('com_ibm_dwa_ui_calendarView_textHeightDiv');
		// create temporary element if not exist
		if (!oDiv) {
			oDiv = this.domNode.appendChild(dojo.doc.createElement('DIV'));
			oDiv.id = 'com_ibm_dwa_ui_calendarView_textHeightDiv';
			this.setInnerHtml(oDiv, sHtml? sHtml: 'A');
			if (sClass)
				oDiv.className = sClass;
			this.setStyle(oDiv, {
				D_ALIGN_DEFAULT: '-100px',
				top: '0px',
				visibility: 'hidden',
				position: 'absolute',
				border: '1px solid black'
			});
			if(!_isIE()){
				oDiv.style.mozBoxSizing = 'border-box';
			}
			if (oStyle)
				this.setStyle(oDiv, oStyle);
		}
	    var nWidth = Math.max(oDiv.offsetWidth, D_LITECAL_TEXT_WIDTH);
	    var nHeight = Math.max(oDiv.offsetHeight, D_LITECAL_TEXT_HEIGHT);
	    this.domNode.removeChild(oDiv);
	    return {nWidth:nWidth, nHeight:nHeight};
	},
	getTextHeight: function(sClass, fForceReset, sHtml, oStyle){
		var oSize = this.getTextSize(sClass, fForceReset, sHtml, oStyle);
		return (oSize? oSize.nHeight: D_LITECAL_TEXT_HEIGHT);
	},
	getTextWidth: function(sClass, fForceReset, sHtml){
		var oSize = this.getTextSize(sClass, fForceReset, sHtml);
		return (oSize? oSize.nWidth: D_LITECAL_TEXT_WIDTH);
	},
	initColorMap: function() {
		this.oColorMap = {};

		var oMap = {'header-bg':false, 'header-today':false, 'entry-selected':true /* also obtain border and font colors */};
		for (var s in oMap) {
			this.oColorMap[s + '-light'] = this.getComputedStyle(s + '-gradient', 'borderTopColor');
			this.oColorMap[s + '-dark'] = this.getComputedStyle(s + '-gradient', 'borderBottomColor');
			if (oMap[s]) {
				this.oColorMap[s + '-border'] = this.getComputedStyle(s + '-gradient', 'borderRightColor');
				this.oColorMap[s + '-font'] = this.getComputedStyle(s + '-gradient', 'color');
			}
		}

		return;
	},
	getComputedStyle: function(sClass, sStyle, fNoConv) {
		if (typeof(sClass) == "string") {
			oDiv = dojo.doc.getElementById(sClass);
			if (!oDiv) {
				var sId = this.sId + '_getComputedStyle_' + sClass;
				var oDiv = dojo.doc.getElementById(sId);
			}
			if (!oDiv) {
				oDiv = dojo.doc.createElement('DIV');
				this.setInnerHtml(oDiv, '<div id="' + sId + '" class="s-cv-' + sClass + '"></div>');
				oDiv = this.domNode.appendChild(oDiv.firstChild);
			}
		} else {
			oDiv = sClass;
		}

		if (_isIE() < 14)
			var oStyle = oDiv.currentStyle;
		else
			var oStyle = dojo.doc.defaultView.getComputedStyle(oDiv, '');

		// height and width need conversion
		if (!fNoConv) {
			if (sStyle == 'height')
				return oDiv.offsetHeight || parseInt(oStyle[sStyle]);
			else if (sStyle == 'width')
				return oDiv.offsetWidth || parseInt(oStyle[sStyle]);
			else if (sStyle == 'left' || sStyle == 'right' || sStyle == 'paddingTop')
				return oStyle[sStyle] == 'auto'? void 0: parseInt(oStyle[sStyle]);
			else if (sStyle == 'background-image' || sStyle == 'backgroundImage') {
				sStyle = 'backgroundImage';
				if (oStyle['backgroundImage'].indexOf('url("') == 0)
					return oStyle['backgroundImage'].slice(5, oStyle['backgroundImage'].length - 2);
				else if (oStyle['backgroundImage'].indexOf('url(') == 0)
					return oStyle['backgroundImage'].slice(4, oStyle['backgroundImage'].length - 1);
				else if (oStyle['backgroundImage'] == 'none')
					return '';
			}
		}
		return oStyle[sStyle];
	},
	 _oTypeMap: {
	 	"D": "Day",
		"T": "2 Days",
		"F": "Work Week",
		"W": "Week",
		"2": "2 Weeks",
	 	"M": "Month",
		"Y": "Year"
	},
	setInnerHtml: function(oElem, sHtml) {
		oElem.innerHTML = sHtml;
	},
	generateNavigatorHtml: function(){
		var asHtml = [], n = 0;

		// status indicator
		asHtml[n++] = '<div id=' + this.sId + '-status class="s-cv-grid s-cv-nav s-cv-text '
				+ (this.sStatus? '': 'dijitHidden') + '"'
				+ ' style="top:0px;' + D_ALIGN_DEFAULT + ':0px;width:100%;height:' + this.nTextHeight + 'px;padding:0px 2px;text-align:' + D_ALIGN_DEFAULT + ';font-weight:bold;" unselectable="on">'
				+ this.sStatus + '</div>';

		// date navigator
		asHtml[n++] = '<div id=' + this.sId + '-navigator class="s-cv-grid s-cv-nav" style="' + D_ALIGN_DEFAULT + ':0px;width:100%;height:' + this.nTextHeight + 'px;" unselectable="on">'
				+ '<table role="presentation" id=' + this.sId + '-navigator-innerframe class="s-cv-nav-innerframe" border="0" cellspacing="0" cellpadding="0"><tr>'

		if(_isIE())
			var sEvents = this._attachEvent('mouseover|mouseout|click|dblclick|keydown|focus|blur') + ' unselectable="on"';
		else
			var sEvents = this._attachEvent('mouseover|mouseout|click|keydown|focus|blur');

		// previous arrow
		var oMap = {'D': this._msgs["L_DAYVIEW_PREVIOUS_DAY"], 'T': this._msgs["L_DAYVIEW_PREVIOUS_DAY"], 'F': this._msgs["L_WEEKVIEW_PREVIOUS_WEEK"],
		            'W': this._msgs["L_WEEKVIEW_PREVIOUS_WEEK"], '2': this._msgs["L_WEEKVIEW_PREVIOUS_WEEK"], 'M': this._msgs["L_MONTHVIEW_PREVIOUS_MONTH"], 'Y': this._msgs["L_YEARVIEW_PREVIOUS_YEAR"]};
		var sTitle = this.escape(oMap[this.sType]);
		asHtml[n++] = '<td><div id="' + this.sId + '-navigator-prev" role="button" class="s-cv-text s-cv-nav-button" style="width:25px;"'
				+ ' role="gridcell" title="' + sTitle + '" hidefocus="true" tabindex="0"';
		if (8 <= _isIE() || 3 <= dojo.isFF)
			asHtml[n++] = sEvents + ' aria-labelledby="' + this.sId + '-label-prev">'
					+ '<label id="' + this.sId + '-label-prev" style="display:none">' + sTitle + '</label>';
		else
			asHtml[n++] = sEvents + '>';
		asHtml[n++] = '<span class="s-arrowText" style="top:0px">&lt;</span>'
				+ this.generateImageHtml(this.sBasicIcons, 8, 10, this.isRTL? 140: 120, 20, sTitle, undefined, true)
				+ '</div></td>';

		// date picker
		asHtml[n++] = '<td>'
				+ '<div id="' + this.sId + '-navigator-current" class="s-cv-text s-cv-nav-current s-cv-nav-button" style="overflow:hidden;"'
				+ ' role="button" hidefocus="true" tabIndex="0" ';
		if (8 <= _isIE() || 3 <= dojo.isFF)
			asHtml[n++] = sEvents + ' aria-labelledby="' + this.sId + '-label-date"><span id="' + this.sId + '-navigator-current-inner" aria-live="polite"></span>';
		else
			asHtml[n++] = sEvents + '><span id="' + this.sId + '-navigator-current-inner" aria-live="polite"></span>'

		// today indicator
		if (this.sType == 'D' && this.getComputedStyle('nav-today-button', 'display') != 'none') {
			asHtml[n++] = '<span id="' + this.sId + '-navigator-today" class="s-cv-nav-today-button"></span>';
		}

		// icon
		if (this.getComputedStyle('nav-today-icon', 'display') != 'none') {
			asHtml[n++] = '<span class="s-cv-nav-today-icon">' + this.generateImageHtml(this.sBasicIcons, 8, 10, 20, 20) + '</span>';
		}

		asHtml[n++] = '</div>'

		if (8 <= _isIE() || 3 <= dojo.isFF)
			asHtml[n++] = '<label id="' + this.sId + '-label-date" style="display:none"></label>';

		asHtml[n++] =  '</td>';

		// next arrow
		var oMap = {'D': this._msgs["L_DAYVIEW_NEXT_DAY"], 'T': this._msgs["L_DAYVIEW_NEXT_DAY"], 'F': this._msgs["L_WEEKVIEW_NEXT_WEEK"], 'W': this._msgs["L_WEEKVIEW_NEXT_WEEK"],
		            '2': this._msgs["L_WEEKVIEW_NEXT_WEEK"], 'M': this._msgs["L_MONTHVIEW_NEXT_MONTH"], 'Y': this._msgs["L_YEARVIEW_NEXT_YEAR"]};
		var sTitle = this.escape(oMap[this.sType]);
		asHtml[n++] = '<td><div id="' + this.sId + '-navigator-next" role="button" class="s-cv-text s-cv-nav-button" style="width:25px;"'
				+ ' role="gridcell" title="' + sTitle + '" hidefocus="true" tabindex="0"';
		if (8 <= _isIE() || 3 <= dojo.isFF)
			asHtml[n++] = sEvents + ' aria-labelledby="' + this.sId + '-label-next">'
					+ '<label id="' + this.sId + '-label-next" style="display:none">' + sTitle + '</label>';
		else
			asHtml[n++] = sEvents + '>';
		asHtml[n++] = '<span class="s-arrowText" style="top:0px">&gt;</span>'
				+ this.generateImageHtml(this.sBasicIcons, 8, 10, this.isRTL? 120: 140, 20, sTitle, undefined, true)
				+ '</div></td>'
				+ '</tr></table></div>';

		return asHtml.join('');
	},
	generateSelectedAreaHtml: function(sId, sStyle, fNoEvent, oEvent){
		var formatDate = function(dateString, allDay) {
			var date = lconn.calendar.CalendarUtil.dwaDateStringToDate(dateString);
			var result = lconn.core.DateUtil.toString(date, true);	// don't display time
			if (allDay == '1') 
				result += " (" + lconn.calendar.CalendarData.get()._lang.ALL_DAY + ")"
			else 
				result += " " + lconn.core.DateUtil.getLocalizedTime(date);
			
			return result;
		}
		
		var n = 0, asHtml = [];
		var needKeydown = "";
		var ariaLabel ="";
		var role ='';
		if(sId == "-header-selected-area" || sId == "-header-selected-area-for-jaws"){
			needKeydown = "|keydown";
			role = ' role="gridcell" ';
		} else if(sId == "-entry-selected-area") {
			eventItem = oEvent._item;
			var _lang = lconn.calendar.CalendarData.get()._lang;
			var eventinfo = "";
			if(eventItem.location != "") {
			    eventinfo = dojo.string.substitute(_lang.LINK_OPEN_INFO, [eventItem.subject, formatDate(eventItem.startDateTime, eventItem.allDay), eventItem.location]);
			} else {
				eventinfo = dojo.string.substitute(_lang.LINK_OPEN_INFO_NOLOCATION, [eventItem.subject, formatDate(eventItem.startDateTime, eventItem.allDay)]);
			}
			
			ariaLabel = ' aria-label="' + this._msgs["L_ENTER_INTO_ENTRY"] + dojo.string.escape(eventinfo)  + '" ';
			role = ' role="gridcell" ';
		} else if(sId == "-selected-area") {
			role = ' role="gridcell" ';
		}
		if(_isIE()){
			if (!sStyle)
				sStyle = 'display:none;' + D_ALIGN_DEFAULT + ':0px;font-size:10%;';
			asHtml[n++] = this.fIE7Hack?
					('<div id=' + this.sId + sId + ariaLabel +' role="gridcell" class="s-cv" style="' + sStyle + 'border:1px dotted gray;"'
						+ ' hidefocus="true" tabindex="0" target="' + this.sId + '-blankframe"' + (fNoEvent? '': this._attachEvent('click|focus|blur' + needKeydown)) + '></div>'):
					('<a id=' + this.sId + sId + ariaLabel +' role="gridcell" class="s-cv" style="' + sStyle + '"'
						+ ' tabindex="0" target="' + this.sId + '-blankframe"' + (fNoEvent? '': this._attachEvent('click' + needKeydown)) + '></a>');
		} else {
			if (!sStyle)
				sStyle = 'display:none;' + D_ALIGN_DEFAULT + ':0px;' + (this.bYearView? 'cursor:pointer;': ''); // change mouse cursor shape (SPR SQZO7QA83B)
			asHtml[n++] = '<a id="' + this.sId + sId + '" class="s-cv s-cv-selected-area" style="' + sStyle + '"'
					+ ariaLabel + role +' href="javascript:void(0)" ' + (fNoEvent? '': this._attachEvent('click' + needKeydown)) + '></a>'; // should not handle keyboard event here (SPR SQZO7Q9BSX)
		}
		if(8 <= _isIE() || 3 <= dojo.isFF) {
			asHtml[n++] = '<label id="' + this.sId + '-label-slot-1" style="display:none"></label>'
						+ '<label id="' + this.sId + '-label-slot-2" style="display:none"></label>';
		}
		if(dojo.isFF && sId == "-selected-area") {
			asHtml[n++] = '<label id="' + this.sId + '-label-slot-3" style="position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;"></label>';
		}
		return asHtml.join('');
	},
	generateHeaderHtml: function(){
		var asHtml = [], n = 0;
		var nDaysInRow = (this.sType=='2' || this.sType=='M'? 7: this.fSummarize? 1: this.nDays);
	
		// header background
		// in date header, use same class name with view area (SPR KZHU7PFBDU)
		asHtml[n++] = '<div id=' + this.sId + '-header  role="row" class="' + (this.bTimeSlotView? 's-cv-timeslot s-cv-timeslot-header': 's-cv-grid s-cv-grid-header') + '" style="top:0px;' + D_ALIGN_DEFAULT + ':0px;width:100%;"'
					+ this._attachEvent('click|scroll') + '>'
					+ '<div id=' + this.sId + '-header-bg class="s-cv" style="top:0px;' + D_ALIGN_DEFAULT + ':0px;width:100%;height:100%;">'
					+ this.insertGradientHtml(this.sId + '-header-gradient', 's-cv', this.oColorMap['header-bg-light'], this.oColorMap['header-bg-dark'])
					+ '</div>'
		
		// selected area
					+ '<div id=' + this.sId + '-header-today class="s-cv" style="top:0px;' + D_ALIGN_DEFAULT + ':0px;width:0px;height:100%;">'
					+ this.insertGradientHtml(this.sId + '-header-today-gradient', 's-cv', this.oColorMap['header-today-light'], this.oColorMap['header-today-dark'])
					+ '</div>';
	
		// date header
		// nakakura
		// add class="s-dateHeader" for High-Contrast Mode
		if (this.bTimeSlotView) {
			asHtml[n++] = '<div id=' + this.sId + '-header-date class="s-dateHeader s-cv-grid s-cv-text"'
						+ ' style="top:0px;' + D_ALIGN_DEFAULT + ':' + (this.fUseAddTimeZone? this.nTimeslotIndicatorWidth: 0) + 'px;width:' + this.nTimeslotIndicatorWidth + 'px;height:100%;font-weight:bold;text-align:center;"'
						+ ' title="' + this.sTimeZone + '">' + this.sTimeZone + '</div>';
			if (this.fUseAddTimeZone)
				asHtml[n++] = '<div id=' + this.sId + '-header-adddate class="s-cv-grid s-cv-text"'
							+ ' style="top:0px;' + D_ALIGN_DEFAULT + ':0px;width:' + this.nTimeslotIndicatorWidth + 'px;'
							+ 'height:100%;font-weight:bold;text-align:center;"'
							+ ' title="' + this.sAddTimeZone + '">' + this.sAddTimeZone + '</div>';
		}
		for (var i=0; i<=nDaysInRow; i++)
			asHtml[n++] = '<div id=' + this.sId + '-header-date' + i + ' role="columnheader" tabindex="-1" class="s-dateHeader s-cv-grid' + (this.bTimeSlotView? '':' s-cv-text') + '"'
						+ ' style="top:0px;height:100%;' + (this.sType=='2'||this.sType=='M'? 'text-align:center;': '') + '"></div>';
	
		// selected area
		// selected area is not needed in grid views (SPR KZHU7PFBDU)
		asHtml[n++] = (this.bTimeSlotView? this.generateSelectedAreaHtml('-header-selected-area'): '')
					+ '</div>';
	
		return asHtml.join('');
	},
	generateTimeslotHtml: function(){
		var asHtml = [], n = 0;
	
		// all day events area
		// in all day events area, use same class name with view area (SPR KZHU7PFBDU)
		var asIcon = this.sDateColumnIcon? this.sDateColumnIcon.split(' '): void 0;
		asHtml[n++] = '<div id=' + this.sId + '-allday class="s-cv-timeslot lotusStyledScroll" style="' + D_ALIGN_DEFAULT + ':0px;width:100%;height:0px;overflow:scroll;"' + this._attachEvent('keydown' + (!this.fDisableDragDrop? '|mousedown|mousemove|mouseup': '')) + ' tabindex="-1">'
					+ '<div id=' + this.sId + '-allday-date class="s-cv-grid" style="top:0px;' + D_ALIGN_DEFAULT + ':' + (this.fUseAddTimeZone? this.nTimeslotIndicatorWidth: 0) + 'px;width:' + this.nTimeslotIndicatorWidth + 'px;' + D_PADDING_DEFAULT + ':3px;padding-top:2px;' + (asIcon? D_PADDING_DEFAULT + ':' + Math.floor((this.nTimeslotIndicatorWidth - asIcon[1]) / 2) + 'px;': '') + '">'
					+ (asIcon? this.generateImageHtml(asIcon[0], asIcon[1], asIcon[2], asIcon[3], asIcon[4]): '')
					+ '</div>';
		if (this.fUseAddTimeZone)
			asHtml[n++] = '<div id=' + this.sId + '-allday-adddate class="s-cv-grid" style="top:0px;' + D_ALIGN_DEFAULT + ':0px;width:' + this.nTimeslotIndicatorWidth + 'px;"></div>';
		for (var i=0; i<=this.nDays; i++)
			asHtml[n++] = '<div id=' + this.sId + '-allday-date' + i + ' class="s-cv-grid" style="top:0px;"></div>';
		asHtml[n++] = '</div>';
	
		var oTimeFormatter = new dwa.date.dateFormatter(this.sTimeFmtTimeSlot);
	
		// time slot
		asHtml[n++] = '<div id=' + this.sId + '-timeslot class="s-cv-timeslot lotusStyledScroll" style="' + D_ALIGN_DEFAULT + ':0px;overflow:scroll;background-color:white;"'
					+ this._attachEvent('click|dblclick|keydown|contextmenu|scroll' + (!this.fDisableDragDrop? '|mousedown|mousemove|mouseup': '')) + ' tabindex="-1">';
	
		var oStart = (new dwa.date.calendar).setISO8601String(this.sTimeSlotStart);
		var oEnd = (new dwa.date.calendar).setISO8601String(this.sTimeSlotEnd);
		// "Display 24 hours" was enabled in classic UI. (SPR STER5TD6A8)
		var bDisplay24Hours = this.sTimeSlotStart == this.sTimeSlotEnd;
		if (oStart && oEnd) {
			if (!bDisplay24Hours)
				asHtml[n++] = '<div id=' + this.sId + '-timeslot-dark1 class="s-cv-timeslot-dark"'
							+ ' style="top:0px;' + D_ALIGN_DEFAULT + ':0px;'
							+ ' width:100%;height:' + Math.floor(this.nCellHeight*(oStart.nHours + oStart.nMinutes/60)) + 'px;"></div>'
							+ '<div id=' + this.sId + '-timeslot-dark2 class="s-cv-timeslot-dark"'
							+ ' style="top:' + Math.floor(this.nCellHeight*(oEnd.nHours + oEnd.nMinutes/60)) + 'px;' + D_ALIGN_DEFAULT + ':0px;'
							+ ' width:100%;height:' + Math.floor(this.nCellHeight*(24 - oEnd.nHours - oEnd.nMinutes/60)) + 'px;"></div>'
							+ '<div id=' + this.sId + '-timeslot-other class="s-cv-timeslot-other"'
							+ ' style="top:' + Math.floor(this.nCellHeight*(oStart.nHours + oStart.nMinutes/60)) + 'px;' + D_ALIGN_DEFAULT + ':0px;'
							+ 'width:100%;height:' + Math.floor(this.nCellHeight*(oEnd.nHours + oEnd.nMinutes/60 - oStart.nHours - oStart.nMinutes/60)) + 'px;"></div>'
							+ '<div id=' + this.sId + '-timeslot-today-dark1 class="s-cv-timeslot-today-dark"'
							+ ' style="top:0px;' + D_ALIGN_DEFAULT + ':0px;width:0px;'
							+ 'height:' + Math.floor(this.nCellHeight*(oStart.nHours + oStart.nMinutes/60)) + 'px;"></div>'
							+ '<div id=' + this.sId + '-timeslot-today class="s-cv-timeslot-today"'
							+ ' style="top:' + Math.floor(this.nCellHeight*(oStart.nHours + oStart.nMinutes/60)) + 'px;' + D_ALIGN_DEFAULT + ':0px;'
							+ 'width:0px;height:' + Math.floor(this.nCellHeight*(oEnd.nHours + oEnd.nMinutes/60 - oStart.nHours - oStart.nMinutes/60)) + 'px;"></div>'
							+ '<div id=' + this.sId + '-timeslot-today-dark2 class="s-cv-timeslot-today-dark"'
							+ ' style="top:' + Math.floor(this.nCellHeight*(oEnd.nHours + oEnd.nMinutes/60)) + 'px;' + D_ALIGN_DEFAULT + ':0px;'
							+ 'width:0px;height:' + Math.floor(this.nCellHeight*(24 - oEnd.nHours - oEnd.nMinutes/60)) + 'px;"></div>';
			else
				asHtml[n++] = '<div id=' + this.sId + '-timeslot-today class="s-cv-timeslot-today"'
							+ ' style="top:0px;' + D_ALIGN_DEFAULT + ':0px;width:0px;height:' + this.nCellHeight*24 + 'px;"></div>';
		}
	
		var oDate = this.oCalendar.clone();
		oDate.nMinutes = oDate.nSeconds = oDate.nMilliseconds = 0;
		this.nTimeWidth = (this.fUseAddTimeZone? this.nTimeslotIndicatorWidth*2: this.nTimeslotIndicatorWidth);
		this.nTimeSlotTopHour = (new dwa.date.calendar).setISO8601String(this.sTimeSlotStart).nHours;
		for (i=0; i<24; i++) {
			oDate.nHours = i;
			// Always show AM/PM if additional time zone is selected (SPR VSEN7X95AQ)
			var bShowAM = this.fUseAddTimeZone || i==this.nTimeSlotTopHour? i<12: i==0;
			var bShowPM = this.fUseAddTimeZone || i==this.nTimeSlotTopHour? i>=12: i==12;
			var sClass = 's-cv-grid s-cv-text s-cv-timeslot-time ' + (i<oStart.nHours||oEnd.nHours<=i? 's-cv-timeslot-column-dark ': 's-cv-timeslot-column ');
			asHtml[n++] = '<div id=' + this.sId + '-timeslot-time' + i + ' class="' + sClass + '" style="top:' + (this.nCellHeight * i) + 'px;'
						+ D_ALIGN_DEFAULT + ':' + (this.fUseAddTimeZone? this.nTimeslotIndicatorWidth: 0) + 'px;width:' + this.nTimeslotIndicatorWidth + 'px;height:' + this.nCellHeight + 'px;">'
						+ oTimeFormatter.format(oDate)
						+ (!this.f24Hour? (bShowAM? '<br>' + this._msgs["L_AM_SUFFIX"]: '') + (bShowPM? '<br>' + this._msgs["L_PM_SUFFIX"]: ''): '') + '</div>';
	
			if (this.fUseAddTimeZone) {
				var oDate2 = (new dwa.date.calendar).setDate(oDate.getDate(), this.oAddTimeZone);
				asHtml[n++] = '<div id=' + this.sId + '-timeslot-addtime' + i + ' class="' + sClass + '" style="top:' + (this.nCellHeight * i) + 'px;'
						+ D_ALIGN_DEFAULT + ':0px;width:' + this.nTimeslotIndicatorWidth + 'px;height:' + this.nCellHeight + 'px;">'
						+ oTimeFormatter.format(oDate2)
						+ (!this.f24Hour? (oDate2.nHours<12? '<br>' + this._msgs["L_AM_SUFFIX"]: '') + (oDate2.nHours>=12? '<br>' + this._msgs["L_PM_SUFFIX"]: ''): '') + '</div>';
			}
	
			asHtml[n++] = '<div id=' + this.sId + '-timeslot-grid' + i + ' class="s-cv-grid"'
						+ ' style="top:' + (this.nCellHeight * i) + 'px;' + D_ALIGN_DEFAULT + ':' + this.nTimeWidth + 'px;height:' + this.nCellHeight + 'px;"></div>';
		}
	
		if (this.nTimeSlotDur < 60) {
			for (i=0; i<24; i++)
				asHtml[n++] = '<div id=' + this.sId + '-timeslot-grid-half' + i + ' class="s-cv-grid s-cv-grid-dotted"'
							+ ' style="top:' + (this.nCellHeight * i) + 'px;' + D_ALIGN_DEFAULT + ':' + this.nTimeWidth + 'px;height:' + this.nCellHeight/2 + 'px;"></div>';
			if (this.nTimeSlotDur == 15) {
				for (i=0; i<48; i++)
					asHtml[n++] = '<div id=' + this.sId + '-timeslot-grid-quarter' + i + ' class="s-cv-grid s-cv-grid-dotted"'
								+ ' style="top:' + (this.nCellHeight/2 * i) + 'px;' + D_ALIGN_DEFAULT + ':' + this.nTimeWidth + 'px;height:' + this.nCellHeight/4 + 'px;"></div>';
			}
		}
	
		for (i=0; i<this.nDays; i++)
			asHtml[n++] = '<div id=' + this.sId + '-timeslot-date' + i + ' class="s-cv-grid"'
			            + ' style="top:0px;height:' + (this.nCellHeight * 24) + 'px;"></div>';
	
		// selected area
		asHtml[n++] = this.generateSelectedAreaHtml('-selected-area')
					+ '</div>';
	
		return asHtml.join('');
	},
	generateYearViewHtml: function(){
		var asHtml = [], n = 0;
	
		// year view
		asHtml[n++] = '<div id=' + this.sId + '-year class="s-cv lotusStyledScroll" style="' + D_ALIGN_DEFAULT + ':0px;overflow:hidden;' + D_BORDER_REVERSE + ':1px solid #7F9DB9;"';
		if(dojo.isWebKit){
			asHtml[n++] = this._attachEvent('click|contextmenu') + '>';
		}else{
			asHtml[n++] = this._attachEvent('click|keydown|contextmenu') + '>';
		}
	
		// grid for 12 months
		this.nMonthWidth = Math.floor(this.nTextHeight * 7.5);
		this.nMonthHeight = Math.floor(this.nTextHeight * 9);
		for (var i=0; i<12; i++)
			asHtml[n++] = '<div id=' + this.sId + '-month' + (i+1) + ' class="s-cv" style="width:' + this.nMonthWidth + 'px;height:' + this.nMonthHeight + 'px;"></div>';

		// selected area
		asHtml[n++] = this.generateSelectedAreaHtml('-selected-area')
					+ '</div>';
	
		return asHtml.join('');
	},
	generateSummaryViewHtml: function(){
		// summary view
		return '<div id=' + this.sId + '-summary class="s-cv s-cv-summary lotusStyledScroll" style="' + D_ALIGN_DEFAULT + ':0px;overflow:hidden;' + D_BORDER_REVERSE + ':1px solid #7F9DB9;"'
					+ this._attachEvent('click|dblclick|keydown|contextmenu|scroll' + (!this.fDisableDragDrop? '|mousedown|mousemove|mouseup': '')) + '>'
	
		// selected area
					+ this.generateSelectedAreaHtml('-selected-area')
	
		// display message while loading
					+ '<div id=' + this.sId + '-loading class="s-cv s-cv-text s-cv-summary-loading">' + this._msgs['L_LOADING_SHORT'] + '</div>'
		// display message if no entry
					+ '<div id=' + this.sId + '-noentry class="s-cv s-cv-text s-cv-summary-noentry" style="display:none;"></div>'
		// time bar
					+ this.insertTimebarHtml()
					+ '</div>';
	},
	generateGridViewHtml: function(){
		var asHtml = [], n = 0;
		var nRowsInMonth = (this.sType=='M'? 6: 2);
	
		// calendar grid
		// use same class names in header and view area (SPR KZHU7PFBDU)
		asHtml[n++] = '<div id=' + this.sId + '-grid role="row" class="s-cv-grid s-cv-grid-body lotusStyledScroll" style="' + D_ALIGN_DEFAULT + ':0px;overflow:hidden;"'
					+ this._attachEvent('click|dblclick|keydown|contextmenu|scroll' + (!this.fDisableDragDrop? '|mousedown|mousemove|mouseup': '')) + '>';
	
		for (var j=0;j<nRowsInMonth;j++) {
			for (var i=0; i<7; i++)
				asHtml[n++] = '<div id=' + this.sId + '-grid-date' + j + '-' + i + ' ' +  this._attachEvent('focus') +' class="s-cv-grid" style="top:0px;text-align:' + D_ALIGN_REVERSE + ';overflow:hidden;background-color:white;"></div>';
		}
	
		// selected area
		asHtml[n++] = this.generateSelectedAreaHtml('-selected-area')
					+ '</div>';
	
		return asHtml.join('');
	},
	generateFooterHtml: function(){
		// calendar footer
		if (this.useFooterMenu)
			return '<div id=' + this.sId + '-footer class="s-cv-text s-cv-footer" tabindex="0"'
					+ ' style="' + D_ALIGN_DEFAULT + ':0px;width:100%;height:' + this.nTextHeight + 'px;"'
					+ this._attachEvent('mouseover|mouseout|click|contextmenu|focus|blur') + '></div>';
		else
			return '<div id=' + this.sId + '-footer aria-live="polite" class="s-cv-text s-cv-footer"'
					+ ' style="' + D_ALIGN_DEFAULT + ':0px;width:100%;height:' + this.nTextHeight + 'px;border:1px solid rgb(233,236,241);"></div>';
	},
	drawCalendar: function(sType, fSummarize){
		if (this.sType == sType && this.fSummarize == fSummarize)
			return;

		if (this.fDelayed)
			this.preRender();
	
		// SPR #XLLU7MH7UZ: Old value is still effective, so invalidate
		this.asWideTimeslotHeaderHtml = this.asNarrowTimeslotHeaderHtml = void 0;
	
		this.sType = sType;
		var oElem = dojo.doc.getElementById(this.sId);
		var asHtml = [], n = 0;
	
		if (oElem) {
			if (this.oDaysMap[sType]) {
				this.nDays = this.oDaysMap[sType];
				this.fSummarize = fSummarize && sType != 'Y';
				this.bYearView = sType == 'Y';
				this.bTimeSlotView = (!fSummarize && sType != '2' && sType != 'M' && sType != 'Y');
				this.bWeekEndView = (sType == 'W' || sType == '2' || sType == 'M');
				this.nAlldayEventsInWeek = 0;
	
				// status indicator and date navigator
				asHtml[n++] = this.generateNavigatorHtml();

				// date header
				if (!this.bYearView && !this.fSummarize)
					asHtml[n++] = this.generateHeaderHtml();

				// summary view
				if (this.bYearView)
					asHtml[n++] = this.generateYearViewHtml();
				else if (this.fSummarize)
					asHtml[n++] = this.generateSummaryViewHtml();
				else if (this.bTimeSlotView)
					asHtml[n++] = this.generateTimeslotHtml();
				else
					asHtml[n++] = this.generateGridViewHtml();

				// calendar footer
				if (!this.bYearView) {
					if (this.getComputedStyle('footer', 'display') != 'none')
						asHtml[n++] = this.generateFooterHtml();
					else
						this.fHideFooter = true;
				}
			}
	
			this.setInnerHtml(oElem, asHtml.join(''));
	
			if (!this.bInit) {
				dwa.common.commonProperty.get('p-contentarea-width').attach(this);
				dwa.common.commonProperty.get('p-body-height').attach(this);
				this.bInit = true;
			}
	
			new dwa.common.consolidatedImageListener([this.sId + '-navigator'], this.sBasicIcons);
	
			if (this.sType == '2' || this.sType == 'M') {
				this.gotoDay(this.oCalendar);
			} else {
				this.adjustCalendar(true /* do not update calendar entries at this time */);
				this.gotoDay(this.oCalendar);
			}
		}
	},
	convertRGB: function(sColor1){
		// convert color from #RRBBGG format.
		if (sColor1.indexOf('#') == 0) {
			var r1 = parseInt(sColor1.slice(1,3), 16);
			var g1 = parseInt(sColor1.slice(3,5), 16);
			var b1 = parseInt(sColor1.slice(5,7), 16);
		}
		// convert color from rgb(RR,GG,BB) format.
		else if (sColor1.indexOf('rgb(') == 0) {
			var v = sColor1.replace('rgb(','').replace(')','').split(',');
			var r1 = v[0];
			var g1 = v[1];
			var b1 = v[2];
		}
		return [r1, g1, b1];
	},
	drawGradientDelayed: function() {
		var gradientIdsNext = [];
		for (var i=0; this.gradientIds.length; i++) {
			var oElem = dojo.byId(this.gradientIds[i]);
			if (oElem)
				this.drawGradient(oElem);
		}
		this.gradientTimeout = 0;
	},
	drawGradient: function(sId, sColor1, sColor2, sStrokeColor, nAlpha){
		if(dojo.hasClass(dojo.body(), "dijit_a11y"))
			return;
		var oCanvas = dojo.doc.getElementById(sId);
		if (oCanvas) {
			if(_isIE() < 9){
				// prevent invalid argument error in IE when calendar entry DIV element is not displayed yet. (SPR PTHN7EURHN)
				// width of gradient area should be narrow in BiDi. (SPR KZHU7PFBDU)
				oCanvas.style.width = oCanvas.parentNode.offsetWidth? (oCanvas.parentNode.offsetWidth - 2) + 'px': oCanvas.parentNode.style.width;
				oCanvas.style.height = oCanvas.parentNode.offsetHeight? (oCanvas.parentNode.offsetHeight - 2) + 'px': oCanvas.parentNode.style.height;
			}else{
				oCanvas.setAttribute('width', oCanvas.clientWidth);
				oCanvas.setAttribute('height', oCanvas.clientHeight);

				if (!sColor1)
					var sColor1 = oCanvas.getAttribute('color');
				if (!sColor2)
					var sColor2 = oCanvas.getAttribute('color2');
				if (!sStrokeColor)
					var sStrokeColor = oCanvas.getAttribute('color3');
				if (!nAlpha)
					var nAlpha = oCanvas.getAttribute('alpha') - 0;

				// draw round rect
				if (sStrokeColor)
					dwa.common.graphics.drawRoundRect(oCanvas);

				// convert color from #RRBBGG/rgb(RR,GG,BB) format.
				var vColor1 = this.convertRGB(sColor1);
				var vColor2 = this.convertRGB(sColor2);

				var oContext = oCanvas.getContext('2d');
				if (nAlpha)
					oContext.globalAlpha = nAlpha / 100;

				// draw gradient
				dwa.common.graphics.colorStrokeGradient(oCanvas, null, [0, vColor1[0], vColor1[1], vColor1[2], 100, vColor2[0], vColor2[1], vColor2[2]], sStrokeColor);
				if (!sStrokeColor)
					oContext.fillRect(0, 0, oCanvas.clientWidth, oCanvas.clientHeight);
			}
		}
	},
	setStyle: function(oElem, oStyle){
		var sElem = oElem;
		if (typeof(oElem) == 'string')
			oElem = dojo.doc.getElementById((oElem.indexOf(this.sId) == -1? this.sId: '') + oElem);
		if (!oElem)
			return; 
		if ("-header-selected-area" ==  sElem){
			var oFullFormatter = new dwa.date.dateFormatter(D_DateFmt_Full);
			dojo.attr(oElem,"aria-label", oFullFormatter.format(this.oCalendar));
		}
		for (var s in oStyle) {
			// fix error when set minus value to height or width
			if ((s == 'height' || s == 'width') && oStyle[s].charAt(0) == '-')
				oStyle[s] = 0;
			var oMap = {D_ALIGN_DEFAULT:D_ALIGN_DEFAULT, D_ALIGN_REVERSE:D_ALIGN_REVERSE};
			if (oMap[s]) {
				oElem.style[oMap[s]] = oStyle[s];
				continue;
			}
			oElem.style[s] = oStyle[s];
		}
	},
	setClass: function(oElem, sClass){
		if (typeof(oElem) == 'string')
			oElem = dojo.doc.getElementById((oElem.indexOf(this.sId) == -1? this.sId: '') + oElem);
		if (oElem)
			oElem.className = sClass;
	},
	adjustCalendar: function(bNoupdateCalendarEntries){
		var q = (dojo.doc.compatMode == "CSS1Compat" &&  _isIE()  < 8) ? 1 : 0;
		var oElem = dojo.doc.getElementById(this.sId);
		if (oElem) {
			var nCalendarWidth = oElem.clientWidth;
			// fix error when set minus value to height
			var nCalendarHeight = Math.max(100,oElem.clientHeight)-2*q;
			// fix layout problem when content area is too small
			oElem.scrollTop = oElem.scrollLeft = 0;
			// update text height when resize content frame
			var nTextHeight = this.getTextHeight('s-cv-text', true);
			var bTextHeightChanged = this.nTextHeight != nTextHeight;
			this.nTextHeight = nTextHeight;
			this.nMinCellHeight	 = Math.max(Math.floor(this.nTextHeight * 1.25), this.nMinCellHeightDef);
	
			if (this.fSummarize) {
				var fNarrowSummaryView = nCalendarWidth < 400;
				if (fNarrowSummaryView != this.fNarrowSummaryView)
					this.fNarrowSummaryView = fNarrowSummaryView;
					var bNeedRedraw = true;
			} else
				this.fNarrowSummaryView = false;

			var nTop = 0;
			this.nTimeWidth = this.nTimeslotIndicatorWidth + (this.fUseAddTimeZone? this.nTimeslotIndicatorWidth: 0);
			var nDaysInRow = (this.sType=='2'? 7: this.nDays);
	
			// status indicator
			if (this.sStatus) {
				this.setStyle('-status', {width:nCalendarWidth + 'px', height:this.nTextHeight + 'px'});
				nTop += this.nTextHeight;
			}
	
			// date navigator
			// use tall navigation bar in narrow summary view for some view types. always use short navigator in One Day/Month/Year view. (SPR VSEN7LRU2D)
			var nNavHeight = this.getComputedStyle('nav', 'height') ||
				(2 + (this.nTextHeight * (this.sType != 'D' && this.sType != 'M'  && this.sType != 'Y' && this.fNarrowSummaryView? 2: 1)) - q + ( _isIE() ==8?1:0));
			this.setStyle('-navigator', {top:nTop + 'px', width:nCalendarWidth + 'px', height:nNavHeight + 'px'});
			this.setClass('-navigator-innerframe', 's-cv-nav-innerframe' + (this.fNarrowSummaryView? '-narrow': ''));
			nTop += nNavHeight + q;
			this.nNavHeight = nTop;
	
			// date header
			if (!this.bYearView && !this.fSummarize) {
				var d = !_isIE() || dojo.doc.compatMode == "BackCompat" ? 1 : 2;
				this.setStyle('-header', {top:nTop + 'px', width:nCalendarWidth + d + 'px'}); //#002
	
				this.drawGradient(this.sId + '-header-gradient', this.oColorMap['header-bg-dark'], this.oColorMap['header-bg-light']);
				nTop += this.bTimeSlotView? this.nTimeslotHeaderHeight: this.nGridHeaderHeight;
			}
	
			var nFooterHeight = this.fHideFooter? 0: this.nTextHeight - 2*q;
	
			// year view
			if (this.bYearView) {
				this.nViewAreaWidth = nCalendarWidth;
				this.nViewAreaHeight = nCalendarHeight - nTop;
				this.bNeedHScroll = this.nViewAreaWidth < 520;
				this.bNeedVScroll = this.nViewAreaHeight < this.nMonthHeight * 3;
				var nWidth = this.nViewAreaWidth + (this.bNeedHScroll && !this.bNeedVScroll? this.nScrollBarWidth: 0);
				this.setStyle('-year', {
					top: nTop + 'px',
					width: nWidth + 'px',
					height: (this.nViewAreaHeight + (!this.bNeedHScroll && this.bNeedVScroll? this.nScrollBarWidth: 0)) + 'px',
					overflow: !(this.bNeedHScroll || this.bNeedVScroll)? 'hidden':'scroll',
					borderWidth: '1px'
				});
				var nWidth = Math.max(Math.floor(nWidth/4), this.nMonthWidth);
				var nMargin = Math.max(Math.floor((nWidth-this.nMonthWidth)/4), 0);
				for (var i=0;i<12;i++) {
					this.setStyle('-month' + (i+1), {
						D_ALIGN_DEFAULT: (nWidth * (i%4) + nMargin) + 'px',
						top: (this.nMonthHeight * Math.floor(i/4)) + 'px'
					});
				}
				nTop += this.nViewAreaHeight;
			}
			// summary view
			else if (this.fSummarize) {
				this.nViewAreaWidth = nCalendarWidth;
				this.nViewAreaHeight = nCalendarHeight - nFooterHeight - nTop;
				this.setStyle('-summary', {
					top: nTop + 'px',
					width: (this.nViewAreaWidth + (this.bNeedHScroll && !this.bNeedVScroll? this.nScrollBarWidth: 0))+ 'px',
					height: (this.nViewAreaHeight + (!this.bNeedHScroll && this.bNeedVScroll? this.nScrollBarWidth: 0))+ 'px',
					overflow: !(this.bNeedHScroll || this.bNeedVScroll)? 'hidden':'scroll',
					borderWidth: '1px'
				});
				nTop += this.nViewAreaHeight;
			} else
			// time slot view
			if (this.bTimeSlotView) {
				this.nTimeslotWidth = nCalendarWidth;
				this.nTimeslotInnerWidth = Math.max(400, nCalendarWidth - this.nTimeWidth - this.nScrollBarWidth);
				// horizon scroll bar not properly displayed with all day events (SPR YQWG7DK4N2)
				// need vertical scroll bar in all day events area (SPR MMII7Q935R)
				this.nTimeslotHeight = nCalendarHeight - nFooterHeight - nTop;
				this.nAlldayEventsHeight = Math.min( parseInt(this.nTimeslotHeight/2), (this.nMinCellHeight + 1) * this.nAlldayEventsInWeek + 1);
				this.bAlldayNeedVScroll = this.nAlldayEventsHeight == parseInt(this.nTimeslotHeight/2);
				this.nTimeslotHeight -= this.nAlldayEventsHeight;
				
				if (this.sType=='W') {
					var anPos = [], nPos = 0;
					for (var i=0, j=this.nFirstDayWeek; i<=8; i++, j++) {
						anPos[i] = nPos;
						nPos += (i >= 7 || this.isWeekEnd(j%7))? 0.5: 1;
					}
					var nDays = anPos[7];
				} else {
					// fixed layout problem if there are more than 5 work days.
					var anPos = [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ];
					var nDays = nDaysInRow;
				}
				
				this.anLeft = [];
				this.anWidth = [];
				for (var i=0; i<=nDaysInRow; i++)
					this.anLeft[i] = this.nTimeWidth + Math.floor(this.nTimeslotInnerWidth * anPos[i] / nDays);
				for (var i=0; i<nDaysInRow; i++)
					this.anWidth[i] = this.anLeft[i+1] - this.anLeft[i];
	
				for (var i=0; i<=nDaysInRow; i++) {
					var oMap = {'-header':void 0, '-allday':void 0, '-timeslot':void 0};
					for (var s in oMap) {
						this.setStyle(s + '-date' + i, {
							D_ALIGN_DEFAULT: this.anLeft[i] + 'px',
							width: (i==nDaysInRow? this.nScrollBarWidth: this.anWidth[i]) + 'px'
						});
					}
				}
				// need vertical scroll bar in all day events area (SPR MMII7Q935R)
				// adjust position of scroll bar for BiDi (SPR MMII7Q935R)
				this.setStyle('-allday', {
					top: nTop + 'px',
					width: nCalendarWidth + 'px',
					overflow: this.bAlldayNeedVScroll? 'scroll': 'hidden',
					height: (this.nAlldayEventsHeight + this.nScrollBarWidth) + 'px'
				});
				var nHeight = (this.nMinCellHeight + 1) * this.nAlldayEventsInWeek;
				this.setStyle('-allday-date', {height: nHeight + 'px'});
				if (this.fUseAddTimeZone)
					this.setStyle('-allday-adddate', {height: nHeight + 'px'});
				for (var i=0; i<=nDaysInRow; i++)
					this.setStyle('-allday-date' + i, {height: nHeight + 'px'});
				this.setStyle('-allday-date7', {display: (this.bAlldayNeedVScroll? 'none': '')});
				nTop += this.nAlldayEventsHeight;
	
				//hack for IE9 standard mode
				var isIE9Standard = false;
				if(_isIE()  == 9){
					var agent = navigator.userAgent;
					if(agent.indexOf("Trident/5.0") > -1 && agent.indexOf("MSIE 9.0") > -1){
						isIE9Standard = true;
					}
				}
				// time slot
				this.setStyle('-timeslot', {
					top: nTop + 'px',
					width: this.nTimeslotWidth + (isIE9Standard? this.nScrollBarWidth:0)+ 'px',
					height: (this.nTimeslotHeight + (this.nTimeslotInnerWidth>400? this.nScrollBarWidth: 0)) + 'px'
				});
				nTop += this.nTimeslotHeight;
	
				var oTarget = dojo.doc.getElementById(this.sId + '-timeslot');
				this.nTimeslotOffsetX = 0;
				this.nTimeslotOffsetY = 0;
				while ((oTarget.tagName == 'DIV' || oTarget.tagName == 'IMG') && oTarget != dojo.doc.body) {
					this.nTimeslotOffsetX -= oTarget.offsetLeft;
					this.nTimeslotOffsetY -= oTarget.offsetTop;
					oTarget = oTarget.parentNode;
				}
	
				// need to adjust background color area not only in Safari but also in other browsers (SPR YQWG7DK4N2)
				var oMap = {'-header-bg':1, '-timeslot-dark1':0, '-timeslot-dark2':0};
				for (var s in oMap) {
					this.setStyle(s, {
						width: (this.nTimeslotInnerWidth + this.nTimeWidth + (oMap[s]? this.nScrollBarWidth - 2: 0)) + 'px'
					});
				}
	
				var oMap = {'-timeslot-grid':24, '-timeslot-grid-half':24, '-timeslot-grid-quarter':48};
				for (var s in oMap) {
					for (i=0; i<oMap[s]; i++) {
						this.setStyle(s + i, {
							width: this.nTimeslotInnerWidth + 'px'	// do not modify this line or time slot layout will be broken
						});
					}
				}
	
				// SPR #XLLU7MH7UZ: Time slot header contents should be changed (e.g. "January 2009" and "Jan 2009")
				// according to the time slot width
				if (bTextHeightChanged || !bNoupdateCalendarEntries) {
					this.drawTimeslotHeader();
				}
			}
			// grid view
			else {
				var nDaysInRow = 7;
				// fixed layout problem around DST boudary (SPR YKAA7XP667)
				var nRowsInMonth = Math.ceil(this.nDays / nDaysInRow);

				var d = ( _isIE()< 8 && dojo.doc.compatMode == "CSS1Compat" && !this.isRTL) ? 0 : 1;
				d += ( _isIE()  < 8 && dojo.doc.compatMode == "BackCompat" && this.isRTL) ? 1 : 0;
				var nGridWidth = nCalendarWidth + d;
				var nGridHeight = nCalendarHeight - nFooterHeight - nTop;
				this.bNeedHScroll = nGridWidth < 600;
				this.bNeedVScroll = nGridHeight < 450;
				this.setStyle('-grid', {
					top: nTop + 'px',
					width: (nGridWidth + (this.bNeedHScroll && !this.bNeedVScroll? this.nScrollBarWidth: 0)) + 'px',
					height: (nGridHeight + (!this.bNeedHScroll && this.bNeedVScroll? this.nScrollBarWidth-2*q: 0)) + 'px',
					overflow: !(this.bNeedHScroll || this.bNeedVScroll)? 'hidden':'scroll'
				});
				nTop += nGridHeight;
	
				var oTarget = dojo.doc.getElementById(this.sId + '-grid');
				if(_isIE() < 7 && this.isRTL){
					oTarget.style.right = '-1px';
				}
				this.nTimeslotOffsetX = 0;
				this.nTimeslotOffsetY = 0;
				while ((oTarget.tagName == 'DIV' || oTarget.tagName == 'IMG') && oTarget != dojo.doc.body) {
					this.nTimeslotOffsetX -= oTarget.offsetLeft;
					this.nTimeslotOffsetY -= oTarget.offsetTop;
					oTarget = oTarget.parentNode;
				}
	
				nGridWidth = Math.max(600,nGridWidth) - (this.bNeedVScroll? this.nScrollBarWidth: 0) + q;
				nGridHeight = Math.max(450,nGridHeight) - (this.bNeedHScroll? this.nScrollBarWidth: 0);
				var anPos = [], nPos = 0;
				for (var i=0, oDate = this.oCalViewStart.clone(); i<=8; i++, oDate.adjustDays(0, 0, 1)) {
					anPos[i] = nPos;
					nPos += this.isWeekEnd(oDate)? 0.5: 1;
				}
				var nDays = anPos[7];
				this.anTop = [];
				this.anLeft = [];
				this.anHeight = [];
				this.anWidth = [];
				for (var i=0; i<=7; i++) {
					this.anTop[i] = Math.floor(nGridHeight * i / nRowsInMonth);
					this.anLeft[i] = Math.floor(nGridWidth * anPos[i] / nDays);
				}
				for (var i=0; i<=7; i++) {
					this.anHeight[i] = this.anTop[i+1] - this.anTop[i];
					this.anWidth[i] = this.anLeft[i+1] - this.anLeft[i];
				}
				if(_isIE() < 8 && this.isRTL){
					this.anWidth[6] -= 1; // kami (right-most cell is a bit too wide)
				}

				for (var i=0; i<=nDaysInRow; i++) {
					this.setStyle('-header-date' + i, {
						D_ALIGN_DEFAULT: this.anLeft[i] + 'px',
						width: (i==nDaysInRow? this.nScrollBarWidth: this.anWidth[i]) - q + 'px'
					});
					for (var j=0;j<nRowsInMonth;j++) {
						this.setStyle('-grid-date' + j + '-' + i, {
							top: this.anTop[j] + 'px',
							height: this.anHeight[j] - q + 'px',
							D_ALIGN_DEFAULT: this.anLeft[i] + 'px',
							width: this.anWidth[i] - q + 'px'
						});
						this.setStyle('-grid-date' + j + '-' + i + '-innerframe', {
							height: (this.anHeight[j] - this.nTextHeight - q) + 'px',
							width: this.anWidth[i] - q + 'px'
						});
					}
				}
	
				// need to adjust background color area (SPR YQWG7DK4N2)
				this.setStyle('-header-bg', {
					width: (nGridWidth + this.nScrollBarWidth - 2) + 'px'
				});
			}
	
			// calendar footer
			this.setStyle('-footer', {
				top: nTop + 'px',
				width: nCalendarWidth - 2*q + 'px',
				height: nFooterHeight + 'px',
				display: nFooterHeight? '': 'none'
			});
	
			// update selected area and calendar entries when flag is set
			if (!bNoupdateCalendarEntries) {
				if (bNeedRedraw) {
					this.clearCalendarEntries();
					this.drawCalendarEntries();
					this.drawNavigatorDateRange();
				} else {
					this.updateSelectedArea();
					this.updateCalendarEntries();
				}
			} else {
				oElem = dojo.doc.getElementById(this.sId + '-timeslot');
				var oStart = (new dwa.date.calendar).setISO8601String(this.sTimeSlotStart);
				if (oElem && oStart)
					oElem.scrollTop = this.nCellHeight*(oStart.nHours + oStart.nMinutes / 60);
			}
		}
		this.bAdjusted = true;
	},
	clearCalendarEntries: function(){
		for (var i=0; i<this.nEntries; i++) {
			var oMap = {'':true, '-hover':true, '-conflict':this.sConflictBar};
			for (var s in oMap) {
				if (oMap[s]) {
					var oElem = dojo.doc.getElementById(this.sId + '-entry' + i + s);
					if (oElem)
						oElem.parentNode.removeChild(oElem);
				}
			}
		}
		if (this.fSummarize) {
			var oElem = dojo.doc.getElementById(this.sId + '-summary');
			for (var i=oElem.childNodes.length-1; i>=0; i--) {
				if (oElem.childNodes[i].id && oElem.childNodes[i].id.indexOf(this.sId + '-date') != -1)
					oElem.removeChild(oElem.childNodes[i]);
			}
			this.bCollapse = {};
		}
	},
	load: function(){
		this.bNeedReload = true;
		setTimeout(dojo.hitch(this, "loadActual"), 0);
	},
	loadActual: function(){
		// it may be repeatedly called by com_ibm_dwa_ui_panelManager_processPassToCommand(). just ignore the second one. (SPR JCIK7SWNYP)
		if (!this.bNeedReload) return;
		this.bNeedReload = false;
		this.oCalendarDataStore.clear();
		this.gotoDay();
	},
	gotoDay: function(oCalendar, oCalViewStart){
		if (!oCalendar && this.oCalendar)
			var oCalendar = this.oCalendar.clone();
	
		this.clearCalendarEntries();
		// unselect calendar entry before redraw (SPR JYJY7JLBXM)
		this.unselectEntry();
	
		// SPR #XLLU7MH7UZ: Moved to a new method setViewDateRange() so that the logic can be invoked
		// from within adjustCalendar(), which can be invoked prior to gotoDay()
		this.setViewDateRange(oCalendar, oCalViewStart);
	
		// SPR #VSEN7LRU2D: use short date format (Mon, Feb 23, 2009) in narrow mode
		this.drawNavigatorDateRange();
	
		if (this.sType == 'Y') {
			var asCharDays = [this._msgs["L_CHARDAY_SUN"], this._msgs["L_CHARDAY_MON"], this._msgs["L_CHARDAY_TUE"], this._msgs["L_CHARDAY_WED"], this._msgs["L_CHARDAY_THU"], this._msgs["L_CHARDAY_FRI"], this._msgs["L_CHARDAY_SAT"]];
			var oToday = (new dwa.date.calendar).setDate(new Date());
			oToday.fDateOnly = true;
			var oFormatter = new dwa.date.dateFormatter(); // kami
			for (var i=0; i<12; i++) {
				var oElem = dojo.doc.getElementById(this.sId + '-month' + (i+1));
				var asHtml = [], n = 0;
				var bThisMonth = oToday.nYear == this.oCalendar.nYear && oToday.nMonth == i;
				var sColor1 = this.oColorMap[bThisMonth? 'header-today-light': 'header-bg-light'];
				var sColor2 = this.oColorMap[bThisMonth? 'header-today-dark': 'header-bg-dark'];
				asHtml[n++] = '<table role="presentation" id=' + this.sId + '-month-innerframe' + (i+1) + ' class="s-cv-text" style="width:' + this.nMonthWidth + 'px;text-align:center;">'
				// month bar
				// nakakura
				// add class="s-monthBar" for High-Contrast Mode
					+ '<tr><td colspan="7" style="font-weight:bold;">'
					+ '<div style="position:relative;width:' + this.nMonthWidth + 'px;height:' + this.nTextHeight + 'px;">'
					+ '<div style="position:absolute;' + D_ALIGN_DEFAULT + ':0px;width:' + this.nMonthWidth + 'px;height:' + this.nTextHeight + 'px;border-width:0 0 1px 0;border-color:#ACB7CD;">'
					+ this.insertGradientHtml(this.sId + '-month' + (i+1) + '-gradient', 's-cv', sColor2, sColor1)
					+ '</div>'
					+ '<div class="s-monthBar" id=' + this.sId + '-monthbar' + (i+1) + ' style="position:absolute;' + D_ALIGN_DEFAULT + ':0px;width:' + this.nMonthWidth + 'px;height:' + this.nTextHeight + 'px;cursor:pointer;">'
					+ oFormatter.asMonths[i]
					+ '</div>'
					+ '</div></td></tr>';
	
				// week bar
				asHtml[n++] = '<tr style="font-weight:bold;">';
				// Fixed problem that nFirstDayMonth not affect to Year view (SPR YKAA7XPAP2)
				var nFirstDay = this.nFirstDayMonth;
				var nLastDay = (nFirstDay + 6) % 7;
				for (var j=0; j<7; j++)
					asHtml[n++] = '<td>' + asCharDays[(nFirstDay + j) % 7] + '</td>';
				asHtml[n++] = '</tr>';
	
				// calendar grid
				var oDate = this.oCalendar.clone();
				oDate.nMonth = i;
				oDate.nDate = 1;
				oDate.fDateOnly = true;
				oDate.setDate(oDate.getDate(), this.oCalendar.oZoneInfo);
				for (var j=nFirstDay; (j%7)!=oDate.nDay; j++) {
					asHtml[n++] = (j == nFirstDay? '<tr style="cursor:pointer;">': '')
						+ '<td></td>';
				}
				while (oDate.nMonth == i) {
					asHtml[n++] = (oDate.nDay == nFirstDay? '<tr style="cursor:pointer;">': '')
						+ '<td id="' + this.sId + '-date' + oDate.getISO8601String() + '"' + (oDate.equals(oToday)? ' style="font-weight:bold;color:rgb(255,0,0);"': '') + '>'
						+ oDate.nDate + '</td>'
						+ (oDate.nDay == nLastDay? '</tr>': '');
					oDate.adjustDays(0,0,1);
				}
				if (oDate.nDay != nLastDay)
					asHtml[n++] = '</tr>';
	
				this.setInnerHtml(oElem, asHtml.join(''));
	
				this.drawGradient(this.sId + '-month' + (i+1) + '-gradient', sColor1, sColor2);
			}
		} else if (this.fSummarize) {
			var oFormatter = new dwa.date.dateFormatter(3);
			for (var i = 0, oDate = this.oCalViewStart.clone();i < 31; i++) {
				var oElem = dojo.doc.getElementById(this.sId + '-header-date' + i + '-innerframe');
				if (oElem)
					this.setInnerHtml(oElem, oFormatter.format(oDate));
				oDate.adjustDays(0, 0, 1);
			}
		} else if (this.sType == 'D' || this.sType == 'T' || this.sType == 'F' || this.sType == 'W') {
			this.drawTimeslotHeader();
		} else if (this.sType == '2' || this.sType == 'M') {
			var oFormatter = new dwa.date.dateFormatter(11);
			var fFormatter = new dwa.date.dateFormatter(D_DateFmt_Full);
			var nDaysInRow = 7;
			// fixed layout problem around DST boudary (SPR YKAA7XP667)
			var nRowsInMonth = Math.ceil(this.nDays / nDaysInRow);
			var oDate = this.oCalViewStart.clone();
			var oToday = (new dwa.date.calendar).setDate(new Date());
			oDate.fDateOnly = oToday.fDateOnly = true;
			//Bidi 
			var dateType = this.getDateType();
			var oAltToday = this.convertDate(oToday ,dateType);
			var oAltDate = this.convertDate(oDate ,dateType);
			var oAltCalendar = this.convertDate(oCalendar ,dateType);
			var tempDate = oToday.clone();
			if(dateType != cfg.GREGORIAN){
				// set the hijri\hebrew date ranges 
				oAltDate = this.getAltRange(dateType,'M');
				oAltCalendar = oAltDate;
				oAltDate = this.adjustAltDate(dateType,oAltDate, 'day', - oAltDate.getDate() + 1);
				oAltDate = this.adjustAltDate(dateType,oAltDate , 'day' ,  - ((oAltDate.getDay() + 1) % 7 ));		
				nRowsInMonth = Math.ceil(this.getDaysInMonth(dateType, oAltDate) / nDaysInRow);
				var diff = this.getDatesDifference(dateType, oAltToday, oAltDate,'day');
				tempDate.adjustDays(0,0,-diff);
				this.oCalViewStart = tempDate.clone();
			}	
			for (var j=0;j<6;j++) {
				for (var i=0; i<nDaysInRow; i++) {
					if (j==0) {
						var oElem = dojo.doc.getElementById(this.sId + '-header-date' + i);
						if (oElem){
							if(dateType == cfg.GREGORIAN){
								this.setInnerHtml(oElem, oFormatter.asShortDays[oDate.nDay]);
							}else{
								this.setInnerHtml(oElem, this.getAltDay(dateType, oAltDate));
							}
						}
					}
	
					var oElem = dojo.doc.getElementById(this.sId + '-grid-date' + j + '-' + i);
					if (oElem) {
						var sColor = '',sClass = '';
						if(dateType == cfg.GREGORIAN){
							sClass = 's-cv-grid'
								+ (this.sType == 'M' && oDate.nMonth != oCalendar.nMonth? ' s-cv-grid-dark': '')
								+ (oDate.equals(oToday)? ' s-cv-grid-today': '');
							sColor = sClass.indexOf('s-cv-grid-dark') != -1? 'rgb(233,236,241)': sClass.indexOf('s-cv-grid-today') != -1? 'rgb(229,241,254)': 'white';
							this.setInnerHtml(oElem, '<div class="s-cv-text">' + (oDate.equals(oToday)?('<div class="lotusAltText">'+ this._msgs['L_SIDECALENDAR_TODAY']+'</div> '):'')+ (this.sType == 'M' && oDate.nMonth == oCalendar.nMonth? oDate.nDate: oFormatter.format(oDate)) + '</div>'
							                + '<div id="' + this.sId + '-grid-date' + j + '-' + i + '-innerframe" class="s-cv-grid lotusStyledScroll" style="top:' + this.nTextHeight + 'px;' + D_ALIGN_DEFAULT + ':0px;"></div>');
							oElem.setAttribute('aria-label', fFormatter.format(oDate));
						}else{							
							sClass = 's-cv-grid'
								+ (this.sType == 'M' && oAltDate.getMonth() != oAltCalendar.getMonth()? ' s-cv-grid-dark': '')
								+ (this.compareDates(oAltDate ,oAltToday ,dateType) == 0 ? ' s-cv-grid-today': '');
							sColor = sClass.indexOf('s-cv-grid-dark') != -1 ? 'rgb(233,236,241)': sClass.indexOf('s-cv-grid-today') != -1? 'rgb(229,241,254)': 'white';
							this.setInnerHtml(oElem, '<div class="s-cv-text">' + (this.compareDates(oAltDate ,oAltToday ,dateType) == 0 ?('<div class="lotusAltText">'+ this._msgs['L_SIDECALENDAR_TODAY']+'</div> '):'')
									+ (this.sType == 'M' && oAltDate.getMonth() == oAltCalendar.getMonth()? oAltDate.getDate(): this.formatAltDate(oAltDate, 11)) + '</div>'
							                + '<div id="' + this.sId + '-grid-date' + j + '-' + i + '-innerframe" class="s-cv-grid lotusStyledScroll" style="top:' + this.nTextHeight + 'px;' + D_ALIGN_DEFAULT + ':0px;"></div>');
							oElem.setAttribute('aria-label', fFormatter.format(tempDate));
						}
						oElem.className = sClass;
						oElem.style.display = (j<nRowsInMonth? '': 'none');
						oElem.style.backgroundColor = sColor;
						oElem.style.overflow = 'hidden';
						oElem.setAttribute('role', 'gridcell');
					}
					oDate.adjustDays(0, 0, 1);
					tempDate.adjustDays(0, 0, 1);
					oAltDate = this.adjustAltDate(dateType,oAltDate,'day',1);
				}
			}
		}
	
		if (this.sType == '2' || this.sType == 'M')
			this.adjustCalendar(true /* do not update calendar entries at this time */);
	
		if (!this.fSummarize)
			this.updateSelectedArea();
	
		// no need to display calendar entries in year view
		if (this.sType != 'Y') {
			this.bLoading = true;
			this.setStyle('-noentry', {display:'none'});
			this.setStyle('-loading', {display:''});
			this._setLoadingAttr(true);
			setTimeout(dojo.hitch(this.oCalendarDataStore, "load", this.oCalViewStart, this.oCalViewEnd), 0);
		}
	},
	// start: bidi utility functions
	getDateType:function(){
		return api.getCalendar(); 
	},
	convertDate:function(oDate /*dwa.date.calendar*/, dateType){
		if(dateType == cfg.HIJRI)
			return new ___id.Date().fromGregorian(oDate.getOSDate());
		else if(dateType == cfg.HEBREW)
			return new ___hd.Date().fromGregorian(oDate.getOSDate());
		else 
			return oDate.getOSDate();
	},
	compareDates: function(date1, date2, dateType){
		if(dateType == cfg.HIJRI)
			return ___id.compare(date1, date2, 'date');
		else if(dateType == cfg.HEBREW)
			return ___hd.compare(date1, date2, 'date');
		else 
			return ___gd.compare(date1, date2, 'date');
	},
	formatAltDate: function(oDate, format,dateType){
		switch(format){
			case 1:
				if(dateType == cfg.HIJRI)
					return ___id.locale.getNames('days','wide')[oDate.getDay()] + ' ' + oDate.getDate();
				else if(dateType == cfg.HEBREW)
					return ___hd.locale.getNames('days','wide')[oDate.getDay()]  + ' ' + oDate.getDate();
				else 
					return ___gd.locale.getNames('days','wide')[oDate.getDay()] + ' ' + oDate.getDate();			
			case 4:
			case 20:
				if(dateType == cfg.HIJRI)
					return ___id.locale.getNames('days','wide')[oDate.getDay()] + ', ' + ___id.locale.getNames('months','wide')[oDate.getMonth()] + ' ' + oDate.getDate() + ', '+ oDate.getFullYear();
				else if(dateType == cfg.HEBREW)
					return ___hd.locale.getNames('days','wide')[oDate.getDay()] + ', ' + ___hd.locale.getNames('months','wide')[oDate.getMonth()] + ' ' + oDate.getDate() + ', '+ oDate.getFullYear();
				else 
					return ___gd.locale.getNames('days','wide')[oDate.getDay()] + ', ' + ___gd.locale.getNames('months','wide')[oDate.getMonth()] + ' ' + oDate.getDate() + ', '+ oDate.getFullYear();
			case 11:
				return oDate.getDate() + '/' + (oDate.getMonth()+1); //months are 0 based
			case D_DateFmt_Month4Yr:
				if(dateType == cfg.HIJRI)
					return ___id.locale.getNames('months','wide')[oDate.getMonth()] + ' ' +oDate.getFullYear();
				else if(dateType == cfg.HEBREW)
					return ___hd.locale.getNames("months","wide",undefined,undefined,oDate)[oDate.getMonth()] + ' ' +oDate.getFullYear();
				else 
					return ___gd.locale.getNames('months','wide')[oDate.getMonth()] + ' ' +oDate.getFullYear();
			default:
				return oDate;
		}		
	},
	getAltDay: function(dateType,oAltDate){
		if(dateType == cfg.HIJRI)
			return ___id.locale.getNames('days','narrow')[oAltDate.getDay()];
		else if(dateType == cfg.HEBREW)
			return ___hd.locale.getNames('days','narrow')[oAltDate.getDay()];
		else 
			return ___gd.locale.getNames('days','narrow')[oAltDate.getDay()];
	},
	getAltRange:function(dateType,sType){
		if(sType == 'M'){
			var oAltToday = this.convertDate((new dwa.date.calendar).setDate(new Date()),dateType);
			return this.adjustAltDate(dateType,oAltToday,"month",this.monthCounter);
		}
	
	},
	adjustAltDate: function(dateType, oDate, interval, amount){
		if(dateType == cfg.HIJRI)
			return ___id.add(oDate, interval, amount);
		else if(dateType == cfg.HEBREW)
			return ___hd.add(oDate, interval, amount);
		else 
			return ___gd.add(oDate, interval, amount);
	},
	getDatesDifference:function(dateType, oDate1, oDate2, interval){
		if(dateType == cfg.HIJRI){
			return ___id.difference(oDate1, oDate2, interval);;
		}else if(dateType == cfg.HEBREW){
			return ___hd.difference(oDate1, oDate2, interval);
		}else {
			return ___gd.difference(oDate1, oDate2, interval);
		}
	},
	getDaysInMonth: function(dateType, oDate){
		if(dateType == cfg.HIJRI)
			return ___id.getDaysInMonth(oDate);
		else if(dateType == cfg.HEBREW)
			return ___hd.getDaysInMonth(oDate);
		else 
			return ___gd.add(oDate);
		
	},
	// end: bidi utility functions
	setViewDateRange: function(oCalendar, oCalViewStart){
		oCalViewStart = (oCalViewStart? oCalViewStart: oCalendar).clone();
		oCalViewStart.setDate(oCalViewStart.getDate(), this.oCalendar.oZoneInfo);
		oCalViewStart.fDateOnly = false;
		oCalViewStart.nHours = oCalViewStart.nMinutes = oCalViewStart.nSeconds = oCalViewStart.nMilliseconds = 0;
	
		if (this.sType == 'D' || this.sType == 'T') {
			var oCalViewEnd = oCalViewStart.clone().adjustDays(0, 0, this.nDays);
		} else if (this.sType == 'F') {
			var nFirstDay = this.nFirstDayFiveDay;
			while (oCalViewStart.nDay != nFirstDay)
				oCalViewStart.adjustDays(0, 0, -1);
			for (var i=0, oDate = oCalViewStart.clone(); i<7; i++, oDate.adjustDays(0,0,1)) {
				if (!this.isWeekEnd(oDate))
					var oCalViewEnd = oDate.clone();
			}
			oCalViewEnd.adjustDays(0, 0, 1);
		} else if (this.sType == 'W' || this.sType == '2') {
			var nFirstDay = this.nFirstDayWeek;
			while (oCalViewStart.nDay != nFirstDay)
				oCalViewStart.adjustDays(0, 0, -1);
			var oCalViewEnd = oCalViewStart.clone().adjustDays(0, 0, this.nDays);
		} else if (this.sType == 'M') {
			var nFirstDay = this.nFirstDayMonth - 0;
			var oCalViewEnd = oCalViewStart.clone();
			oCalViewStart.adjustDays(0, 0, 1-oCalViewStart.nDate);
			while (!this.fSummarize && oCalViewStart.nDay != nFirstDay)
				oCalViewStart.adjustDays(0, 0, -1);
			while (oCalViewEnd.nMonth == oCalendar.nMonth)
				oCalViewEnd.adjustDays(0, 0, 1);
			while (!this.fSummarize && oCalViewEnd.nDay != nFirstDay)
				oCalViewEnd.adjustDays(0, 0, 1);
			this.nDays = (oCalViewEnd.getUTCDate() - oCalViewStart.getUTCDate()) / 86400000;
		} else if (this.sType == 'Y') {
			oCalViewStart.adjustDays(0, - oCalViewStart.nMonth, 1 - oCalViewStart.nDate);
			var oCalViewEnd = oCalViewStart.clone();
			oCalViewEnd.adjustDays(1, 0, 0);
			this.nDays = oCalViewStart.isLeapYear()? 366: 365;
		}
	
		if (!this.oCalViewStart || !this.oCalViewEnd || !oCalViewStart.equals(this.oCalViewStart) || !oCalViewEnd.equals(this.oCalViewEnd)) {
			// Need regeneration
			this.asWideTimeslotHeaderHtml = this.asNarrowTimeslotHeaderHtml = void 0;
		}
		this.oCalViewStart = oCalViewStart;
		this.oCalViewEnd = oCalViewEnd;
	},
	drawNavigatorDateRange: function(){
		var oElem = dojo.doc.getElementById(this.sId + '-navigator-current-inner');
		var dateType = this.getDateType();
		if (oElem) {
			if (this.sType == 'Y') {
				var sText = this.oCalendar.nYear + '';
			} else
			if (this.sType == 'M') {
				//Bidi
				if(dateType != cfg.GREGORIAN){
					var oAltDate = this.getAltRange(dateType,'M');
					var sText = this.formatAltDate(oAltDate, D_DateFmt_Month4Yr,dateType);
				}else{
					var oFormatter = new dwa.date.dateFormatter(D_DateFmt_Month4Yr);
					var sText = oFormatter.format(this.oCalendar);
				}	
			} else if (this.sType == 'D') {
				if(dateType != cfg.GREGORIAN){
					var oAltDate = this.convertDate(this.oCalendar,dateType);
					var sText = this.formatAltDate(oAltDate, 20,dateType);
				}else{
					// use short date format in narrow summary view for One Day view. (SPR VSEN7LRU2D)
					var oFormatter = new dwa.date.dateFormatter(this.fNarrowSummaryView? 20: 4);
					var sText = oFormatter.format(this.oCalendar);
				}	

			} else {
				if(dateType != cfg.GREGORIAN){
					var sAltDate = this.convertDate(this.oCalViewStart,dateType);
					var eAltDate = this.convertDate(this.oCalViewEnd,dateType);
					var sText = this.formatAltDate(sAltDate, 20,dateType) + ' - ' + this.formatAltDate(this.adjustAltDate(dateType,eAltDate,'day',-1), 20,dateType);
				}else{
					var oFormatter = new dwa.date.dateFormatter(this.sTimeFmtNav);
					var sText = oFormatter.format(this.oCalViewStart)
						+ ' - ' + oFormatter.format(this.oCalViewEnd.clone().adjustDays(0,0,-1));
				}	

			}
			// nakakura
			if (8 <= _isIE() || 3 <= dojo.isFF)
				this.setInnerHtml(dojo.byId(this.sId + '-label-date'), sText);
			else if (_isIE() <= 7 || dojo.isFF <= 2)
				oElem.title = sText;
			this.setInnerHtml(oElem, this.sDateRange = sText);
			oElem.parentNode.setAttribute('aria-label', sText);
		}
		
		if (this.fSummarize) {
			var oElem = dojo.byId(this.sId + '-navigator-today');
			if (oElem) {
				var oToday = (new dwa.date.calendar).setDate(new Date());
				oToday.fDateOnly = false;
				oToday.nHours = this.oCalendar.nHours;
				oToday.nMinutes = this.oCalendar.nMinutes;
				oToday.nSeconds = this.oCalendar.nSeconds;
				oToday.nMilliseconds = this.oCalendar.nMilliseconds;
				this.setInnerHtml(oElem, this.oCalendar.equals(oToday)? this._msgs['L_SIDECALENDAR_TODAY']: '');
			}
		}
	},
	drawTimeslotHeader: function(){
		var bHeaderUpdated = false;
		if (!this.asWideTimeslotHeaderHtml) {
			bHeaderUpdated = true;
			this.asWideTimeslotHeaderHtml = this.generateTimeslotHeaderHtml(false);
			this.anWideTimeslotHeaderWidth = [];
			for (var i = 0; i < this.asWideTimeslotHeaderHtml.length; i++)
				this.anWideTimeslotHeaderWidth[i] = this.getTextWidth('s-cv-entry s-cv-text', true, this.asWideTimeslotHeaderHtml[i]);
		}
		var fNarrowTimeslotView = false;
		for (var i = 0; i < this.anWideTimeslotHeaderWidth.length; i++) {
			if (this.anWidth[i] < this.anWideTimeslotHeaderWidth[i] + 3)
				fNarrowTimeslotView = true;
		}
		if (fNarrowTimeslotView && !this.asNarrowTimeslotHeaderHtml) {
			bHeaderUpdated = true;
			this.asNarrowTimeslotHeaderHtml = this.generateTimeslotHeaderHtml(true);
		}
		if (bHeaderUpdated || fNarrowTimeslotView != this.fNarrowTimeslotView) {
			this.fNarrowTimeslotView = fNarrowTimeslotView;
			var asHtml = this.fNarrowTimeslotView? this.asNarrowTimeslotHeaderHtml: this.asWideTimeslotHeaderHtml;
			for (var i = 0, oDate = this.oCalViewStart.clone();i < this.nDays; i++) {
				var oElem = dojo.doc.getElementById(this.sId + '-header-date' + i);
				if (oElem) {
					this.setInnerHtml(oElem, asHtml[i]);
				}
			}
		}
	},
	generateTimeslotHeaderHtml: function(fNarrow){
		if (!this.oCalViewStart) {
			this.setViewDateRange(this.oCalendar);
		}
	
		var asHtml = [];
		var oFormatter = new dwa.date.dateFormatter(D_DateFmt_Month4Yr);
		var oFullFormatter = new dwa.date.dateFormatter(D_DateFmt_Full);
	
		if (this.nCalViewAltCal)
			var oAltCalFormatter = new dwa.date.altCalendarFormatter(this.nCalViewAltCal);
	
		var dateType = this.getDateType();
		for (var i = 0, oDate = this.oCalViewStart.clone();i < this.nDays; i++) {
			while (this.sType == 'F' && this.isWeekEnd(oDate))
				oDate.adjustDays(0, 0, 1);
			var bWeekEnd = this.bWeekEndView && this.isWeekEnd(oDate);
			oFormatter.sFormat = bWeekEnd? this.sTimeFmtHeaderWeekEnd: fNarrow? this.sTimeFmtHeaderNarrow: this.sTimeFmtHeader;
			var asText, sTitle;
			var asAltText = oAltCalFormatter? oAltCalFormatter.format(oDate).split('|'): [''];
			var sAltText = ((this.nCalViewAltCal == 2) || (this.nCalViewAltCal == 1)) ? (this.isRTL? D_RLE: '') + asAltText[1] + ' ' + asAltText[2] + ', ' + asAltText[0] + (this.isRTL? D_PDF: ''):
			               this.nCalViewAltCal == 3? asAltText[0]: '';
			//bidi 
			if(dateType != cfg.GREGORIAN){
				var nDate = this.convertDate(oDate,dateType);
				asText = this.formatAltDate(nDate, 1,dateType).split('|');
				sTitle = this.formatAltDate(nDate, D_DateFmt_Full,dateType);
			}else{
				asText = oFormatter.format(oDate).split('|');
				sTitle = oFullFormatter.format(oDate) + (sAltText? ' (' + sAltText + ')': '');
			}

			
			if (asText.length < 3) {
				asHtml[i] = '<table role="presentation" border=0 aria-label="' + sTitle + '" title="' + sTitle + '"><tr>'
				          + '<td nowrap class="s-cv-text' + (this.isToday(oDate)? ' s-cv-text-today-hc' : '') + '" style="font-weight:bold;">' + asText[0] + '</td>'
				          + '<td nowrap class="s-cv-text">' + (sAltText? '&nbsp;' + sAltText: '') + '</td></tr></table>';
			} else if ((this.nCalViewAltCal == 1) || (this.nCalViewAltCal == 2)) {                 //Hijri or Hebrew
				var sRLE = this.isRTL? D_RLE: '';
				var sInner = '';
				if (bWeekEnd && (fNarrow || this.isRTL))
					sInner = '<td nowrap class="s-cv-text" align="' + D_ALIGN_REVERSE + '">' + sRLE + '<b>' + asAltText[2] + '</b><br>' + asAltText[1] + '</td>';
				else if(bWeekEnd || fNarrow)
					sInner = '<td nowrap class="s-cv-text" align="' + D_ALIGN_REVERSE + '">' + sRLE + asAltText[1] + '<br>' + asAltText[0]
					       + '<td nowrap class="s-cv-text-large">' + sRLE + asAltText[2] + '</td>';
				else
					sInner = '<td nowrap class="s-cv-text" align="' + D_ALIGN_REVERSE + '">' + sRLE + '<br>' + asAltText[0] + '&nbsp;' + asAltText[1] + '</td>'
					       + '<td nowrap class="s-cv-text-large">' + sRLE + asAltText[2] + '</td>';

				asHtml[i] = '<table role="presentation" border=0 class="s-cv-timeslot-header" title="' + sTitle
				          + '"><tr><td nowrap class="s-cv-text-large">' + asText[0] + '</td>'
				          + '<td nowrap width="100%" class="s-cv-text"><b>' + asText[1] + '</b><br>' + asText[2] + '</td>'
				          + sInner
				          + '</tr></table>';
			} else {
				asHtml[i] = '<table role="presentation" border=0 class="s-cv-timeslot-header" aria-label="' + sTitle + '" title="' + sTitle + '"><tr><td nowrap class="s-cv-text-large">' + asText[0] + '</td>'
				          + '<td nowrap class="s-cv-text"><b>' + asText[1] + '</b>'
				          + (sAltText? '&nbsp;' + sAltText: '') + '<br>'
				          + asText[2] + '</td></tr></table>';
			}
			oDate.adjustDays(0, 0, 1);
		}
		return asHtml;
	},
	onDatasetComplete: function(){
		if (!this.bAdjusted) {
			setTimeout(dojo.hitch(this, "onDatasetComplete"), 100);
			return;
		}
		this.bLoading = false;
		this.clearCalendarEntries();
		// this.checkForConflicts(); // already checked by calendarDataStore
		this.drawCalendarEntries();
		this._setLoadingAttr(false);
	
		// Indicate the the first data has been available
//		com_ibm_dwa_globals.fFirstDataAvailable = true;
//		com_ibm_dwa_globals.fJesterReady = true;
	},
	generateImageHtml: function(sUrl, nWidth, nHeight, nXOffset, nYOffset, sAltText, sId, doNotRenderInHC){
		if (!sUrl.match(/^[http:|https:|file:|\/|\.\.]/)) {
			sUrl = this.buildResourcesUrl(sUrl);
			if(sUrl.uri) {
				sUrl = sUrl.uri;
			}
		}

		if (!sId) {
			if (!this.sImgCnt)
				this.sImgCnt = 0;
			sId = this.sId + '-image' + this.sImgCnt;
			this.sImgCnt ++;
		}

		// nakakura
		// High-Contrast Mode
		if (dojo.hasClass(dojo.body(), "dijit_a11y")) {
			if(!!doNotRenderInHC) {
				return '';
			} else {
				return '<img alt="" style="border-width:0px;" src="' + this.sTransparent + '"' + ' width="' + nWidth + '" height="' + nHeight + '"/>'
					+ '<span style="display:inline-block;top:5px;' + D_ALIGN_DEFAULT + ':2px;position:absolute;width:'+nWidth+'px;height:'+nHeight+'px;overflow:hidden">'
					+ '<img alt="' + sAltText + '" src="' + sUrl + '" style="position:absolute;display:block;border-width:0px;top:-'+ nYOffset +'px;' + D_ALIGN_DEFAULT + ':-'+ nXOffset +'px;"/></span>';
			}
		}

		var sImg = '<img id="' + sId + '" alt="' + sAltText + '" src="' + this.sTransparent + '"'
				+ ' width="' + nWidth + '" height="' + nHeight + '"';
		var sImgAppend = '';
		if (this.asConsolidateImages[sUrl] && this.asConsolidateImages[sUrl].fLoaded) {
			sImgAppend = ' style="border-width:0px;background-position: -' + nXOffset + 'px -' + nYOffset  + 'px;'
				+ ' background-image: url(' + sUrl + ');">';
		} else {
			sImgAppend = ' xoffset="' + nXOffset + '" yoffset="' + nYOffset  + '"'
				+ ' consolidatedImage="' + sUrl + '">';
			if (!this.asConsolidateImages[sUrl])
				this.asConsolidateImages[sUrl] = {fLoaded:false, asIds:[sId]};
			else
				this.asConsolidateImages[sUrl].asIds[this.asConsolidateImages[sUrl].asIds.length] = sId;
		}
		if (!this.fLoadingImages)
			setTimeout(dojo.hitch(this, 'loadImage'), 500);
		return sImg + sImgAppend;
	},
	loadImage: function() {
		this.fLoadingImages = false;
		for (var sUrl in this.asConsolidateImages) {
			if (!this.asConsolidateImages[sUrl].fLoaded) {
				this.asConsolidateImages[sUrl].fLoaded = true;
				new dwa.common.consolidatedImageListener(this.asConsolidateImages[sUrl].asIds, sUrl);
			}
		}
	},
	escape: function(sHtmlText){
		// fixed error in displaying Google calendar entry if the entry doesn't have location information. (SPR MMII7VAC5W)
		if (!sHtmlText)
			return '';
		return sHtmlText
				.replace(/&/g, '&amp;')
				.replace(/&amp;#/g, '&#')
				.replace(/\"/g,'&quot;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');
	},
	generateCalendarEntryHtml: function(oEvent, nIndex, fSelected, oSelectedElem, fInDrag){
		var a = [], n = 0;
		var sSubject  = lconn.core.globalization.bidiUtil.enforceTextDirection(this.escape(oEvent.sSubject));
		var sLocation = lconn.core.globalization.bidiUtil.enforceTextDirection(this.escape(oEvent.sLocation));
		var sChair    = (oEvent.sType != CS_ENTRY_TYPE_MEETING && oEvent.sType != CS_ENTRY_TYPE_UNPROCESSED)? '':
		                this.escape(this.bShowAlternateName && oEvent.sAltChair? oEvent.sAltChair: oEvent.sChair);
		sChair = lconn.core.globalization.bidiUtil.enforceTextDirection(sChair);
		if (this.fSummarize && !this.fRoundCouner)
			return this.generateSummarizedCalendarEntryHtml(oEvent, nIndex, fSelected, fInDrag, sSubject, sLocation, sChair);

		// summary
		if (this.fSummarize || this.bTimeSlotView) {
			if (oEvent.bAllday || this.fNarrowSummaryView) {
				var sSummary = (this.fSummarize? '<b unselectable="on">': '') + sSubject + (this.fSummarize? '</b>': '');
			} else {
				var sSummary = (this.fSummarize? '<b unselectable="on">': '') + sSubject + (this.fSummarize? '</b>': '')
					+ (sLocation? '<br>' + sLocation: '')
					+ (oEvent.sType == CS_ENTRY_TYPE_MEETING && sChair? '<br>' + sChair: '');
			}
		} else {
			var sSummary = sSubject;
		}

		// start of calendar entry
		var fRoundCouner = this.fRoundCouner || (!this.fSummarize && !this.bTimeSlotView);
		var sColorBar = fRoundCouner? '': this.sColorBar;
		if (fSelected) {
			var nWidth = oSelectedElem.offsetWidth;
			var nHeight = oSelectedElem.offsetHeight;
			var sId = this.sId + (fInDrag? '-entry-drag-innerframe': '-entry-selected');
			a[n++] = '<div class="s-cv-entry" role="button" _selectedtag='+sId+' id=' + sId
				+ ' style="top:0px;' + D_ALIGN_DEFAULT + ':0px;width:100%;height:' + nHeight + 'px;"'
				+ ' unid="' + oEvent.sUnid + '"'
				+ ' calendar_start_notes="' + oEvent.sThisStartDate + '"'
				+ ' calendar_external="' + (oEvent.fExternal? "1": "0") + '"'
				// calendar_index is always required (SPR SQZO7YU867)
				+ ' calendar_index="' + oEvent.nIndex + '"';
		} else {
			a[n++] = '<div id=' + this.sId + '-entry' + nIndex + ' class="s-cv-entry"  '
				+ ' calendar_type="' + oEvent.sType + '" unid="' + oEvent.sUnid + '" '
				+ ' calendar_date="' + oEvent.oStartDate.getISO8601String() + '"'
				+ ' calendar_index="' + oEvent.nIndex + '"'
				+ ' calendar_start="' + oEvent.oStartTime.getISO8601String() + '"'
				+ ' calendar_end="' + oEvent.oEndTime.getISO8601String() + '"'
				+ ' calendar_start_notes="' + oEvent.sThisStartDate + '"'
				+ ' calendar_bgcolor1="' + oEvent.sBGColor1 + '"'
				+ ' calendar_bgcolor2="' + oEvent.sBGColor2 + '"'
				+ ' calendar_fontcolor="' + oEvent.sFontColor + '"'
				+ ' calendar_bordercolor="' + oEvent.sBorderColor + '"'
				+ ' calendar_external="' + (oEvent.fExternal? "1": "0") + '"'
				+ 'cal_eventid="'+oEvent.sUnid+'_tag"'
				+ (oEvent.fExternal ? (' calendar_generator="' + oEvent.sGenerator + '"'): '');
		}

		// event handler
		if (fSelected) {
			if (!fInDrag) {
				if (!_isIE()) {
					a[n++] = this._attachEvent('click');	// no need to handle double click event in Safari
				} else {
					a[n++] = this._attachEvent('click|dblclick');
				}
			}
			a[n++] = '>';
		} else {
			a[n++] = this._attachEvent('mouseover|mouseout|click|dblclick|contextmenu') + '>';
		}

		// gradient
		if (!fRoundCouner) {
			var sId = oEvent.sUnid +"_"+ nIndex + (fInDrag? '-entry-drag-gradient': fSelected? '-entry-selected-gradient': '-entry' + nIndex + '-gradient');
			a[n++] = '<div class="s-cv-entry" style="width:100%;height:100%;border-width:1px;border-style:' + (oEvent.sBorderStyle || 'solid') + ';border-color:#71b9c6;background-color:' + (fSelected? '#E6F4F7': '#FFFFFF') + ';">'
				+ '</div>'
				+ '<div class="s-cv-entry s-cv-timeslot-entry-colorbar" style="' + (sColorBar==D_ALIGN_REVERSE? D_ALIGN_REVERSE + ':0px': '') + ';height:100%;border-width:1px;border-style:' + (oEvent.sBorderStyle || 'solid') + ';border-color:#71b9c6;">'
				+ this.insertGradientHtml(sId, 's-cv-entry', oEvent.sBGColor1, oEvent.sBGColor2)
				+ '</div>';
		} else if (fSelected) {
			var sId = oEvent.sUnid +"_"+ nIndex + (fInDrag? '-entry-drag-gradient': '-entry-selected-gradient');
			a[n++] = this.insertGradientHtml(sId, 's-cv-entry', this.oColorMap['entry-selected-light'], this.oColorMap['entry-selected-dark'], this.oColorMap['entry-selected-border']);
		} else {
			var sBorderColor = this.fSummarize? '#5f5f5f': oEvent.sBorderColor;
			a[n++] = this.insertGradientHtml(this.sId + '-entry' + nIndex + '-gradient', 's-cv-entry', oEvent.sBGColor1, oEvent.sBGColor2, sBorderColor);
		}

		// selected area
		if (fSelected && !fInDrag) {
			if (dojo.isFF) {
				a[n++] = this.generateSelectedAreaHtml('-entry-selected-area'
					, 'top:2px;' + D_ALIGN_DEFAULT + ':2px;width:' + (nWidth - 4) + 'px;height:' + (nHeight - 4) + 'px;'
					, true /* should not handle keyboard event here (SPR SQZO7Q9BSX) */, oEvent);
			} else if (dojo.isWebKit) {
				a[n++] = this.generateSelectedAreaHtml('-entry-selected-area'
					, 'top:4px;' + D_ALIGN_DEFAULT + ':4px;width:' + (nWidth - 8) + 'px;height:' + (nHeight - 8) + 'px;'
					, true /* should not handle keyboard event here (SPR SQZO7Q9BSX) */, oEvent);
			} else {
				a[n++] = this.generateSelectedAreaHtml('-entry-selected-area'
					, 'top:1px;' + D_ALIGN_DEFAULT + ':1px;width:' + (nWidth - 2) + 'px;height:' + (nHeight - 3) + 'px;font-size:10%;'
					, true /* should not handle keyboard event here (SPR SQZO7Q9BSX) */, oEvent);
			}
		}

		// start of inner frame
		var sFontColor = !fRoundCouner? '#333333': fSelected? this.oColorMap['entry-selected-font']: oEvent.sFontColor;
		var bBolder = !fRoundCouner? false: fSelected? true : false;
		if (!this.fSummarize) {
			a[n++] = '<div class="s-cv-entry-innerframe s-cv-text"  unselectable="on"'
				+ ' style="' + (bBolder ? 'font-weight:bold;' : '') + 'top:0px;' + D_ALIGN_DEFAULT + ':0px;width:100%;height:95%;color:' + sFontColor + ';' + (!this.bTimeSlotView? 'white-space:nowrap;': '') + '"'
				+ ((this.sType != 'D' || !oEvent.bAllday) && !this.fDisableDragDrop ? (' com_ibm_dwa_ui_draggable_redirect="' + this.sId + '"'): '') + '>';
		}

		// time range
		var oTimeFormatter = new dwa.date.dateFormatter(D_TimeFmt_Default);
		if (this.fSummarize && !oEvent.bAllday) {
			var sTime = oTimeFormatter.format(oEvent.oDataStartTime) + (oEvent.hasEndTime? '&nbsp;-&nbsp;' + oTimeFormatter.format(oEvent.oDataEndTime): '');
			a[n++] = '<div class="s-cv-entry-innerframe s-cv-text" unselectable="on"'
				+ ' style="top:0px;' + D_ALIGN_DEFAULT + ':0px;' + D_PADDING_DEFAULT + ':10px;width:145px;height:' + this.nTextHeight + 'px;color:' + sFontColor + ';">'
				+ sTime
				+ '</div>';
		} else if (!this.bTimeSlotView && !oEvent.bAllday) {
			a[n++] = oTimeFormatter.format(oEvent.oDataStartTime);
		}

		// icon
		if (this.fSummarize || this.bTimeSlotView) {
			var sImg = "";
			if(oEvent.sIconParam){
				// sIconParam = 'URL WIDTH HEIGHT XOFFSET YOFFSET'
				var asIconParam = oEvent.sIconParam.split(' ');
				sImg = this.generateImageHtml(asIconParam[0], asIconParam[1], asIconParam[2], asIconParam[3], asIconParam[4], (oEvent.sType? oEvent.sType: ''));
			}
			if (sColorBar) {
				a[n++] = '<div class="s-cv-entry" style="' + (sColorBar == D_ALIGN_REVERSE? D_ALIGN_REVERSE: D_ALIGN_DEFAULT) + ':0px;width:20px;height:20px;padding:0px 3px;">'
					+ sImg
					+ '</div>';
			} else if (this.fSummarize) {
				if (this.fNarrowSummaryView)
					var sStyle = D_ALIGN_REVERSE + ':0px;width:20px;';
				else
					var sStyle = D_ALIGN_DEFAULT + ':0px;' + D_PADDING_DEFAULT + ':150px;width:170px;';
				a[n++] = '<div class="s-cv-entry s-cv-text" unselectable="on" style="' + sStyle + 'top:0px;height:20px;">'
					+ '<div class="s-cv-entry-innerframe" style="width:100%;height:100%">'
					+ sImg
					+ '</div></div>';
			} else {
				a[n++] = sImg;
			}
		}

		// summary
		if (this.fSummarize) {
			oEvent.nTextHeight = this.getTextHeight('s-cv-entry-innerframe s-cv-text', true, sSummary);
			if (this.fNarrowSummaryView)
				var sStyle = D_ALIGN_DEFAULT + ':0px;padding-top:' + (oEvent.bAllday? 3: this.nTextHeight) + 'px;' + D_PADDING_DEFAULT + ':20px;'
					+ (oEvent.bAllday? D_PADDING_REVERSE + ':20px;': '');
			else
				var sStyle = D_ALIGN_DEFAULT + ':0px;' + D_PADDING_DEFAULT + ':170px;';
			a[n++] = '<div class="s-cv-entry" style="top:0px;' + sStyle + 'width:100%;height:100%;">'
				+ '<div class="s-cv-entry-innerframe s-cv-entry-innerframe-height s-cv-text" unselectable="on" style="width:100%;height:100%;color:' + sFontColor + ';overflow:hidden;">'
				+ sSummary
				+ '</div>'
				+ '</div>';
			oEvent.nTextHeight += (this.fNarrowSummaryView && !oEvent.bAllday? this.nTextHeight: 0);
		} else if (sColorBar) {
			a[n++] = '<div class="s-cv-entry" style="width:100%;height:100%;' +  (sColorBar==D_ALIGN_REVERSE? D_PADDING_REVERSE: D_PADDING_DEFAULT) + ':22px;">'
				+ '<div class="s-cv-entry-innerframe" style="width:100%;height:100%;padding:0px;">'
				+ sSummary
				+ '</div></div>';
		} else if (fSelected) {
			a[n++] = '<span id=' + this.sId + '-entry-selected-summary unselectable="on"'
				+ ((this.sType != 'D' || !oEvent.bAllday) && !this.fDisableDragDrop ? (' com_ibm_dwa_ui_draggable_redirect="' + this.sId + '"'): '') + '>'
				+ '&nbsp;'
				+ sSummary
				+ '</span>';
		} else {
			a[n++] = '&nbsp;' + sSummary;
		}

		// end of inner frame
		if (!this.fSummarize) {
			a[n++] = '</div>';
		}

		// end of calendar entry
		a[n++] = '</div>';

		if (this.sConflictBar && oEvent.hasConflictBar && this.bTimeSlotView) {
			a[n++] = '<div id="' + this.sId + '-entry' + nIndex + '-conflict" class="s-cv-entry s-cv-timeslot-entry-conflict"></div>';
		}
		return a.join('');
	},
	generateSummarizedCalendarEntryHtml: function(oEvent, nIndex, fSelected, bInDrag, sSubject, sLocation, sChair) {
		var a = [], n = 0;

		// start of calendar entry
		var sId = this.sId + (!fSelected? '-entry' + nIndex: bInDrag? '-entry-drag-innerframe': '-entry-selected');
		var sStyle = 'top:0px;' + D_ALIGN_DEFAULT + ':0px;width:100%;height:100%';
		var sEvent = this._attachEvent('click|dblclick' + (fSelected? '': '|mouseover|mouseout|contextmenu'));
		if (_isIE())
			var sAlpha = bInDrag? 'filter: alpha(opacity=50);': '';
		else
			var sAlpha = bInDrag? 'opacity:0.5;': '';

		var sClass = 's-cv-entry'
			+ (oEvent.sType == 'Unprocessed'? ' s-cv-entry-unprocessed': '')
			+ (fSelected? ' s-cv-entry-selected': '');

		a[n++] = '<div id="' + sId + '" _selectedtag='+sId+' class="' + sClass + '"'
			+ ' style="' + sStyle + sAlpha + '"'
			+ ' calendar_type="' + oEvent.sType + '" unid="' + oEvent.sUnid + '" '
			+ ' calendar_date="' + oEvent.oStartDate.getISO8601String() + '"'
			+ ' calendar_index="' + oEvent.nIndex + '"'
			+ ' calendar_start="' + oEvent.oStartTime.getISO8601String() + '"'
			+ ' calendar_end="' + oEvent.oEndTime.getISO8601String() + '"'
			+ ' calendar_start_notes="' + oEvent.sThisStartDate + '"'
			+ ' calendar_bgcolor1="' + oEvent.sBGColor1 + '"'
			+ ' calendar_bgcolor2="' + oEvent.sBGColor2 + '"'
			+ ' calendar_fontcolor="' + oEvent.sFontColor + '"'
			+ ' calendar_bordercolor="' + oEvent.sBorderColor + '"'
			+ ' calendar_external="' + (oEvent.fExternal ? "1" : "0") + '"'
			+ (oEvent.fExternal? ' calendar_generator="' + oEvent.sGenerator + '"': '')
			+ sEvent
			+ '>';

		// color bar
		if (this.getComputedStyle('summary-entry-colorbar', 'display') != 'none') {
		var sPadding = this.sColorBar=='left'? '2px 1px 0px 12px': this.sColorBar==D_ALIGN_REVERSE? '2px 12px 0px 1px': '2px 2px 0px 12px';
		var sId = this.sId + (bInDrag? '-entry-drag-gradient': fSelected? '-entry-selected-gradient': '-entry' + nIndex + '-gradient');
		a[n++] = '<div class="s-cv-entry" style="width:100%;height:100%;padding:' + sPadding + ';"><div class="s-cv-entry-innerframe" style="width:100%;height:100%;padding:0px;">'
			+ '<div class="s-cv-entry s-cv-ti" style="' + (this.sColorBar==D_ALIGN_REVERSE? D_ALIGN_REVERSE: D_ALIGN_DEFAULT) + ':0px;width:' + (this.sColorBar? '12px': '100%') + ';height:100%;border:1px solid ' + oEvent.sBorderColor + ';background-color:' + oEvent.sBGColor1 + ';">'
			+ (this.sColorBar? '': this.insertGradientHtml(sId, 's-cv-entry', oEvent.sBGColor1, oEvent.sBGColor2))
			+ '</div></div></div>';
		}

		// inner frame
		var sPadding = this.sColorBar=='left'? '4px 12px 4px 26px': this.sColorBar==D_ALIGN_REVERSE? '4px 24px 4px 12px': '4px 4px 4px 16px';
		a[n++] = '<div class="s-cv-entry s-cv-text s-cv-entry-separator" style="width:100%;height:100%;" unselectable="on">';

		// clickable link
		var asUrl = sLocation.match(/(http:\/\/|https:\/\/|www\.)([a-zA-Z0-9-_\/\.]*)/);
		if (asUrl) {
			var sUrl = asUrl[0];
			sLocation = sLocation.replace(sUrl, '<a href="' + (sUrl.match(/^https?:\/\//)? '': 'http://') + sUrl + '" target="_blank">' + sUrl + '</a>');
		}

		// indicator for invitation
		var sColor = this.getComputedStyle('entry-indicator', 'display') != 'none' && this.getComputedStyle('entry-indicator', 'backgroundColor');
		
		var asIconParam = oEvent.sIconParam && oEvent.sIconParam.split(' ');
		var sMsg = oEvent.sType == CS_ENTRY_TYPE_EVENT ? this._msgs["L_ALL_DAY"] : oEvent.sType == CS_ENTRY_TYPE_ANNIVERSARY ? this._msgs["L_ANNIVERSARY"] : this._msgs["L_TO_DO"];
		var oTimeFormatter = new dwa.date.dateFormatter(this.nTimeFmtSummary);
		a[n++] = oEvent.sSummarizedCalendarEntryHtml = '<div style="padding:' + sPadding + ';">' + this.wrapText(
			// time range
			(!oEvent.bAllday? '<div class="s-cv-entry-time">' + oTimeFormatter.format(oEvent.oDataStartTime) + (oEvent.hasEndTime? '&nbsp;-&nbsp;' + oTimeFormatter.format(oEvent.oDataEndTime): '') + '</div>': '<div class="s-cv-entry-allday">' + sMsg + '</div>')
			// Subject
			+ (sSubject? '<div class="s-cv-entry-subject">' + sSubject + '<span class="s-cv-fade"></span></div>': '')
			// Location
			+ (sLocation? '<div class="s-cv-entry-location">' + sLocation.replace(/\r/g, "<br>") + '<span class="s-cv-fade"></span></div>': '')
			// Chair
			+ (sChair? '<div class="s-cv-entry-chair">' + sChair + '<span class="s-cv-fade"></span></div>': '')
			// icon
			+ (oEvent.sIconParam? '<div class="s-cv-entry-icon' + (oEvent.bAllday? ' s-cv-entry-icon-allday': '') + '" style="position:absolute;">' + this.generateImageHtml(asIconParam[0], asIconParam[1], asIconParam[2], asIconParam[3], asIconParam[4]) + '</div>': '')
			// invitation indicator
			+ (oEvent.sType == 'Unprocessed' && sColor?
				'<div class="s-cv-entry-indicator" style="position:absolute;">'
					+ '<div style="position:absolute;top:0;left:0;width:100%;height:100%;">' + this.insertGradientHtml(this.sId + '-entry' + nIndex + '-indicator', 's-cv-entry-indicator', sColor, sColor, sColor) + '</div>'
					+ '<div style="position:absolute;top:0;left:0;width:100%;height:100%;">' + this._msgs["L_NOT_PROCESSED"] + '</div></div>': '')
			) + '</div>';

		// end of inner frame
		a[n++] = '</div>';

		// selected area
		if (fSelected) {
			if (!_isIE())
				var sStyle = 'border:1px dotted gray;';
			else
				var sStyle = '';
			
			a[n++] = '<div class="s-cv-entry" style="width:100%;height:100%;padding:1px 1px 0px;"><div class="s-cv-entry-innerframe" style="width:100%;height:100%;padding:0px;">'
				+ this.generateSelectedAreaHtml('-entry-selected-area', 'width:100%;height:100%;' + sStyle, true /* should not handle keyboard event here (SPR SQZO7Q9BSX) */, oEvent)
				+ '</div></div>';
		}

		// end of calendar entry
		a[n++] = '</div>';

		if (this.sConflictBar && oEvent.hasConflictBar) {
			a[n++] = '<div id="' + this.sId + '-entry' + nIndex + '-conflict" class="s-cv-entry s-cv-timeslot-entry-conflict"></div>';
		}

		return a.join('');
	},
	wrapText: function(sText, nLen){
		if (!_isIE()) {
			var asText = sText.split(' ');
			for(var i = 0; i < asText.length; i++){
				if(asText[i].length > nLen)
					asText[i] = asText[i].split('').join(String.fromCharCode(8203));
			}
			return asText.join(' ');
		} else {
			return sText;
		}
	},
	drawCalendarEntries: function(){
		// no calendar entries in year view
		if (this.sType == 'Y')
			return;
	
		var oDate = this.oCalViewStart.clone();
		oDate.fDateOnly = true;
		
		var nDaysInRow = this.fSummarize? this.nDays: this.sType=='2' || this.sType=='M'? 7: this.nDays;
		var nRowsInMonth = this.fSummarize? 1: this.sType=='M'? 6: this.sType=='2'? 2: 1;
		var nIndex = 0;
		var sLastDate = '';
		var oFormatter = new dwa.date.dateFormatter(D_DateFmt_Full);
		var asGridHtml = [''], asAllDayHtml = [''];
		if (this.nCalViewAltCal)
			var oAltCalFormatter = new dwa.date.altCalendarFormatter(this.nCalViewAltCal);
	
		for (var j=0; j<nRowsInMonth; j++) {
			for (var i=0; i<nDaysInRow; i++) {
				if (this.sType == 'F') {
					while (this.isWeekEnd(oDate))
						oDate.adjustDays(0, 0, 1);
				}
				var aoEvents = this.oCalendarDataStore.getEventsByDate(oDate);
				for (var n=0; n<aoEvents.length; n++) {
					var oEvent = aoEvents[n];
					oEvent.bHide = (this.fUseCalendarLite && oEvent.sType == CS_ENTRY_TYPE_TODO);
					
					if (oEvent.bHide)
						continue;
					oEvent.nIndexInView = nIndex;
					oEvent.sThisStartDate = new dwa.common.notesValue(oEvent.oStartTime.getDate(),
											dwa.date.zoneInfo.prototype.oUTC).toString().replace(',00', '');
					if (this.fSummarize) {
						// category by date
						// note: no need date header in One Day view
						if (sLastDate != oDate.getISO8601String() && this.sType != 'D') {
							sLastDate = oDate.getISO8601String();
							var sAltHTML = oAltCalFormatter? oAltCalFormatter.format(oDate) : '';
							if (this.nCalViewAltCal == 1 || this.nCalViewAltCal == 2) {     //Hijri or Hebrew
								var asAltText = oAltCalFormatter.format(oDate).split('|');
								var sRLE = this.isRTL? D_RLE : '';
								var sPDF = this.isRTL? D_PDF : '';
								sAltHTML = sRLE + asAltText[1] + '&nbsp;' + asAltText[2] + ',&nbsp;' + asAltText[0] + sPDF;
							}
							var sIconHtml = this.generateImageHtml(this.sColIcons, 10, 10, 81, 100, '', this.sId + '-dateicon' + sLastDate);
							var sDateHtml = oFormatter.format(oDate) + (oAltCalFormatter? '&nbsp;(' + sAltHTML + ')': '');
							var asHtml = this.sExpandIcon == D_ALIGN_REVERSE? [sDateHtml, sIconHtml]: [sIconHtml, sDateHtml];
							asGridHtml[asGridHtml.length]
								= '<div cal_eventid="' + oEvent.sUnid + '_tag" id="' + this.sId + '-date' + sLastDate + '"'
								+ ' class="s-cv-entry s-cv-text" style="' + D_ALIGN_DEFAULT + ':1px;width:100%;font-weight:bold;padding-top:2px;' + D_PADDING_DEFAULT + ':2px;"'
								+ ' calendar_date="' + sLastDate + '"'
								+ this._attachEvent('click|dblclick') + '>'
								+ asHtml.join('&nbsp;')
								+ '</div>'
								+ '</div>';
						}
						asGridHtml[asGridHtml.length] = this.generateCalendarEntryHtml(oEvent, nIndex);
					} else if (this.bTimeSlotView && oEvent.bAllday) {
						asAllDayHtml[asAllDayHtml.length] = this.generateCalendarEntryHtml(oEvent, nIndex);
					} else {
						asGridHtml[asGridHtml.length] = this.generateCalendarEntryHtml(oEvent, nIndex);
					}
					nIndex ++;
				}
				if (asAllDayHtml.length > 1) {
					var oElem = dojo.doc.getElementById(this.sId + '-allday');
					if (oElem) {
						asAllDayHtml[0] = oElem.innerHTML;
						this.setInnerHtml(oElem, asAllDayHtml.join(''));
					}
					asAllDayHtml = [''];
				}
				if (asGridHtml.length > 1 && !this.fSummarize && !this.bTimeSlotView) {
					var oElem = dojo.doc.getElementById(this.sId + '-grid-date' + j + '-' + i + '-innerframe');
					if (oElem) {
						// @kami@ For some reason, when some entries (e.g. iCal) are inserted after another type
						// of entries (e.g. Notes) using FederatedDataStore, existing entries move a few pixels
						// to the right. This happens only on IE in the BiDi mode.
						// The code below is a workaound to avoid that strange behavior.
						if(_isIE() && this.isRTL){ // kami
							var oDiv = dojo.doc.createElement('DIV');
							this.setInnerHtml(oDiv, asGridHtml.join(''));
							while(oDiv.childNodes.length > 0){
								oElem.appendChild(oDiv.removeChild(oDiv.firstChild));
							}
						}else{
							asGridHtml[0] = oElem.innerHTML;
							this.setInnerHtml(oElem, asGridHtml.join(''));
						}
					}
					asGridHtml = [''];
				}
				oDate.adjustDays(0,0,1);
			}
		}
	
		if (asGridHtml.length > 1 && (this.fSummarize || this.bTimeSlotView)) {
			var oElem = dojo.doc.getElementById(this.sId + (this.fSummarize? '-summary': '-timeslot'));
			if (oElem) {
				if(_isIE() && this.isRTL){ // kami
					var oDiv = dojo.doc.createElement('DIV');
					this.setInnerHtml(oDiv, asGridHtml.join(''));
					while(oDiv.childNodes.length > 0){
						oElem.appendChild(oDiv.removeChild(oDiv.firstChild));
					}
				}else{
					asGridHtml[0] = oElem.innerHTML;
					this.setInnerHtml(oElem, asGridHtml.join(''));
				}
			}
			asGridHtml = [''];
		}

		this.nEntries = nIndex;
		this.updateCalendarEntries();
	
		if (this.fSummarize)
			this.updateSelectedArea();
	},
	insertTimebarHtml: function() {
		return '<div id="' + this.sId + '-timebar" class="s-cv-timebar" style="display:none;">'
		       + '<div id="' + this.sId + '-timebar-line" class="s-cv-timebar-line"></div>'
		       + '<div id="' + this.sId + '-timebar-oval1" class="s-cv-timebar-oval1"></div>'
		       + '<div id="' + this.sId + '-timebar-oval2" class="s-cv-timebar-oval2"></div>'
		     + '</div>';
	},
	insertGradientHtml: function(sId, sClass, sColor1, sColor2, sBorderColor, nAlpha){
		if((!dojo.isMozilla && !dojo.isWebKit)){
			if(_isIE() >= 9){
				var sHtml = '<canvas id="' + sId + '"' + (sClass? ' class="' + sClass + '"': '')
						+ ' style="top:0px;' + D_ALIGN_DEFAULT + ':0px;width:100%;height:100%;"'
						+ ' color2="' + sColor1 + '" color="' + sColor2 + '"' + (sBorderColor? ' color3="' + sBorderColor + '"': '')
						+ (nAlpha? ' alpha="' + nAlpha + '"': '') + '></canvas>';
			}else{
				var sHtml = '<v:' + (sBorderColor? 'round': '') + 'rect id="' + sId + '"'
						+ (sClass? ' class="' + sClass + '"': '')
						// width of gradient area should be narrow in BiDi. (SPR KZHU7PFBDU)
						+ ' style="top:0px;' + D_ALIGN_DEFAULT + ':' + (this.isRTL? 1: 0) + 'px;"'
						+ (sBorderColor? ' strokecolor="' + sBorderColor + '" arcsize="5%"': ' stroked="false"') + '>'
						+ '<v:fill type="gradient" color="' + sColor1 + '" color2="' + sColor2 + '"' + (nAlpha? ' opacity="' + nAlpha + '%"': '') + '>'
						+ '</v:fill></v:' + (sBorderColor? 'round': '') + 'rect>';
			}
		}else{
			var sHtml = '<canvas id="' + sId + '"' + (sClass? ' class="' + sClass + '"': '')
					+ ' style="top:0px;' + D_ALIGN_DEFAULT + ':0px;width:100%;height:100%;"'
					+ ' color2="' + sColor1 + '" color="' + sColor2 + '"' + (sBorderColor? ' color3="' + sBorderColor + '"': '')
					+ (nAlpha? ' alpha="' + nAlpha + '"': '') + '></canvas>';
		}
		return sHtml;
	},
	getSelectedDateTime: function(x, y, bInDrag, oEvent, oDragElem){
		var nDaysInRow = (this.sType=='2' || this.sType=='M'? 7: this.nDays);
		var nRowsInMonth = (this.sType=='M'? 6: (this.sType=='2'? 2:1));
		var oDate = this.oCalViewStart.clone();
		var nOffsetX = 0, nOffsetY = 0, nOffsetWidth = 0;

		if (this.fSummarize) {
			for (var i=0; i<this.nDays; i++) {
				if (this.anTop[i] <= y && y < this.anTop[i+1])
					break;
				oDate.adjustDays(0, 0, 1);
			}
			// return null if drop out
			if (i>=this.nDays)
				oDate = null;
			else {
				nOffsetY = this.anTop[i] + this.nTextHeight;
				nOffsetWidth = oDragElem? oDragElem.offsetWidth: 0;
			}
		} else if (this.bTimeSlotView) {
			if (x < this.anLeft[0] || this.anLeft[nDaysInRow] <= x) {
				// SPR #NYWU7FLBEB: Dragging to time column is not allowed in Hannover/Notes
				return null;
			}

			// get date
			for (var i=0; i<nDaysInRow; i++, oDate.adjustDays(0, 0, 1)) {
				if (this.sType == 'F') {
					while (this.isWeekEnd(oDate))
						oDate.adjustDays(0, 0, 1);
				}
				if (this.anLeft[i] <= x && x < this.anLeft[i+1]) {
					nOffsetX = this.anLeft[i] + this.nPadding + (this.sConflictBar == 'left'? 10: 0);
					nOffsetWidth = this.anWidth[i] - (this.nPadding * 2) - (this.sConflictBar? 10: 2);
					break;
				}
			}

			// get hour
			oDate.fDateOnly = false;
			// fix problem that select all day entry moves scroll bar to the top
			if (oEvent && oEvent.bAllday) {
				oDate.nHours = this.oCalendar.nHours;
				oDate.nMinutes = this.oCalendar.nMinutes;
				oDate.nSeconds = this.oCalendar.nSeconds;
				oDate.nMilliseconds = this.oCalendar.nMilliseconds;
				nOffsetY = this.nPadding;
			} else if (bInDrag && y < 0) {
				// do not allow drop on calendar header area (SPR KREY7TE4BD)
				return null;
			} else {
				oDate.nHours = Math.floor(y / this.nCellHeight);
				if (this.nTimeSlotDur < 60)
					oDate.nMinutes = this.nTimeSlotDur * Math.floor((y % this.nCellHeight)/ this.nMinGridHeight);
				nOffsetY = y - (y % this.nMinGridHeight) + this.nPadding;
			}
		} else {
			for (var j=0; j<nRowsInMonth; j++) {
				if (this.anTop[j] <= y && y < this.anTop[j+1])
					break;
				oDate.adjustDays(0, 0, nDaysInRow);
			}
			for (var i=0; i<nDaysInRow; i++) {
				if (this.anLeft[i] <= x && x < this.anLeft[i+1])
					break;
				oDate.adjustDays(0, 0, 1);
			}
			// set hour
			var oStart = (new dwa.date.calendar).setISO8601String(this.sTimeSlotStart);
			oDate.nHours = oStart.nHours;
			nOffsetX = this.anLeft[i];
			nOffsetY = this.anTop[j] + this.nTextHeight;
			nOffsetWidth = this.anWidth[i];
		}

		if (oDate && oDragElem) {
			if (this.nCalViewDragDrop == 2)
				this.setStyle(oDragElem, {D_ALIGN_DEFAULT: nOffsetX + 'px', top: nOffsetY + 'px', width: nOffsetWidth + 'px'});
			else
				this.setStyle(oDragElem, {D_ALIGN_DEFAULT: (x - oDragElem.offsetWidth/2) + 'px', top: (y - oDragElem.offsetHeight/2) + 'px'});
			if ((!dojo.isMozilla && !dojo.isWebKit)) {
				this.drawGradient(this.sId + '-entry-drag-gradient');
			}
		}

		// return com_ibm_dwa_misc_calendar object
		return oDate;
	},
	focus: function(){
		if (_isIE()) {
			if (this.fPreventFocusInPortal)
				return;
		}
		// move focus to handle keyboard event
		var oElem = dojo.doc.getElementById(this.sId + '-inplaceeditarea');
		if (!oElem) oElem = dojo.doc.getElementById(this.sId + '-entry-selected-area');
		if (!oElem) oElem = dojo.doc.getElementById(this.sId + (this.bTimeSlotView && this.bDateSelected? '-header-selected-area': '-selected-area'));
		if (oElem) {
			try { // prevent error in IE in resizing browser window when calendar view is hidden.
				// nakakura
				if (_isIE()) {
					// In the form mode, JAWS does not read the text just by changing it
					var sType = oElem.id.substring(this.sId.length);
					var oElemForJaws = dojo.doc.getElementById(this.sId + sType + '-for-jaws');
					if (!oElemForJaws) {
						dojo.place(this.generateSelectedAreaHtml(sType + '-for-jaws'), oElem.parentNode);
						oElemForJaws = dojo.doc.getElementById(this.sId + sType + '-for-jaws');
						dojo.toggleClass(oElemForJaws, "s-hidden");
					}
					oElemForJaws.style.cssText = oElem.style.cssText;
					dojo.toggleClass(oElem, "s-hidden");
					dojo.toggleClass(oElemForJaws, "s-hidden");
					if (dojo.hasClass(oElem, "s-hidden")) {
						oElem = oElemForJaws;
					}
					if (8 <= _isIE() || 3 <= dojo.isFF) {
						var id = this.sId + '-label-slot-' + (oElem.id.indexOf('-for-jaws') == -1 ? 1 : 2);
						this.setInnerHtml(dojo.byId(id), this.getTitleForScreenReader());
						oElem.setAttribute("aria-labelledby", id);
					} else
						oElem.title = this.getTitleForScreenReader();
				}
				if(dojo.isFF ) {
					var labelSlotID = this.sId + '-label-slot-3';
					var tempDateFmt = D_DateFmt_Full;
					if(this.sType != 'M')
						tempDateFmt = D_TimeFmt_Space;
					if(oElem.id == (this.sId + '-selected-area')) {
						var fFormatter = new dwa.date.dateFormatter(tempDateFmt);
						this.setInnerHtml(dojo.byId(labelSlotID),  fFormatter.format(this.oCalendar));
						oElem.setAttribute("aria-describedby", labelSlotID);
						oElem.blur();
					}

				} 
				oElem.focus();
			}
			catch (e) {}
		}
	
		if(dojo.isWebKit || dojo.isFF){
			// scroll bar is automatycally moved in IE and Firefox.
			if (oElem.id == this.sId + '-selected-area') {
				var oDiv = dojo.doc.getElementById(this.sId + (this.fSummarize? '-summary': this.bTimeSlotView? '-timeslot': '-grid'));
				if (oDiv.scrollTop > oElem.offsetTop)
					oDiv.scrollTop = oElem.offsetTop;
				else if ((oDiv.scrollTop + oDiv.clientHeight) < (oElem.offsetTop + oElem.offsetHeight))
					oDiv.scrollTop = oElem.offsetTop + oElem.offsetHeight - oDiv.clientHeight;
			}
		}
	},
	// nakakura
	getTitleForScreenReader: function() {
		// JAWS10 does not support safari
		if (dojo.isWebKit)
			return "";
		// focus is on the entry
		if (this.oSelectedElem && this.oSelectedEvent)
			return (this.oSelectedEvent.sStoreTitle ? this.oSelectedEvent.sStoreTitle + " " : "") +  this.oSelectedEvent.sType + " " + (_isIE() ? this.oSelectedElem.innerText : this.oSelectedElem.textContent);
		// focus is on the timeslot
		else if (this.bTimeSlotView && !this.bDateSelected) {
			return this.oCalendar.nHours + ":" + (this.oCalendar.nMinutes == 0 ? "0" : "") + this.oCalendar.nMinutes;
		// focus is on the date
		} else {
			if (!this.oFormatterA11y) 
				this.oFormatterA11y = new dwa.date.dateFormatter();
			return (this.oFormatterA11y.asDays[this.oCalendar.nDay] + " " + this.oCalendar.nDate + " "
					+ this.oFormatterA11y.asMonths[this.oCalendar.nMonth] + " " + this.oCalendar.nYear);
		}
	},
	setDate: function(oCalendar){
		var oProperty = dwa.common.commonProperty.get('p-e-calendarview-currentselected');
		oCalendar.fDateOnly = true;
		if (oProperty.vValue != oCalendar.getISO8601String()) {
			dwa.common.commonProperty.get('p-e-calendarview-currentselected').setValue(oCalendar.getISO8601String());
		}
		oCalendar.fDateOnly = false;
		this.selectedDate = oCalendar.getDate();
	},
	getDate: function(){
		if(this.oCalendar){
			return this.oCalendar.clone();
		}else{
			var oProperty = dwa.common.commonProperty.get('p-e-calendarview-currentselected');
			var oCalendar = (new dwa.date.calendar).setISO8601String(oProperty.vValue);
			return oCalendar;
		}
	},
	updateSelectedArea: function(){
		// calendar data is not retrived yet
		if (!this.oCalViewStart)
			return;
	
		var oToday = (new dwa.date.calendar).setDate(new Date());
		oToday.fDateOnly = false;
		oToday.nHours = this.oCalendar.nHours;
		oToday.nMinutes = this.oCalendar.nMinutes;
		oToday.nSeconds = this.oCalendar.nSeconds;
		oToday.nMilliseconds = this.oCalendar.nMilliseconds;
	
		if (this.bYearView) {
			var oDate = this.oCalendar.clone();
		} else {
			var oDate = this.oCalViewStart.clone();
			oDate.fDateOnly = false;
			oDate.nHours = this.oCalendar.nHours;
			oDate.nMinutes = this.oCalendar.nMinutes;
			oDate.nSeconds = this.oCalendar.nSeconds;
			oDate.nMilliseconds = this.oCalendar.nMilliseconds;
		}
		var nRowsInMonth = (this.bYearView || this.fSummarize)? 1: this.sType=='M'? 6: this.sType=='2'? 2: 1;
		var nDaysInRow = this.bYearView? 1: this.fSummarize? this.nDays: this.sType=='2' || this.sType=='M'? 7: this.nDays;
	
		var bHeaderSelectedAreaUpdated = false, bSelectedAreaUpdated = false, bHeaderCurrentUpdate = false;
	
		if (this.sType == 'F' && this.isWeekEnd(this.oCalendar)) {
			while (this.isWeekEnd(oDate))
				oDate.adjustDays(0, 0, 1);
			this.oCalendar = oDate.clone();
		}
		for (var j=0; j<nRowsInMonth; j++) {
			for (var i=0; i<nDaysInRow; i++) {
				if (this.sType == 'F') {
					while (this.isWeekEnd(oDate))
						oDate.adjustDays(0, 0, 1);
				}
				if (!this.bYearView && !this.fSummarize && oDate && oDate.equals(oToday)) {
					bHeaderCurrentUpdate = true;
					for (var s in {'-header-today':0, '-timeslot-today':0, '-timeslot-today-dark1':0, '-timeslot-today-dark2':0}) {
						this.setStyle(s, {
							display: '',
							D_ALIGN_DEFAULT: this.anLeft[i] + 'px',
							width: (this.anWidth[i]-1) + 'px'
						});
					}
					this.drawGradient(this.sId + '-header-today-gradient', this.oColorMap['header-today-dark'], this.oColorMap['header-today-light']);
				}

				if (oDate && oDate.equals(this.oCalendar)) {
					if (this.bYearView) {
						bSelectedAreaUpdated = true;
						oDate.fDateOnly = true;
						var oMonth = dojo.doc.getElementById(this.sId + '-month' + (oDate.nMonth + 1));
						var oElem = dojo.doc.getElementById(this.sId + '-date' + oDate.getISO8601String());
						if (oElem && oMonth)
							var nTop = oMonth.offsetTop + oElem.offsetTop, nLeft = oMonth.offsetLeft + oElem.offsetLeft, nWidth = oElem.offsetWidth, nHeight = oElem.offsetHeight;
						else
							var nTop = -10, nLeft = -10, nWidth = 10, nHeight = 10;
					} else if (this.fSummarize) {
						bSelectedAreaUpdated = true;
						oDate.fDateOnly = true;
						var oElem = dojo.doc.getElementById(this.sId + '-date' + oDate.getISO8601String());
						if (oElem)
							var nTop = oElem.offsetTop, nLeft = 0, nWidth = oElem.offsetWidth, nHeight = this.nTextHeight;
						else
							var nTop = -10, nLeft = -10, nWidth = 10, nHeight = 10;
					} else if (this.bTimeSlotView && this.bDateSelected) {
						bHeaderSelectedAreaUpdated = true;
						var nTop = 0;
						var nHeight = Math.max(this.nTextHeight, this.nTimeslotHeaderHeight) - 1;
						var nLeft = this.anLeft[i];
						var nWidth = this.anWidth[i];
					} else {
						bSelectedAreaUpdated = true;
						var nTop = (this.bTimeSlotView? this.nCellHeight * this.oCalendar.nHours: this.anTop[j]);
						if (this.bTimeSlotView && this.nTimeSlotDur < 60)
							nTop += this.nMinGridHeight * Math.floor(this.oCalendar.nMinutes / this.nTimeSlotDur);
						var nHeight = (this.bTimeSlotView? this.nMinGridHeight-1: this.nTextHeight);
						var nLeft = this.anLeft[i];
						var nWidth = this.anWidth[i];
					}

					if (dojo.isFF) {
						this.setStyle(bHeaderSelectedAreaUpdated? '-header-selected-area': '-selected-area', {
							display: '',
							top: (nTop+1) + 'px', D_ALIGN_DEFAULT: (nLeft+1) + 'px', width: (nWidth-3) + 'px', height: (nHeight-2) + 'px'
						});
					} else if (dojo.isWebKit) {
						this.setStyle(bHeaderSelectedAreaUpdated? '-header-selected-area': '-selected-area', {
							display: '',
							top: (nTop+2) + 'px', D_ALIGN_DEFAULT: (nLeft+2) + 'px', width: (nWidth-5) + 'px', height: (nHeight-4) + 'px'
						});
					} else {
						this.setStyle(bHeaderSelectedAreaUpdated? '-header-selected-area': '-selected-area', {
							display: '',
							top: nTop + 'px', D_ALIGN_DEFAULT: nLeft + 'px', width: (nWidth-1) + 'px', height: nHeight + 'px'
						});
						if(_isIE()){
							this.setStyle(bHeaderSelectedAreaUpdated? '-header-selected-area-for-jaws': '-selected-area-for-jaws', {
								display: '',
								top: nTop + 'px', D_ALIGN_DEFAULT: nLeft + 'px', width: (nWidth-1) + 'px', height: nHeight + 'px'
							});
						}
					}

					if (this.fSummarize) {
						var oElem = dojo.doc.getElementById(this.sId + '-selected-area-gradient');
						if (oElem)
							this.drawGradient(oElem);
					}
					// move focus to handle keyboard event
					//this.focus();
				}
				oDate.adjustDays(0, 0, 1);
			}
		}
	
		// update left days in calendar footer
		this.updateFooter();
	
		var oMap = {
			'-header-selected-area': bHeaderSelectedAreaUpdated,
			'-selected-area':        bSelectedAreaUpdated,
			'-header-today':         bHeaderCurrentUpdate,
			'-timeslot-today-dark1': bHeaderCurrentUpdate,
			'-timeslot-today-dark2': bHeaderCurrentUpdate,
			'-timeslot-today':       bHeaderCurrentUpdate
		};
		for (var s in oMap) {
			if (!oMap[s])
				this.setStyle(s, {display:'none', D_ALIGN_DEFAULT:'0px'});
		}
	},
	getWeekNumber: function(oCalendar){
		// last day in this week
		var oDate = oCalendar.clone();
		oDate.fDateOnly = true;
		var nDays = (7 + this.nFirstDayInYear - oDate.nDay - 1) % 7;
		oDate.adjustDays(0, 0, nDays);
	
		// Jan 1 in this year
		var oNewYear = oDate.clone();
		oNewYear.nMonth = 0; oNewYear.nDate = 1;
		oNewYear.setDate(oNewYear.getDate(), this.oCalendar.oZoneInfo);
	
		do {
			// last day in the first week
			var nDays = (7 + this.nFirstDayInYear - oNewYear.nDay - 1) % 7;
			oNewYear.adjustDays(0, 0, nDays);
	
			if (oNewYear.nDate < this.nMinDaysInFirstWeek) {
				var nDays = (oDate.getUTCDate() - oNewYear.getUTCDate()) / 86400000;
				if (nDays <= 0) {
					// Jan 1 in the last year
					oNewYear.nYear --; oNewYear.nMonth = 0; oNewYear.nDate = 1;
					oNewYear.setDate(oNewYear.getDate(), this.oCalendar.oZoneInfo);
				} else
					// adjust one week later
					oNewYear.adjustDays(0, 0, 7);
			} else {
				// first day in the year
				oNewYear.adjustDays(0, 0, -6);
				// total days from the first day in the year
				var nDays = (oDate.getUTCDate() - oNewYear.getUTCDate()) / 86400000;
				// week number in this year
				var nWeeks = 1 + Math.floor(nDays / 7);
			}
		} while (!nWeeks);
	
		return nWeeks;
	},
	generateFooterText: function(sType){
		if (sType == 'M') {
			var nMonths = this.oCalendar.nMonth + 1;
			var nLeftMonths = 12 - nMonths;
			var sFormat = nLeftMonths==0? this._msgs["L_CAL_LAST_MONTH"]: nLeftMonths==1? this._msgs["L_CAL_LEFT_MONTH"]: this._msgs["L_CAL_LEFT_MONTHS"];
			var sText = dwa.common.utils.formatMessage(sFormat, nMonths, nLeftMonths);
		} else if (sType == 'W') {
			// last day in this week
			var oDate = this.oCalendar.clone();
			var nWeeks = this.getWeekNumber(oDate);
			if (oDate.nMonth == 0 && nWeeks >= 52)
				var nLeftWeeks = 0;
			else {
				if (oDate.nMonth == 11 && nWeeks == 1)
					oDate.nYear ++;
				oDate.nMonth = 11; oDate.nDate = 31;
				oDate.setDate(oDate.getDate(), this.oCalendar.oZoneInfo);
				var nTotalWeeks = this.getWeekNumber(oDate);
				while (oDate.nMonth == 11 && nTotalWeeks == 1) {
					oDate.adjustDays(0, 0, -7);
					var nTotalWeeks = this.getWeekNumber(oDate);
				}
				var nLeftWeeks = nTotalWeeks - nWeeks;
			}
	
			var sFormat = nLeftWeeks==0? this._msgs["L_CAL_LAST_WEEK"]: nLeftWeeks==1? this._msgs["L_CAL_LEFT_WEEK"]: this._msgs["L_CAL_LEFT_WEEKS"];
			var sText = dwa.common.utils.formatMessage(sFormat, nWeeks, nLeftWeeks);
		} else {
			var nDays = 0;
			var nLeftDays = 0;

			//bidi
			var dateType = this.getDateType();
			if(dateType == cfg.HIJRI){
				var oAltDate = this.getAltRange(dateType,'M');
				oAltDate.setDate(1);
				nDays = this.getDatesDifference(dateType, oAltDate, new ___id.Date(oAltDate.getFullYear(),0,1), 'day');
				nLeftDays = (oAltDate._civilLeapYear(oAltDate.getFullYear()) ? 355:354) - nDays;
			}else if(dateType == cfg.HEBREW){
				var oAltDate = this.getAltRange(dateType,'M');
				oAltDate.setDate(1);
				nDays = this.getDatesDifference(dateType, oAltDate, new ___hd.Date(oAltDate.getFullYear(),0,1),'day');
				nLeftDays = (oAltDate.isLeapYear(oAltDate.getFullYear()) ? 383:354) - nDays;
			}else{
				var oDate = this.oCalendar.clone();
				var oDateComp = this.oCalendar.clone();
				oDate.fDateOnly = oDateComp.fDateOnly = true;
				oDateComp.nMonth = oDateComp.nDate = 0;
				nDays = (oDate.getUTCDate() - oDateComp.getUTCDate()) / 86400000;
				nLeftDays = (oDate.isLeapYear()? 366: 365) - nDays;
			}
			var sFormat = nLeftDays==0? this._msgs["L_CAL_LAST_DAY"]: nLeftDays==1? this._msgs["L_CAL_LEFT_DAY"]: this._msgs["L_CAL_LEFT_DAYS"];
			var sText = dwa.common.utils.formatMessage(sFormat, nDays, nLeftDays);
		}
		return sText;
	},
	updateFooter: function(sType){
		if (this.fHideFooter)
			return;
	
		if (sType)
			this.sFooterType = sType;
	
		var oDiv = dojo.doc.getElementById(this.sId + '-footer');
		if (oDiv) {
			var sText = this.generateFooterText(this.sFooterType);
			if (sText && oDiv.innerHTML != sText)
				this.setInnerHtml(oDiv, sText);
		}
	},
	updateCalendarEntries: function(){
		// calendar data is not retrived yet
		if (!this.oCalViewStart)
			return;
		// no calendar entries in year view
		if (this.sType == 'Y')
			return;
	
		var oDate = this.oCalViewStart.clone();
		oDate.fDateOnly = false;
		oDate.nHours = oDate.nSeconds = oDate.nMilliseconds = 0;
		var nDaysInRow = (this.fSummarize? this.nDays: this.sType=='2' || this.sType == 'M'? 7: this.nDays);
		var nRowsInMonth = (this.fSummarize? 1: this.sType=='M'? 6: (this.sType=='2'? 2:1));
		var sLastDate = '';
		var nTop = 0;
		var nIndex = 0;
		// calculate max height for summary view
		if (this.fSummarize) {
			var tmpDate = this.oCalViewStart.clone();
			tmpDate.fDateOnly = true;
			var tmpTop = 0;
			var sDate = '';
			this.anTop = [];
			for (var i=0; i<this.nDays; i++) {
				var aoEvents = this.oCalendarDataStore.getEventsByDate(tmpDate);
				this.anTop[i] = tmpTop;
				for (var n=0; n<aoEvents.length; n++) {
					var oEvent = aoEvents[n];
					if (oEvent.bHide)
						continue;
					if (sDate != tmpDate.getISO8601String() && this.sType != 'D') {
						sDate = tmpDate.getISO8601String();
						tmpTop += this.nTextHeight;
					}
					if (this.bCollapse[tmpDate.getISO8601String()])
						continue;
					if (!this.fRoundCouner)
						oEvent.nTextHeight = Math.min(160, this.getTextHeight('s-cv-summary s-cv-text', true, oEvent.sSummarizedCalendarEntryHtml, {width:(this.nViewAreaWidth - this.nScrollBarWidth) + 'px'}));
					tmpTop += oEvent.nTextHeight;
				}
				tmpDate.adjustDays(0, 0, 1);
			}
			this.anTop[i] = tmpTop;
	
			this.bNeedHScroll = this.nViewAreaWidth < 200;
			this.bNeedVScroll = (this.nViewAreaHeight - (this.bNeedHScroll? this.nScrollBarWidth: 0)) < tmpTop;
			this.nActualCalendarHeight = tmpTop + this.nNavHeight;
	
			this.setStyle('-summary', {
				width: (this.nViewAreaWidth + (this.bNeedHScroll && !this.bNeedVScroll? this.nScrollBarWidth: 0))+ 'px',
				height: (this.nViewAreaHeight + (!this.bNeedHScroll && this.bNeedVScroll? this.nScrollBarWidth: 0)) + 'px',
				overflow: !(this.bNeedHScroll || this.bNeedVScroll)? 'hidden':'scroll'
			});
		}
	
		var nCurrentAlldayEventsInWeek = this.nAlldayEventsInWeek;
		this.nAlldayEventsInWeek = 0;
		var oDate = this.oCalViewStart.clone();
		oDate.fDateOnly = true;
		var oSelectedEntryElem = dojo.doc.getElementById(this.sId + '-entry-selected');
		var bTimebarDisplayed = false;
		for (var j=0; j<nRowsInMonth; j++) {
			for (var i=0; i<nDaysInRow; i++) {
				if (this.sType == 'F') {
					while (this.isWeekEnd(oDate))
						oDate.adjustDays(0, 0, 1);
				}
				var aoEvents = this.oCalendarDataStore.getEventsByDate(oDate);
	
				if (!this.fSummarize && !this.bTimeSlotView) {
					var oElem = dojo.doc.getElementById(this.sId + '-grid-date' + j + '-' + i + '-innerframe');
					if (oElem) {
						var nMaxHeight = this.anHeight[j] - this.nTextHeight + 2;
						var nHeight = aoEvents.length * this.nMinCellHeight;
						var fScroll = nMaxHeight < nHeight;
						oElem.style.overflow = fScroll? 'scroll':'hidden';
						oElem.style.height = (nMaxHeight + (fScroll? this.nScrollBarWidth: 0)) + 'px';
					}
				}
	
				for (var n=0; n<aoEvents.length; n++) {
					var oEvent = aoEvents[n];
					if (oEvent.bHide)
						continue;
					if (this.fSummarize) {
						if (sLastDate != oDate.getISO8601String() && this.sType != 'D') {
							sLastDate = oDate.getISO8601String();
							this.setStyle('-date' + sLastDate, {
								top: nTop + 'px',
								height: this.nTextHeight + 'px',
								D_ALIGN_DEFAULT: '0px'
							});
							this.setStyle('-dateicon' + sLastDate, {
								backgroundPosition: '-' + (this.bCollapse[sLastDate]? 68: 81) + 'px -100px'
							});
							nTop += this.nTextHeight;
						}

						var nHeight = (this.bCollapse[oDate.getISO8601String()]? 0: oEvent.nTextHeight);
						var sTop = nTop + 'px';
						var sHeight = nHeight + 'px';
						var sLeft = '1px';
						var sWidth = ((this.nViewAreaWidth > 200? this.nViewAreaWidth: 200) - (this.bNeedVScroll? this.nScrollBarWidth: 0) - 3) + 'px';
						nTop += this.bCollapse[oDate.getISO8601String()]? 0: oEvent.nTextHeight;

						if (this.sConflictBar && oEvent.hasConflictBar) {
							var oElem = dojo.doc.getElementById(this.sId + '-entry' + nIndex + '-conflict');
							this.setStyle(oElem, {
								top: sTop,
								D_ALIGN_DEFAULT: sLeft,
								height: (nHeight - 1) + 'px'
							});
						}

						// Not processed yet
						if (oEvent.sType == 'Unprocessed')
							this.drawGradient(this.sId + '-entry' + nIndex + '-indicator');
					} else if (this.bTimeSlotView) {
						var nPadding     = this.nPadding + (this.sConflictBar? 10: 2);
						var nPaddingLeft = this.nPadding + (this.sConflictBar == 'left'? 10: 0);
						if (oEvent.bAllday) {
							var sTop = (n * this.nMinCellHeight + this.nPadding) + 'px';
							var sHeight = (this.nMinCellHeight - this.nPadding) + 'px';
							var sLeft = (this.anLeft[i] + nPaddingLeft) + 'px';
							var sWidth = (this.anWidth[i] - nPadding) + 'px';
							this.nAlldayEventsInWeek = Math.max(this.nAlldayEventsInWeek, n+1);
						} else {
							var index = (oEvent.bConflicted? oEvent.nIndexInConflicts: 0);
							var total = (oEvent.bConflicted? oEvent.nConflicts: 1);
							// Last entry shoud be expanded. (SPR MMII7GVEH8)
							var expand = (oEvent.bConflicted? oEvent.nWidthInConflicts: 1);
							// Fix problem that entry around 24:00 is not properly displayed. (SPR YQWG7DJBAR)
							var nTop = Math.min(24 * this.nCellHeight - this.nMinCellHeight,
							           Math.floor(((oEvent.oStartTime.nHours * 60 + oEvent.oStartTime.nMinutes) * this.nCellHeight) / 60));
							var nHeight = Math.max(this.nMinCellHeight,
										  Math.floor((oEvent.oEndTime.getDate().getTime() - oEvent.oStartTime.getDate().getTime()) * this.nCellHeight / 3600000));
							var sTop = (nTop + this.nPadding) + 'px';
							var sHeight = Math.min(24 * this.nCellHeight - nTop, nHeight - 3 * this.nPadding) + 'px';
							var sLeft = ((this.anLeft[i] + nPaddingLeft) + (this.anWidth[i] - nPadding)*index/total) + 'px';
							var sWidth = ((this.anWidth[i] - nPadding)*expand/total - this.nPadding) + 'px';
							
							if (this.sConflictBar && oEvent.hasConflictBar) {
								var oElem = dojo.doc.getElementById(this.sId + '-entry' + nIndex + '-conflict');
								this.setStyle(oElem, {
									top: sTop,
									D_ALIGN_DEFAULT: (this.sConflictBar == 'left'? this.anLeft[i] + 1: this.anLeft[i+1] - 9) + 'px',
									height: sHeight
								});
							}
						}
					} else {
						var sTop = n * this.nMinCellHeight + 'px';
						var sHeight = this.nMinCellHeight + 'px';
						var sLeft = '0px';
						var sWidth = (this.anWidth[i] - (fScroll? this.nScrollBarWidth:0) - 2) + 'px';
					}
					var oElem = dojo.doc.getElementById(this.sId + '-entry' + nIndex);
					if (oElem) {
						this.setStyle(oElem, {
							top: sTop,
							D_ALIGN_DEFAULT: sLeft,
							width: sWidth,
							height: sHeight,
							display: sHeight == '0px'? 'none': ''
						});
						if (oSelectedEntryElem && oSelectedEntryElem.parentNode == oElem) {
							oSelectedEntryElem.style.width = sWidth;
							this.drawGradient(oElem.sUnid +"_"+nIndex+ '-entry-selected-gradient');
	
							// adjust size of text area
							var nWidth = oSelectedEntryElem.offsetWidth? oSelectedEntryElem.offsetWidth: 20;
							var oTextArea = dojo.doc.getElementById(this.sId + '-inplaceeditarea');
							if (oTextArea) {
								var x = this.bTimeSlotView? 20: 2;
								oTextArea.style.width = (nWidth - x - 4) + 'px';
							}
							// adjust size of selected area
							if(dojo.isFF){
								this.setStyle('-entry-selected-area', {width: (nWidth - 4) + 'px'});
							}else if(dojo.isWebKit){
								this.setStyle('-entry-selected-area', {width: (nWidth - 8) + 'px'});
							}else{
								this.setStyle('-entry-selected-area', {width: (nWidth - 2) + 'px'});
							}
						}

						// Past entries
						var bPassed = this.isPassedEntry(aoEvents[n]);
						dojo.toggleClass(oElem, 's-cv-entry-past', this.isPassedEntry(oEvent));
						dojo.toggleClass(oElem, 's-cv-entry-future', !this.isPassedEntry(oEvent));
						
						if (!bPassed && n > 0 && this.isPassedEntry(aoEvents[n-1])) {
							this.setStyle('-timebar', {top:sTop, width:sWidth, display:''});
							bTimebarDisplayed = true;
						}
					}
					this.drawGradient(this.sId + '-entry' + nIndex + '-gradient');
					nIndex++;
				}
				oDate.adjustDays(0, 0, 1);
			}
		}
	
		if (!bTimebarDisplayed)
			this.setStyle('-timebar', {display:'none'});
	
		if (this.bTimeSlotView && (nCurrentAlldayEventsInWeek != this.nAlldayEventsInWeek))
			this.adjustCalendar(true /* do not update calendar entries */);
	
		if (this.fSummarize) {
			oElem = dojo.doc.getElementById(this.sId + '-loading');
			if (oElem) {
				this.setStyle(oElem, {display:this.bLoading? '': 'none'});
			}
			oElem = dojo.doc.getElementById(this.sId + '-noentry');
			if (oElem) {
				this.setStyle(oElem, {
					display: this.nEntries == 0 && !this.bLoading? '': 'none',
					height: this.nTextHeight + 'px'
				});
				if (this.nEntries == 0)
					this.setInnerHtml(oElem, dwa.common.utils.formatMessage(this._msgs["L_SIDECALENDAR_NOENTRY"], this.sDateRange));
			}
		}
	
		// move focus to handle keyboard event
		//this.focus();
	},
	isPassedEntry: function(oEvent){
		var oDate;
		if (oEvent.bAllday) {
			oDate = oEvent.oDataStartTime.clone();
			oDate.adjustDays(0,0,1);
			oDate.nHours = oDate.nMinutes = oDate.nSeconds = oDate.nMilliseconds = 0;
		} else {
			oDate = oEvent.oDataEndTime.clone();
		}
		return oDate.getDate().getTime() < (new Date()).getTime();
	},
	hoverEntry: function(ev, oElem, x, y){
		if (!oElem || !x || !y) return;
		if (this.oDragElem) return;		// return when processing drag & drop
		if (this.bDisableHover) return;

		var nIndex = oElem.getAttribute('calendar_index');
		var oEvent = this.oCalendarDataStore.getEventById(nIndex);
		if (!oEvent)	return;
	
/*		if(!dojo.isFF && !dojo.isWebKit){
_ak//moved to buildAbsoluteResourcesUrl
			// Fixed mixed contents warning in IE. IE may raise false alert if icon src doesn't start with https:// (SPR VSEN7SWRNR)
			if (oEvent.sIconParam && location.protocol != 'file:' && oEvent.sIconParam.indexOf(location.protocol) != 0) // kami (error check)
				oEvent.sIconParam = location.protocol + '//' + location.host + oEvent.sIconParam;
		}*/

		var oDiv = dojo.doc.getElementById(oElem.id + '-hover');
		if (ev.type == 'mouseover') {
			if (oDiv) return;
		} else {
			if (oDiv) oDiv.parentNode.removeChild(oDiv);
			return;
		}
	
		var oDateFormatter = new dwa.date.dateFormatter;
		var oTimeFormatter = new dwa.date.dateFormatter(D_TimeFmt_Default);
	
		var bAllday = oEvent.bAllday;
		var oRoot = dojo.doc.getElementById(this.sId);
	
		var sImg = "";
		if(oEvent.sIconParam){
			var asIconParam = oEvent.sIconParam.split(' ');
			sImg = this.generateImageHtml(asIconParam[0], asIconParam[1], asIconParam[2], asIconParam[3], asIconParam[4], (oEvent.sType ? oEvent.sType : ''))
				+ '&nbsp;';
		}
		var sChair = this.escape(this.bShowAlternateName && oEvent.sAltChair? oEvent.sAltChair: oEvent.sChair);
		sChair = lconn.core.globalization.bidiUtil.enforceTextDirection(sChair);
		var sSummary = (!bAllday? oTimeFormatter.format(oEvent.oDataStartTime) + ' - ' + oTimeFormatter.format(oEvent.oDataEndTime) + '<br>' : '')
			+ '<b unselectable="on">' + lconn.core.globalization.bidiUtil.enforceTextDirection(this.escape(oEvent.sSubject)) + '</b>' + (oEvent.sLocation? '<br>' + lconn.core.globalization.bidiUtil.enforceTextDirection(this.escape(oEvent.sLocation)): '') + (oEvent.sType == CS_ENTRY_TYPE_MEETING && sChair? '<br>' + sChair: '');
		var nWidth = Math.max(D_LITECAL_HOVER_MINWIDTH, 32 + this.getTextWidth('s-cv-entry s-cv-text ', true, sSummary));
		var nHeight = this.nCellHeight * 1.5;
	
		var oParent = dojo.doc.getElementById(this.sId + (this.fSummarize? '-summary': this.bTimeSlotView? (bAllday? '-allday': '-timeslot'): '-grid'));
		x += oParent.offsetLeft - oParent.scrollLeft;
		y += oParent.offsetTop  - oParent.scrollTop;
	
		var nLeft = x - nWidth / 2;
		var nTop = y + this.nScrollBarWidth;
		nLeft = Math.max(0, Math.min(nLeft, oRoot.clientWidth - nWidth - (this.bTimeSlotView? this.nScrollBarWidth: 0)));
		// Hover above mouse cursor at the bottom of time slot. (SPR YHAO7DGDGW)
		if (nTop > oRoot.clientHeight - nHeight - this.nTextHeight || dojo.position(oElem).y > document.documentElement.clientHeight  - nHeight - this.nTextHeight)
			nTop = y - this.nScrollBarWidth - nHeight;
		nTop = Math.max(0, nTop);

		var fRoundCouner = this.fRoundCouner || (!this.fSummarize && !this.bTimeSlotView);
		var sColorBar = fRoundCouner? '': this.sColorBar;

		var sLeft = (sColorBar == D_ALIGN_REVERSE? D_ALIGN_REVERSE: D_ALIGN_DEFAULT) + ':0px;';
		var sWidth = 'width:' + (sColorBar? '20px': '100%') + ';';
		var sBorder = !sColorBar? '':(sColorBar == D_ALIGN_REVERSE? D_BORDER_DEFAULT: D_BORDER_REVERSE) + ':1px ' + (oEvent.sBorderStyle || 'solid') + ' #A5A5A5;';
	
		var sHtml = '<div class="s-cv-entry s-cv-entry-hover"'
			// width of gradient area should be narrow in BiDi. (SPR KZHU7PFBDU)
			+ ' style="top:0px;' + D_ALIGN_DEFAULT + ':' + (this.isRTL? -1: 0) + 'px;width:100%;height:' + nHeight + 'px;' + (!fRoundCouner? 'border:1px ' + (oEvent.sBorderStyle || 'solid') + ' #A5A5A5;background-color:white;': '') + '">'
			+ '<div class="s-cv-entry" style="top:0px;' + sLeft + sWidth + 'height:100%;' + sBorder + '">'
			+ this.insertGradientHtml(oElem.id + '-hover-gradient', 's-cv-entry', oEvent.sBGColor1, oEvent.sBGColor2, fRoundCouner? oEvent.sBorderColor: void 0)
			+ '</div>';

		var sHtmlAppend = '';
		if (!sColorBar) {
			sHtmlAppend = '<div class="s-cv-entry-innerframe s-cv-text" style="' + sLeft + 'width:100%;height:100%;padding:3px;color:' + (fRoundCouner? oEvent.sFontColor: '#333333') + ';">'
				+ sImg + sSummary
				+ '</div>'
				+ '</div>';
		} else {
			var nPaddingLeft = sColorBar == D_ALIGN_REVERSE? 2: 22;
			sHtmlAppend = '<div class="s-cv-entry s-cv-text" unselectable="on" style="top:0px;' + sLeft + 'width:20px;height:20px;padding:3px;">'
				+ sImg
				+ '</div>'
				+ '<div class="s-cv-entry-innerframe s-cv-text" style="top:0px;' + D_ALIGN_DEFAULT + ':0px;width:100%;height:100%;' + D_PADDING_DEFAULT + ':' + nPaddingLeft + 'px;">'
				+ sSummary
				+ '</div>'
				+ '</div>';
		}
	
		var oDiv = dojo.doc.createElement('DIV');
		oDiv.id = oElem.id + '-hover';
		this.setStyle(oDiv, {
			position: 'absolute',
			top: nTop + 'px',
			D_ALIGN_DEFAULT: nLeft + 'px',
			width: nWidth + 'px',
			height: nHeight + 'px',
			display: 'none'
		});
		this.setInnerHtml(oDiv, sHtml + sHtmlAppend);
		oRoot.appendChild(oDiv);
		oDiv.style.display = '';
	
		// dg:  moved this code here since drawGradient sometimes throws an error on FF and oCurrentXX is not executed
		this.oCurrentEntryElem = oElem;
		this.oCurrentEntryEvent = oEvent;
	
		this.drawGradient(oElem.id + '-hover-gradient');
	},
	selectEntry: function(ev, oElems){
		if (!oElems) return;
		if(typeof oElems.length == 'undefined') {
			oElems = [oElems];
		}
		for(var i=0; i<oElems.length;i++) {
		    var oElem = oElems[i];
		    var nIndex = oElem.getAttribute('calendar_index');
	        var oEvent = this.oCalendarDataStore.getEventById(nIndex);
	        if (!oEvent)    return;
	        if(i==0){
	            this.unselectEntry();
	            
	        }

	        var oDateFormatter = new dwa.date.dateFormatter;
	        var oTimeFormatter = new dwa.date.dateFormatter(D_TimeFmt_Default);

	        var bAllday = oEvent.bAllday;

	        var sHtml = this.generateCalendarEntryHtml(oEvent, nIndex, true, oElem);
	        var oDiv = dojo.doc.createElement('DIV');
	        this.setInnerHtml(oDiv, sHtml);
	        oElem.appendChild(oDiv.firstChild);

	        this.drawGradient(oElem.getAttribute("unid") + "_"+nIndex+ '-entry-selected-gradient');
	        if(i==0) {
	        this.oSelectedEvent = oEvent;
	        this.oSelectedElem = dojo.doc.getElementById(this.sId + '-entry-selected');

	        // move focus
	        this.focus();

	        this.selectEntryAction([this.oSelectedEvent._item]);
	        }
		}
	},
	unselectEntry: function(bDiscardInPlaceEdit){
		// commit in-place-edit if needed.
		if (!bDiscardInPlaceEdit && this.commitInPlaceEdit){
		    this.commitInPlaceEdit();
		}
		var oSectecteds = dojo.query("[_selectedtag="+this.sId+"-entry-selected]");
		for(i=0; i<oSectecteds.length;i++){
		    var oSelected = oSectecteds[i];
	        if (oSelected){
	            oSelected.parentNode.removeChild(oSelected);
	        }
	    }
	        // force to clear internal objects when unselect calendar entry (SPR JYJY7JLBXM)
	        this.oSelectedEvent = null;
	        this.oSelectedElem = null;
	        var oInPlaceEdit = dojo.doc.getElementById(this.sId + '-entry-selected-inplaceedit');
	        if (oInPlaceEdit)
	            oInPlaceEdit.parentNode.removeChild(oInPlaceEdit);
	    
	        if (this.fSummarize)
	            this.setStyle('-selected-area-gradient', {display: ''});
	},
	startInPlaceEdit: function(oEvent, oElem){
		if (!this.bWaitForEdit)
			return;

		if (!oEvent) {
			alert(this._msgs["L_NO_CAL_ENTRY_SELECTED"]);
			return;
		}

		// Do not allow inline edit if it's external entry.
		if (oEvent.fExternal)
			return;

		var oTextArea = dojo.doc.getElementById(this.sId + '-inplaceeditarea');
		if (oTextArea)
			return;

		var oHoverElem = dojo.doc.getElementById(this.oCurrentEntryElem.id + '-hover');
		if (oHoverElem) oHoverElem.parentNode.removeChild(oHoverElem);
		dojo.toggleClass(dojo.doc.getElementById(this.sId + '-entry-selected-summary'), "dijitHidden", true);

		var x = this.bTimeSlotView ? 20 : 2;
		var y = 0;
		var nWidth = oElem.offsetWidth - x - 4;
		var nHeight = oElem.offsetHeight - y - 4;

		sHtml = '<textarea id=' + this.sId + '-inplaceeditarea class="s-cv-textarea" style="width:100%;height:100%;overflow-y:hidden;"'
			+ this._attachEvent('blur|keydown') + '>' + oEvent.sSubject + '</textarea>';
		oDiv = dojo.doc.createElement('DIV');
		oDiv.id = this.sId + '-entry-selected-inplaceedit';
		this.setInnerHtml(oDiv, sHtml);
		this.setStyle(oDiv, {
			position: 'absolute',
			D_ALIGN_DEFAULT: x + 'px',
			top: y + 'px',
			width: nWidth + 'px',
			height: nHeight + 'px'
		});
		oElem.appendChild(oDiv);

		// move focus to handle keyboard event
		this.focus();
	},
	onActivated: function(){
		this.fActivated = true;
		
		if (this.fNeedAdjust) {
			this.adjustCalendar();
			this.fNeedAdjust = false;
		}
	},
	onDeactivated: function(){
		this.fActivated = false;
	},
	syncHScrollBar: function(oElem, asIds){
		if (!oElem || !asIds)
			return;
	
		for (var i=0; i<asIds.length; i++) {
			var oElem2 = dojo.doc.getElementById(this.sId + asIds[i]);
			if (oElem2 && oElem2.scrollLeft != oElem.scrollLeft)
				oElem2.scrollLeft = oElem.scrollLeft;
		}
	},
	handleEvent: function(ev, oElem){
		if (_isIE()) {
			// should not prevent focus after user action (SPR THIO89S6U5)
			if (ev.type != 'scroll')
				this.fPreventFocusInPortal = false;
		}

		// redirect to handleDrag()
		if (ev.type in {mousedown:void 0, mousemove:void 0, mouseup:void 0}) {
			this.handleDrag(ev, oElem);
			dojo.stopEvent(ev);
			return;
		}

		// disallow user action during D&D (SPR KREY7TE4BD)
		if (this.bInDrag) {
			dojo.stopEvent(ev);
			return;
		}

		var sTarget = oElem.id;
		var bDone = (ev.type == 'keydown');
		if(bDone) {
			this.isMouseOver = false;
		}

		var bInEntry = false, bInSelectedEntry = false, bInTextArea = false;
		var oTarget = ev.srcElement || ev.target;
		// To calculate date/time from position, use offset position of target element instead of mouse event (SPR ABRR825JMU)
		var offsetX = 0, offsetY = 0, offsetWidth = 0;

		var oMap = [ this.sId + '-allday', this.sId + '-timeslot', this.sId + '-grid', this.sId + '-header', this.sId + '-summary', this.sId + '-year' ];
		while (oTarget && oTarget.tagName != 'BODY' && dwa.common.utils.indexOf(oMap, oTarget.id) == -1) {
			// Skip static elements because they are already included in ev.layerX or ev.offsetX (SPR ABRR825JMU)
			if (_isIE() < 14) {
				while (oTarget.currentStyle && oTarget.currentStyle.position == 'static')
					oTarget = oTarget.offsetParent || oTarget.parentNode;
			} else {
				while (dojo.doc.defaultView.getComputedStyle(oTarget, '').position == 'static')
					oTarget = oTarget.offsetParent || oTarget.parentNode;
			}

			if (oTarget.id) {
				if (oTarget.id.indexOf(this.sId + '-inplaceeditarea') != -1)
					bInTextArea = true;
				else if (oTarget.id.indexOf(this.sId + '-entry-selected') != -1)
					bInSelectedEntry = true;
				else if (oTarget.id.indexOf(this.sId + '-entry') != -1)
					bInEntry = true;
			}

			offsetX += oTarget.offsetLeft - oTarget.scrollLeft;
			offsetY += oTarget.offsetTop - oTarget.scrollTop;
			offsetWidth = oTarget.offsetWidth;
			oTarget = oTarget.offsetParent || oTarget.parentNode;
		}
		var oTextArea = dojo.doc.getElementById(this.sId + '-inplaceeditarea');
		if (oTextArea)
			bInTextArea = true;
		// fixed problem that clicked position may slides by 16 pixels (width of scroll bar) in BiDi language. (SPR KZHU7PFBDU)
		if (_isIE()) {
			var x = offsetX;  y = offsetY;
			// event.offsetX is not applicable for key event.
			if(ev.type != 'keydown') {
				x += ev.offsetX,
				y += ev.offsetY;
			}
		} else {
			var x = offsetX + ev.layerX, y = offsetY + ev.layerY;
		}

		if (this.isRTL) {
			offsetX = oTarget.clientWidth - offsetX - offsetWidth;
			x = oTarget.clientWidth - x;
		}

		// Debug code to indicate position of mouse event. Is MUST be commented out in production code.
		//	if (ev.type == 'click') {
		//		var oDiv = dojo.doc.createElement('DIV');
		//		this.setInnerHtml(oDiv, '<div style="position:absolute;top:' + Math.max(0,offsetY-1) + 'px;' + D_ALIGN_DEFAULT + ':' + Math.max(0,offsetX-1) + 'px;width:3px;height:3px;border:1px solid red;overflow:hidden;">&nbsp;</div>');
		//		oTarget.appendChild(oDiv.firstChild);
		//	}

		// navigator button
		if (sTarget == this.sId + '-navigator-next' || sTarget == this.sId + '-navigator-prev' || 
		    sTarget == this.sId + '-navigator-current') {
			// nakakura
			// add ev.type == 'keydown' && ev.keyCode == 13
			if (ev.type == 'click' || ev.type == 'dblclick' || (ev.type == 'keydown' && ev.keyCode == 13)) {
				if (sTarget == this.sId + '-navigator-current'){
					// show date picker
					this.showDatepicker(ev, oElem);
				} else {
					// goto next/previous day
					this.unselectEntry();

					var nMinus = (sTarget == this.sId + '-navigator-prev'? -1: 1);
					this.monthCounter += nMinus; //bidi
					//	if (this.isRTL) nMinus *= -1;
					var nMulti = 1;
					var nDays  = (this.sType=='Y'||this.sType=='M'? 0: (this.sType=='F'? 7: this.nDays)) * nMulti * nMinus;
					var nMonths  = (this.sType=='M'? 1: 0) * nMulti * nMinus;
					var nYears  = (this.sType=='Y'? 1: 0) * nMulti * nMinus;
					this.oCalendar.adjustDays(nYears, nMonths, nDays);
					this.setDate(this.oCalendar);
					// nakakura
					if (this.bTimeSlotView)
						this.bDateSelected = true;
					var oCalViewStart = (this.sType == 'T'||this.sType == '2'? this.oCalViewStart.clone().adjustDays(nYears, nMonths, nDays): null);
					// fix regression FBUE7Q2HLL
					var fMoveMonth = this.sType == 'M';
					// fixed problem that right arrow button can't move to next day (SPR ESPR7F5QT5)
					if (!this.isInViewRange(this.oCalendar, fMoveMonth))
						this.gotoDay(this.oCalendar, oCalViewStart);
					else
						this.updateSelectedArea();
				}
			}
			// change background color
			// nakakura
			// add focus and blur
			else if (!this.fDisableHover && (ev.type == 'mouseover' || ev.type == 'mouseout' || ev.type == 'focus' || ev.type == 'blur')) {
				if (ev.type == 'mouseover' || ev.type == 'focus')
					oElem.className = oElem.className.replace('s-cv-nav-button', 's-cv-nav-button s-cv-nav-button-highlighted');
				else
					oElem.className = oElem.className.replace('s-cv-nav-button s-cv-nav-button-highlighted', 's-cv-nav-button');
			} else {
				bDone = false; // nakakura
			}
		}
		// calendar footer
		else if (sTarget == this.sId + '-footer') {
			if (ev.type == 'click' || ev.type == 'contextmenu') {
				// show footer options
//				com_ibm_dwa_io_widgetListener.prototype.oClasses['com_ibm_dwa_ui_actionShowFooterOptions'] = ['FullCalendarViewAction'];
//				com_ibm_dwa_ui_invokeAction(null, this.sId, 'com_ibm_dwa_ui_actionShowFooterOptions', {sMenuId:'e-dropdown-calendarview-footer', oEvent:ev, clientX:ev.clientX, clientY:ev.clientY});
				// cancel browser context menu
				bDone = true;
				
			} else
				// change background color
				if (!this.fDisableHover && (ev.type == 'mouseover' || ev.type == 'mouseout' || ev.type == 'focus' || ev.type == 'blur')) {
					if (ev.type == 'mouseover')
						oElem.className = oElem.className.replace('s-cv-footer', 's-cv-footer s-cv-footer-highlighted');
					else
						oElem.className = oElem.className.replace('s-cv-footer s-cv-footer-highlighted', 's-cv-footer');
				}
		}
		// IE7 hack for selected area
		else if (this.fIE7Hack && sTarget.indexOf('-selected-area') != -1 && (ev.type == 'focus' || ev.type == 'blur')) {
			this.setStyle(sTarget, {border: (ev.type == 'focus'? '1px dotted gray': 'none')});
		}
		// calendar entry
		else if (sTarget.indexOf(this.sId + '-entry') != -1) {
			// SPR #SQZO7NFAXZ: Need to allow unselectEntry() to be invoked so that in-place edit can be committed
			// // no action while editing
			// if (bInTextArea) {
			//	bDone = true; // do nothing
			// } else
			// open calendar entry
			if (ev.type == 'dblclick' || (this.fEmulateDblClick && ev.type == 'click')) {
				var oTmp = oElem;
				var sIndex = null;
				while(!(sIndex = oTmp.getAttribute('calendar_index')) && oTmp.parentNode)
					oTmp = oTmp.parentNode;
				// reset timer for in-place edit
				this.bWaitForEdit = false;
				this.unselectEntry(); // quit in-place editing
				var oEvent = this.oCalendarDataStore.getEventById(sIndex - 0);
				this.openEntryAction([oEvent._item]);
			}
			else if (ev.type == 'click') {
				if (bInTextArea) {
					bDone = true; // do nothing
				} else if (bInSelectedEntry && !this.fDisableInPlaceEdit) {
					// start in-place editing after 0.5 sec
					this.bWaitForEdit = true;
					setTimeout(dojo.hitch(this, "startInPlaceEdit", this.oSelectedEvent, this.oSelectedElem), 500);
				} else {
					// reset timer for in-place edit
					this.bWaitForEdit = false;
					if (this.fSummarize) {
						this.selectEntry(ev, oElem);
						if (this.oSelectedEvent) {
							var oDate = this.oSelectedEvent.oStartDate.clone();
							oDate.nHours = this.oCalendar.nHours;
							oDate.nMinutes = this.oCalendar.nMinutes;
							oDate.nSeconds = oDate.nMilliseconds = 0;
							this.oCalendar = oDate;
							this.setDate(this.oCalendar);
						}
					} else {
						// select calendar entry
						setTimeout(dojo.hitch(this,function(){
						var nIndex = oElem.getAttribute('calendar_index');
						var oEvent = this.oCalendarDataStore.getEventById(nIndex);
						var oDate = this.getSelectedDateTime(offsetX, offsetY, false, oEvent);	// get date
						if (oDate) {
							this.oCalendar = oDate.clone();
							this.setDate(this.oCalendar);
							this.updateSelectedArea();									// move selected area
						}
//						this.selectEntry(ev, oElem);
						var cal_nodes = dojo.query("[cal_eventid="+oEvent.sUnid+"_tag]");
	                    this.selectEntry(ev, cal_nodes);
						// move cursor to date header if all day event is selected
						if (this.oSelectedEvent.bAllday)
							this.bDateSelected = true;
						}),200);
					}
					//Update actions available for the selected entry
//					this.updateActionsForSelectedEntry(ev);
					bDone = true;
					
				}
				
			}
			// hover calendar entry
			else if (!this.fDisableHover && (ev.type == 'mouseover' || ev.type == 'mouseout')) {
				this.hoverEntry(ev, oElem, x, y);
				this.isMouseOver = true;
			}
			// right mouse click
			else if (ev.type == 'contextmenu') {
				if (bInTextArea) {
					bDone = true; // do nothing
				} else {
					// reset timer for in-place edit
					this.bWaitForEdit = false;
					// select calendar entry
					var oDate = this.getSelectedDateTime(offsetX, offsetY);	// get date
					if (oDate) {
						this.oCalendar = oDate.clone();
						this.setDate(this.oCalendar);
						this.updateSelectedArea();									// move selected area
					}
					this.selectEntry(ev, oElem);

					// hide hover
					if (this.oCurrentEntryElem) {
						var oHoverElem = dojo.doc.getElementById(this.oCurrentEntryElem.id + '-hover');
						if (oHoverElem) oHoverElem.parentNode.removeChild(oHoverElem);
					}

					// show context menu
					this.handleContextMenu(ev, this.oCalendar, [this.oSelectedEvent._item]);

					// cancel browser context menu
					bDone = true;
				}
			}
		}
		// year view
		else if (sTarget.indexOf(this.sId + '-year') != -1 || (this.bYearView && sTarget.indexOf(this.sId + '-selected-area') != -1)) {
			if (ev.type == 'click' || ev.type == 'contextmenu') {
				var sId = (ev.srcElement || ev.target).id;
				if (sId.indexOf(this.sId + '-monthbar') != -1) {
					var nMonth = parseInt(sId.slice((this.sId + '-monthbar').length)) - 1;
					var oDate = this.oCalendar.clone();
					oDate.nMonth = nMonth;
					var sType = 'M';
				} else if (sId.indexOf(this.sId + '-date') != -1) {
					var sDate = sId.slice((this.sId + '-date').length);
					var oDate = (new dwa.date.calendar).setISO8601String(sDate);
					oDate.setDate(oDate.getDate(), this.oCalendar.oZoneInfo);
					var sType = 'D';
				} else if (sId == (this.sId + '-selected-area')) {
					var oDate = (new dwa.date.calendar).setDate(this.oCalendar.getDate());
					var sType = 'D';
				}
				if (oDate) {
					this.oCalendar = oDate.clone();
					this.setDate(this.oCalendar);
				}
	
				// context menu
				if (ev.type == 'contextmenu') {
					this.handleContextMenu(ev, this.oCalendar);
					// cancel browser context menu
					bDone = true;
				} else if (sType)
					this.changeViewAction(sType);
				else
					this.focus();
			}
			// keyboard navigation
			else if (ev.type == 'keydown') {
				switch (ev.keyCode) {
					case 40:
					case 38:
						var nDays  = 7 * (ev.keyCode == 38? -1: 1);
						this.bDateSelected = true;
						this.oCalendar.adjustDays(0,0,nDays);
						break;
					case 37:
					case 39:
						var nDays  = (ev.keyCode == 37? -1: 1) * (this.isRTL? -1: 1);
						this.bDateSelected = true;
						this.oCalendar.adjustDays(0,0,nDays);
						break;
					case 33:
					case 34:
						var nYears = (ev.keyCode == 33? -1: 1);
						this.bDateSelected = true;
						this.oCalendar.adjustDays(nYears,0,0);
						break;
					case 13:
						this.changeViewAction('D');
					default:
						bDone = false;
				}
	
				switch (ev.keyCode) {
					case 40:
					case 38:
					case 37:
					case 39:
					case 33:
					case 34:
						this.setDate(this.oCalendar);
						if (!this.isInViewRange(this.oCalendar))
							this.gotoDay(this.oCalendar, oCalViewStart);
						else
							this.updateSelectedArea();
						break;
				}
			}
		}
		// timeslot
		// nakakura
		// add -allday
		else if (sTarget.indexOf(this.sId + '-summary') != -1 || sTarget.indexOf(this.sId + '-timeslot') != -1 || sTarget.indexOf(this.sId + '-grid') != -1 || sTarget.indexOf(this.sId + '-selected-area') != -1 || sTarget.indexOf(this.sId + '-allday') != -1) {
			// keyboard navigation
			if (ev.type == 'keydown') {
				switch (ev.keyCode) {
					case 40: // DOWNARROW
					case 38: // UPARROW
						if (!this.fSummarize) {
							// nakakura
							var nSelectedEventIndexInView = (this.oSelectedEvent) ? this.oSelectedEvent.nIndexInView : -1;
							this.unselectEntry();
						}
						break;
					case 37: // LEFTARROW
					case 39: // RIGHTARROW
					case 33: // PAGEUP
					case 34: // PAGEDOWN
						this.unselectEntry();
						break;
				}

				switch (ev.keyCode) {
					case 120: // F9
						// fixed problem that F9 doesn't clear cache. (SPR YHAO7CQ5EN)
						this.refreshContent();
						break;
					case 40: // DOWNARROW
					case 38: // UPARROW
						if (this.fSummarize) {
							if (this.oSelectedEvent && this.oSelectedElem) {
								var nIndex = this.oSelectedEvent.nIndexInView + (ev.keyCode == 40? 1: -1);
								var oElem = dojo.doc.getElementById(this.sId + '-entry' + nIndex);
								if (oElem) {
									var sDate = oElem.getAttribute('calendar_date');
									if (sDate == this.oSelectedEvent.oStartDate.getISO8601String()) {
										this.selectEntry(null, oElem);
									} else {
										if (ev.keyCode == 40) {
											var oDate = (new dwa.date.calendar).setISO8601String(sDate);
											oDate.setDate(oDate.getDate(), this.oCalendar.oZoneInfo);
											oDate.fDateOnly = true;
											this.oCalendar = oDate.clone();
										}
										this.unselectEntry();
									}
								} else if (ev.keyCode == 38) {
									this.unselectEntry();
								}
							} else {
								var oDate = this.oCalendar.clone();
								oDate.fDateOnly = true;
								var sDate = oDate.getISO8601String();
								var aoEvents = this.oCalendarDataStore.getEventsByDate(oDate);
								if (aoEvents && aoEvents.length) {
									if (this.bCollapse[sDate] && ev.keyCode == 40)
										var nIndex = aoEvents[aoEvents.length - 1].nIndexInView + 1;
									else
										var nIndex = aoEvents[0].nIndexInView + (ev.keyCode == 40? 0: -1);
									var oElem = dojo.doc.getElementById(this.sId + '-entry' + nIndex);
									if (oElem) {
										var sPrevDate = sDate;
										var sDate = oElem.getAttribute('calendar_date');
										var oDate = (new dwa.date.calendar).setISO8601String(sDate);
										oDate.setDate(oDate.getDate(), this.oCalendar.oZoneInfo);
										oDate.fDateOnly = true;
										this.oCalendar = oDate.clone();
										if (!this.bCollapse[sDate] && (!this.bCollapse[sPrevDate] || ev.keyCode != 40))
											this.selectEntry(null, oElem);
									}
								} else {
									var oDate = this.oCalViewStart.clone();
									oDate.fDateOnly = true;
									for (var i=0; i<this.nDays; i++) {
										var aoEvents = this.oCalendarDataStore.getEventsByDate(oDate);
										if (aoEvents && aoEvents.length) {
											this.oCalendar = oDate.clone();
											break;
										}
										oDate.adjustDays(0, 0, 1);
									}
								}
							}
						} else {
							// nakakura
							var oCalendar = this.getSelectedDateTime(x, y);
							if (oCalendar){
								this.oCalendar = oCalendar;
								this.setDate(this.oCalendar);
							}
							var oDate = this.oCalendar.clone();
							oDate.fDateOnly = true;
							var aoEvents = this.oCalendarDataStore.getEventsByDate(oDate);
							var nCurrentEntryIndexInDay = (0 <= nSelectedEventIndexInView && 0 < aoEvents.length) ? nSelectedEventIndexInView - aoEvents[0].nIndexInView : -1;
							if (this.bTimeSlotView) {
								if (ev.keyCode == 38 && ((this.oCalendar.nHours == 0 && this.oCalendar.nMinutes == 0 && (aoEvents.length == 0 || !aoEvents[0].bAllday) || nCurrentEntryIndexInDay == 0 && aoEvents[0].bAllday)
									|| nCurrentEntryIndexInDay == 0 && !aoEvents[0].bAllday && aoEvents[0].oStartTime.nHours * 60 + aoEvents[0].oStartTime.nMinutes < this.nTimeSlotDur)) {
									this.bDateSelected = true;
								} else {
									var nMinus = ev.keyCode == 38 ? -1 : 1;
									var nNextMinutes;
									var nNextEntryIndexInDay;
									// check next focus is either on the event or not
									// current focus and next focus are on the allday event
									if (aoEvents[nCurrentEntryIndexInDay] && aoEvents[nCurrentEntryIndexInDay].bAllday && aoEvents[nCurrentEntryIndexInDay + nMinus] && aoEvents[nCurrentEntryIndexInDay + nMinus].bAllday) {
										nNextEntryIndexInDay = nCurrentEntryIndexInDay + nMinus;
									} else {
										// focus is not on the entry now
										if (nCurrentEntryIndexInDay < 0)
											nNextMinutes = this.oCalendar.nHours * 60 + this.oCalendar.nMinutes + nMinus * this.nTimeSlotDur;
										// focus is on the entry now
										else if (aoEvents[nCurrentEntryIndexInDay].bAllday)
											nNextMinutes = this.getScrollTopMinutes();
										else if (ev.keyCode == 38)
											nNextMinutes = aoEvents[nCurrentEntryIndexInDay].oStartTime.nHours * 60 + (Math.floor(aoEvents[nCurrentEntryIndexInDay].oStartTime.nMinutes / this.nTimeSlotDur) - 1) * this.nTimeSlotDur;
										else
											nNextMinutes = aoEvents[nCurrentEntryIndexInDay].oEndTime.nHours * 60 + (Math.floor(aoEvents[nCurrentEntryIndexInDay].oEndTime.nMinutes / this.nTimeSlotDur) + ((aoEvents[nCurrentEntryIndexInDay].oEndTime.nMinutes % this.nTimeSlotDur == 0) ? 0 : 1)) * this.nTimeSlotDur;
	
										nNextEntryIndexInDay = this.getNextEntryIndex(aoEvents, nCurrentEntryIndexInDay, nNextMinutes, nMinus);
									}
									// set foucs to the entry
									if (0 <= nNextEntryIndexInDay) {
										var oElem = dojo.doc.getElementById(this.sId + '-entry' + aoEvents[nNextEntryIndexInDay].nIndexInView);
										this.selectEntry(ev, oElem);
									// set focus to the timeslot
									} else {
										if (nNextMinutes <= 24 * 60 - this.nTimeSlotDur) {
											var oDate = this.oCalendar.getDate();
											oDate.setHours(nNextMinutes / 60);
											oDate.setMinutes(nNextMinutes % 60);
											this.oCalendar.setDate(oDate);
										}
									}
								}
							// nakakura
							// Two Weeks and One Month
							} else {
								// set focus to the entry
								if ((ev.keyCode == 38 && 1 <= nCurrentEntryIndexInDay || ev.keyCode == 40 && nCurrentEntryIndexInDay < aoEvents.length - 1)) {
									var nNextEntryIndexInDay = nCurrentEntryIndexInDay + (ev.keyCode == 38 ? -1 : 1);
									var oElem = dojo.doc.getElementById(this.sId + '-entry' + aoEvents[nNextEntryIndexInDay].nIndexInView);
									this.selectEntry(ev, oElem);
								// set focus to date
								} else {
									this.bDateSelected = true;
									var nDays = 7 * (ev.keyCode == 38 ? -1 : 1) * (nCurrentEntryIndexInDay == 0 && ev.keyCode == 38 ? 0 : 1);
									var oDate = this.oCalendar.getDate();
									oDate.setTime(oDate.getTime() + nDays * 86400000);
									this.oCalendar.setDate(oDate);
								}
							}
						}
						break;
					case 37: // LEFTARROW
					case 39: // RIGHTARROW
						// nakakura
						this.bDateSelected = true;
					case 187: // PLUS
					case 189: // MINUS
					case 107: // PLUS_TENKEY
					case 109: // MINUS_TENKEY
					case 61: // EQUAL		// keyCode 61 returns when you press Plus key in Firefox on Mac
						if (this.fSummarize) {
							if (this.sType == 'D')
								break;
							var bCollapse = ev.keyCode == 189 || ev.keyCode == 109 || ev.keyCode == (this.isRTL? 39: 37);
							if (bCollapse)
								this.unselectEntry();
							if (ev.shiftKey) {
								if (bCollapse) {
									var oDate = this.oCalViewStart.clone();
									oDate.fDateOnly = true;
									for (; oDate.getDate().getTime() < this.oCalViewEnd.getDate().getTime(); oDate.adjustDays(0,0,1))
										this.bCollapse[oDate.getISO8601String()] = true;
								} else
									this.bCollapse = {};
							} else {
								var oDate = this.oCalendar.clone();
								oDate.fDateOnly = true;
								this.bCollapse[oDate.getISO8601String()] = bCollapse;
							}
							this.updateCalendarEntries();
						} else {
							var nMinus = (ev.keyCode == 37? -1: 1) * (this.isRTL? -1: 1);
							var nDays  = nMinus; // 1 * nMinus
							this.oCalendar.adjustDays(0,0,nDays);
							if (this.sType == 'F') {
								while (this.isWeekEnd(this.oCalendar))
									this.oCalendar.adjustDays(0,0,nDays);
							}
							var oCalViewStart = (this.sType == 'T'||this.sType == '2'? this.oCalViewStart.clone().adjustDays(0, 0, this.nDays*nMinus): null);
						}
						break;
					case 33: // PAGEUP
					case 34: // PAGEDOWN
						var nMinus = (ev.keyCode == 33? -1: 1);
						var nDays  = (this.sType=='M'||this.sType=='Y'? 0: this.sType=='F'? 7: this.nDays) * nMinus;
						var nMonths  = (this.sType=='M'? 1: 0) * nMinus;
						var nYears  = (this.sType=='Y'? 1: 0) * nMinus;
						this.oCalendar.adjustDays(nYears, nMonths, nDays);
						var oCalViewStart = (this.sType == 'T'||this.sType == '2'? this.oCalViewStart.clone().adjustDays(nYears, nMonths, nDays): null);
						// nakakura
						if (this.bTimeSlotView)
							this.bDateSelected = true;
						break;
					case 13: // ENTER
						if (this.bYearView)
							this.changeViewAction('D');
						else {
							if (this.oSelectedEvent) {
								// hit enter to open selected entry
								this.openEntryAction([this.oSelectedEvent._item]);
							} else if (this.bCanCreate)
								this.newEntryAction(this.oCalendar);
						}
						break;
					case 46: // DELETE
						this.deleteEntryAction([this.oSelectedEvent._item]);
						break;
					case 113: // F2
						// start in-place editing after 0.5 sec
						if (!this.fDisableInPlaceEdit) {
							this.bWaitForEdit = true;
							setTimeout(dojo.hitch(this, "startInPlaceEdit", this.oSelectedEvent, this.oSelectedElem), 500);
						}
						break;
					default:
						bDone = false;
				}

				switch (ev.keyCode) {
					case 40: // DOWNARROW
					case 38: // UPARROW
					case 37: // LEFTARROW
					case 39: // RIGHTARROW
					case 33: // PAGEUP
					case 34: // PAGEDOWN
					case 187: // PLUS
					case 189: // MINUS
					case 107: // PLUS_TENKEY
					case 109: // MINUS_TENKEY
					case 61: // EQUAL
						this.setDate(this.oCalendar);
						// fix regression FBUE7Q2HLL
						var fMoveMonth = this.sType == 'M' && (ev.keyCode == 33 || ev.keyCode == 34);
						if (!this.isInViewRange(this.oCalendar, fMoveMonth))
							this.gotoDay(this.oCalendar, oCalViewStart);
						else {
							this.updateSelectedArea();
						}
						if(!this.oSelectedElem)
							this.focus();
						break;
				}
			}

			// click on timeslot/right mouse click
			else if (ev.type == 'click' || ev.type == 'dblclick' || ev.type == 'contextmenu') {
				if (!bInSelectedEntry && !bInEntry) {
					this.unselectEntry();
					var oCalendar = this.getSelectedDateTime(x, y);
					if (oCalendar){
						this.oCalendar = oCalendar;
						this.setDate(this.oCalendar);
						this.bDateSelected = false;
						
						this.updateSelectedArea();									// move selected area
						
						this.focus();
					}
					if (ev.type == 'dblclick' && oCalendar) {
						if (this.bCanCreate)
							this.newEntryAction(this.oCalendar);
					} else if (ev.type == 'contextmenu') {
						this.handleContextMenu(ev, this.oCalendar);
						// cancel browser context menu
						bDone = true;
					}
				}
			} else if( ev.type == 'focus' && this.sType=='M'){
				if (!this.isMouseOver && !bInSelectedEntry && !bInEntry) {
					this.unselectEntry();
					oCalendar = this.getSelectedDateTime(offsetX, offsetY);
					this.oCalendar = oCalendar;
					this.setDate(this.oCalendar);
					this.bDateSelected = false;
					this.updateSelectedArea();	
					this.focus();
					this.updateFooter();
					
				}
			}
			// scroll on timeslot
			else if (ev.type == 'scroll') {
				this.syncHScrollBar(oElem, ['-header', '-allday', '-navigator']);
				
				// Label of AM/PM follows vertical scroll bar in timeslot (SPR VSEN7X95AQ)
				if (!this.f24Hour && !this.fUseAddTimeZone && this.bTimeSlotView) {
					var i = Math.ceil(oElem.scrollTop / this.nCellHeight);
					if (i != this.nTimeSlotTopHour) {
						var oTimeFormatter = new dwa.date.dateFormatter(this.sTimeFmtTimeSlot);
						var oDate = this.oCalendar.clone();
						oDate.nMinutes = oDate.nSeconds = oDate.nMilliseconds = 0;
						// Remove AM/PM from the previous row
						if (this.nTimeSlotTopHour != 0 && this.nTimeSlotTopHour != 12) {
							oDate.nHours = this.nTimeSlotTopHour;
							var oElem = dojo.doc.getElementById(this.sId + '-timeslot-time' + this.nTimeSlotTopHour);
							if (oElem)
								this.setInnerHtml(oElem, oTimeFormatter.format(oDate));
						}
						
						// Add AM/PM in the top vidible row
						if (i != 0 && i != 12) {
							oDate.nHours = i;
							var oElem = dojo.doc.getElementById(this.sId + '-timeslot-time' + i);
							if (oElem)
								this.setInnerHtml(oElem, oTimeFormatter.format(oDate) + '<br>' + (i<12? this._msgs["L_AM_SUFFIX"]: '') + (i>=12? this._msgs["L_PM_SUFFIX"]: ''));
						}
						this.nTimeSlotTopHour = i;
					}
				}
			}
		}
		// in-place edit field
		else if (sTarget.indexOf(this.sId + '-inplaceeditarea') != -1) {
			// SPR #SQZO7NFAXZ: Unnecessary to handle blur events since committing in-place edit can be done elsewhere
			if (ev.type == 'keydown' && ev.keyCode == 13 && !ev.shiftKey) {
				this.unselectEntry();
			} else if (ev.type == 'keydown') {
				if (ev.keyCode == 27)
				  this.unselectEntry(true);
				else {
					// suppressing DWA's keyboard shortcuts (delete, arrow keys etc.) while editing
					bDone = false;
					dojo.stopEvent(ev);
				}
			}
		}
		// handle click on date header (SPR BCOE7F3SJY)
		else if (sTarget.indexOf(this.sId + '-header') != -1) {
			if (ev.type == 'click') {
				this.unselectEntry();						
				var oDate = this.getSelectedDateTime(offsetX, offsetY);
				if (oDate) {
					oDate.nHours = this.oCalendar.nHours;
					oDate.nMinutes = this.oCalendar.nMinutes;
					oDate.nSeconds = this.oCalendar.nSeconds;
					oDate.nMilliseconds = this.oCalendar.nMilliseconds;
					this.oCalendar = oDate.clone();
					this.setDate(this.oCalendar);
					this.bDateSelected = true;
					this.updateSelectedArea();									// move selected area
				}
			} else if (ev.type == 'keydown') {
				switch (ev.keyCode) {
					case 40: // DOWNARROW
					case 37: // LEFTARROW
					case 39: // RIGHTARROW
					case 33: // PAGEUP
					case 34: // PAGEDOWN
						this.unselectEntry();
						break;
				}

				switch (ev.keyCode) {
					case 120: // F9
						// fixed problem that F9 doesn't clear cache. (SPR YHAO7CQ5EN)
						this.refreshContent();
						break;
					case 40: // DOWNARROW
						this.bDateSelected = false;
						// nakakura
						var oDate = this.oCalendar.clone();
						oDate.fDateOnly = true;
						var aoEvents = this.oCalendarDataStore.getEventsByDate(oDate);
						if (0 < aoEvents.length && aoEvents[0].bAllday) {
							var oElem = dojo.doc.getElementById(this.sId + '-entry' + aoEvents[0].nIndexInView);
							this.selectEntry(ev, oElem);
						} else {
							var nNextMinutes = this.getScrollTopMinutes();
							var nNextEntryIndexInDay = this.getNextEntryIndex(aoEvents, -1, nNextMinutes, 1);
							// set focus to the entry
							if (0 <= nNextEntryIndexInDay) {
								var oElem = dojo.doc.getElementById(this.sId + '-entry' + aoEvents[nNextEntryIndexInDay].nIndexInView);
								this.selectEntry(ev, oElem);
							// set focus to the timeslot
							} else {
								this.oCalendar.nHours = Math.floor(nNextMinutes / 60);
								this.oCalendar.nMinutes = nNextMinutes % 60;
							}
						}
						break;
					case 37: // LEFTARROW
					case 39: // RIGHTARROW
						var nMinus = (ev.keyCode == 37? -1: 1) * (this.isRTL? -1: 1);
						var nDays  = nMinus; // 1 * nMinus
						this.oCalendar.adjustDays(0,0,nDays);
						if (this.sType == 'F') {
							while (this.isWeekEnd(this.oCalendar))
								this.oCalendar.adjustDays(0,0,nDays);
						}
						var oCalViewStart = (this.sType == 'T'||this.sType == '2'? this.oCalViewStart.clone().adjustDays(0, 0, this.nDays*nMinus): null);
						break;
					case 33: // PAGEUP
					case 34: // PAGEDOWN
						var nMinus = (ev.keyCode == 33? -1: 1);
						var nDays  = (this.sType=='M'? 0: (this.sType=='F'? 7: this.nDays)) * nMinus;
						var nMonths  = (this.sType=='M'? 1: 0) * nMinus;
						var nYears  = (this.sType=='Y'? 1: 0) * nMinus;
						this.oCalendar.adjustDays(nYears, nMonths, nDays);
						var oCalViewStart = (this.sType == 'T'||this.sType == '2'? this.oCalViewStart.clone().adjustDays(nYears, nMonths, nDays): null);
						break;
					case 13: // ENTER
						this.newEntryAction(this.oCalendar);
						break;
					default:
						bDone = false;
				}

				switch (ev.keyCode) {
					case 40: // DOWNARROW
					case 37: // LEFTARROW
					case 39: // RIGHTARROW
					case 33: // PAGEUP
					case 34: // PAGEDOWN
						this.setDate(this.oCalendar);
						if (!this.isInViewRange(this.oCalendar))
							this.gotoDay(this.oCalendar, oCalViewStart);
						else {
							this.updateSelectedArea();
							this.focus();
						}
						break;
				}
			}
			// scroll on header
			else if (ev.type == 'scroll') {
				this.syncHScrollBar(oElem, ['-allday', '-timeslot']);
			}
		}
		// mouse events in summary view
		else if (sTarget.indexOf(this.sId + '-summary') != -1) {
			if (ev.type == 'click') {
				this.unselectEntry();
			// scroll on timeslot
			} else if (ev.type == 'scroll') {
				this.syncHScrollBar(oElem, ['-navigator']);
			}
		}
		// expand/collapse category in summary view
		else if (this.fSummarize && sTarget.indexOf(this.sId + '-date') != -1) {
			var oTextArea = dojo.doc.getElementById(this.sId + '-inplaceeditarea');
			this.unselectEntry();

			// SPR #SQZO7NFAXZ: No expand/collapse when in-place edit has been committed, as Notes client does
			if (!oTextArea) {
				var sDate = oElem.getAttribute('calendar_date');
				this.bCollapse[sDate] = this.bCollapse[sDate]? false: true;
				this.updateCalendarEntries();

				var oDate = (new dwa.date.calendar).setISO8601String(sDate);
				oDate.nHours = this.oCalendar.nHours;
				oDate.nMinutes = this.oCalendar.nMinutes;
				oDate.nSeconds = this.oCalendar.nSeconds;
				oDate.nMilliseconds = this.oCalendar.nMilliseconds;
				this.oCalendar = oDate.clone();
				this.setDate(this.oCalendar);
				this.bDateSelected = true;
				this.updateSelectedArea();
			}
		}
		if (bDone) {
			dojo.stopEvent(ev);
		}
	},
	// nakakura
	getNextEntryIndex: function(aoTodayEvents, nCurrentEntryIndexInDay, nNextMinutes, nMinus) {
		// current focus is on the entry
		if (0 <= nCurrentEntryIndexInDay) {
			if (aoTodayEvents[nCurrentEntryIndexInDay + nMinus] && !aoTodayEvents[nCurrentEntryIndexInDay + nMinus].bAllday) {
				var nBaseMinutes = (nMinus == -1) ? aoTodayEvents[nCurrentEntryIndexInDay - 1].oEndTime.nHours * 60 + aoTodayEvents[nCurrentEntryIndexInDay - 1].oEndTime.nMinutes
					: aoTodayEvents[nCurrentEntryIndexInDay + 1].oStartTime.nHours * 60 + aoTodayEvents[nCurrentEntryIndexInDay + 1].oStartTime.nMinutes;
				if (nMinus == -1 && nNextMinutes < nBaseMinutes ||
					nMinus == 1 && nBaseMinutes < nNextMinutes + this.nTimeSlotDur && (aoTodayEvents[nCurrentEntryIndexInDay].bAllday && nNextMinutes <= nBaseMinutes ||
					!aoTodayEvents[nCurrentEntryIndexInDay].bAllday))
					return nCurrentEntryIndexInDay + nMinus;
			// last entry in the day
			} else if (nCurrentEntryIndexInDay == aoTodayEvents.length - 1 && 24 * 60 - this.nTimeSlotDur < nNextMinutes && nMinus == 1) {
				return nCurrentEntryIndexInDay;
			// go to allday event
			} else if (aoTodayEvents[nCurrentEntryIndexInDay + nMinus] && aoTodayEvents[nCurrentEntryIndexInDay + nMinus].bAllday
					&& !aoTodayEvents[nCurrentEntryIndexInDay].bAllday && aoTodayEvents[nCurrentEntryIndexInDay].oStartTime.nHours * 60 + aoTodayEvents[nCurrentEntryIndexInDay].oStartTime.nMinutes < this.nTimeSlotDur) {
				return  nCurrentEntryIndexInDay + nMinus;
			}
		// current focus is not on the entry
		} else {
			for (var i = 0; i < aoTodayEvents.length; i++) {
				var nBaseMinutes = (nMinus == -1) ? aoTodayEvents[aoTodayEvents.length - i - 1].oEndTime.nHours * 60 + aoTodayEvents[aoTodayEvents.length - i - 1].oEndTime.nMinutes
					: aoTodayEvents[i].oStartTime.nHours * 60 + aoTodayEvents[i].oStartTime.nMinutes;
				if (nMinus == -1 && nBaseMinutes <= nNextMinutes + this.nTimeSlotDur && nNextMinutes < nBaseMinutes
					|| nMinus == 1 && nBaseMinutes < nNextMinutes + this.nTimeSlotDur && nNextMinutes <= nBaseMinutes) {
					if (nMinus == -1 && aoTodayEvents[aoTodayEvents.length - i - 1].bConflicted) {
						for (var j in aoTodayEvents[aoTodayEvents.length - i - 1].anConflicts)
							if (aoTodayEvents[j].nIndexInConflicts == aoTodayEvents[aoTodayEvents.length - i - 1].nConflicts - 1)
								return j;
					} else {
						return (nMinus == -1) ? aoTodayEvents.length - i - 1 : i;
					}
				}
			}
		}
		return -1;
	},
	_attachEvent: function(sEvents){
		var asEvents = sEvents.split('|');
		var asHtml = [];
		for (var i=0; i<asEvents.length; i++)
			asHtml.push(' on' + asEvents[i] + '="dwa.cv.calendarView.prototype.cvHandler(event,this,\''+this.id+'\');"');
		return asHtml.join('');
	},
	observe: function(oProperty){
		if (!this.sType)
			return;
		if (!oProperty.isLatest())
			return;
	
		if (oProperty.sName == 'p-contentarea-width' || oProperty.sName == 'p-body-height') {
			// adjust calendar size immediately if calendar widget is activated
			if (this.fActivated)
				this.adjustCalendar();
			else
				this.fNeedAdjust = true;
		}else if (oProperty.sName == 'p-e-calendarview-currentselected'){ // kami (moved from calendarController)
			if (oProperty.vValue != oProperty.vPrevValue) {
				var oCalendar = (new dwa.date.calendar).setISO8601String(oProperty.vValue);
				oCalendar.setDate(oCalendar.getDate(), this.oCalendar.oZoneInfo);
				oCalendar.fDateOnly = true;
				if (!oCalendar.equals(this.oCalendar)){
 					var dateType = this.getDateType();
					if(dateType != cfg.GREGORIAN){
						this.monthCounter += this.getDatesDifference(dateType, this.convertDate(oCalendar ,dateType), this.convertDate(this.oCalendar ,dateType), 'month');
					}
					this.oCalendar.nYear = oCalendar.nYear;
					this.oCalendar.nMonth = oCalendar.nMonth;
					this.oCalendar.nDate = oCalendar.nDate;
					this.oCalendar.setDate(this.oCalendar.getDate(), this.oCalendar.oZoneInfo);
					this.gotoDay(this.oCalendar);
				}
			}
		}
		else if (oProperty.sName == 'p-e-calendarview-show-summarize') {
			this.drawCalendar(this.sType, oProperty.vValue);
			this.onActivated();
		}
		else if (oProperty.sName == 'p-e-calendarview-show-footer') {
			this.fHideFooter = !oProperty.vValue;
			this.adjustCalendar();
		}
		else if (oProperty.sName == 'p-e-calendarview-footer-type') {
			this.updateFooter(oProperty.vValue);
		}
	},
	handleDrag: function(ev, oRootElem){
		if (dojo.isWebKit) {
			// In Mac, contextmenu event is fired after mousedown and before mouseup.
			// Then bInDrag is true when contextmenu event occurs and it avoids the context menu to show. (See handleEvent)
			// So do not do the drag operation if the event is occuring along with contextmenu event. (SPR #WLWL8D9EJU)
			if (this.isMac && (ev.ctrlKey || ev.button == 2))
				return;
		}

		if (!this.bInDrag && ev.type != 'mousedown')
			return;

		if (!this.oCurrentEntryElem)
			return;

		// Make sure that unauthorized user can't start drag&drop (SPR SDOY6Z8D73)
		if (this.oCurrentEntryEvent.fExternal || this.oCurrentEntryEvent.fDisableDragDropAndInPlace || (this.oCurrentEntryEvent.bAllday && this.sType == 'D'))
			return;

		// Calc current position
		if (_isIE())
			var x = ev.offsetX, y = ev.offsetY;
		else
			var x = ev.layerX, y = ev.layerY;

		var oTarget = ev.srcElement || ev.target;
		var bInEntry = false;
		while (oTarget && oTarget != oRootElem) {
			x += oTarget.offsetLeft;
			y += oTarget.offsetTop;
			if (oTarget.id && oTarget.id.indexOf(this.sId + '-entry') != -1)
				bInEntry = true;
			oTarget = oTarget.offsetParent? oTarget.offsetParent: oTarget.parentNode;
		}
		if (this.isRTL)
			x = oRootElem.offsetWidth - x;
		// do not continue if unexpected error occurs (SPR KREY7TE4BD)
		if (isNaN(x) || isNaN(y))
			return;

		switch (ev.type) {
		case 'mousedown':
			//FF in SUSE handles this function for body before handleEvent for the event cell.
			// handler code is cancelled since bInDrag is turned on for such case.
			//thus, need to verify which button is pushed here.
			// ev.button seems always take 2 as the value for right button among the browsers as long as I see.(FF3.*, IE7, Safari) _ak
			if(ev.button && ev.button == 2)
				break;

			// prevent event out of calendar entry
			if (!bInEntry)
				break;

			this.bInDrag = true;
			this.oDragStartPos = {x:x, y:y};
			break;

		case 'mousemove':
			this.bInDrag = true;
			if (Math.abs(x - this.oDragStartPos.x) < 8 && Math.abs(y - this.oDragStartPos.y) < 8)
				break;

			// create dragging DIV element if not exist
			if (!this.oDragElem) {
				if (this.oCurrentEntryEvent != this.oSelectedEvent)
					this.unselectEntry();

				// remove hover
				var oHoverElem = dojo.doc.getElementById(this.oCurrentEntryElem.id + '-hover');
				if (oHoverElem)
					oHoverElem.parentNode.removeChild(oHoverElem);

				// create dragging DIV element
				this.oDragElem = oRootElem.appendChild(dojo.doc.createElement('DIV'));
				this.oDragElem.id = this.sId + '-entry-drag';
				this.setInnerHtml(this.oDragElem, this.generateCalendarEntryHtml(this.oCurrentEntryEvent, this.oCurrentEntryEvent.nIndexInView, true, this.oCurrentEntryElem, true));
				this.setStyle(this.oDragElem, {
					position: 'absolute',
					D_ALIGN_DEFAULT: x + 'px',
					top: y + 'px',
					width:  this.oCurrentEntryElem.offsetWidth + 'px',
					height: this.oCurrentEntryElem.offsetHeight + 'px'
				});
				if (_isIE())
					this.oDragElem.style.filter = 'alpha(opacity=50)';
				else
					this.oDragElem.style.opacity = '0.5';
				
				if (!_isIE())
					this.drawGradient(this.sId + '-entry-drag-gradient');

				// hide DIV element for the calendar entry while dragging
				this.oCurrentEntryElem.style.visibility = 'hidden';
			}

			// calc date time
			this.getSelectedDateTime(x, y, true, this.oCurrentEntryEvent, this.oDragElem);
			break;

		case 'mouseup':
			// remove dragging DIV element
			if (this.oDragElem) {
				this.oDragElem.parentNode.removeChild(this.oDragElem);
				this.oDragElem = null;
				this.oCurrentEntryElem.style.visibility = '';
			}

			this.bInDrag = false;
			if (Math.abs(x - this.oDragStartPos.x) < 8 && Math.abs(y - this.oDragStartPos.y) < 8)
				break;

			// calc date time
			var oCalendar = this.getSelectedDateTime(x, y, true, this.oCurrentEntryEvent);

			// reschedule calendar entry
			if (oCalendar) {
				if (this.oCurrentEntryEvent.bAllday) {
					oCalendar.fDateOnly = true;
				}
				else if (!this.bTimeSlotView) {
					oCalendar.nHours = this.oCurrentEntryEvent.oStartTime.nHours;
					oCalendar.nMinutes = this.oCurrentEntryEvent.oStartTime.nMinutes;
					oCalendar.nSeconds = this.oCurrentEntryEvent.oStartTime.nSeconds;
					oCalendar.nMilliseconds = this.oCurrentEntryEvent.oStartTime.nMilliseconds;
				}

				if (this.oCurrentEntryEvent.oStartTime.equals(oCalendar)) {
					this.selectEntry(void 0, this.oCurrentEntryElem);
				} else {
					this.rescheduleEntryAction(this.oCurrentEntryElem, oCalendar);
				}
			}

			break;
		}
	},
	showDatepicker: function(ev, oElem){
		if(this.fUseCalendarLite && !dwa.cv.showCalendarLite || !this.fUseCalendarLite && !dwa.cv.showDatepicker) {
			net.jazz.ajax.xdloader.load_async( this.fUseCalendarLite ? "dwa.cv.showCalendarLite" : "dwa.cv.showDatepicker" , dojo.hitch(this, function(){
				dojo.addOnLoad(dojo.hitch(this, function(){
					var showDatepicker = this.fUseCalendarLite ? dwa.cv.showCalendarLite : dwa.cv.showDatepicker;
					showDatepicker(this, oElem, true, "selectedDate", this.nFirstDayWeek);
				}));
				})
			);
		} else {
			var showDatepicker = this.fUseCalendarLite ? dwa.cv.showCalendarLite : dwa.cv.showDatepicker;
			showDatepicker(this, oElem, true, "selectedDate", this.nFirstDayWeek);
		}
		dojo.stopEvent(ev);
	},
	setStatus: function(sStatus){
		if (this.sStatus != sStatus) {
			var fNeedToAdjust = (this.sStatus!='' && sStatus=='') || (this.sStatus=='' && sStatus!='');
			var oElem = dojo.doc.getElementById(this.sId + '-status');
			this.sStatus = sStatus;
			if (oElem) {
				this.setInnerHtml(oElem, this.sStatus);
				if (fNeedToAdjust) {
					dojo.toggleClass(oElem, 'dijitHidden', this.sStatus=='');
					this.adjustCalendar(true /* no need to update calendar entries */);
				}
			}
		}
	},
	resetStatus: function(){
		this.setStatus('');
	},
	handleContextMenu: function(ev, oCalendar, items){
		/*
		var sMenuId = 'e-dropdown-rightmouse-calendarview';
		this.oDropdownManager = this.oDropdownManager ? this.oDropdownManager : dwa.common.dropdownManager.get('root');
		if (!this.oDropdownManager.oHtml[sMenuId])
			this.oDropdownManager.oHtml[sMenuId]
			 = '<div id="' + sMenuId + '" class="s-popup" com_ibm_dwa_ui_widget_class="com_ibm_dwa_ui_dropdownMenu"></div>';
	
		this.oDropdownManager.nContainerWidth = this.oDropdownManager.nContainerHeight = 0;
		this.oDropdownManager.oPos = new com_ibm_dwa_misc_pos((!this.isRTL? ev.clientX: dojo.doc.body.clientWidth - ev.clientX), ev.clientY);
		this.oDropdownManager.fOppositeEdge = this.oDropdownManager.fCenter = false;
	
		// Call both hide() and show() in order to update the position of drop down box
		this.oDropdownManager.hide(ev);
		this.oDropdownManager.show(ev, sMenuId);
		
	
		//Update actions available for the selected entry
		*/
	},
	getSelectedData: function(sType){
		 if (!sType || sType.toLowerCase() == 'unid') {	// unid of selected calendar entry
			var asUnids = [];
			if (this.oSelectedEvent && this.oSelectedEvent.sUnid)
				asUnids.push(this.oSelectedEvent.sUnid);
			return asUnids;
		} else if (sType.toLowerCase() == 'datetime') {	// selected date time
			var sStartDate = '';
			if (this.oSelectedEvent && this.oSelectedEvent.oStartDate) {
				var oDate = this.oSelectedEvent.oStartDate;
				var oZoneInfo = dwa.date.zoneInfo.prototype.oUTC;
			} else if (!this.bTimeSlotView || this.bDateSelected) {
				var oNewDate = new Date();
				oNewDate.setTime(oNewDate.getTime() + 60000 * (oNewDate.getMinutes() % this.nTimeSlotDur? this.nTimeSlotDur - (oNewDate.getMinutes() % this.nTimeSlotDur): 0));
				var oDate = (new dwa.date.calendar).setDate(oNewDate);
				// fix problem can't create new entry in selected date in two weeks/one month view. (SPR NYWU7FQEFU)
				oDate.nYear = this.oCalendar.nYear;
				oDate.nMonth = this.oCalendar.nMonth;
				oDate.nDate = this.oCalendar.nDate;
				oDate.nDay = this.oCalendar.nDay;
				// fixed problem that new calendar entry created in two weeks/one month view has non zero seconds and mili seconds. (SPR NYWU7FY6N5)
				oDate.nSeconds = oDate.nMilliseconds = 0;
				var oZoneInfo = null;
			} else if (this.oCalendar) {
				var oDate = this.oCalendar;
				var oZoneInfo = dwa.date.zoneInfo.prototype.oUTC;
			}
			if (oDate)
				sStartDate = new dwa.common.notesValue(oDate.getDate(), oZoneInfo).toString().replace(',00', '');
			return sStartDate;
		}
	},
	isInViewRange: function(oCalendar, fMoveMonth){
		var oStart = this.oCalViewStart.clone();
		var oEnd = this.oCalViewEnd.clone();
		// fix regression FBUE7Q2HLL
		if (this.sType == 'M' && fMoveMonth) {
			if (oStart.nDate > 20)
				oStart.adjustDays(0, 1, 1 - oStart.nDate);
			if (oEnd.nDate < 10)
				oEnd.adjustDays(0, 0, -oEnd.nDate);
		}
		return (oCalendar.compare(oStart) >= 0 && oEnd.compare(oCalendar) > 0);
	},

	isWeekEnd: function(oDay){
		var nDay = typeof(oDay) == 'number'? oDay: oDay.nDay;
		if (this.oWeekEnd)
			return this.oWeekEnd[nDay];
		else {
			if(this.sType == 'W' || this.sType == 'M') {
				return false;
			}
			
			// keep backward compatibility
			var nFirstDay = this.sType == 'F'? this.nFirstDayFiveDay:
							this.sType == 'W' || this.sType == '2'? this.nFirstDayWeek:
							this.nFirstDayMonth;
			nDay = (nDay + 7 - nFirstDay) % 7;
			return nDay >= 5;
		}
	},
	
	isToday: function(oDay) {
		var oToday = (new dwa.date.calendar).setDate(new Date(), oDay.oZoneInfo);
		oToday.fDateOnly = true;
		return oToday.equals(oDay);
	},

	cvHandler: function(event, _this, widgetId){
		var widget = dijit.byId(widgetId);
		widget.handleEvent(event,_this);
	},

	buildResourcesUrl: function(path){
		return dojo.moduleUrl("dwa.common", "images/" + path);
	},

	buildAbsoluteResourcesUrl: function(path){
		var sUrl = dojo.moduleUrl("dwa.common", "images/" + path);
		if('file' == location.protocol || /^.+:\/\//.test(sUrl)){
			return sUrl;
		}else if(0 == sUrl.indexOf('/')){
			return location.protocol + '//' + location.host + sUrl;
		}else{
			var aTmp = location.href.split('/');
			aTmp.splice(aTmp.length - 1, 1, sUrl);
			return aTmp.join('/');
		}
	},

	saveComplete: function(){
		this.clearCalendarEntries();
		this.drawCalendarEntries();
	},

	findStore: function(item){
		for(var i = 0; i < this._stores.length; i++){
			var store = this._stores[i];
			if(store.isItem(item)){
				return store;
			}
		}
	},

	findActions: function(item){
		var store = this.findStore(item);
		for(var i = 0; i < this._actionsObjs.length; i++){
			var actions = this._actionsObjs[i];
			if(actions.storeRef == store){
				return actions;
			}
		}
	},

	saveSubjectAction: function(item, subject){
		var _this = this;
		this.store.setValue(item, "subject", subject);
		this.store.save({
			scope: _this,
			onComplete: _this.saveComplete
		});
	},

	newEntryAction: function(oCalendar){
		if(this._actionsObjs.length == 1){
			this._actionsObjs[0].newEntryAction(oCalendar);
		}
	},

	openEntryAction: function(items){
		var actions = this.findActions(items[0]);
		if(actions){
			actions.openEntryAction(items);
		}
	},

	selectEntryAction: function(items){
		var actions = this.findActions(items[0]);
		if(actions){
			actions.selectEntryAction(items);
		}
	},

	deleteEntryAction: function(items){
		var actions = this.findActions(items[0]);
		if(actions){
			actions.deleteEntryAction(items);
		}
	},

	rescheduleEntryAction: function(item, oCalendar){
		var actions = this.findActions(item);
		if(actions){
			actions.rescheduleEntryAction(item, oCalendar);
		}
	},

	changeViewAction: function(type){
		// Stub function to connect to from your application
	},

	enableStore: function(store, fEnabled){
		this.oCalendarDataStore.enableDataLoader(store, fEnabled);
	},

	_setTypeAttr: function(/*String*/sType){
		if(this._started && this.sType !== sType){
			this.drawCalendar(sType, this.fSummarize);
		}else{
			this.type = sType;
		}
	},

	_setSummarizeAttr: function(/*Boolean*/fSummarize){
		if(this._started && this.fSummarize !== fSummarize){
			this.drawCalendar(this.sType, fSummarize);
		}else{
			this.fSummarize = this.summarize = fSummarize;
		}
	},

	_setSelectedDateAttr: function(/*Date*/oDate){
		var oCalendar = new dwa.date.calendar();
		oCalendar.setDate(oDate);
		this.setDate(oCalendar);
	},

	 _getSelectedDateAttr: function(){
		return this.getDate().getDate();
	},

	_setLoadingAttr: function(/* Boolean */ value){
		//this._set("loading", value);
		this.loading = value;
	}
});

dwa.cv.calendarView.prototype.refreshContent = dwa.cv.calendarView.prototype.load; // alias
