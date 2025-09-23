/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.calendar.UIMessage");
dojo.require("com.ibm.oneui.controls.MessageBox");

dojo.declare("lconn.calendar.UIMessage", dijit._Widget, {
	
	messages: null,
	
	postMixInProperties: function() {
		this.messages = [];
	},
	
	_lang: null,
	
	postCreate: function() {
		this.showMessages();
	},
	
	add: function(msg, type) {
		if (!!msg && typeof(type)!= 'undefined') {
			this.messages.push({message:msg, type:type});
		}
	},
	
	clear: function() {
		this.messages = [];
		// Destroy all children dijits
		this.destroyDescendants();
		dojo.empty(this.domNode);
	},
	
	oneMessageUI: function(msg, type) {
		var iconString, a11yLabel;
		switch(type){
			case lconn.calendar.UIMessage.msgType.ERROR : iconString = this._lang.ALT_ERROR_ICON; a11yLabel = this._lang.A11Y_CONFIRM_LABEL; break;
			case lconn.calendar.UIMessage.msgType.CONFIRM : iconString = this._lang.ALT_CONFIRM_ICON; a11yLabel = this._lang.A11Y_CONFIRM_LABEL;break;
			case lconn.calendar.UIMessage.msgType.WARNING : iconString = this._lang.ALT_WARNING_ICON; a11yLabel = this._lang.A11Y_WARNING_LABEL;
		}
		if(dojo.isString(msg)) {
			msg = dojo.create('span' ,{innerHTML: msg});
		}
		new com.ibm.oneui.controls.MessageBox({
            canClose: true,
	        _strings: {
				icon_alt: iconString,
				a11y_label: a11yLabel,
				close_btn_title: this._lang.CLOSE,
				close_btn_alt: this._lang.CLOSE
			 },
			 type: type,
			 msg: msg
		}, dojo.create("div",null,this.domNode,"last"));
	},
	
	showMessages: function() {
		dojo.empty(this.domNode);
		if (this.messages && this.messages.length > 0) {
			for (var i=0,l=this.messages.length; i<l; i++) {
				var message = this.messages[i];
				this.oneMessageUI(message.message, message.type);
			}
		}
	}
});

lconn.calendar.UIMessage.msgType = {
	ERROR: com.ibm.oneui.controls.MessageBox.TYPE.ERROR,
	CONFIRM: com.ibm.oneui.controls.MessageBox.TYPE.SUCCESS,
	WARNING: com.ibm.oneui.controls.MessageBox.TYPE.WARNING
};