/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.calendar.CalendarUtil");
dojo.provide("lconn.calendar.xml");
dojo.provide("lconn.calendar.topic");
dojo.provide("lconn.calendar.SessionStorage");
dojo.require("lconn.core.DialogUtil");
dojo.require("lconn.core.config.properties");
dojo.require('dojo.hash');

lconn.calendar.CalendarUtil.escapeForXSS = function(s) {
	if (!s) return "";
	return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
};

lconn.calendar.CalendarUtil.isSmartCloud = function() {
	return (!!lconn.core.config.properties.LotusLive && lconn.core.config.properties.LotusLive == "true");
};

lconn.calendar.CalendarUtil.trimToLength = function(s, length) {
	 if (!s) return "";
	 s = lconn.core.util.text.trimEnd(s);
	 var ellipsis = "...";
	 if (s.length > length)
		 s = lconn.core.util.text.trimEnd(s.substring(0, length-ellipsis.length)) + ellipsis;
	 return s; 
};

lconn.calendar.CalendarUtil.unescapeForXSS = function(s) {
	if (!s) return "";
	return s.replace(/&amp;/g,"&").replace(/&quot;/g,"\"").replace(/&lt;/g,"<").replace(/&gt;/g,">");
};

lconn.calendar.CalendarUtil.isUrl = function(url) {
	var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(url);
};

lconn.calendar.CalendarUtil.setHashParams = function(keys, values) {
	var t = dojo.hash();
	if(t.indexOf('fullpageWidgetId%3D') == 0) {
		t = 'fullpageWidgetId=' + t.substring('fullpageWidgetId%3D'.length);
	} 
	
	var obj = dojo.queryToObject(t);
	for (var i=0,l=keys.length; i<l; i++) {
		obj[keys[i]] = values[i];
	}
	dojo.hash(dojo.objectToQuery(obj));
};

lconn.calendar.CalendarUtil.setHashParam = function(key, value) {
	lconn.calendar.CalendarUtil.setHashParams([key], [value]);
};

lconn.calendar.CalendarUtil.removeHashParams = function(keys) {
	var t = dojo.hash();
	if(t.indexOf('fullpageWidgetId%3D') == 0) {
		t = 'fullpageWidgetId=' + t.substring('fullpageWidgetId%3D'.length);
	} 
	
	var obj = dojo.queryToObject(t);
	for (var i=0,l=keys.length; i<l; i++) {
		if (obj[keys[i]])	obj[keys[i]] = null;
	}
	dojo.hash(dojo.objectToQuery(obj));
};

lconn.calendar.CalendarUtil.removeHashParam = function(key) {
	lconn.calendar.CalendarUtil.removeHashParams([key]);
};

lconn.calendar.CalendarUtil.getHashParam = function(key) {
	var t = dojo.hash();
	if(t.indexOf('fullpageWidgetId%3D') == 0) {
		t = 'fullpageWidgetId=' + t.substring('fullpageWidgetId%3D'.length);
	} 
	
	var obj = dojo.queryToObject(t);
	return obj[key];
};

lconn.calendar.CalendarUtil.replaceHashParam = function(oldKey, newKey, newValue) {
	var t = dojo.hash();
	if(t.indexOf('fullpageWidgetId%3D') == 0) {
		t = 'fullpageWidgetId=' + t.substring('fullpageWidgetId%3D'.length);
	} 
	
	var obj = dojo.queryToObject(t);
	obj[oldKey] = null;
	obj[newKey] = newValue;
	dojo.hash(dojo.objectToQuery(obj));
};

lconn.calendar.topic = {
	notifySuccess: "/community/calendar/notify/success",
	notifyError: "/community/calendar/notify/error",
	showMessage: "/community/calendar/message/show",
	clearMessage: "/community/calendar/message/clear",
	peopleListLoaded: "/community/calendar/peopleList/loaded"
};

