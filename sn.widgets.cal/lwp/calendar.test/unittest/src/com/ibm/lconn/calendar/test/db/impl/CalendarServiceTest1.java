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

package com.ibm.lconn.calendar.test.db.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBRecurrence;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.test.core.BaseTestCase;
import com.ibm.lconn.calendar.util.FrequencyCode;

public class CalendarServiceTest1 extends BaseTestCase {
	private static final String CLASS_NAME = CalendarServiceTest1.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	
	protected void setUp() throws Exception {
		super.setUp();

		cs = CalendarServiceFactory.INSTANCE.create();
	}

	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public void testAddCustomEvent() throws Exception {
		// prepare the user
		String userID = "test_user_1";
		DBUser user = new DBUser();
		user.setUserUUID(userID);
		
		// prepare the calendar
		String calendarID = "test_calendar_1";
		DBCalendar calendar = new DBCalendar();
		calendar.setCalendar_UUID(calendarID);
		dbUtils.insert("CA_CALENDAR", new String[] {"CALENDAR_UUID"}, new Object[] {calendarID});
		dbUtils.flush();
		
		// prepare the event
		// 1. prepare the event info
		String eventName = "Test Event 1";
		String eventDesc = "Description - " + eventName;
		String eventLoc = "Location - " + eventName;
		boolean isAllday = false;
		DBEventInfo eventInfo = new DBEventInfo();
		eventInfo.setName(eventName);
		eventInfo.setLocation(eventLoc);
		eventInfo.setDescription(eventDesc);
		eventInfo.setIsAllDay(isAllday);
		// 2. prepare the event instance
		Date start = new Date(6*1000);
		Date end = new Date(8*1000);
		DBEventInstance eventInst = new DBEventInstance();
		eventInst.setStartDate(start);
		eventInst.setEndDate(end);
		eventInst.setEventInfo(eventInfo);
		List<DBEventInstance> instances = new ArrayList<DBEventInstance>();
		instances.add(eventInst);
		// 3. prepare the event
		DBEvent event = new DBEvent();
		event.setEventInfo(eventInfo);
		event.setEventInstances(instances);
		event.setIsRecurrence(false);
		
		// test the API
		String eventID = cs.addCustomEvent(event, null, null, calendar, user, null);
		cs.flush();
		
		// one line in CA_EVENT
		assertEquals(1, dbUtils.count("CA_EVENT"));
		assertEquals(1, dbUtils.count("CA_EVENT", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID", "CREATEDBY"}, 
				new Object[] {eventID, calendarID, userID}));
		// one line in CA_EVENTINFO
		assertEquals(1, dbUtils.count("CA_EVENTINFO"));
		assertEquals(1, dbUtils.count("CA_EVENTINFO", 
				new String[] {"CALENDAR_UUID", "EVENT_UUID", "LOCATION", "NAME"}, 
				new Object[] {calendarID, eventID, eventLoc, eventName}));
		// one line in CA_EVENTINSTANCE
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE"));
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"CALENDAR_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {calendarID, eventID, new Timestamp(start.getTime()), new Timestamp(end.getTime())}));
		dbUtils.flush();
	}
	
