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

dojo.provide("lconn.calendar.Receivers");
dojo.provide("lconn.calendar.FilteringCheckbox");
dojo.provide("lconn.calendar.Notification");
dojo.provide("lconn.calendar.NotificationDialog");

dojo.require("lconn.core.FilteringCheckbox");
dojo.require("lconn.core.aria._Helper");

dojo.require("lconn.calendar.UIMessage");

dojo.declare("lconn.calendar.FilteringCheckbox", [lconn.core.FilteringCheckbox], {
	feedFunctionForFilterName: null,
	reset: function() {
		for (var i in this.peopleSelected) {
			var id = this.id + "notifyCheckbox" + i;
			var checkbox = dojo.byId(id);
			if (checkbox) checkbox.checked = false;
		}
		this.currPage=1;
		this.peopleSelected = {};
		this.filterTextbox_AP.value = this.rs_filterListPrompt;
		dojo.addClass(this.filterTextbox_AP, "lotusInactive");
		this.oldTextValue = "";
		this.access_AP.innerHTML = "";
		this.showList(this.peopleList);
	},
	destroy: function() {
		try {
			this.inherited(arguments);
		} catch(e) {
			console.log(e);
		}
	},
	
	_onBlur: function(event) {
		// onblur: if no input, set back the hint
		if (this.filterTextbox_AP.value == "")
			this.filterTextbox_AP.value = this.resBundle.rs_filterListPrompt;
		this.inherited(arguments);
	},
	readySearch: function(event) {
		// onfocus -- remove the hint if it's hint
		if (this.filterTextbox_AP.value == this.resBundle.rs_filterListPrompt)
			this.filterTextbox_AP.value = "";
		this.inherited(arguments);
	},
	
	filterNames: function(event) {
        if (this.filterTextbox_AP && this.filterTextbox_AP.value != this.oldTextValue
              && this.filterTextbox_AP.value != this.rs_filterListPrompt) {
           this.oldTextValue = this.filterTextbox_AP.value;
           if(this.filterTextbox_AP.value.trim().length == 0){
        	   this.feedFunction(this.currPage, dojo.hitch(this, "parsePeople"));
       	   }else{
       		   this.feedFunctionForFilterName(this.currPage, this.filterTextbox_AP.value, dojo.hitch(this, "parsePeople"));
       	   }
        }
    }
});

