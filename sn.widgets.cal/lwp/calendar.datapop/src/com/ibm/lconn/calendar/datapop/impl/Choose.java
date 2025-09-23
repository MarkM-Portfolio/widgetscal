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
import java.util.Iterator;
import java.util.List;

import org.apache.commons.math.random.RandomData;
import org.apache.commons.math.random.RandomDataImpl;

import com.ibm.lconn.calendar.datapop.core.Context;
import com.ibm.lconn.calendar.datapop.core.Executable;
import com.ibm.lconn.calendar.datapop.core.Expression;
import com.ibm.lconn.calendar.datapop.core.PopulationProgress;

public class Choose implements Executable {
	protected static RandomData random = new RandomDataImpl();
	
	protected List<Executable> childs = new ArrayList<Executable>();
	
	// context variable, for child tasks
	protected List<Object[]> environments = new ArrayList<Object[]>();
	
	protected String id = null;
	
	protected double probability = 1.0;
	
	public Choose(String id) {
		this.id = id;
		
		if(this.id == null) {
			this.id = "";
		}
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
	
	public boolean exec(Context ctx, int threads) {
		return exec(ctx);
	}
	
	public boolean exec(Context ctx) {
		if(this.probability != 1.0) {
			if(random.nextUniform(0.0, 1.0) > probability) {
				return false;
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
			
			// update progress status
			if(id != null && id.length() > 0) {
				PopulationProgress.updateProgress(id, 1);
			}
			
			for(Executable child : childs) {
				if(child.exec(ctx)) {
					return true;
				}
			}
		} catch (DataPopulationException ex) {
			ex.printStackTrace();
		} catch (Exception ex) {
			System.out.println("Choose failed: [id: " + id + "]");
			System.out.println(ctx.dump());
			ex.printStackTrace();
		} finally {
			ctx.pop();
		}
		
		return true;
	}
}
