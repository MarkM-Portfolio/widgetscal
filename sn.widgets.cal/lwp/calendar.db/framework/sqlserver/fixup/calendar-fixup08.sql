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

--------------------------------------
-- CONNECT TO SNCOMM
--------------------------------------
USE SNCOMM;
GO

BEGIN TRANSACTION;

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '8', RELEASEVER = '4.0.0.0.0' WHERE COMPKEY = 'CALENDAR';

CREATE INDEX CA_CAL_VISIBILITY_IDX ON CALENDAR.CA_CALENDAR(CALENDAR_UUID, VISIBILITY);

DROP INDEX CA_EV_CALID_IDX ON CALENDAR.CA_EVENT;
CREATE INDEX CA_EV_CALID_IDX ON CALENDAR.CA_EVENT(CALENDAR_UUID, CREATEDON DESC);
CREATE INDEX CA_EV_USERID_IDX ON CALENDAR.CA_EVENT(CREATEDBY, CREATEDON DESC);
CREATE INDEX CA_EV_CALID_USERID_IDX ON CALENDAR.CA_EVENT(CALENDAR_UUID, CREATEDBY, CREATEDON DESC);

COMMIT;