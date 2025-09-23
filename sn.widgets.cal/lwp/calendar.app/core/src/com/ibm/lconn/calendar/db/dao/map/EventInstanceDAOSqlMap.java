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

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ibatis.dao.client.DaoManager;
import com.ibm.icu.util.TimeZone;
import com.ibm.lconn.calendar.db.dao.model.EventInstanceDAO;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.util.IntHolder;


/**
 * @author skomard
 */

public class EventInstanceDAOSqlMap extends SqlMapDaoBaseImpl implements EventInstanceDAO {
	public EventInstanceDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}
		
	// Methods
	public void addEventInstance(DBEventInstance eventInstance) {
		super.insert("EventInstance.insertEventInstance", eventInstance);
	}
	
	public void  addEventInstances(List<DBEventInstance> eventInstances) {
		for(DBEventInstance instance : eventInstances) {
			addEventInstance(instance);
		}
	}
	
	public Integer updateEventInstance(DBEventInstance eventInstance) {
		return super.update("EventInstance.updateEventInstance", eventInstance);
	}
	
	public Integer deleteEventInstance(String eventInst_UUID) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("instanceUUID", eventInst_UUID);
		return super.delete("EventInstance.deleteEventInstance", params);
	}
	
	public Integer deleteEventInstances(String calendar_UUID, String event_UUID) {
		Map<String, Object> params = new HashMap<String,Object>();
		if(event_UUID == null) {
			params.put("calendar_UUID", calendar_UUID);
		}
		params.put("event_UUID", event_UUID);
		return super.delete("EventInstance.deleteEventInstances", params);
	}
	
	public DBEventInstance getEventInstance(String eventInst_UUID) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("instanceUUID", eventInst_UUID);
			return (DBEventInstance)super.queryForObject("EventInstance.selectEventInstance", params);
		} catch(Exception ex) {
			return null;
		}
	}
	
	public DBEventInstance getEventInstance(String event_UUID, Date startDate) {
		Map<String, Object> params = new HashMap<String,Object>();
		params.put("event_UUID", event_UUID);
		params.put("startDate", startDate);
		
		List l = (List)super.queryForList("EventInstance.selectEventInstanceByEventAndDate", params);
		if(l.isEmpty()) {
			return null;
		}
		return (DBEventInstance)l.get(0);
	}
	
	public List<DBEventInstance> getEventInstances(String event_UUID, Boolean exceptions) {
		Map<String, Object> params = new HashMap<String,Object>();
		params.put("event_UUID", event_UUID);
		if(exceptions != null)
			params.put("exceptions", exceptions ? 1 : 0);
		params.put("SORT_ORDER", "ASC");
		
		List<DBEventInstance> ret = (List<DBEventInstance>)super.queryForList("EventInstance.selectEventInstances", params);
		Collections.sort(ret, new DBEventInstance.ComparatorByStartDate(TimeZone.getTimeZone("UTC"), true));
		return ret;
	}
	
	public List<DBEventInstance> getEventInstances(String calendar_UUID, String event_UUID, List<String> tags, Date dateBegin, Date dateEnd, int offset, int length) {
		Map<String, Object> params = new HashMap<String,Object>();
		if(event_UUID == null) {
			params.put("calendar_UUID", calendar_UUID);
		}
		params.put("event_UUID", event_UUID);
		params.put("tags", tags);
		params.put("dateBegin", dateBegin);
		params.put("dateEnd", dateEnd);
		
		if(dateBegin == null && dateEnd != null)
			params.put("SORT_ORDER", "DESC");
		else 
			params.put("SORT_ORDER", "ASC");
		
		if(length == -1) {
			List<DBEventInstance> ret = (List<DBEventInstance>)super.queryForList("EventInstance.selectEventInstances", params);
			Collections.sort(ret, new DBEventInstance.ComparatorByStartDate(TimeZone.getTimeZone("UTC"), dateBegin != null || dateEnd == null));
			return ret;
		} else {
			return (List<DBEventInstance>)super.queryForList("EventInstance.selectEventInstances", params, offset, length);
		}
	}
	
	public int getEventInstancesCount(String calendar_UUID, String event_UUID, List<String> tags, Date dateBegin, Date dateEnd) {
		Map<String, Object> params = new HashMap<String,Object>();
		if(event_UUID == null) {
			params.put("calendar_UUID", calendar_UUID);
		}
		params.put("event_UUID", event_UUID);
		params.put("tags", tags);
		params.put("dateBegin", dateBegin);
		params.put("dateEnd", dateEnd);
		
		return (Integer)super.queryForObject("EventInstance.selectEventInstancesCount", params);
	}
	
	public List<DBEventInstance> getFollowedEventInstances(DBUser user, Date dateBegin, Date dateEnd, Integer followType) {
		Map<String, Object> params = new HashMap<String,Object>();
		params.put("userId", user.getUserUUID());
		params.put("dateBegin", dateBegin);
		params.put("dateEnd", dateEnd);
		params.put("followType", followType);
		if(user != null) {
			params.put("loginUserOrgId", user.getORG_ID());
		}
		
		List<DBEventInstance> ret = (List<DBEventInstance>)super.queryForList("EventInstance.selectFollowedEventInstances", params);
		Collections.sort(ret, new DBEventInstance.ComparatorByStartDate(TimeZone.getTimeZone("UTC"), true));
		return ret;
	}
	
	public List<DBEventInstance> getUpcomingFollowedEventInstances(DBUser user, Date dateBegin, Integer followType, int offset, int length, IntHolder totalResults) {
		Map<String, Object> params = new HashMap<String,Object>();
		params.put("userId", user.getUserUUID());
		params.put("dateBegin", dateBegin);
		params.put("followType", followType);
		if(user != null) {
			params.put("loginUserOrgId", user.getORG_ID());
		}
		
		if(length == -1) {
			List<DBEventInstance> ret = (List<DBEventInstance>)super.queryForList("EventInstance.selectUpcomingFollowedEventInstances", params);
			if(totalResults != null) {
				totalResults.value = ret.size();
			}
			Collections.sort(ret, new DBEventInstance.ComparatorByStartDate(TimeZone.getTimeZone("UTC"), true));
			return ret;
		} else {
			List<DBEventInstance> ret = (List<DBEventInstance>)super.queryForList("EventInstance.selectUpcomingFollowedEventInstances", params, offset, length);
			if(totalResults != null) {
				if(ret.isEmpty()) {
					totalResults.value = 0;
				} else {
					totalResults.value = ret.get(0).getParentCollectionSize();
				}
			}
			if(offset > 0 && ret.size() > 0) {
				ret.remove(0);
			}
			return ret;
		}
	}
	
	public int getUpcomingFollowedEventInstancesCount(DBUser user, Date dateBegin, Integer followType) {
		Map<String, Object> params = new HashMap<String,Object>();
		params.put("userId", user.getUserUUID());
		params.put("dateBegin", dateBegin);
		params.put("followType", followType);
		if(user != null) {
			params.put("loginUserOrgId", user.getORG_ID());
		}
		return (Integer)super.queryForObject("EventInstance.selectUpcomingFollowedEventInstancesCount", params);
	}
	

	public Date getLatestEndDate(String event_UUID) {
	    Map<String, Object> params = new HashMap<String,Object>();
		params.put("event_UUID", event_UUID);
		return (Date)super.queryForObject("EventInstance.selectLatestEndDate", params);
	}
	
	public Integer resetEventInstancesLastModified(String event_UUID, List<String> fields) {
		Map<String, Object> params = new HashMap<String,Object>();
		params.put("event_UUID", event_UUID);
		params.put("fields", fields);
		return super.update("EventInstance.resetEventInstancesLastModified", params);
	}
	
	public Integer moveEventInstancesInBatch(String event_UUID, long startDateOffset, long endDateOffset) {
		Map<String, Object> params = new HashMap<String,Object>();
		params.put("event_UUID", event_UUID);
		params.put("startDateOffset", startDateOffset);
		params.put("endDateOffset", endDateOffset);
		return super.update("EventInstance.moveEventInstancesInBatch", params);
	}
}