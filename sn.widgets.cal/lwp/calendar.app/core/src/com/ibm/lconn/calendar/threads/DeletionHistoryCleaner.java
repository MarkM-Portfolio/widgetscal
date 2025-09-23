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

package com.ibm.lconn.calendar.threads;

import java.sql.Timestamp;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.util.ExecutionContext;

public class DeletionHistoryCleaner extends Thread {
	protected long duration = -1;
	protected long period = -1;
	
	private boolean stop = false;
	
	public DeletionHistoryCleaner(long duration, long period) {
		this.duration = duration;
		this.period = period;
	}
	
	@Override
	public void run() {
		ExecutionContext.runAs(ExecutionContext.IGNORE_TENANTKEY);
		try {
			while(!stop) {
				CalendarService cs = CalendarServiceFactory.INSTANCE.create();
				cs.getDeletionHistoryDao().clearDeletionHistory(new Timestamp(System.currentTimeMillis() - duration));
				
				try {
					Thread.sleep(this.period);
				} catch (InterruptedException e) {
				}
			}
		} finally {
			ExecutionContext.exit();
		}
	}
	
	public void close() {
		stop = true;
		interrupt();
	}
}
