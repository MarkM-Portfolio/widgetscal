/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* (C) Copyright IBM Corp. 2011                                      */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.test.db.impl;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.test.core.BaseTestCase;
import com.ibm.lconn.calendar.util.FrequencyCode;

public class CalendarServiceTest4 extends BaseTestCase {
	private static final String CLASS_NAME = CalendarServiceTest4.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	
	protected void setUp() throws Exception {
		super.setUp();

		cs = CalendarServiceFactory.INSTANCE.create();
	}

	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public void testRemoveEventInstance() throws Exception {
		// prepare the event series
		String calendarID = "test_calendar_1";
		dbUtils.insert("CA_CALENDAR", new String[] {"CALENDAR_UUID"}, new Object[] {calendarID});
		
		String eventID = "test_event_1";
		String infoID = "test_info_default";
		String userID = "test_user_1";
		String infoDesc = "Description - " + eventID;
		String infoLoc = "Location - " + eventID;
		String infoName = "Name - " + eventID;
		
		dbUtils.insert("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "CALENDAR_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[] {infoID, calendarID, eventID, infoDesc, infoLoc, infoName, 0});
		dbUtils.insert("CA_EVENT", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID", "CREATEDBY", "MODIFIEDBY", "DFLTEVENTINFO", "ISRECURRENCE"}, 
				new Object[] {eventID, calendarID, userID, userID, infoID, 1});
		
		Calendar c = Calendar.getInstance();
		c.set(Calendar.MILLISECOND, 0);
		c.set(2011, 4, 2, 9, 30, 0);
		Timestamp startDate = new Timestamp(c.getTime().getTime());	// 2011-5-2 9:30 Mon
		c.set(2011, 4, 2, 11, 0, 0);
		Timestamp endDate = new Timestamp(c.getTime().getTime());	// 2011-5-2 11:00 Mon
		c.set(2011, 5, 1, 9, 30, 0);
		Timestamp until = new Timestamp(c.getTime().getTime());		// 2011-6-1 9:30 Wed
		int interval = 1;				// by week
		int byday = 1;					// 0000001 = MO	last pos is the start day
		// totally 5 event instance
		
		dbUtils.insert("CA_RECURRENCE", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID", "FREQUENCYCODE", "INTERVAL", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY"}, 
				new Object[] {eventID, calendarID, FrequencyCode.WEEKLY.toString(), interval, until, startDate, endDate, byday});
		
		long oneHour = 1000*60*60;
		long oneDay = oneHour*24;
		long oneWeek = oneDay*7;
		
