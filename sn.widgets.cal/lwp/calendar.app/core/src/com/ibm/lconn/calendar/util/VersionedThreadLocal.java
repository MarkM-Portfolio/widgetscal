/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.calendar.util;

public class VersionedThreadLocal<T> {
	static class Data<T> {
		T value = null;
		long version = -1;
	}
	
	private ThreadLocal<Data<T>> data = new ThreadLocal<Data<T>>() {
		@Override
        protected Data<T> initialValue() {
			return new Data<T>();
        }
	};
	
	public T get() {
		return data.get().value;
	}
	
	public T get(long version) {
		Data<T> t = data.get();
		if(t.version == version) {
			return t.value;
		}
		return null;
	}
	
	public void set(T value, long version) {
		Data<T> t = data.get();
		t.version = version;
		t.value = value;
	}
}