dojo.declare("lconn.calendar.Receivers",
	[dijit._Widget, dijit._Templated],
	{
		templateString:
		    '<DIV dojoAttachPoint="receiversContainer" tabindex="0" role="list" class="notifyReceivers">' + 
				'<DIV class="lotusFilters2" dojoAttachPoint="receiverList_AP"></DIV>' +
				'<INPUT type="hidden" name="receivers" dojoAttachPoint="receivers_AP" value="">' +
			'</DIV>',
			
		receivers: [],
		
		inputBox: false,
		
		// need pass in
		communityUrl: null,
		// need pass in
		messages: null,
		// need pass in
		id: null,
		
		ariaHelper: false,
		
		startup: function() {
			this.receivers_AP.clear = dojo.hitch(this, 'clear');
			this.receiversContainer.setAttribute('id', this.id + "_receiversContainer");
			this.receiversContainer.style.display = "none";	// hide by default
			this.receiversContainer.onfocus = dojo.hitch(this, function() {
				if(this.ariaHelper) {
					this.ariaHelper.selIdx = this.ariaHelper.allItems.length - 1;
					for(var i = 0; i < this.ariaHelper.allItems.length; i++) {
					    this.ariaHelper.allItems[i].tabIndex = -1;
					}
				}
			});
		},
		
		form: function() {
		    return this.receivers_AP.form;
		},
		
		// callback need to connect
		onChange: null,
		
		add: function(fullname, extid, email) {
		    if(typeof extid == 'undefined' && typeof email == 'undefined') {
		        return;
		    }
		
		    var t = [];
			for(var i = 0; i < this.receivers.length; i++) {
			    if((typeof extid == 'undefined' || this.receivers[i].extid != extid) 
			           && (typeof email == 'undefined' || this.receivers[i].email != email)) {
			    	t.push(this.receivers[i]);
			    }
			}
			t.push({'extid': extid, 'email': email, 'fullname': fullname});
			
			this.receivers = t;
			if(this.onChange) {
				this.onChange({'extid': extid, 'email': email, 'fullname': fullname}, 'add');
			}
			
			this.repaint();
			
			// aria announce
		},
		
		remove: function(extid, email) {
		    if(typeof extid == 'undefined' && typeof email == 'undefined') {
		        return;
		    }
		    
		    var t = [];
			for(var i = 0; i < this.receivers.length; i++) {
			    if((typeof extid == 'undefined' || this.receivers[i].extid != extid) 
			           && (typeof email == 'undefined' || this.receivers[i].email != email)) {
			    	t.push(this.receivers[i]);
			    }
			}
			
			this.receivers = t;
			if(this.onChange) {
				var selectAll = document.getElementById('select_all');
				if(selectAll) {
					selectAll.checked = false;
				}
				this.onChange({'extid': extid, 'email': email}, 'remove');
			}
			
			this.repaint();
			
			if(this.receivers.length > 0) {
			    this.receiversContainer.focus();
			} else {
			    if(this.inputBox) {
					this.inputBox.focus();
				} 
			}
		},
		
		clear: function() {
			this.receivers = [];
			if(this.onChange) {
				this.onChange(this.receivers);
			}
			
			this.repaint();
		},
		
		repaint: function() {
			if(this.ariaHelper) {
			    this.ariaHelper.destroy();
				this.ariaHelper = false;
			}
			
		    var s = '';
			for(var i = 0; i < this.receivers.length; i++) {
				if(s.length > 0) {
					s = s + ', ';
				}
				var receiver = this.receivers[i];
				s = s + '<' + (typeof receiver.extid == 'undefined'? receiver.email : receiver.extid) + '>';
			}
			this.receivers_AP.value = s;
			
			if (this.receivers.length > 0) {
				this.domNode.style.display = "";
			} else {
				this.domNode.style.display = "none";
			}
			
			this.receiverList_AP.innerHTML = '';
			for(var i = 0; i < this.receivers.length; i++) {
			    var receiver = this.receivers[i];
				
			    var memberDIV = document.createElement('span');
			    dojo.attr(memberDIV, 'id', 'receiver_' + i);
			    memberDIV._onclick = dojo.hitch(this, 'remove', receiver.extid, receiver.email);
			    
			    this.receiverList_AP.appendChild(memberDIV);
				
				var personVCard = lconn.calendar.PeoplelinkUtil.formatPersonLink({userid:receiver.extid, name:lconn.calendar.CalendarUtil.trimToLength(receiver.fullname, 31)}, false, false);
				var personLinks = dojo.query('.lotusPerson', personVCard);
				if(personLinks.length > 0) {
					var personLink = personLinks[0];
					dojo.attr(personLink, 'role', "listitem");
					dojo.addClass(personLink, 'lotusFilter');
					personLink.href = 'javascript:dojo.byId(\'receiver_' + i +'\')._onclick();';
					personLink.innerHTML = '<label class="lotusOffScreen">' + this.messages.REMOVE + ": </label>";
					var removeImg = document.createElement("img");
					dojo.addClass(removeImg, 'lotusDelete');
					dojo.attr(removeImg, "role", "presentation");
					dojo.attr(removeImg, "alt", this.messages.REMOVE);
					dojo.attr(removeImg, "src", dojo.config.blankGif);
					var personSpan = document.createElement("span");
					personSpan.innerHTML = lconn.calendar.CalendarUtil.escapeForXSS(lconn.calendar.CalendarUtil.trimToLength(receiver.fullname, 31));
					dojo.attr(personSpan, "class", dojo.attr(personLink, "class"));
					dojo.attr(personLink, "class", "lotusFilter");
					personVCard.removeChild(personLink);
					personLink.appendChild(personVCard);
					personLink.appendChild(removeImg);
					personVCard.insertBefore(personSpan, personVCard.children[0]);
					memberDIV.appendChild(personLink);
				} else {
					memberDIV.appendChild(personVCard);
				}
				
				var delAltSpan = document.createElement('a');
				dojo.addClass(delAltSpan, 'lotusAltText');
				delAltSpan.innerHTML = 'X';
				delAltSpan.href = 'javascript:dojo.byId(\'receiver_' + i +'\')._onclick();';
				dojo.attr(delAltSpan, 'role', "button");
				personLink.appendChild(delAltSpan);
			}
			
			//Tricky fix for #45688 user name display issue in Safari
			this.receiverList_AP.appendChild(document.createTextNode(" "));
			
			if (window.SemTagSvc && SemTagSvc.parseDom) {
            	SemTagSvc.parseDom(0, this.receiverList_AP);
    		}
			
			this.ariaHelper = new lconn.core.aria._Helper(this.id + '_receiversContainer', {containerRole: "list", itemRole: "listitem"});
			dojo.connect(this.ariaHelper, '_focusItem', function() {
			    if(this.allItems.length == 1) {
				    dijit.focus(this.allItems[0]);
					this.selIdx = 0;
				}
			});
		}
	}
);

