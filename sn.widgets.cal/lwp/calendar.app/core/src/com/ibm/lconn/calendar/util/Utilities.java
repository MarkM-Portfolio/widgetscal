/* Portions Copyright IBM Corp. 2011, 2016   All Rights Reserved     */

package com.ibm.lconn.calendar.util;

import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.abdera.model.AtomDate;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;

import com.ibm.icu.lang.UCharacter;
import com.ibm.icu.text.UCharacterIterator;
import com.ibm.icu.util.Calendar;
import com.ibm.icu.util.TimeZone;
import com.ibm.lconn.calendar.atom.AtomConstants;
import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.servlet.PermissionHelper;
import com.ibm.lconn.core.url.ThreadHttpRequest;
import com.ibm.lconn.core.util.PatternResolver;
import com.ibm.lconn.core.versionstamp.VersionStamp;
import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;
import com.ibm.ventura.internal.config.exception.VenturaConfigHelperException;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;

public class Utilities {
	private static final String CLASS_NAME = Utilities.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private static VenturaConfigurationProvider vcp = null;
	private static VenturaConfigurationHelper vch = null;
	private static Boolean isMTConfigEnabled = null;
	static {
        try {
			vcp =  VenturaConfigurationProvider.Factory.getInstance();
			vch = VenturaConfigurationHelper.Factory.getInstance();
			isMTConfigEnabled = isMultitenantConfigEnabled();
		} catch (Exception e) {
		} 
    }
	
	public static final long ONE_DAY = 24 * 3600 * 1000L;
	public static final long ONE_WEEK = 7 * 24 * 3600 * 1000L;
	
	public static final Pattern VCARD_PATTERN = Pattern.compile("<[sS][pP][aA][nN] class=\"?vcard\"?><[sS][pP][aA][nN] class=\"?fn\"?>([^<>]+)</[sS][pP][aA][nN]><[sS][pP][aA][nN] class=\"?x-lconn-userid\"?>([^<>]+)</[sS][pP][aA][nN]></[sS][pP][aA][nN]>");

	public static String jsStr(String s) {
		if (s==null) {
			return "";
		}
		s = s.replace("\\", "\\\\").replace("'", "\\'").replace("\"", "\\\"").replace("\r", "\\r").replace("\n", "\\n");
		s = "'" + s + "'";
		if (s.indexOf("<") != -1) {
			StringBuffer buf = new StringBuffer();
			int idx1 = s.indexOf('<'), idx2 = 0;
			while (idx1 != -1) {
				buf.append(s.substring(idx2, idx1 + 1));
				buf.append("'");
				buf.append("+");
				buf.append("'");

				idx2 = idx1 + 1;
				idx1 = s.indexOf('<', idx2);
			}
			buf.append(s.substring(idx2));
			s = buf.toString();
		}
		return s;
	}

	public static String secureJSON(String s) {
		return "{}&&" + s;
	}

	public static boolean equals(Object o1, Object o2) {
		if (o1 == o2)
			return true;
		if (o1 != null && o1.equals(o2))
			return true;
		return false;
	}
	
	public static Calendar getCalendarInstance(Date date, TimeZone timezone) {
		Calendar ret = Calendar.getInstance(timezone);
		ret.setTimeInMillis(date.getTime());
		return ret;
	}
	
	public static Date alignToSecond(Date time) {
		return new Date(time.getTime() - (time.getTime() % 1000));
	}
	
	public static Date align(Date source, Date target, TimeZone timezone, Date maxTime) {
		if(timezone == null)
			timezone = TimeZone.getTimeZone("UTC");
		Calendar s = Calendar.getInstance(timezone);
		s.setTimeInMillis(source.getTime());
		Calendar t = Calendar.getInstance(timezone);
		t.setTimeInMillis(target.getTime());
		s.set(Calendar.HOUR_OF_DAY, t.get(Calendar.HOUR_OF_DAY));
		s.set(Calendar.MINUTE, t.get(Calendar.MINUTE));
		s.set(Calendar.SECOND, t.get(Calendar.SECOND));
		if(maxTime != null) {
			while(maxTime.getTime() < s.getTimeInMillis()) {
				s.add(Calendar.DAY_OF_YEAR, -1);
			}
		}
		return s.getTime();
	}
	
	public static Date move(Date time, TimeZone timezone, int days) {
		if(timezone == null)
			timezone = TimeZone.getTimeZone("UTC");
		Calendar c = Calendar.getInstance(timezone);
		c.setTimeInMillis(time.getTime());
		int h = c.get(Calendar.HOUR_OF_DAY), m = c.get(Calendar.MINUTE), s = c.get(Calendar.SECOND);
		Calendar o = Calendar.getInstance(timezone);
		o.setTimeInMillis(c.getTimeInMillis());
		o.add(Calendar.DAY_OF_YEAR, days);
		o.set(Calendar.HOUR_OF_DAY, h);
		o.set(Calendar.MINUTE, m);
		o.set(Calendar.SECOND, s);
		return o.getTime();
	}
	
	public static int getDayOffset(Calendar c1, Calendar c2, TimeZone timezone) {
		if(timezone == null)
			timezone = TimeZone.getTimeZone("UTC");
		int dayOffset = 0;
		Calendar t1 = Calendar.getInstance(timezone), t2 = Calendar.getInstance(timezone);
		t1.setTimeInMillis(Utilities.getStartOfDay(c1).getTime()); t2.setTimeInMillis(Utilities.getStartOfDay(c2).getTime());
		if(t1.after(t2)) {
			Calendar t = t1;
			t1 = t2; t2 = t;
		}
		while(t1.before(t2)) {
			dayOffset++;
			t1.add(Calendar.DAY_OF_YEAR, 1);
		}
		return c1.before(c2) ? dayOffset : dayOffset * (-1);
	}
	
	public static int getDayOffset(Date d1, Date d2, TimeZone timezone) {
		if(timezone == null)
			timezone = TimeZone.getTimeZone("UTC");
		Calendar c1 = Calendar.getInstance(timezone);
		c1.setTimeInMillis(d1.getTime());
		Calendar c2 = Calendar.getInstance(timezone);
		c2.setTimeInMillis(d2.getTime());
		return getDayOffset(c1, c2, timezone);
	}
	
