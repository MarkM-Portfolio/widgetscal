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
package com.ibm.lconn.calendar.test.core;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import junit.extensions.TestSetup;
import junit.framework.Test;
import junit.framework.TestCase;

import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.util.ExecutionContext;
import com.ibm.lconn.calendar.util.events.Events;
import com.ibm.lconn.calendar.util.events.Listener;
import com.ibm.lconn.calendar.util.events.Verifier;


public class BaseTestCase extends TestCase {
	protected boolean _releaseDbUtils = false;
	protected static Properties applicationProperties = new Properties(); 
	static {
		try {
			applicationProperties.load(BaseTestCase.class.getResourceAsStream("/calendar.application.properties"));
		} catch (Exception ex) {
		}
	}
	
	protected static DbTestUtils dbUtils = null;
	
	protected static void resetApp() throws Exception {
		Events.fire(null, Events.RESET_APPLICATION_EVENT, null);
	}
	
	protected static void resetDB() throws Exception {
		dbUtils.clearTable();
		
		dbUtils.insert("CA_SCHEMA", 
				new String[]{"COMPKEY", "DBSCHEMAVER", "RELEASEVER"}, 
				new Object[]{"CALENDAR", applicationProperties.get("db.schema.version"), applicationProperties.get("release.version")});
		
		dbUtils.flush();
	}
	
	protected void setUp() throws Exception {
		super.setUp();
		
		if(dbUtils == null) {
			// initialize db utils
			dbUtils = DbTestUtils.getInstance();
			_releaseDbUtils = true;
		}
		
		// reset db content
		BaseTestCase.resetDB();
		
		// reset app
		BaseTestCase.resetApp();
		
		ExecutionContext.runAs("TEST");
	}

	protected void tearDown() throws Exception {
		ExecutionContext.exit();
		
		CalendarServiceFactory.INSTANCE.create().flush();
		
		// reset database
		BaseTestCase.resetDB();
		
		// reset app
		BaseTestCase.resetApp();
		
		// reset Verifier listener
		Verifier.reset();
		
		super.tearDown();
		if(dbUtils != null && _releaseDbUtils) {
			dbUtils.release();
			dbUtils = null;
		}
	}
	
	// some help methods
	public static Test wrap(Test test) {
		return new TestSetup(test) {
			protected boolean _releaseDbUtils = false;
			
			protected void setUp() throws Exception {
				if(dbUtils == null) {
					// initialize db utils
					dbUtils = DbTestUtils.getInstance();
					_releaseDbUtils = true;
				}
				
				// reset db content
				BaseTestCase.resetDB();
				
				// reset app
				BaseTestCase.resetApp();
			}

			protected void tearDown() throws Exception {
				if(dbUtils != null && _releaseDbUtils) {
					dbUtils.release();
					dbUtils = null;
				}
			}
		};
	}
	
	protected static List<Throwable> errs = new ArrayList<Throwable>();
	protected abstract class Validator implements Listener {
		public int count = 0;
		
		@SuppressWarnings("rawtypes")
		public void onEvent(Class source, String event, Map<String, Object> params) {
			count++;
			
			try {
				verify(params);
			} catch (Exception ex) {
				errs.add(ex);
			} catch (Error err) {
				errs.add(err);
			}
		}

		protected abstract void verify(Map<String, Object> params) throws Exception;
	}
	public static void check() throws Exception {
		List<Throwable> t = new ArrayList<Throwable>(errs);
		errs.clear();
		
		for(Iterator<Throwable> iter = t.iterator(); iter.hasNext(); ) {
			Throwable err = iter.next();
			if(err instanceof Exception) {
				throw (Exception)err;
			} else if(err instanceof Error) {
				throw (Error)err;
			}
		}
	}
}
