/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.calendar.SmallCalendar");
dojo.require("dijit._Calendar");

dojo.requireLocalization("lconn.calendar.CalendarData", "templateStrings");

dojo.declare("lconn.calendar.SmallCalendar", dijit._Calendar,
{
	store: null,
	openFlagDayAction:  function(dd) { }, // callback for opening a flagged day (click, or hit enter when selected)

	templateString: null, // set to null to force to read templatePath instead (templateString is set by parent class)
	templatePath: dojo.moduleUrl("lconn.calendar","templates/smallCalendar.html"),
	
	// _flagDays: Array of Date		
	_flagDays: null,
	// connect handlers
	_handlers: null,
	_parent: null,

	// request events from store
	refresh: function() {
		if (this.store) {
			// we also need to highlight a few days before & after this month
			var viewStart = new Date(this.displayMonth.getTime() - 1000*60*60*24*7);
			var viewEnd = new Date(this.displayMonth.getTime() + 1000*60*60*24*43); 

			var _this = this;
			this.store.rangedFetch(viewStart, viewEnd, function(events) {
				dojo.forEach(events, function(e) {
					var timestamp = _this.store._loadedEvents[e.unid].date;
					_this.addFlagDay(dojo.date.stamp.fromISOString(timestamp), 'dayFlagTeamTask');
				});
				_this._populateGrid();
			});
		} else this._populateGrid();
	},

	// summary: A calendar that implements markable/flagged days that can be clicked on. Adds other improvements as well to dojo calendar 
	// description: This class extends the dojo standard _Calendar widget. 
	//        It adds a mechanism to highlight given days (add_flagDays()). 
	//		  When the user clicks a highlighted day, the event "/activitiesCalendar/dayFlag" is published 
	//		  with the date clicked as first parameter.
	//
	//		  The cell of the marked day use the "dayFlag" CSS class. Define this CSS class in the page 
	//		  using this widget to see the highlighted days
	//
	//		  Note: For optimization reasons, the marked days are NOT displayed until you call refresh() 
	//				or you pass true to the second parameters of add/remove_flagDays
	//    
	//		  Beside the highlight days, this class also display the appropriate year in the month scroller box
	// 
	// example: See Activities widget				
	postCreate: function(){		
		// summary: post create initialization			
	
		this._flagDays = [];		
		lconn.calendar.SmallCalendar.superclass.postCreate.apply(this);	
		
		this._handlers = [];		
		this.refresh(); // ~lc
	},					
	
	postMixInProperties: function(){
		lconn.calendar.SmallCalendar.superclass.postMixInProperties.apply(this, arguments);
		this._resourceBundle = dojo.i18n.getLocalization("lconn.calendar.CalendarData", "templateStrings");
	},
	
	_populateGrid: function(){
		// summary: Overriden method. Adds mechanism to render the highlighted days + years in month box
		
		lconn.calendar.SmallCalendar.superclass._populateGrid.call(this);
		
		// add year to the month box (this.monthLabelNode DOM Node)
		// the displayed month is already set by parent method so we can take advantage of it
		var heading = this.monthLabelNode.innerHTML;
		var year = this.displayMonth.getFullYear();
		heading += " " + year;
		this._setText(this.monthLabelNode, heading);
	
	
		// highlight specified dates (typically todos)	
		// calendar days boxes	
		var nodes = dojo.query(".dijitCalendarDateTemplate", this.domNode); 	
		var dateDay = new Date();
							
		// go through all the display days and check if it should be highlighted		
		for (var i=0; i<nodes.length; i++){				
			// .dijitDateValue is set by parent dojo class for each day
			// set a date object from this value
			dateDay.setTime(nodes[i].dijitDateValue);
			
			// is it a flagged day?
			// TODO: optimize (no need to check all the date, the current month should be enough
			for (var j=0; j < this._flagDays.length; j++){				
				if (dojo.date.compare(dateDay, this._flagDays[j].date, "date") == 0){
					// "mark" the highlighted day						
					nodes[i].className += " " + this._flagDays[j].style + " " + "dayFlag";
					
					if (this._flagDays[j].a11yChar != null){							
						var spanDate = dojo.query(".dijitCalendarDateLabel", nodes[i])[0];							
						spanDate.innerHTML = this._flagDays[j].a11yChar + spanDate.innerHTML;
						
						if (dojo.isIE){
							spanDate.setAttribute("tabIndex", "0");
						}
						else{
							spanDate.setAttribute("tabindex", "0");
						}
						
						this._handlers.push(dojo.connect(spanDate, "onkeypress", this, "_onDayKeyPress"));
					}
					
					break;
				}
			}					
		}			
	},
		
	addFlagDay: function(/* Date */date, /* String */ cssStyle, /* String?*/ a11yChar,/* Boolean? */refresh){
		// summary: Add a highlighted day to the calendar
		// description: After adding a day, you should call refresh() to see it
		//		  If refresh (2nd args) is true, add_flagDays call refresh() automatically			
		this._flagDays.push({date: date, style: cssStyle, a11yChar: a11yChar});			
		if (refresh)
			this.refresh();
	},
	
	_clearHandlers: function(){
		while(this._handlers.length > 0){
			dojo.disconnect(this._handlers.pop());
		}
	},
	
	_clearTabIndex: function(){
		var daySpans = dojo.query(".dijitCalendarDateLabel", this.domNode);
		for (var i=0; i<daySpans.length; i++){
			var daySpan = daySpans[i];
			
			if (dojo.isIE){
				daySpan.setAttribute("tabIndex", "-1");
			}
			else{
				daySpan.setAttribute("tabindex", "-1");
			} 
		}
	},
	
	previousMonthA11y: function(evt){
		if (evt.keyCode == dojo.keys.ENTER){
			this.previousMonth(evt);
		}
	},
	
	nextYearA11y: function(evt){
		if (evt.keyCode == dojo.keys.ENTER){
			this._adjustDisplay("year", 1);
		}
	},
	
	previousYearA11y: function(evt){
		if (evt.keyCode == dojo.keys.ENTER){
			this._adjustDisplay("year", -1);
		}
	},
	
	_adjustDisplay: function(/*String*/part, /*int*/amount){
		// need to do some clean up before displaying another month
		this._clearHandlers();
		this._clearTabIndex();
		lconn.calendar.SmallCalendar.superclass._adjustDisplay.apply(this, arguments);
	},
	
	previousMonth: function(e){
		this._adjustDisplay("month", -1);			
		this.refresh();  // lc
		dojo.stopEvent(e);
	},
	
	nextMonthA11y: function(evt){
		if (evt.keyCode == dojo.keys.ENTER){
			this.nextMonth(evt);
		}
	},
	
	nextMonth: function(e){
		this._adjustDisplay("month", 1);
		this.refresh(); // lc
		dojo.stopEvent(e);
	},
	
	_onDayKeyPress: function(/* Event */ evt){
		if (evt.keyCode == dojo.keys.ENTER){
			this._openMenuPopop(evt);
		}			
	},
	
	_onDayClick: function(/* Event */ evt){		
		// summary: Overriden method. Adds mechanism to handle click on an highlighted day 
		this._openMenuPopop(evt);			
	},
	
	_openMenuPopop: function(/* Event */ evt){
		// get clicked day box	
		var evtTarget = evt.target;		
		while(!evtTarget.dijitDateValue){
			evtTarget = evtTarget.parentNode;
		}
		
		// day with flag mark (a todo)?
		if(dojo.hasClass(evtTarget,"dayFlag")){	
			// publish an event with the date of the day			
			this.openFlagDayAction(new Date(evtTarget.dijitDateValue));
		}			
	},
	
	setParent: function(parent){
		this._parent = parent;
	},
			

//removeFlagDay: function(/* Date */date, /* Boolean? */refresh){	
		// summary: Remove a highlighted day from the calendar
		// description: After removing a day, you should call refresh() to the changes
		//		  If refresh (2nd args) is true, add_flagDays call refresh() automatically		
			
		// TODO: use dojo.date.compare instead
//		this._flagDays.pop(date);			
		
//		if (refresh)
//			this.refresh();
//	}

	_resourceBundle: {
		CALENDAR_SUMMARY: 'calendar summary',
		NEXT_MONTH: 'next month',
		PREVIOUS_MONTH: 'previous month'
	}
		
});