	public static Date getStartOfUTCDay(Calendar cal) {
		Calendar c = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
		c.set(cal.get(Calendar.YEAR), cal.get(Calendar.MONTH), cal.get(Calendar.DAY_OF_MONTH), 0, 0, 0);
		return alignToSecond(c.getTime());
	}
	
	public static Date getStartOfNextUTCDay(Calendar cal) {
		Calendar c = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
		c.set(cal.get(Calendar.YEAR), cal.get(Calendar.MONTH), cal.get(Calendar.DAY_OF_MONTH), 0, 0, 0);
		return alignToSecond(new Date(c.getTime().getTime() + Utilities.ONE_DAY));
	}

	public static Date getStartOfDay(Calendar cal) {
		cal = (Calendar)cal.clone();
		cal.set(Calendar.HOUR_OF_DAY, cal.getMinimum(Calendar.HOUR_OF_DAY));
		cal.set(Calendar.MINUTE, cal.getMinimum(Calendar.MINUTE));
		cal.set(Calendar.SECOND, cal.getMinimum(Calendar.SECOND));
		cal.set(Calendar.MILLISECOND, cal.getMinimum(Calendar.MILLISECOND));
		return alignToSecond(cal.getTime());
	}
	
	public static Date getStartOfNextDay(Calendar cal) {
		cal = (Calendar)cal.clone();
		cal.setTimeInMillis(cal.getTimeInMillis() + 86400000L);
		cal.set(Calendar.HOUR_OF_DAY, cal.getMinimum(Calendar.HOUR_OF_DAY));
		cal.set(Calendar.MINUTE, cal.getMinimum(Calendar.MINUTE));
		cal.set(Calendar.SECOND, cal.getMinimum(Calendar.SECOND));
		cal.set(Calendar.MILLISECOND, cal.getMinimum(Calendar.MILLISECOND));
		return alignToSecond(cal.getTime());
	}

	public static Date getEndOfDay(Calendar cal) {
		cal = (Calendar)cal.clone();
		cal.set(Calendar.HOUR_OF_DAY, cal.getMaximum(Calendar.HOUR_OF_DAY));
		cal.set(Calendar.MINUTE, cal.getMaximum(Calendar.MINUTE));
		cal.set(Calendar.SECOND, cal.getMaximum(Calendar.SECOND));
		cal.set(Calendar.MILLISECOND, cal.getMaximum(Calendar.MILLISECOND));
		return alignToSecond(cal.getTime());
	}
	
	/**
	 * date1 must be after date2
	 * 
	 * @param date1
	 * @param date2
	 * @param timezone
	 * @return
	 */
	public static int calculateDifferenceInMonth(Date date1, Date date2, TimeZone timezone) {
		if(timezone == null)
			timezone = TimeZone.getTimeZone("UTC");
		Calendar cal1 = Calendar.getInstance(timezone);
		cal1.setTime(date1);
		Calendar cal2 = Calendar.getInstance(timezone);
		cal2.setTime(date2);
		return 
		   (cal1.get(Calendar.YEAR) - cal2.get(Calendar.YEAR)) * 12 + cal1.get(Calendar.MONTH)
		    - cal2.get(Calendar.MONTH);
	}

	public static Integer parseDayOfWeek(String text) {
		if ("SU".equalsIgnoreCase(text)) {
			return Calendar.SUNDAY;
		} else if ("MO".equalsIgnoreCase(text)) {
			return Calendar.MONDAY;
		} else if ("TU".equalsIgnoreCase(text)) {
			return Calendar.TUESDAY;
		} else if ("WE".equalsIgnoreCase(text)) {
			return Calendar.WEDNESDAY;
		} else if ("TH".equalsIgnoreCase(text)) {
			return Calendar.THURSDAY;
		} else if ("FR".equalsIgnoreCase(text)) {
			return Calendar.FRIDAY;
		} else if ("SA".equalsIgnoreCase(text)) {
			return Calendar.SATURDAY;
		}

		return null;
	}

	public static String formatDayOfWeek(Integer dayOfWeek) {
		switch (dayOfWeek) {
		case Calendar.SUNDAY:
			return "SU";
		case Calendar.MONDAY:
			return "MO";
		case Calendar.TUESDAY:
			return "TU";
		case Calendar.WEDNESDAY:
			return "WE";
		case Calendar.THURSDAY:
			return "TH";
		case Calendar.FRIDAY:
			return "FR";
		case Calendar.SATURDAY:
			return "SA";
		}
		return null;
	}

	public static <T> T coalesce(T o1, T o2) {
		if (o1 != null)
			return o1;
		return o2;
	}

	/**
	 * see http://www.w3.org/TR/2000/REC-xml-20001006#charsets
	 * 
	 * "any Unicode character, excluding the surrogate blocks, FFFE, and FFFF."
	 * Char ::= #x9 | #xA | #xD | [#x20-#xD7FF] | [#xE000-#xFFFD] |
	 * [#x10000-#x10FFFF]
	 */
	public static boolean isXMLCharacter(int c) {
		if (c == 0x9)
			return true;
		if (c == 0xA)
			return true;
		if (c == 0xD)
			return true;

		if (c < 0x20)
			return false;
		if (c <= 0xD7FF)
			return true;
		if (c < 0xE000)
			return false;
		if (c <= 0xFFFD)
			return true;
		if (c < 0x10000)
			return false;
		if (c <= 0x10FFFF)
			return true;

		return false;
	}

	public static String clean(String text) {
		if (text == null)
			return null;

		StringBuffer sb = new StringBuffer();

		UCharacterIterator iter = UCharacterIterator.getInstance(text);
		int next = iter.nextCodePoint();
		while (next != UCharacterIterator.DONE) {
			if (isXMLCharacter(next)) {
				sb.append(UCharacter.toString(next));
			}
			next = iter.nextCodePoint();
		}

		return sb.toString();
	}

	/**
	 * Remove occurences of html, defined as any text between the characters
	 * "&lt;" and "&gt;". Replace any HTML tags with a space.
	 */
	public static String removeHTML(String str) {
		return removeHTML(str, true, false);
	}

