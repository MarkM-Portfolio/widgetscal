/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.util;

import java.io.StringWriter;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.fortuna.ical4j.data.CalendarOutputter;
import net.fortuna.ical4j.model.DateTime;
import net.fortuna.ical4j.model.TimeZone;
import net.fortuna.ical4j.model.TimeZoneRegistry;
import net.fortuna.ical4j.model.TimeZoneRegistryFactory;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.property.CalScale;
import net.fortuna.ical4j.model.property.Description;
import net.fortuna.ical4j.model.property.DtEnd;
import net.fortuna.ical4j.model.property.DtStart;
import net.fortuna.ical4j.model.property.Location;
import net.fortuna.ical4j.model.property.ProdId;
import net.fortuna.ical4j.model.property.Summary;
import net.fortuna.ical4j.model.property.Uid;
import net.fortuna.ical4j.model.property.Version;

import org.apache.commons.lang.StringEscapeUtils;

import com.ibm.icu.util.Calendar;
import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.exception.CalendarException;

/**
 * @author damianoa
 */
public class ICalUtilities {

	private static final String CLASS_NAME = ICalUtilities.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);

	/**
	 * This is the smallest valid non-blank iCal file that
	 * can still be consumed by other feeds
	 * @return Simple iCal string
	 */
	public static String blankICalendar() {		
		return "BEGIN:VCALENDAR" + "\n" +
		"VERSION:2.0" + "\n" +
		"PRODID:-//IBM//iCal4j 1.0//EN" + "\n" +
		"CALSCALE:GREGORIAN" + "\n" +
		"METHOD:PUBLISH" + "\n" +
		"END:VCALENDAR";
	}
	
	/**
	* Exports an ical string based on a list of events
	*/
	public static String exportICalString(List<DBEventInstance> instances) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "exportICalString", new Object[] { instances });
		}
		
		CalendarService cs = CalendarServiceFactory.INSTANCE.create();
		
		// Even if there are no events, an iCal string still needs to be returned.
		String sReturn = blankICalendar();
		
		if(instances != null && instances.size() > 0) {
			try {
				net.fortuna.ical4j.model.Calendar iCal = new net.fortuna.ical4j.model.Calendar();
				iCal.getProperties().add(Version.VERSION_2_0);
				iCal.getProperties().add(new ProdId("-//IBM//iCal4j 1.0//EN"));
				iCal.getProperties().add(CalScale.GREGORIAN);
				for ( DBEventInstance instance : instances ) { 
					DBEvent event = cs.getEventDAO().getEvent(instance.getEvent_UUID());
					
					DBEventInfo dfEventInfo = event.getEventInfo();
					
					DBEventInfo eventInfo = instance.getEventInfo();
					if(eventInfo == null) {
						eventInfo = new DBEventInfo();
					}
					String name = Utilities.coalesce(eventInfo.getName(), dfEventInfo.getName());
					String desc = Utilities.coalesce(eventInfo.getDescription(MentionHelper.PLAIN_TEXT_MENTION_FORMATTER), dfEventInfo.getDescription(MentionHelper.PLAIN_TEXT_MENTION_FORMATTER));
					String location = Utilities.coalesce(eventInfo.getLocation(), dfEventInfo.getLocation());
					boolean isAllday = Utilities.coalesce(eventInfo.getIsAllDay(), dfEventInfo.getIsAllDay());
					
					VEvent vEvent = new VEvent();
					vEvent.getProperties().add(new Uid(event.getEvent_UUID()));
					vEvent.getProperties().add(new Summary(name));
					vEvent.getProperties().add(new Location(location));
					vEvent.getProperties().add(new Description(decodeString(desc)));
					
					if(isAllday) {
						Calendar utcStartDate = Calendar.getInstance(com.ibm.icu.util.TimeZone.getTimeZone("UTC"));
						utcStartDate.setTimeInMillis(instance.getStartDate().getTime());
						int h = utcStartDate.get(Calendar.HOUR_OF_DAY);
						if(h >= 11 && h <= 12) {
							isAllday = false;
						}
					}
					if(isAllday) { 
						Calendar utcStartDate = Calendar.getInstance(com.ibm.icu.util.TimeZone.getTimeZone("UTC"));
						utcStartDate.setTime(instance.getStartDate());
						
						int hour = utcStartDate.get(Calendar.HOUR_OF_DAY);
						if (hour > 12 && hour <= 24) {
							utcStartDate.add(Calendar.DAY_OF_MONTH, 1);
						}
						Calendar systemStartDate = Calendar.getInstance();
						systemStartDate.set(Calendar.YEAR, utcStartDate.get(Calendar.YEAR));
						systemStartDate.set(Calendar.MONTH,utcStartDate.get(Calendar.MONTH));
						systemStartDate.set(Calendar.DAY_OF_MONTH, utcStartDate.get(Calendar.DAY_OF_MONTH));
						systemStartDate.set(Calendar.HOUR_OF_DAY, systemStartDate.getMinimum(Calendar.HOUR_OF_DAY));
						systemStartDate.set(Calendar.MINUTE, systemStartDate.getMinimum(Calendar.MINUTE));
						systemStartDate.set(Calendar.SECOND, systemStartDate.getMinimum(Calendar.SECOND));
						systemStartDate.set(Calendar.MILLISECOND, systemStartDate.getMinimum(Calendar.MILLISECOND));
						
						Calendar systemEndDate = (Calendar) systemStartDate.clone();
						systemEndDate.add(Calendar.DAY_OF_MONTH, 1);
						
						vEvent.getProperties().add(new DtStart(new net.fortuna.ical4j.model.Date(systemStartDate.getTime())));
						vEvent.getProperties().add(new DtEnd(new net.fortuna.ical4j.model.Date(systemEndDate.getTime())));
						
					} else {
						vEvent.getProperties().add(new DtStart(new DateTime(instance.getStartDate()),true));
						vEvent.getProperties().add(new DtEnd(new DateTime(instance.getEndDate()), true));
					}
					
					iCal.getComponents().add(vEvent);
				}
					
				CalendarOutputter outputter = new CalendarOutputter();
				StringWriter strWrite = new StringWriter();
				outputter.output(iCal, strWrite);
				sReturn = strWrite.toString();
			} catch (Exception e) {
				LOGGER.throwing(CLASS_NAME, "exportICalString", e);
				throw new CalendarException("error.ical4j.unknown", new Object[0], e.fillInStackTrace());
			}
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "exportICalString", sReturn);
		}
		
		return sReturn;
	}
	
	public static String decodeString(String text) {
		return StringEscapeUtils.unescapeHtml(Utilities.removeHTML(text.replace("&nbsp;"," "), true, true));
	}
	
	public static void main(String[] args) {
		Calendar cal = Calendar.getInstance();
		
		Calendar utcCal = Calendar.getInstance(com.ibm.icu.util.TimeZone.getTimeZone("UTC"));
		utcCal.setTime(Utilities.getStartOfDay(cal));
		long x = Utilities.getStartOfDay(utcCal).getTime();
		long y = Utilities.getStartOfDay(cal).getTime();
		
		long l = x - y;
		while(l < -12 * 3600 * 1000) {
			l += 24 * 3600 * 1000;
		}
		while(l > 12 * 3600 * 1000) {
			l -= 24 * 3600 * 1000;
		}
		
		TimeZoneRegistry registry = TimeZoneRegistryFactory.getInstance().createRegistry();
		
		String[] ids = TimeZone.getAvailableIDs((int)l);
		for(int i = 0; i < ids.length; i++) {
			System.out.println(ids[i]);
			TimeZone timezone = registry.getTimeZone(ids[i]);
			if(timezone != null) {
				System.out.println(timezone.getRawOffset());
			}
		}
	}
}
