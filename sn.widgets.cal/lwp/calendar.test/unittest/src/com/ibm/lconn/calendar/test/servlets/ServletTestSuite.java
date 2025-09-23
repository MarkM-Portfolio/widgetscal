/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.test.servlets;

import junit.framework.Test;
import junit.framework.TestSuite;

import com.ibm.lconn.calendar.test.core.BaseTestCase;

public class ServletTestSuite extends BaseTestCase {
	public static Test suite() {
		TestSuite t = new TestSuite(ServletTestSuite.class.getCanonicalName());
		t.addTestSuite(ICalServletTest.class);
		t.addTestSuite(ICalServletTest2.class); 
		return wrap(t);
	}
}
