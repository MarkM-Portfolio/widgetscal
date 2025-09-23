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

import java.util.UUID;
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.dao.model.EventInfoDAO;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.test.core.BaseTestCase;

public class EventInfoDAOSqlMapTest1 extends BaseTestCase {
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
	
	public void testAddEventInfo() throws Exception {
		String eventInfoId = UUID.randomUUID().toString();
		String eventId = UUID.randomUUID().toString();
		String calId = UUID.randomUUID().toString();
		
		DBEventInfo evtInfo = new DBEventInfo();
		evtInfo.setEventInfo_UUID(eventInfoId);
		evtInfo.setEvent_UUID(eventId);
		evtInfo.setCalendar_UUID(calId);
		evtInfo.setName("Event - " + eventId);
		evtInfo.setLocation("Location - " + eventId);
		evtInfo.setDescription("Description - " + eventId);
		evtInfo.setIsAllDay(true);
		
		efDao.addEventInfo(evtInfo);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "CALENDAR_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[] {eventInfoId, calId, eventId, "Description - "+eventId, "Location - "+eventId, "Event - "+eventId, 1}));
	}
	
	public void testUpdateEventInfo() throws Exception {
		String uuid = "test_event";
		
		dbUtils.insert("CA_EVENTINFO", new String[] {"EVENTINFO_UUID"}, new Object[] {uuid});
		dbUtils.flush();
		
		DBEventInfo eventInfo = new DBEventInfo();
		eventInfo.setEventInfo_UUID(uuid);
		eventInfo.setDescription("DESPT: " + uuid);
		eventInfo.setLocation("LOC: " + uuid);
		eventInfo.setName("NAME: " + uuid);
		eventInfo.setIsAllDay(false);
		
		efDao.updateEventInfo(eventInfo);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[] {uuid, "DESPT: "+uuid, "LOC: " + uuid, "NAME: "+uuid, 0}));
	}
	
	public void testDeleteEventInfo() throws Exception {
		String uuid = "test_event";
		
		dbUtils.insert("CA_EVENTINFO", new String[] {"EVENTINFO_UUID"}, new Object[] {uuid});
		dbUtils.flush();
		
		efDao.deleteEventInfo(uuid);
		cs.flush();
		
		assertEquals(0, dbUtils.count("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID"},
				new Object[] {uuid}));
	}
	
	public void testGetEventInfo() throws Exception {
		String uuid1 = "test_event1";
		String uuid2 = "test_event2";
		
		dbUtils.insert("CA_EVENTINFO", new String[] {"EVENTINFO_UUID"}, new Object[] {uuid1});
		dbUtils.insert("CA_EVENTINFO", new String[] {"EVENTINFO_UUID"}, new Object[] {uuid2});
		dbUtils.flush();
		
		DBEventInfo info1 = efDao.getEventInfo(uuid1);
		DBEventInfo info2 = efDao.getEventInfo(uuid2);
		cs.flush();
		
		assertEquals(uuid1, info1.getEventInfo_UUID());
		assertEquals(uuid2, info2.getEventInfo_UUID());
	}
}
