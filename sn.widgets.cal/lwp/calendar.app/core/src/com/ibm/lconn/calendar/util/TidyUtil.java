/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TidyUtil {
	
	private static Pattern linkPattern = Pattern.compile("\\b(?:(?:(?:https?|ftp)://[a-zA-Z0-9-+&@#/%\\?=~_|!:,\\.;]*[a-zA-Z0-9-+&@#/%=~_|])|(?:www\\.[a-zA-Z0-9-+&@#/%=~_|?\\.]+))");
	
	private static Pattern vcardPattern = Utilities.VCARD_PATTERN;
	
	public static String toHtmlFragmentFromPlaintextForAS(String text) {
		StringBuffer buf = new StringBuffer();
		
		Matcher vcardMatcher = vcardPattern.matcher(text), linkMatcher = linkPattern.matcher(text);
		
		int idx = 0;
		while (true) {
			boolean b1 = vcardMatcher.find(idx), b2 = linkMatcher.find(idx);
			if(!b1 && !b2) break;
			if(b1 && (!b2 || vcardMatcher.start() < linkMatcher.start())) {
				String s = text.substring(idx, vcardMatcher.start());
				buf.append(Utilities.escapeHTML(s).replaceAll("\n", "<br>"));
				String uid = vcardMatcher.group(2);
				String label = Utilities.unescapeHTML(vcardMatcher.group(1));
				buf.append("@{{%uid%|%label%}}".replace("%uid%", uid).replace("%label%", Utilities.escapeHTML(label)));
				idx = vcardMatcher.end();
			} else {
				String s = text.substring(idx, linkMatcher.start());
				buf.append(Utilities.escapeHTML(s).replaceAll("\n", "<br>"));
				buf.append("<a href=\"").append(Utilities.escapeHTML(linkMatcher.group())).append("\" target=\"_blank\">").append(Utilities.escapeHTML(linkMatcher.group())).append("</a>");
				idx = linkMatcher.end();
			}
		}
		
		if (idx < text.length()) {
			String s = text.substring(idx);
			buf.append(Utilities.escapeHTML(s).replaceAll("\n", "<br>"));
		}
		
		return buf.toString();
	}

	public static String toHtmlFragmentFromPlaintext(String text) {
		StringBuffer buf = new StringBuffer();
		
		Matcher vcardMatcher = vcardPattern.matcher(text), linkMatcher = linkPattern.matcher(text);
		
		int idx = 0;
		while (true) {
			boolean b1 = vcardMatcher.find(idx), b2 = linkMatcher.find(idx);
			if(!b1 && !b2) break;
			if(b1 && (!b2 || vcardMatcher.start() < linkMatcher.start())) {
				String s = text.substring(idx, vcardMatcher.start());
				buf.append(Utilities.escapeHTML(s).replaceAll("\n", "<br>"));
				
				String uid = vcardMatcher.group(2);
				String label = Utilities.unescapeHTML(vcardMatcher.group(1));
				String ulink = "";
				if(Utilities.isServiceEnabled("profiles")) {
					ulink = Utilities.getVenturaAppUrl("profiles", Utilities.useSSL()) + "/html/profileView.do?userid=" + Utilities.encodeURIComponent(uid);
				} else if(Utilities.isLotusLiveEnabled() && Utilities.isServiceEnabled("scprofiles")) {
					ulink = Utilities.getVenturaAppUrl("scprofiles", Utilities.useSSL()) + "/view/" + Utilities.encodeURIComponent(uid);
				} else {
					ulink = Utilities.getVenturaAppUrl("communities", Utilities.useSSL()) + "/service/html/allcommunities?userid=" + Utilities.encodeURIComponent(uid);
				}
				
				buf.append("<span class=\"vcard\">")
						.append("<a class=\"fn url\" href=\"").append(Utilities.escapeHTML(ulink)).append("\">")
						.append(Utilities.escapeHTML(label))
						.append("</a>")
						.append("<span class=\"x-lconn-userid\" style=\"display : none\">").append(Utilities.escapeHTML(uid)).append("</span>")
					.append("</span>");
				idx = vcardMatcher.end();
			} else {
				String s = text.substring(idx, linkMatcher.start());
				buf.append(Utilities.escapeHTML(s).replaceAll("\n", "<br>"));
				buf.append("<a href=\"").append(Utilities.escapeHTML(linkMatcher.group())).append("\" target=\"_blank\">").append(Utilities.escapeHTML(linkMatcher.group())).append("</a>");
				idx = linkMatcher.end();
			}
		}
		
		if (idx < text.length()) {
			String s = text.substring(idx);
			buf.append(Utilities.escapeHTML(s).replaceAll("\n", "<br>"));
		}
		
		return buf.toString();
	}
}
