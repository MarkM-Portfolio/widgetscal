/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.util;

import java.util.Locale;
import java.util.Stack;

public final class ExecutionContext {
	public static interface PrivilegedRunnable {
		Object run() throws Exception;
	}
	
	static class _ExecutionContextData {
		_ExecutionContextData(String tenantKey, Locale locale) {
			this.tenantKey = tenantKey;
			this.locale = locale;
		}
		String tenantKey;
		Locale locale;
	}
	
	public static final String IGNORE_TENANTKEY = "IGNORE_TENANTKEY";
	public static final String DEFAULT_ORG_ID = "a";
	
	private static ThreadLocal<Stack<_ExecutionContextData>> execCtx = new ThreadLocal<Stack<_ExecutionContextData>>();
	
	protected static Stack<_ExecutionContextData> getExecutionStack() {
		Stack<_ExecutionContextData> t = execCtx.get();
		if(t == null) {
			t = new Stack<_ExecutionContextData>(); 
			t.push(new _ExecutionContextData(null, null));
			execCtx.set(t);
		}
		return t;
	}
	
	public static String getCurrentOrgId() {
		return getExecutionStack().peek().tenantKey;
    }
	
	public static Locale getCurrentLocale() {
		return getExecutionStack().peek().locale;
    }
	
	public static void runAs(String runAsOrgId) {
		runAs(runAsOrgId, null);
	}
	
	public static void runAs(Locale locale) {
		runAs(null, locale);
	}
	
	public static void runAs(String runAsOrgId, Locale locale) {
		if(runAsOrgId == null) {
			runAsOrgId = getCurrentOrgId();
		}
		if(locale == null) {
			locale = getCurrentLocale();
		}
		getExecutionStack().push(new _ExecutionContextData(runAsOrgId, locale));
	}
	
	public static void exit() {
		getExecutionStack().pop();
	}
	
	/////////////
	
	private Throwable lastError = null;
	private String runAsOrgId = null;
	private Locale runAsLocale = null;
	
	public ExecutionContext(String runAsOrgId) {
		this.runAsOrgId = runAsOrgId;
	}
	
	public ExecutionContext(String runAsOrgId, Locale runAsLocale) {
		this.runAsOrgId = runAsOrgId;
		this.runAsLocale = runAsLocale;
	}
	
	public Throwable getLastError() {
		return this.lastError;
	}
	
	public Object run(PrivilegedRunnable task) {
		ExecutionContext.runAs(runAsOrgId, runAsLocale);
		try {
			return task.run();
		} catch(Throwable err) {
			lastError = err;
			return null;
		} finally {
			ExecutionContext.exit();
		}
	}
}
