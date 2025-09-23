-- ***************************************************************** 
--                                                                   
-- IBM Confidential                                                  
--                                                                   
-- OCO Source Materials                                              
--                                                                   
-- Copyright IBM Corp. 2012, 2014                        
--                                                                   
-- The source code for this program is not published or otherwise    
-- divested of its trade secrets, irrespective of what has been      
-- deposited with the U.S. Copyright Office.                         
--                                                                   
-- ***************************************************************** 

USE SNCOMM;
GO

begin transaction;

delete from CALENDAR.CA_DELETION_HISTORY;
go

commit transaction;
begin transaction;

delete from CALENDAR.CA_EVENTTAGAGG where CALENDAR_UUID is null;
go

commit transaction;
begin transaction;

update CALENDAR.CA_CALENDAR set ORG_ID = ' ' where ORG_ID is NULL or ORG_ID = '';
go

commit transaction;
begin transaction;

-- add CALENDAR_UUID column to CA_DELETION_HISTORY table
alter table CALENDAR.CA_DELETION_HISTORY add CALENDAR_UUID nvarchar(36) not null;
go

-- add ORG_ID column for all tables

alter table CALENDAR.CA_MEMBERSHIP add ORG_ID nvarchar(36) not null constraint membership_orgid_df default ' ';
go
alter table CALENDAR.CA_EVENT add ORG_ID nvarchar(36) not null constraint event_orgid_df default ' ';
go
alter table CALENDAR.CA_EVENTINSTANCE add ORG_ID nvarchar(36) not null constraint eventinstance_orgid_df default ' ';
go
alter table CALENDAR.CA_SUBSTITUTION add ORG_ID nvarchar(36) not null constraint substitution_orgid_df default ' ';
go
alter table CALENDAR.CA_RECURRENCE add ORG_ID nvarchar(36) not null constraint recurrence_orgid_df default ' ';
go
alter table CALENDAR.CA_EVENTINFO add ORG_ID nvarchar(36) not null constraint eventinfo_orgid_df default ' ';
go
alter table CALENDAR.CA_EVENTTAG add ORG_ID nvarchar(36) not null constraint eventtag_orgid_df default ' ';
go
alter table CALENDAR.CA_EVENTTAGAGG add ORG_ID nvarchar(36) not null constraint eventtagagg_orgid_df default ' ';
go
alter table CALENDAR.CA_EVENTCOMMENT add ORG_ID nvarchar(36) not null constraint eventcomment_orgid_df default ' ';
go
alter table CALENDAR.CA_EVENTFOLLOWING add ORG_ID nvarchar(36) not null constraint eventfollowing_orgid_df default ' ';
go
alter table CALENDAR.CA_DELETION_HISTORY add ORG_ID nvarchar(36) not null constraint delhistory_orgid_df default ' ';
go

-- migrate ORG_ID data to all tables

delete from CALENDAR.CA_MEMBERSHIP where not exists (select 1 from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_MEMBERSHIP.CALENDAR_UUID);
go
update CALENDAR.CA_MEMBERSHIP set ORG_ID = (select cal.ORG_ID from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_MEMBERSHIP.CALENDAR_UUID);
go

commit transaction;
begin transaction;

delete from CALENDAR.CA_EVENT where not exists (select 1 from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_EVENT.CALENDAR_UUID);
go
update CALENDAR.CA_EVENT set ORG_ID = (select cal.ORG_ID from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_EVENT.CALENDAR_UUID);
go

commit transaction;
begin transaction;

delete from CALENDAR.CA_EVENTINSTANCE where not exists (select 1 from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_EVENTINSTANCE.CALENDAR_UUID);
go
update CALENDAR.CA_EVENTINSTANCE set ORG_ID = (select cal.ORG_ID from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_EVENTINSTANCE.CALENDAR_UUID);
go

commit transaction;
begin transaction;

delete from CALENDAR.CA_SUBSTITUTION where not exists (select 1 from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_SUBSTITUTION.CALENDAR_UUID);
go
update CALENDAR.CA_SUBSTITUTION set ORG_ID = (select cal.ORG_ID from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_SUBSTITUTION.CALENDAR_UUID);
go

commit transaction;
begin transaction;

