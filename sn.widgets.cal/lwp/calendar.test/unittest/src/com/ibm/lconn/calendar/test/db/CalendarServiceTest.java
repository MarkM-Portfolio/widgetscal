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

package com.ibm.lconn.calendar.test.db;

import junit.framework.Test;
import junit.framework.TestSuite;

import com.ibm.lconn.calendar.test.core.BaseTestCase;
import com.ibm.lconn.calendar.test.db.impl.CalendarServiceTest1;
import com.ibm.lconn.calendar.test.db.impl.CalendarServiceTest2;
import com.ibm.lconn.calendar.test.db.impl.CalendarServiceTest3;
import com.ibm.lconn.calendar.test.db.impl.CalendarServiceTest4;
import com.ibm.lconn.calendar.test.db.impl.CalendarServiceTest5;
import com.ibm.lconn.calendar.test.db.impl.CalendarServiceTest6;
import com.ibm.lconn.calendar.test.db.impl.CalendarServiceTest7;

public class CalendarServiceTest extends BaseTestCase {
	public static Test suite() {
		TestSuite t = new TestSuite(CalendarServiceTest.class.getCanonicalName());
		t.addTestSuite(CalendarServiceTest1.class);
		t.addTestSuite(CalendarServiceTest2.class);
		t.addTestSuite(CalendarServiceTest3.class);
		t.addTestSuite(CalendarServiceTest4.class);
		t.addTestSuite(CalendarServiceTest5.class);
		//t.addTestSuite(CalendarServiceTest6.class);
		t.addTestSuite(CalendarServiceTest7.class);
		return wrap(t);
	}
}
