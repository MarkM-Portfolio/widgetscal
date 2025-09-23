/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.migration._40;

import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.ibm.lconn.dbmigration.DefaultDbMigration;
import com.ibm.lconn.dbmigration.InvalidMigrationParametersException;

public class DBFixup03 extends DefaultDbMigration {
	public static final int MAX_READ = 200;
	public static final int MAX_COMMIT = 25;
	
	public DBFixup03(String[] args) throws InvalidMigrationParametersException {
		super(args);
	}

	@Override
	public String getDescription() {
		return "Community Events DB Migration - Fixup 03";
	}

	public static void main(String[] argv) throws Exception {
		DBFixup03 inst = new DBFixup03(argv);
		
		Connection con = null;
		try { 
			con = inst.getConnection();
			
			fixup_cal_widgetid(con);
			
			System.out.println(inst.getDescription() + ":" + "Migration Success!");
		} catch (Exception ex) {
			System.err.println(inst.getDescription() + ":" + "Migration failed, data may be inconsistent.");
			throw ex;
		}
		finally {
			try{
				con.close();
			}
			catch(Exception ex) {
			}
		}
	}
	
	static void fixup_cal_widgetid(Connection conn) throws SQLException {
		class _Item {
			String calendarID = null;
			String widgetID = null;
		}
		
		String pattern = "<widgetInstance[^<>]*defIdRef=\"Events\"[^<>]*>";
		Pattern p = Pattern.compile(pattern);
		
		String selSql1 = "SELECT C.CALENDAR_UUID, E.EXT_VALUE_EXTENDED FROM SNCOMM.LC_EXTENSIONS E INNER JOIN CALENDAR.CA_CALENDAR C ON E.EXT_RESOURCE_ID = C.COMMUNITY_UUID ORDER BY C.CALENDAR_UUID ASC";
		String selSql2 = "SELECT C.CALENDAR_UUID, E.EXT_VALUE_EXTENDED FROM SNCOMM.LC_EXTENSIONS E INNER JOIN CALENDAR.CA_CALENDAR C ON E.EXT_RESOURCE_ID = C.COMMUNITY_UUID WHERE C.CALENDAR_UUID > ? ORDER BY C.CALENDAR_UUID ASC";
		String updateSql1 = "UPDATE CALENDAR.CA_CALENDAR SET WIDGETID = ? WHERE CALENDAR_UUID = ?";
		
		PreparedStatement selStmt1 = conn.prepareStatement(selSql1);
		PreparedStatement selStmt2 = conn.prepareStatement(selSql2);
		PreparedStatement updateStmt1 = conn.prepareStatement(updateSql1);
		
		boolean done = false;
		String lastId = null;
		List<_Item> updateItems = new ArrayList<_Item>();
		while(!done) {
			updateItems = new ArrayList<_Item>();
			
			// select a batch of rows, then commit and close the result set
			ResultSet rs = null;
			if(lastId == null) {
				rs = selStmt1.executeQuery(); 
			}
			else {
				selStmt2.setString(1, lastId);
				rs = selStmt2.executeQuery();
			}
			
			int rowsRead = 0;
			while (rs.next() && rowsRead < MAX_READ) {
				lastId = rs.getString(1);
				
				_Item item = new _Item();
				item.calendarID = lastId;
				
				try {
					Matcher m = p.matcher(new String(rs.getBytes(2), "UTF-8"));
					if(m.find()) {
						String s = m.group();
						int t = "instanceId=\"".length();
						int idx1 = s.indexOf("instanceId=\"");
						int idx2 = s.indexOf("\"", idx1 + t);
						item.widgetID = s.substring(idx1 + t, idx2);
					}
				} catch (UnsupportedEncodingException ex) {
					// should not happen
					throw new RuntimeException(ex);
				}
				
				updateItems.add(item);
				
				rowsRead++;
			}
			conn.commit();
			rs.close();
			
			// if we got none, we are just done, if we got less than maxRows, process this batch and we're finished
			// alternatively, could just keep going till there are none
			if (rowsRead == 0) {
				break;
			}
			else if (rowsRead < MAX_READ) {
				done = true;
			}
			
			int commitCount = 0;
			
			for(Iterator<_Item> iter = updateItems.iterator(); iter.hasNext();) {
				_Item item = iter.next();
				
				updateStmt1.setString(1, item.widgetID);
				updateStmt1.setString(2, item.calendarID);
				updateStmt1.executeUpdate();
				commitCount++;
				
				if (commitCount >= MAX_COMMIT) {
					commitCount = 0;
					conn.commit();
				}
			}
			
			if (commitCount > 0) {
				conn.commit();
				
				commitCount = 0;
			}
		}
		
		System.out.println("fixup_cal_widgetid: Done.");
	}
}
