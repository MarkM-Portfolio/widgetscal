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

dojo.provide("lconn.calendar.UpcomingFollowingList");

dojo.require("dojo.i18n");
dojo.require("dojo.parser");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.require("lconn.core.DateUtil");
dojo.require('lconn.core.HTMLUtil');

dojo.require("lconn.calendar.CalendarUtil");
dojo.require("lconn.calendar.Paging");
dojo.require("lconn.core.HelpLauncher");
dojo.require("lconn.core.globalization.bidiUtil");

dojo.declare("lconn.calendar.UpcomingFollowingList", [dijit._Widget, dijit._Templated], {
	store: null,
	rootUrl: null,
	type : 'all',
	
	instancesPerPage: 5,
	
	totalInstances: 0,
	
	templatePath: dojo.moduleUrl("lconn.calendar","templates/upcomingFollowingList.html"),
	
	postMixInProperties: function() {
		dojo.requireLocalization("lconn.calendar.CalendarData", "templateStrings");
		
		lconn.calendar.CalendarData.get().mixin(this);
	
		this.store = this.calendar.store;
		this.rootUrl = this.calendar.rootUrl;
		this.type = this.calendar.followType;
		this.instancesPerPage = this.calendar.ps;
		this.blankGif = dijit._Widget.prototype._blankGif;
	},
	
	postCreate: function() {
		
		this.connect(this.store, "errorHandler", dojo.hitch(this, this.onDatastoreError));
		this.prepareInstancePaging();
		this.prepareInstances(1);
		
		// Remove the hint dialog per defect: https://jira.cwp.pnp-hcl.com/browse/CNXINFRA-473 
		this.icalFeedLink.href = this.rootUrl.replace(/^http/,'webcal') + "/ical/calendar?type=" + this.type;
		this.icalFeedLink.target = "_blank";
		this.icalFeedLink.rel = "nofollow noopener noreferrer"; 
	},
	
	onDatastoreError: function(){
		this.errorMessageAP.style.display = "";
		this.instanceAP.style.display = "none";
		this.errorHandler();
		this.onSizeChange(dojo.position(this.errorMessageAP).h);
	},
	
	prepareInstancePaging: function() {
		var pagingParam = {
			pageSize: this.instancesPerPage,
			_lang: this._lang,
			total: dojo.hitch(this, function() {
				return this.totalInstances;
			}),
			onPage: dojo.hitch(this, function(p) {
				this.showInstances(p);				
			}),
			onPageSizeChange: dojo.hitch(this, function(ps) {
				this.instancesPerPage = ps;
				this.showInstances(1);
			})
		};
		if (!this.instanceBottomPagingWidget) {
			var param = dojo.mixin({features:["info", "nav"]}, pagingParam);
			this.instanceBottomPagingWidget = new lconn.calendar.Paging(param, this.instanceBottomPagingAP);
		}
		this.instanceBottomPagingWidget.domNode.parentNode.style.display = 'none';
		this.instanceBottomPagingWidget.pagePSAP.style.display='none';
	},
	
	showInstanceTab: function() {
		this.instanceAP.style.display = "";
	},
	
	showInstances: function(page) {
		//this.loadingAP.style.display = '';
		//this.instanceListAP.style.display = 'none';
		
		var start = new Date();
		this.calendar.store.getFollowedInstances(start,this.type, dojo.hitch(this, function(instances, total) {
			//this.loadingAP.style.display = 'none';
			//this.instanceListAP.style.display = '';
			
			this.totalInstances = total;
			this._showHideNode(this.noInstanceHintAP, (total>0?false:true));
			
			if(total > 0) {
				if(this.type == 'follow') {
					this.instanceListHintAP.innerHTML = this._lang.FOLLOWED_EVENTS_LABEL;
				} else if(this.type == 'attend') {
					this.instanceListHintAP.innerHTML = this._lang.ATTENDED_EVENTS_LABEL;
				} else if(this.type == 'all') {
					this.instanceListHintAP.innerHTML = this._lang.FOLLOWATTENDED_EVENTS_LABEL;
				}
				this.instanceListHintAP.style.display = '';
			} else {
				this.instanceListHintAP.style.display = 'none';
			}
			
			this.instanceBottomPagingWidget.update(page, this.instancesPerPage);
			
			// hide paging bar, if non attendee
			if(total <= this.instancesPerPage) {
		        this.instanceBottomPagingWidget.domNode.parentNode.style.display = 'none';
			} else {
		        this.instanceBottomPagingWidget.domNode.parentNode.style.display = '';
			}
			
			dojo.empty(this.instanceListAP);
			
			var table = dojo.create("table", {className: "lotusTable"});
			table.setAttribute("role", "presentation");
			this.instanceListAP.appendChild(table);
			
			var tbody = dojo.create("tbody");
			table.appendChild(tbody);
			
			for (var i=0,l=instances.length; i<l; i++) {
				var instance = instances[i];
				var node = this._oneInstanceUI(instance);
				tbody.appendChild(node);
			}
			this.onSizeChange(dojo.position(this.instanceAP).h);
			// Bidi support
	      	lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.instanceListAP);
			
		}), page, this.instancesPerPage);
	},

	_oneInstanceUI: function(e) {
		var tr = dojo.create("tr");
		
		var td = dojo.create("td", {className:"eventDiv"});
		tr.appendChild(td);
		
		var subject = e.title;
		if(subject.length > 26) {
			subject = subject.substring(0, 26);
			subject += "...";
		}
		var href = e.url ;
		var span = dojo.create("span",{
		    id : e.instanceUuid+"_description",
		    style : {display:"none"}
		},td);
		var a = dojo.create("a", {href: href, target:"_blank", className:"bidiAware", innerHTML: lconn.core.HTMLUtil.escapeText(subject), title: e.title}, td);
		var titleEscaped = lconn.core.HTMLUtil.escapeText(e.title);
		var locationEscaped = lconn.core.HTMLUtil.escapeText(e.location);
		if(locationEscaped != "") {
		      span.innerHTML = dojo.string.substitute(this._lang.LINK_OPEN_IN_NEW_WINDOW_INFO, [titleEscaped,this.formatDate(e.startDateTime, e.allDay),locationEscaped]);
		      a.setAttribute('aria-label', dojo.string.substitute(this._lang.LINK_OPEN_IN_NEW_WINDOW_INFO, [e.title,this.formatDate(e.startDateTime, e.allDay),e.location]));
		} else {
		    span.innerHTML = dojo.string.substitute(this._lang.LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION, [titleEscaped,this.formatDate(e.startDateTime, e.allDay)]);
            a.setAttribute('aria-label', dojo.string.substitute(this._lang.LINK_OPEN_IN_NEW_WINDOW_INFO_NOLOCATION, [e.title,this.formatDate(e.startDateTime, e.allDay)]));
		}
		a.setAttribute("aria-labelledby",e.instanceUuid+"_description");
		a.setAttribute("aria-describedby","lconnEventLinkDescription");
		var dateString = this.formatDate(e.startDateTime, e.allDay);
		var div2 = dojo.create("div", {className: "lotusMeta", innerHTML: dateString}, td);
		
		return tr;
	},


	formatDate: function(dateString, allDay) {
		var date = lconn.calendar.CalendarUtil.dwaDateStringToDate(dateString);
		var result = lconn.core.DateUtil.toString(date, true);	// don't display time
		if (allDay == '1') 
			result += " (" + this._lang.ALL_DAY + ")"
		else 
			result += " " + lconn.core.DateUtil.getLocalizedTime(date);
		
		return result;
	},
	
	onSizeChange: function(height) {},   
	errorHandler: function() {},   
	
	prepareInstances: function(page) {
		this.showInstances(page);
	},
	
	_showHideNode: function(node, isShow) {
		if(this.type == 'follow') {
			node.innerHTML = this._lang.NO_UPCOMING_FOLLOWED;
		} else if(this.type == 'attend') {
			node.innerHTML = this._lang.NO_UPCOMING_ATTENDED;
		} else if(this.type == 'all') {
			node.innerHTML = this._lang.NO_UPCOMING_FOLLOWATTENDED;
		}
		
		var value = isShow ? "" : "none";
		node.style.display = value;
	}
});
