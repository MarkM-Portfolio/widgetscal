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

package com.ibm.lconn.calendar.db.dao.map;

import java.util.HashMap;
import java.util.Map;

import com.ibatis.dao.client.DaoManager;
import com.ibm.lconn.calendar.db.dao.model.RecurrenceDAO;
import com.ibm.lconn.calendar.db.model.DBRecurrence;


/**
 * @author skomards
 */

public class RecurrenceDAOSqlMap extends SqlMapDaoBaseImpl implements RecurrenceDAO {
	
	public RecurrenceDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}
	
	
	// Methods
	
	public void addRecurrence(DBRecurrence recurrence) {
		super.insert("Recurrence.insertRecurrence", recurrence);
	}
	
	public Integer updateRecurrence(DBRecurrence recurrence) {
		return super.update("Recurrence.updateRecurrence", recurrence);
	}
	
	public Integer deleteRecurrence(String event_UUID) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("eventUUID", event_UUID);
		return super.delete("Recurrence.deleteRecurrence", params);
	}
	
	public Integer deleteRecurrencesByCalendar(String calendar_UUID) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("calendarUUID", calendar_UUID);
		return super.delete("Recurrence.deleteRecurrencesByCalendar", params);
	}
	
	public DBRecurrence getRecurrence(String event_UUID) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("eventUUID", event_UUID);
			return (DBRecurrence)super.queryForObject("Recurrence.selectRecurrence", params);
		} catch(Exception ex) {
			return null;
		}
	}
	
	public void onShrink(DBRecurrence recurrence) {
		super.delete("EventInstance.onShrinkRecurrenceEvent", recurrence);
		super.delete("Substitution.onShrinkRecurrenceEvent", recurrence);
	}
}