	/**
	 * Remove occurences of html, defined as any text between the characters
	 * "&lt;" and "&gt;". Optionally replace HTML tags with a space.
	 * 
	 * @param str
	 * @param addSpace
	 * @return
	 */
	public static String removeHTML(String str, boolean addSpace, boolean pretty) {
		if (str == null)
			return "";
		StringBuffer ret = new StringBuffer(str.length());
		ret.append(" ");

		int start = 0;
		int beginTag = str.indexOf("<", start);
		if (beginTag == -1)
			return str;
		int endTag = 0;

		while (true) {
			ret.append(str.substring(start, beginTag));
			if (beginTag < str.length()) {
				endTag = str.indexOf(">", beginTag);
				if (endTag == -1) {
					ret.append(str.substring(beginTag));
				}
			}

			if (beginTag == str.length() || endTag == -1) {
				break;
			}

			if(pretty) {
				boolean skipChild = false;
				String append = "";
				
				String tag = str.substring(beginTag + 1, endTag);
				String tagName = StringUtils.split(tag, " \t\u3000")[0].toLowerCase(Locale.ENGLISH);
				if (tagName.equals("p") || tagName.equals("p/") || tagName.equals("/p") ) {
					append = "\n";
				} else if (tagName.equals("br") || tagName.equals("br/")) {
					append = "\n";
				} else if (tagName.equals("div") || tagName.equals("div/") || tagName.equals("/div") ) {
					append = "\n";
				} else if (tagName.equals("ul") || tagName.equals("/ul") ) {
					append = "\n";
				} else if (tagName.equals("ol") ) {
					if(ret.charAt(ret.length() - 1) != '\n') {
						append = "\n\t";
					} else {
						append = "\t";
					}
				} else if (tagName.equals("li") ) {
					if(ret.charAt(ret.length() - 1) != '\n') {
						append = "\n\t";
					} else {
						append = "\t";
					}
				} else if (tagName.equals("tr") || tagName.equals("/tr")) {
					append = "\n";
				} else if (tagName.equals("th")) {
					append = "\t";
				} else if (tagName.equals("td")) {
					append = "\t";
				} else if (tagName.equals("a")) { // Href tag
					int tIdx = tag.indexOf(" href=");
					if(tIdx == -1) {
						tIdx = tag.indexOf("\u3000href=");
						if(tIdx == -1) {
							tIdx = tag.indexOf("\thref=");
						}
					}
					if(tIdx != -1) {
						tIdx = tag.indexOf("=", tIdx);
						if(tag.length() > tIdx + 2) {
							tIdx += 2;
							int tIdx2 = -1;
							if(tag.charAt(tIdx - 1) == '\'') {
								tIdx2 = tag.indexOf("'", tIdx);
							} else if(tag.charAt(tIdx - 1) == '\"') {
								tIdx2 = tag.indexOf("\"", tIdx);
							}
							if(tIdx2 != -1) {
								if (ret.length() > 0 && ret.charAt(ret.length() - 1) != ' ' && ret.charAt(ret.length() - 1) != '\n') {
									append = " ";
								}
								append = append + tag.substring(tIdx, tIdx2) + " ";
								skipChild = true;
							}
						}
					}								
				} else {
					if ((addSpace || pretty) && (ret.length() > 0 && ret.charAt(ret.length() - 1) != ' ' && ret.charAt(ret.length() - 1) != '\n')) {
						append = " ";
					}
				}
				
				ret.append(append);
				
				if(skipChild) {
					int idx = str.indexOf("</" + tagName + ">", beginTag);
					if(idx == -1) {
						idx = str.indexOf("</" + tagName.toUpperCase(Locale.ENGLISH) + ">", beginTag);
					}
					if(idx != -1) {
						start = idx + ("</" + tagName + ">").length();
						beginTag = str.length();
						if(start < str.length()) {
							beginTag = str.indexOf("<", start);
							if (beginTag == -1) {
								beginTag = str.length();
							}
						}
					}
				} else {
					start = endTag + 1;
					beginTag = str.indexOf("<", start);
					if (beginTag == -1) {
						beginTag = str.length();
					}
				}
			} else {
				if ((addSpace || pretty) && (ret.length() == 0 || ret.charAt(ret.length() - 1) != ' ')) {
					ret.append(" ");
				}
				
				start = endTag + 1;
				beginTag = str.indexOf("<", start);
				if (beginTag == -1) {
					beginTag = str.length();
				}
			}
			
			while(start < str.length()) {
				if(Character.isWhitespace(str.charAt(start))) {
					start++;
				} else {
					break;
				}
			}
		}
		
		return ret.toString().trim();
	}

	/**
	 * This method based on code from the String taglib at Apache Jakarta:
	 * http:/
	 * /cvs.apache.org/viewcvs/jakarta-taglibs/string/src/org/apache/taglibs
	 * /string/util/StringW.java?rev=1.16&content-type=text/vnd.viewcvs-markup
	 * Copyright (c) 1999 The Apache Software Foundation. Author:
	 * timster@mac.com
	 * 
	 * @param str
	 * @param lower
	 * @param upper
	 * @param appendToEnd
	 * @return
	 */
	public static String truncateNicely(String str, int lower, int upper, String appendToEnd) {
		// strip markup from the string
		String str2 = removeHTML(str, false, false);
		boolean diff = (str2.length() < str.length());

		// quickly adjust the upper if it is set lower than 'lower'
		if (upper < lower) {
			upper = lower;
		}

		// now determine if the string fits within the upper limit
		// if it does, go straight to return, do not pass 'go' and collect $200
		if (str2.length() > upper) {
			// the magic location int
			int loc;

			// first we determine where the next space appears after lower
			loc = str2.lastIndexOf(' ', upper);

			// now we'll see if the location is greater than the lower limit
			if (loc >= lower) {
				// yes it was, so we'll cut it off here
				str2 = str2.substring(0, loc);
			} else {
				// no it wasnt, so we'll cut it off at the upper limit
				str2 = str2.substring(0, upper);
				loc = upper;
			}

			// HTML was removed from original str
			if (diff) {

				// location of last space in truncated string
				loc = str2.lastIndexOf(' ', loc);

				// get last "word" in truncated string (add 1 to loc to
				// eliminate space
				String str3 = str2.substring(loc + 1);

				// find this fragment in original str, from 'loc' position
				loc = str.indexOf(str3, loc) + str3.length();

				// get truncated string from original str, given new 'loc'
				str2 = str.substring(0, loc);

				// get all the HTML from original str after loc
				str3 = extractHTML(str.substring(loc));

				// remove any tags which generate visible HTML
				// This call is unecessary, all HTML has already been stripped
				// str3 = removeVisibleHTMLTags(str3);

				// append the appendToEnd String and
				// add extracted HTML back onto truncated string
				str = str2 + appendToEnd + str3;
			} else {
				// the string was truncated, so we append the appendToEnd String
				str = str2 + appendToEnd;
			}

		}

		return str;
	}

