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

package com.ibm.lconn.calendar.db.dao.map;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.text.SimpleDateFormat;		//Change by Connections for IBM i team.

import com.ibatis.dao.client.DaoManager;
import com.ibm.lconn.calendar.db.dao.model.DeletionHistoryDAO;

public class DeletionHistoryDAOSqlMap extends SqlMapDaoBaseImpl implements DeletionHistoryDAO {
	public DeletionHistoryDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}

	public void addDeletionHistory(String calendarUUID, int objectType, String objectUUID) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("DELHISTORY_UUID", UUID.randomUUID().toString());
		params.put("CALENDAR_UUID", calendarUUID);
		params.put("OBJECT_TYPE", objectType);
		params.put("OBJECT_UUID", objectUUID);
		params.put("DBMODTIME", new Timestamp(System.currentTimeMillis() - 10));
		super.insert("DeletionHistory.insertDeletionHistory", params);
	}
	
	public void insertInstanceDeletionHistoryForEvent(String eventUUID, Date dbmodtime) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("EVENT_UUID", eventUUID);
		params.put("DBMODTIME", dbmodtime);
		//Change by Connections for IBM i team.
		params.put("DBMODTIME_AS400", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(dbmodtime));
		super.insert("DeletionHistory.insertInstanceDeletionHistoryForEvent", params);
	}
	
	public void insertInstanceDeletionHistoryForCalendar(String calendarUUID, Date dbmodtime) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("CALENDAR_UUID", calendarUUID);
		params.put("DBMODTIME", dbmodtime);
		//Change by Connections for IBM i team.
		params.put("DBMODTIME_AS400", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(dbmodtime));
		super.insert("DeletionHistory.insertInstanceDeletionHistoryForCalendar", params);
	}
	
	public void insertEventDeletionHistoryForCalendar(String calendarUUID, Date dbmodtime) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("CALENDAR_UUID", calendarUUID);
		params.put("DBMODTIME", dbmodtime);
		//Change by Connections for IBM i team.
		params.put("DBMODTIME_AS400", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(dbmodtime));
		super.insert("DeletionHistory.insertEventDeletionHistoryForCalendar", params);
	}
	
	public void clearDeletionHistory(Date date) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("DBMODTIME", date);
		super.delete("DeletionHistory.clearDeletionHistory", params);
	}
}
