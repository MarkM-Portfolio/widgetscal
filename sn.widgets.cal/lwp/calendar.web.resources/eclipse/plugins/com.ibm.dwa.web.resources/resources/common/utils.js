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

dojo.provide("dwa.common.utils");


dojo.getObject("common.utils", true, dwa);

dwa.common.utils.formatMessage = function(sFormat){
	var avArgs = arguments;
	return sFormat.replace(/%([1-9][0-9]*)/g, function(s0, s1){ return ((s1 - 0) > avArgs.length ? s0 : avArgs[s1 - 0]); });
};

dwa.common.utils.sign = function(n){
	return n != 0 ? (n / Math.abs(n)) : n;
};

dwa.common.utils.floorAbs = function(n){
	var i = dwa.common.utils.sign(n);
	var nAbs = Math.abs(n);
	return i * Math.floor(nAbs);
};

dwa.common.utils.compare = function(vElem1, vElem2){
	return vElem1 && typeof(vElem1.equals) == 'function' ? vElem1.equals(vElem2) : (vElem1 == vElem2);
};

dwa.common.utils.difference = function(vElem1, vElem2){
	return vElem1 - vElem2;
};

dwa.common.utils.indexOf = function(avArray, vSearch, fnCompare){
	fnCompare = fnCompare ? fnCompare : dwa.common.utils.compare;

	for (var i = 0; i < avArray.length; i++) {
		if (fnCompare(avArray[i], vSearch))
			return i;
	}

	return -1;
};

dwa.common.utils.elSetInnerText = function(oElem, sText){
	while (oElem.firstChild)
		oElem.removeChild(oElem.firstChild);

	if(dojo.isIE){
		oElem.appendChild(oElem.document.createTextNode(sText));
	}else{
		oElem.appendChild(oElem.ownerDocument.createTextNode(sText));
	}
};

dwa.common.utils.pos = function(x, y){
	this.x = x;
	this.y = y;
};

dwa.common.utils.getRangeAt = function(oDocument, nIndex){
	if(dojo.isIE){
		var oSelection = dojo.doc.selection;
		var oCollection;
		try {
			oCollection = oSelection.TextRange ? [oSelection.TextRange] :
			 oSelection.type == 'Control' ? [oSelection.createRange()] : oSelection.createRangeCollection();
		} catch (e) {
			oCollection = [];
		}
		return oCollection[nIndex];
	}else{
		var oSelection = oDocument.defaultView.getSelection();
		return oSelection.rangeCount > nIndex ? oSelection.getRangeAt(nIndex) : void 0;
	}
};
