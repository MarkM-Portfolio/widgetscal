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

package com.ibm.lconn.calendar.servlet;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.json.java.JSONObject;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.util.UserUtilities;
import com.ibm.lconn.core.web.cache.WebCacheUtil;

public class PermissionCheckServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;

	private static final String CLASS_NAME = PermissionCheckServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		WebCacheUtil.disableCaching(response);
		response.setContentType("application/json; charset=utf-8");
		
		String userId = request.getParameter("userId");
		String externalId = request.getParameter("userExternalId");
		String calendarUuid = request.getParameter("calendarUuid");
		
		DBUser user = null;
		DBCalendar calendar = null;
		
		if(userId != null) {
        	user = UserUtilities.findUserById(userId);
        } else if(externalId != null){
        	user = UserUtilities.findUserByExtId(externalId, true);
        }
		
		if(calendarUuid != null) {
        	calendar = crud.getCalendarDAO().getCalendar(calendarUuid);
        }
		
		boolean hasAccess = calendar!=null ? this.permissionHelper.isUserAuthorizedToAccess(user, calendar):false;
		
		JSONObject obj = new JSONObject();
		obj.put("hasAccess", hasAccess ? true : false);
		response.getWriter().print("{}&&"+obj.toString());
		response.flushBuffer();
	}
}
