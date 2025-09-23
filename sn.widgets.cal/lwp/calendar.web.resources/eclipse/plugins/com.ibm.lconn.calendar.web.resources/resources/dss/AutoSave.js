/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.calendar.dss.AutoSave");

dojo.require("lconn.calendar.dss.Parser");
dojo.require("lconn.calendar.dss.Config");
dojo.require("lconn.calendar.dss.SessionStorage");
dojo.require("lconn.calendar.dss.Hacks");

dojo.declare("lconn.calendar.dss.AutoSave", null, {
	
	constructor: function(userId, config) {
		this.userId = userId;
		this.config = config ? config : (new lconn.calendar.dss.Config()).getConfig();
		this.sessionStorage = new lconn.calendar.dss.SessionStorage(userId);
		
		this.supportedHandlers = {};
		for (var i=0, l=this.config.handlers.length; i<l; i++) {
			var handlerClass = this.config.handlers[i];
			dojo.require(handlerClass);
			var handler = new (eval(handlerClass))();
			dojo.mixin(this.supportedHandlers, handler.supportedHandlers());
		}
		
		this.parser = new lconn.calendar.dss.Parser(this);
	},
	
	save: function(dom, key) {
		this.parser.parse(dom, key, true);
		this.parser.save(key);
	},
	
	load: function(key) {
		this.parser.load(key);
		if(this.parser.ss.data) return true;
		return false;
		
	},
	
	parse: function(dom,key) {
		this.parser.parse(dom, key, false);		
	},
	
	isSupport: function() {
		return this.sessionStorage.isSupport();
	}
});