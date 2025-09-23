/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.dao.model;

import java.sql.Timestamp;
import java.util.List;

import com.ibatis.dao.client.Dao;
import com.ibm.lconn.calendar.db.model.DBEventComment;

public interface EventCommentDAO extends Dao {
	public void addComment(DBEventComment comment);
	public void removeComment(String commentId);
	public void removeCommentsOfEventInstance(String eventInstId);
	public void removeCommentsOfEvent(String eventId);
	public void removeCommentsOfCalendar(String calendarId);
	public DBEventComment getComment(String commentId);
	public List<DBEventComment> getCommentsOfEventInstance(String eventInstId, int offset, int length);
	public int getCommentCountOfEventInstance(String eventInstId);
	public Timestamp getMaxDateOfEventInstanceComments(String eventInstId);
}