delete from CALENDAR.CA_RECURRENCE where not exists (select 1 from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_RECURRENCE.CALENDAR_UUID);
go
update CALENDAR.CA_RECURRENCE set ORG_ID = (select cal.ORG_ID from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_RECURRENCE.CALENDAR_UUID);
go

commit transaction;
begin transaction;

delete from CALENDAR.CA_EVENTINFO where not exists (select 1 from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_EVENTINFO.CALENDAR_UUID);
go
update CALENDAR.CA_EVENTINFO set ORG_ID = (select cal.ORG_ID from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_EVENTINFO.CALENDAR_UUID);
go

commit transaction;
begin transaction;

delete from CALENDAR.CA_EVENTTAG where not exists (select 1 from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_EVENTTAG.CALENDAR_UUID);
go
update CALENDAR.CA_EVENTTAG set ORG_ID = (select cal.ORG_ID from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_EVENTTAG.CALENDAR_UUID);
go

commit transaction;
begin transaction;

delete from CALENDAR.CA_EVENTCOMMENT where not exists (select 1 from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_EVENTCOMMENT.CALENDAR_UUID);
go
update CALENDAR.CA_EVENTCOMMENT set ORG_ID = (select cal.ORG_ID from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_EVENTCOMMENT.CALENDAR_UUID);
go

commit transaction;
begin transaction;

delete from CALENDAR.CA_EVENTFOLLOWING where not exists (select 1 from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_EVENTFOLLOWING.CALENDAR_UUID);
go
update CALENDAR.CA_EVENTFOLLOWING set ORG_ID = (select cal.ORG_ID from CALENDAR.CA_CALENDAR cal where cal.CALENDAR_UUID = CALENDAR.CA_EVENTFOLLOWING.CALENDAR_UUID);
go

commit transaction;
begin transaction;

-- drop index
drop index CA_CAL_ACLMODTIME_IDX on CALENDAR.CA_CALENDAR;
go
drop index CA_CAL_VISIBILITY_IDX on CALENDAR.CA_CALENDAR;
go
drop index CA_EV_CALID_IDX on CALENDAR.CA_EVENT;
go
drop index CA_EV_USERID_IDX on CALENDAR.CA_EVENT;
go
drop index CA_EV_CALID_USERID_IDX on CALENDAR.CA_EVENT;
go
drop index CA_EV_MODITIME_IDX on CALENDAR.CA_EVENT;
go
drop index CA_EV_DBMODTIME_IDX on CALENDAR.CA_EVENT;
go
drop index CA_EVINST_CALID_EDSD_IDX on CALENDAR.CA_EVENTINSTANCE;
go
drop index CA_EVINST_CALID_EVID_IDX on CALENDAR.CA_EVENTINSTANCE;
go
drop index CA_EVINST_EVID_SD_IDX on CALENDAR.CA_EVENTINSTANCE;
go
drop index CA_EVINST_EVID_EDSD_IDX on CALENDAR.CA_EVENTINSTANCE;
go
drop index CA_EVINST_INST_EDSD_IDX on CALENDAR.CA_EVENTINSTANCE;
go
drop index CA_SUB_CALID_IDX on CALENDAR.CA_SUBSTITUTION;
go
drop index CA_SUB_EVID_NSD_IDX on CALENDAR.CA_SUBSTITUTION;
go
drop index CA_SUB_EVID_SD_IDX on CALENDAR.CA_SUBSTITUTION;
go
drop index CA_SUB_MODITIME_IDX on CALENDAR.CA_SUBSTITUTION;
go
drop index CA_RECUR_CALID_IDX on CALENDAR.CA_RECURRENCE;
go
drop index CA_RECUR_MODITIME_IDX on CALENDAR.CA_RECURRENCE;
go
drop index CA_EVINFO_CALID_IDX on CALENDAR.CA_EVENTINFO;
go
drop index CA_EVINFO_EVID_IDX on CALENDAR.CA_EVENTINFO;
go
drop index CA_EVTAG_EVID_IDX on CALENDAR.CA_EVENTTAG;
go
drop index CA_EVTAG_CALID_IDX on CALENDAR.CA_EVENTTAG;
go
drop index CA_EVTAG_NAME_IDX on CALENDAR.CA_EVENTTAG;
go
drop index CA_EVTAG_NAME_EVID_IDX on CALENDAR.CA_EVENTTAG;
go
drop index CA_EVTAGAGG_CALID_IDX on CALENDAR.CA_EVENTTAGAGG;
go
drop index CA_EVTAGAGG_CALID_NAME_IDX on CALENDAR.CA_EVENTTAGAGG;
go
drop index CA_EVCMT_EVID_IDX on CALENDAR.CA_EVENTCOMMENT;
go
drop index CA_EVFLW_CAID_IDX on CALENDAR.CA_EVENTFOLLOWING;
go
drop index CA_EVFLW_EVID_IDX on CALENDAR.CA_EVENTFOLLOWING;
go
drop index CA_EVFLW_EVITEM_IDX on CALENDAR.CA_EVENTFOLLOWING;
go
drop index CA_EVFLW_USR_IDX on CALENDAR.CA_EVENTFOLLOWING;
go
drop index CA_DELHIS_TIME_IDX on CALENDAR.CA_DELETION_HISTORY;
go

