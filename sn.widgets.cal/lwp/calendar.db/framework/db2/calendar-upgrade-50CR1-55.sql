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
--fix30
ALTER TABLE CALENDAR.CA_EVENTINSTANCE ADD COLUMN DBMODTIME TIMESTAMP DEFAULT NULL@

COMMIT@

CREATE INDEX CALENDAR.CA_EVINST_DBMD_IDX ON CALENDAR.CA_EVENTINSTANCE(DBMODTIME, ORG_ID)@

COMMIT@

UPDATE CALENDAR.CA_EVENTINSTANCE I SET I.DBMODTIME = (
	SELECT MAX(C.CREATEON) FROM CALENDAR.CA_EVENTCOMMENT C WHERE C.EVENT_UUID = I.EVENTINST_UUID GROUP BY C.EVENT_UUID
)@

COMMIT@


--fix32

EXPORT TO ca_event.ixf OF IXF MESSAGES ca_event_export.msg SELECT EVENT_UUID, MODIFIEDON DBMODTIME FROM CALENDAR.CA_EVENT WHERE DBMODTIME IS NULL@

IMPORT FROM ca_event.ixf OF IXF COMMITCOUNT 1000 MESSAGES ca_event_import.msg INSERT_UPDATE INTO CALENDAR.CA_EVENT(EVENT_UUID, DBMODTIME)@

COMMIT@

-- fix 34
UPDATE CALENDAR.CA_EVENT SET MODIFIEDON = CREATEDON WHERE MODIFIEDON IS NULL@
UPDATE CALENDAR.CA_EVENT SET DBMODTIME = MODIFIEDON WHERE DBMODTIME IS NULL OR MODIFIEDON > DBMODTIME@

UPDATE CALENDAR.CA_EVENTINSTANCE EI SET EI.DBMODTIME = (SELECT E.CREATEDON FROM CALENDAR.CA_EVENT E WHERE E.EVENT_UUID = EI.EVENT_UUID) WHERE EI.DBMODTIME IS NULL@
UPDATE CALENDAR.CA_EVENTINSTANCE SET DBMODTIME = MODIFIEDON WHERE DBMODTIME IS NULL OR MODIFIEDON > DBMODTIME@

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '34', RELEASEVER = '5.5.0.0.0' WHERE COMPKEY = 'CALENDAR'@
COMMIT@

CONNECT RESET@