	/**
	 * Extract (keep) JUST the HTML from the String.
	 * 
	 * @param str
	 * @return
	 */
	public static String extractHTML(String str) {
		if (str == null)
			return "";
		StringBuffer ret = new StringBuffer(str.length());
		int start = 0;
		int beginTag = str.indexOf("<");
		int endTag = 0;
		if (beginTag == -1)
			return str;

		while (beginTag >= start) {
			endTag = str.indexOf(">", beginTag);

			// if endTag found, keep tag
			if (endTag > -1) {
				ret.append(str.substring(beginTag, endTag + 1));

				// move start forward and find another tag
				start = endTag + 1;
				beginTag = str.indexOf("<", start);
			}
			// if no endTag found, break
			else {
				break;
			}
		}
		return ret.toString();
	}
	
	/**
     * Sets the HTTP response status to 304 (NOT MODIFIED) if the request contains an
     * If-Modified-Since header that specifies a time that is
     * at or after the time specified by the value of lastModifiedTimeMillis
     * <em>truncated to second granularity</em>.  Returns true if
     * the response status was set, false if not.
     *
     * @param request
     * @param response
     * @param lastModifiedTimeMillis
     * @return true if a response status was sent, false otherwise.
     */
    public static boolean respondIfNotModified(HttpServletRequest request,
                                               HttpServletResponse response,
                                               long lastModifiedTimeMillis) {
    	long dataTimestamp = lastModifiedTimeMillis;
    	
        long sinceDate = request.getDateHeader("If-Modified-Since");
        // allow version check
        if(lastModifiedTimeMillis < getVersionStampTimeMillis()) {
        	lastModifiedTimeMillis = getVersionStampTimeMillis();
        }
        // truncate to seconds
        lastModifiedTimeMillis -= (lastModifiedTimeMillis % 1000);
        if (lastModifiedTimeMillis <= sinceDate) {
        	LOGGER.finer("Respond 304 not modified. [Cache timestamp: " + sinceDate + ", Data timestamp: " + dataTimestamp + ", Version timestamp: " + getVersionStampTimeMillis() + "]");
            response.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
            return true;
        } else {
            return false;
        }
    }
    
    public static long getVersionStampTimeMillis() {
    	return VersionStamp.INSTANCE.getVersionStampDate().getTime();
    }
    
    public static boolean isFBARequest(HttpServletRequest request) {
    	String servlet = request.getServletPath();
    	if(servlet != null) {
    		if(servlet.startsWith("/atom/")) {
    			return false;
    		} 
    		if(servlet.startsWith("/atom_form/")) {
    			return true;
    		}
    		if(servlet.startsWith("/json/")) {
    			return !"true".equalsIgnoreCase(request.getParameter("basicAuth"));
    		}
    	}
    	return false;
    }
    
    public static final ThreadLocal isSSLContext = new ThreadLocal() {
        protected synchronized Object initialValue() {
            return Boolean.FALSE;
        }
    };
    
    public static void setSSLContext(boolean b) {
    	isSSLContext.set(b);
    }
    
    public static boolean useSSL() {
    	return (Boolean)isSSLContext.get();
    }
    
    public static boolean isServiceEnabled(String s) {
    	try {
			if (null == vcp) {
				vcp =  VenturaConfigurationProvider.Factory.getInstance();
			}
			return vcp.isServiceEnabled(s);
		} catch (VenturaConfigException e) {
			return false;
		}
    }
    
    public static String getVenturaAppUrl(String app, boolean useSSL) {
        Configuration appConfig = null;
        
        try {        	
        	if (null == vcp) {
	        	try {
	        		vcp =  VenturaConfigurationProvider.Factory.getInstance();
	            } catch (VenturaConfigException vce) {
	            }
        	}
            
            appConfig = vcp.getServiceConfiguration(app);
            
            if (null != appConfig){
                if (useSSL){
                    if (appConfig.getBoolean("[@ssl_enabled]")) {
                        return vcp.getSecureServiceURL(app).toString();
                    } else {
                        return null;
                    }
                } else {
                    if (appConfig.getBoolean("[@enabled]")) {
                        return vcp.getServiceURL(app).toString();
                    } else {
                        return null;
                    }
                }
            }
            
        } catch(Throwable vce) {
        }
        
		return null;
    }
    
    public static String getVenturaAppHrefPathPrefix(String app) {
        try {        	
        	if (null == vcp) {
	        	try {
	        		vcp =  VenturaConfigurationProvider.Factory.getInstance();
	            } catch (VenturaConfigException vce) {
	            }
        	}
        	
        	return vcp.getHrefPathPrefix(app);
        } catch(Throwable vce) {
        }
        
		return null;
    }
    
    public static String getInterServiceUrl(String app) {
    	// RTC 157142 - interservice URL not used
    	// Removed check for MT configuration; 
    	// previously returned service URLs (http / https) if MT configured instead of interservice URL
    	try {
       		return vcp.getInterServiceURL(app).toString();
		} catch (Throwable e) {
		}
		return null;
    }
    
    public static boolean isCrossDomain(String url1, String url2) {
		url1 = url1.trim();
		url2 = url2.trim();
		
		String host1 = null, host2 = null;
		String port1 = null, port2 = null;
		
		if(url1.startsWith("http://")) {
			port1 = "80";
		}
		if(url1.startsWith("https://")) {
			port1 = "443";
		}
		if(url2.startsWith("http://")) {
			port2 = "80";
		}
		if(url2.startsWith("https://")) {
			port2 = "443";
		}
		
		{
			int idx = url1.indexOf("://");
			if(idx == -1) return false;
			url1 = url1.substring(idx + 3);
			idx = url1.indexOf("/");
			if(idx != -1) {
				url1 = url1.substring(0, idx);
			}
			idx = url1.indexOf(":");
			if(idx != -1) {
				host1 = url1.substring(0, idx);
				port1 = url1.substring(idx + 1);
			} else {
				host1 = url1;
			}
		}
		
		{
			int idx = url2.indexOf("://");
			if(idx == -1) return false;
			url2 = url2.substring(idx + 3);
			idx = url2.indexOf("/");
			if(idx != -1) {
				url2 = url2.substring(0, idx);
			}
			idx = url2.indexOf(":");
			if(idx != -1) {
				host2 = url2.substring(0, idx);
				port2 = url2.substring(idx + 1);
			} else {
				host2 = url2;
			}
		}
		
		return !((host1 == host2 || (host1 != null && host1.equalsIgnoreCase(host2))) && (port1 == port2 || (port1 != null && port1.equals(port2))));
	}
    
