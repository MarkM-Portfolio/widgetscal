/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2011                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.exception;

import com.ibatis.common.jdbc.exception.NestedSQLException;
import com.ibm.lconn.calendar.db.dao.map.SqlMapDaoBaseImpl;
import com.ibm.lconn.calendar.exception.CalendarException;

/**
 * @author damianoa
 * @author skomard
 */

public class DatabaseException extends CalendarException {
	private static final long serialVersionUID = 1L;

	public DatabaseException(Throwable cause) {
		super(cause);
	}
	
	public boolean isDuplicateKeyException() {
		return DatabaseException.isDuplicateKeyException(this.getCause());
    }
	
	public static boolean isDuplicateKeyException(Throwable err) {
		while(err != null) {
			if (err instanceof NestedSQLException) {
	            NestedSQLException sqlEx = (NestedSQLException)err;
	            if(SqlMapDaoBaseImpl.databaseType != null) {
	            	int errCode = sqlEx.getErrorCode();
	            	if(SqlMapDaoBaseImpl.databaseType.equals(SqlMapDaoBaseImpl.DB2)) {
	            		return errCode == -803;
	            	} else if(SqlMapDaoBaseImpl.databaseType.equals(SqlMapDaoBaseImpl.ORACLE)) {
	            		return errCode == 1;
	            	} else if(SqlMapDaoBaseImpl.databaseType.equals(SqlMapDaoBaseImpl.MSSQL)) {
	            		return errCode == 2601 || errCode == 2627;
	            	}
	            } else {
		            if ( "23000".equals(sqlEx.getSQLState()) || "23505".equals(sqlEx.getSQLState())){
		                return true;
		            }
	            }
	        }
			err = err.getCause();
		}
        return false;
    }
}
