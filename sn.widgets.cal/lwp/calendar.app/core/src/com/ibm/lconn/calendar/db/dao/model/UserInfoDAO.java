/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.dao.model;

import java.util.List;

import com.ibm.connections.directory.services.data.DSObject;
import com.ibm.lconn.calendar.db.model.DBMembership;
import com.ibm.lconn.calendar.db.model.DBUser;

public interface UserInfoDAO {
	public DBUser getUserByEmail(String email);
	public DBUser getUserByUUID(String uuid);
	public DBUser getUserByExtID(String extid);
	public void addUserMembership(List<DBMembership> memberships);
	public void addUserMembership(DBMembership membership);
	public void updateUserMembership(DBMembership membership);
	public void deleteUserMembership(DBMembership membership);
	public Integer getUserMembership(String member_UUID, String calendar_UUID);
	public List<DBMembership> getUserMemberships(String member_UUID);
	public void insertUserRecord(String memberUuid, String orgId, DSObject personDSObject);
	public DBUser insertUserRecord(DBUser user);
}
