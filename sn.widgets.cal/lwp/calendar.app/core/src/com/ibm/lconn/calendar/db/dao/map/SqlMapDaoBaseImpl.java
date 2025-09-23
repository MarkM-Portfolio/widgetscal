/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.calendar.db.dao.map;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.InvocationHandler;

import com.ibatis.dao.client.DaoManager;
import com.ibatis.dao.client.template.SqlMapDaoTemplate;
import com.ibatis.sqlmap.client.SqlMapException;
import com.ibatis.sqlmap.client.SqlMapExecutor;
import com.ibatis.sqlmap.engine.impl.ExtendedSqlMapClient;
import com.ibm.lconn.calendar.exception.CalendarException;
import com.ibm.lconn.calendar.util.ExecutionContext;

public class SqlMapDaoBaseImpl extends SqlMapDaoTemplate {
	private static final Logger LOGGER = Logger.getLogger(SqlMapDaoBaseImpl.class.getName());
	
	public static final String MYSQL = "MYSQL";
    public static final String DB2 = "DB2";
    public static final String ORACLE = "ORACLE";
    public static final String MSSQL = "MSSQL";
	public static final String AS400 = "AS400";		//Change by Connections for IBM i team.
    
    public static String databaseType = null;
	
	public SqlMapDaoBaseImpl(DaoManager daoManager) {
		super(daoManager);
	}
	
	private boolean isSqlMapStatementExist(String id) {
		SqlMapExecutor executor = this.getSqlMapExecutor();
		if (executor instanceof ExtendedSqlMapClient) {
			try {
				return (((ExtendedSqlMapClient) executor).getMappedStatement(id) != null);
			} catch (SqlMapException ex) {
				return false;
			}
		} else {
			throw new RuntimeException("Not supported!");
		}
	}
	
	private Object injectCommonProperties(Object params) {
    	if(params == null)
    		params = new HashMap();
    	
    	if(params instanceof Map) {
    		Map map = (Map) params;
    		map.put("CURRENT_TIMESTAMP", new Timestamp(System.currentTimeMillis()));
    		if(ExecutionContext.IGNORE_TENANTKEY.equals(ExecutionContext.getCurrentOrgId())) {
    			map.put("ORG_ID", map.get("ORG_ID"));
    		} else {
    			map.put("ORG_ID", ExecutionContext.getCurrentOrgId());
    		}
    		
    		map.put("DBTYPE", getDatabaseName());
    		return map;
    	} else if(!Modifier.isFinal(params.getClass().getModifiers())) {
    		return IBatisCommonPropertiesDecorator.decorate(params, this);
    	}
    	return params;
    }
	
	protected String findOptimizedQuery(String id) {
		String dbname = getDatabaseName();
		
		String t = id + "_" + dbname;
		if(isSqlMapStatementExist(t)) {
			return t;
		}
		
		return id;
	}
	
	protected String normalizeSQLName(String name) {
		if(!ExecutionContext.IGNORE_TENANTKEY.equals(ExecutionContext.getCurrentOrgId())) {
			int idx = name.indexOf(".");
			return name.substring(0, idx) + "_MT" + "." + name.substring(idx + 1);
		}
    	return name;
    }
	
	protected void checkExecutionContext() {
		if(ExecutionContext.getCurrentOrgId() == null) {
			throw new CalendarException("Bad Execution Context. ORG_ID is missed.");
		}
    }
	
	@Override
	public Object insert(String id, Object parameterObject) {
		checkExecutionContext();
		return super.insert(findOptimizedQuery(normalizeSQLName(id)), injectCommonProperties(parameterObject));
	}

	@Override
	public Object insert(String id) {
		checkExecutionContext();
		return super.insert(findOptimizedQuery(normalizeSQLName(id)), injectCommonProperties(null));
	}

	@Override
	public int update(String id, Object parameterObject) {
		checkExecutionContext();
		return super.update(findOptimizedQuery(normalizeSQLName(id)), injectCommonProperties(parameterObject));
	}

	@Override
	public int update(String id) {
		checkExecutionContext();
		return super.update(findOptimizedQuery(normalizeSQLName(id)), injectCommonProperties(null));
	}

	@Override
	public int delete(String id, Object parameterObject) {
		checkExecutionContext();
		return super.delete(findOptimizedQuery(normalizeSQLName(id)), injectCommonProperties(parameterObject));
	}

	@Override
	public int delete(String id) {
		checkExecutionContext();
		return super.delete(findOptimizedQuery(normalizeSQLName(id)), injectCommonProperties(null));
	}
	
	@Override
	public Object queryForObject(String id) {
		checkExecutionContext();
		return super.queryForObject(findOptimizedQuery(normalizeSQLName(id)), injectCommonProperties(null));
	}

	@Override
	public Object queryForObject(String id, Object parameterObject) {
		checkExecutionContext();
		return super.queryForObject(findOptimizedQuery(normalizeSQLName(id)), injectCommonProperties(parameterObject));
	}

	@Override
	public List queryForList(String id, Object parameterObject) {
		checkExecutionContext();
		return super.queryForList(findOptimizedQuery(normalizeSQLName(id)), injectCommonProperties(parameterObject));
	}

