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
package com.ibm.lconn.calendar.datapop.core;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class PopulationProgress {
	protected static Map<String, Integer> progress = new HashMap<String, Integer>();
	
	protected static long lastPrint = System.currentTimeMillis();
	
	public static synchronized void updateProgress(String id, int increase) {
		Integer n = progress.get(id);
		if(n == null) {
			n = new Integer(0);
		}
		n += increase;
		
		progress.put(id, n);
		
		if(System.currentTimeMillis() - lastPrint > 5 * 60 * 1000L) {
			print();
		}
	}
	
	public static synchronized void print() {
		StringBuffer buf = new StringBuffer();
		for(Iterator<String> iter = progress.keySet().iterator(); iter.hasNext(); ) {
			String k = iter.next();
			int p = progress.get(k);
			buf.append(k + ": " + p + "\r\n");
		}
		buf.append("----------------------");
		System.out.println(buf);
		
		lastPrint = System.currentTimeMillis();
	}
}
