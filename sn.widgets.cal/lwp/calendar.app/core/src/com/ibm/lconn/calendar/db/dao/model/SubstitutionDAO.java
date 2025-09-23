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

import java.util.Date;
import java.util.List;

import com.ibatis.dao.client.Dao;
import com.ibm.lconn.calendar.db.model.DBSubstitution;

/**
 * @author skomard
 */

public interface SubstitutionDAO extends Dao {
	public void    addSubstitution(DBSubstitution substitution);
	public Integer updateSubstitution(DBSubstitution substitution);
	public Integer deleteSubstitution(String substitution_UUID);
	public Integer deleteSubstitutions(String calendar_UUID, String event_UUID);
	
	public DBSubstitution getSubstitution(String substitution_UUID);
	public DBSubstitution getSubstitution(String event_UUID, Date newStartDate);
	public List<DBSubstitution> getSubstitutions(String calendar_UUID, String event_UUID);
	
	public Integer moveEventSubstitutionsInBatch(String event_UUID, long startDateOffset, long endDateOffset);
	public Integer updateEventSubstitutionsTimestampInBatch(String event_UUID);
}