/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2016                                    */
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
import com.ibm.lconn.core.gatekeeper.LCGatekeeper;
import com.ibm.lconn.core.gatekeeper.LCGatekeeperException;
import com.ibm.lconn.core.gatekeeper.LCSupportedFeature;
import com.ibm.lconn.core.url.ThreadHttpRequest;
import com.ibm.lconn.core.web.mt.TenantLookupFilter;

public class UserUtilities {
	private static Log _log = LogFactory.getLog(UserUtilities.class);
	
	private static DSProvider _dsProvider = DSProviderFactory.INSTANCE.getProfileProvider();
    
    public static DSObject findUserByLoginNameFromLDAP(String loginName) throws DSException {
    	ExecutionContext.runAs(ExecutionContext.IGNORE_TENANTKEY);
    	
    	try {
	    	String orgId = (String)ThreadHttpRequest.get().getAttribute(TenantLookupFilter.ORGANIZATION_ID_ATTRIBUTE);
	    	DSObject dsObject = null;
	    	boolean hasVisitorModelEnabled = LCGatekeeper.isEnabledGlobally(LCSupportedFeature.CONNECTIONS_VISITOR_MODEL);
	    	if(hasVisitorModelEnabled){
	    		dsObject = _dsProvider.findUserByPrincipal(loginName, orgId);
	    	}else{
	    		dsObject = _dsProvider.searchUserByExactLoginUserNameMatch(loginName, orgId);
	    	}
	    	
	    	if(dsObject == null) {
	    		if(_log.isDebugEnabled())
	    			_log.debug("UserUtilities.getUserByLoginNameFromLDAP(<<" + loginName + ">>): Couldn't retrieve user profile from DSProvider <<" + _dsProvider.getClass() + ">>");
	    		return null;
	    	}
	    	
	    	return dsObject;
    	} catch (LCGatekeeperException ex) {
    		throw new DSException(ex);
    	} finally {
    		ExecutionContext.exit();
    	}
	}
    
    @SuppressWarnings("deprecation")
	public static DSObject findUserByExtIdFromLDAP(String uid) throws DSException {
    	ExecutionContext.runAs(ExecutionContext.IGNORE_TENANTKEY);
    	
    	try {
	    	String orgId = (String)ThreadHttpRequest.get().getAttribute(TenantLookupFilter.ORGANIZATION_ID_ATTRIBUTE);
	    	DSObject dsObject = null;
	    	boolean hasVisitorModelEnabled = LCGatekeeper.isEnabledGlobally(LCSupportedFeature.CONNECTIONS_VISITOR_MODEL);
	    	if(hasVisitorModelEnabled){
	    		dsObject = _dsProvider.findUserByID(uid, orgId);
	    	}else{
	    		dsObject = _dsProvider.searchUserByExactIdMatch(uid);
	    	}
	    	
	    	if(dsObject == null) {
	    		if(_log.isDebugEnabled())
	    			_log.debug("UserUtilities.getUserByExtIdFromLDAP(<<" + uid + ">>): Couldn't retrieve user profile from DSProvider <<" + _dsProvider.getClass() + ">>");
	    		return null;
	    	}
	    	
	    	return dsObject;
    	} catch (LCGatekeeperException ex) {
    		throw new DSException(ex);
    	} finally {
    		ExecutionContext.exit();
    	}
	}
    
    public static DSObject findUserByEmailFromLDAP(String email) throws DSException {
    	ExecutionContext.runAs(ExecutionContext.IGNORE_TENANTKEY);
    	
    	try {
	    	String orgId = (String)ThreadHttpRequest.get().getAttribute(TenantLookupFilter.ORGANIZATION_ID_ATTRIBUTE);
	    	DSObject dsObject = null;
	    	boolean hasVisitorModelEnabled = LCGatekeeper.isEnabledGlobally(LCSupportedFeature.CONNECTIONS_VISITOR_MODEL);
	    	if(hasVisitorModelEnabled){
	    		dsObject = _dsProvider.findUserByEmail(email, orgId);
	    	}else{
	    		dsObject = _dsProvider.searchUserByExactEmailMatch(email, orgId);
	    	}
	    	
	    	if(dsObject == null) {
	    		if(_log.isDebugEnabled())
	    			_log.debug("UserUtilities.findUserByEmailFromLDAP(<<" + email + ">>): Couldn't retrieve user profile from DSProvider <<" + _dsProvider.getClass() + ">>");
	    		return null;
	    	}
	    	
	    	return dsObject;
    	} catch (LCGatekeeperException ex) {
    		throw new DSException(ex);
    	} finally {
    		ExecutionContext.exit();
    	}
	}
    
