/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.calendar.datapop.core;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import mpm.textgen.TextGenerator;

import org.apache.commons.math.random.RandomData;
import org.apache.commons.math.random.RandomDataImpl;

public class Context implements Cloneable {
	protected static RandomData random = new RandomDataImpl();
	protected static TextGenerator textGenerator = new TextGenerator();
	
	protected static final Pattern RAND_TEXT_EXPR = Pattern.compile("random\\(text,([0-9.]+),([0-9.]+),([0-9.]+),([0-9.]+),([0-9.]+)\\)");
	protected static final Pattern RAND_INT_EXPR = Pattern.compile("random\\(int,([0-9]+),([0-9]+)\\)");
	
	protected List<Map<String, Object>> context = new ArrayList<Map<String, Object>>();
	
	public Context() {
		this.push("__ROOT__");
	}
	
	public void push(String id) {
		Map<String, Object> t = new HashMap<String, Object>();
		t.put("__ID__", id);
		context.add(t);
	}
	
	public void pop() {
		context.remove(context.size() - 1);
	}
	
	public void set(String key, Object value) {
		set(key, value, null);
	}
	
	public void set(String key, Object value, String ctxId) {
		if(ctxId == null) {
			context.get(context.size() - 1).put(key, value);
		} else {
			for(int i = 0; i < context.size(); i++) {
				Map<String, Object> t = context.get(i);
				if(ctxId.equals(t.get("__ID__"))) {
					t.put(key, value);
				}
			}
		}
	}
	
	public Map<String, Object> fetchContext(String ctxId) {
		for(int i = 0; i < context.size(); i++) {
			Map<String, Object> t = context.get(i);
			if(ctxId.equals(t.get("__ID__"))) {
				return t;
			}
		}
		return null;
	}
	
	public Object get(String key) {
		if("now()".equals(key)) {
			return System.currentTimeMillis()/60000L;
		} 
		
		Matcher m = null;
		if((m = RAND_TEXT_EXPR.matcher(key)).matches()) {
			long n = getRandomNumberInNormalDistribution(Long.parseLong(m.group(1)), Long.parseLong(m.group(2)), Double.parseDouble(m.group(3)), Double.parseDouble(m.group(4)), Double.parseDouble(m.group(5)));
			if (n != 0) {
				String ret = textGenerator.generateTextBlock((int) n);
				ret = ret.replaceAll("[^a-zA-Z\\s]", "_");
				return ret;
			}
			return "";
		} else if((m = RAND_INT_EXPR.matcher(key)).matches()) {
			return random.nextLong(Long.parseLong(m.group(1)), Long.parseLong(m.group(2)));
		}
		
		for(ListIterator<Map<String, Object>> iter = context.listIterator(context.size()); iter.hasPrevious(); ) {
			Map<String, Object> t = iter.previous();
			if(t.containsKey(key)) {
				return t.get(key);
			}
		}
		
		int idx = -1;
		int t = key.lastIndexOf("[");
		if(t != -1 && key.endsWith("]")) {
			try {
				idx = Integer.parseInt(key.substring(t + 1, key.length() - 1));
			} catch (NumberFormatException e) {
				idx = -1;
			}
		}
		if(idx >= 0) {
			key = key.substring(0, t);
			for(ListIterator<Map<String, Object>> iter = context.listIterator(context.size()); iter.hasPrevious(); ) {
				Map<String, Object> d = iter.previous();
				if(d.containsKey(key)) {
					Object o = d.get(key);
					if(o instanceof List) {
						List l = (List)o;
						if(l.size() > idx) {
							return l.get(idx);
						}
					}
					if(o instanceof String) {
						String[] l = ((String)o).split(",");
						if(l.length > idx) {
							return l[idx];
						}
					}
					break;
				}
			}
		}
		
		return null;
	}
	
	public Object expand(String s) {
		Object ret = null;
		if(s.startsWith("{") && s.endsWith("}")) {
			ret = this.get(s.substring(1, s.length() - 1));
		} 
		if(ret == null) {
			StringBuffer buf = new StringBuffer();
			int idx1 = 0, idx2 = s.indexOf("{");
			while(true) {
				if(idx2 == -1) {
					buf.append(s.substring(idx1));
					break;
				} else {
					buf.append(s.substring(idx1, idx2));
					
					idx1 = s.indexOf("}", idx2) + 1;
					String k = s.substring(idx2 + 1, idx1 - 1);
					Object o = this.get(k);
					if(o != null) {
						buf.append(o.toString());
					} else {
						buf.append("{").append(k).append("}");
					}
					
					if(idx1 >= s.length()) {
						break;
					} else {
						idx2 = s.indexOf("{", idx1);
					}
				}
			}
			ret = buf.toString();
		}
		if(ret.equals(s)) {
			return (String)ret;
		} else if(!(ret instanceof String)) {
			return ret;
		} else {
			return expand((String)ret);
		}
	}
	
	public Context clone() {
		Context o = new Context();
		o.context = new ArrayList<Map<String, Object>>(this.context);
		return o;
	}
	
	public String dump() {
		StringBuffer buf = new StringBuffer();
		
		buf.append("Execute Context: ").append("\r\n");
		
		for(Iterator<Map<String, Object>> iter = this.context.iterator(); iter.hasNext(); ) {
			Map<String, Object> m = iter.next();
			
			for(Iterator<String> ki = m.keySet().iterator(); ki.hasNext(); ) {
				String k = ki.next();
				Object o = m.get(k);
				buf.append("    ").append(k).append("=").append(o.toString()).append("\r\n");
			}
			
			buf.append("++++++++++++++++++++++");
		}
		
		return buf.toString();
	}
	
	private long getRandomNumberInNormalDistribution(long min, long max, double mean, double stddev, double pNotEmpty) {
		long p = 0;
		double pSummary = 0.47;
		if (pNotEmpty == 1.0 || random.nextUniform(0.0, 1.0) < pSummary) {
			do {
				p = Math.min(Math.round(random.nextGaussian(mean, stddev)), max);
			} while (p < min);
		}
		return p;
	}
	
	public static void main(String[] args) throws Exception {
		System.out.println(new Context().get("now()"));
		System.out.println(new Context().get("random(text,1,250,63.0,70.0,0.47)"));
		System.out.println(new Context().get("random(text,1,250,63.0,70.0,0.47)"));
		System.out.println(new Context().get("random(text,250,250,250.0,0.1,1.0)"));
		System.out.println(new Context().get("random(int,10,20)"));
		System.out.println(new Context().get("random(int,10,20)"));
	}
}
