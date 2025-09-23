<%-- ***************************************************************** --%>
<%--                                                                   --%>
<%-- IBM Confidential                                                  --%>
<%--                                                                   --%>
<%-- OCO Source Materials                                              --%>
<%--                                                                   --%>
<%-- Copyright IBM Corp. 2011, 2016                                    --%>
<%--                                                                   --%>
<%-- The source code for this program is not published or otherwise    --%>
<%-- divested of its trade secrets, irrespective of what has been      --%>
<%-- deposited with the U.S. Copyright Office.                         --%>
<%--                                                                   --%>
<%-- ***************************************************************** --%>

<%--
 @author skomard
--%>
<%@ page contentType="text/xml;charset=UTF-8" session="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.ibm.lconn.calendar.exception.CalendarException" %>

<error xmlns="http://www.ibm.com/xmlns/prod/sn">
	<code>
		<c:if test="${requestScope['code'] != null}"><c:out value="${requestScope['code']}" /></c:if>
	</code>
	<logid>
		<c:choose>
			<c:when test="${!empty requestScope['logId']}"><c:out value="${requestScope['logId']}" /></c:when>
			<c:otherwise></c:otherwise>
		</c:choose>
	</logid>
	<message>
		<c:if test="${requestScope['errorMessage'] != null}"><c:out value="${requestScope['errorMessage'] }" /></c:if>
	</message>
</error>
