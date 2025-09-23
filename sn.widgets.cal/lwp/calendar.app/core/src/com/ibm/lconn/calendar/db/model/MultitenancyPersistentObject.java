/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.model;

import org.apache.commons.lang.StringUtils;

import com.ibm.lconn.calendar.util.ExecutionContext;

public abstract class MultitenancyPersistentObject {
	protected String orgId = ExecutionContext.DEFAULT_ORG_ID;
	
	public String getExternalOrgId() {
		if(StringUtils.isBlank(getORG_ID()) || ExecutionContext.DEFAULT_ORG_ID.equals(getORG_ID())) {
			return null;
		}
		return getORG_ID();
	}
	
	public String getORG_ID() {
		return this.orgId;
	}
	
	public void setORG_ID(String orgId) {
		if(StringUtils.isBlank(orgId)) {
			this.orgId = ExecutionContext.DEFAULT_ORG_ID;
		} else {
			this.orgId = orgId.trim();
		}
	}
}
