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

import java.util.Random;

import com.ibm.lconn.calendar.datapop.core.Context;
import com.ibm.lconn.calendar.datapop.core.Expression;
import com.ibm.lconn.calendar.datapop.core.Selector;
import com.ibm.lconn.calendar.datapop.utils.Utilities;

public class SelectorExpression implements Expression {
	protected String selectorExpr = null;
	
	public SelectorExpression(String selectorExpr) {
		this.selectorExpr = selectorExpr;
	}

	public Selector evaluate(Context ctx) {
		String s = (String)ctx.expand(selectorExpr);
		if(s.startsWith("random(")) {
			String t = s.substring(7, s.length() - 1);
			
			String[] a = null;
			if(t.indexOf(",") != -1) {
				a = new String[2];
				a[0] = t.substring(0, t.indexOf(",")).trim();
				a[1] = t.substring(t.indexOf(",") + 1).trim();
			} else {
				a = new String[]{t};
			}
			
			int count = -1;
			int idx = a[0].indexOf("-");
			if(idx != -1) {
				int x = Integer.parseInt(a[0].substring(0, idx));
				int y = Integer.parseInt(a[0].substring(idx + 1));
				count = new Random(System.currentTimeMillis()).nextInt(y - x) + x;
			} else {
				count = Integer.parseInt(a[0]);
			}
			
			double[] probabilities = null;
			if(a.length > 1) {
				if(a[1].startsWith("[") && a[1].endsWith("]")) {
					String[] x = Utilities.split(a[1].substring(1, a[1].length() - 1), ",");
					probabilities = new double[x.length];
					for(int i = 0; i < x.length; i++) {
						probabilities[i] = Double.parseDouble(x[i]);
					}
				}
			}
			
			return new RandomSelector(count, probabilities);
		} else if(s.startsWith("gaussian(")) {
			String[] t = Utilities.split(s.substring(9, s.length() - 1), ",");
			
			int count = -1;
			int idx = t[0].indexOf("-");
			if(idx != -1) {
				int x = Integer.parseInt(t[0].substring(0, idx));
				int y = Integer.parseInt(t[0].substring(idx + 1));
				count = new Random(System.currentTimeMillis()).nextInt(y - x) + x;
			} else {
				count = Integer.parseInt(t[0]);
			}
			
			return new GaussianSelector(count, Double.parseDouble(t[1]), Double.parseDouble(t[2]));
		}
		return null;
	}
}
