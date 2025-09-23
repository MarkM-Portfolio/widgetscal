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

dojo.provide("dwa.common.getPayloadString");
dojo.require("dwa.date.calendar");


/*=====
	dwa.common.getPayloadString.options = {
		// summary:
		//		Option list for dwa.common.getPayloadString().

		// isoEmitsep: Boolean
		//		true if we want to emit date/time separators to generate ISO8601 string.
		isoEmitsep: false,

		// isoNoemitms: Boolean
		//		true if we don't want to emit milliseconds to generate ISO8601 string.
		isoNoemitms: false,

		// zoneInfo: dwa.date.zoneInfo
		//		Depreciated, for compatibility with dwa.common.notesValue. The time zone for use.
		//		TODO: Remove this in future.
		zoneInfo: null
	};
=====*/

	var getPayloadString = /*===== dwa.common.getPayloadString = =====*/ function(/*Anything*/ value, /*dwa.common.getPayloadString.options?*/ options){
		// summary:
		//		Generate the string from primitive value to send data to server, in a format server expects.
		// value: Anything
		//		The primitive value.
		// options: dwa.common.getPayloadString.options?
		//		The formatting options.

		options = options || {};

		switch(typeof value){
		case "object":
			if(dojo.isArray(value)){
				var list = [];

				for(var i = 0; i < value.length; i++){
					if(dojo.isArray(value[i]) && value[i].length == 2
					 && (value[i][0] instanceof Date || value[i][0] instanceof dwa.date.calendar)
					 && (value[i][1] instanceof Date || value[i][1] instanceof dwa.date.calendar)){
						var pair = [];

						for (var j = 0; j < value[i].length; j++){
							pair[j] = getPayloadString(value[i][j], options);
						}

						list[i] = pair.join("/");
					} else {
						list[i] = getPayloadString(value[i], options);
					}
				}

				return list.join(";");
			}else if (value instanceof Date){
				return (new dwa.date.calendar).setDate(value, options.zoneInfo || dwa.date.zoneInfo.prototype.oUTC).getISO8601String(options.isoEmitsep, options.isoNoemitms);
			}else if (value instanceof dwa.date.calendar){
				return value.getISO8601String(options.isoEmitsep, options.isoNoemitms);
			}

			return "" + value;
		case "boolean":
			return "" + (value - 0);
		case "undefined":
			return "";
		}

		return "" + value; // String
	};

	dojo.setObject("dwa.common.getPayloadString", getPayloadString);
