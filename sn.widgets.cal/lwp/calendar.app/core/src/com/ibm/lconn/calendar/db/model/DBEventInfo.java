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

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;

import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.util.ActiveContentFilter;
import com.ibm.lconn.calendar.util.MentionHelper;
import com.ibm.lconn.calendar.util.TextProcessor;
import com.ibm.lconn.calendar.util.Utilities;

/**
 * @author skomard
 */

public class DBEventInfo extends MultitenancyPersistentObject {
	
	private static class EventDesc {
    	MentionHelper.Content data = new MentionHelper.Content();
    	boolean isDirty = false;
    }
	
	// Attributes
	private String eventInfo_UUID = null;
	private String calendar_UUID = null;
	private String event_UUID = null;
	private String name = null;
	private EventDesc description = new EventDesc();
	private String location = null;
	private Boolean isAllDay = null;
	private String imageUrl = null;
	
	// Constructor
	public DBEventInfo() {
	}
	
	public DBEventInfo(String UUID) {
		this.setEventInfo_UUID(UUID);
	}

	// Accessors and Mutators
	/**
	 * @param eventInfo_UUID the eventInfo_UUID to set
	 */
	public void setEventInfo_UUID(String eventInfo_UUID) {
		this.eventInfo_UUID = eventInfo_UUID;
	}

	/**
	 * @return the eventInfo_UUID
	 */
	public String getEventInfo_UUID() {
		return eventInfo_UUID;
	}
	
	/**
	 * @param calendar_UUID the calendar_UUID to set
	 */
	public void setCalendar_UUID(String calendar_UUID) {
		this.calendar_UUID = calendar_UUID;
	}

	/**
	 * @return the calendar_UUID
	 */
	public String getCalendar_UUID() {
		return calendar_UUID;
	}
	
	/**
	 * @param event_UUID the event_UUID to set
	 */
	public void setEvent_UUID(String event_UUID) {
		this.event_UUID = event_UUID;
	}

	/**
	 * @return the event_UUID
	 */
	public String getEvent_UUID() {
		return event_UUID;
	}

	/**
	 * @param location the location to set
	 */
	public void setLocation(String location) {
		this.location = Utilities.clean(location);
		if(this.location != null) {
			this.location = StringUtils.trim(this.location);
			if(this.location.length() == 0) {
				// for oracle
				this.location = " ";
			}
		}
	}

	/**
	 * @return the location
	 */
	public String getLocation() {
		return location;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		if(Utilities.isAcfEnabled() && description != null) {
			description = ActiveContentFilter.filter(description);
		}
		description = Utilities.clean(description);
		this.description.data.setText(description, TextProcessor.NOP);
		this.description.isDirty = true;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return this.description.data.getText(MentionHelper.HTML_MENTION_FORMATTER, TextProcessor.NOP);
	}
	
	public String getDescription(MentionHelper.MentionFormatter mentionFormatter) {
		return this.description.data.getText(mentionFormatter, TextProcessor.NOP);
	}
	
	public String getDescriptionForAS() {
    	return this.description.data.getText(MentionHelper.NEWS_MENTION_FORMATTER, TextProcessor.NOP);
    }
	
	public void prepareForPersistent() {
		if(this.description.isDirty) {
    		this.description.isDirty = false;
    		DBCalendar calendar = CalendarServiceFactory.INSTANCE.create().getCalendarDAO().getCalendar(this.getCalendar_UUID());
    		this.description.data.checkPermission(calendar);
    	}
    }
	
	public void refreshNotifiedMeta() {
		this.description.data.refreshNotifiedMeta();
	}
	
	public String getDescriptionForPersistent() {
    	return this.description.data.toString();
    }
	
	public void setDescriptionForPersistent(String descriptionForPersistent) {
    	this.description.data.parse(descriptionForPersistent);
    }
	
    public List<MentionHelper.MentionRecord> getRecentMentionedPeople() {
    	return this.description.data.getRecentMentionedPeople();
	}
    
    public List<MentionHelper.MentionRecord> getMentionedPeople() {
    	return this.description.data.getMentionedPeople();
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = Utilities.clean(name);
		if(this.name != null) {
			this.name = StringUtils.trim(this.name);
			if(this.name.length() == 0) {
				// for oracle
				this.name = " ";
			}
		}
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	public void setIsAllDay(Boolean isAllDay) {
		this.isAllDay = isAllDay;
	}

	public Boolean getIsAllDay() {
		return isAllDay;
	}
	
	public String getImageUrl() {
		return imageUrl;
	}
	
	public void setImageUrl(String imageUrl) {
		this.imageUrl = Utilities.clean(imageUrl);
		if(this.imageUrl != null) {
			this.imageUrl = StringUtils.trim(this.imageUrl);
			if(this.imageUrl.length() == 0) {
				// for oracle
				this.imageUrl = " ";
			}
		}
	}
	
	// convenient methods
	public Set<String> update(DBEventInfo eventInfo) {
		Set<String> ret = new HashSet<String>();
		
		if(eventInfo == null) {
			return ret;
		}
		
		if(eventInfo.getName() != null && !eventInfo.getName().equals(this.getName())) {
			this.setName(eventInfo.getName());
			ret.add("NAME");
		}
		if(eventInfo.getLocation() != null && !eventInfo.getLocation().equals(this.getLocation())) {
			this.setLocation(eventInfo.getLocation());
			ret.add("LOCATION");
		}
		if(eventInfo.getDescription() != null && !eventInfo.getDescription().equals(this.getDescription())) {
			this.setDescription(eventInfo.getDescription());
			ret.add("DESCRIPTION");
		}
		if(eventInfo.getIsAllDay() != null && !eventInfo.getIsAllDay().equals(this.getIsAllDay())) {
			this.setIsAllDay(eventInfo.getIsAllDay());
			ret.add("ISALLDAY");
		}
		if(eventInfo.getImageUrl() != null && !eventInfo.getImageUrl().equals(this.getImageUrl())) {
			this.setImageUrl(eventInfo.getImageUrl());
			ret.add("IMAGE_URL");
		}
		return ret;
	}
}
