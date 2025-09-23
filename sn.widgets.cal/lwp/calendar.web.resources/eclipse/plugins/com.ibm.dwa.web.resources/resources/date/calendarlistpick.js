/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("dwa.date.calendarlistpick");
dojo.require("dijit._Widget");
dojo.require("dwa.common.commonProperty");
dojo.require("dwa.date.calendar");
dojo.require("dwa.common.menu");

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
	hd=dojox.date.hebrew,
	id = dojox.date.islamic,
	gd = dojo.date;

/*--Bidi End--*/



dojo.declare(
	"dwa.date.calendarlistpick",
	dijit._Widget,
{
	// ---------------------------------------------------------
	// calendar list picker base
	// extender need to set properties:
	//  nEntries: # of the entries
	// extender need to implement:
	//  getFormatter: specify formatter
	//  adjustCalendar: to get 'n'th index from given calendar.
	//  needUpdate: determine if caption should be updated.
	// --------------------------------------------------------
	postCreate: function(){
		this.inherited(arguments);
		var oElem = this.domNode;
		this.sId = this.domNode.id;
		var sStartOffset = oElem.getAttribute(this.sClass + '_startOffset');
		this.nStartOffset = sStartOffset ? sStartOffset * 1 : 0;
		var oProperty = dwa.common.commonProperty.get(this.com_ibm_dwa_misc_observes_calendar = oElem.getAttribute('com_ibm_dwa_misc_observes_calendar'));
		oProperty.attach(this);
		this.observe(oProperty);
		if(this.nStartOffset)
			this.nActiveIndex = 0 - this.nStartOffset;
		
		this.menuInfo = [];
		var captions = this.getCaptions();
		var actions = this.getActions();
		for(var i = 0; i < captions.length; i++){
			this.menuInfo[i] = {
				label: captions[i],
				action: actions[i],
				context: this,
				scope: this
			};
		}
		this.menu = new dwa.common.menu({
			menuInfo: this.menuInfo,
			activeIndex: this.nActiveIndex,
			handleFocus: false
		}, dojo.create("div", {}, oElem));
	},
	startup: function(){
		if(!this._started){
			this.inherited(arguments);
			this.menu.startup();
		}
	},
	observe: function(oProperty){
		if(oProperty.isLatest && !oProperty.isLatest())
			return;
		this.oCalendar = oProperty.vValue ? (new dwa.date.calendar).setISO8601String(oProperty.vValue)
		 : (new dwa.date.calendar).setDate(new Date);
		if('function' == typeof(this.onCalendarUpdated))
			this.onCalendarUpdated();
	},
	destroy: function() {
		this.menu.destroy();
		dwa.common.commonProperty.get(this.com_ibm_dwa_misc_observes_calendar).detach(this);
		this.inherited(arguments);
	},
	getCaptions: function(){
		if(this.needUpdate()){
			this.asCaptions = [];
			var oCalendar = this.oCalendar.clone();
			var oFormatter = this.getFormatter();
			if(this.nStartOffset)
				oCalendar = this.adjustCalendar(oCalendar, this.nStartOffset);
			var dateType = this.getDateType();
			for(var i = 0; i < this.nEntries; i++){
				if(dateType != cfg.GREGORIAN){
					this.asCaptions.push(this.formatAltDate(this.convertDate(oCalendar,dateType),oFormatter.sFormat,dateType));
				}else{
					this.asCaptions.push(oFormatter.format(oCalendar));
				}
				oCalendar = this.adjustCalendar(oCalendar, 1);
			}
			this.oPrevCalendar = this.oCalendar.clone();
		}
		return this.asCaptions;
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
	formatAltDate: function(oDate, format,dateType){
		if(dateType == cfg.HIJRI)
			return ___id.locale.format(oDate, {selector: 'date' , datePattern : format});
		else if(dateType == cfg.HEBREW)
			return ___hd.locale.format(oDate, {selector: 'date' ,datePattern : format});
		else 
			return ___gd.locale.format(oDate, {selector: 'date' ,datePattern : format});
	},
	//end: bidi utility functions
	getActions: function(){
		if(this.asActions.length == 0){
			for(var i = 0; i < this.nEntries; i++) {
				this.asActions[i] = (function(i){
					return function(){
						return this.entrySelected(i);
					}
				})(i);
			}
		}
		return this.asActions;
	},
	refresh: function(){
		if(!this.needUpdate())
			return;
		var oElem = dojo.doc.getElementById(this.sId);
		var captions = this.getCaptions();
		for(var i = 0; i < this.nEntries; i++){
			this.menuInfo[i].label = captions[i];
		}
		this.menu.refresh();
	},
	entrySelected: function(nIndex){
		this.oCalendar = this.adjustCalendar(this.oCalendar, nIndex + (this.nStartOffset ? this.nStartOffset : 0));
		var oProp = dwa.common.commonProperty.get(this.com_ibm_dwa_misc_observes_calendar);
	
		if(oProp.vValue){
			var oOrgCalendar = (new dwa.date.calendar).setISO8601String(oProp.vValue);
			oOrgCalendar.set(this.oCalendar);
			oProp.setValue('' + oOrgCalendar);
		}else
			oProp.setValue('' + this.oCalendar);
	}
});
