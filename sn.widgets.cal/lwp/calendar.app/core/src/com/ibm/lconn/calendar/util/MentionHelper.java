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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.mutable.MutableInt;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.servlet.PermissionHelper;

import com.ibm.lconn.core.web.util.RichtextAtMentionConstants;

public class MentionHelper {
	private static Log _log = LogFactory.getLog(MentionHelper.class);
	
	private static AtomicLong version = new AtomicLong(0);
	
	public static final String S_VCARD = RichtextAtMentionConstants.S_VCARD;
	public static final Pattern VCARD_PATTERN = Pattern.compile(S_VCARD, Pattern.CASE_INSENSITIVE);
	
	public static final Pattern HTML_TAG_PATTERN = Pattern.compile("<[^<>]+>");
	public static final Pattern HTML_SPAN_CLOSE_TAG_PATTERN = Pattern.compile("</[sS][pP][aA][nN](\\s|>)");
	
	public static interface MentionFormatter {
		String getName();
		CharSequence format(String extid, String text, long version);
	}
	
	static class PlainTextMentionFormatter implements MentionFormatter {
		public String getName() {
			return "PLAIN_TEXT_MENTION_FORMATTER";
		}
		public CharSequence format(String extid, String text, long version) {
	        return text;
        }
	}
	
	static class HtmlMentionFormatter implements MentionFormatter {
		class _CacheData {
			boolean isSSL = false;
			StringBuilder template = new StringBuilder(500);
			StringBuilder ret = new StringBuilder(500);
		}
		
		VersionedThreadLocal<_CacheData> tls = new VersionedThreadLocal<_CacheData>();
		public String getName() {
			return "HTML_MENTION_FORMATTER";
		}
		public CharSequence format(String extid, String text, long version) {
			_CacheData cache = tls.get(version);
			if(cache == null) {
				cache = tls.get();
				if(cache == null) {
					cache = new _CacheData();
				}
				
				boolean isSSL = Utilities.useSSL();
				if(cache.template.length() == 0 || isSSL != cache.isSSL) {
					cache.template.setLength(0);
					cache.isSSL = isSSL;
					
					// generate vcard template
					String ulink = "";
					if(Utilities.isServiceEnabled("profiles")) {
						ulink = Utilities.getVenturaAppUrl("profiles", isSSL) + "/html/profileView.do?userid={1}";
					} else if(Utilities.isLotusLiveEnabled() && Utilities.isServiceEnabled("scprofiles")) {
						ulink = Utilities.getVenturaAppUrl("scprofiles", isSSL) + "/view/{1}";
					} else {
						ulink = Utilities.getVenturaAppUrl("communities", isSSL) + "/service/html/allcommunities?userid={1}";
					}
					cache.template.append("<span class=\"vcard\">")
								.append("<a class=\"fn url\" href=\"").append(Utilities.escapeHTML(ulink)).append("\">")
								.append("{2}")
								.append("</a>")
								.append("<span class=\"x-lconn-userid\" style=\"display: none\">{3}</span>")
						  .append("</span>");
				}
				
				tls.set(cache, version);
			}
			
			cache.ret.setLength(0);
			cache.ret.append(cache.template);
			
			int idx = 0;
			
			idx = cache.ret.indexOf("{1}", idx);
			cache.ret.replace(idx, idx + 3, Utilities.escapeHTML(Utilities.encodeURIComponent(extid)));
			idx = cache.ret.indexOf("{2}", idx);
			cache.ret.replace(idx, idx + 3, Utilities.escapeHTML(text));
			idx = cache.ret.indexOf("{3}", idx);
			cache.ret.replace(idx, idx + 3, Utilities.escapeHTML(extid));
			
			return cache.ret;
        }
	}
	
	static class NewsMentionFormatter implements MentionFormatter {
		public String getName() {
			return "NEWS_MENTION_FORMATTER";
		}
		public CharSequence format(String extid, String text, long version) {
			StringBuilder buffer = new StringBuilder();
	        buffer.append("@{{%uid%|%label%}}".replace("%uid%", extid).replace("%label%", Utilities.escapeHTML(text)));
	        return buffer;
        }
	}
	
	static class MicroformatMentionFormatter implements MentionFormatter {
		public String getName() {
			return "MICROFORMAT_MENTION_FORMATTER";
		}
		public CharSequence format(String extid, String text, long version) {
			StringBuilder buffer = new StringBuilder();
			buffer.append("<span class=\"vcard\">")
						.append("<span class=\"fn\">")
						.append(Utilities.escapeHTML(text))
						.append("</span>")
						.append("<span class=\"x-lconn-userid\">").append(Utilities.escapeHTML(extid)).append("</span>")
				  .append("</span>");
			return buffer;
        }
	}
	
