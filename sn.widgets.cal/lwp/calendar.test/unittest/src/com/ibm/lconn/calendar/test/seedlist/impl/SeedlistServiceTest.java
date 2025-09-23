/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
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

import com.ibm.ilel.seedlist.retriever.connections.calendar.CalendarState;
import com.ibm.ilel.seedlist.retriever.connections.calendar.data.CalendarDataSourceException;
import com.ibm.ilel.seedlist.retriever.connections.calendar.data.CalendarEntry;
import com.ibm.ilel.seedlist.retriever.connections.calendar.datasource.SeedlistService;
import com.ibm.lconn.calendar.test.core.BaseTestCase;

public class SeedlistServiceTest extends BaseTestCase {
	private static final String CLASS_NAME = SeedlistServiceTest.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	public void testGetCalendarEntries() {
		try {
			// prepare data 
			dbUtils.insert("CA_EVENT", 
					new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON", "DBMODTIME"}, 
					new Object[]{"EVT_001", false, new Timestamp(1000), new Timestamp(1000)});
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[]{"EVTINST_001", "EVT_001", new Timestamp(1000), new Timestamp(2000)});
			
			dbUtils.insert("CA_EVENT", 
					new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON", "DBMODTIME"}, 
					new Object[]{"EVT_002", false, new Timestamp(3000), new Timestamp(4000)});
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[]{"EVTINST_002", "EVT_002", new Timestamp(4000), new Timestamp(6000)});
			dbUtils.flush();
		} catch(Exception e) {
			// ignore
		}
		try {			
			SeedlistService ss = new SeedlistService();
			CalendarState state = null;
			state = new CalendarState();
			state.setOffset(0);
			state.setLastModified(new Date(200));
			state.setStartDate(new Date(200));
			CalendarEntry[] entries = ss.getCalendarEntries(state, 1);
			assertEquals(1, entries.length);
			assertEquals(1000l, state.getLastModified().getTime());
			
			state = new CalendarState();
			state.setOffset(0);
			state.setLastModified(new Date(200));
			state.setStartDate(new Date(200));
			entries = ss.getCalendarEntries(state, 2);
			assertEquals(2, entries.length);
			assertEquals(4000l, state.getLastModified().getTime());
			
			state = new CalendarState();
			state.setOffset(0);
			state.setLastModified(new Date(2000));
			state.setStartDate(new Date(2000));
			entries = ss.getCalendarEntries(state, 2);
			assertEquals(1, entries.length);
			assertEquals(4000l, state.getLastModified().getTime());
		} catch (CalendarDataSourceException e) {
			e.printStackTrace();
			fail();
		}
	}
	
	public void testGetCalendarEntry() {
		try {
			// prepare data 
			dbUtils.insert("CA_EVENT", 
					new String[]{"EVENT_UUID", "ISRECURRENCE", "MODIFIEDON", "DBMODTIME"}, 
					new Object[]{"EVT_001", false, new Timestamp(1000), new Timestamp(1000)});
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[]{"EVTINST_001", "EVT_001", new Timestamp(1000), new Timestamp(2000)});
			dbUtils.flush();
		} catch(Exception e) {
			// ignore
		}
		try {
			SeedlistService ss = new SeedlistService();
			CalendarEntry e = ss.getCalendarEntry("EVT_001");
			assertNotNull(e);
			assertEquals("EVT_001", e.getId());
			assertEquals(1, e.getInstances().size());
			assertEquals(new Date(1000), e.getInstances().get(0).getStartDate());
			assertEquals(new Date(2000), e.getInstances().get(0).getEndDate());
			
			 e = ss.getCalendarEntry("EVT_002");
			 assertNull(e);
		} catch (CalendarDataSourceException e) {
			e.printStackTrace();
			fail();
		}
	}
	
	public void testGetCalendarEntriesWithCommentUpdated() {
		try {
			// prepare data 
			dbUtils.insert("CA_CALENDAR", 
					new String[] {"CALENDAR_UUID", "LAST_MODIFIED", "ACLMODTIME", "CREATEDON"}, 
					new Object[] {"CAL_001", new Timestamp(2000), new Timestamp(3000), new Timestamp(0)});
			dbUtils.insert("CA_EVENT",  
					new String[]{"EVENT_UUID", "CALENDAR_UUID", "ISRECURRENCE", "MODIFIEDON", "DBMODTIME", "CREATEDON"}, 
					new Object[]{"EVT_001", "CAL_001", false, new Timestamp(0), new Timestamp(0), new Timestamp(0)});
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "DBMODTIME" }, 
					new Object[]{"EVTINST_001", "EVT_001", new Timestamp(1000), new Timestamp(2000), new Timestamp(3000)});
			
			dbUtils.insert("CA_EVENT", 
					new String[]{"EVENT_UUID", "CALENDAR_UUID", "ISRECURRENCE", "MODIFIEDON", "DBMODTIME", "CREATEDON"}, 
					new Object[]{"EVT_002", "CAL_001", false, new Timestamp(2000), new Timestamp(2000), new Timestamp(1000)});
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "DBMODTIME"}, 
					new Object[]{"EVTINST_002", "EVT_002", new Timestamp(3000), new Timestamp(4000), new Timestamp(5000)});
			dbUtils.insert("CA_EVENT", // will not be include as the event is created after start date
					new String[]{"EVENT_UUID", "CALENDAR_UUID", "ISRECURRENCE", "MODIFIEDON", "DBMODTIME", "CREATEDON"}, 
					new Object[]{"EVT_003", "CAL_001", false, new Timestamp(5000), new Timestamp(5000), new Timestamp(5000)});
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "DBMODTIME"}, 
					new Object[]{"EVTINST_003", "EVT_003", new Timestamp(7000), new Timestamp(8000), new Timestamp(5000)});
			dbUtils.flush();
		} catch(Exception e) {
			// ignore
			e.printStackTrace();
		}
		try {
			SeedlistService ss = new SeedlistService();
			CalendarState state = null;
			state = new CalendarState();
			state.setOffset(0);
			state.setLastModified(new Date(4000));
			state.setStartDate(new Date(4000));
			state.setFinishDate(new Date(6000));
			CalendarEntry[] e = ss.getCalendarEntriesWithCommentUpdated(state, 2);
			assertNotNull(e);
			assertEquals(1, e.length);
			assertEquals("EVTINST_002", e[0].getId()); // verify the one be included
			assertEquals(1000, e[0].getLastModifiedDate().getTime()); // for an event instance without last modified time, use the event create time
		} catch (CalendarDataSourceException e) {
			e.printStackTrace();
			fail();
		}
	}
	
	public void testGetCalendarEntriesWithAclUpdated() {
		try {
			// prepare data 
			dbUtils.insert("CA_CALENDAR", 
					new String[] {"CALENDAR_UUID", "LAST_MODIFIED", "ACLMODTIME", "CREATEDON"}, 
					// the calendar only count if it is create before start time and acl modified after start time
					new Object[] {"CAL_001", new Timestamp(2000), new Timestamp(3000), new Timestamp(0)});
			dbUtils.insert("CA_EVENT",  // should not be included as the event is created after start time
					new String[]{"EVENT_UUID", "CALENDAR_UUID", "ISRECURRENCE", "MODIFIEDON", "DBMODTIME"}, 
					new Object[]{"EVT_001", "CAL_001", false, new Timestamp(1000), new Timestamp(1000)});
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[]{"EVTINST_001", "EVT_001", new Timestamp(1000), new Timestamp(2000)});
			
			dbUtils.insert("CA_EVENT", // should not be include as the event is created after start time
					new String[]{"EVENT_UUID", "CALENDAR_UUID", "ISRECURRENCE", "MODIFIEDON", "DBMODTIME"}, 
					new Object[]{"EVT_002", "CAL_001", false, new Timestamp(2000), new Timestamp(2000)});
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[]{"EVTINST_002", "EVT_002", new Timestamp(3000), new Timestamp(4000)});
			dbUtils.flush();
		} catch(Exception e) {
			// ignore
			e.printStackTrace();
		}
		try {
			SeedlistService ss = new SeedlistService();
			CalendarState state = null;
			state = new CalendarState();
			state.setOffset(0);
			state.setLastModified(new Date(1000));
			state.setStartDate(new Date(1000));
			CalendarEntry[] e = ss.getCalendarEntriesWithAclUpdated(state, 2);
			assertNotNull(e);
			assertEquals(0, e.length);
		} catch (CalendarDataSourceException e) {
			e.printStackTrace();
			fail();
		}
		
	}
	
	public void testGetCalendarEntriesWithAclUpdated1() {
		try {
			// prepare data 
			dbUtils.insert("CA_CALENDAR", 
					new String[] {"CALENDAR_UUID", "LAST_MODIFIED", "ACLMODTIME", "CREATEDON"}, 
					// the calendar only count if it is create before start time and acl modified after start time
					new Object[] {"CAL_001", new Timestamp(2000), new Timestamp(3000), new Timestamp(0)});
			dbUtils.insert("CA_EVENT",  // should be included as the event is created/modified before start time
					new String[]{"EVENT_UUID", "CALENDAR_UUID", "ISRECURRENCE", "MODIFIEDON", "DBMODTIME", "CREATEDON"}, 
					new Object[]{"EVT_001", "CAL_001", false, new Timestamp(0), new Timestamp(0), new Timestamp(0)});
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[]{"EVTINST_001", "EVT_001", new Timestamp(1000), new Timestamp(2000)});
			
			dbUtils.insert("CA_EVENT", // should not be include as the event is created after start time
					new String[]{"EVENT_UUID", "CALENDAR_UUID", "ISRECURRENCE", "MODIFIEDON", "DBMODTIME", "CREATEDON"}, 
					new Object[]{"EVT_002", "CAL_001", false, new Timestamp(2000), new Timestamp(2000), new Timestamp(1000)});
			dbUtils.insert("CA_EVENTINSTANCE", 
					new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE"}, 
					new Object[]{"EVTINST_002", "EVT_002", new Timestamp(3000), new Timestamp(4000)});
			dbUtils.flush();
		} catch(Exception e) {
			// ignore
			e.printStackTrace();
		}
		try {
			SeedlistService ss = new SeedlistService();
			CalendarState state = null;
			state = new CalendarState();
			state.setOffset(0);
			state.setLastModified(new Date(1000));
			state.setStartDate(new Date(1000));
			CalendarEntry[] e = ss.getCalendarEntriesWithAclUpdated(state, 2);
			assertNotNull(e);
			assertEquals(1, e.length);
			assertEquals("EVT_001", e[0].getId()); // verify the one be included
		} catch (CalendarDataSourceException e) {
			e.printStackTrace();
			fail();
		}
		
	}
	
}
