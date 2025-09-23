/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
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

public class CalendarServiceTest2 extends BaseTestCase {
	private static final String CLASS_NAME = CalendarServiceTest2.class.getName();
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
		dbUtils.insert("CA_EVENTINSTANCE", new String[]{"EVENTINST_UUID", "EVENT_UUID", "STARTDATE", "ENDDATE", "DBMODTIME"}, new Object[]{"EVTINST_001", "EVT_001", new Timestamp(1000), new Timestamp(2000), new Timestamp(2000)});
		dbUtils.insert("CA_EVENTCOMMENT", new String[]{"COMMENT_UUID", "EVENT_UUID", "CONTENT"}, new Object[]{"COMMENT_001", "EVTINST_001", "comments_001"});
		dbUtils.flush();
		
		assertEquals(1, cs.getSeedlistDao().getCommentUpdatedEventInstancesSinceCount(new Timestamp(2000), new Timestamp(3000), null));
		assertEquals("EVT_001", cs.getSeedlistDao().getCommentUpdatedEventInstancesSince(new Timestamp(2000), new Timestamp(3000), null, 0, 10).get(0).getEvent_UUID());
	}	
}
