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
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.dao.model.EventTagStatDAO;
import com.ibm.lconn.calendar.db.model.DBEventTagStat;
import com.ibm.lconn.calendar.test.core.BaseTestCase;

public class EventTagStatDAOSqlMapTest1 extends BaseTestCase {
	private static final String CLASS_NAME = EventTagStatDAOSqlMapTest1.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	private EventTagStatDAO tagStatDao = null;
	
	protected void setUp() throws Exception {
		super.setUp();

		cs = CalendarServiceFactory.INSTANCE.create();
		tagStatDao = cs.getEventTagStatDao();
	}

	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public void testAddEventTagStat() throws Exception {
		DBEventTagStat tagStat = new DBEventTagStat();
		tagStat.setTagagg_UUID("ut_tagstat1");
		tagStat.setCalendar_UUID("ut_cal1");
		tagStat.setName("test");
		tagStat.setTotal(2);
		tagStat.setLastUsed(new Date(1000));
		tagStatDao.addEventTagStat(tagStat);
		
		cs.flush();
		
		// verify db data
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL", "LASTUSED"},
				new Object[]{"ut_tagstat1", "ut_cal1", "test", 2, new Timestamp(1000)}));
		dbUtils.flush();
	}
	
	public void testUpdateEventTagStat() throws Exception {
		dbUtils.insert("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL", "LASTUSED"},
				new Object[]{"ut_tagstat1", "ut_cal1", "test", 2, new Timestamp(1000)});
		dbUtils.flush();
		
		DBEventTagStat tagStat = new DBEventTagStat();
		tagStat.setTagagg_UUID("ut_tagstat1");
		tagStat.setCalendar_UUID("ut_cal2");
		tagStat.setName("test1");
		tagStat.setTotal(3);
		tagStat.setLastUsed(new Date(2000));
		tagStatDao.updateEventTagStat(tagStat);
		
		cs.flush();
		
		// verify db data
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL", "LASTUSED"},
				new Object[]{"ut_tagstat1", "ut_cal2", "test1", 3, new Timestamp(2000)}));
		dbUtils.flush();
	}
	
	public void testGetEventTagStat() throws Exception {
		dbUtils.insert("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL", "LASTUSED"},
				new Object[]{"ut_tagstat1", "ut_cal1", "test", 2, new Timestamp(1000)});
		dbUtils.flush();
		
		DBEventTagStat tagStat = tagStatDao.getEventTagStat("ut_cal1", "test");
		cs.flush();
		
		// verify db data
		assertNotNull(tagStat);
		assertEquals(2, tagStat.getTotal());
		assertEquals(new Date(1000), tagStat.getLastUsed());
	}
	
	public void testDeleteEventTagStat() throws Exception {
		dbUtils.insert("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL", "LASTUSED"},
				new Object[]{"ut_tagstat1", "ut_cal1", "test", 2, new Timestamp(1000)});
		dbUtils.flush();
		
		tagStatDao.deleteEventTagStat("ut_cal1", "test");
		cs.flush();
		
		// verify db data
		assertEquals(0, dbUtils.count("CA_EVENTTAGAGG"));
		dbUtils.flush();
	}
	
	public void testUpdateEventTagStatByDiff() throws Exception {
		dbUtils.insert("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL", "LASTUSED"},
				new Object[]{"ut_tagstat1", "ut_cal1", "test1", 2, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL", "LASTUSED"},
				new Object[]{"ut_tagstat2", "ut_cal1", "test2", 1, new Timestamp(2000)});
		dbUtils.flush();
		
		tagStatDao.updateEventTagStat("ut_cal1", "test1", -1);
		tagStatDao.updateEventTagStat("ut_cal1", "test2", 5);
		cs.flush();
		
		// verify db data
		assertEquals(2, dbUtils.count("CA_EVENTTAGAGG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL"},
				new Object[]{"ut_tagstat1", "ut_cal1", "test1", 1}));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL"},
				new Object[]{"ut_tagstat2", "ut_cal1", "test2", 6}));
		dbUtils.flush();
	}
	
	public void testUpdateEventTagStatOnEventDeletion() throws Exception {
		dbUtils.insert("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"},
				new Object[]{"ut_cal1", "test1", 2});
		dbUtils.insert("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"},
				new Object[]{"ut_cal1", "test2", 1});
		dbUtils.insert("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"ut_cal1", "ut_evt1", "test1"});
		dbUtils.insert("CA_EVENTTAG", 
				new String[]{"CALENDAR_UUID", "EVENT_UUID", "NAME"}, 
				new Object[]{"ut_cal1", "ut_evt1", "test2"});
		dbUtils.flush();
		
		tagStatDao.updateEventTagStatOnEventDeletion("ut_cal1", "ut_evt1");
		cs.flush();
		
		// verify db data
		assertEquals(2, dbUtils.count("CA_EVENTTAGAGG"));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"},
				new Object[]{"ut_cal1", "test1", 1}));
		assertEquals(1, dbUtils.count("CA_EVENTTAGAGG", 
				new String[]{"CALENDAR_UUID", "NAME", "TOTAL"},
				new Object[]{"ut_cal1", "test2", 0}));
		dbUtils.flush();
	}
	
	public void testGetMostPopularEventTags1() throws Exception {
		dbUtils.insert("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL", "LASTUSED"},
				new Object[]{"ut_tagstat1", "ut_cal1", "test1", 2, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL", "LASTUSED"},
				new Object[]{"ut_tagstat2", "ut_cal1", "test2", 1, new Timestamp(2000)});
		dbUtils.flush();
		
		List<DBEventTagStat> l1 = tagStatDao.getMostPopularEventTags("ut_cal1", null, 1);
		List<DBEventTagStat> l2 = tagStatDao.getMostPopularEventTags("ut_cal1", null, 2);
		List<DBEventTagStat> l3 = tagStatDao.getMostPopularEventTags("ut_cal1", null, 3);
		cs.flush();
		
		assertEquals(1, l1.size());
		assertEquals("ut_tagstat1", l1.get(0).getTagagg_UUID());
		
		assertEquals(2, l2.size());
		assertEquals("ut_tagstat1", l2.get(0).getTagagg_UUID());
		assertEquals("ut_tagstat2", l2.get(1).getTagagg_UUID());
		
		assertEquals(2, l3.size());
		assertEquals("ut_tagstat1", l3.get(0).getTagagg_UUID());
		assertEquals("ut_tagstat2", l3.get(1).getTagagg_UUID());
	}
	
	public void testGetMostPopularEventTags2() throws Exception {
		dbUtils.insert("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL", "LASTUSED"},
				new Object[]{"ut_tagstat1", "ut_cal1", "test1", 2, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL", "LASTUSED"},
				new Object[]{"ut_tagstat2", "ut_cal1", "test2", 5, new Timestamp(2000)});
		dbUtils.flush();
		
		List<DBEventTagStat> l1 = tagStatDao.getMostPopularEventTags("ut_cal1", null, 1);
		List<DBEventTagStat> l2 = tagStatDao.getMostPopularEventTags("ut_cal1", null, 2);
		List<DBEventTagStat> l3 = tagStatDao.getMostPopularEventTags("ut_cal1", null, 3);
		cs.flush();
		
		assertEquals(1, l1.size());
		assertEquals("ut_tagstat2", l1.get(0).getTagagg_UUID());
		
		assertEquals(2, l2.size());
		assertEquals("ut_tagstat2", l2.get(0).getTagagg_UUID());
		assertEquals("ut_tagstat1", l2.get(1).getTagagg_UUID());
		
		assertEquals(2, l3.size());
		assertEquals("ut_tagstat2", l3.get(0).getTagagg_UUID());
		assertEquals("ut_tagstat1", l3.get(1).getTagagg_UUID());
	}
	
	public void testGetMostPopularEventTags3() throws Exception {
		dbUtils.insert("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL", "LASTUSED"},
				new Object[]{"ut_tagstat1", "ut_cal1", "test1", 2, new Timestamp(1000)});
		dbUtils.insert("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL", "LASTUSED"},
				new Object[]{"ut_tagstat2", "ut_cal1", "test2", 5, new Timestamp(2000)});
		dbUtils.insert("CA_EVENTTAGAGG", 
				new String[]{"TAGAGG_UUID", "CALENDAR_UUID", "NAME", "TOTAL", "LASTUSED"},
				new Object[]{"ut_tagstat3", "ut_cal1", "tabc", 8, new Timestamp(3000)});
		dbUtils.flush();
		
		List<DBEventTagStat> l1 = tagStatDao.getMostPopularEventTags("ut_cal1", "test", 3);
		cs.flush();
		
		assertEquals(2, l1.size());
		assertEquals("ut_tagstat2", l1.get(0).getTagagg_UUID());
		assertEquals("ut_tagstat1", l1.get(1).getTagagg_UUID());
		
		List<DBEventTagStat> l2 = tagStatDao.getMostPopularEventTags("ut_cal1", "t", 3);
		cs.flush();
		
		assertEquals(3, l2.size());
	}
}