-- drop primary key for all tables
alter table CALENDAR.CA_MEMBERSHIP drop constraint CA_MEMBERSHIP_PK;
go
alter table CALENDAR.CA_CALENDAR drop constraint CA_CALENDAR_PK;
go
alter table CALENDAR.CA_RECURRENCE drop constraint CA_RECURRENCE_PK;
go
alter table CALENDAR.CA_EVENT drop constraint CA_EVENT_PK;
go
alter table CALENDAR.CA_EVENTINSTANCE drop constraint CA_EVENTINST_PK;
go
alter table CALENDAR.CA_SUBSTITUTION drop constraint CA_SUBSTITUTION_PK;
go
alter table CALENDAR.CA_EVENTINFO drop constraint CA_EVENTINFO_PK;
go
alter table CALENDAR.CA_EVENTTAG drop constraint CA_EVTAG_PK;
go
alter table CALENDAR.CA_EVENTTAGAGG drop constraint CA_EVTAGAGG_PK;
go
alter table CALENDAR.CA_EVENTCOMMENT drop constraint CA_EVCMT_PK;
go
alter table CALENDAR.CA_EVENTFOLLOWING drop constraint CA_EVFLW_PK;
go
alter table CALENDAR.CA_DELETION_HISTORY drop constraint CA_DELHISTORY_PK;
go

commit transaction;
begin transaction;

alter table CALENDAR.CA_EVENTTAGAGG alter column CALENDAR_UUID nvarchar(36) not null;
go

alter table CALENDAR.CA_CALENDAR alter column ORG_ID nvarchar(36) not null;
go