    public static String getPathInfo(String absoluteUrl, String app) {
    	String ret = null;

    	String relativeToRoot = null;
    	int idx = absoluteUrl.indexOf("://");
		if(idx != -1) {
			relativeToRoot = absoluteUrl.substring(idx + 3);
			idx = relativeToRoot.indexOf("/");
			if(idx != -1) {
				relativeToRoot = relativeToRoot.substring(idx);
			} else {
				relativeToRoot = "/";
			}
		}
		if(relativeToRoot == null) {
			return null;
		}

		boolean b = false;
		String baseUrl = getVenturaAppUrl(app, true);
		if(StringUtils.isNotBlank(baseUrl) && !Utilities.isCrossDomain(baseUrl, absoluteUrl)) {
			b = true;
		}
		if(!b) {
			baseUrl = getVenturaAppUrl(app, false);
			if(StringUtils.isNotBlank(baseUrl) && !Utilities.isCrossDomain(baseUrl, absoluteUrl)) {
				b = true;
			}
		}
		if(!b) {
			return null;
		}

		idx = baseUrl.indexOf("://");
		if(idx != -1) {
			baseUrl = baseUrl.substring(idx + 3);
			idx = baseUrl.indexOf("/");
			if(idx != -1) {
				baseUrl = baseUrl.substring(idx);
			} else {
				baseUrl = "/";
			}
			if(relativeToRoot.startsWith(baseUrl)) {
				ret = relativeToRoot.substring(baseUrl.length());
				if(!ret.startsWith("/")) {
					ret = "/" + ret;
				}
				return ret;
			}
		}

		return null;
	}
    
    /**
     * Check if "Flash" is allowed in Calendar - to turn on/off ACF Flash filter
     * @return
     */
    public static boolean isFlashSupported() {
        if (null == vch) {
        try {           
                vch =  VenturaConfigurationHelper.Factory.getInstance();       
            } catch (VenturaConfigHelperException vce) { 
            }
        }
        List<String> contentList = vch.getSupportedContent();
        Iterator<String> it = contentList.iterator();
        while (it.hasNext()) {
            if ("flash".equals(it.next().toLowerCase(Locale.ENGLISH))) {
                return true;
            }
        }
        return false;
    }
    
    public static boolean isAcfEnabled() {
    	return "true".equals(RuntimeConfiguration.getValue("acf.enabled"));
    }  
    
    public static String escapeHTML(String s) {
        return escapeHTML(s, true);
    }
    
    public static String escapeHTML(String s, boolean escapeAmpersand) {
    	if(s == null) return s;
    	
        // got to do amp's first so we don't double escape
        if (escapeAmpersand) {
            s = StringUtils.replace(s, "&", "&amp;");
        }
        s = StringUtils.replace(s, "&nbsp;", " ");
        s = StringUtils.replace(s, "\"", "&quot;");
        s = StringUtils.replace(s, "<", "&lt;");
        s = StringUtils.replace(s, ">", "&gt;");
        return s;
    }
    
    public static String unescapeHTML(String s) {
        return StringEscapeUtils.unescapeHtml(s);
    }
    
    public static int getMaxUTF8CharCount(String s, int max) {
        int allowed = 0;
        for (int i=0; i<=s.length(); i++){
            try {
                int length = s.substring(0, i).getBytes("utf-8").length;
                if ( length > max){
                    return allowed;
                } else {
                    allowed = i;
                }
            } catch (UnsupportedEncodingException e) {
                return s.length();
            }
       }
        return s.length();
    }
    
    public static String encodeURIComponent(String str) {
        String encodedStr = str;
        try {
        	if (str!=null)
            encodedStr = URLEncoder.encode(str, "UTF-8");
        } catch (UnsupportedEncodingException ex) {
            // ignored
        }
        return encodedStr;
    }
    
    public static List<String> splitStringAsTags(String tags)  {
        String[] tagsarr = StringUtils.split(tags.trim(), " ,\n\r\f\t\u3000");
        if(tagsarr == null)
            return new ArrayList<String>();
        Set<String> tset = new HashSet<String>(Arrays.asList(tagsarr));
        return new ArrayList<String>(tset);
    }
    
    public static String getAtomSvcContext(HttpServletRequest request) {
		return getAtomSvcContext(request.isSecure());
	}
    
