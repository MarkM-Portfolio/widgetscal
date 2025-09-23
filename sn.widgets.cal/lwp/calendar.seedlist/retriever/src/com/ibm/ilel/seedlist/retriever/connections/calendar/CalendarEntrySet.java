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
package com.ibm.ilel.seedlist.retriever.connections.calendar;

import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ilel.seedlist.SeedlistException;
import com.ibm.ilel.seedlist.common.Category;
import com.ibm.ilel.seedlist.common.CategoryInfo;
import com.ibm.ilel.seedlist.common.Field;
import com.ibm.ilel.seedlist.common.FieldInfo;
import com.ibm.ilel.seedlist.common.State;
import com.ibm.ilel.seedlist.common.lconn.LConnEntrySet;
import com.ibm.ilel.seedlist.imp.AbstractEntrySet;
import com.ibm.ilel.seedlist.imp.CategoryImp;
import com.ibm.ilel.seedlist.imp.CategoryInfoImp;
import com.ibm.ilel.seedlist.imp.FieldImp;
import com.ibm.ilel.seedlist.imp.FieldInfoImp;
import com.ibm.ilel.seedlist.imp.MetadataImp;
import com.ibm.ilel.seedlist.imp.StateImp;
import com.ibm.ilel.seedlist.retriever.RetrieverRequest;
import com.ibm.lconn.calendar.util.RuntimeConfiguration;

import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper;
import com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper.ComponentEntry;

public class CalendarEntrySet extends AbstractEntrySet implements LConnEntrySet {

	private static final String CLASSNAME = CalendarEntrySet.class.getName();
	private static Logger logger = Logger.getLogger(CLASSNAME);

	private List<CalendarDocument> documents = new ArrayList<CalendarDocument>();
	private List seedlists = Collections.EMPTY_LIST;

	private Date seedlistUpdateDate;
	private boolean isEmailExposed;
	private boolean isPublic;
	private RetrieverRequest request;
	private CalendarState calendarState;

	CalendarEntrySet(List<CalendarDocument> documents, List seedlists, String seedlistId, boolean isEmailExposed, boolean isPublic, RetrieverRequest request, HttpServletRequest servletRequest,
			CalendarState calendarState) throws SeedlistException {

		this.isPublic = isPublic;
		this.isEmailExposed = isEmailExposed;
		this.seedlistUpdateDate = new Date();
		this.request = request;
		this.calendarState = calendarState;

		// documents
		if (documents != null) {
			this.documents = documents;
		}

		// number of entries
		this.numberOfEntries = this.documents.size();

		// metadata
		MetadataImp metadata = new MetadataImp();

		// set mandatory fields: title, updated
		metadata.setFields(getFields(seedlistId, request));
		// set fields meta info for seedlist entries
		metadata.setFieldsInfo(getFieldsInfo(request.getLocale()));
		// set category
		metadata.setCategories(getCategories());

		this.metadata = metadata;

		this.state = calendarState.getState();

		/*
		 * Returns timestamp only for the first request in session, so don't
		 * miss Documents, if they are added during paging (inside session)
		 */
		if (calendarState.isFinished()) {
			timestamp = createNewTimestamp(calendarState.getFinishDate().getTime());
		}
	}

	public Iterator getDocuments() {
		return documents.iterator();
	}

	public Iterator getSeedlists() {
		return seedlists.iterator();
	}

