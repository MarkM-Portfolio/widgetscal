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
import com.ibm.lconn.calendar.db.dao.model.SubstitutionDAO;
import com.ibm.lconn.calendar.db.model.DBSubstitution;
import com.ibm.lconn.calendar.test.core.BaseTestCase;


public class SubstitutionDAOSqlMapTest1 extends BaseTestCase {
	private static final String CLASS_NAME = SubstitutionDAOSqlMapTest1.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	private SubstitutionDAO dao = null;
	
	protected void setUp() throws Exception {
		super.setUp();
		
		cs = CalendarServiceFactory.INSTANCE.create();
		dao = cs.getSubstitutionDao();
	}
	
	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public void testAddSubstitution() throws Exception {
		DBSubstitution sub = new DBSubstitution();
		sub.setSubstitution_UUID("substitution1");
		sub.setEvent_UUID("event1");
		sub.setCalendar_UUID("calendar1");
		sub.setEventInfo_UUID("info1");
		sub.setIsCancelled(false);
		sub.setStartDate(new Date(1000));
		sub.setNewStartDate(new Date(2000));
		sub.setNewEndDate(new Date(3000));
		sub.setModifiedOn(new Date());
		
		dao.addSubstitution(sub);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_SUBSTITUTION"));
		assertEquals(1, dbUtils.count("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "CALENDAR_UUID", "EVENT_UUID", "EVENTINFO_UUID", "ISCANCELLED", "STARTDATE", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[] {"substitution1", "calendar1", "event1", "info1", false, new Timestamp(1000), new Timestamp(2000), new Timestamp(3000)}));
	}
	
	public void testUpdateSubstitution() throws Exception {
		String subID = "substitution1";
		
		dbUtils.insert("CA_SUBSTITUTION", new String[] {"SUBSTITUTION_UUID"}, new Object[] {subID});
		dbUtils.flush();
		
		DBSubstitution sub = new DBSubstitution();
		sub.setSubstitution_UUID(subID);
		sub.setEventInfo_UUID("info1");
		sub.setIsCancelled(true);
		sub.setStartDate(new Date(1000));
		sub.setNewStartDate(new Date(2000));
		sub.setNewEndDate(new Date(3000));
		sub.setModifiedOn(new Date());
		
		dao.updateSubstitution(sub);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "EVENTINFO_UUID", "ISCANCELLED", "STARTDATE", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[] {subID, "info1", true, new Timestamp(1000), new Timestamp(2000), new Timestamp(3000)}));
	}
	
	public void testDeleteSubstitution() throws Exception {
		String subID = "substitution1";
		
		dbUtils.insert("CA_SUBSTITUTION", new String[] {"SUBSTITUTION_UUID"}, new Object[] {subID});
		dbUtils.flush();
		
		dao.deleteSubstitution(subID);
		cs.flush();
		
		assertEquals(0, dbUtils.count("CA_SUBSTITUTION"));
		assertEquals(0, dbUtils.count("CA_SUBSTITUTION", new String[] {"SUBSTITUTION_UUID"}, new Object[] {subID}));
	}
	
	public void testDeleteSubstitutions() throws Exception {
		String calendarID1 = "calendar1";
		String calendarID2 = "calendar2";
		String eventID1 = "event1";
		String eventID2 = "event2";
		String eventID3 = "event3";
		String subID1 = "substitution1";
		String subID2 = "substitution2";
		String subID3 = "substitution3";
		String subID4 = "substitution4";
		
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "CALENDAR_UUID", "EVENT_UUID"}, 
				new Object[] {subID1, calendarID1, eventID1});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "CALENDAR_UUID", "EVENT_UUID"}, 
				new Object[] {subID2, calendarID1, eventID1});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "CALENDAR_UUID", "EVENT_UUID"}, 
				new Object[] {subID3, calendarID2, eventID2});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "CALENDAR_UUID", "EVENT_UUID"}, 
				new Object[] {subID4, calendarID2, eventID3});
		dbUtils.flush();
		
		// should bypass the calendar ID when event ID is available
		dao.deleteSubstitutions(calendarID2, eventID2);
		cs.flush();
		
		assertEquals(3, dbUtils.count("CA_SUBSTITUTION"));
		assertEquals(1, dbUtils.count("CA_SUBSTITUTION", 
				new String[] {"CALENDAR_UUID"}, 
				new Object[] {calendarID2}));
		assertEquals(0, dbUtils.count("CA_SUBSTITUTION", 
				new String[] {"CALENDAR_UUID", "EVENT_UUID"}, 
				new Object[] {calendarID2, eventID2}));
		
		// delete by calendar ID
		dao.deleteSubstitutions(calendarID1, null);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_SUBSTITUTION"));
		assertEquals(0, dbUtils.count("CA_SUBSTITUTION", 
				new String[] {"CALENDAR_UUID"}, 
				new Object[] {calendarID1}));
	}
}
