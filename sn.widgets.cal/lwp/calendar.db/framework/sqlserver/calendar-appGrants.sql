-- ***************************************************************** 
--                                                                   
-- IBM Confidential                                                  
--                                                                   
-- OCO Source Materials                                              
--                                                                   
-- Copyright IBM Corp. 2011, 2014                     
--                                                                   
-- The source code for this program is not published or otherwise    
-- divested of its trade secrets, irrespective of what has been      
-- deposited with the U.S. Copyright Office.                         
--                                                                   
-- ***************************************************************** 
USE SNCOMM;

GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_SCHEMA TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_MEMBERSHIP TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_EVENT TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_EVENTINFO TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_RECURRENCE TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_EVENTINSTANCE TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_CALENDAR TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_SUBSTITUTION TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_DELETION_HISTORY TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_EVENTTAG TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_EVENTTAGAGG TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_EVENTCOMMENT TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_EVENTFOLLOWING TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_MISCDATA TO SNCOMMUSER;
GRANT DELETE,INSERT,SELECT,UPDATE ON CALENDAR.CA_USERMENTION TO SNCOMMUSER;

GRANT SELECT ON CALENDAR.CA_USER TO SNCOMMUSER;

GO
