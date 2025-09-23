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
import java.util.UUID;

class Subscriber {
	String id = null;
	String subscribeKey = null;
	Listener listener = null;
	Subscriber(String subscribeKey, Listener listener) {
		this.id = UUID.randomUUID().toString();
		this.subscribeKey = subscribeKey;
		this.listener = listener;
	}
}

public class Events {
	public static final String RESET_APPLICATION_EVENT = "RESET_APPLICATION_EVENT";
	
	private static Map<String, Subscriber> map = new HashMap<String, Subscriber>();
	
	protected static final Map<String, List<Subscriber>> subscribers = new HashMap<String, List<Subscriber>>();
	
	@SuppressWarnings("rawtypes")
	public static synchronized String subscribe(Class source, String event, Listener listener) {
		String subscribeKey = (source == null ? "" : source.getCanonicalName()) + ":" + event;
		
		List<Subscriber> l = subscribers.get(subscribeKey);
		if(l == null) {
			l = new ArrayList<Subscriber>();
			subscribers.put(subscribeKey, l);
		}
		Subscriber subscriber = new Subscriber(subscribeKey, listener);
		l.add(subscriber);
		map.put(subscriber.id, subscriber);
		return subscriber.id;
	}
	
	public static synchronized void unsubscribe(String id) {
		Subscriber subscriber = map.get(id);
		try {
			if(subscriber == null)
				return;
			List<Subscriber> l = subscribers.get(subscriber.subscribeKey);
			if(l == null)
				return;
			for(Iterator<Subscriber> iter = l.iterator(); iter.hasNext(); ) {
				Subscriber t = iter.next();
				if(t == subscriber) {
					iter.remove();
				}
			}
		} finally {
			map.remove(id);
		}
	}
	
	@SuppressWarnings("rawtypes")
	public static void fire(Class source, String event, Map<String, Object> params) {
		String subscribeKey = (source == null ? "" : source.getCanonicalName()) + ":" + event;
		
		List<Subscriber> l = null;
		synchronized(subscribers) {
			l = subscribers.get(subscribeKey);
			if(l != null) {
				l = new ArrayList<Subscriber>(l);
			}
		}
		if(l == null) return;
		for(Iterator<Subscriber> iter = l.iterator(); iter.hasNext(); ) {
			Subscriber subscriber = iter.next();
			subscriber.listener.onEvent(source, event, params);
		}
	}
	
	@SuppressWarnings("rawtypes")
	public static void fire(Class source, String event, String[] keys, Object[] values) {
		Map<String, Object> params = new HashMap<String, Object>();
		for(int i = 0; i < keys.length; i++) {
			params.put(keys[i], values[i]);
		}
		fire(source, event, params);
	}
}
