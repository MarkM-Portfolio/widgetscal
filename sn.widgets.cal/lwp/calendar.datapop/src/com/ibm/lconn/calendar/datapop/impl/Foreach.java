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

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.math.random.RandomData;
import org.apache.commons.math.random.RandomDataImpl;

import com.ibm.lconn.calendar.datapop.core.Context;
import com.ibm.lconn.calendar.datapop.core.DataInput;
import com.ibm.lconn.calendar.datapop.core.Executable;
import com.ibm.lconn.calendar.datapop.core.Expression;
import com.ibm.lconn.calendar.datapop.core.Selector;

public class Foreach implements Executable {
	protected static RandomData random = new RandomDataImpl();
	
	protected String id = null;
	
	protected DataInputExpression inputExpr = null;
	protected SelectorExpression  selectorExpr = null;
	
	protected String var = null;
	protected String log = null;
	
	protected List<Executable> childs = new ArrayList<Executable>();
	
	// context variable, for child tasks
	protected List<Object[]> environments = new ArrayList<Object[]>();
	
	protected double probability = 1.0;
	
	public Foreach(String id, String inputExpr, String selectorExpr, String var) {
		this.id = id;
		this.var = var;
		
		if(this.id == null) {
			this.id = "";
		}
		
		this.inputExpr = new DataInputExpression(inputExpr);
		if(selectorExpr != null)
			this.selectorExpr = new SelectorExpression(selectorExpr);
	}
	
	public void addChild(Executable child) {
		this.childs.add(child);
	}
	
	public void addEnvironmentVariable(String key, Expression expr, String contextId, String expand) {
		this.environments.add(new Object[]{key, expr, contextId, expand});
	}
	
	public void setLog(String log) {
		this.log = log;
	}
	
	public void setProbability(double probability) {
		this.probability = probability;
	}
	
	public boolean exec(final Context ctx, int threads) {
		if(this.probability != 1.0) {
			if(random.nextUniform(0.0, 1.0) > probability) {
				return false;
			}
		}
		
		final DataInput input = inputExpr.evaluate(ctx);
		final Selector  selector = selectorExpr != null ? selectorExpr.evaluate(ctx) : null;
		
		List<DataInput> inputs = input.split(threads);
		
		List<Thread> threadList = new ArrayList<Thread>();
		
		long globalOffset = 0;
		for(int i = 0; i < inputs.size(); i++) {
			final DataInput curInput = inputs.get(i);
			final long curOffset 	 = globalOffset;
			
			Runnable runnable = new Runnable(){
				public void run() {
					PrintWriter logger = null;
					if(log != null) {
						try {
							logger = new PrintWriter(new FileWriter(log + "." + curOffset + ".log", true));
						} catch (IOException e) {
							logger = null;
						}
					}
					
					try {
						Context _ctx = ctx.clone();
						DataInput _input = curInput;
						long _idx = curOffset;
						
						Iterator iter = _input.iterator();
						while(iter.hasNext()) {
							Object o = iter.next();
							try {
								if(selector == null || selector.select(input, _idx)) {
									// log
									if(logger != null) {
										logger.println(id + ": starting - " + o.toString());
										logger.flush();
									}
									
									_ctx.push(id);
									
									try {
										for(Iterator<Object[]> it = environments.iterator(); it.hasNext(); ) {
											Object[] t = it.next();
											if("false".equals(t[3])) {
												ctx.set((String)t[0], ((ValueExpression)t[1]).getExpression(), (String)t[2]);
											} else {
												ctx.set((String)t[0], ((Expression)t[1]).evaluate(ctx), (String)t[2]);
											}
										}
										
										_ctx.set("__INDEX__", _idx);
										if(var != null) _ctx.set(var, o);
									
										for(Executable child : childs) {
											child.exec(_ctx);
										}
									} finally {
										_ctx.pop();
									}
									
									// log
									if(logger != null) {
										logger.println(id + ": completed - " + o.toString());
										logger.flush();
									}
								}
							} catch(Exception ex) {
								System.out.println("'Foreach' failed: [id: " + id + "] - " + o.toString());
								System.out.println(ctx.dump());
								ex.printStackTrace();
							}
							_idx++;
						}
					} catch(Exception ex) {
						System.out.println("'Foreach' failed: [id: " + id + "]");
						System.out.println(ctx.dump());
						ex.printStackTrace();
					} finally {
						if(logger != null) {
							logger.flush();
							logger.close();
						}
					}
				}
			};
			
			if(threads == 1) {
				runnable.run();
			} else {
				Thread thread = new Thread(runnable);
				threadList.add(thread);
				thread.start();
			}
			
			globalOffset = globalOffset + curInput.size();
		}
		
		for(Iterator<Thread> iter = threadList.iterator(); iter.hasNext(); ) {
			try {
				iter.next().join();
			} catch (InterruptedException e) {
			}
		}
		
		return true;
	}
	
	public boolean exec(Context ctx) {
		return exec(ctx, 1);
	}
}
