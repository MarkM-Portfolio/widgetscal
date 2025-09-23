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

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.ibm.lconn.calendar.datapop.core.DataInput;
import com.ibm.lconn.calendar.datapop.utils.Utilities;

class FileData {
	List<String> keys = new ArrayList<String>();
	Map<String, List<String>> sections = new HashMap<String, List<String>>();
}

class PlainFileLoader {
	static FileData load(String file) throws IOException {
		BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
		try {
			FileData ret = new FileData();
			String s = null;
			while((s = reader.readLine()) != null) {
				ret.keys.add(s);
			}
			return ret;
		} finally {
			if(reader != null) {
				try {
					reader.close();
				} catch(IOException ex) {
				}
			}
		}
	}
}

class SectionFileLoader {
	static FileData load(String file) throws IOException {
		BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
		try {
			FileData ret = new FileData();
			
			String k = null;
			List<String> kl = null;
			
			String s = null;
			while((s = reader.readLine()) != null) {
				if(s.trim().length() == 0) {
					k = null;
					kl = null;
					continue;
				}
				
				if(k == null /* && kl == null */) {
					k = s;
					kl = new ArrayList<String>();
					ret.keys.add(k);
					ret.sections.put(k, kl);
				} else {
					kl.add(s);
				}
			}
			return ret;
		} finally {
			if(reader != null) {
				try {
					reader.close();
				} catch(IOException ex) {
				}
			}
		}
	}
}

class MembershipFileLoader {
	static FileData load(String file) throws IOException {
		BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
		try {
			FileData ret = new FileData();
			
			String s = null;
			while((s = reader.readLine()) != null) {
				String[] t = Utilities.split(s, ",");
				String k = t[0];
				ret.keys.add(k);
				
				for(int i = 1; i < t.length; i += 2) {
					String v = t[i];
					String x = k + "|" + t[i + 1];
					List<String> l = ret.sections.get(x);
					if(l == null) {
						l = new ArrayList<String>();
						ret.sections.put(x, l);
					}
					l.add(v);
				}
			}
			return ret;
		} finally {
			if(reader != null) {
				try {
					reader.close();
				} catch(IOException ex) {
				}
			}
		}
	}
}

public class FileInput implements DataInput {
	protected static Map<String, FileData> fileCache = new HashMap<String, FileData>();
	
	protected static synchronized void loadFile(String file, String type) throws IOException {
		if(fileCache.containsKey(file)) return;
		
		if("plain".equals(type)) {
			fileCache.put(file, PlainFileLoader.load(file));
		} else if("section".equals(type)) {
			fileCache.put(file, SectionFileLoader.load(file));
		} else if("membership".equals(type)) {
			fileCache.put(file, MembershipFileLoader.load(file));
		}
	}
	
	protected List data = new ArrayList();
	
	public FileInput(String file, String type, int offset, int length) throws IOException {
		if(!fileCache.containsKey(file)) loadFile(file, type);
		
		if(offset == -1) offset = 0;
		if(length == -1) length = Integer.MAX_VALUE;
		
		FileData fd = fileCache.get(file);
		data = new ArrayList(fd.keys.subList(offset, Math.min(fd.keys.size(), offset + length)));
	}
	
	public FileInput(String file, String type, List<String> sections) throws IOException {
		if(!fileCache.containsKey(file)) loadFile(file, type);
		
		FileData fd = fileCache.get(file);
		
		data = new ArrayList();
		for(Iterator<String> iter = sections.iterator(); iter.hasNext(); ) {
			String s = iter.next();
			if(fd.sections.containsKey(s)) {
				data.addAll(fd.sections.get(s));
			}
		}
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
