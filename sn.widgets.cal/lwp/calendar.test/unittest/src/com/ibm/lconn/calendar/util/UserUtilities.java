/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.util;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.connections.directory.services.DSProvider;
import com.ibm.connections.directory.services.DSProviderFactory;
import com.ibm.connections.directory.services.data.DSObject;
import com.ibm.connections.directory.services.exception.DSException;
import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.core.url.ThreadHttpRequest;
import com.ibm.lconn.core.web.mt.TenantLookupFilter;

public class UserUtilities {
	private static Log _log = LogFactory.getLog(UserUtilities.class);
	 
    public static DSObject findUserByLoginNameFromLDAP(String loginName) throws DSException {
    	return null;
	}
    
    @SuppressWarnings("deprecation")
	public static DSObject findUserByExtIdFromLDAP(String uid) throws DSException {
    	return null;
	}
    
    public static DSObject findUserByEmailFromLDAP(String email) throws DSException {
    	return null;
	}
    
    public static DBUser addUser(DBUser user) {
    	return user;
	}
    
    public static DBUser findUserByEmail(String email, boolean bSync) {
		return null;
	}
	
	public static DBUser findUserByExtId(String uid, boolean bSync) {
		return null;
	}
	
	public static DBUser findUserById(String id) {
		DBUser user = new DBUser();
		user.setUserEmail("abc-" + id + "@acme.com");
		user.setUserUUID(id);
		user.setUserExtID("extid-" + id);
		user.setUserName("user-" + id);
		user.setUserState(0);
		return user;
	}
}
