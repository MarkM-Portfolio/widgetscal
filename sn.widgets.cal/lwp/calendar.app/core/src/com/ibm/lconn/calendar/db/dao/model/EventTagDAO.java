/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.dao.model;

import java.util.List;

import com.ibatis.dao.client.Dao;
import com.ibm.lconn.calendar.db.model.DBEventTag;

public interface EventTagDAO extends Dao {
	public void addEventTag(DBEventTag tag);

	public Integer updateEventTag(DBEventTag tag);
	
	public DBEventTag getEventTag(String tag_UUID);

	public Integer deleteEventTag(String tag_UUID);
	
	public Integer deleteEventTag(String event_UUID, String tag);

	public Integer deleteEventTags(String calendar_UUID, String event_UUID);

	public List<DBEventTag> getTagsByEvent(String event_UUID);
}
