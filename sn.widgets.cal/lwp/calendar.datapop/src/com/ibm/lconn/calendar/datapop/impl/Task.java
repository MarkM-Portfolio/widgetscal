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
package com.ibm.lconn.calendar.datapop.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.math.random.RandomData;
import org.apache.commons.math.random.RandomDataImpl;

import com.ibm.lconn.calendar.datapop.core.Context;
import com.ibm.lconn.calendar.datapop.core.Executable;
import com.ibm.lconn.calendar.datapop.core.Expression;
import com.ibm.lconn.calendar.datapop.core.PopulationProgress;
import com.ibm.lconn.calendar.datapop.core.User;
import com.ibm.lconn.calendar.datapop.core.UserPool;
import com.ibm.lconn.calendar.datapop.utils.HttpClientEx;
import com.ibm.lconn.calendar.datapop.utils.HttpRequestTemplate;

public class Task implements Executable {
	protected static RandomData random = new RandomDataImpl();
	
	protected String id = null;
	protected HttpRequestTemplate template = null;
	protected String request = null;
	
	protected Expression login = null;
	protected Map<String, Expression> input = new HashMap<String, Expression>();
	
	protected String output = null;
	protected String scope = null;
	protected boolean once = false;
	
	// child task
	protected List<Executable> childs = new ArrayList<Executable>();
	
	// context variable, for child tasks
	protected List<Object[]> environments = new ArrayList<Object[]>();
	
	protected double probability = 1.0;
	
	protected String[] skipOnFail = null;
	protected String[] ignoreOnFail = null;
	
	protected boolean debug = false;
	
	public Task(String id, HttpRequestTemplate template, String request, String output) {
		this.id = id;
		this.template = template;
		this.request = request;
		this.output = output;
		
		if(this.id == null) {
			this.id = "";
		}
		
		if(this.output == null) {
			this.output = "";
		}
	}
	
	public void setLogin(Expression login) {
		this.login = login;
	}
	
	public void addInput(String key, Expression expr) {
		this.input.put(key, expr);
	}
	
	public void addChild(Executable child) {
		this.childs.add(child);
	}
	
	public void addEnvironmentVariable(String key, Expression expr, String contextId, String expand) {
		this.environments.add(new Object[]{key, expr, contextId, expand});
	}
	
	public void setProbability(double probability) {
		this.probability = probability;
	}
	
	public void setSkipOnFail(String skipOnFail) {
		this.skipOnFail = skipOnFail.split(",");
	}
	
	public void setIgnoreOnFail(String ignoreOnFail) {
		this.ignoreOnFail = ignoreOnFail.split(",");
	}
	
	public void setDebug(String debug) {
		this.debug = "true".equals(debug);
	}
	
	public void setScope(String scope) {
		this.scope = scope;
	}
	
	public void setOnce(String once) {
		this.once = "true".equals(once);
	}
	
	public boolean exec(Context ctx, int threads) {
		return exec(ctx);
	}
	
