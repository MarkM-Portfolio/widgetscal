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

dojo.provide('lconn.calendar.UpcomingView');

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.require("lconn.calendar.CalendarUtil");
dojo.require("lconn.calendar.Lazy");
dojo.require("lconn.calendar.UIMessage");

dojo.require("lconn.core.DateUtil");
dojo.require("lconn.core.DialogUtil");
dojo.require("lconn.core.globalization.bidiUtil");

dojo.declare("lconn.calendar.UpcomingView", [dijit._Widget, dijit._Templated], 
{
	templateString: null,
	templatePath: dojo.moduleUrl('lconn.calendar', 'templates/upcomingView.html'),
	
	calendar: null,
	store: null,
	wid: null,
	isOwner: null,
	isMember: null,
	communityUrl: null,
	profilesUrl: null,
	homeUrl: null,
	dateUtil: null,
	util: null,
	blankGif: null,
	loadingGif: null,
	showDetails: false,
	showPast:false,
	
	connects: [],
	subscribes: [],
	
	postMixInProperties: function() {
		lconn.calendar.CalendarData.get().mixin(this);
		this.store = this.calendar.store;
		this.wid = this.calendar.iContext.widgetId;
		
		this.isMember = ("true" == this.calendar.userProfile.getItemValue('canContribute'));
		this.isOwner = ("true" == this.calendar.userProfile.getItemValue('canPersonalize'));
		if(!this.isOwner && window.canAddOthers) {
			this.isOwner = true;
			this.isMember = true;
		}
		
		this.communityUrl = this.calendar.commUrl;
		this.profilesUrl = this.calendar.profilesUrl;
		this.homeUrl = this.calendar.homeUrl + "#fullpageWidgetId=" + this.wid;
		
		this.profilesAvailable = !!this.profilesUrl;
		if (this.profilesAvailable)
			this.profilesPhotoUrl = this.calendar.profilesUrl + "/photo.do?userid=";
		
		this.dateUtil = lconn.core.DateUtil;
		this.util = lconn.calendar.CalendarUtil;
		
		this.defaultUserPhoto = this.calendar.rootUrl + "/images/calendar/photo.png";
		this.blankGif = dojo.config.blankGif;
		this.loadingGif = lconn.core.url.getServiceUrl(lconn.core.config.services.webresources) + "/web/com.ibm.lconn.core.styles.oneui3/images/loading.gif?etag=" + lconn.core.config.versionStamp;
	},
	
	postCreate: function() {
		// construct the action bar
		dojo.style(this.actionBar, 'display', 'none');
		if (this.isOwner || this.isMember) {
			lconn.calendar.Lazy.addOnLoad(['/lconn/calendar/preference'], this, function() {
				if (this.isOwner || (this.isMember && this.calendar.calendarInfo.members_Role == "1")) {
					dojo.style(this.actionBar, 'display', 'block');
					this.connects.push(dojo.connect(this.btnAddEvent, 'onclick', this, "add"));
				}
			}, false, !this.isOwner && !this.calendar.isVisitor);
		}
		
		// prepare paging
		this.preparePaging();
		
		// subscribe notify
		this.subscribes.push(dojo.subscribe(lconn.calendar.topic.notifySuccess, dojo.hitch(this, "onNotifySuccess")));
		
		// init a11y
		new lconn.core.aria.Toolbar("viewPickerToolbar");
		
		this.enter(true);
	},
	
	enter: function(load) {
		if (load) {
			this.load();
		}
		
		this.domNode.style.display = "block";
		// focus on the 'upcoming tab'
		try {
			//dojo.byId("listTab").focus();
		} catch(err) {
		}
	},
	
	exit: function(unload) {
		if (unload) {}
		
		this.domNode.style.display = "none";
	},
	
	destroy: function() {
		//disconnect handlers
		dojo.forEach(this.connects, dojo.disconnect);
		// un-subscribe listeners
		dojo.forEach(this.subscribes, dojo.unsubscribe);
		//cleanup widgets
		if (this.topPagingWidget) 
			this.topPagingWidget.destroyRecursive();
		this.topPagingWidget = null;
		
		if (this.bottomPagingWidget) 
			this.bottomPagingWidget.destroyRecursive();
		this.bottomPagingWidget = null;
		
		this.inherited(arguments);
	},

	eventsPerPage: 10,
	currentPage: 1,
	totalEvents: 0,
	
	preparePaging: function() {
		var pagingParam = {
			pageSize: this.eventsPerPage,
			_lang: this._lang,
			total: dojo.hitch(this, function() {
				return this.totalEvents;
			}),
			onPage: dojo.hitch(this, function(p) {
				this.currentPage = p;
				this.fetchEvents(new Date(), p, this.eventsPerPage);
			}),
			onPageSizeChange: dojo.hitch(this, function(ps) {
				this.eventsPerPage = ps;
				this.currentPage = 1;
				this.fetchEvents(new Date(), 1, ps);
			})
		};
		if (!this.topPagingWidget) {
			var param = dojo.mixin({features:["info", "list", "nav"]}, pagingParam);
			this.topPagingWidget = new lconn.calendar.Paging(param, this.topPagingAP);
		}
		if (!this.bottomPagingWidget) {
			var param = dojo.mixin({features:["nav", "ps", "jump"]}, pagingParam);
			this.bottomPagingWidget = new lconn.calendar.Paging(param, this.bottomPagingAP);
		}
	},
	
	load: function() {
		// setup the iCal feed link
			
		// Remove the hint dialog per defect: https://jira.cwp.pnp-hcl.com/browse/CNXINFRA-473 
                this.feedLink.href = this.calendar.feedUrl.replace(/^http/,'webcal');
                this.feedLink.target = "_blank";
                this.feedLink.rel = "nofollow noopener noreferrer"; 
	
		// setup the showDetails
		var sd = dojo.cookie("lconn.calendar.upcomingViewType");
		if (sd) // false by default
			this.showDetails = ("detail" == sd ? true : false);

		
		// setup the table
		this.fetchEvents(new Date(), this.currentPage, this.eventsPerPage);
		
		// setup the toggle detail icons
		this.layoutToggleDetail(this.showDetails);
		this.layoutToggleShowPastEvents(this.showPast, true);
	},
	
	fetchEvents: function(start, page, ps) {
		if (this.showPast) {
			this.store.pagingQuery(start, page, ps, "foo", "desc", "true",dojo.hitch(this, "layoutTable"));
		}
		else {
			this.store.pagingQuery(start, page, ps, "foo", "desc", "false",dojo.hitch(this, "layoutTable"));
		}
	},
	
	layoutTable: function(events, total) {
		// show loading
		this.loadingAP.style.display = "";
		this.table.style.display = "none";
		
		// hide the empty content message
		this.emptyCalendarMessageAP.style.display = 'none';
		
		// update the table contents
		this.clearTable();
		var currentSectionDate = null;
		var trIndex = 0;
		for (var i=0, l=events.length; i<l; i++) {
			var event = events[i];
			var start = this.util.dwaDateStringToDate(event.startDateTime);
			// layout the event entry
			var headerParams = {entry: event, showDetail:this.showDetails};
			this._formatHeaderTr(trIndex++, headerParams);
			var detailParams = {entry: event, isShow: this.showDetails};
			this._formatDetailTr(trIndex++, detailParams);
		}
		
		// update the table paging
		this.totalEvents = total;
		this.topPagingWidget.update(this.currentPage, this.eventsPerPage);
		this.bottomPagingWidget.update(this.currentPage, this.eventsPerPage);
		
		// show table
		this.loadingAP.style.display = "none";
		this.table.style.display = "";
		
		// display empty content message, if no content available to display
		if(total == 0) {
			if(this.showPast) {
				this.emptyCalendarMessageAP.innerHTML = this._lang.NO_PAST_EVENTS_MSG;
			} else {
				this.emptyCalendarMessageAP.innerHTML = this._lang.NO_UPCOMING_EVENTS_MSG;
			}
			this.emptyCalendarMessageAP.style.display = '';
		}
		
		// live texts
		if(SemTagSvc) {
			SemTagSvc.parseDom(null, this.table);
		}
		
		// Bidi support
    	lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
	},
	
	clearTable: function() {
		for(var i=this.table.rows.length; i>0; i--) {
			this.table.deleteRow(i-1);
		} 
	},
	
	_sameDay: function(day1, day2) {
		if (!day1 || !day2) return true;
		return !(this.dateUtil.getLocalizedDate(day1) == this.dateUtil.getLocalizedDate(day2));
	},
	
	add: function() {
		this.util.setHashParams(["mode","stamp"], ["create", (new Date()).getTime()]);
	},
	
	edit: function(evt){
		dojo.stopEvent(evt);
		var unid = dojo.attr(evt.target, "unid");
		var id = (unid.match(/^.*:([^:]*)$/))[1];
		this.util.setHashParams(["eventInstUuid","mode","previous","stamp"], 
				[id,"edit","list",(new Date()).getTime()]);
	},
	
	'delete': function(evt){
		dojo.stopEvent(evt);
		var unid = dojo.attr(evt.target, "unid");
		var f = dojo.hitch(this.calendar, "deleteEvent");
		this.calendar.store.getItem(unid, f, undefined, dojo.hitch(this.calendar, function(){
			this.showMessage(this._lang.EVENT_DELETE_ERROR, lconn.calendar.UIMessage.msgType.ERROR);
			this.reloadCalendar();
		}));
		dojo.publish(lconn.calendar.topic.clearMessage);
	},
	
	showDetail: function(evt) {
		dojo.stopEvent(evt);
		this._showhide(evt.currentTarget, true);
	},
	
	hideDetail: function(evt) {
		dojo.stopEvent(evt);
		this._showhide(evt.currentTarget, false);
	},
	
	_showhide: function(a, isShow) {
		var unid = dojo.attr(a, "unid");
		if (isShow)
			dojo.removeClass(dojo.byId(this._detailTdId(unid)), "lotusHidden");
		else
			dojo.addClass(dojo.byId(this._detailTdId(unid)), "lotusHidden");
		
		var td = a.parentNode;
		dojo.destroy(a);
		var newA = this._formatShowHideA(!isShow, unid)
		td.appendChild(newA);
		// set focus to A again
		newA.focus();
	},
	
	_viewSummary: function(evt) {
		dojo.stopEvent(evt);
		this.toggleDetails(false);
	},
	
	_viewDetails: function(evt) {
		dojo.stopEvent(evt);
		this.toggleDetails(true);
	},

	toggleDetails: function(showDetails) {
		if (this.showDetails != showDetails) {
			this.showDetails = showDetails;
			this.layoutToggleDetail(this.showDetails);
			// setup the table
			this.fetchEvents(new Date(), this.currentPage, this.eventsPerPage);
		}
	},
	
	layoutToggleDetail: function(showDetails) {
		if (showDetails) {
			dojo.removeClass(this.viewDetails, "lotusDetailsOff");
			dojo.addClass(this.viewDetails, "lotusDetailsOn");
			dojo.addClass(this.viewDetails, "lotusSelected");
			dojo.attr(this.viewDetails, "aria-disabled", "true");
			dojo.removeClass(this.viewSummary, "lotusSummaryOn");
			dojo.removeClass(this.viewSummary, "lotusSelected");
			dojo.addClass(this.viewSummary, "lotusSummaryOff");
			dojo.attr(this.viewSummary, "aria-disabled", "false");
			dojo.cookie("lconn.calendar.upcomingViewType", "detail");
		} else {
			dojo.removeClass(this.viewDetails, "lotusDetailsOn");
			dojo.removeClass(this.viewDetails, "lotusSelected");
			dojo.addClass(this.viewDetails, "lotusDetailsOff");
			dojo.attr(this.viewDetails, "aria-disabled", "false");
			dojo.removeClass(this.viewSummary, "lotusSummaryOff");
			dojo.addClass(this.viewSummary, "lotusSummaryOn");
			dojo.addClass(this.viewSummary, "lotusSelected");
			dojo.attr(this.viewSummary, "aria-disabled", "true");
			dojo.cookie("lconn.calendar.upcomingViewType", "summary");
		}
	},
	_showPastEvents: function(evt) {
		dojo.stopEvent(evt);
		this.toggleShowPastEvents(true);
	},
	
	_showUpcomingEvents: function(evt) {
		dojo.stopEvent(evt);
		this.toggleShowPastEvents(false);
	},
	
	toggleShowPastEvents: function(showPast) {
		if (this.showPast != showPast) {
			this.showPast = showPast;
			this.layoutToggleShowPastEvents(this.showPast);
			// setup the table
			this.currentPage = 1;
			this.fetchEvents(new Date(), this.currentPage, this.eventsPerPage);
		}
	},
	layoutToggleShowPastEvents: function(showPast, bfirst) {
		if (showPast) {
			this.showUpcomingEvents.style.display = '';
			this.showPastEvents.style.display = 'none';
			if(!bfirst)
				this.showUpcomingEventsLink.focus();
		} else {
			this.showPastEvents.style.display = '';
			this.showUpcomingEvents.style.display = 'none';
			if(!bfirst)
				this.showPastEventsLink.focus();
		}
	},
	
	notify: function(evt) {
		dojo.stopEvent(evt);
		var unid = dojo.attr(evt.target, "unid");
		this.clickedNotifyLink = evt.target;
		var f = dojo.hitch(this, "_notify");
		this.calendar.store.getItem(unid, f, undefined, dojo.hitch(this.calendar, function(){
			this.showMessage(this._lang.EVENT_OPEN_ERR_NOTFOUND, lconn.calendar.UIMessage.msgType.ERROR);
			this.reloadCalendar();
		}));
		dojo.publish(lconn.calendar.topic.clearMessage);
	},
	
	_notify: function(entry) {
		if(this.calendar.isMember) {
			var notifyDialog = new lconn.calendar.NotificationDialog(
					this.calendar, entry.uuid, "listView", "dialog", this.clickedNotifyLink);
			notifyDialog.show();
		}
	},
	
	onNotifySuccess: function(handleSuccessView) {
		if (handleSuccessView == "listView") {
			var msg = this._lang.NOTIFY_SUCCESS;
			dojo.publish(lconn.calendar.topic.showMessage, [msg,lconn.calendar.UIMessage.msgType.CONFIRM]);
		}
	},
	
	_formatHeaderTr: function(index, params) {
		var entry = params.entry;
		
		var tr = this.table.insertRow(index);
		dojo.attr(tr, "id", this._headerTdId(entry.unid));
		
		var cellIdx = 0;
		
		//if(this.calendar.customEventIcon) {
			var td0 = tr.insertCell(cellIdx);
			td0.className = "lotusFirstCell";
			if(entry.authorStatus == "inactive") {
				dojo.addClass(td0,"lotusDim");
			}
			
			var imageUrl = entry.imageUrl;
			if (this._noImage(imageUrl)) {
				imageUrl = this.getUserPhotoUrl(entry.authorId);
			}
			dojo.create("img", {"class": "usersRadius" , alt:"", src:imageUrl, role:"presentation"}, td0);
			cellIdx++;
		//}
		
		var td1 = tr.insertCell(cellIdx);
		var h4 = dojo.create("h4", {className:"lotusTitle"}, td1);
		var span = dojo.create("span",{
            id : entry.unid + "_description",
            style : {display:"none"},
        }, h4);
		var href = this.homeUrl + "&eventInstUuid=" + (entry.unid.match(/^.*:([^:]*)$/))[1];
		var a = dojo.create("a", {href:href, className:"bidiAware", innerHTML:this.util.escapeForXSS(entry.subject), unid:entry.unid}, h4);
		if(entry.location != "") {
	        span.innerHTML = dojo.string.substitute(this._lang.LINK_OPEN_INFO, [lconn.core.HTMLUtil.escapeText(entry.subject),this.formatDate(entry.startDateTime, entry.allDay),lconn.core.HTMLUtil.escapeText(entry.location)]);
            a.setAttribute('aria-label', dojo.string.substitute(this._lang.LINK_OPEN_INFO, [entry.subject, this.formatDate(entry.startDateTime, entry.allDay), entry.location]));
	    } else {
	        span.innerHTML = dojo.string.substitute(this._lang.LINK_OPEN_INFO_NOLOCATION, [lconn.core.HTMLUtil.escapeText(entry.subject),this.formatDate(entry.startDateTime, entry.allDay)]);
            a.setAttribute('aria-label', dojo.string.substitute(this._lang.LINK_OPEN_INFO_NOLOCATION, [entry.subject,this.formatDate(entry.startDateTime, entry.allDay)]));
        }
	    a.setAttribute("aria-labelledby", entry.unid+"_description");
		cellIdx++;
		
		var div = dojo.create("div", {className:"lotusMeta"}, td1);
		var ul = dojo.create("ul", {className:"lotusInlinelist"}, div);
		
		var allday = (entry.allDay===true || entry.allDay=="1") ? true : false;
		if (allday) {
			var start = this.util.dwaDateStringToDate(entry.startDateTime);
			if(entry.repeats == "true") {
				s = dojo.string.substitute(this._lang.DATE_ALL_DAY, [this.dateUtil.toString(start,true), this._lang.ALL_DAY]) 
						+ "&nbsp;&nbsp;" + this._lang.REPEATS_FLAG;
			} else {
				s = dojo.string.substitute(this._lang.DATE_ALL_DAY, [this.dateUtil.toString(start,true), this._lang.ALL_DAY]);
			}
			dojo.create("li", {className:"lotusFirst", innerHTML:s}, ul);
		} else {
			var start = this.util.dwaDateStringToDate(entry.startDateTime);
			var startTimeStr = this.dateUtil.getLocalizedTime(this.util.dwaDateStringToDate(entry.startDateTime));
			var endTimeStr = this.dateUtil.getLocalizedTime(this.util.dwaDateStringToDate(entry.endDateTime));
			var timeStr = dojo.string.substitute(this._lang.DURATION_SPAN, [startTimeStr, endTimeStr]);
			var datetime = dojo.string.substitute(this._lang.AT, [this.dateUtil.toString(start,true), timeStr]);
			if(entry.repeats == "true") {
				datetime = datetime + "&nbsp;&nbsp;" + this._lang.REPEATS_FLAG;
			}
			dojo.create("li", {className:"lotusFirst", innerHTML:datetime}, ul);
		}
		
		var person = this._formatPersonSpan(entry.authorName, entry.authorId);
		var hostStr = dojo.string.substitute(this._lang.CREATED_BY, [person]);
		dojo.create("li", {innerHTML:hostStr}, ul);

		// https://jira.cwp.pnp-hcl.com/browse/COMMUNITY-147
		var _updatedDay = this.util.dwaDateStringToDate(entry.updatedTime);
		_updatedDay = _updatedDay.setHours(0, 0, 0, 0);
		var _today = new Date(Date.now()).setHours(0,0,0,0);
		var _tomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24).setHours(0,0,0,0);
		var t = null;
		var isTodayOrTomorrow = (_updatedDay == _today || _updatedDay == _tomorrow);
		if (entry.updatedTime == entry.createdTime) {
			t = isTodayOrTomorrow ? this._lang.CREATED_ON_TODAY_OR_TOMORROW : this._lang.CREATED_ON;
		} else {
			t = isTodayOrTomorrow ? this._lang.UPDATED_ON_TODAY_OR_TOMORROW : this._lang.UPDATED_ON;
		}
		
		var on = this.dateUtil.toString(this.util.dwaDateStringToDate(entry.updatedTime));
		dojo.create("li", {innerHTML: dojo.string.substitute(t, [on])}, ul);
		
		if (entry.tags && entry.tags.length > 0) {
			var li = dojo.create("li", {className:"lotusTags"}, ul);
			var span = dojo.create("span", {role:"list"}, li);
			span.appendChild(document.createTextNode(this._lang.TAGS));
			for (var i=0, l=entry.tags.length; i<l; i++) {
				var tag = entry.tags[i];
				var href = this.homeUrl + "&tags=" + encodeURIComponent(tag);
				var listitemEL = dojo.create("span", {role:"listitem"}, span);
				dojo.create("a", {className:"bidiAware", href:href, innerHTML:this.util.escapeForXSS(tag)}, listitemEL);
				if (i < l-1)
                	listitemEL.appendChild(document.createTextNode(", "))
			}
		}
		if (!(!entry.location || entry.location == "")) {
			var locationStr = this._lang.LOCATION+lconn.core.globalization.bidiUtil.enforceTextDirection(entry.location);
			dojo.create("li", {innerHTML:this.util.escapeForXSS(locationStr)}, ul);
		}
		
		var td2 = tr.insertCell(cellIdx);
		td2.className =  "lotusAlignRight lotusLastCell";
		td2.appendChild(this._formatShowHideA(!params.showDetail, entry.unid));
		
		return tr;
	},
	
	_formatDetailTr: function(index, params) {
		var entry = params.entry;
		
		var tr = this.table.insertRow(index);
		tr.className = "lotusDetail";
		dojo.attr(tr, "id", this._detailTdId(entry.unid));
		
		if (params.isShow) {
			dojo.attr(tr, "aria-hidden", false);
			dojo.removeClass(tr, "lotusHidden");
		} else {
			dojo.attr(tr, "aria-hidden", true);
			dojo.addClass(tr, "lotusHidden");
		}
		
		var cellIdx = 0;
		
		//if(this.calendar.customEventIcon) {
			var td0 = tr.insertCell(cellIdx);
			td0.className = "lotusFirstCell";
			cellIdx++;
		//}
		
		var td1 = tr.insertCell(cellIdx);
		cellIdx++;
		td1.className = "lotusLastCell";
		dojo.attr(td1, "colspan", 2);
		
		var desc = this._noDesc(entry.description) ? this._lang.NO_DESCRIPTION : entry.description;
		dojo.create("p", {className:"bidiAware", innerHTML:desc}, td1);
		
		var div = dojo.create("div", {className:"lotusChunk"}, td1);
		var ul = dojo.create("ul", {className:"lotusInlinelist lotusLeft lotusActions"}, td1);
		
		var isFirst = false;
		if (this._canEditDelete(entry)) {
			var li1 = dojo.create("li", {}, ul);
			if (!isFirst) {
				isFirst = true;
				dojo.addClass(li1, "lotusFirst");
			}
			dojo.create("a", {role:"button", href:"javascript:;", unid:entry.unid,
				innerHTML:this._lang.EDIT, onclick:dojo.hitch(this, "edit")}, li1);
			
			var li2 = dojo.create("li", {}, ul);
			dojo.create("a", {role:"button", href:"javascript:;", unid:entry.unid,
				innerHTML:this._lang.DELETE, onclick:dojo.hitch(this, "delete")}, li2);
		}
		
		if (this._canNotify()) {
			var li3 = dojo.create("li", {}, ul);
			if (!isFirst) {
				isFirst = true;
				dojo.addClass(li3, "lotusFirst");
			}
			dojo.create("a", {role:"button", href:"javascript:;", unid:entry.unid,
				innerHTML:this._lang.NOTIFY, onclick:dojo.hitch(this, "notify")}, li3);
		}
		
		return tr;
	},
	
	_formatPersonSpan: function(name, uuid) {
		return lconn.calendar.PeoplelinkUtil.formatPersonLink({userid:uuid, name:name}, true);
	},
	
	_formatShowHideA: function(isShow, unid) {
		var title = isShow ? this._lang.SHOW_DETAILS : this._lang.HIDE_DETAILS;
		var iconClass = isShow ? "lotusIconShow" : "lotusIconHide";
		var fuc = isShow ? dojo.hitch(this, "showDetail") : dojo.hitch(this, "hideDetail");
		var expanded = isShow ? "false" : "true";
		
		var a = dojo.create("a", {title:title, unid:unid, href:"javascript:;", className:"lotusAction",
			"aria-controls":this._detailTdId(unid), "aria-expanded":expanded, role:"button", onclick:fuc});
		dojo.create("img", {"aria-label":title, alt:"", src:this.blankGif, className:"lotusIcon16 "+iconClass}, a);
		dojo.create("span", {className:"lotusAltText", innerHTML:title}, a);
		
		return a;
	},
	
	_noDesc: function(desc) {
		return (desc == "&nbsp;");
	},
	
	_noImage: function(imageUrl) {
		return (imageUrl == "");
	},
	
	_headerTdId: function(unid) {
		return unid + "_header";
	},
	
	_detailTdId: function(unid) {
		return unid + "_detail";
	},
	
	_showHideLinkId: function(unid) {
		return unid + "_showhide";
	},
	
	_canEditDelete: function(event) {
		var isAuthor = (this.calendar.isAuthorRole && this.calendar.userProfile.getItemValue("userId") == event.authorId);
		return (isAuthor || this.isOwner);
	},

	_canNotify: function() {
		return this.isMember;
	},
	getUserPhotoUrl: function(userId){
		var imageUrl;
		if(lconn.calendar.CalendarUtil.isSmartCloud()) {
			imageUrl = com.ibm.lconn.layout.people.getImageUrl({id:userId});
			if(imageUrl == null) {
            	imageUrl = this.defaultUserPhoto;
            }
		} else if(this.profilesAvailable){
			imageUrl = this.profilesPhotoUrl + userId;
		} else {
			imageUrl = this.defaultUserPhoto;
		}
		return imageUrl;
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
