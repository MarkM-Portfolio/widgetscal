-- ***************************************************************** 
--                                                                   
-- IBM Confidential                                                  
--                                                                   
-- OCO Source Materials                                              
--                                                                   
-- Copyright IBM Corp. 2015                        
--                                                                   
-- The source code for this program is not published or otherwise    
-- divested of its trade secrets, irrespective of what has been      
-- deposited with the U.S. Copyright Office.                         
--                                                                   
-- ***************************************************************** 

CONNECT TO SNCOMM@

UPDATE CALENDAR.CA_EVENT SET MODIFIEDON = CREATEDON WHERE MODIFIEDON IS NULL@
UPDATE CALENDAR.CA_EVENT SET DBMODTIME = MODIFIEDON WHERE DBMODTIME IS NULL OR MODIFIEDON > DBMODTIME@

UPDATE CALENDAR.CA_EVENTINSTANCE EI SET EI.DBMODTIME = (SELECT E.CREATEDON FROM CALENDAR.CA_EVENT E WHERE E.EVENT_UUID = EI.EVENT_UUID) WHERE EI.DBMODTIME IS NULL@
UPDATE CALENDAR.CA_EVENTINSTANCE SET DBMODTIME = MODIFIEDON WHERE DBMODTIME IS NULL OR MODIFIEDON > DBMODTIME@

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '34', RELEASEVER = '5.5.0.0.0' WHERE COMPKEY = 'CALENDAR'@
COMMIT@

CONNECT RESET@