/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import junit.framework.Test;
import junit.framework.TestSuite;

import com.ibm.lconn.calendar.test.core.BaseTestCase;

public class MentionHelperTest extends  BaseTestCase{
	public static Test suite() {
        return new TestSuite(MentionHelperTest.class);
    }
//	
//	boolean settedup = false;
//	
	protected void setUp() throws Exception {
//		if (settedup){
//			return;
//		}
		super.setUp();
//		dbUtils.insert("CA_USER", new String[] { "MEMBER_UUID", "DIRECTORY_UUID"  }, new Object[] { "usr-01" ,"usr-ext-01"});
//        dbUtils.flush();
//        settedup = true;

	}
	
	protected void tearDown() throws Exception {
		super.tearDown();
	}
	
	public void testSetText1() throws Exception {
		MentionHelper.Content content = new MentionHelper.Content();
		content.setText("<p dir=\"ltr\"><span class=\"vcard\"><span class=\"fn\">@Amy Jones150</span><span class=\"x-lconn-userid\">usr-ext-01</span></span>&nbsp; dsadsa</p>", TextProcessor.NOP);
		
		assertEquals("<p dir=\"ltr\">@uuid@&nbsp; dsadsa</p>", content.template);
		assertEquals(1, content.mentions.size());
		assertEquals("@Amy Jones150", content.mentions.get(0).text);
		assertEquals(13, content.mentions.get(0).offset);
	}
	
	public void testSetText2() throws Exception {
		MentionHelper.Content content = new MentionHelper.Content();
		content.setText("<p dir=\"ltr\"><span class=\"vcard\"><span class=\"fn\">@Amy Jones150</span><span class=\"x-lconn-userid\">usr-ext-01</span>&nbsp; dsadsa</span></p>", TextProcessor.NOP);
		
		assertEquals("<p dir=\"ltr\">@uuid@&nbsp; dsadsa</p>", content.template);
		assertEquals(1, content.mentions.size());
		assertEquals("@Amy Jones150", content.mentions.get(0).text);
		assertEquals(13, content.mentions.get(0).offset);
	}
	
	public void testSetText3() throws Exception {
		MentionHelper.Content content = new MentionHelper.Content();
		content.setText("<p dir=\"ltr\"><span class=\"vcard\"><a href=\"http://lcauto5.swg.usma.ibm.com/profiles/html/profileView.do?userid=8d579540-f6df-1032-9b06-d02a14283ea9\" class=\"fn url hasHover\" icbizcard_ref=\"1\" icbizcard_idx=\"3\" aria-label=\"@Amy Jones150. Click here or press control-enter to view the business card\">@Amy Jones150</a><span style=\"display: none\" class=\"x-lconn-userid\">usr-ext-01</span>&nbsp; dsadsa</span></p>", TextProcessor.NOP);
		
		assertEquals("<p dir=\"ltr\">@uuid@&nbsp; dsadsa</p>", content.template);
		assertEquals(1, content.mentions.size());
		assertEquals("@Amy Jones150", content.mentions.get(0).text);
		assertEquals(13, content.mentions.get(0).offset);
	}
	
	public void testGetText1() throws Exception {
		MentionHelper.Content content = new MentionHelper.Content();
		content.setText("<p dir=\"ltr\"><span class=\"vcard\"><span class=\"fn\">@Amy Jones150</span><span class=\"x-lconn-userid\">usr-ext-01</span></span>&nbsp; dsadsa</p>", TextProcessor.NOP);
		
		assertEquals("<p dir=\"ltr\">@Amy Jones150&nbsp; dsadsa</p>", content.getText(MentionHelper.PLAIN_TEXT_MENTION_FORMATTER, TextProcessor.NOP));
		assertEquals("<p dir=\"ltr\">@Amy Jones150\u00a0 dsadsa</p>",content.getText(MentionHelper.PLAIN_TEXT_MENTION_FORMATTER, TextProcessor.HTML_2_TEXT ));
		assertEquals("&lt;p dir=&quot;ltr&quot;&gt;@Amy Jones150&amp;nbsp; dsadsa&lt;/p&gt;",content.getText(MentionHelper.PLAIN_TEXT_MENTION_FORMATTER, TextProcessor.TEXT_2_HTML ));
	}
	
