/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.util;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import com.ibm.lconn.core.customization.ApplicationCustomization;
import com.ibm.lconn.core.customization.Customization;

public class ResourceBundleUtils {
	public static final Customization _resourceInstance = ApplicationCustomization.getInstance();
	
	public static final Map<String, ResourceBundle> cache = new HashMap<String, ResourceBundle>();
	
	public static ResourceBundle getBundle(String bundle) {
		return getBundle(bundle, Locale.getDefault());
	}

	public static ResourceBundle getBundle(String bundle, Locale locale) {
		if(locale == null)
			locale = Locale.getDefault();
		
		String key = bundle + " [locale: " + locale.toString() + "]";
		if(cache.containsKey(key)) {
			return cache.get(key);
		} else {
			ResourceBundle ret = _resourceInstance.getBundle(bundle, locale);
			cache.put(key, ret);
			return ret;
		}
	}

	public static ResourceBundle getMessageBundle() {
		return getBundle("com.ibm.lconn.calendar.strings.log");
	}

	public static ResourceBundle getMessageBundle(Locale locale) {
		return getBundle("com.ibm.lconn.calendar.strings.log", locale);
	}
	
	public static ResourceBundle getUIBundle() {
		return getBundle("com.ibm.lconn.calendar.strings.ui");
	}

	public static ResourceBundle getUIBundle(Locale locale) {
		return getBundle("com.ibm.lconn.calendar.strings.ui", locale);
	}
}
