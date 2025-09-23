-- ***************************************************************** 
--                                                                   
-- IBM Confidential                                                  
--                                                                   
-- OCO Source Materials                                              
--                                                                   
-- Copyright IBM Corp. 2007, 2013                                    
--                                                                   
-- The source code for this program is not published or otherwise    
-- divested of its trade secrets, irrespective of what has been      
-- deposited with the U.S. Copyright Office.                         
--                                                                   
-- ***************************************************************** 

-- 5724-S68            
/*
CONNECT TO SNCOMM;
*/
DROP TABLE CALENDAR.CA_SCHEMA;
DROP TABLE CALENDAR.CA_MEMBERSHIP;
DROP TABLE CALENDAR.CA_EVENT;
DROP TABLE CALENDAR.CA_EVENTINFO;
DROP TABLE CALENDAR.CA_RECURRENCE;
DROP TABLE CALENDAR.CA_EVENTINSTANCE;
DROP TABLE CALENDAR.CA_CALENDAR;
DROP TABLE CALENDAR.CA_SUBSTITUTION;
DROP TABLE CALENDAR.CA_DELETION_HISTORY;
DROP TABLE CALENDAR.CA_EVENTTAG;
DROP TABLE CALENDAR.CA_EVENTTAGAGG;
DROP TABLE CALENDAR.CA_EVENTCOMMENT;
DROP TABLE CALENDAR.CA_EVENTFOLLOWING;
DROP TABLE CALENDAR.CA_MISCDATA;

DROP VIEW CALENDAR.CA_USER;

DROP SCHEMA CALENDAR RESTRICT;
/*
DROP TABLESPACE CALENDARTABSPACE;
DROP TABLESPACE CATMPTABSPACE;

DROP BUFFERPOOL CA32KBP;
*/
/*
COMMIT;
*/
/*
CONNECT RESET;
*/