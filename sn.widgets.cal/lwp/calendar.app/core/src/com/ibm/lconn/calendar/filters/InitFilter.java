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

package com.ibm.lconn.calendar.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.lconn.calendar.util.ResourceBundleUtils;
import com.ibm.lconn.calendar.util.Utilities;

public class InitFilter implements Filter {
	public static boolean databaseVersionMatch = true;

	public void destroy() {
	}

	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
		if(req instanceof HttpServletRequest) {
			HttpServletRequest request = (HttpServletRequest) req;
			HttpServletResponse response = (HttpServletResponse) resp;
			
			Utilities.setSSLContext(request.isSecure());
			
			if(!databaseVersionMatch) {
				response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ResourceBundleUtils.getMessageBundle(request.getLocale()).getString("error.database.schema.notMatch"));
	            return;
			}
			
			// set request url
	        StringBuffer reqUrl = request.getRequestURL();
			if(request.getQueryString() != null) {
				reqUrl.append("?").append(request.getQueryString());
			}
			request.setAttribute("REMOTE_URL", reqUrl.toString());
		}
		
		chain.doFilter(req, resp);
	}

	public void init(FilterConfig arg0) throws ServletException {
	}

}
