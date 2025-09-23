/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
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
import com.ibm.lconn.calendar.db.model.DBEventFollowingRecord;

public interface EventFollowingDAO extends Dao {
	public DBEventFollowingRecord getEventFollowingRecord(String recordUuid);
	public void addEventFollowingRecord(DBEventFollowingRecord record);
	public Integer updateEventFollowingRecord(DBEventFollowingRecord record);
	public Integer removeEventFollowingRecord(String recordUuid);
	public Integer removeEventFollowingRecords(String calendarUuid, String eventUuid, String userUuid);
	
	public DBEventFollowingRecord getEventFollowingRecord(String itemUuid, int itemType, String userUuid);
	
	public List<DBEventFollowingRecord> getEventFollowingRecords(String eventUuid, String itemUuid, int itemType, Integer followType, int offset, int length);
	public int getEventFollowingRecordsCount(String eventUuid, String itemUuid, int itemType, Integer followType);

	public Integer updateEventFollowingMasks(String eventUuid, String userUuid, Integer followType, String addOrRemove);
	public Integer updateEventFollowingMasks(String itemUuid, int itemType, String userUuid, Integer followType, String addOrRemove);
	public Integer removeObsoleteEventFollowingRecords(String eventUuid, String userUuid);
	public Integer removeObsoleteEventFollowingRecords(String itemUuid, int itemType, String userUuid);
	
	public Integer updateEndDateOfEventItem(String itemUuid, int itemType, Date endDate);
}
