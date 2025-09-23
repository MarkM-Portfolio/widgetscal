/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* (C) Copyright IBM Corp. 2011                                      */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.calendar.datapop.core;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ibm.lconn.calendar.datapop.utils.Utilities;

public class UserPool {
	protected static UserPool inst = null;
	public static UserPool getInstance() {
		return inst;
	}
	
	protected Map<String, User> uid_map = new HashMap<String, User>();
	protected List<User> users = new ArrayList<User>();
	
	public UserPool() {
		UserPool.inst = this;
	}

	public void load(InputStream in) throws Exception {
		BufferedReader reader = new BufferedReader(new InputStreamReader(in, "UTF-8"));
		
		String s = null;
		while ((s = reader.readLine()) != null) {
			s = s.trim();
			if(s.startsWith("#") || s.length() == 0) {
				continue;
			}
			
			String[] t = Utilities.split(s, ";");
			
			User u = new User();
			u.extid = t[0];
			u.loginname = t[1];
			u.password = t[2];
			
			users.add(u);
			uid_map.put(u.extid, u);
		}
	}
	
	public User getUserByID(String extid) {
		return uid_map.get(extid);
	}
	
	public User getUserByIndex(int idx) {
		return users.get(idx);
	}
	
	public int size() {
		return users.size();
	}
}
