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

package com.ibm.lconn.calendar.test.seedlist;

import junit.framework.Test;
import junit.framework.TestSuite;

import com.ibm.lconn.calendar.test.core.BaseTestCase;
import com.ibm.lconn.calendar.test.seedlist.impl.CalendarServiceTest1;
import com.ibm.lconn.calendar.test.seedlist.impl.CalendarServiceTest2;
import com.ibm.lconn.calendar.test.seedlist.impl.SeedlistServiceTest;

public class CalendarServiceTest extends BaseTestCase {
	public static Test suite() {
		TestSuite t = new TestSuite(CalendarServiceTest.class.getCanonicalName());
//		t.addTestSuite(CalendarServiceTest1.class);
		t.addTestSuite(CalendarServiceTest2.class);
		t.addTestSuite(SeedlistServiceTest.class);
		return wrap(t);
	}
}
