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
import java.util.Calendar;
import java.util.Date;
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

public class CalendarServiceTest2 extends BaseTestCase {
	private static final String CLASS_NAME = CalendarServiceTest2.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	
	protected void setUp() throws Exception {
		super.setUp();

		cs = CalendarServiceFactory.INSTANCE.create();
	}

	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	// single event
	public void testUpdateEventInstance1() throws Exception {
		// prepare a single event, CA_CALENDAR, CA_EVENT, CA_EVENTINFO, CA_EVENTINSTANCE
		String calendarID = "test_calendar_1";
		dbUtils.insert("CA_CALENDAR", new String[] {"CALENDAR_UUID"}, new Object[] {calendarID});
		
		String eventID = "test_event_1";
		String infoID = "test_info_1";
		String userID = "test_user_1";
		String infoDesc = "Description - " + eventID;
		String infoLoc = "Location - " + eventID;
		String infoName = "Name - " + eventID;
		
		dbUtils.insert("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "CALENDAR_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[] {infoID, calendarID, eventID, infoDesc, infoLoc, infoName, 0});
		dbUtils.insert("CA_EVENT", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID", "CREATEDBY", "MODIFIEDBY", "DFLTEVENTINFO", "ISRECURRENCE"}, 
				new Object[] {eventID, calendarID, userID, userID, infoID, 0});
		
		String instanceID = "test_instance_1";
		Calendar c = Calendar.getInstance();
		c.set(Calendar.MILLISECOND, 0);
		c.set(2011, 4, 30, 13, 0, 0);
		Timestamp start = new Timestamp(c.getTime().getTime());
		c.set(2011, 4, 30, 15, 0, 0);
		Timestamp end = new Timestamp(c.getTime().getTime());
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {instanceID, calendarID, eventID, null, start, end});
		
		dbUtils.flush();
		
		// prepare the updated values
		DBUser user = new DBUser();
		user.setUserUUID(userID);
		
		DBCalendar calendar = new DBCalendar();
		calendar.setCalendar_UUID(calendarID);
		
		DBEventInfo oldInfo = new DBEventInfo();
		oldInfo.setEventInfo_UUID(infoID);
		oldInfo.setEvent_UUID(eventID);
		oldInfo.setDescription(infoDesc);
		oldInfo.setLocation(infoLoc);
		oldInfo.setName(infoName);
		oldInfo.setIsAllDay(false);
		
		DBEventInstance oldInst = new DBEventInstance();
		oldInst.setEvent_UUID(eventID);
		oldInst.setEventInst_UUID(instanceID);
		oldInst.setStartDate(start);
		oldInst.setEndDate(end);
		
		DBEvent event = new DBEvent();
		event.setCalendar_UUID(calendarID);
		event.setEvent_UUID(eventID);
		event.setEventInfo(oldInfo);
		event.setCreatedBy(userID);
		event.setIsRecurrence(false);
		
		String updates = " updated";
		DBEventInfo newInfo = new DBEventInfo();
		newInfo.setDescription(infoDesc + updates);
		newInfo.setLocation(infoLoc + updates);
		newInfo.setName(infoName + updates);
		
		long updateTime = 1000*60*60;	// 1 hour
		DBEventInstance newInst = new DBEventInstance();
		newInst.setEventInst_UUID(instanceID);
		newInst.setEventInfo(newInfo);
		newInst.setStartDate(new Date(start.getTime() + updateTime));
		newInst.setEndDate(new Date(end.getTime() + updateTime));
		
		// test the API
		newInst = cs.updateEventInstance(oldInst, newInst, null, event, calendar, user, null);
		cs.flush();
		
