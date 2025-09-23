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

package com.ibm.lconn.calendar.test.db.dao;

import junit.framework.Test;
import junit.framework.TestSuite;

import com.ibm.lconn.calendar.test.core.BaseTestCase;
import com.ibm.lconn.calendar.test.db.dao.impl.EventInstanceDAOSqlMapTest1;

public class EventInfoDAOSqlMapTest extends BaseTestCase {
	public static Test suite() {
		TestSuite t = new TestSuite(EventInfoDAOSqlMapTest.class.getCanonicalName());
		t.addTestSuite(EventInstanceDAOSqlMapTest1.class);
		return wrap(t);
	}
}
