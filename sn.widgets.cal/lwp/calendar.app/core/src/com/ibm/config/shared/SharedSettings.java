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
package com.ibm.config.shared;

/**
 * A fake SharedSetting in SmartCloud
 */
public class SharedSettings {
	public static final String PROP_S2S_TOKEN = "s2stoken";
	
	public synchronized static SharedSettings getInstance() {
		return null;
	}
	public String getProperty(String name) {
		return null;
	}
	
	public String getSharedServiceURL(String serviceId) {
		return null;
	}
}

