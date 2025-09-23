/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2011                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.dao.model;

import com.ibatis.dao.client.Dao;
import com.ibm.lconn.calendar.db.model.DBEventInfo;

/**
 * @author skomard
 */

public interface EventInfoDAO extends Dao {
	public void    addEventInfo(DBEventInfo dbEvInf);
	public Integer updateEventInfo(DBEventInfo dbEvInf);
	public Integer deleteEventInfo(String eventInfo_UUID);
	public Integer deleteEventInfos(String calendar_UUID, String event_UUID);
	public DBEventInfo getEventInfo(String eventInfoUUID);
}
