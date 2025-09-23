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
package com.ibm.ilel.seedlist.retriever.connections.calendar;

import java.nio.ByteBuffer;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.configuration.Configuration;

import com.ibm.ilel.seedlist.SeedlistException;
import com.ibm.ilel.seedlist.common.ApplicationInfo;
import com.ibm.ilel.seedlist.common.EntrySet;
import com.ibm.ilel.seedlist.retriever.RetrieverRequest;
import com.ibm.ilel.seedlist.retriever.RetrieverService;
import com.ibm.ilel.seedlist.retriever.connections.calendar.data.CalendarDataSourceException;
import com.ibm.ilel.seedlist.retriever.connections.calendar.data.CalendarEntry;
import com.ibm.ilel.seedlist.retriever.connections.calendar.datasource.SeedlistService;
import com.ibm.ilel.seedlist.retriever.connections.calendar.datasource.SeedlistServiceFactory;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;

public class CalendarRetrieverService implements RetrieverService {
	private static final String CLASSNAME = CalendarRetrieverService.class.getName();
	private static Logger logger = Logger.getLogger(CLASSNAME);

	protected SeedlistService service = null;
	protected HttpServletRequest servletRequest = null;

	public CalendarRetrieverService(Properties properties, HttpServletRequest servletRequest) {
		String method = "constructor";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		this.servletRequest = servletRequest;

		if (logger.isLoggable(Level.FINER)) {
			logger.exiting(CLASSNAME, method);
		}
	}

	protected boolean isPublic() {
		return false;
	}

	protected SeedlistService getCalendarDatasource() throws SeedlistException {
		String method = "getCalendarDatasource";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		try {
			if (service == null) {
				service = SeedlistServiceFactory.INSTANCE.create();
			}

			if (logger.isLoggable(Level.FINER)) {
				logger.exiting(CLASSNAME, method);
			}

			return service;
		} catch (CalendarDataSourceException e) {
			if (logger.isLoggable(Level.FINER)) {
				logger.throwing(CLASSNAME, method, e);
			}

			throw new SeedlistException(SeedlistException.TYPE_INTERNAL_ERROR, e.getMessage());
		}
	}

	public EntrySet getChildren(ApplicationInfo appInfo, RetrieverRequest request) throws SeedlistException {
		String method = "getChildren";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		Locale locale = request.getLocale();
		List<CalendarDocument> documents = new ArrayList<CalendarDocument>();
		String seedlistId = request.getSeedlistId();

		try {
			CalendarState CalendarState;
			if (request.getState() == null) {
				if (request.getTimestamp() == null) {
					Date startDate = new Date(0);
					if (request.getDate() != null) {
						startDate = request.getDate();
					}
					CalendarState = new CalendarState(startDate);
				} else {
					Timestamp timestamp = new Timestamp(ByteBuffer.wrap(request.getTimestamp().getStateData()).getLong());
					CalendarState = new CalendarState(timestamp);
				}
			} else {
				CalendarState = new CalendarState(request.getState());
			}

			// seedlist id check
			if (seedlistId == null || seedlistId.length() <= 0 || seedlistId.equals("SeedlistId")) {
				seedlistId = "communities.calendar";

				// start and range parameters
				int start = request.getStartIndex();
				int range = request.getNumEntries();

				// calendar documents
				documents = getCalendarDocumentsByState(start, range, locale, request, CalendarState);
			} else {
				// calendar document
				documents = getCalendarDocumentByUrl(seedlistId, locale);

				if (documents.isEmpty()) {
					CalendarDocument document = getCalendarDocumentById(seedlistId, locale);
					if (document != null) {
						documents.add(document);
					}
				}
			}

			// entry set
			CalendarEntrySet entrySet = new CalendarEntrySet(documents, new ArrayList(), seedlistId, isEmailExposed(), isPublic(), request, servletRequest, CalendarState);

			if (logger.isLoggable(Level.FINER)) {
				logger.exiting(CLASSNAME, method);
			}

			return entrySet;
		} finally {
			CalendarServiceFactory.INSTANCE.create().flush();
		}
	}

	public EntrySet getDocuments(ApplicationInfo appInfo, RetrieverRequest request) throws SeedlistException {
		return getChildren(appInfo, request);
	}

	public int getNumberOfDocuments(ApplicationInfo appInfo, RetrieverRequest request) throws SeedlistException {
		String method = "getNumberOfDocuments";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		try {
			Date lastModifiedDate = getLastModifiedDate(request);

			int num = getCalendarDatasource().getNumberOfCalendarEntries(lastModifiedDate, null);

			if (logger.isLoggable(Level.FINER)) {
				logger.exiting(CLASSNAME, method);
			}

			return num;
		} catch (CalendarDataSourceException e) {
			if (logger.isLoggable(Level.FINER)) {
				logger.throwing(CLASSNAME, method, e);
			}

			throw new SeedlistException(SeedlistException.TYPE_INTERNAL_ERROR, e.getMessage());
		}
	}

	protected List<CalendarDocument> getCalendarDocumentByUrl(String url, Locale locale) throws SeedlistException {

		String method = "getCalendarDocumentByUrl";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		List<CalendarDocument> documents = new ArrayList<CalendarDocument>();

		// TBD: support url for per document seedlist retrieve

		if (logger.isLoggable(Level.FINER)) {
			logger.exiting(CLASSNAME, method);
		}

		return documents;
	}

