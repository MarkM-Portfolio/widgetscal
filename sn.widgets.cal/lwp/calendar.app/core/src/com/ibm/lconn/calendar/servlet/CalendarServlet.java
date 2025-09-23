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

/**
 * @author skomard
 */

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
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
import com.ibm.lconn.calendar.exception.BadAtomEntryException;
import com.ibm.lconn.calendar.exception.CalendarException;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.util.CalendarOperation;
import com.ibm.lconn.calendar.util.ImpersonationUtil;
import com.ibm.lconn.calendar.util.RuntimeConfiguration;
import com.ibm.lconn.calendar.util.UserUtilities;
import com.ibm.lconn.calendar.util.Utilities;
import com.ibm.lconn.core.web.exception.InvalidImpersonationException;
import com.ibm.lconn.core.web.exception.InvalidUserImpersonationException;

public class CalendarServlet extends BaseServlet {
	private static final long serialVersionUID = -747639417764109179L;
	
	// attributes
	public static final Long VIEW_UPPER_LIMIT_MILLIS = 6048000000L;
	public static final Long VIEW_LOWER_LIMIT_MILLIS = 86400000L;
	
	private static final String CLASS_NAME = CalendarServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	// max page size
	public static final int MAX_PAGESIZE = RuntimeConfiguration.getIntValue("paging.maxPagingSize");
	
	private CalendarEvents audit = new CalendarEvents();

	public void init(ServletConfig config) throws ServletException {
		super.init(config);
	}
	
