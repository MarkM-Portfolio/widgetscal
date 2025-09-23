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

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.ibm.lconn.calendar.datapop.core.Context;
import com.ibm.lconn.calendar.datapop.core.DataInput;
import com.ibm.lconn.calendar.datapop.core.Expression;
import com.ibm.lconn.calendar.datapop.utils.Utilities;

public class DataInputExpression implements Expression {
	protected String inputExpr = null;
	
	public DataInputExpression(String inputExpr) {
		this.inputExpr = inputExpr;
	}

	public DataInput evaluate(Context ctx) {
		String expandedExpr = (String)ctx.expand(inputExpr);
		try {
			String s = expandedExpr;
			if(s.startsWith("custom(")) {
				s = s.substring(7, s.length() - 1);
				
				Class c = Class.forName(s);
				Method m = c.getMethod("evaluate", Context.class);
				return (DataInput)m.invoke(c.newInstance(), ctx);
			} else if(s.startsWith("list(")) {
				s = s.substring(5, s.length() - 1);
				if(ctx.get(s) != null) {
					return new ListDataInput((List)ctx.get(s));
				}
				if(s.startsWith("[") && s.endsWith("]")) {
					List l = new ArrayList();
					String[] t = Utilities.split(s.substring(1, s.length() - 1), ",");
					for(int i = 0; i < t.length; i++) {
						if(t[i].startsWith("'") && t[i].endsWith("'")) {
							l.add(t[i].substring(1, t[i].length() - 1));
						} else {
							l.add(Long.parseLong(t[i]));
						}
					}
					return new ListDataInput(l);
				}
			} else if(s.startsWith("file(")) {
				s = s.substring(5, s.length() - 1);
				String[] t = Utilities.split(s, ",");
				
				String type = t[0].substring(1, t[0].length() - 1);
				String file = t[1].substring(1, t[1].length() - 1);
				if(t.length > 2 && t[2].startsWith("[") && t[2].endsWith("]")) {
					t = Utilities.split(t[2].substring(1, t[2].length() - 1), ";");
					return new FileInput(file, type, Arrays.asList(t));
				} else {
					if(t.length == 2) {
						return new FileInput(file, type, -1, -1);
					} else if(t.length == 3) {
						t = Utilities.split(t[2], "-");
						int offset = "".equals(t[0]) ? -1 : Integer.parseInt(t[0]);
						int length = "".equals(t[1]) ? -1 : Integer.parseInt(t[1]) - Integer.parseInt(t[0]);
						return new FileInput(file, type, offset, length);
					} else {
						int offset = "".equals(t[2]) ? -1 : Integer.parseInt(t[2]);
						int length = "".equals(t[3]) ? -1 : Integer.parseInt(t[3]);
						return new FileInput(file, type, offset, length);
					}
				}
			} else if(s.startsWith("range(") || s.startsWith("range[")) {
				char l = s.charAt(5);
				char r = s.charAt(s.length() - 1);
				
				s = s.substring(6, s.length() - 1);
				
				long step = 1;
				int idx = s.lastIndexOf("|");
				if(idx != -1) {
					step = Long.parseLong(s.substring(idx + 1));
					s = s.substring(0, idx);
				}
				
				long start = 0, end = 0;
				if(s.indexOf("-") != -1) {
					String[] t = Utilities.split(s, "-");
					start = "".equals(t[0]) ? Long.MIN_VALUE : Long.parseLong(t[0]);
					end = "".equals(t[1]) ? Long.MAX_VALUE : Long.parseLong(t[1]);
				} else {
					String[] t = Utilities.split(s, ",");
					start = "".equals(t[0]) ? Long.MIN_VALUE : Long.parseLong(t[0]);
					end = "".equals(t[1]) ? Long.MAX_VALUE : Long.parseLong(t[0]) + Long.parseLong(t[1]);
				}
				if(l == '(') start += step;
				if(r == ']') end += step;
				
				return new RangeInput(start, end, step);
			} 
		} catch (Exception ex) {
			System.out.println("Fail to evaluate input expression: [expression: " + inputExpr + ", expanded: " + expandedExpr + "]");
			System.out.println(ctx.dump());
			throw new DataPopulationException(ex);
		}
		return null;
	}
}
