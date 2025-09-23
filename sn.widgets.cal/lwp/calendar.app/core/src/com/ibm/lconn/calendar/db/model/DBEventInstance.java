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

import java.util.Comparator;
import java.util.Date;
import java.util.List;

import com.ibm.icu.util.Calendar;
import com.ibm.icu.util.TimeZone;
import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.util.Utilities;

/**
 * @author skomard
 */

public class DBEventInstance extends MultitenancyPersistentObject {
	
	// Attributes
	private String eventInst_UUID = null;
	private String calendar_UUID = null;
	private String event_UUID = null;
	private String eventInfo_UUID = null;
	private Date startDate = null;
	private Date endDate = null;
	
	private String 	modifiedBy = null;
	private Date 	modifiedOn = null;
	private Date 	dbModifiedOn = null;
	
	private DBEventInfo eventInfo = null;
	private DBEvent 	event = null;
	
	private List<DBEventComment> comments = null;
	
	// Default Constructor
	public DBEventInstance() {
		
	}
	
	// Accessors and Mutators
	
	/**
	 * @param eventInst_UUID the eventInst_UUID to set
	 */
	public void setEventInst_UUID(String eventInst_UUID) {
		this.eventInst_UUID = eventInst_UUID;
	}

	/**
	 * @return the eventInst_UUID
	 */
	public String getEventInst_UUID() {
		return eventInst_UUID;
	}
	
	/**
	 * @param calendar_UUID the calendar_UUID to set
	 */
	public void setCalendar_UUID(String calendar_UUID) {
		this.calendar_UUID = calendar_UUID;
	}

	/**
	 * @return the calendar_UUID
	 */
	public String getCalendar_UUID() {
		return calendar_UUID;
	}

	/**
	 * @param event_UUID the event_UUID to set
	 */
	public void setEvent_UUID(String event_UUID) {
		this.event_UUID = event_UUID;
		if(this.event != null) {
			if(this.event_UUID == null || !this.event_UUID.equals(this.event.getEvent_UUID())) {
				this.event = null;
			}
		}
	}

	/**
	 * @return the event_UUID
	 */
	public String getEvent_UUID() {
		return event_UUID;
	}

	/**
	 * @param eventInfo_UUID the eventInfo_UUID to set
	 */
	protected void setEventInfo_UUID(String eventInfo_UUID) {
		this.eventInfo_UUID = eventInfo_UUID;
	}

	/**
	 * @return the eventInfo_UUID
	 */
	public String getEventInfo_UUID() {
		return eventInfo_UUID;
	}

