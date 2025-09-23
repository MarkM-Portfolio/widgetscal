/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2016                                    */
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
import java.net.URL;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.Random;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.abdera.Abdera;
import org.apache.abdera.model.Entry;
import org.apache.abdera.model.Feed;
import org.apache.abdera.model.Service;
import org.apache.abdera.writer.Writer;

import com.ibm.lconn.calendar.atom.AtomGenerator;
import com.ibm.lconn.calendar.atom.AtomParser;
import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.exception.CalendarException;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.util.ResourceMessageUtils;
import com.ibm.lconn.calendar.util.RuntimeConfiguration;
import com.ibm.lconn.calendar.util.Utilities;
import com.ibm.lconn.core.web.cache.WebCacheUtil;
import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;

public class BaseServlet extends HttpServlet {
	private static final long serialVersionUID = -7469518765982485845L;
	
	private static final String CLASS_NAME = BaseServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);

	protected static final String PARAMETER_CALENDAR_UUID = "calendarUuid";
	protected static final String PARAMETER_EVENT_UUID = "eventUuid";
	protected static final String PARAMETER_COMMENT_UUID = "commentUuid";
	protected static final String PARAMETER_ATTENDEE_UUID = "attendeeUuid";
	protected static final String PARAMETER_EVENT_INST_UUID = "eventInstUuid";
	protected static final String PARAMETER_STARTDATE = "startDate";
	protected static final String PARAMETER_VIEWSTART = "startDate";
	protected static final String PARAMETER_VIEWEND = "endDate";
	protected static final String PARAMETER_PAST = "past";
	protected static final String PARAMETER_SEARCH = "search";
	protected static final String PARAMETER_PAGE = "page";
	protected static final String PARAMETER_PAGESIZE = "ps";
	protected static final String PARAMETER_TAGS = "tags";
	protected static final String PARAMETER_MODE = "mode";
	protected static final String PARAMETER_TYPE = "type";
	protected static final String PARAMETER_USERID = "userid";
	protected static final String PARAMETER_TIMEZONE = "timezone";
	protected static final String PARAMETER_DAYLIGHT = "daylight";
	protected static final String PARAMETER_SUMMARY = "summary";
	protected static final String PARAMETER_ANONYMOUS = "anonymous";
	
	protected static final String JSP_ERROR = "error/error.jsp";
	
	protected CalendarService crud = null;
	protected AtomParser parser;
	protected AtomGenerator generator;
	protected Abdera abdera;
	protected IPermissionHelper permissionHelper;
	protected RequestDispatcher dispatcher = null;
	private Random random = new Random();

	protected IPermissionHelper createPermissionHelper() throws DSProviderException {
		return new PermissionHelper();
	}

	public void init(ServletConfig config) throws ServletException {
		super.init(config);

		parser = new AtomParser();
		generator = new AtomGenerator();
		abdera = new Abdera();
		try {
			permissionHelper = createPermissionHelper();
		} catch (DSProviderException ex) {
			throw new ServletException(ex);
		}

		crud = CalendarServiceFactory.INSTANCE.create(); // Singleton approach
		
		dispatcher = getServletContext().getRequestDispatcher(JSP_ERROR);
	}

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			super.service(request, response);
		} finally {
			crud.release();
		}
	}

	private String logId(){
		String id = "LC"+Long.toString(random.nextLong()&((~0L)>>>1));
		return id;
	}

	protected void respondServerError(HttpServletRequest request, HttpServletResponse response, RequestDispatcher dispatcher, Exception ex, String message) {
		String logId = logId();
		
		LOGGER.logp(Level.SEVERE, CLASS_NAME, "respondServerError", logId+" : "+message ,  ex ); 
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		request.setAttribute("code", "500");
		request.setAttribute("logId", logId);
		if (ex != null) {
			request.setAttribute("errorException", ex);
		} 
		if (message != null) {
			request.setAttribute("errorMessage", message);
		}
		try {
			dispatcher.forward(request, response);
		} catch (ServletException se) {
			LOGGER.throwing(CLASS_NAME, "respondServerError", se);
		} catch (IOException ioe) {
			LOGGER.throwing(CLASS_NAME, "respondServerError", ioe);
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "respondServerError", "void");
		}
	}
	
	protected void respondServerError(HttpServletRequest request, HttpServletResponse response, Exception ex) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "respondServerError", new Object[] { request, response, ex });
		}
		
		if(ex instanceof CalendarException) {
			respondServerError(request, response, dispatcher, ex, ((CalendarException)ex).getLocalizedMessage(request.getLocale()));
		} else {
			respondServerError(request, response, dispatcher, ex, null);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "respondServerError", "void");
		}
	}
	
	protected void respondServerError(HttpServletRequest request, HttpServletResponse response, String messageKey, Object... params) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "respondServerError", new Object[] { request, response, messageKey, params });
		}
		
		respondServerError(request, response, dispatcher, null, 
				ResourceMessageUtils.logMessage(messageKey, request.getLocale(), params));
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "respondServerError", "void");
		}
	}
	
	protected void respondServerError(HttpServletRequest request, HttpServletResponse response, Exception ex, String messageKey, Object... params) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "respondServerError", new Object[] { request, response, messageKey, params });
		}
		
		respondServerError(request, response, dispatcher, ex, 
				ResourceMessageUtils.logMessage(messageKey, request.getLocale(), params));
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "respondServerError", "void");
		}
	}

	protected void respondNotFound(HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_NOT_FOUND);
	}

	protected void respondBadRequest(HttpServletRequest request, HttpServletResponse response, RequestDispatcher dispatcher, Exception ex, String message) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "respondBadRequest", new Object[] { request, response, dispatcher, ex, message });
		}
		response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		request.setAttribute("code", "400");
		if (ex != null) {
			request.setAttribute("errorException", ex);
		} 
		if (message != null) {
			request.setAttribute("errorMessage", message);
		}
		try {
			dispatcher.forward(request, response);
		} catch (ServletException se) {
			LOGGER.throwing(CLASS_NAME, "respondBadRequest", se);
		} catch (IOException ioe) {
			LOGGER.throwing(CLASS_NAME, "respondBadRequest", ioe);
		}
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "respondBadRequest", "void");
		}
	}
	
	protected void respondBadRequest(HttpServletRequest request, HttpServletResponse response, Exception ex) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "respondBadRequest", new Object[] { request, response, ex });
		}
		
		if(ex instanceof CalendarException) {
			respondBadRequest(request, response, dispatcher, ex, ((CalendarException)ex).getLocalizedMessage(request.getLocale()));
		} else {
			respondBadRequest(request, response, dispatcher, ex, null);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "respondBadRequest", "void");
		}
	}
	
	protected void respondBadRequest(HttpServletRequest request, HttpServletResponse response, String messageKey, Object... params) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "respondBadRequest", new Object[] { request, response, messageKey, params });
		}
		
		respondBadRequest(request, response, dispatcher, null, 
				ResourceMessageUtils.logMessage(messageKey, request.getLocale(), params));
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "respondBadRequest", "void");
		}
	}
	
	protected void respondPreconditionFailed(HttpServletRequest request, HttpServletResponse response, RequestDispatcher dispatcher, Exception ex, String message) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "respondPreconditionFailed", new Object[] { request, response, dispatcher, ex, message });
		}
		response.setStatus(HttpServletResponse.SC_PRECONDITION_FAILED);
		request.setAttribute("code", "412");
		if (ex != null) {
			request.setAttribute("errorException", ex);
		} 
		if (message != null) {
			request.setAttribute("errorMessage", message);
		}
		try {
			dispatcher.forward(request, response);
		} catch (ServletException se) {
			LOGGER.throwing(CLASS_NAME, "respondPreconditionFailed", se);
		} catch (IOException ioe) {
			LOGGER.throwing(CLASS_NAME, "respondPreconditionFailed", ioe);
		}
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "respondPreconditionFailed", "void");
		}
	}
	
	protected void respondPreconditionFailed(HttpServletRequest request, HttpServletResponse response, Exception ex) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "respondPreconditionFailed", new Object[] { request, response, ex });
		}
		
		if(ex instanceof CalendarException) {
			respondPreconditionFailed(request, response, dispatcher, ex, ((CalendarException)ex).getLocalizedMessage(request.getLocale()));
		} else {
			respondPreconditionFailed(request, response, dispatcher, ex, null);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "respondPreconditionFailed", "void");
		}
	}
	
	protected void respondPreconditionFailed(HttpServletRequest request, HttpServletResponse response, String messageKey, Object... params) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "respondPreconditionFailed", new Object[] { request, response, messageKey, params });
		}
		
		respondPreconditionFailed(request, response, dispatcher, null, 
				ResourceMessageUtils.logMessage(messageKey, request.getLocale(), params));
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "respondPreconditionFailed", "void");
		}
	}

	protected void respondCreated(HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_CREATED);
		response.setContentType("application/atom+xml; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
	}

	protected void respondForbidden(HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
	}

	protected void respondUnauthorized(HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	}

	protected void respondOK(HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_OK);
		response.setContentType("application/atom+xml; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
	}
	
	protected void respondOK(HttpServletResponse response, String contentType) {
		response.setStatus(HttpServletResponse.SC_OK);
		response.setContentType(contentType);
		response.setCharacterEncoding("UTF-8");
	}
	
	protected void respondOK(HttpServletResponse response, long lastmodified) {
		response.setStatus(HttpServletResponse.SC_OK);
		response.setContentType("application/atom+xml; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		if(lastmodified > 0) {
			WebCacheUtil.setupCacheHeaders(response, false, false, true, 1,  lastmodified);
		}
	}
	
	protected void respondDeleted(HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_NO_CONTENT);
	}
	
	protected void respondSuccessWithNoContent(HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_NO_CONTENT);
	}
	
	protected void respondLogin(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		LOGGER.finer("Redirect user to the login page...");
		if(Utilities.isFBARequest(request)) {
			LOGGER.finer("This is a form-based authentication request: just return 401 error, widget container is responsible for redirecting user to the login page");
			request.getRequestDispatcher("/WEB-INF/jsps/401.jsp").forward(request, response);
		}
		else {
			LOGGER.finer("This is a basic authentication request: setup basic authentication challenge, and return 401 error");
			response.setHeader("WWW-Authenticate", HttpServletRequest.BASIC_AUTH + " real=\"ibm-connections\"");
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		}
	}

	protected void writeEntry(HttpServletResponse response, Entry entry) throws IOException {
		Writer writer = abdera.getWriterFactory().getWriter("prettyxml");
		writer.writeTo(entry, response.getWriter());
	}

	protected void writeFeed(HttpServletResponse response, Feed feed) throws IOException {
		Writer writer = abdera.getWriterFactory().getWriter("prettyxml");
		writer.writeTo(feed, response.getWriter());
	}

	protected void writeService(HttpServletResponse response, Service service) throws IOException {
		Writer writer = abdera.getWriterFactory().getWriter("prettyxml");
		writer.writeTo(service, response.getWriter());
	}

	protected String getServiceUrlPath(String serviceKey, HttpServletRequest request) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doGet", new Object[] { serviceKey, request });
		}

		URL url = null;
		String path = null;
		String svcEmbeddedContext = "";

		if ("calendar".equals(serviceKey)) {
			serviceKey = "communities";
			svcEmbeddedContext = RuntimeConfiguration.getValue("module.path");
		}

		VenturaConfigurationProvider vcp = null;
		try {
			vcp = VenturaConfigurationProvider.Factory.getInstance();
		} catch (VenturaConfigException vce) {
			LOGGER.throwing("CLASS_NAME", "getServiceUrlPath", vce);
			vce.printStackTrace();
		}

		if (request.isSecure()) {
			if (vcp != null) {
				try {
					url = vcp.getSecureServiceURL(serviceKey);
				} catch (VenturaConfigException e) {
					LOGGER.throwing(CLASS_NAME, "getServiceUrlPath", e);
					e.printStackTrace();
				}
				if (url != null)
					path = url.toExternalForm() + svcEmbeddedContext;
			}

		} else {
			if (vcp != null) {
				try {
					url = vcp.getServiceURL(serviceKey);
				} catch (VenturaConfigException e) {
					LOGGER.throwing(CLASS_NAME, "getServiceUrlPath", e);
					e.printStackTrace();
				}
				if (url != null)
					path = url.toExternalForm() + svcEmbeddedContext;
			}

		}
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "getServiceUrlPath", path);
		}
		return path;
	}
}
