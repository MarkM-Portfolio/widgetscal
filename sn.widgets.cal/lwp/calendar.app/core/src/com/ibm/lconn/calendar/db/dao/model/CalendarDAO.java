/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.dao.model;

import java.util.List;
import java.util.Map;

import com.ibatis.dao.client.Dao;
import com.ibm.lconn.calendar.db.model.DBCalendar;

/**
 * @author skomard
 */

public interface CalendarDAO extends Dao {
	public void addCalendar(DBCalendar calendar);
	public Integer deleteCalendar(String calendar_UUID);
	public Integer updateCalendar(DBCalendar calendar);
	public Integer updateCalendar(String calendarUUID, Map<String, Object> updates);
	public DBCalendar getCalendar(String calendar_UUID);
	
	public List<String> checkCalendarExistence(List<String> calendarIds);
	
	public void updateOrgId(String calendar_UUID, String newOrgId);
}