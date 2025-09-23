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
package com.ibm.lconn.calendar.datapop.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.TimeZone;

import com.ibm.lconn.calendar.datapop.core.Formatter;

public class Iso8601DateFormatter extends Formatter {
	public Iso8601DateFormatter() {
		super();
	}
	
	public String getName() {
		return "iso8601-date";
	}
	
	public Object format(Object o) {
		if(o == null) 
			return null;
		
		if(o instanceof List) {
			List l = (List)o;
			
			List ret = new ArrayList();
			for(Iterator iter = l.iterator(); iter.hasNext(); ) {
				ret.add(format(iter.next()));
			}
			return ret;
		} else if(o instanceof Long){
			return _format(new Date(((Long)o)*60000L));
		} else if(o instanceof String) {
			return _format(new Date((Long.parseLong((String)o))*60000L));
		}
		throw new DataPopulationException("Bad parameter: " + o);
	}
	
	protected String _format( Date date ) {
        SimpleDateFormat df = new SimpleDateFormat( "yyyy-MM-dd'T'HH:mm:ssz" );
        TimeZone tz = TimeZone.getTimeZone( "UTC" );
        df.setTimeZone( tz );

        String output = df.format( date );

        String result = output.replaceAll( "UTC", "+00:00" );
        return result;
    }
	
	public static void main(String[] args) throws Exception {
		System.out.println(new Iso8601DateFormatter().format(1320851803L));
		System.out.println(new Iso8601DateFormatter().format(1320853418L));
	}
}
