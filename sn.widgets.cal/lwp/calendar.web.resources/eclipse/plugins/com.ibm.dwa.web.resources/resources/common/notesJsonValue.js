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

dojo.provide("dwa.common.notesJsonValue");
dojo.require("dwa.date.calendar");


	var notesJsonValue = /*===== dwa.common.notesJsonValue = =====*/ function(/*Object*/ node){

	var DATA_TYPES = {
		number: 1,
		text: 1,
		datetime: 1,
		datetimelist: 1,
		numberlist: 1,
		textlist: 1
	};

		// summary:
		//		Convert JSON version of DXL to a primitive value.
		// description:
		//		The conversion happens in the following rules:
		//
		//			* TYPE_TEXT: Returns text.
		//			* TYPE_TEXT_LIST: Returns array of text.
		//			* TYPE_NUMBER: Returns number.
		//			* TYPE_NUMBER_RANGE: Returns array of number.
		//			* TYPE_TIME: Returns JavaScript Date object (for non-wildcarded date), or dwa.date.calendar (for wildcarded date).
		//			* TYPE_TIME_RANGE: Returns array of object. The elements may contain arrays (for range entries (pair of date)), and objects seen in TIPE_TIME.
		//
		// node: Object
		//		The JSON version of DXL.
		// returns:
		//		The converted primitive value.

		if(!node){ return void 0; }

		var type, valueNode;

		for(var s in DATA_TYPES){
			if(node[s]){
				type = s;
				valueNode = node[s];
				break;
			}
		}

		if(typeof(type) == "undefined"){ return void 0; }

		switch (type) {
		case "datetimelist":
			var pairNodes = valueNode.datetimepair;
			var itemNodes = valueNode.datetime;
			var dateList = [];

			// Range entries
			if(pairNodes){
				for(var i = 0; i < pairNodes.length; i++){
					var datePair = [];
					var pairItemNode = pairNodes[i].datetime;
					for(var j = 0; j < pairItemNode.length; j++){
						var calendar = (new dwa.date.calendar).setISO8601String(pairItemNode[j][0]);
						datePair[j] = !calendar.fDateOnly && !calendar.fTimeOnly ? calendar.getDate() : calendar;
					}
					dateList.push(datePair);
				}
			}

			// List entries
			if(itemNodes){
				for(var i = 0; i < itemNodes.length; i++){
					var calendar = (new dwa.date.calendar).setISO8601String(itemNodes[i][0]);
					dateList.push(!calendar.fDateOnly && !calendar.fTimeOnly ? calendar.getDate() : calendar);
				}
			}

			return dateList;
		case "datetime":
			var calendar = (new dwa.date.calendar).setISO8601String(valueNode[0]);
			return !calendar.fDateOnly && !calendar.fTimeOnly ? calendar.getDate() : calendar;
		case "numberlist":
			var itemNodes = valueNode.number;
			var numberList = [];

			if(itemNodes){
				for(var i = 0; i < itemNodes.length; i++){
					numberList[i] = itemNodes[i][0] - 0;
				}
			}

			return numberList;
		case "number":
			return valueNode[0] - 0;
		case "textlist":
			var itemNodes = valueNode.text;
			var textList = [];

			if(itemNodes){
				for(var i = 0; i < itemNodes.length; i++){
					textList[i] = itemNodes[i][0];
				}
			}

			return textList;
		}

		return valueNode[0];
	};

	dojo.setObject("dwa.common.notesJsonValue", notesJsonValue);
