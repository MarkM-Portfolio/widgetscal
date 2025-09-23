/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.exception;

import java.text.MessageFormat;
import java.util.Locale;

import com.ibm.lconn.calendar.util.ResourceBundleUtils;


/**
 * @author skomard
 */

public class CalendarException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	private Integer code = null;
	private Throwable exceptionCause = null;
	
	private String messageKey = null;
	private Object[] messageArgs = null;
	
    public CalendarException() {
        super();
    }

    public CalendarException(String key) {
        super(ResourceBundleUtils.getMessageBundle().getString(key));
        
        this.messageKey = key;
    }
    
    public CalendarException(String key, Object[] args) {
        super(MessageFormat.format(ResourceBundleUtils.getMessageBundle().getString(key), args));
        
        this.messageKey = key;
        this.messageArgs = args;
    }

    public CalendarException(Throwable t) {
        super(t);
        setExceptionCause(t);
    }

    public CalendarException(String key, Object[] args, Throwable t) {
        super(MessageFormat.format(ResourceBundleUtils.getMessageBundle().getString(key), args), t);
        setExceptionCause(t);
        
        this.messageKey = key;
        this.messageArgs = args;
    }
    
    public CalendarException(String key, Object[] args, Throwable t, Integer code) {
        super(MessageFormat.format(ResourceBundleUtils.getMessageBundle().getString(key), args), t);
		setCode(code);
		setExceptionCause(t);
		
		this.messageKey = key;
        this.messageArgs = args;
    }
    
    public CalendarException(String key, Object[] args, Integer code) {
        super(MessageFormat.format(ResourceBundleUtils.getMessageBundle().getString(key), args));
		setCode(code);
		
		this.messageKey = key;
        this.messageArgs = args;
    }
    
	/**
	 * @param code the code to set
	 */
	public void setCode(Integer code) {
		this.code = code;
	}

	/**
	 * @return the code
	 */
	public Integer getCode() {
		return code;
	}

	/**
	 * @param exceptionCause the exceptionCause to set
	 */
	public void setExceptionCause(Throwable exceptionCause) {
		this.exceptionCause = exceptionCause;
	}

	/**
	 * @return the exceptionCause
	 */
	public Throwable getExceptionCause() {
		return exceptionCause;
	}
	
	public String getLocalizedMessage(Locale locale) {
		if(this.messageKey == null) {
			return getLocalizedMessage();
		} else {
			if(messageArgs == null) {
				return ResourceBundleUtils.getMessageBundle(locale).getString(messageKey);
			} else {
				return MessageFormat.format(ResourceBundleUtils.getMessageBundle(locale).getString(messageKey), messageArgs);
			}
		}
	}
}