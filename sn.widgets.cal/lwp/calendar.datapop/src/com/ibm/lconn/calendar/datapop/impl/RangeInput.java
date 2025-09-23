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

public class RangeInput implements DataInput {
	protected long start, end, step;
	
	public RangeInput(long start, long end, long step) {
		this.start = start;
		this.end = end;
		this.step = step;
		
		long t= (this.end - this.start) % this.step;
		if(t != 0) {
			this.end = this.end + t;
		}
	}
	
	public List list() {
		List l = new ArrayList();
		for(long i = start; i < end; i += step) {
			l.add(i);
		}
		return l;
	}
	
	public Iterator iterator() {
		return new Iterator() {
			long current = start;
			public boolean hasNext() {
				return current < end;
			}
			public Long next() {
				long t = current;
				current += step;
				return t;
			}
			public void remove() {
				throw new UnsupportedOperationException();
			}
		};
	}
	
	public Long get(long idx) {
		return start + idx * step;
	}
	
	public long size() {
		return (end - start)/step;
	}
	
	public List<DataInput> split(int number) {
		List<DataInput> ret = new ArrayList<DataInput>();
		
		long s = size();
		if(s % number > 0) {
			s = s - (s % number) + number;
		}
		long t = s / number;
		
		for(long i = 0; i * t < size(); i++) {
			long start = i * t * step + this.start;
			long end = start + t * step;
			if(end > this.end)  end = this.end;
			
			ret.add(new RangeInput(start, end, step));
		}
		
		return ret;
	}
}