	public final static MentionFormatter PLAIN_TEXT_MENTION_FORMATTER = new PlainTextMentionFormatter();
	public final static MentionFormatter HTML_MENTION_FORMATTER = new HtmlMentionFormatter();
	public final static MentionFormatter NEWS_MENTION_FORMATTER = new NewsMentionFormatter();
	public final static MentionFormatter MICROFORMAT_MENTION_FORMATTER = new MicroformatMentionFormatter();
	
	public static class MentionRecord {
		int offset = -1;
		String extid = null;
		String userid = null;
		String lastextid = null;
		String text = null;
		boolean hasPermission = true;
		
		public int getOffset() {
			return offset;
		}
		
		public String getExtid() {
			if(extid != null) {
				return extid;
			}
			if(userid != null) {
				try {
                    DBUser user = UserUtilities.findUserById(userid);
                    extid = user.getUserExtID();
                } catch (Exception ex) {
                	extid = null;
                }
			}
			if(extid == null) {
				extid = lastextid;
			}
			return extid;
		}
		
		public String getUserid() {
			return userid;
		}
		
		public String getText() {
			return text;
		}
		
		public boolean hasPermission() {
			return hasPermission;
		}
	}
	
	public static class Content {
		public static final String META_BEGIN_V1 = "{META|E9B8FDA7-3C00-85D1-AD2C-A0D8666F85E9}";
		public static final String META_BEGIN_V2 = "{META|F313AD08-532F-BE0E-FC7E-1A1CEF026C69}";
		
		private static PermissionHelper permissionHelper = null;
		
		static {
			try {
	            permissionHelper = new PermissionHelper();
            } catch (DSProviderException ex) {
            	if(_log.isDebugEnabled()) {
            		ex.printStackTrace();
            	}
            }
		}
		
    	String template = null;
    	List<MentionRecord> mentions = new ArrayList<MentionRecord>();
    	Set<String> notified = new HashSet<String>();
    	Set<String> lastnotified = null;
    	
    	// text cache
    	Map<String, String> text = new HashMap<String, String>();
    	
    	public String getText(MentionFormatter formatter, TextProcessor processor) {
    		if(template == null) {
    			return null;
    		}
    		
    		String key = formatter.getName() + ":" + processor.getName();
    		
    		if(text.get(key) == null) {
    			StringBuilder buffer = new StringBuilder(this.template);
	    		if(mentions.size() == 0) {
	    			processor.process(buffer, 0, buffer.length());
	    			text.put(key, buffer.toString());
	    		} else {
	    			int offsetAdjust = 0;
	    			
	    			long version = MentionHelper.version.incrementAndGet();
		    		int lastOffset = 0;
		    		for(Iterator<MentionRecord> iter = mentions.iterator(); iter.hasNext(); ) {
		    			MentionRecord record = iter.next();
		    			
		    			if(lastOffset < record.getOffset() + offsetAdjust) {
		    				int t = processor.process(buffer, lastOffset, record.getOffset() + offsetAdjust - lastOffset);
		    				offsetAdjust = t - record.getOffset();
		    			}
		    			
		    			CharSequence fragment = formatter.format(record.getExtid(), record.getText(), version);
		    			buffer.delete(record.getOffset() + offsetAdjust, record.getOffset() + offsetAdjust + 6);
		    			buffer.insert(record.getOffset() + offsetAdjust, fragment);
		    			
		    			lastOffset = record.getOffset() + offsetAdjust + fragment.length();
		    			offsetAdjust = offsetAdjust + (fragment.length() - 6);
		    		}
		    		
		    		if(lastOffset < buffer.length()) {
		    			processor.process(buffer, lastOffset, buffer.length() - lastOffset);
		    		}
		    		text.put(key, buffer.toString());	
	    		}
    		}
    		
    		return text.get(key);
    	}
    	
