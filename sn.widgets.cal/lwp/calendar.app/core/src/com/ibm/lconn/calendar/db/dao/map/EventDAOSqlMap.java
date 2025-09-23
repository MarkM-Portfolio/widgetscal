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
import com.ibm.lconn.calendar.db.dao.model.EventDAO;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBUser;


/**
 * @author skomard
 */

public class EventDAOSqlMap extends SqlMapDaoBaseImpl implements EventDAO {
	public EventDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}
	
	// Methods
	public void addEvent(DBEvent event) {
		super.insert("Event.insertEvent", event);
	}
	
	public Integer updateEvent(DBEvent event) {
		return super.update("Event.updateEvent", event);
	}
	
	public Integer deleteEvent(String event_UUID) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("eventUUID", event_UUID);
		return super.delete("Event.deleteEvent", params);
	}
	
	public Integer deleteEventsByCalendar(String calendar_UUID) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("calendarUUID", calendar_UUID);
		return super.delete("Event.deleteEventsByCalendar", params);
	}
	
	public DBEvent getEvent(String event_UUID) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("eventUUID", event_UUID);
			DBEvent event = (DBEvent)super.queryForObject("Event.selectEvent", params);
			return event;
		} catch(Exception ex) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<DBEvent> getEventsByCalendar(String calendar_UUID, String userId, List<String> tags, DBUser loginUser, int offset, int length) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("calendar_UUID", calendar_UUID);
		params.put("user_UUID", userId);
		params.put("tags", tags);
		if(loginUser != null) {
			params.put("loginUserId", loginUser.getUserUUID());
			params.put("loginUserOrgId", loginUser.getORG_ID());
		}
		if(offset == -1) {
			return (List<DBEvent>)super.queryForList("Event.selectEventsByCalendar", params);
		} else {
			return (List<DBEvent>)super.queryForList("Event.selectEventsByCalendar", params, offset, length);
		}
	}
	
	public Integer getEventsByCalendarCount(String calendar_UUID, String userId, List<String> tags, DBUser loginUser) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("calendar_UUID", calendar_UUID);
		params.put("user_UUID", userId);
		params.put("tags", tags);
		if(loginUser != null) {
			params.put("loginUserId", loginUser.getUserUUID());
			params.put("loginUserOrgId", loginUser.getORG_ID());
		}
		return (Integer) super.queryForObject("Event.selectEventsByCalendarCount", params);
	}
}