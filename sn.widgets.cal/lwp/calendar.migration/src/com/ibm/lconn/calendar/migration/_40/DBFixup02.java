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

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import java.util.TimeZone;

import com.ibm.lconn.dbmigration.DefaultDbMigration;
import com.ibm.lconn.dbmigration.InvalidMigrationParametersException;

public class DBFixup02 extends DefaultDbMigration {
	public static final int MAX_READ = 200;
	public static final int MAX_COMMIT = 25;
	
	public DBFixup02(String[] args) throws InvalidMigrationParametersException {
		super(args);
	}

	@Override
	public String getDescription() {
		return "Community Events DB Migration - Fixup 02";
	}

	public static void main(String[] argv) throws Exception {
		DBFixup02 inst = new DBFixup02(argv);
		
		Connection con = null;
		try { 
			con = inst.getConnection();
			
			fixup_cal_createon(con);
			fixup_cal_aclmodtime(con);
			fixup_recurrence_modifiedon(con);
			fixup_substitution_modifiedon(con);
			
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
	
	static void fixup_cal_createon(Connection conn) throws SQLException {
		String selSql1 = "SELECT CALENDAR_UUID FROM CALENDAR.CA_CALENDAR ORDER BY CALENDAR_UUID ASC";
		String selSql2 = "SELECT CALENDAR_UUID FROM CALENDAR.CA_CALENDAR WHERE CALENDAR_UUID > ? ORDER BY CALENDAR_UUID ASC";
		String updateSql1 = "UPDATE CALENDAR.CA_CALENDAR SET CREATEDON = ? WHERE CALENDAR_UUID = ?";
		
		PreparedStatement selStmt1 = conn.prepareStatement(selSql1);
		PreparedStatement selStmt2 = conn.prepareStatement(selSql2);
		PreparedStatement updateStmt1 = conn.prepareStatement(updateSql1);
		
		boolean done = false;
		String lastId = null;
		List<String> updateItems = new ArrayList<String>();
		while(!done) {
			updateItems = new ArrayList<String>();
			
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
				updateItems.add(lastId);
				
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
			
			for(Iterator<String> iter = updateItems.iterator(); iter.hasNext();) {
				String item = iter.next();
				
				Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
				cal.set(2000, 0, 1, 0, 0, 0);
				
				updateStmt1.setTimestamp(1, new Timestamp(cal.getTimeInMillis()));
				updateStmt1.setString(2, item);
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
		
		System.out.println("fixup_cal_createon: Done.");
	}
	
	static void fixup_cal_aclmodtime(Connection conn) throws SQLException {
		String selSql1 = "SELECT CALENDAR_UUID FROM CALENDAR.CA_CALENDAR ORDER BY CALENDAR_UUID ASC";
		String selSql2 = "SELECT CALENDAR_UUID FROM CALENDAR.CA_CALENDAR WHERE CALENDAR_UUID > ? ORDER BY CALENDAR_UUID ASC";
		String updateSql1 = "UPDATE CALENDAR.CA_CALENDAR SET ACLMODTIME = LAST_MODIFIED WHERE CALENDAR_UUID = ?";
		
		PreparedStatement selStmt1 = conn.prepareStatement(selSql1);
		PreparedStatement selStmt2 = conn.prepareStatement(selSql2);
		PreparedStatement updateStmt1 = conn.prepareStatement(updateSql1);
		
		boolean done = false;
		String lastId = null;
		List<String> updateItems = new ArrayList<String>();
		while(!done) {
			updateItems = new ArrayList<String>();
			
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
				updateItems.add(lastId);
				
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
			
			for(Iterator<String> iter = updateItems.iterator(); iter.hasNext();) {
				String item = iter.next();
				
				updateStmt1.setString(1, item);
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
		
		System.out.println("fixup_cal_aclmodtime: Done.");
	}
	
	static void fixup_recurrence_modifiedon(Connection conn) throws SQLException {
		class _Item {
			String id = null;
			Timestamp modifiedOn = null;
		}
		
		String selSql1 = "SELECT EVENT_UUID, MODIFIEDON FROM CALENDAR.CA_EVENT WHERE ISRECURRENCE = 1 ORDER BY EVENT_UUID ASC";
		String selSql2 = "SELECT EVENT_UUID, MODIFIEDON FROM CALENDAR.CA_EVENT WHERE ISRECURRENCE = 1 AND EVENT_UUID > ? ORDER BY EVENT_UUID ASC";
		String updateSql1 = "UPDATE CALENDAR.CA_RECURRENCE SET MODIFIEDON = ? WHERE EVENT_UUID = ?";
		
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
				item.id = lastId;
				item.modifiedOn = rs.getTimestamp(2);
				
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
				
				updateStmt1.setTimestamp(1, item.modifiedOn);
				updateStmt1.setString(2, item.id);
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
		
		System.out.println("fixup_recurrence_modifiedon: Done.");
	}
	
	static void fixup_substitution_modifiedon(Connection conn) throws SQLException {
		class _Item {
			String id = null;
			Timestamp modifiedOn = null;
		}
		
		Random rand = new Random();
		
		String selSql1 = "SELECT SUB.SUBSTITUTION_UUID, RECUR.MODIFIEDON FROM CALENDAR.CA_SUBSTITUTION SUB INNER JOIN CALENDAR.CA_RECURRENCE RECUR ON SUB.EVENT_UUID = RECUR.EVENT_UUID ORDER BY SUB.SUBSTITUTION_UUID ASC";
		String selSql2 = "SELECT SUB.SUBSTITUTION_UUID, RECUR.MODIFIEDON FROM CALENDAR.CA_SUBSTITUTION SUB INNER JOIN CALENDAR.CA_RECURRENCE RECUR ON SUB.EVENT_UUID = RECUR.EVENT_UUID WHERE SUB.SUBSTITUTION_UUID > ? ORDER BY SUB.SUBSTITUTION_UUID ASC";
		String updateSql1 = "UPDATE CALENDAR.CA_SUBSTITUTION SET MODIFIEDON = ? WHERE SUBSTITUTION_UUID = ?";
		
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
				item.id = lastId;
				item.modifiedOn = rs.getTimestamp(2);
				
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
				
				item.modifiedOn = new Timestamp(item.modifiedOn.getTime() + rand.nextInt(1000));
				
				updateStmt1.setTimestamp(1, item.modifiedOn);
				updateStmt1.setString(2, item.id);
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
		
		System.out.println("fixup_substitution_modifiedon: Done.");
	}
}
