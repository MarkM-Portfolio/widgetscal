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

package com.ibm.lconn.calendar.test.servlets.mock;

import javax.servlet.http.HttpServletRequest;

import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.servlet.IPermissionHelper;
import com.ibm.lconn.calendar.util.HighwayConfig;

public class PermissionHelperMock implements IPermissionHelper {

	@Override
	public HighwayConfig getUserHighwayConfig(HttpServletRequest request)
			throws DSProviderException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DBUser getUser(HttpServletRequest request)
			throws DSProviderException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DBUser getUser(String remoteUser) throws DSProviderException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DBUser getUserByUUID(String userUUID) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getRole(HttpServletRequest request, String commID, String orgID)
			throws DSProviderException {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getRole(DBUser user, String commID) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean isUserAuthorizedToAccess(DBUser user, DBCalendar calendar) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public int isUserAuthorized(HttpServletRequest request,
			DBCalendar calendar, String evtAuthor, int operation)
			throws DSProviderException {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean isUserMemberOf(HttpServletRequest request,
			DBCalendar calendar) throws DSProviderException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isUserOwnerOf(HttpServletRequest request, DBCalendar calendar)
			throws DSProviderException {
		// TODO Auto-generated method stub
		return false;
	}

}
