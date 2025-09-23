/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.util;

import java.security.Principal;
import java.util.Iterator;

import javax.security.auth.Subject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.config.shared.SharedSettings;
import com.ibm.websphere.security.WSSecurityException;
import com.ibm.websphere.security.auth.WSSubject;

public class LotusLiveUtilities {
	private static Log log = LogFactory.getLog(LotusLiveUtilities.class);
	
	public static final String PARAM_S2STOKEN = "s2stoken";
	public static final String PARAM_ONBEHALFOF = "onBehalfOf";
	
	private static final String CLASS_SHAREDSETTINGS = "com.ibm.config.shared.SharedSettings";
	public static final boolean isAvailable;
	
	static {
		boolean classFound = false;
		try {
			Class.forName(CLASS_SHAREDSETTINGS);
			classFound = true;
		} catch(ClassNotFoundException e) { 
			classFound = false;
		}
		isAvailable = classFound;
	}

	public static String getS2SToken() {
		if(!isAvailable) {
			return null;
		}
		SharedSettings settings = SharedSettings.getInstance();
		String s2sToken = settings.getProperty(SharedSettings.PROP_S2S_TOKEN);
		if(log.isDebugEnabled()) {
			log.debug("retrieved S2SToken: " + (s2sToken == null ? "null" : "value removed"));
		}
		return s2sToken;
	}

	public static String getCurrentUser() {
		Subject subject = null;
		try {
			subject = WSSubject.getRunAsSubject();
		} catch (WSSecurityException e) {
			log.warn("Failed to get runAs subject", e);
		}
		if(subject != null) {
			Iterator<Principal> principals = subject.getPrincipals(Principal.class).iterator();
			if(principals.hasNext()) {
				Principal p = principals.next();
				String principalName = p.getName();
				if(log.isDebugEnabled()) {
					log.debug("Current principal name is " + principalName);
				}
				//TODO revisit: whether it is good approach to remove the realm defaultWIMFileBasedRealm
				if(principalName != null) {
					int pos = principalName.indexOf('/');
					return principalName.substring(pos + 1);
				}
			}
		} 
		return null;
	}	
}
