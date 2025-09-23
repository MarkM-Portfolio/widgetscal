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

package com.ibm.lconn.calendar.test.seedlist.impl;

import java.sql.Timestamp;
import java.util.Date;
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBRecurrence;
import com.ibm.lconn.calendar.db.model.DBSubstitution;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.test.core.BaseTestCase;

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
	
	// case 1: when normal event updated
	public void test1() throws Exception {
		dbUtils.insert("CA_EVENT", new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, new Object[]{"EVT_001", false, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, new Object[]{"EVTINST_001", "EVT_001", new Timestamp(1000), new Timestamp(2000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBEventInstance inst = cs.getEventInstanceDao().getEventInstance("EVTINST_001");
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		DBEventInstance updates = new DBEventInstance();
		updates.setEndDate(new Date(3000));
		updates.setEventInfo(new DBEventInfo());
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.updateEventInstance(inst, updates, null, event, cal, user, null);
		
		// the event's last modified time should have been updated
		assertTrue(cs.getEventDAO().getEvent("EVT_001").getModifiedOn().after(new Date(1000)));
	}
	
	// case 2.1: when repeat event updated - whole series, with event info updated
	public void test2_1() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[]{"EVT_EXP_INFO_001", "EVT_001", null, "new location", null, null});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "EVENTINFO_UUID"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(86403000), "EVT_EXP_INFO_001"});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), "EVT_EXP_INFO_001", new Timestamp(1000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBSubstitution substitution = cs.getSubstitutionDao().getSubstitution("EVTINST_002");
		assertEquals(new Date(1000), substitution.getModifiedOn());
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		// prepare updates, event info updated
		DBEvent updates = new DBEvent();
		{
			DBEventInfo eventInfo = new DBEventInfo();
			eventInfo.setName("new title");
			updates.setEventInfo(eventInfo);
		}
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.updateEventSeries(event, updates, null, null, cal, user, null);
		
		// the event's last modified time should have been updated
		assertTrue(cs.getEventDAO().getEvent("EVT_001").getModifiedOn().after(new Date(1000)));
		
		// the recurrence's last modified time should have been updated
		assertTrue(cs.getRecurrenceDao().getRecurrence("EVT_001").getModifiedOn().after(new Date(1000)));
		
		// the exception instance's last modified time should be updated
		assertTrue(cs.getSubstitutionDao().getSubstitution("EVTINST_002").getModifiedOn().after(new Date(1000)));
	}
	
	// case 2.2: when repeat event updated - whole series, with event time updated
	public void test2_2() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[]{"EVT_EXP_INFO_001", "EVT_001", null, "new location", null, null});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "EVENTINFO_UUID"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(86403000), "EVT_EXP_INFO_001"});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), "EVT_EXP_INFO_001", new Timestamp(1000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBSubstitution substitution = cs.getSubstitutionDao().getSubstitution("EVTINST_002");
		assertEquals(new Date(1000), substitution.getModifiedOn());
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
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
		
		cs.updateEventSeries(event, updates, null, null, cal, user, null);
		
		// the event's last modified time should have been updated
		assertTrue(cs.getEventDAO().getEvent("EVT_001").getModifiedOn().after(new Date(1000)));
		
		// the recurrence's last modified time should have been updated
		assertTrue(cs.getRecurrenceDao().getRecurrence("EVT_001").getModifiedOn().after(new Date(1000)));
		
		// the exception instance's last modified time should not be updated
		assertTrue(cs.getSubstitutionDao().getSubstitution("EVTINST_002").getModifiedOn().equals(new Date(1000)));
	}
	
	// case 2.3: when repeat event updated - whole series, with 'only' event untilDate updated
	public void test2_3() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[]{"EVT_EXP_INFO_001", "EVT_001", null, "new location", null, null});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "EVENTINFO_UUID"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(86403000), "EVT_EXP_INFO_001"});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), "EVT_EXP_INFO_001", new Timestamp(1000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBSubstitution substitution = cs.getSubstitutionDao().getSubstitution("EVTINST_002");
		assertEquals(new Date(1000), substitution.getModifiedOn());
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		// prepare updates, event time updated
		DBEvent updates = new DBEvent();
		{
			DBRecurrence trec = new DBRecurrence();
			trec.setStartDate(new Date(2000));
			trec.setEndDate(new Date(3000));
			trec.setUntilRule(new Date(172802000));
			updates.setDBRecurrence(trec);
			
			updates.setEventInfo(new DBEventInfo());
		}
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.updateEventSeries(event, updates, null, null, cal, user, null);
		
		// the event's last modified time should have been updated
		assertTrue(cs.getEventDAO().getEvent("EVT_001").getModifiedOn().after(new Date(1000)));
		
		// the recurrence's last modified time should have been updated
		assertTrue(cs.getRecurrenceDao().getRecurrence("EVT_001").getModifiedOn().after(new Date(1000)));
		
		// the exception instance's last modified time should 'not' be updated
		assertEquals(new Date(1000), cs.getSubstitutionDao().getSubstitution("EVTINST_002").getModifiedOn());
	}
	
	// case 3.1: when repeat event updated - new exception instance, only event time updated
	public void test3_1() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(86403000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBEventInstance inst = cs.getEventInstanceDao().getEventInstance("EVTINST_002");
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		// prepare updates, event time updated
		DBEventInstance updates = new DBEventInstance();
		{
			updates.setStartDate(new Date(3000));
			updates.setEndDate(new Date(4000));
			
			updates.setEventInfo(new DBEventInfo());
		}
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.updateEventInstance(inst, updates, null, event, cal, user, null);
		
		// the recurrence's last modified time should have been updated
		assertTrue(cs.getRecurrenceDao().getRecurrence("EVT_001").getModifiedOn().after(new Date(1000)));
	}
	
	// case 3.2: when repeat event updated - new exception instance, event info updated
	public void test3_2() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(86403000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBEventInstance inst = cs.getEventInstanceDao().getEventInstance("EVTINST_002");
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		// prepare updates, event info updated
		DBEventInstance updates = new DBEventInstance();
		{
			DBEventInfo eventInfo = new DBEventInfo();
			eventInfo.setLocation("new location");
			updates.setEventInfo(eventInfo);
		}
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.updateEventInstance(inst, updates, null, event, cal, user, null);
		
		// the recurrence's last modified time should have been updated
		assertTrue(cs.getRecurrenceDao().getRecurrence("EVT_001").getModifiedOn().after(new Date(1000)));
	}
	
	// case 4.1: when 'time only' exception instance updated - update event time
	public void test4_1() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "EVENTINFO_UUID"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86401000), new Timestamp(86402000), null});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), null, new Timestamp(1000), new Timestamp(86401000), new Timestamp(86402000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBSubstitution substitution = cs.getSubstitutionDao().getSubstitution("EVTINST_002");
		assertEquals(new Date(1000), substitution.getModifiedOn());
		
		DBEventInstance inst = cs.getEventInstanceDao().getEventInstance("EVTINST_002");
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		// prepare updates, event time updated
		DBEventInstance updates = new DBEventInstance();
		{
			updates.setStartDate(new Date(3000));
			updates.setEndDate(new Date(4000));
			
			updates.setEventInfo(new DBEventInfo());
		}
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.updateEventInstance(inst, updates, null, event, cal, user, null);
		
		// the recurrence's last modified time should have been updated
		assertTrue(cs.getRecurrenceDao().getRecurrence("EVT_001").getModifiedOn().after(new Date(1000)));
	}
	
	// case 4.2: when 'time only' exception instance updated - update event info
	public void test4_2() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[]{"EVT_EXP_INFO_001", "EVT_001", null, "new location", null, null});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "EVENTINFO_UUID"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86401000), new Timestamp(86402000), null});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), null, new Timestamp(1000), new Timestamp(86401000), new Timestamp(86402000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBSubstitution substitution = cs.getSubstitutionDao().getSubstitution("EVTINST_002");
		assertEquals(new Date(1000), substitution.getModifiedOn());
		
		DBEventInstance inst = cs.getEventInstanceDao().getEventInstance("EVTINST_002");
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		// prepare updates, event info updated
		DBEventInstance updates = new DBEventInstance();
		{
			DBEventInfo eventInfo = new DBEventInfo();
			eventInfo.setLocation("new location");
			updates.setEventInfo(eventInfo);
		}
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.updateEventInstance(inst, updates, null, event, cal, user, null);
		
		// the recurrence's last modified time should have been updated
		assertTrue(cs.getRecurrenceDao().getRecurrence("EVT_001").getModifiedOn().after(new Date(1000)));
		
		// the exception instance's last modified time should be updated
		assertTrue(cs.getSubstitutionDao().getSubstitution("EVTINST_002").getModifiedOn().after(new Date(1000)));
	}
	
	// case 5.1: when 'info' exception instance updated - update event time
	public void test5_1() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[]{"EVT_EXP_INFO_001", "EVT_001", null, "new location", null, null});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "EVENTINFO_UUID"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(86403000), "EVT_EXP_INFO_001"});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), "EVT_EXP_INFO_001", new Timestamp(1000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBSubstitution substitution = cs.getSubstitutionDao().getSubstitution("EVTINST_002");
		assertEquals(new Date(1000), substitution.getModifiedOn());
		
		DBEventInstance inst = cs.getEventInstanceDao().getEventInstance("EVTINST_002");
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		// prepare updates, event time updated
		DBEventInstance updates = new DBEventInstance();
		{
			updates.setStartDate(new Date(3000));
			updates.setEndDate(new Date(4000));
			
			updates.setEventInfo(new DBEventInfo());
		}
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.updateEventInstance(inst, updates, null, event, cal, user, null);
		
		// the recurrence's last modified time should 'not' been updated
		assertEquals(new Date(1000), cs.getRecurrenceDao().getRecurrence("EVT_001").getModifiedOn());
		
		// the exception instance's last modified time should be updated
		assertTrue(cs.getSubstitutionDao().getSubstitution("EVTINST_002").getModifiedOn().after(new Date(1000)));
	}
	
	// case 5.2: when 'info' exception instance updated - update event info
	public void test5_2() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[]{"EVT_EXP_INFO_001", "EVT_001", null, "new location", null, null});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "EVENTINFO_UUID"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(86403000), "EVT_EXP_INFO_001"});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), "EVT_EXP_INFO_001", new Timestamp(1000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBSubstitution substitution = cs.getSubstitutionDao().getSubstitution("EVTINST_002");
		assertEquals(new Date(1000), substitution.getModifiedOn());
		
		DBEventInstance inst = cs.getEventInstanceDao().getEventInstance("EVTINST_002");
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		// prepare updates, event info updated
		DBEventInstance updates = new DBEventInstance();
		{
			DBEventInfo eventInfo = new DBEventInfo();
			eventInfo.setLocation("new location");
			updates.setEventInfo(eventInfo);
		}
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.updateEventInstance(inst, updates, null, event, cal, user, null);
		
		// the recurrence's last modified time should 'not' been updated
		assertEquals(new Date(1000), cs.getRecurrenceDao().getRecurrence("EVT_001").getModifiedOn());
		
		// the exception instance's last modified time should be updated
		assertTrue(cs.getSubstitutionDao().getSubstitution("EVTINST_002").getModifiedOn().after(new Date(1000)));
	}
	
	// case 5.3: when 'info' exception instance updated - update event info, rollback to default
	public void test5_3() throws Exception {
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"EVENTINFO_UUID", "EVENT_UUID", "LOCATION"}, 
				new Object[]{"EVT_INFO_001", "EVT_001", "old location"});
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON", "DFLTEVENTINFO"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000), "EVT_INFO_001"});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[]{"EVT_EXP_INFO_001", "EVT_001", null, "new location", null, null});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "EVENTINFO_UUID"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(86403000), "EVT_EXP_INFO_001"});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), "EVT_EXP_INFO_001", new Timestamp(1000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBSubstitution substitution = cs.getSubstitutionDao().getSubstitution("EVTINST_002");
		assertEquals(new Date(1000), substitution.getModifiedOn());
		
		DBEventInstance inst = cs.getEventInstanceDao().getEventInstance("EVTINST_002");
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		// prepare updates, event info updated
		DBEventInstance updates = new DBEventInstance();
		{
			DBEventInfo eventInfo = new DBEventInfo();
			eventInfo.setLocation("old location");
			updates.setEventInfo(eventInfo);
		}
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.updateEventInstance(inst, updates, null, event, cal, user, null);
		
		// the recurrence's last modified time should have been updated
		assertTrue(cs.getRecurrenceDao().getRecurrence("EVT_001").getModifiedOn().after(new Date(1000)));
		
		// the exception instance should have been deleted
		assertNull(cs.getSubstitutionDao().getSubstitution("EVTINST_002"));
		
		// there should be a new record in deletion history table
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{1, "EVTINST_002"}));
	}
	
	// case 5.4: when 'info' exception instance updated - update event info, rollback to default
	public void test5_4() throws Exception {
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"EVENTINFO_UUID", "EVENT_UUID", "LOCATION"}, 
				new Object[]{"EVT_INFO_001", "EVT_001", "old location"});
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON", "DFLTEVENTINFO"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000), "EVT_INFO_001"});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[]{"EVT_EXP_INFO_001", "EVT_001", null, "new location", null, null});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "EVENTINFO_UUID"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86403000), new Timestamp(86404000), "EVT_EXP_INFO_001"});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), "EVT_EXP_INFO_001", new Timestamp(1000), new Timestamp(86403000), new Timestamp(86404000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBSubstitution substitution = cs.getSubstitutionDao().getSubstitution("EVTINST_002");
		assertEquals(new Date(1000), substitution.getModifiedOn());
		
		DBEventInstance inst = cs.getEventInstanceDao().getEventInstance("EVTINST_002");
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		// prepare updates, event info updated
		DBEventInstance updates = new DBEventInstance();
		{
			DBEventInfo eventInfo = new DBEventInfo();
			eventInfo.setLocation("old location");
			updates.setEventInfo(eventInfo);
		}
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.updateEventInstance(inst, updates, null, event, cal, user, null);
		
		// the recurrence's last modified time should have been updated
		assertTrue(cs.getRecurrenceDao().getRecurrence("EVT_001").getModifiedOn().after(new Date(1000)));
		
		// the exception instance should still there, however the info uuid reset to null
		assertNotNull(cs.getSubstitutionDao().getSubstitution("EVTINST_002"));
		assertNull(cs.getSubstitutionDao().getSubstitution("EVTINST_002").getEventInfo_UUID());
		
		// the exception instance's last modified time should be updated
		assertTrue(cs.getSubstitutionDao().getSubstitution("EVTINST_002").getModifiedOn().after(new Date(1000)));
		
		// there should be a new record in deletion history table
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{1, "EVTINST_002"}));
	}
	
	// case 6.1: cancel event - 'info' exception instance
	public void test6_1() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[]{"EVT_EXP_INFO_001", "EVT_001", null, "new location", null, null});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "EVENTINFO_UUID"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86403000), new Timestamp(86404000), "EVT_EXP_INFO_001"});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), "EVT_EXP_INFO_001", new Timestamp(1000), new Timestamp(86403000), new Timestamp(86404000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBSubstitution substitution = cs.getSubstitutionDao().getSubstitution("EVTINST_002");
		assertEquals(new Date(1000), substitution.getModifiedOn());
		
		DBEventInstance inst = cs.getEventInstanceDao().getEventInstance("EVTINST_002");
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.removeEventInstance(inst, event, cal, user);
		
		// the recurrence's last modified time should not been updated
		assertEquals(new Date(1000), cs.getRecurrenceDao().getRecurrence("EVT_001").getModifiedOn());
		
		// the exception instance should still there, however the iscancelled info set to true
		assertNotNull(cs.getSubstitutionDao().getSubstitution("EVTINST_002"));
		assertTrue(cs.getSubstitutionDao().getSubstitution("EVTINST_002").getIsCancelled());
		
		// the exception instance's last modified time should be updated
		assertTrue(cs.getSubstitutionDao().getSubstitution("EVTINST_002").getModifiedOn().after(new Date(1000)));
		
		// there should be a new record in deletion history table
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{1, "EVTINST_002"}));
	}
	
	// case 6.2: cancel event - 'time only' exception instance
	public void test6_2() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86403000), new Timestamp(86404000)});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "MODIFIEDON", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(1000), new Timestamp(86403000), new Timestamp(86404000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBSubstitution substitution = cs.getSubstitutionDao().getSubstitution("EVTINST_002");
		assertEquals(new Date(1000), substitution.getModifiedOn());
		
		DBEventInstance inst = cs.getEventInstanceDao().getEventInstance("EVTINST_002");
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.removeEventInstance(inst, event, cal, user);
		
		// the recurrence's last modified time should have been updated
		assertTrue(cs.getRecurrenceDao().getRecurrence("EVT_001").getModifiedOn().after(new Date(1000)));
		
		// the exception instance should still there, however the iscancelled info set to true
		assertNotNull(cs.getSubstitutionDao().getSubstitution("EVTINST_002"));
		assertTrue(cs.getSubstitutionDao().getSubstitution("EVTINST_002").getIsCancelled());
		
		// the exception instance's last modified time should be updated
		assertTrue(cs.getSubstitutionDao().getSubstitution("EVTINST_002").getModifiedOn().after(new Date(1000)));
		
		// there should not be record in deletion history table
		assertEquals(0, dbUtils.count("CA_DELETION_HISTORY"));
	}
	
	// case 6.3: cancel event - non exception instance
	public void test6_3() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(86403000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBEventInstance inst = cs.getEventInstanceDao().getEventInstance("EVTINST_002");
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.removeEventInstance(inst, event, cal, user);
		
		// the recurrence's last modified time should have been updated
		assertTrue(cs.getRecurrenceDao().getRecurrence("EVT_001").getModifiedOn().after(new Date(1000)));
		
		// there should not be record in deletion history table
		assertEquals(0, dbUtils.count("CA_DELETION_HISTORY"));
	}
	
	// case 6.4: cancel event - simple event, without exception instance
	public void test6_4() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(86403000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.removeEvent(event, cal, user);
		
		// the event object should no longer exist
		assertNull(cs.getEventDAO().getEvent("EVT_001"));
		
		// the recurrence object should no longer exist
		assertNull(cs.getRecurrenceDao().getRecurrence("EVT_001"));
		
		// there should be 3 record in deletion history table
		assertEquals(3, dbUtils.count("CA_DELETION_HISTORY"));
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{0, "EVT_001"}));
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{1, "EVTINST_001"}));
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{1, "EVTINST_002"}));
	}
	
	// case 6.5: cancel event - simple event, event with 'time only' exception
	public void test6_5() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "EVENTINFO_UUID"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86401000), new Timestamp(86402000), null});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), null, new Timestamp(1000), new Timestamp(86401000), new Timestamp(86402000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.removeEvent(event, cal, user);
		
		// the event object should no longer exist
		assertNull(cs.getEventDAO().getEvent("EVT_001"));
		
		// the recurrence object should no longer exist
		assertNull(cs.getRecurrenceDao().getRecurrence("EVT_001"));
		
		// there should be 3 record in deletion history table
		assertEquals(3, dbUtils.count("CA_DELETION_HISTORY"));
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{0, "EVT_001"}));
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{1, "EVTINST_001"}));
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{1, "EVTINST_002"}));
	}
	
	// case 6.6: cancel event - simple event, event with 'cancel' exception
	public void test6_6() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[]{"EVT_EXP_INFO_001", "EVT_001", null, "new location", null, null});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON", "ISCANCELLED"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), "EVT_EXP_INFO_001", new Timestamp(1000), 1});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.removeEvent(event, cal, user);
		
		// the event object should no longer exist
		assertNull(cs.getEventDAO().getEvent("EVT_001"));
		
		// the recurrence object should no longer exist
		assertNull(cs.getRecurrenceDao().getRecurrence("EVT_001"));
		
		// there should be 2 record in deletion history table
		assertEquals(2, dbUtils.count("CA_DELETION_HISTORY"));
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{0, "EVT_001"}));
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{1, "EVTINST_001"}));
	}
	
	// case 6.7: cancel event - event with 'info' exception
	public void test6_7() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[]{"EVT_EXP_INFO_001", "EVT_001", null, "new location", null, null});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "EVENTINFO_UUID"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(86403000), "EVT_EXP_INFO_001"});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), "EVT_EXP_INFO_001", new Timestamp(1000)});
		dbUtils.flush();
		
		DBEvent event = cs.getEventDAO().getEvent("EVT_001");
		assertEquals(new Date(1000), event.getModifiedOn());
		
		DBRecurrence recurrence = cs.getRecurrenceDao().getRecurrence("EVT_001");
		assertEquals(new Date(1000), recurrence.getModifiedOn());
		
		DBCalendar cal = cs.getCalendarDAO().getCalendar(event.getCalendar_UUID());
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.removeEvent(event, cal, user);
		
		// the event object should no longer exist
		assertNull(cs.getEventDAO().getEvent("EVT_001"));
		
		// the recurrence object should no longer exist
		assertNull(cs.getRecurrenceDao().getRecurrence("EVT_001"));
		
		// there should be 3 record in deletion history table
		assertEquals(3, dbUtils.count("CA_DELETION_HISTORY"));
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{0, "EVT_001"}));
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{1, "EVTINST_001"}));
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{1, "EVTINST_002"}));
	}
	
	// case 7.1: remove calendar
	public void test7_1() throws Exception {
		dbUtils.insert("CA_EVENT", 
				new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON"}, 
				new Object[]{"EVT_001", true, new Timestamp(1000)});
		dbUtils.insert("CA_RECURRENCE", 
				new String[]{"EVENT_UUID", "FREQUENCYCODE", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY", "MODIFIEDON"}, 
				new Object[]{"EVT_001", 1, new Timestamp(86402000), new Timestamp(2000), new Timestamp(3000), 127, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[]{"EVTINST_001", "EVT_001", new Timestamp(2000), new Timestamp(3000)});
		dbUtils.insert("CA_EVENTINFO", 
				new String[]{"EVENTINFO_UUID", "EVENT_UUID", "DESCRIPTION", "LOCATION", "NAME", "ISALLDAY"}, 
				new Object[]{"EVT_EXP_INFO_001", "EVT_001", null, "new location", null, null});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "EVENTINFO_UUID"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), new Timestamp(86403000), "EVT_EXP_INFO_001"});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[]{"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "EVENTINFO_UUID", "MODIFIEDON"}, 
				new Object[]{"EVTINST_002", "EVT_001", new Timestamp(86402000), "EVT_EXP_INFO_001", new Timestamp(1000)});
		dbUtils.flush();
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.removeCalendar("EV_CAL_EVT_001", user);
		
		// the event object should no longer exist
		assertNull(cs.getEventDAO().getEvent("EVT_001"));
		
		// the recurrence object should no longer exist
		assertNull(cs.getRecurrenceDao().getRecurrence("EVT_001"));
		
		// there should be one record in deletion history table
		assertEquals(2, dbUtils.count("CA_DELETION_HISTORY"));
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{0, "EVT_001"}));
		assertEquals(1, dbUtils.count("CA_DELETION_HISTORY", new String[]{"OBJECT_TYPE", "OBJECT_UUID"}, new Object[]{1, "EVTINST_002"}));
	}
	
	// case 8.1: update calendar visibility
	public void test8_1() throws Exception {
		dbUtils.insert("CA_CALENDAR", 
				new String[]{"CALENDAR_UUID", "ACLMODTIME"}, 
				new Object[]{"CAL_001", new Timestamp(1000)});
		dbUtils.flush();
		
		assertEquals(new Date(1000), cs.getCalendarDAO().getCalendar("CAL_001").getAclModtime());
		
		DBUser user = new DBUser();
		user.setUserUUID("USR_001");
		
		cs.updateCalendarVisibility("CAL_001", DBCalendar.PRIVATE, user);
		
		// the calendar object's ACLMODTIME should have been updated
		assertTrue(cs.getCalendarDAO().getCalendar("CAL_001").getAclModtime().after(new Date(1000)));
	}
}
