-- ***************************************************************** 
--                                                                   
-- IBM Confidential                                                  
--                                                                   
-- OCO Source Materials                                              
--                                                                   
-- Copyright IBM Corp. 2011, 2014                      
--                                                                   
-- The source code for this program is not published or otherwise    
-- divested of its trade secrets, irrespective of what has been      
-- deposited with the U.S. Copyright Office.                         
--                                                                   
-- ***************************************************************** 

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '8', RELEASEVER = '4.0.0.0.0' WHERE COMPKEY = 'CALENDAR';

CREATE INDEX CALENDAR.CA_CAL_VISIBILITY_IDX ON CALENDAR.CA_CALENDAR(CALENDAR_UUID, VISIBILITY)TABLESPACE CALENDARINDEXTABSPACE;

DROP INDEX CALENDAR.CA_EV_CALID_IDX;
CREATE INDEX CALENDAR.CA_EV_CALID_IDX ON CALENDAR.CA_EVENT(CALENDAR_UUID, CREATEDON DESC)TABLESPACE CALENDARINDEXTABSPACE;
CREATE INDEX CALENDAR.CA_EV_USERID_IDX ON CALENDAR.CA_EVENT(CREATEDBY, CREATEDON DESC)TABLESPACE CALENDARINDEXTABSPACE;
CREATE INDEX CALENDAR.CA_EV_CALID_USERID_IDX ON CALENDAR.CA_EVENT(CALENDAR_UUID, CREATEDBY, CREATEDON DESC)TABLESPACE CALENDARINDEXTABSPACE;

COMMIT;

QUIT;