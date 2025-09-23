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
package com.ibm.lconn.calendar.test.core;

import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.naming.InitialContext;
import javax.sql.DataSource;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringEscapeUtils;
import org.xml.sax.Attributes;
import org.xml.sax.helpers.DefaultHandler;

class IDGenerator {
	private static Map<String, Integer> map = new HashMap<String, Integer>();

	public static int next(String tbl) {
		int nextid = 0;

		if (map.containsKey(tbl)) {
			nextid = map.get(tbl);
			nextid++;
		}
		map.put(tbl, nextid);

		return nextid;
	}

	public static void reset() {
		map.clear();
	}
}

class JDBCUtils {
	public static Object parseJDBCTYPE(String s, int sqlType) throws Exception {
		int[] TYPE_STR = new int[] { Types.CHAR, Types.VARCHAR,
				Types.LONGVARCHAR, Types.CLOB };
		int[] TYPE_NUM = new int[] { Types.NUMERIC, Types.DECIMAL, Types.BIT,
				Types.TINYINT, Types.SMALLINT, Types.INTEGER, Types.BIGINT,
				Types.REAL, Types.FLOAT, Types.DOUBLE };
		int[] TYPE_BIN = new int[] { Types.BINARY, Types.VARBINARY,
				Types.LONGVARBINARY, Types.BLOB };
		int[] TYPE_TIME = new int[] { Types.DATE, Types.TIME, Types.TIMESTAMP };
		
		if(s == null) {
			return null;
		}

		if (ArrayUtils.indexOf(TYPE_STR, sqlType) != -1) {
			return s;
		} else if (ArrayUtils.indexOf(TYPE_NUM, sqlType) != -1) {
			return new BigDecimal(s);
		} else if (ArrayUtils.indexOf(TYPE_BIN, sqlType) != -1) {
			return s.getBytes();
		} else if (ArrayUtils.indexOf(TYPE_TIME, sqlType) != -1) {
			return new Timestamp(Long.parseLong(s));
		}

		return s;
	}
	
	public static class ResultSetUtils {
		public static String getString(ResultSet rs, String col, int sqlType) throws Exception {
			int[] TYPE_STR = new int[] { Types.CHAR, Types.VARCHAR,
					Types.LONGVARCHAR, Types.CLOB };
			int[] TYPE_NUM = new int[] { Types.NUMERIC, Types.DECIMAL, Types.BIT,
					Types.TINYINT, Types.SMALLINT, Types.INTEGER, Types.BIGINT,
					Types.REAL, Types.FLOAT, Types.DOUBLE };
			int[] TYPE_BIN = new int[] { Types.BINARY, Types.VARBINARY,
					Types.LONGVARBINARY, Types.BLOB };
			int[] TYPE_TIME = new int[] { Types.DATE, Types.TIME, Types.TIMESTAMP };
			
			if (ArrayUtils.indexOf(TYPE_STR, sqlType) != -1) {
				return rs.getString(col);
			} else if (ArrayUtils.indexOf(TYPE_NUM, sqlType) != -1) {
				Object o = rs.getObject(col);
				if(o != null) {
					return o.toString();
				}
			} else if (ArrayUtils.indexOf(TYPE_BIN, sqlType) != -1) {
				byte[] o = rs.getBytes(col);
				if(o != null) {
					return new String(o);
				}
			} else if (ArrayUtils.indexOf(TYPE_TIME, sqlType) != -1) {
				Date o = rs.getTimestamp(col);
				if(o != null) {
					return Long.toString(o.getTime());
				}
			}
			
			return null;
		}
	}
}

public class DbTestUtils {
	public static interface Listener {
		public void onInsert(String table, Map<String, Object> data);
		public void onFlush();
	}
	private List<Listener> listeners = new ArrayList<Listener>();
	
	public void addListener(Listener listener) {
		listeners.add(listener);
	}
	
