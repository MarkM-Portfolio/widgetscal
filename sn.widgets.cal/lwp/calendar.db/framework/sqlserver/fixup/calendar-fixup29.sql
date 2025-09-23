-- ***************************************************************** 
--                                                                   
-- IBM Confidential                                                  
--                                                                   
-- OCO Source Materials                                              
--                                                                   
-- Copyright IBM Corp. 2014                        
--                                                                   
-- The source code for this program is not published or otherwise    
-- divested of its trade secrets, irrespective of what has been      
-- deposited with the U.S. Copyright Office.                         
--                                                                   
-- ***************************************************************** 

USE SNCOMM;
GO

BEGIN TRANSACTION;

CREATE TABLE CALENDAR.CA_USERMENTION (
    MENTION_UUID   NVARCHAR(48) NOT NULL,
    OBJECT_ID      NVARCHAR(48) NOT NULL,
    OBJECT_TYPE    INTEGER NOT NULL, -- 1: event, 2: instance, 3: comment
    CALENDAR_UUID  NVARCHAR(48) NOT NULL,
    USER_UUID      NVARCHAR(48) NOT NULL, 
    MENTIONEDBY    NVARCHAR(48) NOT NULL, 
    CREATEDON      DATETIME   NOT NULL,
    ORG_ID         NVARCHAR(36) NOT NULL
);
go

ALTER TABLE CALENDAR.CA_USERMENTION
ADD CONSTRAINT CA_USERMENTION_PK PRIMARY KEY (
	MENTION_UUID, ORG_ID
);
go

COMMIT;

BEGIN TRANSACTION;

CREATE INDEX CA_UM_OBJECT_IDX on CALENDAR.CA_USERMENTION(OBJECT_ID, OBJECT_TYPE, ORG_ID);
go

CREATE INDEX CA_UM_USER_IDX on CALENDAR.CA_USERMENTION(USER_UUID, ORG_ID);
go

COMMIT;

BEGIN TRANSACTION;

GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_USERMENTION TO SNCOMMUSER;
go

COMMIT;

BEGIN TRANSACTION;

-- 1: mixed 2: plain text 3: html
ALTER TABLE CALENDAR.CA_EVENTCOMMENT ADD CONTENTTYPE INTEGER DEFAULT 2 NOT NULL; 
go

COMMIT;

BEGIN TRANSACTION;

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '29', RELEASEVER = '5.0.0.0.0' WHERE COMPKEY = 'CALENDAR';
GO

COMMIT;