/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.util;

import java.util.Collections;
import java.util.Map;
import java.util.LinkedHashMap;

class ExpiringCacheEntry<T> {
    private T value;
    private long timeCached = System.currentTimeMillis();
    private long timeout = 0;
    
    public ExpiringCacheEntry(T value, long timeout) {
        this.value = value;
        
        // make sure that we don't support negative values
        if(timeout > 0) this.timeout = timeout;
    }
    
    public T getValue() {
    	return this.hasExpired() ? null : this.value;
    }
    
    public boolean hasExpired() {
        long now = System.currentTimeMillis();
        return ((this.timeCached + this.timeout) < now);
    }
}

class LRULinkedHashMap<K,V> extends LinkedHashMap<K,V> {
	private static final long serialVersionUID = 1L;
	protected int maxsize;
    
    public LRULinkedHashMap(int maxsize) {
        super(maxsize * 4 / 3 + 1, 0.75f, true);
        this.maxsize = maxsize;
    }
    
    protected boolean removeEldestEntry(Map.Entry<K,V> eldest) {
        return this.size() > this.maxsize;
    }
}


/**
 * An LRU cache where entries expire after a given timeout period.
 */
public class ExpiringLRUCacheImpl<K,V> {
    private long timeout = 0;
    private Map<K, ExpiringCacheEntry<V>> cache = null;
    
    public ExpiringLRUCacheImpl(int maxsize, long timeout) {
    	this.cache = Collections.synchronizedMap(new LRULinkedHashMap<K, ExpiringCacheEntry<V>>(maxsize));
    	this.timeout = timeout * 1000;
    }

    public synchronized void put(K key, V value) {
        ExpiringCacheEntry<V> entry = new ExpiringCacheEntry<V>(value, this.timeout);
        cache.put(key, entry);
    }
   
    public V get(K key) {
        V value = null;
        ExpiringCacheEntry<V> entry = null;
        
        synchronized(this) {
            entry = cache.get(key);
        }
        
        if (entry != null) {
            value = entry.getValue();
            if (value == null) remove(key);
        }
        
        return value;
    } 
    
    public synchronized void remove(K key) {
    	cache.remove(key);
    }
    
    public synchronized void clear() {
    	cache.clear();
    }
}
