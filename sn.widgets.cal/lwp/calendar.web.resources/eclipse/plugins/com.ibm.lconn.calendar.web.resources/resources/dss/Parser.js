/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.calendar.dss.Parser");

dojo.declare("lconn.calendar.dss.Parser", null, {
	
	constructor: function(autosave) {
		this.autosave = autosave;
		this.ss = this.autosave.sessionStorage;
	},
	
	load: function(key) {
		this.ss.load(key);
	},
	
	save: function(key) {
		if (this.ss.data)
			this.ss.commit(key);
	},
	parse: function(dom, key, isSave) {
			
		dojo.forEach(dojo.query("*[autosave]", dom || dojo.body()), dojo.hitch(this, function(node) {
			var attr = dojo.queryToObject(dojo.attr(node, "autosave"));
			var type = this._parseType(node, attr);
			if (type) {
				var typeHandlerClass = this.autosave.supportedHandlers[type];
				if (typeHandlerClass) {
					var clazz = eval(typeHandlerClass);
					if (clazz) {
						var typeHandler = new clazz(node, attr);
						var id = typeHandler.getID();
						
						if (isSave) {	// save
							var value = typeHandler.getValue();
							if(value != null)
								this.ss.set(id, value);
						} else {		// load
							var value = this.ss.get(id);
							if (value != undefined)
								typeHandler.setValue(value);
						}
					}
				}
			}
		}));

	},
	
	_parseType: function(node, attr) {
		var nodeName = node.nodeName.toLowerCase();
		return (null || attr.type || dojo.attr(node, "type") || nodeName);
	}
});