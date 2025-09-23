/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("dwa.date.datepick");
dojo.require("dijit._Widget");
dojo.require("dwa.date.calendar");
dojo.require("dwa.date.dateFormatter");
dojo.require("dwa.common.commonProperty");
dojo.require("dwa.common.graphics");
dojo.require("dwa.common.listeners");
dojo.require("dwa.common.utils");
dojo.require("dwa.date.showMonthPicker");
dojo.require("dwa.date.showYearPicker");
dojo.requireLocalization("dwa.date", "datepick");

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
	hd = dojox.date.hebrew,
	id = dojox.date.islamic,
	gd = dojo.date;
/*--Bidi End--*/

var D_ALIGN_DEFAULT = "left";
var D_ALIGN_REVERSE = "right";
var D_PADDING_DEFAULT = "padding-left";
var D_PADDING_REVERSE = "padding-right";
var D_DTFMT_MONTH = "MMMM";
var D_DTFMT_YEAR = "yyyy";
var D_Orient_Right = 3;

dojo.declare(
	"dwa.date.datepick",
	[dijit._Widget],
{
	isRTL: false,

	postMixInProperties: function(){
		if(!dojo._isBodyLtr()){
			this.isRTL = true;
		}
		if(this.isRTL){
			D_ALIGN_DEFAULT = "right";
			D_ALIGN_REVERSE = "left";
			D_PADDING_DEFAULT = "padding-right";
			D_PADDING_REVERSE = "padding-left";
		}
		this._msgs = dojo.i18n.getLocalization("dwa.date", "datepick", this.lang);
		this.inherited(arguments);
	},

	startup: function(){
		if(this._started){
			return;
		}
		this.inherited(arguments);
		this.preDraw();
	},

	preDraw: function(sId){
		var sId = this.sId = this.id;
		if (!sId)
			return;
		dojo.addClass(this.domNode, "s-datepick");
		dojo.attr(this.domNode, "role", "application");
		var oElem = this.domNode; // kami
		var sWidgetKey = this.sId + ':com_ibm_dwa_ui_datepick';
		var sImg = this._blankGif;
	
		// NOTE: When user continuously click navigator button in IE, events come like, onclick, ondblclick, onclick, ondblclick... order.
		var datePickBodyStyle;
		if(dojo.isIE) {
			datePickBodyStyle = 'class="s-datepick-body" style="height:80%;width:100%;"';
		} else {
			datePickBodyStyle = 'class="s-stack s-datepick-body"';
		}
		oElem.innerHTML = '<div '+datePickBodyStyle +'>'
			+  '<table id="' + this.sId + '-body"' + ' role="grid" class="s-basicpanel" style="table-layout:fixed;border:0px;outline:none;" cellspacing="0" cellpadding="0" tabindex="0" hidefocus="true"></table></div>'
			+ '<div id="' + this.sId + '-header" class="s-toppanel s-datepick-header"><div id="' + this.sId + '-header-gradient" class="s-stack s-datepick-header"></div>'
			+ '<table role="presentation" class="s-basicpanel s-datepick-border" border="0" cellspacing="0" cellpadding="0">'
			+ '<tbody><tr>'
			+ '<td width="10%" id="' + this.sId + '-nav-prev" class="s-datepick-nav-button s-cell-center s-handcursor">'
			+ '<span class="s-arrowText" style="top:0px">&lt;</span><img class="s-datepick-nav-prev" border="0" width="8" height="9" align="center" unselectable="on" src="' + sImg + '">'
			+ '</td>'
			// SPRABRR824KZS: We need to add nbsp between the 2 spans (IE issue)
			+ '<td width="30%" class="a11y-background-white"></td>'
			+ '<td width="10%" id="' + this.sId + '-nav-year" class="s-label-light s-datepick-nav-button s-handcursor">&nbsp;</td>'
			+ '<td width="10%" id="' + this.sId + '-nav-month" class="s-label-light s-datepick-nav-button s-handcursor">&nbsp;</td>'
			+ '<td width="30%" class="a11y-background-white"></td>'
			+ '<td width="10%" id="' + this.sId + '-nav-next" class="s-datepick-nav-button s-cell-center s-handcursor">'
			+ '<span class="s-arrowText" style="top:0px">&gt;</span><img class="s-datepick-nav-next" border="0" width="8" height="9" align="center" unselectable="on" src="' + sImg + '">'
			+ '</td></tr></tbody></table></div>'
			+ '<label id="' + this.sId + '-label-slot" style="display:none"></label>'
			+ '<label id="' + this.sId + '-label-year" style="display:none"></label>'
			+ '<label id="' + this.sId + '-label-month" style="display:none"></label>'
			+ '<label id="' + this.sId + '-label-prev" style="display:none">previous month</label>'
			+ '<label id="' + this.sId + '-label-next" style="display:none">next month</label>';

		var oWidget = this;
		var oNavHandlers = {
			'-body':{
				keydown:'onKeyDownBody',
				focus:'onFocusBody',
				blur:'onBlurBody'
			},
			'-nav-year':{
				click:'showYearPicker',
				keydown:'onKeyDownNavigate',
				mouseover:'onMouseOver',
				mouseout:'onMouseOut',
				focus:'onFocusYear',
				blur:'onBlurYear'
			},
			'-nav-month':{
				click:'showMonthPicker',
				keydown:'onKeyDownNavigate',
				mouseover:'onMouseOver',
				mouseout:'onMouseOut',
				focus:'onFocusMonth',
				blur:'onBlurMonth'
			},
			'-nav-prev':{
				click:'onClickNavigate',
				keydown:'onKeyDownNavigate',
				mouseover:'onMouseOver',
				mouseout:'onMouseOut',
				focus:'onFocusPrev',
				blur:'onBlurPrev'
			},
			'-nav-next':{
				click:'onClickNavigate',
				keydown:'onKeyDownNavigate',
				mouseover:'onMouseOver',
				mouseout:'onMouseOut',
				focus:'onFocusNext',
				blur:'onBlurNext'
			}
		};
		for(var skey in oNavHandlers){
			var oNav = dojo.byId(this.sId + skey);
			for(var sevent in oNavHandlers[skey])
					this.connect(oNav, 'on' + sevent, oNavHandlers[skey][sevent]);
		}

		var oHeader = dojo.doc.getElementById(this.sId + '-header-gradient');
		if (dojo.isIE)
			var oStyle = oHeader.currentStyle;
		else
			var oStyle = dojo.doc.defaultView.getComputedStyle(oHeader, '');
		var sColor1 = oStyle.borderTopColor;
		var sColor2 = oStyle.borderBottomColor;

		if ((!dojo.isMozilla && !dojo.isWebKit)) {
			 oHeader.innerHTML = '<v:rect class="s-toppanel">'
				 + '<v:stroke on="false" />'
				 + '<v:fill type="gradient" color="' + sColor1 + '" color2="' + sColor2 + '" />'
				 + '</v:rect>';
		} else {
			oHeader.innerHTML = '<canvas id="' + this.sId + '-gradient" class="s-stack"></canvas>';
			var oCanvas = dojo.doc.getElementById(this.sId + '-gradient');
			oCanvas.setAttribute('width', oCanvas.offsetWidth);
			oCanvas.setAttribute('height', oCanvas.offsetHeight);
			var oContext = oCanvas.getContext('2d');
			var oGradient = oContext.createLinearGradient(0, 0, 0, oCanvas.offsetHeight)
			oGradient.addColorStop(0, sColor1);
			oGradient.addColorStop(1, sColor2);
			oContext.fillStyle = oGradient;
			oContext.fillRect(0, 0, oCanvas.offsetWidth, oCanvas.offsetHeight);
		}

		var oMap = {'com_ibm_dwa_misc_observes_calendar':void 0, 'com_ibm_dwa_misc_observes_calendar_navigate':void 0};
		for (var s in oMap) {
			if (oElem.getAttribute(s)) {
				var oProperty = dwa.common.commonProperty.get(this[s] = oElem.getAttribute(s));
				oProperty.attach(this);
			}
		}
		this.updateFocusDate();
		this.draw();
	},
	destroy: function() {
		this.monthPicker && this.monthPicker.destroy();
		this.yearPicker && this.yearPicker.destroy();
		
		if (this.com_ibm_dwa_misc_observes_calendar)
			dwa.common.commonProperty.get(this.com_ibm_dwa_misc_observes_calendar).detach(this);
		if (this.com_ibm_dwa_misc_observes_calendar_navigate)
			dwa.common.commonProperty.get(this.com_ibm_dwa_misc_observes_calendar).detach(this);
		this.inherited(arguments);
	},
	updateFocusDate: function(){
		var oElem = this.domNode;
		this.oFocusDate = this.getNavigateDate();
	},
	getNavigateDate: function(){
		var oElem = this.domNode;
		var oProperty = dwa.common.commonProperty.get(oElem.getAttribute('com_ibm_dwa_misc_observes_calendar_navigate')?
			oElem.getAttribute('com_ibm_dwa_misc_observes_calendar_navigate'):
			oElem.getAttribute('com_ibm_dwa_misc_observes_calendar'));
		var oCalendar = oProperty.vValue ? (new dwa.date.calendar).setISO8601String(oProperty.vValue) : (new dwa.date.calendar).setDate(new Date);
		oCalendar.fDateOnly = true;
		oCalendar.oZoneInfo = void 0;
		return oCalendar;
	},
	observe: function(oProperty){
		if (oProperty.isLatest && !oProperty.isLatest())
			return;
		this.updateFocusDate();
		this.draw();
	},
	// start: bidi utility functions
	getDateType:function(){
		return api.getCalendar(); 
	},
	convertDate:function(oDate, dateType){
		if(dateType == cfg.HIJRI){
			return new ___id.Date().fromGregorian(new Date(oDate.nYear,oDate.nMonth,oDate.nDate));
		}else if(dateType == cfg.HEBREW){
			return new ___hd.Date().fromGregorian(new Date(oDate.nYear,oDate.nMonth,oDate.nDate));
		}else {
			return new Date(oDate.nYear,oDate.nMonth,oDate.nDate);
		}
	},
	compareDates: function(date1, date2, dateType){
		if(dateType == cfg.HIJRI){
			return ___id.compare(date1, date2, 'date');
		}else if(dateType == cfg.HEBREW){
			return ___hd.compare(date1, date2, 'date');
		}else {
			return ___gd.compare(date1, date2, 'date');
		}
	},
	formatAltDate: function(oDate, format,dateType){
		switch(format){
			case D_DTFMT_MONTH:
				if(dateType == cfg.HIJRI)
					return ___id.locale.getNames('months','wide')[oDate.getMonth()];
				else if(dateType == cfg.HEBREW)
					return ___hd.locale.getNames("months","wide",undefined,undefined,oDate)[oDate.getMonth()];
				else 
					return ___gd.locale.getNames('months','wide')[oDate.getMonth()];
					
			case D_DTFMT_YEAR:
					return oDate.getFullYear();
			default:
				return oDate;
		}		
	},
	adjustAltDate: function(dateType, oDate, interval, amount){
		if(dateType == cfg.HIJRI){
			return ___id.add(oDate, interval, amount);
		}else if(dateType == cfg.HEBREW){
			return ___hd.add(oDate, interval, amount);
		}else {
			return ___gd.add(oDate, interval, amount);
		}
	},
	// end: bidi utility functions
	draw: function(){
		this.oGrid = new dwa.date.monthGrid(this.oFocusDate);
		var oNavigateDate = this.getNavigateDate();
	
		var oDateFormatter = new dwa.date.dateFormatter();
		oDateFormatter.sFormat = D_DTFMT_MONTH;
		var sMonthLabel = oDateFormatter.format(this.oGrid.oCalendar);
		dwa.common.utils.elSetInnerText(dojo.byId(this.sId + '-nav-month'), sMonthLabel);
		oDateFormatter.sFormat = D_DTFMT_YEAR;
		var sYearLabel = oDateFormatter.format(this.oGrid.oCalendar);
		dwa.common.utils.elSetInnerText(dojo.byId(this.sId + '-nav-year'), sYearLabel);
		if(3 <= dojo.isFF || 8 <= dojo.isIE) {
			dojo.byId(this.sId + '-label-month').innerHTML = sMonthLabel;
			dojo.byId(this.sId + '-label-year').innerHTML = sYearLabel;
		} else if (dojo.isFF || dojo.isIE) {
			dojo.byId(this.sId + '-nav-month').title = sMonthLabel;
			dojo.byId(this.sId + '-nav-year').title = sYearLabel;
		}
	
		var oToday = (new dwa.date.calendar).setDate(new Date);
		oToday.fDateOnly = true;
	
		var asHtml = [];
		asHtml[0] = '<tbody>';
	
		var asCharDays = [this._msgs["L_CHARDAY_SUN"], this._msgs["L_CHARDAY_MON"], this._msgs["L_CHARDAY_TUE"], this._msgs["L_CHARDAY_WED"], this._msgs["L_CHARDAY_THU"], this._msgs["L_CHARDAY_FRI"], this._msgs["L_CHARDAY_SAT"]];
	
		asHtml.push('<tr role="row">');
	
		for (var x = 0; x < this.oGrid.oCalendar.nDaysInWeek; x++) {
			var sDay = asCharDays[(new dwa.date.calendar).setUTCDate(this.oGrid[0][x]).nDay];
			asHtml.push('<td role="columnheader" class="s-datepick-cell s-cell-center"><b>' + sDay + '</b></td>');
		}
	
		asHtml.push('</tr>');
	
		var sWidgetKey = this.sId + ':com_ibm_dwa_ui_datepick';
		
		var dateType = this.getDateType();
		if(dateType != cfg.GREGORIAN){
			var oAltFocuseDate = this.convertDate(this.oFocusDate,dateType);

			var oAltCalendar = this.adjustAltDate(dateType, oAltFocuseDate, 'day', - oAltFocuseDate.getDate() + 1 );
			oAltCalendar = this.adjustAltDate(dateType, oAltCalendar, 'day', - ((oAltCalendar.getDay() + 1)% 7 ));
			
			var oAltToday = this.convertDate((new dwa.date.calendar).setOSDate(new Date()),dateType);
			var oGridCal = this.convertDate(this.oGrid.oCalendar ,dateType);
			
			sMonthLabel = this.formatAltDate(oGridCal, D_DTFMT_MONTH,dateType);
			dwa.common.utils.elSetInnerText(dojo.byId(this.sId + '-nav-month'), sMonthLabel);
			sYearLabel = this.formatAltDate(oGridCal, D_DTFMT_YEAR,dateType);
			dwa.common.utils.elSetInnerText(dojo.byId(this.sId + '-nav-year'), sYearLabel);
			if(3 <= dojo.isFF || 8 <= dojo.isIE) {
				dojo.byId(this.sId + '-label-month').innerHTML = sMonthLabel;
				dojo.byId(this.sId + '-label-year').innerHTML = sYearLabel;
			} else if (dojo.isFF || dojo.isIE) {
				dojo.byId(this.sId + '-nav-month').title = sMonthLabel;
				dojo.byId(this.sId + '-nav-year').title = sYearLabel;
			}
		}

		var focID = '';
		var ids = [];
		for (var y = 0; y < this.oGrid.nRows; y++) {
			asHtml.push('<tr role="row">');
	
			for (var x = 0; x < this.oGrid.oCalendar.nDaysInWeek; x++) {
				var oCalendar = (new dwa.date.calendar).setUTCDate(this.oGrid[y][x]);
				oCalendar.fDateOnly = true;
				var sClass, sStyle, sHTML;
				if(dateType == cfg.GREGORIAN){
					 sClass = 's-datepick-cell s-handcursor' + (oToday.equals(oCalendar) ? ' s-datepick-cell-today' : '')
					 + ' s-datepick-cell-' + (oNavigateDate.equals(oCalendar) ? 'select' : 'normal')
					 + (this.oFocusDate.equals(oCalendar) ? ' s-datepick-cell-focus' : '');
					 sStyle = '-moz-user-focus:ignore;' + (this.oGrid.oCalendar.nMonth != oCalendar.nMonth ? 'color:gray;' : '');
		
					 sHtml = '<td role="gridcell" id="' + this.sId + '-date-' + oCalendar + '" class="' + sClass + '"  style="' + sStyle + '">'
					 + oCalendar.nDate
					 + '</td>';
				}else{
					var temp = oAltCalendar.toGregorian();
					 oCalendar = (new dwa.date.calendar(temp.getFullYear(), temp.getMonth(), temp.getDate()+1));
					 oCalendar.fDateOnly = true;
					 sClass = 's-datepick-cell s-handcursor' + (this.compareDates(oAltCalendar ,oAltToday ,dateType) == 0 ? ' s-datepick-cell-today' : '')
					 + ' s-datepick-cell-' + (this.compareDates(oAltCalendar ,oAltFocuseDate ,dateType) == 0  ? 'select' : 'normal')
					 + (this.compareDates(oAltCalendar ,oAltFocuseDate ,dateType) == 0 ? ' s-datepick-cell-focus' : '');
					 focID = (this.compareDates(oAltCalendar ,oAltFocuseDate ,dateType) == 0 ? this.sId + '-date-' + oCalendar  : focID);
					 sStyle = '-moz-user-focus:ignore;' + (oGridCal.getMonth()  != oAltCalendar.getMonth() ? 'color:gray;' : '');
					 sHtml = '<td role="gridcell" id="' + this.sId + '-date-' + oCalendar + '" class="' + sClass + '"  style="' + sStyle + '">'
					 + oAltCalendar.getDate()
					 + '</td>';
					 oAltCalendar = this.adjustAltDate(dateType, oAltCalendar, 'day', 1);
					 
				}
		
				ids.push(this.sId + '-date-' + oCalendar);
				asHtml.push(sHtml);
			}
	
			asHtml.push('</tr>');
		}
	
		asHtml.push('</tbody>');
	
		dojo.html.set(dojo.byId(this.sId + '-body'), asHtml.join(''));
		for(var i = 0, len = ids.length; i < len; i++){
			var td = dojo.doc.getElementById(ids[i]);
			this.connect(td, "onmouseover", "onCellMouseOver");
			this.connect(td, "onmouseout", "onCellMouseOut");
			this.connect(td, "onclick", "pickDate");
		}
		if(dateType == cfg.GREGORIAN){
			focID = this.sId + '-date-' + this.oFocusDate;
		}
		var focusDateTD = dojo.byId(focID);
		console.debug("test focus:" + focusDateTD.id);
		if(focusDateTD){
			
				focusDateTD.setAttribute("tabIndex","0");
				if(this.domNode.parentNode.style.display != 'none')
					focusDateTD.focus();
		
		}
		
	},
	onCellMouseOver: function(e){
		var oElem = e.currentTarget;
		dojo.toggleClass(oElem, 's-datepick-cell-hover', true);
//		oElem.style.padding = '0px';
	},
	onCellMouseOut: function(e){
		var oElem = e.currentTarget;
		dojo.toggleClass(oElem, 's-datepick-cell-hover', false);
//		oElem.style.padding = '';
	},
	pickDate: function(ev){
		var sId = ev.currentTarget.id;
		this.dispatchDate(sId.match(/\-date\-([[0-9]*)$/)[1]);
	},
	dispatchDate: function(sDate){
		if(sDate)
			this.oGrid.oCalendar.setISO8601String(sDate);
	
		var oElem = dojo.doc.getElementById(this.sId);
		var oMap = {'com_ibm_dwa_misc_observes_calendar':void 0, 'com_ibm_dwa_misc_observes_calendar_navigate':void 0};
		for (s in oMap) {
			if (oElem.getAttribute(s)) {
				var oProp = dwa.common.commonProperty.get(oElem.getAttribute(s));
				if(oProp.vValue){
					var oCalendar = (new dwa.date.calendar).setISO8601String(oProp.vValue);
					oCalendar.set(this.oGrid.oCalendar);
					oProp.setValue('' + oCalendar);
				}else
					oProp.setValue('' + this.oGrid.oCalendar);
			}
		}
	},
	navigate: function(nYear, nMonth, nDay){
		var oElem = this.domNode;
		if (oElem.getAttribute('com_ibm_dwa_ui_datepick_dropdown') == 'true' && nYear == 0 && nMonth == 0) {
			this.oFocusDate.adjustDays(nYear, nMonth, nDay);
			this.draw();
		} else {
			this.oGrid.oCalendar.adjustDays(nYear, nMonth, nDay);
			var oProp = dwa.common.commonProperty.get(oElem.getAttribute('com_ibm_dwa_misc_observes_calendar_navigate')?
				oElem.getAttribute('com_ibm_dwa_misc_observes_calendar_navigate'):
				oElem.getAttribute('com_ibm_dwa_misc_observes_calendar'));
			if(oProp.vValue){
				var oCalendar = (new dwa.date.calendar).setISO8601String(oProp.vValue);
				oCalendar.set(this.oGrid.oCalendar);
				oProp.setValue('' + oCalendar);
			}else
				oProp.setValue('' + this.oGrid.oCalendar);
		}
		// nakakura
		var bNoFocus = (nMonth == 1 || nMonth == -1) && nYear == 0 && nDay == 0;
		this.setAriaLabel(bNoFocus);
	},
	onClickNavigate: function(ev, bNoFocus){
		var nYear, nMonth;
		var oElem = ev.currentTarget;
		if(oElem.id.indexOf("-nav-month") != -1){
			return this.showMonthPicker(ev);
		}else if (oElem.id.indexOf("-nav-year") != -1){
			return this.showYearPicker(ev);
		}else if(oElem.id.indexOf("-nav-prev") != -1){
			nYear = 0;
			nMonth = -1;
		}else if(oElem.id.indexOf("-nav-next") != -1){
			nYear = 0;
			nMonth = 1;
		}
		this.navigate(nYear, nMonth, 0);
		if(!bNoFocus)
			this.focusToBody();
		dojo.stopEvent(ev);
	},
	focus: function(){
		dojo.doc.getElementById(this.sId + '-body').tabIndex = 0;
		dojo.doc.getElementById(this.sId + '-nav-prev').tabIndex = 0;
		dojo.doc.getElementById(this.sId + '-nav-next').tabIndex = 0;
		dojo.doc.getElementById(this.sId + '-nav-month').tabIndex = 0;
		dojo.doc.getElementById(this.sId + '-nav-year').tabIndex = 0;
		this.focusToBody();
	},
	blur: function(){
		dojo.doc.getElementById(this.sId + '-body').tabIndex = -1;
		dojo.doc.getElementById(this.sId + '-nav-prev').tabIndex = -1;
		dojo.doc.getElementById(this.sId + '-nav-next').tabIndex = -1;
		dojo.doc.getElementById(this.sId + '-nav-month').tabIndex = -1;
		dojo.doc.getElementById(this.sId + '-nav-year').tabIndex = -1;
		var oElem = this.domNode;
		if(oElem && oElem.getAttribute('com_ibm_dwa_datepick_focus_on_close')) {
			dojo.doc.getElementById(oElem.getAttribute('com_ibm_dwa_datepick_focus_on_close')).focus();
		}
	},
	focusToBody: function(){
		dojo.doc.getElementById(this.sId + '-body').focus();
	},
	onKeyDownNavigate: function(ev){
		var oElem = ev.currentTarget;
		switch(ev.keyCode) {
			case 13: // return
			case 32: // space
				return this.onClickNavigate(ev, true);
			case 27: // esc
				// close datepicker
				dojo.stopEvent(ev);
				return;
			case 9: // tab
				if(oElem.id.indexOf("-nav-prev") != -1 && ev.shiftKey) {
					// close datepicker
					dojo.stopEvent(ev);
					return;
				}
				if(oElem.id.indexOf("-nav-next") != -1 && !ev.shiftKey) {
					// focus to date grid
					dojo.stopEvent(ev);
					return this.focusToBody();
				}
				return;
		}
	},
	onKeyDownBody: function(ev){
		switch(ev.keyCode) {
			case 13: // return
			case 32: // space
				dojo.stopEvent(ev);
				this.dispatchDate();
				return;
			case 27: // esc
				// close datepicker
				dojo.stopEvent(ev);
				return;
			case 9: // tab
				if(ev.shiftKey) {
					// focus to next month button
					dojo.stopEvent(ev);
					this.blur();
				} else {
					// close datepicker
					dojo.stopEvent(ev);
					this.blur();
					return;
				}
				return;
			case 37: // left
				dojo.stopEvent(ev);
				this.navigate(0, 0, this.isRTL ? 1 : -1);
				return;
			case 39: // right
				dojo.stopEvent(ev);
				this.navigate(0, 0, this.isRTL ? -1 : 1);
				return;
			case 38: // up
				dojo.stopEvent(ev);
				this.navigate(0, 0, -7);
				return;
			case 40: // down
				dojo.stopEvent(ev);
				this.navigate(0, 0, 7);
				return;
			case 33: // pageup
				dojo.stopEvent(ev);
				this.navigate(ev.shiftKey ? -1 : 0, ev.shiftKey ? 0 : -1, 0);
				return;
			case 34: // pagedown
				dojo.stopEvent(ev);
				this.navigate(ev.shiftKey ? 1 : 0, ev.shiftKey ? 0 : 1, 0);
				return;
		}
	},
	onMouseOver: function(ev){
		dojo.toggleClass(ev.currentTarget, 's-datepick-nav-button-highlighted', true);
	},
	onMouseOut: function(ev){
		dojo.toggleClass(ev.currentTarget, 's-datepick-nav-button-highlighted', false);
	},
	onFocusPrev: function(ev){
		dojo.toggleClass(dojo.doc.getElementById(this.sId + '-nav-prev'),'s-datepick-nav-button-focused', true);
	},
	onFocusNext: function(ev){
		dojo.toggleClass(dojo.doc.getElementById(this.sId + '-nav-next'),'s-datepick-nav-button-focused', true);
	},
	onFocusMonth: function(ev){
		dojo.toggleClass(dojo.doc.getElementById(this.sId + '-nav-month'),'s-datepick-nav-button-focused', true);
	},
	onFocusYear: function(ev){
		dojo.toggleClass(dojo.doc.getElementById(this.sId + '-nav-year'),'s-datepick-nav-button-focused', true);
	},
	getFocusedCell: function(){
		var oCalendar = (new dwa.date.calendar).setUTCDate(this.oFocusDate.getUTCDate());
		oCalendar.fDateOnly = true;
		var sId = this.sId + '-date-' + oCalendar;
		return dojo.doc.getElementById(sId);
	},
	onFocusBody: function(ev){
		var oElem = this.getFocusedCell();
		if(oElem)
			dojo.toggleClass(oElem, 's-datepick-cell-focus', true);
	},
	onBlurPrev: function(ev){
		dojo.toggleClass(dojo.doc.getElementById(this.sId + '-nav-prev'),'s-datepick-nav-button-focused', false);
	},
	onBlurNext: function(ev){
		dojo.toggleClass(dojo.doc.getElementById(this.sId + '-nav-next'),'s-datepick-nav-button-focused', false);
	},
	onBlurMonth: function(ev){
		dojo.toggleClass(dojo.doc.getElementById(this.sId + '-nav-month'),'s-datepick-nav-button-focused', false);
	},
	onBlurYear: function(ev){
		dojo.toggleClass(dojo.doc.getElementById(this.sId + '-nav-year'),'s-datepick-nav-button-focused', false);
	},
	onBlurBody: function(ev){
		var oElem = this.getFocusedCell();
		if(oElem)
			dojo.toggleClass(oElem, 's-datepick-cell-focus', false);
	},
	showMonthPicker: function(ev){
		this._beingShown = true;
		
		dojo.addOnLoad( dojo.hitch(this, function(){
			dwa.date.showMonthPicker(this, dojo.byId(this.sId + "-nav-month"), D_ALIGN_DEFAULT);
		}));
		dojo.stopEvent(ev);
		this._beingShown = false;
	},
	showYearPicker: function(ev){
		this._beingShown = true;
		
		dojo.addOnLoad(dojo.hitch(this, function(){
			dwa.date.showYearPicker(this, dojo.byId(this.sId + "-nav-year"), D_ALIGN_DEFAULT);
		}));
		dojo.stopEvent(ev);
		this._beingShown = false;
	},
	buildResourcesUrl: function(path){
		return dojo.moduleUrl("dwa.common", "images/" + path);
	},
	setAriaLabel: function(bNoFocus) {
		// JAWS10 does not support safari and chrome
		if (!dojo.isWebKit) {
			if (!this.oFormatterA11y)
				this.oFormatterA11y = new dwa.date.dateFormatter();
			var sTitle = this.oFormatterA11y.asDays[this.oFocusDate.nDay] + " " + this.oFocusDate.nDate + " " +
				this.oFormatterA11y.asMonths[this.oFocusDate.nMonth] + " " + this.oFocusDate.nYear;
			if (8 <= dojo.isIE || 3 <= dojo.isFF) {
				var id = this.sId + '-label-slot';
				dojo.byId(id).innerHTML = sTitle;
				dojo.doc.getElementById(this.sId + '-body').setAttribute("aria-labelledby", id);
			} else
				dojo.doc.getElementById(this.sId + '-body').title = sTitle;
			// JAWS does not aria-labelledby title attribute jsut by changing it.
			if (!bNoFocus) {
				dojo.doc.getElementById(this.sId + '-nav-prev').focus();
				dojo.doc.getElementById(this.sId + '-body').focus();
			}
		}
	},
	_onBlur: function(){
		if(!this._beingShown){
			dijit.popup.close(this);
			this.onBlur();
		}
	}
});

dojo.declare(
	"dwa.date.monthGrid",
	null,
{
	constructor: function(oCalendar){
		var oDate = new Date(Date.UTC(oCalendar.nYear, oCalendar.nMonth, 1, 12, 0, 0, 0));
		var nDaysBefore = oDate.getUTCDay() - (new dwa.date.dateFormatter()).oCalendarData.nFirstDayMonth;
	
		if (nDaysBefore < 0)
			nDaysBefore += oCalendar.nDaysInWeek;
		
		var nDaysInAndBefore = oCalendar.getDaysInMonth() + nDaysBefore;
	
		this.nRows = parseInt(nDaysInAndBefore / oCalendar.nDaysInWeek);
	
		if (nDaysInAndBefore > this.nRows * oCalendar.nDaysInWeek)
			this.nRows++;
	
		if (nDaysBefore)
			oDate.setTime(oDate.getTime() - nDaysBefore * 86400000);
	
		for (var y = 0; y < this.nRows; y++) {
			this[y] = [];
			for (var x = 0; x < oCalendar.nDaysInWeek; x++, oDate = new Date(oDate.getTime() + 86400000))
				this[y][x] = oDate;
		}
	
		this.oCalendar = oCalendar;
	}
});
