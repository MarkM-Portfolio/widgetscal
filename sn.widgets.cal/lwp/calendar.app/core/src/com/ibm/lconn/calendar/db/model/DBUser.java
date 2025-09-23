/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.model;

import java.io.Serializable;

import com.ibm.lconn.calendar.util.HighwayConfig;
import com.ibm.lconn.calendar.util.Utilities;

/**
 * @author skomard
 */

public class DBUser extends MultitenancyPersistentObject implements Serializable {
	private static final long serialVersionUID = 1L;
	
	// Attributes
	private String userUUID;
	private String userExtID;
	private String userEmail;
	private String userName;
	private Integer userState = 0;
	private Integer isExternal = 0;
	
	// Accessors and Mutators
	
	/**
	 * @param userUUID the userUUID to set
	 */
	public void setUserUUID(String userUUID) {
		this.userUUID = userUUID;
	}

	/**
	 * @return the userUUID
	 */
	public String getUserUUID() {
		return userUUID;
	}
	
	
	/**
	 * @param userExtID the userExtID to set
	 */
	public void setUserExtID(String userExtID) {
		this.userExtID = userExtID;
	}

	/**
	 * @return the userExtID
	 */
	public String getUserExtID() {
		return userExtID;
	}

	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * @param userEmail the userEmail to set
	 */
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	/**
	 * @return the userEmail
	 */
	public String getUserEmail() {
		return userEmail;
	}
	
	/**
	 * @param userState the userState to set
	 */
	public void setUserState(Integer userState) {
		this.userState = userState;
	}

	/**
	 * @return the userState
	 */
	public Integer getUserState() {
		return userState;
	}

	public Integer getIsExternal() {
		return isExternal;
	}

	public void setIsExternal(Integer isExternal) {
		this.isExternal = isExternal;
	}
	
	private HighwayConfig highwayConfig = null;
	
	public HighwayConfig getHighwayConfig() {
		if(highwayConfig == null) {
			highwayConfig = Utilities.getUserHighwayConfig(this.getUserExtID(), this.getORG_ID());
			if(highwayConfig != null) {
				highwayConfig.setUser(this);
			}
		}
		return highwayConfig;
	}
	
} // end of class