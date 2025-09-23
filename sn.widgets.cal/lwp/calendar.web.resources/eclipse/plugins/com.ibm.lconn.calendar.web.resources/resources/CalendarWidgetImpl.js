/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2017                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
(function lconn_calendar_CalendarWidgetImpl() {

	dojo.provide("lconn.calendar.CalendarWidgetImpl");
	dojo.provide("lconn.calendar.CalendarWidget");
	
	dojo.require('lconn.calendar.CalendarStore');
	dojo.require('lconn.calendar.SmallCalendarList');
	
	dojo.require('lconn.calendar.UIMessage');
	dojo.require('lconn.calendar.UpcomingView');
	dojo.require('lconn.calendar.WidgetTagcloud');
	dojo.require('lconn.calendar.Lazy');
	
	dojo.require('lconn.core.DialogUtil');
	dojo.require('lconn.core.aria.Toolbar');
	dojo.require('lconn.core.DateUtil');
	dojo.require('lconn.core.HTMLUtil');
	dojo.require('lconn.core.config.properties');
	
	dojo.extend(lconn.calendar.CalendarWidget, {
		resourceId: null,
		attributesItemSet: null,
		userProfile: null,
		viewRef: null,
		listView: null,
		gridView: null,
		calendarInfo: null,
		viewer: null,
		editor: null,
		deleteDialog: null,
		tagcloud: null,
		store: null,
		preferenceUrl: null,
		homeUrl: null,
		rootUrl: null,
		feedUrl: null,
		commUrl: null,
		profilesUrl: null,
		currentView: null,
		customEventIcon: false,
		isBidi:false,
		isOwner: false,
		isMember: false,
		isVisitor: true,
		isExternalVistor: true,
		isAuthorRole: false,
		isLogin: false,
		connects: [],
		
		// history
		currentHash: {},
		clearMessageOnHashChange: true,
		
		loadStylesheet: function(href) {
			if(!window.__calendar_widget_css_loaded) {
				window.__calendar_widget_css_loaded = [];
			}
			for(var i = 0; i < window.__calendar_widget_css_loaded.length; i++) {
				if(window.__calendar_widget_css_loaded[i] == href) {
					return;
				}
			}
			window.__calendar_widget_css_loaded.push(href);
			
			if(this.version) {
				href = href + "?version=" + this.version;
			}
			var sheet = document.createElement('link');
			sheet.type = 'text/css';
			sheet.rel = 'stylesheet';
			//sheet.media = 'screen';
			sheet.href = href;
			document.getElementsByTagName('head')[0].appendChild(sheet);
		},
	
		/**
		 * Called by iWidget framework before rendering the widget.
		 * Load and initialize all the calendar data and resources here.
		 */
		onLoad: function(){
			this.onUnload();
			
			lconn.calendar.isSmartCloud = (!!lconn.core.config.properties.LotusLive && lconn.core.config.properties.LotusLive == "true");
			this.isBidi = dojo.indexOf(['he', 'iw', 'ar'], dojoLocale)> -1 ? true : false;
			this.attributesItemSet = this.iContext.getiWidgetAttributes();
			this.resourceId = this.attributesItemSet.getItemValue("resourceId");
			this.userProfile = this.iContext.getUserProfile();
			this.isMember = ("true" == this.userProfile.getItemValue('canContribute'));
			this.isOwner = ("true" == this.userProfile.getItemValue('canPersonalize'));
			if(!this.isOwner && window.canAddOthers) {
				this.isOwner = true;
				this.isMember = true;
			}
			this.isVisitor = !this.isMember && !this.isOwner;
			this.isExternalVistor = (typeof communityActionData != 'undefined' && !!communityActionData.isVisitor) || (this.userProfile.getItemValue('users.can.follow.content') != undefined && "true" != this.userProfile.getItemValue('users.can.follow.content'));
			this.isLogin = !!this.userProfile.getItemValue("userId");
			if (lconn.core.config.services.profiles) this.profilesUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.profiles).uri;
			this.commUrl = this.iContext.io.rewriteURI(
					this.attributesItemSet.getItemValue("communitiesBaseUrl"));
			this.homeUrl = this.commUrl + "/service/html/communityview?communityUuid=" + this.resourceId;
			this.rootUrl = this.iContext.io.rewriteURI(this.attributesItemSet.getItemValue("calendarRoot"));
			this.preferenceUrl = this.rootUrl + "/atom_form/calendar" + "?calendarUuid=" + this.resourceId;
			this.feedUrl = this.rootUrl + '/ical/calendar?calendarUuid=' + this.resourceId;
			this.wid = this.iContext.widgetId;
			this.customEventIcon = ("true" == this.attributesItemSet.getItemValue("customEventIcon"));
			
			this.version = this.attributesItemSet.getItemValue("version");
			
			var baseJsUrl = this.rootUrl + "/static/" + this.version + "/javascript";
			
			BLANK_GIF_URL = dojo.config.blankGif;
			
			dojo.setObject('cal.lw.config.baseUri', this.commUrl + "/");
			
			dojo.isWebKit = dojo.isSafari;
			if(!dojo.isWebKit && dojo.isChrome) {
				dojo.isWebKit = dojo.isChrome;
			}
	
			lconn.calendar.CalendarData.get().mixin(this);
			
			// for easy access
			lconn.calendar.CalendarData.data.commUrl = this.commUrl;
			
			// init the SessionStorage
			lconn.calendar.SessionStorage.init(this.userProfile.getItemValue("userId"));
			
			// default full page view
			this.currentView = this.attributesItemSet.getItemValue("defaultView");
			
			//initialize the data store					
			this.store = new lconn.calendar.CalendarStore({
				url: this.rootUrl + '/atom_form/calendar/event',
				commentUrl: this.rootUrl + '/atom_form/calendar/event/comment',
				attendeeUrl: this.rootUrl + '/atom_form/calendar/event/attendees',
				followUrl: this.rootUrl + '/atom_form/follow',
				uuid: this.resourceId,
				userId: this.userProfile.getItemValue("userId")
			});
			this.store._calendar = this;
			dojo.connect(this.store, 'errorHandler', this, "_handleError");
			
			// membership, rolemapping, permission info. Lazy load...
			this.calendarInfo = {'members_Role':'0', 'allowComment':'none'};
			this.isAuthorRole = (this.isOwner || (this.isMember && this.calendarInfo.members_Role == '1'));
			lconn.calendar.Lazy.register('/lconn/calendar/preference', this, function(sync, onload){
				//get calendar settings
				dojo.xhrGet({
								url: this.preferenceUrl,
								headers: {
									"X-CALENDAR-MEMBERSHIP": (this.isOwner ? "OWNER" : (this.isMember ? "MEMBER" : "NONE"))
								},
								handleAs: "xml",
								preventCache: true,
								sync: sync,
								load: dojo.hitch(this, function(data){
									var node = function(tag, root, all) { return lconn.calendar.xml.tagNode(tag, root || data, all); };
									var value = function(tag, root) { return lconn.calendar.xml.tagValue(tag, root || data); };
									
									var maprole = value('snx:maprole');
									var allowComment = value('snx:allowComment');
									this.calendarInfo = {'members_Role' : (maprole == 'reader' ? '0' : '1'), 'allowComment' : allowComment};
									this.isAuthorRole = (this.isOwner || (this.isMember && this.calendarInfo.members_Role == '1'));
									
									onload();
								}),
								error: dojo.hitch(this, "_handleError")
							});
			});
			
			//get widget mode
			var mode = this.iContext.getiDescriptor().getItemValue("mode");
			
			// hash
			var t = dojo.hash();
			if(t.indexOf('fullpageWidgetId%3D') == 0) {
				t = 'fullpageWidgetId=' + t.substring('fullpageWidgetId%3D'.length);
				// if fullPageWidgetId exists, then we are in fullpage mode
				mode = 'fullpage';
			} 
			this.currentHash = dojo.queryToObject(t);
			
			/*BUG: Currently there seems to be a bug in Communities code that sets the mode to "view" instead of "edit", when Edit Community is opened.
			  So, we need to detect the edit mode by the presence of the editCommunityForm.
			*/
			if(mode == 'view')
			{
				var f = dojo.byId("editCommunityForm");
				if(f != null && dojo.style(f, 'display') != 'none')
				{ 
					mode = 'edit';
				}	
			}
	
			switch(mode) {
				case 'fullpage':
					dojo.addOnLoad(dojo.hitch(this,function(){
						this._fullpageMode();
					}));
					break;
				case 'search':
					dojo.addOnLoad(dojo.hitch(this,function(){
						lconn.core.widgetUtils.search(this.iContext, "calendar" ,dojo.byId('calendar_searchResultContainer'));
					}));
					break;
				case 'edit':
					// will be handled in onEdit
					break;
				default: 
					dojo.addOnLoad(dojo.hitch(this,function(){
						this._viewMode();
					}));
			}
		},
	
		onEdit: function() {
			var t = dojo.query("#editCommunityForm");
			if((t.length == 0 || t[0].style.display == 'none') && window.location.href.indexOf("/service/html/communityedit") == -1) {
				window.location.href = this.commUrl + "/service/html/communityedit?communityUuid=" + this.resourceId + "&tabinst=" +this.wid;
				return;
			}
			this._editMode();
		},
		
		/**
		 * Called by iWidget framework before the widget is destroyed.
		 * Perform all the local cleanups here.
		 */
		onUnload: function(){
			
			//disconnect handlers
			dojo.forEach(this.connects, dojo.disconnect);
			
			//clear ajax callbacks
			lconn.calendar.Lazy.reset();
			
			//cleanup widgets
			
			if(this._calendarViewsTemplateWidget) {
				this._calendarViewsTemplateWidget.destroyRecursive();
			}
			
			if(this.tagcloud) {
				this.tagcloud.destroyRecursive();
			}
			this.tagcloud = null;
	
			if(this.viewRef && this.viewRef.destroyRecursive)
			{
				this.viewRef.destroyRecursive();
			}
			this.viewRef = null;
	
			var widget = dijit.byId("calendar_event_viewer");
			this.viewer = null;
			if(widget){
			 widget.destroyRecursive();
			 widget = null;
			} 
			
			widget = dijit.byId("calendar_event_editor");
			this.editor = null;
			if(widget){
			 widget.destroyRecursive();
			 widget = null;
			} 
			
			widget = dijit.byId(this.resourceId + "_listView");
			this.listView = null;
			if(widget){
			 widget.destroyRecursive();
			 widget = null;
			} 
			
			widget = dijit.byId(this.resourceId + "_gridView");
			this.gridView = null;
			if(widget){
			 widget.destroyRecursive();
			 widget = null;
			} 
			
			if (this.msgWidget) 
				this.msgWidget.destroy();
			
			dojo.unsubscribe(this.showMessageHandler);
			dojo.unsubscribe(this.clearMessageHandler);
			dojo.unsubscribe(this.hashHandler);
			
			//cleanup data store
			if(this.store)
			{
				delete this.store;
				this.store = null;
			}
			
			// other clearup work
			this.currentHash = {};
		},
		
		/**
		 * Called by iWidget framework before exiting 'edit' mode. 
		 * Use this method to change the mode back to 'view'
		 */ 
		exitEditUI: function(controlObj) {
			this.iContext.iEvents.fireEvent("onModeChanged", "json", "{'newMode': 'view'}");
		},
	
		/**
		 * In this mode, the widget renders a mini calendar
		 */
		_viewMode: function() {
			if(!this.iContext.getiWidgetAttributes().getItemValue("widgetTitle")) {
				// if the widget title is not customized, show the default title.
				dojo.byId(this.wid + "Id").innerHTML = this._lang.UPCOMING_EVENTS;
			}
			
			this.loadStylesheet(this.rootUrl + (this.isBidi?'/stylesheet/calendar/minicalendarRTL.css':'/stylesheet/calendar/minicalendar.css'));
			var container = this.iContext.getElementById('miniCalendar');
			
			if(!this.viewRef) {
				this.viewRef = new lconn.calendar.SmallCalendarList({calendar: this}, container);
			}
		},
	
		/**
		 * In this mode, the calendar provides upcoming events list and iNotes calendar views
		 */
		_fullpageMode: function() {
			var t = dojo.hash();
			if(t.indexOf('fullpageWidgetId%3D') == 0) {
				t = 'fullpageWidgetId=' + t.substring('fullpageWidgetId%3D'.length);
			} 
			var hashObj = dojo.queryToObject(t);
			
			var viewContainer = this.iContext.getElementById('calendarViews');
			this._calendarViewsTemplateWidget = new lconn.calendar._widgetImpl._CalendarViews({_lang: this._lang}, viewContainer);
			
			
			this._setupTagCloud(hashObj["tags"]);
			
			if(!window.__calendar_widget_fullpage_css_loaded) {
				window.__calendar_widget_fullpage_css_loaded = true;
				this.loadStylesheet(this.rootUrl + (this.isBidi?'/stylesheet/calendar/calendarRTL.css':'/stylesheet/calendar/calendar.css'));
				this.loadStylesheet(dojo.moduleUrl("dwa","themes/lotusui30dojo/combined.css"));
				this.loadStylesheet(dojo.moduleUrl("com.ibm.oneui3.styles","dojoTheme/lotusui30dojo/TimePicker.css"));
			}
			
			net.jazz.ajax.xdloader.load_async('lconn.calendar.calendarApp', dojo.hitch(this, function(){
				this.msgWidget = new lconn.calendar.UIMessage(
						{_lang: lconn.calendar.CalendarData.get()._lang, commUrl: this.commUrl}, 
						this.iContext.getElementById("calendar_message_area"));
				this.showMessageHandler = dojo.subscribe(lconn.calendar.topic.showMessage, dojo.hitch(this, "showMessage"));
				this.clearMessageHandler = dojo.subscribe(lconn.calendar.topic.clearMessage, dojo.hitch(this, "clearMessage"));
				
				this.hashHandler = dojo.subscribe("/dojo/hashchange", dojo.hitch(this, "onHashChange"));
				
				this.connects.push(dojo.connect(this.iContext.getElementById("listTab"), "onclick", this, "_switchTab"));
				this.connects.push(dojo.connect(this.iContext.getElementById("gridTab"), "onclick", this, "_switchTab"));
				
				this._setupTabs();													
				
				new lconn.core.aria.Toolbar("calendar_view_tabs");
				
				// direct to correct view according to the URL hash
				var instId = hashObj["eventInstUuid"];
				var eventId = hashObj["eventUuid"];
				if (instId) {
					var mode = hashObj["mode"];
					if (mode=="edit") {
						var previousView = hashObj["previous"];
						this.store.getItem("urn:lsid:ibm.com:calendar:event:" + instId, dojo.hitch(this, function(entry){
							this.editEvent(entry, function() {
								if (previousView == "detail")
									lconn.calendar.CalendarUtil.removeHashParams(["mode","previous","stamp"]);
								else {	// list || grid || null
									if (previousView == "list" || previousView == "grid")
										this.currentView = previousView;
									lconn.calendar.CalendarUtil.removeHashParams(["eventInstUuid","mode","previous","stamp"]);
								}
							});
						}), {mode: 'full'}, dojo.hitch(this, function(){
							this.clearMessage();
							this.showMessage(this._lang.EVENT_OPEN_ERR_NOTFOUND, lconn.calendar.UIMessage.msgType.ERROR);
							this.clearMessageOnHashChange = false;
							
							if (previousView == "grid" || previousView == "list")
								this.currentView = previousView;
							lconn.calendar.CalendarUtil.removeHashParams(["mode","time","previous","eventInstUuid","stamp"]);
							this.reloadCalendar();
						}));
					} else {
						this.store.getItem("urn:lsid:ibm.com:calendar:event:" + instId, dojo.hitch(this, "viewEvent"), null, dojo.hitch(this, function(){
							this.clearMessage();
							this.showMessage(this._lang.EVENT_OPEN_ERR_NOTFOUND, lconn.calendar.UIMessage.msgType.ERROR);
							this.clearMessageOnHashChange = false;
							
							if (previousView == "grid" || previousView == "list")
								this.currentView = previousView;
							lconn.calendar.CalendarUtil.removeHashParams(["mode","time","previous","eventInstUuid","stamp"]);
							this.reloadCalendar();
						}));
					}
				} else if (eventId) {	// direct to the first instance
					this.store.getEventInstances(eventId, dojo.hitch(this, function(instances) {
						if (instances.length > 0) {
							// go to the first instance
							var firstInst = instances[0];
							var id = (firstInst.unid.match(/^.*:([^:]*)$/))[1];
							lconn.calendar.CalendarUtil.replaceHashParam("eventUuid", "eventInstUuid", id);
						} else {	
							// to the upcoming view
							lconn.calendar.CalendarUtil.removeHashParam("eventUuid");
						}
					}));
				} else {
					var mode = hashObj["mode"];
					if (mode == "create") {
						var time = hashObj["time"];
						if (time) {
							var d = new Date();
							d.setTime(parseInt(time));
							this.createEvent(d);
						} else {
							this.createEvent();
						}
					} else {
						if(hashObj["tags"]) {
							this.store.tags = hashObj["tags"];
							this.feedUrl = this.rootUrl + '/ical/calendar?calendarUuid=' + this.resourceId + '&tags=' + encodeURIComponent(hashObj["tags"]);
							this._setupFilterIndicators(hashObj["tags"]);
						} else {
							delete this.store.tags;
							this.feedUrl = this.rootUrl + '/ical/calendar?calendarUuid=' + this.resourceId;
							this._setupFilterIndicators(false);
						}
						
						if(this.currentView == 'list') {
							this._listView();
						} else if(this.currentView == 'grid') {
							this._gridView();
						}
					}
				}
				
				dojo.byId('calendar_loading_hint').style.display = 'none';
			}));  
		},
		
		_initEventEditorForm: function() {
			if(!this.editor){
				this.editor = new lconn.calendar.EditorView({	
																baseUrl: this.rootUrl,
																calendar: this,
																store: this.store,
																style: "display: none"
															 }, this.iContext.getElementById('calendar_event_editor')); 
			} 
			
			if (this.isOwner || this.isAuthorRole) 
			{
				this.editor.deleteAction = dojo.hitch(this, "deleteEvent");
				this.editor.postSubmitAction = dojo.hitch(this, function() {
					var previousView = lconn.calendar.CalendarUtil.getHashParam("previous");
					if (previousView == "detail") {
						lconn.calendar.CalendarUtil.removeHashParams(["mode","time","previous","stamp"]);
						this.tagcloud.reload();
					}
					else {	// grid/list/null==create event
						if (previousView == "grid" || previousView == "list")
							this.currentView = previousView;
						lconn.calendar.CalendarUtil.removeHashParams(["mode","time","previous","eventInstUuid","stamp"]);
						this.reloadCalendar();
					}
				});
			}
		},
		
		_initEventDetailViewer: function() {
			if(!this.viewer){
				this.viewer = new lconn.calendar.FullEventViewer({	calendar: this,
																	userProfile: this.userProfile,
																	store: this.store,
																	style: "display: none"
																 }, this.iContext.getElementById('calendar_event_viewer'));
			}
		},
		
		onHashChange: function(hash) {
		    if(this.clearMessageOnHashChange) {
			    this.clearMessage();
			}
			
			var hashObj = dojo.queryToObject(hash);
			
			if(hashObj["tags"] != this.currentHash["tags"]) {
				if(this.listView) {
					this.listView.currentPage = 1;
				}
			}
			
			if(hashObj["tags"] != this.currentHash["tags"] 
			   && (hashObj["mode"] == 'create' || hashObj["mode"] == 'edit' || (hashObj["eventInstUuid"] && this.currentHash["eventInstUuid"]))) {
			    var t = this.homeUrl + '#fullpageWidgetId=' + this.wid;
				if(hashObj["tags"]) {
				    t = t + '&' + dojo.objectToQuery({tags: hashObj["tags"]});
				}
				window.location = t;
				return;
			}
			
			if(hashObj["tags"] != this.currentHash["tags"] 
			   && (hashObj["mode"] == 'create' || hashObj["mode"] == 'edit' || (hashObj["eventInstUuid"] && this.currentHash["eventInstUuid"]))) {
			    var t = this.homeUrl + '#fullpageWidgetId=' + this.wid;
				if(hashObj["tags"]) {
				    t = t + '&' + dojo.objectToQuery({tags: hashObj["tags"]});
				}
				window.location = t;
				return;
			}
			this.currentHash = hashObj;
			
			var wid = hashObj["fullpageWidgetId"];
			if (wid == this.wid) {
				var instUuid = hashObj["eventInstUuid"];
				if (instUuid) {
					var mode = hashObj["mode"];
					if (mode=="edit") {
						var previousView = hashObj["previous"];
						this.store.getItem("urn:lsid:ibm.com:calendar:event:" + instUuid, dojo.hitch(this, function(entry){
							this.editEvent(entry, function() {
								if (previousView == "detail")
									lconn.calendar.CalendarUtil.removeHashParams(["mode","previous","stamp"]);
								else 	// list || grid
									lconn.calendar.CalendarUtil.removeHashParams(["eventInstUuid","mode","previous","stamp"]);
							});
						}), {mode: 'full'}, dojo.hitch(this, function(){
							this.clearMessage();
							this.showMessage(this._lang.EVENT_OPEN_ERR_NOTFOUND, lconn.calendar.UIMessage.msgType.ERROR);
							this.clearMessageOnHashChange = false;
							
							if (previousView == "grid" || previousView == "list")
								this.currentView = previousView;
							lconn.calendar.CalendarUtil.removeHashParams(["mode","time","previous","eventInstUuid","stamp"]);
							this.reloadCalendar();
						}));
					} else {
						this.store.getItem("urn:lsid:ibm.com:calendar:event:" + instUuid, dojo.hitch(this, "viewEvent"), null, dojo.hitch(this, function(){
							this.clearMessage();
							this.showMessage(this._lang.EVENT_OPEN_ERR_NOTFOUND, lconn.calendar.UIMessage.msgType.WARNING);
							this.clearMessageOnHashChange = false;
							
							if (previousView == "grid" || previousView == "list")
								this.currentView = previousView;
							lconn.calendar.CalendarUtil.removeHashParams(["mode","time","previous","eventInstUuid","stamp"]);
							this.reloadCalendar();
						}));
						this.tagcloud.refresh(hashObj["tags"]);
					}
				} else {	// only have fullpageWidgetId
					var mode = hashObj["mode"];
					if (mode == "create") {
						var time = hashObj["time"];
						if (time) {
							var d = new Date();
							d.setTime(parseInt(time));
							this.createEvent(d);
						} else {
							this.createEvent();
						}
					} else {
						if(hashObj["tags"]) {
							this.store.tags = hashObj["tags"];
							this.feedUrl = this.rootUrl + '/ical/calendar?calendarUuid=' + this.resourceId + '&tags=' + encodeURIComponent(hashObj["tags"]);
							this._setupFilterIndicators(hashObj["tags"]);
							this.tagcloud.refresh(hashObj["tags"]);
						} else {
							delete this.store.tags;
							this.feedUrl = this.rootUrl + '/ical/calendar?calendarUuid=' + this.resourceId;
							this._setupFilterIndicators(false);
							this.tagcloud.refresh(hashObj["tags"]);
						}
						this.reloadCalendar();
					}
				}
			}
			
			if(!this.clearMessageOnHashChange) {
			    this.clearMessageOnHashChange = true;
			}
		},
		
		showMessage: function(msg, type) {
			this.msgWidget.add(msg, type);
			this.msgWidget.showMessages();
		},
		
		clearMessage: function() {
			this.msgWidget.clear();
		},
		
		/**
		 * Currently this mode is used when Edit Community UI is invoked.
		 */
		_editMode: function(){
		     if(!dijit.byId(this.wid + "_prefs")) {
		    	 net.jazz.ajax.xdloader.load_async('lconn.calendar.CalendarPreferences', 
							dojo.hitch(this, function(){
								this.viewRef = new lconn.calendar.CalendarPreferences({	"id": this.wid + "_prefs",
									"calendarId": this.resourceId, 
									"url": this.preferenceUrl,
									"homeUrl": this.homeUrl,
									"blankImageUrl": BLANK_GIF_URL,
									"_calendar": this
									}, this.iContext.getElementById('calendarPrefs')); 
								this.viewRef._calendar = this;
							}));  
			  }
		},
		
		
		/**
		 * This mode is used to render calendar search results
		 */
		_searchMode: function() {
			var store = new lconn.calendar.CalendarStore({
				url: this.rootUrl + '/atom_form/calendar/event/',
				uuid: this.resourceId
			});
	
			var set = dojo.hitch(this, function set(query, value) {
				dojo.query(query, this.iContext.domNode).forEach(function(n) {
					dojo.html.set(n, value);
				});
			});
	
			var resultContainer = this.iContext.getElementById('calendarResults');
			var resultTable = this.iContext.getElementById('calendarResultTable');
	
			// push a new result
			var pushResult = dojo.hitch(this, function(r) {
				var tr = document.createElement('tr');
	
				var dd = dojo.date.stamp.fromISOString(r.unid.date);
				var meta = lconn.core.DateUtil.toString(dd, false);
	
				dojo.html.set(tr, '<td width="30" class="lotusFirstCell">'+
					'<img src="' + this.rootUrl + '/images/calendar/tab-oneday.gif" alt="Calendar:" /></td>' +
					'<td><h4><a href="#">'+r.subject+'</a></h4>'+
					'<div class="lotusMeta">'+meta+'</div></td>');
	
				resultTable.appendChild(tr);
			});
			
			var keywords = this.attributesItemSet.getItemValue('searchKeywords') ;
			store.search(keywords, function(events) {
				set('.searchCount', ''+events.length);
	
				dojo.forEach(events, pushResult);
	
				resultContainer.style.display = '';
			});
		},
	
		/**
		 * Used in 'fullpage' mode. This view renders iNotes widget
		 */
		_gridView: function() {
			var listView = dijit.byId(this.resourceId + "_listView");
			if (listView) listView.exit();
	
			if(!this.gridView) {
				var parent = this.iContext.getElementById('calendar_view');
				var container = dojo.create("div", {id:this.resourceId + "_gridView"}, parent);
				this.gridView = new lconn.calendar.GridView({calendar: this}, container); 
		
				this.viewRef = this.gridView;
				this.showCalendar();
				this.viewRef.enter(true);

				this.gridView.shapeCalendar();
			} else {
				this.viewRef = this.gridView;
				this.reloadCalendar();
				this.viewRef.enter();
			}
		},
	
		/**
		 * Used in 'fullpage' mode. This view renders the upcoming events list
		 */
		_listView: function() {
			var gridView = dijit.byId(this.resourceId + "_gridView");
			if(gridView) gridView.exit();
	
			if(!this.listView) {
				var parent = this.iContext.getElementById('calendar_view');
				var container = dojo.create("div", {id:this.resourceId + "_listView"}, parent);
				this.listView = new lconn.calendar.UpcomingView({calendar:this, id: this.resourceId + "_listView"}, container);
				
				this.viewRef = this.listView;
				
				this.showCalendar();
			} else {
				this.viewRef = this.listView;
				this.reloadCalendar();
			}
			this.viewRef.enter();
		},
	
		/**
		 * Common error handler used by all modes and views
		 */
		_handleError: function(error, io){
			this.clearMessage();
			
			var get = function(tag) {
				return dojo.string.trim(io.xhr.responseXML.
					getElementsByTagName(tag)[0].firstChild.nodeValue);
			}

			var message = '';
			try {
				message = get('message');
			} catch(err) {
				message = '';
			}
			
			if(dojo.trim(message).length == 0) {
				message = error;
				if(error.message)
					message = error.message;
			}
			
			this.showMessage(message, lconn.calendar.UIMessage.msgType.ERROR);
		},
		
		_setupTagCloud: function(selectedTags) {
			if(this.tagcloud) return;
			
			// init/display tag cloud
			this.tagcloud = lconn.calendar.WidgetTagcloud.create({
	              // Selected Tags                    
	              selectedTags: selectedTags,
	              
	              // Url to select tags
	              tagUrl: this.rootUrl + '/atom_form/tagcloud?calendarUuid=' + this.resourceId,
	              tagTemplate:'tag',
	              
	              // Typeahead Url                  
	              typeAheadFeedUrl: this.rootUrl + '/json/typeahead/tag?limit=10&calendarUuid=' + this.resourceId,
	              typeAheadTemplate:'tag',
	              
	              // Feature flags                                         
	              multiSelected:  true,   
	              disableRelated: false
			});
		},
		
		_setupFilterIndicators: function(tagsAsString) {
			var div = dojo.byId('filterIndicator');
			if(!tagsAsString) {
				div.innerHTML = '';
				div.style.display = 'none';
			} else {
				var tags = lconn.calendar.CalendarUtil.splitTags(tagsAsString);
				if(tags.length == 0) {
					div.innerHTML = '';
					div.style.display = 'none';
				} else {
					var s = this._lang.WITH_TAGS;
					for(var i = 0; i < tags.length; i++) {
						var tag = tags[i];
						
						var href = this.homeUrl + '#fullpageWidgetId=' + this.wid;
						if(tags.length > 1) {
							var t = [];
							for(var j = 0; j < tags.length; j++) {
								if(j != i) {
									t.push(tags[j]);
								}
							}
							href = lconn.calendar.CalendarUtil.createTagFilterURL(href, t);
						}
						var title = dojo.string.substitute(this._lang.TAGS_REMOVE_HINT, [lconn.calendar.CalendarUtil.escapeForXSS(tag)]);
						s = s + ' ' + '<a class="lotusFilter" title="' + title + '" href="' + href + '">' 
						   + lconn.core.HTMLUtil.escapeText(tag) 
						   + '<img src="' + BLANK_GIF_URL + '" class="lotusDelete" alt="' + this._lang.REMOVE + '"><span class="lotusAltText">X</span></a>';
					}
					dojo.html.set(div, s);
					div.style.display = '';
				}
			}
		},
		
		/**
		 * Setup the tabs for switching between list and grid views
		 */
		_setupTabs: function(){
			if(this.currentView == 'list'){
				dojo.addClass(this.iContext.getElementById("listTabItem"), "lotusSelected");
				dojo.removeClass(this.iContext.getElementById("gridTabItem"), "lotusSelected");
				dojo.byId('listTab').setAttribute('aria-pressed', 'true');
				dojo.byId('gridTab').setAttribute('aria-pressed', 'false');
			}else if(this.currentView == 'grid'){
				dojo.addClass(this.iContext.getElementById("gridTabItem"), "lotusSelected");
				dojo.removeClass(this.iContext.getElementById("listTabItem"), "lotusSelected");
				dojo.byId('listTab').setAttribute('aria-pressed', 'false');
				dojo.byId('gridTab').setAttribute('aria-pressed', 'true');
			}			
		},
		
		/**
		 * OnClick handler for the view switching tabs
		 */
		_switchTab: function(evt){
			dojo.stopEvent(evt);
			if(evt.currentTarget.id == "listTab" && this.currentView != "list")
			{
				this.currentView = "list";
				this._setupTabs();
				this._listView();
			}else if(evt.currentTarget.id == "gridTab" && this.currentView != "grid")
			{
				this.currentView = "grid";
				this._setupTabs();
				this._gridView();
			}	
		},
		
		showViewer: function(){
			this._initEventDetailViewer();
			
			dojo.style(this.iContext.getElementById("calendar_main"), 'display', 'none');
			if(this.editor) {
				this.editor.exit();
			}
			this.viewer.enter();
		},
	
		showEditor: function(){
			lconn.calendar.Lazy.addOnLoad(['/lconn/calendar/preference'], this, function() {
				this._initEventEditorForm();
				
				dojo.style(this.iContext.getElementById("calendar_main"), 'display', 'none');
				this.editor.enter();
				if(this.viewer) {
					this.viewer.exit();
				}
			}, true, !this.isOwner && !this.isVisitor);
		},
		
		showCalendar: function(){
			dojo.style(this.iContext.getElementById("calendar_main"), 'display', 'block');
			if(this.editor) {
			    this.editor.exit();
			}
			if(this.viewer) {
				this.viewer.exit();
			}
			
			if (!this.viewRef) {
				// we haven't init the list/grid view yet
				if(this.currentView == 'list') {
					this._listView();
				} else if(this.currentView == 'grid') {
					this._gridView();
				}
			}
		},
	
		viewEvent: function(entry){
			this._initEventDetailViewer();	
			
			this.viewer.prepareForView(entry, entry);
			this.showViewer();
		},
	
		createEvent: function(defaultDate, fnCancel){
			// login?
			if (!this.isLogin) {
				this.redirectToLogin();
				return;
			}
			this.clearMessage();
			
			lconn.calendar.Lazy.addOnLoad(['/lconn/calendar/preference'], this, function() {
				if (!(this.isOwner || this.isAuthorRole)) {
					this.showMessage(this._lang.NOT_AUTHORIZED, lconn.calendar.UIMessage.msgType.ERROR);
					this.clearMessageOnHashChange = false;
					dojo.hash("#fullpageWidgetId=" + this.wid);
					return;
				}
				
				this._initEventEditorForm();
				
				if(fnCancel) {
					this.editor.cancelAction = fnCancel;
				} else {
					this.editor.cancelAction = 	function() {
						// will show calendar view
						lconn.calendar.CalendarUtil.removeHashParams(["mode","time","stamp"]);
					};
				}
				
				setTimeout(dojo.hitch(this, function() {
					    this.editor.clear(false);
						this.showEditor();
						this.editor.prepareForNew(defaultDate);
					}), 1);
			}, true, !this.isOwner && !this.isVisitor);
		},
			
		editEvent: function(entry, fnCancel){
			// login?
			if (!this.isLogin) {
				this.redirectToLogin();
				return;
			}
			
			lconn.calendar.Lazy.addOnLoad(['/lconn/calendar/preference'], this, function() {
				this._initEventEditorForm();
				
				if(this.isOwner || (this.isAuthorRole && this.userProfile.getItemValue("userId") == entry.createdBy)) {
					if(fnCancel) {
						this.editor.cancelAction = fnCancel;
					} else {
						this.editor.cancelAction = 	dojo.hitch(this, "showCalendar");
					}	
					
					setTimeout(dojo.hitch(this, function() {
					    this.editor.clear(false);
						this.showEditor();
						this.editor.prepareForEdit(entry);
					}), 1);	
				} else {
					this.showMessage(this._lang.NOT_AUTHORIZED, lconn.calendar.UIMessage.msgType.ERROR);
					this.clearMessageOnHashChange = false;
					dojo.hash("#fullpageWidgetId=" + this.wid);
					return;
				}
			}, true, !this.isOwner && !this.isVisitor);
		},
	
		deleteEvent: function(entry, focusElem){
			var t = dojo.hash();
			if(t.indexOf('fullpageWidgetId%3D') == 0) {
				t = 'fullpageWidgetId=' + t.substring('fullpageWidgetId%3D'.length);
			} 
			var hashObj = dojo.queryToObject(t);
			
			lconn.calendar.Lazy.addOnLoad(['/lconn/calendar/preference'], this, function() {
				if(this.isOwner || (this.isAuthorRole && this.userProfile.getItemValue("userId") == entry.createdBy)) {
					var messageNode = dojo.create("div");

					if(entry.recurrence.custom && entry.recurrence.custom.length == 1){
						dojo.create("span", {innerHTML: this._lang.DELETE_CONFIRM_SINGLE}, messageNode);
					}else{
						dojo.create("span", {innerHTML: this._lang.DELETE_CONFIRM_SERIES}, messageNode);
						messageNode.appendChild(lconn.calendar.CalendarUtil.createDialogOptions(
								[{optionId: "deleteInstance", optionText: this._lang.DELETE_INSTACE_OPTION, checked: true},
								 {optionId: "deleteAll", optionText: this._lang.DELETE_SERIES_OPTION}							
								], "deleteType"				
						));
					}
					var onDeleteCallback = function() {
						this.store.deleteItem(entry.id, 
							dojo.byId('deleteInstance') ? dojo.byId('deleteInstance').checked : true, 
							dojo.hitch(this, function() {
								this.deleteDialog.hide();
								lconn.calendar.CalendarUtil.removeHashParam("eventInstUuid");
								this.reloadCalendar();
							}),
							dojo.hitch(this, function(statusCode) {
							    this.deleteDialog.hide();
							    if(statusCode != 401) {
									this.clearMessage();
									this.showMessage(this._lang.EVENT_DELETE_ERROR, lconn.calendar.UIMessage.msgType.ERROR);
									
									var previousView = hashObj["previous"];
									if (previousView == "grid" || previousView == "list")
										this.currentView = previousView;
									this.clearMessageOnHashChange = false;
									lconn.calendar.CalendarUtil.removeHashParams(["mode","time","previous","eventInstUuid","stamp"]);
									this.reloadCalendar();
									
									setTimeout(dojo.hitch(this, function() {
									    this.clearMessageOnHashChange = true;
									}), 1000);
							    }
							})
						);
					};
					
					this.deleteDialog = lconn.core.DialogUtil.popupForm(
							this._lang.CONFIRM,
							messageNode,
							this._lang.DELETE_DIALOG_BUTTON,
							this._lang.CANCEL,
							dojo.hitch(this,onDeleteCallback),
							focusElem ? dojo.hitch(this, function(){this.deleteDialog.hide();focusElem.focus();}) : null
						);

				}
			}, true, !this.isOwner && !this.isVisitor);
		},
		
		followEvent: function(entry, onSuccess){
			var t = dojo.hash();
			if(t.indexOf('fullpageWidgetId%3D') == 0) {
				t = 'fullpageWidgetId=' + t.substring('fullpageWidgetId%3D'.length);
			} 
			var hashObj = dojo.queryToObject(t);
			
			if(entry.recurrence.custom && entry.recurrence.custom.length == 1){
				this.store.followItem(entry.id, true, dojo.hitch(null, onSuccess, false), dojo.hitch(this, function(statusCode) {
					if(statusCode != 401) {
						this.clearMessage();
						this.showMessage(this._lang.EVENT_OPEN_ERR_NOTFOUND, lconn.calendar.UIMessage.msgType.ERROR);
						
						var previousView = hashObj["previous"];
						if (previousView == "grid" || previousView == "list")
							this.currentView = previousView;
						this.clearMessageOnHashChange = false;
						lconn.calendar.CalendarUtil.removeHashParams(["mode","time","previous","eventInstUuid","stamp"]);
						this.reloadCalendar();
						
						setTimeout(dojo.hitch(this, function() {
						    this.clearMessageOnHashChange = true;
						}), 1000);
					}
				}));
			} else {
				var messageNode = dojo.create("div");

				dojo.create("span", {innerHTML: this._lang.FOLLOW_CONFIRM_SERIES}, messageNode);
				messageNode.appendChild(lconn.calendar.CalendarUtil.createDialogOptions(
						[{optionId: "followInstance", optionText: this._lang.FOLLOW_INSTACE_OPTION, checked: true},
						 {optionId: "followAll", optionText: this._lang.FOLLOW_SERIES_OPTION}							
						], "followType"				
				));

				var onFollowCallback = function() {
					this.store.followItem(entry.id, 
						dojo.byId('followInstance').checked, 
						dojo.hitch(this, function() {
							this.followDialog.hide();
							onSuccess(!dojo.byId('followInstance').checked);
						}),
						dojo.hitch(this, function(statusCode) {
						    this.followDialog.hide();
						    if(statusCode != 401) {
								this.clearMessage();
								this.showMessage(this._lang.EVENT_OPEN_ERR_NOTFOUND, lconn.calendar.UIMessage.msgType.ERROR);
								
								var previousView = hashObj["previous"];
								if (previousView == "grid" || previousView == "list")
									this.currentView = previousView;
								this.clearMessageOnHashChange = false;
								lconn.calendar.CalendarUtil.removeHashParams(["mode","time","previous","eventInstUuid","stamp"]);
								this.reloadCalendar();
								
								setTimeout(dojo.hitch(this, function() {
								    this.clearMessageOnHashChange = true;
								}), 1000);
						    }
						})
					);
				};
				
				this.followDialog = lconn.core.DialogUtil.popupForm(
						this._lang.CONFIRM,
						messageNode,
						this._lang.FOLLOW_DIALOG_BUTTON,
						this._lang.CANCEL,
						dojo.hitch(this,onFollowCallback),
						null
					);
			}
		},
		
		unfollowEvent: function(entry, onSuccess){
			var t = dojo.hash();
			if(t.indexOf('fullpageWidgetId%3D') == 0) {
				t = 'fullpageWidgetId=' + t.substring('fullpageWidgetId%3D'.length);
			} 
			var hashObj = dojo.queryToObject(t);
			
			this.store.unfollowItem(entry.id, onSuccess, dojo.hitch(this, function(statusCode) {
				if(statusCode != 401) {
					this.clearMessage();
					this.showMessage(this._lang.EVENT_OPEN_ERR_NOTFOUND, lconn.calendar.UIMessage.msgType.ERROR);
					
					var previousView = hashObj["previous"];
					if (previousView == "grid" || previousView == "list")
						this.currentView = previousView;
					this.clearMessageOnHashChange = false;
					lconn.calendar.CalendarUtil.removeHashParams(["mode","time","previous","eventInstUuid","stamp"]);
					this.reloadCalendar();
					
					setTimeout(dojo.hitch(this, function() {
					    this.clearMessageOnHashChange = true;
					}), 1000);
				}
			}));
		},
		
		rsvpEvent: function(entry, onSuccess){
			var t = dojo.hash();
			if(t.indexOf('fullpageWidgetId%3D') == 0) {
				t = 'fullpageWidgetId=' + t.substring('fullpageWidgetId%3D'.length);
			} 
			var hashObj = dojo.queryToObject(t);
			
			if(entry.recurrence.custom && entry.recurrence.custom.length == 1){
				this.store.rsvpItem(entry.id, true, dojo.hitch(null, onSuccess, false), dojo.hitch(this, function(statusCode) {
					if(statusCode != 401) {
						this.clearMessage();
						this.showMessage(this._lang.EVENT_OPEN_ERR_NOTFOUND, lconn.calendar.UIMessage.msgType.ERROR);
						
						var previousView = hashObj["previous"];
						if (previousView == "grid" || previousView == "list")
							this.currentView = previousView;
						this.clearMessageOnHashChange = false;
						lconn.calendar.CalendarUtil.removeHashParams(["mode","time","previous","eventInstUuid","stamp"]);
						this.reloadCalendar();
						
						setTimeout(dojo.hitch(this, function() {
						    this.clearMessageOnHashChange = true;
						}), 1000);
					}
				}));
			} else {
				var messageNode = dojo.create("div");

				dojo.create("span", {innerHTML: this._lang.RSVP_CONFIRM_SERIES}, messageNode);
				messageNode.appendChild(lconn.calendar.CalendarUtil.createDialogOptions(
						[{optionId: "rsvpInstance", optionText: this._lang.RSVP_INSTACE_OPTION, checked: true},
						 {optionId: "rsvpAll", optionText: this._lang.RSVP_SERIES_OPTION}							
						], "rsvpType"				
				));

				var onRsvpCallback = function() {
					this.store.rsvpItem(entry.id, 
						dojo.byId('rsvpInstance').checked, 
						dojo.hitch(this, function() {
							this.rsvpDialog.hide();
							onSuccess(!dojo.byId('rsvpInstance').checked);
						}),
						dojo.hitch(this, function(statusCode) {
						    this.rsvpDialog.hide();
						    if(statusCode != 401) {
								this.clearMessage();
								this.showMessage(this._lang.EVENT_OPEN_ERR_NOTFOUND, lconn.calendar.UIMessage.msgType.ERROR);
								
								var previousView = hashObj["previous"];
								if (previousView == "grid" || previousView == "list")
									this.currentView = previousView;
								this.clearMessageOnHashChange = false;
								lconn.calendar.CalendarUtil.removeHashParams(["mode","time","previous","eventInstUuid","stamp"]);
								this.reloadCalendar();
								
								setTimeout(dojo.hitch(this, function() {
								    this.clearMessageOnHashChange = true;
								}), 1000);
						    }
						})
					);
				};
				
				this.rsvpDialog = lconn.core.DialogUtil.popupForm(
						this._lang.CONFIRM,
						messageNode,
						this._lang.RSVP_DIALOG_BUTTON,
						this._lang.CANCEL,
						dojo.hitch(this,onRsvpCallback),
						null
					);
			}
		},
		
		unrsvpEvent: function(entry, onSuccess){
			var t = dojo.hash();
			if(t.indexOf('fullpageWidgetId%3D') == 0) {
				t = 'fullpageWidgetId=' + t.substring('fullpageWidgetId%3D'.length);
			} 
			var hashObj = dojo.queryToObject(t);
			
			this.store.unrsvpItem(entry.id, onSuccess, dojo.hitch(this, function(statusCode) {
				if(statusCode != 401) {
					this.clearMessage();
					this.showMessage(this._lang.EVENT_OPEN_ERR_NOTFOUND, lconn.calendar.UIMessage.msgType.ERROR);
					
					var previousView = hashObj["previous"];
					if (previousView == "grid" || previousView == "list")
						this.currentView = previousView;
					this.clearMessageOnHashChange = false;
					lconn.calendar.CalendarUtil.removeHashParams(["mode","time","previous","eventInstUuid","stamp"]);
					this.reloadCalendar();
					
					setTimeout(dojo.hitch(this, function() {
					    this.clearMessageOnHashChange = true;
					}), 1000);
				}
			}));
		},

		reloadCalendar: function() {
			var hasViewRef = !!this.viewRef;
			this.showCalendar();
			if(hasViewRef) {
				this.viewRef.enter();
			    this.viewRef.load();
			}
			this.tagcloud.reload();
		},
		
		hashValue: function(key) {
			var m = window.location.hash.match(new RegExp(key+'=(.*?)(&|$)'));
			if (m) return m[1];
			return undefined;
		},
		
		redirectToLogin: function() {
			dojo.xhrPost({
				url: this.rootUrl + "/redirectToLogin",
				headers: {"Content-type": "application/atom+xml"},
				handleAs: "xml"
			});
		}
	
	});
	
	dojo.provide("lconn.calendar._widgetImpl._CalendarViews");
	dojo.declare("lconn.calendar._widgetImpl._CalendarViews", [dijit._Widget, dijit._Templated], {
	      templateString: null,
	      templatePath: dojo.moduleUrl('lconn.calendar', 'templates/calendar.html')
	});
})();
