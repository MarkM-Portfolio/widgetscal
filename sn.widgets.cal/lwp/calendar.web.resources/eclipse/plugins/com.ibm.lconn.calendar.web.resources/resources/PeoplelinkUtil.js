/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.calendar.PeoplelinkUtil");

dojo.require('com.ibm.lconn.layout.people');

lconn.calendar.PeoplelinkUtil.formatPersonLink = function(person, returnHtmlMarkup, noLink) {
	var personVCard = document.createElement('span');
	dojo.addClass(personVCard, 'vcard');
	
	if(!noLink) {
		var lotusPersonLink = null;
		if(lconn.core.config.services.profiles || lconn.calendar.CalendarUtil.isSmartCloud()) {
			lotusPersonLink = com.ibm.lconn.layout.people.createLink(person);
			if(lotusPersonLink != null) {
				dojo.removeClass(lotusPersonLink, 'vcard');
				personVCard.appendChild(lotusPersonLink);
			}
		} 
		if(lotusPersonLink == null) {
			var lotusPersonLink = document.createElement('a');
			dojo.addClass(lotusPersonLink, 'lotusPerson');
			dojo.addClass(lotusPersonLink, 'fn');
			dojo.addClass(lotusPersonLink, 'person');
			if(person.state == 'inactive') {
				dojo.addClass(lotusPersonLink, 'lotusPersonInactive');
			}
			lotusPersonLink.href = lconn.core.url.getServiceUrl(lconn.core.config.services.communities).uri + '/service/html/allcommunities?userid=' + person.userid;
			lotusPersonLink.innerHTML = lconn.calendar.CalendarUtil.escapeForXSS(person.name);
			personVCard.appendChild(lotusPersonLink);
		}
	} else {
		var lotusPersonSpan = document.createElement('span');
		dojo.addClass(lotusPersonSpan, 'lotusPerson');
		dojo.addClass(lotusPersonSpan, 'fn');
		dojo.addClass(lotusPersonSpan, 'person');
		lotusPersonSpan.innerHTML = lconn.calendar.CalendarUtil.escapeForXSS(person.name);
		personVCard.appendChild(lotusPersonSpan);
	}
	
	var uid = document.createElement('span');
    dojo.addClass(uid, 'x-lconn-userid');
    uid.style.display = 'none';
    uid.innerHTML = person.userid;
    personVCard.appendChild(uid);
    
    if(!returnHtmlMarkup) {
    	return personVCard;
    } else {
    	var t = document.createElement('div');
    	t.appendChild(personVCard);
    	return t.innerHTML;
    }
};