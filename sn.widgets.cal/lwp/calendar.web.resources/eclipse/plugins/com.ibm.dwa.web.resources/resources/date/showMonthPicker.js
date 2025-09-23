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

dojo.provide("dwa.date.showMonthPicker");
dojo.require("dwa.date.showCalendarListPicker");
dojo.require("dwa.date.monthpick");

dojo.setObject("dwa.date.showMonthPicker", dwa.date.showCalendarListPicker(dwa.date.monthpick, "month", "-5"));
