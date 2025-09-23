-- ***************************************************************** 
--                                                                   
-- IBM Confidential                                                  
--                                                                   
-- OCO Source Materials                                              
--                                                                   
-- Copyright IBM Corp. 2012, 2013                        
--                                                                   
-- The source code for this program is not published or otherwise    
-- divested of its trade secrets, irrespective of what has been      
-- deposited with the U.S. Copyright Office.                         
--                                                                   
-- ***************************************************************** 

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '20', RELEASEVER = '4.5.0.0.0' WHERE COMPKEY = 'CALENDAR';

DROP VIEW CALENDAR.CA_USER;

CREATE VIEW CALENDAR.CA_USER AS
   SELECT MEMBER_UUID AS MEMBER_UUID, DIRECTORY_UUID AS DIRECTORY_UUID, DISPLAY AS DISPLAY, EMAIL AS EMAIL, STATE AS STATE, ORG_ID AS ORG_ID
   FROM SNCOMM.MEMBERPROFILE;
   
ALTER TABLE CALENDAR.CA_CALENDAR ADD (ORG_ID VARCHAR(36));

ALTER TABLE CALENDAR.CA_CALENDAR DROP CONSTRAINT CA_CALENDAR_PK;

DROP INDEX CALENDAR.CA_CAL_VISIBILITY_IDX;
CREATE INDEX CALENDAR.CA_CAL_VISIBILITY_IDX ON CALENDAR.CA_CALENDAR(CALENDAR_UUID, VISIBILITY, ORG_ID)TABLESPACE CALENDARINDEXTABSPACE;

ALTER TABLE CALENDAR.CA_CALENDAR
	ADD (CONSTRAINT CA_CALENDAR_PK PRIMARY KEY (CALENDAR_UUID) USING INDEX TABLESPACE CALENDARINDEXTABSPACE);

COMMIT;

GRANT SELECT ON CALENDAR.CA_USER TO SNCOMMUSER_ROLE;

COMMIT;

QUIT;