	private final static Pattern TEMPLATE_PATTERN_FOREIGNKEY = Pattern.compile("\\s*\\{\\s*([^\\{\\.\\s}]+)\\.([^\\{\\.\\s}]+)\\s*=\\s*(.*[^\\s])\\s*\\}");
	private final static Pattern TEMPLATE_PATTERN_REPLACEMENT = Pattern.compile("\\{\\s*([^\\{\\.}\\s]|[^\\{\\.}\\s][^\\{\\.}]*[^\\{\\.}\\s])\\s*}");
	
	private static DbTestUtils instance = null;
	
	public synchronized static DbTestUtils getInstance() throws Exception {
		if(instance == null) {
			instance = new DbTestUtils();
		}
		return instance;
	}
	
	protected Properties dataTemplate = new Properties();
	protected Properties dbProps = new Properties();

	protected Set<String> tables = null;
	protected List<String> tablesInOrder = null;
	protected Map<String, Set<String>> fkTables = new HashMap<String, Set<String>>();
	protected Map<String, Map<String, Integer>> tableColumns = new HashMap<String, Map<String, Integer>>();
	
	protected DataSource dataSource = null;
	protected Connection conn = null;
	protected Map<String, PreparedStatement> statementCache = new HashMap<String, PreparedStatement>();
	
	private static final String DB2 = "DB2";
    private static final String ORACLE = "ORACLE";
    private static final String MSSQL = "MSSQL";
    private static String databaseType = null;
	
	private Set<String> _simple_column = new HashSet<String>();

	protected DbTestUtils() throws Exception {
		dataTemplate.load(DbTestUtils.class.getResourceAsStream("/db.template.properties"));
		dbProps.load(DbTestUtils.class.getResourceAsStream("/db.properties"));
		
		if(dbProps.getProperty("database.jndi") != null) {
			InitialContext initCtx = new InitialContext();
			dataSource = (DataSource)initCtx.lookup(dbProps.getProperty("database.jndi"));
		}
	}

	protected Map<String, Object> prepareInsert(String table, String[] cols, Object[] values) throws Exception {
		Map<String, Integer> tcInfo = getTableColumns(table);

		Map<String, Object> ret = new HashMap<String, Object>();

		int nextid = -1;
		Matcher m = null;
		long now = System.currentTimeMillis();

		// populate column values
		Set<String> tc = new HashSet<String>(tcInfo.keySet());
		for(int i = 0; i < tcInfo.size() && !tc.isEmpty(); i++) {
			LOOP: for (Iterator<String> iter = tc.iterator(); iter.hasNext();) {
				String c = iter.next();
				
				int idx = ArrayUtils.indexOf(cols, c);
				if(idx != -1) {
					ret.put(cols[idx], values[idx]);
					iter.remove();
					continue;
				}

				String pattern = dataTemplate.getProperty(table + "." + c).trim();
				if (!_simple_column.contains(table + "." + c)) {
					m = TEMPLATE_PATTERN_FOREIGNKEY.matcher(pattern);
					if (m.matches()) {
						pattern = m.group(3);
					}
					else {
						_simple_column.add(table + "." + c);
					}
				}
				
				if ("{null}".equals(pattern)) {
					ret.put(c, null);
					iter.remove();
					continue;
				}
				
				if ("{current_timestamp}".equals(pattern)) {
					ret.put(c, JDBCUtils.parseJDBCTYPE(Long.toString(now), tcInfo.get(c)));
					iter.remove();
					continue;
				}
				
				m = TEMPLATE_PATTERN_REPLACEMENT.matcher(pattern);
				StringBuffer buf = new StringBuffer();
				int offset = 0;
				while(m.find(offset)) {
					buf.append(pattern.substring(offset, m.start()));
					
					String replacement = m.group(0);
					if("unique".equals(m.group(1))) {
						replacement = Integer.toString((nextid == -1) ? nextid = IDGenerator.next(table) : nextid);
					}
					if(tcInfo.containsKey(m.group(1))) {
						if(!ret.containsKey(m.group(1))) continue LOOP;
						if(ret.get(m.group(1)) == null) {
							ret.put(c, null);
							iter.remove();
							continue;
						}
						replacement = ret.get(m.group(1)).toString();
					}
					buf.append(replacement);
					
					offset = m.end();
				}
				buf.append(pattern.substring(offset));
				ret.put(c, JDBCUtils.parseJDBCTYPE(buf.toString(), tcInfo.get(c)));
				
				iter.remove();
			}
		}
		if(!tc.isEmpty()) {
			throw new RuntimeException();
		}

		// insert dependency
		Map<String, Map<String, Object>> toIns = new HashMap<String, Map<String, Object>>();
		for (Iterator<String> iter = ret.keySet().iterator(); iter.hasNext();) {
			String c = iter.next();
			if(_simple_column.contains(table + "." + c) || ret.get(c) == null) {
				continue;
			}
			String pattern = dataTemplate.getProperty(table + "." + c).trim();
			m = TEMPLATE_PATTERN_FOREIGNKEY.matcher(pattern);
			if (!m.matches()) {
				_simple_column.add(table + "." + c);
				continue;
			}

			String fkTbl = m.group(1).trim(), fkCol = m.group(2).trim();
			Map<String, Object> x = toIns.get(fkTbl);
			if (x == null) {
				x = new HashMap<String, Object>();
				toIns.put(fkTbl, x);
			}
			x.put(fkCol, ret.get(c));
		}
		
		List<String> tableInOrder = getTablesByDependency();
		for(Iterator<String> iter = tableInOrder.iterator(); iter.hasNext(); ) {
			String tbl = iter.next().toUpperCase(Locale.ENGLISH);
			if(toIns.keySet().contains(tbl)) {
				Map<String, Object> x = toIns.get(tbl);
				String[] insCols = new String[x.size()];
				Object[] insVals = new Object[x.size()];
				int idx = 0;
				for (Iterator<String> iter2 = x.keySet().iterator(); iter2.hasNext();) {
					insCols[idx] = iter2.next();
					insVals[idx] = x.get(insCols[idx]);
					idx++;
				}
				if (count(tbl, insCols, insVals) <= 0) {
					try {
					insert(tbl, insCols, insVals);
				}
					catch (SQLException sqlEx) {
						if ( !sqlEx.getSQLState().equals("23000") && !sqlEx.getSQLState().equals("23505")) {
							throw sqlEx;
						}
					}
				}
			}
		}

		return ret;
	}

