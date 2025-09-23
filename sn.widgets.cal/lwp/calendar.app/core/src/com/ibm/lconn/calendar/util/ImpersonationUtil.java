/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.util;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.core.web.exception.InvalidImpersonationException;
import com.ibm.lconn.core.web.exception.InvalidUserImpersonationException;
import com.ibm.lconn.core.web.impersonation.ImpersonationHelper;

public class ImpersonationUtil {
	
	public DBUser getImpersonator(HttpServletRequest request, String contentOrgId) throws InvalidUserImpersonationException, InvalidImpersonationException {
		ImpersonationHelper.setupImpersonationRoles(new String[]{"admin", "org-admin"});
		ImpersonationHelper imhelper = new ImpersonationHelper(request);
		DBUser user = null;
		if(!imhelper.IsValidImpersonationRequest()) {
			return null;
		} else {
			if(imhelper.isImpersonationAllowed(contentOrgId)){
				String extID = imhelper.getImpersonatedUserDirectoryId();
				user = UserUtilities.findUserByExtId(imhelper.getImpersonatedUserDirectoryId(), true);
				if(user == null){
					String email = imhelper.getImpersonatedUserEmail();
					user = UserUtilities.findUserByEmail(email, true);
					if(user == null){
						String displayName = imhelper.getImpersonatedUserDisplayName(),
								   orgId = imhelper.getImpersonatedUserTenantid();
						user = new DBUser();
						user.setIsExternal(1);
						user.setORG_ID(orgId == null ? "a" : orgId);
						user.setUserEmail(email);
						user.setUserExtID(extID);
						user.setUserName(displayName);
						user = UserUtilities.addUser(user);
						user = UserUtilities.findUserByExtId(extID, true);
					}
				}
			} else {
				throw new InvalidImpersonationException();
			}
		}
		return user;
	}

}
