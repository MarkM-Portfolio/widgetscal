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

package com.ibm.lconn.calendar.migration;

import com.ibm.lconn.calendar.migration._40.DBFixup02;
import com.ibm.lconn.calendar.migration._40.DBFixup03;
import com.ibm.lconn.calendar.migration._40.DBFixup04;
import com.ibm.lconn.calendar.migration._40.DBFixup05;
import com.ibm.lconn.calendar.migration._40.DBFixup06;
import com.ibm.lconn.calendar.migration._40.DBFixup07;
import com.ibm.lconn.calendar.migration._40.DBFixup08;
import com.ibm.lconn.calendar.migration._40.DBFixup09;
import com.ibm.lconn.calendar.migration._40.DBFixup10;
import com.ibm.lconn.dbmigration.DefaultDbMigration;
import com.ibm.lconn.dbmigration.InvalidMigrationParametersException;

/**
 * Community Events Data Migration, From 3.0.x to 4.0
 * @author Qi Wei Zhang
 */
public class MigrationFrom301To40 extends DefaultDbMigration {
	public MigrationFrom301To40(String[] args) throws InvalidMigrationParametersException {
		super(args);
	}

	@Override
	public String getDescription() {
		return "Community Events DB Migration - from 301 to 40";
	}

	public static void main(String[] argv) throws Exception {
		try {
			DBFixup02.main(argv);
			DBFixup03.main(argv);
			DBFixup04.main(argv);
			DBFixup05.main(argv);
			DBFixup06.main(argv);
			DBFixup07.main(argv);
			DBFixup08.main(argv);
			DBFixup09.main(argv);
			DBFixup10.main(argv);
			System.out.println("Migration Success!");
		} catch (Exception ex) {
			System.err.println("Migration failed, data may be inconsistent.");
			throw ex;
		}
	}
}
