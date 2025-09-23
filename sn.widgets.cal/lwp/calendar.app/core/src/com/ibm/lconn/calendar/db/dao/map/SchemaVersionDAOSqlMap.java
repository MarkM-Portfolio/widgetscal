/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.dao.map;

import java.util.Map;

import com.ibatis.dao.client.DaoManager;
import com.ibm.lconn.calendar.db.dao.model.SchemaVersionDAO;


/**
 * @author Qi Wei Zhang
 */

public class SchemaVersionDAOSqlMap extends SqlMapDaoBaseImpl implements SchemaVersionDAO {
	
	public SchemaVersionDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}
	
	
	// Methods
	
	public Map<String, String> getSchemaVersionForCalendarDB() {
		return (Map<String, String>)super.queryForObject("SchemaVersion.getSchemaVersionForCalendarDB");
	}
	
}