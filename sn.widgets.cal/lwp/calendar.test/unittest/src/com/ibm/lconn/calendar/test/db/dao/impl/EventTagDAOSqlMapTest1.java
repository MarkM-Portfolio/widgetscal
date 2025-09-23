/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.test.db.dao.impl;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.dao.model.EventTagDAO;
import com.ibm.lconn.calendar.db.model.DBEventTag;
import com.ibm.lconn.calendar.test.core.BaseTestCase;

public class EventTagDAOSqlMapTest1 extends BaseTestCase {
	private static final String CLASS_NAME = EventTagDAOSqlMapTest1.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	private EventTagDAO tagDao = null;
	
	protected void setUp() throws Exception {
		super.setUp();

		cs = CalendarServiceFactory.INSTANCE.create();
		tagDao = cs.getEventTagDao();
	}

	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public void testAddEventTag() throws Exception {
		DBEventTag tag = new DBEventTag();
		tag.setTag_UUID("ut_tag1");
		tag.setCalendar_UUID("ut_cal1");
		tag.setEvent_UUID("ut_evt1");
		tag.setName("ut_tag1_name");
		tag.setModifiedOn(new Date(1000));
		tagDao.addEventTag(tag);
		
		cs.flush();
		
		// verify db data
		assertEquals(1, dbUtils.count("CA_EVENTTAG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag1", "ut_cal1", "ut_evt1", "ut_tag1_name", new Timestamp(1000)}));
		dbUtils.flush();
	}
	
	public void testUpdateEventTag() throws Exception {
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag1", "ut_cal1", "ut_evt1", "ut_tag1_name", new Timestamp(1000)});
		dbUtils.flush();
		
		DBEventTag tag = new DBEventTag();
		tag.setTag_UUID("ut_tag1");
		tag.setCalendar_UUID("ut_cal2");
		tag.setEvent_UUID("ut_evt2");
		tag.setName("ut_tag1_name_updated");
		tag.setModifiedOn(new Date(2000));
		tagDao.updateEventTag(tag);
		
		cs.flush();
		
		// verify db data
		assertEquals(1, dbUtils.count("CA_EVENTTAG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", 
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag1", "ut_cal2", "ut_evt2", "ut_tag1_name_updated", new Timestamp(2000)}));
		dbUtils.flush();
	}
	
	public void testGetEventTag() throws Exception {
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag1", "ut_cal1", "ut_evt1", "ut_tag1_name", new Timestamp(1000)});
		dbUtils.flush();
		
		DBEventTag tag = tagDao.getEventTag("ut_tag1");
		cs.flush();
		
		// verify
		assertNotNull(tag);
		assertEquals("ut_tag1", tag.getTag_UUID());
		assertEquals("ut_cal1", tag.getCalendar_UUID());
		assertEquals("ut_evt1", tag.getEvent_UUID());
		assertEquals("ut_tag1_name", tag.getName());
		assertEquals(1000L, tag.getModifiedOn().getTime());
	}
	
	public void testDeleteEventTag1() throws Exception {
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag1", "ut_cal1", "ut_evt1", "ut_tag1_name", new Timestamp(1000)});
		dbUtils.flush();
		
		tagDao.deleteEventTag("ut_tag1");
		cs.flush();
		
		// verify
		assertEquals(0, dbUtils.count("CA_EVENTTAG"));
		dbUtils.flush();
	}
	
	public void testDeleteEventTag2() throws Exception {
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag1", "ut_cal1", "ut_evt1", "ut_tag1_name", new Timestamp(1000)});
		dbUtils.flush();
		
		tagDao.deleteEventTag("ut_evt1", "ut_tag1_name");
		cs.flush();
		
		// verify
		assertEquals(0, dbUtils.count("CA_EVENTTAG"));
		dbUtils.flush();
	}
	
	public void testDeleteEventTags1() throws Exception {
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag1", "ut_cal1", "ut_evt1", "ut_tag1_name", new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag2", "ut_cal1", "ut_evt1", "ut_tag2_name", new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag3", "ut_cal1", "ut_evt2", "ut_tag3_name", new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag4", "ut_cal2", "ut_evt3", "ut_tag4_name", new Timestamp(1000)});
		dbUtils.flush();
		
		tagDao.deleteEventTags("ut_cal1", "ut_evt1");
		cs.flush();
		
		// verify
		assertEquals(2, dbUtils.count("CA_EVENTTAG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", new String[]{"TAG_UUID"}, new Object[]{"ut_tag3"}));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", new String[]{"TAG_UUID"}, new Object[]{"ut_tag4"}));
		dbUtils.flush();
	}
	
	public void testDeleteEventTags2() throws Exception {
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag1", "ut_cal1", "ut_evt1", "ut_tag1_name", new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag2", "ut_cal1", "ut_evt1", "ut_tag2_name", new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag3", "ut_cal1", "ut_evt2", "ut_tag3_name", new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag4", "ut_cal2", "ut_evt3", "ut_tag4_name", new Timestamp(1000)});
		dbUtils.flush();
		
		tagDao.deleteEventTags(null, "ut_evt1");
		cs.flush();
		
		// verify
		assertEquals(2, dbUtils.count("CA_EVENTTAG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", new String[]{"TAG_UUID"}, new Object[]{"ut_tag3"}));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", new String[]{"TAG_UUID"}, new Object[]{"ut_tag4"}));
		dbUtils.flush();
	}
	
	public void testDeleteEventTags3() throws Exception {
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag1", "ut_cal1", "ut_evt1", "ut_tag1_name", new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag2", "ut_cal1", "ut_evt1", "ut_tag2_name", new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag3", "ut_cal1", "ut_evt2", "ut_tag3_name", new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag4", "ut_cal2", "ut_evt3", "ut_tag4_name", new Timestamp(1000)});
		dbUtils.flush();
		
		tagDao.deleteEventTags("ut_cal1", null);
		cs.flush();
		
		// verify
		assertEquals(1, dbUtils.count("CA_EVENTTAG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAG", new String[]{"TAG_UUID"}, new Object[]{"ut_tag4"}));
		dbUtils.flush();
	}
	
	public void testGetTagsByEvent() throws Exception {
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag1", "ut_cal1", "ut_evt1", "ut_tag1_name", new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag2", "ut_cal1", "ut_evt1", "ut_tag2_name", new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag3", "ut_cal1", "ut_evt2", "ut_tag3_name", new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAG",
				new String[]{"TAG_UUID", "CALENDAR_UUID", "EVENT_UUID", "NAME", "MODIFIEDON"},
				new Object[]{"ut_tag4", "ut_cal2", "ut_evt3", "ut_tag4_name", new Timestamp(1000)});
		dbUtils.flush();
		
		List<DBEventTag> l = tagDao.getTagsByEvent("ut_evt1");
		cs.flush();
		
		Set<String> tags = new HashSet<String>();
		for(DBEventTag tag : l) {
			tags.add(tag.getName());
		}
		
		// verify
		assertEquals(2, tags.size());
		assertTrue(tags.contains("ut_tag1_name"));
		assertTrue(tags.contains("ut_tag2_name"));
	}
}