	protected CalendarDocument getCalendarDocumentById(String id, Locale locale) throws SeedlistException {
		String method = "getCalendarDocumentById";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		CalendarEntry calendarEntry = new CalendarEntry();
		CalendarDocument calendarDocument = null;
		try {
			calendarEntry = getCalendarDatasource().getCalendarEntry(id);
			if(calendarEntry == null)
				return null;
			calendarDocument = new CalendarDocument(calendarEntry, locale, isEmailExposed());
		} catch (CalendarDataSourceException ex) {
			if (logger.isLoggable(Level.FINER)) {
				logger.throwing(CLASSNAME, method, ex);
			}
			throw new SeedlistException(SeedlistException.TYPE_INTERNAL_ERROR, ex.getMessage());
		} catch (Exception ex) {
			if (logger.isLoggable(Level.FINER)) {
				logger.throwing(CLASSNAME, method, ex);
			}
			throw new SeedlistException(SeedlistException.TYPE_INTERNAL_ERROR, ex.getMessage());
		}

		if (logger.isLoggable(Level.FINER)) {
			logger.exiting(CLASSNAME, method);
		}

		return calendarDocument;
	}

	protected List<CalendarDocument> getCalendarDocumentsByState(int start, int range, Locale locale, RetrieverRequest request, CalendarState calendarState) throws SeedlistException {
		String method = "getCalendarDocumentsByState";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		List<CalendarDocument> documents = new ArrayList<CalendarDocument>();

		// check range and start to be valid
		if (range <= 0)
			return documents;

		CalendarEntry[] calendarEntries = new CalendarEntry[0];

		try {
			int _start = 0;

			if ((calendarEntries.length <= _start) && (calendarState.getType() == CalendarState.CALENDAR_EVENTS)) {
				if (calendarState.isStarted()) {
					_start = 0;
				}
				calendarEntries = getCalendarDatasource().getCalendarEntries(calendarState, range);
				if (calendarEntries.length <= _start) {
					calendarState.setType(CalendarState.CALENDAR_ACLS);
					calendarState.setLastModified(calendarState.getStartDate());
				}
			}

			// retrieve acl updates

			if (calendarEntries.length <= _start) {
				calendarEntries = new CalendarEntry[0];
				_start = 0;
			}

			if ((calendarEntries.length <= _start) && (calendarState.getType() == CalendarState.CALENDAR_ACLS)) {
				if (calendarState.isStarted()) {
					_start = 0;
				}
				calendarEntries = getCalendarDatasource().getCalendarEntriesWithAclUpdated(calendarState, range);
				if (calendarEntries.length <= _start) {
					calendarState.setType(CalendarState.CALENDAR_COMMENTS);
					calendarState.setLastModified(calendarState.getStartDate());
				}
			}
			
			// retrieve comments updates
			
			if (calendarEntries.length <= _start) {
				calendarEntries = new CalendarEntry[0];
				_start = 0;
			}

			if ((calendarEntries.length <= _start) && (calendarState.getType() == CalendarState.CALENDAR_COMMENTS)) {
				if (calendarState.isStarted()) {
					_start = 0;
				}
				calendarEntries = getCalendarDatasource().getCalendarEntriesWithCommentUpdated(calendarState, range);
			}

			// return 
			
			for (int i = 0; i < calendarEntries.length; i++) {
				if (i >= _start) {
					CalendarDocument doc = new CalendarDocument(calendarEntries[i], locale, isEmailExposed());
					if (doc.getUpdateDate() != null && doc.getUpdateDate().before(calendarState.getFinishDate())) {
						// check if valid: have id, name and link
						if (doc.isValid()) {
							documents.add(doc);
						}
					}
				}
			}

		} catch (CalendarDataSourceException e) {
			if (logger.isLoggable(Level.FINER)) {
				logger.throwing(CLASSNAME, method, e);
			}

			throw new SeedlistException(SeedlistException.TYPE_INTERNAL_ERROR, e.getMessage());
		}

		if (logger.isLoggable(Level.FINER)) {
			logger.exiting(CLASSNAME, method);
		}

		if (documents.size() <= 0) {
			calendarState.setFinished(true);
		}

		return documents;
	}

	protected Date getLastModifiedDate(RetrieverRequest request) throws SeedlistException {
		String method = "getLastModifiedDate";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		Date date = request.getDate();

		if (date != null) {
			if (logger.isLoggable(Level.FINER)) {
				logger.exiting(CLASSNAME, method, "Date=" + date.toString());
			}

			return request.getDate();
		} else { // if the date is not set
			Date _date = new Date(0);

			if (logger.isLoggable(Level.FINER)) {
				logger.exiting(CLASSNAME, method, "Date=" + _date.toString());
			}

			return _date;
		}
	}

	protected boolean isEmailExposed() throws SeedlistException {
		String method = "isEmailExposed";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		Configuration lotusConnectionsConfig;

		boolean isExposed = true;

		try {
			lotusConnectionsConfig = VenturaConfigurationProvider.Factory.getInstance().getGlobalConfiguration();
			isExposed = lotusConnectionsConfig.getBoolean("exposeEmail[@enabled]", true);
		} catch (VenturaConfigException e) {
			if (logger.isLoggable(Level.FINER)) {
				logger.throwing(CLASSNAME, method, e);
			}

			throw new SeedlistException(SeedlistException.TYPE_INTERNAL_ERROR, e.getMessage());
		}

		if (logger.isLoggable(Level.FINER)) {
			logger.exiting(CLASSNAME, method);
		}

		return isExposed;
	}
}