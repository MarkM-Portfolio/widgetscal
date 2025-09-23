-- ***************************************************************** 
--                                                                   
-- IBM Confidential                                                  
--                                                                   
-- OCO Source Materials                                              
--                                                                   
-- Copyright IBM Corp. 2011, 2012                           
--                                                                   
-- The source code for this program is not published or otherwise    
-- divested of its trade secrets, irrespective of what has been      
-- deposited with the U.S. Copyright Office.                         
--                                                                   
-- ***************************************************************** 
                                         
-- remove foreign keys

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

COMMIT;

QUIT;
