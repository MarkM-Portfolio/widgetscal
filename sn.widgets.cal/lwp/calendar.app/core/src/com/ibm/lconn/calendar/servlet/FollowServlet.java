/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2016                                    */
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
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
import org.apache.commons.lang.StringUtils;

import com.ibm.icu.util.Calendar;
import com.ibm.icu.util.TimeZone;
import com.ibm.lconn.calendar.audit.CalendarEvents;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventFollowingRecord;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.CalendarException;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.util.CalendarOperation;
import com.ibm.lconn.calendar.util.ImpersonationUtil;
import com.ibm.lconn.calendar.util.IntHolder;
import com.ibm.lconn.calendar.util.Utilities;
import com.ibm.lconn.core.web.exception.InvalidImpersonationException;
import com.ibm.lconn.core.web.exception.InvalidUserImpersonationException;

public class FollowServlet extends BaseServlet {
	
	private static final long serialVersionUID = 7788869268287384208L;
	
	private static final String CLASS_NAME = FollowServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	// max page size
	public static final int MAX_PAGESIZE = 100;

	private CalendarEvents audit = new CalendarEvents();

	public void init(ServletConfig config) throws ServletException {
		super.init(config);
	}

	@Override
	public void service(ServletRequest req, ServletResponse resp) throws ServletException, IOException {
		HttpServletRequest request = (HttpServletRequest) req;
		if (!request.getMethod().equalsIgnoreCase("GET") && !request.getMethod().equalsIgnoreCase("DELETE")
				&& (request.getContentType() == null || request.getContentType().indexOf("application/atom+xml") == -1)) {
			respondForbidden((HttpServletResponse) resp);
			return;
		}
		super.service(req, resp);
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doGet", new Object[] { request, response });
		}
		
		String viewStart = request.getParameter(PARAMETER_VIEWSTART);
		String type = request.getParameter(PARAMETER_TYPE);
		String startPageString = request.getParameter(PARAMETER_PAGE);
		String pageSizeString = request.getParameter(PARAMETER_PAGESIZE);
		String timezoneId = request.getParameter(PARAMETER_TIMEZONE);
		String daylight = request.getParameter(PARAMETER_DAYLIGHT);
		
		if(viewStart == null) {
			respondBadRequest(request, response, "error.url.missing.param.parameter", PARAMETER_VIEWSTART);
			return;
		}
		
		int typeInt = 0x10;
		if ("follow".equalsIgnoreCase(type)) {
			typeInt = DBEventFollowingRecord.FOLLOW;
		} else if ("attend".equalsIgnoreCase(type)) {
			typeInt = DBEventFollowingRecord.ATTEND;
		} else if ("all".equalsIgnoreCase(type)) {
			typeInt = 0x10;
		}
		
