/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db;


import java.io.IOException;
import java.io.Reader;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.lang.StringUtils;

import com.ibatis.common.resources.Resources;
import com.ibatis.dao.client.DaoException;
import com.ibatis.dao.client.DaoManager;
import com.ibatis.dao.client.DaoManagerBuilder;
import com.ibm.icu.util.Calendar;
import com.ibm.icu.util.TimeZone;
import com.ibm.lconn.calendar.audit.CalendarEvents;
import com.ibm.lconn.calendar.db.dao.model.CalendarDAO;
import com.ibm.lconn.calendar.db.dao.model.DeletionHistoryDAO;
import com.ibm.lconn.calendar.db.dao.model.EventCommentDAO;
import com.ibm.lconn.calendar.db.dao.model.EventDAO;
import com.ibm.lconn.calendar.db.dao.model.EventFollowingDAO;
import com.ibm.lconn.calendar.db.dao.model.EventInfoDAO;
import com.ibm.lconn.calendar.db.dao.model.EventInstanceDAO;
import com.ibm.lconn.calendar.db.dao.model.EventTagDAO;
import com.ibm.lconn.calendar.db.dao.model.EventTagStatDAO;
import com.ibm.lconn.calendar.db.dao.model.MiscDataDAO;
import com.ibm.lconn.calendar.db.dao.model.RecurrenceDAO;
import com.ibm.lconn.calendar.db.dao.model.SchemaVersionDAO;
import com.ibm.lconn.calendar.db.dao.model.SeedlistDAO;
import com.ibm.lconn.calendar.db.dao.model.SubstitutionDAO;
import com.ibm.lconn.calendar.db.dao.model.UserInfoDAO;
import com.ibm.lconn.calendar.db.dao.model.UserMentionDAO;
import com.ibm.lconn.calendar.db.exception.DatabaseException;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventComment;
import com.ibm.lconn.calendar.db.model.DBEventFollowingRecord;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBEventTag;
import com.ibm.lconn.calendar.db.model.DBRecurrence;
import com.ibm.lconn.calendar.db.model.DBSubstitution;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.CalendarException;
import com.ibm.lconn.calendar.util.FrequencyCode;
import com.ibm.lconn.calendar.util.RuntimeConfiguration;
import com.ibm.lconn.calendar.util.Utilities;
import com.ibm.lconn.core.web.impersonation.ImpersonationHelper;


/**
 * @author Qi Wei Zhang
 */

public class CalendarService {
	private static final String CLASS_NAME = CalendarService.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private static final Random rand = new Random(System.currentTimeMillis());
	
	
	// Attributes
	
	private static DaoManager daoManager = null;
	
	private CalendarDAO calendarDao = null;
	private EventDAO eventDao = null;
	private EventInstanceDAO eventInstanceDao = null;
	private RecurrenceDAO recurrenceDao = null;
	private EventInfoDAO eventInfoDao = null;
	private SubstitutionDAO substitutionDao = null;
	private UserInfoDAO userInfoDao = null;
	private DeletionHistoryDAO deletionHistoryDao = null;
	private SchemaVersionDAO schemaVersionDao = null;
	private SeedlistDAO seedlistDao = null;
	private EventTagDAO eventTagDao = null;
	private EventTagStatDAO eventTagStatDao = null;
	private EventCommentDAO commentDao = null;
	private EventFollowingDAO followingDao = null;
	private MiscDataDAO miscDataDao = null;
	private UserMentionDAO userMentionDao = null;
	
	public static final String ISCANCELLED = "1";
	public static final String NOTCANCELLED = "0";
	
	private CalendarEvents audit = new CalendarEvents();
	
	public CalendarService() throws CalendarException {
		try {
			daoManager = this.getDaoManagerInstance();

			calendarDao = (CalendarDAO) daoManager.getDao(CalendarDAO.class, "sqlmap");
			eventDao = (EventDAO) daoManager.getDao(EventDAO.class, "sqlmap");
			eventInstanceDao = (EventInstanceDAO) daoManager.getDao(EventInstanceDAO.class, "sqlmap");
			recurrenceDao = (RecurrenceDAO) daoManager.getDao(RecurrenceDAO.class, "sqlmap");
			eventInfoDao = (EventInfoDAO) daoManager.getDao(EventInfoDAO.class, "sqlmap");
			substitutionDao = (SubstitutionDAO) daoManager.getDao(SubstitutionDAO.class, "sqlmap");
			userInfoDao = (UserInfoDAO) daoManager.getDao(UserInfoDAO.class, "sqlmap");
			deletionHistoryDao = (DeletionHistoryDAO) daoManager.getDao(DeletionHistoryDAO.class, "sqlmap");
			schemaVersionDao = (SchemaVersionDAO) daoManager.getDao(SchemaVersionDAO.class, "sqlmap");
			seedlistDao = (SeedlistDAO) daoManager.getDao(SeedlistDAO.class, "sqlmap");
			eventTagDao = (EventTagDAO) daoManager.getDao(EventTagDAO.class, "sqlmap");
			eventTagStatDao = (EventTagStatDAO) daoManager.getDao(EventTagStatDAO.class, "sqlmap");
			commentDao = (EventCommentDAO) daoManager.getDao(EventCommentDAO.class, "sqlmap");
			followingDao = (EventFollowingDAO) daoManager.getDao(EventFollowingDAO.class, "sqlmap");
			miscDataDao = (MiscDataDAO) daoManager.getDao(MiscDataDAO.class, "sqlmap");
			userMentionDao = (UserMentionDAO) daoManager.getDao(UserMentionDAO.class, "sqlmap");
		} catch (Exception e) {
			LOGGER.throwing(CLASS_NAME, "CalendarService", e);
			throw new CalendarException(e);
		}
	}
	
	/**
	 * This method creates new DaoManager instance
	 * 
	 * @return
	 * @throws IOException
	 */
	private DaoManager getDaoManagerInstance() throws IOException {
		Reader reader = Resources.getResourceAsReader("com/ibm/lconn/calendar/db/sql/daoConfig.xml");
		return DaoManagerBuilder.buildDaoManager(reader);
	}
	
	// DAO Methods
	
	public CalendarDAO getCalendarDAO() {
		return calendarDao;
	}
	
	public EventDAO getEventDAO() {
		return eventDao;
	}
	
	public EventInstanceDAO getEventInstanceDao() {
		return eventInstanceDao;
	}

	public RecurrenceDAO getRecurrenceDao() {
		return recurrenceDao;
	}

	public EventInfoDAO getEventInfoDao() {
		return eventInfoDao;
	}

	public SubstitutionDAO getSubstitutionDao() {
		return substitutionDao;
	}

	public UserInfoDAO getUserInfoDao() {
		return userInfoDao;
	}
	
	public DeletionHistoryDAO getDeletionHistoryDao() {
		return deletionHistoryDao;
	}

	public SchemaVersionDAO getSchemaVersionDao() {
		return schemaVersionDao;
	}
	
	public SeedlistDAO getSeedlistDao() {
		return seedlistDao;
	}
	
	public EventTagDAO getEventTagDao() {
		return eventTagDao;
	}
	
	public EventTagStatDAO getEventTagStatDao() {
		return eventTagStatDao;
	}
	
	public EventCommentDAO getEventCommentDao() {
		return commentDao;
	}

	public EventFollowingDAO getEventFollowingDao() {
		return followingDao;
	}

	public MiscDataDAO getMiscDataDao() {
		return miscDataDao;
	}
	
	public UserMentionDAO getUserMentionDao() {
		return userMentionDao;
	}
	
	public void flush() {
		try {
			daoManager.commitTransaction();
		} catch (Exception e) {
		}
	}
	
	public void release() {
		try {
			daoManager.endTransaction();
		} catch (Exception e) {
		}
	}
	
	// Methods
	
