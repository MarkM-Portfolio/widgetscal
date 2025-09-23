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

CONNECT TO SNCOMM@

CREATE TABLE CALENDAR.CA_USERMENTION (
    MENTION_UUID   VARCHAR(48) NOT NULL,
    OBJECT_ID      VARCHAR(48) NOT NULL,
    OBJECT_TYPE    INTEGER NOT NULL, -- 1: event, 2: instance, 3: comment
    CALENDAR_UUID  VARCHAR(48) NOT NULL,
    USER_UUID      VARCHAR(48) NOT NULL, 
    MENTIONEDBY    VARCHAR(48) NOT NULL, 
    CREATEDON      TIMESTAMP   NOT NULL,
    ORG_ID         VARCHAR(36) NOT NULL
)IN CALENDARTABSPACE@

ALTER TABLE CALENDAR.CA_USERMENTION
ADD CONSTRAINT CA_USERMENTION_PK PRIMARY KEY (
	MENTION_UUID, ORG_ID
)@

COMMIT@

CREATE INDEX CALENDAR.CA_UM_OBJECT_IDX on CALENDAR.CA_USERMENTION(OBJECT_ID, OBJECT_TYPE, ORG_ID)@
CREATE INDEX CALENDAR.CA_UM_USER_IDX on CALENDAR.CA_USERMENTION(USER_UUID, ORG_ID)@

COMMIT@

GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_USERMENTION TO USER LCUSER@

COMMIT@

-- 1: mixed 2: plain text 3: html
ALTER TABLE CALENDAR.CA_EVENTCOMMENT ADD COLUMN CONTENTTYPE INTEGER DEFAULT 2 NOT NULL@

COMMIT@

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '29', RELEASEVER = '5.0.0.0.0' WHERE COMPKEY = 'CALENDAR'@
COMMIT@

CONNECT RESET@
