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
import java.util.List;
import java.util.Set;

import org.apache.commons.math.random.RandomData;
import org.apache.commons.math.random.RandomDataImpl;

import com.ibm.lconn.calendar.datapop.core.DataInput;
import com.ibm.lconn.calendar.datapop.core.Selector;

public class GaussianSelector implements Selector {
	protected static RandomData random = new RandomDataImpl();
	
	protected int count = -1;
	protected double mean = -1;
	protected double stddev = -1;
	
	public GaussianSelector(int count, double mean, double stddev) {
		this.count = count;
		this.mean = mean;
		this.stddev = stddev;
	}
	
	public Object select(DataInput input) {
		List ret = null;
		
		if(input.size() <= count) {
			ret = input.list();
		} else {
			Set set = new HashSet();
			while(set.size() < count) {
				long idx = -1;
				while(idx < 0 || idx >= input.size()) {
					double t = random.nextGaussian(mean, stddev);
					if(mean < 1)
						idx = (long)Math.ceil(t * (double)input.size());
					else
						idx = (long)Math.ceil(t);
				}
				set.add(input.get(idx));
			}
			ret = new ArrayList(set);
		}
		
		if(count == 1) {
			if(ret.isEmpty()) return null;
			else
				return ret.get(0);
		}
		
		return ret;
	}
	
	public boolean select(DataInput input, long idx) {
		throw new UnsupportedOperationException();
	}
}
