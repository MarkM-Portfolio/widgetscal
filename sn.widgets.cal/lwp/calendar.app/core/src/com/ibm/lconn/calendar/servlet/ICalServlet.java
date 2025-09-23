/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.abdera.model.AtomDate;

import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEventFollowingRecord;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.CalendarException;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.util.CalendarOperation;
import com.ibm.lconn.calendar.util.ICalUtilities;
import com.ibm.lconn.calendar.util.RuntimeConfiguration;
import com.ibm.lconn.calendar.util.Utilities;
import com.ibm.lconn.core.gatekeeper.LCGatekeeper;
import com.ibm.lconn.core.gatekeeper.LCGatekeeperException;
import com.ibm.lconn.core.gatekeeper.LCSupportedFeature;
import com.ibm.lconn.core.web.cache.WebCacheUtil;

public class ICalServlet extends BaseServlet {
	private static final long serialVersionUID = -6948778768831620178L;
	
	private static final String CLASS_NAME = ICalServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
	} 
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doGet", new Object[] { request, response });
		}
		boolean hasExportICS = LCSupportedFeature.CALENDAR_EXPORT_ICAL_FILE.isEnabledByDefault();
		try {
			hasExportICS = LCGatekeeper.isEnabled(LCSupportedFeature.CALENDAR_EXPORT_ICAL_FILE, request);
		} catch (LCGatekeeperException e1) {
			// We fall back to default value of Gatekeeper setting for LCSupportedFeature.CALENDAR_EXPORT_ICAL_FILE
		}

		String calendarUuid = request.getParameter(PARAMETER_CALENDAR_UUID);
		String eventInstanceUuid = request.getParameter(PARAMETER_EVENT_INST_UUID);
		String type = request.getParameter(PARAMETER_TYPE);
		String start = request.getParameter(PARAMETER_VIEWSTART);
		String end = request.getParameter(PARAMETER_VIEWEND);
		String tagsString = request.getParameter(PARAMETER_TAGS);
		
		int typeInt = 0x10;
		if ("follow".equalsIgnoreCase(type)) {
			typeInt = DBEventFollowingRecord.FOLLOW;
		} else if ("attend".equalsIgnoreCase(type)) {
			typeInt = DBEventFollowingRecord.ATTEND;
		} else if ("all".equalsIgnoreCase(type)) {
			typeInt = 0x10;
		} else {
			type = null;
		}
		
		DBUser user = null;
		try {
			user = permissionHelper.getUser(request);
		} catch (DSProviderException e) {
			user = null;
		}
		if(type != null) {
			if(user == null) {
				respondLogin(request, response);
				return;
			} 
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			if (eventInstanceUuid != null)
				LOGGER.log(Level.FINER, "eventInstanceUuid = " + eventInstanceUuid);
			if(calendarUuid != null)
				LOGGER.log(Level.FINER, "calendarUuid = " + calendarUuid + ", start = " + (start == null ? "" : start) + ", end = " + (end == null ? "" : end));
			if(type != null)
				LOGGER.log(Level.FINER, "type = " + type + ", start = " + (start == null ? "" : start) + ", end = " + (end == null ? "" : end));
		}
		
		Calendar cal = Calendar.getInstance(request.getLocale());
		cal.set(Calendar.HOUR, 0);
		cal.set(Calendar.AM_PM, Calendar.AM);
		cal.add(Calendar.MONTH, RuntimeConfiguration.getIntValue("icalFeed.startFrom")); 
		Date startDate = cal.getTime();
		
		cal = Calendar.getInstance(request.getLocale());
		cal.set(Calendar.HOUR, 0);
		cal.set(Calendar.AM_PM, Calendar.AM);
		cal.add(Calendar.MONTH, RuntimeConfiguration.getIntValue("icalFeed.endTo")); 
		Date endDate = cal.getTime();
		
		// Use the passed in parameters, if set.  Otherwise, use the default window constructed above
		if(start != null && (start = start.trim()).length() > 0)
		{
			startDate = AtomDate.parse(start);
		}
		if(end != null && (end = end.trim()).length() > 0)
		{
			endDate = AtomDate.parse(end);
		}

		if (hasExportICS) {
			if ((calendarUuid == null || (calendarUuid = calendarUuid.trim()).length() <= 0) && (eventInstanceUuid == null || (eventInstanceUuid = eventInstanceUuid.trim()).length() <= 0) && type == null) {
				respondBadRequest(request, response, "error.url.missing.param.parameter", "calendarUuid / eventInstanceUuid"); //@CCE
				return;
			}
		} else {
			if ((calendarUuid == null || (calendarUuid = calendarUuid.trim()).length() <= 0) && type == null) {
				respondBadRequest(request, response, "error.url.missing.param.parameter", "calendarUuid"); //@CCE
				return;
			}
		}
		
		try {
			DBCalendar calendar = null;
			if (calendarUuid != null) {
				calendar = crud.getCalendarDAO().getCalendar(calendarUuid);
				if(calendar == null) {
					respondNotFound(response);
				}
			}
			
			List<String> tags = null;
			if(tagsString != null) {
				tags = Utilities.splitStringAsTags(tagsString);
				if(tags.isEmpty()) {
					tags = null;
				}
			}
			
			if(calendar != null) {
				// Check if authenticated/authorized
				if (LOGGER.isLoggable(Level.FINER)) {
					LOGGER.log(Level.FINER,"Current user -> " + user);
				}
				if(user == null && calendar.getVisibility().equals(DBCalendar.PRIVATE)) {
					response.setHeader("WWW-Authenticate", HttpServletRequest.BASIC_AUTH + " real=\"ibm-connections\"");
        			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        			return;
				}
				int status = permissionHelper.isUserAuthorized(request, calendar, null, CalendarOperation.VIEW);
				if (HttpServletResponse.SC_OK != status) {
					if (LOGGER.isLoggable(Level.FINER)) {
						LOGGER.log(Level.FINER, "User is not authorized to access the calendar whose id is " + calendar.getCalendar_UUID());
					}
					response.setStatus(status);
					return;
				}
			}
			
			if(calendar != null && calendar.getVisibility() == DBCalendar.PUBLIC && RuntimeConfiguration.isPublicCacheEnabled() && !Utilities.isMultitenancyContext(calendar.getORG_ID())) {
				WebCacheUtil.setupCacheHeaders(response, false, false, false, 600,  -1);
			}

			OutputStream out = response.getOutputStream();
			OutputStreamWriter writer = new OutputStreamWriter(out, "utf-8");

			List<DBEventInstance> instances = null;
			if (type == null) {
				if (hasExportICS) {
					// Event instance UUID overrides calendar UUID
					// that is, if we're given both event instance uuid and calendar uuid, 
					// then we will ignore calendar uuid and only process with event instance uuid
					if (eventInstanceUuid == null) {
						instances = crud.getEventInstanceDao().getEventInstances(calendarUuid, null, tags, startDate, endDate, 0, -1);
					} else {
						DBEventInstance evtInst = crud.getEventInstanceDao().getEventInstance(eventInstanceUuid);
						
						instances = new ArrayList<DBEventInstance>();
						instances.add(evtInst);
					}
				} else {
					instances = crud.getEventInstanceDao().getEventInstances(calendarUuid, null, tags, startDate, endDate, 0, -1);
				}
			} else {
				instances = crud.getEventInstanceDao().getFollowedEventInstances(user, startDate, endDate, typeInt);
			}
			
			String text = ICalUtilities.exportICalString(instances);

			if (LOGGER.isLoggable(Level.FINER)) {
				LOGGER.log(Level.FINER,"iCalendar text to be returned in the response: " + text);
			}

			response.setStatus(HttpServletResponse.SC_OK);
			response.setContentType("text/calendar; charset=utf-8");
			response.setContentLength(text.getBytes("utf-8").length);
			response.setHeader("Content-Disposition", "attachment; filename=\"" + "calendar.ics" + "\"");

			writer.write(text);
			writer.flush();
		} catch(CalendarException ex) {
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
			respondServerError(request, response, ex, ex.getLocalizedMessage(request.getLocale()));
		} catch (Exception ex) {
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
			respondServerError(request, response, ex);
		}
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

	public void doPut(HttpServletRequest request, HttpServletResponse response) {
		// not support update now
		respondForbidden(response);
	}

	public void doDelete(HttpServletRequest request,
			HttpServletResponse response) {
		// not support update now
		respondForbidden(response);
	}

}
