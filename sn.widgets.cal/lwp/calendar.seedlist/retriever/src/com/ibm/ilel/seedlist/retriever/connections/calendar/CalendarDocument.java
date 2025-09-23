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

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.ibm.ilel.seedlist.SeedlistException;
import com.ibm.ilel.seedlist.common.DocumentContent;
import com.ibm.ilel.seedlist.common.Field;
import com.ibm.ilel.seedlist.common.Link;
import com.ibm.ilel.seedlist.common.Metadata;
import com.ibm.ilel.seedlist.common.User;
import com.ibm.ilel.seedlist.imp.AbstractDocument;
import com.ibm.ilel.seedlist.imp.DocumentContentImp;
import com.ibm.ilel.seedlist.imp.FieldImp;
import com.ibm.ilel.seedlist.imp.LinkImp;
import com.ibm.ilel.seedlist.imp.MetadataImp;
import com.ibm.ilel.seedlist.imp.lconn.LConnFieldImp;
import com.ibm.ilel.seedlist.imp.snx.SnxUserImp;
import com.ibm.ilel.seedlist.retriever.connections.calendar.data.CalendarEntry;

public class CalendarDocument extends AbstractDocument {

	private static final String CLASSNAME = CalendarDocument.class.getName();
	private static Logger logger = Logger.getLogger(CLASSNAME);

	private CalendarEntry calendarEntry;
	private Locale locale;
	private boolean isEmailExposed;

	public CalendarDocument(CalendarEntry entry, Locale locale, boolean isEmailExposed) throws SeedlistException {
		this.locale = locale;
		this.calendarEntry = entry;
		this.isEmailExposed = isEmailExposed;

		// atom id
		setId(entry.getId());

		// metadata
		MetadataImp metadata = new MetadataImp();

		metadata.setLocale(locale);
		metadata.setACLs(getACLs(entry));
		metadata.setAction(getAction(entry));
		metadata.setFields(getFields(entry));

		if (!entry.isDeleted()) {
			// set author
			try {
				SnxUserImp user = new SnxUserImp(null, entry.getAuthor().getName(), new String[] { User.ROLE_AUTHOR }, entry.getAuthor().getExtID());

				if (isEmailExposed) {
					user.setEmailAddress(entry.getAuthor().getEmail());
				}

				metadata.setUsers(new User[] { user });
			} catch (SeedlistException e) {
				// do nothing if user can't be created
				logger.warning("Author for calendar seedlist entry can't be created. " + "Entry id: " + entry.getId());
			}
		}

		this.setMetadata(metadata);

		if (getAction(entry) == Metadata.ACTION_UPDATE) {
			this.displayLink = getLink(entry);
			this.content = getContent(entry);
		}
	}

	public Date getUpdateDate() {
		return calendarEntry.getLastModifiedDate();
	}

	private DocumentContent getContent(CalendarEntry entry) throws SeedlistException {
		String method = "getContent";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		try {
			if (entry.getContent() == null) {
				entry.setContent("");
			}

			// building input stream from a string
			InputStream istream = new ByteArrayInputStream(entry.getContent().getBytes(CalendarMetadata.DEFAULT_ENCODING));

			DocumentContentImp docContent = new DocumentContentImp(istream);
			docContent.setLocale(locale);
			docContent.setType(CalendarMetadata.HTML_MIME_TYPE);
			docContent.setEncoding(CalendarMetadata.DEFAULT_ENCODING);

			if (logger.isLoggable(Level.FINER)) {
				logger.exiting(CLASSNAME, method);
			}

			return docContent;
		} catch (UnsupportedEncodingException e) {
			if (logger.isLoggable(Level.FINER)) {
				logger.throwing(CLASSNAME, method, e);
			}
			throw new SeedlistException(SeedlistException.TYPE_ENTRY_DATA_ERROR, e.getMessage());
		}
	}

	private Link getLink(CalendarEntry entry) throws SeedlistException {
		String method = "getLink";

		if (logger.isLoggable(Level.FINER)) {
			logger.entering(CLASSNAME, method);
		}

		try {
			String uriString = entry.getUrl();
			URI uri = new URI(uriString);

			LinkImp link = new LinkImp(uri);
			link.setTitle(entry.getTitle());

			if (logger.isLoggable(Level.FINER)) {
				logger.exiting(CLASSNAME, method);
			}

			return link;

		} catch (URISyntaxException e) {
			if (logger.isLoggable(Level.FINER)) {
				logger.throwing(CLASSNAME, method, e);
			}

			logger.warning("URL for calendar seedlist entry does not support URI spec. " + "Entry id: " + entry.getId());

			return null;
		}
	}

