/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
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
import java.util.List;
import java.util.logging.Logger;

import com.ibm.icu.util.TimeZone;
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

public class CalendarServiceTest3 extends BaseTestCase {
	private static final String CLASS_NAME = CalendarServiceTest3.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	
	protected void setUp() throws Exception {
		super.setUp();

		cs = CalendarServiceFactory.INSTANCE.create();
	}

	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	// basic function shift by some time
	public void testUpdateEventSeries1() throws Exception {
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
		c.set(2011, 5, 9, 9, 30, 0);
		Timestamp until = new Timestamp(c.getTime().getTime());		// 2011-6-9 9:30 Wed
		int interval = 1;				// by week
		int byday = 1;					// 0000001 = MO	last pos is the start day
		// totally 6 event instance
		
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
		
		// prepare the updates object
		DBCalendar calendar = new DBCalendar();
		calendar.setCalendar_UUID(calendarID);
		
		DBUser user = new DBUser();
		user.setUserUUID(userID);
		
		DBEventInfo oldInfo = new DBEventInfo();
		oldInfo.setEventInfo_UUID(infoID);
		oldInfo.setCalendar_UUID(calendarID);
		oldInfo.setEvent_UUID(eventID);
		oldInfo.setName(infoName);
		oldInfo.setName(infoLoc);
		oldInfo.setName(infoDesc);
		oldInfo.setIsAllDay(false);
		
		DBRecurrence oldRec = new DBRecurrence();
		oldRec.setEvent_UUID(eventID);
		oldRec.setCalendar_UUID(calendarID);
		oldRec.setFrequencyCode(FrequencyCode.WEEKLY);
		oldRec.setInterval(1);
		oldRec.setUntilRule(until);
		oldRec.setStartDate(startDate);
		oldRec.setEndDate(endDate);
		oldRec.setByDay(1);
		
		DBEvent oldEvent = new DBEvent();
		oldEvent.setEvent_UUID(eventID);
		oldEvent.setCalendar_UUID(calendarID);
		oldEvent.setEventInfo(oldInfo);
		oldEvent.setDBRecurrence(oldRec);
		
		String updates = " updated";
		long timeUpdate = 10 * 60 * 1000L;	// 10 mins
		long untilUpdate = 1000L*60*60*24*7;	// 1 week
		
		DBEventInfo newInfo = new DBEventInfo();
		newInfo.setEventInfo_UUID(infoID);
		newInfo.setCalendar_UUID(calendarID);
		newInfo.setEvent_UUID(eventID);
		newInfo.setName(infoName + updates);
		newInfo.setLocation(infoLoc + updates);
		newInfo.setDescription(infoDesc + updates);
		newInfo.setIsAllDay(false);
		
		DBRecurrence newRec = new DBRecurrence();
		newRec.setEvent_UUID(eventID);
		newRec.setCalendar_UUID(calendarID);
		newRec.setFrequencyCode(FrequencyCode.WEEKLY);
		newRec.setInterval(1);
		newRec.setUntilRule(new Date(until.getTime() + untilUpdate + timeUpdate));
		newRec.setStartDate(new Date(startDate.getTime() + timeUpdate));
		newRec.setEndDate(new Date(endDate.getTime() + timeUpdate));
		newRec.setByDay(1);
		
		DBEvent newEvent = new DBEvent();
		newEvent.setEvent_UUID(eventID);
		newEvent.setCalendar_UUID(calendarID);
		newEvent.setEventInfo(newInfo);
		newEvent.setDBRecurrence(newRec);
		
		// test the API
		newEvent = cs.updateEventSeries(oldEvent, newEvent, null, null, calendar, user, null);
		cs.flush();
		
		// event info should be updated
		assertEquals(1, dbUtils.count("CA_EVENTINFO"));
		assertEquals(1, dbUtils.count("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "DESCRIPTION", "LOCATION", "NAME"}, 
				new Object[] {newEvent.getEventInfo_UUID(), newEvent.getEventInfo().getDescription() + "{META|F313AD08-532F-BE0E-FC7E-1A1CEF026C69}0000000000000000", 
					newEvent.getEventInfo().getLocation(), newEvent.getEventInfo().getName()}));
		// recurrence should be updated
		assertEquals(1, dbUtils.count("CA_RECURRENCE"));
		assertEquals(1, dbUtils.count("CA_RECURRENCE", 
				new String[] {"EVENT_UUID", "BYDAY", "UNTILRULE", "STARTDATE", "ENDDATE" }, 
				new Object[] {newEvent.getEvent_UUID(), newEvent.getRecurrence().getByDay(), 
					new Timestamp(newEvent.getRecurrence().getUntilRule().getTime()),
					new Timestamp(newEvent.getRecurrence().getStartDate().getTime()),
					new Timestamp(newEvent.getRecurrence().getEndDate().getTime())}));
		// should add one event instance
		assertEquals(7, dbUtils.count("CA_EVENTINSTANCE"));
		// instance should shift by 10 mins
		// last day have system generated ID
		{
			// aweekSpan == untilUpdate
			Timestamp _start = new Timestamp(startDate.getTime() + timeUpdate + untilUpdate*0);
			Timestamp _end = new Timestamp(endDate.getTime() + timeUpdate + untilUpdate*0);
			String _instID = "instance_" + (startDate.getTime() + untilUpdate*0);
			
			assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {_instID, _start, _end}));
		}
		{
			// aweekSpan == untilUpdate
			Timestamp _start = new Timestamp(startDate.getTime() + timeUpdate + untilUpdate*1);
			Timestamp _end = new Timestamp(endDate.getTime() + timeUpdate + untilUpdate*1);
			String _instID = "instance_" + (startDate.getTime() + untilUpdate*1);
			
			assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {_instID, _start, _end}));
		}
		{
			// aweekSpan == untilUpdate
			Timestamp _start = new Timestamp(startDate.getTime() + timeUpdate + untilUpdate*2);
			Timestamp _end = new Timestamp(endDate.getTime() + timeUpdate + untilUpdate*2);
			String _instID = "instance_" + (startDate.getTime() + untilUpdate*2);
			
			assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {_instID, _start, _end}));
		}
		{
			// aweekSpan == untilUpdate
			Timestamp _start = new Timestamp(startDate.getTime() + timeUpdate + untilUpdate*3);
			Timestamp _end = new Timestamp(endDate.getTime() + timeUpdate + untilUpdate*3);
			String _instID = "instance_" + (startDate.getTime() + untilUpdate*3);
			
			assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {_instID, _start, _end}));
		}
		{
			// aweekSpan == untilUpdate
			Timestamp _start = new Timestamp(startDate.getTime() + timeUpdate + untilUpdate*4);
			Timestamp _end = new Timestamp(endDate.getTime() + timeUpdate + untilUpdate*4);
			String _instID = "instance_" + (startDate.getTime() + untilUpdate*4);
			
			assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {_instID, _start, _end}));
		}
		{
			// aweekSpan == untilUpdate
			Timestamp _start = new Timestamp(startDate.getTime() + timeUpdate + untilUpdate*5);
			Timestamp _end = new Timestamp(endDate.getTime() + timeUpdate + untilUpdate*5);
			String _instID = "instance_" + (startDate.getTime() + untilUpdate*5);
			
			assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {_instID, _start, _end}));
		}
		
		// last added one
		Timestamp _start = new Timestamp(startDate.getTime() + timeUpdate + untilUpdate*6);
		Timestamp _end = new Timestamp(endDate.getTime() + timeUpdate + untilUpdate*6);
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"STARTDATE", "ENDDATE"}, 
				new Object[] {_start, _end}));
	}
	
	// more sophisticated case, shrink with customized instance
	public void testUpdateEventSeries2() throws Exception {
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
		
		// the first three instances are the series default
		Timestamp start1 = new Timestamp(startDate.getTime());
		Timestamp end1 = new Timestamp(endDate.getTime());
		dbUtils.insert("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {"instance_"+start1.getTime(), calendarID, eventID, null, start1, end1});
		
		Timestamp start2 = new Timestamp(start1.getTime() + oneWeek);
		Timestamp end2 = new Timestamp(end1.getTime() + oneWeek);
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {"instance_"+start2.getTime(), calendarID, eventID, null, start2, end2});
		
		Timestamp start3 = new Timestamp(start2.getTime() + oneWeek);
		Timestamp end3 = new Timestamp(end2.getTime() + oneWeek);
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {"instance_"+start3.getTime(), calendarID, eventID, null, start3, end3});
		
		// customize instance 4 to a new date after 'new' until, the original date should before the 'new' until
		String infoID4 = "test_info_4";
		String infoDesc4 = "Description for instance 4";
		dbUtils.insert("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "CALENDAR_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[] {infoID4, calendarID, eventID, infoDesc4, infoLoc, infoName, 0});
		
		Timestamp start4ori = new Timestamp(start3.getTime() + oneWeek);	// 5/23
		c.set(2011, 4, 28, 9, 30, 0);
		Timestamp start4 = new Timestamp(c.getTimeInMillis());	// 5/28
		c.set(2011, 4, 28, 12, 0, 0);
		Timestamp end4 = new Timestamp(c.getTimeInMillis());
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {"instance_"+start4ori.getTime(), calendarID, eventID, infoID4, start4, end4});
		
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[] {"instance_"+start4ori.getTime(), calendarID, eventID, infoID4, start4ori, start4, end4});
		
		// customize instance 5 to a new date before 'new' until, the original date should after the 'new' until
		String infoID5 = "test_info_5";
		String infoLoc5 = "Location for instance 4";
		dbUtils.insert("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "CALENDAR_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[] {infoID5, calendarID, eventID, infoDesc, infoLoc5, infoName, 0});
		
		Timestamp start5ori = new Timestamp(start4ori.getTime() + oneWeek);	// 5/30
		c.set(2011, 4, 25, 8, 0, 0);
		Timestamp start5 = new Timestamp(c.getTimeInMillis());	// 5/25
		c.set(2011, 4, 25, 10, 0, 0);
		Timestamp end5 = new Timestamp(c.getTimeInMillis());
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {"instance_"+start5ori.getTime(), calendarID, eventID, infoID5, start5, end5});
		
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[] {"instance_"+start5ori.getTime(), calendarID, eventID, infoID5, start5ori, start5, end5});
		
		dbUtils.flush();
		
		// prepare the updates object
		DBCalendar calendar = new DBCalendar();
		calendar.setCalendar_UUID(calendarID);
		
		DBUser user = new DBUser();
		user.setUserUUID(userID);
		
		DBEventInfo oldInfo = new DBEventInfo();
		oldInfo.setEventInfo_UUID(infoID);
		oldInfo.setCalendar_UUID(calendarID);
		oldInfo.setEvent_UUID(eventID);
		oldInfo.setName(infoName);
		oldInfo.setName(infoLoc);
		oldInfo.setName(infoDesc);
		oldInfo.setIsAllDay(false);
		
		DBRecurrence oldRec = new DBRecurrence();
		oldRec.setEvent_UUID(eventID);
		oldRec.setCalendar_UUID(calendarID);
		oldRec.setFrequencyCode(FrequencyCode.WEEKLY);
		oldRec.setInterval(1);
		oldRec.setUntilRule(until);
		oldRec.setStartDate(startDate);
		oldRec.setEndDate(endDate);
		oldRec.setByDay(1);
		
		DBEvent oldEvent = new DBEvent();
		oldEvent.setEvent_UUID(eventID);
		oldEvent.setCalendar_UUID(calendarID);
		oldEvent.setEventInfo(oldInfo);
		oldEvent.setDBRecurrence(oldRec);
		
		String updates = " updated";
		
		DBEventInfo newInfo = new DBEventInfo();
		newInfo.setEventInfo_UUID(infoID);
		newInfo.setCalendar_UUID(calendarID);
		newInfo.setEvent_UUID(eventID);
		newInfo.setName(infoName + updates);
		newInfo.setLocation(infoLoc + updates);
		newInfo.setDescription(infoDesc + updates);
		newInfo.setIsAllDay(false);
		
		DBRecurrence newRec = new DBRecurrence();
		newRec.setEvent_UUID(eventID);
		newRec.setCalendar_UUID(calendarID);
		newRec.setFrequencyCode(FrequencyCode.WEEKLY);
		newRec.setInterval(1);
		c.set(2011, 4, 26, 9, 30, 0);	// new until day 5/26 -- shrink
		newRec.setUntilRule(new Date(c.getTimeInMillis()));
		newRec.setStartDate(new Date(startDate.getTime() + oneDay));//Fixed, original way will cause Mon shifts to Tue
		newRec.setEndDate(new Date(endDate.getTime() + oneDay));
		newRec.setByDay(64);// 0000001->1000000, because its start date changed, 'byDay' should change accordingly.
		
		DBEvent newEvent = new DBEvent();
		newEvent.setEvent_UUID(eventID);
		newEvent.setCalendar_UUID(calendarID);
		newEvent.setEventInfo(newInfo);
		newEvent.setDBRecurrence(newRec);
		
		// test the API
		newEvent = cs.updateEventSeries(oldEvent, newEvent, null, null, calendar, user, null);
		cs.flush();
		
		// recurrence should be updated
		assertEquals(1, dbUtils.count("CA_RECURRENCE"));
		assertEquals(1, dbUtils.count("CA_RECURRENCE", 
				new String[] {"EVENT_UUID", "BYDAY", "UNTILRULE", "STARTDATE", "ENDDATE" }, 
				new Object[] {newEvent.getEvent_UUID(), newEvent.getRecurrence().getByDay(), 
					new Timestamp(newEvent.getRecurrence().getUntilRule().getTime()),
					new Timestamp(newEvent.getRecurrence().getStartDate().getTime()),
					new Timestamp(newEvent.getRecurrence().getEndDate().getTime())}));
		// there should be 3 event info, one is for this serial events, another two is for two customized events.
		assertEquals(3, dbUtils.count("CA_EVENTINFO"));
		assertEquals(1, dbUtils.count("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "DESCRIPTION", "LOCATION", "NAME"}, 
				new Object[] {newEvent.getEventInfo_UUID(), newEvent.getEventInfo().getDescription() + "{META|F313AD08-532F-BE0E-FC7E-1A1CEF026C69}0000000000000000", 
					newEvent.getEventInfo().getLocation(), newEvent.getEventInfo().getName()}));
		// there should be 4 instances, the first instance which is not customized will be deleted for its start time is not in new event time range.
		assertEquals(4, dbUtils.count("CA_EVENTINSTANCE"));
		// the first 2 instance should not be shift by one day
		for(int i=0; i<2; i++) {
			// aweekSpan == untilUpdate
			Timestamp _start = new Timestamp(startDate.getTime() + oneDay + oneWeek*i);
			Timestamp _end = new Timestamp(endDate.getTime() + oneDay + oneWeek*i);
			String _instID = "instance_" + (startDate.getTime() + oneWeek*i);
			
			assertEquals(0, dbUtils.count("CA_EVENTINSTANCE", //Fixed, original way will cause Mon shifts to Tue, there will be no shifts any more.
					new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {_instID, _start, _end}));
		}
		// the 4th should not be deleted although its start date later than new util date.
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {"instance_"+start4ori.getTime(), new Timestamp(start4.getTime()), new Timestamp(end4.getTime())}));
		// the 5th instance will be reused
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID"}, 
				new Object[] {"instance_"+start5ori.getTime()}));
		// there should be two substitution records
		assertEquals(2, dbUtils.count("CA_SUBSTITUTION"));
		assertEquals(1, dbUtils.count("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID"}, 
				new Object[] {"instance_"+start5ori.getTime()}));
		assertEquals(1, dbUtils.count("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "EVENTINFO_UUID", "STARTDATE", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[] {"instance_"+start4ori.getTime(), infoID4, 
					new Timestamp(start4ori.getTime()), new Timestamp(start4.getTime()), new Timestamp(end4.getTime())}));
		// the new event instances except customized instances should still repeat by Monday.
		List<DBEventInstance> instances =  newEvent.getEventInstances();
		Calendar cal = Calendar.getInstance();
		for(int i=0; i< instances.size();i++){
			DBEventInstance t = instances.get(i);
			cal.setTime(t.getStartDate());
			if(!t.getEventInst_UUID().equals("instance_"+start5ori.getTime()) && !t.getEventInst_UUID().equals("instance_"+start4ori.getTime()))
				assertEquals(2, cal.get(Calendar.DAY_OF_WEEK));
		}
	}
	
	// basic function shift by some time
	public void testUpdateEventSeries3() throws Exception {
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
		c.set(2011, 5, 9, 9, 30, 0);
		Timestamp until = new Timestamp(c.getTime().getTime());		// 2011-6-9 9:30 Wed
		int interval = 1;				// by week
		int byday = 1;					// 0000001 = MO	last pos is the start day
		// totally 6 event instance
		
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
		
		// prepare the updates object
		DBCalendar calendar = new DBCalendar();
		calendar.setCalendar_UUID(calendarID);
		
		DBUser user = new DBUser();
		user.setUserUUID(userID);
		
		DBEventInfo oldInfo = new DBEventInfo();
		oldInfo.setEventInfo_UUID(infoID);
		oldInfo.setCalendar_UUID(calendarID);
		oldInfo.setEvent_UUID(eventID);
		oldInfo.setName(infoName);
		oldInfo.setName(infoLoc);
		oldInfo.setName(infoDesc);
		oldInfo.setIsAllDay(false);
		
		DBRecurrence oldRec = new DBRecurrence();
		oldRec.setEvent_UUID(eventID);
		oldRec.setCalendar_UUID(calendarID);
		oldRec.setFrequencyCode(FrequencyCode.WEEKLY);
		oldRec.setInterval(1);
		oldRec.setUntilRule(until);
		oldRec.setStartDate(startDate);
		oldRec.setEndDate(endDate);
		oldRec.setByDay(1);
		
		DBEvent oldEvent = new DBEvent();
		oldEvent.setEvent_UUID(eventID);
		oldEvent.setCalendar_UUID(calendarID);
		oldEvent.setEventInfo(oldInfo);
		oldEvent.setDBRecurrence(oldRec);
		
		String updates = " updated";
		long timeUpdate = 10 * 60 * 1000L;	// 10 mins
		long untilUpdate = 1000L*60*60*24*7;	// 1 week
		
		DBEventInfo newInfo = new DBEventInfo();
		newInfo.setEventInfo_UUID(infoID);
		newInfo.setCalendar_UUID(calendarID);
		newInfo.setEvent_UUID(eventID);
		newInfo.setName(infoName + updates);
		newInfo.setLocation(infoLoc + updates);
		newInfo.setDescription(infoDesc + updates);
		newInfo.setIsAllDay(false);
		
		DBRecurrence newRec = new DBRecurrence();
		newRec.setEvent_UUID(eventID);
		newRec.setCalendar_UUID(calendarID);
		newRec.setFrequencyCode(FrequencyCode.WEEKLY);
		newRec.setInterval(1);
		newRec.setUntilRule(new Date(until.getTime() + untilUpdate + timeUpdate));
		newRec.setStartDate(new Date(startDate.getTime() + timeUpdate));
		newRec.setEndDate(new Date(endDate.getTime() + timeUpdate));
		newRec.setByDay(1);
		
		DBEvent newEvent = new DBEvent();
		newEvent.setEvent_UUID(eventID);
		newEvent.setCalendar_UUID(calendarID);
		newEvent.setEventInfo(newInfo);
		newEvent.setDBRecurrence(newRec);
		
		// test the API
		newEvent = cs.updateEventSeries(oldEvent, newEvent, null, TimeZone.getTimeZone("America/New_York"), calendar, user, null);
		cs.flush();
		
		// event info should be updated
		assertEquals(1, dbUtils.count("CA_EVENTINFO"));
		assertEquals(1, dbUtils.count("CA_EVENTINFO", 
				new String[] {"EVENTINFO_UUID", "DESCRIPTION", "LOCATION", "NAME"}, 
				new Object[] {newEvent.getEventInfo_UUID(), newEvent.getEventInfo().getDescription() + "{META|F313AD08-532F-BE0E-FC7E-1A1CEF026C69}0000000000000000", 
					newEvent.getEventInfo().getLocation(), newEvent.getEventInfo().getName()}));
		// recurrence should be updated
		assertEquals(1, dbUtils.count("CA_RECURRENCE"));
		assertEquals(1, dbUtils.count("CA_RECURRENCE", 
				new String[] {"EVENT_UUID", "BYDAY", "UNTILRULE", "STARTDATE", "ENDDATE" }, 
				new Object[] {newEvent.getEvent_UUID(), newEvent.getRecurrence().getByDay(), 
					new Timestamp(newEvent.getRecurrence().getUntilRule().getTime()),
					new Timestamp(newEvent.getRecurrence().getStartDate().getTime()),
					new Timestamp(newEvent.getRecurrence().getEndDate().getTime())}));
		// should add one event instance
		assertEquals(7, dbUtils.count("CA_EVENTINSTANCE"));
		
		// instance should shift by 10 mins
		// last day have system generated ID
		{
			// aweekSpan == untilUpdate
			Timestamp _start = new Timestamp(startDate.getTime() + timeUpdate + untilUpdate*0);
			Timestamp _end = new Timestamp(endDate.getTime() + timeUpdate + untilUpdate*0);
			String _instID = "instance_" + (startDate.getTime() + untilUpdate*0);
			
			assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {_instID, _start, _end}));
		}
		{
			// aweekSpan == untilUpdate
			Timestamp _start = new Timestamp(startDate.getTime() + timeUpdate + untilUpdate*1);
			Timestamp _end = new Timestamp(endDate.getTime() + timeUpdate + untilUpdate*1);
			String _instID = "instance_" + (startDate.getTime() + untilUpdate*1);
			
			assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {_instID, _start, _end}));
		}
		{
			// aweekSpan == untilUpdate
			Timestamp _start = new Timestamp(startDate.getTime() + timeUpdate + untilUpdate*2);
			Timestamp _end = new Timestamp(endDate.getTime() + timeUpdate + untilUpdate*2);
			String _instID = "instance_" + (startDate.getTime() + untilUpdate*2);
			
			assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {_instID, _start, _end}));
		}
		{
			// aweekSpan == untilUpdate
			Timestamp _start = new Timestamp(startDate.getTime() + timeUpdate + untilUpdate*3);
			Timestamp _end = new Timestamp(endDate.getTime() + timeUpdate + untilUpdate*3);
			String _instID = "instance_" + (startDate.getTime() + untilUpdate*3);
			
			assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {_instID, _start, _end}));
		}
		{
			// aweekSpan == untilUpdate
			Timestamp _start = new Timestamp(startDate.getTime() + timeUpdate + untilUpdate*4);
			Timestamp _end = new Timestamp(endDate.getTime() + timeUpdate + untilUpdate*4);
			String _instID = "instance_" + (startDate.getTime() + untilUpdate*4);
			
			assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {_instID, _start, _end}));
		}
		{
			// aweekSpan == untilUpdate
			Timestamp _start = new Timestamp(startDate.getTime() + timeUpdate + untilUpdate*5);
			Timestamp _end = new Timestamp(endDate.getTime() + timeUpdate + untilUpdate*5);
			String _instID = "instance_" + (startDate.getTime() + untilUpdate*5);
			
			assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
					new String[] {"EVENTINST_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[] {_instID, _start, _end}));
		}
		
		// last added one
		Timestamp _start = new Timestamp(startDate.getTime() + timeUpdate + untilUpdate*6);
		Timestamp _end = new Timestamp(endDate.getTime() + timeUpdate + untilUpdate*6);
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"STARTDATE", "ENDDATE"}, 
				new Object[] {_start, _end}));
	}
}
