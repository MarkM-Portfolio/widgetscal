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

dojo.provide("lconn.calendar.dss.HtmlTypeHandler");
dojo.provide("lconn.calendar.dss.InputHandler");
dojo.provide("lconn.calendar.dss.CheckHandler");

dojo.require("lconn.calendar.dss.IHandlers");
dojo.require("lconn.calendar.dss.IAutoSavable");

dojo.declare("lconn.calendar.dss.HtmlTypeHandler", [lconn.calendar.dss.IHandlers], {
	supportedHandlers: function() {
		return {
			"input": "lconn.calendar.dss.InputHandler",
			"textarea": "lconn.calendar.dss.InputHandler",
			"checkbox": "lconn.calendar.dss.CheckHandler",
			"radio": "lconn.calendar.dss.CheckHandler",
			"select": "lconn.calendar.dss.InputHandler"
		};
	}
});

dojo.declare("lconn.calendar.dss.BaseHtmlHandler", [lconn.calendar.dss.IAutoSavable], {
	getID: function() {
		return (null || this.attr.id || dojo.attr(this.node, "id") || dojo.attr(this.node, "name"));
	}
});

dojo.declare("lconn.calendar.dss.InputHandler", [lconn.calendar.dss.BaseHtmlHandler], {
	getValue: function() {
		return dojo.attr(this.node, "value");
	},
	setValue: function(value) {
		dojo.attr(this.node, "value", value);
	}
});

dojo.declare("lconn.calendar.dss.CheckHandler", [lconn.calendar.dss.BaseHtmlHandler], {
	getValue: function() {
		return dojo.attr(this.node, "checked");
	},
	setValue: function(value) {
		dojo.attr(this.node, "checked", value);
	}
});