	@Override
	public List queryForList(String id) {
		checkExecutionContext();
		return super.queryForList(findOptimizedQuery(normalizeSQLName(id)), injectCommonProperties(null));
	}

	@Override
	public List queryForList(String id, Object parameterObject, int skip, int max) {
		checkExecutionContext();
		
		id = normalizeSQLName(id);
		parameterObject = injectCommonProperties(parameterObject);
		
		String dbname = getDatabaseName();

		if (parameterObject instanceof Map) {
			Map paramMap = (Map) parameterObject;

			String sql = null;
			String[] options = skip == 0 ? new String[]{"_{0,n}", "_{m,n}", ""} : new String[]{"_{m,n}", "_{0,n}", ""};
			int[] startrow = skip == 0 ? new int[]{1, 1, 1} : new int[]{skip + 1, 1, 1};
			int[] toffset = skip == 0? new int[]{0, 0, 0} : new int[]{0, skip, skip};
			for(int i = 0; i < options.length; i++) {
				if (dbname != null) {
					String t = id + options[i] + "_" + dbname;
					if (isSqlMapStatementExist(t)) {
						sql = t;
					}
					if(sql == null) {
						t = id + options[i];
						if (isSqlMapStatementExist(t)) {
							sql = t;
						}
					}
					if(sql != null) {
						paramMap.put("__start_row", new Integer(startrow[i]));
						paramMap.put("__end_row", new Integer(skip + max + 1));
						paramMap.put("__fetch_size", new Integer(skip + max + 1 - startrow[i]));
						paramMap.put("__fetch_size_p1", new Integer(skip + max + 1 - startrow[i] + 1));
						return super.queryForList(sql, paramMap, toffset[i], max + 1);
					}
				}
			}
		}
		return super.queryForList(id, parameterObject, skip, max);
	}

	@Override
	public List queryForList(String id, int skip, int max) {
		checkExecutionContext();
		return queryForList(findOptimizedQuery(normalizeSQLName(id)), injectCommonProperties(null), skip, max);
	}

	protected String getDatabaseName() {
        if (null != databaseType){
            return databaseType;
        }

        try {
            Connection conn = this.getSqlMapTransactionManager().getCurrentConnection();
            String prodName = conn.getMetaData().getDatabaseProductName().toLowerCase();
            if(prodName.indexOf("as/400") > -1) {		//Change by Connections for IBM i team.
                databaseType = AS400;
                return AS400;
            }else if(prodName.indexOf("db2") > -1) {
                databaseType = DB2;
                return DB2;
            } else if(prodName.indexOf("oracle") > -1) {
                databaseType = ORACLE;
                return ORACLE;
            } else if(prodName.indexOf("sqlserver") > -1) {
                databaseType = MSSQL;
                return MSSQL;
            } else if(prodName.indexOf("sql server") > -1) {
                databaseType = MSSQL;
                return MSSQL;
            } else {
                return null;
            }
        } catch (SQLException ex) {
            throw new RuntimeException(ex);
        }
    }
	
    // some common properties (i.e. execution context, etc) for support ibatis sql execution
    
    public static interface IBatisCommonProperties {
    	Timestamp getCURRENT_TIMESTAMP();
    	String getDBTYPE();
    }
    
    public static interface IBatisMultiTenancyCommonProperties extends IBatisCommonProperties {
    	String getORG_ID();
    }
    
    static class IBatisCommonPropertiesDecorator implements InvocationHandler {
    	static Object decorate(Object o, SqlMapDaoBaseImpl dao) {
    		Enhancer enhancer = new Enhancer();  
            enhancer.setSuperclass(o.getClass());  
            if(ExecutionContext.IGNORE_TENANTKEY.equals(ExecutionContext.getCurrentOrgId())) {
            	enhancer.setInterfaces(new Class[]{IBatisCommonProperties.class});
            } else {
            	enhancer.setInterfaces(new Class[]{IBatisMultiTenancyCommonProperties.class});
            }
            enhancer.setCallback(new IBatisCommonPropertiesDecorator(o, dao)); 
            return enhancer.create();  
    	}
    	
    	Object obj = null;
    	SqlMapDaoBaseImpl dao = null;
    	
    	public IBatisCommonPropertiesDecorator(Object obj, SqlMapDaoBaseImpl dao) {
    		this.obj = obj;
    		this.dao = dao;
    	}
    	
    	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
			if("getORG_ID".equals(method.getName())) {
				if(!ExecutionContext.IGNORE_TENANTKEY.equals(ExecutionContext.getCurrentOrgId())) {
					return ExecutionContext.getCurrentOrgId();
				}
			}
			if(method.equals(IBatisCommonProperties.class.getMethod("getCURRENT_TIMESTAMP"))) {
				return new Timestamp(System.currentTimeMillis());
			}
			if(method.equals(IBatisCommonProperties.class.getMethod("getDBTYPE"))) {
				return dao.getDatabaseName();
			}
			return method.invoke(this.obj, args);
		}
    }
}
