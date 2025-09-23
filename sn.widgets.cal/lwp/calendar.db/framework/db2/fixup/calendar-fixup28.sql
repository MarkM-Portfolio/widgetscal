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

UPDATE CALENDAR.CA_MEMBERSHIP SET ORG_ID = 'a' WHERE ORG_ID = ' '@
COMMIT@

UPDATE CALENDAR.CA_CALENDAR SET ORG_ID = 'a' WHERE ORG_ID = ' '@
COMMIT@

UPDATE CALENDAR.CA_EVENT SET ORG_ID = 'a' WHERE ORG_ID = ' '@
COMMIT@

UPDATE CALENDAR.CA_EVENTINSTANCE SET ORG_ID = 'a' WHERE ORG_ID = ' '@
COMMIT@

UPDATE CALENDAR.CA_SUBSTITUTION SET ORG_ID = 'a' WHERE ORG_ID = ' '@
COMMIT@

UPDATE CALENDAR.CA_RECURRENCE SET ORG_ID = 'a' WHERE ORG_ID = ' '@
COMMIT@

UPDATE CALENDAR.CA_EVENTINFO SET ORG_ID = 'a' WHERE ORG_ID = ' '@
COMMIT@

UPDATE CALENDAR.CA_DELETION_HISTORY SET ORG_ID = 'a' WHERE ORG_ID = ' '@
COMMIT@

UPDATE CALENDAR.CA_EVENTTAG SET ORG_ID = 'a' WHERE ORG_ID = ' '@
COMMIT@

UPDATE CALENDAR.CA_EVENTTAGAGG SET ORG_ID = 'a' WHERE ORG_ID = ' '@
COMMIT@

UPDATE CALENDAR.CA_EVENTCOMMENT SET ORG_ID = 'a' WHERE ORG_ID = ' '@
COMMIT@

UPDATE CALENDAR.CA_EVENTFOLLOWING SET ORG_ID = 'a' WHERE ORG_ID = ' '@
COMMIT@

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '28', RELEASEVER = '5.0.0.0.0' WHERE COMPKEY = 'CALENDAR'@
COMMIT@

CONNECT RESET@
