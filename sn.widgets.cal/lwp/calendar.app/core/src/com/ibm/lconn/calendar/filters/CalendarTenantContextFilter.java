/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.filters;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;

import com.ibatis.dao.client.DaoException;
import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.exception.DatabaseException;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventComment;
import com.ibm.lconn.calendar.db.model.DBEventFollowingRecord;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.exception.CalendarException;
import com.ibm.lconn.calendar.util.ExecutionContext;
import com.ibm.lconn.calendar.util.ExecutionContext.PrivilegedRunnable;
import com.ibm.lconn.calendar.util.RuntimeConfiguration;
import com.ibm.lconn.calendar.util.Utilities;
import com.ibm.lconn.core.url.ThreadHttpRequest;
import com.ibm.lconn.core.web.mt.TenantLookupFilter;

/**
 * @author zhangqiwei
 *
 */
public class CalendarTenantContextFilter implements Filter {
	protected Map<Pattern, String[]> MT_PROTECTED_URLS = new HashMap<Pattern, String[]>(); 
	protected ArrayList<Pattern> MT_PROTECTED_URL_PATTERNS = new ArrayList<Pattern>();
	protected ArrayList<Pattern> MT_IGNORED_URLS = new ArrayList<Pattern>();
	protected ArrayList<Pattern> MT_IGNORED_GET_URLS = new ArrayList<Pattern>();
	
	public void init(FilterConfig config) throws ServletException {
		InputStream is = CalendarTenantContextFilter.class.getResourceAsStream("/multitenancy.properties");
		try {
			Properties prop = new Properties();
			prop.load(is);
			
			{
				String[] urlPatterns = prop.getProperty("calendar.url.patterns").split(";");
				for(String urlPattern : urlPatterns) {
					int idx = urlPattern.indexOf("=");
					String url = urlPattern.substring(0, idx);
					String[] parameters = urlPattern.substring(idx + 1).substring(1, urlPattern.length() - idx - 2).split(",");
					MT_PROTECTED_URLS.put(Pattern.compile(url), parameters);
				}
				
				MT_PROTECTED_URL_PATTERNS = new ArrayList<Pattern>(MT_PROTECTED_URLS.keySet());
				Collections.sort(MT_PROTECTED_URL_PATTERNS, new Comparator<Pattern>() {
					public int compare(Pattern p1, Pattern p2) {
	                    return p2.pattern().length() - p1.pattern().length();
                    }
				});
			}
			
			{
				String[] urlPatterns = prop.getProperty("calendar.url.patterns.IGNORE_TENANTKEY").split(";");
				for(String urlPattern : urlPatterns) {
					MT_IGNORED_URLS.add(Pattern.compile(urlPattern));
				}
			}
			
			{
				String[] urlPatterns = prop.getProperty("calendar.url.patterns.IGNORE_TENANTKEY.GET").split(";");
				for(String urlPattern : urlPatterns) {
					MT_IGNORED_GET_URLS.add(Pattern.compile(urlPattern));
				}
			}
			
		} catch(Exception ex){
			throw new ServletException(ex);
		} finally {
			try {
				is.close();
			} catch(Exception ex) {
			}
		}
	}

	public void destroy() {
	}

