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

package com.ibm.lconn.calendar.datapop.impl;


public class DataPopulationException extends RuntimeException {
	private static final long serialVersionUID = 1512226302196405718L;
	
	public DataPopulationException() {
		super();
	}

	public DataPopulationException(String message, Throwable cause) {
		super(message, cause);
	}

	public DataPopulationException(String message) {
		super(message);
	}

	public DataPopulationException(Throwable cause) {
		super(cause);
	}
}
