/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.dao.map;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ibatis.dao.client.DaoManager;
import com.ibm.lconn.calendar.db.dao.model.SubstitutionDAO;
import com.ibm.lconn.calendar.db.model.DBSubstitution;


/**
 * @author skomard
 */

public class SubstitutionDAOSqlMap extends SqlMapDaoBaseImpl implements SubstitutionDAO {
	public SubstitutionDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}	
	
	// Methods
	
	public void addSubstitution(DBSubstitution substitution) {
		super.insert("Substitution.insertSubstitution", substitution);
	}
	
	public Integer updateSubstitution(DBSubstitution substitution) {
		return super.update("Substitution.updateSubstitution", substitution);
	}
	
	public Integer deleteSubstitution(String substitution_UUID) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("substitution_UUID", substitution_UUID);
		return super.delete("Substitution.deleteSubstitution", params);
	}
	
	public Integer deleteSubstitutions(String calendar_UUID, String event_UUID) {
		Map<String, Object> params = new HashMap<String,Object>(2);
		if(event_UUID == null) {
			params.put("calendar_UUID", calendar_UUID);
		}
		params.put("event_UUID", event_UUID);
		return super.delete("Substitution.deleteSubstitutions", params);
	}
	
	public DBSubstitution getSubstitution(String substitution_UUID) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("substitution_UUID", substitution_UUID);
			return (DBSubstitution)super.queryForObject("Substitution.selectSubstitution", params);
		} catch(Exception ex) {
			return null;
		}
	}
	
	public DBSubstitution getSubstitution(String event_UUID, Date newStartDate) {
		Map<String, Object> params = new HashMap<String,Object>(2);
		params.put("event_UUID", event_UUID);
		params.put("startDate", newStartDate);
		return (DBSubstitution)super.queryForObject("Substitution.selectSubstitutionByEventAndDate", params);
	}
	
	@SuppressWarnings("unchecked")
	public List<DBSubstitution> getSubstitutions(String calendar_UUID, String event_UUID) {
		Map<String, Object> params = new HashMap<String,Object>(2);
		if(event_UUID == null) {
			params.put("calendar_UUID", calendar_UUID);
		}
		params.put("event_UUID", event_UUID);
		return (List<DBSubstitution>)super.queryForList("Substitution.selectSubstitutions", params);
	}
	
	public Integer moveEventSubstitutionsInBatch(String event_UUID, long startDateOffset, long endDateOffset) {
		Map<String, Object> params = new HashMap<String,Object>(2);
		params.put("event_UUID", event_UUID);
		params.put("startDateOffset", startDateOffset);
		params.put("endDateOffset", endDateOffset);
		return super.update("Substitution.moveEventSubstitutionsInBatch", params);
	}
	
	public Integer updateEventSubstitutionsTimestampInBatch(String event_UUID) {
		Map<String, Object> params = new HashMap<String,Object>(2);
		params.put("event_UUID", event_UUID);
		return super.update("Substitution.updateEventSubstitutionsTimestampInBatch", params);
	}
}