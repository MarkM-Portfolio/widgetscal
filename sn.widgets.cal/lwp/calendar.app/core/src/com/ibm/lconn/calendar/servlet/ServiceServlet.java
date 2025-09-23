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

package com.ibm.lconn.calendar.servlet;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.abdera.model.Service;

import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.CalendarException;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.util.CalendarOperation;


public class ServiceServlet extends BaseServlet {
	private static final long serialVersionUID = 938135004735973078L;
	
	private static final String CLASS_NAME = ServiceServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doGet", new Object[] { request, response });
		}
		
		try {
			String calendarUuid = request.getParameter(PARAMETER_CALENDAR_UUID);
			LOGGER.finer("Request parameter: calendarUuid = '" + (calendarUuid == null ? "<null>" : calendarUuid) + "'");
			
			DBCalendar calendar = null;
			if (calendarUuid != null) {
				calendar = crud.getCalendarDAO().getCalendar(calendarUuid);
				if(calendar == null) {
					LOGGER.finer("Calendar not found! [calendarUuid = '" + calendarUuid + "'");
					respondNotFound(response);
					return;
				}
			} else {
				LOGGER.finer("Missing required request parameter: 'calendarUuid'");
				respondBadRequest(request, response, "error.url.missing.param.parameter", PARAMETER_CALENDAR_UUID);
				return;
			}
			
			DBUser user = permissionHelper.getUser(request);
			if(user == null) {
				LOGGER.finer("User not login.");
			} else {
				LOGGER.finer("Login user: " + user.getUserExtID());
			}
			
			// Check if authenticated/authorized
			int status = HttpServletResponse.SC_OK;
			status = permissionHelper.isUserAuthorized(request, calendar, null, CalendarOperation.VIEW);	
			
			if(status == HttpServletResponse.SC_OK) {
				LOGGER.finer("User authorized, preparing service document");
				Service service = generator.newAtomService(calendar, request);
				respondOK(response, "application/atomsvc+xml;charset=UTF-8");
				writeService(response, service);
			}
			else {
				response.setStatus(status);
			}
		} catch (CalendarException ex) {
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
			respondServerError(request, response, ex);
		} catch (DSProviderException ex) {
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
			respondServerError(request, response, ex);
		}
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
		response.setHeader("Allow", "GET");
	}
	
	public void doDelete(HttpServletRequest request, HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
		response.setHeader("Allow", "GET");
	}
	
	public void doPut(HttpServletRequest request, HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
		response.setHeader("Allow", "GET");
	}
}