	private String[] getACLs(CalendarEntry entry) {
		if(entry.isPublic()) {
			return new String[] { "public", entry.getParentCommunityUID() };
		} else {
			return new String[] { entry.getParentCommunityUID() };
		}
	}

	private int getAction(CalendarEntry entry) {
		return entry.isDeleted() ? Metadata.ACTION_DELETE : Metadata.ACTION_UPDATE;
	}

	private Field[] getFields(CalendarEntry entry) throws SeedlistException {
		List<Field> fields = new ArrayList<Field>();

		fields.add(new FieldImp(entry.getType(), CalendarMetadata.FIELD_ENTRY_TYPE));
		fields.add(new FieldImp(entry.getLastModifiedDate(), Field.FIELD_UPDATE_DATE));
        // orgId
        fields.add(new FieldImp(entry.getOrgId(), CalendarMetadata.FIELD_ORGANISATION_ID));

		if (getAction(entry) == Metadata.ACTION_UPDATE) {
			fields.add(new FieldImp(entry.getTitle(), Field.FIELD_TITLE));
			fields.add(new FieldImp(entry.getPublishDate(), Field.FIELD_CREATION_DATE));
			fields.add(new FieldImp(entry.getLocation(), CalendarMetadata.FIELD_EVENT_LOCATION));
			fields.add(new FieldImp(entry.isRepeating(), CalendarMetadata.FIELD_ISREPEATING));
			fields.add(new FieldImp(entry.isAllDay(), CalendarMetadata.FIELD_ISALLDAY));
			if(entry.getParentEventID() != null) {
				fields.add(new FieldImp(entry.getParentEventID(), CalendarMetadata.FIELD_PARENT_EVENT_ID));
				fields.add(new FieldImp(entry.getParentEventURL(), CalendarMetadata.FIELD_PARENT_EVENT_URL));
			}
			fields.add(new FieldImp(entry.getParentCommunityUID(), CalendarMetadata.FIELD_PARENT_COMMUNITY_DBINTERNAL_UID));
			
			// instances
			CalendarEntry.Period[] instances = entry.getInstances().toArray(new CalendarEntry.Period[0]);
			for(int i = 0; i < instances.length; i++) {
				CalendarEntry.Period instance = instances[i];
				Field startDate = new LConnFieldImp(instance.getStartDate(), CalendarMetadata.FIELD_STARTDATE, i);
				Field endDate = new LConnFieldImp(instance.getEndDate(), CalendarMetadata.FIELD_ENDDATE, i);
				fields.add(new LConnFieldImp(new Field[]{startDate, endDate}, CalendarMetadata.FIELD_PERIOD, i));
			}
			
			// tag fields
			for(String tag : entry.getTags()) {
				fields.add(new FieldImp(tag, CalendarMetadata.FIELD_TAG));
			}

			// comments fields
			CalendarEntry.Comment[] comments = entry.getComments().toArray(new CalendarEntry.Comment[0]);
			fields.add(new FieldImp(comments.length, CalendarMetadata.FIELD_COMMENT_COUNT));
			for(int i = 0; i < comments.length; i++) {
				fields.add(new LConnFieldImp(comments[i].getId(), CalendarMetadata.FIELD_COMMENT_ID, i));
				fields.add(new LConnFieldImp(comments[i].getUrl(), CalendarMetadata.FIELD_COMMENT_URL, i));
				fields.add(new LConnFieldImp(comments[i].getDate(), CalendarMetadata.FIELD_COMMENT_DATE, i));
				
				fields.add(new LConnFieldImp(comments[i].getAuthor().getExtID(), CalendarMetadata.FIELD_COMMENT_AUTHOR_UUID, i));
				fields.add(new LConnFieldImp(comments[i].getAuthor().getName(), CalendarMetadata.FIELD_COMMENT_AUTHOR_NAME, i));
				if (isEmailExposed) {
					fields.add(new LConnFieldImp(comments[i].getAuthor().getEmail(), CalendarMetadata.FIELD_COMMENT_AUTHOR_EMAIL, i));
				}

				fields.add(new LConnFieldImp(comments[i].getText(), CalendarMetadata.FIELD_COMMENT_CONTENT, i));
			}
		}

		return fields.toArray(new Field[0]);
	}

	public boolean isValid() {
		int action = getAction(calendarEntry);
		if (action == Metadata.ACTION_UPDATE && getId() != null && getDisplayLink() != null && calendarEntry.getTitle() != null && !calendarEntry.getTitle().equals("")) {
			return true;
		} else if (action == Metadata.ACTION_DELETE && getId() != null) {
			return true;
		} else {
			return false;
		}
	}

}
