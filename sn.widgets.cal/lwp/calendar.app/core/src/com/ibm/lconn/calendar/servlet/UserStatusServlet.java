/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
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

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.lconn.calendar.db.model.DBEventFollowingRecord;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.core.web.cache.WebCacheUtil;

public class UserStatusServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;

	private static final String CLASS_NAME = UserStatusServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		WebCacheUtil.disableCaching(response);
		
		DBUser user = null;
		try {
			user = permissionHelper.getUser(request);
		} catch (DSProviderException ex) {
			if(LOGGER.isLoggable(Level.FINER)) {
				ex.printStackTrace();
			}
			user = null;
		}
		
		String instUuid = request.getParameter(PARAMETER_EVENT_INST_UUID);
		
		if(user == null || instUuid == null) {
			response.setContentType("application/json; charset=utf-8");
			response.getWriter().print("{}&&{}");
			response.flushBuffer();
			return;
		}
		
		DBEventInstance instance = crud.getEventInstanceDao().getEventInstance(instUuid);
		if(instance == null) {
			respondNotFound(response);
			return;
		}
		
		// following info
		int followed = crud.hasUserFollowedEvent(user, instance,DBEventFollowingRecord.FOLLOW);
		if(!instance.getEvent().getIsRecurrence() && followed == 2) {
			followed = 1;
		}

		// rsvp info
		int rsvped = crud.hasUserFollowedEvent(user, instance,DBEventFollowingRecord.ATTEND);
		if(!instance.getEvent().getIsRecurrence() && rsvped == 2) {
			rsvped = 1;
		}

		response.setContentType("application/json; charset=utf-8");
		response.getWriter().print("{}&&{");
		response.getWriter().print("followed: " + (followed == 1 ? "'instance'" : (followed == 2 ? "'series'" : "'none'"))+",rsvped: " + (rsvped == 1 ? "'instance'" : (rsvped == 2 ? "'series'" : "'none'")));
		response.getWriter().print("}");
		response.flushBuffer();
		return;
	}
}
