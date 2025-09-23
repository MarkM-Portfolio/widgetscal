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

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '2', RELEASEVER = '4.0.0.0.0' WHERE COMPKEY = 'CALENDAR';

ALTER TABLE CALENDAR.CA_CALENDAR ADD CREATEDON DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL; 
ALTER TABLE CALENDAR.CA_CALENDAR ADD ACLMODTIME DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL; 
ALTER TABLE CALENDAR.CA_SUBSTITUTION ADD MODIFIEDON DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL; 
ALTER TABLE CALENDAR.CA_RECURRENCE ADD MODIFIEDON DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL; 

CREATE INDEX CA_CAL_ACLMODTIME_IDX ON CALENDAR.CA_CALENDAR(ACLMODTIME, CREATEDON);
CREATE INDEX CA_EV_MODITIME_IDX ON CALENDAR.CA_EVENT(MODIFIEDON);
CREATE INDEX CA_SUB_MODITIME_IDX ON CALENDAR.CA_SUBSTITUTION(MODIFIEDON, EVENTINFO_UUID, ISCANCELLED);
CREATE INDEX CA_RECUR_MODITIME_IDX ON CALENDAR.CA_RECURRENCE(MODIFIEDON);

CREATE TABLE CALENDAR.CA_DELETION_HISTORY (
	DELHISTORY_UUID	NVARCHAR(36)	NOT NULL,	
	OBJECT_TYPE		INTEGER 		NOT NULL, -- 0 - EVENT, 1 - EXCEPTION INSTANCE
	OBJECT_UUID		NVARCHAR(36) 	NOT NULL,
	DBMODTIME		DATETIME		NOT NULL
);
CREATE INDEX CA_DELHIS_TIME_IDX ON CALENDAR.CA_DELETION_HISTORY(DBMODTIME);

ALTER TABLE CALENDAR.CA_DELETION_HISTORY
ADD CONSTRAINT CA_DELHISTORY_PK PRIMARY KEY (
	DELHISTORY_UUID
);

GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_DELETION_HISTORY TO SNCOMMUSER;

COMMIT;