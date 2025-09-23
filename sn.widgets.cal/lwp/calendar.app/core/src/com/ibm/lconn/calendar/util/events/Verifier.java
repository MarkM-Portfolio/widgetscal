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
package com.ibm.lconn.calendar.util.events;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@SuppressWarnings("rawtypes")
public class Verifier {
	public static boolean enabled = false;
	
	public static final ThreadLocal<Boolean> enabledTLS = new ThreadLocal<Boolean>() {
        protected synchronized Boolean initialValue() {
            return true;
        }
    };
	
	protected static final Map<Class, Verifier> instances = new HashMap<Class, Verifier>();
	public static Verifier getInstance(Class c) {
		Verifier v = instances.get(c);
		if(v == null) {
			synchronized(Verifier.class) {
				v = instances.get(c);
				if(v == null) {
					v = new Verifier(c);
					instances.put(c, v);
				}
			}
		}
		return v;
	}
	
	protected static final List<String> subscribes = new ArrayList<String>();
	public static void reset() {
		for(Iterator<String> iter = subscribes.iterator(); iter.hasNext(); ) {
			String id = iter.next();
			Events.unsubscribe(id);
		}
	}
	
	protected Class c = null;
	
	protected Verifier(Class c) {
		this.c = c;
	}
	
	public void verify(String desc, String[] keys, Object[] values) {
		if(Verifier.enabled && enabledTLS.get()) {
			Events.fire(c, desc, keys, values);
		}
	}
	
	public void listen(String desc, Listener listener) {
		subscribes.add(Events.subscribe(c, desc, listener));
	}
}
