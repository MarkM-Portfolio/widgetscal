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
dojo.provide("lconn.calendar.calendarApp");

dojo.require('lconn.core.config');
dojo.require('lconn.core.url');

dojo.require('lconn.calendar.CalendarStore');
dojo.require('lconn.calendar.SmallCalendarList');
dojo.require('lconn.calendar.UpcomingFollowingList');

dojo.require('lconn.calendar.DateTextBox');
dojo.require('lconn.calendar.WidgetTagcloud');
dojo.require('lconn.calendar.UIMessage');
dojo.require('lconn.calendar.EditorView');
dojo.require('lconn.calendar.FullEventViewer');
dojo.require('lconn.calendar.CalendarPreferences');
dojo.require('lconn.calendar.GridView');
dojo.require('lconn.calendar.UpcomingView');
dojo.require('lconn.calendar.Paging');
dojo.require('lconn.calendar.dss.AutoSave');
dojo.require('lconn.calendar.PeoplelinkUtil');

dojo.require('lconn.core.DateUtil');
dojo.requireLocalization("dojo.cldr","gregorian");

dojo.require('lconn.calendar.Lazy');