	public boolean exec(Context ctx) {
		if(this.probability != 1.0) {
			if(random.nextUniform(0.0, 1.0) > probability) {
				return false;
			}
		}
		
		if(this.once) {
			Map<String, Object> t = ctx.fetchContext(scope);
			for(String k : t.keySet()) {
				if(k.startsWith(output + ".")) {
					return true;
				}
			}
		}
		
		ctx.push(id);
		
		try {
			for(Iterator<Object[]> iter = environments.iterator(); iter.hasNext(); ) {
				Object[] o = iter.next();
				if("false".equals(o[3])) {
					ctx.set((String)o[0], ((ValueExpression)o[1]).getExpression(), (String)o[2]);
				} else {
					ctx.set((String)o[0], ((Expression)o[1]).evaluate(ctx), (String)o[2]);
				}
			}
		
			HttpClientEx client = null;
			if(login != null) {
				String usrId = (String)login.evaluate(ctx);
				User lu = UserPool.getInstance().getUserByID(usrId);
				if(lu == null) {
					System.out.println(ctx.dump());
					throw new DataPopulationException("User not found: " + usrId);
				}
				client = HttpClientEx.getHttpClient(lu.loginname, lu.password);
			} else {
				client = (HttpClientEx)ctx.get("__HTTPCLIENT__");
			}
			
			boolean bSkip = false;
			boolean bIgnoreFail = true;
			Map<String, Object> om = new HashMap<String, Object>();
			
			if(this.request != null) {
				Map<String, Object> im = new HashMap<String, Object>();
				for(Iterator<String> iter = input.keySet().iterator(); iter.hasNext(); ) {
					String k = iter.next();
					im.put(k, input.get(k).evaluate(ctx));
				}
				
				StringBuffer requestDumpBuffer = new StringBuffer();
				HttpMethod hm = template.execute(client, request, im, om, requestDumpBuffer);
				
				if(!om.containsKey("__STATUSCODE__") || debug) {
					// dump context
					System.out.println(ctx.dump());
					
					// dump input
					{
						StringBuffer buf = new StringBuffer();
						buf.append("Execute Input: ").append("\r\n");
						for(Iterator<String> iter = im.keySet().iterator(); iter.hasNext(); ) {
							String k = iter.next();
							Object v = im.get(k);
							buf.append("    ").append(k).append("=").append(v.toString()).append("\r\n");
						}
						buf.append("++++++++++++++++++++");
						System.out.println(buf.toString());
					}
					
					// dump request
					{
						StringBuffer buf = new StringBuffer();
						buf.append("Request Info: ").append("\r\n");
						buf.append(requestDumpBuffer.toString());
						buf.append("++++++++++++++++++++");
						System.out.println(buf.toString());
					}
					
					System.out.println("Response Status Code: " + hm.getStatusCode());
					
					String responseBodyAsString = hm.getResponseBodyAsString();
					if(responseBodyAsString == null) responseBodyAsString = "";
					System.out.println("Response Body: ");
					System.out.println(responseBodyAsString);
					
					System.out.println("++++++++++++++++++++");
						
					if(!om.containsKey("__STATUSCODE__")) {
						if(this.skipOnFail != null) {
							String statusCode = Integer.toString(hm.getStatusCode());
							for(int i = 0; i < this.skipOnFail.length; i++) {
								if(statusCode.equals(this.skipOnFail[i])) {
									bSkip = true;
								}
							}
						}
						
						bIgnoreFail = false;
						if(this.ignoreOnFail != null) {
							String statusCode = Integer.toString(hm.getStatusCode());
							for(int i = 0; i < this.ignoreOnFail.length; i++) {
								if(statusCode.equals(this.ignoreOnFail[i])) {
									bIgnoreFail = true;
								}
							}
						}
						
						if(hm.getStatusCode() == 401 || hm.getStatusCode() == 403) {
							System.out.println("Bad User: " + client.getLoginUser());
						}
						
						if(!bSkip && !bIgnoreFail) {
							throw new DataPopulationException(hm.getStatusCode() + ": " + hm.getStatusText() + "\r\n" + responseBodyAsString);
						}
					}
				}
				
			}
			
			// update progress status
			if(id != null && id.length() > 0) {
				PopulationProgress.updateProgress(id, 1);
			}
			
			if(!bSkip || bIgnoreFail) {
				// execute child tasks
				ctx.set("__LAST_OUTPUT_KEY__", output);
				for(Iterator<String> iter = om.keySet().iterator(); iter.hasNext(); ) {
					String k = iter.next();
					ctx.set(output + "." + k, om.get(k), scope);
				}
				
				ctx.set("__HTTPCLIENT__", client);
				
				for(Executable child : childs) {
					child.exec(ctx);
				}
			}
		} catch (DataPopulationException ex) {
			ex.printStackTrace();
		} catch (Exception ex) {
			System.out.println("Task failed: [id: " + id + ", request: " + request + "]");
			System.out.println(ctx.dump());
			ex.printStackTrace();
		} finally {
			ctx.pop();
		}
		
		return true;
	}
}