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

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '9', RELEASEVER = '4.0.0.0.0' WHERE COMPKEY = 'CALENDAR';

DROP INDEX CA_EVINST_CALID_SD_IDX ON CALENDAR.CA_EVENTINSTANCE;

CREATE INDEX CA_EVINST_CALID_EDSD_IDX ON CALENDAR.CA_EVENTINSTANCE(CALENDAR_UUID, ENDDATE, STARTDATE);
CREATE INDEX CA_EVINST_EVID_EDSD_IDX ON CALENDAR.CA_EVENTINSTANCE(EVENT_UUID, ENDDATE DESC, STARTDATE);
CREATE UNIQUE INDEX CA_EVINST_INST_EDSD_IDX ON CALENDAR.CA_EVENTINSTANCE(EVENTINST_UUID, ENDDATE, STARTDATE);

CREATE TABLE CALENDAR.CA_EVENTFOLLOWING (
    EVFLW_UUID		NVARCHAR(36)	 NOT NULL,
    CALENDAR_UUID	NVARCHAR(36)	 NOT NULL,
    EVENT_UUID		NVARCHAR(36)	 NOT NULL,
    EVENTITEM_UUID  NVARCHAR(36)  	 NOT NULL,
    EVENTITEM_TYPE	INTEGER	     	 NOT NULL, -- 0: event, 1: instance
    ENDDATE			DATETIME	 	 NOT NULL,
    USER_UUID		NVARCHAR(36)	 NOT NULL,
    FOLLOW   		INTEGER	     	 NOT NULL, -- event 'follow' type, 0x01: follow, 0x02: attend, 0x10: both attend and follow
    MODIFIEDON		DATETIME	 	 NOT NULL
);
CREATE INDEX CA_EVFLW_CAID_IDX ON CALENDAR.CA_EVENTFOLLOWING(CALENDAR_UUID);
CREATE INDEX CA_EVFLW_EVID_IDX ON CALENDAR.CA_EVENTFOLLOWING(EVENT_UUID);
CREATE UNIQUE INDEX CA_EVFLW_EVITEM_IDX ON CALENDAR.CA_EVENTFOLLOWING(EVENTITEM_UUID, EVENTITEM_TYPE, USER_UUID);
CREATE UNIQUE INDEX CA_EVFLW_USR_IDX ON CALENDAR.CA_EVENTFOLLOWING(USER_UUID, ENDDATE, EVFLW_UUID) INCLUDE (FOLLOW, CALENDAR_UUID, EVENTITEM_UUID, EVENTITEM_TYPE);

CREATE TABLE CALENDAR.CA_MISCDATA (
    NAME          	NVARCHAR(256)  NOT NULL,
    VAL       		NVARCHAR(1024) NOT NULL,
    MODIFIEDON		DATETIME	   NOT NULL
);

ALTER TABLE CALENDAR.CA_EVENTFOLLOWING
ADD CONSTRAINT CA_EVFLW_PK PRIMARY KEY (
	EVFLW_UUID
);

ALTER TABLE CALENDAR.CA_MISCDATA
ADD CONSTRAINT CA_MISCDATA_PK PRIMARY KEY (
	NAME
);

GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_EVENTFOLLOWING TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_MISCDATA TO SNCOMMUSER;

COMMIT;