	public int insert(String table, String[] cols, Object[] values)
			throws Exception {
		Map<String, Object> valueMap = prepareInsert(table, cols, values);
		cols = valueMap.keySet().toArray(new String[0]);
		Arrays.sort(cols);

		StringBuffer buf = new StringBuffer();
		buf.append("insert into ").append(getQualifiedTableName(table)).append("(");
		buf.append(cols[0]);
		for (int i = 1; i < cols.length; i++) {
			buf.append(",").append(cols[i]);
		}
		buf.append(") values( ?");
		for (int i = 1; i < cols.length; i++) {
			buf.append(", ?");
		}
		buf.append(")");
        String sql = buf.toString();
		
		PreparedStatement ps = statementCache.get(sql);
		if(ps == null) {
			ps = getConnection().prepareStatement(sql);
			statementCache.put(sql, ps);
		}

		Map<String, Integer> tc = getTableColumns(table);
		for (int i = 0; i < cols.length; i++) {
			if(getDatabaseName().equals(ORACLE)) {
				if(valueMap.get(cols[i]) instanceof String) {
					ps.setString(i + 1, (String)valueMap.get(cols[i]));
				}
				else if(valueMap.get(cols[i]) instanceof byte[]) {
					ps.setBytes(i + 1, (byte[])valueMap.get(cols[i]));
				}
				else if(valueMap.get(cols[i]) instanceof BigDecimal) {
					ps.setBigDecimal(i + 1, (BigDecimal)valueMap.get(cols[i]));
				}
				else {
			ps.setObject(i + 1, valueMap.get(cols[i]), tc.get(cols[i]));
		}
			}
			else {
				ps.setObject(i + 1, valueMap.get(cols[i]), tc.get(cols[i]));
			}
		}
		
		int updated = ps.executeUpdate();
		if(updated == 1) {
			for(Iterator<Listener> iter = listeners.iterator(); iter.hasNext(); ) {
				iter.next().onInsert(table, valueMap);
			}
		}
		return updated;
	}
	
