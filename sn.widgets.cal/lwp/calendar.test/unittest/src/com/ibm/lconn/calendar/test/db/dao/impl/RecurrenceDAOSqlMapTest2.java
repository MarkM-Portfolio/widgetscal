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


public class RecurrenceDAOSqlMapTest2 extends BaseTestCase {
	private static final String CLASS_NAME = RecurrenceDAOSqlMapTest2.class.getName();
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
	
	public void testOnShrink() throws Exception {
		String instanceID1 = "instance1";
		String instanceID2 = "instance2";
		String instanceID3 = "instance3";
		String instanceID4 = "instance4";
		String instanceID5 = "instance5";
		String calendarID = "calendar1";
		String eventID1 = "event1";
		String eventID2 = "event2";
		String infoID = "info1";
		Timestamp start1 = new Timestamp(2*1000);
		Timestamp start2 = new Timestamp(4*1000);
		Timestamp start3 = new Timestamp(6*1000);
		Timestamp start4 = new Timestamp(8*1000);
		Timestamp start5 = new Timestamp(10*1000);
		Timestamp end1 = new Timestamp(20*1000);
		Timestamp end2 = new Timestamp(40*1000);
		Timestamp end3 = new Timestamp(60*1000);
		Timestamp end4 = new Timestamp(80*1000);
		Timestamp end5 = new Timestamp(100*1000);
		
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {instanceID1, calendarID, eventID1, infoID, start1, end1});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {instanceID2, calendarID, eventID1, infoID, start2, end2});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {instanceID3, calendarID, eventID1, infoID, start3, end3});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {instanceID4, calendarID, eventID1, infoID, start4, end4});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "ENDDATE"}, 
				new Object[] {instanceID5, calendarID, eventID2, infoID, start5, end5});
		dbUtils.flush();
		
		String substitutionID1 = instanceID2;
		String substitutionID2 = instanceID3;
		String substitutionID3 = instanceID4;
		Timestamp s1 = new Timestamp(2*1000);
		Timestamp s2 = new Timestamp(2*1000);
		Timestamp s3 = new Timestamp(4*1000);
		Timestamp newStart1 = new Timestamp(2*1000);
		Timestamp newStart2 = new Timestamp(4*1000);
		Timestamp newStart3 = new Timestamp(6*1000);
		
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "NEWSTARTDATE"}, 
				new Object[] {substitutionID1, calendarID, eventID1, infoID, s1, newStart1});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "NEWSTARTDATE"}, 
				new Object[] {substitutionID2, calendarID, eventID1, infoID, s2, newStart2});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "STARTDATE", "NEWSTARTDATE"}, 
				new Object[] {substitutionID3, calendarID, eventID1, infoID, s3, newStart3});
		dbUtils.flush();
		
		DBRecurrence recurrence = new DBRecurrence();
		recurrence.setEvent_UUID(eventID1);
		recurrence.setUntilRule(new Date(3*1000));
		
		dao.onShrink(recurrence);
		cs.flush();
		
		// should not be deleted, since startDate < utilRule
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID"}, 
				new Object[] {instanceID1}));
		// should be deleted, since startDate > utilRuile && not in sub-query
		assertEquals(0, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID"}, 
				new Object[] {instanceID2}));
		// should not be deleted, since it's in the sub-query
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID"}, 
				new Object[] {instanceID3}));
		// should be deleted, since it match the OR clause
		assertEquals(0, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID"}, 
				new Object[] {instanceID4}));
		// should not be deleted, since the EVENT_UUID not match
		assertEquals(1, dbUtils.count("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID"}, 
				new Object[] {instanceID5}));

		assertEquals(1, dbUtils.count("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID"}, 
				new Object[] {substitutionID1}));
		assertEquals(1, dbUtils.count("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID"}, 
				new Object[] {substitutionID2}));
		assertEquals(0, dbUtils.count("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID"}, 
				new Object[] {substitutionID3}));
	}
}
