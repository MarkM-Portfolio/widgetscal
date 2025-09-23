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

EXPORT TO ca_event.ixf OF IXF MESSAGES ca_event_export.msg SELECT EVENT_UUID, MODIFIEDON DBMODTIME FROM CALENDAR.CA_EVENT WHERE DBMODTIME IS NULL@

IMPORT FROM ca_event.ixf OF IXF COMMITCOUNT 1000 MESSAGES ca_event_import.msg INSERT_UPDATE INTO CALENDAR.CA_EVENT(EVENT_UUID, DBMODTIME)@

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '32', RELEASEVER = '5.0.0.0.0' WHERE COMPKEY = 'CALENDAR'@
COMMIT@

CONNECT RESET@