    public static String getAtomSvcContext(boolean isSSL) {
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, "getAtomSvcContext", new Object[] { isSSL });
		}

		VenturaConfigurationProvider vcp = null;
		try {
			vcp = VenturaConfigurationProvider.Factory.getInstance();
		} catch (VenturaConfigException vce) {
			LOGGER.throwing(CLASS_NAME, "getAtomSvcContext", vce);
			vce.printStackTrace();
		}

		URL url = null;
		String ret = null;
		String svcKey = "communities";
		String svcEmbeddedContext = RuntimeConfiguration.getValue("module.path");

		if (isSSL) {
			if (vcp != null) {
				try {
					url = vcp.getSecureServiceURL(svcKey);
				} catch (VenturaConfigException e) {
					LOGGER.throwing(CLASS_NAME, "getAtomSvcContext", e);
					e.printStackTrace();
				}
				if (url != null)
					ret = url.toExternalForm() + svcEmbeddedContext;
			}
		} else {
			if (vcp != null) {
				try {
					url = vcp.getServiceURL(svcKey);
				} catch (VenturaConfigException e) {
					LOGGER.throwing(CLASS_NAME, "getAtomSvcContext", e);
					e.printStackTrace();
				}
				if (url != null)
					ret = url.toExternalForm() + svcEmbeddedContext;
			}
		}
		
		if(Boolean.TRUE.equals(RuntimeConfiguration.oauth.get())) {
			if(ret != null) {
				ret = ret + "/oauth";
			}
		}
		
		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, "getAtomSvcContext", ret);
		}
		return ret;
	}
    
    public static String getAtomSvcURL(String type, boolean isSecure, boolean isFBA, Map<String, String> params) {
    	StringBuffer ret = new StringBuffer();
    	if("calendar".equalsIgnoreCase(type)) {
    		ret.append(getAtomSvcContext(isSecure));
    		if(isFBA) {
    			ret.append(AtomConstants.LINK_KEY_FBA_BASE_CALENDAR);
    		} else {
    			ret.append(AtomConstants.LINK_KEY_BASE_CALENDAR);
    		}
    	} else if("event".equalsIgnoreCase(type)) {
    		ret.append(getAtomSvcContext(isSecure));
    		if(isFBA) {
    			ret.append(AtomConstants.LINK_KEY_FBA_BASE_EVENT);
    		} else {
    			ret.append(AtomConstants.LINK_KEY_BASE_EVENT);
    		}
    	} else if("comment".equalsIgnoreCase(type)) {
    		ret.append(getAtomSvcContext(isSecure));
    		if(isFBA) {
    			ret.append(AtomConstants.LINK_KEY_FBA_BASE_COMMENT);
    		} else {
    			ret.append(AtomConstants.LINK_KEY_BASE_COMMENT);
    		}
    	} else if("attendee".equalsIgnoreCase(type)) {
    		ret.append(getAtomSvcContext(isSecure));
    		if(isFBA) {
    			ret.append(AtomConstants.LINK_KEY_FBA_BASE_ATTENDEE);
    		} else {
    			ret.append(AtomConstants.LINK_KEY_BASE_ATTENDEE);
    		}
    	} else if("follow".equalsIgnoreCase(type)) {
    		ret.append(getAtomSvcContext(isSecure));
    		if(isFBA) {
    			ret.append(AtomConstants.LINK_KEY_FBA_BASE_FOLLOW);
    		} else {
    			ret.append(AtomConstants.LINK_KEY_BASE_FOLLOW);
    		}
    	} else if("search".equalsIgnoreCase(type)) {
    		ret.append(getAtomSvcContext(isSecure));
    		if(isFBA) {
    			ret.append(AtomConstants.LINK_KEY_FBA_BASE_SEARCH);
    		} else {
    			ret.append(AtomConstants.LINK_KEY_BASE_SEARCH);
    		}
    	}
    	boolean isFirst = true;
    	for(Iterator<String> iter = params.keySet().iterator(); iter.hasNext(); ) {
    		String key = iter.next();
    		String value = params.get(key);
    		if(value != null) {
    			ret.append(isFirst ? "?" : "&");
	    		ret.append(key).append("=").append(value);
	    		isFirst = false;
    		}
    	}
    	return ret.toString();
    }
    
    public static String getCalendarAtomSvcURL(boolean isSecure, boolean isFBA, String calendarUuid) {
    	Map<String, String> params = new HashMap<String, String>();
    	params.put("calendarUuid", calendarUuid);
    	return getAtomSvcURL("calendar", isSecure, isFBA, params);
    }
    
    public static String getCalendarAtomSvcURL(boolean isSecure, boolean isFBA, String calendarUuid, Map<String, String> params) {
    	params.put("calendarUuid", calendarUuid);
    	return getAtomSvcURL("calendar", isSecure, isFBA, params);
    }
    
    public static String getEventAtomSvcURL(boolean isSecure, boolean isFBA, String calendarUuid, String eventUuid) {
    	Map<String, String> params = new HashMap<String, String>();
    	params.put("calendarUuid", calendarUuid);
    	params.put("eventUuid", eventUuid);
    	return getAtomSvcURL("event", isSecure, isFBA, params);
    }
    
    public static String getEventAtomSvcURL(boolean isSecure, boolean isFBA, String calendarUuid, String eventUuid, Map<String, String> params) {
    	params.put("calendarUuid", calendarUuid);
    	params.put("eventUuid", eventUuid);
    	return getAtomSvcURL("event", isSecure, isFBA, params);
    }
    
    public static String getEventInstanceAtomSvcURL(boolean isSecure, boolean isFBA, String eventInstUuid) {
    	Map<String, String> params = new HashMap<String, String>();
    	params.put("eventInstUuid", eventInstUuid);
    	return getAtomSvcURL("event", isSecure, isFBA, params);
    }
    
    public static String getEventInstanceAtomSvcURL(boolean isSecure, boolean isFBA, String eventInstUuid, Map<String, String> params) {
    	params.put("eventInstUuid", eventInstUuid);
    	return getAtomSvcURL("event", isSecure, isFBA, params);
    }
    
    public static String getCommentAtomSvcURL(boolean isSecure, boolean isFBA, String eventInstUuid, String commentUuid) {
    	Map<String, String> params = new HashMap<String, String>();
    	params.put("eventInstUuid", eventInstUuid);
    	params.put("commentUuid", commentUuid);
    	return getAtomSvcURL("comment", isSecure, isFBA, params);
    }
    
    public static String getCommentAtomSvcURL(boolean isSecure, boolean isFBA, String eventInstUuid, String commentUuid, Map<String, String> params) {
    	if(eventInstUuid != null)
    		params.put("eventInstUuid", eventInstUuid);
    	params.put("commentUuid", commentUuid);
    	return getAtomSvcURL("comment", isSecure, isFBA, params);
    }
    public static String getAttendeeAtomSvcURL(boolean isSecure, boolean isFBA, String eventUuid,String eventInstUuid, String attendeeUuid) {
    	Map<String, String> params = new HashMap<String, String>();
    	params.put("eventUuid", eventUuid);
    	params.put("eventInstUuid", eventInstUuid);
    	params.put("attendeeUuid", attendeeUuid);
    	return getAtomSvcURL("attendee", isSecure, isFBA, params);
    }

    
    public static String getAttendeeAtomSvcURL(boolean isSecure, boolean isFBA, String eventUuid, String eventInstUuid,String attendeeUuid, Map<String, String> params) {
    	params.put("eventUuid", eventUuid);
    	params.put("eventInstUuid", eventInstUuid);
    	params.put("attendeeUuid", attendeeUuid);
    	return getAtomSvcURL("attendee", isSecure, isFBA, params);
    }

    public static String getTagCloudAtomSvcURL(boolean isSecure, boolean isFBA, String calendarUuid) {
    	StringBuffer ret = new StringBuffer();
    	ret.append(getAtomSvcContext(isSecure));
		if(isFBA) {
			ret.append("/atom_form/tagcloud");
		} else {
			ret.append("/atom/tagcloud");
		}
		ret.append("?");
		ret.append("calendarUuid=").append(calendarUuid);
		return ret.toString();
    }
    
    public static String getCalendarHtmlURL(boolean isSecure, DBCalendar calendar, Map<String, String> params) {
    	if(params == null) {
    		params = new HashMap<String, String>();
    	}
    	
    	StringBuffer ret = new StringBuffer();
    	ret.append(getVenturaAppUrl("communities", isSecure));
    	ret.append("/service/html/communityview?communityUuid=").append(calendar.getCommunity_UUID());
    	ret.append("#fullpageWidgetId=").append(calendar.getWidgetId());
    	for(Iterator<String> iter = params.keySet().iterator(); iter.hasNext(); ) {
    		String key = iter.next();
    		String value = params.get(key);
    		if(value != null) {
    			ret.append("&");
	    		ret.append(key).append("=").append(value);
    		}
    	}
    	return ret.toString();
    }
    
    public static boolean isEmailExposed() {
		String method = "isEmailExposed";

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.entering(CLASS_NAME, method);
		}

		Configuration lotusConnectionsConfig;

		boolean isExposed = true;

		try {
			lotusConnectionsConfig = VenturaConfigurationProvider.Factory.getInstance().getGlobalConfiguration();
			isExposed = lotusConnectionsConfig.getBoolean("exposeEmail[@enabled]", true);
		} catch (VenturaConfigException ex) {
			if (LOGGER.isLoggable(Level.FINER)) {
				LOGGER.throwing(CLASS_NAME, method, ex);
			}

			throw new RuntimeException(ex);
		}

		if (LOGGER.isLoggable(Level.FINER)) {
			LOGGER.exiting(CLASS_NAME, method);
		}

		return isExposed;
	}
    
    public static String purgeHTMLTag(String content){
    	int i  = content.lastIndexOf('>');
    	if(i != -1) {
    		String front = content.substring(0, i);
    		String end = content.substring(i);
    	
    		return front + end.replaceAll("<", "&lt;");
    	}
    	
    	return content.replaceAll("<", "&lt;");
    }
    
    public static String[] __TIMEZONE_LIST = RuntimeConfiguration.getValue("timezone").split(",");
    public static final Map<String, Integer> __TIMEZONE_IDX_MAP = new HashMap<String, Integer>();
    static {
    	for(int i = 0; i < __TIMEZONE_LIST.length; i++) {
    		__TIMEZONE_IDX_MAP.put(__TIMEZONE_LIST[i], i);
    	}
    }
    
    private static LRUCache normalizedTimeZoneCache = new LRUCache(1000);
    public static TimeZone getNormalizedTimeZone(int rawOffset, Date daylightTimeStart, Date daylightTimeEnd) {
    	String key = Integer.toString(rawOffset) + ":" + Long.toString(daylightTimeStart.getTime()) + ":" + Long.toString(daylightTimeEnd.getTime());
    	
    	LRUCache.CachedData cache = normalizedTimeZoneCache.get(key);
    	if(cache != null) {
    		String timezoneID = (String)cache.getData();
    		if(timezoneID != null) {
        		return TimeZone.getTimeZone(timezoneID);
        	}
    	}
    	
    	List<String> timezoneCheckList = new ArrayList<String>();
    	
    	String[] timezones = TimeZone.getAvailableIDs(rawOffset);
    	for(int i = 0; i < timezones.length; i++) {
    		if(__TIMEZONE_IDX_MAP.keySet().contains(timezones[i])) 
    			timezoneCheckList.add(timezones[i]);
    	}
    	timezoneCheckList.addAll(Arrays.asList(__TIMEZONE_LIST));

    	for(Iterator<String> iter = timezoneCheckList.iterator(); iter.hasNext(); ) {
    		String id = iter.next();
    		
    		TimeZone timezone = TimeZone.getTimeZone(id);
    		if(!timezone.useDaylightTime()) 
    			continue;
    		if(!timezone.inDaylightTime(daylightTimeStart))
    			continue;
    		if(timezone.inDaylightTime(new Date(daylightTimeStart.getTime() - Utilities.ONE_DAY)))
    			continue;
    		if(timezone.inDaylightTime(daylightTimeEnd))
    			continue;
    		if(!timezone.inDaylightTime(new Date(daylightTimeEnd.getTime() - Utilities.ONE_DAY)))
    			continue;
    		
    		//workaround for OCS 171542	Recurring community events showing with incorrect time in calendar view
    		if("Africa/Casablanca".equals(id)){
    			normalizedTimeZoneCache.set(key, "Europe/Dublin");
        		return TimeZone.getTimeZone("Europe/Dublin");
    		}
    		
    		normalizedTimeZoneCache.set(key, id);
    		return timezone;
    	}
    	
    	return null;
    }
    
    public static String generateEventUUID(TimeZone timezone) {
    	String s = UUID.randomUUID().toString();
    	if(timezone != null) {
    		String timezoneID = timezone.getID();
    		
    		if(__TIMEZONE_IDX_MAP.keySet().contains(timezoneID)) {
    			s = s.replace("-", "") + "-";
    			
	    		String timezoneIdx = Integer.toHexString(__TIMEZONE_IDX_MAP.get(timezoneID));
	    		for(int i = 0; i < 3 - timezoneIdx.length(); i++) {
	    			s = s + "0";
	    		}
    			s = s + timezoneIdx;
    		}
    	}
    	return s;
    }
    
    public static TimeZone parseTimezoneInfoFromEventUUID(String uuid) {
    	if(uuid.charAt(32) != '-') return null;
    	String idx = uuid.substring(33);
    	while(idx.startsWith("0") && idx.length() > 1) {
    		idx = idx.substring(1);
    	}
    	String timezoneID = __TIMEZONE_LIST[Integer.parseInt(idx, 16)];
    	if(timezoneID == null) return null;
    	return TimeZone.getTimeZone(timezoneID);
    }
    
    public static boolean isLotusLiveEnabled() {
    	if (null == vch) {
            try {           
                vch =  VenturaConfigurationHelper.Factory.getInstance();       
            } catch (VenturaConfigHelperException vce) { 
            }
        }
    	
    	Properties properties = VenturaConfigurationHelper.Factory.getInstance().getGenericProperties();
    	if (!properties.isEmpty()) {
            String property = properties.getProperty("LotusLive");
            if (null != property) {
            	return Boolean.parseBoolean(property);
            }
        }
    	
    	return false;
    }
    
    public static Calendar parseCalendar(String text) {
		// parse the date value
		Date date = AtomDate.parse(text);
		
		// parse the timezone info, and create icu Calendar object accordingly
		Calendar c = null;
		if (text.endsWith("Z")) {
			c = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
		} else {
			String t = text.substring(text.length() - 6);
			c = Calendar.getInstance(TimeZone.getTimeZone("GMT" + t));
		}
		c.setTime(alignToSecond(date));
		
		return c;
	}
    
    public static boolean isRepeatByDate(int mask){

    	return mask>>7 == 1;
    }
    
    public static int getNthWeekOfMonth(int mask){
    	
    	return mask >>3 ;
    }
    
    public static int getNthDayOfWeek(int mask){
    	
    	return mask & 7 ;
    }
    public static int getNthDayInMonth(int mask){
    	
    	return mask & 0x1f ;
    }
    
    public static boolean isInRange(Date date, Calendar rstart, Calendar rend) {
    	return isInRange(date, rstart == null ? null : rstart.getTime(), rend == null ? null : rend.getTime());
    }
    
    public static boolean isInRange(Date date, Date rstart, Date rend) {
    	if(rstart != null && date.getTime() < rstart.getTime()) {
    		return false;
    	}
    	if(rend != null && date.getTime() > rend.getTime()) {
    		return false;
    	}
    	return true;
    }
    
    public static boolean isMultitenantConfigEnabled() {
        try {
        	VenturaConfigurationProvider vcp =  VenturaConfigurationProvider.Factory.getInstance();
        	if (vcp != null) {
        		return vcp.isMultiTenantConfigEngineEnabled();
        	}
		} catch (Exception ex) {
		}
		return false;
    }
	
	
	public static boolean areVanityURLsEnabled(ServletRequest request) {
	    PatternResolver resolver = PatternResolver.getServicePattern("webresources", request.isSecure());
	    if (resolver != null) {
	    	return true;
	    } else {
	    	return false;
	    }
	}
	
	public static List<DBUser> parseMentionedPeople(String content) {
    	if(content == null) {
    		return new ArrayList<DBUser>();
    	}
    	
    	CalendarService cs = CalendarServiceFactory.INSTANCE.create();
    	
    	List<DBUser> l = new ArrayList<DBUser>();
    	for(String uid : parseMentionedPeopleIds(content)) {
    		try {
	    		DBUser usr = UserUtilities.findUserByExtId(uid, true);
	    		if(usr != null) {
				    l.add(usr);
	    		}
    		} catch(Exception ex) {
			}
    	}
		return l;
    }
	
	public static List<String> parseMentionedPeopleIds(String content) {
    	if(content == null) {
    		return new ArrayList<String>();
    	}
    	
    	List<String> l = new ArrayList<String>();
		Matcher m = Utilities.VCARD_PATTERN.matcher(content);
		int idx = 0;
		while(m.find(idx)) {
			String uid = m.group(2);
			l.add(uid);
			idx = m.end();
		}
		return l;
    }
	
	protected static PermissionHelper permissionHelper = null;
	
	static {
		try {
			permissionHelper = new PermissionHelper();
		} catch (DSProviderException e) {
			permissionHelper = null;
		}
	}
	
	public static boolean checkAccess(DBUser user, DBCalendar calendar) {
		return Utilities.checkAccess(user, calendar, true);
	}
	
	public static boolean checkAccess(DBUser user, DBCalendar calendar, boolean useCache) {
		if(calendar.getVisibility() == DBCalendar.PUBLIC) {
			if(RuntimeConfiguration.isVisitorModeEnabled() && user != null){
				HighwayConfig config = user.getHighwayConfig();
				if(config!=null && !config.allowPublicCommunities() && config.isExternalUser()){
					return false;
				}
			}
			if(!Utilities.isMultitenancyContext(calendar.getORG_ID())) {
				return true;
			} else {
				if(user == null) {
					return false;
				} else if(Utilities.isSameOrganization(calendar.getORG_ID(), user.getORG_ID())) {
					return true;
				}
			}
		}
		
		// check member permission
		
		if(permissionHelper == null) {
			return false;
		}
		
		try {
			new MemberPermissionSynchronizer().execute(user, !useCache, calendar.getCommunity_UUID());
		} catch(Exception ex) {
			// ignore
		}
		
		try {
			if(permissionHelper.getRole(user, calendar.getCommunity_UUID()) == 0) {
				// user do not has permission
				return false;
			}
		} catch(Exception ex) {
			return false;
		}
		
		return true;
	}
	
	public static boolean isMultitenancyContext(String orgId) {
		return !StringUtils.isBlank(orgId) && !ExecutionContext.DEFAULT_ORG_ID.equals(orgId);
	}
	
	public static boolean isSameOrganization(String orgId1, String orgId2) {
		if(isMultitenancyContext(orgId1) && isMultitenancyContext(orgId2) && orgId1.equals(orgId2)) {
			return true;
		}
		if(!isMultitenancyContext(orgId1) && !isMultitenancyContext(orgId2)) {
			return true;
		}
		return false;
	}
	
	public static String normalizeTenantKey(String s) {
    	if(StringUtils.isBlank(s)) {
    		return ExecutionContext.DEFAULT_ORG_ID;
    	} else {
    		return s.trim();
    	}
    }
	
	public static HighwayConfig getUserHighwayConfig(String userExtId, String userOrgId) {
		if(!RuntimeConfiguration.isVisitorModeEnabled())
			return null;
		
		try {
	        return new HighwayConfig(userExtId, userOrgId);
        } catch (Exception e) {
        	if (LOGGER.isLoggable(Level.FINER)) {
				LOGGER.entering(CLASS_NAME, "getUserHighwayConfig", new Object[] { e });
			}
			return null;
        }
	}
    
	public static int mod(int a, int b){
		
		return  a - ((int)Math.floor(1.0*a/b))*b;
		
	}
    public static void main(String[] args) {
    	
    }
}
