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
import com.ibm.lconn.calendar.db.dao.model.EventInfoDAO;
import com.ibm.lconn.calendar.db.model.DBEventInfo;


/**
 * @author skomard
 */

public class EventInfoDAOSqlMap extends SqlMapDaoBaseImpl implements EventInfoDAO {
	public EventInfoDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}

	public void addEventInfo(DBEventInfo dbEvInf){
		dbEvInf.prepareForPersistent();
		dbEvInf.refreshNotifiedMeta();
		super.insert("EventInfo.insertEventInfo", dbEvInf);
	}
	
	public Integer updateEventInfo(DBEventInfo dbEvInf) {
		dbEvInf.prepareForPersistent();
		dbEvInf.refreshNotifiedMeta();
		return (Integer)super.update("EventInfo.updateEventInfo", dbEvInf);
	}
	
	public Integer deleteEventInfo(String eventInfo_UUID) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("eventInfoUUID", eventInfo_UUID);
		return (Integer)super.delete("EventInfo.deleteEventInfo", params);
	}
	
	public Integer deleteEventInfos(String calendar_UUID, String event_UUID) {
		Map<String, Object> m = new HashMap<String, Object>();
		if(event_UUID == null) {
			m.put("calendar_UUID", calendar_UUID);
		}
		m.put("event_UUID", event_UUID);
		return (Integer)super.delete("EventInfo.deleteEventInfos", m);
	}
	
	public DBEventInfo getEventInfo(String eventInfo_UUID) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("eventInfoUUID", eventInfo_UUID);
			return (DBEventInfo)super.queryForObject("EventInfo.selectEventInfo", params);
		} catch(Exception ex) {
			return null;
		}
	}
}