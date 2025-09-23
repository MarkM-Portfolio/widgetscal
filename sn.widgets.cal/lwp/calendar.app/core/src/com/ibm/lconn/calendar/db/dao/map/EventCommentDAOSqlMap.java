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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ibatis.dao.client.DaoManager;
import com.ibm.lconn.calendar.db.dao.model.EventCommentDAO;
import com.ibm.lconn.calendar.db.model.DBEventComment;

public class EventCommentDAOSqlMap extends SqlMapDaoBaseImpl implements EventCommentDAO {

	public EventCommentDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}

	public void addComment(DBEventComment comment) {
		comment.prepareForPersistent();
		comment.refreshNotifiedMeta();
		super.insert("EventComment.insertEventComment", comment);
	}

	public void removeComment(String commentId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("commentUUID", commentId);
		super.delete("EventComment.deleteEventComment", params);
	}
	
	public void removeCommentsOfEventInstance(String eventInstId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("instanceUUID", eventInstId);
		super.delete("EventComment.deleteEventInstanceComments", params);
	}

	public void removeCommentsOfEvent(String eventId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("eventUUID", eventId);
		super.delete("EventComment.deleteEventComments", params);
	}

	public void removeCommentsOfCalendar(String calendarId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("calendarUUID", calendarId);
		super.delete("EventComment.deleteCalendarComments", params);
	}
	
	public DBEventComment getComment(String commentId) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("commentUUID", commentId);
			return (DBEventComment)super.queryForObject("EventComment.selectEventComment", params);
		} catch(Exception ex) {
			return null;
		}
	}

	public List<DBEventComment> getCommentsOfEventInstance(String eventInstId, int offset, int length) {
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("eventInst_UUID", eventInstId);
		
		if (length == -1) {
			return (List<DBEventComment>)super.queryForList("EventComment.selectEventInstanceComments", params);
		} else {
			return (List<DBEventComment>)super.queryForList("EventComment.selectEventInstanceComments", params, offset, length);
		}
	}

	public int getCommentCountOfEventInstance(String eventInstId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("instanceUUID", eventInstId);
		return (Integer)super.queryForObject("EventComment.selectEventInstanceCommentsCount", params);
	}
	
	public Timestamp getMaxDateOfEventInstanceComments(String eventInstId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("instanceUUID", eventInstId);
		return (Timestamp)super.queryForObject("EventComment.selectMaxDateOfEventInstanceComments", params);
	}
}
