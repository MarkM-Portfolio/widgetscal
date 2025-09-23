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
package com.ibm.lconn.calendar.datapop.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.ibm.lconn.calendar.datapop.core.DataInput;

public class ListDataInput implements DataInput {
	protected List data = null;
	
	public ListDataInput(List data) {
		this.data = data;
	}

	public List list() {
		return new ArrayList(data);
	}

	public Iterator iterator() {
		return data.iterator();
	}

	public Object get(long idx) {
		return data.get((int)idx);
	}

	public long size() {
		return data.size();
	}

	public List<DataInput> split(int number) {
		List<DataInput> ret = new ArrayList<DataInput>();
		
		long s = size();
		if(s % number > 0) {
			s = s - (s % number) + number;
		}
		int t = (int) (s / number);
		
		int e = (int)size();
		for(int i = 0; i * t < e; i++) {
			int start = i * t;
			int end = start + t;
			if(end > e)  end = e;
			
			ret.add(new ListDataInput(data.subList(start, end)));
		}
		
		return ret;
	}

}
