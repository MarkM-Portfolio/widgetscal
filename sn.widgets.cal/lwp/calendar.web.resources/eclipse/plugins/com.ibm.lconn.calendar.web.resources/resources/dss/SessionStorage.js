/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.calendar.dss.SessionStorage");

dojo.declare("lconn.calendar.dss.SessionStorage", null, {
	
	constructor: function(userId) {
		this.userId = userId ? userId : "anonymous";
		this.data = {};
	},
	
	isSupport: function() {
		return !!window.sessionStorage;
	},
	
	set: function(id, value) {
		this.data[id] = value;
	},
	
	get: function(id) {
		return this.data[id];
	},
	
	commit: function(key) {
		var k = this.userId + ":" + key;
		var v = dojo.toJson(this.data);
		window.sessionStorage.setItem(k, v);
	},
	
	load: function(key) {
		var v = window.sessionStorage.getItem(this.userId + ":" + key);
		var obj = dojo.fromJson(v);
		this.data = obj ? obj : {};
	},
	
	remove: function(key) {
		window.sessionStorage.setItem(this.userId + ":" + key, null);
	}
});