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
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventTag;
import com.ibm.lconn.calendar.test.core.BaseTestCase;

public class CalendarServiceTest5 extends BaseTestCase {
	private static final String CLASS_NAME = CalendarServiceTest5.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	
	protected void setUp() throws Exception {
		super.setUp();

		cs = CalendarServiceFactory.INSTANCE.create();
	}

	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public void testUpdateTags1() throws Exception {
		DBEvent event = new DBEvent();
		event.setEvent_UUID("ut_evt1");
		event.setCalendar_UUID("ut_cal1");
		event.setTags(new ArrayList<DBEventTag>());
		event.setModifiedOn(new Date());
		
		Set<String> tags = new HashSet<String>();
		tags.add("test1");
		tags.add("test2");
		Map<String, Integer> t = cs.updateTags(event, tags);
		cs.flush();
		
		// check return value
		assertEquals(2, t.size());
		assertEquals(1, t.get("test1").intValue());
		assertEquals(1, t.get("test2").intValue());
		
		// check event object, the tag list should have been updated
		List<DBEventTag> l = event.getTags();
		assertEquals(2, l.size());
		Set<String> ts = new HashSet<String>();
		for(DBEventTag tag : l) {
			ts.add(tag.getName());
		}
		assertTrue(ts.contains("test1"));
		assertTrue(ts.contains("test2"));
		
		// check database
		assertEquals(2, dbUtils.count("CA_EVENTTAG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"ut_cal1", "ut_evt1", "test1"}));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"ut_cal1", "ut_evt1", "test2"}));
		dbUtils.flush();
	}
	
	public void testUpdateTags2() throws Exception {
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag1", "ut_cal1", "ut_evt2", "test1", new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag2", "ut_cal1", "ut_evt2", "test2", new Timestamp(1000)});
		dbUtils.flush();
		
		DBEvent event = new DBEvent();
		event.setEvent_UUID("ut_evt2");
		event.setCalendar_UUID("ut_cal1");
		event.setModifiedOn(new Date());
		
		assertEquals(2, event.getTags().size());
		
		Set<String> tags = new HashSet<String>();
		tags.add("test1");
		tags.add("test3");
		Map<String, Integer> t = cs.updateTags(event, tags);
		cs.flush();
		
		// check return value
		assertEquals(2, t.size());
		assertEquals(-1, t.get("test2").intValue());
		assertEquals(1, t.get("test3").intValue());
		
		// check event object, the tag list should have been updated
		List<DBEventTag> l = event.getTags();
		assertEquals(2, l.size());
		Set<String> ts = new HashSet<String>();
		for(DBEventTag tag : l) {
			ts.add(tag.getName());
		}
		assertTrue(ts.contains("test1"));
		assertTrue(ts.contains("test3"));
		
		// check database
		assertEquals(2, dbUtils.count("CA_EVENTTAG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"ut_cal1", "ut_evt2", "test1"}));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"ut_cal1", "ut_evt2", "test3"}));
		dbUtils.flush();
	}
}
