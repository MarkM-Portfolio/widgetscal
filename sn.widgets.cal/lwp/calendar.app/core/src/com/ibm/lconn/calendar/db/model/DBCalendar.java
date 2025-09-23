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

import com.ibm.lconn.calendar.util.CalendarRole;

/**
 * @author skomard
 */

public class DBCalendar extends MultitenancyPersistentObject {
	public static final int PUBLIC = 1;
	public static final int PRIVATE = 0;
	
	// Attributes
	private String 	calendar_UUID = null;
	private String 	community_UUID = null;
	private String 	widgetId = null;
	private String 	communityName = null;
	private Integer members_Role = CalendarRole.DEFAULT; 
	private Integer visibility = PUBLIC;
	private Date 	lastModified = null;
	private Date	createdOn = null;
	private Date	aclModtime = null; 
	
	// Accessors and Mutators
	public void setCalendar_UUID(String calendar_UUID) {
		this.calendar_UUID = calendar_UUID;
	}
	
	public String getCalendar_UUID() {
		return calendar_UUID;
	}
	
	public void setCommunity_UUID(String community_UUID) {
		this.community_UUID = community_UUID;
	}
	
	public String getCommunity_UUID() {
		return community_UUID;
	}
	
	public void setCommunityName(String communityName) {
		this.communityName = communityName;
	}

	public String getCommunityName() {
		return communityName;
	}
	
	public void setWidgetId(String widgetId) {
		this.widgetId = widgetId;
	}
	
	public String getWidgetId() {
		return this.widgetId;
	}

	/**
	 * Returns the role mapping for community members
	 */
	public Integer getMembers_Role(){
		return members_Role;
	}
	
	/**
	 * Sets the role mapping for community members
	 */
	public void setMembers_Role(Integer role){
		this.members_Role = role;
	}
	
	/**
	 * Returns the visibility of community (calendar)
	 */
	public Integer getVisibility(){
		return visibility;
	}
	
	/**
	 * Sets the visibility for community (calendar)
	 */
	public void setVisibility(Integer visibility){
		this.visibility = visibility;
	}
	
	/**
	 * Returns the last modified timestamp for calendar
	 */
	public Date getLastModified(){
		return lastModified;
	}
	
	/**
	 * Sets the last modified timestamp for calendar
	 */
	public void setLastModified(Date lastModified){
		this.lastModified = lastModified;
		if(this.lastModified != null) {
			this.lastModified = new Date(this.lastModified.getTime() - this.lastModified.getTime() % 1000);
		}
	}
	
	/**
	 * Returns the creation timestamp for calendar
	 */
	public Date getCreatedOn(){
		return createdOn;
	}
	
	/**
	 * Sets the creation timestamp for calendar
	 */
	public void setCreatedOn(Date createdOn){
		this.createdOn = createdOn;
		if(this.createdOn != null) {
			this.createdOn = new Date(this.createdOn.getTime() - this.createdOn.getTime() % 1000);
		}
	}
	
	/**
	 * Returns the last ACL modification timestamp for calendar
	 */
	public Date getAclModtime() {
		return aclModtime;
	}
	
	/**
	 * Sets the last ACL modification timestamp for calendar
	 */
	public void setAclModtime(Date aclModtime) {
		this.aclModtime = aclModtime;
	}

} // end of class