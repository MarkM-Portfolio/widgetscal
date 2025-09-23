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
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.commons.math.random.RandomData;
import org.apache.commons.math.random.RandomDataImpl;

import com.ibm.lconn.calendar.datapop.core.DataInput;
import com.ibm.lconn.calendar.datapop.core.Selector;

public class RandomSelector implements Selector {
	protected static RandomData random = new RandomDataImpl();
	
	protected int count = -1;
	protected double[] probabilities = null;
	
	public RandomSelector(int count, double[] probabilities) {
		this.count = count;
		this.probabilities = probabilities;
	}
	
	public Object select(DataInput input) {
		if(count <= 0) {
			throw new RuntimeException();
		}
		
		List ret = null;
		
		if(this.probabilities == null) {
			if(input.size() <= count) {
				ret = input.list();
			} else {
				Set<Long> t = new HashSet<Long>();
				while(t.size() < count) {
					t.add(random.nextLong(0, input.size() - 1));
				}
				
				ret = new ArrayList();
				for(Iterator<Long> iter = t.iterator(); iter.hasNext(); ) {
					ret.add(input.get(iter.next().longValue()));
				}
			}
			
			if(count == 1) return ret.isEmpty() ? null : ret.get(0);
			return ret;
		} else {
			Set<Integer> t = new HashSet<Integer>();
			while(t.size() < count) {
				double d = random.nextUniform(0.0, 1.0);
				double p = 0;
				for(int i = 0; i < probabilities.length; i++) {
					p += probabilities[i];
					if(d <= p) {
						t.add(i);
						break;
					}
				}
			}
			
			ret = new ArrayList();
			for(Iterator<Integer> iter = t.iterator(); iter.hasNext(); ) {
				ret.add(input.get(iter.next().intValue()));
			}
			
			if(count == 1) return ret.isEmpty() ? null : ret.get(0);
			return ret;
		}
	}
	
	public boolean select(DataInput input, long idx) {
		double p = 0;
		if(this.count >= 0)
			p = ((double) this.count) / ((double) input.size());
		if(this.probabilities != null) {
			p = this.probabilities[(int)idx];
		}
		
		double t = random.nextUniform(0.0, 1.0);
		if(t < p) {
			return true;
		}
		return false;
	}
}
