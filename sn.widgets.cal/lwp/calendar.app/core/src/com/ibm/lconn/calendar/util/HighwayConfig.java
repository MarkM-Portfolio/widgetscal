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

package com.ibm.lconn.calendar.util;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.connections.highway.client.api.HighwayAdminClient;
import com.ibm.connections.highway.client.api.HighwaySetup;
import com.ibm.connections.highway.common.api.HighwayConstants;
import com.ibm.connections.highway.common.api.HighwayException;
import com.ibm.connections.highway.common.api.HighwaySettingNames;
import com.ibm.connections.highway.common.api.HighwayUserSessionInfo;
import com.ibm.lconn.calendar.db.model.DBUser;

public class HighwayConfig {

	private static final Log logger = LogFactory.getLog(HighwayConfig.class);

	private static String SETTINGS_COMMUNITIES_ALLOW_PUBLIC = "communities.allow.see.public.community";
	private static HighwayAdminClient client = HighwaySetup.getHighwayAdminClient(HighwayConstants.COMMUNITIES);
	private HighwayUserSessionInfo highwaySession = null;

	private Boolean isExternalUser = null;
	private Boolean allowPublicCommunities = null;
	
	private DBUser user = null;

	public HighwayConfig(HttpServletRequest request) throws ServletException {
		highwaySession = HighwaySetup.createUserInfoFromRequest(request);
	}

	public HighwayConfig(String extId, String orgId) throws ServletException {
		highwaySession = HighwaySetup.createUserSessionInfo(extId, orgId);
	}
	
	public void setUser(DBUser user) {
		this.user = user;
	}

	public boolean isExternalUser() {
		if(logger.isDebugEnabled() && highwaySession!=null) {
			for(String role : highwaySession.getRoles()) {
				logger.debug("role: " + role);
			}
		}
		if(isExternalUser != null) return isExternalUser;
		
		if (highwaySession!=null) {
			isExternalUser = highwaySession.getRoles().contains(HighwaySettingNames.EXTERNALUSER_ROLE);
		} else {
			isExternalUser = false;
		}
		return isExternalUser;
	}

	public boolean allowPublicCommunities() {
		if (allowPublicCommunities == null) {
			try {
				if(client!=null && highwaySession!=null) {
					allowPublicCommunities = !"false".equalsIgnoreCase((String) client.getSetting(highwaySession, SETTINGS_COMMUNITIES_ALLOW_PUBLIC));
				} else {
					allowPublicCommunities = true;
				}
			} catch (HighwayException e) {
				logger.error("error occurs while get setting:", e);
				allowPublicCommunities = true;
			}
		}
		return allowPublicCommunities;
	}
}
