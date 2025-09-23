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

package com.ibm.lconn.calendar.db.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.util.EventTagCache;

/**
 * @author skomard
 */

public class DBEvent extends MultitenancyPersistentObject {
	// Attributes
	
	private String event_UUID  = null;
	private String calendar_UUID = null;
	private String eventInfo_UUID = null;
	
	private String 	createdBy = null;
	private String 	modifiedBy = null;
	private Date 	createdOn = null;
	private Date 	modifiedOn = null;
	private boolean isRecurrence = false;
	
	private DBEventInfo  		  eventInfo  = null;
	private DBRecurrence 		  recurrence = null;
	private List<DBEventInstance> instances  = null;
	
	private List<DBEventTag> tags = null;
	private Date dbModifiedOn = null;
	
	// Accessors and Mutators
	
	public void setEvent_UUID(String event_UUID) {
		this.event_UUID = event_UUID;
	}

	public String getEvent_UUID() {
		return event_UUID;
	}
	
	public void setCalendar_UUID(String calendar_UUID) {
		this.calendar_UUID = calendar_UUID;
	}

	public String getCalendar_UUID() {
		return calendar_UUID;
	}
	
	/**
	 * @param eventInfo_UUID the eventInfo_UUID to set
	 */
	protected void setEventInfo_UUID(String eventInfo_UUID) {
		this.eventInfo_UUID = eventInfo_UUID;
	}

	/**
	 * @return the eventInfo_UUID
	 */
	public String getEventInfo_UUID() {
		return eventInfo_UUID;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}
	
	/**
	 * @param createdOn the createdOn to set
	 */
	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
		if(this.createdOn != null) {
			this.createdOn = new Date(this.createdOn.getTime() - this.createdOn.getTime() % 1000);
		}
	}

	/**
	 * @return the createdOn
	 */
	public Date getCreatedOn() {
		return createdOn;
	}

	/**
	 * @param modifiedOn the modifiedOn to set
	 */
	public void setModifiedOn(Date modifiedOn) {
		this.modifiedOn = modifiedOn;
		if(this.modifiedOn != null) {
			this.modifiedOn = new Date(this.modifiedOn.getTime() - this.modifiedOn.getTime() % 1000);
		}
	}

	/**
	 * @return the modifiedOn
	 */
	public Date getModifiedOn() {
		return modifiedOn;
	}
	
	public void setIsRecurrence(boolean isRecurrence) {
		this.isRecurrence = isRecurrence;
	}
	
	public boolean getIsRecurrence() {
		return isRecurrence;
	}
	
	public void setEventInfo(DBEventInfo eventInfo) {
		this.eventInfo = eventInfo;
		this.eventInfo_UUID = null;
		
		if(this.eventInfo != null) {
			this.eventInfo_UUID = this.eventInfo.getEventInfo_UUID();
		}
	}

	public DBEventInfo getEventInfo() {
		if(this.eventInfo == null) {
			if(getEventInfo_UUID() == null) {
				return null;
			}
			CalendarService cs = CalendarServiceFactory.INSTANCE.create();
			this.eventInfo = cs.getEventInfoDao().getEventInfo(getEventInfo_UUID());
		}
		return this.eventInfo;
	}
	
	public void setDBRecurrence(DBRecurrence recurrence) {
		this.recurrence = recurrence;
		if(this.recurrence != null) {
			this.isRecurrence = true;
		}
	}

	public DBRecurrence getRecurrence() {
		if(this.recurrence == null) {
			if(getEvent_UUID() == null || !getIsRecurrence()) {
				return null;
			}
			CalendarService cs = CalendarServiceFactory.INSTANCE.create();
			this.recurrence = cs.getRecurrenceDao().getRecurrence(getEvent_UUID());
		}
		return recurrence;
	}
	
	public void setEventInstances(List<DBEventInstance> instances) {
		this.instances = instances;
	}
	
	public List<DBEventInstance> getEventInstances() {
		if(this.instances == null) {
			if(getEvent_UUID() == null) {
				return null;
			}
			CalendarService cs = CalendarServiceFactory.INSTANCE.create();
			this.instances = cs.getEventInstanceDao().getEventInstances(getEvent_UUID(), null);
		}
		return this.instances;
	}
	
	public Set<String> getTagNames() {
    	Set<String> t = new HashSet<String>();
    	
    	List<DBEventTag> tags = getTags();
    	for(Iterator<DBEventTag> iter = tags.iterator(); iter.hasNext(); ) {
    		DBEventTag tag = (DBEventTag) iter.next();
    		t.add(tag.getName());
    	}
    	
    	return t;
    }
	
	@Deprecated
	public void setTagsNames(Collection<String> tagNames) {
		if(tagNames == null || tagNames.isEmpty()) {
			this.tags = new ArrayList<DBEventTag>();
			return;
		}
		
		List<DBEventTag> tags = new ArrayList<DBEventTag>();
		for(Iterator<String> iter = tagNames.iterator(); iter.hasNext(); ) {
			String tagName = iter.next();
			DBEventTag tag = new DBEventTag();
			tag.setName(tagName);
			tags.add(tag);
		}
		this.tags = tags;
	}
	
	public List<DBEventTag> getTags() {
		if (tags == null && getEvent_UUID() != null) {
			// try cache
			List<DBEventTag> t = EventTagCache.instance.get(getEvent_UUID() + "@" + getORG_ID(), getModifiedOn());
			if (t != null) {
				tags = new ArrayList<DBEventTag>(t);
			} 
			if(tags == null) {
				setTags(CalendarServiceFactory.INSTANCE.create().getEventTagDao().getTagsByEvent(getEvent_UUID()));
			}
			
			// set cache
			if(tags != null) {
				EventTagCache.instance.push(getEvent_UUID() + "@" + getORG_ID(), getModifiedOn(), new ArrayList<DBEventTag>(tags));
			}
		}
		
		if(tags == null) {
			tags = new ArrayList<DBEventTag>();
		}
	
		return tags;
	}
	
	public void setTags(List<DBEventTag> tags) {
		this.tags = new ArrayList<DBEventTag>(tags);
		
		// set cache
		if(this.tags != null) {
			EventTagCache.instance.push(getEvent_UUID(), getModifiedOn(), new ArrayList<DBEventTag>(this.tags));
		}
	}
	
	public Date getDbModifiedOn() {
		return this.dbModifiedOn;
	}
	
	public void setDbModifiedOn(Date time) {
		this.dbModifiedOn = time;
	}
	
	public boolean isSubstitutionNeeded(DBSubstitution substitution) {
		if(!this.getIsRecurrence())
			throw new RuntimeException();
		
		DBRecurrence recur = this.getRecurrence();
		
		if(substitution.getStartDate().equals(substitution.getNewStartDate()) && substitution.getDuration() == recur.getDuration()) {
			if(substitution.getEventInfo() == null || substitution.getEventInfo().getIsAllDay() == null || substitution.getEventInfo().getIsAllDay().equals(this.getEventInfo().getIsAllDay())) {
				substitution.setNewStartDate(null);
				substitution.setNewEndDate(null);
			}
		}
		
		if(substitution.getEventInfo() != null) {
			return true;
		}
		if(substitution.getNewStartDate() == null && substitution.getNewEndDate() == null ) {
			return false;
		}
		return true;
	}
} // end of class