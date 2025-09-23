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

public class BadAtomEntryException extends CalendarException {
    private static final long serialVersionUID = 2L;

    public BadAtomEntryException() {
        super();
    }

    public BadAtomEntryException(String key, Object[] args) {
        super(key, args);
    }

    public BadAtomEntryException(Throwable t) {
        super(t);
    }

    public BadAtomEntryException(String key, Object[] args, Throwable t) {
        super(key, args, t);
    }
}
