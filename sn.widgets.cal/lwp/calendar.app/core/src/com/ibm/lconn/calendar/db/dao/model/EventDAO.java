/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.dao.model;

import java.util.List;

import com.ibatis.dao.client.Dao;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBUser;

/**
 * @author skomard
 */

public interface EventDAO extends Dao {
	public void  addEvent(DBEvent event);
	public Integer updateEvent(DBEvent event);
	public Integer deleteEvent(String event_UUID);
	public Integer deleteEventsByCalendar(String calendar_UUID);
	public DBEvent getEvent(String event_UUID);	
	public List<DBEvent> getEventsByCalendar(String calendar_UUID, String userId, List<String> tags, DBUser loginUser, int offset, int length);	
	public Integer getEventsByCalendarCount(String calendar_UUID, String userId, List<String> tags, DBUser loginUser);	
}