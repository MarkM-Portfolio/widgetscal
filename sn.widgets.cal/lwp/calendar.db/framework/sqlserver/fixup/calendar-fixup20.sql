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

USE SNCOMM;
GO

BEGIN TRANSACTION;

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '20', RELEASEVER = '4.5.0.0.0' WHERE COMPKEY = 'CALENDAR';
GO

DROP VIEW CALENDAR.CA_USER;
GO

CREATE VIEW CALENDAR.CA_USER AS
   SELECT MEMBER_UUID AS MEMBER_UUID, DIRECTORY_UUID AS DIRECTORY_UUID, DISPLAY AS DISPLAY, EMAIL AS EMAIL, STATE AS STATE, ORG_ID AS ORG_ID
   FROM SNCOMM.MEMBERPROFILE; 
GO
   
ALTER TABLE CALENDAR.CA_CALENDAR ADD ORG_ID NVARCHAR(36); 
GO

DROP INDEX CA_CAL_VISIBILITY_IDX ON CALENDAR.CA_CALENDAR;
GO

CREATE INDEX CA_CAL_VISIBILITY_IDX ON CALENDAR.CA_CALENDAR(CALENDAR_UUID, VISIBILITY, ORG_ID);
GO

GRANT SELECT ON CALENDAR.CA_USER TO SNCOMMUSER;
GO

COMMIT;