/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* (C) Copyright IBM Corp. 2016                                      */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
package com.ibm.lconn.calendar.test.servlets;

import java.io.*;

import java.util.Date;
import java.util.Locale;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletOutputStream;

import com.ibm.connections.directory.services.data.DSConstants;
import com.ibm.icu.util.Calendar;
import com.ibm.lconn.calendar.atom.AtomParser;
import com.ibm.lconn.calendar.db.CalendarService;
import com.ibm.lconn.calendar.db.CalendarServiceFactory;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBEvent;
import com.ibm.lconn.calendar.db.model.DBEventInfo;
import com.ibm.lconn.calendar.db.model.DBEventInstance;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.exception.DSProviderException;
import com.ibm.lconn.calendar.servlet.CalendarServlet;
import com.ibm.lconn.calendar.servlet.IPermissionHelper;
import com.ibm.lconn.calendar.test.servlets.mock.HttpServletRequestMock;
import com.ibm.lconn.calendar.test.servlets.mock.HttpServletResponseMock;
import com.ibm.lconn.calendar.test.servlets.mock.PermissionHelperMock;
import com.ibm.lconn.calendar.util.CalendarRole;
import com.ibm.lconn.calendar.util.Utilities;

public class ICalServletTest2 extends ServletTestBase {
	class MyHttpServletRequestMock extends HttpServletRequestMock {
		@Override
		public String getParameter(String param) {
			if (param == null) return null;
			if (param.equals("calendarUuid")) return calendarUuid;
			if (param.equals("endDate")) return endDate;
			if (param.equals("page")) return "1";
			if (param.equals("ps")) return "500";
			return null;
		}
		

	}
	
	class MyPermissionHelperMock extends PermissionHelperMock {
		@Override
		public int isUserAuthorized(HttpServletRequest request,
				DBCalendar calendar, String evtAuthor, int operation)
				throws DSProviderException {
			// TODO Auto-generated method stub
			return 200;
		}
		
		@Override
		public DBUser getUser(String remoteUser) throws DSProviderException {
			// TODO Auto-generated method stub
			DBUser user = new DBUser();
			user.setUserUUID("ut-usr-01");
			return user;
		}
		
	}
	
	class MyHttpServletResponseMock extends HttpServletResponseMock {
		
		@Override
		public PrintWriter getWriter() throws IOException {
			// TODO Auto-generated method stub
			return new PrintWriter(stringwriter);
		}
	}
	
	CalendarService service = null;
	String eventInstUuid = null;
	String calendarUuid = null;
	String endDate = "2016-12-31T23:59:59";
	StringWriter stringwriter = new StringWriter();
	private static final String ORGID_ATTR = DSConstants.ATTRIBUTE_TYPE_IBM_SAAS_MULTI_TENANCY_ID;
	
	@Override
	protected HttpServletRequest createMockRequest() {
		return new MyHttpServletRequestMock();
	}
	
	@Override
	protected HttpServletResponse createMockResponse() {
		return new MyHttpServletResponseMock();
	}
	
	@Override
	protected void setUp() throws Exception {
		super.setUp();
		
		service = CalendarServiceFactory.INSTANCE.create();
	}
	
	@Override
	protected void tearDown() throws Exception {
		super.tearDown();
	}

	/**
	 * test using api to get event feeds.
	 * 
	 * when set the enddate as one day's end time, the result should contains the type of allday event of that day.
	 */
	public void testAPI() throws Exception {
		
		String userUuid = UUID.randomUUID().toString();
		String eventUuid = UUID.randomUUID().toString();
		String eventUuid2 = UUID.randomUUID().toString();
		
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
		
		DBEventInfo alldayEventInfo = makeDBAlldayEventInfo(cal, eventUuid2);
		service.getEventInfoDao().addEventInfo(alldayEventInfo);
		service.flush();
		
		DBEvent event2 = makeDBEvent(cal, eventUuid2, alldayEventInfo, userUuid);
		service.getEventDAO().addEvent(event2);
		service.flush();
		
		DBEventInstance eventInstance2 = makeDBEventInstance2(cal, event2);
		service.getEventInstanceDao().addEventInstance(eventInstance2);
		service.flush();
		
		DBEventInstance eventInstance3 = makeDBEventInstance3(cal, event2);
		service.getEventInstanceDao().addEventInstance(eventInstance3);
		service.flush();
		
		eventInstUuid = eventInstance3.getEventInst_UUID();
		
		// Now let's retrieve it with the export
		CalendarServlet servlet = new CalendarServlet() {
			@Override
			protected IPermissionHelper createPermissionHelper()
					throws DSProviderException {
				return new MyPermissionHelperMock();
			}
		};
		servlet.init(createMockServletConfig());
		HttpServletRequest request = createMockRequest();
		HttpServletResponse response = createMockResponse();
		servlet.doGet(request, response);
		String feed = stringwriter.toString();
		assertNotNull(feed);
		assertNotNull(eventInstUuid);
		assertEquals("2016-12-31T23:59:59", request.getParameter("endDate"));
		assertTrue("api get 12 31 before events contains day-31 allday event.", feed.contains(eventInstUuid));
		// Should the UID be event instance UUID?
		// Currently set as event UUID
	}

	private DBCalendar makeDBCalendar() {
		String uuid = UUID.randomUUID().toString();
		calendarUuid = uuid;
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
	
	private DBEventInfo makeDBAlldayEventInfo(DBCalendar calendar, String eventUuid) {
		DBEventInfo eventInfo = new DBEventInfo();
		eventInfo.setEventInfo_UUID(UUID.randomUUID().toString());
		eventInfo.setCalendar_UUID(calendar.getCalendar_UUID());
		eventInfo.setEvent_UUID(eventUuid);
		eventInfo.setName("12 30 31 allday event");
		eventInfo.setDescription("12 30 31 allday event.");
		eventInfo.setLocation("At the zoo");
		eventInfo.setIsAllDay(Boolean.TRUE);
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
		theCal.set(2016, Calendar.DECEMBER, 31, 8, 0);
		inst.setStartDate(theCal.getTime());
		theCal.set(2016, Calendar.DECEMBER, 31, 9, 0);
		inst.setEndDate(theCal.getTime());

		return inst;
	}
	
	private DBEventInstance makeDBEventInstance2(DBCalendar calendar, DBEvent event) {
		DBEventInstance inst = new DBEventInstance();
		inst.setEventInst_UUID(UUID.randomUUID().toString());
		inst.setEvent_UUID(event.getEvent_UUID());
		inst.setCalendar_UUID(calendar.getCalendar_UUID());
		inst.setStartDate(Utilities.getStartOfUTCDay(new AtomParser().parseCalendar("2016-12-29T08:00:00+08:00")));
		inst.setEndDate(Utilities.getStartOfNextUTCDay(new AtomParser().parseCalendar("2016-12-29T08:00:00+08:00")));

		return inst;
	}
	
	private DBEventInstance makeDBEventInstance3(DBCalendar calendar, DBEvent event) {
		DBEventInstance inst = new DBEventInstance();
		inst.setEventInst_UUID(UUID.randomUUID().toString());
		inst.setEvent_UUID(event.getEvent_UUID());
		inst.setCalendar_UUID(calendar.getCalendar_UUID());
		inst.setStartDate(Utilities.getStartOfUTCDay(new AtomParser().parseCalendar("2016-12-30T08:00:00+08:00")));
		inst.setEndDate(Utilities.getStartOfNextUTCDay(new AtomParser().parseCalendar("2016-12-30T08:00:00+08:00")));

		return inst;
	}
}
