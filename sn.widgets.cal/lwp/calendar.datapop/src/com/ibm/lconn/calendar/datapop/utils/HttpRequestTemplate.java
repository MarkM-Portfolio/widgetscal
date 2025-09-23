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
package com.ibm.lconn.calendar.datapop.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.namespace.NamespaceContext;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.methods.DeleteMethod;
import org.apache.commons.httpclient.methods.EntityEnclosingMethod;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.PutMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class HttpRequestTemplate {
	public static Log log = LogFactory.getLog(HttpRequestTemplate.class);
	
	protected Map<String, _REQUEST> entries = new HashMap<String, _REQUEST>();
	
	protected Map<String, String> properties = new HashMap<String, String>();
	
	public HttpRequestTemplate() {}
	
	public void parse(InputStream input) throws ParserConfigurationException, SAXException, IOException, XPathExpressionException {
		DocumentBuilderFactory docFac = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = docFac.newDocumentBuilder();
		Document doc = builder.parse(input);
		
		XPathFactory factory = XPathFactory.newInstance();
		XPath xpath = factory.newXPath();
		
		NodeList nodes = (NodeList)xpath.evaluate("//request", doc, XPathConstants.NODESET);
		for(int i = 0; i < nodes.getLength(); i++) {
			Element node = (Element) nodes.item(i); 
			
			_REQUEST r = new _REQUEST();
			r.id = node.getAttribute("id");
			r.type = node.getAttribute("type");
			r.login = node.getAttribute("login");
			r.url = (String)xpath.evaluate(".//url/text()", node, XPathConstants.STRING);
			r.method = node.getAttribute("method");
			
			NodeList tl = null;
			
			// headers
			tl = (NodeList)xpath.evaluate(".//headers/header", node, XPathConstants.NODESET);
			for(int j = 0; j < tl.getLength(); j++) {
				Element t = (Element) tl.item(j);
				
				_HEADER h = new _HEADER();
				h.name = t.getAttribute("name");
				h.value = t.getAttribute("value");
				h.pattern = t.getAttribute("pattern");
				r.headers.add(h);
			}
			
			// parameters
			tl = (NodeList)xpath.evaluate(".//parameters/parameter", node, XPathConstants.NODESET);
			for(int j = 0; j < tl.getLength(); j++) {
				Element t = (Element) tl.item(j);
				
				_PARAMETER p = new _PARAMETER();
				p.name = t.getAttribute("name");
				p.pattern = t.getAttribute("pattern");
				
				if(t.hasAttribute("value")) {
					String v = t.getAttribute("value");
					if(t.hasAttribute("separator")) {
						p.value = Utilities.split(v, t.getAttribute("separator"));
					} else {
						p.value = new String[]{v};
					}
				}
				
				r.parameters.add(p);
			}
			
			// body
			{
				Element t = (Element)xpath.evaluate(".//body", node, XPathConstants.NODE);
				
				if(t != null) {
					_BODY b = new _BODY();
					b.text = (String)xpath.evaluate("text()", t, XPathConstants.STRING);
					r.body = b;
					
					r.contentType = t.getAttribute("contentType");
				}
			}
			
			// output
			{
				Element t = (Element)xpath.evaluate(".//outputs", node, XPathConstants.NODE);
			
				if(t != null) {
					if("xml".equals(t.getAttribute("type"))) {
						_XML_OUTPUT_PROCESSOR o = new _XML_OUTPUT_PROCESSOR();
						String[] sStatusCodes = t.getAttribute("statusCode").split(",");
						o.statusCode = new int[sStatusCodes.length];
						for(int k = 0; k < sStatusCodes.length; k++) {
							o.statusCode[k] = Integer.parseInt(sStatusCodes[k]);
						}
						tl = (NodeList)xpath.evaluate(".//outputs/output", node, XPathConstants.NODESET);
						for(int j = 0; j < tl.getLength(); j++) {
							Element t1 = (Element) tl.item(j);
							o.addOutput(t1.getAttribute("key"), t1.getAttribute("xpath"), t1.hasAttribute("multi") ? Boolean.parseBoolean(t1.getAttribute("multi")) : false);
						}
						
						r.outputProcessor = o;
					} else if("text".equals(t.getAttribute("type"))) {
						_TEXT_OUTPUT_PROCESSOR o = new _TEXT_OUTPUT_PROCESSOR();
						String[] sStatusCodes = t.getAttribute("statusCode").split(",");
						o.statusCode = new int[sStatusCodes.length];
						for(int k = 0; k < sStatusCodes.length; k++) {
							o.statusCode[k] = Integer.parseInt(sStatusCodes[k]);
						}
						tl = (NodeList)xpath.evaluate(".//outputs/output", node, XPathConstants.NODESET);
						for(int j = 0; j < tl.getLength(); j++) {
							Element t1 = (Element) tl.item(j);
							o.outputs.add(new String[]{t1.getAttribute("key"), t1.getAttribute("regex")});
						}
						
						r.outputProcessor = o;
					}
				}
			}
			
			this.entries.put(r.id, r);
		}
	}
	
	public String getURL(String id, String[] keys, Object[] values, StringBuffer dumpBuffer) {
		Map<String, Object> params = new HashMap<String, Object>();
		for(int i = 0; i < keys.length; i++) {
			params.put(keys[i], values[i]);
		}
		return getURL(id, params, dumpBuffer);
	}
	
	public String getURL(String id, Map<String, Object> params, StringBuffer dumpBuffer) {
		_REQUEST entry = entries.get(id);
		
		if(entry == null) return null;
		
		String url = entry.url;
		for(Iterator<String> iter = params.keySet().iterator(); iter.hasNext(); ) {
			String k = iter.next();
			url = url.replace("{" + k + "}", params.get(k).toString());
		}
		dumpBuffer.append("    ").append("request url (expanded with input param)").append("=").append(url).append("\r\n");
		
		String ret = null;
		if("GET".equalsIgnoreCase(entry.method)) {
			StringBuilder builder = new StringBuilder(url);
			String prepend = "?";
			for(_PARAMETER p : entry.parameters) {
				Object o = params.get(p.name);
				if(o == null)
					o = p.value;
				if(o != null) {
					if(o instanceof String[]) {
						String[] v = (String[])o;
						builder.append(prepend);
						for(int i = 0; i < v.length; i++) {
							builder.append(p.name).append("=").append(v[i]);
							prepend = "&";
						}
					} else {
						String v = o.toString();
						builder.append(prepend);
						builder.append(p.name).append("=").append(v);
						prepend = "&";
					}
				}
			}
			ret = builder.toString();
		} else {
			ret = url;
		}
		
		dumpBuffer.append("    ").append("request url (request parameter appended)").append("=").append(ret).append("\r\n");
		
		ret = expandProperties(ret);
		dumpBuffer.append("    ").append("request url").append("=").append(ret).append("\r\n");
		
		return ret;
	}
	
	public HttpMethod execute(HttpClient client, String id, Map<String, Object> input, Map<String, Object> output, StringBuffer dumpBuffer) throws HttpException, IOException {
		HttpMethod m = null;
		
		dumpBuffer.append("    ").append("request id").append("=").append(id).append("\r\n");
		
		_REQUEST entry = entries.get(id);
		dumpBuffer.append("    ").append("request method").append("=").append(entry.method).append("\r\n");
		dumpBuffer.append("    ").append("request url (template)").append("=").append(entry.url).append("\r\n");
		
		if("GET".equalsIgnoreCase(entry.method)) {
			m = new GetMethod(getURL(id, input, dumpBuffer));
		} else if("POST".equalsIgnoreCase(entry.method)) {
			m = new PostMethod(getURL(id, input, dumpBuffer));
		} else if("PUT".equalsIgnoreCase(entry.method)) {
			m = new PutMethod(getURL(id, input, dumpBuffer));
		} else if("DELETE".equalsIgnoreCase(entry.method)) {
			m = new DeleteMethod(getURL(id, input, dumpBuffer));
		}
		
		// request header
		for(_HEADER h : entry.headers) {
			String v = (String)input.get(h.name);
			if(v == null) v = h.value;
			if(v != null) {
				String headerName = h.name, headerValue = expandProperties(v);
				m.addRequestHeader(headerName, headerValue);
				dumpBuffer.append("    ").append("request header").append("=").append(headerName).append(",").append(headerValue).append("\r\n");
			}
		}
		
		// request body
		StringBuilder builder = new StringBuilder();
		if(entry.body != null) {
			builder.append(entry.body.render(input));
		} else {
			String prepend = "";
			for(_PARAMETER p : entry.parameters) {
				Object o = input.get(p.name);
				if(o == null)
					o = p.value;
				if(o != null) {
					if(o instanceof String[]) {
						String[] v = (String[])o;
						builder.append(prepend);
						for(int i = 0; i < v.length; i++) {
							builder.append(p.name).append("=").append(v[i]);
							prepend = "&";
						}
					} else {
						String v = o.toString();
						builder.append(prepend);
						builder.append(p.name).append("=").append(v);
						prepend = "&";
					}
				}
			}
		}
		String body = builder.toString();
		dumpBuffer.append("    ").append("request body (template)").append("=").append("\r\n").append(body).append("\r\n");
		
		body = expandProperties(builder.toString()).trim();
		dumpBuffer.append("    ").append("request body").append("=").append("\r\n").append(body).append("\r\n");
		
		if(m instanceof EntityEnclosingMethod) {
			((EntityEnclosingMethod)m).setRequestEntity(new StringRequestEntity(body, entry.contentType, "utf-8"));
		}
		
		// handle log, if needed
		if(!"api".equals(entry.type) && !"login".equals(entry.type)) {
			Map<String, Object> loginInput = new HashMap<String, Object>();
			loginInput.put("j_username", ((HttpClientEx)client).getLoginUser());
			loginInput.put("j_password", ((HttpClientEx)client).getLoginPassword());
			
			execute(client, entry.login, loginInput, null, new StringBuffer());
		}
		
		// execute request
		int statusCode = client.executeMethod(m);
		
		// parse outputs
		if(output != null && entry.outputProcessor != null) {
			InputStream in = m.getResponseBodyAsStream();
			output.putAll(entry.outputProcessor.process(statusCode, in, input));
		}
		
		return m;
	}
	
	public void setProperty(String name, String value) {
		properties.put(name, value);
	}
	
	public void setProperties(Properties props) {
		for(Iterator iter = props.keySet().iterator(); iter.hasNext(); ) {
			String name = (String)iter.next();
			String value = props.getProperty(name);
			setProperty(name, value);
		}
	}
	
	public void removeProperty(String name) {
		properties.remove(name);
	}
	
	public void clearProperties() {
		properties.clear();
	}
	
	protected String expandProperties(String s) {
		for(String key : properties.keySet()) {
			s = s.replace("{" + key + "}", properties.get(key));
		}
		return s;
	}
	
	// node structure
	
	class _HEADER {
		String name = null;
		String value = null;
		String pattern = null;
	}

	class _PARAMETER {
		String name = null;
		String[] value = null;
		String pattern = null;
	}

	class _BODY {
		String text = null;
		
		String render(Map<String, Object> input) {
			StringBuffer buf = new StringBuffer();
			
			StringBuffer t = new StringBuffer(text);
			while(t.length() > 0) {
				int idx1 = t.indexOf("#(if");
				int idx2 = t.indexOf("#(foreach");
				
				int idx = idx1 == -1 ? idx2 : (idx2 == -1 ? idx1 : Math.min(idx1, idx2));
				if(idx == -1) {
					buf.append(_expand(t.toString(), input));
					t.delete(0, t.length());
					continue;
				}
				
				buf.append(_expand(t.substring(0, idx), input));
				t.delete(0, idx);
				
				// handle expression
				
				int idx3 = t.indexOf("#(end)");
				int idx4 = t.indexOf(" ");
				int idx5 = t.indexOf(")");
				
				String expr = t.substring(idx4 + 1, idx5);
				String text = t.substring(idx5 + 1, idx3);
				t.delete(0, idx3 + 6);
				if(idx1 == idx) {
					buf.append(_if(text, expr, input));
				} else {
					String delimit = "";
					int tidx = expr.indexOf(" ");
					if(tidx != -1) {
						String t1 = expr;
						expr = t1.substring(0, tidx);
						delimit = t1.substring(tidx + 2, t1.length() - 1);
					}
					buf.append(_foreach(text, expr, delimit, input));
				}
			}
			
			return buf.toString().trim();
		}
		
		protected String _if(String text, String expr, Map<String, Object> input) {
			if(input.containsKey(expr)) {
				return _expand(text, input);
			}
			return "";
		}
		
		@SuppressWarnings("unchecked")
		protected String _foreach(String text, String expr, String delimit, Map<String, Object> input) {
			StringBuffer buf = new StringBuffer();
			if(input.containsKey(expr)) {
				Object o = input.get(expr);
				List<String> l = null;
				if(o instanceof List) {
					l = (List<String>)o;
				} else {
					l = Arrays.asList(new String[]{(String)o});
				}
				boolean bFirst = true;
				for(Iterator<String> iter = l.iterator(); iter.hasNext(); ) {
					if(!bFirst) {
						buf.append(delimit);
					}
					
					input.put(expr + "[]", iter.next());
					buf.append(_expand(text, input));
					bFirst = false;
				}
			}
			return buf.toString();
		}
		
		protected String _expand(String s, Map<String, Object> input) {
			for(String key : input.keySet()) {
				s = s.replace("{" + key + "}", input.get(key).toString());
			}
			return s;
		}
	}
	
	interface _OUTPUT_PROCESSOR {
		Map<String, Object> process(int statusCode, InputStream in, Map<String, Object> input) throws IOException;
	}
	
	class _TEXT_OUTPUT_PROCESSOR implements _OUTPUT_PROCESSOR {
		int[] statusCode = null; // expected status code
		List<String[]> outputs = new ArrayList<String[]>();
		
		public Map<String, Object> process(int statusCode, InputStream in, Map<String, Object> input) throws IOException {
			Map<String, Object> ret = new HashMap<String, Object>();
			
			boolean succ = false;
			for(int i = 0; i < this.statusCode.length; i++) {
				if(statusCode == this.statusCode[i]) {
					succ = true;
					break;
				}
			}
			if(!succ) {
				return ret;
			}
			ret.put("__STATUSCODE__", Integer.toString(statusCode));
			
			// process response body
			if(outputs.size() > 0) {
				ByteArrayOutputStream outstream = new ByteArrayOutputStream(4096);
				byte[] buffer = new byte[4096];
				int len;
				while ((len = in.read(buffer)) > 0){
					outstream.write(buffer, 0, len);
				}
				outstream.close();
				
				String responseText = new String(outstream.toByteArray(), "utf-8");
				
				for(Iterator<String[]> iter = outputs.iterator(); iter.hasNext(); ) {
					String[] o = iter.next();
					
					Matcher m = Pattern.compile(o[1]).matcher(responseText);
					if(m.matches()) {
						ret.put(o[0], m.group(1));
					}
				}
			}
			
			return ret;
		}
	}
	
	class _XML_OUTPUT_PROCESSOR implements _OUTPUT_PROCESSOR {
		int[] statusCode = null; // expected status code
		
		class _OUTPUT_STRUCT {
			String key = null;
			String xpath = null;
			boolean multi = false;
		}
		List<_OUTPUT_STRUCT> outputs = new ArrayList<_OUTPUT_STRUCT>();
		
		public void addOutput(String key, String xpath, boolean multi) {
			_OUTPUT_STRUCT t = new _OUTPUT_STRUCT();
			t.key = key;
			t.xpath = xpath;
			t.multi = multi;
			outputs.add(t);
		}
		
		public Map<String, Object> process(int statusCode, InputStream in, Map<String, Object> input) throws IOException {
			Map<String, Object> ret = new HashMap<String, Object>();
			
			boolean succ = false;
			for(int i = 0; i < this.statusCode.length; i++) {
				if(statusCode == this.statusCode[i]) {
					succ = true;
					break;
				}
			}
			if(!succ) {
				return ret;
			}
			
			ret.put("__STATUSCODE__", Integer.toString(statusCode));
			
			if(outputs.size() > 0) {
				try {
					DocumentBuilderFactory docFac = DocumentBuilderFactory.newInstance();
					docFac.setNamespaceAware(true);
					DocumentBuilder builder = docFac.newDocumentBuilder();
					Document doc = builder.parse(new InputSource(new InputStreamReader(in, "utf-8")));
					
					NamespaceContext ctx = new NamespaceContext() {
		                public String getNamespaceURI(String prefix) {
		                    String uri = null;
		                    if (prefix.equals("atom"))
		                        uri = "http://www.w3.org/2005/Atom";
		                    else if (prefix.equals("snx"))
		                        uri = "http://www.ibm.com/xmlns/prod/sn";
		                    else
		                        uri = null;
		                    return uri;
		                }
		                // Dummy implementation - not used!
						public Iterator getPrefixes(String val) {
		                    return null;
		                }
		                // Dummy implemenation - not used!
		                public String getPrefix(String uri) {
		                    return null;
		                }
		            };
	
					
					XPathFactory factory = XPathFactory.newInstance();
					XPath xpath = factory.newXPath();
					xpath.setNamespaceContext(ctx);
					
					for(Iterator<_OUTPUT_STRUCT> iter = outputs.iterator(); iter.hasNext(); ) {
						_OUTPUT_STRUCT o = iter.next();
						String xpathExpr = _expand(o.xpath, input);
						if(!o.multi) {
							ret.put(o.key, (String)xpath.evaluate(xpathExpr, doc, XPathConstants.STRING));
						} else {
							List<String> l = new ArrayList<String>();
							NodeList nodes = (NodeList)xpath.evaluate(xpathExpr, doc, XPathConstants.NODESET);
						    for (int i = 0; i < nodes.getLength(); i++) {
						    	l.add(nodes.item(i).getNodeValue());
						    }
						    ret.put(o.key, l);
						}
					}
				} catch (Exception ex) {
					throw new ResponseParsingException(ex);
				} 
			}
			
			return ret;
		}
		
		protected String _expand(String s, Map<String, Object> input) {
			for(String key : input.keySet()) {
				s = s.replace("{" + key + "}", input.get(key).toString());
			}
			return s;
		}
	}

	class _REQUEST {
		String id = null;
		String type = null;
		String login = null;
		
		String url = null;
		String method = null;
		
		List<_HEADER> headers = new ArrayList<_HEADER>();
		List<_PARAMETER> parameters = new ArrayList<_PARAMETER>();
		_BODY body = null;
		
		String contentType = null;
		
		_OUTPUT_PROCESSOR outputProcessor = null;
	}
	
	public static void main(String[] args) throws Exception {
		HttpClientEx client = HttpClientEx.getHttpClient("amy jones1", "jones1");
		
		HttpRequestTemplate tlp = new HttpRequestTemplate();
		tlp.parse(HttpRequestTemplate.class.getResourceAsStream("/com/ibm/lconn/calendar/datapop/utils/request.template.xml"));
		
		tlp.setProperty("communitiesServiceUrl", "https://connwin4.dyn.webahead.ibm.com:9446/communities");
		
		Map<String, Object> input = new HashMap<String, Object>();
		input.put("communityUuid", "2b367829-39a1-4ca2-b272-60671b1f40c0");
		Map<String, Object> output = new HashMap<String, Object>();
		tlp.execute(client, "community.events.widget.add", input, output, new StringBuffer());
		System.out.println(output.get("__STATUSCODE__"));
	}
}
