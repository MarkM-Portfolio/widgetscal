-- ***************************************************************** 
--                                                                   
-- IBM Confidential                                                  
--                                                                   
-- OCO Source Materials                                              
--                                                                   
-- Copyright IBM Corp. 2016                        
--                                                                   
-- The source code for this program is not published or otherwise    
-- divested of its trade secrets, irrespective of what has been      
-- deposited with the U.S. Copyright Office.                         
--                                                                   
-- ***************************************************************** 
USE SNCOMM;
GO
BEGIN TRANSACTION;
IF EXISTS(SELECT * FROM sys.indexes WHERE object_id = object_id('CALENDAR.CA_EVENTINSTANCE') AND NAME ='CA_EVINST_DBMD_IDX')
  DROP INDEX CA_EVINST_DBMD_IDX ON CALENDAR.CA_EVENTINSTANCE;
GO
IF EXISTS(SELECT * FROM sys.indexes WHERE object_id = object_id('CALENDAR.CA_EVENTINSTANCE') AND NAME ='CA_EVINST_EVID_DBMD_IDX')
  DROP INDEX CA_EVINST_EVID_DBMD_IDX ON CALENDAR.CA_EVENTINSTANCE;
GO 

CREATE INDEX CA_EVINST_DBMD_IDX ON CALENDAR.CA_EVENTINSTANCE(DBMODTIME, ORG_ID);
GO

COMMIT;

BEGIN TRANSACTION;

ALTER TABLE CALENDAR.CA_SCHEMA ADD PRESCHEMAVER NVARCHAR( 10 ) DEFAULT '0' NOT NULL;
ALTER TABLE CALENDAR.CA_SCHEMA ADD POSTSCHEMAVER NVARCHAR( 10 ) DEFAULT '0' NOT NULL;
GO

COMMIT;

BEGIN TRANSACTION;

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '40', RELEASEVER = '6.0.0.0.0', POSTSCHEMAVER = '40.0' WHERE COMPKEY = 'CALENDAR';
GO

COMMIT;