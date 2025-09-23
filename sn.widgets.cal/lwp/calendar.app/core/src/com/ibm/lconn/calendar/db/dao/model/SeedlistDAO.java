/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.dao.model;

import java.util.Date;
import java.util.List;

import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBDeletionHistory;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBRecurrence;
import com.ibm.lconn.calendar.db.model.DBSubstitution;

public interface SeedlistDAO {
	public int getUpdatedEventsSinceCount(Date since, Date finish);
	
	public List<DBEvent> getUpdatedEventsSince(Date since, Date finish, int length);
	
	public int getUpdatedRecurrenceEventsSinceCount(Date since, Date finish);

	public List<DBRecurrence> getUpdatedRecurrenceEventsSince(Date since, Date finish, int length);
	
	public int getUpdatedExceptionInstancesSinceCount(Date since, Date finish);

	public List<DBSubstitution> getUpdatedExceptionInstancesSince(Date since, Date finish, int length);
	
	public int getDeletionHistorySinceCount(Date since, Date finish);

	public List<DBDeletionHistory> getDeletionHistorySince(Date since, Date finish, int length);
	
	public int getACLUpdatedCalendarsSinceCount(Date since, Date finish, Date createdBefore);
	
	public List<DBCalendar> getACLUpdatedCalendarsSince(Date since, Date finish, Date createdBefore, int offset, int length);
	
	public int getCommentUpdatedEventInstancesSinceCount(Date since, Date finish, Date createdBefore);
	
	public List<DBEventInstance> getCommentUpdatedEventInstancesSince(Date since, Date finish, Date createdBefore, int offset, int length);
}