	public int insertWithoutCheck(String table, String[] cols, Object[] values)
			throws Exception {
		StringBuffer buf = new StringBuffer();
		buf.append("insert into ").append(getQualifiedTableName(table)).append(
				"(");
		buf.append(cols[0]);
		for (int i = 1; i < cols.length; i++) {
			buf.append(",").append(cols[i]);
		}
		buf.append(") values( ?");
		for (int i = 1; i < cols.length; i++) {
			buf.append(", ?");
		}
		buf.append(")");
		String sql = buf.toString();

		PreparedStatement ps = statementCache.get(sql);
		if (ps == null) {
			ps = getConnection().prepareStatement(sql);
			statementCache.put(sql, ps);
		}

		Map<String, Integer> tc = getTableColumns(table);
		for (int i = 0; i < cols.length; i++) {
			if(getDatabaseName().equals(ORACLE)) {
				if(values[i] instanceof String) {
					ps.setString(i + 1, (String)values[i]);
				}
				else if(values[i] instanceof byte[]) {
					ps.setBytes(i + 1, (byte[])values[i]);
				}
				else if(values[i] instanceof BigDecimal) {
					ps.setBigDecimal(i + 1, (BigDecimal)values[i]);
				}
				else {
					ps.setObject(i + 1, values[i], tc.get(cols[i]));
				}
			}
			else {
				ps.setObject(i + 1, values[i], tc.get(cols[i]));
			}
		}
		return ps.executeUpdate();
	}

	public class _InsertOp {
		String table;
		String[] cols;
		
		int count = 0;
		
		_InsertOp(String table, String[] cols) {
			this.table = table;
			this.cols = cols;
		}
		
		public _InsertOp item(Object[] values) throws Exception {
			count += DbTestUtils.this.insert(table, cols, values);
			return this;
		}
	}
	public _InsertOp insert(String table, String[] cols) {
		return new _InsertOp(table, cols);
	}

	public int count(String table) throws Exception {
		return count(table, new String[0], new Object[0]);
	}

	public int count(String table, String col, Object value) throws Exception {
		return count(table, new String[] { col }, new Object[] { value });
	}

	public int count(String table, String[] cols, Object[] values)
			throws Exception {
		int ret = 0;

		Map<String, Integer> tc = getTableColumns(table);
		
		StringBuffer buf = new StringBuffer();
		buf.append("select count(1) c from ").append(getQualifiedTableName(table));
		if (cols.length > 0) {
			buf.append(" where ");
			for (int i = 0; i < cols.length; i++) {
				if (i != 0) buf.append(" and ");
				buf.append(cols[i]);
				if(values[i] == null) {
					buf.append(" is null");
				}
				else if(tc.get(cols[i]) == Types.CLOB) {
					buf.append(" like ?");
				}
				else {
					buf.append(" = ?");
				}
			}
		}
		String sql = buf.toString();
		
		PreparedStatement ps = statementCache.get(sql);
		if(ps == null) {
			ps = getConnection().prepareStatement(sql);
			statementCache.put(sql, ps);
		}

		ResultSet rs = null;
		try {
			for (int i = 0, idx = 1; i < cols.length; i++) {
				if (values[i] != null) {
					if(getDatabaseName().equals(ORACLE)) {
						if(values[i] instanceof String) {
							ps.setString(idx++, (String)values[i]);
						}
						else if(values[i] instanceof byte[]) {
							ps.setBytes(idx++, (byte[])values[i]);
						}
						else if(values[i] instanceof BigDecimal) {
							ps.setBigDecimal(idx++, (BigDecimal)values[i]);
						}
						else {
					ps.setObject(idx++, values[i], tc.get(cols[i]));
				}
			}
					else {
						ps.setObject(idx++, values[i], tc.get(cols[i]));
					}
				}
			}
			
			rs = ps.executeQuery();
			if(rs.next()) {
				ret = rs.getInt("c");
			}
			return ret;
		} finally {
			close(rs);
		}
	}