	public void testAddRecurrenceEvent() throws Exception {
		// prepare the user
		String userID = "test_user_1";
		DBUser user = new DBUser();
		user.setUserUUID(userID);
		
		// prepare the calendar
		String calendarID = "test_calendar_1";
		DBCalendar calendar = new DBCalendar();
		calendar.setCalendar_UUID(calendarID);
		dbUtils.insert("CA_CALENDAR", new String[] {"CALENDAR_UUID"}, new Object[] {calendarID});
		dbUtils.flush();
		
		// prepare the event
		// 1. prepare the event info
		String eventName = "Test Recurrence Event 1";
		String eventDesc = "Description - " + eventName;
		String eventLoc = "Location - " + eventName;
		boolean isAllday = false;
		DBEventInfo eventInfo = new DBEventInfo();
		eventInfo.setName(eventName);
		eventInfo.setLocation(eventLoc);
		eventInfo.setDescription(eventDesc);
		eventInfo.setIsAllDay(isAllday);
		// 2. prepare the recurrentce
		Calendar c = Calendar.getInstance();
		c.set(2011, 4, 2, 9, 30, 0);
		Date startDate = c.getTime();	// 2011-5-2 9:30 Mon
		c.set(2011, 4, 2, 11, 0, 0);
		Date endDate = c.getTime();		// 2011-5-2 11:00 Mon
		c.set(2011, 5, 16, 0, 0, 0);
		Date until = c.getTime();		// 2011-6-16 0:0 Thu
		int interval = 1;				// by week
		int byday = 5;					// 0000101 = WE,MO	last pos is the start day
		DBRecurrence recurrence = new DBRecurrence();
		recurrence.setStartDate(startDate);
		recurrence.setEndDate(endDate);
		recurrence.setUntilRule(until);
		recurrence.setInterval(interval);
		recurrence.setByDay(byday);
		recurrence.setFrequencyCode(FrequencyCode.WEEKLY);
		// 3. prepare the event
		DBEvent event = new DBEvent();
		event.setEventInfo(eventInfo);
		event.setDBRecurrence(recurrence);	// isRecurrence = true
		
		// test the API
		String eventUUID = cs.addRecurrenceEvent(event, null, null, calendar, user, null);
		cs.flush();
		
		// one line in CA_EVENT
		assertEquals(1, dbUtils.count("CA_EVENT"));
		assertEquals(1, dbUtils.count("CA_EVENT", 
				new String[] {"CALENDAR_UUID", "EVENT_UUID", "CREATEDBY", "ISRECURRENCE"}, 
				new Object[] {calendarID, eventUUID, userID, 1}));
		// one line in CA_EVENTINFO
		assertEquals(1, dbUtils.count("CA_EVENTINFO"));
		assertEquals(1, dbUtils.count("CA_EVENTINFO", 
				new String[] {"CALENDAR_UUID", "EVENT_UUID", "NAME", "ISALLDAY"}, 
				new Object[] {calendarID, eventUUID, eventName, isAllday}));
		// one line in CA_RECURRENCE
		assertEquals(1, dbUtils.count("CA_RECURRENCE"));
		assertEquals(1, dbUtils.count("CA_RECURRENCE", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID", "INTERVAL", "FREQUENCYCODE", "BYDAY"}, 
				new Object[] {eventUUID, calendarID, interval, FrequencyCode.WEEKLY.toString(), byday}));
		// 14 event instances
		assertEquals(14, dbUtils.count("CA_EVENTINSTANCE"));
		assertEquals(14, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"CALENDAR_UUID", "EVENT_UUID"}, 
				new Object[] {calendarID, eventUUID}));
		dbUtils.flush();
	}
	
	public void testAddRecurrenceEventByDateMonth() throws Exception {
		// prepare the user
		String userID = "test_user_3";
		DBUser user = new DBUser();
		user.setUserUUID(userID);
		
		// prepare the calendar
		String calendarID = "test_calendar_3";
		DBCalendar calendar = new DBCalendar();
		calendar.setCalendar_UUID(calendarID);
		dbUtils.insert("CA_CALENDAR", new String[] {"CALENDAR_UUID"}, new Object[] {calendarID});
		dbUtils.flush();
		
		// prepare the event
		// 1. prepare the event info
		String eventName = "Test Recurrence Event by week in month";
		String eventDesc = "Description - " + eventName;
		String eventLoc = "Location - " + eventName;
		boolean isAllday = false;
		DBEventInfo eventInfo = new DBEventInfo();
		eventInfo.setName(eventName);
		eventInfo.setLocation(eventLoc);
		eventInfo.setDescription(eventDesc);
		eventInfo.setIsAllDay(isAllday);
		// 2. prepare the recurrentce
		Calendar c = Calendar.getInstance();
		c.set(2014, 0, 1, 9, 30, 0);
		Date startDate = c.getTime();	// 2014-1-1 9:30 Mon
		c.set(2014, 0, 1, 11, 0, 0);
		Date endDate = c.getTime();		// 2014-1-1 11:00 Mon
		c.set(2014, 11, 31, 0, 0, 0);
		Date until = c.getTime();		// 2014-12-31 0:0 Thu
		int interval = 1;				// by week, should be ignored
		int byday = 0x0080 | 0x001e;	// by month on the 30th day in the month
		DBRecurrence recurrence = new DBRecurrence();
		recurrence.setStartDate(startDate);
		recurrence.setEndDate(endDate);  // end date is not nused
		recurrence.setUntilRule(until);
		recurrence.setInterval(interval);
		recurrence.setByDay(byday);
		recurrence.setFrequencyCode(FrequencyCode.MONTHLY);
		// 3. prepare the event
		DBEvent event = new DBEvent();
		event.setEventInfo(eventInfo);
		event.setDBRecurrence(recurrence);	// isRecurrence = true
		
		// test the API
		String eventUUID = cs.addRecurrenceEvent(event, null, null, calendar, user, null);
		cs.flush();
		
		// one line in CA_EVENT
		assertEquals(1, dbUtils.count("CA_EVENT"));
		assertEquals(1, dbUtils.count("CA_EVENT", 
				new String[] {"CALENDAR_UUID", "EVENT_UUID", "CREATEDBY", "ISRECURRENCE"}, 
				new Object[] {calendarID, eventUUID, userID, 1}));
		// one line in CA_EVENTINFO
		assertEquals(1, dbUtils.count("CA_EVENTINFO"));
		assertEquals(1, dbUtils.count("CA_EVENTINFO", 
				new String[] {"CALENDAR_UUID", "EVENT_UUID", "NAME", "ISALLDAY"}, 
				new Object[] {calendarID, eventUUID, eventName, isAllday}));
		// one line in CA_RECURRENCE
		assertEquals(1, dbUtils.count("CA_RECURRENCE"));
		assertEquals(1, dbUtils.count("CA_RECURRENCE", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID", "INTERVAL", "FREQUENCYCODE", "BYDAY"}, 
				new Object[] {eventUUID, calendarID, interval, FrequencyCode.MONTHLY.toString(), byday}));
		// 7 event instances
		assertEquals(11, dbUtils.count("CA_EVENTINSTANCE"));
		assertEquals(11, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"CALENDAR_UUID", "EVENT_UUID"}, 
				new Object[] {calendarID, eventUUID}));
		dbUtils.flush();
	}
	
	public void testAddRecurrenceEventByWeekInMonth() throws Exception {
		// prepare the user
		String userID = "test_user_2";
		DBUser user = new DBUser();
		user.setUserUUID(userID);
		
		// prepare the calendar
		String calendarID = "test_calendar_2";
		DBCalendar calendar = new DBCalendar();
		calendar.setCalendar_UUID(calendarID);
		dbUtils.insert("CA_CALENDAR", new String[] {"CALENDAR_UUID"}, new Object[] {calendarID});
		dbUtils.flush();
		
		// prepare the event
		// 1. prepare the event info
		String eventName = "Test Recurrence Event by month on day of week";
		String eventDesc = "Description - " + eventName;
		String eventLoc = "Location - " + eventName;
		boolean isAllday = false;
		DBEventInfo eventInfo = new DBEventInfo();
		eventInfo.setName(eventName);
		eventInfo.setLocation(eventLoc);
		eventInfo.setDescription(eventDesc);
		eventInfo.setIsAllDay(isAllday);
		// 2. prepare the recurrentce
		Calendar c = Calendar.getInstance();
		c.set(2014, 0, 1, 9, 30, 0);
		Date startDate = c.getTime();	// 2014-1-1 9:30 Mon
		c.set(2014, 0, 1, 11, 0, 0);
		Date endDate = c.getTime();		// 2014-1-1 11:00 Mon
		c.set(2014, 11, 31, 0, 0, 0);
		Date until = c.getTime();		// 2014-6-16 0:0 Thu
		int interval = 1;				// by week, should be ignored
		int byday = 0x006 | 0x0028;	// by month on 5th Friday 
		DBRecurrence recurrence = new DBRecurrence();   
		recurrence.setStartDate(startDate);
		recurrence.setEndDate(endDate);  // end date is not nused
		recurrence.setUntilRule(until);
		recurrence.setInterval(interval);
		recurrence.setByDay(byday);
		recurrence.setFrequencyCode(FrequencyCode.MONTHLY);
		// 3. prepare the event
		DBEvent event = new DBEvent();
		event.setEventInfo(eventInfo);
		event.setDBRecurrence(recurrence);	// isRecurrence = true
		
		// test the API
		String eventUUID = cs.addRecurrenceEvent(event, null, null, calendar, user, null);
		cs.flush();
		
		// one line in CA_EVENT
		assertEquals(1, dbUtils.count("CA_EVENT"));
		assertEquals(1, dbUtils.count("CA_EVENT", 
				new String[] {"CALENDAR_UUID", "EVENT_UUID", "CREATEDBY", "ISRECURRENCE"}, 
				new Object[] {calendarID, eventUUID, userID, 1}));
		// one line in CA_EVENTINFO
		assertEquals(1, dbUtils.count("CA_EVENTINFO"));
		assertEquals(1, dbUtils.count("CA_EVENTINFO", 
				new String[] {"CALENDAR_UUID", "EVENT_UUID", "NAME", "ISALLDAY"}, 
				new Object[] {calendarID, eventUUID, eventName, isAllday}));
		// one line in CA_RECURRENCE
		assertEquals(1, dbUtils.count("CA_RECURRENCE"));
		assertEquals(1, dbUtils.count("CA_RECURRENCE", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID", "INTERVAL", "FREQUENCYCODE", "BYDAY"}, 
				new Object[] {eventUUID, calendarID, interval, FrequencyCode.MONTHLY.toString(), byday}));
		// 7 event instances
		assertEquals(4, dbUtils.count("CA_EVENTINSTANCE"));
		assertEquals(4, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"CALENDAR_UUID", "EVENT_UUID"}, 
				new Object[] {calendarID, eventUUID}));
		dbUtils.flush();
	}
	
}