// 20111003T020000Z --> 2011-10-03T01:00:00Z
lconn.calendar.CalendarUtil.dwaDateStringToISODateString = function(dwaStr) {
	var y = dwaStr.substring(0,4);
	var M = dwaStr.substring(4,6);
	var d = dwaStr.substring(6,8);
	var h = dwaStr.substring(9,11);
	var m = dwaStr.substring(11,13);
	var s = dwaStr.substring(13,15);
	return y + "-" + M + "-" + d + "T" + h + ":" + m + ":" + s + "Z";
};

lconn.calendar.CalendarUtil.dwaDateStringToDate = function(dwaStr) {
	var isoString = this.dwaDateStringToISODateString(dwaStr);
	return dojo.date.stamp.fromISOString(isoString);
}

lconn.calendar.CalendarUtil.normalizeTagsAsString = function(tagsAsString) {
	tagsAsString = tagsAsString.replace(/,/g, ' ');
	tagsAsString = tagsAsString.replace(/\u3000/g,' ');
	tagsAsString = tagsAsString.replace(/\s+/g,' ');
	tagsAsString = dojo.trim(tagsAsString);
	return tagsAsString;
};

lconn.calendar.CalendarUtil.splitTags = function(tagsAsString) {
	var tags = [];
	tagsAsString = lconn.calendar.CalendarUtil.normalizeTagsAsString(tagsAsString);
	if(tagsAsString.length > 0) {
		var tagArray = tagsAsString.split(' ');
		for(var i = 0; i < tagArray.length; i++){
			var tag = tagArray[i];
			var found = false;
			for(var j = 0; j < tags.length; j++){
				if(tag == tags[j]){
					found = true;
					break;
				}
			}
			if(!found){
	  			if (tags != null && tags.length != 0){
	  				tags.push(tag);
	  			}else {
	  				tags = new Array(tag);
	  			}
			}
		}
	}
	return tags;
};

lconn.calendar.CalendarUtil.createTagFilterURL = function(baseUrl, tags) {
	var s = tags[0];
	for(var i = 1; i < tags.length; i++) {
		s = s + ' ';
		s = s + tags[i];
	}
	return baseUrl + '&tags=' + encodeURIComponent(s);
};

lconn.calendar.CalendarUtil.toggleSection = function (toggle, strCollapse, strExpand, strCollapseHint, strExpandHint) {
    var el = dojo.byId("section_"+toggle.id);
    if(typeof el == 'undefined' || el == null) {
    	var t = dojo.query('[name="section_' + toggle.id + '"]');
    	if(typeof t != 'undefined' && t.length && t.length > 0) {
    		el = t[0];
    	}
    }
    if (el.style.display != "none") {
    	el.style.display = 'none';
        toggle.className = "lotusSprite lotusArrow lotusTwistyClosed";
        if(strExpand) {
            toggle.title = strExpand;
            toggle.innerHTML = '<span class="lotusAltText">&#x25ba;</span>';
        }
        if(toggle.getAttribute('aria-pressed')) {
        	toggle.setAttribute('aria-pressed', 'false');
        }
    } else {
    	el.style.display = '';
        toggle.className = "lotusSprite lotusArrow lotusTwistyOpen";
        if(strCollapse) {
            toggle.title = strCollapse;
            toggle.innerHTML = '<span class="lotusAltText">&#x25bc;</span>';
        }
        if(toggle.getAttribute('aria-pressed')) {
        	toggle.setAttribute('aria-pressed', 'true');
        }
    }
    
    var region = dojo.byId(toggle.id + '_region');
    var hl = dojo.byId(toggle.id + "_hint");
    var s = hl.getAttribute('status');
    if(s == 'expanded') {
    	hl.setAttribute('status', 'collapsed');
    	hl.innerHTML = strCollapseHint;
    	region.setAttribute('aria-expanded', 'false');
    } else {
    	hl.setAttribute('status', 'expanded');
    	hl.innerHTML = strExpandHint;
    	region.setAttribute('aria-expanded', 'true');
    }
};


/**
 *  Type = 1 : Feed for events in one community;
 *  Type = 2 : Feed for user's attending and following events
 *  Type = 3 : Feed for usre's attending events only
 *  Type = 4 : Feed for usre's following events only
 */
