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

USE SNCOMM;
GO

-- disable foreign keys

USE SNCOMM;
GO

-- delete data

DELETE FROM CALENDAR.CA_SCHEMA;
GO
DELETE FROM CALENDAR.CA_MEMBERSHIP;
GO
DELETE FROM CALENDAR.CA_EVENT;
GO
DELETE FROM CALENDAR.CA_EVENTINFO;
GO
DELETE FROM CALENDAR.CA_RECURRENCE;
GO
DELETE FROM CALENDAR.CA_EVENTINSTANCE;
GO
DELETE FROM CALENDAR.CA_CALENDAR;
GO
DELETE FROM CALENDAR.CA_SUBSTITUTION;
GO
DELETE FROM CALENDAR.CA_DELETION_HISTORY;
GO
DELETE FROM CALENDAR.CA_EVENTTAG;
GO
DELETE FROM CALENDAR.CA_EVENTTAGAGG;
GO
DELETE FROM CALENDAR.CA_EVENTCOMMENT;
GO
DELETE FROM CALENDAR.CA_EVENTFOLLOWING;
GO
DELETE FROM CALENDAR.CA_MISCDATA;
GO