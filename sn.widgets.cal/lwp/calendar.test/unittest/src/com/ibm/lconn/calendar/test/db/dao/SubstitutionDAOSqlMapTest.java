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
import com.ibm.lconn.calendar.test.db.dao.impl.SubstitutionDAOSqlMapTest1;
import com.ibm.lconn.calendar.test.db.dao.impl.SubstitutionDAOSqlMapTest2;

public class SubstitutionDAOSqlMapTest extends BaseTestCase {
	public static Test suite() {
		TestSuite t = new TestSuite(SubstitutionDAOSqlMapTest.class.getCanonicalName());
		t.addTestSuite(SubstitutionDAOSqlMapTest1.class);
		t.addTestSuite(SubstitutionDAOSqlMapTest2.class);
		return wrap(t);
	}
}
