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

import com.ibm.lconn.dbmigration.DefaultDbMigration;
import com.ibm.lconn.dbmigration.InvalidMigrationParametersException;

public class DBFixup08 extends DefaultDbMigration {

	public DBFixup08(String[] args) throws InvalidMigrationParametersException {
		super(args);
	}

	@Override
	public String getDescription() {
		return "Community Events DB Migration - Fixup 08";
	}

	public static void main(String[] argv) throws Exception {
		DBFixup08 inst = new DBFixup08(argv);
		
		//Connection con = null;
		try { 
			//con = inst.getConnection();
			
			System.out.println(inst.getDescription() + ":" + "Migration Success!");
		} catch (Exception ex) {
			System.err.println(inst.getDescription() + ":" + "Migration failed, data may be inconsistent.");
			throw ex;
		}
		finally {
			try{
				//con.close();
			}
			catch(Exception ex) {
			}
		}
	}
	
}
