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

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '26', RELEASEVER = '4.5.0.0.0' WHERE COMPKEY = 'CALENDAR'@

DROP VIEW CALENDAR.CA_USER@

CREATE VIEW CALENDAR.CA_USER AS
   SELECT MEMBER_UUID AS MEMBER_UUID, DIRECTORY_UUID AS DIRECTORY_UUID, DISPLAY AS DISPLAY, EMAIL AS EMAIL, STATE AS STATE, ORG_ID AS ORG_ID, ISEXTERNAL AS ISEXTERNAL
   FROM SNCOMM.MEMBERPROFILE@

GRANT SELECT ON TABLE CALENDAR.CA_USER TO USER LCUSER@

COMMIT@

CONNECT RESET@
