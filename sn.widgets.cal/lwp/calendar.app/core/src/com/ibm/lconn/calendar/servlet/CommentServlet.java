/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.servlet;

import java.io.IOException;
import java.sql.Timestamp;
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
import com.ibm.lconn.calendar.db.model.DBEventComment;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBSubstitution;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.BadAtomEntryException;
import com.ibm.lconn.calendar.exception.CalendarException;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.util.CalendarOperation;
import com.ibm.lconn.calendar.util.ImpersonationUtil;
import com.ibm.lconn.calendar.util.RuntimeConfiguration;
import com.ibm.lconn.calendar.util.Utilities;
import com.ibm.lconn.core.web.exception.InvalidImpersonationException;
import com.ibm.lconn.core.web.exception.InvalidUserImpersonationException;

public class CommentServlet extends BaseServlet {

	private static final long serialVersionUID = -2182922079785981209L;
	
	private static final String CLASS_NAME = CommentServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private static final int PAGE_SIZE = 10;
	private static final int MAX_PAGESIZE = 100;
	
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
			String eventInstUuid = request.getParameter(PARAMETER_EVENT_INST_UUID);
			String commentUuid = request.getParameter(PARAMETER_COMMENT_UUID);
			String _page = request.getParameter(PARAMETER_PAGE);
			String _ps = request.getParameter(PARAMETER_PAGESIZE);
			
			DBCalendar calendar = null;
			DBEvent event = null;
			DBEventInstance inst = null;
			DBEventComment comment = null;
			
			// eventInstUuid for comments of event; commentUuid for single comment
			if (eventInstUuid == null && commentUuid == null) {
				respondBadRequest(request, response, "error.url.missing.param.parameter", "eventInstUuid");
			}
			
			// single comment
			if (commentUuid != null) {
				comment = crud.getEventCommentDao().getComment(commentUuid);
				if (comment != null) {
					inst = crud.getEventInstanceDao().getEventInstance(comment.getEventInst_UUID());
					if(inst != null) {
						event = crud.getEventDAO().getEvent(inst.getEvent_UUID());
						if(event != null) {
							calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
						}
					}
				} 
				
				if (calendar == null) {
					respondNotFound(response);
				} 
			} else if (eventInstUuid != null && inst == null) {
				// comments of event
				
				inst = crud.getEventInstanceDao().getEventInstance(eventInstUuid);
				if(inst != null) {
					event = crud.getEventDAO().getEvent(inst.getEvent_UUID());
					if(event != null) {
						calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
					}
				}
				
				if (calendar == null) {
					respondNotFound(response);
				} 
			}
			