    public static DBUser addUser(DBUser user) {
    	ExecutionContext.runAs(ExecutionContext.IGNORE_TENANTKEY);
    	
    	try{
    		CalendarService cs = CalendarServiceFactory.INSTANCE.create();
    		user.setUserUUID(UUID.randomUUID().toString());
    		return cs.getUserInfoDao().insertUserRecord(user);
    	} finally {
    		ExecutionContext.exit();
    	}
	}
    
    public static DBUser findUserByEmail(String email, boolean bSync) {
		ExecutionContext.runAs(ExecutionContext.IGNORE_TENANTKEY);
		
		try {
			CalendarService cs = CalendarServiceFactory.INSTANCE.create();
			DBUser usr = cs.getUserInfoDao().getUserByEmail(email);
			if(usr == null) {
				try {
					DSObject dsObject = findUserByEmailFromLDAP(email);
					if(dsObject != null) {
						if(!bSync) {
							usr = new DBUser();
							usr.setUserUUID(null);
							usr.setUserName(dsObject.get_name());
							usr.setUserExtID(dsObject.get_id());
							usr.setUserEmail(dsObject.get_email());
							usr.setORG_ID(dsObject.get_orgid());
							usr.setIsExternal(dsObject.is_user_external() ? 1 : 0);
						} else {
							cs.getUserInfoDao().insertUserRecord(UUID.randomUUID().toString(), dsObject.get_orgid(), dsObject);
							usr = cs.getUserInfoDao().getUserByEmail(email);
						}
					}
				} catch (DSException ex) {
					if(_log.isDebugEnabled()) {
						ex.printStackTrace();
					}
				}
			}
			
			return usr;
		} finally {
			ExecutionContext.exit();
		}
	}
	
	public static DBUser findUserByExtId(String uid, boolean bSync) {
		ExecutionContext.runAs(ExecutionContext.IGNORE_TENANTKEY);
		
		try {
			CalendarService cs = CalendarServiceFactory.INSTANCE.create();
			DBUser usr = cs.getUserInfoDao().getUserByExtID(uid);
			if(usr == null) {
				try {
					DSObject dsObject = findUserByExtIdFromLDAP(uid);
					if(dsObject != null) {
						if(!bSync) {
							usr = new DBUser();
							usr.setUserUUID(null);
							usr.setUserName(dsObject.get_name());
							usr.setUserExtID(dsObject.get_id());
							usr.setUserEmail(dsObject.get_email());
							usr.setORG_ID(dsObject.get_orgid());
							usr.setIsExternal(dsObject.is_user_external() ? 1 : 0);
						} else {
							cs.getUserInfoDao().insertUserRecord(UUID.randomUUID().toString(), dsObject.get_orgid(), dsObject);
							usr = cs.getUserInfoDao().getUserByExtID(uid);
						}
					}
				} catch (DSException ex) {
					if(_log.isDebugEnabled()) {
						ex.printStackTrace();
					}
				}
			}
			
			return usr;
		} finally {
			ExecutionContext.exit();
		}
	}
	
	public static DBUser findUserById(String id) {
		ExecutionContext.runAs(ExecutionContext.IGNORE_TENANTKEY);
		
		try {
			return CalendarServiceFactory.INSTANCE.create().getUserInfoDao().getUserByUUID(id);
		} finally {
			ExecutionContext.exit();
		}
	}
}
