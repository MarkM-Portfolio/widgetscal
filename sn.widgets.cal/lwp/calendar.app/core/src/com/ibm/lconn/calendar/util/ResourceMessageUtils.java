/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.util;

import java.text.MessageFormat;
import java.util.Locale;

public class ResourceMessageUtils {
	public static String logMessage(String key, Locale locale) {
		return ResourceBundleUtils.getMessageBundle(locale).getString(key);
	}
	
	public static String logMessage(String key, Locale locale, Object... params) {
		return MessageFormat.format(ResourceBundleUtils.getMessageBundle(locale).getString(key), params);
	}
	
	public static String uiMessage(String key, Locale locale) {
		return ResourceBundleUtils.getUIBundle(locale).getString(key);
	}
	
	public static String uiMessage(String key, Locale locale, Object... params) {
		return MessageFormat.format(ResourceBundleUtils.getUIBundle(locale).getString(key), params);
	}
}
