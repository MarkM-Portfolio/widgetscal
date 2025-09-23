/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.test.db.dao.impl;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.dao.model.EventInstanceDAO;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.test.core.BaseTestCase;

public class EventInstanceDAOSqlMapTest2 extends BaseTestCase {
	private static final String CLASS_NAME = EventInstanceDAOSqlMapTest2.class.getName();
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
	
	public void testGetEventInstance() throws Exception {
		String instanceID = "instance1";
		String infoID = "info1";
		
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "EVENTINFO_UUID"}, 
				new Object[] {instanceID, infoID});
		dbUtils.flush();
		
		DBEventInstance instance = dao.getEventInstance(instanceID);
		cs.flush();
		
		assertEquals(instanceID, instance.getEventInst_UUID());
		assertEquals(infoID, instance.getEventInfo_UUID());
	}
	
	public void testGetEventInstanceByEventAndStartDate() throws Exception {
		String instanceID = "instance1";
		String eventID = "event1";
		String infoID = "info";
		Timestamp time = new Timestamp(1000);
		
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE"}, 
				new Object[] {instanceID, eventID, infoID, time});
		dbUtils.flush();
		
		DBEventInstance instance = dao.getEventInstance(eventID, time);
		cs.flush();
		
		assertEquals(instanceID, instance.getEventInst_UUID());
		assertEquals(eventID, instance.getEvent_UUID());
		assertEquals(time.getTime(), instance.getStartDate().getTime());
	}
	
	public void testGetInstances() throws Exception {
		String instanceID = "instance_";
		String calendarID = "calendar";
		String eventID = "event";
		String infoID = "info";
		long duration = 1000*3600;
		int count = 5;
		
		for(int i=1; i<=count; i++) {
			Timestamp start = new Timestamp(1000*i);
			Timestamp end = new Timestamp(1000*i + duration);
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {instanceID+i, calendarID, eventID, infoID, start, end});
		}
		dbUtils.flush();
		
		Date start = new Date(1000*2 + duration);	// get from the second one
		Date end = new Date(count*1000 + duration);
		
		// test get all
		List<DBEventInstance> instances = dao.getEventInstances(
				calendarID, eventID, null, start, end, -1, -1);
		cs.flush();
		
		assertEquals(3, instances.size());
		DBEventInstance inst1 = instances.get(0);
		DBEventInstance inst2 = instances.get(1);
		DBEventInstance inst3 = instances.get(2);
		assertTrue(inst1.getStartDate().getTime() < inst2.getStartDate().getTime()
				&& inst2.getStartDate().getTime() < inst3.getStartDate().getTime());
	}
	
	public void testGetInstancesCount() throws Exception {
		String instanceID = "instance_";
		String calendarID = "calendar";
		String eventID = "event";
		String infoID = "info";
		long duration = 1000*3600;
		int count = 5;
		
		for(int i=1; i<=count; i++) {
			Timestamp start = new Timestamp(1000*i);
			Timestamp end = new Timestamp(1000*i + duration);
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {instanceID+i, calendarID, eventID, infoID, start, end});
		}
		dbUtils.flush();
		
		Date start = new Date(1000*2 + duration);	// get from the second one
		Date end = new Date(count*1000 + duration);
		int c = dao.getEventInstancesCount(calendarID, eventID, null, start, end);
		cs.flush();
		
		assertEquals(3, c);
	}
	
	public void testMoveEventInstancesInBatch() throws Exception {
		String instanceID1 = "instance1";
		String instanceID2 = "instance2";
		String calendarID = "calendar";
		String eventID = "event";
		String infoID = "info";
		long duration = 3600*1000;
		Timestamp start1 = new Timestamp(1000);
		Timestamp start2 = new Timestamp(2000);
		Timestamp end1 = new Timestamp(start1.getTime() + duration);
		Timestamp end2 = new Timestamp(start2.getTime() + duration);
		
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {instanceID1, calendarID, eventID, infoID, start1, end1});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {instanceID2, calendarID, eventID, infoID, start2, end2});
		dbUtils.flush();
		
		long startOffset = 1800;	// seconds
		long endOffset = 3600;		// seconds
		dao.moveEventInstancesInBatch(eventID, startOffset, endOffset);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {instanceID1, new Timestamp(start1.getTime()+startOffset*1000), new Timestamp(end1.getTime()+endOffset*1000)}));
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {instanceID2, new Timestamp(start2.getTime()+startOffset*1000), new Timestamp(end2.getTime()+endOffset*1000)}));
	}
}
