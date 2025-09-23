/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.dao.map;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.ibatis.dao.client.DaoManager;
import com.ibm.lconn.calendar.db.dao.model.UserMentionDAO;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBUserMention;
import com.ibm.lconn.calendar.util.MentionHelper;

public class UserMentionDAOSqlMap extends SqlMapDaoBaseImpl implements UserMentionDAO {
	public UserMentionDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}
	
	public void insertUserMentionData(DBUserMention userMentionData) {
		super.insert("UserMention.insertUserMentionData", userMentionData);
	}

	public int updateUserMentionData(DBUserMention userMentionData) {
		return (Integer)super.update("UserMention.updateUserMentionData", userMentionData);
	}

	public int deleteUserMentionData(DBUserMention userMentionData) {
		return (Integer)super.delete("UserMention.deleteUserMentionData", userMentionData);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
    public int deleteUserMentionDataByEvent(String event_UUID) {
		HashMap params = new HashMap();
		params.put("event_UUID", event_UUID);
		return (Integer)super.delete("UserMention.deleteUserMentionDataByEvent", params);
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
    public int deleteUserMentionDataByEventInstance(String eventInst_UUID) {
		HashMap params = new HashMap();
		params.put("eventInst_UUID", eventInst_UUID);
		return (Integer)super.delete("UserMention.deleteUserMentionDataByEventInstance", params);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public int deleteUserMentionDataByCalendar(String calendar_UUID) {
		HashMap params = new HashMap();
		params.put("calendar_UUID", calendar_UUID);
		return (Integer)super.delete("UserMention.deleteUserMentionDataByCalendar", params);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<DBUserMention> getUserMentionDataByObject(String objectId, int objectType) {
		HashMap params = new HashMap();
		params.put("objectId", objectId);
		params.put("objectType1", objectType);
		params.put("objectType2", objectType + 8);
		return (List<DBUserMention>)super.queryForList("UserMention.getUserMentionDataByObject", params);
	}
 
	public void updateMentionHistory(DBEvent event) {
		List<DBUserMention> l = getUserMentionDataByObject(event.getEvent_UUID(), DBUserMention.OBJECT_TYPE_EVENT);
		
		List<MentionHelper.MentionRecord> mentioned = event.getEventInfo().getMentionedPeople();
		Set<String> mentionedUserIds = new HashSet<String>();
		for(MentionHelper.MentionRecord record : mentioned) {
			if(record.getUserid() != null) {
				mentionedUserIds.add(record.getUserid());
			}
		}
		
		for(Iterator<DBUserMention> iter = l.iterator(); iter.hasNext(); ) {
			DBUserMention t = iter.next();
			
			int targetObjectType = t.getObjectType();
			if(!mentionedUserIds.contains(t.getUser_UUID())) {
				targetObjectType = DBUserMention.OBJECT_TYPE_EVENT_OBSOLETE;
			} else {
				targetObjectType = DBUserMention.OBJECT_TYPE_EVENT;
			}
			
			if(t.getObjectType() != targetObjectType) {
				t.setObjectType(targetObjectType);
				updateUserMentionData(t);
			}
			
			if(mentionedUserIds.contains(t.getUser_UUID())) {
				mentionedUserIds.remove(t.getUser_UUID());
			}
		}
		
		String mentionedBy = event.getModifiedBy();
		for(String userId : mentionedUserIds) {
			DBUserMention t = new DBUserMention();
			t.setMention_UUID(UUID.randomUUID().toString());
			t.setObjectId(event.getEvent_UUID());
			t.setObjectType(DBUserMention.OBJECT_TYPE_EVENT);
			t.setCalendar_UUID(event.getCalendar_UUID());
			t.setUser_UUID(userId);
			t.setMentionedBy(mentionedBy);
			t.setCreatedOn(event.getModifiedOn());
			insertUserMentionData(t);
		}
	}
	
	public void updateMentionHistory(DBEventInstance eventInstance) {
		if(eventInstance.getEventInfo() == null) {
			return;
		}
		
		List<DBUserMention> l = getUserMentionDataByObject(eventInstance.getEventInst_UUID(), DBUserMention.OBJECT_TYPE_EVENT_INSTANCE);
		
		List<MentionHelper.MentionRecord> mentioned = eventInstance.getEventInfo().getMentionedPeople();
		Set<String> mentionedUserIds = new HashSet<String>();
		for(MentionHelper.MentionRecord record : mentioned) {
			if(record.getUserid() != null) {
				mentionedUserIds.add(record.getUserid());
			}
		}
		
		for(Iterator<DBUserMention> iter = l.iterator(); iter.hasNext(); ) {
			DBUserMention t = iter.next();
			
			int targetObjectType = t.getObjectType();
			if(!mentionedUserIds.contains(t.getUser_UUID())) {
				targetObjectType = DBUserMention.OBJECT_TYPE_EVENT_INSTANCE_OBSOLETE;
			} else {
				targetObjectType = DBUserMention.OBJECT_TYPE_EVENT_INSTANCE;
			}
			
			if(t.getObjectType() != targetObjectType) {
				t.setObjectType(targetObjectType);
				updateUserMentionData(t);
			}
			
			if(mentionedUserIds.contains(t.getUser_UUID())) {
				mentionedUserIds.remove(t.getUser_UUID());
			}
		}
		
		String mentionedBy = eventInstance.getModifiedBy();
		for(String userId : mentionedUserIds) {
			DBUserMention t = new DBUserMention();
			t.setMention_UUID(UUID.randomUUID().toString());
			t.setObjectId(eventInstance.getEventInst_UUID());
			t.setObjectType(DBUserMention.OBJECT_TYPE_EVENT_INSTANCE);
			t.setCalendar_UUID(eventInstance.getCalendar_UUID());
			t.setUser_UUID(userId);
			t.setMentionedBy(mentionedBy);
			t.setCreatedOn(eventInstance.getModifiedOn());
			insertUserMentionData(t);
		}
	}
}
