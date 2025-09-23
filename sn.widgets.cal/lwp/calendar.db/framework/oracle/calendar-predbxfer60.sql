-- ***************************************************************** 
--                                                                   
-- IBM Confidential                                                  
--                                                                   
-- OCO Source Materials                                              
--                                                                   
-- Copyright IBM Corp. 2012, 2016                                    
--                                                                   
-- The source code for this program is not published or otherwise    
-- divested of its trade secrets, irrespective of what has been      
-- deposited with the U.S. Copyright Office.                         
--                                                                   
-- ***************************************************************** 


COMMIT;

-- remove data

DELETE FROM CALENDAR.CA_SCHEMA;
DELETE FROM CALENDAR.CA_MEMBERSHIP;
DELETE FROM CALENDAR.CA_EVENT;
DELETE FROM CALENDAR.CA_EVENTINFO;
DELETE FROM CALENDAR.CA_RECURRENCE;
DELETE FROM CALENDAR.CA_EVENTINSTANCE;
DELETE FROM CALENDAR.CA_CALENDAR;
DELETE FROM CALENDAR.CA_SUBSTITUTION;
DELETE FROM CALENDAR.CA_DELETION_HISTORY;
DELETE FROM CALENDAR.CA_EVENTTAG;
DELETE FROM CALENDAR.CA_EVENTTAGAGG;
DELETE FROM CALENDAR.CA_EVENTCOMMENT;
DELETE FROM CALENDAR.CA_EVENTFOLLOWING;
DELETE FROM CALENDAR.CA_MISCDATA;
DELETE FROM CALENDAR.CA_USERMENTION;

COMMIT;

QUIT;
