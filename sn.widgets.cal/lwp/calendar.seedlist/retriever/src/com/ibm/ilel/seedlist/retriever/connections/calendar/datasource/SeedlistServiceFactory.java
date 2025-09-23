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

import com.ibm.ilel.seedlist.retriever.connections.calendar.data.CalendarDataSourceException;

public interface SeedlistServiceFactory {
	public static SeedlistServiceFactory INSTANCE = new SeedlistServiceFactoryImp();

	public SeedlistService create() throws CalendarDataSourceException;
}