    	public void setText(String text, TextProcessor processor) {
    		this.template = null;
    		this.mentions.clear();
    		this.text.clear();
    		
    		if(text == null) {
    			return;
    		}
    		
    		StringBuilder buffer = new StringBuilder(text);
    		
    		if(text.indexOf("vcard") == -1) {
    			processor.process(buffer, 0, buffer.length());
    			this.template = buffer.toString();
    			return;
    		}
    		
    		Matcher vcardMatcher = VCARD_PATTERN.matcher(buffer);
    		Matcher htmlTagMatcher = HTML_TAG_PATTERN.matcher(buffer);
    		
    		int lastOffset = 0;
    		vcardMatcher.region(lastOffset, buffer.length());
    		
    		while(vcardMatcher.find()) {
    			int vcardStart = vcardMatcher.start();
    			int vcardEnd = vcardMatcher.end();
    			String vcardLabel = vcardMatcher.group(2);
    			String vcardLdapId = vcardMatcher.group(3);
    			
    			if(lastOffset < vcardStart) {
    				int offsetAdjust = processor.process(buffer, lastOffset, vcardStart - lastOffset) - vcardStart;
    				vcardStart += offsetAdjust;
    				vcardEnd += offsetAdjust;
    			}
    			
    			MentionRecord mention = new MentionRecord();
    			mentions.add(mention);
    			mention.text = Utilities.unescapeHTML(vcardLabel);
    			mention.offset = vcardStart;
    			mention.extid = vcardLdapId;
    			
    			DBUser user = null;
    			try {
    				user = UserUtilities.findUserByExtId(mention.extid, true);
    				if(user != null) {
    					mention.userid = user.getUserUUID();
    				}
    			} catch (Exception ex) {
    				if(_log.isDebugEnabled()) {
						ex.printStackTrace();
					}
    			}
    			
    			buffer.replace(vcardStart, vcardEnd, "@uuid@");
    			
    			int bufferLen = buffer.length();
    			lastOffset = mention.offset + 6;
    			
    			// find the matching </span> and move all the text between it out of the @mention block    			
    			int level = 1;
    			htmlTagMatcher.region(lastOffset, bufferLen);
    			while(htmlTagMatcher.find()) {
    				int start = htmlTagMatcher.start(), end = htmlTagMatcher.end();
    				String t = htmlTagMatcher.group();
    				if(t.startsWith("</")) {
    					level--;
    				} else if(!t.endsWith("/>")) {
    					level++;
    				}
    				if(level == 0 && HTML_SPAN_CLOSE_TAG_PATTERN.matcher(t).find()) {
    					lastOffset = processor.process(buffer, lastOffset, start - lastOffset);
    					buffer.delete(lastOffset, lastOffset + end - start);
    					break;
    				}
    				htmlTagMatcher.region(end, bufferLen);
    			}
    			
    			vcardMatcher.region(lastOffset, buffer.length());
    		}
    		if(lastOffset < buffer.length()) {
    			processor.process(buffer, lastOffset, buffer.length() - lastOffset);
    		}
    		this.template = buffer.toString();
    	}
    	
    	public List<MentionRecord> getRecentMentionedPeople() {
    		if(this.lastnotified == null) {
    			this.lastnotified = new HashSet<String>(this.notified);
    		}
    		List<MentionRecord> ret = new ArrayList<MentionRecord>();
    		for(Iterator<MentionRecord> iter = this.mentions.iterator(); iter.hasNext(); ) {
    			MentionRecord t = iter.next();
    			if(!this.lastnotified.contains(t.getUserid())) {
    				ret.add(t);
    			}
    		}
    		return ret;
    	}
    	
    	public List<MentionRecord> getMentionedPeople() {
    		return new ArrayList<MentionRecord>(this.mentions);
    	}
    	
    	public void refreshNotifiedMeta() {
    		this.lastnotified = new HashSet<String>(this.notified);
    		for(Iterator<MentionRecord> iter = this.mentions.iterator(); iter.hasNext(); ) {
    			MentionRecord t = iter.next();
    			if(t.userid != null) {
    				this.notified.add(t.userid);
    			}
    		}
    	}
    	
    	public void checkPermission(DBCalendar calendar) {
    		for(MentionRecord mention : mentions) {
    			boolean hasPermission = false;
    			
    			_log.debug("check permission: " + mention.text + ", " + calendar.getCalendar_UUID());
    			if(mention.userid != null) {
    				_log.debug("check permission: " + mention.userid + ", " + calendar.getCalendar_UUID());
    				
    				DBUser user = null;
    				try {
	                    user = UserUtilities.findUserById(mention.userid);
                    } catch (Exception ex) {
                    	user = null;
                    	_log.debug("Error happened when finding user: " + mention.userid, ex);
                    }
    				
    				if(_log.isDebugEnabled()) {
    					if(user == null) _log.debug("Fail to find user: " + mention.userid);
    				}
    				
    				if(user != null) {
    					try {
	                        hasPermission = permissionHelper.isUserAuthorizedToAccess(user, calendar);
                        } catch (Exception ex) {
                        	_log.debug("Fail to check user permission: " + user.getUserUUID() + ", " + calendar.getCalendar_UUID(), ex);
                        	hasPermission = false;
                        }
    				}
    			}
    			if(!hasPermission) {
    				mention.hasPermission = false;
    				if(mention.text.startsWith("@")) {
    					mention.text = mention.text.substring(1);
    				}
    			}
    		}
    	}
    	
