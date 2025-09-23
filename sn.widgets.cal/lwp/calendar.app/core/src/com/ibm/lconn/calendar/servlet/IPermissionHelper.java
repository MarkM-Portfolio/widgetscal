/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* (C) Copyright IBM Corp. 2015                                      */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.servlet;

import javax.servlet.http.HttpServletRequest;

import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.util.HighwayConfig;

public interface IPermissionHelper {

	public abstract HighwayConfig getUserHighwayConfig(
			HttpServletRequest request) throws DSProviderException;

	public abstract DBUser getUser(HttpServletRequest request)
			throws DSProviderException;

	/**
	 * Returns the user's DTO based on an HttpServletRequest
	 * @param userUuid
	 * @return user - Data Transfer Object containing basic information about the user who made the request
	 * @throws DSProviderException If something failed to create. This shouldn't ever happen.
	 */
	public abstract DBUser getUser(String remoteUser)
			throws DSProviderException;

	/**
	 * Returns the user's UUID based on an HttpServletRequest
	 * @param userUuid
	 * @return user - Data Transfer Object containing basic information about the user who made the request
	 * @throws DSProviderException If something failed to create. This shouldn't ever happen.
	 */
	public abstract DBUser getUserByUUID(String userUUID);

	/**
	 * 
	 * @param request
	 * @param commID The community uuid
	 * @param orgID The community orgID
	 * @return 0 if not part of this comm, 1 if member, 2 if owner, or -1 if the user was not authenticated
	 * @throws DSProviderException If something failed to create. This shouldn't ever happen.
	 */
	public abstract int getRole(HttpServletRequest request, String commID, String orgID)
			throws DSProviderException;

	/**
	 * 
	 * @param user
	 * @param commID The community uuid
	 * @return 0 if not part of this comm, 1 if member, 2 if owner, or -1 if the user was not authenticated
	 * @throws DSProviderException If something failed to create. This shouldn't ever happen.
	 */
	public abstract int getRole(DBUser user, String commID);

	/**
	 * This method checks if user has access permission to the given community calendar
	 * 
	 * @param user
	 * @param calendar
	 * @throws DSProviderException
	 */
	public abstract boolean isUserAuthorizedToAccess(DBUser user,
			DBCalendar calendar);

	/**
	 * This method checks if user is authenticated with the system and if he is
	 * a member of the community the action is to be performed upon
	 * 
	 * @param request
	 *            - Current request
	 * @param calendar
	 *            - Calendar object
	 * @param evtAuthor
	 *            - Creator of the event
	 * @param operation
	 *            - Intended operation to be performed on the event (must be one
	 *            of the CalendarEventOperation constants)
	 * @return HTTP response code
	 * @throws DSProviderException
	 */
	public abstract int isUserAuthorized(HttpServletRequest request,
			DBCalendar calendar, String evtAuthor, int operation)
			throws DSProviderException;

	public abstract boolean isUserMemberOf(HttpServletRequest request,
			DBCalendar calendar) throws DSProviderException;

	public abstract boolean isUserOwnerOf(HttpServletRequest request,
			DBCalendar calendar) throws DSProviderException;

}