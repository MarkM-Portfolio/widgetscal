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

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.dao.model.CalendarDAO;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.test.core.BaseTestCase;
import com.ibm.lconn.calendar.util.CalendarRole;
import com.ibm.lconn.calendar.util.ExecutionContext;

/**
 * unit tests for "CalendarDAO.addCalendar(DBCalendar)"
 * 
 * @author Qi Wei Zhang
 */
public class CalendarDAOSqlMapTest1 extends BaseTestCase {
	private static final String CLASS_NAME = CalendarDAOSqlMapTest1.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	private CalendarDAO calDao = null;
	
	protected void setUp() throws Exception {
		super.setUp();

		cs = CalendarServiceFactory.INSTANCE.create();
		calDao = cs.getCalendarDAO();
	}

	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public void testAddCalendar() throws Exception {
		String comm = UUID.randomUUID().toString();
		Date now = new Date();
		
		DBCalendar calendar = new DBCalendar();
		calendar.setCalendar_UUID(comm);
		calendar.setCommunity_UUID(comm);
		calendar.setCommunityName("Community - " + comm);
		calendar.setLastModified(now);
		calendar.setMembers_Role(CalendarRole.AUTHOR);
		calendar.setVisibility(DBCalendar.PRIVATE);
		calendar.setCreatedOn(now);
		calendar.setAclModtime(now);
		calDao.addCalendar(calendar);
		
		cs.flush();
		
		// verify the result
		assertEquals(1, dbUtils.count("CA_CALENDAR"));
		assertEquals(1, dbUtils.count("CA_CALENDAR", 
				new String[]{"CALENDAR_UUID", "COMMUNITY_UUID"},
				new Object[]{comm, comm}));
	}
	
	public void testUpdateCalendar() throws Exception {
		String comm = UUID.randomUUID().toString();
		dbUtils.insert("CA_CALENDAR", new String[] {
			"CALENDAR_UUID"	
		}).item(new Object[] {comm});
		dbUtils.flush();
		
		DBCalendar calendar = new DBCalendar();
		calendar.setCalendar_UUID(comm);
		calendar.setCommunity_UUID(comm);
		calendar.setCommunityName("Community Updated - " + comm);
		calendar.setLastModified(new Date());
		calendar.setVisibility(DBCalendar.PUBLIC);
		calendar.setMembers_Role(CalendarRole.READER);
		calendar.setAclModtime(new Date());
		calDao.updateCalendar(calendar);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_CALENDAR",
				new String[] {"CALENDAR_UUID", "VISIBILITY", "MEMBERS_ROLE", "COMMUNITY_NAME"},
				new Object[] {comm, DBCalendar.PUBLIC, CalendarRole.READER, "Community Updated - "+comm}));
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("communityName", "my community");
		map.put("visibility", DBCalendar.PRIVATE);
		calDao.updateCalendar(comm, map);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_CALENDAR",
				new String[] {"CALENDAR_UUID", "VISIBILITY", "COMMUNITY_NAME"},
				new Object[] {comm, DBCalendar.PRIVATE, "my community"}));
	}
	
	public void testUpdateCalendar2() throws Exception {
		String comm = UUID.randomUUID().toString();
		dbUtils.insert("CA_CALENDAR", new String[] {
			"CALENDAR_UUID", "ORG_ID"	
		}).item(new Object[] {comm, "TEST"});
		dbUtils.flush();
		
		Map<String, Object> updates = new HashMap<String, Object>();
		updates.put("ORG_ID", "TEST");
		cs.getCalendarDAO().updateCalendar(comm, updates);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_CALENDAR",
				new String[] {"CALENDAR_UUID", "ORG_ID"},
				new Object[] {comm, "TEST"}));
	}
	
	public void testDeleteCalendar() throws Exception {
		String comm = UUID.randomUUID().toString();
		dbUtils.insert("CA_CALENDAR", new String[] {
			"CALENDAR_UUID"	
		}).item(new Object[] {comm});
		dbUtils.flush();
		
		calDao.deleteCalendar(comm);
		cs.flush();
		
		assertEquals(0, dbUtils.count("CA_CALENDAR"));
	}
	
	public void testGetCalendar() throws Exception {
		String comm = UUID.randomUUID().toString();
		dbUtils.insert("CA_CALENDAR", new String[] {
			"CALENDAR_UUID"	
		}).item(new Object[] {comm});
		dbUtils.flush();
		
		DBCalendar calendar = calDao.getCalendar(comm);
		assertEquals(comm, calendar.getCalendar_UUID());
	}
	
	public void testUpdateOrgId() throws Exception {
		String calendarUuid = UUID.randomUUID().toString();
		
		String[] tables = new String[]{"CA_MEMBERSHIP", "CA_CALENDAR", "CA_EVENT", "CA_EVENTINSTANCE", "CA_SUBSTITUTION", "CA_RECURRENCE", 
				"CA_EVENTINFO", "CA_DELETION_HISTORY", "CA_EVENTTAG", "CA_EVENTTAGAGG", "CA_EVENTCOMMENT", "CA_EVENTFOLLOWING" };
		
		for(int i = 0; i < tables.length; i++) {
			dbUtils.insert(tables[i], new String[] {"CALENDAR_UUID"}, new Object[] {calendarUuid});
			dbUtils.flush();
			
			assertEquals(dbUtils.count(tables[i]), dbUtils.count(tables[i], new String[]{"ORG_ID"}, new Object[]{"TEST"}));
			dbUtils.flush();
		
			ExecutionContext.runAs(ExecutionContext.IGNORE_TENANTKEY);
			
			try {
				calDao.updateOrgId(calendarUuid, "TEST1");
				cs.flush();
			} finally {
			    ExecutionContext.exit();
			}
		
			assertEquals(dbUtils.count(tables[i]), dbUtils.count(tables[i], new String[]{"ORG_ID"}, new Object[]{"TEST1"}));
			dbUtils.flush();
		
			assertEquals(0, dbUtils.count(tables[i], new String[]{"ORG_ID"}, new Object[]{"TEST"}));
			dbUtils.flush();
		
			dbUtils.clearTable();
			dbUtils.flush();
		}
	}
}
