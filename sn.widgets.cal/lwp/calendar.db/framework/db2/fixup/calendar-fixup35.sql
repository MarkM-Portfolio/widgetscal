-- ***************************************************************** 
--                                                                   
-- IBM Confidential                                                  
--                                                                   
-- OCO Source Materials                                              
--                                                                   
-- Copyright IBM Corp. 2016                        
--                                                                   
-- The source code for this program is not published or otherwise    
-- divested of its trade secrets, irrespective of what has been      
-- deposited with the U.S. Copyright Office.                         
--                                                                   
-- ***************************************************************** 

CONNECT TO SNCOMM@
--POST
ALTER TABLE CALENDAR.CA_SCHEMA ADD COLUMN PRESCHEMAVER VARCHAR ( 10 ) NOT NULL WITH DEFAULT '0'@
ALTER TABLE CALENDAR.CA_SCHEMA ADD COLUMN POSTSCHEMAVER VARCHAR ( 10 ) NOT NULL WITH DEFAULT '0'@
COMMIT@

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '35', RELEASEVER = '5.5.0.0.0' WHERE COMPKEY = 'CALENDAR'@
COMMIT@

CONNECT RESET@
