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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.dao.model.EventInstanceDAO;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.test.core.BaseTestCase;

public class EventInstanceDAOSqlMapTest1 extends BaseTestCase {
	private static final String CLASS_NAME = EventInstanceDAOSqlMapTest1.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	private EventInstanceDAO dao = null;
	
	protected void setUp() throws Exception {
		super.setUp();
		
		cs = CalendarServiceFactory.INSTANCE.create();
		dao = cs.getEventInstanceDao();
	}
	
	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public void testAddEventInstance() throws Exception {
		String uuid = UUID.randomUUID().toString();
		DBEventInstance inst = new DBEventInstance();
		inst.setEventInst_UUID(uuid);
		inst.setEvent_UUID(uuid);
		inst.setCalendar_UUID(uuid);
		DBEventInfo eventInfo = new DBEventInfo();
		eventInfo.setEventInfo_UUID(uuid);
		inst.setEventInfo(eventInfo);
		inst.setStartDate(new Date());
		inst.setEndDate(new Date());
		
		dao.addEventInstance(inst);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID"}, 
				new Object[] {uuid, uuid, uuid, uuid}));
	}
	
	public void testAddEventInstances() throws Exception {
		String[] uuids = new String[] {
				UUID.randomUUID().toString(),
				UUID.randomUUID().toString(),
				UUID.randomUUID().toString()
		};
		List<DBEventInstance> instances = new ArrayList<DBEventInstance>();
		for (String uuid : uuids) {
			DBEventInstance inst = new DBEventInstance();
			inst.setEventInst_UUID(uuid);
			inst.setEvent_UUID(uuid);
			inst.setCalendar_UUID(uuid);
			DBEventInfo eventInfo = new DBEventInfo();
			eventInfo.setEventInfo_UUID(uuid);
			inst.setEventInfo(eventInfo);
			inst.setStartDate(new Date());
			inst.setEndDate(new Date());
			instances.add(inst);
		}
		
		dao.addEventInstances(instances);
		cs.flush();
		
		assertEquals(3, dbUtils.count("CA_EVENTINSTANCE"));
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID"}, 
				new Object[] {uuids[0], uuids[0], uuids[0], uuids[0]}));
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID"}, 
				new Object[] {uuids[1], uuids[1], uuids[1], uuids[1]}));
	}
	
	public void testUpdateEventInstance() throws Exception {
		String instanceID = "test_instance";
		String infoID1 = "test_info_1";
		String infoID2 = "test_info_2";
		
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "EVENTINFO_UUID"}, 
				new Object[] {instanceID, infoID1});
		dbUtils.flush();
		
		DBEventInstance instance = new DBEventInstance();
		instance.setEventInst_UUID(instanceID);
		DBEventInfo info = new DBEventInfo();
		info.setEventInfo_UUID(infoID2);
		instance.setEventInfo(info);
		instance.setStartDate(new Date());
		instance.setEndDate(new Date());
		
		dao.updateEventInstance(instance);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "EVENTINFO_UUID"}, 
				new Object[] {instanceID, infoID2}));
	}
	
	public void testDeleteEventInstance() throws Exception {
		String instanceID = "test_instance";
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID"}, 
				new Object[] {instanceID});
		dbUtils.flush();
		
		dao.deleteEventInstance(instanceID);
		cs.flush();
		
		assertEquals(0, dbUtils.count("CA_EVENTINSTANCE"));
		assertEquals(0, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID"}, 
				new Object[] {instanceID}));
	}
	
	public void testDeleteEventInstances() throws Exception {
		String calendarID1 = "calendar1";
		String calendarID2 = "calendar2";
		String eventID1 = "event1";
		String eventID2 = "event2";
		String eventID3 = "event3";
		String instanceID1 = "instance1";
		String instanceID2 = "instance2";
		String instanceID3 = "instance3";
		String instanceID4 = "instance4";
		String infoID = "info";
		
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID"}, 
				new Object[] {instanceID1, calendarID1, eventID1, infoID});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID"}, 
				new Object[] {instanceID2, calendarID1, eventID2, infoID});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID"}, 
				new Object[] {instanceID3, calendarID2, eventID3, infoID});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID"}, 
				new Object[] {instanceID4, calendarID2, eventID3, infoID});
		dbUtils.flush();
		
		// should bypass the calendar ID
		dao.deleteEventInstances(calendarID1, eventID1);
		cs.flush();
		
		assertEquals(3, dbUtils.count("CA_EVENTINSTANCE"));
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"CALENDAR_UUID"}, 
				new Object[] {calendarID1}));
		assertEquals(0, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"CALENDAR_UUID", "EVENT_UUID"}, 
				new Object[] {calendarID1, eventID1}));
		
		dao.deleteEventInstances(calendarID2, null);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE"));
		assertEquals(0, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"CALENDAR_UUID"}, 
				new Object[] {calendarID2}));
	}
}
