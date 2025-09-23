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

package com.ibm.lconn.calendar.test.db.dao.impl;

import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.dao.model.EventCommentDAO;
import com.ibm.lconn.calendar.db.model.DBEventComment;
import com.ibm.lconn.calendar.test.core.BaseTestCase;


public class CommentDAOSqlMapTest1 extends BaseTestCase {
	private static final String CLASS_NAME = CommentDAOSqlMapTest1.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarService cs = null;
	private EventCommentDAO commentDao = null;
	
	protected void setUp() throws Exception {
		super.setUp();
		
		cs = CalendarServiceFactory.INSTANCE.create();
		commentDao = cs.getEventCommentDao();
	}
	
	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public void testAddComment() throws Exception {
		String uuid = "comment1";
		String content = "test content 1";
		DBEventComment comment = new DBEventComment();
		comment.setComment_UUID(uuid);
		comment.setCalendar_UUID("calendar_" + uuid);
		comment.setEvent_UUID("event_" + uuid);
		comment.setCreatedBy("creator_" + uuid);
		comment.setCreateOn(new Date());
		comment.setContent(content, DBEventComment.CONTENT_TYPE_PLAIN_TEXT);
		
		commentDao.addComment(comment);
		cs.flush();
		
		assertEquals(1, dbUtils.count("CA_EVENTCOMMENT"));
		assertEquals(1, dbUtils.count("CA_EVENTCOMMENT", 
				new String[] {"COMMENT_UUID", "EVENT_UUID", "CONTENT", "CREATEDBY"}, 
				new Object[] {uuid, "event_"+uuid, content + "{META|F313AD08-532F-BE0E-FC7E-1A1CEF026C69}0000000000000000", "creator_"+uuid}));
	}
	
	public void testGetComment() throws Exception {
		String uuid1 = "comment1";
		
		dbUtils.insert("CA_EVENTCOMMENT", new String[] {"COMMENT_UUID"}, new Object[] {uuid1});
		dbUtils.flush();
		
		DBEventComment comment = commentDao.getComment(uuid1);
		cs.flush();
		
		assertEquals(uuid1, comment.getComment_UUID());
	}
	
	public void testRemoveComment() throws Exception {
		prepare();
		
		commentDao.removeComment("comment1");
		cs.flush();
		
		assertEquals(10, dbUtils.count("CA_EVENTCOMMENT"));
		assertEquals(0, dbUtils.count("CA_EVENTCOMMENT", 
				new String[] {"COMMENT_UUID"}, new Object[] {"comment1"}));
	}
	
	public void testRemoveCommentsOfEventInstance() throws Exception {
		prepare();
		
		commentDao.removeCommentsOfEventInstance("eventInst1");
		cs.flush();
		
		assertEquals(5, dbUtils.count("CA_EVENTCOMMENT"));
		assertEquals(0, dbUtils.count("CA_EVENTCOMMENT", 
				new String[] {"EVENT_UUID"}, new Object[] {"event1"}));
	}
	
	public void testRemoveCommentsOfEvent() throws Exception {
		prepare();
		
		commentDao.removeCommentsOfEvent("event1");
		cs.flush();
		
		assertEquals(5, dbUtils.count("CA_EVENTCOMMENT"));
		assertEquals(0, dbUtils.count("CA_EVENTCOMMENT", 
				new String[] {"EVENT_UUID"}, new Object[] {"event1"}));
	}
	
	public void testRemoveCommentsOfCalendar() throws Exception {
		prepare();
		
		commentDao.removeCommentsOfCalendar("calendar1");
		cs.flush();
		
		assertEquals(0, dbUtils.count("CA_EVENTCOMMENT"));
		assertEquals(0, dbUtils.count("CA_EVENTCOMMENT", 
				new String[] {"CALENDAR_UUID"}, new Object[] {"calendar1"}));
	}
	
	// create 11 comments for 2 events, 6 for event1, 5 for event2
	private void prepare() throws Exception {
		String calendarUuid = "calendar1";
		String eventUuid1 = "event1";
		String eventUuid2 = "event2";
		String eventInstUuid1 = "eventInst1";
		String eventInstUuid2 = "eventInst2";
		String commentUuid = "comment";
		
		dbUtils.insert("CA_EVENT", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID"}, 
				new Object[] {eventUuid1, calendarUuid});
		dbUtils.insert("CA_EVENT", 
				new String[] {"EVENT_UUID", "CALENDAR_UUID"}, 
				new Object[] {eventUuid2, calendarUuid});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "EVENT_UUID", "CALENDAR_UUID"}, 
				new Object[] {eventInstUuid1,eventUuid1, calendarUuid});
		dbUtils.insert("CA_EVENTINSTANCE", 
				new String[] {"EVENTINST_UUID", "EVENT_UUID", "CALENDAR_UUID"}, 
				new Object[] {eventInstUuid2,eventUuid2, calendarUuid});
		
		for (int i=1; i<=11; i++) {
			String eventId = i%2==0 ? eventInstUuid2 : eventInstUuid1;
			dbUtils.insert("CA_EVENTCOMMENT", 
					new String[] {"COMMENT_UUID", "EVENT_UUID", "CALENDAR_UUID"}, 
					new Object[] {commentUuid+i, eventId, calendarUuid});
		}
		dbUtils.flush();
	}
}
