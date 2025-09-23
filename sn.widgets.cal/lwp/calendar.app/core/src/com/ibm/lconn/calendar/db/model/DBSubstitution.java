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

import java.util.Date;

import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;

/**
 * @author skomard
 */

public class DBSubstitution extends MultitenancyPersistentObject {
	
	// Attributes
	private String substitution_UUID = null;
	private String calendar_UUID = null;
	private String event_UUID = null;
	private Date   startDate = null;
	
	private Boolean isCancelled = Boolean.FALSE;
	private String 	eventInfo_UUID = null;
	private Date	newStartDate = null;
	private Date	newEndDate = null;
	
	private DBEventInfo eventInfo = null;
	
	private Date	modifiedOn = null;
	
	// Default Constructor
	public DBSubstitution() {
		super();
	}

	// Accessors and Mutators
	public void setSubstitution_UUID(String substitution_UUID) {
		this.substitution_UUID = substitution_UUID;
	}
	
	public String getSubstitution_UUID() {
		return this.substitution_UUID;
	}
	
	public void setCalendar_UUID(String calendar_UUID) {
		this.calendar_UUID = calendar_UUID;
	}
	
	public String getCalendar_UUID() {
		return this.calendar_UUID;
	}
	
	public void setEvent_UUID(String event_UUID) {
		this.event_UUID = event_UUID;
	}
	
	public String getEvent_UUID() {
		return this.event_UUID;
	}
	
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	
	public Date getStartDate() {
		return this.startDate;
	}
	
	public void setIsCancelled(Boolean isCancelled) {
		this.isCancelled = isCancelled;
	}
	
	public Boolean getIsCancelled() {
		return this.isCancelled;
	}
	
	public void setEventInfo_UUID(String eventInfo_UUID) {
		this.eventInfo_UUID = eventInfo_UUID;
	}
	
	public String getEventInfo_UUID() {
		return this.eventInfo_UUID;
	}
	
	public void setNewStartDate(Date newStartDate) {
		this.newStartDate = newStartDate;
	}
	
	public Date getNewStartDate() {
		return this.newStartDate;
	}
	
	public void setNewEndDate(Date newEndDate) {
		this.newEndDate = newEndDate;
	}
	
	public Date getNewEndDate() {
		return this.newEndDate;
	}
	
	public void setModifiedOn(Date modifiedOn) {
		this.modifiedOn = modifiedOn;
	}
	
	public Date getModifiedOn() {
		return this.modifiedOn;
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
	
	// convenient methods
	
	public long getDuration() {
		return this.getNewEndDate().getTime() - this.getNewStartDate().getTime();
	}
}