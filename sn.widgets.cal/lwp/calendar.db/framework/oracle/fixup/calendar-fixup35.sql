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

--POST
ALTER TABLE CALENDAR.CA_SCHEMA ADD "PRESCHEMAVER" VARCHAR2 ( 10 ) DEFAULT '0' NOT NULL;
ALTER TABLE CALENDAR.CA_SCHEMA ADD "POSTSCHEMAVER" VARCHAR2 ( 10 ) DEFAULT '0' NOT NULL;

COMMIT;

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '35', RELEASEVER = '5.5.0.0.0' WHERE COMPKEY = 'CALENDAR';
COMMIT;

QUIT;