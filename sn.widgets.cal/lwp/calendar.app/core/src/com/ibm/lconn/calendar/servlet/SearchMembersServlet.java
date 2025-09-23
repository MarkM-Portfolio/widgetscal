/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.servlet;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.namespace.QName;

import org.apache.abdera.model.Document;
import org.apache.abdera.model.Element;
import org.apache.abdera.model.Entry;
import org.apache.abdera.model.Feed;
import org.apache.abdera.model.Person;
import org.apache.abdera.protocol.client.AbderaClient;
import org.apache.abdera.protocol.client.ClientResponse;
import org.apache.abdera.protocol.client.RequestOptions;
import org.apache.commons.lang.StringUtils;

import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;
import com.ibm.lconn.calendar.db.model.DBCalendar;
import com.ibm.lconn.calendar.db.model.DBUser;
import com.ibm.lconn.calendar.util.CalendarOperation;
import com.ibm.lconn.calendar.util.LotusLiveUtilities;
import com.ibm.lconn.calendar.util.ResourceBundleUtils;
import com.ibm.lconn.calendar.util.UserUtilities;
import com.ibm.lconn.calendar.util.Utilities;
import com.ibm.lconn.core.web.cache.WebCacheUtil;
import com.ibm.lconn.core.web.util.TLSSocketFactory;

public class SearchMembersServlet extends BaseServlet {

	private static final long serialVersionUID = -1084914304698611990L;
	private static final String CLASS_NAME = SearchMembersServlet.class.getName();
	private static final Logger LOGGER = Logger.getLogger(CLASS_NAME);
	
	private static final String NS_OPENSEARCH = "http://a9.com/-/spec/opensearch/1.1/";
	private static final String NS_SNX = "http://www.ibm.com/xmlns/prod/sn";
	
	private static final class QueryResult {
		List<DBUser> members = new ArrayList<DBUser>();
		int totalResults = -1;
		int startIndex = -1; // index started from 1
		int ps = 0;
		String source = null;
		boolean fromNewAPI = false;

		boolean hasPrev() {
			if(fromNewAPI)
				return false;
			return startIndex > 1;
		}

		boolean hasNext() {
			if(fromNewAPI)
				return false;
			return ((startIndex + ps) <= totalResults);
		}
	}
	
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		WebCacheUtil.disableCaching(response);
		
		int offset = 0;
		int ps = 20;

		String commUuid = request.getParameter("commUuid");
		
		String offsetParam = request.getParameter("offset");
		if (offsetParam != null) {
			try {
				offset = Integer.parseInt(offsetParam);
			} catch(NumberFormatException e) {
			}
		}
		
		String psParam = request.getParameter("ps");
		if (psParam != null) {
			try {
				int _ps = Integer.parseInt(psParam);
				ps = _ps <= 0 ? ps : _ps;
			} catch(NumberFormatException e) {
			}
		}
		
		QueryResult result = null;
		
		DBUser loginUser = null;
		try {
			// check permission
			DBUser user = permissionHelper.getUser(request);
			DBCalendar calendar = crud.getCalendarDAO().getCalendar(commUuid);

			int status = permissionHelper.isUserAuthorized(request, calendar, null, CalendarOperation.VIEW);
			if (status == HttpServletResponse.SC_OK) {
				result = getCommunityMembers(commUuid, offset + 1, ps, request);
			} else {
				// unauthorized
				response.setStatus(status);
				return;
			}
			
			loginUser = user;
		} catch(Exception e) {
			ResourceBundle bundle = ResourceBundleUtils.getMessageBundle();
			LOGGER.log(Level.SEVERE, bundle.getString("error.unknown"), e);
		}
		
