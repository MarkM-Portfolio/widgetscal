/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2011                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.exception;

/**
 * @author skomard
 */

public class DSProviderException extends Exception {
	private static final long serialVersionUID = 1L;

	public DSProviderException(Throwable t) {
        super(t);
    }
    
    public DSProviderException() {
        super();
    }
}
