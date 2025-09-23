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

dojo.provide("lconn.calendar.dss.IAutoSavable");

dojo.declare("lconn.calendar.dss.IAutoSavable", null, {
	constructor: function(node, attr) {
		this.node = node;
		this.attr = attr;
	},
	getValue: function() {},
	setValue: function(value) {},
	getID: function() {}
});