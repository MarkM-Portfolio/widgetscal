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

dojo.provide("lconn.calendar.dss.Hacks");

// dijit hack to add autosave support
dojo.extend(dijit._Widget, {autosave: ""});
dijit._Widget.prototype.attributeMap.autosave = "";

//require static sources for performances
dojo.require("lconn.calendar.dss.HtmlTypeHandler");
dojo.require("lconn.calendar.dss.DijitTypeHandler");
dojo.require("lconn.calendar.dss.CalendarTypeHandler");