	@Override
	public void service(ServletRequest req, ServletResponse resp) throws ServletException, IOException {
		HttpServletRequest request = (HttpServletRequest) req;
		if(!request.getMethod().equalsIgnoreCase("GET") && !request.getMethod().equalsIgnoreCase("DELETE") 
				&& (request.getContentType() == null || request.getContentType().indexOf("application/atom+xml") == -1)) {
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
			String eventUuid = request.getParameter(PARAMETER_EVENT_UUID);
			String startDateString = request.getParameter(PARAMETER_STARTDATE);
			String eventInstanceId = request.getParameter(PARAMETER_EVENT_INST_UUID);
			String viewStart = request.getParameter(PARAMETER_VIEWSTART);
			String viewEnd = request.getParameter(PARAMETER_VIEWEND);
			String startPageString = request.getParameter(PARAMETER_PAGE);
			String pageSizeString = request.getParameter(PARAMETER_PAGESIZE);
			String tagsString = request.getParameter(PARAMETER_TAGS);
			String modeString = request.getParameter(PARAMETER_MODE);
			String typeString = request.getParameter(PARAMETER_TYPE);
			String userIdString = request.getParameter(PARAMETER_USERID);
			String anonymousString = request.getParameter(PARAMETER_ANONYMOUS);
			String timezoneId = request.getParameter(PARAMETER_TIMEZONE);
			String daylight = request.getParameter(PARAMETER_DAYLIGHT);
			Boolean shortSummary = null ;
			if("full".equals(request.getParameter(PARAMETER_SUMMARY))){
				shortSummary = false;
			} else if("short".equals(request.getParameter(PARAMETER_SUMMARY))){
				shortSummary = true;
			}
			
			LOGGER.finer("Preparing...");
			
			DBEventInstance inst = null;
			DBEvent event = null;
			DBCalendar calendar = null;
			if(eventInstanceId != null) {
				LOGGER.finer("Find parameter 'eventInstUuid', query for the event instance object.");
				inst = crud.getEventInstanceDao().getEventInstance(eventInstanceId);
				if(inst == null) {
					LOGGER.finer("Event instance not found - 'eventInstUuid=" + eventInstanceId + "'");
					respondNotFound(response);
					return;
				} else {
					LOGGER.finer("Event instance found, query the event/calendar information");
					event = inst.getEvent();
					calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
					if(event == null || calendar == null) {
						LOGGER.finer("Fail to query the event/calendar info for event instance '" + eventInstanceId + "'. Possible Cause: bad database data.");
						respondNotFound(response);
						return;
					}
				}
			} else if (eventUuid != null) {
				LOGGER.finer("Find parameter 'eventUuid', query for the event object.");
				event = crud.getEventDAO().getEvent(eventUuid);
				if(event == null) {
					LOGGER.finer("Event not found - 'eventUuid=" + eventUuid + "'");
					respondNotFound(response);
					return;
				} else {
					LOGGER.finer("Event found, query the calendar information");
					calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
					if(calendar == null) {
						LOGGER.finer("Fail to query the calendar info for event '" + eventUuid + "'. Possible Cause: bad database data.");
						respondNotFound(response);
						return;
					}
				}
			} else if (calendarUuid != null) {
				LOGGER.finer("Find parameter 'calendarUuid', query for the calendar object.");
				calendar = crud.getCalendarDAO().getCalendar(calendarUuid);
				if(calendar == null) {
					LOGGER.finer("Calendar not found - 'calendarUuid=" + calendarUuid + "'");
					respondNotFound(response);
					return;
				}
			}
			
			if(inst == null && event != null && startDateString != null) {
				LOGGER.finer("Find parameter 'startDate', query for the event instance '" + startDateString  + "'");
				Date startDate = null;
				try {
					startDate = parser.parseDate(startDateString);
				} catch (Exception e) {
					respondBadRequest(request, response, "error.url.invalid.param.value", "startDate");
					return;
				}
				if(startDate != null) {
					inst = crud.getEventInstanceDao().getEventInstance(event.getEvent_UUID(), startDate);
				}
				if(inst == null) {
					LOGGER.finer("Event instance not found. [EventUuid: " + eventUuid + ", Instance Date: " + startDate.getTime() + "(" + startDateString + ")]");
					respondNotFound(response);
					return;
				}
			}
			
			List<String> tags = null;
			if(tagsString != null) {
				tags = Arrays.asList(StringUtils.split(tagsString.trim(), " ,\n\r\f\t\u3000"));
				if(tags.isEmpty()) {
					tags = null;
				}
			}
			
			DBUser queryUser = null;
			if(userIdString != null) {
				try {
					queryUser = UserUtilities.findUserByExtId(userIdString, false);
				} catch (Exception e) {
					queryUser = null;
				}
				
				if(queryUser == null) {
					LOGGER.finer("User not exist: '" + userIdString + "'.");
					respondNotFound(response);
					return;
				}
			}
			
			// permission check
			int status = HttpServletResponse.SC_OK;
			DBUser user = permissionHelper.getUser(request);
			if(calendar != null) {
				if(user == null && calendar.getVisibility().equals(DBCalendar.PRIVATE)) {
					LOGGER.finer("Private calendar, and user not login, redirect user to the login page.");
					respondLogin(request, response);
					return;
				}
				status = permissionHelper.isUserAuthorized(request, calendar, null, CalendarOperation.VIEW);
			}
			
			if(status == HttpServletResponse.SC_OK) {
				// try to reuse cache, if possible
				if(calendar != null && calendar.getVisibility() == DBCalendar.PUBLIC && RuntimeConfiguration.isPublicCacheEnabled() && !Utilities.isMultitenancyContext(calendar.getORG_ID()) && "true".equalsIgnoreCase(anonymousString)) {
					LOGGER.finer("Check Cache: If cache exists, and calendar not changed since then, return '304 Not Modified'");
					if(Utilities.respondIfNotModified(request, response, calendar.getLastModified().getTime())) {
						return;
					}
				}
				
				// for if-not-modified cache header, only set when non-private community
				long lastmodified = -1;
				if(calendar != null && calendar.getVisibility() == DBCalendar.PUBLIC && RuntimeConfiguration.isPublicCacheEnabled() &&!Utilities.isMultitenancyContext(calendar.getORG_ID()) && "true".equalsIgnoreCase(anonymousString)) {
					lastmodified = calendar.getLastModified().getTime();
				}
				
				if(inst != null) {
					LOGGER.finer("Return atom entry/feed for event instance: " + inst.getEventInst_UUID());
					if("full".equals(modeString)) {
						LOGGER.finer("MODE = 'full': return atom entry for event instance '" + inst.getEventInst_UUID()  + "', with info of its parent event");
						Feed feed = generator.newAtomEventFeed((String)request.getAttribute("REMOTE_URL"), request);
						feed.addEntry(generator.newAtomEventInstanceEntry(inst, event, calendar, false, request));
						feed.addEntry(generator.newAtomEventEntry(event, calendar, event.getModifiedOn(), request));
						respondOK(response, lastmodified);
						writeFeed(response, feed);
					} else {
						LOGGER.finer("Default: Return atom entry for event instance: " + inst.getEventInst_UUID());
						Entry entry = generator.newAtomEventInstanceEntry(inst, event, calendar, false, request);
						respondOK(response, lastmodified);
						writeEntry(response, entry);
					}
				} else if(event != null) {	// Detailed info about an event Instance is requested
					LOGGER.finer("Return atom entry/feed for event: " + event.getEvent_UUID());
					if("summary".equals(modeString)) {
						LOGGER.finer("MODE = 'summary': return atom entry for event '" + event.getEvent_UUID()  + "', with summary info only");
						Entry entry = generator.newAtomEventEntry(event, calendar, event.getModifiedOn(), request);
						respondOK(response, lastmodified);
						writeEntry(response, entry);
					} else if("list".equals(modeString)) {
						LOGGER.finer("MODE = 'list': return a list of instances for event '" + event.getEvent_UUID()  + "'");
						List<DBEventInstance> instances = crud.getEventInstanceDao().getEventInstances(null, event.getEvent_UUID(), null, null, null, 0, -1);
						Feed feed = null;
						if(instances != null && instances.size() > 0) {
							Date lastUpdated = event.getModifiedOn();
							for(DBEventInstance instance : instances) {
								if(instance.getModifiedOn() != null && instance.getModifiedOn().after(lastUpdated)) {
									lastUpdated = instance.getModifiedOn();
								}
							}
							
							feed = generator.newAtomEventFeed(event, lastUpdated, "list", request);
							for(Iterator<DBEventInstance> iter = instances.iterator(); iter.hasNext(); ) {
								DBEventInstance instance = iter.next();
								Entry entry = generator.newAtomEventInstanceEntry(instance, instance.getEvent(), calendar, shortSummary==null?true:shortSummary, request);
								feed.addEntry(entry);
							}
						} else {
							feed = generator.newAtomEventFeed(event, event.getModifiedOn(), null, request);
						}
						respondOK(response, lastmodified);
						writeFeed(response, feed);
					} else {
						LOGGER.finer("Default: return atom entry for the first event instance, of event '" + event.getEvent_UUID()  + "'");
						List<DBEventInstance> instances = crud.getEventInstanceDao().getEventInstances(null, event.getEvent_UUID(), null, null, null, 0, 1);
						if(instances.size() == 0) {
							LOGGER.finer("Empty event '" + eventUuid + "'. No instance found for this event.");
							respondNotFound(response);
						} else {
							DBEventInstance instance = instances.get(0);
							Entry entry = generator.newAtomEventInstanceEntry(instance, event, calendar, false, request);
							respondOK(response, lastmodified);
							writeEntry(response, entry);
						}
					}
				} else if((calendar != null || queryUser != null) && "event".equals(typeString)) {
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
					
					String calendar_UUID = (calendar == null ? null : calendar.getCalendar_UUID());
					String queryUser_UUID = (queryUser == null ? null : queryUser.getUserUUID());
					
					List<DBEvent> events = new ArrayList<DBEvent>();
					int total = crud.getEventDAO().getEventsByCalendarCount(calendar_UUID, queryUser_UUID, tags, user);
					if(total > 0) {
						int offset = (startPage - 1) * pageSize;
						int length = pageSize;
						events = crud.getEventDAO().getEventsByCalendar(calendar_UUID, queryUser_UUID, tags, user, offset, length);
					}
					
					if(LOGGER.isLoggable(Level.FINEST)){
						LOGGER.log(Level.FINEST, "Community events = " + ((events != null) ? events.size() : 0));
					}
					
					Feed feed = generator.newAtomEventFeed(calendar, null, null, queryUser, tags, "event", startPage, pageSize, total, request);
					if(events != null && events.size() > 0) {
						for(Iterator<DBEvent> iter = events.iterator(); iter.hasNext(); ) {
							DBEvent tEvent = iter.next();
							DBCalendar tCalendar = crud.getCalendarDAO().getCalendar(tEvent.getCalendar_UUID());
							Entry entry = generator.newAtomEventEntry(tEvent, tCalendar, tEvent.getModifiedOn(), request);
							feed.addEntry(entry);
						}
					}
					respondOK(response, lastmodified);
					writeFeed(response, feed);
				} else if (calendar != null && (viewStart != null || viewEnd != null)) {	// Instances of events for a time frame are requested
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
					
					Calendar viewStartDate = null, viewEndDate = null; 
					if(viewStart != null) {
						try {
							viewStartDate = Utilities.parseCalendar(viewStart);
							if(timezone != null) {
								viewStartDate.setTimeZone(timezone);
							} 
						} catch (Exception e) {
							respondBadRequest(request, response, "error.url.invalid.param.value", PARAMETER_VIEWSTART);
							return;
						}
					}
					if(viewEnd != null) {
						try {
							viewEndDate = Utilities.parseCalendar(viewEnd);
							if(timezone != null) {
								viewEndDate.setTimeZone(timezone);
							}
						} catch (Exception e) {
							respondBadRequest(request, response, "error.url.invalid.param.value", PARAMETER_VIEWEND);
							return;
						}
					}
					
					if(timezone == null) {
						if(viewStartDate != null) {
							timezone = viewStartDate.getTimeZone();
						} else {
							timezone = viewEndDate.getTimeZone();
						}
					}
					
					Date alldayViewStartDate = viewStartDate == null ? null : Utilities.getStartOfNextUTCDay(viewStartDate); 
					Date alldayViewEndDate = viewEndDate == null ? null : Utilities.getStartOfNextUTCDay(viewEndDate);
					
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
					
					Set<String> includes = new HashSet<String>(), includesS = new HashSet<String>(), includesE = new HashSet<String>();
					Map<String, DBEventInstance> instancesMap = new HashMap<String, DBEventInstance>();
					{
						if(viewStartDate != null) {
							List<DBEventInstance> tItemsAroundStartDate = crud.getEventInstanceDao().getEventInstances(calendar.getCalendar_UUID(), null, tags, new Date(viewStartDate.getTimeInMillis() - Utilities.ONE_DAY), new Date(viewStartDate.getTimeInMillis() + Utilities.ONE_DAY), 0, -1);
							for(DBEventInstance tinst : tItemsAroundStartDate ) {
								if((tinst.getIsAllDay() && Utilities.isInRange(tinst.getEndDate(), alldayViewStartDate, alldayViewEndDate)) || (!tinst.getIsAllDay() && Utilities.isInRange(tinst.getEndDate(), viewStartDate, viewEndDate))) {
									includesS.add(tinst.getEventInst_UUID());
									includes.add(tinst.getEventInst_UUID());
									instancesMap.put(tinst.getEventInst_UUID(), tinst);
								}
							}
							LOGGER.finer("Items around start date: "+ includesS.size());
						}
						if(viewEndDate != null) {
							List<DBEventInstance> tItemsAroundEndDate = crud.getEventInstanceDao().getEventInstances(calendar.getCalendar_UUID(), null, tags, new Date(viewEndDate.getTimeInMillis() - Utilities.ONE_DAY), new Date(viewEndDate.getTimeInMillis() + Utilities.ONE_DAY), 0, -1);
							for(DBEventInstance tinst : tItemsAroundEndDate ) {
								if((tinst.getIsAllDay() && Utilities.isInRange(tinst.getEndDate(), alldayViewStartDate, alldayViewEndDate)) || (!tinst.getIsAllDay() && Utilities.isInRange(tinst.getEndDate(), viewStartDate, viewEndDate))) {
									includesE.add(tinst.getEventInst_UUID());
									includes.add(tinst.getEventInst_UUID());
									instancesMap.put(tinst.getEventInst_UUID(), tinst);
								}
							}
							LOGGER.finer("Items around end date: "+ includesE.size());
						}
					}
					
					// do the real data fetching
					int total = 0;
					List<DBEventInstance> instances = new ArrayList<DBEventInstance>();
					
					int offset = (startPage - 1) * pageSize, length = pageSize;
					
					Date queryViewStartDate = null, queryViewEndDate = null;
					if(viewStartDate != null) queryViewStartDate = new Date(viewStartDate.getTimeInMillis() + Utilities.ONE_DAY);
					if(viewEndDate != null) queryViewEndDate = new Date(viewEndDate.getTimeInMillis() - Utilities.ONE_DAY);
					
					if(queryViewStartDate != null && queryViewEndDate != null && !queryViewEndDate.after(queryViewStartDate)) {
						total = includes.size();
						instances = new ArrayList<DBEventInstance>();
						for(String instId : includes) {
							instances.add(instancesMap.get(instId));
						}
						Collections.sort(instances, new DBEventInstance.ComparatorByStartDate(timezone, viewStartDate != null));
						instances = instances.subList(offset, Math.min(offset + length, instances.size()));
					} else {
						total = crud.getEventInstanceDao().getEventInstancesCount(calendar.getCalendar_UUID(), null, tags, queryViewStartDate, queryViewEndDate);
						total = total + includes.size();

						List<DBEventInstance> tInstances1 = new ArrayList<DBEventInstance>();
						if(total > 0) {
							int adjustedOffset = viewStartDate != null ? offset - includesS.size() : offset - includesE.size();
							tInstances1 = crud.getEventInstanceDao().getEventInstances(calendar.getCalendar_UUID(), null, tags, queryViewStartDate, queryViewEndDate, Math.max(0, adjustedOffset), length);

							LOGGER.finer("offset: "+ offset);
							LOGGER.finer("includesS.size(): "+ includesS.size());
							LOGGER.finer("includesE.size(): "+ includesE.size());
							LOGGER.finer("adjustedOffset: "+ adjustedOffset);
							LOGGER.finer("queryViewStartDate: "+ queryViewStartDate);
							LOGGER.finer("queryViewEndDate: "+ queryViewEndDate);
							LOGGER.finer("tInstances1.size(): "+ tInstances1.size());
							
							if(adjustedOffset < 0) {
								// if part/all entries are in start/end part, use the start/end part to compensate the entries
								for(String instId : (viewStartDate != null ? includesS : includesE)) {
									tInstances1.add(instancesMap.get(instId));
								}
								// if it reaches end, we append the ending part
								if(viewStartDate != null && offset + length > tInstances1.size()) {
									for(String instId : includesE) {
										tInstances1.add(instancesMap.get(instId));
									}
								}

								Collections.sort(tInstances1, new DBEventInstance.ComparatorByStartDate(TimeZone.getTimeZone("UTC"), viewStartDate != null));
								tInstances1 = tInstances1.subList(offset, Math.min(offset + length, tInstances1.size()));
							} else {
								// directly use the entries in the middle part
								// if it reaches end, we append the ending part
								if(viewStartDate != null && length > tInstances1.size()) {
									for(String instId : includesE) {
										tInstances1.add(instancesMap.get(instId));
									}
									Collections.sort(tInstances1, new DBEventInstance.ComparatorByStartDate(TimeZone.getTimeZone("UTC"), viewStartDate != null));
									tInstances1 = tInstances1.subList(0, Math.min(length, tInstances1.size()));
								}	
							}
						}
						
						if(tInstances1.size() > 0) {
							if(viewStartDate != null) {
								queryViewStartDate = new Date(tInstances1.get(0).getEndDate().getTime() - Utilities.ONE_DAY);
								queryViewEndDate = new Date(tInstances1.get(tInstances1.size() - 1).getEndDate().getTime() + Utilities.ONE_DAY);
							} else {
								queryViewStartDate = new Date(tInstances1.get(tInstances1.size() - 1).getEndDate().getTime() - Utilities.ONE_DAY);
								queryViewEndDate = new Date(tInstances1.get(0).getEndDate().getTime() + Utilities.ONE_DAY);
							}
							List<DBEventInstance> tInstances2 = crud.getEventInstanceDao().getEventInstances(calendar.getCalendar_UUID(), null, tags, queryViewStartDate, queryViewEndDate, 0, -1);
							for(Iterator<DBEventInstance> iter = tInstances2.iterator(); iter.hasNext(); ) {
								DBEventInstance tinst = iter.next();
								if(tinst.getIsAllDay()) {
									if(!Utilities.isInRange(tinst.getEndDate(), alldayViewStartDate, alldayViewEndDate)) {
										iter.remove();
									}
								} else {
									if(!Utilities.isInRange(tinst.getEndDate(), viewStartDate, viewEndDate)) {
										iter.remove();
									}
								}
							}
							Collections.sort(tInstances2, new DBEventInstance.ComparatorByStartDate(timezone, viewStartDate != null));
							
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
					}
					
					Feed feed = generator.newAtomEventFeed(calendar, viewStartDate != null ? viewStartDate.getTime() : null, viewEndDate != null ? viewEndDate.getTime() : null, null, tags, null, startPage, pageSize, total, request);
					if(instances != null && instances.size() > 0) {
						for(Iterator<DBEventInstance> iter = instances.iterator(); iter.hasNext(); ) {
							DBEventInstance instance = iter.next();
							Entry entry = generator.newAtomEventInstanceEntry(instance, instance.getEvent(), calendar,shortSummary==null? true:shortSummary, request);
							feed.addEntry(entry);
						}
					}
					respondOK(response, lastmodified);
					writeFeed(response, feed);
				} else {
					Object[] missing = {"calendarUuid", "startDate", "endDate"};
					respondBadRequest(request, response, "error.url.missing.param.parameters.three", missing);
				}		
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
	
	public void doDelete(HttpServletRequest request, HttpServletResponse response) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doDelete", new Object[] { request, response });
		}
		
		try {	
			String eventUuid = request.getParameter(PARAMETER_EVENT_UUID);
			String eventInstanceId = request.getParameter(PARAMETER_EVENT_INST_UUID);
			String startDateString = request.getParameter(PARAMETER_STARTDATE);
			Date startDate = null;
			if(startDateString != null) {
				startDate = parser.parseDate(startDateString);
			}
			
			DBEventInstance inst = null;
			DBEvent event = null;
			DBCalendar calendar = null;
			
			if(eventInstanceId != null) {
				LOGGER.finer("Find parameter 'eventInstUuid', query for the event instance object.");
				inst = crud.getEventInstanceDao().getEventInstance(eventInstanceId);
				if(inst == null) {
					LOGGER.finer("Event instance not found - 'eventInstUuid=" + eventInstanceId + "'");
					respondNotFound(response);
				} else {
					LOGGER.finer("Event instance found, query the event/calendar information");
					event = inst.getEvent();
					calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
					if(event == null || calendar == null) {
						LOGGER.finer("Fail to query the event/calendar info for event instance '" + eventInstanceId + "'. Possible Cause: bad database data.");
						respondNotFound(response);
					}
				}
			} else if (eventUuid != null) {
				LOGGER.finer("Find parameter 'eventUuid', query for the event object.");
				event = crud.getEventDAO().getEvent(eventUuid);
				if(event == null) {
					LOGGER.finer("Event not found - 'eventUuid=" + eventUuid + "'");
					respondNotFound(response);
				} else {
					LOGGER.finer("Event found, query the calendar information");
					calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
					if(calendar == null) {
						LOGGER.finer("Fail to query the calendar info for event '" + eventUuid + "'. Possible Cause: bad database data.");
						respondNotFound(response);
					}
				}
			} else {
				respondBadRequest(request, response, "error.url.missing.param.parameter", "eventUuid");
			}
			
			if((inst != null || event != null) && calendar != null) {
				DBUser user = permissionHelper.getUser(request);
				int status = permissionHelper.isUserAuthorized(request, calendar, event.getCreatedBy(), CalendarOperation.DELETE);
				if(status == HttpServletResponse.SC_OK) {
					//for audit
					event.setEventInfo(crud.getEventInfoDao().getEventInfo(event.getEventInfo_UUID()));
					if(inst != null) {
						crud.removeEventInstance(inst, event, calendar, user);
						respondDeleted(response);
					} else if(startDate != null) {
						DBEventInstance instance = crud.getEventInstanceDao().getEventInstance(eventUuid, startDate);
						if(instance == null) {
							respondNotFound(response);
						}
						
						if(instance != null) {
							crud.removeEventInstance(instance, event, calendar, user);
							
							// if last event instance, delete the whole event object
							if(crud.getEventInstanceDao().getEventInstancesCount(null, event.getEvent_UUID(), null, null, null) == 0) {
								crud.removeEvent(event, calendar, user);
								if (event.getIsRecurrence())
									audit.eventSeriesDeleted(calendar, event, user);
								// audit for single event will be done when instance is deleted
							}
							
							respondDeleted(response);
						}
					} else {
						List<DBEventInstance> insts = event.getEventInstances();
						
						crud.removeEvent(event, calendar, user);
						if (event.getIsRecurrence())
							audit.eventSeriesDeleted(calendar, event, user);
						else
							audit.eventSingleDeleted(calendar, event, user);
						
						for(DBEventInstance tinst : insts) {
							tinst.setEventInfo(event.getEventInfo());
							audit.eventInstanceDeleted(calendar, event, tinst, user);
						}
						
						respondDeleted(response);
					}
				} else {
					response.setStatus(status);
				}
			}
		} catch (BadAtomEntryException ex) {
			respondBadRequest(request, response, ex);
			if (LOGGER.isLoggable(Level.FINER)) {
				LOGGER.throwing(CLASS_NAME, "doDelete", ex);
			}
		} catch (CalendarException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doDelete", ex);
		} catch (IllegalArgumentException ex){
			respondBadRequest(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doDelete", ex);
		} catch (DSProviderException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doDelete", ex);
		} catch (Exception ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doDelete", ex);
		}
		if(LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "doDelete", "void");
		}
	}
	
	@SuppressWarnings("unchecked")
	public void doPut(HttpServletRequest request, HttpServletResponse response) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doPut", new Object[] { request, response });
		}
		
		try {
			InputStream is = request.getInputStream();
			
			String eventUuid = request.getParameter(PARAMETER_EVENT_UUID);
			String eventInstanceId = request.getParameter(PARAMETER_EVENT_INST_UUID);
			String startDateString = request.getParameter(PARAMETER_STARTDATE);
			
			Date startDate = null;
			if(startDateString != null) {
				startDate = parser.parseDate(startDateString);
			}
			
			DBEventInstance inst = null;
			DBCalendar calendar = null;
			DBEvent event = null;
			
			if(eventInstanceId != null) {
				LOGGER.finer("Find parameter 'eventInstUuid', query for the event instance object.");
				inst = crud.getEventInstanceDao().getEventInstance(eventInstanceId);
				if(inst == null) {
					LOGGER.finer("Event instance not found - 'eventInstUuid=" + eventInstanceId + "'");
					respondNotFound(response);
				} else {
					LOGGER.finer("Event instance found, query the event/calendar information");
					event = inst.getEvent();
					calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
					if(event == null || calendar == null) {
						LOGGER.finer("Fail to query the event/calendar info for event instance '" + eventInstanceId + "'. Possible Cause: bad database data.");
						respondNotFound(response);
					}
				}
			} else if (eventUuid != null) {
				LOGGER.finer("Find parameter 'eventUuid', query for the event object.");
				event = crud.getEventDAO().getEvent(eventUuid);
				if(event == null) {
					LOGGER.finer("Event not found - 'eventUuid=" + eventUuid + "'");
					respondNotFound(response);
				} else {
					LOGGER.finer("Event found, query the calendar information");
					calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
					if(calendar == null) {
						LOGGER.finer("Fail to query the calendar info for event '" + eventUuid + "'. Possible Cause: bad database data.");
						respondNotFound(response);
					}
				}
			} else {
				respondBadRequest(request, response, "error.url.missing.param.parameter", "eventUuid");
			}

			if ((inst != null || event != null) && calendar != null) {
				DBUser user = permissionHelper.getUser(request);
				ImpersonationUtil impu = new ImpersonationUtil();
				DBUser impersonator = impu.getImpersonator(request, calendar.getORG_ID());
				int status = HttpServletResponse.SC_FORBIDDEN;
				status = impersonator != null 
						? HttpServletResponse.SC_OK
						: permissionHelper.isUserAuthorized(request, calendar, event.getCreatedBy(), CalendarOperation.EDIT);
				if(status == HttpServletResponse.SC_OK) {
					Entry entry = null;
					if(inst != null) {
						Map<String, Object> extra = new HashMap<String, Object>();
						DBEventInstance updates = parser.parseEventForInstanceUpdate(is, extra);
						if(!inst.getEventInst_UUID().equals(updates.getEventInst_UUID())) {
							throw new BadAtomEntryException("error.atom.parser.tag.wrongformat.parameter", new Object[]{"id"});
						}
						inst = crud.updateEventInstance(inst, updates, (Set<String>)extra.get("tags"), event, calendar, user, impersonator);
						entry = generator.newAtomEventInstanceEntry(inst, event, calendar, false, request);
					} else if(startDate != null) {	// Update Substitution, custom-picked Instance
						DBEventInstance instance = crud.getEventInstanceDao().getEventInstance(eventUuid, startDate);
						if(instance == null) {
							respondNotFound(response);
						}
						
						if(instance != null) {
							Map<String, Object> extra = new HashMap<String, Object>();
							DBEventInstance updates = parser.parseEventForInstanceUpdate(is, extra);
							if(!instance.getEventInst_UUID().equals(updates.getEventInst_UUID())
									&& !(eventUuid + "@" + startDateString).equals(updates.getEventInst_UUID())) {
								throw new BadAtomEntryException("error.atom.parser.tag.wrongformat.parameter", new Object[]{"id"});
							}
							instance = crud.updateEventInstance(instance, updates, (Set<String>)extra.get("tags"), event, calendar, user, impersonator);
							entry = generator.newAtomEventInstanceEntry(instance, event, calendar, false, request);
						}
					} else {	// Update full Event Series
						Map<String, Object> extra = new HashMap<String, Object>();
						DBEvent updates = parser.parseEventForUpdate(is, extra);
						if(!event.getEvent_UUID().equals(updates.getEvent_UUID())) {
							throw new BadAtomEntryException("error.atom.parser.tag.wrongformat.parameter", new Object[]{"id"});
						}
						
						TimeZone timezone = Utilities.parseTimezoneInfoFromEventUUID(event.getEvent_UUID());
						extra.put("timezone", timezone);
						
						if(event.getIsRecurrence()) {
							event = crud.updateEventSeries(event, updates, (Set<String>)extra.get("tags"), (TimeZone)extra.get("timezone"), calendar, user, impersonator);
						} else {
							event = crud.updateCustomEvent(event, updates, (Set<String>)extra.get("tags"), (TimeZone)extra.get("timezone"), calendar, user, impersonator);
						}
						
						entry = generator.newAtomEventEntry(event, calendar, event.getModifiedOn(), request);
					}
					
					if(entry != null) {
						respondOK(response);
						writeEntry(response, entry);
					}						
				} // end of "status == SC_OK"
				else {
					response.setStatus(status);
				}
			} // end of else
		} catch (InvalidUserImpersonationException iuie) {
			respondPreconditionFailed(request, response, iuie);
			LOGGER.throwing(CLASS_NAME, "doPut", iuie);
		} catch (InvalidImpersonationException iie) {
			respondForbidden(response);
			LOGGER.throwing(CLASS_NAME, "doPut", iie);
		} catch (IOException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPut", ex);
		} catch (BadAtomEntryException ex) {
			respondBadRequest(request, response, ex);
			if (LOGGER.isLoggable(Level.FINER)) {
				LOGGER.throwing(CLASS_NAME, "doPut", ex);
			}
		} catch (CalendarException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPut", ex);
		} catch (IllegalArgumentException ex){
			respondBadRequest(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPut", ex);
		} catch (DSProviderException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPut", ex);
		} catch (Exception ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPut", ex);
		}
		
		if(LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "doPut", "void");
		}
	}
	
	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doPost", new Object[] { request, response });
		}
		
		try {
			InputStream is = request.getInputStream();
			String calendarUuid = request.getParameter(PARAMETER_CALENDAR_UUID);
			
			DBCalendar calendar = null;
			if (!StringUtils.isBlank(calendarUuid)) {
				LOGGER.finer("Find parameter 'calendarUuid', query for the calendar object.");
				calendar = crud.getCalendarDAO().getCalendar(calendarUuid);
				if(calendar == null) {
					LOGGER.finer("Calendar not found - 'calendarUuid=" + calendarUuid + "'");
					respondNotFound(response);
				}
			} else {
				respondBadRequest(request, response, "error.url.missing.param.parameter", "calendarUuid");
			}
			
			if(calendar != null) {
				// Check if authenticated/authorized
				int status = HttpServletResponse.SC_FORBIDDEN;
				DBUser user = permissionHelper.getUser(request);
				ImpersonationUtil impu = new ImpersonationUtil();
				DBUser impersonator = impu.getImpersonator(request, calendar.getORG_ID());
				status = impersonator != null 
						 ? status = HttpServletResponse.SC_OK
						 : permissionHelper.isUserAuthorized(request, calendar, null, CalendarOperation.CREATE);
				if(status == HttpServletResponse.SC_OK) {
					Map<String, Object> extra = new HashMap<String, Object>();
					DBEvent event = parser.parseEventForCreation(is, extra);
					if(event.getRecurrence() == null) {
						crud.addCustomEvent(event, (Set<String>)extra.get("tags"), (TimeZone)extra.get("timezone"), calendar, user, impersonator);
						if(impersonator == null){
							crud.addFollowing(user, event, DBEventFollowingRecord.ATTEND);
						} else {
							crud.addFollowing(impersonator, event, DBEventFollowingRecord.ATTEND);
						}
						audit.eventFollowed(calendar, event, user, DBEventFollowingRecord.ATTEND, impersonator);
						
						respondCreated(response);
					} else {
						crud.addRecurrenceEvent(event, (Set<String>)extra.get("tags"), (TimeZone)extra.get("timezone"), calendar, user, impersonator);
						if(impersonator == null){
							crud.addFollowing(user, event, DBEventFollowingRecord.ATTEND);
						} else {
							crud.addFollowing(impersonator, event, DBEventFollowingRecord.ATTEND);
						}
						audit.eventFollowed(calendar, event, user, DBEventFollowingRecord.ATTEND, impersonator);
						
						respondCreated(response);
					}
			    	
			    	Entry entry = generator.newAtomEventEntry(event, calendar, event.getModifiedOn(), request);
					writeEntry(response, entry);
				} else {
					response.setStatus(status);
				}
			}
		} catch (InvalidUserImpersonationException iuie) {
			respondPreconditionFailed(request, response, iuie);
			LOGGER.throwing(CLASS_NAME, "doPost", iuie);
		} catch (InvalidImpersonationException iie) {
			respondForbidden(response);
			LOGGER.throwing(CLASS_NAME, "doPost", iie);
		} catch (IOException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPost", ex);
		} catch (BadAtomEntryException ex) {
			respondBadRequest(request, response, ex);
			if (LOGGER.isLoggable(Level.FINER)) {
				LOGGER.throwing(CLASS_NAME, "doPost", ex);
			}
		} catch (CalendarException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPost", ex);
		} catch (IllegalArgumentException ex){
			respondBadRequest(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPost", ex);
		} catch (DSProviderException ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPost", ex);
		} catch (Exception ex) {
			respondServerError(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doPost", ex);
		}
		
		if(LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "doPost", "void");
		}	
	}
}