	public void clearTable(String tableName) throws Exception {
		String sql = "delete from " + getQualifiedTableName(tableName);
		PreparedStatement ps = statementCache.get(sql);
		if(ps == null) {
			ps = getConnection().prepareStatement(sql);
			statementCache.put(sql, ps);
		}
		ps.executeUpdate();
	}

	public void clearTable() throws Exception {
		List<String> l = getTablesByDependency();
		for (Iterator<String> iter = l.iterator(); iter.hasNext();) {
			String t = iter.next();
			clearTable(t);
		}
		IDGenerator.reset();
	}
	
	public void flush() throws Exception {
		for(Iterator<Listener> iter = listeners.iterator(); iter.hasNext(); ) {
			iter.next().onFlush();
		}
		conn.commit();
	}
	
	public void release() throws Exception {
		for(Iterator<PreparedStatement> iter = statementCache.values().iterator(); iter.hasNext(); ) {
			close(iter.next());
		}
		statementCache.clear();
	}
	
	public void execSQL(String sql) throws Exception {
		PreparedStatement ps = statementCache.get(sql);
		if(ps == null) {
			ps = getConnection().prepareStatement(sql);
			statementCache.put(sql, ps);
		}
		ps.execute();
	}

	protected Connection getConnection() throws SQLException {
		if (conn == null) {
			if(dataSource != null) {
				conn = dataSource.getConnection();
			} else {
				String str1 = getDbType(this.dbProps.getProperty("database.url"));
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
				} catch (ClassNotFoundException ex) {
					throw new RuntimeException(ex);
				}
				conn = DriverManager.getConnection(this.dbProps.getProperty("database.url"), this.dbProps.getProperty("database.user"), this.dbProps.getProperty("database.password"));
			}
			conn.setAutoCommit(false);
		}
		return conn;
	}
	
	protected String getDbType(String dbUrl) {
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
	
	protected String getDatabaseName() throws SQLException {
        if (null != databaseType){
            return databaseType;
        }

        Connection conn = getConnection();
        String prodName = conn.getMetaData().getDatabaseProductName().toLowerCase(Locale.ENGLISH);
        if(prodName.indexOf("db2") > -1) {
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
    }
	
	protected String getDatabaseSchema() {
		return dbProps.getProperty("database.schema");
	}
	
	protected String getQualifiedTableName(String table) {
		return getDatabaseSchema() + "." + table.toUpperCase(Locale.ENGLISH);
	}

	protected void close(ResultSet rs) {
		try {
			if (rs != null) {
				rs.close();
			}
		} catch (SQLException ex) {
		}
	}

	protected void close(Connection conn) {
		try {
			if (conn != null) {
				conn.close();
				conn = null;
			}
		} catch (SQLException ex) {
		}
	}

	protected void close(Statement stat) {
		try {
			if (stat != null) {
				stat.close();
			}
		} catch (SQLException ex) {
		}
	}

	protected Set<String> getTables() throws Exception {
		if (tables != null) {
			return tables;
		}

		Connection conn = null;
		ResultSet rs = null;
		try {
			conn = getConnection();
			DatabaseMetaData md = conn.getMetaData();
			tables = new HashSet<String>();
			rs = md.getTables(null, getDatabaseSchema(), "%", new String[]{"TABLE"});
			while (rs.next()) {
				tables.add(rs.getString("TABLE_NAME"));
			}
			return tables;
		} finally {
			close(rs);
		}
	}

	protected Set<String> getForeignTables(String tableName) throws Exception {
		if (fkTables.get(tableName) != null) {
			return fkTables.get(tableName);
		}

		Connection conn = null;
		ResultSet rs = null;
		try {
			conn = getConnection();
			DatabaseMetaData md = conn.getMetaData();

			Set<String> t = new HashSet<String>();
			rs = md.getExportedKeys(null,
					getDatabaseSchema(), getNormalizedTableName(tableName));
			while (rs.next()) {
				String fktable = rs.getString("FKTABLE_NAME");
				t.add(fktable);
			}
			fkTables.put(tableName, t);
		} finally {
			close(rs);
		}

		return fkTables.get(tableName);
	}

	protected List<String> getTablesByDependency() throws Exception {
		if(tablesInOrder != null) {
			return tablesInOrder;
		}
		
		Set<String> tables = getTables();

		tablesInOrder = new ArrayList<String>(tables);

		final Map<String, Set<String>> dm = new HashMap<String, Set<String>>();
		for (Iterator<String> iter = tables.iterator(); iter.hasNext();) {
			String t = iter.next();
			dm.put(t, getForeignTables(t));
		}

		for (int i = 0; i < tables.size() - 2; i++) {
			for (Iterator<String> i1 = tables.iterator(); i1.hasNext();) {
				String t = i1.next();
				for (Iterator<String> i2 = tables.iterator(); i2.hasNext();) {
					Set<String> f = dm.get(i2.next());
					if (f.contains(t)) {
						f.addAll(dm.get(t));
					}
				}
			}
		}

		Collections.sort(tablesInOrder, new Comparator<String>() {
			public int compare(String s1, String s2) {
				Integer t = new Integer(dm.get(s1).size());
				return t.compareTo(dm.get(s2).size());
			}
		});

		return tablesInOrder;
	}

	protected Map<String, Integer> getTableColumns(String table)
			throws Exception {
		if (tableColumns.get(table) != null) {
			return tableColumns.get(table);
		}

		Connection conn = null;
		ResultSet rs = null;
		try {
			conn = getConnection();
			DatabaseMetaData md = conn.getMetaData();
			Map<String, Integer> cols = new HashMap<String, Integer>();
			rs = md.getColumns(null, getDatabaseSchema(),
					getNormalizedTableName(table), null);
			while (rs.next()) {
				String col = rs.getString("COLUMN_NAME").toUpperCase(Locale.ENGLISH);
				int type = rs.getInt("DATA_TYPE");
				cols.put(col, type);
			}
			tableColumns.put(table, cols);
		} finally {
			close(rs);
		}

		return tableColumns.get(table);
	}
	
	protected String getNormalizedTableName(String table) throws Exception {
		String ret = null;
		
		Set<String> tbls = getTables();
		for(Iterator<String> iter = tbls.iterator(); iter.hasNext(); ) {
			String t = iter.next();
			if(table.equalsIgnoreCase(t)) {
				ret = t;
			}
		}
		
		return ret;
	}

	// import, export, compare	
	public void exportData(OutputStream out) throws Exception {
		StringBuffer buf = new StringBuffer();
		buf.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>").append("\r\n");
		buf.append("<dataset>").append("\r\n");
		List<String> tables = getTablesByDependency();
		for(int i = tables.size() - 1; i >= 0; i--) {
			String table = tables.get(i);
			
			Set<String> cols = getTableColumns(table).keySet();
			String sql = "select * from " + this.getDatabaseSchema() + "." + table;
			PreparedStatement ps = getConnection().prepareStatement(sql);
			ResultSet rs = null;
			try {
				rs = ps.executeQuery();
				while(rs.next()) {
					buf.append("\t").append("<data table=\"" + table.toUpperCase(Locale.ENGLISH) + "\" uuid=\"" + UUID.randomUUID().toString()  + "\">").append("\r\n");
					for(Iterator<String> ci = cols.iterator(); ci.hasNext(); ) {
						String c = ci.next();
						String s = JDBCUtils.ResultSetUtils.getString(rs, c, getTableColumns(table).get(c).intValue());
						if(s == null) {
							buf.append("\t\t").append("<prop col=\"" + c + "\" />").append("\r\n");
						}
						else {
							buf.append("\t\t").append("<prop col=\"" + c + "\" value=\"" + StringEscapeUtils.escapeXml(s) + "\" />").append("\r\n");
						}
					}
					buf.append("\t").append("</data>").append("\r\n");
				}
			} finally {
				close(rs);
			}
		}
		buf.append("</dataset>");
		
		PrintWriter w = new PrintWriter(new OutputStreamWriter(out, "utf-8"));
		w.print(buf.toString());
		w.flush();
	}
	
	public void importData(InputStream in) throws Exception {
		clearTable();
		flush();
		
		SAXParserFactory fac = SAXParserFactory.newInstance();
		SAXParser p = fac.newSAXParser();
		p.parse(in, new DefaultHandler(){
			String table = null;
			List<String> cols = null;
			List<Object> values = null;
			public void startElement(String uri, String localName, String qName, Attributes attributes){
				try {
					if("data".equals(qName)) {
						table = attributes.getValue("table");
						cols = new ArrayList<String>();
						values = new ArrayList<Object>();
					}
					else if("prop".equals(qName)) {
						cols.add(attributes.getValue("col"));
						Object value = JDBCUtils.parseJDBCTYPE(attributes.getValue("value"), getTableColumns(table).get(attributes.getValue("col")));
					    if(getDatabaseName().equals(ORACLE)) {
					    	if(value instanceof String && "".equals(value)) {
					    		value = " ";
					    	}
					    }
					    values.add(value);
					}
				} catch (Exception e) {
					e.printStackTrace();
					throw new RuntimeException(e);
				}
			}
			
			public void endElement(String uri, String localName, String qName) {
				if("data".equals(qName)) {
					try {
						insertWithoutCheck(table, cols.toArray(new String[0]), values.toArray());
					} catch (Exception e) {
						e.printStackTrace();
						throw new RuntimeException(e);
					}
				}
			}
		});
		
		flush();
	}
	
	public void compareData(InputStream in) throws Exception {
		SAXParserFactory fac = SAXParserFactory.newInstance();
		SAXParser p = fac.newSAXParser();
		p.parse(in, new DefaultHandler(){
			String table = null;
			String uuid = null;
			List<String> cols = null;
			List<Object> values = null;
			
			Map<String, Integer> cnts = new HashMap<String, Integer>();
			
			boolean succeed = true;
			
			public void startElement(String uri, String localName, String qName, Attributes attributes){
				try {
					if("data".equals(qName)) {
						table = attributes.getValue("table");
						uuid = attributes.getValue("uuid");
						if(!cnts.containsKey(table)){
							cnts.put(table, 0);
						}
						cols = new ArrayList<String>();
						values = new ArrayList<Object>();
					}
					else if("prop".equals(qName)) {
						if(!"true".equals(attributes.getValue("ignore"))) { 
						    cols.add(attributes.getValue("col"));
						    Object value = JDBCUtils.parseJDBCTYPE(attributes.getValue("value"), getTableColumns(table).get(attributes.getValue("col")));
						    if(getDatabaseName().equals(ORACLE)) {
						    	if(value instanceof String && "".equals(value)) {
						    		value = " ";
						    	}
						    }
						    values.add(value);
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
					throw new RuntimeException(e);
				}
			}
			
			public void endElement(String uri, String localName, String qName) {
				if("data".equals(qName)) {
					try {
						if(count(table, cols.toArray(new String[0]), values.toArray()) != 1) {
							StringBuffer buf = new StringBuffer();
							buf.append("compare fail (data) [").append(table).append("]: ").append(uuid);
							System.out.println(buf.toString());
							succeed = false;
						}
						cnts.put(table, cnts.get(table) + 1);
					} catch (Exception e) {
						e.printStackTrace();
						throw new RuntimeException(e);
					}
				}
			}
			
			 public void endDocument() {
				try {
					List<String> tables = DbTestUtils.this.getTablesByDependency();
					for (Iterator<String> iter = tables.iterator(); iter.hasNext();) {
						String table = iter.next().toUpperCase(Locale.ENGLISH);
						int cnt = 0;
						if(cnts.containsKey(table)) {
							cnt = cnts.get(table);
						}
						int t = count(table);
						if(cnt != t) {
							StringBuffer buf = new StringBuffer();
							buf.append("compare fail (row count) [").append(table).append("]: ").append(t).append(" - ").append(cnt);
							System.out.println(buf.toString());
							succeed = false;
						}
					}
					
					if(succeed) {
						System.out.println("compare succeed!");
					}
				} catch (Exception e) {
					e.printStackTrace();
					throw new RuntimeException(e);
				}
			}
		});
		
		flush();
	}
}
