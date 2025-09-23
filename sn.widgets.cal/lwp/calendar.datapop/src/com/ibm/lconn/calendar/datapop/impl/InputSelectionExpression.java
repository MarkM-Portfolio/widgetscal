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

public class InputSelectionExpression implements Expression {
	protected DataInputExpression inputExpr = null;
	protected SelectorExpression selectorExpr = null;
	protected Formatter formatter = null;
	
	public InputSelectionExpression(String inputExpr, String selectorExpr, Formatter formatter) {
		this.inputExpr = new DataInputExpression(inputExpr);
		if(selectorExpr != null)
			this.selectorExpr = new SelectorExpression(selectorExpr);
		this.formatter = formatter;
	}

	public Object evaluate(Context ctx) {
		Object ret = null;
		
		if(this.selectorExpr == null) {
			ret = this.inputExpr.evaluate(ctx).list();
		} else {
			ret = this.selectorExpr.evaluate(ctx).select(this.inputExpr.evaluate(ctx));
		}
		
		if(this.formatter != null) {
			return this.formatter.format(ret);
		}
		return ret;
	}
}
