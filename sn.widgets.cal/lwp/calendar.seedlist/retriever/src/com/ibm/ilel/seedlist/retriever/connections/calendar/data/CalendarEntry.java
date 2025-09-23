/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.ilel.seedlist.retriever.connections.calendar.data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CalendarEntry {
    private static String EVENT_ENTRY_TYPE = "application/event";
    
    private String id = null;
    private String title = null;
    
    private Date publishDate = null;
    private Date lastModifiedDate = null;
    
    private String url = null;
    
    private String content = null;
    
    private User author = null;
    
    private boolean isDeleted = false;
    
    private String location = null;
    private String[] tags = new String[0];
    private boolean isAllDay = false;
    private boolean isRepeating = false;
    private boolean isPublic = true;
    
    private String parentCommunityUID = null;
    private String parentEventID = null;
    private String parentEventURL = null;
    private String orgId;
    
    private List<Period> instances = new ArrayList<Period>();
    
    private List<Comment> comments = new ArrayList<Comment>();
    
	public CalendarEntry() {}
	
	public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    
    public Date getPublishDate() {
		return publishDate;
	}

	public void setPublishDate(Date publishDate) {
		this.publishDate = publishDate;
	}
	
	public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }
    
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
    
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
    
    public User getAuthor() {
    	return this.author;
    }
    
    public void setAuthor(User author) {
    	this.author = author;
    }
    
    public void setAuthor(String extid, String name, String email) {
    	this.author = new User(extid, email, name);
    }
    
    public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	
	public String getLocation() {
		return location;
	}
	
	public void setLocation(String location) {
		this.location = location;
	}
	
	public String[] getTags() {
        return tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }
    
    public boolean isAllDay() {
    	return isAllDay;
    }
    
    public void setAllDay(boolean allday) {
    	this.isAllDay = allday;
    }
    
    public boolean isRepeating() {
    	return isRepeating;
    }
    
    public void setRepeating(boolean isRepeating) {
    	this.isRepeating = isRepeating;
    }
    
    public boolean isPublic() {
    	return isPublic;
    }
    
    public void setPublic(boolean isPublic) {
    	this.isPublic = isPublic;
    }

	public String getParentCommunityUID() {
		return parentCommunityUID;
	}

	public void setParentCommunityUID(String parentCommunityUID) {
		this.parentCommunityUID = parentCommunityUID;
	}
	
	public String getParentEventID() {
		return this.parentEventID;
	}
	
	public void setParentEventID(String parentEventID) {
		this.parentEventID = parentEventID;
	}
	
	public String getParentEventURL() {
		return this.parentEventURL;
	}
	
	public void setParentEventURL(String parentEventURL) {
		this.parentEventURL = parentEventURL;
	}
	
	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public List<Period> getInstances() {
		return this.instances;
	}
	
	public void addInstance(Date startDate, Date endDate) {
		this.instances.add(new Period(startDate, endDate));
	}

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

	public void addComment(String id, String url, String text, Date date, User author) {
		this.comments.add(new Comment(id, url, text, date, author));
	}
	
	public String getType() {
		return EVENT_ENTRY_TYPE;
	}
	
	public String toString() {
        StringBuffer tags = new StringBuffer();
        if (getTags() != null) {
            for (String tag : getTags()) {
                tags.append(tag);
                tags.append("#");
            }
        }
        
        String entry = "Event Entry: id=" + getId() +
                ", url=" + getUrl() +
                ", authorName=" + getAuthor().getName() + 
                ", authorEmail=" + getAuthor().getEmail() +
                ", authorUUID=" + getAuthor().getExtID() +
                ", lastModifiedDate=" + getLastModifiedDate() +             
                ", title=" + getTitle() +
                ", content=" + getContent() +
                ", tags=" + tags;                

        return entry; 
    }
	
	public static class Comment {
    	private String id = null;
    	private String url = null;
        private String text = null;
        private Date date = null;
        private User author = null;
        
        
        public Comment(String id, String url, String text, Date date, User author) {
            this.id = id;
            this.url = url;
        	this.text = text;
            this.date = date;
            this.author = author;
        }

    	public String getId() {
    		return id;
    	}
    	public String getUrl() {
    		return url;
    	}
    	public String getText() {
            return text;
        }
    	public Date getDate() {
    		return date;
    	}
        public User getAuthor() {
            return author;
        }
    }
	
	public static class Period {
		private Date startDate = null;
		private Date endDate = null;
		
		public Period(Date startDate, Date endDate) {
			this.startDate = startDate;
			this.endDate = endDate;
		}
		
		public Date getStartDate() {
			return this.startDate;
		}
		
		public Date getEndDate() {
			return this.endDate;
		}
	}
}
