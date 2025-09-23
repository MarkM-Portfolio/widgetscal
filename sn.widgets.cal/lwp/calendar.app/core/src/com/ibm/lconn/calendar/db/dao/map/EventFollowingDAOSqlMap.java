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

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ibatis.dao.client.DaoManager;
import com.ibm.lconn.calendar.db.dao.model.EventFollowingDAO;
import com.ibm.lconn.calendar.db.model.DBEventFollowingRecord;

public class EventFollowingDAOSqlMap extends SqlMapDaoBaseImpl implements EventFollowingDAO {
	public EventFollowingDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}
	
	public DBEventFollowingRecord getEventFollowingRecord(String recordUuid) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("recordUUID", recordUuid);
			return (DBEventFollowingRecord)super.queryForObject("EventFollowing.selectEventFollowingRecordById", params);
		} catch(Exception ex) {
			return null;
		}
	}
	
	public void addEventFollowingRecord(DBEventFollowingRecord record) {
		super.insert("EventFollowing.insertEventFollowingRecord", record);
	}
	
	public Integer updateEventFollowingRecord(DBEventFollowingRecord record) {
		return super.update("EventFollowing.updateEventFollowingRecord", record);
	}
	
	public Integer removeEventFollowingRecord(String recordUuid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("recordUUID", recordUuid);
		return super.delete("EventFollowing.deleteEventFollowingRecord", params);
	}
	
	public Integer removeEventFollowingRecords(String calendarUuid, String eventUuid, String userUuid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("itemUuid", calendarUuid);
		params.put("itemType", eventUuid);
		params.put("userUuid", userUuid);
		return super.delete("EventFollowing.deleteEventFollowingRecords", params);
	}
	
	public DBEventFollowingRecord getEventFollowingRecord(String itemUuid, int itemType, String userUuid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("itemUuid", itemUuid);
		params.put("itemType", itemType);
		params.put("userUuid", userUuid);
		return (DBEventFollowingRecord)super.queryForObject("EventFollowing.selectEventFollowingRecord", params);
	}
	
	@SuppressWarnings("unchecked")
	public List<DBEventFollowingRecord> getEventFollowingRecords(String eventUuid, String itemUuid, int itemType, Integer followType, int offset, int length) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("eventUuid", eventUuid);
		params.put("itemUuid", itemUuid);
		params.put("itemType", itemType);
		params.put("followType", followType);
		params.put("offset", offset);
		params.put("length", length);
		if (length == -1) {
			return (List<DBEventFollowingRecord>) super.queryForList(
					"EventFollowing.selectFollowingRecordsOfEvent", params);
		} else {
			return (List<DBEventFollowingRecord>) super.queryForList(
					"EventFollowing.selectFollowingRecordsOfEvent", params,
					offset, length);
		}
	}
	
	public int getEventFollowingRecordsCount(String eventUuid, String itemUuid, int itemType, Integer followType) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("eventUuid", eventUuid);
		params.put("itemUuid", itemUuid);
		params.put("itemType", itemType);
		params.put("followType", followType);
		return (Integer)super.queryForObject("EventFollowing.selectFollowingRecordsOfEventCount", params);
	}

	public Integer updateEventFollowingMasks(String eventUuid, String userUuid, Integer followType, String addOrRemove) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("eventUuid", eventUuid);
		params.put("userUuid", userUuid);
		params.put("followType", followType);
		params.put("op", "add".equalsIgnoreCase(addOrRemove) ? "+" : "-");
		return super.update("EventFollowing.updateEventFollowingMasks", params);
	}
	
	public Integer updateEventFollowingMasks(String itemUuid, int itemType, String userUuid, Integer followType, String addOrRemove) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("itemUuid", itemUuid);
		params.put("itemType", itemType);
		params.put("userUuid", userUuid);
		params.put("followType", followType);
		params.put("op", "add".equalsIgnoreCase(addOrRemove) ? "+" : "-");
		return super.update("EventFollowing.updateEventFollowingMasks", params);
	}
	
	public Integer removeObsoleteEventFollowingRecords(String eventUuid, String userUuid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("eventUuid", eventUuid);
		params.put("userUuid", userUuid);
		return super.delete("EventFollowing.deleteObsoleteEventFollowingRecords", params);
	}
	
	public Integer removeObsoleteEventFollowingRecords(String itemUuid, int itemType, String userUuid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("itemUuid", itemUuid);
		params.put("itemType", itemType);
		params.put("userUuid", userUuid);
		return super.delete("EventFollowing.deleteObsoleteEventFollowingRecords", params);
	}
	
	public Integer updateEndDateOfEventItem(String itemUuid, int itemType, Date endDate) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("itemUuid", itemUuid);
		params.put("itemType", itemType);
		params.put("endDate", endDate);
		return super.update("EventFollowing.updateEndDateOfEventItem", params);
	}
}
