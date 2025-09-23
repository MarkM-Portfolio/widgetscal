/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.util;

import java.io.InputStream;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.configuration.HierarchicalConfiguration;
import org.apache.commons.configuration.XMLConfiguration;

import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.VenturaConfigHelperException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

public class RuntimeConfiguration {
	private static final Logger LOGGER = Logger.getLogger(RuntimeConfiguration.class.getName());
	
	private static Properties properties = new Properties();
	
	public static final ThreadLocal<Boolean> oauth = new ThreadLocal<Boolean>();
	
	static {
		loadProperties();
		loadConfiguration();
	}
	
	protected static void loadProperties() {
		try {
			properties.load(RuntimeConfiguration.class.getResourceAsStream("/calendar.application.properties"));
		} catch (Exception ex) {
			// should not happen
			LOGGER.log(Level.FINEST, "Fail to load application properties", ex);
		}
	}
	
	@SuppressWarnings("unchecked")
	protected static void loadConfiguration() {
		try {
			XMLConfiguration config = null;
			
			try {
				VenturaConfigurationProvider configurationProvider = VenturaConfigurationProvider.Factory.getInstance();
				
				config = (XMLConfiguration)configurationProvider.getConfiguration("calendar");
			} catch(Exception ex) {
				LOGGER.log(Level.FINEST, "Fail to load 'calendar-config.xml' from 'LotusConnections-config'", ex);
			}
			
			if(config == null) {
				try {
					config = new XMLConfiguration();
	                InputStream in = RuntimeConfiguration.class.getResourceAsStream("calendar-config.xml");
	                in.mark(10);   // mark the beginning of the file
	                // now check for BOM
	                if (in.read() == 239) {  // x'fe'
	                    // BOM is there, read the 2 remaining BOM bytes
	                    in.read();
	                    in.read();
	                }
	                else {
	                    // there is no BOM, reset to the beginning of the file
	                    in.close();
	                    in = RuntimeConfiguration.class.getResourceAsStream("calendar-config.xml");
	                }
	                config = new XMLConfiguration();
	                config.load(in, "UTF-8");
				} catch(Exception ex) {
					LOGGER.log(Level.FINEST, "Fail to load 'calendar-config.xml' from application classpath", ex);
				}
			}
			
			if(config != null) {
				HierarchicalConfiguration.Node root = config.getRoot();
				
				{
					HierarchicalConfiguration.Node node = (HierarchicalConfiguration.Node) root.getChildren("repeatingEvent").get(0);
					List<HierarchicalConfiguration.Node> l = node.getChildren();
					for(HierarchicalConfiguration.Node n : l) {
						properties.put("repeatingEvent." + n.getName(), n.getValue());
					}
				}
				
				{
					HierarchicalConfiguration.Node node = (HierarchicalConfiguration.Node) root.getChildren("icalFeed").get(0);
					List<HierarchicalConfiguration.Node> l = node.getChildren();
					for(HierarchicalConfiguration.Node n : l) {
						properties.put("icalFeed." + n.getName(), n.getValue());
					}
				}
				
				{
					HierarchicalConfiguration.Node node = (HierarchicalConfiguration.Node) root.getChildren("allowCommentsFromNonCommunityMember").get(0);
					properties.put("allowCommentsFromNonCommunityMember", node.getValue());
				}
			}
			
			Properties genProperties = VenturaConfigurationHelper.Factory.getInstance().getGenericProperties();
	    	if (!genProperties.isEmpty()) {
	    		String property = genProperties.getProperty(VenturaConfigurationHelper.visitorModelEnabledKey);
	    		if (null != property) {
	    			properties.put(VenturaConfigurationHelper.visitorModelEnabledKey, property);
	    		}
	    		String publicCacheEnabledProp = genProperties.getProperty("publicCacheEnabled");
	    		if (null != publicCacheEnabledProp) {
	    			properties.put("publicCacheEnabled", publicCacheEnabledProp);
	    		}
	    	}
		} catch(Exception ex) {
			// should not happen
			LOGGER.log(Level.FINEST, "Fail to load 'calendar-config.xml'", ex);
		}
	}
	public  static boolean isVisitorModeEnabled() {
	    	
    	Boolean enabled = getBooleanValue(VenturaConfigurationHelper.visitorModelEnabledKey);
    	return enabled == null ? false:enabled;
	}
	public static boolean isPublicCacheEnabled() {
		Boolean enabled = getBooleanValue("publicCacheEnabled");
		return enabled == null ? true:enabled;
    }
	public static String getValue(String key) {
		return properties.getProperty(key);
	}
	
	public static Integer getIntValue(String key) {
		String value = getValue(key);
		if(value == null)
			return null;
		return Integer.parseInt(value);
	}
	
	public static Long getLongValue(String key) {
		String value = getValue(key);
		if(value == null)
			return null;
		return Long.parseLong(value);
	}
	
	public static Boolean getBooleanValue(String key) {
		String value = getValue(key);
		if(value == null)
			return null;
		return Boolean.parseBoolean(value);
	}
	
	public static void main(String[] args) {
		RuntimeConfiguration.loadConfiguration();
		for(Object key : RuntimeConfiguration.properties.keySet()) {
			System.out.print(key);
			System.out.print("=");
			System.out.println(RuntimeConfiguration.properties.getProperty((String)key));
		}
	}
}
