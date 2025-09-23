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

import java.util.Date;
import java.util.UUID;
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.dao.model.EventDAO;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.test.core.BaseTestCase;


public class EventDAOSqlMapTest1 extends BaseTestCase {
	private static final String CLASS_NAME = EventDAOSqlMapTest1.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	private EventDAO evtDao = null;
	
	protected void setUp() throws Exception {
		super.setUp();
		
		cs = CalendarServiceFactory.INSTANCE.create();
		evtDao = cs.getEventDAO();
	}
	
	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public void testAddEvent() throws Exception {
		String eventId = UUID.randomUUID().toString();
		String calId = UUID.randomUUID().toString();
		String byId = UUID.randomUUID().toString();
		String infoId = UUID.randomUUID().toString();
		
		DBEvent event = new DBEvent();
		event.setEvent_UUID(eventId);
		event.setCalendar_UUID(calId);
		event.setCreatedBy(byId);
		event.setModifiedBy(byId);
		event.setCreatedOn(new Date());
		event.setModifiedOn(new Date());
		event.setIsRecurrence(false);
		
		DBEventInfo eventInfo = new DBEventInfo();
		eventInfo.setEventInfo_UUID(infoId);
		event.setEventInfo(eventInfo);
		
		evtDao.addEvent(event);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_EVENT",
				new String[] {"EVENT_UUID", "CALENDAR_UUID", "DFLTEVENTINFO"},
				new Object[] {eventId, calId, infoId}));
	}
	
	public void testUpdateEvent() throws Exception {
		String uuid = "test1";
		String modifyBy = "test2";
		
		dbUtils.insert("CA_EVENT", new String[] {"EVENT_UUID"}, new Object[] {uuid});
		dbUtils.flush();
		
		DBEvent event = new DBEvent();
		event.setEvent_UUID(uuid);
		event.setModifiedBy(modifyBy);
		event.setModifiedOn(new Date());
		event.setIsRecurrence(true);
		
		evtDao.updateEvent(event);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_EVENT", 
				new String[] {"EVENT_UUID", "MODIFIEDBY", "ISRECURRENCE"}, 
				new Object[] {uuid, modifyBy, 1}));
	}
	
	public void testDeleteEvent() throws Exception {
		String uuid = "test";
		
		dbUtils.insert("CA_EVENT", new String[] {"EVENT_UUID"}, new Object[] {uuid});
		dbUtils.flush();
		
		evtDao.deleteEvent(uuid);
		cs.flush();
		
		assertEquals(0, dbUtils.count("CA_EVENT", 
				new String[] {"EVENT_UUID"}, 
				new Object[] {uuid}));
	}
	
	public void testDeleteByCal() throws Exception {
		String eventId = "test_event";
		String calId = "test_cal";
		
		dbUtils.insert("CA_EVENT", new String[] {"EVENT_UUID", "CALENDAR_UUID"},
				new Object[] {eventId, calId});
		dbUtils.flush();
		
		evtDao.deleteEventsByCalendar(calId);
		cs.flush();
		
		assertEquals(0, dbUtils.count("CA_EVENT", 
				new String[] {"CALENDAR_UUID"}, 
				new Object[] {calId}));
	}
	
	public void testGetEvent() throws Exception {
		String eventId1 = "test_event_1";
		String eventId2 = "test_event_2";
		
		dbUtils.insert("CA_EVENT", new String[] {"EVENT_UUID"}, new Object[] {eventId1});
		dbUtils.insert("CA_EVENT", new String[] {"EVENT_UUID"}, new Object[] {eventId2});
		dbUtils.flush();
		
		DBEvent evt1 = evtDao.getEvent(eventId1);
		DBEvent evt2 = evtDao.getEvent(eventId2);
		cs.flush();
		
		assertEquals(eventId1, evt1.getEvent_UUID());
		assertEquals(eventId2, evt2.getEvent_UUID());
	}
}
