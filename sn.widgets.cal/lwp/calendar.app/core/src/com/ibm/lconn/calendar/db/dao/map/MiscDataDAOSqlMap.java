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

package com.ibm.lconn.calendar.db.dao.map;

import java.util.HashMap;
import java.util.Map;

import com.ibatis.dao.client.DaoManager;
import com.ibm.lconn.calendar.db.dao.model.MiscDataDAO;
import com.ibm.lconn.calendar.db.model.DBMiscData;

public class MiscDataDAOSqlMap extends SqlMapDaoBaseImpl implements MiscDataDAO {
	public MiscDataDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}

	public void insertData(DBMiscData data) {
		super.insert("MiscData.insertData", data);
	}

	public Integer updateData(DBMiscData data) {
		return super.update("MiscData.updateData", data);
	}

	public Integer deleteData(String name, String value) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("name", name);
		params.put("val", value);
		return super.delete("MiscData.deleteData", params);
	}

	public DBMiscData getData(String name) {
		return (DBMiscData) super.queryForObject("MiscData.selectData", name);
	}
}
