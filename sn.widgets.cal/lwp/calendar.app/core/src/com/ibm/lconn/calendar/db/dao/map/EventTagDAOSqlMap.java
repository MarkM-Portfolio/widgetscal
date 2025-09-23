/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2014                                    */
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
import com.ibm.lconn.calendar.db.dao.model.EventTagDAO;
import com.ibm.lconn.calendar.db.model.DBEventTag;

public class EventTagDAOSqlMap extends SqlMapDaoBaseImpl implements EventTagDAO {
	public EventTagDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}
	
	public void addEventTag(DBEventTag tag) {
		super.insert("EventTag.insertEventTag", tag);
	}

	public Integer updateEventTag(DBEventTag tag) {
		return (Integer)super.update("EventTag.updateEventTag", tag);
	}
	
	public DBEventTag getEventTag(String tag_UUID) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("tag_UUID", tag_UUID);
			return (DBEventTag)super.queryForObject("EventTag.selectEventTag", params);
		} catch(Exception ex) {
			return null;
		}
	}

	public Integer deleteEventTag(String tag_UUID) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("tag_UUID", tag_UUID);
		return (Integer)super.delete("EventTag.deleteEventTag", params);
	}
	
	public Integer deleteEventTag(String event_UUID, String tag) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("event_UUID", event_UUID);
		params.put("name", tag);
		return (Integer)super.delete("EventTag.deleteEventTag", params);
	}

	public Integer deleteEventTags(String calendar_UUID, String event_UUID) {
		Map<String, Object> m = new HashMap<String, Object>();
		if(event_UUID == null) {
			m.put("calendar_UUID", calendar_UUID);
		}
		m.put("event_UUID", event_UUID);
		return (Integer)super.delete("EventTag.deleteEventTags", m);
	}

	@SuppressWarnings("unchecked")
	public List<DBEventTag> getTagsByEvent(String event_UUID) {
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("event_UUID", event_UUID);
		return (List<DBEventTag>)super.queryForList("EventTag.selectTagsByEvent", m);
	}
}
