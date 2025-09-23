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

package com.ibm.lconn.calendar.test.db.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import com.ibm.connections.directory.services.data.DSObject.Role;
import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.dao.model.UserInfoDAO;
import com.ibm.lconn.calendar.db.model.DBMembership;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.test.core.BaseTestCase;

public class UserInfoDAOSqlMapTest1 extends BaseTestCase {
	private static final String CLASS_NAME = UserInfoDAOSqlMapTest1.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	private UserInfoDAO dao = null;
	
	// NOTE: this table won't be cleaned when setUp & tearDown
	protected void setUp() throws Exception {
		super.setUp();

		cs = CalendarServiceFactory.INSTANCE.create();
		dao = cs.getUserInfoDao();
	}

	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public void testAddUserMembership() throws Exception {
		List<DBMembership> memberships = new ArrayList<DBMembership>();
		int count = 3;
		String calendarID = "calendar1";
		String memberID = "member_";
		for(int i=0; i<count; i++) {
			DBMembership m = new DBMembership();
			m.setCalendar_UUID(calendarID);
			m.setMember_UUID(memberID + i);
			m.setRole(1);
			memberships.add(m);
		}
		
		dao.addUserMembership(memberships);
		cs.flush();
		
		assertEquals(count, dbUtils.count("CA_MEMBERSHIP"));
		assertEquals(count, dbUtils.count("CA_MEMBERSHIP", 
				new String[] {"CALENDAR_UUID", "ROLE"}, 
				new Object[] {calendarID, 1}));
		
	}
	
	public void testUpdateUserMembership() throws Exception {
		String calendarID = "calendar1";
		String memberID = "member1";
		
		dbUtils.insert("CA_MEMBERSHIP", 
				new String[] {"CALENDAR_UUID", "MEMBER_UUID"}, 
				new Object[] {calendarID, memberID});
		dbUtils.flush();
		
		DBMembership membership = new DBMembership();
		membership.setCalendar_UUID(calendarID);
		membership.setMember_UUID(memberID);
		membership.setRole(Role.OWNER);
		
		dao.updateUserMembership(membership);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_MEMBERSHIP", 
				new String[] {"CALENDAR_UUID", "MEMBER_UUID", "ROLE"}, 
				new Object[] {calendarID, memberID, Role.OWNER}));
	}
	
	public void testDeleteUserMembership() throws Exception {
		String calendarID = "calendar1";
		String memberID = "member1";
		
		dbUtils.insert("CA_MEMBERSHIP", 
				new String[] {"CALENDAR_UUID", "MEMBER_UUID"}, 
				new Object[] {calendarID, memberID});
		dbUtils.flush();
		
		DBMembership membership = new DBMembership();
		membership.setCalendar_UUID(calendarID);
		membership.setMember_UUID(memberID);
		
		dao.deleteUserMembership(membership);
		cs.flush();
		
		assertEquals(0, dbUtils.count("CA_MEMBERSHIP", 
				new String[] {"CALENDAR_UUID", "MEMBER_UUID"}, 
				new Object[] {calendarID, memberID}));
	}
	
	public void testGetUserMembership() throws Exception {
		String calendarID = "calendar1";
		String memberID = "member1";
		
		dbUtils.insert("CA_MEMBERSHIP", 
				new String[] {"CALENDAR_UUID", "MEMBER_UUID", "ROLE"}, 
				new Object[] {calendarID, memberID, Role.MEMBER});
		dbUtils.flush();
		
		int role = dao.getUserMembership(memberID, calendarID);
		cs.flush();
		
		assertEquals(role, Role.MEMBER);
	}
	
	public void testGetUserMemberships() throws Exception {
		String calendarID1 = "calendar1";
		String calendarID2 = "calendar2";
		String memberID1 = "member1";
		String memberID2 = "member2";
		
		dbUtils.insert("CA_MEMBERSHIP", 
				new String[] {"CALENDAR_UUID", "MEMBER_UUID", "ROLE"}, 
				new Object[] {calendarID1, memberID1, Role.MEMBER});
		dbUtils.insert("CA_MEMBERSHIP", 
				new String[] {"CALENDAR_UUID", "MEMBER_UUID", "ROLE"}, 
				new Object[] {calendarID2, memberID1, Role.OWNER});
		dbUtils.insert("CA_MEMBERSHIP", 
				new String[] {"CALENDAR_UUID", "MEMBER_UUID", "ROLE"}, 
				new Object[] {calendarID2, memberID2, Role.ALL});
		dbUtils.flush();
		
		List<DBMembership> memberships = dao.getUserMemberships(memberID1);
		cs.flush();
		
		assertEquals(2, memberships.size());
	}
}
