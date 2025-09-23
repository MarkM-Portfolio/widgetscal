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
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.abdera.model.Entry;
import org.apache.abdera.model.Feed;

import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.BadAtomEntryException;
import com.ibm.lconn.calendar.exception.CalendarException;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.util.CalendarOperation;
import com.ibm.lotus.connections.dashboard.search.searchInterface.Constants;
import com.ibm.lotus.connections.dashboard.search.searchInterface.LCSearcher;
import com.ibm.lotus.connections.dashboard.search.searchInterface.SearchRequestObject;
import com.ibm.lotus.connections.dashboard.search.searchInterface.SearchRequestObjectBuilder;
import com.ibm.lotus.connections.dashboard.search.searchInterface.SearchResult;
import com.ibm.lotus.connections.dashboard.search.searchInterface.SearchResultObject;

public class CalendarSearchServlet extends BaseServlet {
	private static final long serialVersionUID = 3462486999308093929L;
	
	private static final String CLASS_NAME = CalendarServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	// max page size
	public static final int MAX_PAGESIZE = 100;

	public void init(ServletConfig config) throws ServletException {
		super.init(config);
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) {
	    if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doGet", new Object[] { request, response });
		}
		
		try {	
			String calendarUuid = request.getParameter(PARAMETER_CALENDAR_UUID);
			String searchString = request.getParameter(PARAMETER_SEARCH);
			String startPageString = request.getParameter(PARAMETER_PAGE);
			String pageSizeString = request.getParameter(PARAMETER_PAGESIZE);
			String tagString = request.getParameter("tag");
			
			LOGGER.finer("Preparing...");
			
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
			
			// verify calendarUuid and permission, if provided
			DBCalendar calendar = null;
			if(calendarUuid != null) {
				LOGGER.finer("Find parameter 'calendarUuid', query for the calendar object.");
				calendar = crud.getCalendarDAO().getCalendar(calendarUuid);
				if(calendar == null) {
					LOGGER.finer("Calendar not found - 'calendarUuid=" + calendarUuid + "'");
					respondNotFound(response);
					return;
				}
				
				int status = HttpServletResponse.SC_OK;
				DBUser user = permissionHelper.getUser(request);
				if(calendar != null) {
					if(user == null && calendar.getVisibility().equals(DBCalendar.PRIVATE)) {
						LOGGER.finer("Private calendar, and user not login, redirect user to the login page.");
						respondLogin(request, response);
						return;
					}
					status = permissionHelper.isUserAuthorized(request, calendar, null, CalendarOperation.VIEW);
					if(status != HttpServletResponse.SC_OK) {
						response.setStatus(status);
						return;
					}
				}
			}
			
			SearchRequestObject searchRequestObject = null;
			searchRequestObject = SearchRequestObjectBuilder.build(request, null, null);
			
			searchRequestObject.setUserQuery(searchString);
			searchRequestObject.setLimitComponentParams(new String[]{"communities" + Constants.FACETS_DELIMITER + "calendar"});
			
			if(calendarUuid != null) {
				searchRequestObject.setParam("fieldvalue", "community_id:" + calendarUuid);
			}
			
			searchRequestObject.setPage(startPage);
			searchRequestObject.setPageSize(pageSize);
			
			DBUser user = permissionHelper.getUser(request);
			boolean authenticated = false;
			if(user != null) {
				searchRequestObject.setUserId(user.getUserExtID()); 
                searchRequestObject.setGroups(new String[]{user.getUserExtID()});
                authenticated = true;
			}
			
			if(tagString != null) {
				searchRequestObject.setTagParams(new String[]{tagString});
			}
			
	        LCSearcher search = new LCSearcher();
	        SearchResultObject searchObject = search.getConnectionsSearchResults(searchRequestObject, authenticated, authenticated, authenticated);
			
	        int total = searchObject.getTotalResults();
	        List<SearchResult> results = searchObject.getSearchResults();
	        
	        Feed feed = null;
	        feed = generator.newAtomEventFeed(calendar, searchString, startPage, pageSize, total, request);
	        if(results != null && results.size() > 0) {
				for(Iterator<SearchResult> iter = results.iterator(); iter.hasNext(); ) {
					SearchResult result = iter.next();
					
					String link = result.getURL();
					LOGGER.finer("Event/Instance link:" + link);
					
					if(link.indexOf("eventInstUuid=") != -1) {
						int idx1 = link.indexOf("eventInstUuid=");
						int idx2 = link.indexOf("&", idx1);
						String instId = link.substring(idx1 + "eventInstUuid=".length(), (idx2 == -1 ? link.length() : idx2));
						DBEventInstance inst = crud.getEventInstanceDao().getEventInstance(instId);
						if(inst == null)
							continue;
						
						// set some field from search result
						DBEventInfo info = inst.getEventInfo();
						if(info == null) {
							info = new DBEventInfo();
						}
						info.setName(result.getTitle());
						info.setDescription(result.getContent());
						inst.getEvent().setTagsNames(result.getTags());
						Entry entry = generator.newAtomEventInstanceEntry(inst, inst.getEvent(), crud.getCalendarDAO().getCalendar(inst.getCalendar_UUID()), true, request);
						feed.addEntry(entry);
					} else if(link.indexOf("eventUuid=") != -1) {
						int idx1 = link.indexOf("eventUuid=");
						int idx2 = link.indexOf("&", idx1);
						String evtId = link.substring(idx1 + "eventUuid=".length(), (idx2 == -1 ? link.length() : idx2));
						DBEvent evt = crud.getEventDAO().getEvent(evtId);
						if(evt == null)
							continue;
						
						// set some field from search result
						DBEventInfo info = evt.getEventInfo();
						info.setName(result.getTitle());
						info.setDescription(result.getContent());
						evt.setTagsNames(result.getTags());
						Entry entry = generator.newAtomEventEntry(evt, crud.getCalendarDAO().getCalendar(evt.getCalendar_UUID()), new Date(), request);
						feed.addEntry(entry);
					}
				}
			}
	        respondOK(response);
			writeFeed(response, feed);
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
