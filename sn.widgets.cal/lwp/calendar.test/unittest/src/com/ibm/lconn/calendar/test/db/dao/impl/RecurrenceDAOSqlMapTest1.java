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

import java.sql.Timestamp;
import java.util.Date;
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.dao.model.RecurrenceDAO;
import com.ibm.lconn.calendar.db.model.DBRecurrence;
import com.ibm.lconn.calendar.test.core.BaseTestCase;
import com.ibm.lconn.calendar.util.FrequencyCode;


public class RecurrenceDAOSqlMapTest1 extends BaseTestCase {
	private static final String CLASS_NAME = RecurrenceDAOSqlMapTest1.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	private RecurrenceDAO dao = null;
	
	protected void setUp() throws Exception {
		super.setUp();
		
		cs = CalendarServiceFactory.INSTANCE.create();
		dao = cs.getRecurrenceDao();
	}
	
	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public void testAddRecurrence() throws Exception {
		DBRecurrence rec = new DBRecurrence();
		rec.setEvent_UUID("event1");
		rec.setCalendar_UUID("calendar1");
		rec.setFrequencyCode(FrequencyCode.WEEKLY);
		rec.setInterval(2);
		rec.setUntilRule(new Date(3600*24*1000*30));
		rec.setStartDate(new Date(3600*12*1000));
		rec.setEndDate(new Date(3600*14*1000));
		rec.setByDay(127);
		rec.setModifiedOn(new Date());
		
		dao.addRecurrence(rec);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_RECURRENCE"));
		assertEquals(1, dbUtils.count("CA_RECURRENCE", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID", "FREQUENCYCODE", "INTERVAL", "UNTILRULE", "STARTDATE", "ENDDATE", "BYDAY"}, 
				new Object[] {"event1", "calendar1", FrequencyCode.WEEKLY, 2, new Timestamp(3600*24*1000*30), new Timestamp(3600*12*1000), new Timestamp(3600*14*1000), 127}));
	}
	
	public void testUpdateRecurrence() throws Exception {
		String eventID = "event1";
		
		dbUtils.insert("CA_RECURRENCE", new String[] {"EVENT_UUID"}, new Object[] {eventID});
		dbUtils.flush();
		
		DBRecurrence rec = new DBRecurrence();
		rec.setEvent_UUID(eventID);
		rec.setStartDate(new Date(1000*100));
		rec.setEndDate(new Date(1000*1000));
		rec.setUntilRule(new Date(1000*10000));
		rec.setByDay(1);
		rec.setModifiedOn(new Date());
		
		dao.updateRecurrence(rec);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_RECURRENCE", 
				new String[] {"EVENT_UUID",  "STARTDATE", "ENDDATE", "UNTILRULE", "BYDAY"}, 
				new Object[] {eventID, new Timestamp(1000*100), new Timestamp(1000*1000), new Timestamp(1000*10000), 1}));
	}
	
	public void testDeleteRecurrence() throws Exception {
		String eventID = "event1";
		
		dbUtils.insert("CA_RECURRENCE", new String[] {"EVENT_UUID"}, new Object[] {eventID});
		dbUtils.flush();
		
		dao.deleteRecurrence(eventID);
		cs.flush();
		
		assertEquals(0, dbUtils.count("CA_RECURRENCE"));
		assertEquals(0, dbUtils.count("CA_RECURRENCE", new String[] {"EVENT_UUID"}, new Object[] {eventID}));
	}
	
	public void testDeleteRecurrenceByCalendar() throws Exception {
		String eventID1 = "event1";
		String eventID2 = "event2";
		String calendarID1 = "calendar1";
		String calendarID2 = "calendar2";
		
		dbUtils.insert("CA_RECURRENCE", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID"}, 
				new Object[] {eventID1, calendarID1});
		dbUtils.insert("CA_RECURRENCE", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID"}, 
				new Object[] {eventID2, calendarID2});
		dbUtils.flush();
		
		dao.deleteRecurrencesByCalendar(calendarID1);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_RECURRENCE"));
		assertEquals(0, dbUtils.count("CA_RECURRENCE", new String[] {"CALENDAR_UUID"}, new Object[] {calendarID1}));
	}
	
	public void testGetRecurrence() throws Exception {
		String eventID = "event1";
		
		dbUtils.insert("CA_RECURRENCE", new String[] {"EVENT_UUID"}, new Object[] {eventID});
		dbUtils.flush();
		
		DBRecurrence recurrence = dao.getRecurrence(eventID);
		cs.flush();
		
		assertEquals(eventID, recurrence.getEvent_UUID());
	}
}
