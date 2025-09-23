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
package com.ibm.lconn.calendar.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringEscapeUtils;

import com.ibm.icu.text.Collator;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEventTagStat;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.util.CalendarOperation;
import com.ibm.lconn.calendar.util.RuntimeConfiguration;
import com.ibm.lconn.calendar.util.Utilities;
import com.ibm.lconn.core.web.cache.WebCacheUtil;

public class EventsTagCloudServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;

	private static final String CLASS_NAME = TagTypeAheadServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String calendarUuid = request.getParameter("calendarUuid");
		String tagsAsString = request.getParameter("tag");

		DBCalendar calendar = null;
		if (calendarUuid != null) {
			calendar = crud.getCalendarDAO().getCalendar(calendarUuid);
		} else {
			respondBadRequest(request, response, "error.url.missing.param.parameter", "calendarUuid");
			return;
		}
		if (calendar == null) {
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
			if (LOGGER.isLoggable(Level.FINER)) {
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

		List<DBEventTagStat> ret = new ArrayList<DBEventTagStat>();
		List<String> selectedTagList = null;
		if(tagsAsString != null) {
			selectedTagList = Utilities.splitStringAsTags(tagsAsString);
			if(selectedTagList.isEmpty()) {
				selectedTagList = null;
			}
		}
        
		if(selectedTagList == null) {
			ret = crud.getEventTagStatDao().getMostPopularEventTags(calendarUuid, null, 100);
		} else {
			ret = crud.getEventTagStatDao().getRelatedEventTags(calendarUuid, selectedTagList, 10);
		}
		
		// computing "intensity" for each returned tag
		double min = Integer.MAX_VALUE;
	    double max = Integer.MIN_VALUE;
	    for (DBEventTagStat tag: ret) {
            min = Math.min(min, tag.getTotal());
            max = Math.max(max, tag.getTotal());
        }
	    min = Math.log(1 + min);
	    max = Math.log(1 + max);
	    double range = Math.max(.01, max - min) * 1.0001;
	    for (DBEventTagStat tag: ret) {
            tag.setIntensity((int) (1 + Math.floor(5 * (Math.log(1 + tag.getTotal()) - min) / range)));
        }
	    
	    // sort by name, only for "tag cloud"
	    if(selectedTagList == null) {
	    	final Locale locale = request.getLocale();
	    	Collections.sort(ret, new Comparator<DBEventTagStat>() {
	            public int compare(DBEventTagStat obj1, DBEventTagStat obj2) throws ClassCastException {
	                Collator collator = Collator.getInstance(locale);
	                collator.setStrength(Collator.IDENTICAL);
	                return collator.compare(obj1.getName(), obj2.getName());
	            }
	        });
	    }
		
		// render the result

		response.setContentType("application/atomcat+xml;charset=UTF-8");
		
		StringBuffer buf = new StringBuffer();
		buf.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		buf.append("<categories xmlns=\"http://www.w3.org/2007/app\" xmlns:atom=\"http://www.w3.org/2005/Atom\" xmlns:snx=\"http://www.ibm.com/xmlns/prod/sn\">");
		buf.append("<atom:generator uri=\"http://www.ibm.com/xmlns/prod/sn\" version=\"4.0.0.0\">")
			.append("IBM Connections - Communities Calendar")
			.append("</atom:generator>");
		for(Iterator<DBEventTagStat> iter = ret.iterator(); iter.hasNext(); ) {
			DBEventTagStat t = iter.next();
			buf.append("<atom:category term=\"").append(StringEscapeUtils.escapeXml(t.getName())).append("\"")
				.append(" snx:frequency=\"").append(t.getTotal()).append("\"")
				.append(" snx:intensityBin=\"").append(t.getIntensity()).append("\"")
				.append("></atom:category>");
		}
		buf.append("</categories>");
		
		response.getWriter().println(buf.toString());
		response.flushBuffer();

		return;
	}
}
