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

public class DBEventTag extends MultitenancyPersistentObject {
	private String tag_UUID = null;
	private String calendar_UUID = null;
	private String event_UUID = null;
	private String name = null;
	private Date modifiedOn = null;

	public String getTag_UUID() {
		return tag_UUID;
	}

	public void setTag_UUID(String tag_UUID) {
		this.tag_UUID = tag_UUID;
	}

	public String getCalendar_UUID() {
		return calendar_UUID;
	}

	public void setCalendar_UUID(String calendar_UUID) {
		this.calendar_UUID = calendar_UUID;
	}

	public String getEvent_UUID() {
		return event_UUID;
	}

	public void setEvent_UUID(String event_UUID) {
		this.event_UUID = event_UUID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getModifiedOn() {
		return modifiedOn;
	}

	public void setModifiedOn(Date modifiedOn) {
		this.modifiedOn = modifiedOn;
	}
}
