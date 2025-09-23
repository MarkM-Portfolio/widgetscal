<%@ page import="com.ibm.lconn.core.web.auth.LCRestSecurityHelper, 
                    com.ibm.ventura.internal.config.api.VenturaConfigurationProvider, 
                    com.ibm.ventura.internal.config.helper.api.VenturaConfigurationHelper,
                    com.ibm.lconn.calendar.util.*"
%><%

VenturaConfigurationHelper helper = VenturaConfigurationHelper.Factory.getInstance();
VenturaConfigurationProvider provider = VenturaConfigurationProvider.Factory.getInstance();
if (!request.isSecure() && (helper.getForceConfidentialCommunications() || provider.isSecureServiceEnabled("communities"))) {
	

   String url = provider.getSecureServiceURL("communities").toString() + Utilities.getPathInfo((String)request.getAttribute("REMOTE_URL"), "communities");
   if(url.endsWith("//")) {
	   url = url.substring(0, url.length() - 1);
   }
   response.sendRedirect(url);
   return;
}

%>

<%-- ***************************************************************** --%>
<%--                                                                   --%>
<%-- IBM Confidential                                                  --%>
<%--                                                                   --%>
<%-- OCO Source Materials                                              --%>
<%--                                                                   --%>
<%-- Copyright IBM Corp. 2011                                          --%>
<%--                                                                   --%>
<%-- The source code for this program is not published or otherwise    --%>
<%-- divested of its trade secrets, irrespective of what has been      --%>
<%-- deposited with the U.S. Copyright Office.                         --%>
<%--                                                                   --%>
<%-- ***************************************************************** --%>

<%
response.setHeader("Pragma","no-cache");
response.setHeader("Cache-Control","no-cache");
response.setDateHeader("Expires", 0);
response.addHeader("Cache-Control","private,no-store,max-stale=0");

response.setStatus(401);
response.setHeader("WWW-Authenticate","Basic realm=\"ibm-connections\"");
%>
