/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.calendar.Lazy");

dojo.mixin(lconn.calendar.Lazy, {
	lazyLoad: [],
	
	register: function(id, scope, func) {
		this.lazyLoad[id] = {
			id: id,
			load: function(sync) {
				if(!sync && (this.status == 'loading' || this.status == 'loaded')) 
					return;
				
				this.status = 'loading';
				(dojo.hitch(scope, func))(sync, dojo.hitch(this, this.onload));
			},
			status: '',
			subscribes: [],
			onload: function() {
				this.status = 'loaded';
				for(var i = 0; i < this.subscribes.length; i++) {
					try {
						(this.subscribes[i])();
					} catch(err) {
						// ignore
					}
				}
				this.subscribes = [];
			}
		};
	},
	
	reset: function() {
		this.lazyLoad = [];
	},
	
	addOnLoad: function(dependency, scope, func, sync, condition) {
		function _onetime(scope, func) {
			return dojo.hitch({executed: false}, function() {
				if(!this.executed) {
					(dojo.hitch(scope, func))();
					this.executed = true;
				}
			});
		}
		
		function _checkAndExec(lazyLoad, dependency, func) {
			return function() {
				for(var i = 0; i < dependency.length; i++) {
				    var t = lazyLoad[dependency[i]];
				    if(!t.status || t.status != 'loaded') {
				    	return;
				    }
				}
				func();
			};
		}
		
		var _f = _onetime(scope, func);
		
		if(!condition) {
			_f();
			return;
		}
		
		var wait = false;
		for(var i = 0; i < dependency.length; i++) {
		    var t = this.lazyLoad[dependency[i]];
		    if(t) {
		    	if(!t.status || t.status != 'loaded') {
		    		wait = true;
		    		t.subscribes.push(_checkAndExec(this.lazyLoad, dependency, _f));
		    		t.load(sync);
		    	}
		    }
		}
		
		if(!wait) {
			_f();
		}
	}
});