		// the first four instance are the series default
		for(int i=0; i<4; i++) {
			Timestamp _start = new Timestamp(startDate.getTime() + i*oneWeek);
			Timestamp _end = new Timestamp(endDate.getTime() + i*oneWeek);
			String _instID = "instance_" + _start.getTime();
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {_instID, calendarID, eventID, null, _start, _end});
		}
		
		// customize instance 5
		String infoID5 = "test_info_5";
		String infoLoc5 = "Location for instance 4";
		dbUtils.insert("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "CALENDAR_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[] {infoID5, calendarID, eventID, infoDesc, infoLoc5, infoName, 0});
		
		Timestamp start5ori = new Timestamp(startDate.getTime() + 4*oneWeek);
		Timestamp start5 = new Timestamp(c.getTimeInMillis() + oneHour);
		Timestamp end5 = new Timestamp(c.getTimeInMillis() + 2*oneHour);
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {"instance_"+start5ori.getTime(), calendarID, eventID, infoID5, start5, end5});
		
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[] {"instance_"+start5ori.getTime(), calendarID, eventID, infoID5, start5ori, start5, end5});
		
		dbUtils.flush();
		
		// prepare the objects
		DBCalendar calendar = new DBCalendar();
		calendar.setCalendar_UUID(calendarID);
		
		DBUser user = new DBUser();
		user.setUserUUID(userID);
		
		DBEvent event = new DBEvent();
		event.setEvent_UUID(eventID);
		event.setIsRecurrence(true);
		
		DBEventInfo info5 = new DBEventInfo();
		info5.setEventInfo_UUID(infoID5);
		info5.setEvent_UUID(eventID);
		
		DBEventInstance instance5 = new DBEventInstance();
		instance5.setEventInst_UUID("instance_" + start5ori.getTime());
		instance5.setEvent(event);
		instance5.setEventInfo(info5);
		instance5.setStartDate(start5);
		instance5.setEndDate(end5);
		
		// test the API 1 -- delete a instance that have substitution
		cs.removeEventInstance(instance5, event, calendar, user);
		cs.flush();
		
		// event info for instance5 should be deleted
		assertEquals(1, dbUtils.count("CA_EVENTINFO"));
		assertEquals(0, dbUtils.count("CA_EVENTINFO", new String[] {"EVENTINFO_UUID"}, new Object[] {infoID5}));
		// instance5 should be deleted
		assertEquals(4, dbUtils.count("CA_EVENTINSTANCE"));
		assertEquals(0, dbUtils.count("CA_EVENTINSTANCE", new String[] {"EVENTINST_UUID"}, new Object[] {instance5.getEventInst_UUID()}));
		// the substitution for instance 5 should be updated
		assertEquals(1, dbUtils.count("CA_SUBSTITUTION"));
		assertEquals(1, dbUtils.count("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "ISCANCELLED", "EVENTINFO_UUID", "EVENT_UUID", "STARTDATE", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[] {instance5.getEventInst_UUID(), true, null, eventID, start5ori, null, null}));
		
		// test the API 2 -- delete a instance that doesn't have substitution
		DBEventInstance instance1 = new DBEventInstance();
		instance1.setEventInst_UUID("instance_" + startDate.getTime());
		instance1.setEvent(event);
		instance1.setEventInfo(null);
		instance1.setStartDate(startDate);
		instance1.setEndDate(endDate);
		
		cs.removeEventInstance(instance1, event, calendar, user);
		cs.flush();
		
		// event info table should be keep untouched
		assertEquals(1, dbUtils.count("CA_EVENTINFO"));
		// instance1 should be deleted
		assertEquals(3, dbUtils.count("CA_EVENTINSTANCE"));
		assertEquals(0, dbUtils.count("CA_EVENTINSTANCE", new String[] {"EVENTINST_UUID"}, new Object[] {instance1.getEventInst_UUID()}));
		// one substitution for instance1 should be added
		assertEquals(2, dbUtils.count("CA_SUBSTITUTION"));
		assertEquals(1, dbUtils.count("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "ISCANCELLED", "EVENTINFO_UUID", "EVENT_UUID", "STARTDATE", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[] {instance1.getEventInst_UUID(), true, null, eventID, startDate, null, null}));
	}
	
	public void testRemoveEvent() throws Exception {
		// prepare the event series
		String calendarID = "test_calendar_1";
		dbUtils.insert("CA_CALENDAR", new String[] {"CALENDAR_UUID"}, new Object[] {calendarID});
		
		String eventID = "test_event_1";
		String infoID = "test_info_default";
		String userID = "test_user_1";
		String infoDesc = "Description - " + eventID;
		String infoLoc = "Location - " + eventID;
		String infoName = "Name - " + eventID;
		
		dbUtils.insert("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "CALENDAR_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[] {infoID, calendarID, eventID, infoDesc, infoLoc, infoName, 0});
		dbUtils.insert("CA_EVENT", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID", "CREATEDBY", "MODIFIEDBY", "DFLTEVENTINFO", "ISRECURRENCE"}, 
				new Object[] {eventID, calendarID, userID, userID, infoID, 1});
		
		Calendar c = Calendar.getInstance();
		c.set(Calendar.MILLISECOND, 0);
		c.set(2011, 4, 2, 9, 30, 0);
		Timestamp startDate = new Timestamp(c.getTime().getTime());	// 2011-5-2 9:30 Mon
		c.set(2011, 4, 2, 11, 0, 0);
		Timestamp endDate = new Timestamp(c.getTime().getTime());	// 2011-5-2 11:00 Mon
		c.set(2011, 5, 1, 9, 30, 0);
		Timestamp until = new Timestamp(c.getTime().getTime());		// 2011-6-1 9:30 Wed
		int interval = 1;				// by week
		int byday = 1;					// 0000001 = MO	last pos is the start day
		// totally 5 event instance
		
		dbUtils.insert("CA_RECURRENCE", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID", "FREQUENCYCODE", "INTERVAL", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY"}, 
				new Object[] {eventID, calendarID, FrequencyCode.WEEKLY.toString(), interval, until, startDate, endDate, byday});
		
		long oneHour = 1000*60*60;
		long oneDay = oneHour*24;
		long oneWeek = oneDay*7;
		
		// the first four instance are the series default
		for(int i=0; i<4; i++) {
			Timestamp _start = new Timestamp(startDate.getTime() + i*oneWeek);
			Timestamp _end = new Timestamp(endDate.getTime() + i*oneWeek);
			String _instID = "instance_" + _start.getTime();
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {_instID, calendarID, eventID, null, _start, _end});
		}
		
		// customize instance 5
		String infoID5 = "test_info_5";
		String infoLoc5 = "Location for instance 4";
		dbUtils.insert("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "CALENDAR_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[] {infoID5, calendarID, eventID, infoDesc, infoLoc5, infoName, 0});
		
		Timestamp start5ori = new Timestamp(startDate.getTime() + 4*oneWeek);
		Timestamp start5 = new Timestamp(c.getTimeInMillis() + oneHour);
		Timestamp end5 = new Timestamp(c.getTimeInMillis() + 2*oneHour);
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {"instance_"+start5ori.getTime(), calendarID, eventID, infoID5, start5, end5});
		
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[] {"instance_"+start5ori.getTime(), calendarID, eventID, infoID5, start5ori, start5, end5});
		
		dbUtils.flush();
		
		// prepare the objects
		DBCalendar calendar = new DBCalendar();
		calendar.setCalendar_UUID(calendarID);
		
		DBUser user = new DBUser();
		user.setUserUUID(userID);
		
		DBEvent event = new DBEvent();
		event.setEvent_UUID(eventID);
		event.setIsRecurrence(true);
		
		// test the API
		cs.removeEvent(event, calendar, user);
		cs.flush();
		
		// should be no event, event instance, event info, recurrence, substitution
		assertEquals(0, dbUtils.count("CA_EVENT"));
		assertEquals(0, dbUtils.count("CA_EVENTINSTANCE"));
		assertEquals(0, dbUtils.count("CA_EVENTINFO"));
		assertEquals(0, dbUtils.count("CA_RECURRENCE"));
		assertEquals(0, dbUtils.count("CA_SUBSTITUTION"));
	}
}