	public void doFilter(ServletRequest req, ServletResponse res, final FilterChain chain) throws IOException, ServletException {
		final HttpServletRequest request = (HttpServletRequest) req;
        final HttpServletResponse response = (HttpServletResponse) res;
        
        try {
        	final CalendarService cs = CalendarServiceFactory.INSTANCE.create();
			
			String useOrgId = null;
			
			try {
				if("SC".equalsIgnoreCase(RuntimeConfiguration.getValue("multitenancy.type"))) {
						// organization id by content
					useOrgId = (String)new ExecutionContext(ExecutionContext.IGNORE_TENANTKEY).run(new PrivilegedRunnable() {
						public Object run() {
							String requestUrl = request.getRequestURL().toString().trim();
							String hrefPathPrefix = Utilities.getVenturaAppHrefPathPrefix("communities") + "/calendar";
							String pathInfo = requestUrl.substring(requestUrl.indexOf(hrefPathPrefix) + hrefPathPrefix.length());
							if(pathInfo.startsWith("/oauth")) {
								pathInfo = pathInfo.substring("/oauth".length());
							}
							for(Iterator<Pattern> iter = MT_PROTECTED_URL_PATTERNS.iterator(); iter.hasNext(); ) {
								Pattern urlPattern = iter.next();
								Matcher matcher = urlPattern.matcher(pathInfo);
								if(matcher.find(0) && matcher.start() == 0) {
									String[] parameters = MT_PROTECTED_URLS.get(urlPattern);
									for(int i = 0; i < parameters.length; i++) {
										String parameter = parameters[i];
										int idx = parameter.indexOf("=");
										String pkey = parameter.substring(0, idx);
										String pval = parameter.substring(idx + 1);
										
										String value = null;
										if("#0".equals(pkey)) {
											if(matcher.groupCount() >= 1) {
												value = matcher.group(1);
											}
										} else {
											value = request.getParameter(pkey);
										}
										if(value == null) {
											continue;
										}
										
										String useOrgId = null;
										try {
											if("calendarUuid".equals(pval)) {
												DBCalendar calendar = cs.getCalendarDAO().getCalendar(value);
												if(calendar != null) {
													useOrgId = calendar.getORG_ID();
												}
											} else if("eventUuid".equals(pval)) {
												DBEvent event = cs.getEventDAO().getEvent(value);
												if(event != null) {
													useOrgId = event.getORG_ID();
												}
											} else if("eventInstUuid".equals(pval)) {
												DBEventInstance instance = cs.getEventInstanceDao().getEventInstance(value);
												if(instance != null) {
													useOrgId = instance.getORG_ID();
												}
											} else if("commentUuid".equals(pval)) {
												DBEventComment comment = cs.getEventCommentDao().getComment(value);
												if(comment != null) {
													useOrgId = comment.getORG_ID();
												}
											} else if("attendeeUuid".equals(pval)) {
												DBEventFollowingRecord attendee = cs.getEventFollowingDao().getEventFollowingRecord(value);
												if(attendee != null) {
													useOrgId = attendee.getORG_ID();
												}
											}
										} catch (Exception e) {
										}
										
										if(useOrgId != null) {
											if(StringUtils.isBlank(useOrgId)) {
												useOrgId = ExecutionContext.DEFAULT_ORG_ID;
											}
											return useOrgId;
										}
									}
								}
							}
							return null;
						}
					});
					
					// urls for ignore organization id 
					
					if(useOrgId == null) {
						if("GET".equalsIgnoreCase(request.getMethod())) {
							String requestUrl = request.getRequestURL().toString().trim();
							String hrefPathPrefix = Utilities.getVenturaAppHrefPathPrefix("communities") + "/calendar";
							String pathInfo = requestUrl.substring(requestUrl.indexOf(hrefPathPrefix) + hrefPathPrefix.length());
							if(pathInfo.startsWith("/oauth")) {
								pathInfo = pathInfo.substring("/oauth".length());
							}
							for(Iterator<Pattern> iter = MT_IGNORED_GET_URLS.iterator(); iter.hasNext(); ) {
								Pattern urlPattern = iter.next();
								Matcher matcher = urlPattern.matcher(pathInfo);
								if(matcher.find(0) && matcher.start() == 0) {
									useOrgId = ExecutionContext.IGNORE_TENANTKEY;
									break;
								}
							}
						}
					}
					
					if(useOrgId == null) {
						String requestUrl = request.getRequestURL().toString().trim();
						String hrefPathPrefix = Utilities.getVenturaAppHrefPathPrefix("communities") + "/calendar";
						String pathInfo = requestUrl.substring(requestUrl.indexOf(hrefPathPrefix) + hrefPathPrefix.length());
						if(pathInfo.startsWith("/oauth")) {
							pathInfo = pathInfo.substring("/oauth".length());
						}
						for(Iterator<Pattern> iter = MT_IGNORED_URLS.iterator(); iter.hasNext(); ) {
							Pattern urlPattern = iter.next();
							Matcher matcher = urlPattern.matcher(pathInfo);
							if(matcher.find(0) && matcher.start() == 0) {
								useOrgId = ExecutionContext.IGNORE_TENANTKEY;
								break;
							}
						}
					}
				}
				
				if(useOrgId == null) {
					if(ExecutionContext.getCurrentOrgId() != null) {
						useOrgId = ExecutionContext.getCurrentOrgId();
					}
				}
				
				if(useOrgId == null) {
					useOrgId = (String)ThreadHttpRequest.get().getAttribute(TenantLookupFilter.ORGANIZATION_ID_ATTRIBUTE);
					if(StringUtils.isBlank(useOrgId)) {
						useOrgId = ExecutionContext.DEFAULT_ORG_ID;
					}
				}
			} catch (Throwable err) {
				useOrgId = ExecutionContext.IGNORE_TENANTKEY;
			}
			
			Exception ex = (Exception)new ExecutionContext(useOrgId).run(new PrivilegedRunnable() {
				public Object run() {
					try {
						chain.doFilter(request, response);
						return null;
					} catch (Exception ex) {
						return ex;
					} 
				}
			});
			
			if(ex instanceof IOException) {
				throw (IOException) ex;
			}
			if(ex instanceof ServletException) {
				throw (ServletException) ex;
			}
		} catch(IOException ex) {
			throw ex;
		} catch(ServletException ex) {
			throw ex;
		} catch (Exception ex) {
			if(ex instanceof CalendarException) {
				throw (CalendarException)ex;
			} else if(ex instanceof SQLException || ex instanceof DaoException) {
				throw new DatabaseException(ex);
			} else {
				throw new CalendarException(ex);
			}
		}
	}
}
