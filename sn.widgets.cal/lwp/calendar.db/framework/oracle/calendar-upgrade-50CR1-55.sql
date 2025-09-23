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

--fix30
ALTER TABLE CALENDAR.CA_EVENTINSTANCE ADD (DBMODTIME TIMESTAMP DEFAULT NULL);

COMMIT;

CREATE INDEX CALENDAR.CA_EVINST_DBMD_IDX ON CALENDAR.CA_EVENTINSTANCE(DBMODTIME, ORG_ID)TABLESPACE CALENDARINDEXTABSPACE;

COMMIT;


UPDATE CALENDAR.CA_EVENTINSTANCE I SET I.DBMODTIME = (
	SELECT MAX(C.CREATEON) FROM CALENDAR.CA_EVENTCOMMENT C WHERE C.EVENT_UUID = I.EVENTINST_UUID GROUP BY C.EVENT_UUID
);

COMMIT;


--fix32

UPDATE CALENDAR.CA_EVENT SET DBMODTIME=MODIFIEDON WHERE DBMODTIME IS NULL;
COMMIT;

-- fix34

UPDATE CALENDAR.CA_EVENT SET MODIFIEDON = CREATEDON WHERE MODIFIEDON IS NULL;
COMMIT;
UPDATE CALENDAR.CA_EVENT SET DBMODTIME = MODIFIEDON WHERE DBMODTIME IS NULL OR MODIFIEDON > DBMODTIME;
COMMIT;

UPDATE CALENDAR.CA_EVENTINSTANCE EI SET EI.DBMODTIME = (SELECT E.CREATEDON FROM CALENDAR.CA_EVENT E WHERE E.EVENT_UUID = EI.EVENT_UUID) WHERE EI.DBMODTIME IS NULL;
COMMIT;
UPDATE CALENDAR.CA_EVENTINSTANCE SET DBMODTIME = MODIFIEDON WHERE DBMODTIME IS NULL OR MODIFIEDON > DBMODTIME;
COMMIT;

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '34', RELEASEVER = '5.5.0.0.0' WHERE COMPKEY = 'CALENDAR';
COMMIT;

QUIT;