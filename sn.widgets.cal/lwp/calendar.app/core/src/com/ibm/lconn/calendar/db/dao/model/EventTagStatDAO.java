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

package com.ibm.lconn.calendar.db.dao.model;

import java.util.List;

import com.ibatis.dao.client.Dao;
import com.ibm.lconn.calendar.db.model.DBEventTagStat;

public interface EventTagStatDAO extends Dao {
	public void addEventTagStat(DBEventTagStat tagStat);

	public Integer updateEventTagStat(DBEventTagStat tagStat);
	
	public DBEventTagStat getEventTagStat(String calendar_UUID, String tag);

	public Integer deleteEventTagStat(String calendar_UUID, String tag);

	public Integer updateEventTagStat(String calendar_UUID, String tag, int diff);
	
	public Integer updateEventTagStatOnEventDeletion(String calendar_UUID, String event_UUID);
	
	public List<DBEventTagStat> getMostPopularEventTags(String calendar_UUID, String startWith, int count);
	
	public List<DBEventTagStat> getRelatedEventTags(String calendar_UUID, List<String> tags, int count);
}
