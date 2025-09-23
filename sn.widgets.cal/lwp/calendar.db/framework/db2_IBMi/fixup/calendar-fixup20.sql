-- ***************************************************************** 
--                                                                   
-- IBM Confidential                                                  
--                                                                   
-- OCO Source Materials                                              
--                                                                   
-- Copyright IBM Corp. 2012, 2014                        
--                                                                   
-- The source code for this program is not published or otherwise    
-- divested of its trade secrets, irrespective of what has been      
-- deposited with the U.S. Copyright Office.                         
--                                                                   
-- ***************************************************************** 

--CONNECT TO SNCOMM;

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '20', RELEASEVER = '4.5.0.0.0' WHERE COMPKEY = 'CALENDAR';

DROP VIEW CALENDAR.CA_USER;

CREATE VIEW CALENDAR.CA_USER AS
   SELECT MEMBER_UUID AS MEMBER_UUID, DIRECTORY_UUID AS DIRECTORY_UUID, DISPLAY AS DISPLAY, EMAIL AS EMAIL, STATE AS STATE, ORG_ID AS ORG_ID
   FROM SNCOMM.MEMBERPROFILE;

ALTER TABLE CALENDAR.CA_CALENDAR ADD COLUMN ORG_ID VARCHAR(36) CCSID 1208;

DROP INDEX CALENDAR.CA_CAL_VISIBILITY_IDX;
CREATE INDEX CALENDAR.CA_CAL_VISIBILITY_IDX ON CALENDAR.CA_CALENDAR(CALENDAR_UUID, VISIBILITY, ORG_ID);
   
COMMIT;

GRANT SELECT ON TABLE CALENDAR.CA_USER TO LCUSER;

COMMIT;

--CONNECT RESET;
