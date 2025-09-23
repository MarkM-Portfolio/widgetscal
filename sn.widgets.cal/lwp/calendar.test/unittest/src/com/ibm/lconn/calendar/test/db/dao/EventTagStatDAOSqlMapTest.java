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

package com.ibm.lconn.calendar.test.db.dao;

import junit.framework.Test;
import junit.framework.TestSuite;

import com.ibm.lconn.calendar.test.core.BaseTestCase;
import com.ibm.lconn.calendar.test.db.dao.impl.EventTagStatDAOSqlMapTest1;

public class EventTagStatDAOSqlMapTest extends BaseTestCase {
	public static Test suite() {
		TestSuite t = new TestSuite(EventTagStatDAOSqlMapTest.class.getCanonicalName());
		t.addTestSuite(EventTagStatDAOSqlMapTest1.class);
		return wrap(t);
	}
}
