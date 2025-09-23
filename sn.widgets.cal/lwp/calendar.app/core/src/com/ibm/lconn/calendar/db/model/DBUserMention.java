/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.calendar.db.model;

import java.util.Date;

public class DBUserMention extends MultitenancyPersistentObject {

	public static final int OBJECT_TYPE_EVENT = 1;
	public static final int OBJECT_TYPE_EVENT_OBSOLETE = 9;
	public static final int OBJECT_TYPE_EVENT_INSTANCE = 2;
	public static final int OBJECT_TYPE_EVENT_INSTANCE_OBSOLETE = 10;

	private String mention_UUID = null;
	private String objectId = null;
	private int objectType = -1;
	private String calendar_UUID = null;
	private String user_UUID = null;
	private String mentionedBy = null;
	private Date createdOn = null;

	public String getMention_UUID() {
		return mention_UUID;
	}

	public void setMention_UUID(String mention_UUID) {
		this.mention_UUID = mention_UUID;
	}

	public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}

	public int getObjectType() {
		return objectType;
	}

	public void setObjectType(int objectType) {
		this.objectType = objectType;
	}

	public String getCalendar_UUID() {
		return calendar_UUID;
	}
	
	public void setCalendar_UUID(String calendar_UUID) {
		this.calendar_UUID = calendar_UUID;
	}

	public String getUser_UUID() {
		return user_UUID;
	}

	public void setUser_UUID(String user_UUID) {
		this.user_UUID = user_UUID;
	}

	public String getMentionedBy() {
		return mentionedBy;
	}

	public void setMentionedBy(String mentionedBy) {
		this.mentionedBy = mentionedBy;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}
}
