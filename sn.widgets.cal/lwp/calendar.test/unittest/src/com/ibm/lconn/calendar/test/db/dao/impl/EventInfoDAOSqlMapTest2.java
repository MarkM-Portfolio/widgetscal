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

package com.ibm.lconn.calendar.test.db.dao.impl;

import java.util.HashSet;
import java.util.Set;
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.dao.model.EventInfoDAO;
import com.ibm.lconn.calendar.test.core.BaseTestCase;

public class EventInfoDAOSqlMapTest2 extends BaseTestCase {
	private static final String CLASS_NAME = EventDAOSqlMapTest1.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	private EventInfoDAO efDao = null;
	
	protected void setUp() throws Exception {
		super.setUp();
		
		cs = CalendarServiceFactory.INSTANCE.create();
		efDao = cs.getEventInfoDao();
	}
	
	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public void testDeleteEventInfos() throws Exception {
		String calId1 = "test_cal1";
		String calId2 = "test_cal2";
		String eventId1 = "test_event1";
		String eventId2 = "test_event12";
		String eventId3 = "test_event2";
		String infoId1 = "test_info11";
		String infoId2 = "test_info12";
		String infoId3 = "test_info21";
		String infoId4 = "test_info22";
		
		dbUtils.insert("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "EVENT_UUID", "CALENDAR_UUID"}, 
				new Object[] {infoId1, eventId1, calId1});
		dbUtils.insert("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "EVENT_UUID", "CALENDAR_UUID"}, 
				new Object[] {infoId2, eventId2, calId1});
		dbUtils.insert("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "EVENT_UUID", "CALENDAR_UUID"}, 
				new Object[] {infoId3, eventId3, calId2});
		dbUtils.insert("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "EVENT_UUID", "CALENDAR_UUID"}, 
				new Object[] {infoId4, eventId3, calId2});
		dbUtils.flush();
		
		// delete by EVENT_UUID, this should bypass the CALENDAR_UUID
		efDao.deleteEventInfos(calId1, eventId1);
		cs.flush();
		
		assertEquals(3, dbUtils.count("CA_EVENTINFO"));
		// should not delete others that CALENDAR_UUID == calId1
		assertEquals(1, dbUtils.count("CA_EVENTINFO", new String[] {"CALENDAR_UUID"}, new Object[] {calId1}));
		assertEquals(0, dbUtils.count("CA_EVENTINFO", new String[] {"EVENT_UUID"}, new Object[] {eventId1}));
		
		// delete by CALENDAR_ID
		efDao.deleteEventInfos(calId2, null);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_EVENTINFO"));
		assertEquals(0, dbUtils.count("CA_EVENTINFO", new String[] {"CALENDAR_UUID"}, new Object[] {calId2}));
	}
}