	protected FieldInfo[] getFieldsInfo(Locale locale) throws SeedlistException {
		List<FieldInfo> fieldsInfo = new ArrayList<FieldInfo>();

		// entry type
		FieldInfoImp nodeTypeFieldInfo = new FieldInfoImp(CalendarMetadata.FIELD_ENTRY_TYPE, CalendarMetadata.FIELD_ENTRY_TYPE_NAME, CalendarMetadata.FIELD_ENTRY_TYPE_DESC, FieldInfo.TYPE_STRING);
		nodeTypeFieldInfo.setContentSearchable(false);
		nodeTypeFieldInfo.setFieldSearchable(false);
		nodeTypeFieldInfo.setParametric(false);
		nodeTypeFieldInfo.setReturnable(true);
		nodeTypeFieldInfo.setSortable(false);
		nodeTypeFieldInfo.setExactMatchSupported(false);
		fieldsInfo.add(nodeTypeFieldInfo);

		// event location
		FieldInfoImp eventLocationFieldInfo = new FieldInfoImp(CalendarMetadata.FIELD_EVENT_LOCATION, CalendarMetadata.FIELD_EVENT_LOCATION_NAME, CalendarMetadata.FIELD_EVENT_LOCATION_DESC,
				FieldInfo.TYPE_STRING);
		eventLocationFieldInfo.setContentSearchable(true);
		eventLocationFieldInfo.setFieldSearchable(true);
		eventLocationFieldInfo.setParametric(false);
		eventLocationFieldInfo.setReturnable(true);
		eventLocationFieldInfo.setSortable(false);
		eventLocationFieldInfo.setExactMatchSupported(false);
		fieldsInfo.add(eventLocationFieldInfo);

		// event "repeating" info
		FieldInfoImp repeatingFieldInfo = new FieldInfoImp(CalendarMetadata.FIELD_ISREPEATING, CalendarMetadata.FIELD_ISREPEATING_NAME, CalendarMetadata.FIELD_ISREPEATING_DESC, FieldInfo.TYPE_BOOLEAN);
		repeatingFieldInfo.setContentSearchable(false);
		repeatingFieldInfo.setFieldSearchable(true);
		repeatingFieldInfo.setParametric(false);
		repeatingFieldInfo.setReturnable(true);
		repeatingFieldInfo.setSortable(false);
		repeatingFieldInfo.setExactMatchSupported(false);
		fieldsInfo.add(repeatingFieldInfo);

		// event "allday" info
		FieldInfoImp alldayFieldInfo = new FieldInfoImp(CalendarMetadata.FIELD_ISALLDAY, CalendarMetadata.FIELD_ISALLDAY_NAME, CalendarMetadata.FIELD_ISALLDAY_DESC, FieldInfo.TYPE_BOOLEAN);
		alldayFieldInfo.setContentSearchable(false);
		alldayFieldInfo.setFieldSearchable(true);
		alldayFieldInfo.setParametric(false);
		alldayFieldInfo.setReturnable(true);
		alldayFieldInfo.setSortable(false);
		alldayFieldInfo.setExactMatchSupported(false);
		fieldsInfo.add(alldayFieldInfo);

		// parent event id
		FieldInfoImp parentEventFieldInfo = new FieldInfoImp(CalendarMetadata.FIELD_PARENT_EVENT_ID, CalendarMetadata.FIELD_PARENT_EVENT_ID_NAME, CalendarMetadata.FIELD_PARENT_EVENT_ID_DESC,
				FieldInfo.TYPE_STRING);
		parentEventFieldInfo.setContentSearchable(false);
		parentEventFieldInfo.setFieldSearchable(true);
		parentEventFieldInfo.setParametric(false);
		parentEventFieldInfo.setReturnable(true);
		parentEventFieldInfo.setSortable(false);
		parentEventFieldInfo.setExactMatchSupported(true);
		fieldsInfo.add(parentEventFieldInfo);
		
		// parent event url
		FieldInfoImp parentEventUrlFieldInfo = new FieldInfoImp(CalendarMetadata.FIELD_PARENT_EVENT_URL, CalendarMetadata.FIELD_PARENT_EVENT_URL_NAME, CalendarMetadata.FIELD_PARENT_EVENT_URL_DESC,
				FieldInfo.TYPE_STRING);
		parentEventUrlFieldInfo.setContentSearchable(false);
		parentEventUrlFieldInfo.setFieldSearchable(false);
		parentEventUrlFieldInfo.setParametric(false);
		parentEventUrlFieldInfo.setReturnable(true);
		parentEventUrlFieldInfo.setSortable(false);
		parentEventUrlFieldInfo.setExactMatchSupported(false);
		fieldsInfo.add(parentEventUrlFieldInfo);

		// event instances - period
		FieldInfoImp periodFieldInfo = new FieldInfoImp(CalendarMetadata.FIELD_PERIOD, CalendarMetadata.FIELD_PERIOD_NAME, CalendarMetadata.FIELD_PERIOD_DESC, FieldInfo.TYPE_FIELDS);
		periodFieldInfo.setContentSearchable(false);
		periodFieldInfo.setFieldSearchable(false);
		periodFieldInfo.setParametric(false);
		periodFieldInfo.setReturnable(true);
		periodFieldInfo.setSortable(false);
		periodFieldInfo.setExactMatchSupported(false);
		fieldsInfo.add(periodFieldInfo);

		// event instances - period start date
		FieldInfoImp periodStartDateFieldInfo = new FieldInfoImp(CalendarMetadata.FIELD_STARTDATE, CalendarMetadata.FIELD_STARTDATE_NAME, CalendarMetadata.FIELD_STARTDATE_DESC, FieldInfo.TYPE_DATE);
		periodStartDateFieldInfo.setContentSearchable(false);
		periodStartDateFieldInfo.setFieldSearchable(true);
		periodStartDateFieldInfo.setParametric(false);
		periodStartDateFieldInfo.setReturnable(true);
		periodStartDateFieldInfo.setSortable(true);
		periodStartDateFieldInfo.setExactMatchSupported(true);
		fieldsInfo.add(periodStartDateFieldInfo);
		
		// event instances - period end date
		FieldInfoImp periodEndDateFieldInfo = new FieldInfoImp(CalendarMetadata.FIELD_ENDDATE, CalendarMetadata.FIELD_ENDDATE_NAME, CalendarMetadata.FIELD_ENDDATE_DESC, FieldInfo.TYPE_DATE);
		periodEndDateFieldInfo.setContentSearchable(false);
		periodEndDateFieldInfo.setFieldSearchable(true);
		periodEndDateFieldInfo.setParametric(false);
		periodEndDateFieldInfo.setReturnable(true);
		periodEndDateFieldInfo.setSortable(false);
		periodEndDateFieldInfo.setExactMatchSupported(true);
		fieldsInfo.add(periodEndDateFieldInfo);

		// tag
		FieldInfoImp tagFieldInfo = (new FieldInfoImp(CalendarMetadata.FIELD_TAG, CalendarMetadata.FIELD_TAG_NAME, CalendarMetadata.FIELD_TAG_DESC, FieldInfo.TYPE_STRING));
		tagFieldInfo.setContentSearchable(true);
		tagFieldInfo.setFieldSearchable(true);
		tagFieldInfo.setParametric(false);
		tagFieldInfo.setReturnable(true);
		tagFieldInfo.setSortable(false);
		tagFieldInfo.setExactMatchSupported(false);
		fieldsInfo.add(tagFieldInfo);

		// comment count
		FieldInfoImp commentCountFieldInfo = (new FieldInfoImp(CalendarMetadata.FIELD_COMMENT_COUNT, CalendarMetadata.FIELD_COMMENT_COUNT_NAME, CalendarMetadata.FIELD_COMMENT_COUNT_DESC, FieldInfo.TYPE_INT));
		commentCountFieldInfo.setContentSearchable(false);
		commentCountFieldInfo.setFieldSearchable(true);
		commentCountFieldInfo.setParametric(false);
		commentCountFieldInfo.setReturnable(true);
		commentCountFieldInfo.setSortable(true);
		commentCountFieldInfo.setExactMatchSupported(true);
		fieldsInfo.add(commentCountFieldInfo);
		// comment id
		FieldInfoImp commentIdFieldInfo = (new FieldInfoImp(CalendarMetadata.FIELD_COMMENT_ID, CalendarMetadata.FIELD_COMMENT_ID_NAME, CalendarMetadata.FIELD_COMMENT_ID_DESC, FieldInfo.TYPE_STRING));
		commentIdFieldInfo.setContentSearchable(false);
		commentIdFieldInfo.setFieldSearchable(false);
		commentIdFieldInfo.setParametric(false);
		commentIdFieldInfo.setReturnable(true);
		commentIdFieldInfo.setSortable(false);
		commentIdFieldInfo.setExactMatchSupported(true);
		fieldsInfo.add(commentIdFieldInfo);

		// comment url
		FieldInfoImp commentUrlFieldInfo = (new FieldInfoImp(CalendarMetadata.FIELD_COMMENT_URL, CalendarMetadata.FIELD_COMMENT_URL_NAME, CalendarMetadata.FIELD_COMMENT_URL_DESC,
				FieldInfo.TYPE_STRING));
		commentUrlFieldInfo.setContentSearchable(false);
		commentUrlFieldInfo.setFieldSearchable(true);
		commentUrlFieldInfo.setParametric(false);
		commentUrlFieldInfo.setReturnable(true);
		commentUrlFieldInfo.setSortable(false);
		commentUrlFieldInfo.setExactMatchSupported(true);
		fieldsInfo.add(commentUrlFieldInfo);

		// comment content
		FieldInfoImp commentContentFieldInfo = (new FieldInfoImp(CalendarMetadata.FIELD_COMMENT_CONTENT, CalendarMetadata.FIELD_COMMENT_CONTENT_NAME, CalendarMetadata.FIELD_COMMENT_CONTENT_DESC,
				FieldInfo.TYPE_STRING));
		commentContentFieldInfo.setContentSearchable(true);
		commentContentFieldInfo.setFieldSearchable(false);
		commentContentFieldInfo.setParametric(false);
		commentContentFieldInfo.setReturnable(true);
		commentContentFieldInfo.setSortable(false);
		commentContentFieldInfo.setExactMatchSupported(false);
		fieldsInfo.add(commentContentFieldInfo);

		// comment date
		FieldInfoImp commentDateFieldInfo = (new FieldInfoImp(CalendarMetadata.FIELD_COMMENT_DATE, CalendarMetadata.FIELD_COMMENT_DATE_NAME, CalendarMetadata.FIELD_COMMENT_DATE_DESC,
				FieldInfo.TYPE_DATE));
		commentDateFieldInfo.setContentSearchable(false);
		commentDateFieldInfo.setFieldSearchable(false);
		commentDateFieldInfo.setParametric(false);
		commentDateFieldInfo.setReturnable(false);
		commentDateFieldInfo.setSortable(true);
		commentDateFieldInfo.setExactMatchSupported(true);
		fieldsInfo.add(commentDateFieldInfo);

		// comment author name
		FieldInfoImp commentAuthorNameFieldInfo = (new FieldInfoImp(CalendarMetadata.FIELD_COMMENT_AUTHOR_NAME, CalendarMetadata.FIELD_COMMENT_AUTHOR_NAME_NAME,
				CalendarMetadata.FIELD_COMMENT_AUTHOR_NAME_DESC, FieldInfo.TYPE_STRING));
		commentAuthorNameFieldInfo.setContentSearchable(false);
		commentAuthorNameFieldInfo.setFieldSearchable(true);
		commentAuthorNameFieldInfo.setParametric(false);
		commentAuthorNameFieldInfo.setReturnable(false);
		commentAuthorNameFieldInfo.setSortable(false);
		commentAuthorNameFieldInfo.setExactMatchSupported(true);
		fieldsInfo.add(commentAuthorNameFieldInfo);

		// comment author email
		if (isEmailExposed) {
			FieldInfoImp commentAuthorEmailFieldInfo = (new FieldInfoImp(CalendarMetadata.FIELD_COMMENT_AUTHOR_EMAIL, CalendarMetadata.FIELD_COMMENT_AUTHOR_EMAIL_NAME,
					CalendarMetadata.FIELD_COMMENT_AUTHOR_EMAIL_DESC, FieldInfo.TYPE_STRING));
			commentAuthorEmailFieldInfo.setContentSearchable(false);
			commentAuthorEmailFieldInfo.setFieldSearchable(true);
			commentAuthorEmailFieldInfo.setParametric(false);
			commentAuthorEmailFieldInfo.setReturnable(false);
			commentAuthorEmailFieldInfo.setSortable(false);
			commentAuthorEmailFieldInfo.setExactMatchSupported(true);
			fieldsInfo.add(commentAuthorEmailFieldInfo);
		}

		// comment author UUID
		FieldInfoImp commentAuthorUUIDFieldInfo = (new FieldInfoImp(CalendarMetadata.FIELD_COMMENT_AUTHOR_UUID, CalendarMetadata.FIELD_COMMENT_AUTHOR_UUID_NAME,
				CalendarMetadata.FIELD_COMMENT_AUTHOR_UUID_DESC, FieldInfo.TYPE_STRING));
		commentAuthorUUIDFieldInfo.setContentSearchable(false);
		commentAuthorUUIDFieldInfo.setFieldSearchable(false);
		commentAuthorUUIDFieldInfo.setParametric(false);
		commentAuthorUUIDFieldInfo.setReturnable(false);
		commentAuthorUUIDFieldInfo.setSortable(false);
		commentAuthorUUIDFieldInfo.setExactMatchSupported(true);
		fieldsInfo.add(commentAuthorUUIDFieldInfo);

		// Parent community database internal UID
		FieldInfoImp communityUUIDFieldInfo = (new FieldInfoImp(CalendarMetadata.FIELD_PARENT_COMMUNITY_DBINTERNAL_UID, CalendarMetadata.FIELD_PARENT_COMMUNITY_DBINTERNAL_UID_NAME,
				CalendarMetadata.FIELD_PARENT_COMMUNITY_DBINTERNAL_UID_DESC, FieldInfo.TYPE_STRING));
		communityUUIDFieldInfo.setContentSearchable(false);
		communityUUIDFieldInfo.setFieldSearchable(true);
		communityUUIDFieldInfo.setParametric(false);
		communityUUIDFieldInfo.setReturnable(true);
		communityUUIDFieldInfo.setSortable(false);
		communityUUIDFieldInfo.setExactMatchSupported(true);
		fieldsInfo.add(communityUUIDFieldInfo);
		
		//orgId
		FieldInfoImp orgIdFieldInfo = new FieldInfoImp(
				CalendarMetadata.FIELD_ORGANISATION_ID, 
				CalendarMetadata.FIELD_ORGANISATION_ID_NAME, 
				CalendarMetadata.FIELD_ORGANISATION_ID_DESC, 
				FieldInfo.TYPE_STRING);
		orgIdFieldInfo.setContentSearchable(false);
		orgIdFieldInfo.setFieldSearchable(true);
		orgIdFieldInfo.setParametric(false);
		orgIdFieldInfo.setReturnable(false);
		orgIdFieldInfo.setSortable(true);
		orgIdFieldInfo.setExactMatchSupported(true);		
		fieldsInfo.add(orgIdFieldInfo);	

		return fieldsInfo.toArray(new FieldInfo[0]);
	}

