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
import java.io.InputStream;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.abdera.model.Entry;

import com.ibm.lconn.calendar.audit.CalendarEvents;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.BadAtomEntryException;
import com.ibm.lconn.calendar.exception.CalendarException;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.util.CalendarOperation;

public class CalendarPreferencesServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;
	
	private static final String CLASS_NAME = CalendarPreferencesServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private CalendarEvents audit = new CalendarEvents();
	
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
	}

	@Override
	public void service(ServletRequest req, ServletResponse resp) throws ServletException, IOException {
		HttpServletRequest request = (HttpServletRequest) req;
		if(!request.getMethod().equalsIgnoreCase("GET") && (request.getContentType() == null || request.getContentType().indexOf("application/atom+xml") == -1)) {
			respondForbidden((HttpServletResponse)resp);
			return;
		}
		super.service(req, resp);
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) {
	    if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doGet", new Object[] { request, response });
		}
		
		try {	
			String calendarUuid = request.getParameter(PARAMETER_CALENDAR_UUID);
			
			DBCalendar calendar = null;
			if (calendarUuid != null) {
				LOGGER.finer("Find parameter 'calendarUuid', query for the calendar object.");
				calendar = crud.getCalendarDAO().getCalendar(calendarUuid);
				if(calendar == null) {
					LOGGER.finer("Calendar not found - 'calendarUuid=" + calendarUuid + "'");
					respondNotFound(response);
					return;
				}
			}
			
			// permission check
			int status = HttpServletResponse.SC_OK;
			DBUser user = permissionHelper.getUser(request);
			if(user == null && calendar != null && calendar.getVisibility().equals(DBCalendar.PRIVATE)) {
				LOGGER.finer("Private calendar, and user not login, redirect user to the login page.");
				respondLogin(request, response);
				return;
			}
			if(calendar!=null){
				status = permissionHelper.isUserAuthorized(request, calendar, null, CalendarOperation.VIEW);
			}
			
			if(status == HttpServletResponse.SC_OK) {
				Entry entry = generator.newAtomCalendarEntry(calendar, user, request);
				respondOK(response);
				writeEntry(response, entry);
			} // end of "if ok"
			else {
				response.setStatus(status);
			}
		} catch (IOException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (BadAtomEntryException ex) {
			respondBadRequest(request, response, ex);
			if (LOGGER.isLoggable(Level.FINER)) {
				LOGGER.throwing(CLASS_NAME, "doGet", ex);
			}
		} catch (CalendarException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (IllegalArgumentException ex){
			respondBadRequest(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (DSProviderException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (Exception ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		}
		
		if(LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "doGet", "void");
		}
	}
	
	public void doPut(HttpServletRequest request, HttpServletResponse response) {
	    if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doPut", new Object[] { request, response });
		}
		
		try {	
			String calendarUuid = request.getParameter(PARAMETER_CALENDAR_UUID);
			
			DBCalendar calendar = null;
			if (calendarUuid != null) {
				LOGGER.finer("Find parameter 'calendarUuid', query for the calendar object.");
				calendar = crud.getCalendarDAO().getCalendar(calendarUuid);
				if(calendar == null) {
					LOGGER.finer("Calendar not found - 'calendarUuid=" + calendarUuid + "'");
					respondNotFound(response);
					return;
				}
			}
			
			DBUser user = permissionHelper.getUser(request);
			
			// permission check
			int status = HttpServletResponse.SC_OK;
			if(!permissionHelper.isUserOwnerOf(request, calendar)) {
				status = HttpServletResponse.SC_FORBIDDEN;
			}
			
			if(status == HttpServletResponse.SC_OK) {
				InputStream is = request.getInputStream();
				DBCalendar updates = parser.parseCalendarForUpdate(is);
				
				if(!updates.getMembers_Role().equals(calendar.getMembers_Role())) {
					calendar = crud.updateCommunityCalendarRoleMapping(calendar.getCalendar_UUID(), updates.getMembers_Role());
					
					// audit
					audit.calendarUpdated(calendar, user);
				}
				
				Entry entry = generator.newAtomCalendarEntry(calendar, user, request);
				respondOK(response);
				writeEntry(response, entry);
			} // end of "if ok"
			else {
				response.setStatus(status);
			}
		} catch (IOException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (BadAtomEntryException ex) {
			respondBadRequest(request, response, ex);
			if (LOGGER.isLoggable(Level.FINER)) {
				LOGGER.throwing(CLASS_NAME, "doGet", ex);
			}
		} catch (CalendarException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (IllegalArgumentException ex){
			respondBadRequest(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (DSProviderException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (Exception ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		}
		
		if(LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "doGet", "void");
		}
	}
}
