/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.calendar.dss.CalendarTypeHandler");
dojo.provide("lconn.calendar.dss.AlldayHandler");
dojo.provide("lconn.calendar.dss.RecPickerHandler");
dojo.provide("lconn.calendar.dss.EditTypeHandler");
dojo.provide("lconn.calendar.dss.CKEditorHandler");
dojo.provide("lconn.calendar.dss.NotificationInEditorHandler");

dojo.require("lconn.calendar.dss.IHandlers");
dojo.require("lconn.calendar.dss.IAutoSavable");

dojo.declare("lconn.calendar.dss.CalendarTypeHandler", [lconn.calendar.dss.IHandlers], {
	supportedHandlers: function() {
		return {
			"calendar.allday": "lconn.calendar.dss.AlldayHandler",
			"calendar.typeAhead": "lconn.calendar.dss.DijitInputHandler",
			"calendar.recPicker": "lconn.calendar.dss.RecPickerHandler",
			"calendar.editType": "lconn.calendar.dss.EditTypeHandler",
			"calendar.ckeditor": "lconn.calendar.dss.CKEditorHandler",
			"calendar.notifyInEditor": "lconn.calendar.dss.NotificationInEditorHandler"
		};
	}
});

dojo.declare("lconn.calendar.dss.AlldayHandler", [lconn.calendar.dss.CheckHandler], {
	setValue: function(value) {
		this.inherited(arguments);
		
		var wid = this.attr.wid;
		if (value) {
			//dojo.byId(wid + "-time").style.display = 'none';
			dojo.byId(wid + "-time-label").style.display = 'none';
			dojo.byId(wid + "-divstime").style.display = 'none';
		} else {
			//dojo.byId(wid + "-time").style.display = '';
			dojo.byId(wid + "-time-label").style.display = '';
			dojo.byId(wid + "-divstime").style.display = 'inline';
		}
	}
});

dojo.declare("lconn.calendar.dss.RecPickerHandler", [lconn.calendar.dss.BaseDijitHandler], {
	getValue: function() {
		var widget = dijit.byId(this.getID());
		var r = widget.value();
		if (r.until) r.until = r.until.getTime();
		var isCreate = widget.editor.isNewEvent;
		var isSourceSingle = false;
		if (!isCreate) {
			var e = widget.editor._editSource;
			isSourceSingle = (e.recurrence.freq == "custom");
		}
		var isSingle = (r.freq == "custom");
        dojo.mixin(r, {enableSelect: isCreate || isSingle || isSourceSingle});
        return dojo.toJson(r);
	},
	setValue: function(value) {
		var widget = dijit.byId(this.getID());
		var r = dojo.fromJson(value);
		if (r.until) r.until = new Date(r.until);
		widget.autoUpdateUntil = false;
		widget.setup(r, r.enableSelect);
		window.setTimeout(function() {
			widget.autoUpdateUntil = true;
		}, 500);
	}
});

dojo.declare("lconn.calendar.dss.EditTypeHandler", [lconn.calendar.dss.IAutoSavable], {
	getID: function() {
		return this.attr.editorId + "-editType";
	},
	getValue: function() {
		var editor = dijit.byId(this.attr.editorId);
		return editor._getEditType();
	},
	setValue: function(value) {
		var editor = dijit.byId(this.attr.editorId);
		if (!editor.isNewEvent) {
			var freq = editor._editSource.recurrence.freq;
			if (freq != "custom")
				editor._setEditType(value, true);
		}
	}
});

dojo.declare("lconn.calendar.dss.CKEditorHandler", [lconn.calendar.dss.IAutoSavable], {
	getID: function() {
		return this.attr.editorId + "-ckeditor";
	},
	getValue: function() {
		var editor = dijit.byId(this.attr.editorId);
		return editor.editor.getData();
	},
	setValue: function(value) {
		var editor = dijit.byId(this.attr.editorId);
		editor._setEditorData(value);
	}
});

dojo.declare("lconn.calendar.dss.NotificationInEditorHandler", [lconn.calendar.dss.IAutoSavable], {
	getID: function() {
		return this.attr.editorId + "-notify";
	},
	getValue: function() {
		var editor = dijit.byId(this.attr.editorId);
		if(!editor._node("notify").checked) {
			return null;
		}
		var notifyMsg = editor._node("notify").checked ? editor.notifyWidget.message.value : '';
		var receivers = editor.notifyWidget.receiverWidget.receivers;
		return dojo.toJson({msg: notifyMsg, receivers: receivers});
	},
	setValue: function(value) {
		var r = dojo.fromJson(value);
		if(typeof r == 'undefined') 
		    return;
		
		var editor = dijit.byId(this.attr.editorId);
			
		editor._node("notify").checked = true;
		editor.toggleNotify();
		if (r.msg) {
			editor.notifyWidget.message.value = r.msg;
		}
		
		if(r.receivers) {
			dojo.subscribe(lconn.calendar.topic.peopleListLoaded, dojo.hitch({notifyWidget: editor.notifyWidget, receivers: r.receivers}, function(){
				for(var i = 0; i < this.receivers.length; i++) {
				    this.notifyWidget.receiverWidget.add(this.receivers[i].fullname, this.receivers[i].extid, this.receivers[i].email);
				}
			}));
		}
		
		if(editor.notifyWidget.__peopleListLoaded) {
			dojo.publish(lconn.calendar.topic.peopleListLoaded);
		}
	}
});