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

package com.ibm.lconn.calendar.servlet;

import java.text.MessageFormat;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.exception.CalendarException;
import com.ibm.lconn.calendar.filters.InitFilter;
import com.ibm.lconn.calendar.threads.DeletionHistoryCleaner;
import com.ibm.lconn.calendar.util.ExecutionContext;
import com.ibm.lconn.calendar.util.ResourceBundleUtils;
import com.ibm.lconn.calendar.util.RuntimeConfiguration;
import com.ibm.lconn.calendar.util.events.Verifier;

public class CalendarServletContextListener implements ServletContextListener {
	private static final Logger LOGGER = Logger.getLogger(CalendarServletContextListener.class.getName());
	
	private DeletionHistoryCleaner deletionHistoryCleaner = null;
	
	public void contextDestroyed(ServletContextEvent sce) {
		ExecutionContext.runAs(ExecutionContext.IGNORE_TENANTKEY);
		try {
			if(deletionHistoryCleaner != null) {
				deletionHistoryCleaner.close();
			}
		} finally {
			ExecutionContext.exit();
		}
	}

	public void contextInitialized(ServletContextEvent sce) {
		ExecutionContext.runAs(ExecutionContext.IGNORE_TENANTKEY);
		
		try {
			// check database schema version
			if(!checkDatabaseSchemaVersion()) {
				InitFilter.databaseVersionMatch = false;
			} else {
				if(deletionHistoryCleaner == null) {
					// initialize the deletion history cleaner thread
					deletionHistoryCleaner = new DeletionHistoryCleaner(
							RuntimeConfiguration.getLongValue("deletionhistory.duration") * 24L * 3600L * 1000L,
							RuntimeConfiguration.getLongValue("deletionhistory.cleaner.period") * 3600L * 1000L);
					deletionHistoryCleaner.start();
				}
				
				// ... other initialize work
				
				// unit test
		        try {
					if(Class.forName("com.ibm.lconn.calendar.test.AllTests") != null && Class.forName("org.junitee.servlet.JUnitEEServlet") != null) {
						Verifier.enabled = true;
					}
				} catch (Throwable err) {
					// do nothing
				}
			}
		} finally {
			ExecutionContext.exit();
		}
	}
	
	protected boolean checkDatabaseSchemaVersion() throws CalendarException {
		CalendarService cs = CalendarServiceFactory.INSTANCE.create();
		
		boolean bMatch = true;
		try{
			// load "actual database schema version" from calendar db
			Map<String, String> versionInfo = cs.getSchemaVersionDao().getSchemaVersionForCalendarDB();
			
			cs.flush();
			
			// compare
			if(!RuntimeConfiguration.getValue("release.version").equals(versionInfo.get("RELEASEVER"))) {
				bMatch = false;
			}
			if(!RuntimeConfiguration.getValue("db.schema.version").equals(versionInfo.get("DBSCHEMAVER"))) {
				bMatch = false;
			}
			
			if(!bMatch) {
				LOGGER.severe(MessageFormat.format(
								ResourceBundleUtils.getMessageBundle().getString("error.database.schema.notMatch.detail"), 
								new Object[]{
									versionInfo.get("RELEASEVER") + "-" + versionInfo.get("DBSCHEMAVER"),
									RuntimeConfiguration.getValue("release.version") + "-" + RuntimeConfiguration.getValue("db.schema.version")
								}));
			}
		} catch(CalendarException ex) {
			throw ex;
		} catch(Exception ex) {
			throw new CalendarException(ex);
		} finally{
			cs.release();
		}
		return bMatch;
	}
}
