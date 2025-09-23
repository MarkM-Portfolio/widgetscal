<#-- ***************************************************************** --> 
<#--                                                                   -->
<#-- IBM Confidential                                 				   -->
<#--                                                                   -->
<#-- OCO Source Materials                                              -->                                                          
<#--                                                                   -->
<#-- Copyright IBM Corp. 2011                                          -->
<#--                                                                   -->
<#-- The source code for this program is not published or otherwise    -->
<#-- divested of its trade secrets, irrespective of what has been      -->
<#-- deposited with the U.S. Copyright Office.                         -->                             
<#--                                                                   -->
<#-- ***************************************************************** -->
<#compress>
<#include "*/resources/commonHeader.ftl"/>
<#assign subject=u.resource("email.events.notifyEvent.subject","${notify.sender}","${event.name}")/>
</#compress>
<#t>
<#t>
<@s.document subject>
  <#lt><@s.header>${u.resource("email.events.notifyEvent.header", "${notify.sender}", s.linkify("${event.name}","${event.url}"))}</@s.header>
  <#lt><@s.summary>${body}</@s.summary>
  <#lt><@s.actions [u.entry(u.resource("email.events.notifyEvent.action.OpenThisEvent"), "${event.url}"), 
					u.entry(u.resource("email.events.notifyEvent.action.OpenThisCalendar"), "${calendar.url}")] />
  <#lt><@s.metadata [u.entry(u.resource("email.events.notifyEvent.meta.time"), "${event.time}"), 
					 u.entry(u.resource("email.events.notifyEvent.meta.location"), "${event.location}"), 
					 u.entry(u.resource("email.events.notifyEvent.meta.description"), "${event.description}")] />
  <#lt><@s.footer s.sentFromFooter("${community.url}")/>
</@s.document>


