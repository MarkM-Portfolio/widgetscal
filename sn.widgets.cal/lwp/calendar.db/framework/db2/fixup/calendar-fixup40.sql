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
UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '40', RELEASEVER = '6.0.0.0.0', POSTSCHEMAVER = '40.0' WHERE COMPKEY = 'CALENDAR'@
COMMIT@

CONNECT RESET@
