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
package com.ibm.lconn.calendar.datapop;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import mpm.textgen.TextGenerator;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;

import com.ibm.lconn.calendar.datapop.core.Context;
import com.ibm.lconn.calendar.datapop.core.Executable;
import com.ibm.lconn.calendar.datapop.core.Expression;
import com.ibm.lconn.calendar.datapop.core.Formatter;
import com.ibm.lconn.calendar.datapop.core.PopulationProgress;
import com.ibm.lconn.calendar.datapop.core.UserPool;
import com.ibm.lconn.calendar.datapop.impl.Choose;
import com.ibm.lconn.calendar.datapop.impl.DataPopulationException;
import com.ibm.lconn.calendar.datapop.impl.Foreach;
import com.ibm.lconn.calendar.datapop.impl.InputSelectionExpression;
import com.ibm.lconn.calendar.datapop.impl.Iso8601DateFormatter;
import com.ibm.lconn.calendar.datapop.impl.Repeat;
import com.ibm.lconn.calendar.datapop.impl.Task;
import com.ibm.lconn.calendar.datapop.impl.ValueExpression;
import com.ibm.lconn.calendar.datapop.utils.HttpRequestTemplate;

public class PopulationEngine {	
	static {
		// register formatters
		new Iso8601DateFormatter();
	}
	
	public static void main(String[] args) throws Exception {
		// parse program parameters
		int threads = 1;
		String file = null;
		for(int i = 0; i < args.length; i++) {
			String arg = args[i];
			if(arg.startsWith("--thread=")) {
				threads = Integer.parseInt(arg.substring(9));
				if(threads <= 0) threads = 1;
			}
			if(arg.startsWith("--file=")) {
				file = arg.substring(7);
			}
		}
		
		// do population
		
		System.out.println("load user data...");
		loadUserPool();
		
		System.out.println("load request template...");
		HttpRequestTemplate httpRequestTemplate = loadHttpRequestTemplate();
		
		System.out.println("load population definition...");
		Executable runner = loadPopulationDefinition(file, httpRequestTemplate);
		
		Context ctx = new Context();
		ctx.set("__HTTPREQUESTTEMPLATE__", httpRequestTemplate);
		
		System.out.println("start data population...");
		runner.exec(ctx, threads);
		
		System.out.println("data population completed...");
		PopulationProgress.print();
	}
	
	protected static HttpRequestTemplate loadHttpRequestTemplate() throws Exception {
		HttpRequestTemplate ret = new HttpRequestTemplate();
		ret.parse(PopulationEngine.class.getResourceAsStream("/com/ibm/lconn/calendar/datapop/utils/request.template.xml"));
		
		Properties props = new Properties();
		props.load(PopulationEngine.class.getResourceAsStream("/request.template.properties"));
		ret.setProperties(props);
		
		return ret;
	}
	
	protected static Executable loadPopulationDefinition(String file, HttpRequestTemplate httpRequestTemplate) throws Exception {
		Properties prop = new Properties();
		prop.load(new FileInputStream(file.substring(0, file.length() - 4) + ".properties"));
		
		initTagPool(prop.getProperty("tagpool"), Integer.parseInt(prop.getProperty("tagpool.size")));
		
		SAXBuilder builder = new SAXBuilder();
		Document doc = builder.build(new File(file));
		return PopulationDefinitionParser.parsePopulationDefinition(doc.getRootElement(), prop, httpRequestTemplate);
	}
	
	protected static UserPool loadUserPool() throws Exception {
		UserPool ret = new UserPool();
		ret.load(PopulationEngine.class.getResourceAsStream("/user.properties"));
		return ret;
	}
	
