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

dojo.provide("dwa.common.listeners");



dojo.declare(
	"dwa.common.responseListener",
	null,
{
	constructor: function(sKey){
		if (sKey == 'VOID')
			return;
	
		sKey = sKey ? sKey : ('LISTENER' + dwa.common.responseListener.prototype.nAutoGenKey++);
	
		for (var sOrigKey = sKey; this.oListeners[sKey]; dwa.common.responseListener.prototype.nAutoGenKey++)
			sKey = sOrigKey + dwa.common.responseListener.prototype.nAutoGenKey;
	
		this.oListeners[sKey] = this;
		this.sKey = sKey;
	},
	oListeners: {},
	nAutoGenKey: 0,
	track: function(sActivityHandler, nTimeoutDuration){
	},
	release: function(){
		var sKey = this.sKey;
		for (var s in this)
			delete this[s];
		delete this.oListeners[sKey];
	},
	onError: function(e){
		if (this.oListener && this.oListener.onError)
			this.oListener.onError(e);
	},
	onDataAvailable: function(){
	},
	onDatasetComplete: function(){
	},
	onReadyStateChange: function(){
	}
});


dojo.declare(
	"dwa.common.elementListener",
	dwa.common.responseListener,
{
	nElementListenerTimeout: 0, // com_ibm_dwa_globals.oSettings.nElementListenerTimeout
	constructor: function(sKey){
		if (sKey == 'VOID')
			return;
		this.aoListeners = [this];
	},
	load: function(sHref){
		this.sHref = sHref;
		if (!this.checkInFlight())
			return;
	
		if (this.nElementListenerTimeout > 0)
			setTimeout(dojo.hitch(this, "loadImpl", sHref), this.nElementListenerTimeout);
		else
			this.loadImpl(sHref);
	},
	loadImpl: function(sHref){
		this.createElement();
	
		var sLog = 'Loading element ' + this.sElementName + ' with ' + this.sHrefName + '=' + this.sHref + '... (Key: ' + this.sKey + ')';
		console.debug(sLog);
		this.oElement.setAttribute(this.sHrefName, sHref);
		this.oElement.ownerDocument.getElementsByTagName(this.sParent)[0].appendChild(this.oElement);
	},
	checkInFlight: function(){
		if (dwa.common.elementListener.prototype.oInFlight[this.sHref]
		 && dwa.common.elementListener.prototype.oInFlight[this.sHref] != this) {
			dwa.common.elementListener.prototype.oInFlight[this.sHref].aoListeners.push(this);
			return false;
		}
	
		dwa.common.elementListener.prototype.oInFlight[this.sHref] = this;
		return true;
	},
	createElement: function(){
		this.oElement = this.oDocument ? this.oDocument.createElement(this.sElementName) : document.createElement(this.sElementName);
	
		for (var s in this.oValues)
			this.oElement[s] = this.oValues[s];
	
		this.oElement.id = this.sKey;
		if(!dojo.isIE){
			this.oElement.onload = dojo.hitch(this, "handleEvent", 'onDatasetComplete');
		}else{
			this.oElement.onreadystatechange = dojo.hitch(this, "handleEvent", 'onReadyStateChange');
		}
	},
	handleEvent: function(sEvent){
		var fCancel = sEvent == 'CANCEL';
		for (var i = 0; i < this.aoListeners.length; i++) {
			if (!fCancel)
				this.aoListeners[i][sEvent](this.oElement.readyState);
			if (this.aoListeners[i] != this && (this.aoListeners[i].fToBeReleased || fCancel))
				this.aoListeners[i].release();
		}
		dwa.common.elementListener.prototype.oInFlight[this.sHref] = void 0;
		if (this.fToBeReleased || fCancel)
			this.release();
	},
	release: function(){
		if(!dojo.isIE){
			if (this.oElement)
				this.oElement.onload = null;
		}else{
			if (this.oElement)
				this.oElement.onreadystatechange = null;
		}
		delete this.oElement;
		this.inherited(arguments);
	},
	oInFlight: {}
});


dojo.declare(
	"dwa.common.scriptListener",
	dwa.common.elementListener,
{
	sHrefName: 'src',
	sElementName: 'script',
	sParent: 'head',
	oValues: {type: 'text/javascript'}
});


dojo.declare(
	"dwa.common.consolidatedImageListener",
	dwa.common.elementListener,
{
	constructor: function(asIds, sHref, sKey){
		if (sKey == 'VOID')
			return;
		this.asIds = asIds;
		this.sHref = sHref;
	
		if (!asIds || !this.checkInFlight())
			return;
	
		this.createElement();
		this.oElement.style.cssText = 'position:absolute;width:0px;height:0px;top:0px;left:0px;';
		//this.oElement.setAttribute(this.sHrefName, sHref);//_ak//this does not work for relative paths in IE8 real mode.
		this.oElement.src = sHref;
	},
	onReadyStateChange: function(sReadyState){
		if(dojo.isIE){
			if (sReadyState != 'complete')
				return;
		}
		for (var i = 0; i < this.asIds.length; i++) {
			var oContainer = dojo.doc.getElementById(this.asIds[i]);
			// check if the oContainer is still available.
			if (oContainer) {
				for (var aoImages = (/^img$/i).test(oContainer.tagName) ? [oContainer] : oContainer.getElementsByTagName('img'),
				 j = 0; j < aoImages.length; j++) {
					var oElem = aoImages[j];
					if (!oElem.getAttribute('xoffset') || !oElem.getAttribute('yoffset') || oElem.style.backgroundImage
					 || oElem.getAttribute('consolidatedImage') && oElem.getAttribute('consolidatedImage') != this.sHref)
						continue;
					oElem.style.backgroundImage = 'url(' + this.sHref + ')';
					oElem.style.backgroundPosition = '-' + oElem.getAttribute('xoffset') + 'px -' + oElem.getAttribute('yoffset') + 'px';
					oElem.setAttribute('xoffset', '');
					oElem.setAttribute('yoffset', '');
				}
			}
		}
	
		this.fToBeReleased = true;
	},
	sHrefName: 'src',
	sElementName: 'img',
	sParent: 'body',
	oValues: {}
});
dwa.common.consolidatedImageListener.prototype.onDatasetComplete = dwa.common.consolidatedImageListener.prototype.onReadyStateChange;
