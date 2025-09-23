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
package com.ibm.ilel.seedlist.retriever.connections.calendar;

import java.util.Properties;
import javax.servlet.http.HttpServletRequest;

public class CalendarPublicRetrieverService extends CalendarRetrieverService {
	public CalendarPublicRetrieverService(Properties properties, HttpServletRequest servletRequest) {
		super(properties, servletRequest);
	}

	protected boolean isPublic() {
		return true;
	}
}
