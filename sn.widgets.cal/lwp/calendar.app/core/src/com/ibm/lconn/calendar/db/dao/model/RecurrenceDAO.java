/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2011                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.dao.model;

import com.ibatis.dao.client.Dao;
import com.ibm.lconn.calendar.db.model.DBRecurrence;

/**
 * @author skomard
 */

public interface RecurrenceDAO extends Dao {
	public void    		addRecurrence(DBRecurrence recurrence);
	public Integer 		updateRecurrence(DBRecurrence recurrence);
	public Integer 		deleteRecurrence(String event_UUID);
	public Integer 		deleteRecurrencesByCalendar(String calendar_UUID);
	public DBRecurrence getRecurrence(String event_UUID);
	
	public void         onShrink(DBRecurrence recurrence);
}