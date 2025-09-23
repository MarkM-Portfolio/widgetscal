/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* (C) Copyright IBM Corp. 2015                                      */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.calendar.test.servlets;

import javax.servlet.ServletConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.lconn.calendar.test.core.BaseTestCase;
import com.ibm.lconn.calendar.test.servlets.mock.HttpServletRequestMock;
import com.ibm.lconn.calendar.test.servlets.mock.HttpServletResponseMock;
import com.ibm.lconn.calendar.test.servlets.mock.ServletConfigMock;

public class ServletTestBase extends BaseTestCase {
	protected HttpServletRequest createMockRequest() {
		return new HttpServletRequestMock();
	}
	
	protected HttpServletResponse createMockResponse() {
		return new HttpServletResponseMock();
	}
	
	protected ServletConfig createMockServletConfig() {
		return new ServletConfigMock();
	}
	
	@Override
	protected void setUp() throws Exception {
		super.setUp();
	}
	
	@Override
	protected void tearDown() throws Exception {
		super.tearDown();
	}
}
