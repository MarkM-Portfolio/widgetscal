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

dojo.provide("dwa.date.showYearPicker");
dojo.require("dwa.date.showCalendarListPicker");
dojo.require("dwa.date.yearpick");

dojo.setObject("dwa.date.showYearPicker", dwa.date.showCalendarListPicker(dwa.date.yearpick, "year", "-3"));
