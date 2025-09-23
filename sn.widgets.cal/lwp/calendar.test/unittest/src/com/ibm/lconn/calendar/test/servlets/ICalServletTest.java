/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* (C) Copyright IBM Corp. 2015                                      */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.calendar.test.servlets;

import java.util.Date;
import java.util.Locale;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.icu.util.Calendar;
import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.servlet.ICalServlet;
import com.ibm.lconn.calendar.servlet.IPermissionHelper;
import com.ibm.lconn.calendar.test.servlets.mock.HttpServletRequestMock;
import com.ibm.lconn.calendar.test.servlets.mock.PermissionHelperMock;
import com.ibm.lconn.calendar.util.CalendarRole;
import com.ibm.lconn.core.gatekeeper.LCGatekeeper;
import com.ibm.lconn.core.gatekeeper.LCSupportedFeature;

public class ICalServletTest extends ServletTestBase {
	class MyHttpServletRequestMock extends HttpServletRequestMock {
		@Override
		public String getParameter(String param) {
			if (param == null) return null;
			if (param.equals("eventInstUuid")) return eventInstUuid;
			return null;
		}
		
		@Override
		public String getRemoteUser() {
			return remoteUser ;
		}

		@Override
		public Locale getLocale() {
			return new Locale("EN", "US");
		}
	}
	
	CalendarService service = null;
	String eventInstUuid = null;
	String remoteUser = "frankch";
	
	@Override
	protected HttpServletRequest createMockRequest() {
		return new MyHttpServletRequestMock();
	}
	
	@Override
	protected void setUp() throws Exception {
		super.setUp();
		
		service = CalendarServiceFactory.INSTANCE.create();
		LCGatekeeper.setupTestMode();
	}
	
	@Override
	protected void tearDown() throws Exception {
		super.tearDown();
	}

	public void testExportICS() throws Exception {
		LCGatekeeper.setEnabledForTestPurposes(LCSupportedFeature.CALENDAR_EXPORT_ICAL_FILE, true);
		
		String userUuid = UUID.randomUUID().toString();
		String eventUuid = UUID.randomUUID().toString();
		
		// First create the calendar event
		DBCalendar cal = makeDBCalendar();
		service.getCalendarDAO().addCalendar(cal);
		service.flush();
		
		DBEventInfo eventInfo = makeDBEventInfo(cal, eventUuid);
		service.getEventInfoDao().addEventInfo(eventInfo);
		service.flush();
		
		DBEvent event = makeDBEvent(cal, eventUuid, eventInfo, userUuid);
		service.getEventDAO().addEvent(event);
		service.flush();
		
		DBEventInstance eventInstance = makeDBEventInstance(cal, event);
		service.getEventInstanceDao().addEventInstance(eventInstance);
		service.flush();
		
		eventInstUuid = eventInstance.getEventInst_UUID();
		
		// Now let's retrieve it with the export
		ICalServlet servlet = new ICalServlet() {
			@Override
			protected IPermissionHelper createPermissionHelper()
					throws DSProviderException {
				return new PermissionHelperMock();
			}
		};
		servlet.init(createMockServletConfig());
		HttpServletRequest request = createMockRequest();
		HttpServletResponse response = createMockResponse();
		servlet.doGet(request, response);
		String icsFile = response.getOutputStream().toString(); 
		assertNotNull(icsFile);
		assertTrue("Exported ICS file does not contain event name: Evelyn's birthday party", icsFile.contains("Evelyn's birthday party"));
		// Should the UID be event instance UUID?
		// Currently set as event UUID
	}

	private DBCalendar makeDBCalendar() {
		String uuid = UUID.randomUUID().toString();
		Date now = new Date();
		DBCalendar calendar = new DBCalendar();
		calendar.setCalendar_UUID(uuid);
		calendar.setCommunity_UUID(uuid);
		calendar.setCommunityName("Community - " + uuid);
		calendar.setLastModified(now);
		calendar.setMembers_Role(CalendarRole.AUTHOR);
		calendar.setVisibility(DBCalendar.PUBLIC);
		calendar.setCreatedOn(now);
		calendar.setAclModtime(now);
		
		return calendar;
	}
	
	private DBEventInfo makeDBEventInfo(DBCalendar calendar, String eventUuid) {
		DBEventInfo eventInfo = new DBEventInfo();
		eventInfo.setEventInfo_UUID(UUID.randomUUID().toString());
		eventInfo.setCalendar_UUID(calendar.getCalendar_UUID());
		eventInfo.setEvent_UUID(eventUuid);
		eventInfo.setName("Evelyn's birthday party");
		eventInfo.setDescription("Celebrate Evelyn's birthday at the Shanghai Zoo.");
		eventInfo.setLocation("At the zoo");
		eventInfo.setIsAllDay(Boolean.FALSE);
		eventInfo.setImageUrl("");
		
		return eventInfo;
	}
	
	private DBEvent makeDBEvent(DBCalendar calendar, String eventUuid, DBEventInfo eventInfo, String userUuid) {
		Date now = new Date();
		DBEvent event = new DBEvent();
		event.setEvent_UUID(eventUuid);
		event.setCalendar_UUID(calendar.getCalendar_UUID());
		event.setCreatedBy(userUuid);
		event.setModifiedBy(userUuid);
		event.setCreatedOn(now);
		event.setModifiedOn(now);
		event.setEventInfo(eventInfo);
		event.setDbModifiedOn(now);
		event.setIsRecurrence(false);
		
		return event;
	}
	
	private DBEventInstance makeDBEventInstance(DBCalendar calendar, DBEvent event) {
		DBEventInstance inst = new DBEventInstance();
		inst.setEventInst_UUID(UUID.randomUUID().toString());
		inst.setEvent_UUID(event.getEvent_UUID());
		inst.setCalendar_UUID(calendar.getCalendar_UUID());
		Calendar theCal = Calendar.getInstance();
		theCal.set(2012, Calendar.AUGUST, 1, 8, 0);
		inst.setStartDate(theCal.getTime());
		theCal.set(2012, Calendar.AUGUST, 1, 9, 0);
		inst.setEndDate(theCal.getTime());

		return inst;
	}
}
