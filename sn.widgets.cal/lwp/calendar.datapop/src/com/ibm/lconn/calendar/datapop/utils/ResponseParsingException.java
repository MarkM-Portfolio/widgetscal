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

package com.ibm.lconn.calendar.datapop.utils;

public class ResponseParsingException extends RuntimeException {
	private static final long serialVersionUID = -4017921813836772198L;

	public ResponseParsingException() {
		super();
	}

	public ResponseParsingException(String message, Throwable cause) {
		super(message, cause);
	}

	public ResponseParsingException(String message) {
		super(message);
	}

	public ResponseParsingException(Throwable cause) {
		super(cause);
	}
}