lconn.calendar.CalendarUtil.popupICalSubscribeDialog = function(type, link, lang) {
	var _lang = lang;
	if(!_lang) {
		_lang = lconn.calendar.CalendarData.get()._lang;
	}
	var hintString;
	if(!lconn.calendar.CalendarUtil.isSmartCloud()) {
		switch(type) {
			case 1 :  hintString = _lang.ICAL_FEED_SUBSCRIBE_HINT; break;
			case 2 :  hintString = _lang.ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT; break;
			case 3 :  hintString = _lang.ICAL_FEED_ATTEND_SUBSCRIBE_HINT; break;
			case 4 :  hintString = _lang.ICAL_FEED_FOLLOW_SUBSCRIBE_HINT; 
		}
	} else {
		switch(type) {
			case 1 :  hintString = _lang.ICAL_FEED_SUBSCRIBE_HINT_OCS; break;
			case 2 :  hintString = _lang.ICAL_FEED_FOLLOW_ATTEND_SUBSCRIBE_HINT_OCS; break;
			case 3 :  hintString = _lang.ICAL_FEED_ATTEND_SUBSCRIBE_HINT_OCS; break;
			case 4 :  hintString = _lang.ICAL_FEED_FOLLOW_SUBSCRIBE_HINT_OCS; 
		}
	}
    var html = dojo.string.substitute(lconn.calendar.CalendarUtil.popupICalSubscribeDialog._template, 
	                    {
	                        hint: hintString, 
	                        feedLink: link.replace(/^http/,'webcal')
	                    });
	lconn.core.DialogUtil.alert(_lang.ICAL_FEED_DIALOG_TITLE, html);
};
lconn.calendar.CalendarUtil.popupICalSubscribeDialog._template = [
                                                                  '<div style="font-weight:bold;max-width:700px">${hint}</div>',
                                                                  '<div style="margin-top:5px;max-width:700px"><a target="_blank" href="${feedLink}">${feedLink}</a></div>'
                                                                                                    ].join('');
lconn.calendar.CalendarUtil.popupICalDialog = function(link,type) {
	
	lconn.calendar.CalendarUtil.popupICalSubscribeDialog(type,link,lconn.calendar.CalendarData.get()._lang);
};

lconn.calendar.SessionStorage = {
	isSupport: function() {
		return !!window.sessionStorage;
	},
	DECODE_TYPE: {
		DATE: "__Date__"
	},
	init: function(userId) {
		this.userId = userId;
	},
	_encode: function(v) {
		for (var f in v) {
			if (v[f] instanceof Date) {
		        v[f] = this.DECODE_TYPE.DATE + v[f].getTime();
			} else if (v[f] != null && v[f] instanceof Object) {
				this._encode(v[f]);
			}
		}
		return v;
	},
	_decode: function(v) {
		for (var f in v) {
			if (typeof v[f] == "string") {
				if (v[f].indexOf(this.DECODE_TYPE.DATE)==0) {
					var time = v[f].substring(this.DECODE_TYPE.DATE.length);
					var date = new Date();
					date.setTime(parseInt(time));
					v[f] = date;
				}
			} else if (v[f] != null && v[f] instanceof Object) {
				this._decode(v[f]);
			}
		}
		return v;
	},
	set: function(key, value) {
		var k = this.userId + ":" + key;
		var v = this._encode(value);
		window.sessionStorage.setItem(k, dojo.toJson(v));
	},
	get: function(key) {
		var value =  window.sessionStorage.getItem(this.userId + ":" + key);
		return this._decode(dojo.fromJson(value));
	}
};

/**
 * get the node for a tag in root supporting xml namespace
 * if argument 'all' is false, only the first matching node is returned
 * @argument string name of the tag to get node of
 * @argument root the root node to search in
 * @argument all set to true to return array of nodes
 */
lconn.calendar.xml.tagNode = function(tag, root, all) {
	var nodes = root.getElementsByTagName(tag);
	if(nodes.length == 0 && /^snx:/.test(tag)) {
		nodes = root.getElementsByTagName(tag.substring(4));
	}

	if (all) return nodes;
	if (nodes.length > 0) return nodes[0];
	else return undefined;
};

