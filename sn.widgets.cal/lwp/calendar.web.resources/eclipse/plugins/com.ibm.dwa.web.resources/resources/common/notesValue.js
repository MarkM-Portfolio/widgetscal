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

dojo.provide("dwa.common.notesValue");
dojo.require("dwa.date.calendar");
dojo.require("dwa.common.getPayloadString");
dojo.require("dwa.common.notesJsonValue");
dojo.require("dwa.common.XPathUtil");



dojo.declare("dwa.common.notesValue", null, {
	constructor: function(vValue, oZoneInfo){
		this.vValue = vValue; this.oZoneInfo = oZoneInfo;
		this.toString = this.getString;
		this.D = dojo.mixin({
			snapshotItemText: function(node, i){
				return dwa.common.XPathUtil.nodeText(dwa.common.XPathUtil.snapshotItem(node, i));
			}
		}, dwa.common.XPathUtil);

	},
	DATA_TYPES: { number:1, text:1, datetime:1, datetimelist:1, numberlist:1, textlist:1 },
	FIRST_VALUE_NODE_EXP:	"./*[name()!=\'#text\']",
	VALID_TEXT_VALUES:	"./" + "/text()[.!=\'\n\']",

	// =====================================
	// Outputs:
	//   (routine) - The type of Notes value
	// =====================================
	getType: function(){
		if( this.sType ) return this.sType;

		switch (typeof(this.vValue)) {
		case 'object':
			if (this.vValue instanceof Array) {
				if (this.vValue.length == 2
				 && (this.vValue[0] instanceof Date || this.vValue[0] instanceof dwa.date.calendar)
				 && (this.vValue[1] instanceof Date || this.vValue[1] instanceof dwa.date.calendar))
					return 'datetimepair';
				else
					return (new notesValue(this.vValue[0])).getType().replace(/pair$/, '') + 'list';
			} else if (this.vValue instanceof Date || this.vValue instanceof dwa.date.calendar) {
				return 'datetime';
			}
	
			return 'text';
		case 'number':
		case 'boolean':
			return 'number';
		}
	
		return 'text';
	},
	valueOf: function(){
        return this.vValue;
    },
	getString: function(){
		return dwa.common.getPayloadString(this.vValue, {zoneInfo: this.oZoneInfo});
	},
	setJsonNode: function(oNode){
		if (!oNode) {
			this.vValue = void 0;
			return this;
		}
	
		var sName, oValue;
	
		//for (var s in oNode) {
//bug			if (s[0] == '@')
		//	if (s.charAt(0) == '@')
		//		continue;
		//	oValue = oNode[s];
		//	sName = s;
		//}
		var types = this.DATA_TYPES;
		for(var s in types){
			if(oNode[s]){
				sName = s;
				oValue = oNode[s];
				break;
			}
		}

		if( typeof(sName) == "undefined" ){
			this.sType = "text";
			this.vValue = "";
		}else{
			this.vValue = dwa.common.notesJsonValue(oNode);
			this.sType = sName;
		}

		return this;
	},

	setXmlNode: function(oNode, sExpression){
		var D = this.D;

		if (sExpression)
			oNode = D.selectSingleNode(oNode, sExpression);

		if (!oNode)
			return;

		if(sniff("ie")){
			var oFirstValueNode = oNode.firstChild;
		}else{ // I
			var oFirstValueNode = D.selectSingleNode(oNode, this.FIRST_VALUE_NODE_EXP);
		} // end - GS

		this.sType = oFirstValueNode ? oFirstValueNode.nodeName : 'text';

		switch ( this.sType ) {
		case 'datetimelist':
			var oResultPair = D.selectNodes(oFirstValueNode, './datetimepair');
			var oResultItem = D.selectNodes(oFirstValueNode, './datetime');
			var aoDateList = [];

			// range entries
			if (oResultPair) {
				for (var i = 0; i < D.snapshotLength(oResultPair); i++) {
					var aoDatePair = [];
					var oResultPairItem = D.selectNodes( D.snapshotItem(oResultPair, i) /*DOIDOI* oResultPair[i] */, './datetime');
					for (var j = 0; j < D.snapshotLength(oResultPairItem); j++) {
						var oCalendar = (new dwa.date.calendar).setISO8601String(D.snapshotItemText(oResultPairItem, j));
						aoDatePair[j] = !oCalendar.fDateOnly && !oCalendar.fTimeOnly ? oCalendar.getDate() : oCalendar;
					}
					aoDateList[aoDateList.length] = aoDatePair;
				}
			}

			// list entries
			if (oResultItem) {
				for (var i = 0; i < D.snapshotLength(oResultItem); i++) {
					var oCalendar = (new dwa.date.calendar).setISO8601String(D.snapshotItemText(oResultItem, i));
					aoDateList[aoDateList.length] = !oCalendar.fDateOnly && !oCalendar.fTimeOnly ? oCalendar.getDate() : oCalendar;
				}
			}

			this.vValue = aoDateList;
			return this;
		case 'datetime':
			var oCalendar = (new dwa.date.calendar).setISO8601String(D.nodeText(oFirstValueNode));
			this.vValue = !oCalendar.fDateOnly && !oCalendar.fTimeOnly ? oCalendar.getDate() : oCalendar;
			return this;
		case 'numberlist':
			var oResult = D.selectNodes(oFirstValueNode, this.VALID_TEXT_VALUES);
			var anValue = [];

			if (oResult) {
				for (var i = 0, n = 0; i <  D.snapshotLength(oResult); i++)
					anValue[n++] = D.snapshotItemText(oResult, i) - 0;
			}

			this.vValue = anValue;
			return this;
		case 'number':
			this.vValue = D.nodeText(oFirstValueNode) - 0;
			return this;
		case 'textlist':
			var oResult = D.selectNodes(oFirstValueNode, this.VALID_TEXT_VALUES);
			var asValue = [];

			if (oResult) {
				for (var i = 0, n = 0; i < D.snapshotLength(oResult); i++)
					asValue[n++] = D.snapshotItemText(oResult, i);
			}

			this.vValue = asValue;
			return this;
		}

		this.vValue = (oFirstValueNode ? D.nodeText(oFirstValueNode) : '');

		return this;
	},
	setNode: function(oNode, sExpression){
		if(!oNode)
			return null;
		if(oNode.nodeName)
			return this.setXmlNode(oNode, sExpression);
		else
			return this.setJsonNode(oNode, sExpression);
	}
});
