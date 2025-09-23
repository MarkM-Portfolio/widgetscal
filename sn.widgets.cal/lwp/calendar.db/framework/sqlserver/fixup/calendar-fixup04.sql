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

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '4', RELEASEVER = '4.0.0.0.0' WHERE COMPKEY = 'CALENDAR';

CREATE TABLE CALENDAR.CA_EVENTTAG (
	TAG_UUID		NVARCHAR(36)	 NOT NULL,
	CALENDAR_UUID	NVARCHAR(36)	 NOT NULL,
	EVENT_UUID		NVARCHAR(36)	 NOT NULL,
	NAME	    	NVARCHAR(256) 	 NOT NULL,
	MODIFIEDON	    DATETIME	 	 NOT NULL
);
CREATE INDEX CA_EVTAG_EVID_IDX ON CALENDAR.CA_EVENTTAG(EVENT_UUID);
CREATE INDEX CA_EVTAG_CALID_IDX ON CALENDAR.CA_EVENTTAG(CALENDAR_UUID, NAME);
CREATE INDEX CA_EVTAG_NAME_IDX ON CALENDAR.CA_EVENTTAG(NAME, CALENDAR_UUID);
CREATE UNIQUE INDEX CA_EVTAG_NAME_EVID_IDX ON CALENDAR.CA_EVENTTAG(NAME, EVENT_UUID);

CREATE TABLE CALENDAR.CA_EVENTTAGAGG (
	TAGAGG_UUID		NVARCHAR(36)	 NOT NULL,
	CALENDAR_UUID	NVARCHAR(36),
	NAME	    	NVARCHAR(256) 	 NOT NULL,
	TOTAL			INTEGER		 	 NOT NULL,
	LASTUSED	    DATETIME	 	 NOT NULL
);
CREATE INDEX CA_EVTAGAGG_CALID_IDX ON CALENDAR.CA_EVENTTAGAGG(CALENDAR_UUID, TOTAL);
CREATE UNIQUE INDEX CA_EVTAGAGG_CALID_NAME_IDX ON CALENDAR.CA_EVENTTAGAGG(CALENDAR_UUID, NAME);

CREATE TABLE CALENDAR.CA_EVENTCOMMENT (
	COMMENT_UUID	NVARCHAR(36)	 NOT NULL,
	CALENDAR_UUID	NVARCHAR(36)	 NOT NULL,
	EVENT_UUID		NVARCHAR(36)	 NOT NULL,
	CREATEDBY		NVARCHAR(36)	 NOT NULL,
	CREATEON		DATETIME	 	 NOT NULL,
	CONTENT	    	NVARCHAR(MAX) 	 NOT NULL
);
CREATE INDEX CA_EVCMT_EVID_IDX ON CALENDAR.CA_EVENTCOMMENT(EVENT_UUID);

ALTER TABLE CALENDAR.CA_EVENTTAG
ADD CONSTRAINT CA_EVTAG_PK PRIMARY KEY (
	TAG_UUID
);

ALTER TABLE CALENDAR.CA_EVENTTAGAGG
ADD CONSTRAINT CA_EVTAGAGG_PK PRIMARY KEY (
	TAGAGG_UUID
);

ALTER TABLE CALENDAR.CA_EVENTCOMMENT
ADD CONSTRAINT CA_EVCMT_PK PRIMARY KEY (
	COMMENT_UUID
);

GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_EVENTTAG TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_EVENTTAGAGG TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_EVENTCOMMENT TO SNCOMMUSER;

COMMIT;