/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.dao.model;

import java.util.Date;
import java.util.List;

import com.ibatis.dao.client.Dao;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.util.IntHolder;

/**
 * @author Qi Wei Zhang
 */
public interface EventInstanceDAO extends Dao {
	public void  addEventInstance(DBEventInstance eventInstance);
	public void  addEventInstances(List<DBEventInstance> eventInstances);
	public Integer updateEventInstance(DBEventInstance eventInstance);
	public Integer deleteEventInstance(String eventInst_UUID);
	public Integer deleteEventInstances(String calendar_UUID, String event_UUID);
	
	public DBEventInstance getEventInstance(String eventInst_UUID);
	public DBEventInstance getEventInstance(String event_UUID, Date startDate);
	
	public List<DBEventInstance> getEventInstances(String event_UUID, Boolean exceptions);
	
	public List<DBEventInstance> getEventInstances(String calendar_UUID, String event_UUID, List<String> tags, Date dateBegin, Date dateEnd, int offset, int length);
	public int getEventInstancesCount(String calendar_UUID, String event_UUID, List<String> tags, Date dateBegin, Date dateEnd);

	public List<DBEventInstance> getFollowedEventInstances(DBUser user, Date dateBegin, Date dateEnd, Integer followType);
	
	public List<DBEventInstance> getUpcomingFollowedEventInstances(DBUser user, Date dateBegin, Integer followType, int offset, int length, IntHolder totalResults);
	public int getUpcomingFollowedEventInstancesCount(DBUser user, Date dateBegin, Integer followType);
	
	public Date getLatestEndDate(String event_UUID);
	
	public Integer resetEventInstancesLastModified(String event_UUID, List<String> fields);
	public Integer moveEventInstancesInBatch(String event_UUID, long startDateOffset, long endDateOffset);
}