/**
* Get the value of of a tag living in a root node
* @argument tag string name of tag
*/
lconn.calendar.xml.tagValue = function(tag, root) { 
	var n = lconn.calendar.xml.tagNode(tag, root);
	if (n && n.firstChild) {
		var t = '';
		var c = n.firstChild;
		while(c) {
			t = t + c.nodeValue;
			c = c.nextSibling;
		}
		return t;
	} else return "";
};

lconn.calendar.CalendarUtil.createDialogOptions = function(options,optionName) {
	var optionsNode = dojo.create("ul" , {style:"list-style-type:none" });
	for(var optionItem in options) {

		var liNode = dojo.create("li",null,optionsNode);
		var inputNode = dojo.create("input",{type: "radio", id : options[optionItem].optionId, name : optionName },liNode);
		if(options[optionItem].checked) {
			dojo.attr(inputNode, "checked", "checked");
		}
		dojo.create("label",{"for": options[optionItem].optionId, innerHTML: options[optionItem].optionText},liNode);
		
	}

	return optionsNode;
};

lconn.calendar.CalendarUtil.ONE_DAY = 24 * 3600 * 1000;

lconn.calendar.CalendarUtil.daylightSavingStartEndPt = function () {
	if(typeof lconn.calendar.CalendarUtil.__daylightSavingStartEndPt != 'undefined') {
		return lconn.calendar.CalendarUtil.__daylightSavingStartEndPt;
	}
	
	var SOE = new Date();
	SOE.setMonth(0);
	SOE.setDate(1);
	SOE.setHours(10);
	
	var EOE = new Date();
	EOE.setMonth(11);
	EOE.setDate(31);
	EOE.setHours(10);
	
	var offset = SOE.getTimezoneOffset();
	var date1 = false, date2 = false, offset1 = false, offset2 = false;
	
	var d1 = new Date(), d2 = new Date(), d3 = new Date();
	
	var i = 1;
	for(; i < 12; i++) {
		d1.setTime(SOE.getTime() + (i * 31 * lconn.calendar.CalendarUtil.ONE_DAY));
		if(d1.getTime() > EOE.getTime()) {
			d1.setTime(EOE.getTime());
		}
		if(d1.getTimezoneOffset() == offset) {
			continue;
		}
		
		var c = 16;
		while(true) {
			d2 = new Date(d1.getTime() - (c * lconn.calendar.CalendarUtil.ONE_DAY));
			if(d2.getTimezoneOffset() == d1.getTimezoneOffset()) {
				d1 = d2;
			}
			if(c == 1) 
				break;
			c = c/2;
		}
		
		date1 = new Date(d1.getTime()), offset1 = d1.getTimezoneOffset();
		break;
	}
	
	if(!date1) {
		lconn.calendar.CalendarUtil.__daylightSavingStartEndPt = [];
		return [];
	}
	
	i++;
	for(; i < 12; i++) {
		d1.setTime(SOE.getTime() + (i * 31 * lconn.calendar.CalendarUtil.ONE_DAY));
		if(d1.getTime() > EOE.getTime()) {
			d1.setTime(EOE.getTime());
		}
		if(d1.getTimezoneOffset() != offset) {
			continue;
		}
		
		var c = 16;
		while(true) {
			d2 = new Date(d1.getTime() - (c * lconn.calendar.CalendarUtil.ONE_DAY));
			if(d2.getTimezoneOffset() == d1.getTimezoneOffset()) {
				d1 = d2;
			}
			if(c == 1) 
				break;
			c = c/2;
		}
		
		date2 = new Date(d1.getTime()), offset2 = d1.getTimezoneOffset();
		break;
	}
	
	if(!date2) {
		date2 = new Date(SOE.getTime()), offset2 = SOE.getTimezoneOffset();
	}
	
	var ret = false;
	if(offset1 > offset2) {
		ret = [date2, date1];
	} else {
		ret = [date1, date2];
	}
	lconn.calendar.CalendarUtil.__daylightSavingStartEndPt = ret;
	return ret;
};
