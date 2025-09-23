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

CONNECT TO SNCOMM@

-- grant connect

GRANT CONNECT ON DATABASE TO USER LCUSER@


-- grant objects

GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_SCHEMA TO USER LCUSER@
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_MEMBERSHIP TO USER LCUSER@
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_EVENT TO USER LCUSER@
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_EVENTINFO TO USER LCUSER@
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_RECURRENCE TO USER LCUSER@
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_EVENTINSTANCE TO USER LCUSER@
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_CALENDAR TO USER LCUSER@
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_SUBSTITUTION TO USER LCUSER@
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_DELETION_HISTORY TO USER LCUSER@
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_EVENTTAG TO USER LCUSER@
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_EVENTTAGAGG TO USER LCUSER@
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_EVENTCOMMENT TO USER LCUSER@
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_EVENTFOLLOWING TO USER LCUSER@
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_MISCDATA TO USER LCUSER@
GRANT INSERT, DELETE, UPDATE, SELECT ON TABLE CALENDAR.CA_USERMENTION TO USER LCUSER@

GRANT SELECT ON TABLE CALENDAR.CA_USER TO USER LCUSER@

COMMIT@

CONNECT RESET@
TERMINATE@

