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

USE SNCOMM;
GO

BEGIN TRANSACTION;

--fix30
ALTER TABLE CALENDAR.CA_EVENTINSTANCE ADD DBMODTIME DATETIME DEFAULT NULL; 
GO

CREATE INDEX CA_EVINST_DBMD_IDX ON CALENDAR.CA_EVENTINSTANCE(DBMODTIME, ORG_ID);
GO

UPDATE CALENDAR.CA_EVENTINSTANCE SET DBMODTIME = (
	SELECT MAX(C.CREATEON) FROM CALENDAR.CA_EVENTCOMMENT C WHERE C.EVENT_UUID = I.EVENTINST_UUID GROUP BY C.EVENT_UUID
) FROM CALENDAR.CA_EVENTINSTANCE AS I;
GO


--fix32

UPDATE CALENDAR.CA_EVENT SET DBMODTIME=MODIFIEDON WHERE DBMODTIME IS NULL;
go

--fix34
UPDATE CALENDAR.CA_EVENT SET MODIFIEDON = CREATEDON WHERE MODIFIEDON IS NULL;
GO
UPDATE CALENDAR.CA_EVENT SET DBMODTIME = MODIFIEDON WHERE DBMODTIME IS NULL OR MODIFIEDON > DBMODTIME;
GO

UPDATE CALENDAR.CA_EVENTINSTANCE SET CA_EVENTINSTANCE.DBMODTIME = (SELECT E.CREATEDON FROM CALENDAR.CA_EVENT E WHERE E.EVENT_UUID = CA_EVENTINSTANCE.EVENT_UUID) WHERE CA_EVENTINSTANCE.DBMODTIME IS NULL;
GO
UPDATE CALENDAR.CA_EVENTINSTANCE SET DBMODTIME = MODIFIEDON WHERE DBMODTIME IS NULL OR MODIFIEDON > DBMODTIME;
GO

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '34', RELEASEVER = '5.5.0.0.0' WHERE COMPKEY = 'CALENDAR';
GO

COMMIT;