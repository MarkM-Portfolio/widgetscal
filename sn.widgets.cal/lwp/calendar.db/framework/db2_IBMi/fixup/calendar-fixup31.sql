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

--CONNECT TO SNCOMM;

CREATE INDEX CALENDAR.CA_EVINST_ED_IDX ON CALENDAR.CA_EVENTINSTANCE(ENDDATE, ORG_ID);
COMMIT;

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '31', RELEASEVER = '5.0.0.0.0' WHERE COMPKEY = 'CALENDAR';
COMMIT;

--CONNECT RESET;