		// event instance should be updated -- EVENTINFO_UUID, STARTDATE, ENDDATE
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE"));
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {newInst.getEventInst_UUID(), newInst.getEvent_UUID(), newInst.getEventInfo_UUID(),
					new Timestamp(start.getTime()+updateTime), new Timestamp(end.getTime()+updateTime)}));
		// one event info should be added
		assertEquals(1, dbUtils.count("CA_EVENTINFO"));
		assertEquals(1, dbUtils.count("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME"}, 
				new Object[] {oldInfo.getEventInfo_UUID(), newInst.getEvent_UUID(), 
				newInfo.getDescription() + "{META|F313AD08-532F-BE0E-FC7E-1A1CEF026C69}0000000000000000", newInfo.getLocation(), newInfo.getName()}));
	}
	
	// event series, update a not updated instance
	public void testUpdateEventInstance2() throws Exception {
		// prepare the event series
		String calendarID = "test_calendar_1";
		dbUtils.insert("CA_CALENDAR", new String[] {"CALENDAR_UUID"}, new Object[] {calendarID});
		
		String eventID = "test_event_1";
		String infoID = "test_info_1";
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
		c.set(2011, 5, 7, 0, 0, 0);
		Timestamp until = new Timestamp(c.getTime().getTime());		// 2011-6-7 0:0 Tue
		int interval = 1;				// by week
		int byday = 1;					// 0000001 = MO	last pos is the start day
		
		dbUtils.insert("CA_RECURRENCE", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID", "FREQUENCYCODE", "INTERVAL", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY"}, 
				new Object[] {eventID, calendarID, FrequencyCode.WEEKLY.toString(), interval, until, startDate, endDate, byday});
		
		Timestamp tempStart = new Timestamp(startDate.getTime());
		Timestamp tempEnd = new Timestamp(endDate.getTime());
		long aweek = 1000*60*60*24*7;
		while(tempStart.getTime() < until.getTime()) {
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {"instance_"+tempStart.getTime(), calendarID, eventID, null, tempStart, tempEnd});
			tempStart.setTime(tempStart.getTime() + aweek);
			tempEnd.setTime(tempEnd.getTime() + aweek);
		}
		
		dbUtils.flush();
		
		// prepare the updates objects
		DBUser user = new DBUser();
		user.setUserUUID(userID);
		
		DBCalendar calendar = new DBCalendar();
		calendar.setCalendar_UUID(calendarID);
		
		DBEventInfo oldInfo = new DBEventInfo();
		oldInfo.setEventInfo_UUID(infoID);
		oldInfo.setEvent_UUID(eventID);
		oldInfo.setDescription(infoDesc);
		oldInfo.setLocation(infoLoc);
		oldInfo.setName(infoName);
		oldInfo.setIsAllDay(false);
		
		DBEvent event = new DBEvent();
		event.setCalendar_UUID(calendarID);
		event.setEvent_UUID(eventID);
		event.setEventInfo(oldInfo);
		event.setCreatedBy(userID);
		event.setIsRecurrence(true);
		
		String instanceID = "instance_" + startDate.getTime();
		DBEventInstance oldInst = new DBEventInstance();
		oldInst.setEvent_UUID(eventID);
		oldInst.setEventInst_UUID(instanceID);
		oldInst.setStartDate(startDate);
		oldInst.setEndDate(endDate);
		
		String updates = " updated";
		DBEventInfo newInfo = new DBEventInfo();
		newInfo.setDescription(infoDesc + updates);
		newInfo.setLocation(infoLoc + updates);
		newInfo.setName(infoName + updates);
		
		long updateTime = 1000*60*60;	// 1 hour
		DBEventInstance newInst = new DBEventInstance();
		newInst.setEventInst_UUID(instanceID);
		newInst.setEventInfo(newInfo);
		newInst.setStartDate(new Date(startDate.getTime() + updateTime));
		newInst.setEndDate(new Date(endDate.getTime() + updateTime));
		
		// test the API
		newInst = cs.updateEventInstance(oldInst, newInst, null, event, calendar, user, null);
		cs.flush();
		
		// event instance should be updated -- EVENTINFO_UUID, STARTDATE, ENDDATE
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {newInst.getEventInst_UUID(), newInst.getEvent_UUID(), newInst.getEventInfo_UUID(),
					new Timestamp(startDate.getTime()+updateTime), new Timestamp(endDate.getTime()+updateTime)}));
		// one event info should be added
		assertEquals(2, dbUtils.count("CA_EVENTINFO"));
		assertEquals(1, dbUtils.count("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME"}, 
				new Object[] {newInst.getEventInfo_UUID(), newInst.getEvent_UUID(), 
					newInst.getEventInfo().getDescription() + "{META|F313AD08-532F-BE0E-FC7E-1A1CEF026C69}0000000000000000", newInst.getEventInfo().getLocation(), newInst.getEventInfo().getName()}));
		// one substitution should be added
		assertEquals(1, dbUtils.count("CA_SUBSTITUTION"));
		assertEquals(1, dbUtils.count("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[] {newInst.getEventInst_UUID(), newInst.getEvent_UUID(), newInst.getEventInfo_UUID(),
					new Timestamp(startDate.getTime()), new Timestamp(startDate.getTime()+updateTime), new Timestamp(endDate.getTime()+updateTime)}));
		
	}
	
	// event series, update an updated instance to original
	public void testUpdateEventInstance3() throws Exception {
		// prepare the event series
		String calendarID = "test_calendar_1";
		dbUtils.insert("CA_CALENDAR", new String[] {"CALENDAR_UUID"}, new Object[] {calendarID});
		
		String eventID = "test_event_1";
		String infoID = "test_info_1";
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
		c.set(2011, 5, 7, 0, 0, 0);
		Timestamp until = new Timestamp(c.getTime().getTime());		// 2011-6-7 0:0 Tue
		int interval = 1;				// by week
		int byday = 1;					// 0000001 = MO	last pos is the start day
		
		dbUtils.insert("CA_RECURRENCE", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID", "FREQUENCYCODE", "INTERVAL", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY"}, 
				new Object[] {eventID, calendarID, FrequencyCode.WEEKLY.toString(), interval, until, startDate, endDate, byday});
		
		Timestamp tempStart = new Timestamp(startDate.getTime());
		Timestamp tempEnd = new Timestamp(endDate.getTime());
		long aweek = 1000*60*60*24*7;
		while(tempStart.getTime() < until.getTime() - aweek) {
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {"instance_"+tempStart.getTime(), calendarID, eventID, null, tempStart, tempEnd});
			tempStart.setTime(tempStart.getTime() + aweek);
			tempEnd.setTime(tempEnd.getTime() + aweek);
		}
		
		// prepare the updates -- event info, event instance, substitution
		String updates = " updated";
		long updateTime = 1000*60*60;	// 1 hour
		String newInfoID = "test_info_2";
		String instanceID = "instance_"+tempStart.getTime();	// the last one
		
		dbUtils.insert("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "CALENDAR_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[] {newInfoID, calendarID, eventID, infoDesc+updates, infoLoc+updates, infoName+updates, 0});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {instanceID, calendarID, eventID, newInfoID, 
					new Timestamp(tempStart.getTime()+updateTime), new Timestamp(tempEnd.getTime()+updateTime)});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[] {instanceID, calendarID, eventID, newInfoID, tempStart, 
					new Timestamp(tempStart.getTime()+updateTime), new Timestamp(tempEnd.getTime()+updateTime)});
		
		dbUtils.flush();
		
		// prepare the updates object
		DBUser user = new DBUser();
		user.setUserUUID(userID);
		
		DBCalendar calendar = new DBCalendar();
		calendar.setCalendar_UUID(calendarID);
		
		DBEventInfo oldInfo = new DBEventInfo();
		oldInfo.setEventInfo_UUID(newInfoID);
		oldInfo.setEvent_UUID(eventID);
		oldInfo.setDescription(infoDesc + updates);
		oldInfo.setLocation(infoLoc + updates);
		oldInfo.setName(infoName + updates);
		oldInfo.setIsAllDay(false);
		
		DBEvent event = new DBEvent();
		event.setCalendar_UUID(calendarID);
		event.setEvent_UUID(eventID);
		event.setEventInfo(oldInfo);
		event.setCreatedBy(userID);
		event.setIsRecurrence(true);
		
		DBEventInstance oldInst = new DBEventInstance();
		oldInst.setEvent_UUID(eventID);
		oldInst.setEventInst_UUID(instanceID);
		oldInst.setEventInfo(oldInfo);
		oldInst.setStartDate(new Date(tempStart.getTime()+updateTime));
		oldInst.setEndDate(new Date(tempEnd.getTime()+updateTime));
		
		// newInfo & newInst are the original series info and instance
		DBEventInfo newInfo = new DBEventInfo();
		newInfo.setDescription(infoDesc);
		newInfo.setLocation(infoLoc);
		newInfo.setName(infoName);
		newInfo.setIsAllDay(false);
		
		DBEventInstance newInst = new DBEventInstance();
		newInst.setEventInst_UUID(instanceID);
		newInst.setEventInfo(newInfo);
		newInst.setStartDate(tempStart);
		newInst.setEndDate(tempEnd);
		
		// test the API
		newInst = cs.updateEventInstance(oldInst, newInst, null, event, calendar, user, null);
		cs.flush();
		
		// the instance should change back -- start, end, info
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {newInst.getEventInst_UUID(), newInst.getEventInfo_UUID(), 
					new Timestamp(newInst.getStartDate().getTime()), new Timestamp(newInst.getEndDate().getTime())}));
		// the redundent info should be deleted
		assertEquals(1, dbUtils.count("CA_EVENTINFO"));
		assertEquals(0, dbUtils.count("CA_EVENTINFO", new String[] {"EVENTINFO_UUID"}, new Object[] {newInfoID}));
		// the redundent substitution should be deleted
		assertEquals(0, dbUtils.count("CA_SUBSTITUTION"));
	}
}