-- recreate index
CREATE INDEX CA_CAL_ACLMODTIME_IDX ON CALENDAR.CA_CALENDAR(ACLMODTIME, CREATEDON, ORG_ID);
go
CREATE INDEX CA_CAL_VISIBILITY_IDX ON CALENDAR.CA_CALENDAR(CALENDAR_UUID, VISIBILITY, ORG_ID);
go
CREATE INDEX CA_EV_CALID_IDX ON CALENDAR.CA_EVENT(CALENDAR_UUID, CREATEDON DESC, ORG_ID);
go
CREATE INDEX CA_EV_USERID_IDX ON CALENDAR.CA_EVENT(CREATEDBY, CREATEDON DESC, ORG_ID);
go
CREATE INDEX CA_EV_CALID_USERID_IDX ON CALENDAR.CA_EVENT(CALENDAR_UUID, CREATEDBY, CREATEDON DESC, ORG_ID);
go
CREATE INDEX CA_EV_MODITIME_IDX ON CALENDAR.CA_EVENT(MODIFIEDON, ORG_ID);
go
CREATE INDEX CA_EV_DBMODTIME_IDX ON CALENDAR.CA_EVENT(DBMODTIME, ORG_ID);
go
CREATE INDEX CA_EVINST_CALID_EDSD_IDX ON CALENDAR.CA_EVENTINSTANCE(CALENDAR_UUID, ENDDATE, STARTDATE, ORG_ID);
go
CREATE INDEX CA_EVINST_CALID_EVID_IDX ON CALENDAR.CA_EVENTINSTANCE(CALENDAR_UUID, EVENT_UUID, ORG_ID);
go
CREATE INDEX CA_EVINST_EVID_SD_IDX ON CALENDAR.CA_EVENTINSTANCE(EVENT_UUID, STARTDATE, ORG_ID);
go
CREATE INDEX CA_EVINST_EVID_EDSD_IDX ON CALENDAR.CA_EVENTINSTANCE(EVENT_UUID, ENDDATE DESC, STARTDATE, ORG_ID);
go
CREATE UNIQUE INDEX CA_EVINST_INST_EDSD_IDX ON CALENDAR.CA_EVENTINSTANCE(EVENTINST_UUID, ENDDATE, STARTDATE, ORG_ID);
go
CREATE INDEX CA_SUB_CALID_IDX ON CALENDAR.CA_SUBSTITUTION(CALENDAR_UUID, ORG_ID);
go
CREATE INDEX CA_SUB_EVID_NSD_IDX ON CALENDAR.CA_SUBSTITUTION(EVENT_UUID, NEWSTARTDATE, ORG_ID);
go
CREATE INDEX CA_SUB_EVID_SD_IDX ON CALENDAR.CA_SUBSTITUTION(EVENT_UUID, STARTDATE, ORG_ID);
go
CREATE INDEX CA_SUB_MODITIME_IDX ON CALENDAR.CA_SUBSTITUTION(MODIFIEDON, EVENTINFO_UUID, ISCANCELLED, ORG_ID);
go
CREATE INDEX CA_RECUR_CALID_IDX ON CALENDAR.CA_RECURRENCE(CALENDAR_UUID, ORG_ID);
go
CREATE INDEX CA_RECUR_MODITIME_IDX ON CALENDAR.CA_RECURRENCE(MODIFIEDON, ORG_ID);
go
CREATE INDEX CA_EVINFO_CALID_IDX ON CALENDAR.CA_EVENTINFO(CALENDAR_UUID, ORG_ID);
go
CREATE INDEX CA_EVINFO_EVID_IDX ON CALENDAR.CA_EVENTINFO(EVENT_UUID, ORG_ID);
go
CREATE INDEX CA_EVTAG_EVID_IDX ON CALENDAR.CA_EVENTTAG(EVENT_UUID, ORG_ID);
go
CREATE INDEX CA_EVTAG_CALID_IDX ON CALENDAR.CA_EVENTTAG(CALENDAR_UUID, NAME, ORG_ID);
go
CREATE INDEX CA_EVTAG_NAME_IDX ON CALENDAR.CA_EVENTTAG(NAME, CALENDAR_UUID, ORG_ID);
go
CREATE UNIQUE INDEX CA_EVTAG_NAME_EVID_IDX ON CALENDAR.CA_EVENTTAG(NAME, EVENT_UUID, ORG_ID);
go
CREATE INDEX CA_EVTAGAGG_CALID_IDX ON CALENDAR.CA_EVENTTAGAGG(CALENDAR_UUID, TOTAL, ORG_ID);
go
CREATE UNIQUE INDEX CA_EVTAGAGG_CALID_NAME_IDX ON CALENDAR.CA_EVENTTAGAGG(CALENDAR_UUID, NAME, ORG_ID);
go
CREATE INDEX CA_EVCMT_EVID_IDX ON CALENDAR.CA_EVENTCOMMENT(EVENT_UUID, ORG_ID);
go
CREATE INDEX CA_EVFLW_CAID_IDX ON CALENDAR.CA_EVENTFOLLOWING(CALENDAR_UUID, ORG_ID);
go
CREATE INDEX CA_EVFLW_EVID_IDX ON CALENDAR.CA_EVENTFOLLOWING(EVENT_UUID, ORG_ID);
go
CREATE UNIQUE INDEX CA_EVFLW_EVITEM_IDX ON CALENDAR.CA_EVENTFOLLOWING(EVENTITEM_UUID, EVENTITEM_TYPE, USER_UUID, ORG_ID);
go
CREATE UNIQUE INDEX CA_EVFLW_USR_IDX ON CALENDAR.CA_EVENTFOLLOWING(USER_UUID, ENDDATE, EVFLW_UUID, ORG_ID) INCLUDE (FOLLOW, CALENDAR_UUID, EVENTITEM_UUID, EVENTITEM_TYPE);
go
CREATE INDEX CA_DELHIS_TIME_IDX ON CALENDAR.CA_DELETION_HISTORY(DBMODTIME, ORG_ID);
go

