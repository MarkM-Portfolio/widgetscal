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

--CONNECT TO SNCOMM;

ALTER TABLE CALENDAR.CA_EVENTINSTANCE ADD COLUMN DBMODTIME TIMESTAMP DEFAULT NULL;

COMMIT;

CREATE INDEX CALENDAR.CA_EVINST_DBMD_IDX ON CALENDAR.CA_EVENTINSTANCE(DBMODTIME, ORG_ID);

COMMIT;

UPDATE CALENDAR.CA_EVENTINSTANCE I SET I.DBMODTIME = (
	SELECT MAX(C.CREATEON) FROM CALENDAR.CA_EVENTCOMMENT C WHERE C.EVENT_UUID = I.EVENTINST_UUID GROUP BY C.EVENT_UUID
);

COMMIT;

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '30', RELEASEVER = '5.0.0.0.0' WHERE COMPKEY = 'CALENDAR';

COMMIT;

--CONNECT RESET;
