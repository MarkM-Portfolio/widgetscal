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
import java.util.List;
import java.util.Map;

import com.ibatis.dao.client.DaoManager;
import com.ibm.lconn.calendar.db.dao.model.CalendarDAO;
import com.ibm.lconn.calendar.db.model.DBCalendar;


/**
 * @author skomard
 */

public class CalendarDAOSqlMap extends SqlMapDaoBaseImpl implements CalendarDAO {
	public CalendarDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}
	
	public void addCalendar(DBCalendar calendar) {
		super.insert("Calendar.insertCalendar", calendar);
	}
	
	public Integer updateCalendar(DBCalendar calendar) {
		return super.update("Calendar.updateCalendar", calendar);
	}
	
	public Integer updateCalendar(String calendarUUID, Map<String, Object> updates) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("calendarUUID", calendarUUID);
		params.putAll(updates);
		return super.update("Calendar.updateCalendarFields", params);
	}
	
	public Integer deleteCalendar(String calendarId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("calendarUUID", calendarId);
		return super.delete("Calendar.deleteCalendar", params);
	}
	
	public DBCalendar getCalendar(String calendarId) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("calendarUUID", calendarId);
			return (DBCalendar)super.queryForObject("Calendar.selectCalendar", params);
		} catch(Exception ex) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<String> checkCalendarExistence(List<String> calendarIds) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("calendarIds", calendarIds);
		return (List<String>)super.queryForList("Calendar.checkCalendarExistence", params);
	}
	
	public void updateOrgId(String calendar_UUID, String newOrgId) {
		Map<String, Object> params = new HashMap<String, Object>();
		String[] tables = new String[]{"CA_MEMBERSHIP", "CA_CALENDAR", "CA_EVENT", "CA_EVENTINSTANCE", "CA_SUBSTITUTION", "CA_RECURRENCE", 
				"CA_EVENTINFO", "CA_DELETION_HISTORY", "CA_EVENTTAG", "CA_EVENTTAGAGG", "CA_EVENTCOMMENT", "CA_EVENTFOLLOWING", "CA_USERMENTION" };
    	params.put("CALENDAR_UUID", calendar_UUID);
    	params.put("NEW_ORG_ID", newOrgId);
    	for(int i = 0; i < tables.length; i++) {
    		params.put("TABLE", tables[i]);
    		super.update("MultiTenancy.updateOrgId", params);
    	}
	}
}