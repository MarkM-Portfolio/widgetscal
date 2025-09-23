/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* (C) Copyright IBM Corp. 2011                                      */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.calendar.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.xml.parsers.ParserConfigurationException;

import org.xml.sax.SAXException;

import com.ibm.trl.acf.api.ActiveContentProcessor;
import com.ibm.trl.acf.api.ActiveContentProcessorException;
import com.ibm.trl.acf.api.ActiveContentProcessorFactory;
import com.ibm.trl.acf.api.ContentTypeNotSupportedException;
import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider.ConfigFileInfo;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

public class ActiveContentFilter {
	private static final String CLASS_NAME = ActiveContentFilter.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);

	private static ActiveContentProcessorFactory factory;
	private static ActiveContentProcessor flashProcessor = null;
	private static final String DEFAULT_ENCODING = "utf-8";

	/**
	 * removes any active content from the input string
	 * 
	 * @param input
	 * @return
	 */
	public static String filter(String source) {
		if(source == null) {
			return null;
		}
		
		try {
			ActiveContentProcessor acp = getFlashProcessor();
			StringReader reader = new StringReader(source);
			StringWriter writer = new StringWriter(source.length());
			acp.process(reader, writer, DEFAULT_ENCODING);
			return writer.toString();
		} catch (Exception e) {
			LOGGER.log(Level.WARNING, ResourceBundleUtils.getMessageBundle().getString("error.util.acf.error"), e);
			// Fix me. Just return "" for exception can fix some issues but also
			// cause false positive filtering.
			return "";
		}
	}

	public static boolean filter(InputStream source, OutputStream dest, String charSet) {
		try {
			ActiveContentProcessor acp = getFlashProcessor();
			acp.process(source, dest, charSet);
		} catch (Exception e) {
			LOGGER.log(Level.WARNING, ResourceBundleUtils.getMessageBundle().getString("error.util.acf.error"), e);
			return false;
		}

		return true;
	}

	public static boolean filterFile(InputStream source, OutputStream dest, String charSet) throws Exception {
		boolean filtered = false;
		ActiveContentProcessor acp = getFlashProcessor();
		filtered = acp.process(source, dest, charSet);
		return filtered;
	}

	private static ActiveContentProcessor getFlashProcessor() throws IOException, SAXException, ParserConfigurationException, ActiveContentProcessorException, ContentTypeNotSupportedException,
			VenturaConfigException {
		if (flashProcessor == null) {
			if (factory == null) {
				try {
					factory = com.ibm.trl.acf.lookup.ActiveContentProcessorFactoryHome.getActiveContentProcessorFactory();
				} catch (Exception e) {
					throw new VenturaConfigException(e.getMessage());
				}
			}

			VenturaConfigurationHelper configService = VenturaConfigurationHelper.Factory.getInstance();
			String acfConfig = configService.getComponentConfig("communities").getACFConfigFile();

			// Get path to config files from vcp - LCC.xml should always be there
			VenturaConfigurationProvider vcp = VenturaConfigurationProvider.Factory.getInstance();
			ConfigFileInfo cfi = vcp.getConfigFileInfo("LotusConnections");
			String configLoc = cfi.getPath();
			configLoc = configLoc + File.separatorChar + "extern" + File.separatorChar + acfConfig;

			Properties properties = new Properties();
			properties.put(ActiveContentProcessorFactory.PROPERTY_USE_ANNOTATION, "true");
			if (Utilities.isFlashSupported()) {
				properties.put(ActiveContentProcessorFactory.PROPERTY_FLASH_PROTECTION, "true");
			} else {
				properties.put(ActiveContentProcessorFactory.PROPERTY_FLASH_PROTECTION, "false");
			}

			InputStream configIs = null;
			try {
				if (acfConfig != null) {
					configIs = new FileInputStream(configLoc);
					factory.setDefaultConfiguration(com.ibm.trl.acf.api.ActiveContentProcessorFactory.PROCESSOR_TYPE_HTML, properties, configIs);
				}
			} catch (FileNotFoundException e) {
				configIs = null;
				LOGGER.log(Level.WARNING, ResourceBundleUtils.getMessageBundle().getString("error.util.acf.error"), e);
			} catch (Exception e) {
				throw new VenturaConfigException(e.toString());
			}
			flashProcessor = factory.getActiveContentProcessor("text/html", properties);
		}

		return flashProcessor;
	}
}
