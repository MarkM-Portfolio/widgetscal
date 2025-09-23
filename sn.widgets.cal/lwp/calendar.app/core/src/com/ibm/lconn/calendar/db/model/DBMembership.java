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

public class DBMembership extends MultitenancyPersistentObject {
	public static final int MEMBER = 1;
	public static final int OWNER = 2;
	
	private String member_UUID = null;
	private String calendar_UUID = null;
	private Integer role = null;
	
	public DBMembership() {
	}
	
	public DBMembership(String member_UUID, String calendar_UUID, int role) {
		this.setMember_UUID(member_UUID);
		this.setCalendar_UUID(calendar_UUID);
		this.setRole(role);
	}
	
	public void setMember_UUID(String member_UUID) {
		this.member_UUID = member_UUID;
	}
	
	public String getMember_UUID() {
		return this.member_UUID;
	}
	
	public void setCalendar_UUID(String calendar_UUID) {
		this.calendar_UUID = calendar_UUID;
	}
	
	public String getCalendar_UUID() {
		return this.calendar_UUID;
	}
	
	public void setRole(int role) {
		this.role = role;
	}
	
	public int getRole() {
		return this.role;
	}
}
