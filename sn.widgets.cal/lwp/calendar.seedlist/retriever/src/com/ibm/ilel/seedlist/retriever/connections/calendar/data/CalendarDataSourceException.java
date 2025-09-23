/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.ilel.seedlist.retriever.connections.calendar.data;

public class CalendarDataSourceException extends Exception {
	private static final long serialVersionUID = 3166331070855735132L;

	public CalendarDataSourceException() {
        super();
    }

    public CalendarDataSourceException(String message) {
        super(message);
    }

    public CalendarDataSourceException(Throwable cause) {
        super(cause);
    }

    public CalendarDataSourceException(String message, Throwable cause) {
        super(message, cause);
    }

}