	protected static void initTagPool(String file, int size) throws Exception {
		File f = new File(file);
		if(f.exists() && f.length() > 0) {
			// if tag pool file already exists, skip the step
			System.out.println("Tag pool already exists!");
			return;
		}
		
		// generate tags
		List<String> tagList = new ArrayList<String>(size);
		TextGenerator textGenerator = new TextGenerator();
		for (int i = 0; i < size; i++) {
			String tagWord = textGenerator.generateWord();
			while ((tagWord.indexOf(',') != -1) || (tagList.indexOf(tagWord) != -1)) {
				tagWord = textGenerator.generateWord();
			}
			tagList.add(tagWord);
		}
		
		// write to file
		f = new File(file);
		if(!f.exists()) {
			f.createNewFile();
		}
		
		if(f.exists()) {
			FileOutputStream fout = new FileOutputStream(f);
			try {
				BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(fout, "utf-8"));
				for(Iterator<String> iter = tagList.iterator(); iter.hasNext(); ) {
					String tag = iter.next();
					writer.write(tag);
					if(iter.hasNext()) {
						writer.newLine();
					}
				}
				writer.flush();
				fout.flush();
			} finally {
				try {
					fout.close();
				} catch (Exception ex) {
				}
			}
		} else {
			throw new DataPopulationException("Fail to initialize the tag pool!");
		}
	}
}

class PopulationDefinitionParser {
	private static String expand(String s, Properties prop) {
		if(s == null) return null;
		
		for(Iterator iter = prop.keySet().iterator(); iter.hasNext(); ) {
			String k = (String)iter.next();
			String v = prop.getProperty(k);
			s = s.replace("${" + k + "}", v);
		}
		return s;
	}
	
	private static Expression parseValueExpression(Element elem, Properties props) {
		Formatter formatter = null;
		String type = expand(elem.getAttributeValue("type"), props);
		if(type != null) {
			formatter = Formatter.find(type);
		}
		
		if(elem.getAttributeValue("value") != null) {
			return new ValueExpression(expand(elem.getAttributeValue("value"), props), formatter);
		} else {
			return new InputSelectionExpression(expand(elem.getAttributeValue("input"), props), expand(elem.getAttributeValue("selector"), props), formatter);
		}
	}
	
