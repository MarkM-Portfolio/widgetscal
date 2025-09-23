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
package com.ibm.ilel.seedlist.retriever.connections.calendar.datasource;

import java.util.logging.Level;
import java.util.logging.Logger;

import com.ibm.ilel.seedlist.retriever.connections.calendar.data.CalendarDataSourceException;

public class SeedlistServiceFactoryImp implements SeedlistServiceFactory {

	private static final String CLASSNAME = SeedlistServiceFactoryImp.class.getName();
	private static Logger logger = Logger.getLogger(CLASSNAME);

	static private SeedlistService SERVICE = null;

	public synchronized SeedlistService create() throws CalendarDataSourceException {

		String method = "create";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		try {
			Class<?> serviceClass = Class.forName("com.ibm.ilel.seedlist.retriever.connections.calendar.datasource.SeedlistService", true, getClass().getClassLoader());

			SERVICE = (SeedlistService) serviceClass.newInstance();

			if (logger.isLoggable(Level.FINER)) {
				logger.exiting(CLASSNAME, method);
			}

			return SERVICE;

		} catch (Exception e) {
			if (logger.isLoggable(Level.FINER)) {
				logger.throwing(CLASSNAME, method, e);
			}

			throw new CalendarDataSourceException(e);
		}
	}
}
