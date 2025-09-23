/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide('lconn.calendar.GridView');

dojo.require("dojo.i18n");
dojo.require("dojo.parser");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.require("lconn.core.MenuUtility");
dojo.require("lconn.core.DialogUtil");

dojo.require('dwa.cv.calendarView');

dojo.require('lconn.calendar.Lazy');

dojo.declare("lconn.calendar.GridView", [dijit._Widget, dijit._Templated], 
{
	templateString: null,
	templatePath: dojo.moduleUrl('lconn.calendar', 'templates/gridView.html'),
	calendar: null,
	dwaWidget: null,
	isOwner: null,
	isMember: null,
	resizeTimer: null,
	viewsDropDown: null,
	showSummaryList: false,
	timeSlot: "M",
	connects: [],
	blankImageUrl: dojo.config.blankGif,
	
	postMixInProperties: function(){
		lconn.calendar.CalendarData.get().mixin(this);
		this.isMember = ("true" == this.calendar.userProfile.getItemValue('canContribute'));
		this.isOwner = ("true" == this.calendar.userProfile.getItemValue('canPersonalize'));
		if(!this.isOwner && window.canAddOthers) {
			this.isOwner = true;
			this.isMember = true;
		}
	},
	
	postCreate: function(){
		this.dwaWidget = new dwa.cv.calendarView({	store: this.calendar.store,
													enableDnD: false,
													fDisableDragDropAndInPlace: true,
													nCalViewDragDrop: 0,
													fDisableInPlaceEdit: true,
													date: this.hashValue('date'),
													type: this.hashValue('type') || this.timeSlot,
													userProfile: this.calendar.userProfile
													}, this.view_body); 	

		this.dwaWidget.openEntryAction = dojo.hitch(this, "view");

		var oldSelect = this.dwaWidget.selectEntry, oldUnselect = this.dwaWidget.unselectEntry;

		this.dwaWidget.selectEntry = dojo.hitch(this, function() {
			oldSelect.apply(this.dwaWidget, arguments);
			this.setupActionBar(this, true);
			return false;	
		});

		this.dwaWidget.unselectEntry = dojo.hitch(this, function() {
			this.setupActionBar(this, false);
			oldUnselect.apply(this.dwaWidget, arguments);
			return false;
		});
		
		// action bar
		dojo.style(this.actionBar, 'display', 'none');
		if(this.isOwner || this.isMember) {
			lconn.calendar.Lazy.addOnLoad(['/lconn/calendar/preference'], this, function() {
				if (this.isOwner || (this.isMember && this.calendar.calendarInfo.members_Role == "1")) {
					dojo.style(this.actionBar, 'display', 'block');
					this.dwaWidget.newEntryAction = dojo.hitch(this, "add");
					this.dwaWidget.deleteEntryAction = dojo.hitch(this, "delete");
					this.connects.push(dojo.connect(this.btnAddEvent, 'onclick', this, "add"));
					this.connects.push(dojo.connect(this.btnEditEvent, 'onclick', this, "edit"));
					this.connects.push(dojo.connect(this.btnDeleteEvent, 'onclick', this, "delete"));
				}
			}, false, !this.isOwner && !this.calendar.isVisitor);
		}

		//build the time slot dropdown menu
		this.buildViewsDropDown(this.hashValue('type'));
		
		// register callback to display the time slot dropdown
		this.connects.push(dojo.connect(this.viewPickerLink, "onclick", this, function(evt){menuUtility.openMenu(evt, this.id + "_menu", this.viewPickerLink);}));
		this.connects.push(dojo.connect(this.viewPickerImg, "onclick", this, function(evt){menuUtility.openMenu(evt, this.id + "_menu", this.viewPickerLink);}));

		this.dwaWidget.startup();
		this.shapeCalendar();

		this.feedLink.onclick = dojo.hitch(this, function() {
			lconn.calendar.CalendarUtil.popupICalSubscribeDialog(1,this.calendar.feedUrl,this._lang);
			return false;
		});
		
		this.connects.push(dojo.connect(dojo.global, "onresize", this, "shapeCalendar"));
	},
	
	enter: function(load) {
		if (load) {
			this.load();
		}
		
		this.domNode.style.display = "block";
	},
	
	exit: function(unload) {
		if (unload) {}
		
		this.domNode.style.display = "none";
	},
	
	destroy: function(){
		//disconnect handlers
		dojo.forEach(this.connects, dojo.disconnect);
		
		//cleanup widgets
		var widget = this.dwaWidget;
		this.dwaWidget = null;
		if(widget)widget.destroyRecursive();

		widget = this.viewsDropDown;
		this.viewsDropDown = null;
		if(widget)widget.destroyRecursive();
				
		this.inherited(arguments);
	},
		
	buildViewsDropDown: function(type){
		if(!this.viewsDropDown)
		{
			this.viewsDropDown = new dijit.Menu({id: this.id + "_menu"});
	        this.viewsDropDown.addChild(new dijit.MenuItem({
	        	id: this.id + "_menu_DAY",
	            label: this._lang.DAY_VIEW,
	            onClick: dojo.hitch(this, function(evt){this.onViewPicked(evt, 'D');})
	        }));
	        this.viewsDropDown.addChild(new dijit.MenuItem({
	        	id: this.id + "_menu_TWODAY",
	            label: this._lang.TWODAY_VIEW,
	            onClick: dojo.hitch(this, function(evt){this.onViewPicked(evt, 'T');})
	        }));
	        this.viewsDropDown.addChild(new dijit.MenuItem({
	        	id: this.id + "_menu_FIVEDAY",
	            label: this._lang.FIVEDAY_VIEW,
	            onClick: dojo.hitch(this, function(evt){this.onViewPicked(evt, 'F');})
	        }));
	        this.viewsDropDown.addChild(new dijit.MenuItem({
	        	id: this.id + "_menu_WEEK",
	            label: this._lang.WEEK_VIEW,
	            onClick: dojo.hitch(this, function(evt){this.onViewPicked(evt, 'W');})
	        }));
	        this.viewsDropDown.addChild(new dijit.MenuItem({
	        	id: this.id + "_menu_MONTH",
	            label: this._lang.MONTH_VIEW,
	            onClick: dojo.hitch(this, function(evt){this.onViewPicked(evt, 'M');})
	        }));
		}
		if(type) {
			this.timeSlot = type;
			switch(type)
			{
				case	"D":
					dojo.html.set(this.viewPickerLink, this._lang.DAY_VIEW);
					break;
				case	"T":
					dojo.html.set(this.viewPickerLink, this._lang.TWODAY_VIEW);
					break;
				case	"F":
					dojo.html.set(this.viewPickerLink, this._lang.FIVEDAY_VIEW);
					break;
				case	"W":
					dojo.html.set(this.viewPickerLink, this._lang.WEEK_VIEW);
					break;
				case	"M":
					dojo.html.set(this.viewPickerLink, this._lang.MONTH_VIEW);
					break;
			}
		}
	},
	
	setupActionBar: function(view, isSelect) {
		if(view.isOwner || view.isMember) {
			lconn.calendar.Lazy.addOnLoad(['/lconn/calendar/preference'], {view: view, isSelect: isSelect}, function() {
				if(this.isSelect && this.view.dwaWidget.oSelectedEvent) {
					this.view.calendar.store.getItem(this.view.dwaWidget.oSelectedEvent.sUnid, dojo.hitch(this, function(item) {
						if(this.view.isOwner || (this.view.calendar.calendarInfo.members_Role == "1" && item.createdBy == this.view.calendar.userProfile.getItemValue("userId"))) {
							dojo.removeClass(this.view.btnAddEvent, 'lotusBtnDisabled');
							dojo.removeAttr(this.view.btnAddEventLink, 'aria-disabled');
							dojo.removeClass(this.view.btnEditEvent, 'lotusBtnDisabled');
							dojo.removeAttr(this.view.btnEditEventLink, 'aria-disabled');
							dojo.removeClass(this.view.btnDeleteEvent, 'lotusBtnDisabled');
							dojo.removeAttr(this.view.btnDeleteEventLink, 'aria-disabled');
						} else if(this.view.calendar.calendarInfo.members_Role == "1") {
							dojo.removeClass(this.view.btnAddEvent, 'lotusBtnDisabled');
							dojo.removeAttr(this.view.btnAddEventLink, 'aria-disabled');
							dojo.addClass(this.view.btnEditEvent, 'lotusBtnDisabled');
							dojo.attr(this.view.btnEditEventLink, 'aria-disabled', 'true');
							dojo.addClass(this.view.btnDeleteEvent, 'lotusBtnDisabled');
							dojo.attr(this.view.btnDeleteEventLink, 'aria-disabled', 'true');
						} else {
							dojo.addClass(this.view.btnAddEvent, 'lotusBtnDisabled');
							dojo.attr(this.view.btnAddEventLink, 'aria-disabled', 'true');
							dojo.addClass(this.view.btnEditEvent, 'lotusBtnDisabled');
							dojo.attr(this.view.btnEditEventLink, 'aria-disabled', 'true');
							dojo.addClass(this.view.btnDeleteEvent, 'lotusBtnDisabled');
							dojo.attr(this.view.btnDeleteEventLink, 'aria-disabled', 'true');
						}		
					}));
				} else {	
					if(this.view.isOwner || this.view.calendar.calendarInfo.members_Role == "1") {
						dojo.removeClass(this.view.btnAddEvent, 'lotusBtnDisabled');
						dojo.removeAttr(this.view.btnAddEventLink, 'aria-disabled');
					}	
					else {
						dojo.addClass(this.view.btnAddEvent, 'lotusBtnDisabled');
						dojo.attr(this.view.btnAddEventLink, 'aria-disabled', 'true');
					}	
					dojo.addClass(this.view.btnEditEvent, 'lotusBtnDisabled');
					dojo.attr(this.view.btnEditEventLink, 'aria-disabled', 'true');
					dojo.addClass(this.view.btnDeleteEvent, 'lotusBtnDisabled');
					dojo.attr(this.view.btnDeleteEventLink, 'aria-disabled', 'true');
				}
			}, false, !view.isOwner && !this.calendar.isVisitor);
		}
		
		new lconn.core.aria.Toolbar(this.actionBar);
	},

	hashValue: function(key) {
		var m = window.location.hash.match(new RegExp(key+'=(.*?)(&|$)'));
		if (m) return m[1];
		return undefined;
	},
	
	shapeCalendar: function() {
		var width = this.domNode.clientWidth;
		if (width > 0) {
			this.dwaWidget.resize({l: 0, t: 0, w: width});
		}
		/**
		 IE has trouble with sizing the calendar, if it gets too big at any time it will
		 push it past the sidebar. The enclosing DIV will now take up the entire width of 
		 lotus content. This means that all subsequent calls to node width will return an invalid
		 value and the calidar will get stuck below the sidebar. 
		 This is a partial solution, works half the time. todo: investigate better solution

		if (this.resizeTimer) clearTimeout(this.resizeTimer);		
					
		this.resizeTimer = setTimeout(dojo.hitch(this, function() {
			if (dojo.isIE) {
				var node = dojo.byId('lotusMain');
				width = node.offsetWidth - (180 + 70 );
			}
			this.dwaWidget.resize({l: 0, t: 0, w: width});
			this.resizeTimer = null;
		}), 200);
		*/
	},
	
	onViewPicked: function(evt, view){
		dojo.stopEvent(evt);
		if(view != this.timeSlot)
		{
			this.timeSlot = view;

			switch(view)
			{
				case	"D":
					dojo.html.set(this.viewPickerLink, this._lang.DAY_VIEW);
					break;
				case	"T":
					dojo.html.set(this.viewPickerLink, this._lang.TWODAY_VIEW);
					break;
				case	"F":
					dojo.html.set(this.viewPickerLink, this._lang.FIVEDAY_VIEW);
					break;
				case	"W":
					dojo.html.set(this.viewPickerLink, this._lang.WEEK_VIEW);
					break;
				case	"M":
					dojo.html.set(this.viewPickerLink, this._lang.MONTH_VIEW);
					break;
			}		

			this.dwaWidget.drawCalendar(this.timeSlot, this.showSummaryList);
			this.shapeCalendar();
			
		}	
	},
	
	_viewGrid: function(evt) {
		dojo.stopEvent(evt);
		this.toggleSummary(false);
	},
	
	_viewSummary: function(evt) {
		dojo.stopEvent(evt);
		this.toggleSummary(true);
	},
	
	toggleSummary: function(showSummary) {
		if (this.showSummaryList != showSummary) {
			this.showSummaryList = showSummary;
			if (this.showSummaryList) {
				dojo.removeClass(this.viewGrid, "lotusDetailsOn");
				dojo.removeClass(this.viewGrid, "lotusSelected");
				dojo.addClass(this.viewGrid, "lotusDetailsOff");
				dojo.attr(this.viewGrid, "aria-pressed", "false");
				dojo.removeClass(this.viewSummary, "lotusSummaryOff");
				dojo.addClass(this.viewSummary, "lotusSummaryOn");
				dojo.addClass(this.viewSummary, "lotusSelected");
				dojo.attr(this.viewSummary, "aria-pressed", "true");
			} else {
				dojo.removeClass(this.viewGrid, "lotusDetailsOff");
				dojo.addClass(this.viewGrid, "lotusDetailsOn");
				dojo.addClass(this.viewGrid, "lotusSelected");
				dojo.attr(this.viewGrid, "aria-pressed", "true");
				dojo.removeClass(this.viewSummary, "lotusSummaryOn");
				dojo.removeClass(this.viewSummary, "lotusSelected");
				dojo.addClass(this.viewSummary, "lotusSummaryOff");
				dojo.attr(this.viewSummary, "aria-pressed", "false");
			}
			
			this.dwaWidget.drawCalendar(this.timeSlot, this.showSummaryList);
			this.shapeCalendar();
		}	
	},
	
	load: function() {
		this.feedLink.onclick = dojo.hitch(this, function() {
			lconn.calendar.CalendarUtil.popupICalSubscribeDialog(1,this.calendar.feedUrl,this._lang);
			return false;
		});
		
		this.dwaWidget.load();
	},
	
	view: function(aSelected){
		var unid = "";
		if (aSelected && aSelected.length > 0) {
			unid = aSelected[0].unid;
		} else if (this.dwaWidget.oSelectedEvent) {
			unid = this.dwaWidget.oSelectedEvent.sUnid;
		}
		var instId = (unid.match(/^.*:([^:]*)$/))[1];
		lconn.calendar.CalendarUtil.setHashParam("eventInstUuid", instId);
	},
	
	add: function(){
		var t = this.dwaWidget.oCalendar.getOSDate();
		t.setMinutes(0);
		t.setSeconds(0);
		if(this.timeSlot == "M") {
			t.setHours(new Date().getHours());
		}
		lconn.calendar.CalendarUtil.setHashParams(
				["mode","time","stamp"], ["create", t.getTime(), (new Date()).getTime()]);
	},
	
	edit: function(){
		if(this.dwaWidget.oSelectedEvent)
		{
			var id = (this.dwaWidget.oSelectedEvent.sUnid.match(/^.*:([^:]*)$/))[1];
			lconn.calendar.CalendarUtil.setHashParams(["eventInstUuid","mode","previous","stamp"], 
					[id,"edit","grid",(new Date()).getTime()]);
		}		
	},
	
	'delete': function(){
		if(this.dwaWidget.oSelectedEvent)
		{
			var f = dojo.hitch(this.calendar, "deleteEvent");
			this.calendar.store.getItem(this.dwaWidget.oSelectedEvent.sUnid, f, undefined, dojo.hitch(this.calendar, function(){
				this.showMessage(this._lang.EVENT_DELETE_ERROR, lconn.calendar.UIMessage.msgType.ERROR);
				this.reloadCalendar();
			}));
			dojo.publish(lconn.calendar.topic.clearMessage);
		}		
	}
});	