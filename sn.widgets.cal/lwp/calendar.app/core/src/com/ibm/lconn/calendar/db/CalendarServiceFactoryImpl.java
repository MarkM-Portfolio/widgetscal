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

package com.ibm.lconn.calendar.db;

public class CalendarServiceFactoryImpl implements CalendarServiceFactory {

    private CalendarService _calendarService = null;
    
    public synchronized CalendarService create() {

    	if(_calendarService == null)	{
    		try {
    			Class serviceClass = Class.forName( "com.ibm.lconn.calendar.db.CalendarService", true, getClass( ).getClassLoader( ));
    			_calendarService = (CalendarService) serviceClass.newInstance( );

            }
            catch( Throwable e) {
                throw new RuntimeException( e);
            }
    	}
        return _calendarService;
    }

}
