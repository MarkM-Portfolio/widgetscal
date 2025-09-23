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
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.dao.model.SubstitutionDAO;
import com.ibm.lconn.calendar.db.model.DBSubstitution;
import com.ibm.lconn.calendar.test.core.BaseTestCase;


public class SubstitutionDAOSqlMapTest2 extends BaseTestCase {
	private static final String CLASS_NAME = SubstitutionDAOSqlMapTest2.class.getName();
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
	
	public void testGetSubstitution() throws Exception {
		String subID = "substitution1";
		
		dbUtils.insert("CA_SUBSTITUTION", new String[] {"SUBSTITUTION_UUID"}, new Object[] {subID});
		dbUtils.flush();
		
		DBSubstitution sub = dao.getSubstitution(subID);
		cs.flush();
		
		assertEquals(subID, sub.getSubstitution_UUID());
	}
	
	public void testGetSubstitutionByEventAndDate() throws Exception {
		String subID = "substitution1";
		String eventID = "event1";
		Timestamp time = new Timestamp(1000);
		
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "EVENT_UUID", "NEWSTARTDATE"}, 
				new Object[] {subID, eventID, time});
		dbUtils.flush();
		
		DBSubstitution sub = dao.getSubstitution(eventID, time);
		cs.flush();
		
		assertEquals(eventID, sub.getEvent_UUID());
		assertEquals(time.getTime(), sub.getNewStartDate().getTime());
	}
	
	public void testMoveEventSubstitutionsInBatch() throws Exception {
		String subID1 = "substitution1";
		String subID2 = "substitution2";
		String eventID = "event1";
		Timestamp start = new Timestamp(1000);
		Timestamp newStart = new Timestamp(2000);
		Timestamp newEnd = new Timestamp(3000);
		
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE"}, 
				new Object[] {subID1, eventID, start});
		dbUtils.insert("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[] {subID2, eventID, start, newStart, newEnd});
		dbUtils.flush();
		
		long startOffset = 5;	// seconds
		long endOffset = 8; 	// seconds
		dao.moveEventSubstitutionsInBatch(eventID, startOffset, endOffset);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[] {subID1, eventID, new Timestamp(start.getTime()+startOffset*1000), null, null}));
		assertEquals(1, dbUtils.count("CA_SUBSTITUTION", 
				new String[] {"SUBSTITUTION_UUID", "EVENT_UUID", "STARTDATE", "NEWSTARTDATE", "NEWENDDATE"}, 
				new Object[] {subID2, eventID, new Timestamp(start.getTime()+startOffset*1000), 
					new Timestamp(newStart.getTime()), new Timestamp(newEnd.getTime())}));
	}
}