dojo.declare("lconn.calendar.Notification", [dijit._Widget, dijit._Templated], {
	// the calendar widget
	calendar: null,
	uuid: null,
	eventOrInstance: "instance",	// notify about event or instance?

	// options
	// if showed, we also need to attach the functions
	showNotifyButton: true,
	ps: 500,
	
	// the view that should handle success/failure -- listView, detailView, editView, dialog
	handleSuccessView: null,
	handleFailureView: null,
		
	custom_handlers: null,
	
	templateString:
		'<DIV class="notification_container">' +
			'<DIV><LABEL dojoAttachPoint="memberPickerLabel">${_lang.PICK_MEMBERS}</LABEL></DIV>' +
			'<DIV class="person_picker">' +
				'<DIV dojoAttachPoint="personFilter"></DIV>' +
				'<DIV dojoAttachPoint="personList"></DIV>' +
			'</DIV>' +
			'<DIV><LABEL for="${id}-message-textarea">${_lang.NOTIFICATION_MESSAGE}</LABEL></DIV>' +
			'<TEXTAREA id="${id}-message-textarea" row="5" class="bidiAware" dojoAttachPoint="message">${_lang.NOTIFY_DEFAULT_MESSAGE}</TEXTAREA><BR/>' +
			'<INPUT class="lotusFormButton" type="button" value="Notify" dojoAttachPoint="notifyPoint" />' +
		'</DIV>',
	
	postMixInProperties: function() {
		lconn.calendar.CalendarData.get().mixin(this);
	},

	postCreate: function() {
		this.custom_handlers = [];
		this.filterWidget = new lconn.calendar.FilteringCheckbox({}, this.personFilter);
		//Need later fix to lconn.core.FilteringCheckbox
		if(dojo.isIE){
			this.filterWidget.filterTextbox_AP.style.width="100%";
		}
		this.receiverWidget = new lconn.calendar.Receivers(
				{communityUrl: this.calendar.commUrl, 
				 id: dojox.uuid.generateTimeBasedUuid(),
				 messages: this._lang}, this.personList);
		
		this.__peopleListLoaded = false;
		dojo.subscribe(lconn.calendar.topic.peopleListLoaded, dojo.hitch(this, function(){
			this.__peopleListLoaded = true;
		}));
		
		var handler1 = dojo.connect(this.filterWidget, "feedFunction", dojo.hitch(this, function(page, callback) {
			var url = this.calendar.rootUrl + "/members?commUuid=" + this.calendar.resourceId + "&ps=" + this.ps + "&offset=" + (page-1)*this.ps;
			dojo.xhrGet({
 		 		url: url,
 		 		handleAs: 'json',
 		 		load: function(data){
 		 		    if(data.success) {
 		 				callback(data);
 		 				//Invoke session timeout restore for notify people list
 		 				dojo.publish(lconn.calendar.topic.peopleListLoaded);
 		 		    }
 		 		},
 		 		error: function(err){
 		 			console.log(err);
 		 		}
 		 	});
		}));
		this.custom_handlers.push(handler1);
		
		var handler12 = dojo.connect(this.filterWidget, "feedFunctionForFilterName", dojo.hitch(this, function(page, userName, callback) {
			var url = this.calendar.rootUrl + "/members?commUuid=" + this.calendar.resourceId + "&userName=" + userName + "&ps=" + this.ps + "&offset=" + 0 + "&useNewAPI=1";
			dojo.xhrGet({
 		 		url: url,
 		 		handleAs: 'json',
 		 		load: function(data){
 		 		    if(data.success) {
 		 				callback(data);
 		 				//Invoke session timeout restore for notify people list
 		 				dojo.publish(lconn.calendar.topic.peopleListLoaded);
 		 		    }
 		 		},
 		 		error: function(err){
 		 			console.log(err);
 		 		}
 		 	});
		}));
		this.custom_handlers.push(handler12);
		
		var handler2 = dojo.connect(this.filterWidget, "personSelected", dojo.hitch(this, function(person, selected) {
			if(selected) {
				this.receiverWidget.add(person.name, person.uuid);
			} else {
				this.receiverWidget.remove(person.uuid);
			}
			if (this.receiverWidget.receivers.length == 0) {
				this.receiverWidget.domNode.style.display = "none";
			} else {
				this.receiverWidget.domNode.style.display = "";
			}
		}));
		this.custom_handlers.push(handler2);
		
		var handler3 = dojo.connect(this.receiverWidget, "onChange", dojo.hitch(this, function(person, op) {
			if(op=="remove") {
				this.filterWidget.selectItem({uuid:person.extid, name:person.fullname}, false);
				if(this.receiverWidget.receivers.length == 0) {
					this.filterWidget.filterTextbox_AP.focus();
				}
			}
			if(op=="add") {
				this.filterWidget.selectItem({uuid:person.extid, name:person.fullname}, true);
			}
		}));
		this.custom_handlers.push(handler3);
		
		this.filterWidget.getList();
		this.receiverWidget.startup();
		
		if (this.showNotifyButton) {
			this.notifyPoint.style.display = "block";
			this.connect(this.notifyPoint, "onclick", this.notify);
		} else {
			this.notifyPoint.style.display = "none";
			// should connect the event somewhere else
		}
		
		this.memberPickerLabel.setAttribute("for", this.filterWidget.filterTextbox_AP.getAttribute("id"));
		// Bidi support
    	lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.message.parentNode);
	},
	
	notify: function() {
		if (this.receiverWidget.receivers.length > 0) {
			var recipients = "";
			for (var i=0, l=this.receiverWidget.receivers.length; i<l; i++) {
				var receiver = this.receiverWidget.receivers[i];
				recipients += receiver.extid;
				if (i<l-1)
					recipients += ";";
			}
			
			var body = this.message.value;
			
			var _this = this;
			dojo.xhrPost({
		 		url: _this.calendar.rootUrl + "/json/calendar/notify",
		 		handleAs: 'json',
		 		content: {
		 			uuid: _this.uuid,
		 			recipients: recipients,
		 			eventOrInstance: _this.eventOrInstance,
		 			body: body
		 		},
		 		load: function(data){
		 			if (data.success) {
		 				dojo.publish(lconn.calendar.topic.notifySuccess, [_this.handleSuccessView]);
		 			} else {
		 				dojo.publish(lconn.calendar.topic.notifyError, [data.error, _this.handleFailureView]);
		 			}
		 		},
		 		error: function(err){
		 			console.log(err);
					dojo.publish(lconn.calendar.topic.notifyError, [_this._lang.INTERNAL_SERVER_ERR, _this.handleFailureView]);
		 		}
		 	});
		}
	},
	
	reset: function() {
		this.receiverWidget.clear();
		this.filterWidget.reset();
		this.message.value = this._lang.NOTIFY_DEFAULT_MESSAGE;
	},
	
	destroy: function() {
		if (this.custom_handlers && this.custom_handlers.length > 0) {
			dojo.forEach(this.custom_handlers, dojo.disconnect);
		}
		if (this.receiverWidget) {
			this.receiverWidget.destroyRecursive();
		}
		if (this.filterWidget) {
			// TODO: need FilteringCheckbox fix
			this.filterWidget.destroy();
		}
		this.inherited(arguments);
	}
});

