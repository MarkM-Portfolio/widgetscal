/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.ilel.seedlist.retriever.connections.calendar;

import java.util.Date;

import com.ibm.ilel.seedlist.SeedlistException;
import com.ibm.ilel.seedlist.common.State;
import com.ibm.ilel.seedlist.imp.StateImp;
import com.ibm.ilel.seedlist.retriever.connections.common.IConnectionsState;
import com.ibm.lconn.core.util.ResourceBundleHelper;

public class CalendarState implements IConnectionsState {
	public static int CALENDAR_EVENTS = 0;
	public static int CALENDAR_ACLS = 1;
	public static int CALENDAR_COMMENTS = 2;

	private static String SEPARATOR = ";";

	private Date finishDate = new Date();
	private Date startDate = new Date(0L);
	private int aclStart = 0;
	private int commentStart = 0;
	private int offset = 0;

	private int type = CALENDAR_EVENTS;
	private Date lastModified = new Date(0L);

	private boolean finished = false;
	private boolean lastModifiedChanged = true;

	public CalendarState() {
		this.finishDate = new Date();
		this.startDate = new Date(0L);
		this.type = CALENDAR_EVENTS;
		this.lastModified = this.startDate;
	}

	public CalendarState(Date paramDate) throws SeedlistException {
		this.startDate = paramDate;
		this.finishDate = new Date();
		this.type = CALENDAR_EVENTS;
		this.lastModified = paramDate;
	}

	public CalendarState(State paramState) throws SeedlistException {
		if (paramState != null) {
			String[] arrayOfString = paramState.asString().split(SEPARATOR);
			try {
				this.type = Integer.parseInt(arrayOfString[0]);
				this.lastModified = new Date(Long.parseLong(arrayOfString[1]));
				this.startDate = new Date(Long.parseLong(arrayOfString[2]));
				this.finishDate = new Date(Long.parseLong(arrayOfString[3]));
				this.lastModifiedChanged = Boolean.parseBoolean(arrayOfString[4]);
				this.aclStart = Integer.parseInt(arrayOfString[5]);
				this.commentStart = Integer.parseInt(arrayOfString[6]);
				this.offset = Integer.parseInt(arrayOfString[7]);
			} catch (NumberFormatException localNumberFormatException) {
				this.finishDate = new Date();
				this.startDate = new Date(0L);
				this.type = CALENDAR_EVENTS;
				this.lastModified = this.startDate;
			}
		}
	}

	public State getState() {
		String str = String.valueOf(getType()) + SEPARATOR
				+ String.valueOf(new StringBuilder().append(getLastModified().getTime()).append(SEPARATOR).append(String.valueOf(getStartDate().getTime())).toString()) + SEPARATOR
				+ String.valueOf(getFinishDate().getTime()) + SEPARATOR + String.valueOf(isLastModifiedChanged()) + SEPARATOR + String.valueOf(getAclStart()) + SEPARATOR + String.valueOf(getCommentStart()) + SEPARATOR + String.valueOf(getOffset());

		return new StateImp(str);
	}

	public Date getFinishDate() {
		return this.finishDate;
	}

	public void setFinishDate(Date paramDate) {
		this.finishDate = paramDate;
	}

	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date paramDate) {
		this.startDate = paramDate;
	}

	public int getType() {
		return this.type;
	}

	public void setType(int paramInt) {
		this.type = paramInt;
	}

	public Date getLastModified() {
		return this.lastModified;
	}

	public void setLastModified(Date paramDate) {
		this.lastModified = paramDate;
	}

	public boolean isFinished() {
		return this.finished;
	}

	public void setFinished(boolean paramBoolean) {
		this.finished = paramBoolean;
	}

	public boolean isStarted() {
		return getStartDate().equals(getLastModified());
	}

	public boolean isLastModifiedChanged() {
		return this.lastModifiedChanged;
	}

	public void setLastModifiedChanged(boolean paramBoolean) {
		this.lastModifiedChanged = paramBoolean;
	}

	public int getOffset() {
		return this.offset;
	}

	public void setOffset(int paramInt) {
		this.offset = paramInt;
	}

	public int getAclStart() {
		return this.aclStart;
	}

	public void setAclStart(int paramInt) {
		this.aclStart = paramInt;
	}
	
	public int getCommentStart() {
		return this.commentStart;
	}

	public void setCommentStart(int paramInt) {
		this.commentStart = paramInt;
	}

	public String toString() {
		ResourceBundleHelper localResourceBundleHelper = new ResourceBundleHelper("com.ibm.ilel.seedlist.retriever.connections.resources.RetrieverResources", CalendarState.class.getClassLoader());

		StringBuilder localStringBuilder = new StringBuilder();
		append("finish.date", getFinishDate(), localStringBuilder, localResourceBundleHelper);
		append("start.date", getStartDate(), localStringBuilder, localResourceBundleHelper);
		append("type", Integer.valueOf(getType()), localStringBuilder, localResourceBundleHelper);
		append("last.modified", getLastModified(), localStringBuilder, localResourceBundleHelper);
		append("finished", Boolean.valueOf(isFinished()), localStringBuilder, localResourceBundleHelper);
		append("started", Boolean.valueOf(isStarted()), localStringBuilder, localResourceBundleHelper);
		append("acl.start", Integer.valueOf(getAclStart()), localStringBuilder, localResourceBundleHelper);
		append("comments.start", Integer.valueOf(getCommentStart()), localStringBuilder, localResourceBundleHelper);
		append("offset", Integer.valueOf(getOffset()), localStringBuilder, localResourceBundleHelper);
		return localStringBuilder.toString();
	}

	private static void append(String paramString, Object paramObject, StringBuilder paramStringBuilder, ResourceBundleHelper paramResourceBundleHelper) {
		paramStringBuilder.append(paramResourceBundleHelper.getString(paramString));
		paramStringBuilder.append(' ');
		paramStringBuilder.append(paramObject);
		paramStringBuilder.append("; ");
	}
}