	protected Field[] getFields(String seedlistId, RetrieverRequest request) throws SeedlistException {
		List<Field> fields = new ArrayList<Field>();

		// set title
		String title = "Community Events : " + getNumberOfEntries() + " entries of Seedlist '" + seedlistId + "'";
		FieldImp titleField = new FieldImp(title, Field.FIELD_TITLE);
		titleField.setLocale(request.getLocale());
		fields.add(titleField);

		// set updated date
		fields.add(new FieldImp(getSeedlistUpdateDate(), Field.FIELD_UPDATE_DATE));

		return fields.toArray(new Field[0]);
	}

	protected Category[] getCategories() {
		CategoryImp csCategory = new CategoryImp(new CategoryInfoImp(CalendarMetadata.CALENDAR_CATEGORY, CalendarMetadata.CALENDAR_CATEGORY_DESC), CalendarMetadata.FEATURE_TAXONOMY_TYPE);

		csCategory.setPathFromRoot(new CategoryInfo[] { new CategoryInfoImp(CalendarMetadata.CONTENT_SOURCE_TYPE_CATEGORY, CalendarMetadata.CONTENT_SOURCE_TYPE_CATEGORY) });

		return new Category[] { csCategory };
	}

	protected Date getSeedlistUpdateDate() {
		return seedlistUpdateDate;
	}