	static Executable parsePopulationDefinition(Element elem, Properties props, HttpRequestTemplate httpRequestTemplate) throws Exception {
		if(elem.getName().equals("foreach")) {
			Foreach ret = new Foreach(expand(elem.getAttributeValue("id"), props), expand(elem.getAttributeValue("input"), props), expand(elem.getAttributeValue("selector"), props), expand(elem.getAttributeValue("var"), props));
			if(elem.getAttributeValue("probability") != null) {
				ret.setProbability(Double.parseDouble(expand(elem.getAttributeValue("probability"), props)));
			} else if(elem.getAttributeValue("id") != null) {
				String t = props.getProperty(elem.getAttributeValue("id") + ".percentage");
				if(t != null) {
					ret.setProbability(Double.parseDouble(t));
				}
			}
			List l = elem.getChildren();
			for(Iterator iter = l.iterator(); iter.hasNext(); ) {
				Element t = (Element)iter.next();
				if(t.getName().equals("log")) {
					ret.setLog(expand(t.getAttributeValue("file"), props));
				} else if(t.getName().equals("context")) {
					ret.addEnvironmentVariable(expand(t.getAttributeValue("name"), props), parseValueExpression(t, props), expand(t.getAttributeValue("scope"), props), t.getAttributeValue("expand"));
				} else if(t.getName().equals("choose") || t.getName().equals("foreach") || t.getName().equals("task") || t.getName().equals("repeat")) {
					ret.addChild(parsePopulationDefinition(t, props, httpRequestTemplate));
				}
			}
			return ret;
		} 
		
		if(elem.getName().equals("repeat")) {
			Repeat ret = new Repeat(expand(elem.getAttributeValue("id"), props), expand(elem.getAttributeValue("input"), props), expand(elem.getAttributeValue("selector"), props));
			if(elem.getAttributeValue("probability") != null) {
				ret.setProbability(Double.parseDouble(expand(elem.getAttributeValue("probability"), props)));
			} else if(elem.getAttributeValue("id") != null) {
				String t = props.getProperty(elem.getAttributeValue("id") + ".percentage");
				if(t != null) {
					ret.setProbability(Double.parseDouble(t));
				}
			}
			List l = elem.getChildren();
			for(Iterator iter = l.iterator(); iter.hasNext(); ) {
				Element t = (Element)iter.next();
				if(t.getName().equals("log")) {
					ret.setLog(expand(t.getAttributeValue("file"), props));
				} else if(t.getName().equals("context")) {
					ret.addEnvironmentVariable(expand(t.getAttributeValue("name"), props), parseValueExpression(t, props), expand(t.getAttributeValue("scope"), props), t.getAttributeValue("expand"));
				} else if(t.getName().equals("choose") || t.getName().equals("foreach") || t.getName().equals("task") || t.getName().equals("repeat")) {
					ret.addChild(parsePopulationDefinition(t, props, httpRequestTemplate));
				}
			}
			return ret;
		} 
		
		if(elem.getName().equals("task")) {
			Task ret = new Task(expand(elem.getAttributeValue("id"), props), httpRequestTemplate, expand(elem.getAttributeValue("request"), props), expand(elem.getAttributeValue("output"), props));
			if(elem.getAttributeValue("probability") != null) {
				ret.setProbability(Double.parseDouble(expand(elem.getAttributeValue("probability"), props)));
			} else if(elem.getAttributeValue("id") != null) {
				String t = props.getProperty(elem.getAttributeValue("id") + ".percentage");
				if(t != null) {
					ret.setProbability(Double.parseDouble(t));
				}
			}
			if(elem.getAttributeValue("skipOnFail") != null) {
				ret.setSkipOnFail(expand(elem.getAttributeValue("skipOnFail"), props));
			}
			if(elem.getAttributeValue("ignoreOnFail") != null) {
				ret.setIgnoreOnFail(expand(elem.getAttributeValue("ignoreOnFail"), props));
			}
			if(elem.getAttributeValue("debug") != null) {
				ret.setDebug(elem.getAttributeValue("debug"));
			}
			if(elem.getAttributeValue("once") != null) {
				ret.setOnce(elem.getAttributeValue("once"));
			}
			if(elem.getAttributeValue("scope") != null) {
				ret.setScope(elem.getAttributeValue("scope"));
			}
			List l = elem.getChildren();
			for(Iterator iter = l.iterator(); iter.hasNext(); ) {
				Element t = (Element)iter.next();
				if(t.getName().equals("login")) {
					ret.setLogin(parseValueExpression(t, props));
				} else if(t.getName().equals("context")) {
					ret.addEnvironmentVariable(expand(t.getAttributeValue("name"), props), parseValueExpression(t, props), expand(t.getAttributeValue("scope"), props), t.getAttributeValue("expand"));
				} else if(t.getName().equals("input")) {
					ret.addInput(expand(t.getAttributeValue("name"), props), parseValueExpression(t, props));
				} else if(t.getName().equals("choose") || t.getName().equals("foreach") || t.getName().equals("task") || t.getName().equals("repeat")) {
					ret.addChild(parsePopulationDefinition(t, props, httpRequestTemplate));
				}
			}
			return ret;
		}
		
		if(elem.getName().equals("choose")) {
			Choose ret = new Choose(expand(elem.getAttributeValue("id"), props));
			if(elem.getAttributeValue("probability") != null) {
				ret.setProbability(Double.parseDouble(expand(elem.getAttributeValue("probability"), props)));
			} else if(elem.getAttributeValue("id") != null) {
				String t = props.getProperty(elem.getAttributeValue("id") + ".percentage");
				if(t != null) {
					ret.setProbability(Double.parseDouble(t));
				}
			}
			List l = elem.getChildren();
			for(Iterator iter = l.iterator(); iter.hasNext(); ) {
				Element t = (Element)iter.next();
				if(t.getName().equals("context")) {
					ret.addEnvironmentVariable(expand(t.getAttributeValue("name"), props), parseValueExpression(t, props), expand(t.getAttributeValue("scope"), props), t.getAttributeValue("expand"));
				} else if(t.getName().equals("choose") || t.getName().equals("foreach") || t.getName().equals("task") || t.getName().equals("repeat")) {
					ret.addChild(parsePopulationDefinition(t, props, httpRequestTemplate));
				}
			}
			return ret;
		}
		
		return null;
	} 
}
