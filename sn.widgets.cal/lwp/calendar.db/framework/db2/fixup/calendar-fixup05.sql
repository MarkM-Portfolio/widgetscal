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

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '5', RELEASEVER = '4.0.0.0.0' WHERE COMPKEY = 'CALENDAR'@

ALTER TABLE CALENDAR.CA_EVENT ADD COLUMN DBMODTIME TIMESTAMP@

CREATE INDEX CALENDAR.CA_EV_DBMODTIME_IDX ON CALENDAR.CA_EVENT(DBMODTIME)@

COMMIT@

CONNECT RESET@
