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

import com.ibm.lconn.calendar.datapop.core.Context;
import com.ibm.lconn.calendar.datapop.core.Expression;
import com.ibm.lconn.calendar.datapop.core.Formatter;

public class ValueExpression implements Expression {
	protected String expr = null;
	protected Formatter formatter = null;
	
	public ValueExpression(String expr, Formatter formatter) {
		this.expr = expr;
		this.formatter = formatter;
	}
	
	public String getExpression() {
		return expr;
	}
	
	public Object evaluate(Context ctx) {
		Object ret = ctx.expand(this.expr);
		
		if(this.formatter != null) {
			return this.formatter.format(ret);
		}
		return ret;
	}
}
