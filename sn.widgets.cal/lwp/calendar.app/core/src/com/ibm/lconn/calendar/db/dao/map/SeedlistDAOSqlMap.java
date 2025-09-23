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

package com.ibm.lconn.calendar.db.dao.map;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ibatis.dao.client.DaoManager;
import com.ibm.lconn.calendar.db.dao.model.SeedlistDAO;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBDeletionHistory;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBRecurrence;
import com.ibm.lconn.calendar.db.model.DBSubstitution;

public class SeedlistDAOSqlMap  extends SqlMapDaoBaseImpl implements SeedlistDAO {
	public SeedlistDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}
	
	// Methods
	
	public int getUpdatedEventsSinceCount(Date since, Date finish) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", since);
		params.put("finishDate", finish);
		return (Integer)super.queryForObject("Seedlist.getUpdatedEventsSinceCount", params);
	}
	
	@SuppressWarnings("unchecked")
	public List<DBEvent> getUpdatedEventsSince(Date since, Date finish, int length) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", since);
		params.put("finishDate", finish);
		return (List<DBEvent>)super.queryForList("Seedlist.getUpdatedEventsSince", params, 0, length);
	}
	
	public int getUpdatedRecurrenceEventsSinceCount(Date since, Date finish) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", since);
		params.put("finishDate", finish);
		return (Integer)super.queryForObject("Seedlist.getUpdatedRecurrenceEventsSinceCount", params);
	}

	@SuppressWarnings("unchecked")
	public List<DBRecurrence> getUpdatedRecurrenceEventsSince(Date since, Date finish, int length) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", since);
		params.put("finishDate", finish);
		return (List<DBRecurrence>)super.queryForList("Seedlist.getUpdatedRecurrenceEventsSince", params, 0, length);
	}
	
	public int getUpdatedExceptionInstancesSinceCount(Date since, Date finish) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", since);
		params.put("finishDate", finish);
		return (Integer)super.queryForObject("Seedlist.getUpdatedExceptionInstancesSinceCount", params);
	}

	@SuppressWarnings("unchecked")
	public List<DBSubstitution> getUpdatedExceptionInstancesSince(Date since, Date finish, int length) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", since);
		params.put("finishDate", finish);
		return (List<DBSubstitution>)super.queryForList("Seedlist.getUpdatedExceptionInstancesSince", params, 0, length);
	}
	
	public int getDeletionHistorySinceCount(Date since, Date finish) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", since);
		params.put("finishDate", finish);
		return (Integer)super.queryForObject("Seedlist.getDeletionHistorySinceCount", params);
	}

	@SuppressWarnings("unchecked")
	public List<DBDeletionHistory> getDeletionHistorySince(Date since, Date finish, int length) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", since);
		params.put("finishDate", finish);
		return (List<DBDeletionHistory>)super.queryForList("Seedlist.getDeletionHistorySince", params, 0, length);
	}
	
	public int getACLUpdatedCalendarsSinceCount(Date since, Date finish, Date createdBefore) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", since);
		params.put("finishDate", finish);
		params.put("createdBefore", createdBefore);
		return (Integer)super.queryForObject("Seedlist.getACLUpdatedCalendarsSince", params);
	}
	
	@SuppressWarnings("unchecked")
	public List<DBCalendar> getACLUpdatedCalendarsSince(Date since, Date finish, Date createdBefore, int offset, int length) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", since);
		params.put("finishDate", finish);
		params.put("createdBefore", createdBefore);
		return (List<DBCalendar>)super.queryForList("Seedlist.getACLUpdatedCalendarsSince", params, offset, length);
	}
	
	public int getCommentUpdatedEventInstancesSinceCount(Date since, Date finish, Date createdBefore) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", since);
		params.put("finishDate", finish);
		params.put("createdBefore", createdBefore);
		return (Integer)super.queryForObject("Seedlist.getCommentUpdatedEventInstancesSinceCount", params);
	}
	
	@SuppressWarnings("unchecked")
	public List<DBEventInstance> getCommentUpdatedEventInstancesSince(Date since, Date finish, Date createdBefore, int offset, int length) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startDate", since);
		params.put("finishDate", finish);
		params.put("createdBefore", createdBefore);
		return (List<DBEventInstance>)super.queryForList("Seedlist.getCommentUpdatedEventInstancesSince", params, offset, length);
	}
}
