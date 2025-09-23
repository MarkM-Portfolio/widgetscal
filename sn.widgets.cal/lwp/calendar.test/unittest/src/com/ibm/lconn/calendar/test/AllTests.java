/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.calendar.test;

import junit.framework.Test;
import junit.framework.TestSuite;

import com.ibm.lconn.calendar.test.core.BaseTestCase;
import com.ibm.lconn.calendar.test.db.CalendarServiceTest;
import com.ibm.lconn.calendar.test.db.dao.CalendarDAOSqlMapTest;
import com.ibm.lconn.calendar.test.db.dao.CommentDAOSqlMapTest;
import com.ibm.lconn.calendar.test.db.dao.EventDAOSqlMapTest;
import com.ibm.lconn.calendar.test.db.dao.EventInfoDAOSqlMapTest;
import com.ibm.lconn.calendar.test.db.dao.EventInstanceDAOSqlMapTest;
import com.ibm.lconn.calendar.test.db.dao.EventTagDAOSqlMapTest;
import com.ibm.lconn.calendar.test.db.dao.EventTagStatDAOSqlMapTest;
import com.ibm.lconn.calendar.test.db.dao.RecurrenceDAOSqlMapTest;
import com.ibm.lconn.calendar.test.db.dao.SubstitutionDAOSqlMapTest;
import com.ibm.lconn.calendar.test.db.dao.UserInfoDAOSqlMapTest;
import com.ibm.lconn.calendar.test.servlets.ServletTestSuite;
import com.ibm.lconn.calendar.test.db.EventInstanceCompareTest;
import com.ibm.lconn.calendar.util.MentionHelperTest;


public class AllTests extends BaseTestCase {
	public static Test suite() {
		TestSuite t = new TestSuite();
		
		// database
		t.addTest(CalendarDAOSqlMapTest.suite());
		t.addTest(EventDAOSqlMapTest.suite());
		t.addTest(EventInfoDAOSqlMapTest.suite());
		t.addTest(EventInstanceDAOSqlMapTest.suite());
		t.addTest(RecurrenceDAOSqlMapTest.suite());
		t.addTest(SubstitutionDAOSqlMapTest.suite());
		t.addTest(UserInfoDAOSqlMapTest.suite());
		t.addTest(EventTagDAOSqlMapTest.suite());
		t.addTest(EventTagStatDAOSqlMapTest.suite());
		t.addTest(CommentDAOSqlMapTest.suite());
		t.addTest(CalendarServiceTest.suite());
		t.addTestSuite(EventInstanceCompareTest.class);
		t.addTest(MentionHelperTest.suite());
		
		// seedlist
		t.addTest(com.ibm.lconn.calendar.test.seedlist.CalendarServiceTest.suite());
		
		// servlet
		t.addTest(ServletTestSuite.suite());
		
		return wrap(t);
	}
}
