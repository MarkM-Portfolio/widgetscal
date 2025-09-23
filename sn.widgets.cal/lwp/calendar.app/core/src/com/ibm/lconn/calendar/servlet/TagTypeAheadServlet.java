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
package com.ibm.lconn.calendar.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;

import com.ibm.json.java.JSONArray;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEventTagStat;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.util.CalendarOperation;
import com.ibm.lconn.calendar.util.RuntimeConfiguration;
import com.ibm.lconn.calendar.util.Utilities;
import com.ibm.lconn.core.web.cache.WebCacheUtil;

/**
 * Return list of tags for TypeAhead <br />
 * 
 * @author Qi Wei Zhang (<a href="mailto:zhangqiw@cn.ibm.com">zhangqiw@cn.ibm.com</a>)
 */
public class TagTypeAheadServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;
	
	private static final String CLASS_NAME = TagTypeAheadServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private final int MAX_LENGTH = 100;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
		doGet(request, response);
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		WebCacheUtil.disableCaching(response);

		int limit = MAX_LENGTH;
		try {
			// only change limit, if specified.
			if (request.getParameter("limit") != null) {
				limit = Integer.parseInt(request.getParameter("limit"));
			}
		} catch (Throwable ignored) {
		}
		
		String calendarUuid = request.getParameter("calendarUuid");
		String tagPre = request.getParameter("tag");
		
		DBCalendar calendar = null;
		if (calendarUuid != null) {
			calendar = crud.getCalendarDAO().getCalendar(calendarUuid);
		} else {
			respondBadRequest(request, response, "error.url.missing.param.parameter", "calendarUuid");
			return;
		}
		if(calendar == null) {
			respondNotFound(response);
			return;
		}
		
		int status = HttpServletResponse.SC_OK;
		try {
			DBUser user = permissionHelper.getUser(request);
			if(user == null && calendar.getVisibility().equals(DBCalendar.PRIVATE)) {
				respondLogin(request, response);
				return;
			}
			status = permissionHelper.isUserAuthorized(request, calendar, null, CalendarOperation.VIEW);
			if(status != HttpServletResponse.SC_OK) {
				response.setStatus(status);
				return;
			}
		} catch (DSProviderException ex) {
			if(LOGGER.isLoggable(Level.FINER)) {
				ex.printStackTrace();
			}
		}
		
		// try to reuse cache, if possible
		if(calendar.getVisibility() == DBCalendar.PUBLIC && RuntimeConfiguration.isPublicCacheEnabled() && !Utilities.isMultitenancyContext(calendar.getORG_ID())) {
			if(Utilities.respondIfNotModified(request, response, calendar.getLastModified().getTime())) {
				return;
			}
		}
		
		// for if-not-modified cache header, only set when non-private community
		long lastmodified = -1;
		if(calendar.getVisibility() == DBCalendar.PUBLIC && RuntimeConfiguration.isPublicCacheEnabled() && !Utilities.isMultitenancyContext(calendar.getORG_ID())) {
			lastmodified = calendar.getLastModified().getTime();
			WebCacheUtil.setupCacheHeaders(response, false, false, true, 1,  lastmodified);
		}
		
		List<DBEventTagStat> tags = new ArrayList<DBEventTagStat>();
		if(tagPre != null) {
			tagPre = StringUtils.strip(tagPre, "%");
			tagPre = tagPre.toLowerCase(request.getLocale());
		}
		tags = crud.getEventTagStatDao().getMostPopularEventTags(calendarUuid, tagPre, limit);
		
		response.setContentType("application/json; charset=utf-8");
		JSONArray arr = new JSONArray();
		for (Iterator<DBEventTagStat> it = tags.iterator(); it.hasNext();) {
			DBEventTagStat stat = it.next();
			arr.add(stat.getName());
		}
		response.getWriter().println("{}&&"+arr.serialize());
		response.flushBuffer();

		return;
	}
}
