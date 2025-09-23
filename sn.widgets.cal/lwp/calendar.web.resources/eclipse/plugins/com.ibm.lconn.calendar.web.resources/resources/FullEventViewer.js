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


dojo.provide('lconn.calendar.FullEventViewer');

dojo.require("dojo.i18n");
dojo.require("dojo.parser");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.MenuBar");
dojo.require("dijit.PopupMenuBarItem");
dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");
dojo.require("dijit.PopupMenuItem");
dojo.require("dijit.form.Textarea");

dojo.require("lconn.core.MenuUtility");
dojo.require("lconn.core.DateUtil");
dojo.require("lconn.core.DialogUtil");

dojo.require("lconn.calendar.CalendarUtil");
dojo.require("lconn.calendar.Notification");
dojo.require("lconn.calendar.Paging");
dojo.require("lconn.calendar.UIMessage");

dojo.require('lconn.calendar.Lazy');

dojo.require("lconn.core.config.properties");
dojo.require("lconn.core.config.features");
dojo.require("lconn.core.lcTextArea.widgets.BasicTextBox");
dojo.require("lconn.core.widget.mentions.MentionsDataFormatter");

var has = lconn.core.config.features;

dojo.declare("lconn.calendar.FullEventViewer", [dijit._Widget, dijit._Templated], 
{
    templateString: null,

    templatePath: dojo.moduleUrl('lconn.calendar', has("calendar-export-ical-file") ? 'templates/fullEventViewerExtra.html' : 'templates/fullEventViewer.html'),

    calendar: null,
    
    entry: null,
        
    menuPop: null,
    
    connects: [],
    
    blankImageUrl: dojo.config.blankGif,
    
    actionToolbar: null,
    
    isFollow: false,
    
    isRsvp: false,
    
    mentionsEnabled: true,
    
    /**
     * Widget initialization goes here, localization is already loaded
     */
    postCreate: function() {
        this._buildMenu();
        
        // #40491
        this.domNode.title = "";
        
        this.notifySuccessHandler = dojo.subscribe(lconn.calendar.topic.notifySuccess, dojo.hitch(this, "onNotifySuccess"));
        
        //if(this.calendar.customEventIcon) {
            this.thumbnailAP.style.display = '';
            dojo.addClass(this.eventHeaderAP, 'eventHeaderWithThumbnail');
        //}
        if (has("calendar-export-ical-file")) {
        	this.exportICSEvent.style.display = '';
        }
    },
    
    _buildMenu: function(){
        if(this.menuPop) {
            return;
        }
        
        this.menuPop = new dijit.Menu({id: this.id + "_menu"});
        this.menuPop.addChild(new dijit.MenuItem({
            id: this.id + '-miDelete',
            label: this._lang.DELETE,
            onClick: dojo.hitch(this, "delete")
        }));
        this.menuPop.addChild(new dijit.MenuItem({
            id: this.id + '-miNotify',
            label: this._lang.NOTIFY,
            onClick: dojo.hitch(this, "notify")            
        }));
        this.connects.push(dojo.connect(this.moreActionsLink, "onclick", this, function(evt){menuUtility.openMenu(evt, this.id + "_menu", this.btnMoreActions);}));
        this.connects.push(dojo.connect(this.menuPop, "onClose", this, function(evt){this.moreActionsLink.focus();}));
        
        // #39311, wierd issue is setting the title in fullEventViewer.html will cause dojo error
        dojo.attr(this.moreActionsLink, "title", this._lang.MORE_ACTIONS);
    },

    enter: function(load) {
        if (load) {
            
        }
        this.domNode.style.display = "block";
        this.closeEventAP.focus();
    },
    
    exit: function(unload) {
        if (unload) {}
        
        this.domNode.style.display = "none";
    },
    
    /**
     * Localization and other static stat imported here
     */
    postMixInProperties: function() {
        lconn.calendar.CalendarData.get().mixin(this);
        
        this.defaultUserPhoto = this.calendar.rootUrl + "/images/calendar/photo.png";
        
        this.profilesAvailable = !!this.calendar.profilesUrl;
        
        if (this.profilesAvailable)
            this.profilesPhotoUrl = this.calendar.profilesUrl + "/photo.do?userid=";
        
        this.wid = this.calendar.iContext.widgetId;
        
        this.util = lconn.calendar.CalendarUtil;
        this.dateUtil = lconn.core.DateUtil;
        this.dateUtil.toStringForTimeinMs(new Date());  // init the dateUtil
    },

    destroy: function(){
        //disconnect handlers
        dojo.forEach(this.connects, dojo.disconnect);
        
        var widget = this.menuPop;
        if(widget) widget.destroyRecursive();
        this.menuPop = null;
        
        widget = this.topPagingWidget;
        if (widget) widget.destroyRecursive();
        this.topPagingWidget = null;
        
        widget = this.bottomPagingWidget;
        if (widget) widget.destroyRecursive();
        this.bottomPagingWidget = null;

        widget = this.attendeeTopPagingWidget;
        if (widget) widget.destroyRecursive();
        this.attendeeTopPagingWidget = null;
        
        widget = this.attendeeBottomPagingWidget;
        if (widget) widget.destroyRecursive();
        this.attendeeBottomPagingWidget = null;

        dojo.unsubscribe(this.notifySuccessHandler);
        
        if(this.actionToolbar != null) {
            this.actionToolbar.destroy();
            this.actionToolbar = null;
        }
        
        if(!!this.textBoxControl) {
        	this.textBoxControl.destroyRecursive();
			this.textBoxControl = null;
        }
        
        this.inherited(arguments);
    },

    onNotifySuccess: function(handleSuccessView) {
        if (handleSuccessView == "detailView") {
            var msg = this._lang.NOTIFY_SUCCESS;
            var type = lconn.calendar.UIMessage.msgType.CONFIRM;
            dojo.publish(lconn.calendar.topic.showMessage, [msg,type]);
        }
    },
    
    close: function(evt){
        dojo.stopEvent(evt);    
        dojo.publish(lconn.calendar.topic.clearMessage, []);
        this.util.removeHashParam("eventInstUuid");
    },
    
    edit: function(evt){
        dojo.stopEvent(evt);
		if(this.textBoxControl) {
			this.textBoxControl.destroy();
			this.textBoxControl = null;
		}
        lconn.calendar.Lazy.addOnLoad(['/lconn/calendar/preference'], this, function() {
            if(this.calendar.isOwner || (this.calendar.isAuthorRole && this.calendar.userProfile.getItemValue("userId") == this.entry.createdBy)) {
                this.util.setHashParams(["mode","previous","stamp"],["edit","detail",(new Date()).getTime()]);
            }
        }, true, !this.calendar.isOwner && !this.calendar.isVisitor && !this.calendar.userProfile.getItemValue("userId") != this.entry.createdBy);
    },
    
    'delete': function(evt){
        dojo.stopEvent(evt);
        lconn.calendar.Lazy.addOnLoad(['/lconn/calendar/preference'], this, function() {
            if(this.calendar.isOwner || (this.calendar.isAuthorRole && this.calendar.userProfile.getItemValue("userId") == this.entry.createdBy)) {
                this.calendar.deleteEvent(this.entry, this.moreActionsLink);
                dojo.publish(lconn.calendar.topic.clearMessage);
            }
        }, true, !this.calendar.isOwner && !this.calendar.isVisitor && !this.calendar.userProfile.getItemValue("userId") != this.entry.createdBy);
    },
    
    notify: function(evt){
        dojo.stopEvent(evt);
        if(this.calendar.isMember) {
            var notifyDialog = new lconn.calendar.NotificationDialog(
                    this.calendar, this.entry.uuid, "detailView", "dialog", this.moreActionsLink);
            notifyDialog.show();
            // dialog will be destroyed when click cancel/ok
            dojo.publish(lconn.calendar.topic.clearMessage);
        }
    },
    
    follow: function(evt) {
            var currentElement=evt.currentTarget;
        this.calendar.followEvent(this.entry, dojo.hitch(this, function(isSeries){
            currentElement.children[0].setAttribute("title",this._lang.UNFOLLOW);
            currentElement.children[0].innerHTML=this._lang.UNFOLLOW;
            var msg = (isSeries ? this._lang.FOLLOW_ENTIRESERIES_CONFIRM : this._lang.FOLLOW_CONFIRM).replace('{0}', this.calendar.rootUrl + '/ical/calendar?type=follow&userid=' + this.calendar.userProfile.getItemValue("userId"));
            this.calendar.showMessage(msg, lconn.calendar.UIMessage.msgType.CONFIRM);
            
            this.__followed = (isSeries ? 'series' : 'instance');
            this.isFollow = true;
        }));
        dojo.publish(lconn.calendar.topic.clearMessage);
    },
    
    unfollow: function(evt) {
        var currentElement=evt.currentTarget;
        this.calendar.unfollowEvent(this.entry, dojo.hitch(this, function(isSeries){
        	this.isFollow = false;
            currentElement.children[0].setAttribute("title",this._lang.FOLLOW);
            currentElement.children[0].innerHTML=this._lang.FOLLOW;
            this.calendar.showMessage((isSeries ? this._lang.UNFOLLOW_ENTIRESERIES_CONFIRM : this._lang.UNFOLLOW_CONFIRM), lconn.calendar.UIMessage.msgType.CONFIRM);
        }, this.__followed == 'series'));
        dojo.publish(lconn.calendar.topic.clearMessage);
    },
    processFollow: function(evt) {
      if(!this.isFollow){
          this.follow(evt);
      }else{
          this.unfollow(evt);
      }
      this.followEventLink.focus();
    },
    rsvp: function(evt) {
        var currentElement = evt.currentTarget;
        this.calendar.rsvpEvent(this.entry, dojo.hitch(this, function(isSeries){
            currentElement.children[0].setAttribute("title",this._lang.UNRSVP);
            currentElement.children[0].innerHTML=this._lang.UNRSVP;
            var msg = (isSeries ? this._lang.RSVP_ENTIRESERIES_CONFIRM : this._lang.RSVP_CONFIRM).replace('{0}', this.calendar.rootUrl + '/ical/calendar?type=attend&userid=' + this.calendar.userProfile.getItemValue("userId"));
            this.calendar.showMessage(msg, lconn.calendar.UIMessage.msgType.CONFIRM);
            this.totalAttendees ++;
            this.showAttendees(1);
            
            this.isRsvp = true;
            this.__rsvped = (isSeries ? 'series' : 'instance');
        }));
        dojo.publish(lconn.calendar.topic.clearMessage);
    },
    
    unrsvp: function(evt) {
        var currentElement = evt.currentTarget;
        this.calendar.unrsvpEvent(this.entry, dojo.hitch(this, function(isSeries){
            this.isRsvp = false;
        	currentElement.children[0].setAttribute("title",this._lang.RSVP);
            currentElement.children[0].innerHTML=this._lang.RSVP;
            this.calendar.showMessage((isSeries ? this._lang.UNRSVP_ENTIRESERIES_CONFIRM : this._lang.UNRSVP_CONFIRM), lconn.calendar.UIMessage.msgType.CONFIRM);
            this.totalAttendees --;
            this.showAttendees(1);
        }, this.__rsvped == 'series'));
        dojo.publish(lconn.calendar.topic.clearMessage);
    },
     processRsvp: function(evt) {
         if(!this.isRsvp) {
             this.rsvp(evt);
         } else {
             this.unrsvp(evt);
         }
         this.rsvpEventLink.focus();
     },
     
     exportICS: function(evt){
		window.location.href = this.calendar.rootUrl+"/ical/calendar?eventInstUuid="+this.entry.uuid;
     },
     
    /**
     * Prepare the editor by filling all the inputs from the provided event
     * @argument e the event to fill editor with
     */
    prepareForView: function(entry, item) {
        this.entry = entry;
        
        //if(this.calendar.customEventIcon) {
            // thumbnail
            this.thumbnailAP.innerHTML = "";
            var imageUrl = item.imageUrl;
            if (!imageUrl || imageUrl == "") {
                imageUrl = this.getUserPhotoUrl(item.createdBy);
            }
            if(item.authorStatus == "inactive") {
                dojo.addClass(this.thumbnailAP, "lotusDim");
            }
            dojo.create("img", {"class":"usersRadius", alt:"", src:imageUrl, role:"presentation", width: "45", height: "45"}, this.thumbnailAP);
        //}
        
        // title & headers
        dojo.html.set(this.titleAP, this.util.escapeForXSS(entry.subject));
        this.setHeaders(entry);
        
        // actions
        this.actionBar.style.display = 'none';
        this.editEvent.style.display = 'none';
        this.btnMoreActions.style.display = 'none';
        var delMenuItem = dijit.byId(this.id + "-miDelete");
        delMenuItem.attr("disabled", true);
        
        dojo.addClass(this.editEvent, "lotusBtnDisabled");
        dojo.attr(this.editEventLink, "aria-disabled", "true");
        this.editEventLink.disabled = false;
        
        if(this.calendar.isOwner || this.calendar.isMember) {
            lconn.calendar.Lazy.addOnLoad(['/lconn/calendar/preference'], this, function() {
                if(this.calendar.isOwner || this.calendar.isAuthorRole) {
                    var delMenuItem = dijit.byId(this.id + "-miDelete");
                    if(this.calendar.isOwner || (this.calendar.isAuthorRole && this.calendar.userProfile.getItemValue("userId") == item.createdBy)) {
                        dojo.removeClass(this.editEvent, "lotusBtnDisabled");
                        dojo.removeAttr(this.editEventLink, "aria-disabled");
                        this.editEventLink.disabled = false;
                        delMenuItem.attr("disabled", false);
                    } 
                }
                
                this.actionBar.style.display = '';
                
                this.editEvent.style.display = '';
                this.btnMoreActions.style.display = '';
                
                this.resetActionToolbar();
            }, false, !this.calendar.isOwner && !this.calendar.isVisitor && !this.calendar.userProfile.getItemValue("userId") != item.createdBy);
        }
        
        if(!!this.calendar.userProfile.getItemValue("userId")) {
            dojo.xhrGet({
                url: this.calendar.rootUrl + "/json/user/status?eventInstUuid=" + this.entry.uuid,
                headers: {
                    "X-CALENDAR-MEMBERSHIP": (this.isOwner ? "OWNER" : (this.isMember ? "MEMBER" : "NONE"))
                },
                handleAs: "json",
                preventCache: true,
                load: dojo.hitch(this, function(data){
                    this.__followed = data.followed;
                    this.__rsvped = data.rsvped;
                    
                    if(!this.calendar.isExternalVistor) {
	                    if(data.followed) {
	                        this.actionBar.style.display = '';
	                        var followBtn = dojo.byId("follow");
	                        if(data.followed == 'none') {
	                        	this.isFollow = false;
	                            followBtn.children[0].setAttribute("title",this._lang.FOLLOW);
	                            followBtn.children[0].innerHTML=this._lang.FOLLOW;
	                        } else {
	                        	this.isFollow = true;
	                            followBtn.children[0].setAttribute("title",this._lang.UNFOLLOW);
	                            followBtn.children[0].innerHTML=this._lang.UNFOLLOW;
	                        }
	                    };
                    } else {
                    	dojo.byId("follow").style.display = 'none';
                    }
                    
                    if(data.rsvped) {
                        var rsvpBtn = dojo.byId("rsvp");
                        this.actionBar.style.display = '';
                        if(data.rsvped == 'none') {
                        	this.isRsvp = false;
                            rsvpBtn.children[0].setAttribute("title",this._lang.RSVP);
                            rsvpBtn.children[0].innerHTML=this._lang.RSVP;
                        } else {
                        	this.isRsvp = true;
                            rsvpBtn.children[0].setAttribute("title",this._lang.UNRSVP);
                            rsvpBtn.children[0].innerHTML=this._lang.UNRSVP;
                        }
                    }
                    
                    this.resetActionToolbar();
                }),
                error: function(){}
            });
        }
        
        this.resetActionToolbar();
        
        // location & description
        if (!item.location || item.location == "") {
            this.location.style.display = 'none';
        } else {
            this.location.style.display = '';
            dojo.html.set(this.location, this.util.escapeForXSS(this._lang.LOCATION+lconn.core.globalization.bidiUtil.enforceTextDirection(item.location)));            
        }
        if(dojo.isIE) {
            this.description.innerHTML = item.description;
        } else {
            try{
                dojo.html.set(this.description, item.description);
            }catch(e) {
                this.description.innerHTML = item.description;
            }
        }
        
        if(SemTagSvc) {
            SemTagSvc.parseDom(null, this.description);
        }
        
        // comments & about
        this.preparePaging();
        this.prepareComments(1);
        //this.prepareAbout();
        this.prepareAttendeePaging();
        this.prepareAttendees(1);
        
		try {
            com.ibm.lconn.layout.track.read(this.entry.uuid, "ENTRY", {
                source : "CALENDAR",
                communityId : this.calendar.resourceId,
                extra:{
                    contentContainerId : this.entry.parent,
                    contentTitle : this.entry.subject,
                    contentLink : self.location.href,
                    contentContainerLink : (self.location.href.indexOf("eventInstUuid") > 0
                    		? self.location.href.replace(/eventInstUuid=[^&]*($|&)/, "eventUuid="+this.entry.parent+"$1")
                    		: self.location.href+"&eventUuid="+this.entry.parent)
                }
            });
         } catch (e) {
            if (dojo.config.isDebug) {
               console.debug(e);
            }
         }		 
        
        // Bidi support
        lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
    },
    
    setHeaders: function(entry) {
        // created by
        var person = this._formatPersonSpan(entry.authorName, entry.createdBy);
        var createdBy = dojo.string.substitute(this._lang.CREATED_BY, [person]);
        dojo.html.set(this.createdByAP, createdBy);
        if(SemTagSvc) {
            SemTagSvc.parseDom(null, this.createdByAP);
        }
        
        // when
        var day = this.dateUtil.Days[entry.startDate.getDay()];
        var date = this.dateUtil.getLocalizedDate(entry.startDate);
        var when = dojo.string.substitute(this._lang.DETAIL_WHEN, [day, date]);
        if(entry.recurrence.freq != "custom") {
            when = when + "&nbsp;&nbsp;" + this._lang.REPEATS_FLAG;
        }
        dojo.html.set(this.whenAP, when);
        
        // time
        var allday = (entry.allDay===true || entry.allDay=="1") ? true : false;
        if (allday) {
            dojo.html.set(this.timeAP, this._lang.ALL_DAY);
        } else {
            var from = this.dateUtil.getLocalizedTime(entry.startDate);
            var to = this.dateUtil.getLocalizedTime(entry.endDate);
            var time = dojo.string.substitute(this._lang.DETAIL_TIME, [from, to]);
            dojo.html.set(this.timeAP, time);
        }
        
        // tags
        dojo.empty(this.tagsAP);
        if (entry.tags && entry.tags.length>0) {
            var span = dojo.create("span", {role:"list"}, this.tagsAP);
            span.appendChild(document.createTextNode(this._lang.TAGS));
            for (var i=0, l=entry.tags.length; i<l; i++) {
                var tag = entry.tags[i];
                var href = "#fullpageWidgetId=" + this.wid + "&tags=" + encodeURIComponent(tag);
                var listitemEL = dojo.create("span", {role:"listitem"}, span);
                dojo.create("a", {className:"bidiAware", href:href, innerHTML:this.util.escapeForXSS(tag)}, listitemEL);
                if (i < l-1)
                	listitemEL.appendChild(document.createTextNode(", "))
            }
            this.tagsAP.style.display = "";
        } else {
            this.tagsAP.style.display = "none";
        }
    },
    
    _formatPersonSpan: function(name, uuid, userState) {
        return lconn.calendar.PeoplelinkUtil.formatPersonLink({userid:uuid, name:name, state:userState}, true);
    },
    
    commentsPerPage: 10,
    
    totalComments: 0,
    
    preparePaging: function() {
        var pagingParam = {
            pageSize: this.commentsPerPage,
            _lang: this._lang,
            total: dojo.hitch(this, function() {
                return this.totalComments;
            }),
            onPage: dojo.hitch(this, function(p) {
                this.showComments(p);
            }),
            onPageSizeChange: dojo.hitch(this, function(ps) {
                this.commentsPerPage = ps;
                this.showComments(1);
            })
        };
        if (!this.topPagingWidget) {
            var param = dojo.mixin({features:["info", "list", "nav"],aria_label:this._lang.PAGING_COMMENT_LABEL}, pagingParam);
            this.topPagingWidget = new lconn.calendar.Paging(param, this.topPagingAP);
        }
        if (!this.bottomPagingWidget) {
            var param = dojo.mixin({features:["nav", "ps"],aria_label:this._lang.PAGING_COMMENT_BOTTOM_LABEL}, pagingParam);
            this.bottomPagingWidget = new lconn.calendar.Paging(param, this.bottomPagingAP);
        }
        this.topPagingWidget.domNode.style.display = 'none';
        this.bottomPagingWidget.domNode.style.display = 'none';
        this.bottomPagingWidget.pagePSAP.style.display='none';
    },
    
    showCommentTab: function() {
        this.commentAP.style.display = "";
    },
    
    showComments: function(page) {
        var eventInstUuid = this.entry.uuid;
        this.calendar.store.getComments(eventInstUuid, dojo.hitch(this, function(comments, total) {
            var tabTitle = dojo.string.substitute(this._lang.TAB_COMMENT, [total]);
            dojo.html.set(this.commentTabTitle, tabTitle);
            this.totalComments = total;
            
            this._showHideNode(this.noCommentHintAP, (total>0?false:true));
            
            this.topPagingWidget.update(page, this.commentsPerPage);
            this.bottomPagingWidget.update(page, this.commentsPerPage);
            
            // hide paging bar, if non comment
            if(total <= this.commentsPerPage) {
                this.topPagingWidget.domNode.style.display = 'none';
                this.bottomPagingWidget.domNode.style.display = 'none';
            } else {
                this.topPagingWidget.domNode.style.display = '';
                this.bottomPagingWidget.domNode.style.display = '';
            }
            this.bottomPagingWidget.pagePSAP.style.display='none';
            
            dojo.empty(this.commentListAP);
            for (var i=0,l=comments.length; i<l; i++) {
                var comment = comments[i];
                var node = this._oneCommentUI(comment);
                if (i==0)
                    dojo.addClass(node, "lotusFirst");
                this.commentListAP.appendChild(node);
            }
            
            if(SemTagSvc) {
                SemTagSvc.parseDom(null, this.commentListAP);
            }
            // Bidi support
            lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
        }), page, this.commentsPerPage);
    },
    
    prepareComments: function(page) {
        lconn.calendar.Lazy.addOnLoad(['/lconn/calendar/preference'], this, function() {
            this._showHideNode(this.addCommentLinkAP, this._canAddComment());
        }, false, this.calendar.isVisitor);
        this._showHideNode(this.addCommentFormAP, false);
        this.showComments(page);
    },
    
    useRTE : has("ckeditor-lite-mentions"),
    
    createComment: function() {  
        // mention support
        if (!this.textBoxControl) {
            var container = dojo.byId(this.wid + "_commentContainer");
            var classes = this.useRTE ? 'events bidiAware' : 'lotusText bidiAware'
            var commentBody = dojo.create(this.useRTE ? 'div' : 'textarea', {"name": "description", "class": classes}, container);
            var options = {
				   maxLength: 10000000,
				   maxByteLength: 40000000,
				   shadowText: " ",
				   mentionsEnabled: this.mentionsEnabled,
				   width: "95%",
				   height: "7em",
				   title: this._lang.ENTER_COMMENT,
				   disableURLPreview: true
            };
            this.textBoxControl = new lconn.core.lcTextArea.widgets.BasicTextBox(options, commentBody);
            if (!this.useRTE) {
                dojo.removeClass(this.textBoxControl.domNode, 'lotusFieldEmphasis');
                dojo.style(this.textBoxControl.textAreaNode, {height: "8em", width: "95%", padding: "5px;"});
                dojo.attr(this.textBoxControl.textAreaNode, {title:this._lang.ENTER_COMMENT, 'aria-label':this._lang.ENTER_COMMENT});
                this.textBoxControl._mentionsHelper.disableURLPreview = true;
            }
            this.textBoxControl.expandTextBox();
  		    this.mentionsDataFormatter = new lconn.core.widget.mentions.MentionsDataFormatter();
        }
	
        this.textBoxControl.resetBox();
        this.addCommentFormAP.style.display = "";
        this.addCommentLinkAP.style.display = "none";
        this.textBoxControl.setFocus();
        
        dojo.publish(lconn.calendar.topic.clearMessage);
        
        this.isHidden = false;
        this.monitorPermissionOfMentions();
    },
    
    performCreate: function() {
    	var content = null;
    	if(this.mentionsEnabled) {
            content = this.mentionsDataFormatter.formatData(this.textBoxControl.getTrackedMentions());
    	} else {
    		content = this.textBoxControl.getText();
    	}
    	content = dojo.trim(content);
        if (content.length > 0) {
            var comment = {eventInstUuid: this.entry.uuid, content: content};
            this.calendar.store.addComment(comment, dojo.hitch(this, function(entry) {
                this.totalComments ++;
                var lastPage = Math.ceil(this.totalComments / this.commentsPerPage);
                this.showComments(lastPage);
            }));
            
            // close the textarea
            this.cancelCreate();
        } else {
            // show error
            this.commentErrorAP.style.display = "";
        }
    },
    
    cancelCreate: function() {
    	this.isHidden = true;
        this.commentErrorAP.style.display = "none";
        this.addCommentFormAP.style.display = "none";
        this.addCommentLinkAP.style.display = "";
        dojo.byId(this.wid + "_addCommentLink").focus();
    },
    
    deleteComment: function(evt) {
        dojo.stopEvent(evt);
        var commentUuid = dojo.attr(evt.target, "uuid");
        
        var messageNode = dojo.create("div",{
            innerHTML:this._lang.CONFIRM_DELETE_COMMENT
        });
        var confirmDialog;
        var onDeleteCallBack = function(uuid) {
            this.performDelete(uuid);
            confirmDialog.hide();
        };
        
        confirmDialog = lconn.core.DialogUtil.popupForm(
                this._lang.CONFIRM,
                messageNode,
                this._lang.DELETE,
                this._lang.CANCEL,
                dojo.hitch(this,onDeleteCallBack,commentUuid),
                null
            );
        dojo.publish(lconn.calendar.topic.clearMessage);
    },
    
    performDelete: function(commentUuid) {
        this.calendar.store.removeComment(commentUuid, dojo.hitch(this, function() {
            this.totalComments --;
            var currentPage = this.topPagingWidget.getCurrentPage();
            var lastPage = Math.ceil(this.totalComments / this.commentsPerPage);
            this.showComments(currentPage < lastPage ? currentPage : lastPage);
        }));
    },
    
    _oneCommentUI: function(comment) {
        var p0 = this.getUserPhotoUrl(comment.authorUuid);
            
        var personNode = this._formatPersonSpan(comment.authorName, comment.authorUuid);
        var dateString = lconn.core.DateUtil.toStringForTimeinMs(comment.createOn);
        var p1 = dojo.string.substitute(this._lang.COMMENT_META, [personNode, dateString]);
        
        var p2 = comment.content;
        var p3 = comment.authorStatus == "active" ? "" : " lotusDim";
        var html = 
            '<div class="lotusPost">' + 
                '<div class="lotusPostAuthorInfo"><div class="lotusPostAvatar${3}"><img class="usersRadius" role="presentation" style="width: 35px; height: 35px;" src="${0}" alt="" /></div></div>' + 
                '<div class="lotusPostContent">' + 
                    '<div class="lotusMeta">${1}</div>' + 
                    '<div class="lotusPostDetails"><div class="lotusChunk bidiAware">${2}<br></div></div>' + 
                    '<div class="lotusActions"></div>' + 
                '</div>' + 
            '</div>';
        
        html = dojo.string.substitute(html, [p0, p1, p2, p3]);
        var node = dojo.create("li", {className:"lotusCommentItem", innerHTML:html, uuid: comment.commentUuid});
        
        lconn.calendar.Lazy.addOnLoad(['/lconn/calendar/preference'], {viewer: this, comment: comment, node: node}, function() {
            if (this.viewer._canDeleteComment(this.comment)) {
                var actionsDiv = dojo.query("div.lotusActions", this.node)[0];
                
                var ul = document.createElement('ul');
                dojo.addClass(ul, 'lotusInlinelist');
                
                var li = document.createElement('li');
                dojo.addClass(li, 'lotusFirst');
                ul.appendChild(li);
                
                var a = dojo.create("a", {uuid: this.comment.commentUuid, href: "javascript:;", role: "button",
                    innerHTML: this.viewer._lang.DELETE, onclick: dojo.hitch(this.viewer, "deleteComment")});
                li.appendChild(a);
                
                actionsDiv.appendChild(ul);
            }
        }, false, this.calendar.isVisitor);
        
        return node;
    },
    
    _canDeleteComment: function(comment) {
        if(this.calendar.calendarInfo.allowComment != 'all' && !this.calendar.isMember && !this.calendar.isOwner)
            return false;
        var isCreator = (this.calendar.userProfile.getItemValue("userId") == comment.authorUuid);
        return (this.calendar.isOwner || isCreator);
    },
    
    _canAddComment: function() {
        if(this.calendar.calendarInfo.allowComment != 'all' && !this.calendar.isMember && !this.calendar.isOwner)
            return false;
        return !!this.calendar.userProfile.getItemValue("userId");
    },
    
    attendeesPerPage: 10,
    
    totalAttendees: 0,
    
    prepareAttendeePaging: function() {
        var pagingParam = {
            pageSize: this.attendeesPerPage,
            _lang: this._lang,
            total: dojo.hitch(this, function() {
                return this.totalAttendees;
            }),
            onPage: dojo.hitch(this, function(p) {
                this.showAttendees(p);
            }),
            onPageSizeChange: dojo.hitch(this, function(ps) {
                this.attendeesPerPage = ps;
                this.showAttendees(1);
            })
        };
        if (!this.attendeeTopPagingWidget) {
            var param = dojo.mixin({features:["info", "list", "nav"],aria_label:this._lang.PAGING_ATTENDEE_LABEL}, pagingParam);
            this.attendeeTopPagingWidget = new lconn.calendar.Paging(param, this.attendeeTopPagingAP);
        }
        if (!this.attendeeBottomPagingWidget) {
            var param = dojo.mixin({features:["nav", "ps"],aria_label:this._lang.PAGING_ATTENDEE_BOTTOM_LABEL}, pagingParam);
            this.attendeeBottomPagingWidget = new lconn.calendar.Paging(param, this.attendeeBottomPagingAP);
        }
        this.attendeeTopPagingWidget.domNode.style.display = 'none';
        this.attendeeBottomPagingWidget.domNode.style.display = 'none';
        this.attendeeBottomPagingWidget.pagePSAP.style.display='none';
    },
    
    showAttendeeTab: function() {
        this.attendeeAP.style.display = "";
    },
    
    showAttendees: function(page) {
        var eventUuid = this.entry.parent;
        var instUuid =this.entry.uuid;
        this.calendar.store.getAttendees(eventUuid, instUuid, dojo.hitch(this, function(attendees, total) {
            var tabTitle = dojo.string.substitute(this._lang.TAB_ATTENDEE, [total]);
            dojo.html.set(this.attendeeTabTitle, tabTitle);
            this.totalAttendees = total;
            
            this._showHideNode(this.noAttendeeHintAP, (total>0?false:true));
            
            this.attendeeTopPagingWidget.update(page, this.attendeesPerPage);
            this.attendeeBottomPagingWidget.update(page, this.attendeesPerPage);
            
            // hide paging bar, if non attendee
            if(total <= this.attendeesPerPage) {
                this.attendeeTopPagingWidget.domNode.style.display = 'none';
                this.attendeeBottomPagingWidget.domNode.style.display = 'none';
            } else {
                this.attendeeTopPagingWidget.domNode.style.display = '';
                this.attendeeBottomPagingWidget.domNode.style.display = '';
            }
            this.attendeeBottomPagingWidget.pagePSAP.style.display='none';
            
            dojo.empty(this.attendeeListAP);
            for (var i=0,l=attendees.length; i<l; i++) {
                var attendee = attendees[i];
                var node = this._oneAttendeeUI(attendee);
                if (i==0)
                    dojo.addClass(node, "lotusFirst");
                this.attendeeListAP.appendChild(node);
            }
            
            if(SemTagSvc) {
                SemTagSvc.parseDom(null, this.attendeeListAP);
            }
            // Bidi support
            lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
        }), page, this.attendeesPerPage);
    },

    _oneAttendeeUI: function(attendee) {
        var p0 = this.getUserPhotoUrl(attendee.authorUuid);
            
        var personNode = this._formatPersonSpan(attendee.authorName, attendee.authorUuid, attendee.userState);
        var dateString = lconn.core.DateUtil.toStringForTimeinMs(attendee.createOn);
        var p1 = personNode;
        
        var p2 = "";
        if (attendee.role) {
            if(attendee.role == 'owner') {
                p2 = this._lang.OWNER;
            } else if(attendee.role == 'member') {
                p2 = this._lang.MEMBER;
            }
        }
        var p3 = attendee.userState == "active" ? "" : " lotusDim";
        
        var html = 
            '<div class="lotusPost">' + 
                '<div class="lotusPostAuthorInfo"><div class="lotusPostAvatar${3}"><img class="usersRadius" role="presentation" style="width: 35px; height: 35px;" src="${0}" alt="" /></div></div>' + 
                '<div class="lotusPostContent">' + 
                    '<div class="lotusMeta">${1}</div>' + 
                    '<div class="lotusPostDetails"><div class="lotusChunk">${2}<br></div></div>' + 
                    '<div class="lotusActions"></div>' + 
                '</div>' + 
            '</div>';
        
        html = dojo.string.substitute(html, [p0, p1, p2, p3]);
        var node = dojo.create("li", {className:"lotusCommentItem", innerHTML:html, uuid: attendee.attendeeUuid});
        lconn.calendar.Lazy.addOnLoad(['/lconn/calendar/preference'], {viewer: this, attendee: attendee, node: node}, function() {
        }, false, this.calendar.isVisitor);
        
        return node;
    },
    
    prepareAttendees: function(page) {
        lconn.calendar.Lazy.addOnLoad(['/lconn/calendar/preference'], this, function() {
            
        }, false, this.calendar.isVisitor);
        this.showAttendees(page);
    },
    
    _showHideNode: function(node, isShow) {
        var value = isShow ? "" : "none";
        node.style.display = value;
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
    
    resetActionToolbar: function() {
        if(this.actionToolbar != null) {
            this.actionToolbar.destroy();
            this.actionToolbar = null;
        }
        this.actionToolbar = new lconn.core.aria.Toolbar(this.actionBar);
    },
    
    _permissionOfMentionsCache: {},
    _lastWarningIds: {"items": []},
    
    monitorPermissionOfMentions: function() {
    	if(!this.mentionsEnabled) {
    		return;
    	}
    	
    	this.checkPermissionOfMentions();
    	
    	var modified = false;
    	var warningIds = {"items": []};
    	var warnings = [];
    	var mentioned = this.useRTE ? this.textBoxControl.getMentions() : this.textBoxControl._mentionsHelper.getMentions();
		for(var i = 0; i < mentioned.length; i++) {
			var usrId = this.useRTE ? mentioned[i].getUserId() : mentioned[i].data;
			if(!!this._permissionOfMentionsCache[usrId]) {
				if(this._permissionOfMentionsCache[usrId] == "false") {
					mentioned[i].removeSymbol();
					if(!warningIds[usrId]) {
					    warnings.push(mentioned[i].value);
					    warningIds[usrId] = true;
					    warningIds.items.push(usrId);
					    if(!this._lastWarningIds[usrId]) {
					    	modified = true;
					    }
					}
				}
			}
		}
		
		if(!modified) {
			if(this._lastWarningIds.items.length != warningIds.items.length) {
				modified = true;
			}
		}
		
		this._lastWarningIds = warningIds;
		if(modified) {
			var msg = '<span>';
			if(window.communityType != 'private') {
				msg = msg + this._lang.MENTION["NOT_SAME_ORGANIZATION_WARNING"];
	    	} else {
	    		msg = msg + this._lang.MENTION["NOT_MEMBER_WARNING"];
	    	}
			msg = msg + '</span>';
			
			msg = msg + '<ul>';
			for (var i = 0; i < warnings.length; i++) {
				msg = msg + '<li>';
				msg = msg + lconn.calendar.CalendarUtil.escapeForXSS(warnings[i]);
				msg = msg + '</li>';
    		}
			msg = msg + '</ul>';
			
			if(warnings.length > 0) {
	    		this.permissionWarningSummary.style.display = '';
	    		this.permissionWarningMessage.innerHTML = msg;
			} else {
				this.permissionWarningSummary.style.display = 'none';
			}
		}
	    	
		var This = this;
    	if(!this.isHidden) {
	    	setTimeout(function(){
	    		This.monitorPermissionOfMentions();
	    	}, 1000);
    	}
    },
    
    checkPermissionOfMentions: function() {
    	if(this.mentionsEnabled) {
    		var mentioned = this.useRTE ? this.textBoxControl.getMentions() : this.textBoxControl._mentionsHelper.getMentions();
    		for(var i = 0; i < mentioned.length; i++) {
    			var usrId = this.useRTE ? mentioned[i].getUserId() : mentioned[i].data;
    			if(!usrId || dojo.trim(usrId).length == 0)
    				continue;
    			if(!this._permissionOfMentionsCache[usrId]) {
    				var This = this;
    				this._permissionOfMentionsCache[usrId] = "true";
    				if(window.communityType == 'private') {
    					var args = {
    						url: lconn.core.url.getServiceUrl(lconn.core.config.services.communities).uri 
    							+ "/service/json/community/canviewcommunity?communityUuid=" + this.calendar.resourceId + "&directoryUuid=" + usrId,
    						handleAs: "json",
    						load: function(data) {
    							This._permissionOfMentionsCache[usrId] = data.canViewCommunity? "true" : "false";
    						},
    						error: function(response, ioArgs) {
    							This._permissionOfMentionsCache[usrId] = "false";
    						}		
	    				};
	    				dojo.xhrGet(args);
    				}
    				if(window.communityType != 'private') {
    					var args = {
    						url: this.calendar.rootUrl + "/json/permission?calendarUuid=" + this.calendar.resourceId + "&userExternalId=" + usrId,
    						handleAs: "json",
    						load: function(data) {
    							This._permissionOfMentionsCache[usrId] = (data.hasAccess ? "true" : "false");
    						},
    						error: function(response, ioArgs) {
    							This._permissionOfMentionsCache[usrId] = "false";
    						}		
	    				};
    	    			dojo.xhrGet(args);
    				} 
    			}
    		}
    	}
    }
});