		try {
			DBUser user = permissionHelper.getUser(request);
			if(user == null) {
				respondLogin(request, response);
				return;
			}
			
			TimeZone timezone = null;
			if(timezoneId != null) {
				try {
					timezone = TimeZone.getTimeZone(timezoneId);
				} catch (Exception e) {
					respondBadRequest(request, response, "error.url.invalid.param.value", PARAMETER_TIMEZONE);
					return;
				}
			}
			
			if(daylight != null) {
				try {
					String[] t = daylight.split("/");
					Calendar[] daylightSavingTime = new Calendar[]{Utilities.parseCalendar(t[0]), Utilities.parseCalendar(t[1])};
					timezone = Utilities.getNormalizedTimeZone(daylightSavingTime[1].getTimeZone().getRawOffset(), daylightSavingTime[0].getTime(), daylightSavingTime[1].getTime());
				} catch (Exception e) {
					respondBadRequest(request, response, "error.url.invalid.param.value", PARAMETER_DAYLIGHT);
					return;
				}
			}
			
			Calendar viewStartDate = null; 
			try {
				viewStartDate = Utilities.parseCalendar(viewStart);
				if(timezone != null) {
					viewStartDate.setTimeZone(timezone);
				} 
			} catch (Exception e) {
				respondBadRequest(request, response, "error.url.invalid.param.value", PARAMETER_VIEWSTART);
				return;
			}
			
			if(timezone == null) {
				timezone = viewStartDate.getTimeZone();
			}
			
			Date alldayViewStartDate = Utilities.getStartOfNextUTCDay(viewStartDate); 
			
			int startPage = 1, pageSize = 10;
			
			if(startPageString != null) {
				try {
					startPage = Integer.valueOf(startPageString).intValue();
				} catch(NumberFormatException nfe) {
					LOGGER.logp(Level.FINER, CLASS_NAME, "doGet","Illegal value passed for page number", nfe);	
				} 
				if(startPage <= 0) startPage = 1;
			}
			
			if(pageSizeString != null) {
				try {
					pageSize = Integer.valueOf(pageSizeString).intValue();
				} catch(NumberFormatException nfe) {
					LOGGER.logp(Level.FINER, CLASS_NAME, "doGet", "message", nfe);
				}
				if(pageSize <= 0) pageSize = 10;
				if(pageSize > MAX_PAGESIZE) pageSize = MAX_PAGESIZE;
			}
			
			// all day event is special, it has different end date/time in different timezone. We need to do some special for such cases here
			
			Set<String> includes = new HashSet<String>();
			Map<String, DBEventInstance> instancesMap = new HashMap<String, DBEventInstance>();
			
			{
				List<DBEventInstance> tItemsAroundStartDate = crud.getEventInstanceDao().getFollowedEventInstances(user, new Date(viewStartDate.getTimeInMillis() - Utilities.ONE_DAY), new Date(viewStartDate.getTimeInMillis() + Utilities.ONE_DAY), typeInt);
				for(DBEventInstance tinst : tItemsAroundStartDate ) {
					if((tinst.getIsAllDay() && Utilities.isInRange(tinst.getEndDate(), alldayViewStartDate, null)) || (!tinst.getIsAllDay() && Utilities.isInRange(tinst.getEndDate(), viewStartDate, null))) {
						includes.add(tinst.getEventInst_UUID());
						instancesMap.put(tinst.getEventInst_UUID(), tinst);
					}
				}
			}
			
			// do the real data fetching
			int total = 0;
			List<DBEventInstance> instances = new ArrayList<DBEventInstance>();
			
			int offset = (startPage - 1) * pageSize, length = pageSize;
			
			List<DBEventInstance> tInstances1 = new ArrayList<DBEventInstance>();
			{
				Date queryViewStartDate = new Date(viewStartDate.getTimeInMillis() + Utilities.ONE_DAY);
				IntHolder totalHolder = new IntHolder();
				int adjustedOffset = offset - includes.size();
				tInstances1 = crud.getEventInstanceDao().getUpcomingFollowedEventInstances(user, queryViewStartDate, typeInt, Math.max(adjustedOffset, 0), length, totalHolder);
				total = totalHolder.value + includes.size();
				if(adjustedOffset < 0) {
					for(String instId : includes) {
						tInstances1.add(instancesMap.get(instId));
					}
					Collections.sort(tInstances1, new DBEventInstance.ComparatorByStartDate(TimeZone.getTimeZone("UTC"), true));
					tInstances1 = tInstances1.subList(offset, Math.min(offset + length, tInstances1.size()));
				}
			}
			
			if(tInstances1.size() > 0) {
				List<DBEventInstance> tInstances2 = new ArrayList<DBEventInstance>();
				Date queryViewStartDate = new Date(tInstances1.get(0).getEndDate().getTime() - Utilities.ONE_DAY);
				Date queryViewEndDate = new Date(tInstances1.get(tInstances1.size() - 1).getEndDate().getTime() + Utilities.ONE_DAY);
				tInstances2 = crud.getEventInstanceDao().getFollowedEventInstances(user, queryViewStartDate, queryViewEndDate, typeInt);
				for(Iterator<DBEventInstance> iter = tInstances2.iterator(); iter.hasNext(); ) {
					DBEventInstance tinst = iter.next();
					if(tinst.getIsAllDay()) {
						if(!Utilities.isInRange(tinst.getEndDate(), alldayViewStartDate, null)) {
							iter.remove();
						}
					} else {
						if(!Utilities.isInRange(tinst.getEndDate(), viewStartDate, null)) {
							iter.remove();
						}
					}
				}
				Collections.sort(tInstances2, new DBEventInstance.ComparatorByStartDate(timezone, true));
				
				int tOffset = 0;
				Date tBaseDate = tInstances1.get(0).getStartDate(); String tBaseInstId = tInstances1.get(0).getEventInst_UUID();
				for(Iterator<DBEventInstance> iter = tInstances2.iterator(); iter.hasNext(); ) {
					DBEventInstance tinst = iter.next();
					if(viewStartDate != null) {
						if(tinst.getStartDate().getTime() < tBaseDate.getTime()) tOffset++;
					} else {
						if(tinst.getStartDate().getTime() > tBaseDate.getTime()) tOffset++;
					}
					if(tinst.getStartDate().getTime() == tBaseDate.getTime() && tinst.getEventInst_UUID().compareTo(tBaseInstId) < 0) {
						tOffset++;
					}
				}
				instances = tInstances2.subList(tOffset, Math.min(tOffset + length, tInstances2.size()));
			}
			
			if(LOGGER.isLoggable(Level.FINEST)){
				LOGGER.log(Level.FINEST, "Upcoming followed events = " + ((instances != null) ? instances.size() : 0));
			}
			
			Feed feed = generator.newAtomEventFeed(user, viewStartDate.getTime(), startPage, pageSize, total, request,typeInt);
			if(instances != null && instances.size() > 0) {
				for(Iterator<DBEventInstance> iter = instances.iterator(); iter.hasNext(); ) {
					DBEventInstance instance = iter.next();
					DBCalendar calendar = crud.getCalendarDAO().getCalendar(instance.getCalendar_UUID());
					Entry entry = generator.newAtomEventInstanceEntry(instance, instance.getEvent(), calendar, true, request);
					feed.addEntry(entry);
				}
			}
			respondOK(response, -1);
			writeFeed(response, feed);
		} catch (IOException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (DSProviderException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (CalendarException ex) {
			respondServerError(request, response, ex, ex.getLocalizedMessage(request.getLocale()));
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (Exception ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		}
		
		if(LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "doGet", "void");
		}
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doPost", new Object[] { request, response });
		}
		
		String eventUuid = request.getParameter(PARAMETER_EVENT_UUID);
		String instUuid = request.getParameter(PARAMETER_EVENT_INST_UUID);
		String type = request.getParameter(PARAMETER_TYPE);
		
		if(type == null) {
			respondBadRequest(request, response, "error.url.missing.param.parameter", PARAMETER_TYPE);
			return;
		}
		
		int typeInt =  -1; 
		if ("attend".equalsIgnoreCase(type)) {
			typeInt = DBEventFollowingRecord.ATTEND;
		} else if("follow".equalsIgnoreCase(type)) {
			typeInt = DBEventFollowingRecord.FOLLOW;
		} else {
			respondBadRequest(request, response, "error.url.invalid.param.value=", PARAMETER_TYPE);
			return;
		}
		
		DBCalendar calendar = null;
		DBEvent event = null;
		DBEventInstance instance = null;
		try {
			if(instUuid != null) {
				if((instance = crud.getEventInstanceDao().getEventInstance(instUuid)) != null) {
					if((event = instance.getEvent()) != null) {
						calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
					}
				}
				if(instance == null || event == null || calendar == null) {
					respondNotFound(response);
					return;
				}
			}
			else if (eventUuid != null) {
				if ((event = crud.getEventDAO().getEvent(eventUuid)) != null) {
					calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
				}
				if(event == null || calendar == null) {
					respondNotFound(response);
					return;
				}
			} else {
				respondBadRequest(request, response, "error.url.missing.param.parameter", "eventUuid");
				return;
			}
			
			if(instance == null) {
				if(!event.getIsRecurrence()) {
					instance = event.getEventInstances().get(0);
				}
			}
			
			DBUser user = permissionHelper.getUser(request);
			if(user == null && calendar.getVisibility().equals(DBCalendar.PRIVATE)) {
				respondLogin(request, response);
				return;
			}
			
			ImpersonationUtil impu = new ImpersonationUtil();
			DBUser impersonator = impu.getImpersonator(request, calendar.getORG_ID());
			if(impersonator == null){
				if(calendar.getVisibility().equals(DBCalendar.PRIVATE) && !permissionHelper.isUserMemberOf(request, calendar)) {
					respondForbidden(response);
					return;
				}
				
				if(calendar.getVisibility().equals(DBCalendar.PUBLIC)) {
					if(Utilities.isMultitenancyContext(calendar.getORG_ID()) && !Utilities.isSameOrganization(calendar.getORG_ID(), user.getORG_ID()) && !permissionHelper.isUserMemberOf(request, calendar)) {
						respondForbidden(response);
						return;
					}
				}
				
				if(typeInt != DBEventFollowingRecord.ATTEND && Utilities.isMultitenancyContext(calendar.getORG_ID()) && !Utilities.isSameOrganization(calendar.getORG_ID(), user.getORG_ID())) {
					respondForbidden(response);
					return;
				}
			}
			
			DBEventFollowingRecord followingRecord = null;
			if(instance != null) {
				if(impersonator == null){
					followingRecord = crud.addFollowing(user, instance, typeInt);
				} else {
					followingRecord = crud.addFollowing(impersonator, instance, typeInt);
				}
				audit.eventFollowed(calendar, event, instance, user, typeInt, impersonator);
			} else {
				if(impersonator == null){
					followingRecord = crud.addFollowing(user, event, typeInt);
				} else {
					followingRecord = crud.addFollowing(impersonator, event, typeInt);
				}
				audit.eventFollowed(calendar, event, user, typeInt, impersonator);
			}
			
			followingRecord.setFollowType(typeInt);
			Entry entry = generator.newAtomAttendeeEntry(followingRecord, instance, event, calendar, request);
			respondCreated(response);
			writeEntry(response, entry);
		} catch (InvalidUserImpersonationException iuie) {
			respondPreconditionFailed(request, response, iuie);
			LOGGER.throwing(CLASS_NAME, "doPost", iuie);
		} catch (InvalidImpersonationException iie) {
			respondForbidden(response);
			LOGGER.throwing(CLASS_NAME, "doPost", iie);
		} catch (IOException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPost", ex);
		} catch (DSProviderException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPost", ex);
		} catch (CalendarException ex) {
			respondServerError(request, response, ex, ex.getLocalizedMessage(request.getLocale()));
			LOGGER.throwing(CLASS_NAME, "doPost", ex);
		} catch (Exception ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPost", ex);
		}
		
		if(LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "doPost", "void");
		}
	}
	
	public void doDelete(HttpServletRequest request, HttpServletResponse response) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doDelete", new Object[] { request, response });
		}
		
		String eventUuid = request.getParameter(PARAMETER_EVENT_UUID);
		String instUuid = request.getParameter(PARAMETER_EVENT_INST_UUID);
		String type = request.getParameter(PARAMETER_TYPE);
		
		if(type == null) {
			respondBadRequest(request, response, "error.url.missing.param.parameter", PARAMETER_TYPE);
			return;
		}
		
		int typeInt =  -1; 
		if ("attend".equalsIgnoreCase(type)) {
			typeInt = DBEventFollowingRecord.ATTEND;
		} else if("follow".equalsIgnoreCase(type)) {
			typeInt = DBEventFollowingRecord.FOLLOW;
		} else {
			respondBadRequest(request, response, "error.url.invalid.param.value=", PARAMETER_TYPE);
			return;
		}
		
		DBCalendar calendar = null;
		DBEvent event = null;
		DBEventInstance instance = null;
		
		try {
			if(instUuid != null) {
				if((instance = crud.getEventInstanceDao().getEventInstance(instUuid)) != null) {
					if((event = instance.getEvent()) != null) {
						calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
					}
				}
				if(instance == null || event == null || calendar == null) {
					respondNotFound(response);
					return;
				}
			}
			else if (eventUuid != null) {
				if ((event = crud.getEventDAO().getEvent(eventUuid)) != null) {
					calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
				}
				if(event == null || calendar == null) {
					respondNotFound(response);
					return;
				}
			} else {
				respondBadRequest(request, response, "error.url.missing.param.parameter", "eventUuid");
				return;
			}
			
			if(instance == null) {
				if(!event.getIsRecurrence()) {
					instance = event.getEventInstances().get(0);
				}
			}
			
			DBUser user = permissionHelper.getUser(request);
			if(user == null && calendar.getVisibility().equals(DBCalendar.PRIVATE)) {
				respondLogin(request, response);
				return;
			}
			
			if(calendar.getVisibility().equals(DBCalendar.PRIVATE)) {
				if(!permissionHelper.isUserMemberOf(request, calendar)) {
					respondForbidden(response);
					return;
				}
			}
			
			if(calendar.getVisibility().equals(DBCalendar.PUBLIC)) {
				if(Utilities.isMultitenancyContext(calendar.getORG_ID()) && !Utilities.isSameOrganization(calendar.getORG_ID(), user.getORG_ID()) && !permissionHelper.isUserMemberOf(request, calendar)) {
					respondForbidden(response);
					return;
				}
			}
			
			if(instance != null) {
				boolean b = crud.removeFollowing(user, instance, typeInt);
				if(b) {
					audit.eventUnfollowed(calendar, event, instance, user,typeInt);
				} else {
					crud.removeFollowing(user, event, typeInt);
					audit.eventUnfollowed(calendar, event, user,typeInt);
				}
			} else {
				crud.removeFollowing(user, event, typeInt);
				audit.eventUnfollowed(calendar, event, user, typeInt);
			}
			
			respondSuccessWithNoContent(response);
		} catch (IOException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doDelete", ex);
		} catch (DSProviderException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doDelete", ex);
		} catch (CalendarException ex) {
			respondServerError(request, response, ex, ex.getLocalizedMessage(request.getLocale()));
			LOGGER.throwing(CLASS_NAME, "doDelete", ex);
		} catch (Exception ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doDelete", ex);
		}
		
		if(LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "doDelete", "void");
		}
	}
	
	public void doPut(HttpServletRequest request, HttpServletResponse response) {
		// not support update now
		respondForbidden(response);
	}
}
