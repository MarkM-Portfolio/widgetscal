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

public class DBEventTagStat extends MultitenancyPersistentObject {
	private String tagagg_UUID = null;
	private String calendar_UUID = null;
	private String name = null;
	private int total = 0;
	private int intensity;
	private Date lastUsed = null;

	public String getTagagg_UUID() {
		return tagagg_UUID;
	}

	public void setTagagg_UUID(String tagagg_UUID) {
		this.tagagg_UUID = tagagg_UUID;
	}

	public String getCalendar_UUID() {
		return calendar_UUID;
	}

	public void setCalendar_UUID(String calendar_UUID) {
		this.calendar_UUID = calendar_UUID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}
	
	public int getIntensity() {
        return intensity;
    }

    public void setIntensity(int intensity) {
        this.intensity = intensity;
    }

	public Date getLastUsed() {
		return lastUsed;
	}

	public void setLastUsed(Date lastUsed) {
		this.lastUsed = lastUsed;
	}
}
