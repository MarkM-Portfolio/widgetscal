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

package com.ibm.lconn.calendar.db.dao.map;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.ibatis.dao.client.DaoException;
import com.ibatis.dao.client.DaoManager;
import com.ibm.lconn.calendar.db.dao.model.EventTagStatDAO;
import com.ibm.lconn.calendar.db.exception.DatabaseException;
import com.ibm.lconn.calendar.db.model.DBEventTagStat;

public class EventTagStatDAOSqlMap extends SqlMapDaoBaseImpl implements EventTagStatDAO {
	public EventTagStatDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}
	
	public void addEventTagStat(DBEventTagStat tagStat) {
		super.insert("EventTag.insertEventTagStat", tagStat);
	}

	public Integer updateEventTagStat(DBEventTagStat tagStat) {
		return (Integer)super.update("EventTag.updateEventTagStat", tagStat);
	}
	
	public DBEventTagStat getEventTagStat(String calendar_UUID, String tag) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("calendar_UUID", calendar_UUID);
		params.put("tag", tag);
		return (DBEventTagStat)super.queryForObject("EventTag.selectEventTagStat", params);
	}

	public Integer deleteEventTagStat(String calendar_UUID, String tag) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("calendar_UUID", calendar_UUID);
		params.put("tag", tag);
		return super.delete("EventTag.deleteEventTagStat", params);
	}

	public Integer updateEventTagStat(String calendar_UUID, String tag, int diff) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("calendar_UUID", calendar_UUID);
		params.put("tag", tag);
		params.put("diff", diff);
		int c = super.update("EventTag.updateEventTagStatByDiff", params);
		
		if(c == 0) {
			try {
				DBEventTagStat o = new DBEventTagStat();
				o.setTagagg_UUID(UUID.randomUUID().toString());
				o.setCalendar_UUID(calendar_UUID);
				o.setName(tag);
				o.setTotal(1);
				o.setLastUsed(new Date());
				addEventTagStat(o);
				
				c = 1;
			} catch (DaoException ex) {
				if(DatabaseException.isDuplicateKeyException(ex)) {
					c = super.update("EventTag.updateEventTagStatByDiff", params);
				} else {
					throw ex;
				}
			}
		}
		
		return c;
	}
	
	public Integer updateEventTagStatOnEventDeletion(String calendar_UUID, String event_UUID) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("calendar_UUID", calendar_UUID);
		params.put("event_UUID", event_UUID);
		return (Integer)super.update("EventTag.updateEventTagStatOnEventDeletion", params);
	}
	
	@SuppressWarnings("unchecked")
	public List<DBEventTagStat> getMostPopularEventTags(String calendar_UUID, String startsWith, int count) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("calendar_UUID", calendar_UUID);
		if(startsWith != null) {
			params.put("startsWith", startsWith + "%");
		}
		return (List<DBEventTagStat>)super.queryForList("EventTag.selectMostPopularEventTags", params, 0, count);
	}
	
	@SuppressWarnings("unchecked")
	public List<DBEventTagStat> getRelatedEventTags(String calendar_UUID, List<String> tags, int count) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("calendar_UUID", calendar_UUID);
		params.put("tags", tags);
		return (List<DBEventTagStat>)super.queryForList("EventTag.selectRelatedEventTags", params, 0, count);
	}
}