	/**
	 * Add new event with recurrence rule (EventDTO object must have createdBy, calendarUuid and recurrence set)
	 */
	public String addRecurrenceEvent(DBEvent event, Set<String> tags, TimeZone timezone, DBCalendar calendar, DBUser user, DBUser impersonator) throws CalendarException, DatabaseException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "addRecurrenceEvent", new Object[] { event, tags, timezone, calendar, user });
		}
		
		validate(event, null, timezone);
		
		Date now = new Date();
		
		if(tags == null) {
			tags = new HashSet<String>();
		}
		
		String eventUUID = Utilities.generateEventUUID(timezone);
		
		if(timezone == null) {
			timezone = TimeZone.getTimeZone("UTC");
		} else if(event.getEventInfo().getIsAllDay()) {
			timezone = TimeZone.getTimeZone("UTC");
		}
		
		try {
			// 1. Add entry to the EventInfo table
			DBEventInfo eventInfo = event.getEventInfo();
			eventInfo.setEventInfo_UUID(UUID.randomUUID().toString());
			eventInfo.setCalendar_UUID(calendar.getCalendar_UUID());
			eventInfo.setEvent_UUID(eventUUID);
			eventInfoDao.addEventInfo(eventInfo);
			
			// 2. Add entry to the Event table
			event.setEvent_UUID(eventUUID);
			event.setCalendar_UUID(calendar.getCalendar_UUID());
			event.setEventInfo(eventInfo);
			
			event.setCreatedBy(user.getUserUUID());
			event.setModifiedBy(user.getUserUUID());
			event.setDbModifiedOn(now);
			if(impersonator == null){
				event.setCreatedOn(now);
				event.setModifiedOn(now);
			} else {
				event.setCreatedBy(impersonator.getUserUUID());
				event.setModifiedBy(impersonator.getUserUUID());
			}
			eventDao.addEvent(event);
			
			// 3. Add entry to the Recurrence table
			DBRecurrence recurrence = event.getRecurrence();
			recurrence.setEvent_UUID(eventUUID);
			recurrence.setCalendar_UUID(calendar.getCalendar_UUID());
			recurrence.setModifiedOn(now);
			
			// adjust until rule, to align with the startDate of event
			recurrence.setUntilRule(Utilities.align(recurrence.getUntilRule(), recurrence.getStartDate(), timezone, recurrence.getUntilRule()));
			
			recurrenceDao.addRecurrence(recurrence);
			
			// 4. Populate event instances
			List<DBEventInstance> instances = populateEventInstances(event, recurrence.getStartDate(), 0, timezone);
			event.setEventInstances(instances);
			
			// 5. update tags
			event.setTags(new ArrayList<DBEventTag>());
			Map<String, Integer> tagStatUpdates = updateTags(event, tags);
			
			// 6. Update last modified timestamp for calendar
			calendar.setLastModified(now);
			calendarDao.updateCalendar(calendar.getCalendar_UUID(), new HashMap<String, Object>());
		
			daoManager.commitTransaction();
			
			// 7. audit
			audit.eventSeriesCreated(calendar, event, user, impersonator);
			
			// 8. update tag statistics
			if(tagStatUpdates != null && tagStatUpdates.size() > 0) {
				updateTagAgg(calendar.getCalendar_UUID(), tagStatUpdates);
				daoManager.commitTransaction();
			}
			
			// 9. record mention history 
			userMentionDao.updateMentionHistory(event);
			daoManager.commitTransaction();
		} catch (Exception e) {
			handleException(e);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "addRecurrenceEvent", event.getEvent_UUID());
		}
		
		return event.getEvent_UUID();
	}
	
	/**
	 * Add new event with custom picked date(s)
	 */
	public String addCustomEvent(DBEvent event, Set<String> tags, TimeZone timezone, DBCalendar calendar, DBUser user, DBUser impersonator) throws CalendarException {
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "addCustomEvent", new Object[] { event, calendar, user });
		}
		
		Date now = new Date();
		
		if(tags == null) {
			tags = new HashSet<String>();
		}
		
		String eventUUID = Utilities.generateEventUUID(timezone);
		
		if(timezone == null) {
			timezone = TimeZone.getTimeZone("UTC");
		} else if(event.getEventInfo().getIsAllDay()) {
			timezone = TimeZone.getTimeZone("UTC");
		}
		
		try {
			// 1. Add entry to the EventInfo table
			DBEventInfo eventInfo = event.getEventInfo();
			eventInfo.setEventInfo_UUID(UUID.randomUUID().toString());
			eventInfo.setCalendar_UUID(calendar.getCalendar_UUID());
			eventInfo.setEvent_UUID(eventUUID);
			eventInfoDao.addEventInfo(eventInfo);
			
			// 2. Add entry to the Event table
			event.setEvent_UUID(eventUUID);
			event.setCalendar_UUID(calendar.getCalendar_UUID());
			event.setEventInfo(eventInfo);
			
			event.setCreatedBy(user.getUserUUID());
			event.setDbModifiedOn(now);
			event.setModifiedBy(user.getUserUUID());
			if(impersonator == null){
				event.setCreatedOn(now);
				event.setModifiedOn(now);
			} else {
				event.setCreatedBy(impersonator.getUserUUID());
				event.setModifiedBy(impersonator.getUserUUID());
			}
			eventDao.addEvent(event);
			
			// 3. Add entry (or multiple entries) to the EventInstance table
			for(Iterator<DBEventInstance> iter = event.getEventInstances().iterator(); iter.hasNext(); ) {
				DBEventInstance instance = iter.next();
				instance.setEventInst_UUID(UUID.randomUUID().toString());
				instance.setCalendar_UUID(calendar.getCalendar_UUID());
				instance.setEvent_UUID(eventUUID);
				eventInstanceDao.addEventInstance(instance);
			}
			
			// 4. update tags
			event.setTags(new ArrayList<DBEventTag>());
			Map<String, Integer> tagStatUpdates = updateTags(event, tags);
			
			// 5. Update last modified timestamp for calendar
			calendar.setLastModified(now);
			calendarDao.updateCalendar(calendar.getCalendar_UUID(), new HashMap<String, Object>());

			daoManager.commitTransaction();
			
			// 6. audit
			audit.eventSingleCreated(calendar, event, user, impersonator);
			
			// 7. update tag statistics
			if(tagStatUpdates != null && tagStatUpdates.size() > 0) {
				updateTagAgg(calendar.getCalendar_UUID(), tagStatUpdates);
				daoManager.commitTransaction();
			}
			
			// 8. record mention history 
			userMentionDao.updateMentionHistory(event);
			daoManager.commitTransaction();
		} catch (Exception e) {
			handleException(e);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "addCustomEvent", event.getEvent_UUID());
		}
		
		return event.getEvent_UUID();
	}
	
	public DBEventInstance updateEventInstance(DBEventInstance instance, DBEventInstance updates, Set<String> tagUpdates, DBEvent event, DBCalendar calendar, DBUser user, DBUser impersonator) throws CalendarException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "updateEventInstance", new Object[] { instance, updates, event, calendar, user });
		}
		
		int updated = 0; // 0x01 -- info object updated, 0x03 -- instance object need update
		
		Date oldStartDate = instance.getStartDate(); // remember the original start time of this event instance, needed for creating event substitution 
		Date oldEndDate = instance.getEndDate(); // remember the original end time of this event instance, needed for update following info
		
		Date now = new Date();
		
		try {
			// 1. Handle event info updates
		
			DBEventInfo newEventInfo = updates.getEventInfo();
			
			if(event.getIsRecurrence()) {
				DBEventInfo instInfo = instance.getEventInfo();
				if(instInfo != null) {
					instInfo.update(newEventInfo);
					newEventInfo = instInfo;
				} 
				
				DBEventInfo eventInfo = event.getEventInfo();
				if(Utilities.equals(eventInfo.getName(), newEventInfo.getName())) {
					newEventInfo.setName(null);
				}
				if(Utilities.equals(eventInfo.getImageUrl(), newEventInfo.getImageUrl())) {
					newEventInfo.setImageUrl(null);
				}
				if(Utilities.equals(eventInfo.getLocation(), newEventInfo.getLocation())) {
					newEventInfo.setLocation(null);
				}
				if(Utilities.equals(eventInfo.getDescription(), newEventInfo.getDescription())) {
					newEventInfo.setDescription(null);
				}
				if(Utilities.equals(eventInfo.getIsAllDay(), newEventInfo.getIsAllDay())) {
					newEventInfo.setIsAllDay(null);
				}
				
				// do not update event name/tags, if is repeating event
				if(event.getIsRecurrence()) {
					newEventInfo.setName(null);
				}
				
				// if we are changing the instance info to the original one (same as event's info)
				// we delete the redundant event info object for the instance
				if(newEventInfo.getName() == null && newEventInfo.getImageUrl() == null && newEventInfo.getLocation() == null 
						&& newEventInfo.getDescription() == null && newEventInfo.getIsAllDay() == null) {
					if(instance.getEventInfo() != null) {
						eventInfoDao.deleteEventInfo(instance.getEventInfo().getEventInfo_UUID());
						instance.setEventInfo(null);
						updated = 0x03;
					}
				} else {
					if(instance.getEventInfo() == null) {
						newEventInfo.setEventInfo_UUID(UUID.randomUUID().toString());
						newEventInfo.setCalendar_UUID(calendar.getCalendar_UUID());
						newEventInfo.setEvent_UUID(event.getEvent_UUID());
						eventInfoDao.addEventInfo(newEventInfo);
						
						instance.setEventInfo(newEventInfo);
						updated = 0x03;
					} else {
						eventInfoDao.updateEventInfo(newEventInfo);
						
						updated = 0x01;
					}
				}
			} else {
				DBEventInfo eventInfo = event.getEventInfo();
				eventInfo.update(newEventInfo);
				eventInfoDao.updateEventInfo(eventInfo);
				updated = 0x01;
			}
			
			// 2. Handle event date / instance update
			
			if(instance.update(updates)) updated = 0x03;
			
			if(updated > 0) {
				instance.setModifiedBy(user.getUserUUID());
				if(impersonator == null){
					instance.setModifiedOn(now);
				} else {
					instance.setModifiedOn(updates.getModifiedOn());
					instance.setModifiedBy(impersonator.getUserUUID());
				}
				instance.setDbModifiedOn(now);
				eventInstanceDao.updateEventInstance(instance);
			}
			
			// 3. Handle repeating event, create/update DBSubstitution object if needed
			
			if(event.getIsRecurrence() && updated > 0) {
				DBSubstitution substitution = substitutionDao.getSubstitution(instance.getEventInst_UUID());
				
				if(substitution == null) {
					substitution = new DBSubstitution();
					substitution.setSubstitution_UUID(instance.getEventInst_UUID());
					substitution.setCalendar_UUID(calendar.getCalendar_UUID());
					substitution.setEvent_UUID(event.getEvent_UUID());
					substitution.setEventInfo(instance.getEventInfo());
					substitution.setStartDate(oldStartDate);
					substitution.setNewStartDate(instance.getStartDate());
					substitution.setNewEndDate(instance.getEndDate());
					substitution.setModifiedOn(new Date(now.getTime() + rand.nextInt(1000)));
					if(event.isSubstitutionNeeded(substitution)) {
						substitutionDao.addSubstitution(substitution);
					}
					
					event.getRecurrence().setModifiedOn(now);
					recurrenceDao.updateRecurrence(event.getRecurrence());
				} else {
					String oldEventInfoUUID = substitution.getEventInfo_UUID();
					
					substitution.setEventInfo(instance.getEventInfo());
					substitution.setNewStartDate(instance.getStartDate());
					substitution.setNewEndDate(instance.getEndDate());
					substitution.setModifiedOn(new Date(now.getTime() + rand.nextInt(1000)));
					
					// if we change the instance start & end date to the original one (series creates)
					// delete the redundant substitution
					if(event.isSubstitutionNeeded(substitution)) {
						substitutionDao.updateSubstitution(substitution);
						
						// for seedlist, add tomb object for exception instance
						if(StringUtils.isNotBlank(oldEventInfoUUID) && StringUtils.isBlank(substitution.getEventInfo_UUID())) {
							deletionHistoryDao.addDeletionHistory(calendar.getCalendar_UUID(), DeletionHistoryDAO.OBJECT_TYPE_EXCEPTION_INSTANCE, substitution.getSubstitution_UUID());
						}
					} else {
						substitutionDao.deleteSubstitution(substitution.getSubstitution_UUID());
						
						// for seedlist, add tomb object for exception instance
						if(StringUtils.isNotBlank(oldEventInfoUUID)) {
							deletionHistoryDao.addDeletionHistory(calendar.getCalendar_UUID(), DeletionHistoryDAO.OBJECT_TYPE_EXCEPTION_INSTANCE, substitution.getSubstitution_UUID());
						}
					}
					
					if(StringUtils.isBlank(oldEventInfoUUID) || StringUtils.isBlank(substitution.getEventInfo_UUID())) {
						// for seedlist, update the last modified time of recurrence object, only when non-info-exception instance updated
						event.getRecurrence().setModifiedOn(now);
						recurrenceDao.updateRecurrence(event.getRecurrence());
					}
				}
			}
			
			// 4. Update tags, only for single event
			Map<String, Integer> tagStatUpdates = null;
			if(!event.getIsRecurrence() && tagUpdates != null) {
				tagStatUpdates = updateTags(event, tagUpdates);
			}
			
			// 5. Update last modified information for event object and calendar object
			if(updated > 0 || (tagStatUpdates != null && tagStatUpdates.size() > 0)) {
				if(!event.getIsRecurrence()) {
					event.setModifiedBy(user.getUserUUID());
					event.setModifiedOn(now);
					eventDao.updateEvent(event);
				}
				
				calendar.setLastModified(now);
				calendarDao.updateCalendar(calendar.getCalendar_UUID(), new HashMap<String, Object>());
			}
			
			// 6. Update following records, if needed
			if(updated > 0) {
				Date newEndDate = instance.getEndDate();
				Date normalizedNewEndDate = DBEventFollowingRecord.getNormalizeEventEndDate(newEndDate);
				if(!newEndDate.equals(oldEndDate) && !normalizedNewEndDate.equals(DBEventFollowingRecord.getNormalizeEventEndDate(oldEndDate))) {
					followingDao.updateEndDateOfEventItem(instance.getEventInst_UUID(), DBEventFollowingRecord.EVENT_INSTANCE, normalizedNewEndDate);
					if(event.getIsRecurrence() && eventInstanceDao.getLatestEndDate(event.getEvent_UUID()).equals(newEndDate)) {
						followingDao.updateEndDateOfEventItem(event.getEvent_UUID(), DBEventFollowingRecord.EVENT_SERIES, normalizedNewEndDate);
					}
				}
			}
			
			daoManager.commitTransaction();
			
			// 7. audit
			if(updated > 0 || (tagStatUpdates != null && tagStatUpdates.size() > 0)) {
				if (event.getIsRecurrence())
					audit.eventInstanceUpdated(calendar, event, instance, user, impersonator);
				else
					audit.eventSingleUpdated(calendar, event, user, impersonator);
			}
			
			// 8. update tag statistics
			if(tagStatUpdates != null && tagStatUpdates.size() > 0) {
				updateTagAgg(calendar.getCalendar_UUID(), tagStatUpdates);
				daoManager.commitTransaction();
			}
			
			// 9. record mention history 
			if(event.getIsRecurrence()) {
				userMentionDao.updateMentionHistory(instance);
				daoManager.commitTransaction();
			} else {
				userMentionDao.updateMentionHistory(event);
				daoManager.commitTransaction();
			}
		} catch (Exception e) {
			handleException(e);
		}
		
		// 10. reset the instance list for event object, because instance object has been updated
		if(updated == 0x03) {
			event.setEventInstances(null);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "updateEventInstance", instance);
		}
		
		return instance;
	}
	
	/**
	 * Method to use when updating an custom (single) event. This method figures out what kind of event it is and acts according to that.
	 */
	public DBEvent updateCustomEvent(DBEvent event, DBEvent updates, Set<String> tagUpdates, TimeZone timezone, DBCalendar calendar, DBUser user, DBUser impersonator) throws CalendarException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "updateCustomEvent", new Object[] { event, updates, tagUpdates, timezone, calendar, user });
		}
		
		validate(event, updates, timezone);
		
		Date now = new Date();
		
		if(tagUpdates == null) {
			tagUpdates = new HashSet<String>();
		}
		
		DBEventInstance instance = event.getEventInstances().get(0);
		
		if(timezone == null) {
			timezone = TimeZone.getTimeZone("UTC");
		} else {
			boolean isAllday = false;
			if(updates.getEventInfo() != null && updates.getEventInfo().getIsAllDay() != null) {
				isAllday = updates.getEventInfo().getIsAllDay();
			} else if(instance.getEventInfo() != null && instance.getEventInfo().getIsAllDay() != null) {
				isAllday = instance.getEventInfo().getIsAllDay();
			} else if(event.getEventInfo() != null && event.getEventInfo().getIsAllDay() != null) {
				isAllday = event.getEventInfo().getIsAllDay();
			}
			if(isAllday) {
				timezone = TimeZone.getTimeZone("UTC");
			}
		}
		
		boolean updated = false; 
		try {
			Date oldEndDate = instance.getEndDate();
			
			// 1. Handle event info updates
		
			DBEventInfo newEventInfo = updates.getEventInfo();

			DBEventInfo instInfo = instance.getEventInfo();
			if(instInfo != null) {
				instInfo.update(newEventInfo);
				newEventInfo = instInfo;
			} 
			
			DBEventInfo eventInfo = event.getEventInfo();
			Set<String> updatedFields = eventInfo.update(newEventInfo);
			if(!updatedFields.isEmpty()) {
				eventInfoDao.updateEventInfo(eventInfo);
				updated = true;
			}
			
			if(instInfo != null) {
				eventInfoDao.deleteEventInfo(instInfo.getEventInfo_UUID());
				instance.setEventInfo(null);
				updated = true;
			}
			
			// 2. If event updated to recurrence...
			if(updates.getIsRecurrence()) {
				event.setIsRecurrence(true);
				
				// 2.1 Add entry to the Recurrence table
				DBRecurrence recurrence = updates.getRecurrence();
				recurrence.setEvent_UUID(event.getEvent_UUID());
				recurrence.setCalendar_UUID(calendar.getCalendar_UUID());
				recurrence.setModifiedOn(now);
				
				// adjust until rule, to align with the startDate of event
				recurrence.setUntilRule(Utilities.align(recurrence.getUntilRule(), recurrence.getStartDate(), timezone, recurrence.getUntilRule()));
				
				recurrenceDao.addRecurrence(recurrence);
				
				// 2.2 Populate event instances
				List<DBEventInstance> instances = populateEventInstances(event, recurrence.getStartDate(), 0, timezone, instance);
				event.setEventInstances(instances);
				
				updated = true;
			}
			
			// 3. Update tags, only for single event
			Map<String, Integer> tagStatUpdates = updateTags(event, tagUpdates);
			if(tagStatUpdates.size() > 0) {
				updated = true;
			}
			
			// 4. Update last modified information for event object and calendar object
			if(updated) {
				event.setModifiedBy(user.getUserUUID());
				if(impersonator == null){
					event.setModifiedOn(now);
				} else {
					event.setModifiedOn(updates.getModifiedOn());
					event.setModifiedBy(impersonator.getUserUUID());
				}
				event.setDbModifiedOn(now);
				eventDao.updateEvent(event);
				
				calendar.setLastModified(now);
				calendarDao.updateCalendar(calendar.getCalendar_UUID(), new HashMap<String, Object>());
			}
			
			// 5. Update related following records, if needed
			if(updated) {
				Date newEndDate = instance.getEndDate();
				Date normalizedNewEndDate = DBEventFollowingRecord.getNormalizeEventEndDate(newEndDate);
				if(!newEndDate.equals(oldEndDate) && !normalizedNewEndDate.equals(DBEventFollowingRecord.getNormalizeEventEndDate(oldEndDate))) {
					followingDao.updateEndDateOfEventItem(instance.getEventInst_UUID(), DBEventFollowingRecord.EVENT_INSTANCE, normalizedNewEndDate);
				}
			}
			
			daoManager.commitTransaction();
			
			// 6. audit
			if(updated) {
				if (event.getIsRecurrence())
					audit.eventSeriesUpdated(calendar, event, user, impersonator);
				else
					audit.eventSingleUpdated(calendar, event, user, impersonator);
			}
			
			// 7. update tag statistics
			if(tagStatUpdates != null && tagStatUpdates.size() > 0) {
				updateTagAgg(calendar.getCalendar_UUID(), tagStatUpdates);
				daoManager.commitTransaction();
			}
			
			// 8. record mention history 
			userMentionDao.updateMentionHistory(event);
			daoManager.commitTransaction();
		} catch (Exception e) {
			handleException(e);
		}
		
		if(updated) {
			event.setEventInstances(null);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "updateCustomEvent", event);
		}
		
		return event;
	}
	
	/**
	 * Method to use when updating all Instances of an event. This method figures out what kind of event it is and acts according to that.
	 */
	public DBEvent updateEventSeries(DBEvent event, DBEvent updates, Set<String> tagUpdates, TimeZone timezone, DBCalendar calendar, DBUser user, DBUser impersonator) throws CalendarException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "updateEventSeries", new Object[] { event, updates, timezone, calendar, user });
		}
		
		validate(event, updates,timezone);
		
		boolean updated = false;
		
		Date now = new Date();
		
		if(timezone == null) {
			timezone = TimeZone.getTimeZone("UTC");
		} else {
			boolean isAllday = false;
			if(updates.getEventInfo() != null && updates.getEventInfo().getIsAllDay() != null) {
				isAllday = updates.getEventInfo().getIsAllDay();
			} else if(event.getEventInfo() != null && event.getEventInfo().getIsAllDay() != null) {
				isAllday = event.getEventInfo().getIsAllDay();
			}
			if(isAllday) {
				timezone = TimeZone.getTimeZone("UTC");
			}
		}
		
		try {
			// 1. Handle event info updates
			Set<String> updatedEventInfoFields = null;
			if(!(updatedEventInfoFields = event.getEventInfo().update(updates.getEventInfo())).isEmpty()) {
				eventInfoDao.updateEventInfo(event.getEventInfo());
				updated = true;
			}
			
			// 2. Handle tag updates
			Map<String, Integer> tagStatUpdates = null;
			if(tagUpdates != null) {
				tagStatUpdates = updateTags(event, tagUpdates);
				if(tagStatUpdates.size() > 0) {
					updated = true;
				}
			}
			
			// 3. - Batch update the last modified time field for with-info-exception instances, for seedlist
			//    - reset event instances lastModified
			if(updated) {
				substitutionDao.updateEventSubstitutionsTimestampInBatch(event.getEvent_UUID());
				
				List<String> fields = new ArrayList<String>();
				if(tagStatUpdates != null && tagStatUpdates.size() > 0) {
					fields = null;
				} else {
					for(Iterator<String> iter = updatedEventInfoFields.iterator(); iter.hasNext(); ) {
						String field = iter.next();
						if("NAME".equals(field)) {
							fields = null;
							break;
						}
						fields.add(field);
					}
				}
				eventInstanceDao.resetEventInstancesLastModified(event.getEvent_UUID(), fields);
			}
			
			DBRecurrence recurrence = event.getRecurrence();
			DBRecurrence recurrenceUpdates = updates.getRecurrence();
			
			if(recurrenceUpdates.getByDay()!=null) recurrence.setByDay(recurrenceUpdates.getByDay());
			
			// for following
			Date oldLatestEndDate = eventInstanceDao.getLatestEndDate(event.getEvent_UUID());
			Date newLatestEndDate = null;
			Map<String, Date> endDateUpdated = new HashMap<String, Date>();
			
			// 4. Handle event date/time updates
			if(recurrenceUpdates != null && recurrenceUpdates.getStartDate() != null) {
				Calendar newStartTime = Utilities.getCalendarInstance(recurrenceUpdates.getStartDate(), timezone);
				Calendar newEndTime = Utilities.getCalendarInstance(recurrenceUpdates.getEndDate(), timezone);
				
				long startTimeOffset = recurrenceUpdates.getStartDate().getTime() - recurrence.getStartDate().getTime();
				long endTimeOffset = recurrenceUpdates.getEndDate().getTime() - recurrence.getEndDate().getTime();
				long newDuration = newEndTime.getTimeInMillis() - newStartTime.getTimeInMillis();
				
				if(startTimeOffset != 0 || endTimeOffset != 0) {
					recurrence.setStartDate(recurrenceUpdates.getStartDate());
					recurrence.setEndDate(recurrenceUpdates.getEndDate());
					// adjust "start date" of each event instance, by moving them a same offset
					if(timezone != null && timezone.useDaylightTime()) {
						List<DBEventInstance> instances = eventInstanceDao.getEventInstances(event.getEvent_UUID(), false);
						for(DBEventInstance inst : instances) {
							Date oldEndDate = inst.getEndDate();
							
							inst.setStartDate(Utilities.align(inst.getStartDate(), recurrenceUpdates.getStartDate(), timezone, null));
							
							inst.setEndDate(new Date(inst.getStartDate().getTime() + newDuration));
							eventInstanceDao.updateEventInstance(inst);
							
							Date newEndDate = inst.getEndDate();
							Date normalizedNewEndDate = DBEventFollowingRecord.getNormalizeEventEndDate(newEndDate);
							if(!normalizedNewEndDate.equals(DBEventFollowingRecord.getNormalizeEventEndDate(oldEndDate))) {
								endDateUpdated.put(inst.getEventInst_UUID(), newEndDate);
							}
							if(oldEndDate.equals(oldLatestEndDate)) {
								newLatestEndDate = newEndDate;
							}
						}
						
						List<DBSubstitution> substitutions = substitutionDao.getSubstitutions(null, event.getEvent_UUID());
						for(DBSubstitution substitution : substitutions) {
							substitution.setStartDate(Utilities.align(substitution.getStartDate(), recurrenceUpdates.getStartDate(), timezone, null));
							substitutionDao.updateSubstitution(substitution);
						}
					} else {
						// for following
						List<DBEventInstance> instances = eventInstanceDao.getEventInstances(event.getEvent_UUID(), false);
						for(DBEventInstance inst : instances) {
							Date oldEndDate = inst.getEndDate();
							Date newEndDate = new Date(inst.getEndDate().getTime() + endTimeOffset);
							Date normalizedNewEndDate = DBEventFollowingRecord.getNormalizeEventEndDate(newEndDate);
							if(!normalizedNewEndDate.equals(DBEventFollowingRecord.getNormalizeEventEndDate(oldEndDate))) {
								endDateUpdated.put(inst.getEventInst_UUID(), newEndDate);
							}
							if(oldEndDate.equals(oldLatestEndDate)) {
								newLatestEndDate = newEndDate;
							}
						}
						
						eventInstanceDao.moveEventInstancesInBatch(event.getEvent_UUID(), startTimeOffset%Utilities.ONE_DAY/1000, endTimeOffset%Utilities.ONE_DAY/1000);
						substitutionDao.moveEventSubstitutionsInBatch(event.getEvent_UUID(), startTimeOffset%Utilities.ONE_DAY/1000, endTimeOffset%Utilities.ONE_DAY/1000);
					}
					
					updated = true;
				}
			}
			
			// 5. Handle repeating event extending & shrink
			if(recurrenceUpdates != null && recurrenceUpdates.getUntilRule() != null) {
				Date oldUntilRule = recurrence.getUntilRule();
				Date newUntilRule = recurrenceUpdates.getUntilRule();
				
				// adjust until rule, to align with the startDate of event (or end-of-day, if timezone present)
				newUntilRule = Utilities.align(newUntilRule, recurrence.getStartDate(), timezone, newUntilRule);
				
				if(!oldUntilRule.equals(newUntilRule)) {
					recurrence.setUntilRule(newUntilRule);
					updated = true;
				}
				
				//remove redundant event instances
				List<DBSubstitution> substitutions = substitutionDao.getSubstitutions(event.getCalendar_UUID(), event.getEvent_UUID());
				List<DBEventInstance> customizedInstances = new ArrayList<DBEventInstance>();
				Iterator<DBEventInstance> iterator = event.getEventInstances().iterator();
				while(iterator.hasNext()){
					DBEventInstance inst = iterator.next();
					
					boolean hasSubstitution = false;
					for(DBSubstitution substitution:substitutions){
						if(substitution.getSubstitution_UUID().equals(inst.getEventInst_UUID())){
							hasSubstitution = true;
							customizedInstances.add(inst);
						}
					}
					
					if(inst.getStartDate().after(recurrence.getUntilRule()) || inst.getEndDate().before(recurrence.getStartDate())) {
						iterator.remove();
						if(!hasSubstitution)
							eventInstanceDao.deleteEventInstance(inst.getEventInst_UUID());
					}
				}
				
				// compute the start date of "current last instance" and then populate the new event instances
				if(recurrence.getFrequencyCode().equals(FrequencyCode.MONTHLY)){
					populateEventInstances(event,recurrence.getStartDate(), 0, timezone,event.getEventInstances().toArray(new DBEventInstance[0]));
				} else {
					populateEventInstances(event,recurrence.getStartDate() , 0, timezone,event.getEventInstances().toArray(new DBEventInstance[0]));
				}
			
				//recover customized instances
				for(DBEventInstance customizedInstance:customizedInstances){
					eventInstanceDao.updateEventInstance(customizedInstance);
				}
				
				if(!oldUntilRule.equals(newUntilRule)) {
					// for following...
					newLatestEndDate = eventInstanceDao.getLatestEndDate(event.getEvent_UUID());
				}
			}
			
			// 6. Handle recurrence object update
			if(updated) {
				recurrence.setModifiedOn(now);
				recurrenceDao.updateRecurrence(recurrence);
			}
			
			// 7. Update last modified information for event object and calendar object
			if(updated) {
				event.setModifiedBy(user.getUserUUID());
				if(impersonator == null){
					event.setModifiedOn(now);
				} else {
					event.setModifiedOn(updates.getModifiedOn());
					event.setModifiedBy(impersonator.getUserUUID());
				}
				event.setDbModifiedOn(now);
				eventDao.updateEvent(event);
				
				calendar.setLastModified(now);
				calendarDao.updateCalendar(calendar.getCalendar_UUID(), new HashMap<String, Object>());
			}
			
			// 8. update related following records...
			if(!endDateUpdated.isEmpty()) {
				for(String instId : endDateUpdated.keySet()) {
					followingDao.updateEndDateOfEventItem(instId, DBEventFollowingRecord.EVENT_INSTANCE, DBEventFollowingRecord.getNormalizeEventEndDate(endDateUpdated.get(instId)));
				}
			}
			if(oldLatestEndDate != null && newLatestEndDate != null) {
				Date normalizedNewLatestEndDate = DBEventFollowingRecord.getNormalizeEventEndDate(newLatestEndDate);
				if(!normalizedNewLatestEndDate.equals(DBEventFollowingRecord.getNormalizeEventEndDate(oldLatestEndDate))) {
					followingDao.updateEndDateOfEventItem(event.getEvent_UUID(), DBEventFollowingRecord.EVENT_SERIES, normalizedNewLatestEndDate);
				}
			}
			
			daoManager.commitTransaction();
			
			// 9. audit
			audit.eventSeriesUpdated(calendar, event, user, impersonator);
			
			// 10. update tag statistics
			if(tagStatUpdates != null && tagStatUpdates.size() > 0) {
				updateTagAgg(calendar.getCalendar_UUID(), tagStatUpdates);
				daoManager.commitTransaction();
			}
			
			// 11. record mention history 
			userMentionDao.updateMentionHistory(event);
			daoManager.commitTransaction();
		} catch (Exception e) {
			handleException(e);
		}
		
		// 12. reset the instance list for event object, because instance object has been updated
		if(updated) {
			event.setEventInstances(null);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "updateEventSeries", event);
		}
		
		return event;
	}
	
	private void validate(DBEvent event, DBEvent updates, TimeZone timezone) throws CalendarException {
		if(event.getIsRecurrence()) {
			DBRecurrence recur = new DBRecurrence();
			
			{
				DBRecurrence t = event.getRecurrence();
				recur.setByDay(t.getByDay());
				recur.setStartDate(t.getStartDate());
				recur.setFrequencyCode(t.getFrequencyCode());
				recur.setInterval(t.getInterval());
				recur.setUntilRule(t.getUntilRule());
			}
			
			if(updates != null) {
				DBRecurrence t = updates.getRecurrence();
				if(t != null) {
					if(t.getByDay() != null)
						recur.setByDay(t.getByDay());
					if(t.getStartDate() != null)
						recur.setStartDate(t.getStartDate());
					if(t.getFrequencyCode() != null)
						recur.setFrequencyCode(t.getFrequencyCode());
					if(t.getInterval() != null)
						recur.setInterval(t.getInterval());
					if(t.getUntilRule() != null)
						recur.setUntilRule(t.getUntilRule());
				}
			}
			
			
			int instancesCount = getEventInstancesCount(event,timezone);
			if(instancesCount ==0) {
				throw new CalendarException("error.business.error.event.noneInstance");
			}
			int maxRepeatingCount = RuntimeConfiguration.getIntValue("repeatingEvent.maxRepeatingCount");
			if(instancesCount > maxRepeatingCount) {
				throw new CalendarException("error.business.error.event.instanceCountExceedMaxSize", new Object[]{maxRepeatingCount});
			}
		} else if(!event.getIsRecurrence() && updates != null && updates.getIsRecurrence()) {
			int instancesCount = getEventInstancesCount(updates, timezone);
			if(instancesCount ==0) {
				throw new CalendarException("error.business.error.event.noneInstance");
			}
			int maxRepeatingCount = RuntimeConfiguration.getIntValue("repeatingEvent.maxRepeatingCount");
			if(instancesCount > maxRepeatingCount) {
				throw new CalendarException("error.business.error.event.instanceCountExceedMaxSize", new Object[]{maxRepeatingCount});
			}
		} 
	}
	
	private List<DBEventInstance> populateEventInstances(DBEvent recurrenceEvent, Date startDate, int byDayOffset, TimeZone timezone, DBEventInstance... reuseInstances) throws CalendarException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "populateEventInstances", new Object[] { recurrenceEvent, startDate, byDayOffset, timezone, reuseInstances });
		}
		
		DBRecurrence recurrence = recurrenceEvent.getRecurrence();
		
		List<DBEventInstance> instances = new ArrayList<DBEventInstance>();
		
		Calendar sd = Calendar.getInstance(timezone);
		sd.setTimeInMillis(startDate.getTime() - (startDate.getTime() % 1000));
		
		Calendar ed = Calendar.getInstance(timezone);
		ed.setTimeInMillis(sd.getTimeInMillis() + recurrence.getDuration());
		
		if(recurrence.getFrequencyCode().equals(FrequencyCode.MONTHLY)){
			caculateInstancesForMonthlyRepeat(recurrenceEvent,  timezone, instances, sd, ed);
		} else {
			caculateInstances(recurrenceEvent, byDayOffset, timezone, instances, sd, ed);
		}
		
		// reuse the existing instances, if possible
		List<DBSubstitution> substitutions = substitutionDao.getSubstitutions(recurrenceEvent.getCalendar_UUID(), recurrenceEvent.getEvent_UUID());
		int riIdx = 0; 
		boolean hasSubstitution = false;
		if(reuseInstances != null && reuseInstances.length > 0) {
			for(riIdx = 0; riIdx < reuseInstances.length; riIdx++) {
				long diff = Long.MAX_VALUE;
				DBEventInstance inst = null;
				int instIdx = -1;
				for(int j = 0; j < instances.size(); j++) {
					DBEventInstance t = instances.get(j);
					long tDiff = t.getStartDate().getTime() - reuseInstances[riIdx].getStartDate().getTime();
					if(tDiff < 0) tDiff = tDiff * -1;
					if(tDiff < diff) {
						diff = tDiff;
						inst = t;
						instIdx = j;
					}
				}
				if(instIdx >= 0) {
					instances.remove(instIdx);
					hasSubstitution = false;
					//check the existing instances if have substitutions, if so, keep original data of these instances
					for(DBSubstitution substitution:substitutions){
						if(substitution.getSubstitution_UUID().equals(reuseInstances[riIdx].getEventInst_UUID())){
							hasSubstitution = true;
							break;
						}
					}
					if(!hasSubstitution){
						reuseInstances[riIdx].setStartDate(inst.getStartDate());
						reuseInstances[riIdx].setEndDate(inst.getEndDate());
						reuseInstances[riIdx].setEventInfo(null);
						reuseInstances[riIdx].setModifiedOn(null);
						reuseInstances[riIdx].setModifiedBy(null);
					}
				}
			}
		}
		
		for(int j = 0; j < instances.size(); j += 10) {
			eventInstanceDao.addEventInstances(instances.subList(j, Math.min(j + 10, instances.size())));
		}
		
		for(int j = 0; j < riIdx; j++) {
			DBEventInstance inst = reuseInstances[j];
			eventInstanceDao.updateEventInstance(inst);
		}
		
		if(reuseInstances != null && reuseInstances.length > 0) {
			for(int j = riIdx; j < reuseInstances.length; j++) {
				DBEventInstance inst = reuseInstances[j];
				eventInstanceDao.deleteEventInstance(inst.getEventInst_UUID());
				userMentionDao.deleteUserMentionDataByEventInstance(inst.getEventInst_UUID());
			}
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "populateEventInstances", instances);
		}
		
		return instances;
	}

	private void caculateInstances(DBEvent recurrenceEvent, int byDayOffset,
			TimeZone timezone, 	List<DBEventInstance> instances, Calendar sd, Calendar ed) {
		DBRecurrence recurrence = recurrenceEvent.getRecurrence();
		int i = byDayOffset; 
LOOP:	while(sd != null) {
			LOGGER.finest("Processing days in the week of: " + sd.getTime() + "/" + ed.getTime());
	
			for(; i < 7; i++) {
				LOGGER.finest("Processing: " + sd.getTime() + "/" + ed.getTime());
				
				if(sd.after(recurrence.getUntilRule())) {
					LOGGER.finest("The time has passed 'until' date, exit the LOOP");
					sd = null;
					break LOOP;
				}
				
				if(((recurrence.getByDay() >> i) & 1) == 1) {
					LOGGER.finest("Add new instance: " + sd.getTime());
					
					DBEventInstance instance = new DBEventInstance();
					instance.setEventInst_UUID(UUID.randomUUID().toString());
					instance.setEvent_UUID(recurrenceEvent.getEvent_UUID());
					instance.setCalendar_UUID(recurrenceEvent.getCalendar_UUID());
					instance.setEventInfo(null);
					instance.setStartDate(new Date(sd.getTimeInMillis()));
					instance.setEndDate(new Date(ed.getTimeInMillis()));
					instances.add(instance);
				}
				
				sd.setTimeInMillis(Utilities.move(sd.getTime(), timezone, 1).getTime());
				ed.setTimeInMillis(sd.getTimeInMillis() + recurrence.getDuration());
				
				LOGGER.finest("Next candidate date: " + sd.getTime() + "/" + ed.getTime());
			}
			
			i = 0;
			
			if(recurrence.getFrequencyCode().equals(FrequencyCode.WEEKLY) && recurrence.getInterval() > 1) {
				sd.setTimeInMillis(Utilities.move(sd.getTime(), timezone, (recurrence.getInterval() - 1) * 7).getTime());
				ed.setTimeInMillis(sd.getTimeInMillis() + recurrence.getDuration());
				
				LOGGER.finest("Next candidate date/week: " + sd.getTime() + "/" + ed.getTime());
			}
		}
	}
	private void caculateInstancesForMonthlyRepeat(DBEvent recurrenceEvent,  TimeZone timezone, List<DBEventInstance> instances, Calendar sd, Calendar ed) {
		DBRecurrence recurrence = recurrenceEvent.getRecurrence();
		Calendar newInstanceStart = (Calendar)sd.clone();
		ed.setTimeInMillis(sd.getTimeInMillis() + recurrence.getDuration());
		if(Utilities.isRepeatByDate(recurrence.getByDay())){
		    int nthDayInMonth = Utilities.getNthDayInMonth(recurrence.getByDay());
		    if(LOGGER.isLoggable(Level.FINEST) ){
		    	LOGGER.finest("Processing repeats every " + nthDayInMonth + " day  in each month");
		    }
		    newInstanceStart.set(Calendar.DAY_OF_MONTH, nthDayInMonth);
		    if(newInstanceStart.before(sd)) {
		    	newInstanceStart.add(Calendar.MONTH, 1);
				newInstanceStart.set(Calendar.DAY_OF_MONTH, nthDayInMonth);
		    }
		    while(!newInstanceStart.after(recurrence.getUntilRule())){
		    	if(nthDayInMonth == newInstanceStart.get(Calendar.DAY_OF_MONTH)) {
			    	Calendar newInstanceEnd = (Calendar)ed.clone();
			    	newInstanceEnd.setTimeInMillis(newInstanceStart.getTimeInMillis() + recurrence.getDuration());
			    	DBEventInstance instance = new DBEventInstance();
					instance.setEventInst_UUID(UUID.randomUUID().toString());
					instance.setEvent_UUID(recurrenceEvent.getEvent_UUID());
					instance.setCalendar_UUID(recurrenceEvent.getCalendar_UUID());
					instance.setEventInfo(null);
					instance.setStartDate(new Date(newInstanceStart.getTimeInMillis()));
					instance.setEndDate(new Date(newInstanceEnd.getTimeInMillis()));
					instances.add(instance);
					newInstanceStart.add(Calendar.MONTH, 1);
		    	}
				newInstanceStart.set(Calendar.DAY_OF_MONTH, nthDayInMonth);
		    }
		    
		    
		} else {
			int nthOfWeek = Utilities.getNthWeekOfMonth(recurrence.getByDay());
		    int nthDayOfWeek = Utilities.getNthDayOfWeek(recurrence.getByDay());
		    if(LOGGER.isLoggable(Level.FINEST) ){
		    	LOGGER.finest("Processing repeats in the " + nthDayOfWeek + " day of " + nthOfWeek + " week");
		    }

		    int month = newInstanceStart.get(Calendar.MONTH);
		    newInstanceStart.set(Calendar.DAY_OF_WEEK, nthDayOfWeek);
		    newInstanceStart.set(Calendar.DAY_OF_WEEK_IN_MONTH, nthOfWeek);
		    if(LOGGER.isLoggable(Level.FINEST)) {
		    	LOGGER.finest("newInstanceStart = " + newInstanceStart.getTime());
		    	LOGGER.finest("start date = " + sd.getTime());
		    }
		    if(newInstanceStart.before(sd)) {
		    	// if newInstanceStart is before start date, move to next month
		    	if(month == newInstanceStart.get(Calendar.MONTH)) { // if the set week day doesn't move calendar to next month
		    		newInstanceStart.add(Calendar.MONTH, 1);
		    	}
		    	month = newInstanceStart.get(Calendar.MONTH);
		    	newInstanceStart.set(Calendar.DAY_OF_WEEK, nthDayOfWeek);
			    newInstanceStart.set(Calendar.DAY_OF_WEEK_IN_MONTH, nthOfWeek);
		    }
		    while(!newInstanceStart.after(recurrence.getUntilRule())) {
			    if(month == newInstanceStart.get(Calendar.MONTH)){	   	
			    	Calendar newInstanceEnd = (Calendar)ed.clone();
			    	newInstanceEnd.setTimeInMillis(newInstanceStart.getTimeInMillis() + recurrence.getDuration());
			    	DBEventInstance instance = new DBEventInstance();
					instance.setEventInst_UUID(UUID.randomUUID().toString());
					instance.setEvent_UUID(recurrenceEvent.getEvent_UUID());
					instance.setCalendar_UUID(recurrenceEvent.getCalendar_UUID());
					instance.setEventInfo(null);
					instance.setStartDate(new Date(newInstanceStart.getTimeInMillis()));
					instance.setEndDate(new Date(newInstanceEnd.getTimeInMillis()));
					instances.add(instance);
			    }
			    if(month == newInstanceStart.get(Calendar.MONTH)) { // if the set week day doesn't move calendar to next month
			    	newInstanceStart.add(Calendar.MONTH, 1);
			    }
			    month = newInstanceStart.get(Calendar.MONTH);
			    newInstanceStart.set(Calendar.DAY_OF_WEEK, nthDayOfWeek);
			    newInstanceStart.set(Calendar.DAY_OF_WEEK_IN_MONTH, nthOfWeek);
			    
		    } 
		}
		
		
	}
	
	private int getEventInstancesCount(DBEvent updateEvent, TimeZone timezone) throws CalendarException {
		int ret = 0;
		DBRecurrence recurrence = updateEvent.getRecurrence();
		if(recurrence.getFrequencyCode().equals(FrequencyCode.MONTHLY)){
			
			List<DBEventInstance> instances = new ArrayList<DBEventInstance>();
			
			Calendar sd = Calendar.getInstance(timezone);
			sd.setTimeInMillis(recurrence.getStartDate().getTime() - (recurrence.getStartDate().getTime() % 1000));
			
			Calendar ed = Calendar.getInstance(timezone);
			ed.setTimeInMillis(sd.getTimeInMillis() + recurrence.getDuration());
			
			caculateInstancesForMonthlyRepeat(updateEvent,  timezone, instances, sd, ed);
			return instances.size();
		}
		
		Date sd = new Date(recurrence.getStartDate().getTime());
LOOP:	while(sd != null) {
			for(int i = 0; i < 7; i++) {
				if(sd.after(recurrence.getUntilRule())) {
					sd = null;
					break LOOP;
				}
				
				if(((recurrence.getByDay() >> i) & 1) == 1) 
					ret++;
				
				sd.setTime(sd.getTime() + Utilities.ONE_DAY);
			}
			
			if(recurrence.getFrequencyCode().equals(FrequencyCode.WEEKLY) && recurrence.getInterval() > 1) {
				sd.setTime(sd.getTime() + (recurrence.getInterval() - 1) * Utilities.ONE_WEEK);
			}
		}
		
		return ret;
	}
	
	/**
	 * Method to remove an event instance
	 */
	public void removeEventInstance(DBEventInstance instance, DBEvent event, DBCalendar calendar, DBUser user) throws CalendarException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "removeEventInstance", new Object[] { instance, event, calendar, user });
		}
		
		Date oldStartDate = instance.getStartDate(); // remember the original start time of this event instance, needed for creating event substitution 
		Date now = new Date();
		
		try {
			// 1. Delete event info database record
			if(instance.getEventInfo_UUID() != null) {
				eventInfoDao.deleteEventInfo(instance.getEventInfo_UUID());
			}
			
			// 2. remove event instance
			eventInstanceDao.deleteEventInstance(instance.getEventInst_UUID());
			
			// 3. remove mention history
			userMentionDao.deleteUserMentionDataByEventInstance(instance.getEventInst_UUID());
			
			// 4. Handle repeating event, create/update DBSubstitution object if needed
			if(event.getIsRecurrence()) {
				String oldEventInfoUUID = null;
				
				DBSubstitution substitution = substitutionDao.getSubstitution(instance.getEventInst_UUID());
				if(substitution == null) {
					substitution = new DBSubstitution();
					substitution.setSubstitution_UUID(instance.getEventInst_UUID());
					substitution.setCalendar_UUID(calendar.getCalendar_UUID());
					substitution.setEvent_UUID(event.getEvent_UUID());
					substitution.setEventInfo(null);
					substitution.setStartDate(oldStartDate);
					substitution.setIsCancelled(true);
					substitution.setModifiedOn(new Date(now.getTime() + rand.nextInt(1000)));
					substitutionDao.addSubstitution(substitution);
				} else {
					oldEventInfoUUID = substitution.getEventInfo_UUID();
					
					substitution.setEventInfo(null);
					substitution.setIsCancelled(true);
					substitution.setNewStartDate(null);
					substitution.setNewEndDate(null);
					substitution.setModifiedOn(new Date(now.getTime() + rand.nextInt(1000)));
					substitutionDao.updateSubstitution(substitution);
				}
				
				// for seedlist
				if(oldEventInfoUUID == null) {
					// update recurrence object last modified time, if non-info-exception instance cancelled
					event.getRecurrence().setModifiedOn(now);
					recurrenceDao.updateRecurrence(event.getRecurrence());
				} else {
					deletionHistoryDao.addDeletionHistory(calendar.getCalendar_UUID(), DeletionHistoryDAO.OBJECT_TYPE_EXCEPTION_INSTANCE, substitution.getSubstitution_UUID());
				}
			}
			
			// 5. Remove associated comments objects
			if(instance.getCommentsCount() > 0) {
				event.setDbModifiedOn(now);
				commentDao.removeCommentsOfEventInstance(instance.getEventInst_UUID());
				eventDao.updateEvent(event);
			}
			
			// 6. Update last modified information for event object and calendar object
			{
				calendar.setLastModified(now);
				calendarDao.updateCalendar(calendar.getCalendar_UUID(), new HashMap<String, Object>());
			}
			
			// 7. if last event instance, delete the whole event object
			boolean eventRemoved = false;
			if(eventInstanceDao.getEventInstancesCount(null, event.getEvent_UUID(), null, null, null) == 0) {
				removeEvent(event, calendar, user);
				eventRemoved = true;
			}
			
			daoManager.commitTransaction();
			
			// audit
			audit.eventInstanceDeleted(calendar, event, instance, user);
			if (!event.getIsRecurrence())
				audit.eventSingleDeleted(calendar, event, user);
			else {
				if (eventRemoved) {
					audit.eventSeriesDeleted(calendar, event, user);
				}
			}
				
			//
		} catch (Exception e) {
			handleException(e);
		}
		
		// 8. reset the instance list for event object, because instance object has been updated
		event.setEventInstances(null);
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "removeEventInstance", "void");
		}
	}
	
	/**
	 * Remove full event
	 */
	public void removeEvent(DBEvent event, DBCalendar calendar, DBUser user) throws CalendarException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "removeEvent", new Object[] { event, calendar, user });
		}
		
		Date now = new Date();
		
		try {
			// 1. Delete event info database records
			eventInfoDao.deleteEventInfos(null, event.getEvent_UUID());
			
			// 2. Delete comment, event instance database records
			commentDao.removeCommentsOfEvent(event.getEvent_UUID());
			
			// 3. Delete recurrence/subsitution database records
			if(event.getIsRecurrence()) {
				deletionHistoryDao.insertInstanceDeletionHistoryForEvent(event.getEvent_UUID(), now);
				recurrenceDao.deleteRecurrence(event.getEvent_UUID());
				substitutionDao.deleteSubstitutions(null, event.getEvent_UUID());
			}
			eventInstanceDao.deleteEventInstances(null, event.getEvent_UUID());
			
			// 4. Update event tag statistics
			eventTagStatDao.updateEventTagStatOnEventDeletion(calendar.getCalendar_UUID(), event.getEvent_UUID());
			
			// 5. Delete event tag records
			eventTagDao.deleteEventTags(null, event.getEvent_UUID());
			
			// 6. Delete mention history
			userMentionDao.deleteUserMentionDataByEvent(event.getEvent_UUID());
			
			// 7. Delete the event record itself
			deletionHistoryDao.addDeletionHistory(calendar.getCalendar_UUID(), DeletionHistoryDAO.OBJECT_TYPE_EVENT, event.getEvent_UUID());
			eventDao.deleteEvent(event.getEvent_UUID());
			
			// 8. Update last modified timestamp for calendar
			calendar.setLastModified(new Date(System.currentTimeMillis()));
			calendarDao.updateCalendar(calendar.getCalendar_UUID(), new HashMap<String, Object>());
			
			daoManager.commitTransaction();
			
			// will audit in CalendarServlet
		} catch (Exception e) {
			handleException(e);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "removeEvent", "void");
		}
	}
	
	/**
	 * Remove calendar
	 */
	public int removeCalendar(String calendarUUID, DBUser user) throws CalendarException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "removeCalendar", new Object[] { calendarUUID, user });
		}
		
		long now = System.currentTimeMillis();
		
		int i = 0;
		try {
			i = getCalendarDAO().deleteCalendar(calendarUUID);
			
			// for seedlist, create tomb objects
			getDeletionHistoryDao().insertInstanceDeletionHistoryForCalendar(calendarUUID, new Timestamp(now - 1000));
			getDeletionHistoryDao().insertEventDeletionHistoryForCalendar(calendarUUID, new Timestamp(now));
			
			// clear event info, instance, etc
			getEventInfoDao().deleteEventInfos(calendarUUID, null);
			getEventInstanceDao().deleteEventInstances(calendarUUID, null);
			getRecurrenceDao().deleteRecurrencesByCalendar(calendarUUID);
			getSubstitutionDao().deleteSubstitutions(calendarUUID, null);
			getEventDAO().deleteEventsByCalendar(calendarUUID);
			getEventCommentDao().removeCommentsOfCalendar(calendarUUID);
			getEventTagDao().deleteEventTags(calendarUUID, null);
			getEventTagStatDao().deleteEventTagStat(calendarUUID, null);
			getUserMentionDao().deleteUserMentionDataByCalendar(calendarUUID);
			
			daoManager.commitTransaction();
			
			// audit
			{
				DBCalendar dbCalendar = new DBCalendar();
				dbCalendar.setCalendar_UUID(calendarUUID);	// right now, one calendar per community. same uuid.
				dbCalendar.setCommunity_UUID(calendarUUID);
				dbCalendar.setCommunityName("");
				
				audit.calendarDeleted(dbCalendar, user);
			}
		} catch (Exception e) {
			handleException(e);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "removeEvent", "void");
		}
		
		return i;
	}
	
	/**
	 * Update calendar visibility
	 */
	public void updateCalendarVisibility(String calendarUUID, int visibility, DBUser user) throws CalendarException {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "updateCalendarVisibility", new Object[] { calendarUUID, visibility, user });
		}
		
		try {
			Map<String, Object> updates = new HashMap<String, Object>();
			updates.put("visibility", visibility);
			getCalendarDAO().updateCalendar(calendarUUID, updates);
			
			daoManager.commitTransaction();
			
			// audit
			{
				audit.calendarUpdated(getCalendarDAO().getCalendar(calendarUUID), user);
			}
		} catch (Exception e) {
			handleException(e);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "removeEvent", "void");
		}
	}
	
	/**
	 * Updates the Calendar <-> Community role mapping
	 *
	 * @param calendarId - Calendar UUID
	 * @param newRole integer (0-Reader, 1-Author)
	 * @return CalendarDTO with the updated role
	 * @throws CalendarException
	 */
	public DBCalendar updateCommunityCalendarRoleMapping(String calendarId, Integer newRole) throws CalendarException{
		DBCalendar cal = null;
		try {
			daoManager.startTransaction();
			cal = calendarDao.getCalendar(calendarId);
			if(cal != null) {
				cal.setMembers_Role(newRole);
				cal.setLastModified(new Date());
				calendarDao.updateCalendar(cal);
			}
			daoManager.commitTransaction();
		} catch(Exception e){
			handleException(e);
		}
		
		if(cal == null) return null;
		
		return cal;
	}
	
	/**
	 * Add a comment to event
	 * @param comment
	 * @param event
	 * @param calendar
	 * @param user
	 * @return comment UUID
	 */
	public String addComment(DBEventComment comment, DBEventInstance inst, DBEvent event, DBCalendar calendar, DBSubstitution subs, DBUser user, DBUser impersonator) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "addComment", new Object[] { comment, inst, event, calendar, user });
		}
		
		Date now = new Date();
		String comment_UUID = null;
		
		try {
			// add comment
			comment_UUID = UUID.randomUUID().toString();
			comment.setComment_UUID(comment_UUID);
			comment.setCalendar_UUID(calendar.getCalendar_UUID());
			comment.setEventInst_UUID(inst.getEventInst_UUID());
			comment.setCreatedBy(user.getUserUUID());
			if(impersonator == null){
				comment.setCreateOn(now);
			} else {
				comment.setCreatedBy(impersonator.getUserUUID());
			}
			
			commentDao.addComment(comment);
			
			// modify event_instance dnmontime for seedlist
			inst.setDbModifiedOn(now);
			eventInstanceDao.updateEventInstance(inst);
			if(subs != null){
				subs.setModifiedOn(now);
				substitutionDao.updateSubstitution(subs);
			}
//			event.setDbModifiedOn(now);
//			eventDao.updateEvent(event);
			
			// modify calendar
			calendar.setLastModified(now);
			calendarDao.updateCalendar(calendar);
			
			daoManager.commitTransaction();
			// Add impersonator parameter to Audit to Suppress Mail Notifications for Impersonation APIs (Event Comments)
			audit.eventCommentCreated(calendar, event, inst, comment, user, impersonator);
		} catch (Exception e) {
			handleException(e);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "addComment", event.getEvent_UUID());
		}
		
		return comment_UUID;
	}
	
	/**
	 * Remove a comment
	 * @param comment_UUID
	 * @param event
	 * @param calendar
	 * @param user
	 */
	public void removeComment(String comment_UUID, DBEventInstance inst, DBEvent event, DBCalendar calendar, DBUser user) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "removeComment", new Object[] {comment_UUID});
		}
		
		Date now = new Date();
		try {
			// for audit
			DBEventComment comment = commentDao.getComment(comment_UUID);
			
			// remove comment
			commentDao.removeComment(comment_UUID);
			
			// modify event, for seedlist
			event.setDbModifiedOn(now);
			eventDao.updateEvent(event);
			
			// for seedlist
			if(inst.getCommentsCount() == 0 && event.getIsRecurrence()) {
				deletionHistoryDao.addDeletionHistory(calendar.getCalendar_UUID(), DeletionHistoryDAO.OBJECT_TYPE_EXCEPTION_INSTANCE, inst.getEventInst_UUID());
			}
			
			// modify calendar
			calendar.setLastModified(now);
			calendarDao.updateCalendar(calendar);
			
			daoManager.commitTransaction();
			

			audit.eventCommentDeleted(calendar, event, inst, comment, user);
		} catch (Exception e) {
			handleException(e);
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "removeComment");
		}
	}
	
	//////////////////////////////////
	// TAG
	//////////////////////////////////
	
	public Map<String, Integer> updateTags(DBEvent event, Set<String> tags) {
		Map<String, Integer> ret = new HashMap<String, Integer>();
		
		Set<String> added = new HashSet<String>(tags);
		Set<String> removed = new HashSet<String>();
		
		List<DBEventTag> eventTags = event.getTags();
		
		for(Iterator<DBEventTag> iter = eventTags.iterator(); iter.hasNext(); ) {
			DBEventTag  tag = iter.next();
			if(added.contains(tag.getName())) {
				added.remove(tag.getName());
			} else {
				removed.add(tag.getName());
				iter.remove();
			}
		}
		
		for(String name: added) {
			DBEventTag tag = new DBEventTag();
			tag.setTag_UUID(UUID.randomUUID().toString());
			tag.setCalendar_UUID(event.getCalendar_UUID());
			tag.setEvent_UUID(event.getEvent_UUID());
			tag.setName(name);
			tag.setModifiedOn(new Date());
			eventTagDao.addEventTag(tag);
			
			ret.put(name, 1);
			
			eventTags.add(tag);
		}
		
		for(String name: removed) {
			eventTagDao.deleteEventTag(event.getEvent_UUID(), name);
			
			ret.put(name, -1);
		}
		
		event.setTags(eventTags);
		
		return ret;
	}
	
	protected void updateTagAgg(String calendar_UUID, Map<String, Integer> tagStatUpdates) {
		for(String name: tagStatUpdates.keySet()) {
			eventTagStatDao.updateEventTagStat(calendar_UUID, name, tagStatUpdates.get(name));
		}
	}
	
	//////////////////////////////////
	// FOLLOWING&RSVP
	//////////////////////////////////
	
	public DBEventFollowingRecord addFollowing(DBUser user, DBEvent event, int type) {
		// prepare event following data for insert
		
		DBEventFollowingRecord record = new DBEventFollowingRecord();
		
		record.setUuid(UUID.randomUUID().toString());
		record.setCalendarUuid(event.getCalendar_UUID());
		record.setEventUuid(event.getEvent_UUID());
		record.setItemUuid(event.getEvent_UUID());
		record.setItemType(DBEventFollowingRecord.EVENT_SERIES);
		record.setUserUuid(user.getUserUUID());
		record.setFollowType(type + 0x10);
			
		record.setModifiedOn(new Date());
		
		Date date = eventInstanceDao.getLatestEndDate(event.getEvent_UUID());
		record.setItemEndDate(DBEventFollowingRecord.getNormalizeEventEndDate(date));

		// do check

		DBEventFollowingRecord t = followingDao.getEventFollowingRecord(event.getEvent_UUID(), DBEventFollowingRecord.EVENT_SERIES, user.getUserUUID());
		if (t != null && (t.getFollowType() & type) > 0) {
			return t;
		}

		// do insert
		followingDao.updateEventFollowingMasks(event.getEvent_UUID(), user.getUserUUID(), type + 0x10, "remove");
		followingDao.removeObsoleteEventFollowingRecords(event.getEvent_UUID(), user.getUserUUID());
		if(followingDao.updateEventFollowingMasks(event.getEvent_UUID(), DBEventFollowingRecord.EVENT_SERIES, user.getUserUUID(), record.getFollowType(), "add") == 0) {
			if (t ==null ) {
				followingDao.addEventFollowingRecord(record);
			} else {
				record.setFollowType(record.getFollowType() + (t.getFollowType() & 0x0F));//follow && attend
				followingDao.updateEventFollowingRecord(record);
			}
		}

		Date now = new Date();

		// modify event
		eventDao.updateEvent(event);
		
		
		// modify calendar

		DBCalendar calendar = calendarDao.getCalendar(event.getCalendar_UUID());
		calendar.setLastModified(now);
		calendarDao.updateCalendar(calendar);
		
		daoManager.commitTransaction();
		
		record = followingDao.getEventFollowingRecord(
				event.getEvent_UUID(), DBEventFollowingRecord.EVENT_SERIES, user.getUserUUID());
		
		return record;
	}
	
	public DBEventFollowingRecord addFollowing(DBUser user, DBEventInstance instance, int type) throws CalendarException {
		// prepare event following data for insert
		
		DBEventFollowingRecord record = new DBEventFollowingRecord();
		
		record.setUuid(UUID.randomUUID().toString());
		record.setCalendarUuid(instance.getCalendar_UUID());
		record.setEventUuid(instance.getEvent_UUID());
		record.setItemUuid(instance.getEventInst_UUID());
		record.setItemType(DBEventFollowingRecord.EVENT_INSTANCE);
		record.setUserUuid(user.getUserUUID());
		record.setFollowType(type);
		record.setModifiedOn(new Date());
		
		Date date = instance.getEndDate();
		record.setItemEndDate(DBEventFollowingRecord.getNormalizeEventEndDate(date));
		
		// do check
		
		{
			DBEventFollowingRecord t = followingDao.getEventFollowingRecord(instance.getEvent_UUID(), DBEventFollowingRecord.EVENT_SERIES, user.getUserUUID());
			if(t != null && t.getFollowType() > 0) {
				if((t.getFollowType() & type) > 0) {
					return t;
				}
			} else {
				record.setFollowType(0x10 + type);
			}
		}

		DBEventFollowingRecord t = followingDao.getEventFollowingRecord(
				instance.getEventInst_UUID(), DBEventFollowingRecord.EVENT_INSTANCE, user.getUserUUID());
		if (t != null && (t.getFollowType() & type) > 0) {
			return t;
		}

		// do insert
		if(followingDao.updateEventFollowingMasks(instance.getEventInst_UUID(), DBEventFollowingRecord.EVENT_INSTANCE, user.getUserUUID(), record.getFollowType(), "add") == 0) {
			if (t == null) {
				followingDao.addEventFollowingRecord(record);
			} else {
				record.setFollowType(record.getFollowType() + (t.getFollowType() & 0x0F));//follow && attend
				followingDao.updateEventFollowingRecord(record);
			}
		} 

		Date now = new Date();

		// modify event
		DBEvent event = instance.getEvent();
		eventDao.updateEvent(event);
		
		// modify calendar

		DBCalendar calendar = calendarDao.getCalendar(event.getCalendar_UUID());
		calendar.setLastModified(now);
		calendarDao.updateCalendar(calendar);
		
		daoManager.commitTransaction();
		
		record = followingDao.getEventFollowingRecord(
				instance.getEventInst_UUID(), DBEventFollowingRecord.EVENT_INSTANCE, user.getUserUUID());
		
		return record;
	}
	
	public void removeFollowing(DBUser user, DBEvent event, int type) {
		DBEventFollowingRecord record = followingDao.getEventFollowingRecord(event.getEvent_UUID(), DBEventFollowingRecord.EVENT_SERIES, user.getUserUUID());
		
		if(record != null) {
			if (DBEventFollowingRecord.FOLLOW == type) {
				if ((record.getFollowType() & DBEventFollowingRecord.ATTEND) > 0) {
					record.setFollowType(DBEventFollowingRecord.ATTEND + 0x10);
					followingDao.updateEventFollowingRecord(record);
				} else {
					followingDao.removeEventFollowingRecord(record.getUuid());
					followingDao.updateEventFollowingMasks(event.getEvent_UUID(), user.getUserUUID(), 0x10, "add");
				}
			} else if (DBEventFollowingRecord.ATTEND == type) {
				if ((record.getFollowType() & DBEventFollowingRecord.FOLLOW) > 0) {
					record.setFollowType(DBEventFollowingRecord.FOLLOW + 0x10);
					followingDao.updateEventFollowingRecord(record);
				} else {
					followingDao.removeEventFollowingRecord(record.getUuid());
					followingDao.updateEventFollowingMasks(event.getEvent_UUID(), user.getUserUUID(), 0x10, "add");
				}
			}
		} else {
			followingDao.updateEventFollowingMasks(event.getEvent_UUID(), user.getUserUUID(), type, "remove");
			followingDao.removeObsoleteEventFollowingRecords(event.getEvent_UUID(), user.getUserUUID());
		}

		Date now = new Date();

		// modify event
		eventDao.updateEvent(event);
		
		
		// modify calendar

		DBCalendar calendar = calendarDao.getCalendar(event.getCalendar_UUID());
		calendar.setLastModified(now);
		calendarDao.updateCalendar(calendar);
		
		daoManager.commitTransaction();
	}
	
	public boolean removeFollowing(DBUser user, DBEventInstance instance, int type) throws CalendarException {
		// do check
		
		DBEventFollowingRecord record = followingDao.getEventFollowingRecord(instance.getEventInst_UUID(), DBEventFollowingRecord.EVENT_INSTANCE, user.getUserUUID());
		if(record == null || (record.getFollowType() & type) == 0) {
			return false;
		}
		
		// do update
		if (DBEventFollowingRecord.FOLLOW == type) {
			if ((record.getFollowType() & DBEventFollowingRecord.ATTEND) > 0) {
				record.setFollowType(DBEventFollowingRecord.ATTEND + 0x10);
				followingDao.updateEventFollowingRecord(record);
			} else {
				followingDao.removeEventFollowingRecord(record.getUuid());
			}
		} else if (DBEventFollowingRecord.ATTEND == type) {
			if ((record.getFollowType() & DBEventFollowingRecord.FOLLOW) > 0) {
				record.setFollowType(DBEventFollowingRecord.FOLLOW + 0x10);
				followingDao.updateEventFollowingRecord(record);
			} else {
				followingDao.removeEventFollowingRecord(record.getUuid());
			}
		}

		Date now = new Date();

		// modify event
		DBEvent event = instance.getEvent();
		eventDao.updateEvent(event);
		
		
		// modify calendar

		DBCalendar calendar = calendarDao.getCalendar(event.getCalendar_UUID());
		calendar.setLastModified(now);
		calendarDao.updateCalendar(calendar);
		
		
		daoManager.commitTransaction();
		
		return true;
	}
	
	/**
	 * 1 -- followed/RSVP, instance level
	 * 2 -- followed/RSVP, series level
	 * 0 -- not followed/RSVP
	 */
	public int hasUserFollowedEvent(DBUser user, DBEventInstance instance, int type) {
		DBEventFollowingRecord record = followingDao.getEventFollowingRecord(instance.getEventInst_UUID(), DBEventFollowingRecord.EVENT_INSTANCE, user.getUserUUID());
		if(record != null && (record.getFollowType() & type) > 0) {
			return 1;
		}
		
		record = followingDao.getEventFollowingRecord(instance.getEvent_UUID(), DBEventFollowingRecord.EVENT_SERIES, user.getUserUUID());
		if(record != null && (record.getFollowType() & type) > 0) {
			return 2;
		}
		
		return 0;
	}
	
	
	/**
	 * This method handles all the exceptions thwrown by methods of this class. If exception type is SQL, the method attempts to get the DBMS specific code of the error
	 * @param ex
	 * @throws CalendarException
	 */
	private void handleException(Exception ex) throws CalendarException {
		// This is were logging is done for most of the methods of this class
		LOGGER.throwing(CLASS_NAME, "handleException", ex);
		
		if(ex instanceof CalendarException) {
			throw (CalendarException)ex;
		} else if(ex instanceof SQLException || ex instanceof DaoException) {
			throw new DatabaseException(ex);
		} else {
			throw new CalendarException(ex);
		}
	}
}