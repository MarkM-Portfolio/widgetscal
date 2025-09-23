/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2011                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.atom;

import org.apache.abdera.Abdera;
import org.apache.abdera.factory.Factory;
import org.apache.abdera.parser.Parser;

public final class AtomFactory {

	private static final Factory factory;
	private static final Parser parser;
	
	static {
		factory = Abdera.getNewFactory();
		parser = Abdera.getNewParser();
	}
	
	public static Factory getFactory() {
		return factory;
	}
	
	public static Parser getParser() {
		return parser;
	}
	
}
