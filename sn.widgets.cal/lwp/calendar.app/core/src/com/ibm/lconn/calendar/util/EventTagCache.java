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
package com.ibm.lconn.calendar.util;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.ibm.lconn.calendar.db.model.DBEventTag;
import com.ibm.lconn.calendar.util.events.Events;
import com.ibm.lconn.calendar.util.events.Listener;

public class EventTagCache {
	public static final EventTagCache instance = new EventTagCache();
	
	static {
    	Events.subscribe(null, Events.RESET_APPLICATION_EVENT, new Listener(){
			public void onEvent(Class source, String event, Map<String, Object> params) {
				instance.clear();
			}
    	});
    }

	static class CacheObject {
		String eventKey;
		Date updateTime;
		List<DBEventTag> tags;

		public CacheObject(String eventKey, Date updateTime, List<DBEventTag> tags) {
			this.eventKey = eventKey;
			this.updateTime = updateTime;
			this.tags = tags;
		}
	}

	LRUCache cache = new LRUCache(10000);

	public EventTagCache() {
	}

	public void push(String eventKey, Date updateTime, List<DBEventTag> tags) {
		if(eventKey == null || updateTime == null) {
			return;
		}
		CacheObject o = new CacheObject(eventKey, updateTime, tags);
		cache.set(eventKey, o);
	}

	public List<DBEventTag> get(String eventKey, Date updateTime) {
		if(eventKey == null || updateTime == null) {
			return null;
		}
		
		LRUCache.CachedData t = cache.get(eventKey);
		if (t != null) {
			RuntimeStatistic.increaseHit();
			CacheObject o = (CacheObject) t.getData();
			if (o != null && !o.updateTime.before(updateTime)) {
				return o.tags;
			}
			RuntimeStatistic.increaseBadHit();
		}
		RuntimeStatistic.increaseMiss();
		return null;
	}

	public void remove(String eventKey) {
		cache.remove(eventKey);
	}
	
	public void clear() {
		cache.clear();
	}

	public int usage() {
		return cache.usage();
	}
	
	public int capacity() {
		return cache.capacity();
	}

	public static class RuntimeStatistic {
		public static int hit = 0;
		public static int badHit = 0;
		public static int miss = 0;

		public static synchronized void increaseHit() {
			RuntimeStatistic.hit++;
		}

		public static synchronized void increaseBadHit() {
			RuntimeStatistic.badHit++;
		}

		public static synchronized void increaseMiss() {
			RuntimeStatistic.miss++;
		}
	}
}
