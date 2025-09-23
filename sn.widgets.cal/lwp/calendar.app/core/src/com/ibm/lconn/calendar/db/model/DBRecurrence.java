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

import com.ibm.lconn.calendar.util.FrequencyCode;

/**
 * @author skomard
 */

public class DBRecurrence extends MultitenancyPersistentObject {
	
	// Attributes
	private String 	event_UUID = null;
	private String  calendar_UUID = null;
	private Integer frequencyCode = null;
	private Integer interval = null;
	private Date 	untilRule = null;
	private Date 	startDate = null;
	private Date 	endDate = null;
	private Integer byDay = null;
	
	private Date	modifiedOn = null;
	
	// Accessors and Mutators
	
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
	 * @param frequencyCode the frequencyCode to set
	 */
	public void setFrequencyCode(Integer frequencyCode) {
		this.frequencyCode = frequencyCode;
	}

	/**
	 * @return the frequencyCode
	 */
	public Integer getFrequencyCode() {
		return frequencyCode;
	}
	
	public String getFrequencyName() {
		if(FrequencyCode.DAILY.equals(getFrequencyCode())) {
			return "DAILY";
		}
		if(FrequencyCode.WEEKLY.equals(getFrequencyCode())) {
			return "WEEKLY";
		}
		if(FrequencyCode.MONTHLY.equals(getFrequencyCode())) {
			return "MONTHLY";
		}
		return null;
	}
	
	/**
	 * @param interval the interval to set
	 */
	public void setInterval(Integer interval) {
		this.interval = interval;
	}

	/**
	 * @return the interval
	 */
	public Integer getInterval() {
		return interval;
	}
	
	/**
	 * @param untilRule the untilRule to set
	 */
	public void setUntilRule(Date untilRule) {
		this.untilRule = untilRule;
	}

	/**
	 * @return the untilRule
	 */
	public Date getUntilRule() {
		return untilRule;
	}

	/**
	 * @param startDate the startDate to set
	 */
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
		if(this.startDate != null) {
			this.startDate = new Date(this.startDate.getTime() - this.startDate.getTime() % 1000);
		}
	}

	/**
	 * @return the startDate
	 */
	public Date getStartDate() {
		return startDate;
	}
	
	/**
	 * @param endDate the endDate to set
	 */
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
		if(this.endDate != null) {
			this.endDate = new Date(this.endDate.getTime() - this.endDate.getTime() % 1000);
		}
	}

	/**
	 * @return the endDate
	 */
	public Date getEndDate() {
		return endDate;
	}
	
	/**
	 * @param byDay the byDay to set
	 */
	public void setByDay(Integer byDay) {
		this.byDay = byDay;
	}

	/**
	 * @return the byDay
	 */
	public Integer getByDay() {
		return byDay;
	}
	
	public void setModifiedOn(Date modifiedOn) {
		this.modifiedOn = modifiedOn;
	}
	
	public Date getModifiedOn() {
		return this.modifiedOn;
	}
	
	// convenient method
	
	public long getDuration() {
		return this.getEndDate().getTime() - this.getStartDate().getTime();
	}
} // end of class                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 