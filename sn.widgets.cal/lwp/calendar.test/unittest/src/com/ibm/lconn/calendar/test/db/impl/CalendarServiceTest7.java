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
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBEventTag;
import com.ibm.lconn.calendar.db.model.DBRecurrence;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.test.core.BaseTestCase;
import com.ibm.lconn.calendar.util.FrequencyCode;

public class CalendarServiceTest7 extends BaseTestCase {
	private static final String CLASS_NAME = CalendarServiceTest7.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	
	protected void setUp() throws Exception {
		super.setUp();

		cs = CalendarServiceFactory.INSTANCE.create();
	}

	protected void tearDown() throws Exception {
		super.tearDown();
	}

	// insert a recurrence event with tag, both CA_EVENTTAG and CA_EVENTTAGAGG tables should be updated correctly
	public void testAddRecurrenceEventWithTag() throws Exception {
		dbUtils.insert("CA_CALENDAR", new String[] {"CALENDAR_UUID"}, new Object[] {"ut-cal-01"});
		dbUtils.insert("CA_EVENTTAGAGG", new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, new Object[]{"ut-cal-01", "test1", 2});
		dbUtils.flush();
		
		DBUser user = new DBUser();
		user.setUserUUID("ut-usr-01");
		
		DBEventInfo eventInfo = new DBEventInfo();
		eventInfo.setName("test event");
		eventInfo.setLocation("location - test event");
		eventInfo.setDescription("description - test event");
		eventInfo.setIsAllDay(false);
		
		DBRecurrence recurrence = new DBRecurrence();
		recurrence.setStartDate(new Date(1000));
		recurrence.setEndDate(new Date(5000));
		recurrence.setUntilRule(new Date(100000));
		recurrence.setByDay(127);
		recurrence.setFrequencyCode(FrequencyCode.DAILY);
		
		DBEvent event = new DBEvent();
		event.setEventInfo(eventInfo);
		event.setDBRecurrence(recurrence);	
		
		Set<String> tags = new HashSet<String>();
		tags.add("test1");
		tags.add("test2");
		
		String eventUUID = cs.addRecurrenceEvent(event, tags, null, cs.getCalendarDAO().getCalendar("ut-cal-01"), user, null);
		
		cs.flush();
		
		// check db data
		
		assertEquals(2, dbUtils.count("CA_EVENTTAG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"ut-cal-01", eventUUID, "test1"}));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"ut-cal-01", eventUUID, "test2"}));
		
		assertEquals(2, dbUtils.count("CA_EVENTTAGAGG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"ut-cal-01", "test1", 3}));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"ut-cal-01", "test2", 1}));
		
		dbUtils.flush();
		
		// check event.getTags result
		
		DBEvent tEvent = cs.getEventDAO().getEvent(eventUUID);
		
		Set<String> tTagNames = tEvent.getTagNames();
		assertEquals(2, tTagNames.size());
		assertTrue(tTagNames.contains("test1"));
		assertTrue(tTagNames.contains("test2"));
		
		List<DBEventTag> tTags = tEvent.getTags();
		assertEquals(2, tTags.size());
		
		cs.flush();
	}
	
	// insert a custom event with tag, both CA_EVENTTAG and CA_EVENTTAGAGG tables should be updated correctly
	public void testCustomEventWithTag() throws Exception {
		dbUtils.insert("CA_CALENDAR", new String[] {"CALENDAR_UUID"}, new Object[] {"ut-cal-01"});
		dbUtils.insert("CA_EVENTTAGAGG", new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, new Object[]{"ut-cal-01", "test1", 2});
		dbUtils.flush();
		
		DBUser user = new DBUser();
		user.setUserUUID("ut-usr-01");
		
		DBEventInfo eventInfo = new DBEventInfo();
		eventInfo.setName("test event");
		eventInfo.setLocation("location - test event");
		eventInfo.setDescription("description - test event");
		eventInfo.setIsAllDay(false);
		
		DBEventInstance eventInst = new DBEventInstance();
		eventInst.setStartDate(new Date(1000));
		eventInst.setEndDate(new Date(5000));
		eventInst.setEventInfo(eventInfo);
		List<DBEventInstance> instances = new ArrayList<DBEventInstance>();
		instances.add(eventInst);
		
		DBEvent event = new DBEvent();
		event.setEventInfo(eventInfo);
		event.setEventInstances(instances);
		event.setIsRecurrence(false);
		
		Set<String> tags = new HashSet<String>();
		tags.add("test1");
		tags.add("test2");
		
		String eventUUID = cs.addCustomEvent(event, tags, null, cs.getCalendarDAO().getCalendar("ut-cal-01"), user, null);
		
		cs.flush();
		
		// check db data
		
		assertEquals(2, dbUtils.count("CA_EVENTTAG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"ut-cal-01", eventUUID, "test1"}));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"ut-cal-01", eventUUID, "test2"}));
		
		assertEquals(2, dbUtils.count("CA_EVENTTAGAGG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"ut-cal-01", "test1", 3}));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"ut-cal-01", "test2", 1}));
		
		dbUtils.flush();
		
		// check event.getTags result
		
		DBEvent tEvent = cs.getEventDAO().getEvent(eventUUID);
		
		Set<String> tTagNames = tEvent.getTagNames();
		assertEquals(2, tTagNames.size());
		assertTrue(tTagNames.contains("test1"));
		assertTrue(tTagNames.contains("test2"));
		
		List<DBEventTag> tTags = tEvent.getTags();
		assertEquals(2, tTags.size());
		
		cs.flush();
	}
	
	// update an event instance with tag, both CA_EVENTTAG and CA_EVENTTAGAGG tables should be updated correctly
	// case 1: custom event, event do not have tag originally
	public void testUpdateEventInstanceWithTag1() throws Exception {
		dbUtils.insert("CA_EVENT", new String[]{"CALENDAR_UUID", "EVENT_UUID", "ISRECURRENCE"}, new Object[]{"CAL_001", "EVT_001", false});
		dbUtils.insert("CA_EVENTINSTANCE", new String[]{"CALENDAR_UUID", "EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, new Object[]{"CAL_001", "EVTINST_001", "EVT_001", new Timestamp(1000), new Timestamp(2000)});
		dbUtils.insert("CA_EVENTTAGAGG", new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, new Object[]{"CAL_001", "test1", 2});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		DBEventInstance inst = cs.getEventInstanceDao().getEventInstance("EVTINST_001");
		DBCalendar cal = cs.getCalendarDAO().getCalendar("CAL_001");
		
		DBEventInstance updates = new DBEventInstance();
		updates.setEndDate(new Date(3000));
		updates.setEventInfo(new DBEventInfo());
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		Set<String> tags = new HashSet<String>();
		tags.add("test1");
		tags.add("test2");
		
		Thread.sleep(2000);
		
		cs.updateEventInstance(inst, updates, tags, event, cal, user, null);
		
		cs.flush();
		
		// check db data
		
		assertEquals(2, dbUtils.count("CA_EVENTTAG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"CAL_001", "EVT_001", "test1"}));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"CAL_001", "EVT_001", "test2"}));
		
		assertEquals(2, dbUtils.count("CA_EVENTTAGAGG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"CAL_001", "test1", 3}));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"CAL_001", "test2", 1}));
		
		dbUtils.flush();
		
		// check event.getTags result
		
		DBEvent tEvent = cs.getEventDAO().getEvent("EVT_001");
		
		Set<String> tTagNames = tEvent.getTagNames();
		assertEquals(2, tTagNames.size());
		assertTrue(tTagNames.contains("test1"));
		assertTrue(tTagNames.contains("test2"));
		
		List<DBEventTag> tTags = tEvent.getTags();
		assertEquals(2, tTags.size());
		
		cs.flush();
	}
	
	// update an event instance with tag, both CA_EVENTTAG and CA_EVENTTAGAGG tables should be updated correctly
	// case 2: custom event, event has tag originally
	public void testUpdateEventInstanceWithTag2() throws Exception {
		dbUtils.insert("CA_EVENT", new String[]{"CALENDAR_UUID", "EVENT_UUID", "ISRECURRENCE"}, new Object[]{"CAL_001", "EVT_001", false});
		dbUtils.insert("CA_EVENTINSTANCE", new String[]{"CALENDAR_UUID", "EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, new Object[]{"CAL_001", "EVTINST_001", "EVT_001", new Timestamp(1000), new Timestamp(2000)});
		dbUtils.insert("CA_EVENTTAG", new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, new Object[]{"CAL_001", "EVT_001", "test1"});
		dbUtils.insert("CA_EVENTTAG", new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, new Object[]{"CAL_001", "EVT_001", "test3"});
		dbUtils.insert("CA_EVENTTAGAGG", new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, new Object[]{"CAL_001", "test1", 2});
		dbUtils.insert("CA_EVENTTAGAGG", new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, new Object[]{"CAL_001", "test3", 1});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		DBEventInstance inst = cs.getEventInstanceDao().getEventInstance("EVTINST_001");
		DBCalendar cal = cs.getCalendarDAO().getCalendar("CAL_001");
		
		DBEventInstance updates = new DBEventInstance();
		updates.setEndDate(new Date(3000));
		updates.setEventInfo(new DBEventInfo());
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		Set<String> tags = new HashSet<String>();
		tags.add("test1");
		tags.add("test2");
		
		Thread.sleep(2000);
		
		cs.updateEventInstance(inst, updates, tags, event, cal, user, null);
		
		cs.flush();
		
		// check db data
		
		assertEquals(2, dbUtils.count("CA_EVENTTAG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"CAL_001", "EVT_001", "test1"}));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"CAL_001", "EVT_001", "test2"}));
		
		assertEquals(3, dbUtils.count("CA_EVENTTAGAGG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"CAL_001", "test1", 2}));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"CAL_001", "test2", 1}));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"CAL_001", "test3", 0}));
		
		dbUtils.flush();
		
		// check event.getTags result
		
		DBEvent tEvent = cs.getEventDAO().getEvent("EVT_001");
		
		Set<String> tTagNames = tEvent.getTagNames();
		assertEquals(2, tTagNames.size());
		assertTrue(tTagNames.contains("test1"));
		assertTrue(tTagNames.contains("test2"));
		
		List<DBEventTag> tTags = tEvent.getTags();
		assertEquals(2, tTags.size());
		
		cs.flush();
	}
	
	// update an event instance with tag, both CA_EVENTTAG and CA_EVENTTAGAGG tables should be updated correctly
	// case 2: repeating event
	public void testUpdateEventInstanceWithTag3() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"CAL_001", "EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"CAL_001", "EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"CALENDAR_UUID", "EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"CAL_001", "EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"CALENDAR_UUID", "EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"CAL_001", "EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(86403000)});
		dbUtils.insert("CA_EVENTTAGAGG", new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, new Object[]{"CAL_001", "test1", 2});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		DBEventInstance inst = cs.getEventInstanceDao().getEventInstance("EVTINST_002");
		DBCalendar cal = cs.getCalendarDAO().getCalendar("CAL_001");
		
		// prepare updates, event time updated
		DBEventInstance updates = new DBEventInstance();
		{
			updates.setStartDate(new Date(3000));
			updates.setEndDate(new Date(4000));
			updates.setEventInfo(new DBEventInfo());
		}
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		Set<String> tags = new HashSet<String>();
		tags.add("test1");
		tags.add("test2");
		
		cs.updateEventInstance(inst, updates, tags, event, cal, user, null);
		
		// check db data
		
		assertEquals(0, dbUtils.count("CA_EVENTTAG"));
		
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"CAL_001", "test1", 2}));
		
		dbUtils.flush();
		
		// check event.getTags result
		
		DBEvent tEvent = cs.getEventDAO().getEvent("EVT_001");
		
		Set<String> tTagNames = tEvent.getTagNames();
		assertEquals(0, tTagNames.size());
		
		List<DBEventTag> tTags = tEvent.getTags();
		assertEquals(0, tTags.size());
		
		cs.flush();
	}
	
	// update a recurrence event with tag, both CA_EVENTTAG and CA_EVENTTAGAGG tables should be updated correctly
	// case 1: event does not have tag originally
	public void testUpdateEventSeriesWithTag1() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"CAL_001", "EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"CAL_001", "EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"CALENDAR_UUID", "EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"CAL_001", "EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"CALENDAR_UUID", "EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[]{"CAL_001", "EVT_EXP_INFO_001", "EVT_001", null, "new location", null, null});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"CALENDAR_UUID", "EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "EVENTINFO_UUID"}, 
				new Object[]{"CAL_001", "EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(86403000), "EVT_EXP_INFO_001"});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"CALENDAR_UUID", "SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON"}, 
				new Object[]{"CAL_001", "EVTINST_002", "EVT_001", new Timestamp(86402000), "EVT_EXP_INFO_001", new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAGAGG", new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, new Object[]{"CAL_001", "test1", 2});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		DBCalendar cal = cs.getCalendarDAO().getCalendar("CAL_001");
		
		// prepare updates, event time updated
		DBEvent updates = new DBEvent();
		{
			DBRecurrence trec = new DBRecurrence();
			trec.setStartDate(new Date(3000));
			trec.setEndDate(new Date(5000));
			updates.setDBRecurrence(trec);
			
			updates.setEventInfo(new DBEventInfo());
		}
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		Set<String> tags = new HashSet<String>();
		tags.add("test1");
		tags.add("test2");
		
		cs.updateEventSeries(event, updates, tags, null, cal, user, null);
		
		cs.flush();
		
		// check db data
		
		assertEquals(2, dbUtils.count("CA_EVENTTAG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"CAL_001", "EVT_001", "test1"}));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"CAL_001", "EVT_001", "test2"}));
		
		assertEquals(2, dbUtils.count("CA_EVENTTAGAGG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"CAL_001", "test1", 3}));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"CAL_001", "test2", 1}));
		
		dbUtils.flush();
		
		// check event.getTags result
		
		DBEvent tEvent = cs.getEventDAO().getEvent("EVT_001");
		
		Set<String> tTagNames = tEvent.getTagNames();
		assertEquals(2, tTagNames.size());
		assertTrue(tTagNames.contains("test1"));
		assertTrue(tTagNames.contains("test2"));
		
		List<DBEventTag> tTags = tEvent.getTags();
		assertEquals(2, tTags.size());
		
		cs.flush();
	}
	
	// update a recurrence event with tag, both CA_EVENTTAG and CA_EVENTTAGAGG tables should be updated correctly
	// case 2: event has tag originally
	public void testUpdateEventSeriesWithTag2() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"CAL_001", "EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"CAL_001", "EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"CALENDAR_UUID", "EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"CAL_001", "EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"CALENDAR_UUID", "EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[]{"CAL_001", "EVT_EXP_INFO_001", "EVT_001", null, "new location", null, null});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"CALENDAR_UUID", "EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "EVENTINFO_UUID"}, 
				new Object[]{"CAL_001", "EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(86403000), "EVT_EXP_INFO_001"});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"CALENDAR_UUID", "SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON"}, 
				new Object[]{"CAL_001", "EVTINST_002", "EVT_001", new Timestamp(86402000), "EVT_EXP_INFO_001", new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAG", new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, new Object[]{"CAL_001", "EVT_001", "test1"});
		dbUtils.insert("CA_EVENTTAG", new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, new Object[]{"CAL_001", "EVT_001", "test3"});
		dbUtils.insert("CA_EVENTTAGAGG", new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, new Object[]{"CAL_001", "test1", 2});
		dbUtils.insert("CA_EVENTTAGAGG", new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, new Object[]{"CAL_001", "test3", 1});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		DBCalendar cal = cs.getCalendarDAO().getCalendar("CAL_001");
		
		// prepare updates, event time updated
		DBEvent updates = new DBEvent();
		{
			DBRecurrence trec = new DBRecurrence();
			trec.setStartDate(new Date(3000));
			trec.setEndDate(new Date(5000));
			updates.setDBRecurrence(trec);
			
			updates.setEventInfo(new DBEventInfo());
		}
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		Set<String> tags = new HashSet<String>();
		tags.add("test1");
		tags.add("test2");
		
		cs.updateEventSeries(event, updates, tags, null, cal, user, null);
		
		cs.flush();
		
		// check db data
		
		assertEquals(2, dbUtils.count("CA_EVENTTAG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"CAL_001", "EVT_001", "test1"}));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"CAL_001", "EVT_001", "test2"}));
		
		assertEquals(3, dbUtils.count("CA_EVENTTAGAGG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"CAL_001", "test1", 2}));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"CAL_001", "test2", 1}));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"CAL_001", "test3", 0}));
		
		dbUtils.flush();
		
		// check event.getTags result
		
		DBEvent tEvent = cs.getEventDAO().getEvent("EVT_001");
		
		Set<String> tTagNames = tEvent.getTagNames();
		assertEquals(2, tTagNames.size());
		assertTrue(tTagNames.contains("test1"));
		assertTrue(tTagNames.contains("test2"));
		
		List<DBEventTag> tTags = tEvent.getTags();
		assertEquals(2, tTags.size());
		
		cs.flush();
	}
	
	public void testRemoveEvent() throws Exception {
		dbUtils.insert("CA_EVENT", new String[]{"CALENDAR_UUID", "EVENT_UUID", "ISRECURRENCE"}, new Object[]{"CAL_001", "EVT_001", false});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"CALENDAR_UUID", "EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"CAL_001", "EVTINST_001", "EVT_001", new Timestamp(1000), new Timestamp(2000)});
		dbUtils.insert("CA_EVENTTAG", new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, new Object[]{"CAL_001", "EVT_001", "test1"});
		dbUtils.insert("CA_EVENTTAG", new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, new Object[]{"CAL_001", "EVT_001", "test3"});
		dbUtils.insert("CA_EVENTTAG", new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, new Object[]{"CAL_001", "EVT_002", "test1"});
		dbUtils.insert("CA_EVENTTAGAGG", new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, new Object[]{"CAL_001", "test1", 2});
		dbUtils.insert("CA_EVENTTAGAGG", new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, new Object[]{"CAL_001", "test3", 1});
		dbUtils.flush();
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar("CAL_001");
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.removeEvent(event, cal, user);
		
		cs.flush();
		
		// check db data
		
		assertEquals(1, dbUtils.count("CA_EVENTTAG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"CAL_001", "EVT_002", "test1"}));
		
		assertEquals(2, dbUtils.count("CA_EVENTTAGAGG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"CAL_001", "test1", 1}));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, 
				new Object[]{"CAL_001", "test3", 0}));
		
		dbUtils.flush();
	}
	
	public void testRemoveCalendar() throws Exception {
		dbUtils.insert("CA_EVENT", new String[]{"CALENDAR_UUID", "EVENT_UUID", "ISRECURRENCE"}, new Object[]{"CAL_001", "EVT_001", false});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"CALENDAR_UUID", "EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"CAL_001", "EVTINST_001", "EVT_001", new Timestamp(1000), new Timestamp(2000)});
		dbUtils.insert("CA_EVENTTAG", new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, new Object[]{"CAL_001", "EVT_001", "test1"});
		dbUtils.insert("CA_EVENTTAG", new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, new Object[]{"CAL_001", "EVT_001", "test3"});
		dbUtils.insert("CA_EVENTTAG", new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, new Object[]{"CAL_001", "EVT_002", "test1"});
		dbUtils.insert("CA_EVENTTAGAGG", new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, new Object[]{"CAL_001", "test1", 2});
		dbUtils.insert("CA_EVENTTAGAGG", new String[]{"CALENDAR_UUID", "NAME", "TOTAL"}, new Object[]{"CAL_001", "test3", 1});
		dbUtils.flush();
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.removeCalendar("CAL_001", user);
		
		cs.flush();
		
		// check db data
		
		assertEquals(0, dbUtils.count("CA_EVENTTAG"));
		assertEquals(0, dbUtils.count("CA_EVENTTAGAGG"));
		
		dbUtils.flush();
	}
}
