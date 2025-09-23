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

package com.ibm.lconn.calendar.atom;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.abdera.Abdera;
import org.apache.abdera.i18n.iri.IRISyntaxException;
import org.apache.abdera.model.AtomDate;
import org.apache.abdera.model.Category;
import org.apache.abdera.model.Content.Type;
import org.apache.abdera.model.Document;
import org.apache.abdera.model.Element;
import org.apache.abdera.model.Entry;
import org.apache.abdera.parser.Parser;
import org.apache.commons.lang.CharSetUtils;
import org.apache.commons.lang.StringUtils;

import com.ibm.icu.util.Calendar;
import com.ibm.icu.util.TimeZone;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventComment;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBRecurrence;
import com.ibm.lconn.calendar.exception.BadAtomEntryException;
import com.ibm.lconn.calendar.util.CalendarRole;
import com.ibm.lconn.calendar.util.FrequencyCode;
import com.ibm.lconn.calendar.util.Utilities;

public class AtomParser implements AtomConstants {

	// attributes
	private static final String CLASS_NAME = AtomParser.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);

	private Parser _parser = null;

	public AtomParser() {
		_parser = Abdera.getNewParser();
	}
	
	public DBCalendar parseCalendarForUpdate(InputStream is) throws FileNotFoundException, BadAtomEntryException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "parseCalendarForUpdate", new Object[] { is });
		}
		
		Document<Element> doc = _parser.parse(is);
		Entry root = (Entry)doc.getRoot();

		if (!checkCategoryType(root, "calendar")) {
			throw new BadAtomEntryException("error.atom.parser.entry.wrongcategory.parameter", new Object[]{"event"});
		}

		DBCalendar cal = new DBCalendar();
		
		if(root.getIdElement() != null) {
			String id = root.getId().toString();
			if(id.startsWith(AtomConstants.ID_CALENDAR_PREFIX)) {
				cal.setCalendar_UUID(id.substring(AtomConstants.ID_CALENDAR_PREFIX.length()));
			}
		}
		
		List<Element> maproles = root.getExtensions(QN_CONNECTIONS_MAPROLE);
		for(Element el : maproles) {
			if("member".equals(el.getAttributeValue("membership"))) {
				String s = parseElementStrVal(el);
				if("author".equals(s)) {
					cal.setMembers_Role(CalendarRole.AUTHOR);
				} else if("reader".equals(s)) {
					cal.setMembers_Role(CalendarRole.READER);
				} else {
					throw new BadAtomEntryException("error.atom.parser.tag.wrongformat.parameter", new Object[]{QN_CONNECTIONS_MAPROLE.getLocalPart()});
				}
				break;
			}
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "parseCalendarForUpdate", cal);
		}

		return cal;
	}

	public DBEvent parseEventForCreation(InputStream is, Map<String, Object> extra) throws FileNotFoundException, BadAtomEntryException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "parseEventForCreation", new Object[] { is });
		}
		
		Document<Element> doc = _parser.parse(is);
		Element element = doc.getRoot();
		DBEvent event = convertEntryToEvent((Entry) element, extra);

		// verify the input:
		DBEventInfo eventInfo = event.getEventInfo();
		
		if(eventInfo == null || StringUtils.isBlank(eventInfo.getName())) {
			throw new BadAtomEntryException("error.atom.parser.missing.tag.parameter", new Object[]{"title"});
		}
		
		if(eventInfo != null && StringUtils.isBlank(eventInfo.getDescription())) {
			eventInfo.setDescription(" ");
		}
		
		if(eventInfo != null && StringUtils.isBlank(eventInfo.getImageUrl())) {
			eventInfo.setImageUrl(" ");
		}
		
		if(eventInfo != null && StringUtils.isBlank(eventInfo.getLocation())) {
			eventInfo.setLocation(" ");
		}
		
		if(eventInfo != null && eventInfo.getIsAllDay() == null) {
			eventInfo.setIsAllDay(false);
		}
		
		if ((event.getEventInstances() == null && event.getRecurrence() == null)) {
			throw new BadAtomEntryException("error.atom.parser.missing.tag.parameter", new Object[]{QN_CONNECTIONS_RECURRENCE.getLocalPart()});
		}
		
		if ((event.getEventInstances() != null && event.getRecurrence() != null)) {
			throw new BadAtomEntryException("error.atom.content.recurrence.both", new Object[0]);
		}
		
		if(event.getRecurrence() != null) {
			DBRecurrence recurrence = event.getRecurrence();
			if(recurrence.getFrequencyCode() == null) {
				throw new BadAtomEntryException("error.atom.parser.missing.param.parameters",
						new String[] { CALENDAR_RECURRENCE_ATTRIBUTE_FREQUENCY, QN_CONNECTIONS_RECURRENCE.getLocalPart() });
			}
			if(recurrence.getFrequencyCode().equals(FrequencyCode.WEEKLY)) {
				if(recurrence.getInterval() == null) {
					throw new BadAtomEntryException("error.atom.parser.missing.param.parameters",
							new String[] { CALENDAR_RECURRENCE_ATTRIBUTE_INTERVAL, QN_CONNECTIONS_RECURRENCE.getLocalPart() });
				}
			}
			if(recurrence.getUntilRule() == null) {
				throw new BadAtomEntryException("error.atom.parser.missing.embeded.tag.parameter", 
							new String[] { QN_CONNECTIONS_UNTIL.getLocalPart(), QN_CONNECTIONS_RECURRENCE.getLocalPart() });
			}
			if(recurrence.getStartDate() == null) {
				throw new BadAtomEntryException("error.atom.parser.missing.embeded.tag.parameter", 
						new String[] { QN_CONNECTIONS_STARTDATE.getLocalPart(), QN_CONNECTIONS_RECURRENCE.getLocalPart() });
			}
			if(recurrence.getEndDate() == null) {
				throw new BadAtomEntryException("error.atom.parser.missing.embeded.tag.parameter", 
						new String[] { QN_CONNECTIONS_ENDDATE.getLocalPart(), QN_CONNECTIONS_RECURRENCE.getLocalPart() });
			}
			if(recurrence.getFrequencyCode().equals(FrequencyCode.WEEKLY) || recurrence.getFrequencyCode().equals(FrequencyCode.DAILY) || recurrence.getFrequencyCode().equals(FrequencyCode.MONTHLY)) {
				if(recurrence.getByDay() == null) {
					throw new BadAtomEntryException("error.atom.parser.missing.embeded.tag.parameter", 
							new String[] { QN_CONNECTIONS_BYDAY.getLocalPart(), QN_CONNECTIONS_RECURRENCE.getLocalPart() });
				}
			}
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "parseEventForCreation", event);
		}
		
		return event;
	}

	public DBEventInstance parseEventForInstanceUpdate(InputStream is, Map<String, Object> extra) throws FileNotFoundException, BadAtomEntryException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "parseEventForUpdate", new Object[] { is });
		}
		
		Document<Element> doc = _parser.parse(is);
		Element element = doc.getRoot();
		DBEventInstance instance = convertEntryToEventInstance((Entry) element, extra);

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "parseEventForUpdate", instance);
		}

		return instance;
	}

	public DBEvent parseEventForUpdate(InputStream is, Map<String, Object> extra) throws FileNotFoundException, BadAtomEntryException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "parseEventForSeriesUpdate", new Object[] { is });
		}
		
		Document<Element> doc = _parser.parse(is);
		Element element = doc.getRoot();
		DBEvent event = convertEntryToEvent((Entry) element, extra);
		
		// verify the input:
		if(event.getRecurrence() == null) {
			throw new BadAtomEntryException("error.atom.parser.missing.tag.parameter", new Object[]{QN_CONNECTIONS_RECURRENCE.getLocalPart()});
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "parseEventForSeriesUpdate", event);
		}

		return event;
	}
	
	public DBEventComment parseCommentForCreation(InputStream is) throws FileNotFoundException, BadAtomEntryException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "parseCommentForCreation", new Object[] { is });
		}
		
		Document<Element> doc = _parser.parse(is);
		Entry entry = (Entry) doc.getRoot();
		
		if (!checkCategoryType(entry, "comment")) {
			throw new BadAtomEntryException("error.atom.parser.entry.wrongcategory.parameter", new Object[]{"comment"});
		}
		
		DBEventComment comment = new DBEventComment();
		comment.setContent(entry.getContent(), entry.getContentType() == Type.HTML ? DBEventComment.CONTENT_TYPE_HTML : DBEventComment.CONTENT_TYPE_PLAIN_TEXT);
		
		Date createOn = entry.getPublished();
		if(createOn != null){
			comment.setCreateOn(createOn);
		} else {
			comment.setCreateOn(new Date());
		}
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "parseEventForSeriesUpdate", comment);
		}
		
		return comment;
	}
	
	private DBRecurrence convertElementToRecurrence(Element recurrenceTag, boolean isAllDay, Map<String, Object> extra) throws BadAtomEntryException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "convertElementToRecurrence", new Object[] { recurrenceTag });
		}
		
		// 1. parse the atom element, and extract the recurrence attributes
		
		Integer 	frequencyCode = null;
		Integer 	interval = null;
		Calendar 	untilRule = null;
		Integer[] 	byDay = null;
		Integer 	byDate = null;
		Calendar	startDate = null, endDate = null;
		Calendar[] 	daylightSavingTime = null;
		String		timezoneId = null;

		// get frequency name
		{
			String t = recurrenceTag.getAttributeValue(CALENDAR_RECURRENCE_ATTRIBUTE_FREQUENCY);
			if(t != null) {	
				t = t.toUpperCase(Locale.ENGLISH);
				if("DAILY".equals(t)) {
					frequencyCode = FrequencyCode.DAILY;
				} else if("WEEKLY".equals(t)) {
					frequencyCode = FrequencyCode.WEEKLY;
				} else if("MONTHLY".equals(t)) {
					frequencyCode = FrequencyCode.MONTHLY;
				} else {
					throw new BadAtomEntryException("error.atom.parser.unsupported.attribute.parameters",
							new String[] { CALENDAR_RECURRENCE_ATTRIBUTE_FREQUENCY, QN_CONNECTIONS_RECURRENCE.getLocalPart(), "\"weekly\",\"daily\"" });
				}
			}
		}

		// get interval
		try {
			String t = recurrenceTag.getAttributeValue(CALENDAR_RECURRENCE_ATTRIBUTE_INTERVAL);
			if(t != null && !StringUtils.isBlank(t))
				interval = Integer.valueOf(t);
		} catch (java.lang.NumberFormatException e) {
			throw new BadAtomEntryException("error.atom.parser.attribute.nan", new Object[]{CALENDAR_RECURRENCE_ATTRIBUTE_INTERVAL});
		}

		// handle nested tags
		List<Element> recurrenceElements = recurrenceTag.getElements();
		Iterator<Element> recurrenceElementsIterator = recurrenceElements.iterator();
		while (recurrenceElementsIterator.hasNext()) {
			Element element = recurrenceElementsIterator.next();
			if (QN_CONNECTIONS_BYDAY.equals(element.getQName())) {
				String[] t = parseElementStrVal(element).split(",");
				byDay = parseDay(t);
				
			} else if (QN_CONNECTIONS_BYDAYOFWEEK.equals(element.getQName())) {
				String[] t = parseElementStrVal(element).split(",");
				byDay = parseDayForMonth(t);
			} else if (QN_CONNECTIONS_BYDATE.equals(element.getQName())) {
				String date = parseElementStrVal(element);
				boolean badFormat = "".equals(date);
				if(!badFormat) {
					try{
						byDate = Integer.parseInt(date);
					} catch(NumberFormatException e){
						badFormat = true;
					}
				}
				if(badFormat || byDate > 31 || byDate <1){
					throw new BadAtomEntryException("error.atom.parser.tag.wrongformat.parameter", new Object[]{QN_CONNECTIONS_BYDATE.getLocalPart()});
				}
				
			} else if (QN_CONNECTIONS_UNTIL.equals(element.getQName())) {
				try {
					untilRule = parseCalendar(parseElementStrVal(element));
				} catch (java.lang.IllegalArgumentException e) {
					throw new BadAtomEntryException("error.atom.parser.attribute.wrongdate.parameter", new Object[]{QN_CONNECTIONS_UNTIL.getLocalPart()});
				}
			} else if (QN_CONNECTIONS_STARTDATE.equals(element.getQName())) {
				try {
					startDate = parseCalendar(parseElementStrVal(element));
				} catch (java.lang.IllegalArgumentException e) {
					throw new BadAtomEntryException("error.atom.parser.attribute.wrongdate.parameter", new Object[]{QN_CONNECTIONS_STARTDATE.getLocalPart()});
				}
			} else if (QN_CONNECTIONS_ENDDATE.equals(element.getQName())) {
				try {
					endDate = parseCalendar(parseElementStrVal(element));
				} catch (java.lang.IllegalArgumentException e) {
					throw new BadAtomEntryException("error.atom.parser.attribute.wrongdate.parameter", new Object[]{QN_CONNECTIONS_ENDDATE.getLocalPart()});
				}
			} else if (QN_CONNECTIONS_DAYLIGHT.equals(element.getQName())) {
				try {
					String[] t = parseElementStrVal(element).split("/");
					if(t.length != 2) {
						throw new BadAtomEntryException("error.atom.parser.attribute.wrongdate.parameter", new Object[]{QN_CONNECTIONS_DAYLIGHT.getLocalPart()});
					}
					daylightSavingTime = new Calendar[]{parseCalendar(t[0]), parseCalendar(t[1])};
				} catch (java.lang.IllegalArgumentException e) {
					throw new BadAtomEntryException("error.atom.parser.attribute.wrongdate.parameter", new Object[]{QN_CONNECTIONS_ENDDATE.getLocalPart()});
				}
			} else if (QN_CONNECTIONS_TIMEZONE.equals(element.getQName())) {
				try {
					timezoneId = parseElementStrVal(element);
				} catch (java.lang.IllegalArgumentException e) {
					throw new BadAtomEntryException("error.atom.parser.attribute.wrongdate.parameter", new Object[]{QN_CONNECTIONS_ENDDATE.getLocalPart()});
				}
			} else {
				throw new BadAtomEntryException("error.atom.parser.unsupported.embeded.tag.parameter",
						new String[] { element.getQName().getLocalPart(), QN_CONNECTIONS_RECURRENCE.getLocalPart() });
			}
		}
		
		if (startDate != null && endDate != null) {
			if (startDate.getTimeInMillis() >= endDate.getTimeInMillis()) {
				throw new BadAtomEntryException("error.atom.parser.tag.dateprecedence", new Object[0]);
			}
		} else if (startDate != null) {
			throw new BadAtomEntryException("error.atom.parser.missing.tag.dependance.parameters",
					new String[] { QN_CONNECTIONS_STARTDATE.getLocalPart(), QN_CONNECTIONS_ENDDATE.getLocalPart() });
		} else if (endDate != null) {
			throw new BadAtomEntryException("error.atom.parser.missing.tag.dependance.parameters",
					new String[] { QN_CONNECTIONS_ENDDATE.getLocalPart(), QN_CONNECTIONS_STARTDATE.getLocalPart() });
		}
		
		if(daylightSavingTime != null) {
			extra.put("timezone", Utilities.getNormalizedTimeZone(
					daylightSavingTime[1].getTimeZone().getRawOffset(), 
					daylightSavingTime[0].getTime(), daylightSavingTime[1].getTime()));
		} else if(timezoneId != null) {
			extra.put("timezone", TimeZone.getTimeZone(timezoneId));
		}
		
		// 2. create DBRecurrence object
		
		DBRecurrence recurrence = new DBRecurrence();
		recurrence.setFrequencyCode(frequencyCode);
		recurrence.setInterval(interval);
		if(isAllDay) {
			recurrence.setUntilRule(Utilities.getStartOfUTCDay(untilRule));
		} else {
			recurrence.setUntilRule(Utilities.getEndOfDay(untilRule));
		}
		if(startDate != null) {
			if(isAllDay) {
				recurrence.setStartDate(Utilities.getStartOfUTCDay(startDate));
			} else {
				recurrence.setStartDate(startDate.getTime());
			}
		}
		if(endDate != null) {
			if(isAllDay) {
				recurrence.setEndDate(Utilities.getStartOfNextUTCDay(startDate));
			} else {
				recurrence.setEndDate(endDate.getTime());
			}
		}
		
		// set byDay mask
		if(frequencyCode == FrequencyCode.MONTHLY){
			if(byDate!=null){
				recurrence.setByDay(byDate | 1 << 7);
			} else {
				int byDayMask = byDay[0] << 3 | byDay[1];
				recurrence.setByDay(byDayMask);
			}
		} else {
			setByDayMask(byDay, startDate, recurrence);
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "convertElementToRecurrence", recurrence);
		}

		return recurrence;
	}

	private void setByDayMask(Integer[] byDay, Calendar startDate,
			DBRecurrence recurrence) {
		if(startDate != null && byDay != null) {
				
			int byDayMask = 0;
			Calendar t = (Calendar)startDate.clone();
			for(int i = 0; i < 7; i++) {
				int d = t.get(Calendar.DAY_OF_WEEK);
				for(int j = 0; j < byDay.length; j++) {
					if(byDay[j] == d) {
						byDayMask |= (1 << i);
					}
				}
				t.add(Calendar.HOUR_OF_DAY, 24);
			}
			recurrence.setByDay(byDayMask);
		}
	}
	
	private Integer[] parseDay(String[] t) {
		Integer[] byDay;
		byDay = new Integer[t.length];
		for (int i = 0; i < t.length; i++) {
			byDay[i] = Utilities.parseDayOfWeek(t[i]);
			if (byDay[i] == null) {
				throw new BadAtomEntryException("error.atom.parser.tag.wrongformat.parameter", new Object[]{QN_CONNECTIONS_BYDAY.getLocalPart()});
			}
		}
		return byDay;
	}
	private Integer[] parseDayForMonth(String[] t) {
		Integer[] byDay = new Integer[2];
		try {
			byDay[0] = Integer.parseInt(t[0]);
		} catch (NumberFormatException e) {
			byDay[0] = null;
		}
		byDay[1] = Utilities.parseDayOfWeek(t[1]);
		if (byDay[0]==null || byDay[1] == null) {
			throw new BadAtomEntryException("error.atom.parser.tag.wrongformat.parameter", new Object[]{QN_CONNECTIONS_BYDAYOFWEEK.getLocalPart()});
		}
		return byDay;
	}

	private List<DBEventInstance> convertElementToCustomInstances(Element recurrenceTag, boolean isAllDay, Map<String, Object> extra) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "convertElementToCustomInstances", new Object[] { recurrenceTag });
		}
		
		ArrayList<DBEventInstance> instances = new ArrayList<DBEventInstance>();

		List<Element> recurrenceElements = recurrenceTag.getElements();
		for(Iterator<Element> iter = recurrenceElements.iterator(); iter.hasNext();) {
			Element element = iter.next();
			if (QN_CONNECTIONS_PERIOD.equals(element.getQName())) {
				DBEventInstance instance = new DBEventInstance();
				
				List<Element> periodElements = element.getElements();
				Calendar startForAllday = null;
				for(Iterator<Element> piter = periodElements.iterator(); piter.hasNext();) {
					Element t = piter.next();
					if (QN_CONNECTIONS_STARTDATE.equals(t.getQName())) {
						try {
							Date date = null;
							Calendar c = parseCalendar(parseElementStrVal(t));
							if(isAllDay) {
								date = Utilities.getStartOfUTCDay(c);
								startForAllday = c;
							} else {
								date = c.getTime();
							}
							instance.setStartDate(date);
						} catch (java.lang.IllegalArgumentException e) {
							throw new BadAtomEntryException("error.atom.parser.attribute.wrongdate.parameter", new Object[]{QN_CONNECTIONS_STARTDATE.getLocalPart()});
						}
					} else if (QN_CONNECTIONS_ENDDATE.equals(t.getQName())) {
						try {
							Date date = null;
							Calendar c = parseCalendar(parseElementStrVal(t));
							if(isAllDay) {
								date = Utilities.getStartOfNextUTCDay(startForAllday);
							} else {
								date = c.getTime();
							}
							instance.setEndDate(date);
						} catch (java.lang.IllegalArgumentException e) {
							throw new BadAtomEntryException("error.atom.parser.attribute.wrongdate.parameter", new Object[]{QN_CONNECTIONS_ENDDATE.getLocalPart()});
						}
					} else {
						throw new BadAtomEntryException("error.atom.parser.unsupported.embeded.tag.parameter",
								new String[] { t.getQName().getLocalPart(), QN_CONNECTIONS_PERIOD.getLocalPart() });
					}

				}

				if (instance.getStartDate() != null && instance.getEndDate() != null) {
					if (instance.getStartDate().getTime() >= instance.getEndDate().getTime()) {
						throw new BadAtomEntryException("error.atom.parser.tag.dateprecedence", new Object[0]);
					}
				} else if (instance.getStartDate() == null) {
					throw new BadAtomEntryException("error.atom.parser.missing.tag.parameter",
							new String[] { QN_CONNECTIONS_STARTDATE.getLocalPart(), QN_CONNECTIONS_PERIOD.getLocalPart() });
				} else if (instance.getEndDate() == null) {
					throw new BadAtomEntryException("error.atom.parser.missing.tag.parameter",
							new String[] { QN_CONNECTIONS_ENDDATE.getLocalPart(), QN_CONNECTIONS_PERIOD.getLocalPart() });
				}
				
				instances.add(instance);
			} else if (QN_CONNECTIONS_DAYLIGHT.equals(element.getQName())) {
				try {
					String[] t = parseElementStrVal(element).split("/");
					if(t.length != 2) {
						throw new BadAtomEntryException("error.atom.parser.attribute.wrongdate.parameter", new Object[]{QN_CONNECTIONS_DAYLIGHT.getLocalPart()});
					}
					Calendar[] 	daylightSavingTime = new Calendar[]{parseCalendar(t[0]), parseCalendar(t[1])};
					extra.put("timezone", Utilities.getNormalizedTimeZone(
							daylightSavingTime[1].getTimeZone().getRawOffset(), 
							daylightSavingTime[0].getTime(), daylightSavingTime[1].getTime()));
				} catch (java.lang.IllegalArgumentException e) {
					throw new BadAtomEntryException("error.atom.parser.attribute.wrongdate.parameter", new Object[]{QN_CONNECTIONS_ENDDATE.getLocalPart()});
				}
			} else if (QN_CONNECTIONS_TIMEZONE.equals(element.getQName())) {
				try {
					String timezoneId = parseElementStrVal(element);
					if(!extra.containsKey("timezone")) {
						extra.put("timezone", TimeZone.getTimeZone(timezoneId));
					}
				} catch (java.lang.IllegalArgumentException e) {
					throw new BadAtomEntryException("error.atom.parser.attribute.wrongdate.parameter", new Object[]{QN_CONNECTIONS_ENDDATE.getLocalPart()});
				}
			} else {
				throw new BadAtomEntryException("error.atom.parser.unsupported.embeded.tag.parameter",
						new String[] { element.getQName().getLocalPart(), QN_CONNECTIONS_RECURRENCE.getLocalPart() });
			}
		}

		if (instances.size() < 1) {
			throw new BadAtomEntryException("error.atom.parser.missing.tag.dependance.parameters",
					new String[] { QN_CONNECTIONS_PERIOD.getLocalPart(), QN_CONNECTIONS_RECURRENCE.getLocalPart() });
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "convertElementToCustomInstances", instances);
		}

		return instances;
	}

	private DBEvent convertEntryToEvent(Entry entry, Map<String, Object> extra) throws BadAtomEntryException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "convertEntryToEvent", new Object[] { entry });
		}

		if (!checkCategoryType(entry, "event")) {
			throw new BadAtomEntryException("error.atom.parser.entry.wrongcategory.parameter", new Object[]{"event"});
		}

		DBEvent event = new DBEvent();
		
		DBEventInfo eventInfo = new DBEventInfo();
		event.setEventInfo(eventInfo);
		
		// Set ID
		if(entry.getIdElement() != null) {
			String id = entry.getId().toString();
			if(id.startsWith(AtomConstants.ID_EVENT_PREFIX)) {
				event.setEvent_UUID(id.substring(AtomConstants.ID_EVENT_PREFIX.length()));
			}
		}

		// Set Name (get Title)
		if (entry.getTitleElement() == null) {
			eventInfo.setName(null);
		} else if (entry.getTitleElement().getText() == null || entry.getTitle().length() == 0) {
			eventInfo.setName(null);
		} else {
			eventInfo.setName(entry.getTitle());
		}
		
		// Set tags
		Set<String> tags = new HashSet<String>();
		List<Category> tagElements = entry.getCategories();
		if(tagElements != null) {
			for(Category cat : tagElements) {
				String tag = cat.getTerm();
		        boolean isTag = true;
		        String schema = cat.getAttributeValue("scheme");
		        if (schema != null) {
		          isTag = !schema.startsWith(NS_CONNECTIONS_ATOM_EXT);
		        }
		        if (isTag) {
		        	String t = CharSetUtils.delete(tag, " ,\n\r\f\t\u3000");
		        	t = StringUtils.left(t, Utilities.getMaxUTF8CharCount(t, 255));
		        	tags.add(t.toLowerCase());
		        }
			}
		}
		extra.put("tags", tags);
		

		// Set Description (get content)
		if (entry.getContentElement() == null) {
			eventInfo.setDescription(null);
		} else if (entry.getContentElement().getText() == null || entry.getContent().length() == 0) {
			eventInfo.setDescription("");
		} else {
			eventInfo.setDescription(Utilities.purgeHTMLTag(entry.getContent()));
		}
		
		// Set location (get snx:location)
		String location = parseElementStrVal(entry.getExtension(QN_CONNECTIONS_LOCATION));
		if (location != null) {
			eventInfo.setLocation(location);
		}

		String allday = parseElementStrVal(entry.getExtension(QN_CONNECTIONS_ALLDAY));
		if (allday != null) {
			eventInfo.setIsAllDay(Integer.parseInt(allday) != 0);
		}

		// Set Dates (get snx:startDate and snx:endDate)
		Element startDateTag = entry.getExtension(QN_CONNECTIONS_STARTDATE);
		Element endDateTag = entry.getExtension(QN_CONNECTIONS_ENDDATE);
		if(startDateTag != null || endDateTag != null) {
			if (startDateTag == null) {
				throw new BadAtomEntryException("error.atom.parser.missing.tag.dependance.parameters",
						new String[] { QN_CONNECTIONS_ENDDATE.getLocalPart(), QN_CONNECTIONS_STARTDATE.getLocalPart() });
			}
			
			if (endDateTag == null) {
				throw new BadAtomEntryException("error.atom.parser.missing.tag.dependance.parameters",
						new String[] { QN_CONNECTIONS_STARTDATE.getLocalPart(), QN_CONNECTIONS_ENDDATE.getLocalPart() });
			}
			
			DBEventInstance instance = new DBEventInstance();
			
			try {
				Calendar startDate = parseCalendar(parseElementStrVal(startDateTag));
				if(eventInfo.getIsAllDay()) {
					instance.setStartDate(Utilities.getStartOfUTCDay(startDate));
				} else {
					instance.setStartDate(startDate.getTime());
				}
			} catch (java.lang.IllegalArgumentException e) {
				throw new BadAtomEntryException("error.atom.parser.attribute.wrongdate.parameter", new Object[]{QN_CONNECTIONS_STARTDATE.getLocalPart()});
			}

			try {
				if(eventInfo.getIsAllDay()) {
					Calendar startDate = parseCalendar(parseElementStrVal(startDateTag));
					instance.setEndDate(Utilities.getStartOfNextUTCDay(startDate));
				} else {
					Calendar endDate = parseCalendar(parseElementStrVal(endDateTag));
					instance.setEndDate(endDate.getTime());
				}
			} catch (java.lang.IllegalArgumentException e) {
				throw new BadAtomEntryException("error.atom.parser.attribute.wrongdate.parameter", new Object[]{QN_CONNECTIONS_ENDDATE.getLocalPart()});
			}

			if (instance.getStartDate().getTime() >= instance.getEndDate().getTime()) {
				throw new BadAtomEntryException("error.atom.parser.tag.dateprecedence", new Object[0]);
			}

			event.setEventInstances(Arrays.asList(instance));
		}

		Element recurrenceTag = entry.getExtension(QN_CONNECTIONS_RECURRENCE);
		if (recurrenceTag != null) {
			String custom = recurrenceTag.getAttributeValue(CALENDAR_RECURRENCE_ATTRIBUTE_CUSTOM);
			if (custom == null) {
				throw new BadAtomEntryException("error.atom.parser.missing.param.parameters",
						new String[] { CALENDAR_RECURRENCE_ATTRIBUTE_CUSTOM, QN_CONNECTIONS_RECURRENCE.getLocalPart() });
			} else if (custom.equalsIgnoreCase("yes")) {
				event.setEventInstances(convertElementToCustomInstances(recurrenceTag, eventInfo.getIsAllDay(), extra));
			} else if (custom.equalsIgnoreCase("no")) {
				event.setDBRecurrence(convertElementToRecurrence(recurrenceTag, eventInfo.getIsAllDay(), extra));
			} else {
				throw new BadAtomEntryException("error.atom.parser.unsupported.attribute.parameters",
						new String[] { CALENDAR_RECURRENCE_ATTRIBUTE_CUSTOM, QN_CONNECTIONS_RECURRENCE.getLocalPart(), "yes, no" });
			}
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "convertEntryToEvent", event);
		}
		
		Date createOn = entry.getPublished();
		if(createOn == null){
			event.setCreatedOn(new Date());
		} else {
			event.setCreatedOn(createOn);
		}
		
		Date modifiedOn = entry.getUpdated();
		if(modifiedOn == null){
			event.setModifiedOn(new Date());
		} else {
			event.setModifiedOn(modifiedOn);
		}
		return event;
	}
	
	private DBEventInstance convertEntryToEventInstance(Entry entry, Map<String, Object> extra) throws BadAtomEntryException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "convertEntryToEventInstance", new Object[] { entry });
		}

		if (!checkCategoryType(entry, "event-instance")) {
			throw new BadAtomEntryException("error.atom.parser.entry.wrongcategory.parameter", new Object[]{"event"});
		}

		DBEventInstance instance = new DBEventInstance();
		
		DBEventInfo eventInfo = new DBEventInfo();
		instance.setEventInfo(eventInfo);
		
		// Set ID
		if(entry.getIdElement() != null) {
			String id = entry.getId().toString();
			if(id.startsWith(AtomConstants.ID_EVENT_PREFIX)) {
				instance.setEventInst_UUID(id.substring(AtomConstants.ID_EVENT_PREFIX.length()));
			}
		}
		
		// Set Name (get Title)
		if (entry.getTitleElement() == null) {
			eventInfo.setName(null);
		} else if (entry.getTitleElement().getText() == null || entry.getTitle().length() == 0) {
			eventInfo.setName(null);
		} else {
			eventInfo.setName(entry.getTitle());
		}
		
		// Set tags
		Set<String> tags = new HashSet<String>();
		List<Category> tagElements = entry.getCategories();
		if(tagElements != null) {
			for(Category cat : tagElements) {
				String tag = cat.getTerm();
		        boolean isTag = true;
		        String schema = cat.getAttributeValue("scheme");
		        if (schema != null) {
		          isTag = !schema.startsWith(NS_CONNECTIONS_ATOM_EXT);
		        }
		        if (isTag) {
		        	String t = CharSetUtils.delete(tag, " ,\n\r\f\t\u3000");
		        	t = StringUtils.left(t, Utilities.getMaxUTF8CharCount(t, 255));
		        	tags.add(t.toLowerCase());
		        }
			}
		}
		extra.put("tags", tags);

		// Set Description (get content)
		if (entry.getContentElement() == null) {
			eventInfo.setDescription(null);
		} else if (entry.getContentElement().getText() == null || entry.getContent().length() == 0) {
			eventInfo.setDescription("");
		} else {
			eventInfo.setDescription(Utilities.purgeHTMLTag(entry.getContent()));
		}
		
		// Set location (get snx:location)
		String location = parseElementStrVal(entry.getExtension(QN_CONNECTIONS_LOCATION));
		if (location != null) {
			eventInfo.setLocation(location);
		}

		String allday = parseElementStrVal(entry.getExtension(QN_CONNECTIONS_ALLDAY));
		if (allday != null) {
			eventInfo.setIsAllDay(Integer.parseInt(allday) != 0);
		}

		// Set Dates (get snx:startDate and snx:endDate)
		Element startDateTag = entry.getExtension(QN_CONNECTIONS_STARTDATE);
		Element endDateTag = entry.getExtension(QN_CONNECTIONS_ENDDATE);
		if(startDateTag != null || endDateTag != null) {
			if (startDateTag == null) {
				throw new BadAtomEntryException("error.atom.parser.missing.tag.dependance.parameters",
						new String[] { QN_CONNECTIONS_ENDDATE.getLocalPart(), QN_CONNECTIONS_STARTDATE.getLocalPart() });
			}
			
			if (endDateTag == null) {
				throw new BadAtomEntryException("error.atom.parser.missing.tag.dependance.parameters",
						new String[] { QN_CONNECTIONS_STARTDATE.getLocalPart(), QN_CONNECTIONS_ENDDATE.getLocalPart() });
			}
			
			try {
				Calendar startDate = parseCalendar(parseElementStrVal(startDateTag));
				if(eventInfo.getIsAllDay()) {
					instance.setStartDate(Utilities.getStartOfUTCDay(startDate));
				} else {
					instance.setStartDate(startDate.getTime());
				}
			} catch (java.lang.IllegalArgumentException e) {
				throw new BadAtomEntryException("error.atom.parser.attribute.wrongdate.parameter", new Object[]{QN_CONNECTIONS_STARTDATE.getLocalPart()});
			}

			try {
				if(eventInfo.getIsAllDay()) {
					Calendar startDate = parseCalendar(parseElementStrVal(startDateTag));
					instance.setEndDate(Utilities.getStartOfNextUTCDay(startDate));
				} else {
					Calendar endDate = parseCalendar(parseElementStrVal(endDateTag));
					instance.setEndDate(endDate.getTime());
				}
			} catch (java.lang.IllegalArgumentException e) {
				throw new BadAtomEntryException("error.atom.parser.attribute.wrongdate.parameter", new Object[]{QN_CONNECTIONS_ENDDATE.getLocalPart()});
			}

			if (instance.getStartDate().getTime() >= instance.getEndDate().getTime()) {
				throw new BadAtomEntryException("error.atom.parser.tag.dateprecedence", new Object[0]);
			}
		}
		
		//updated date
		Date modifiedOn = entry.getUpdated();
		if(modifiedOn == null){
			instance.setModifiedOn(new Date());
		} else {
			instance.setModifiedOn(modifiedOn);
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "convertEntryToEventInstance", instance);
		}

		return instance;
	}

	public Date parseDate(String text) {
		return Utilities.alignToSecond(AtomDate.parse(text));
	}
	
	public Calendar parseCalendar(String text) {
		return Utilities.parseCalendar(text);
	}
	
	public static void main(String[] args) {
		Date date = AtomDate.parse("2011-05-17T00:00:00+08:00");
		System.out.println(date);
		date = new AtomParser().parseCalendar("2011-05-17T00:00:00+08:00").getTime();
		System.out.println(date);
		date = Utilities.getStartOfDay(new AtomParser().parseCalendar("2011-05-17T00:00:00+08:00"));
		System.out.println(date);
	}

	/**
	 * Returns a "trimmed" string of the element's text value
	 * 
	 * @param extension
	 * @return
	 */
	private String parseElementStrVal(Element element) {
		if (element == null) {
			return null;
		}

		String elementStr = element.getText();

		if (elementStr != null) {
			return elementStr.trim();
		} else {
			return "";
		}
	}
	
	/**
	 * Asserts entry is of the correct type.
	 * 
	 * @param entry
	 * @param typeTerm
	 * @throws IRISyntaxException
	 */
	private boolean checkCategoryType(Entry entry, String typeTerm) throws IRISyntaxException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "checkCategoryType", new Object[] { entry, typeTerm });
		}
		List<Category> types = entry.getCategories(AtomConstants.CATEGORY_SCHEME_TYPE);

		if (types == null || types.size() == 0) {
			return false;
		}

		Category type = (Category) types.get(0);
		return typeTerm.equals(type.getTerm());

	}
}
