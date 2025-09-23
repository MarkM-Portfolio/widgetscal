/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.calendar.SmallCalendarList");

dojo.require('dojo.hash');

dojo.require('lconn.core.DateUtil');
dojo.require('lconn.core.HTMLUtil');

dojo.requireLocalization("lconn.calendar.CalendarData", "templateStrings");

dojo.declare("lconn.calendar.SmallCalendarList", [dijit._Widget, dijit._Templated], {
	
	store: null,
	rootUrl: null,
	widgetID: null,
	calendar: null,
	eventCount: 5,
	
	templatePath: dojo.moduleUrl("lconn.calendar","templates/smallCalendarList.html"),
	
	postMixInProperties: function() {
		lconn.calendar.CalendarData.get().mixin(this);
	
		this.store = this.calendar.store;
		this.rootUrl = this.calendar.rootUrl;
		this.widgetID = this.calendar.iContext.widgetId;
		this.communitiesUrl = this.calendar.commUrl;
	},
	
	postCreate: function() {
		this.buildEventsList();
		// Bidi support
    	lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
	},
	
	gotoEventList: function() {
		dojo.hash("fullpageWidgetId=" + this.widgetID);
	},
	
	buildEventsList: function() {
		this.noUpcomingEventsMsgBox.style.display = 'none';
		this.upcomingEventsMsgBox.style.display = 'none';
		if(this.store) {
			var start = new Date();
			
			var _this = this;
			this.store.pagingQuery(start, 1, this.eventCount, "STARTDATE", "ASC","past", function(events) {
				if(events.length == 0) {
					_this.noUpcomingEventsMsgBox.style.display = '';
				} else {
					if (_this.calendar.iContext.getiWidgetAttributes().getItemValue("widgetTitle")) {
						_this.upcomingEventsMsgBox.style.display = '';
					}
					dojo.forEach(events, function(e) {
						var entry = _this.buildEntry(e);
						_this.eventsPoint.appendChild(entry);
					});
				}
			});
		}
	},
	
	buildEntry: function(e) {
		var div = dojo.create("div", {className:"eventDiv"});
		
		var subject = e.subject;
		//if(subject.length > 26) {
			//if(this.calendar.iContext.getTheme() !== 'wpthemeWide'){
				//subject = subject.substring(0, 26);
				//subject += "...";
			//}
		//}
		
		var href = this.calendar.homeUrl + "#fullpageWidgetId=" + this.calendar.iContext.widgetId + "&eventInstUuid=" + (e.unid.match(/^.*:([^:]*)$/))[1];
        var span = dojo.create("span",{
            id : e.unid+"_description",
            style : {display:"none"},
        },div);
		var a = dojo.create("a", {className: "bidiAware", href: href, innerHTML: lconn.core.HTMLUtil.escapeText(subject), title: e.subject}, div);
	    if(e.location != "") {
	          span.innerHTML=dojo.string.substitute(this._lang.LINK_OPEN_INFO, [lconn.core.HTMLUtil.escapeText(e.subject),this.formatDate(e.startDateTime, e.allDay),lconn.core.HTMLUtil.escapeText(e.location)]);
              a.setAttribute('aria-label', dojo.string.substitute(this._lang.LINK_OPEN_INFO, [e.subject,this.formatDate(e.startDateTime, e.allDay),e.location]));
	    } else {
	        span.innerHTML=dojo.string.substitute(this._lang.LINK_OPEN_INFO_NOLOCATION, [lconn.core.HTMLUtil.escapeText(e.subject),this.formatDate(e.startDateTime, e.allDay)]);
            a.setAttribute('aria-label', dojo.string.substitute(this._lang.LINK_OPEN_INFO_NOLOCATION, [e.subject,this.formatDate(e.startDateTime, e.allDay)]));
        }
	    a.setAttribute("aria-labelledby",e.unid+"_description");
		var dateString = this.formatDate(e.startDateTime, e.allDay);
		var div2 = dojo.create("div", {className: "lotusMeta", innerHTML: dateString}, div);
		return div;
	},
	
	formatDate: function(dateString, allDay) {
		var date = lconn.calendar.CalendarUtil.dwaDateStringToDate(dateString);
		var result = lconn.core.DateUtil.toString(date, true);	// don't display time
		if (allDay == '1') 
			result += " (" + this._lang.ALL_DAY + ")"
		else 
			result += " " + lconn.core.DateUtil.getLocalizedTime(date);
		
		return result;
	}
});