-- recreate primary keys
ALTER TABLE CALENDAR.CA_MEMBERSHIP
ADD CONSTRAINT CA_MEMBERSHIP_PK PRIMARY KEY (
	MEMBER_UUID, CALENDAR_UUID, ORG_ID
);
go

ALTER TABLE CALENDAR.CA_CALENDAR
ADD CONSTRAINT CA_CALENDAR_PK PRIMARY KEY (
	CALENDAR_UUID, ORG_ID
);
go

ALTER TABLE CALENDAR.CA_RECURRENCE
ADD CONSTRAINT CA_RECURRENCE_PK PRIMARY KEY (
	EVENT_UUID, ORG_ID
);
go

ALTER TABLE CALENDAR.CA_EVENT
ADD CONSTRAINT CA_EVENT_PK PRIMARY KEY (
	EVENT_UUID, ORG_ID
);
go

ALTER TABLE CALENDAR.CA_EVENTINSTANCE
ADD CONSTRAINT CA_EVENTINST_PK PRIMARY KEY (
	EVENTINST_UUID, ORG_ID
);
go

ALTER TABLE CALENDAR.CA_SUBSTITUTION
ADD CONSTRAINT CA_SUBSTITUTION_PK PRIMARY KEY (
	SUBSTITUTION_UUID, ORG_ID
);
go

ALTER TABLE CALENDAR.CA_EVENTINFO
ADD CONSTRAINT CA_EVENTINFO_PK PRIMARY KEY (
	EVENTINFO_UUID, ORG_ID
);
go

ALTER TABLE CALENDAR.CA_EVENTTAG
ADD CONSTRAINT CA_EVTAG_PK PRIMARY KEY (
	TAG_UUID, ORG_ID
);
go

ALTER TABLE CALENDAR.CA_EVENTTAGAGG
ADD CONSTRAINT CA_EVTAGAGG_PK PRIMARY KEY (
	TAGAGG_UUID, ORG_ID
);
go

ALTER TABLE CALENDAR.CA_EVENTCOMMENT
ADD CONSTRAINT CA_EVCMT_PK PRIMARY KEY (
	COMMENT_UUID, ORG_ID
);
go

ALTER TABLE CALENDAR.CA_EVENTFOLLOWING
ADD CONSTRAINT CA_EVFLW_PK PRIMARY KEY (
	EVFLW_UUID, ORG_ID
);
go

ALTER TABLE CALENDAR.CA_DELETION_HISTORY
ADD CONSTRAINT CA_DELHISTORY_PK PRIMARY KEY (
	DELHISTORY_UUID, ORG_ID
);
go

commit transaction;
begin transaction;

-- drop ORG_ID column default value
alter table CALENDAR.CA_MEMBERSHIP drop constraint membership_orgid_df;
go
alter table CALENDAR.CA_EVENT drop constraint event_orgid_df;
go
alter table CALENDAR.CA_EVENTINSTANCE drop constraint eventinstance_orgid_df;
go
alter table CALENDAR.CA_SUBSTITUTION drop constraint substitution_orgid_df;
go
alter table CALENDAR.CA_RECURRENCE drop constraint recurrence_orgid_df;
go
alter table CALENDAR.CA_EVENTINFO drop constraint eventinfo_orgid_df;
go
alter table CALENDAR.CA_EVENTTAG drop constraint eventtag_orgid_df;
go
alter table CALENDAR.CA_EVENTTAGAGG drop constraint eventtagagg_orgid_df;
go
alter table CALENDAR.CA_EVENTCOMMENT drop constraint eventcomment_orgid_df;
go
alter table CALENDAR.CA_EVENTFOLLOWING drop constraint eventfollowing_orgid_df;
go

-- update schema version

UPDATE CALENDAR.CA_SCHEMA SET DBSCHEMAVER = '25', RELEASEVER = '4.5.0.0.0' WHERE COMPKEY = 'CALENDAR';
go

commit transaction;