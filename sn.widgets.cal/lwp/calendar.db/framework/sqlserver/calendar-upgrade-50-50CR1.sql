-- ***************************************************************** 
--                                                                   
-- IBM Confidential                                                  
--                                                                   
-- OCO Source Materials                                              
--                                                                   
-- Copyright IBM Corp. 2014, 2015                  
--                                                                   
-- The source code for this program is not published or otherwise    
-- divested of its trade secrets, irrespective of what has been      
-- deposited with the U.S. Copyright Office.                         
--                                                                   
-- ***************************************************************** 

USE SNCOMM;
GO

BEGIN TRANSACTION;

CREATE INDEX CA_EVINST_ED_IDX ON CALENDAR.CA_EVENTINSTANCE(ENDDATE, ORG_ID); 
go

COMMIT;

BEGIN TRANSACTION;

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '30', RELEASEVER = '5.0.0.0.0' WHERE COMPKEY = 'CALENDAR';
GO

COMMIT;