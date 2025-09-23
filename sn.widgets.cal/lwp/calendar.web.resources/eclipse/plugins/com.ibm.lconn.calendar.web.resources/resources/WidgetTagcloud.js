/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.calendar.WidgetTagcloud");

dojo.require("lconn.core.CommonTags.TagWidget"); 
dojo.require("lconn.core.HelpLauncher");

dojo.declare("lconn.calendar.WidgetTagcloud", [dijit._Widget, dijit._Templated], {
	  _lang: dojo.i18n.getLocalization('lconn.calendar.CalendarData', 'templateStrings'),
	
      templateString: null,
      templatePath: dojo.moduleUrl('lconn.calendar', 'templates/tagcloud.html'),
      
      tagcloudImpl: null,
      
      _connections: [],
      
      postCreate: function() {
    	  this.tagcloudImpl = new lconn.core.CommonTags.TagWidget({
    		  	id: this.id + '-tagcloudImpl', 
    		  	loadOnStartup: true, 
    		  	redirectWhenClickTag: false,
    		  	selectedTags: this.selectedTags,
    		  	tagUrl: this.tagUrl,
	            tagTemplate: this.tagTemplate,
	            typeAheadFeedUrl: this.typeAheadFeedUrl,
	            typeAheadTemplate: this.typeAheadTemplate,
	            multiSelected: this.multiSelected,
	            disableRelated: this.disableRelated
    		 }, 
    		 dojo.query('div', dojo.byId('lconnTagCloudContent-' + this.id))[0]
    	  );
    	  this._connections.push(dojo.connect(null, 'toggleTags', null, dojo.hitch(this, function(){
    		  try {
	    		  var t = dojo.byId('lconnTagCloudFilter-' + this.id + '_hint');
	    		  var x = dojo.byId('lconnTagCloudFilter-' + this.id);
	    		  var s = t.getAttribute('status');
	    		  if(s == 'expanded') {
	    			  t.setAttribute('status', 'collapsed');
	    			  t.innerHTML = this._lang.COLLAPSED_SECTION;
	    			  x.setAttribute('aria-expanded', 'false');
	    		  } else {
	    			  t.setAttribute('status', 'expanded');
	    			  t.innerHTML = this._lang.EXPANDED_SECTION;
	    			  x.setAttribute('aria-expanded', 'true');
	    		  }
    		  } catch(err){}
    	  })));
    	  dojo.connect(this.tagcloudImpl, 'reload', null, dojo.hitch(this.tagcloudImpl, function(){
    		  var t = dojo.hash();
    		  if(t.indexOf('fullpageWidgetId%3D') == 0) {
    				t = 'fullpageWidgetId=' + t.substring('fullpageWidgetId%3D'.length);
    		  }
    		  
    		  var obj = dojo.queryToObject(t);
    		  if(this.selectedTags) {
    			  obj['tags'] = this.selectedTags;
    		  } else {
    			  obj['tags'] = null;
    		  }
    		  dojo.hash(dojo.objectToQuery(obj));
    	  }));
    	  
    	  var _this = this;
    	  function initHelp(id, heading, message) {
	    	var spanElem = document.getElementById(id);
	    	if (spanElem != null) {
	    	   	var helpStrings = {
	   					HELP: _this._lang.HELP,
	   					CLOSE: _this._lang.CLOSE_HELP
				};   
	    		spanElem.appendChild( lconn.core.HelpLauncher.createHelpLink(null, heading, message, helpStrings) );
	    	}
    	  }
    	  initHelp('tagsHelpSPN-' + this.id, this._lang.TAGS, this._lang.TAGCLOUD_HELP);
      },
      
      destroy: function() {
    	  this.inherited(arguments);
    	  if(this.tagcloudImpl) {
    		  this.tagcloudImpl.destroyRecursive();
    		  this.tagcloudImpl = null;
    	  }
    	  try {
	    	  for(var i = 0; i < this._connections.length; i++) {
	    		  dojo.disconnect(this._connections[i]);
	    	  }
    	  } catch(err) {}
      },
      
      refresh: function(selectedTags) {
    	  if(selectedTags) {
    		  this.tagcloudImpl.selectedTags = lconn.calendar.CalendarUtil.normalizeTagsAsString(selectedTags);  
    	  } else {
    		  this.tagcloudImpl.selectedTags = null;
    	  }
    	  this.tagcloudImpl.reload();
      },
      
      reload: function() {
    	  this.tagcloudImpl.reload();
		  this.tagcloudImpl.tagStore.clear();
      }
});

lconn.calendar.WidgetTagcloud.create = function(params) {
	// initialize tag cloud position on page
	var placeholder = dojo.byId('widget-tagcloud-placeholder');
	if(!placeholder) {
		placeholder = document.createElement('div');
		placeholder.setAttribute('id', 'widget-tagcloud-placeholder');
		
		var colLeft = dojo.byId('lotusColLeft');
		var menu = dojo.query('.lotusMenu', colLeft);
		if(menu && menu[0] && menu[0].nextSibling) {
			// append tag cloud widget directly after the menu
			menu[0].parentNode.insertBefore(placeholder, menu[0].nextSibling);
		} else {
			colLeft.appendChild(placeholder);
		}
	}
	
	var div = document.createElement('div');
	placeholder.parentNode.insertBefore(div, placeholder.nextSibling);
	
	if(!params.id) {
		params.id = 'widget-tagcloud';
	}
	return new lconn.calendar.WidgetTagcloud(params, div);
};