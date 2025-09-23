/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.dao.map;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ibatis.dao.client.DaoManager;
import com.ibm.connections.directory.services.data.DSObject;
import com.ibm.lconn.calendar.db.dao.model.UserInfoDAO;
import com.ibm.lconn.calendar.db.model.DBMembership;
import com.ibm.lconn.calendar.db.model.DBUser;

public class UserInfoDAOSqlMap extends SqlMapDaoBaseImpl implements UserInfoDAO {
	public UserInfoDAOSqlMap(DaoManager daoManager) {
		super(daoManager);
	}
	
	public DBUser getUserByEmail(String email) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("email", email);
			return (DBUser) super.queryForObject("UserInfo.getUserByEmail", params);
		} catch (Exception ex) {
			return null;
		}
	}

	public DBUser getUserByUUID(String uuid) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("userUUID", uuid);
			return (DBUser) super.queryForObject("UserInfo.getUserByUUID", params);
		} catch (Exception ex) {
			return null;
		}
	}

	public DBUser getUserByExtID(String extid) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("userExtID", extid);
			return (DBUser) super.queryForObject("UserInfo.getUserByExtID", params);
		} catch (Exception ex) {
			return null;
		}
	}

	public void addUserMembership(List<DBMembership> memberships) {
		for (DBMembership membership : memberships) {
			addUserMembership(membership);
		}
	}

	public void addUserMembership(DBMembership membership) {
		super.insert("UserInfo.insertUserMembership", membership);
	}

	public void updateUserMembership(DBMembership membership) {
		super.update("UserInfo.updateUserMembership", membership);
	}

	public void deleteUserMembership(DBMembership membership) {
		super.delete("UserInfo.deleteUserMembership", membership);
	}

	public Integer getUserMembership(String member_UUID, String calendar_UUID) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("member_UUID", member_UUID);
		params.put("calendar_UUID", calendar_UUID);
		return (Integer) super.queryForObject("UserInfo.getUserMembership", params);
	}

	@SuppressWarnings("unchecked")
	public List<DBMembership> getUserMemberships(String member_UUID) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("member_UUID", member_UUID);
		return (List<DBMembership>) super.queryForList("UserInfo.getUserMemberships", params);
	}
	
	public DBUser insertUserRecord(DBUser user) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("memberUuid", user.getUserUUID());
		map.put("directoryUuid", user.getUserExtID());
		map.put("displayName", user.getUserName());
		map.put("email", user.getUserEmail());
		map.put("orgId", user.getORG_ID());
		map.put("isExternal", user.getIsExternal());
		return (DBUser)super.insert("UserInfo.insertMemberProfile", map);
	}

	public void insertUserRecord(String memberUuid, String orgId, DSObject personDSObject) {

		String directoryUuid = personDSObject.get_id();
		String email = personDSObject.get_email();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("memberUuid", memberUuid);
		map.put("directoryUuid", directoryUuid);
		map.put("displayName", personDSObject.get_name());
		map.put("email", email);
		map.put("orgId", orgId);
		map.put("isExternal", personDSObject.is_user_external() ? 1 : 0);
		super.insert("UserInfo.insertMemberProfile", map);

		List<String> loginNames = personDSObject.get_login();

		insertBatch(memberUuid, loginNames);
	}

	private void insertBatch(String memberUuid, List<String> loginNames) {
		// assure created is not null
		if (loginNames == null || loginNames.size() <= 0) {
			return;
		}

		Map<String, String> map = new HashMap<String, String>();
		map.put("memberUuid", memberUuid);
		if (loginNames.size() == 1) {
			String loginName = loginNames.get(0);
			if (loginName != null && (loginName.trim().length() > 0)) {
				map.put("loginName", loginNames.get(0));
				super.insert("insertMemberLogin", map);
			}
		} else {
			List<String> localLoginNames = new ArrayList<String>(loginNames.size());

			super.startBatch();
			for (String loginName : loginNames) {
				if (loginName != null && (loginName.trim().length() > 0))
					if (!localLoginNames.contains(loginName)) {
						localLoginNames.add(loginName);
						map.put("loginName", loginName);
						super.insert("UserInfo.insertMemberLogin", map);
					}
			}
			super.executeBatch();
		}
	}
}
