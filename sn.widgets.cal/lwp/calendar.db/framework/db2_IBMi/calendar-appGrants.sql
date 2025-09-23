-- ***************************************************************** 
--                                                                   
-- IBM Confidential                                                  
--                                                                   
-- OCO Source Materials                                              
--                                                                   
-- Copyright IBM Corp. 2007, 2014                                    
--                                                                   
-- The source code for this program is not published or otherwise    
-- divested of its trade secrets, irrespective of what has been      
-- deposited with the U.S. Copyright Office.                         
--                                                                   
-- ***************************************************************** 

-- 5724-S68            
/*
CONNECT TO SNCOMM;

-- grant connect

GRANT CONNECT ON DATABASE TO USER LCUSER;
*/

-- grant objects

GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_SCHEMA TO LCUSER;
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_MEMBERSHIP TO LCUSER;
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_EVENT TO LCUSER;
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_EVENTINFO TO LCUSER;
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_RECURRENCE TO LCUSER;
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_EVENTINSTANCE TO LCUSER;
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_CALENDAR TO LCUSER;
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_SUBSTITUTION TO LCUSER;
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_DELETION_HISTORY TO LCUSER;
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_EVENTTAG TO LCUSER;
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_EVENTTAGAGG TO LCUSER;
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_EVENTCOMMENT TO LCUSER;
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_EVENTFOLLOWING TO LCUSER;
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_MISCDATA TO LCUSER;
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_USERMENTION TO LCUSER;


GRANT SELECT ON TABLE CALENDAR.CA_USER TO LCUSER;

COMMIT;

/*
COMMIT;
*/
/*
CONNECT RESET;
TERMINATE;
*/
