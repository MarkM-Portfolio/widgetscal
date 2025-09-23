/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.dao.model;

import java.util.Date;


public interface DeletionHistoryDAO {
	public static final int OBJECT_TYPE_EVENT = 0;
	public static final int OBJECT_TYPE_EXCEPTION_INSTANCE = 1;
	
	public void addDeletionHistory(String calendarUUID, int objectType, String objectUUID);
	
	public void insertInstanceDeletionHistoryForEvent(String eventUUID, Date dbmodtime);
	public void insertInstanceDeletionHistoryForCalendar(String calendarUUID, Date dbmodtime);
	public void insertEventDeletionHistoryForCalendar(String calendarUUID, Date dbmodtime);
	
	public void clearDeletionHistory(Date date);
}
