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
package com.ibm.lconn.calendar.util;

import java.util.LinkedHashMap;
import java.util.Map;

public class LRUCache {
	public static class CachedData {
		private Object data = null;
		private long time = 0;
		private boolean refreshing = false;

		public CachedData(Object data) {
			this.data = data;
			this.time = System.currentTimeMillis();
		}

		public Object getData() {
			return data;
		}

		public long getTime() {
			return time;
		}
		
		public void setTime(long time) {
			this.time = time;
		}
		
		public boolean getRefreshing() {
		    return refreshing;
		}
		
		public void setRefreshing(boolean b) {
		    this.refreshing = b;
		}
	}

	protected static class CacheMap extends LinkedHashMap {
		protected int maxsize = 0;

		public CacheMap(int maxsize) {
			super(maxsize * 4 / 3 + 1, 0.75f, true);
			this.maxsize = maxsize;
		}

		protected boolean removeEldestEntry(Map.Entry eldest) {
			return size() > this.maxsize;
		}
	}

	protected CacheMap map = null;

	public LRUCache(int size) {
		this.map = new CacheMap(size);
	}

	public synchronized void set(Object key, Object value) {
		map.remove(key);
		map.put(key, new CachedData(value));
	}

	public synchronized void remove(Object key) {
		map.remove(key);
	}

	public synchronized CachedData get(Object key) {
		CachedData value = (CachedData) map.get(key);
		if (value == null) {
			return null;
		}
		map.remove(key);
		map.put(key, value);
		
		return value;
	}
	
	public int usage() {
		return map.size();
	}
	
	public int capacity() {
		return map.maxsize;
	}
	
	public void clear() {
		map.clear();
	}
}