		if (result != null) {	// success
			response.setContentType("application/json; charset=utf-8");
			JSONObject obj = new JSONObject();
			obj.put("success", true);
			obj.put("totalResults", result.totalResults);
			obj.put("startIndex", result.startIndex);
			obj.put("ps", result.ps);
			obj.put("hasPrev", result.hasPrev() ? true : false);
			obj.put("hasNext", result.hasNext() ? true : false);
			obj.put("source", result.source);
			JSONArray names = new JSONArray();
			obj.put("names", names);
			
			int count = 0;
			for (Iterator<DBUser> iter = result.members.iterator(); iter.hasNext();) {
				DBUser t = iter.next();
				if(loginUser != null && t.getUserExtID().equals(loginUser.getUserExtID())) {
					continue;
				}
				count++;
				names.add(toJsonObj(t));
				if(count >= ps) {
					break;
				}
			}
			
			response.getWriter().print("{}&&"+obj.toString());
			response.flushBuffer();
			
		} else {
			ResourceBundle bundle = ResourceBundleUtils.getUIBundle(request.getLocale());
			onError(bundle.getString("error.unknown"), request, response);
		}
	}
	
	protected void onError(String err, HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=utf-8");
		JSONObject obj = new JSONObject();
		obj.put("success", false);
		obj.put("error", err);
		response.getWriter().print("{}&&"+obj.toString());
		response.flushBuffer();
	}
	
	private QueryResult getCommunityMembers(String commUuid, int offset, int ps, HttpServletRequest request) throws Exception {
		String commUrl = Utilities.getInterServiceUrl("communities");
		if(LOGGER.isLoggable(Level.FINEST)) {
			LOGGER.log(Level.FINEST, "getCommunityMembers for commUuid " + commUuid);
			LOGGER.log(Level.FINEST, "community interservice url is " + commUrl);
		}
		if (commUrl != null) {
			AbderaClient client = new AbderaClient(abdera);
			AbderaClient.registerFactory(new TLSSocketFactory(),getPortForHttpUrl(commUrl));
			
			String userNameParam = request.getParameter("userName");
			userNameParam = StringUtils.trimToEmpty(userNameParam);
			
			String useNewAPI = request.getParameter("useNewAPI");
			useNewAPI = StringUtils.trimToEmpty(useNewAPI);
			
			String cookieHeader = request.getHeader("Cookie");
			RequestOptions opt = client.getDefaultRequestOptions();
			opt.setHeader("Cookie", cookieHeader);

			StringBuffer urlBuf = null;
			if("1".equals(useNewAPI)){
				urlBuf = new StringBuffer();
				urlBuf.append(commUrl);
				urlBuf.append("/service/json/v1/community/activepersonmembers");
				urlBuf.append("?communityUuid=").append(commUuid);
				urlBuf.append("&limit=").append(ps);
				urlBuf.append("&offset=").append(offset-1);
				if(!"".equals(userNameParam)){
					urlBuf.append("&query=" + userNameParam);
				}
			}else{
				urlBuf = new StringBuffer();
				urlBuf.append(commUrl);
				urlBuf.append("/service/atom/forms/community/members");
				urlBuf.append("?communityUuid=").append(commUuid);
				urlBuf.append("&sortField=name");
				urlBuf.append("&format=full");
				urlBuf.append("&userState=active");
				urlBuf.append("&type=person");
				urlBuf.append("&ps=").append(ps);
				urlBuf.append("&page=").append(offset / ps + 1);
				if(!"".equals(userNameParam)){
					urlBuf.append("&search=" + userNameParam);
				}
			}
			if(Utilities.isLotusLiveEnabled() && LotusLiveUtilities.isAvailable) {
				try {
					urlBuf.append("&").append(LotusLiveUtilities.PARAM_S2STOKEN).append("=").append(URLEncoder.encode(LotusLiveUtilities.getS2SToken(), "utf-8"));
					urlBuf.append("&").append(LotusLiveUtilities.PARAM_ONBEHALFOF).append("=").append(URLEncoder.encode(LotusLiveUtilities.getCurrentUser(), "utf-8"));
				} catch(UnsupportedEncodingException e) {
					// ignore
				}
			}
			
			ClientResponse response = client.get(urlBuf.toString(), opt);
						
			if(LOGGER.isLoggable(Level.FINEST)) {
				LOGGER.log(Level.FINEST, "status: " + response.getStatus() + ", content-type: " + response.getContentType());
			}
			if (response.getStatus() == 200
					&& response.getContentType().toString().contains("application/atom+xml")) {
				QueryResult result = new QueryResult();
				
				Document<Feed> doc = response.getDocument(abdera.getParser());
				Feed feed = doc.getRoot();
				List<Entry> entries = feed.getEntries();
				for (Entry entry : entries) {
					Person person = entry.getContributors().get(0);
					Element uid = person.getExtension(new QName(NS_SNX, "userid"));
					
					DBUser user = new DBUser();
					user.setUserName(person.getName());
					if (StringUtils.isBlank(person.getName())) {
						user.setUserName(entry.getTitle());
					}
					user.setUserEmail(person.getEmail());
					if (uid != null) {
						user.setUserExtID(uid.getText());
						user = UserUtilities.findUserByExtId(user.getUserExtID(), false);
						if (user != null)
							result.members.add(user);
					}
				}	// end of FOR
				
				Element elem = feed.getExtension(new QName(NS_OPENSEARCH, "totalResults"));
				result.totalResults = Integer.parseInt(elem.getText());
				
				elem = feed.getExtension(new QName(NS_OPENSEARCH, "startIndex"));
				result.startIndex = Integer.parseInt(elem.getText());
				
				elem = feed.getExtension(new QName(NS_OPENSEARCH, "itemsPerPage"));
				result.ps = Integer.parseInt(elem.getText());
				
				result.source = "communities";
				
				return result;
			}else if (response.getStatus() == 200
					&& response.getContentType().toString().contains("application/json")) {//get result by new api
				QueryResult result = new QueryResult();
				JSONObject json = JSONObject.parse(response.getInputStream());
				
				JSONArray members = (JSONArray)json.get("items");
				for (Object object : members) {
					JSONObject obj = (JSONObject)object;
					DBUser user = new DBUser();
					user.setUserName(obj.get("name").toString());
					user.setORG_ID(obj.get("org_id").toString());
					user = UserUtilities.findUserByExtId(obj.get("directory_uuid").toString(), false);
					if (user != null)
						result.members.add(user);
				}
				result.totalResults = members.size();
				result.startIndex = Integer.parseInt(json.get("offset").toString());
				result.ps = Integer.parseInt(json.get("limit").toString());
				result.source = "communities";
				result.fromNewAPI = true;
				return result;
			}
		}
		return null;
	}
	
	private int getPortForHttpUrl(String url) throws MalformedURLException {
		URL urlObject = new URL(url);
		int port = urlObject.getPort();

		if (port == -1) {
			if (urlObject.getProtocol().startsWith("https")) {
				port = 443;
			} else {
				port = 80;
			}
		}

		return port;
	}
	
	private JSONObject toJsonObj(DBUser user) {
		JSONObject obj = new JSONObject();
		obj.put("userid", user.getUserExtID());
		obj.put("name", user.getUserName());
		if(Utilities.isEmailExposed() && StringUtils.isNotBlank(user.getUserEmail())) {
			obj.put("email", user.getUserEmail());
		}
		return obj;
	}
}
