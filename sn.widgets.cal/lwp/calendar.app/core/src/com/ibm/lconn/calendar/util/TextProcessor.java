/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.util;

import com.ibm.lconn.core.web.util.HtmlPlainTextTransformUtil;
import com.ibm.lconn.core.web.util.StripUnsupportedHtmlTagUtil;

public interface TextProcessor {
	public static final TextProcessor STRIP_UNSUPPORTED_HTML_TAGS = new StripUnsupportedHtmlTagProcessor();
	public static final TextProcessor TEXT_2_HTML = new Text2HtmlProcessor();
	public static final TextProcessor HTML_2_TEXT = new Html2TextProcessor();
	public static final TextProcessor NOP = new NopTextProcessor();

	String getName();

	int process(StringBuilder input, int offset, int length);
}

class NopTextProcessor implements TextProcessor {
	public String getName() {
		return "NOP";
	}

	public int process(StringBuilder input, int offset, int length) {
		return offset + length;
	}
}

class StripUnsupportedHtmlTagProcessor implements TextProcessor {
	protected StripUnsupportedHtmlTagUtil util = new StripUnsupportedHtmlTagUtil();

	public String getName() {
		return "STRIP_UNSUPPORTED_HTML_TAGS";
	}
	
	public int process(StringBuilder input, int offset, int length) {
		return util.stripUnsupportedHtmlTags(input, offset, length);
	}
}

class Text2HtmlProcessor implements TextProcessor {
	protected HtmlPlainTextTransformUtil util = new HtmlPlainTextTransformUtil();
	
	public String getName() {
		return "TEXT_2_HTML";
	}

	public int process(StringBuilder input, int offset, int length) {
		return util.text2html(input, offset, length);
	}
}

class Html2TextProcessor implements TextProcessor {
	protected HtmlPlainTextTransformUtil util = new HtmlPlainTextTransformUtil();
	
	public String getName() {
		return "HTML_2_TEXT";
	}

	public int process(StringBuilder input, int offset, int length) {
		return util.html2text(input, offset, length);
	}
}