	public void testGetText2() throws Exception {
		MentionHelper.Content content = new MentionHelper.Content();
		content.setText("<p dir=\"ltr\"><span class=\"vcard\"><span class=\"fn\">@Amy Jones150</span><span class=\"x-lconn-userid\">usr-ext-01</span></span>&nbsp; dsadsa</p>", TextProcessor.NOP);
		
		assertEquals("<p dir=\"ltr\">@{{usr-ext-01|@Amy Jones150}}&nbsp; dsadsa</p>", content.getText(MentionHelper.NEWS_MENTION_FORMATTER, TextProcessor.NOP));
	}
	
	public void testGetText3() throws Exception {
		MentionHelper.Content content = new MentionHelper.Content();
		content.setText("<p dir=\"ltr\"><span class=\"vcard\"><span class=\"fn\">@Amy Jones150</span><span class=\"x-lconn-userid\">usr-ext-01</span></span>&nbsp; dsadsa</p>", TextProcessor.NOP);
		
		assertEquals("<p dir=\"ltr\"><span class=\"vcard\"><span class=\"fn\">@Amy Jones150</span><span class=\"x-lconn-userid\">usr-ext-01</span></span>&nbsp; dsadsa</p>", content.getText(MentionHelper.MICROFORMAT_MENTION_FORMATTER, TextProcessor.NOP));
	}
	
	public void testGetTextHTMLFormatter() throws Exception {
		MentionHelper.Content content = new MentionHelper.Content();
		content.setText("<p dir=\"ltr\"><span class=\"vcard\"><span class=\"fn\">@Amy Jones150</span><span class=\"x-lconn-userid\">usr-ext-01</span></span>&nbsp; dsadsa</p>", TextProcessor.NOP);
		
		// Regex for matching FQDN from: http://www.regexlib.com/REDetails.aspx?regexp_id=391
		Pattern pattern = Pattern.compile("\\<p dir\\=\"ltr\"\\>\\<span class\\=\"vcard\"\\>\\<a class\\=\"fn url\" href=\"http://([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,6}.*\">@Amy Jones150\\</a\\>\\<span class\\=\"x\\-lconn\\-userid\" style\\=\"display: none\"\\>usr\\-ext\\-01\\</span\\>\\</span\\>&nbsp; dsadsa\\</p\\>");
		String text = content.getText(MentionHelper.HTML_MENTION_FORMATTER, TextProcessor.NOP);
		Matcher matcher = pattern.matcher(text);
		
		assertEquals("Pattern: "+ pattern.pattern() +"\nFormatted text: "+ text, true, matcher.find());
	}


	
	public void testMentionMetaDeserialize() throws Exception {
		MentionHelper.Content content = new MentionHelper.Content();
		content.parse("<p dir=\"ltr\">@uuid@&nbsp; dsadsa</p>{META|F313AD08-532F-BE0E-FC7E-1A1CEF026C69}0000000100000002130000000ausr-ext-0100000006usr-010000000d@Amy Jones15000000000");
		
		assertEquals("<p dir=\"ltr\">@uuid@&nbsp; dsadsa</p>", content.template);
		assertEquals(1, content.mentions.size());
		assertEquals("usr-01", content.mentions.get(0).userid);
		assertEquals("usr-ext-01", content.mentions.get(0).lastextid);
		assertEquals("@Amy Jones150", content.mentions.get(0).text);
		assertEquals(13, content.mentions.get(0).offset);
		assertEquals(0, content.notified.size());
	}
}