dojo.declare("lconn.calendar.NotificationDialog", null, {
	
	constructor: function(calendar, uuid, handleSuccessView, handleFailureView, focusId) {
		this.notifyWidget = new lconn.calendar.Notification(
				{calendar: calendar, uuid: uuid, showNotifyButton: false, 
					handleSuccessView: handleSuccessView, handleFailureView: handleFailureView});
		
		this._lang = lconn.calendar.CalendarData.get()._lang;
		
		var _this = this;
		
		// extend receiverWidget's onChange
		this.disableOkHandler = dojo.connect(this.notifyWidget.receiverWidget, "onChange", function() {
			if (_this.notifyWidget.receiverWidget.receivers.length>0) {
				_this.enableButton(dojo.byId("dialog_ok_btn"));
			} else {
				_this.disableButton(dojo.byId("dialog_ok_btn"));
			}
		});
		
		this.focusId = focusId;
		this.focusElem = dojo.byId(focusId);
		
		// subscribe notify success topic
		this.notifySuccess = dojo.subscribe(lconn.calendar.topic.notifySuccess, dojo.hitch(this, function(view){
			if (view == "dialog" || view == "listView" || view == "detailView")
				this.dialog.hide();
		}));
		// subscribe notify error topic
		this.notifyError = dojo.subscribe(lconn.calendar.topic.notifyError, function(error,view) {
			if (view == "dialog") {
				var msg = dojo.string.substitute(_this._lang.NOTIFY_ERROR, [error]);
				if(!_this.msgWidget) {
				    _this.msgWidget = new lconn.calendar.UIMessage(
						{_lang: _this._lang, commUrl: lconn.calendar.CalendarData.data.commUrl});
					_this.notifyWidget.domNode.parentNode.insertBefore(_this.msgWidget.domNode, _this.notifyWidget.domNode);
				}
				_this.msgWidget.oneMessageUI(msg, lconn.calendar.UIMessage.msgType.ERROR);
			}
		});
	},
	
	show: function() {
		if(dojo.isIE) {
			this.notifyWidget.domNode.style.width = '460px';
		} else {
			this.notifyWidget.domNode.style.width = '500px';
		}
	    
		dojo.addClass(this.notifyWidget.domNode, 'lotusForm');
		
	    this.dialog = lconn.core.DialogUtil.popupForm(
			this._lang.NOTIFY_TITLE,
			this.notifyWidget.domNode,
			this._lang.NOTIFY_OK,
			this._lang.CANCEL,
			dojo.hitch(this, function(){
			    this.notifyWidget.notify();
			}),
			dojo.hitch(this, function() {
			    this.notifyWidget.destroy();
				if (this.msgWidget)
					this.msgWidget.destroy();
				dojo.disconnect(this.disableOkHandler);
				dojo.unsubscribe(this.notifySuccess);
				dojo.unsubscribe(this.notifyError);
				this.dialog.hide();
			    if(this.focusElem) this.focusElem.focus();
			})
	    );
		
		var d = this.dialog._dialog;
		d.lotusSubmitNode.setAttribute('id', 'dialog_ok_btn');
		
		d.lotusContentNode.style.maxHeight = '1000px';
		
		this.disableButton(dojo.byId("dialog_ok_btn"));
	},
	
	disableButton: function(btn) {
		dojo.addClass(btn, "lotusBtnDisabled");
		dojo.attr(btn, "disabled", "true");
		dojo.attr(btn, "aria-disabled", "true");
	},
	
	enableButton: function(btn) {
		dojo.removeClass(btn, "lotusBtnDisabled");
		dojo.removeAttr(btn, "disabled");
		dojo.removeAttr(btn, "aria-disabled");
	}
});
