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
package com.ibm.lconn.calendar.datapop.utils;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.httpclient.Cookie;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.UsernamePasswordCredentials;
import org.apache.commons.httpclient.auth.AuthScope;
import org.apache.commons.httpclient.params.HttpClientParams;
import org.apache.commons.httpclient.protocol.Protocol;

import com.ibm.lconn.core.ssl.EasySSLProtocolSocketFactory;

public class HttpClientEx extends HttpClient {
	protected static ThreadLocal<Map<String, HttpClientEx>> httpClientCache = new ThreadLocal<Map<String, HttpClientEx>>();
	public static HttpClientEx getHttpClient(String user, String password) {
		Map<String, HttpClientEx> map = httpClientCache.get();
		if(map == null) {
			map = new HashMap<String, HttpClientEx>();
		}
		httpClientCache.set(map);
		
		HttpClientEx c = map.get(user);
		if(c == null) {
			c = new HttpClientEx();
			c.login(user, password);
			map.put(user, c);
		}
		return c;
	}
	
	protected String user = null;
	protected String password = null;
	
	@SuppressWarnings("deprecation")
	public HttpClientEx() {
		super();
		
		Protocol.registerProtocol("https", new Protocol("https", new EasySSLProtocolSocketFactory(), 443));
		setAllowCircularRedirects(true);
	}
	
	public void setAllowCircularRedirects(boolean b) {
		this.getParams().setBooleanParameter(HttpClientParams.ALLOW_CIRCULAR_REDIRECTS, b);
	}
	
	public void setMaxRedirects(int c) {
		this.getParams().setIntParameter(HttpClientParams.MAX_REDIRECTS, c);
	}
	
	public void clearCookies() {
		this.getState().clearCookies();
	}
	
	public void addCookie(Cookie cookie) {
		this.getState().addCookie(cookie);
	}
	
	public void addCookie(String domain, String name, String value) {
		this.getState().addCookie(new Cookie(domain, name, value, "/", -1, false));
	}
	
	public String getCookie(String name) {
		for(Cookie cookie : this.getState().getCookies()) {
			if(name.equals(cookie.getName())) 
				return cookie.getValue();
		}
		return null;
	}
	
	public void login(String user, String password) {
		this.user = user;
		this.password = password;
		
		this.getState().setCredentials(
		        new AuthScope(AuthScope.ANY_HOST, -1), 
		        new UsernamePasswordCredentials(user, password));
	}
	
	public String getLoginUser() {
		return this.user;
	}
	
	public String getLoginPassword() {
		return this.password;
	}
}
