/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.test.db;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;
import java.util.Comparator;

import com.ibm.icu.text.DateFormat;
import com.ibm.icu.text.SimpleDateFormat;

import com.ibm.icu.util.Calendar;
import com.ibm.icu.util.TimeZone;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.dao.model.EventInstanceDAO;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.test.core.BaseTestCase;

public class EventInstanceCompareTest extends BaseTestCase {
	int loop;

	DateFormat printFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");

	protected void setUp() throws Exception {
		super.setUp();

	}

	protected void tearDown() throws Exception {
		super.tearDown();
	}

	private DBEventInstance newRandomInstance(Date start, Date end,
			boolean isAllday) {
		DBEventInstance r = new DBEventInstance();
		r.setEventInst_UUID(UUID.randomUUID().toString());
		r.setEvent_UUID(UUID.randomUUID().toString());
		r.setCalendar_UUID(UUID.randomUUID().toString());
		DBEventInfo eventInfo = new DBEventInfo();
		eventInfo.setEventInfo_UUID(UUID.randomUUID().toString());
		eventInfo.setIsAllDay(isAllday);
		r.setEventInfo(eventInfo);
		r.setStartDate(start);
		r.setEndDate(end);
		return r;

	}

	private DBEventInstance newRandomInstance(int start, int end,
			boolean isAllday) {
		return newRandomInstance(new Date(start), new Date(end), isAllday);
	}

	public void testDateInOneZone1() throws Exception{
		for (String s : TimeZone.getAvailableIDs()) {
			 _testDateInOneZone1(TimeZone.getTimeZone(s)); 
		}
	}

	public void testDateInOneZone2() throws Exception{
		loop = 0;
		for (String s : TimeZone.getAvailableIDs()) {
			 _testDateInOneZone2(TimeZone.getTimeZone(s)); 
			 loop++;
		}
	}

	public void _testDateInOneZone1(TimeZone z) throws Exception {
		Comparator<DBEventInstance> comparator = new DBEventInstance.ComparatorByStartDate(z,true);
		
		Calendar c = Calendar.getInstance(z);
		Calendar cutc = Calendar.getInstance(TimeZone.getTimeZone("utc"));	
		
		cutc.clear();
		cutc.set(2015,2,4);
		Date d1 = cutc.getTime();
		cutc.set(2015,2,5);
		Date d2 = cutc.getTime();
		Date d3 = d2;
		cutc.set(2015,2,6);
		Date d4 = cutc.getTime();
		
		c.clear();
		c.set(2015,2,4);
		Date t1 = c.getTime();
		c.set(2015,2,5);
		Date t2 = c.getTime();
		Date t3 = t2;
		c.set(2015,2,6);
		Date t4 = c.getTime();
		
		assertTrue( comparator.compare(
			newRandomInstance(d1,d2,true),
			newRandomInstance(d3,d4,true)
		) < 0);
		

		
		assertTrue( comparator.compare(
			newRandomInstance(t1,t2,false),
			newRandomInstance(d3,d4,true)
		) < 0);
		
		assertTrue( comparator.compare(
				newRandomInstance(d1,d2,true),
				newRandomInstance(t3,t4,false)
		) < 0);
		
		assertTrue( comparator.compare(
				newRandomInstance(t1,t2,false),
				newRandomInstance(t1,t4,false)
		) < 0);
		
		assertTrue( comparator.compare(
				newRandomInstance(t1,t2,false),
				newRandomInstance(d1,d2,true)
		) > 0);
		
		assertTrue( comparator.compare(
				newRandomInstance(d1,d2,true),
				newRandomInstance(t1,t2,false)
		) < 0);
		
		
	}

	public void _testDateInOneZone2(TimeZone z) throws Exception {
		Comparator<DBEventInstance> comparator = new DBEventInstance.ComparatorByStartDate(z,true);
	
		Calendar c = Calendar.getInstance(z);	
		Calendar cutc = Calendar.getInstance(TimeZone.getTimeZone("utc"));	

		printFormat.setTimeZone(z);
		
		c.clear();
		cutc.clear();
		cutc.set(2015,2,4);
		Date t1 = cutc.getTime();
		cutc.set(2015,2,5);
		Date t2 = cutc.getTime();
		c.set(2015,2,3);
		Date tt1 = c.getTime();
		
		for (int i = 0; i <24; i++){
			c.add(Calendar.HOUR_OF_DAY,1);
			Date tt2 = c.getTime();
			
			assertTrue("[OZ.2.1]("+loop+")"+printFormat.format(tt1)+" "+printFormat.format(t1),comparator.compare(
					newRandomInstance(t1,t2,true),
					newRandomInstance(tt1,tt2,false)
			) > 0);
			tt1 = tt2;
		}
		
		for (int i = 0; i < 24; i++){
			c.add(Calendar.HOUR_OF_DAY,1);
			Date tt2 = c.getTime();
			assertTrue("[OZ.2.2]("+loop+")"+printFormat.format(tt1) ,comparator.compare(
					newRandomInstance(t1,t2,true),
					newRandomInstance(tt1,tt2,false)
			) < 0);
			tt1 = tt2;
		}
	}
}