			if (calendar != null) {
				// check permission
				DBUser user = permissionHelper.getUser(request);
				if(user == null && calendar.getVisibility().equals(DBCalendar.PRIVATE)) {
					respondLogin(request, response);
					return;
				}
				
				int status = permissionHelper.isUserAuthorized(request, calendar, null, CalendarOperation.VIEW);
				if (status == HttpServletResponse.SC_OK) {
					// CASE: comments of the event instance
					if (comment == null) {
						 int page = 1, ps = PAGE_SIZE;
						 if (_page != null)
							 page = Integer.parseInt(_page);
						 if (_ps != null)
							 ps = Integer.parseInt(_ps);
						 if(ps > MAX_PAGESIZE) {
							 ps = MAX_PAGESIZE;
						 }
						 
						 int total = crud.getEventCommentDao().getCommentCountOfEventInstance(eventInstUuid);
						 Timestamp lastUpdated = crud.getEventCommentDao().getMaxDateOfEventInstanceComments(eventInstUuid);
						 Feed feed = generator.newAtomCommentFeed(inst, event, calendar, page, ps, total, lastUpdated, request);
						if (total > 0) {
							List<DBEventComment> comments = crud
									.getEventCommentDao().getCommentsOfEventInstance(
											eventInstUuid, (page - 1) * ps, ps);
							for (DBEventComment c : comments) {
								Entry entry = generator.newAtomCommentEntry(c,
										inst, event, calendar, request);
								feed.addEntry(entry);
							}
						}
						 respondOK(response);
						 writeFeed(response, feed);
					}
					// CASE: single comment
					else {
						Entry entry = generator.newAtomCommentEntry(comment, inst, event, calendar, request);
						respondOK(response);
						writeEntry(response, entry);
					}
				} else {
					response.setStatus(status);
				}	// end of if (status == OK)
			
			} else {	// else of if (calendar != null)
				respondNotFound(response);
			}
			
		} catch (IOException ex) {
			respondServerError(request, response, ex, null);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
		} catch (BadAtomEntryException ex) {
			respondBadRequest(request, response, ex);
			LOGGER.throwing(CLASS_NAME, "doGet", ex);
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
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "doPost", new Object[] { request, response });
		}
		String eventInstUuid = request.getParameter(PARAMETER_EVENT_INST_UUID);;
		
		DBCalendar calendar = null;
		DBEventInstance inst = null;
		DBSubstitution subs = null;
		DBEvent event = null;
		DBEventComment comment = null;
		
		try {
			if (eventInstUuid != null) {
				inst = crud.getEventInstanceDao().getEventInstance(eventInstUuid);
				if(inst != null) {
					event = crud.getEventDAO().getEvent(inst.getEvent_UUID());
					if(event != null) {
						calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
					}
				}
				subs = crud.getSubstitutionDao().getSubstitution(eventInstUuid);
			} else {
				respondBadRequest(request, response, "error.url.missing.param.parameter", "eventUuid");
			}
			
			if (calendar != null && event != null) {
				DBUser user = permissionHelper.getUser(request);
				if(user == null) {
					respondLogin(request, response);
					return;
				}
				
				ImpersonationUtil impu = new ImpersonationUtil();
				DBUser impersonator = impu.getImpersonator(request, calendar.getORG_ID());
				if(impersonator == null){
					if(!RuntimeConfiguration.getBooleanValue("allowCommentsFromNonCommunityMember") || calendar.getVisibility().equals(DBCalendar.PRIVATE)) {
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
				}
				
				// all authenticated user can make comment
				comment = parser.parseCommentForCreation(request.getInputStream());
				String commentUuid = crud.addComment(comment, inst, event, calendar, subs, user, impersonator);
				if (commentUuid != null) {
					respondCreated(response);
					Entry entry = generator.newAtomCommentEntry(comment, inst, event, calendar, request);
					writeEntry(response, entry);
				}
				
			} else {
				respondNotFound(response);
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
		
		try {
			String commentUuid = request.getParameter(PARAMETER_COMMENT_UUID);
			
			DBCalendar calendar = null;
			DBEvent event = null;
			DBEventInstance inst = null;
			DBEventComment comment = null;
			
			if (commentUuid != null) {
				comment = crud.getEventCommentDao().getComment(commentUuid);
				if (comment != null) {
					inst = crud.getEventInstanceDao().getEventInstance(comment.getEventInst_UUID());
					if(inst != null) {
						event = crud.getEventDAO().getEvent(inst.getEvent_UUID());
						if(event != null) {
							calendar = crud.getCalendarDAO().getCalendar(event.getCalendar_UUID());
						}
					}
				} 
				
				if (calendar == null) {
					respondNotFound(response);
				} 
			} else {
				respondBadRequest(request, response, "error.url.missing.param.parameter", "commentUuid");
			}
			
			if (calendar != null) {
				DBUser user = permissionHelper.getUser(request);
				if(user == null) {
					respondLogin(request, response);
					return;
				}
				
				if(!RuntimeConfiguration.getBooleanValue("allowCommentsFromNonCommunityMember") || calendar.getVisibility().equals(DBCalendar.PRIVATE)) {
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
				
				// can only delete the comments made by self or if you are the owner of the calendar or if you are the org-admin
				int userRole = permissionHelper.getRole(request, calendar.getCommunity_UUID(), calendar.getORG_ID());
				if (comment.getCreatedBy().equals(user.getUserUUID()) || userRole == 2) {
					crud.removeComment(commentUuid, inst, event, calendar, user);
					respondDeleted(response);
				} else {
					respondForbidden(response);
				}
			} else {
				respondNotFound(response);
			}
			
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
