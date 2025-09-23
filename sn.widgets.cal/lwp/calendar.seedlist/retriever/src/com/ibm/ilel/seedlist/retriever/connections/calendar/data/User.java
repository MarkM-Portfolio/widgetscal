/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.ilel.seedlist.retriever.connections.calendar.data;

public class User {
	String extid = null;
	String email = null;
	String name = null;
	
	public User(String extid, String email, String name) {
		this.extid = extid;
		this.email = email;
		this.name = name;
	}
	
	public String getExtID() {
		return extid;
	}
	public String getEmail() {
		return email;
	}
	public String getName() {
		return name;
	}
}