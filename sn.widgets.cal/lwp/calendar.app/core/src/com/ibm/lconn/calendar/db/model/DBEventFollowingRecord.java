/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.model;

import java.util.Date;

import com.ibm.icu.util.Calendar;
import com.ibm.icu.util.TimeZone;

public class DBEventFollowingRecord extends MultitenancyPersistentObject {
	public static final int FOLLOW = 1;
	public static final int ATTEND = 2;
	
	public static final int EVENT_SERIES = 0;
	public static final int EVENT_INSTANCE = 1;
	
	private String uuid = null;
	private String calendarUuid = null;
	private String eventUuid = null;
	
	private String itemUuid = null;
	private int itemType = -1;
	private Date itemEndDate = null;
	
	private String userUuid = null;
	
	private int followType = -1;
	
	private Date modifiedOn = null;
	
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	
	public String getUuid() {
		return this.uuid;
	}
	
	public void setCalendarUuid(String calendarUuid) {
		this.calendarUuid = calendarUuid;
	}
	
	public String getCalendarUuid() {
		return this.calendarUuid;
	}
	
	public void setEventUuid(String eventUuid) {
		this.eventUuid = eventUuid;
	}
	
	public String getEventUuid() {
		return this.eventUuid;
	}
	
	public void setItemUuid(String itemUuid) {
		this.itemUuid = itemUuid;
	}
	
	public String getItemUuid() {
		return this.itemUuid;
	}
	
	public void setItemType(int itemType) {
		this.itemType = itemType;
	}
	
	public int getItemType() {
		return this.itemType;
	}
	
	public void setItemEndDate(Date itemEndDate) {
		this.itemEndDate = itemEndDate;
	}
	
	public Date getItemEndDate() {
		return this.itemEndDate;
	}
	
	public void setUserUuid(String userUuid) {
		this.userUuid = userUuid;
	}
	
	public String getUserUuid() {
		return this.userUuid;
	}
	
	public void setFollowType(int followType) {
		this.followType = followType;
	}
	
	public int getFollowType() {
		return this.followType;
	}
	
	public void setModifiedOn(Date modifiedOn) {
		this.modifiedOn = modifiedOn;
	}
	
	public Date getModifiedOn() {
		return this.modifiedOn;
	}
	
	public static Date getNormalizeEventEndDate(Date date) {
		if(date == null) date = new Date(0);
		Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
		cal.setTimeInMillis(date.getTime());
		
		cal.set(Calendar.HOUR_OF_DAY, cal.getMaximum(Calendar.HOUR_OF_DAY));
		cal.set(Calendar.MINUTE, cal.getMaximum(Calendar.MINUTE));
		cal.set(Calendar.SECOND, cal.getMaximum(Calendar.SECOND));
		cal.set(Calendar.MILLISECOND, cal.getMaximum(Calendar.MILLISECOND));
		
		cal.set(Calendar.MONTH, cal.get(Calendar.MONTH) + 1);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		
		return cal.getTime();
	}
}
