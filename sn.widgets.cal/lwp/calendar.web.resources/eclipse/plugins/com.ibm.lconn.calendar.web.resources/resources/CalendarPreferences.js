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

dojo.provide('lconn.calendar.CalendarPreferences');

dojo.require("dojo.i18n");
dojo.require("dojo.parser");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare("lconn.calendar.CalendarPreferences", [dijit._Widget, dijit._Templated], 
{
	templateString: null,
	templatePath: dojo.moduleUrl('lconn.calendar', 'templates/calendarPreferences.html'),
	
	_calendar: null,
	calendarId: null,
	url: null,
	homeUrl: null,
	blankImageUrl: null,
		
	postCreate: function() {
		var args = {
						url: this.url,
						headers: {
							"X-CALENDAR-MEMBERSHIP": (this._calendar.isOwner ? "OWNER" : (this._calendar.isMember ? "MEMBER" : "NONE"))
						},
						handleAs: "xml",
						preventCache: true,
						load: dojo.hitch(this, "load"),
						error: dojo.hitch(this, "error")
					};
		dojo.xhrGet(args);					
	},

	postMixInProperties: function() {
		lconn.calendar.CalendarData.get().mixin(this);
	},
	
	saveAndClose: function(event){
		dojo.stopEvent(event); 
		
		var maprole = 'author';
		if(dojo.byId(this.id+'-form')[this.id+'-reader'].checked) {
			maprole = 'reader';
		} else if(dojo.byId(this.id+'-form')[this.id+'-author'].checked) {
			maprole = 'author';
		}
		
		var args = {
						url: this.url,
						headers: {
							"Content-type": "application/atom+xml",
							"X-CALENDAR-MEMBERSHIP": (this._calendar.isOwner ? "OWNER" : (this._calendar.isMember ? "MEMBER" : "NONE"))
						},
						handleAs: "xml",
						postData: '<?xml version="1.0" encoding="UTF-8"?>' 
							+ '<entry xmlns:snx="http://www.ibm.com/xmlns/prod/sn" xmlns:atom="http://www.w3.org/2005/Atom" xmlns="http://www.w3.org/2005/Atom">'
							+ 	'<id>' + 'urn:lsid:ibm.com:calendar:' + this.calendarId + '</id>'
							+   '<category scheme="http://www.ibm.com/xmlns/prod/sn/type" term="calendar"></category>'
							+	'<snx:maprole membership="member">' + maprole + '</snx:maprole>'
							+ '</entry>',
						load: dojo.hitch(this, "close"),
						error: dojo.hitch(this, "error")
					};
		dojo.xhrPut(args);						
	},
	
	save: function(event) {
	    dojo.stopEvent(event); 
		
		var maprole = 'author';
		if(dojo.byId(this.id+'-form')[this.id+'-reader'].checked) {
			maprole = 'reader';
		} else if(dojo.byId(this.id+'-form')[this.id+'-author'].checked) {
			maprole = 'author';
		}
		
		var _this = this;
		var args = {
						url: this.url,
						headers: {
							"Content-type": "application/atom+xml",
							"X-CALENDAR-MEMBERSHIP": (this._calendar.isOwner ? "OWNER" : (this._calendar.isMember ? "MEMBER" : "NONE"))
						},
						handleAs: "xml",
						postData: '<?xml version="1.0" encoding="UTF-8"?>' 
							+ '<entry xmlns:snx="http://www.ibm.com/xmlns/prod/sn" xmlns:atom="http://www.w3.org/2005/Atom" xmlns="http://www.w3.org/2005/Atom">'
							+ 	'<id>' + 'urn:lsid:ibm.com:calendar:' + this.calendarId + '</id>'
							+   '<category scheme="http://www.ibm.com/xmlns/prod/sn/type" term="calendar"></category>'
							+	'<snx:maprole membership="member">' + maprole + '</snx:maprole>'
							+ '</entry>',
						load: function(){_this.confirmMessageNode.style.display='';},
						error: dojo.hitch(this, "error")
					};
		dojo.xhrPut(args);	
	},
	
	close: function(arg){
	    this.confirmMessageNode.style.display = 'none';
		if(this.homeUrl)
			window.location.href = this.homeUrl;
		else
			history.back();	
	},	
	
	hideMessage: function() {
	    this.confirmMessageNode.style.display = 'none';
	},
	
	load: function(doc){
		var _this = this;
		var node = function(tag, root, all) { return _this._tagNode(tag, root || doc, all); };
		var value = function(tag, root) { return _this._tagValue(tag, root || doc); };
		
		var maprole = value('snx:maprole');
		
		dojo.byId(this.id+'-form')[this.id+'-reader'].checked = false;
		dojo.byId(this.id+'-form')[this.id+'-author'].checked = false;
		
		if(maprole == 'reader')
			dojo.byId(this.id+'-form')[this.id+'-reader'].checked = true;
		else
			dojo.byId(this.id+'-form')[this.id+'-author'].checked = true;	
	},
	
	error: function(err){
		console.log(err);
	},
	
	// utilities
	
	/**
	 * get the node for a tag in root supporting xml namespace
	 * if argument `all` is false, only the first matching node is returned
	 * @argument string name of the tag to get node of
	 * @argument root the root node to search in
	 * @argument all set to true to return array of nodes
	 */
	_tagNode: function(tag, root, all) {
		var nodes = root.getElementsByTagName(tag);
		if(nodes.length == 0 && /^snx:/.test(tag)) {
			nodes = root.getElementsByTagName(tag.substring(4));
		}

		if (all) return nodes;
		if (nodes.length > 0) return nodes[0];
		else return undefined;
	},

	/**
	* Get the value of of a tag living in a root node
	* @argument tag string name of tag
	*/
	_tagValue: function(tag, root) { 
		var n = this._tagNode(tag, root);
		if (n && n.firstChild) {
			var t = '';
			var c = n.firstChild;
			while(c) {
				t = t + c.nodeValue;
				c = c.nextSibling;
			}
			return t;
		} else return "";
	}
});	