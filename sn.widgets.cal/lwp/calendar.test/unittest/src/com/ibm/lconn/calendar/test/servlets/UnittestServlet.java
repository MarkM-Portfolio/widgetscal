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
package com.ibm.lconn.calendar.test.servlets;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;

import javax.naming.InitialContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import junit.framework.Test;
import junit.textui.TestRunner;

import com.ibm.lconn.calendar.test.AllTests;
import com.ibm.lconn.calendar.util.events.Verifier;
import com.ibm.ventura.internal.config.VenturaConfigVariable;
import com.ibm.websphere.asynchbeans.Work;
import com.ibm.websphere.asynchbeans.WorkManager;

public class UnittestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected static boolean isRun = false;
	protected static ByteArrayOutputStream bout = null;
	protected static long startTime = -1;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		VenturaConfigVariable var = new VenturaConfigVariable();
		if (!"true".equals(var.resolve("${ENABLE_CALENDAR_UNITTEST}"))) {
			response.getOutputStream().print("Unit test disabled for Calendar.");
			response.getOutputStream().flush();
			return;
		}
		
		final String test = request.getParameter("test");

		try {
			synchronized (UnittestServlet.class) {
				if (!isRun && "true".equals(request.getParameter("start"))) {
					isRun = true;
					bout = new ByteArrayOutputStream();
					startTime = System.currentTimeMillis();

					try {
						InitialContext ctx = new InitialContext();
						WorkManager wm = (WorkManager) ctx.lookup("wm/default");
						wm.startWork(new Work(){
							public void run() {
								Verifier.enabled = true;
								
								try {
									TestRunner runner = new TestRunner(new PrintStream(bout));
									
									if(test == null) {
										runner.doRun(AllTests.suite());
									} else {
										runner.doRun((Test)Class.forName(test).getMethod("suite", new Class[0]).invoke(null, new Object[0]));
									}
								} catch (Exception ex) {
									ex.printStackTrace(new PrintStream(bout));
									ex.printStackTrace(System.out);
								} 
								
								isRun = false;
								
								Verifier.enabled = false;
							}

							public void release() {
							}
						});
					} catch (Exception ex) {
						throw new ServletException(ex);
					}
					
					response.getOutputStream().print("Unit test started...");
				} else {
					if (isRun) {
						response.getOutputStream().print(
								"Unit test is still running... [Escaped: "
										+ (System.currentTimeMillis() - startTime)
										+ "]");
						
						response.getOutputStream().println();
						response.getOutputStream().println();
						response.getOutputStream().print(bout.toString());
					} else {
						if (bout != null) {
							response.getOutputStream().print("Unit test finished.");
	
							response.getOutputStream().println();
							response.getOutputStream().println();
							response.getOutputStream().print(bout.toString());
						} else {
							response.getOutputStream().print("Unit test has not started...");
						}
					}
				}
			}
		} finally {
			response.getOutputStream().flush();
		}
	}
}
