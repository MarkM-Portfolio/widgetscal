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
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.ibm.lconn.dbmigration.DefaultDbMigration;
import com.ibm.lconn.dbmigration.InvalidMigrationParametersException;

public class DBFixup10 extends DefaultDbMigration {
	public static final int MAX_READ = 200;
	public static final int MAX_COMMIT = 25;
	
	public DBFixup10(String[] args) throws InvalidMigrationParametersException {
		super(args);
	}

	@Override
	public String getDescription() {
		return "Community Events DB Migration - Fixup 10";
	}

	public static void main(String[] argv) throws Exception {
		DBFixup10 inst = new DBFixup10(argv);
		
		Connection con = null;
		try { 
			con = inst.getConnection();
			con.setAutoCommit(false);
			
			fixup_cal_widgetdef(con);
			
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
	
	static void fixup_cal_widgetdef(Connection conn) throws SQLException {
		class _Item {
			String extKey = null;
			String extValue = null;
		}
		
		String selSql1 = "SELECT C.CALENDAR_UUID, E.EXT_KEY, E.EXT_VALUE_EXTENDED, EXT_VALUE_EXTENDED_CHKSUM FROM SNCOMM.LC_EXTENSIONS E INNER JOIN CALENDAR.CA_CALENDAR C ON E.EXT_RESOURCE_ID = C.COMMUNITY_UUID ORDER BY C.CALENDAR_UUID ASC";
		String selSql2 = "SELECT C.CALENDAR_UUID, E.EXT_KEY, E.EXT_VALUE_EXTENDED, EXT_VALUE_EXTENDED_CHKSUM FROM SNCOMM.LC_EXTENSIONS E INNER JOIN CALENDAR.CA_CALENDAR C ON E.EXT_RESOURCE_ID = C.COMMUNITY_UUID WHERE C.CALENDAR_UUID > ? ORDER BY C.CALENDAR_UUID ASC";
		String updateSql1 = "UPDATE SNCOMM.LC_EXTENSIONS SET EXT_VALUE_EXTENDED = ?, EXT_VALUE_EXTENDED_CHKSUM = ? WHERE EXT_KEY = ?";
		
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
				item.extKey = rs.getString(2);
				try {
					item.extValue = new String(rs.getBytes(3), "UTF-8");
				} catch (UnsupportedEncodingException e) {
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
				
				String v = item.extValue.replace(" defIdRef=\"Events\"", " defIdRef=\"Calendar\"");
				byte[] b = null;
				try {
					b = v.getBytes("UTF-8");
				} catch (UnsupportedEncodingException e) {
				}
				
				String c = null;
				try {
					MessageDigest md = MessageDigest.getInstance("MD5");
					byte[] d = md.digest(b);
					c = stringify(d);
				} catch (NoSuchAlgorithmException e) {
				}
				
				updateStmt1.setBytes(1, b);
				updateStmt1.setString(2, c);
				updateStmt1.setString(3, item.extKey);
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
	
	public static String stringify(byte[] bytes) {
		char[] HEXCHARS = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };
		StringBuffer buf = new StringBuffer();
		for (int i = 0; i < bytes.length; ++i) {
		    int j = (bytes[i] >= 0) ? bytes[i] : 256 + bytes[i];
		    buf.append(HEXCHARS[((j & 0xF0) >> 4)]);
		    buf.append(HEXCHARS[(j & 0xF)]);
		}
		return buf.toString();
    }
}