    	public String toString() {
    		if(template == null) {
    			return null;
    		}
    		
    		StringBuilder buffer = new StringBuilder();
    		buffer.append(template);
    		buffer.append(META_BEGIN_V2);
    		writeFieldLength(mentions.size(), buffer);
    		for(Iterator<MentionRecord> iter = mentions.iterator(); iter.hasNext(); ) {
    			writeMentionRecord(iter.next(), buffer);
    		}
    		writeFieldLength(notified.size(), buffer);
    		for(Iterator<String> iter = notified.iterator(); iter.hasNext(); ) {
    			writeField(iter.next(), buffer);
    		}
    		return buffer.toString();
    	}
    	
    	public void parse(String buffer) {
    		this.template = null;
    		this.mentions.clear();
    		this.notified.clear();
    		this.lastnotified = null;
    		this.text.clear();
    		
    		if(buffer == null) {
    			return;
    		}
    		
    		int idx = buffer.indexOf(META_BEGIN_V2);
    		if(idx != -1) {
    			this.template = buffer.substring(0, idx);
    			
    			MutableInt offset = new MutableInt(idx + META_BEGIN_V2.length());
    			int count = readFieldLength(buffer, offset);
    			for(int i = 0; i < count; i++) {
    			    this.mentions.add(readMentionRecord(buffer, offset));
    			}
    			
    			count = readFieldLength(buffer, offset);
    			for(int i = 0; i < count; i++) {
    			    this.notified.add(readField(buffer, offset));
    			}
    		} else {
    			idx = buffer.indexOf(META_BEGIN_V1);
    			if(idx != -1) {
    				String meta = buffer.substring(idx);
    				int tidx = meta.indexOf("MENTIONED=");
    				if(tidx != -1) {
    					this.notified.addAll(Arrays.asList(meta.substring(tidx + "MENTIONED=".length()).split("<::>")));
    				}
    				this.setText(buffer.substring(0, idx), TextProcessor.NOP);
    			} else {
    				this.template = buffer;
    			}
    		}
    	}
    	
    	protected void writeFieldLength(int length, StringBuilder buffer) {
    		String s = Integer.toHexString(length);
    		if(s.length() < 8) {
    			for(int i = 8; i > s.length(); i--) {
    				buffer.append("0");
    			}
    		}
    		buffer.append(s);
    	}
    	
    	protected int readFieldLength(String buffer, MutableInt offset) {
    		int pos = offset.getValue();
    		String t = buffer.substring(pos, pos + 8);
    		offset.setValue(pos + 8);
			return Integer.parseInt(t, 16);
		}
    	
    	protected void writeField(int data, StringBuilder buffer) {
			String s = Integer.toString(data);
			writeFieldLength(s.length(), buffer);
			buffer.append(s);
		}
		
    	protected void writeField(String data, StringBuilder buffer) {
			String s = data;
			if(data == null) {
				s = "";
			}
			writeFieldLength(s.length(), buffer);
			buffer.append(s);
		}
		
    	protected int readIntField(String buffer, MutableInt offset) {
			return Integer.parseInt(readField(buffer, offset));
		}
		
    	protected String readField(String buffer, MutableInt offset) {
			int len = readFieldLength(buffer, offset);
			String ret = null;
			if(len > 0) {
				int pos = offset.getValue();
				ret = buffer.substring(pos, pos + len);
				offset.setValue(pos + len);
			}
			return ret;
		}
		
    	protected void writeMentionRecord(MentionRecord data, StringBuilder buffer) {
			writeField(data.getOffset(), buffer);
			writeField(data.getExtid(), buffer);
			writeField(data.getUserid(), buffer);
			writeField(data.getText(), buffer);
		}
		
    	protected MentionRecord readMentionRecord(String buffer, MutableInt offset) {
			MentionRecord ret = new MentionRecord();
			ret.offset = readIntField(buffer, offset);
			ret.lastextid = readField(buffer, offset);
			ret.userid = readField(buffer, offset);
			ret.text = readField(buffer, offset);
			return ret;
		}
    }
	
	public static void main(String[] args) throws Exception {
		MentionHelper.Content data = new MentionHelper.Content();
		data.setText("<span class=\"vcard\"><span class=\"fn\">Amy Jones160</span><span class=\"x-lconn-userid\">8d579540-f6df-1032-9b10-d02a14283ea9</span></span> <span class=\"vcard\"><span class=\"fn\">Amy Jones160</span><span class=\"x-lconn-userid\">8d579540-f6df-1032-9b10-d02a14283ea9</span></span>   sada \nddd aaa\ndadsa", TextProcessor.TEXT_2_HTML);
		System.out.println(data.template);
		System.out.println(data.mentions.size());
		System.out.println(data.getText(MentionHelper.PLAIN_TEXT_MENTION_FORMATTER, TextProcessor.NOP));
	}
}
