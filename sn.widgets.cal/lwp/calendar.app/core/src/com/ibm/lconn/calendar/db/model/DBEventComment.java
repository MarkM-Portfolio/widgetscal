/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.model;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.util.MentionHelper;
import com.ibm.lconn.calendar.util.TextProcessor;
import com.ibm.lconn.calendar.util.Utilities;

/**
 * @author administrator
 *
 */
public class DBEventComment extends MultitenancyPersistentObject {
	public static final int CONTENT_TYPE_MIXED = 1;
    public static final int CONTENT_TYPE_PLAIN_TEXT = 2;
    public static final int CONTENT_TYPE_HTML = 3;
	
	private static class CommentContent {
		String dirtyData = null;
    	int dirtyDataContentType = CONTENT_TYPE_PLAIN_TEXT;
    	
    	MentionHelper.Content data = new MentionHelper.Content();
    	int contentType = CONTENT_TYPE_HTML;
    }

	private String comment_UUID;
	private String calendar_UUID;
	private String eventInst_UUID;
	private String createdBy;
	private Date createOn;
	private CommentContent content = new CommentContent();
	
	public String getComment_UUID() {
		return comment_UUID;
	}
	public void setComment_UUID(String comment_UUID) {
		this.comment_UUID = comment_UUID;
	}
	
	public String getCalendar_UUID() {
		return calendar_UUID;
	}
	public void setCalendar_UUID(String calendar_UUID) {
		this.calendar_UUID = calendar_UUID;
	}
	
	public String getEvent_UUID() {
		return eventInst_UUID;
	}
	public void setEvent_UUID(String eventInst_UUID) {
		this.eventInst_UUID = eventInst_UUID;
	}
	
	public String getEventInst_UUID() {
		return eventInst_UUID;
	}
	public void setEventInst_UUID(String eventInst_UUID) {
		this.eventInst_UUID = eventInst_UUID;
	}
	
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	
	public Date getCreateOn() {
		return createOn;
	}
	public void setCreateOn(Date createOn) {
		this.createOn = createOn;
	}
	
	public int getContentType() {
    	return this.content.contentType;
    }
    
    public void setContentType(int contentType) {
        this.content.contentType = contentType;
    }
    
    public String getRenderedContentForAS() {
    	if(getContentType() == DBEventComment.CONTENT_TYPE_PLAIN_TEXT) {
    		return this.content.data.getText(MentionHelper.NEWS_MENTION_FORMATTER, TextProcessor.TEXT_2_HTML);
		} else {
			return this.content.data.getText(MentionHelper.NEWS_MENTION_FORMATTER, TextProcessor.NOP);
		}
    }
	
    public String getRenderedContent(int targetContentType) {
    	if(getContentType() == DBEventComment.CONTENT_TYPE_PLAIN_TEXT) {
    		if(targetContentType == DBEventComment.CONTENT_TYPE_PLAIN_TEXT) {
    			return this.content.data.getText(MentionHelper.PLAIN_TEXT_MENTION_FORMATTER, TextProcessor.NOP);
    		} else {
    			return this.content.data.getText(MentionHelper.HTML_MENTION_FORMATTER, TextProcessor.TEXT_2_HTML);
    		}
		} else {
			if(targetContentType == DBEventComment.CONTENT_TYPE_PLAIN_TEXT) {
    			return this.content.data.getText(MentionHelper.PLAIN_TEXT_MENTION_FORMATTER, TextProcessor.HTML_2_TEXT);
    		} else {
    			return this.content.data.getText(MentionHelper.HTML_MENTION_FORMATTER, TextProcessor.NOP);
    		}
		}
    }
    
    public String getContentForBeforePersistentProcessing() {
    	if(this.content.dirtyData != null) {
    		return this.content.dirtyData;
    	} else {
    		return this.content.data.getText(MentionHelper.MICROFORMAT_MENTION_FORMATTER, TextProcessor.NOP);
    	}
    }
    
    public int getContentTypeForBeforePersistentProcessing() {
    	if(this.content.dirtyData != null) {
    		return this.content.dirtyDataContentType;
    	} else {
    		return this.content.contentType;
    	}
    }
    
    public String getContentForEditing(int targetContentType) {
    	if(getContentType() == DBEventComment.CONTENT_TYPE_PLAIN_TEXT) {
    		if(targetContentType == DBEventComment.CONTENT_TYPE_PLAIN_TEXT) {
    			return this.content.data.getText(MentionHelper.MICROFORMAT_MENTION_FORMATTER, TextProcessor.NOP);
    		} else {
    			return this.content.data.getText(MentionHelper.MICROFORMAT_MENTION_FORMATTER, TextProcessor.TEXT_2_HTML);
    		}
		} else {
			if(targetContentType == DBEventComment.CONTENT_TYPE_PLAIN_TEXT) {
    			return this.content.data.getText(MentionHelper.MICROFORMAT_MENTION_FORMATTER, TextProcessor.HTML_2_TEXT);
    		} else {
    			return this.content.data.getText(MentionHelper.MICROFORMAT_MENTION_FORMATTER, TextProcessor.NOP);
    		}
		}
    }
    
  /*  public void setContent(String content, int contentType) {
    	if (content != null && content.length() == 0) {
        	content = " ";
        	this.content.dirtyData = StringUtils.left(content, Utilities.getMaxUTF8CharCount(content, 100000));
        }
		this.content.dirtyDataContentType = contentType;
    }
    */
    
    public void setContent(String content, int contentType) {
    	if (content != null && content.length() == 0) {
        	content = " ";
        }
    	this.content.dirtyData = StringUtils.left(content, Utilities.getMaxUTF8CharCount(content, 100000));
		this.content.dirtyDataContentType = contentType;
    }
    
    public String getContentForPersistent() {
    	return this.content.data.toString();
    }
    
    public void setContentForPersistent(String contentForPersistent) {
    	if(contentForPersistent == null)
    		contentForPersistent = "";
    	this.content.data.parse(contentForPersistent);
    }
    
    public List<MentionHelper.MentionRecord> getMentionedPeople() {
    	return this.content.data.getMentionedPeople();
	}
    
    public List<MentionHelper.MentionRecord> getRecentMentionedPeople() {
    	return this.content.data.getRecentMentionedPeople();
	}
    
    public void prepareForPersistent() {
    	if(this.content.dirtyData != null) {
    		this.content.data.setText(this.content.dirtyData, (this.content.dirtyDataContentType == CONTENT_TYPE_PLAIN_TEXT ? TextProcessor.TEXT_2_HTML : TextProcessor.STRIP_UNSUPPORTED_HTML_TAGS));
    		this.content.dirtyData = null;
    		
    		DBCalendar calendar = CalendarServiceFactory.INSTANCE.create().getCalendarDAO().getCalendar(this.getCalendar_UUID());
    		this.content.data.checkPermission(calendar);
    	}
    }
    
    public void refreshNotifiedMeta() {
		this.content.data.refreshNotifiedMeta();
	}
}
