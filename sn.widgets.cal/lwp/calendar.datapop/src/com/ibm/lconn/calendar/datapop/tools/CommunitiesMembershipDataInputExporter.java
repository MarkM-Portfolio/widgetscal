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

package com.ibm.lconn.calendar.datapop.tools;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class CommunitiesMembershipDataInputExporter {
	public static String getDbType(String dbUrl) {
		String str = dbUrl.substring(dbUrl.indexOf("jdbc:") + 5);
		if (str.startsWith("db2"))
			return "db2";
		if (str.startsWith("oracle"))
			return "oracle";
		if (str.startsWith("sqlserver")) {
			return "sqlserver";
		}
		String str1 = "Not supported Db Type : " + str;
		throw new IllegalArgumentException(str1);
	}

	public static Connection getConnection(String dbUrl, String dbUser, String dbPassword) throws Exception {
		String str1 = getDbType(dbUrl);
		String str2 = "";
		if (str1.equals("db2"))
			str2 = "com.ibm.db2.jcc.DB2Driver";
		else if (str1.equals("oracle"))
			str2 = "oracle.jdbc.driver.OracleDriver";
		else if (str1.equals("sqlserver")) {
			str2 = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
		}

		try {
			Class.forName(str2);
			return DriverManager.getConnection(dbUrl, dbUser, dbPassword);
		} catch (Exception ex) {
			throw ex;
		}
	}

	public static void main(String[] args) throws Exception {
		String dburl = null, dbuser = null, dbpassword = null, output = null;
		int size = -1;
		boolean opti = false;
		for (int i = 0; i < args.length; i++) {
			if ("-dburl".equals(args[i])) {
				i++;
				dburl = args[i];
			} else if ("-dbuser".equals(args[i])) {
				i++;
				dbuser = args[i];
			} else if ("-dbpassword".equals(args[i])) {
				i++;
				dbpassword = args[i];
			} else if ("-output".equals(args[i])) {
				i++;
				output = args[i];
			} else if ("-size".equals(args[i])) {
				i++;
				size = Integer.parseInt(args[i]);
			} else if ("-opti".equals(args[i])) {
				opti = true;
			}
		}
		
		BufferedWriter writer = new BufferedWriter(new FileWriter(output));

		Connection conn = null;
		try {
			conn = getConnection(dburl, dbuser, dbpassword);
			
			String selSql1 = "SELECT m.COMMUNITY_UUID, m.MEMBER_UUID, mp.DIRECTORY_UUID, m.ROLE, mp.STATE FROM SNCOMM.MEMBER m INNER JOIN SNCOMM.MEMBERPROFILE mp ON m.MEMBER_UUID = mp.MEMBER_UUID ORDER BY m.COMMUNITY_UUID ASC";
			String selSql2 = "SELECT m.COMMUNITY_UUID, m.MEMBER_UUID, mp.DIRECTORY_UUID, m.ROLE, mp.STATE FROM SNCOMM.MEMBER m INNER JOIN SNCOMM.MEMBERPROFILE mp ON m.MEMBER_UUID = mp.MEMBER_UUID WHERE m.COMMUNITY_UUID > ? ORDER BY m.COMMUNITY_UUID ASC";
			
			if("db2".equals(getDbType(dburl)) && opti) {
				selSql1 += " OPTIMIZE FOR 1 ROWS";
				selSql2 += " OPTIMIZE FOR 1 ROWS";
			}
			
			PreparedStatement selStmt1 = conn.prepareStatement(selSql1);
			PreparedStatement selStmt2 = conn.prepareStatement(selSql2);
			
			boolean done = false;
			boolean firstLine = true;
			String currentCommunityUUID = null;
			String lastCommunityUUID = null;
			int total = 0;
			while(!done) {
				ResultSet rs = null;
				if(lastCommunityUUID == null) {
					rs = selStmt1.executeQuery(); 
				}
				else {
					selStmt2.setString(1, lastCommunityUUID);
					rs = selStmt2.executeQuery();
				}
				
				int rowsRead = 0;
				while (rs.next()) {
					if(rs.getInt(5) != 0) continue;
					
					lastCommunityUUID = rs.getString(1);
					
					if(!lastCommunityUUID.equals(currentCommunityUUID)) {
						currentCommunityUUID = null;
						if(size > 0 && total >= size) {
							done = true;
							break;
						}
						if(rowsRead > 300) {
							break;
						}
					}
					
					if(currentCommunityUUID == null) {
						if(!firstLine) {
							writer.newLine();
						}
						firstLine = false;
						writer.write(lastCommunityUUID);
						currentCommunityUUID = lastCommunityUUID;
						total++;
					}
					writer.write(",");
					writer.write(rs.getString(3));
					writer.write(",");
					writer.write(Integer.toString(rs.getInt(4)));
					
					rowsRead++;
				}
				conn.commit();
				rs.close();
				
				if (rowsRead == 0 || rowsRead < 300) {
					done = true;
				}
			}
		} catch (Exception ex) {
			throw ex;
		} finally {
			try {
				conn.close();
			} catch (Exception ex) {
			}
			try {
				writer.flush();
				writer.close();
			} catch (Exception ex) {
			}
		}
	}
}
