/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("dwa.common.graphics");


dojo.getObject("common.graphics", true, dwa);

var _isIE = (function() {
	if ( navigator.userAgent.indexOf("Trident/7.0") >= 0){
		return function(){ 
			return dojo.isIE || 11; 
		}
	} else if (navigator.userAgent.indexOf("Edge/") > 0) {
		return function() {
			return dojo.isIE || 14;
		}
	} else {
		return function(){ 
			return dojo.isIE; 
		}
	}		
})();

dwa.common.graphics.drawRoundRect = function(oCanvas, sFillColor, sStrokeColor, anRadius, afStroke){
	var nWidth = oCanvas.getAttribute('width') - 0;
	var nHeight = oCanvas.getAttribute('height') - 0;

	afStroke = afStroke || [true, true, true, true];
	anRadius = anRadius || [];
	for (var i = 0; i < 4; i++)
		anRadius[i] = typeof(anRadius[i]) != 'undefined' ? anRadius[i] : 3;

	// Create path
	var oContext = oCanvas.getContext('2d');
	oContext.beginPath();

	if (afStroke[0]) {
		oContext.moveTo(anRadius[0], 0);
		oContext.lineTo(nWidth - anRadius[1], 0);
		if (afStroke[1])
			oContext.quadraticCurveTo(nWidth - 1, 1, nWidth, anRadius[1]);
	} else {
		oContext.moveTo(nWidth, anRadius[1]);
	}

	if (afStroke[1]) {
		oContext.lineTo(nWidth, nHeight - anRadius[2]);
		if (afStroke[2])
			oContext.quadraticCurveTo(nWidth - 1, nHeight - 1, nWidth - anRadius[2], nHeight);
	} else {
		oContext.moveTo(nWidth - anRadius[2], nHeight);
	}

	if (afStroke[2]) {
		oContext.lineTo(anRadius[3], nHeight);
		if (afStroke[3])
			oContext.quadraticCurveTo(1, nHeight - 1, 0, nHeight - anRadius[3]);
	} else {
		oContext.moveTo(0, nHeight - anRadius[3]);
	}

	if (afStroke[3]) {
		oContext.lineTo(0, anRadius[0]);
		if (afStroke[0])
			oContext.quadraticCurveTo(1, 1, anRadius[0], 0);
	} else {
		oContext.moveTo(anRadius[0], 0);
	}

	if (sFillColor) {
		oContext.fillStyle = sFillColor;
		oContext.fill();
	}

	if (sStrokeColor) {
		oContext.lineWidth = 1.5;
		oContext.strokeStyle = sStrokeColor;
		oContext.stroke();
	}

};

dwa.common.graphics.colorStrokeGradient = function(oContainer, oGradient, vFillColor, sStrokeColor){
	if((!dojo.isMozilla && !dojo.isWebKit)){
		if(_isIE()>=9){
			var oContext = oContainer.getContext('2d');

			if (vFillColor) {
				if (vFillColor instanceof Array) {
					var nHeight = oContainer.getAttribute('height') - 0;
					for (var oGradient = oContext.createLinearGradient(0, 0, 0, nHeight), i = 0; i < vFillColor.length; i += 4)
						oGradient.addColorStop(vFillColor[i] / 100,
							'rgb(' + vFillColor[i + 1] + ', ' + vFillColor[i + 2] + ', ' + vFillColor[i + 3] + ')');

					oContext.fillStyle = oGradient;
				} else
					oContext.fillStyle = vFillColor;

				oContext.fill();
			}

			if (sStrokeColor) {
				oContext.lineWidth = 1.5;
				oContext.strokeStyle = sStrokeColor;
				oContext.stroke();
			}
		}else{
			if (vFillColor) {
				var asAttrib = [];
				if (vFillColor instanceof Array) {
					for (var i = 0; i < vFillColor.length; i += 4)
						asAttrib.push(vFillColor[i] + '% rgb(' + vFillColor[i + 1] + ',' + vFillColor[i + 2] + ',' + vFillColor[i + 3] + ')');
				} else 
					asAttrib[0] = vFillColor;

				oGradient.colors.value = asAttrib.join(',');
			}
			if (sStrokeColor)
				oContainer.strokecolor = sStrokeColor;
		}
	}else{
		var oContext = oContainer.getContext('2d');

		if (vFillColor) {
			if (vFillColor instanceof Array) {
				var nHeight = oContainer.getAttribute('height') - 0;
				for (var oGradient = oContext.createLinearGradient(0, 0, 0, nHeight), i = 0; i < vFillColor.length; i += 4)
					oGradient.addColorStop(vFillColor[i] / 100,
						'rgb(' + vFillColor[i + 1] + ', ' + vFillColor[i + 2] + ', ' + vFillColor[i + 3] + ')');

				oContext.fillStyle = oGradient;
			} else
				oContext.fillStyle = vFillColor;

			oContext.fill();
		}

		if (sStrokeColor) {
			oContext.lineWidth = 1.5;
			oContext.strokeStyle = sStrokeColor;
			oContext.stroke();
		}
	}
};
