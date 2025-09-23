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

dojo.provide("lconn.calendar.EditorView");

dojo.require("dojo.i18n");
dojo.require("dojo.parser");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.require("dijit.form.Form");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.TimeTextBox");
dojo.require("lconn.calendar.DateTextBox");

dojo.require("lconn.calendar.ckeditor");
dojo.require("lconn.calendar.CalendarStore");
dojo.require("lconn.calendar.RecurrencePicker");

dojo.require("lconn.core.TypeAheadDataStore");
dojo.require("lconn.core.TypeAhead");
dojo.require("lconn.core.HelpLauncher");

dojo.require("lconn.calendar.dss.AutoSave");
dojo.require("lconn.core.globalization.bidiUtil");

dojo.declare("lconn.calendar.EditorView", [dijit._Widget, dijit._Templated], {
	templateString: null,
	templatePath: dojo.moduleUrl('lconn.calendar', 'templates/editorView.html'),
	
	cancelAction: function() { }, // clicked cancel
	postSubmitAction: function() { }, // clicked after the event is submitted
	
	clearTypeAheadStoreCache: function() {this._dnode("tagsAsString") && this._dnode("tagsAsString").store.clear();},
	//the cancelAction function was override by CalendarWidgetImpl.js, but we should call clear cache function before that function,so we handled as this
	doCancel: function() {this.clearTypeAheadStoreCache(); this.cancelAction();},

	calendar: null,
	
	blankImageUrl: dojo.config.blankGif,
	
	editor: null,

	_MAX_INPUT_LENGTH_SHORT: 255,
	_MAX_INPUT_LENGTH_LONG: 2047,

	_node: function(name) { return dojo.byId(this.id+'-'+name); },
	_dnode: function(name) { return dijit.byId(this.id+'-'+name); },

	_editSource: null, // the current pulled event for an edit

	// configuration options
	autoUpdateTime: true, // automatically update end time when start time changes
	// the time value of the start time picker
	// this is so we can know what it was when we handle the on change event after it has changed
	_savedTime: null,
	
	title: function(t) { this._node('title').innerHTML = t; },
	// lock editor from submitting
	lock: function() { this._node('submit').disabled = true; },
	unlock: function() { this._node('submit').disabled = false; },

	/**
	 * Set the start/end date inputs
	 */
	_setDate: function(start, end) {
		var t = new Date(start);
		t.setMinutes(15);
		
		this._dnode('sdate').setGregorianDate(t);
		var dateExample = this._dnode('sdate').textbox.value;
		
		this._dnode('stime').attr('value', t);
		var timeExample = this._dnode('stime').textbox.value;
		
		this._dnode('sdate').setGregorianDate(start);
		this._dnode('edate').setGregorianDate(end);

		this.autoUpdateTime = false;

		this._dnode('stime').attr('value', start);
		this._dnode('etime').attr('value', end);

		this.autoUpdateTime = true;

		// set saved time (wipe date)
		this._savedTime = start;
		
		// a11y
		var _this = this;
		window.setTimeout(function(){
			_this._dnode('sdate').invalidMessage = dojo.string.substitute(_this._lang.ENTER_DATE_EXAMPLE, [dateExample]);
			_this._dnode('edate').invalidMessage = dojo.string.substitute(_this._lang.ENTER_DATE_EXAMPLE, [dateExample]);
			_this._dnode('stime').invalidMessage = dojo.string.substitute(_this._lang.ENTER_TIME_EXAMPLE, [timeExample]);
			_this._dnode('etime').invalidMessage = dojo.string.substitute(_this._lang.ENTER_TIME_EXAMPLE, [timeExample]);
		}, 1);
	},
	
	/**
	 * Set editing type (series, exception)
	 * has no effect when edit options are disabled
	 * @argument type the type to set "series" or "exception"
	 * @argument setRadio whether to set the radio button picker
	 */
	_setEditType: function(type, setRadio) {
		var subject = this._dnode("subject");
		if(subject) subject.attr("value", this._editSource.subject);
		
		var tagsAsString = this._dnode("tagsAsString");
		if(tagsAsString) tagsAsString.attr("value", this._editSource.tags.join(", "));
		
		if (type == 'exception') {	// edit the instance
			this._setDate(this._editSource.startDate, this._editSource.endDate);
			
			var freq = this._editSource.recurrence.freq;
			if (freq != "custom") {
				if(subject) subject.attr("disabled", true);
				if(tagsAsString) tagsAsString.attr("disabled", true);
				this._node('recurrenceRow').style.display = 'none';
			}

			this._node('allDay').checked = (this._editSource.allDay == '1');
			this._handleTime();
			
			this._dnode("imageUrl").attr("value", this._editSource.imageUrl);
			//this._dnode("location").attr("value", this._editSource.location);
			//this._setEditorData(this._editSource.description);
			
		} else { // editing series
			if(subject) subject.attr("disabled", false);
			if(tagsAsString) tagsAsString.attr("disabled", false);
			
			this._setDate(this._editSource.series.recurrence.startDate, this._editSource.series.recurrence.endDate);
			
			this._node('allDay').checked = (this._editSource.series.recurrence.allDay == '1');
			this._handleTime(); 
			
			this._node('recurrenceRow').style.display = '';
			this.recPickerWidget.setup(this._editSource.series.recurrence, false);
			
			this._dnode("imageUrl").attr("value", this._editSource.series.imageUrl);
			//this._dnode("location").attr("value", this._editSource.series.location);
			//this._setEditorData(this._editSource.series.description);
		}

		if (setRadio) this._node(type).checked = true;
	},
	
	/**
	 * Get the current edit type
	 * has no meaning when not editing recurring event
	 */
	_getEditType: function() {
		if (this._node('series').checked) return 'series';
		else return 'exception';
	},
	
	_setEditorData: function(data) {
		if (this.editor) {
			this.editor.setData(data);
		} else {
			this._editorData = data;
		}
	},
	
	/**
	 * Clear all the inputs and set defaults for editor
	 */
	clear: function(resetData) {
		this._dnode('form').reset();
		
		if(resetData) this._setEditorData('<p></p>');
				
		this.recPickerWidget.clear();
		
		this._node('recurrenceRow').style.display = '';
		this._node('editOptions').style.display = 'none';
		this._node('exception').checked = true;

		this._hideErrors();
		this._hideWarnings();
		
		this.unlock();
	},

	/**
	 * Gets the value of the entire editor
	 * @return object representation of the value for use in CalendarStore
	 */
	value: function() {
		var raw = this._dnode('form').attr('value');
		
		raw.description = this.editor.getData();
		
		// tags
		if(raw.tagsAsString) {
			var tags = this.cUtil.splitTags(raw.tagsAsString);
			raw.tags = tags;
		}
		
		var startDate = this.util.mixDates(this._dnode('sdate').getGregorianDate(), raw.stime);
		var endDate = this.util.mixDates(this._dnode('edate').getGregorianDate(), raw.etime);
		
		raw.isAllDay = this._node('allDay').checked;

		var r = this.recPickerWidget.value();

		var e = {
			subject: raw.subject,
			description: raw.description,
			tags: raw.tags,
			location: raw.location,
			imageUrl: raw.imageUrl,
			startDate: startDate, 
			endDate: endDate, 
			allDay: raw.isAllDay,
			recurrence: r
		};
		
		if (this._editSource) {
			var s = this._editSource;
			var editType = this._getEditType();

			e.id = s.id;
			e.uuid = s.uuid;
			e.uuid_date = s.uuid_date;

			/**
			 * clean up any unchanged values
			 */
			s.allDay = (s.allDay=='1' ? true : false);
			
			e.editType = editType;
			
			if (editType == 'exception' && (s.recurrence.freq != "custom" || e.recurrence.freq == "custom")) {
				// only check on exception because it should be safe to always 
				// send it on the series update
				if (e.description == s.description) delete e.description;
				if (e.location == s.location) delete e.location;
				if (e.imageUrl == s.imageUrl) delete e.imageUrl;
				if (e.subject == s.subject) delete e.subject;

				delete e.recurrence;
				
				var dateNotChange = false;
				var allDayNotChange = false;
				if (e.startDate.getTime() == s.startDate.getTime() && e.endDate.getTime() == s.endDate.getTime()) {
					dateNotChange = true;
				}
				if (e.allDay === s.allDay) {
					allDayNotChange = true;
				}
				if (allDayNotChange && dateNotChange) {
					delete e.startDate;
					delete e.endDate;
					delete e.allDay;
				}
			} else { // series or, single event updated to series
				e.parent = this._editSource.parent;
				if (r.freq != 'custom' && s.recurrence.freq != 'custom') {
					// need to pass the startDate if all day is set
					if (e.startDate.getTime() == s.recurrence.startDate.getTime() 
						&& e.endDate.getTime() == s.recurrence.endDate.getTime()
						&& !e.allDay)
					{
						delete e.startDate;
						delete e.endDate;
					}
				}
			}
		}
		return e;
	},
	
	_prepareForm: function(e, isCreate) {
		if (e.subject)	
			this._dnode("subject").attr("value", e.subject);
		if (e.tags) {
			this._dnode("tagsAsString").attr("value", e.tags.join(", "));
		}
		if (e.imageUrl)
			this._dnode("imageUrl").attr("value", e.imageUrl);
		if (e.location)	
			this._dnode("location").attr("value", e.location);
		if (e.description) 
			this._setEditorData(e.description);
		if (e.allDay) {
			var allday = (e.allDay=="1" || e.allDay=="true" || e.allDay===true) ? true : false;
			this._node("allDay").checked = allday;
		}
		if (e.startDate && e.endDate)
			this._setDate(e.startDate, e.endDate);
		
        this._handleTime(); 
        
        var freq = e.recurrence.freq;
        var editType = e.editType ? e.editType : "exception";	// exception by default
        
        var isSingle = (freq == "custom");
        var isException = (freq != "custom" && editType == "exception");
        var isSeries = (freq != "custom" && editType == "series");
        
		this._node("editOptions").style.display = (isCreate || isSingle) ? "none" : "";
		this._node("recurrenceRow").style.display = isException ? "none" : "";
		this._dnode("subject").attr("disabled", isException);
		this._dnode("tagsAsString").attr("disabled", isException);
		
		this.recPickerWidget.setup(e.recurrence, (isCreate || isSingle));
	},
	
	/**
	 * Prepare the editor by filling all the inputs from the provided event
	 * @argument e the event to fill editor with
	 */
	prepareForEdit: function(e) {
		this.isNewEvent = false;
		
		this.title(this._lang.EDIT_EVENT);
		this._editSource = e;
		
		this.resetNotify();
		this._prepareForm(e, false);
		
		if(this.cancelHandler) {
			dojo.disconnect(this.cancelHandler);
		}
		var _this = this;
		this.cancelHandler = dojo.connect(this._node('cancel'), "onclick", this.calendar, dojo.hitch(_this, 'doCancel'));
		
		this.restoreFromSession();
		
		// focus
		if (e.recurrence.freq == "custom") {
			this._dnode("subject").focus();
		} else {
			if (this._node("exception").checked === true)
				this._node("exception").focus();
			else if (this._node("series").checked === true)
				this._node("series").focus();
		}
		
		this.initNotify();
		
		// Bidi support
    	lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
	},
	
	/**
	 * Prepare editor for a new event
	 * @argument dd Date object to set initial date value to
	 */
	prepareForNew: function(dd) {
		this.isNewEvent = true;
		
		this.title(this._lang.ADD_EVENT);
		this._editSource = null;
		
		this._dnode("subject").attr("disabled", false);
		this._dnode("tagsAsString").attr("disabled", false);
		
        this._node('allDay').checked = false;
        this._handleTime();
        
        var currentDate = new Date();
		var start = dd ? new Date(dd.getTime()) : currentDate;
		if(!dd || dd.getDate() == currentDate.getDate()) {	// create in upcoming view
			start.setMinutes(currentDate.getMinutes()+16); // Bump up to next quarter hour; changing hour if necessary
			start.setMinutes(Math.ceil((start.getMinutes()-15)/15)*15); // Set to next quarter hour
			start.setSeconds(0);
			start.setMilliseconds(0);
		} else
			start.setHours(0, 0, 0, 0);
		
		this._setEditorData('<p></p>');
		
		// 1 hour later
		var end = new Date(start.getTime() + 1000*60*60);
		this._setDate(start, end);
		
		if(this.cancelHandler) {
			dojo.disconnect(this.cancelHandler);
		}
		var _this = this;
		this.cancelHandler = dojo.connect(this._node('cancel'), "onclick", this.calendar, dojo.hitch(_this, 'doCancel'));
		
		this.resetNotify();
		
		this.restoreFromSession();
		
		// set focus to title
		this._dnode("subject").focus();
		this.initNotify();
		
		// Bidi support
    	lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
	},
	
	restoreFromSession: function() {
		// load from session storage
		if (this.autosave.isSupport()) {
			var stamp = this.cUtil.getHashParam("stamp");
			if(this.autosave.load(stamp)){
				if(this.autosave.parser.ss.get(this.id + "-notify") == true){
					this.initNotify();
				}
			} else {
				return;
			}
			this.autosave.parse(this.domNode, stamp);
		}
	},
	
	/**
	 * Localization and other static stat imported here
	 */
	postMixInProperties: function() {
		lconn.calendar.CalendarData.get().mixin(this);
		this.util = lconn.calendar.EditorView.util;
		this.cUtil = lconn.calendar.CalendarUtil;
		this.userId = this.calendar.userProfile.getItemValue("userId");
	},
	
	destroy: function(){
		if (this.notifyWidget) {
			this.notifyWidget.destroyRecursive();
			this.notifyWidget = null;
		}
		if (this.recPickerWidget) {
			this.recPickerWidget.destroyRecursive();
			this.recPickerWidget = null;
		}
		
		if(!!this._mention_permission_check_workthread) {
			clearTimeout(this._mention_permission_check_workthread);
		}
		if(!!this.editor) {
		    this.editor.destroy();	// destroy CKEDITOR
		    this.editor = null;
		}
		
		var form = this._dnode("form");
		if(form && form.destroyRecursive){
			form.destroyRecursive(true);
		}
		
		dojo.unsubscribe(this.notifySuccessHandler);
		dojo.unsubscribe(this.notifyErrorHandler);
		
		dojo.disconnect(this.validateHandler1);
		dojo.disconnect(this.validateHandler2);
		
		this.inherited(arguments);
	},

	/**
	 * Set and display errors
	 * @argument errors the errors to display
	 */
	_setErrors: function(errors) {
		if (!(this._errorMessageHead)){
			
		}
		var x,y,z;
		if (this._errorMessage ){
			try{
				this._errorMessage.close();
			}catch (e){}
			this._errorMessage = null
		}
		var lang = lconn.calendar.CalendarData.get()._lang;
		y = document.getElementsByTagName("fieldset")[0]
		z = y.getElementsByTagName("div")[0]
		// directly using the oneui, 
		// modified the dom in oneui
		// NOT using the UIMessage (in calander) because the appearance is different
		x = new com.ibm.oneui.controls.MessageBox({
			canClose: true,
			_strings: {
				icon_alt: lang.ERROR,
				a11y_label: lang.ERROR,
				close_btn_title: lang.CLOSE,
				close_btn_alt: lang.CLOSE,

			},
			type: com.ibm.oneui.controls.MessageBox.TYPE.ERROR,
			msg: lang.ERROR_HEADER,
		},z )
		
		this._errorMessage= x
		// some hack on the oneui MessageBox
		// MessageBox does not provide list.
		var w = x.domNode.getElementsByTagName("div")[0]
		
		var ul = document.createElement('ul')
		ul.style["padding-left"]="15px"
		
		for (var i = 0; i < errors.length; i++) {
			var li = document.createElement('li');
			li.appendChild(document.createTextNode(errors[i]));
			ul.appendChild(li);
		}
		w.appendChild(ul);
		
		return;
		
	},

	_hideErrors: function() {
		if(this._errorMessage){
			try{
				this._errorMessage.close();
			}catch (e){}
			this._errorMessage = null;
		}
	},
	
	/**
	 * Set and display warnings
	 * @argument warnings the warnings to display; currently not used;
	 *   only outputs lang.START_DATE_IN_PAST
	 */
	_setWarnings: function(warnings) {
		var x,y,z;
		if (this._warningMessage){
			try{
				this._warningMessage.close();
			}catch (e){}
			this._warningMessage = null
		}
		var lang = lconn.calendar.CalendarData.get()._lang;
		y = document.getElementsByTagName("fieldset")[0]
		z = y.getElementsByTagName("div")[0]
		// directly using the oneui, 
		// modified the dom in oneui
		// NOT using the UIMessage (in calander) because the appearance is different
		x = new com.ibm.oneui.controls.MessageBox({
			canClose: true,
			_strings: {
				icon_alt: lang.WARNING,
				a11y_label: lang.WARNING,
				close_btn_title: lang.CLOSE,
				close_btn_alt: lang.CLOSE
			},
			type: com.ibm.oneui.controls.MessageBox.TYPE.WARNING,
			msg: lang.START_DATE_IN_PAST,
		},z )
		
		this._warningMessage= x
		return;
	},
	
	_hideWarnings: function() {
		if(this._warningMessage){
			try{
				this._warningMessage.close();
			}catch (e){}
			this._warningMessage = null;
		}
	},
	
	_hidePermissionWarnings: function() {
		this._node('permissionWarningSummary').style.display = 'none';
	},
	
	/**
	* Called when the all day event check box is clicked
	* Hide stime and etime if checkbox is selected 
	* Show otherwise
	*/
	_handleTime: function() {
		var allDay = this._node('allDay');
		if (allDay.checked){
			this._node('time-label').style.display = 'none';
			this._node('divstime').style.display = 'none';
		} else {
			this._node('time-label').style.display = '';
			this._node('divstime').style.display = 'inline';
		}
	},

	/**
	 * Called when the submit button is clicked, will validate the 
	 * contents of the form the call the appropriate store method
	 */
	_submitAction: function() {
		dojo.publish(lconn.calendar.topic.clearMessage);
		var form = this._dnode('form');
		var _lang = this._lang;
		var _desc = this.util.htmlToPlainText(dojo.doc, this.editor.getData());
		
		var isAllDay = this._node('allDay').checked;

		var errors = new Array();
		var invalidTime = false;
		
		if (!this._dnode('subject').isValid()) errors.push(_lang.SUBJECT_INVALID);
		
		var sdate = this._dnode('sdate');
		var stime = this._dnode('stime');
		var edate = this._dnode('edate');
		var etime = this._dnode('etime');
		var tagString = this._dnode('tagsAsString');

		if (!sdate.isValid() || !sdate.getGregorianDate()) {
			errors.push(_lang.START_DATE_INVALID);
			invalidTime = true;
		}
		if (!edate.isValid() || !edate.getGregorianDate()) {
			errors.push(_lang.END_DATE_INVALID);
			invalidTime = true;
		}

		if (!stime.isValid() || !stime.value) {
			errors.push(_lang.START_TIME_INVALID);
			invalidTime = true;
		}
		if (!etime.isValid() || !etime.value) {
			errors.push(_lang.END_TIME_INVALID);
			invalidTime = true;
		}
		if (tagString.isValid() && tagString.textbox.value) {
			if(tagString.textbox.value.indexOf('&') != -1)
			errors.push(_lang.INVALID_CHAR_IN_TAG);
			invalidTime = true;
		}

		var _stime, _etime;
		if (!invalidTime) {
			if(isAllDay) {
				_stime = new Date(sdate.getGregorianDate().getFullYear(), sdate.getGregorianDate().getMonth(), sdate.getGregorianDate().getDate(), 0, 0, 0);
				_etime = new Date(sdate.getGregorianDate().getFullYear(), sdate.getGregorianDate().getMonth(), sdate.getGregorianDate().getDate() + 1, 0, 0, 0);
			} else {
				_stime = this.util.mixDates(sdate.getGregorianDate(), stime.value);
				_etime = this.util.mixDates(edate.getGregorianDate(), etime.value);
			}
			if (!isAllDay && (_etime <= _stime))
				errors.push(_lang.START_TIME_AFTER_END);
			
			if ((_etime-_stime)/3600/1000 > 24 && !isAllDay)
				errors.push(_lang.DURATION_LARGER_THAN_24H);
		}
		
		if (this._dnode('location').attr('value').length > this._MAX_INPUT_LENGTH_SHORT)
			errors.push(_lang.LOCATION_LENGTH);

		if (this._dnode('subject').attr('value').length > this._MAX_INPUT_LENGTH_SHORT)
			errors.push(_lang.SUBJECT_LENGTH);
		
		if (!invalidTime)
			this.recPickerWidget.validate(errors);
		
        var imageUrl = this._node("imageUrl").value;
        if (imageUrl != "" && !this.cUtil.isUrl(imageUrl))
        	errors.push(_lang.IMAGE_URL_INVALID);
        
        if(this._node("notify").checked) {
           if(!this.notifyWidget || this.notifyWidget.receiverWidget.receivers.length == 0) {
        	   errors.push(_lang.NO_MEMBER_SELECTED_NOTIFICATION_INVALID);
           }
        }
        
		if (errors.length) {
			this._setErrors(errors);
			return false;
		} else
			this._hideErrors();
		
		var value = this.value();

		var notifyMsg = this._node("notify").checked ? this.notifyWidget.message.value : null;

		this.lock();

		var response = dojo.hitch(this, function(error, res) {
			this.unlock();
			if (!!this._node("notify").checked) {
				if (this._editSource) {						// we are editing
					if (this._getEditType() == "series")	// edit the event series 
						this.notify(res, "event");
					else if(this.recPickerWidget._node("recurrenceDisable").checked && this._editSource.recurrence.freq == "custom"){ //or changing to event series
						this.notify(res, "event");
					} else 								// edit the instance
						this.notify(res, "instance");
				} else {									// we are creating events
					this.notify(res, "event");	
				}
			}
			this.clearTypeAheadStoreCache();
			this.postSubmitAction();
		});
		
		var errorHandler = dojo.hitch(this, function(error, io) {
			this.unlock();
			this.clearTypeAheadStoreCache();
			if (error.status == 401) {
				// unauthorized: session timeout
				if (this.autosave.isSupport()) {
					var stamp = this.cUtil.getHashParam("stamp");
					this.autosave.save(this.domNode, stamp);
					return true;
				}
			}else if (error.status == 403) {
				//unauthorized: When an authority change is made during community event creation, set message content
				var message =this._lang.NOT_AUTHORIZED;
				this._setErrors([message]);
				return true;
				
			}else {
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
				
				if(dojo.trim(message).length > 0) {
					if(message.length > 12 && message.substring(0, 5) == 'CLFRZ') {
						message = message.substring(12);
					}
					
					this._setErrors([message]);
					
					return true;
				}
			}
			return false;
		});
		
		if (this._editSource) {
			this.store.put(value, !value.recurrence, response, errorHandler);
		} else {
			this.store.post(value, response, errorHandler);
		}
	},
	initNotify: function() {
		if (!this.notifyWidget) {
			this.notifyWidget = new lconn.calendar.Notification(
				{calendar: this.calendar, showNotifyButton: false, handleSuccessView: "editView", handleFailureView: "editView"}, 
				this.notificationContainer);
		}
	},
	toggleNotify: function() {
		var checkbox = this._node("notify");
		var selectAllDiv = document.getElementById('select_all_member');
		if (checkbox.checked) {
			this.notificationTR.style.display = "";
			if(selectAllDiv !== null) {
				selectAllDiv.style.display = "block";
			}
			this.initNotify();
		} else {
			if(selectAllDiv !== null) {
				selectAllDiv.style.display = "none";
			}
			this.notificationTR.style.display = "none";
		}
	},

	performSelectAll: function() {
		var ele = document.getElementsByClassName('lconnNotify');
		var selectAll = document.getElementById('select_all');
		if(selectAll.checked) {
			for(var i = 0; i < ele.length; i++) {
				if(!ele[i].getElementsByClassName("lotusLeft")[0].checked)
					ele[i].getElementsByClassName("lotusLeft")[0].click();
			}
		} else {
			for(var i = 0; i < ele.length; i++) {
				if(ele[i].getElementsByClassName("lotusLeft")[0].checked)
					ele[i].getElementsByClassName("lotusLeft")[0].click();
			}
		}
	},
	
	resetNotify: function() {
		this._node("notify").checked = false;
		this.notificationTR.style.display = "none";
		if (this.notifyWidget) {
			this.notifyWidget.reset();
		}
	},
	
	notify: function(responseDoc, type) {
		var entry = this.store._docToEvent(responseDoc);
		this.notifyWidget.uuid = entry.uuid;
		this.notifyWidget.eventOrInstance = type;
		this.notifyWidget.notify();
	},
	
	onNotifySuccess: function(handleSuccessView) {
	    /*
		if (handleSuccessView == "editView") {
			var msg = this._lang.NOTIFY_SUCCESS;
			var type = lconn.calendar.UIMessage.msgType.CONFIRM;
			dojo.publish(lconn.calendar.topic.showMessage, [msg,type]);
		}
		*/
	},
	
	onNotifyError: function(error, handleErrorView) {
		if (handleErrorView == "editView") {
			var msg = dojo.string.substitute(this._lang.NOTIFY_ERROR_2, [error]);
			var type = lconn.calendar.UIMessage.msgType.WARNING;
			dojo.publish(lconn.calendar.topic.showMessage, [msg,type]);
		}
	},
	
	enter: function(load) {
		if (load) {}
		this.initialCKEditor();
		this.domNode.style.display = "block";
	},
	
	exit: function(unload) {
		if (unload) {}
		
		if(!!this._mention_permission_check_workthread) {
			clearTimeout(this._mention_permission_check_workthread);
		}
		if(!!this.editor) {
			this.editor.destroy();	// destroy CKEDITOR
			this.editor = null;
		}
		
		this.domNode.style.display = "none";
		this.permissionWarningSummary.style.display = 'none';
	},
	
	/**
	 * Widget initialization goes here, localization is already loaded
	 */
	onReady: function(ev) {
		this.editor = ev.editor;
		var _this = this;
        	
        	ckeditor = this.editor;
        	_mention_permission_last_warnings = {};
        	_mention_permission_last_mentioned = null;
			_mention_permission_last_mentioned_count = -1;
			_mention_permission_check_running = false;
			
			function checkAndRefreshWarningMessages(forceRefresh) {
			    var _mention_permission_has_change = false;
			
			    var mention_warning_filter = null;
			    var mention_warning_filter_count = -1;
    			try {
    			    var cur_mentioned = dojo.query('.vcard .x-lconn-userid', ckeditor.document.$);
    				mention_warning_filter = {};
    				for(var i = 0; i < cur_mentioned.length; i++) {
    				    mention_warning_filter[dojo.trim(cur_mentioned[i].innerHTML)] = 1;
    				    mention_warning_filter_count++;
    				    if(_mention_permission_last_mentioned == null || typeof _mention_permission_last_mentioned[dojo.trim(cur_mentioned[i].innerHTML)] == 'undefined') {
    				        _mention_permission_has_change = true;
    				    }
    				}
    		    } catch(err){}
    		    
    		    if(!forceRefresh && mention_warning_filter == null) {
    		        if(!forceRefresh) {
    		            _this._mention_permission_check_workthread = setTimeout(function(){
	    		            checkAndRefreshWarningMessages(false);
	    	            }, 1000);
	    	            _mention_permission_check_running = true;
	    	        }
    		        return;
    		    }
    		    
    		    if(!_mention_permission_has_change && mention_warning_filter_count == _mention_permission_last_mentioned_count && !forceRefresh) {
    		        if(!forceRefresh) {
    		        	 _this._mention_permission_check_workthread = setTimeout(function(){
	    		            checkAndRefreshWarningMessages(false);
	    	            }, 1000);
	    	            _mention_permission_check_running = true;
	    	        }
    		        return;
    		    }
    		    
    		    _mention_permission_last_mentioned = mention_warning_filter;
    		    _mention_permission_last_mentioned_count = mention_warning_filter_count;
    				         	 
    		    var cnt = 0;
    		    var msg = '';
    		    if(window.communityType == 'private') {
    		        msg = '<span>' + nls.MENTION["NOT_MEMBER_WARNING"] + '</span>';
    		    } else {
    		        msg = '<span>' + nls.MENTION["NOT_SAME_ORGANIZATION_WARNING"] + '</span>';
    		    }
    		    msg = msg + '<ul>';
    		    for(uid in _mention_permission_last_warnings) {
    				if(_mention_permission_last_warnings[uid] != 1 && (mention_warning_filter == null || typeof mention_warning_filter[uid] != 'undefined')) {
    				    msg = msg + '<li>' + lconn.calendar.CalendarUtil.escapeForXSS(_mention_permission_last_warnings[uid]) + '</li>';
    				    cnt = cnt + 1;
    				}
    			}
    		    msg = msg + '</ul>';
    				         	 
    		    if(cnt == 0) {
    		    	_this.permissionWarningSummary.style.display = 'none';
    		    } else {
    		    	_this.permissionWarningSummary.style.display = '';
    				_this.permissionWarningMessage.innerHTML = msg;
    		    }
    		    
    		    if(!forceRefresh || (!_mention_permission_check_running && cnt > 0)) {
    		    	 _this._mention_permission_check_workthread = setTimeout(function(){
	    		        checkAndRefreshWarningMessages(false);
	    	        }, 1000);
	    	        _mention_permission_check_running = true;
	    	    }
			}
			
        	this.editor.config.ibmMentionShouldNotifyCallback = function(item){
			    nls = _this._lang;
			
			    var userId = item.userid;
			    var userName = item.name;
			    if(_mention_permission_last_warnings[userId] == 1) 
			        return true;
			    if(_mention_permission_last_warnings[userId] == 0) 
			        return false;
			    
			    return {
			    	'userId': userId,
			    	'userName': userName,
			    	'then': function(add, remove) {
			    		if(window.communityType == 'private') {
				             var communityId = _this.calendar.resourceId;
				             var This = this;
				             var args = {
	    				         url: lconn.core.url.getServiceUrl(lconn.core.config.services.communities).uri 
	    					        + "/service/json/community/canviewcommunity?communityUuid=" + communityId + "&directoryUuid=" + this.userId,
	    				         handleAs: "json",
	    				         load: function(data) {
	    				             if(data.canViewCommunity){
	    				            	 _mention_permission_last_warnings[This.userId] = 1;
                                     } else {
                                    	 this.error();
                                     }
	    				         },
	    				         error: function(response, ioArgs) {
	    				             try {
	    				                 remove();
	    				             } catch(err){}
	    				         	 _mention_permission_last_warnings[This.userId] = This.userName;
	    				         	 checkAndRefreshWarningMessages(true);
	    				         }		
		    		         };
		    		         dojo.xhrGet(args);
			    		} else {
			    			var communityId = _this.calendar.resourceId;
				            var This = this;
				            var args = {
	    						url: _this.calendar.rootUrl + "/json/permission?calendarUuid=" + communityId + "&userExternalId=" + this.userId,
	    						handleAs: "json",
	    						load: function(data) {
	    				    		if(!data.hasAccess) {
	    				       			this.error();
	    				    		}
	    				    		_mention_permission_last_warnings[This.userId] = 1;
	    						},
	    						error: function(response, ioArgs) {
	    						    try {
	    				                 remove();
	    				            } catch(err){}
	    						    _mention_permission_last_warnings[This.userId] = This.userName;
	    						    checkAndRefreshWarningMessages(true);
	    						}		
		    				};
		    				dojo.xhrGet(args);
			    		}
			    	}
			    };
			};
	},
	onChange: function() {},
	hideRepeatOptions : function(){
		this.recPickerWidget.toggleRepeatSection();
	},
	
	initialCKEditor: function() {
		var _this = this;
 		
		//lconn.core.ckeditor.async(dojo.hitch(this, function() {
			if(this.editor != null) {
				return;
			}
			lconn.core.ckeditor.replace(_this._node("description"), {
			    customConfigMethod: lconn.calendar.ckeditor.doInitCKEditorConfig,
				on: {
				 	pluginsLoaded: dojo.hitch(_this, function(ev) {
	            		if (this._editorData) {
		              		ev.editor.setData(this._editorData);
		              		delete this._editorData;
	            		}
          			}),
					instanceReady: dojo.hitch(_this, "onReady"),
					blur: dojo.hitch(_this, "onBlur"),
					focus: dojo.hitch(_this, "onFocus"),
					change: dojo.hitch(_this, "onChange"),
					getSnapshot: dojo.hitch(_this, function(){return this.snapshot;}),
					loadSnapshot: dojo.hitch(_this, function(snapshot){this.snapshot = snapshot;})
				},
				width: "100%"
			});
		//}));
	},
	postCreate: function() {
		var _this = this;
		dojo.parser.parse(this.domNode);
		
		if(this.calendar.customEventIcon) {
			this.eventIconFieldAP.style.display = '';
		}
		
		var _this = this;
	  	function initHelp(spanElem, heading, message) {
	  		var helpStrings = {
   					HELP: _this._lang.HELP,
   					CLOSE: _this._lang.CLOSE_HELP
			};   
    		spanElem.appendChild( lconn.core.HelpLauncher.createHelpLink(null, heading, message, helpStrings) );
	  	}
	  	initHelp(this._node('tagsAsStringHELP'), null, this._lang.EVENT_EDITOR_TAGS_HELP);
	  	initHelp(this._node('editTypeHELP'), null, this._lang.REPEATING_EVENTS_EDIT_TYPE_HELP);
      
		var _lang = this._lang;
		
		this._node('submit').onclick = function(e) {
			_this._submitAction();
			return false;
		};

		// action buttons
        this._node('allDay').onclick = function() {
        	_this._handleTime();
        	
        	var t = dojo.byId('label_aria_live_allday');
        	t.innerHTML = _this._lang.ALLDAY_UPDATED_MSG_HINT;
        };
        this._node('allDay').onblur = function() {
        	var t = dojo.byId('label_aria_live_allday');
        	t.setAttribute('aria-live', 'off');
        	t.innerHTML = '';
        };
        this._node('allDay').onfocus = function() {
        	var t = dojo.byId('label_aria_live_allday');
        	t.setAttribute('aria-live', 'assertive');
        };
      
		// set edit mode
		this._node('exception').onclick = function() { if (this.checked) _this._setEditType('exception'); };
		this._node('series').onclick = function() { if (this.checked) _this._setEditType('series'); };

		// validation function
		this._dnode('subject').isValid = function() {
			if (!this.attr('value')) return false;
			return true;
		};

		// this inserts a callback into the validate function of the start time picker
		// that will automatically update the end time while preserving the duration

		var stime = this._dnode('stime');
		var sdate = this._dnode('sdate');
		
		this.recPickerWidget = new lconn.calendar.RecurrencePicker(
				{editor: this, _lang: _lang, id: this.id+"_rec", autosave: "type=calendar.recPicker"}, 
				this._node("recurrencePicker"));
		
		if (this.autoUpdateTime) {
			// auto update etime when changing the stime
			this.validateHandler1 = dojo.connect(stime, 'validate', this, function() {
				var newDate = stime.value;
				var oldDate = this._savedTime || null;
				if (this.autoUpdateTime && newDate && (oldDate == null || newDate.getTime() != oldDate.getTime())) {
					// if we have an old date, then update the end time by the delta
					var edate = this._dnode('edate').getGregorianDate();
					var etime = this._dnode('etime').attr('value');
					if(edate && etime) {
						var end = this.util.mixDates(edate, etime);
						if (oldDate && end) {
							var minuteDelta = 
								(newDate.getHours() - oldDate.getHours()) * 60 + (newDate.getMinutes() - oldDate.getMinutes());
							
							end.setMinutes(end.getMinutes() + minuteDelta);
							this._dnode('edate').setGregorianDate(end);
							this._dnode('etime').attr('value', end);
						}
					}
					var tempSDate = this._dnode('sdate').getGregorianDate();
					if(tempSDate)
						this._savedTime = this.util.mixDates(tempSDate, newDate);
				}
			});
			// auto update the edate when changing the sdate
			this.validateHandler2 = dojo.connect(sdate, 'validate', this, function() {
				var newDate = sdate.getGregorianDate();
				var newTime = this._dnode('stime').value;
				var oldDate = this._savedTime || null;
				if (this.autoUpdateTime && newDate && newTime && (oldDate == null || newDate.getTime() != oldDate.getTime())) {
					var endDate = this._dnode('edate').getGregorianDate();
					if (oldDate && endDate) {
						var nt = this.util.mixDates(newDate, newTime);
						var delta = nt.getTime() - oldDate.getTime();
						endDate.setTime(endDate.getTime() + delta);
						this._dnode('edate').setGregorianDate(endDate);
					}
					this._savedTime = this.util.mixDates(newDate, newTime);
				}
			});
		}

		function _checkDateTimeInPast() {
			if (_this._dnode('sdate').valueNode.value && _this._dnode('stime').valueNode.value) {
				var warnings = new Array();
				
				var _sdatetime = new Date(_this._dnode('sdate').valueNode.value+_this._dnode('stime').valueNode.value);
				var _sdatetime2UTCTime = new Date(_sdatetime.getTime() + (_sdatetime.getTimezoneOffset()*60*1000)); // Gets it to UTC time
				_sdatetime = _sdatetime2UTCTime.getTime() < _sdatetime.getTime() ? _sdatetime : _sdatetime2UTCTime;
				
				if (_sdatetime.getTime() < new Date().getTime()) {
					warnings.push(_lang.START_DATE_IN_PAST);
				}
				
				warnings.length ? _this._setWarnings(warnings) : _this._hideWarnings();
			}
		};
		
		this._dnode('sdate').onChange = _checkDateTimeInPast;
		this._dnode('stime').onChange = _checkDateTimeInPast;
		
		this.notifySuccessHandler = dojo.subscribe(lconn.calendar.topic.notifySuccess, dojo.hitch(this, "onNotifySuccess"));
		this.notifyErrorHandler = dojo.subscribe(lconn.calendar.topic.notifyError, dojo.hitch(this, "onNotifyError"));
		
		this.autosave = new lconn.calendar.dss.AutoSave(this.userId);
		
		dojo.addClass(this._dnode("sdate").textbox, "lotusText");
		dojo.addClass(this._dnode("stime").textbox, "lotusText");
		dojo.addClass(this._dnode("edate").textbox, "lotusText");
		dojo.addClass(this._dnode("etime").textbox, "lotusText");
		
		//hack for Japanese fonts on IE
		if(dojo.isIE){
			if(dojo.marginBox(this._dnode("sdate").textbox).h <= 13){
				this._dnode("sdate").textbox.style.height = "14px";
			}
			if(dojo.marginBox(this._dnode("stime").textbox).h <= 13){
				this._dnode("stime").textbox.style.height = "14px";
			}
			if(dojo.marginBox(this._dnode("edate").textbox).h <= 13){
				this._dnode("edate").textbox.style.height = "14px";
			}
			if(dojo.marginBox(this._dnode("etime").textbox).h <= 13){
				this._dnode("etime").textbox.style.height = "14px";
			}
		}
		
		// required fields aria attributes
		this._dnode("subject").textbox.setAttribute("aria-required", "true");
		this._dnode("sdate").textbox.setAttribute("aria-required", "true");
		this._dnode("stime").textbox.setAttribute("aria-required", "true");
		this._dnode("edate").textbox.setAttribute("aria-required", "true");
		this._dnode("etime").textbox.setAttribute("aria-required", "true");
		
		// a11y
		this._dnode("stime").textbox.setAttribute("aria-label", this._lang.EVENT_STARTTIME_LABEL);
		this._dnode("etime").textbox.setAttribute("aria-label", this._lang.EVENT_ENDTIME_LABEL);
	}
});

lconn.calendar.EditorView.util = {
	/**
	 * combine the date and time of two dates into one
	 * @argument dd the date object to take date from
	 * @argument tt the date object to take time from
	 */
	mixDates: function(dd, tt) {
		return new Date(dd.getFullYear(), dd.getMonth(), dd.getDate(), 
			tt.getHours(), tt.getMinutes());
	},
	
	htmlToPlainText: function(d, htmlText) {
		var domObject = d.createElement("div");
		domObject.innerHTML = htmlText;
		if(dojo.isIE)
			return domObject.innerText;
		else
			return domObject.textContent;
	}
};