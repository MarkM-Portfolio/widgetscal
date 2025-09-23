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

package com.ibm.lconn.calendar.db.dao.model;

import java.util.List;

import com.ibatis.dao.client.Dao;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBUserMention;

public interface UserMentionDAO extends Dao {
	public void insertUserMentionData(DBUserMention userMentionData);

	public int updateUserMentionData(DBUserMention userMentionData);

	public int deleteUserMentionData(DBUserMention userMentionData);

	public int deleteUserMentionDataByEvent(String event_UUID);
	
	public int deleteUserMentionDataByEventInstance(String eventInst_UUID);

	public int deleteUserMentionDataByCalendar(String calendar_UUID);

	public List<DBUserMention> getUserMentionDataByObject(String objectId, int objectType);

	public void updateMentionHistory(DBEvent event);
	
	public void updateMentionHistory(DBEventInstance eventInstance);
}
