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

dojo.provide("lconn.calendar.dss.DijitTypeHandler");
dojo.provide("lconn.calendar.dss.DijitInputHandler");
dojo.provide("lconn.calendar.dss.DijitDateHandler");

dojo.require("lconn.calendar.dss.IHandlers");
dojo.require("lconn.calendar.dss.IAutoSavable");

dojo.declare("lconn.calendar.dss.DijitTypeHandler", [lconn.calendar.dss.IHandlers], {
	supportedHandlers: function() {
		return {
			"dijit.form.TextBox": "lconn.calendar.dss.DijitInputHandler",
			"lconn.calendar.DateTextBox": "lconn.calendar.dss.DijitDateHandler",
			"dijit.form.TimeTextBox": "lconn.calendar.dss.DijitTimeHandler"
		};
	}
});

dojo.declare("lconn.calendar.dss.BaseDijitHandler", [lconn.calendar.dss.IAutoSavable], {
	getID: function() {
		return (null || dojo.attr(this.node, "widgetId"));
	}
});

dojo.declare("lconn.calendar.dss.DijitInputHandler", [lconn.calendar.dss.BaseDijitHandler], {
	getValue: function() {
		var widget = dijit.byId(this.getID());
		return widget.getValue();
	},
	setValue: function(value) {
		var widget = dijit.byId(this.getID());
		widget.setValue(value);
	}
});

dojo.declare("lconn.calendar.dss.DijitDateHandler", [lconn.calendar.dss.BaseDijitHandler], {
	getValue: function() {
		var widget = dijit.byId(this.getID());
		var date = widget.getGregorianDate();
		if (date) return date.getTime();
		else return null;
	},
	setValue: function(value) {
		var widget = dijit.byId(this.getID());
		var date = new Date(value);
		widget.setGregorianDate(date);
	}
});

dojo.declare("lconn.calendar.dss.DijitTimeHandler",[lconn.calendar.dss.BaseDijitHandler], {
		getValue: function() {
			var widget = dijit.byId(this.getID());
			var date = widget.getValue();
			if (date) return date.getTime();
			else return null;
		},
		setValue: function(value) {
			var widget = dijit.byId(this.getID());
			var date = new Date(value);
			widget.setValue(date);
		}
		
});
	
	
	
