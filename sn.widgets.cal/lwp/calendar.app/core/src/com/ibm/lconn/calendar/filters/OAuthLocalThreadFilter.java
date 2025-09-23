/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.ibm.lconn.calendar.util.RuntimeConfiguration;

public class OAuthLocalThreadFilter implements Filter {
	public static boolean databaseVersionMatch = true;

	public void destroy() {
	}

	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
		if(req instanceof HttpServletRequest) {
			RuntimeConfiguration.oauth.set(Boolean.TRUE);
		}
		
		try {
			chain.doFilter(req, resp);
		} finally {
			RuntimeConfiguration.oauth.set(Boolean.FALSE);
		}
	}

	public void init(FilterConfig arg0) throws ServletException {
	}

}
