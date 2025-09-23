/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */


dojo.provide("lconn.calendar.CalendarStore");
dojo.provide('lconn.calendar.CalendarData');

dojo.require("dwa.data._CalendarStoreBase");
dojo.require("dwa.date.calendar");
dojo.require("dojo.date.stamp");
dojo.require("lconn.calendar.CalendarUtil");

window.CAL_SPLIT_DELIM = '||'; // delimter for special i18n entries, see nls

dojo.declare("lconn.calendar.CalendarStore", dwa.data._CalendarStoreBase, 
{
	/**
	 * pull out error information from error response
	 */
	_parseError: function(error, io) {
		var get = function(tag) {
			return dojo.string.trim(io.xhr.responseXML.
				getElementsByTagName(tag)[0].firstChild.nodeValue);
		}

		return {
			error: true,
			code: get('code'),
			message: get('message'),
			stacktrace: get('trace')
		};
	},


	/**
	 * Called when there is a request error, will call the appropriate error handler
	 */
	errorHandler: function() { },
	
	hue: 0,
	colorMap: {},
	_loadedEvents: {}, // dictionary of loaded events
	
	ONE_DAY: 24 * 3600 * 1000,
	
	/**
	 * fill the colors for an event object
	 * @argument item the event object
	 * @argument id the event id to use for color index
	 */
	_setColors: function(item, id) {
		if (!item.type) 
			item.type = "Meeting";

		var hue = this.colorMap[id];
		if (hue == undefined) {
			hue = this.colorMap[id] = this.hue;
			this.hue = (hue + 77) % 360;
		}

		item.fontColor = "#000000";
		item.borderColor = "#000000";
		
		item.bgColor1 = this.oColorMap[item.type + '-bg-dark'];
		item.bgColor2 = this.oColorMap[item.type + '-bg-light'];

		return item;
	},
	
	_setAllDay: function(item, id) {
	  var sDate = (new dwa.date.calendar).setISO8601String(item.startDateTime).getDate();
	  var eDate = (new dwa.date.calendar).setISO8601String(item.endDateTime).getDate();
	  item.allDay = this._isAllDayLocal(sDate, eDate, item.allDay);

	  if(item.allDay){
		 item.fontColor = '#000000';
         item.borderColor = '#E4842E';
         item.bgColor1 = '#F0FFD7';
      }
	  
	  return item;
	},
	
	_isAllDayLocal: function(s, e, allDay) {
		if(allDay != "1")
			return false;
		
		if(s.getUTCHours() >= 11 && s.getUTCHours() <= 12) {
			var duration = (e - s) / 1000;	// seconds
			var hour = s.getHours();
			var min = s.getMinutes();
			var sec = s.getSeconds();
			if (hour == 0 && min == 0 && sec == 0 && allDay == "1" && duration == 86400)
				return true;
			else 
				return false;
		} 
		
		return true;
	},
	
	_getAlldayStartEnd: function(eventTime) {
		var h = eventTime.getUTCHours();
		eventTime = new Date(eventTime.getUTCFullYear(), eventTime.getUTCMonth(), eventTime.getUTCDate(), 0, 0, 0, 0);
		if(h > 12){
			eventTime = dojo.date.add(eventTime, 'day', 1);
		}
		eventTime.setHours(0);
		return [eventTime, dojo.date.add(eventTime,'day', 1)];
	},

	/* build the get and edit and post functions here */

	// get detailed object for a specific event	
	// unid: id object of items, 
	// loaded: callback function 
	getItem: function(unid, loaded, props, onErr) {
		var _this = this;
		var url = this.url + "?eventInstUuid=" + (unid.match(/^.*:([^:]*)$/))[1];
		props = dojo.mixin({mode:''}, props);
		if(props.mode == 'full') {
			url = url + '&mode=full';
		}
		url = url + '&lang=' + dojoLocale.replace('-', '_');
		url = url + '&anonymous=true';
		dojo.xhrGet({
			handleAs: "xml",
			url: url,
			headers: {
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function(doc) {
				var evts = {};
				dojo.forEach(doc.getElementsByTagName('entry'), function(node) {
					var e = _this._docToEvent(node);
					evts[e.uuid] = e;
				});
				for(var i in evts) {
					var e = evts[i];
					if(e && e.parent) {
						e.series = evts[e.parent];
						loaded(e);
						return;
					}
				}
			}, 
			error: dojo.hitch(this, function() {
			    if(onErr) onErr();
				else
			       dojo.hitch(this, this.errorHandler);
			})
		});
	},
	
	getEventInstances: function(eventId, loaded) {
		var _this = this;
		var url = this.url + "?eventUuid=" + eventId;
		url = url + '&lang=' + dojoLocale.replace('-', '_');
		url = url + '&anonymous=true';
		dojo.xhrGet({
			handleAs: "xml",
			url: url,
			headers: {
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function(doc) {
				var events = [];
				var id = 0;
				dojo.forEach(doc.getElementsByTagName('entry'), function(node) {
					var e = _this._parseEntryNode(node);
					events.push(e);
				});
				loaded(events);
			},
			error: dojo.hitch(this, this.errorHandler)
		});
	},
	
	deleteItem: function(unid, single, loaded, onErr) {
		var _this = this;
		var meta = typeof unid == 'object' ? unid : this._loadedEvents[unid];
		var url = null;
		if(single) {
			url = this.url + "?eventInstUuid=" + meta.uuid;
		} else {
			url = this.url + "?eventUuid=" + meta.parent;
		}
		dojo.xhrDelete({
			url: url,
			handleAs: "xml",
			headers: {
				"Content-type": "application/atom+xml",
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function (res) { 
				if (loaded) loaded();
			},
			error: dojo.hitch(this, function() {
			    if(onErr) onErr(arguments[1].xhr.status);
				else
				    dojo.hitch(this, this.errorHandler);
			})
		});
	},


	/**
	 * Put a calendar event (to update)
	 * @argument item the item to put
	 * @argument single are we putting to the series or the instance
	 * @argument loaded function called when finished
	 */
	put: function(item, single, loaded, errorHandler) {
		var _this = this;
		
		var url = null, id = null;
		if(single) {
			url = this.url + "?eventInstUuid=" + item.uuid;
			id = "urn:lsid:ibm.com:calendar:event:" + item.uuid;
		} else {
			url = this.url + "?eventUuid=" + item.parent;
			id = "urn:lsid:ibm.com:calendar:event:" + item.parent;
		}
		
		dojo.xhrPut({
			url: url,
			handleAs: "xml",
			postData: this._eventToXml(item, id, single),
			headers: {
				"Content-type": "application/atom+xml",
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function(res) {
				if (loaded) loaded(false, res);
			},
			error: function(error, io) {
				if (errorHandler && !errorHandler(error, io)) 
					_this.errorHandler(error, io);
			}
		});
	},

	/**
	 * Post a calendar event (to create)
	 * @argument item the item to post
	 * @argument loaded function called when finished
	 */
	post: function(item, loaded, errorHandler) {
		var _this = this;
		var url = this.url + "?calendarUuid=" + this.uuid;
		
		dojo.xhrPost({
			url: url,
			handleAs: "xml",
			postData: this._eventToXml(item),
			headers: {
				"Content-type": "application/atom+xml",
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function(res) {
				if (loaded) loaded(false, res);
			}, 
			error: function(error, io) {
				if (errorHandler && !errorHandler(error, io)) 
					_this.errorHandler(error, io);
			}
		});
	},
	
	// 
	/**
	 * get the node for a tag in root supporting xml namespace
	 * if argument `all` is false, only the first matching node is returned
	 * @argument string name of the tag to get node of
	 * @argument root the root node to search in
	 * @argument all set to true to return array of nodes
	 */
	_tagNode: function(tag, root, all) {
		var nodes = root.getElementsByTagName(tag);
		if(nodes.length == 0 && /^snx:/.test(tag)) {
			nodes = root.getElementsByTagName(tag.substring(4));
		}

		if (all) return nodes;
		if (nodes.length > 0) return nodes[0];
		else return undefined;
	},

	/**
	* Get the value of of a tag living in a root node
	* @argument tag string name of tag
	*/
	_tagValue: function(tag, root) { 
		var n = this._tagNode(tag, root);
		if (n && n.firstChild) {
			var t = '';
			var c = n.firstChild;
			while(c) {
				t = t + c.nodeValue;
				c = c.nextSibling;
			}
			return t;
		} else return "";
	},

	
	
	/**
	 * Convert a dom node atom entry into an `event` object
	 * This is used when GETting a specificy entry
	 * @argument doc the document object 
	 */
	_docToEvent: function(doc, type) {
		var _this = this;
		var node = function(tag, root, all) { return _this._tagNode(tag, root || doc, all); };
		var value = function(tag, root) { return _this._tagValue(tag, root || doc); };

		function toDate(s) { return dojo.date.stamp.fromISOString(s); }
		
		var id = value('id');
		
		var e = {
			id: value('id'), // the atom id
			uuid: (id.match(/^.*:([^:]*)$/))[1], 
			subject: value('title'),
			description: value('content'),
			location: value('snx:location'),
			imageUrl: value('snx:imageUrl'),
			allDay: value('snx:allday'),
			createdBy: value('snx:userid', node('author')),
			authorName: value('name', node('author')),
			authorEmail: value('email', node('author')),
			authorStatus: value('snx:userState', node('author')),
			modifiedBy: value('snx:userid', node('contributor')),
			modifierName: value('name', node('contributor')),
			modifierEmail: value('name', node('contributor')),
			updated: toDate(value('updated')),
			published: toDate(value('published')),
			startDate: toDate(value('snx:startDate')),
			endDate:   toDate(value('snx:endDate'))
		};
		
		// ajust all day
		if (e.allDay=='1') {
			var ad = this._isAllDayLocal(e.startDate, e.endDate, e.allDay);
			e.allDay = (ad?'1':'0');
		}
		
		// adjust start/end date, based on all day attribute
		if(e.allDay == '1') {
			var t = this._getAlldayStartEnd(e.startDate);
			e.startDate = t[0];
			e.endDate = t[1];
		}
		
		// tags
		var tags = [];
		dojo.forEach(node('category', doc, true), function(p) {
			if(!p.getAttribute('scheme')) {
				tags.push(p.getAttribute('term'));
			}
		});
		e.tags = tags;
		
		// parent event
		var parentEvent = node('snx:parentEvent');
		if(parentEvent) {
			e.parent = value('snx:parentEvent');
		}

		// get the recurrence options
		var rec = node('snx:recurrence');
		var r = null;
		var custom = rec.getAttribute('custom') == "yes";
		
		if (!custom) {
			var until = value('snx:until', rec);

			r = {
				freq: rec.getAttribute('frequency'),
				interval: rec.getAttribute('interval'),
				until: until ? toDate(until) : null,
				weekstart: 'SU',

				allDay: value('snx:allday', rec),
				startDate: toDate(value('snx:startDate', rec)),
				endDate: toDate(value('snx:endDate', rec))
			};
			
			// ajust all day
			if (r.allDay=='1') {
				var ad = this._isAllDayLocal(r.startDate, r.endDate, r.allDay);
				r.allDay = (ad?'1':'0');
			}
			
			// adjust start/end date, based on all day attribute
			if(r.allDay == '1') {
				var t = this._getAlldayStartEnd(r.startDate);
				r.startDate = t[0];
				r.endDate = t[1];
				if(r.until) {
					r.until = this._getAlldayStartEnd(r.until)[0];
				}
			}
		
			// fill in unique settings
			switch(r.freq) {
			    case "daily": r.byday = value("snx:byDay", rec); break;
				case "weekly": r.byday = value("snx:byDay", rec); break;
				case "monthly": r.byday = value("snx:byDate", rec) ||  value("snx:byDayOfWeek", rec) ; break;
			}
			
			// adjust 'byday' parameter by current locale/timezone
			if(r.freq != "monthly"){
				if(r.byday && r.byday.length > 0 && r.allDay != '1') {
					var utcDay = r.startDate.getUTCDay();
					var locDay = r.startDate.getDay();
					
					// 'day-of-week' offset, local time compare with UTC time
					var t1 = locDay - utcDay;
					if(t1 == 6) t1 = -1;
					if(t1 == -6) t1 = 1;
					
					var day_of_week = ['SA', 'SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
					
					var t2 = r.byday;
					r.byday = '';
					
					var t3 = t2.split(',');
					for(var i = 0; i < t3.length; i++) {
						var t4 = t3[i];
						for(var j = 1; j < 8; j++) {
							if(t4 == day_of_week[j]) {
								r.byday = r.byday + day_of_week[j + t1];
								r.byday = r.byday + ',';
								break;
							}
						}
					}
					if(r.byday.length > 0) {
					    r.byday = r.byday.substring(0, r.byday.length - 1);
					}
				}
			}
		} else {
			// get all the custom dates
			var periods = [];
			dojo.forEach(node('snx:period', doc, true), function(p) {
				periods.push({
					startDate: toDate(value('snx:startDate', p)),
					endDate: toDate(value('snx:endDate', p))
				});
			});

			r = {
				freq: "custom",
				custom: periods
			};
		}
		e.recurrence = r;
		
		// get supplementary data 
		var meta = {
			uuid: e.uuid
		};
		if(e.parent) {
			meta.parent = e.parent;
		}
		dojo.forEach(doc.getElementsByTagName('link'), function(link) {
			if (link.getAttribute('rel') == 'edit')
				meta.link = link.getAttribute('href');
		});
		this._loadedEvents[e.id] = meta;
		
		return e;
	},

	/**
	 * Turn an event object into an atom feed
	 * @argument e the event object
	 */
	_eventToXml: function(e, id, isInst) {
		var xml = [];
		var n = 0;

		function htmlencode(s) {
			return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
		}

		function dstring(dd) {
			return dojo.date.stamp.toISOString(dd);
		}
		
		var _This = this;

		xml[n++] = '<?xml version="1.0" encoding="UTF-8"?>';
		xml[n++] = '<entry xmlns:snx="http://www.ibm.com/xmlns/prod/sn" xmlns:atom="http://www.w3.org/2005/Atom" xmlns="http://www.w3.org/2005/Atom">';

		// if we are editing
		if (id) xml[n++] = '<id>'+id+'</id>';
		
  		if (e.subject != undefined)
			xml[n++] = '<title type="text">'+htmlencode(e.subject)+'</title>';
  		
  		if (e.tags != undefined) {
  			for(var i = 0; i < e.tags.length; i++) {
  				xml[n++] = '<category term="' + htmlencode(e.tags[i]) + '"/>';
  			}
  		}

  		if (e.description != undefined)
			xml[n++] = '<content type="html">'+htmlencode(e.description)+'</content>';
  		
  		if (e.imageUrl != undefined)
  			xml[n++] = '<snx:imageUrl>'+htmlencode(e.imageUrl)+'</snx:imageUrl>';
  			
  		if (e.location != undefined)
			xml[n++] = '<snx:location>'+htmlencode(e.location)+'</snx:location>';

      if(e.allDay != undefined){
         if(e.allDay == true)
            xml[n++] = '<snx:allday>'+1+'</snx:allday>';
         else
            xml[n++] = '<snx:allday>'+0+'</snx:allday>';
      }
           
      if(!isInst)
    	  xml[n++] = '<category scheme="http://www.ibm.com/xmlns/prod/sn/type" term="event"></category>';
      else
    	  xml[n++] = '<category scheme="http://www.ibm.com/xmlns/prod/sn/type" term="event-instance"></category>';  

		if (e.recurrence) {
			// handle either single item or custom set
			if (e.recurrence.freq == 'custom') {
				xml[n++] = '<snx:recurrence custom="yes">';

				function snxCustom(start, end) {
					xml[n++] = '\t<snx:period>';
					xml[n++] = '\t\t<snx:startDate>'+dstring(start)+'</snx:startDate>';
					xml[n++] = '\t\t<snx:endDate>'+dstring(end)+'</snx:endDate>';
					xml[n++] = '\t</snx:period>';
				}

				if (e.recurrence.custom) {
					var cs = e.recurrence.custom;
					for (var i = 0; i < cs.length; i++) {
						snxCustom(cs[i].startDate, cs[i].endDate);
					}
				}
				
				// timezone daylight info
				var dlPts = lconn.calendar.CalendarUtil.daylightSavingStartEndPt();
				if(dlPts.length == 2) 
					xml[n++] = '\t<snx:daylight>'+dstring(dlPts[0])+'/'+dstring(dlPts[1])+'</snx:daylight>';

				xml[n++] = '</snx:recurrence>';
			} else {
				var r = e.recurrence;
				xml[n++] = '<snx:recurrence custom="no" frequency="'+r.freq+
					'" interval="'+r.interval+'">';
				xml[n++] = '\t<snx:until>'+(r.until ? dstring(r.until) : '')+'</snx:until>';

				if (r.byday){
					if(e.recurrence.freq == 'monthly') {
						if(r.byday.indexOf(",") == -1){
							xml[n++] = '\t<snx:byDate>'+r.byday+'</snx:byDate>';
						} else {
							xml[n++] = '\t<snx:byDayOfWeek>'+r.byday+'</snx:byDayOfWeek>';
						}
					} else {
						xml[n++] = '\t<snx:byDay>'+r.byday+'</snx:byDay>';
					}
				}

				if (e.startDate)
					xml[n++] = '\t<snx:startDate>'+dstring(e.startDate)+'</snx:startDate>';
						
				if (e.endDate)
					xml[n++] = '\t<snx:endDate>'+dstring(e.endDate)+'</snx:endDate>';
				
				// timezone daylight info
				var dlPts = lconn.calendar.CalendarUtil.daylightSavingStartEndPt();
				if(dlPts.length == 2) 
					xml[n++] = '\t<snx:daylight>'+dstring(dlPts[0])+'/'+dstring(dlPts[1])+'</snx:daylight>';

				xml[n++] = '</snx:recurrence>';
			}
		} else {
			// this is most likely a put
			// if there are dates, change them
			if (e.startDate) xml[n++] = 
				'<snx:startDate>'+dstring(e.startDate)+'</snx:startDate>';

			if (e.endDate) xml[n++] = 
				'<snx:endDate>'+dstring(e.endDate)+'</snx:endDate>';
		}

		xml[n++] = '</entry>'
		return xml.join("\n");
	},

	/**
	 * This is called by dwa.cv.CalendarView to get events in a range
	 */
	_fetchItems: function(request) {
		if (!request.query) return null;
		var _this = this;
		if(request.query.startDate && request.query.endDate)
		{
			this.rangedFetch(this.oStartTime.getDate(), this.oEndTime.getDate(), 
				function(events) {
					_this.fetchHandler(events, request, events.length);
				});
		}else
		{
			this.pagingQuery(this.oStartTime.getDate(), request.query.page, request.query.pageSize, request.query.sortKey, request.query.sortOrder, "false",
				function(events, nTotal) {
					_this.fetchHandler(events, request, nTotal);
				});
		}
	},

	/**
	 * This parses an <entry> tag from an event list into an event
	 * use after search results, or ranged fetch
	 * @argument entry the entry dom node
	 */
	_parseEntryNode: function(entry) {
		var _this = this;
		
		var node = function(tag, root, all) { return _this._tagNode(tag, root || entry, all); };
		var value = function(tag, node) { return _this._tagValue(tag, node || entry); };

		var authorNode = entry.getElementsByTagName('author')[0];

		var e = {
			unid: value('id'),
			chair: value('name', authorNode),
			authorId: value('snx:userid', authorNode),
			authorEmail: value('email', authorNode),
			authorName: value('name', authorNode),
			authorStatus: value('snx:userState', authorNode),
			location: value('snx:location'),
			imageUrl: value('snx:imageUrl'),
			allDay: value('snx:allday'),
			repeats: value('snx:repeats'),
			// dwa widget expects an odd date format, this is the simplest way 
			// to go from ISO8601 to it
			startDateTime: value('snx:startDate').replace(/:|-|\.\d{3}/g,""),
			endDateTime: value('snx:endDate').replace(/:|-|\.\d{3}/g,""),
			createdTime: value('published').replace(/:|-|\.\d{3}/g,""),
			updatedTime: value('updated').replace(/:|-|\.\d{3}/g,""),
			subject: value('title'),
			description: value('summary')
		};
		
		// tags
		var tags = [];
		dojo.forEach(node('category', entry, true), function(p) {
			if(!p.getAttribute('scheme')) {
				tags.push(p.getAttribute('term'));
			}
		});
		e.tags = tags;
		
		var parentEvent = node('snx:parentEvent');
		if(parentEvent) {
			e.parentUuid = value('snx:parentEvent');
		}

		// get supplementary data 
		var meta = {
			uuid: (e.unid.match(/^.*:([^:]*)$/))[1]
		};
		if(e.parentUuid) {
			meta.parent = e.parentUuid;
		}

		dojo.forEach(entry.getElementsByTagName('link'), function(link) {
			if (link.getAttribute('rel') == 'edit')
				meta.link = link.getAttribute('href');
		});
		
		this._loadedEvents[e.unid] = meta;
		
		// adjust start/end date, based on all day attribute
		if(e.allDay == '1') {
			var t = this._getAlldayStartEnd(lconn.calendar.CalendarUtil.dwaDateStringToDate(e.startDateTime));
			e.startDateTime = dojo.date.stamp.toISOString(t[0], {zulu:true}).replace(/:|-|\.\d{3}/g,"");
			e.endDateTime = dojo.date.stamp.toISOString(t[1], {zulu:true}).replace(/:|-|\.\d{3}/g,"");
		}
		
		return e;
	},

	/**
	* Fetch a range of events from service and trigger responseHandler
	* @argument viewStart date object of the starting time
	* @argument viewEnd date object of ending time
	*/
	rangedFetch: function(viewStart, viewEnd, responseHandler, _options) {
		var _this = this;

		function stamp(d) {
			return dojo.date.stamp.toISOString(d);
		}
		
		var originalViewStart = viewStart;
		var originalViewEnd = viewEnd;
		
		viewEnd = new Date(viewEnd.getTime() + 48 * 3600 * 1000);

		var viewStart = stamp(viewStart);
		var viewEnd = stamp(viewEnd);

		var url = this.url + '?calendarUuid='+this.uuid+
			'&startDate='+encodeURIComponent(viewStart)+'&endDate='+encodeURIComponent(viewEnd);
		if(this.tags) {
			url = url + "&tags=" + encodeURIComponent(this.tags);
		}
		url = url + '&lang=' + dojoLocale.replace('-', '_');
		url = url + '&anonymous=true';
		
		// init pager
		if(!_options)
			url = url + '&page=' + 1 + '&ps=' + 300; 
		else 
			url = url + '&page=' + _options.page + '&ps=' + 300; 
		
		var dlPts = lconn.calendar.CalendarUtil.daylightSavingStartEndPt();
		if(dlPts.length == 2) {
			var daylight = stamp(dlPts[0]) + '/' + stamp(dlPts[1]);
			url = url + '&daylight=' + encodeURIComponent(daylight);
		}

		dojo.xhrGet({
			handleAs: "xml",
			url: url,
			headers: {
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function(doc) {
				var events = [];
				
				// total results
				var totalResults = events.length;
				var tr = doc.getElementsByTagName("opensearch:totalResults");
				if(tr == null || tr.length == 0) {
					tr = doc.getElementsByTagNameNS("http://a9.com/-/spec/opensearch/1.1/", "totalResults");
				}
				if(tr != null && tr.length > 0) {
					if(dojo.isIE) {
						totalResults = tr[0].text;
					    if(!totalResults) {
					    	totalResults = tr[0].textContent;
					    }
					}
					else
						totalResults = tr[0].textContent;
				}
				
				// computing the needed paging requests
				if(!_options) {
					var totalPages = Math.ceil(totalResults / 300);
					if(totalPages > 1) {
						var responseHandlerOverride = {};
						responseHandlerOverride.execute = function() {
							this.count--;
							if(this.count == 0) {
								this.responseHandler(this.events);
							}
						};
						responseHandlerOverride.responseHandler = responseHandler;
						responseHandlerOverride.count = totalPages;
						responseHandlerOverride.events = [];
						responseHandler = responseHandlerOverride;
						
						for(var i = 2; i <= totalPages; i++) {
							_this.rangedFetch(originalViewStart, originalViewEnd, responseHandler, {page: i});
						}
					}
				}

				if(responseHandler.events) {
					events = responseHandler.events;
				}
				
				var id = 0;
				dojo.forEach(doc.getElementsByTagName('entry'), function(node) {
					var e = _this._parseEntryNode(node);

					// set the color based on the series id
					e = _this._setColors(e, _this._loadedEvents[e.unid].uuid);
					e = _this._setAllDay(e, _this._loadedEvents[e.unid].uuid);
					
					events.push(e);
				});

				if(responseHandler.execute) {
					responseHandler.execute(events);
				} else {
					responseHandler(events);
				}
			},
			error: dojo.hitch(this, this.errorHandler)
		});

	},

	/**
	* Paging query for upcoming/past events
	*/
	pagingQuery: function(queryDate, page, pageSize, sortKey, sortOrder,past, responseHandler) {
		var _this = this;

		function stamp(d) {
			return dojo.date.stamp.toISOString(d);
		}
		
		queryDate = new Date(queryDate.getTime() - queryDate.getTime() % 60000);
		var queryDate = stamp(queryDate);

		var url = this.url + '?calendarUuid='+this.uuid+
			'&startDate=' + encodeURIComponent(queryDate) + '&page=' + page + '&ps=' + pageSize ;
		if (past == "true") {
			url = this.url + '?calendarUuid='+this.uuid+
				'&endDate=' + encodeURIComponent(queryDate) + '&page=' + page + '&ps=' + pageSize ;
		}
		if(this.tags) {
			url = url + "&tags=" + encodeURIComponent(this.tags);
		}
		url = url + '&lang=' + dojoLocale.replace('-', '_');
		url = url + '&anonymous=true';
		
		var dlPts = lconn.calendar.CalendarUtil.daylightSavingStartEndPt();
		if(dlPts.length == 2) {
			var daylight = stamp(dlPts[0]) + '/' + stamp(dlPts[1]);
			url = url + '&daylight=' + encodeURIComponent(daylight);
		}
		
		dojo.xhrGet({
			handleAs: "xml",
			url: url,
			headers: {
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function(doc) {
				var events = [];
				var id = 0;
				dojo.forEach(doc.getElementsByTagName('entry'), function(node) {
					var e = _this._parseEntryNode(node);

					// set the color based on the series id
					e = _this._setColors(e, _this._loadedEvents[e.unid].uuid);
					e = _this._setAllDay(e, _this._loadedEvents[e.unid].uuid);
					
					events.push(e);
				});

				var totalResults = events.length;
				var tr = doc.getElementsByTagName("opensearch:totalResults");
				if(tr == null || tr.length == 0) {
					tr = doc.getElementsByTagNameNS("http://a9.com/-/spec/opensearch/1.1/", "totalResults");
				}
				if(tr != null && tr.length > 0)
				{
					if(dojo.isIE) {
						totalResults = tr[0].text;
					    if(!totalResults) {
					    	totalResults = tr[0].textContent;
					    }
					}
					else
						totalResults = tr[0].textContent;
				}
				responseHandler(events, totalResults);
			},
			error: dojo.hitch(this, this.errorHandler)
		});

	},
	
	////////////////////////////////////////////////////////////
	addComment: function(comment, callback) {
		var _this = this;
		var url = this.commentUrl + "?eventInstUuid=" + comment.eventInstUuid;
		
		dojo.xhrPost({
			url: url,
			handleAs: "xml",
			postData: _this._commentToXml(comment),
			headers: {
				"Content-type": "application/atom+xml",
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function(response) {
				if (callback) {
					var entry = _this._parseCommentNode(response);
					callback(entry);
				}
			}, 
			error: dojo.hitch(this, this.errorHandler)
		});
	},
	
	removeComment: function(commentUuid, callback) {
		var _this = this;
		var url = this.commentUrl + "?commentUuid=" + commentUuid;
		
		dojo.xhrDelete({
			url: url,
			handleAs: "xml",
			headers: {
				"Content-type": "application/atom+xml",
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function(response) {
				if (callback)
					callback(response);
			}, 
			error: dojo.hitch(this, this.errorHandler)
		});
	},
	
	getComments: function(eventInstUuid, callback, page, ps) {
		var _this = this;
		if (page == undefined)	page = 1;
		if (ps == undefined)	ps = 10;
		var url = this.commentUrl + "?eventInstUuid=" + eventInstUuid + "&page=" + page + "&ps=" + ps + "&contentFormat=html";
		url = url + '&lang=' + dojoLocale.replace('-', '_');
		
		dojo.xhrGet({
			url: url,
			handleAs: "xml",
			headers: {
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function(doc) {
				var comments = [];
				var total = 0;
				
				dojo.forEach(doc.getElementsByTagName('entry'), function(node) {
					var comment = _this._parseCommentNode(node);
					comments.push(comment);
				});
				
				var tr = doc.getElementsByTagName("opensearch:totalResults");
				if (tr == null || tr.length == 0) 
					tr = doc.getElementsByTagName("totalResults");
					
				if(tr != null && tr.length > 0) {
					if(dojo.isIE) {
						total = tr[0].text;
					    if(!total) {
					    	total = tr[0].textContent;
					    }
					}
					else
						total = tr[0].textContent;
				}
				
				callback(comments, total);
			},
			error: dojo.hitch(this, this.errorHandler)
		});
	},
	
	_parseCommentNode: function(entry) {
		var _this = this;
		var value = function(tag, node) { return _this._tagValue(tag, node || entry); };
		function toDate(s) { return dojo.date.stamp.fromISOString(s); }
		
		var authorNode = entry.getElementsByTagName('author')[0];
		var sourceNode = entry.getElementsByTagName('Source')[0];
		
		var comment = {
			commentUuid: value('id'),
			title: value('title'),
			authorUuid: value('snx:userid', authorNode),
			authorEmail: value('email', authorNode),
			authorName: value('name', authorNode),
			authorStatus: value('snx:userState', authorNode),
			content: value('content'),
			eventInstUuid: value('id', sourceNode),
			eventName: value('title', sourceNode),
			createOn: toDate(value('published'))
		};
		
		if(comment.commentUuid) {
			comment.commentUuid = (comment.commentUuid.match(/^.*:([^:]*)$/))[1];
		}
		
		return comment;
	},
	
	_commentToXml: function(comment) {
		function htmlencode(s) {
			return s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
		}
		
		var xml = [];
		var n = 0;
		xml[n++] = '<?xml version="1.0" encoding="UTF-8"?>';
		xml[n++] = '<entry xmlns:snx="http://www.ibm.com/xmlns/prod/sn" xmlns:atom="http://www.w3.org/2005/Atom" xmlns="http://www.w3.org/2005/Atom">';
		xml[n++] = '\t<category scheme="http://www.ibm.com/xmlns/prod/sn/type" term="comment"></category>';
		xml[n++] = '\t<content type="text">' + htmlencode(comment.content) + '</content>';
		xml[n++] = '</entry>';
		return xml.join("\n");
	},

	getAttendees: function(eventUuid, instUuid, callback, page, ps) {
		var _this = this;
		if (page == undefined)	page = 1;
		if (ps == undefined)	ps = 10;
		var url = this.attendeeUrl + "?eventInstUuid="+ instUuid + "&page=" + page + "&ps=" + ps +"&type=attend";
		url = url + '&lang=' + dojoLocale.replace('-', '_');
		url = url + '&anonymous=true';
		
		dojo.xhrGet({
			url: url,
			handleAs: "xml",
			headers: {
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function(doc) {
				var attendees = [];
				var total = 0;
				
				dojo.forEach(doc.getElementsByTagName('entry'), function(node) {
					var attendee = _this._parseAttendeeNode(node);
					attendees.push(attendee);
				});
				
				var tr = doc.getElementsByTagName("opensearch:totalResults");
				if (tr == null || tr.length == 0) 
					tr = doc.getElementsByTagName("totalResults");
					
				if(tr != null && tr.length > 0) {
					if(dojo.isIE) {
						total = tr[0].text;
					    if(!total) {
					    	total = tr[0].textContent;
					    }
					}
					else
						total = tr[0].textContent;
				}
				
				callback(attendees, total);
			},
			error: dojo.hitch(this, this.errorHandler)
		});
	},
	
	_parseAttendeeNode: function(entry) {
		var _this = this;
		var value = function(tag, node) { return _this._tagValue(tag, node || entry); };
		function toDate(s) { return dojo.date.stamp.fromISOString(s); }
		
		var authorNode = entry.getElementsByTagName('author')[0];
		var sourceNode = entry.getElementsByTagName('Source')[0];
		
		var attendee = {
			attendeeUuid: value('id'),
			title: value('title'),
			authorUuid: value('snx:userid', authorNode),
			authorEmail: value('email', authorNode),
			authorName: value('name', authorNode),
			userState: value('snx:userState'),
			role:value('snx:role'),
			content: value('content'),
			eventUuid: value('id', sourceNode),
			eventName: value('title', sourceNode),
			createOn: toDate(value('published'))
		};
		
		if(attendee.attendeeUuid) {
			attendee.attendeeUuid = (attendee.attendeeUuid.match(/^.*:([^:]*)$/))[1];
		}
		
		return attendee;
	},

	getFollowedInstances: function(endAfter, type, callback, page, ps) {
		function stamp(d) {
			return dojo.date.stamp.toISOString(d);
		}
		
		endAfter = new Date(endAfter.getTime() - endAfter.getTime() % 60000);
		var endAfter = stamp(endAfter);

		var _this = this;
		if (page == undefined)	page = 1;
		if (ps == undefined)	ps = 10;
		var url = this.followUrl+'?startDate=' + encodeURIComponent(endAfter) +   "&page=" + page + "&ps=" + ps +"&type="+type;
		url = url + '&lang=' + dojoLocale.replace('-', '_');
		url = url + '&anonymous=true';
		
		var dlPts = lconn.calendar.CalendarUtil.daylightSavingStartEndPt();
		if(dlPts.length == 2) {
			var daylight = stamp(dlPts[0]) + '/' + stamp(dlPts[1]);
			url = url + '&daylight=' + encodeURIComponent(daylight);
		}
		
		dojo.xhrGet({
			url: url,
			handleAs: "xml",
			headers: {
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function(doc) {
				var instances = [];
				var total = 0;
				
				dojo.forEach(doc.getElementsByTagName('entry'), function(node) {
					var instance = _this._parseInstanceNode(node);
					instances.push(instance);
				});
				
				var tr = doc.getElementsByTagName("opensearch:totalResults");
				if (tr == null || tr.length == 0) 
					tr = doc.getElementsByTagName("totalResults");
					
				if(tr != null && tr.length > 0) {
					if(dojo.isIE) {
						total = tr[0].text;
					    if(!total) {
					    	total = tr[0].textContent;
					    }
					}
					else
						total = tr[0].textContent;
				}
				
				callback(instances, total);
			},
			error: dojo.hitch(this, this.errorHandler)
		});
	},
	
	_parseInstanceNode: function(entry) {
		var _this = this;
		var value = function(tag, node) { return _this._tagValue(tag, node || entry); };
		function toDate(s) { return dojo.date.stamp.fromISOString(s); }
		
		var authorNode = entry.getElementsByTagName('author')[0];
		var sourceNode = entry.getElementsByTagName('Source')[0];
		var linkNode = entry.getElementsByTagName('link')[1];
		var instance = {
			instanceUuid: value('id'),
			title: value('title'),
			authorUuid: value('snx:userid', authorNode),
			authorEmail: value('email', authorNode),
			authorName: value('name', authorNode),
			eventUuid: value('id', sourceNode),
			eventName: value('title', sourceNode),
			url: "",
			location: value('snx:location'),
			allDay: value('snx:allday'),
			startDateTime: value('snx:startDate').replace(/:|-|\.\d{3}/g,""),
			endDateTime: value('snx:endDate').replace(/:|-|\.\d{3}/g,""),
			createdTime: value('published').replace(/:|-|\.\d{3}/g,""),
			updatedTime: value('updated').replace(/:|-|\.\d{3}/g,""),
			description: value('summary'),
			createOn: toDate(value('published'))
		};
		
		dojo.forEach(entry.getElementsByTagName('link'), function(link) {
			if (link.getAttribute('rel') == 'alternate')
				instance.url = link.getAttribute('href');
		});	

		if(instance.instanceUuid) {
			instance.instanceUuid = (instance.instanceUuid.match(/^.*:([^:]*)$/))[1];
		}
		
		// ajust all day
		if (instance.allDay=='1') {
			var ad = this._isAllDayLocal(toDate(value('snx:startDate')), toDate(value('snx:endDate')), instance.allDay);
			instance.allDay = (ad?'1':'0');
		}
		
		// adjust start/end date, based on all day attribute
		if(instance.allDay == '1') {
			var t = this._getAlldayStartEnd(lconn.calendar.CalendarUtil.dwaDateStringToDate(instance.startDateTime));
			instance.startDateTime = dojo.date.stamp.toISOString(t[0], {zulu:true}).replace(/:|-|\.\d{3}/g,"");
			instance.endDateTime = dojo.date.stamp.toISOString(t[1], {zulu:true}).replace(/:|-|\.\d{3}/g,"");
		}
		
		return instance;
	},
	
	// follow
	followItem: function(unid, single, loaded, onErr) {
		var _this = this;
		var meta = typeof unid == 'object' ? unid : this._loadedEvents[unid];
		var url = null;
		if(single) {
			url = this.followUrl + "?eventInstUuid=" + meta.uuid + "&type=follow";
		} else {
			url = this.followUrl + "?eventUuid=" + meta.parent + "&type=follow";
		}
		dojo.xhrPost({
			url: url,
			handleAs: "xml",
			headers: {
				"Content-type": "application/atom+xml",
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function (res) { 
				if (loaded) loaded();
			},
			error: dojo.hitch(this, function() {
			    if(onErr) onErr(arguments[1].xhr.status);
				else
				    dojo.hitch(this, this.errorHandler);
			})
		});
	},
	
	unfollowItem: function(unid, loaded, onErr) {
		var _this = this;
		var meta = typeof unid == 'object' ? unid : this._loadedEvents[unid];
		var url = this.followUrl + "?eventInstUuid=" + meta.uuid + "&type=follow";
		dojo.xhrDelete({
			url: url,
			handleAs: "xml",
			headers: {
				"Content-type": "application/atom+xml",
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function (res) { 
				if (loaded) loaded();
			},
			error: dojo.hitch(this, function() {
			    if(onErr) onErr(arguments[1].xhr.status);
				else
				    dojo.hitch(this, this.errorHandler);
			})
		});
	},
	// rsvp
	rsvpItem: function(unid, single, loaded, onErr) {
		var _this = this;
		var meta = typeof unid == 'object' ? unid : this._loadedEvents[unid];
		var url = null;
		if(single) {
			url = this.followUrl + "?eventInstUuid=" + meta.uuid+"&type=attend";
		} else {
			url = this.followUrl + "?eventUuid=" + meta.parent+"&type=attend";
		}
		dojo.xhrPost({
			url: url,
			handleAs: "xml",
			headers: {
				"Content-type": "application/atom+xml",
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function (res) { 
				if (loaded) loaded();
			},
			error: dojo.hitch(this, function() {
			    if(onErr) onErr(arguments[1].xhr.status);
				else
				    dojo.hitch(this, this.errorHandler);
			})
		});
	},
	
	unrsvpItem: function(unid, loaded, onErr) {
		var _this = this;
		var meta = typeof unid == 'object' ? unid : this._loadedEvents[unid];
		var url = this.followUrl + "?eventInstUuid=" + meta.uuid +"&type=attend";
		dojo.xhrDelete({
			url: url,
			handleAs: "xml",
			headers: {
				"Content-type": "application/atom+xml",
				"X-CALENDAR-MEMBERSHIP": (_this._calendar.isOwner ? "OWNER" : (_this._calendar.isMember ? "MEMBER" : "NONE"))
			},
			load: function (res) { 
				if (loaded) loaded();
			},
			error: dojo.hitch(this, function() {
			    if(onErr) onErr(arguments[1].xhr.status);
				else
				    dojo.hitch(this, this.errorHandler);
			})
		});
	}
	
});


/**
 * this loads localization and holds other static data needed by widgets
 */
dojo.declare('lconn.calendar.CalendarData', null, 
{
	// these are used as keys, don't localize
	weekdays: [ 'SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA' ],

	// these properties are mixed in when resource bundle is loaded
	weekstart: null,
	_lang: null,

	/**
	 * Loads all shared calendar data and configuration options
	 * Although there is no global configuration now, this is where it would go
	 */
	constructor: function() {
		dojo.mixin(this, {
			create_time: new Date(),
			weekstart: 0,
			_lang: dojo.i18n.getLocalization('lconn.calendar.CalendarData', 'templateStrings')
		});
	},

	/**
	 * Mixes in localization and a reference to this object
	 * @argument other the object to mix into
	 */
	mixin: function(other) {
		other.data = this;
		other._lang = this._lang;
	}
});

/**
 * CalendarData is treated as a singleton with the instance stored 
 * statically in CalendarData.data
 *
 * Call CalendarData.get() to get the global instance
 */
lconn.calendar.CalendarData.data = null;
lconn.calendar.CalendarData.get = function() {
	if (lconn.calendar.CalendarData.data == null) {
		lconn.calendar.CalendarData.data = new lconn.calendar.CalendarData();
	}
	return lconn.calendar.CalendarData.data;
}




