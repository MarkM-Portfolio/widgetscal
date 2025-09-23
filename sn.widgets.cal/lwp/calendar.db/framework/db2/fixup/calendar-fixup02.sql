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

CONNECT TO SNCOMM@

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '2', RELEASEVER = '4.0.0.0.0' WHERE COMPKEY = 'CALENDAR'@

ALTER TABLE CALENDAR.CA_CALENDAR ADD COLUMN CREATEDON TIMESTAMP NOT NULL WITH DEFAULT CURRENT_TIMESTAMP@
ALTER TABLE CALENDAR.CA_CALENDAR ADD COLUMN ACLMODTIME TIMESTAMP NOT NULL WITH DEFAULT CURRENT_TIMESTAMP@
ALTER TABLE CALENDAR.CA_SUBSTITUTION ADD COLUMN MODIFIEDON TIMESTAMP NOT NULL WITH DEFAULT CURRENT_TIMESTAMP@
ALTER TABLE CALENDAR.CA_RECURRENCE ADD COLUMN MODIFIEDON TIMESTAMP NOT NULL WITH DEFAULT CURRENT_TIMESTAMP@

CREATE INDEX CALENDAR.CA_CAL_ACLMODTIME_IDX ON CALENDAR.CA_CALENDAR(ACLMODTIME, CREATEDON)@
CREATE INDEX CALENDAR.CA_EV_MODITIME_IDX ON CALENDAR.CA_EVENT(MODIFIEDON)@
CREATE INDEX CALENDAR.CA_SUB_MODITIME_IDX ON CALENDAR.CA_SUBSTITUTION(MODIFIEDON, EVENTINFO_UUID, ISCANCELLED)@
CREATE INDEX CALENDAR.CA_RECUR_MODITIME_IDX ON CALENDAR.CA_RECURRENCE(MODIFIEDON)@

CREATE TABLE CALENDAR.CA_DELETION_HISTORY (
	DELHISTORY_UUID	VARCHAR(36)	NOT NULL,	
	OBJECT_TYPE		SMALLINT 	NOT NULL, -- 0 - EVENT, 1 - EXCEPTION INSTANCE
	OBJECT_UUID		VARCHAR(36) NOT NULL,
	DBMODTIME		TIMESTAMP	NOT NULL
	)
IN CALENDARTABSPACE@
CREATE INDEX CALENDAR.CA_DELHIS_TIME_IDX ON CALENDAR.CA_DELETION_HISTORY(DBMODTIME)@

ALTER TABLE CALENDAR.CA_DELETION_HISTORY
ADD CONSTRAINT CA_DELHISTORY_PK PRIMARY KEY (
	DELHISTORY_UUID
)@

GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_DELETION_HISTORY TO USER LCUSER@

COMMIT@

CONNECT RESET@
