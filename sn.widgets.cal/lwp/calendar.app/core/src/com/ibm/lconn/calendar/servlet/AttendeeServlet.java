/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.servlet;

import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.abdera.model.Entry;
import org.apache.abdera.model.Feed;

import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventFollowingRecord;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.BadAtomEntryException;
import com.ibm.lconn.calendar.exception.CalendarException;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.util.CalendarOperation;

public class AttendeeServlet extends BaseServlet {

	private static final long serialVersionUID = -2182922079785982318L;

	private static final String CLASS_NAME = AttendeeServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);

	private static final int PAGE_SIZE = 10;
	private static final int MAX_PAGESIZE = 100;

	public void init(ServletConfig config) throws ServletException {
		super.init(config);
	}

	@Override
	public void service(ServletRequest req, ServletResponse resp)
			throws ServletException, IOException {
		HttpServletRequest request = (HttpServletRequest) req;
		if (!request.getMethod().equalsIgnoreCase("GET")
				&& !request.getMethod().equalsIgnoreCase("DELETE")
				&& (request.getContentType() == null || request
						.getContentType().indexOf("application/atom+xml") == -1)) {
			respondForbidden((HttpServletResponse) resp);
			return;
		}
		super.service(req, resp);
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doGet", new Object[] { request, response });
		}

		try {
			String type = request.getParameter(PARAMETER_TYPE);
			
			String instUuid = request.getParameter(PARAMETER_EVENT_INST_UUID);
			String attendeeUuid = request.getParameter(PARAMETER_ATTENDEE_UUID);
			
			String _page = request.getParameter(PARAMETER_PAGE);
			String _ps = request.getParameter(PARAMETER_PAGESIZE);

			DBCalendar calendar = null;
			DBEvent event = null;
			DBEventInstance instance = null;
			DBEventFollowingRecord attendee = null;

			if (instUuid == null && attendeeUuid == null ) {
				respondBadRequest(request, response, "error.url.missing.param.parameter", PARAMETER_EVENT_INST_UUID);
				return;
			}
			
			if (type == null ) {
				respondBadRequest(request, response, "error.url.missing.param.parameter", PARAMETER_TYPE);
				return;
			}

			int typeInt = -1;
			if("attend".equalsIgnoreCase(type)) {
				typeInt = DBEventFollowingRecord.ATTEND;
			} else {
				respondBadRequest(request, response, "error.url.invalid.param.value", PARAMETER_TYPE);
				return;
			}
			
			if (attendeeUuid != null) {
				attendee = crud.getEventFollowingDao().getEventFollowingRecord(attendeeUuid);
				if((attendee.getFollowType() & typeInt) == 0) {
					attendee = null;
				}
				if (attendee != null) {
					event = crud.getEventDAO().getEvent(attendee.getEventUuid());
					calendar = crud.getCalendarDAO().getCalendar(attendee.getCalendarUuid());
					if(attendee.getItemType() == DBEventFollowingRecord.EVENT_INSTANCE) {
						instance = crud.getEventInstanceDao().getEventInstance(attendee.getItemUuid());
						if(instance == null) {
							respondNotFound(response);
							return;
						}
					} 
				} 
				if(attendee == null || event == null || calendar == null) {
					respondNotFound(response);
					return;
				}
			} 
			else if (instUuid != null) {
				if ((instance = crud.getEventInstanceDao().getEventInstance(instUuid)) != null) {
					if ((event = instance.getEvent()) != null) {
						calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
					}
				}
				if (instance == null || event == null || calendar == null) {
					respondNotFound(response);
					return;
				}
			} 

			if (instance == null) {
				if (!event.getIsRecurrence()) {
					instance = event.getEventInstances().get(0);
				}
			}

			// check permission
			DBUser user = permissionHelper.getUser(request);
			if (user == null && calendar.getVisibility().equals(DBCalendar.PRIVATE)) {
				respondLogin(request, response);
				return;
			}

			int status = permissionHelper.isUserAuthorized(request, calendar, null, CalendarOperation.VIEW);
			if (status == HttpServletResponse.SC_OK) {
				// CASE: attendees of the event
				if (attendee == null) {
					int page = 1, ps = PAGE_SIZE;
					try {
						if (_page != null) {
							page = Integer.parseInt(_page);
						}
						if (_ps != null) {
							ps = Integer.parseInt(_ps);
						}
					} catch(Exception ex) {
					}
					if (page < 1) {
						page = 1;
					}
					if (ps > MAX_PAGESIZE) {
						ps = MAX_PAGESIZE;
					}
					
					String itemUuid = instUuid;
					int itemType = DBEventFollowingRecord.EVENT_INSTANCE;
					
					int total = crud.getEventFollowingDao().getEventFollowingRecordsCount(instance.getEvent_UUID(), itemUuid, itemType, typeInt);
					Feed feed = generator.newAtomAttendeeFeed(instance, event, calendar, page, ps, total, request, typeInt);
					if (total > 0) {
						List<DBEventFollowingRecord> attendees = 
								crud.getEventFollowingDao().getEventFollowingRecords(instance.getEvent_UUID(), itemUuid, itemType, typeInt, (page - 1) * ps, ps);
						for (DBEventFollowingRecord t : attendees) {
							t.setFollowType(typeInt);
							Entry entry = generator.newAtomAttendeeEntry(t, instance, event, calendar, request);
							feed.addEntry(entry);
						}
					}
					respondOK(response);
					writeFeed(response, feed);
				}
				// CASE: single attendee
				else {
					attendee.setFollowType(typeInt);
					Entry entry = generator.newAtomAttendeeEntry(attendee, instance, event, calendar, request);
					respondOK(response);
					writeEntry(response, entry);
				}
			} else {
				response.setStatus(status);
			} // end of if (status == OK)

		} catch (IOException ex) {
			respondServerError(request, response, ex, null);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (BadAtomEntryException ex) {
			respondBadRequest(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (CalendarException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (IllegalArgumentException ex) {
			respondBadRequest(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (DSProviderException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (Exception ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "doGet", "void");
		}
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

	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		// not support update now
		respondForbidden(response);
	}
}