	/**
	 * @param startDate the startDate to set
	 */
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
		if(this.startDate != null) {
			this.startDate = new Date(this.startDate.getTime() - this.startDate.getTime() % 1000);
		}
	}

	/**
	 * @return the startDate
	 */
	public Date getStartDate() {
		return startDate;
	}
	
	/**
	 * @param endDate the endDate to set
	 */
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
		if(this.endDate != null) {
			this.endDate = new Date(this.endDate.getTime() - this.endDate.getTime() % 1000);
		}
	}

	/**
	 * @return the endDate
	 */
	public Date getEndDate() {
		return endDate;
	}
	
	public String getModifiedBy() {
		return modifiedBy;
	}
	
	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}
	
	public Date getModifiedOn() {
		return modifiedOn;
	}
	
	public Date getDbModifiedOn() {
		return dbModifiedOn;
	}

	public void setDbModifiedOn(Date dbModifiedOn) {
		this.dbModifiedOn = dbModifiedOn;
	}
	
	public void setModifiedOn(Date modifiedOn) {
		this.modifiedOn = modifiedOn;
		if(this.modifiedOn != null) {
			this.modifiedOn = new Date(this.modifiedOn.getTime() - this.modifiedOn.getTime() % 1000);
		}
	}

	/**
	 * @param eventInfo the eventInfo to set
	 */
	public void setEventInfo(DBEventInfo eventInfo) {
		this.eventInfo = eventInfo;
		this.eventInfo_UUID = null;
		
		if(this.eventInfo != null) {
			this.eventInfo_UUID = this.eventInfo.getEventInfo_UUID();
		}
	}

	/**
	 * @return the eventInfo
	 */
	public DBEventInfo getEventInfo() {
		if(this.eventInfo == null) {
			if(getEventInfo_UUID() == null) {
				return null;
			}
			CalendarService cs = CalendarServiceFactory.INSTANCE.create();
			this.eventInfo = cs.getEventInfoDao().getEventInfo(getEventInfo_UUID());
		}
		return this.eventInfo;
	}
	
	/**
	 * @param eventInfo the eventInfo to set
	 */
	public void setEvent(DBEvent event) {
		this.event = event;
		this.event_UUID = null;
		
		if(this.event != null) {
			this.event_UUID = this.event.getEvent_UUID();
		}
	}
	
	/**
	 * @return the event
	 */
	public DBEvent getEvent() {
		if(this.event == null) {
			if(getEvent_UUID() == null) {
				return null;
			}
			CalendarService cs = CalendarServiceFactory.INSTANCE.create();
			this.event = cs.getEventDAO().getEvent(getEvent_UUID());
		}
		return this.event;
	}
	
	public int getCommentsCount() {
		if(this.comments == null) {
			return CalendarServiceFactory.INSTANCE.create().getEventCommentDao().getCommentCountOfEventInstance(getEventInst_UUID());
		} else {
			return this.comments.size();
		}
	}
	
	public List<DBEventComment> getComments() {
		if(this.comments == null) {
			this.comments = CalendarServiceFactory.INSTANCE.create().getEventCommentDao().getCommentsOfEventInstance(getEventInst_UUID(), 0, -1);
		}
		return this.comments;
	}
	
	public void setComments(List<DBEventComment> comments) {
		this.comments = comments;
	}
	
	// convenient methods
	public boolean update(DBEventInstance instance) {
		boolean ret = false;
		if(instance.getStartDate() != null && !instance.getStartDate().equals(this.getStartDate())) {
			this.setStartDate(instance.getStartDate());
			ret = true;
		}
		if(instance.getEndDate() != null && !instance.getEndDate().equals(this.getEndDate())) {
			this.setEndDate(instance.getEndDate());
			ret = true;
		}
		return ret;
	}
	
	// for performance, only used in DAO
	private int __parentCollectionSize = -1;
	
	public int getParentCollectionSize() {
		return this.__parentCollectionSize;
	}
	
	public void setParentCollectionSize(int n) {
		this.__parentCollectionSize = n;
	}
	
	public boolean getIsAllDay() {
		if(getEndDate().getTime() - getStartDate().getTime() != Utilities.ONE_DAY) {
			return false;
		}
		if(getEventInfo() != null && getEventInfo().getIsAllDay() != null) {
			if(getEventInfo().getIsAllDay()) {
				return true;
			}
		} else if(getEvent().getEventInfo() != null && getEvent().getEventInfo().getIsAllDay() != null){
			if(getEvent().getEventInfo().getIsAllDay()) {
				return true;
			}
		}
		return false;
	}
	
	// comparators
	public static class ComparatorByStartDate implements Comparator<DBEventInstance> {
		private TimeZone timezone = null;
		private boolean asc = true;
		private static final TimeZone UTC = TimeZone.getTimeZone("UTC");
		
		public ComparatorByStartDate(TimeZone timezone, boolean asc) {
			this.timezone = timezone;
			this.asc = asc;
		}
		
		private Date fromUCT0toLocal0(Date t){
			Calendar c = Calendar.getInstance(timezone);
			Calendar cutc = Calendar.getInstance(UTC);
			cutc.setTime(t);
			c.set(Calendar.YEAR, cutc.get(Calendar.YEAR));
			c.set(Calendar.DAY_OF_YEAR, cutc.get(Calendar.DAY_OF_YEAR));
			c.set(Calendar.HOUR_OF_DAY, 0);
			c.set(Calendar.MINUTE, 0);
			c.set(Calendar.SECOND, 0);
			c.set(Calendar.MILLISECOND,0);
			return c.getTime();
		}
		
		public int compare(DBEventInstance object1, DBEventInstance object2) {
			int r = compare_(object1,object2);
			return asc?r:-r;
		}
		
		private int compare_(DBEventInstance object1, DBEventInstance object2) {
			Date t1 = object1.getStartDate(), t2 = object2.getStartDate();
			boolean o1IsAllday = object1.getIsAllDay();
			boolean o2IsAllday = object2.getIsAllDay();
			if(o1IsAllday) {
				t1 = fromUCT0toLocal0(t1);
			}
			if(o2IsAllday) {
				t2 = fromUCT0toLocal0(t2);
			}
			int t = t1.compareTo(t2);
			if (t == 0){
				if ( o1IsAllday){
					if( o2IsAllday){
						return object1.getEventInst_UUID().compareTo(object2.getEventInst_UUID());
					}else {
						return -1;
					}
				}else if ( o2IsAllday){
					return 1;
				}else {
					int tt = object1.getEndDate().compareTo(object2.getEndDate());
					if (tt == 0 ){
						return object1.getEventInst_UUID().compareTo(object2.getEventInst_UUID());
					}
					return tt;
				}
			}
			return t;
		}
	}
}