	public Date getNextPageDate() {
		CalendarDocument document = (CalendarDocument) documents.get(documents.size() - 1);
		return document.getUpdateDate();
	}

	// ------------- LConnEntrySet ----------------------------------- //
	// ------------- functions for building next page url ------------ //
	public String getComponentUrl() {
		String method = "getComponentUrl";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		VenturaConfigurationHelper vcp = VenturaConfigurationHelper.Factory.getInstance();
		ComponentEntry componentConfig = vcp.getComponentConfig("communities");
		String url = componentConfig.getInterServiceUrl().toString() + RuntimeConfiguration.getValue("module.path");

		String componentUrl = "";

		if (isPublic) {
			componentUrl = url + "/seedlist/server";
		} else {
			componentUrl = url + "/seedlist/myserver";
		}

		if (logger.isLoggable(Level.FINER)) {
			logger.exiting(CLASSNAME, method, componentUrl);
		}

		return componentUrl;
	}
	
	public Date getDateParam() {
		return null;
	}

	public int getStartParam() {
		String method = "getStartParam";
		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		int nextStartIndex = 1;
		for (int j = documents.size() - 1; j > 0; j--) {
			GregorianCalendar gc1 = new GregorianCalendar();
			gc1.setTime(documents.get(j).getUpdateDate());

			GregorianCalendar gc2 = new GregorianCalendar();
			gc2.setTime(documents.get(j - 1).getUpdateDate());

			if ((gc1.get(Calendar.YEAR) == gc2.get(Calendar.YEAR)) && (gc1.get(Calendar.MONTH) == gc2.get(Calendar.MONTH)) && (gc1.get(Calendar.DAY_OF_MONTH) == gc2.get(Calendar.DAY_OF_MONTH))
					&& (gc1.get(Calendar.HOUR_OF_DAY) == gc2.get(Calendar.HOUR_OF_DAY)) && (gc1.get(Calendar.MINUTE) == gc2.get(Calendar.MINUTE))
					&& (gc1.get(Calendar.SECOND) == gc2.get(Calendar.SECOND))) {
				nextStartIndex++;
			} else {
				break;
			}
		}

		int range = request.getNumEntries();
		int start = request.getStartIndex();

		if (!calendarState.isLastModifiedChanged() && (nextStartIndex == documents.size())) {
			nextStartIndex = start + range;
		}

		if (logger.isLoggable(Level.FINER)) {
			logger.exiting(CLASSNAME, method, nextStartIndex);
		}

		return nextStartIndex;
	}

	private State createNewTimestamp(long timeInMillis) {
		// long can't be more than 8 bytes
		ByteBuffer timeBuf = ByteBuffer.allocate(8);
		// define timestamp as current time in milliseconds
		timeBuf.putLong(timeInMillis);
		return new StateImp(timeBuf.array());
	}
}
