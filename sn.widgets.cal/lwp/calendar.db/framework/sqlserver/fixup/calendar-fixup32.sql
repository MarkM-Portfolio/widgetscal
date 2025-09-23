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

USE SNCOMM;
GO

BEGIN TRANSACTION;

UPDATE CALENDAR.CA_EVENT SET DBMODTIME=MODIFIEDON WHERE DBMODTIME IS NULL;
go

COMMIT;

BEGIN TRANSACTION;

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '32', RELEASEVER = '5.0.0.0.0' WHERE COMPKEY = 'CALENDAR';
GO

COMMIT;