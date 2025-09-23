/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("dwa.data.NotesCalendarStore");
dojo.require("dwa.data._CalendarStoreBase");
dojo.require("dwa.date.calendar");
dojo.require("dwa.common.notesValue");



dojo.declare(
	"dwa.data.NotesCalendarStore",
	 dwa.data._CalendarStoreBase,
{
	//	summary:
	//		A data store for Notes Calendar
	//	description:
	//		A data store for Notes Calendar.

	sDefaultEntryType: 'Meeting',

	_typeMap: {
		'0': 'Appointment',
		'1': 'Anniversary',
		'2': 'Event',
		'3': 'Meeting',
		'4': 'Reminder',
		'To Do': 'Todo',
		'Unprocessed': 'Unprocessed',
		'Cancelled': 'Cancelled'
	},

	// override
	getFeatures: function(){
		return {
			'dojo.data.api.Read': true,
			'dojo.data.api.Write': true,
			'dojo.data.api.Notification': true
		};
	},

	_fetchItems: function(request){
		if(!request.query){ return null; }
		var url = this.url;
		if(url.indexOf("://") != -1){
			// collect data from 24 hours before to get entries that overlaps next day (SPR MMII7TL446)
			var oValueStart = new dwa.common.notesValue(this.oStartTime.adjustDays(0,0,-1).getDate(), dwa.date.zoneInfo.prototype.oUTC);
			var oValueEnd = new dwa.common.notesValue(this.oEndTime.getDate(), dwa.date.zoneInfo.prototype.oUTC);

			if(url.indexOf("/iNotes/Proxy/") == -1){
				url += "/iNotes/Proxy/";
			}
			url += '?OpenDocument&Form=s_ReadViewEntries_JSON&Count=-1&KeyType=time&TZType=UTC'
				+ '&StartKey=' + encodeURIComponent(oValueStart) + '&UntilKey=' + encodeURIComponent(oValueEnd) + '&PresetFields=' + encodeURIComponent('FolderName;($Calendar),hc;$151|$152|$153|$154|$160|$UserData');
		}
		var getArgs = {
			url: url,
			handleAs: "json",
			preventCache: false
		};
		var _this = this;
		dojo.xhrGet(getArgs).then(
			// callback
			function(data){
				_this.items = _this.format(data);
				_this.fetchHandler(_this.items, request, _this.items.length);
			},
			// errback
			function(error){
				_this.errorHandler(error, request);
			}
		);
	},

	oColumnMap: {
		'$152':      'vType',
		'$134':   'vCalDate',
		'$144': 'vStartDate',
		'$146':   'vEndDate',
		'$149':  'vIcon',
		'$160':    'vStatus',
		'$147':      'vDescription',
		'$151':  'vAltDescription',
		'$154':   'vPrivate',
		'$153':     'vChair',
		'$UserData':          'vUserData'
	},

	format: function(oResult){
		var items = [];
		var entries = [];

		// came from viewEntriesListener#onDatasetComplete
		var oEntries = (oResult.entries ? oResult.entries : oResult);
		this._numRows = oEntries["@toplevelentries"] - 0;
		var aoEntries = oEntries['viewentry'] instanceof Array ? oEntries['viewentry'] : oEntries['viewentry'] ? [oEntries['viewentry']] : [];
		for (var i = 0; i < aoEntries.length; i++) {
			var oItem = aoEntries[i];
			var asPos = oItem['@position'].split('.');
			var nPos = asPos[0] - 0;
			entries[nPos] = {oItem: oItem, aoValues: []};
		}

		// came from notesCalendarLoader#format
		for (var i = 0; i < entries.length; i++) {
			var oEntry = entries[i];
			if (!oEntry)
				continue;
	
			var aoEntryData = oEntry.oItem['entrydata'] instanceof Array ? oEntry.oItem['entrydata'] : [oEntry.oItem['entrydata']];
			var oData = {unid: oEntry.oItem['@unid']};

			for (var j = 0; j < aoEntryData.length; j++) {
				var sProp = this.oColumnMap[aoEntryData[j]['@name']];
				if (sProp)
					oData[sProp] = (new dwa.common.notesValue).setJsonNode(aoEntryData[j]).vValue;
			}
	
			// hide offline google entries (SPR SYPK7SQS55)
			if (typeof(oData.vUserData) == 'string' && oData.vUserData.length != 0)
				continue;
	
			oData.oCalDate   = oData.vCalDate   instanceof Array ? oData.vCalDate[0]   : oData.vCalDate;
			oData.oStartDate = oData.vStartDate instanceof Array ? oData.vStartDate[0] : oData.vStartDate;
			oData.oEndDate   = oData.vEndDate   instanceof Array ? oData.vEndDate[0]   : oData.vEndDate;
			
			try {
				// All day event's CalDate sometimes doesn't have time or timezone portions. (SPR GTON7QYFKM)
				if (oData.oCalDate instanceof dwa.date.calendar) {
					oData.oCalDate = oData.oCalDate.getDate();
				}

				// dummy entry for OOO sometimes doesn't have start/end date. (SPR YQWG7F49L7)
				if (!oData.oStartDate)
					oData.oStartDate = new Date(oData.oCalDate);
				if (!oData.oEndDate) {
					oData.oEndDate = new Date(oData.oStartDate);
					oData.oEndDate.setTime(oData.oEndDate.getTime() + 3600000);
				}

				var oEvent = this.createDummyEventSummary(oData);

				// dummy entry for OOO sometimes doesn't have appointment type. (SPR YQWG7F49L7)
				if (!oEvent.type) {
					oEvent.type = this.sDefaultEntryType;
				} else if (oEvent.type!="Appointment" && oEvent.type!="Anniversary" && oEvent.type!="Event" && oEvent.type!="Meeting" && oEvent.type!="Reminder") {
					oEvent.sType = "To Do"; // localization needs to be avoided
				}
				var nIcon = (oData.vIcon instanceof Array? oData.vIcon[0]: 0);
				if (nIcon == 187)
					oEvent.type = 'Unprocessed';	// unprocessed notice
				else if (nIcon == 200)
					oEvent.type = 'Cancelled';	// cancelled meeting
				oEvent.sPrivate = '' + (oData.vPrivate instanceof Array ? oData.vPrivate[0]: oData.vPrivate);
				var oStatusMap = {12: "Tentatively Accepted", 58: "Draft", 187: "Ghosts", 200: "Ghosts"};
				if (nIcon in oStatusMap) {
					oEvent.status = oStatusMap[nIcon];
				} else {
					var sStatus = oData.vStatus instanceof Array? oData.vStatus[0]: oData.vStatus;
					var oStatusMap = {"Accepted": "Accepted", "Tentatively Accepted": "Tentatively Accepted", "Draft": "Draft"};
					oEvent.status = sStatus in oStatusMap ? oStatusMap[sStatus] : sStatus;
				}

				if (!oEvent.bgColor1)
					oEvent.bgColor1 = this.oColorMap[oEvent.type + '-bg-dark'];
				if (!oEvent.bgColor2)
					oEvent.bgColor2 = this.oColorMap[oEvent.type + '-bg-light'];
				if (!oEvent.fontColor)
					oEvent.fontColor = this.oColorMap[oEvent.type + '-font'];
				if (!oEvent.borderColor)
					oEvent.borderColor = this.oColorMap[oEvent.type + '-border'];
				if (!oEvent.storeTitle)
					oEvent.storeTitle = this.storeTitle;

				if(oEvent.oStartTime){ oEvent.startDateTime = oEvent.oStartTime.getISO8601String(); }
				if(oEvent.oEndTime){ oEvent.endDateTime = oEvent.oEndTime.getISO8601String(); }
				oEvent.unid = oData.unid;
			} catch(e) {
				console.error("An error occurred reading a calendar document.");
			}

			oEvent[this._storeRef] = this;
			items.push(oEvent);
		}
		return items;
	},

	// came from eventSummary#createInstance
	createDummyEventSummary: function(oEntry){
		var oEvent = {};
		oEvent.type = this._typeMap[(oEntry.vType instanceof Array ? oEntry.vType[0]: oEntry.vType)];
		oEvent.subject  = (oEntry.vDescription instanceof Array ? oEntry.vDescription[0]: oEntry.vDescription);
		if (oEntry.vDescription instanceof Array && oEntry.vDescription.length > 1) {
			if (oEntry.vDescription.length >= 3) {
				var nDesc = oEntry.vDescription.length;
				oEvent.chair  = oEntry.vDescription[nDesc-1];
				oEvent.altChair  = oEntry.vAltDescription && oEntry.vAltDescription instanceof Array && oEntry.vAltDescription.length == nDesc ? oEntry.vAltDescription[nDesc-1]: '';
				oEvent.location  = oEntry.vDescription[1] + (nDesc == 4 ? '\r' + oEntry.vDescription[2]: '');
			} else {
				oEvent.chair = (oEntry.vChair instanceof Array ? oEntry.vChair[0]: oEntry.vChair);
				oEvent.altChair = oEntry.vDescription[1] == oEvent.chair ? oEntry.vAltDescription[1]: '';
				// Chair name is set to vDescription[1] when Location is empty
				oEvent.location = oEntry.vDescription[1] != oEvent.chair ? oEntry.vDescription[1] : '';
			}
		} else {
			oEvent.chair = (oEntry.vChair instanceof Array ? oEntry.vChair[0]: oEntry.vChair);
			oEvent.altChair = '';
			oEvent.location = '';
		}
		oEvent.oStartTime = (new dwa.date.calendar).setDate(oEntry.oCalDate ? oEntry.oCalDate :oEntry.oStartDate);
		oEvent.oEndTime  = (oEntry.oEndDate ? (new dwa.date.calendar).setDate(oEntry.oEndDate) : null);
		var nIcon = (oEntry.vIcon instanceof Array? oEntry.vIcon[0]: 0);
		oEvent.iconParam = 'colicon1.gif' + ' 13 11 ' + (((nIcon-1)%10)*13) + ' ' + (Math.floor((nIcon-1)/10)*11);
		
		if (!oEvent.oStartDate && oEvent.oStartTime) {
			oEvent.oStartDate = oEvent.oStartTime.clone();
			oEvent.oStartDate.fDateOnly = true;
		}
		
		if (!oEvent.oEndTime && oEvent.oStartTime)
			oEvent.oEndTime = (new dwa.date.calendar).setDate(new Date(oEvent.oStartTime.getDate() + 3600000));
		else
			oEvent.hasEndTime = (oEvent.type != "Reminder"); // reminder has no end time
		
		oEvent.oEndDate = (new dwa.date.calendar).setDate(oEntry.oEndDate? oEntry.oEndDate: oEvent.oEndTime);
		oEvent.oEndDate.fDateOnly = true;
		
		if (!oEvent.allday && oEvent.type) {
			oEvent.allday = (oEvent.type!="Appointment" && oEvent.type!="Meeting" && oEvent.type!="Reminder");
		}
		
		// Fixed probem that all day event can be rescheduled when drag and drop within the same day
		if (oEvent.allday)
			oEvent.oStartTime.fDateOnly = oEvent.oEndTime.fDateOnly = true;

		return oEvent;
	},

	equals: function(oDataLoader){
		return this.url == oDataLoader.url;
	}
});
