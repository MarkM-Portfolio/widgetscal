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
import java.util.Map;

public abstract class Formatter {
	protected static Map<String, Formatter> _instances = new HashMap<String, Formatter>();
	public static Formatter find(String name) {
		return _instances.get(name);
	}
	
	public Formatter() {
		_instances.put(this.getName(), this);
	}
	
	public abstract String getName();
	public abstract Object format(Object o);
}
