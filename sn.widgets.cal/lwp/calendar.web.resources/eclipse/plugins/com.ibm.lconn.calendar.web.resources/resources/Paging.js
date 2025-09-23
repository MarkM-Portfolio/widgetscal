/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.calendar.Paging");

dojo.require("dojo.number");

dojo.declare("lconn.calendar.Paging", [dijit._Widget, dijit._Templated], {
	templateString: null,
	templatePath: dojo.moduleUrl("lconn.calendar", "templates/paging.html"),
	
	pageSize: 10,
	psList: [10,20,50],
	
	_currentPage: 1,
	_dirty:false,
	_itemCount: null,
	
	supportedFeatures: {info:"pageInfoAP", list:"pageListAP", nav:"pageNavAP", ps:"pagePSAP", jump:"pageJumpAP"},
	
	features: null,
	
	postCreate: function() {
		dojo.attr(this.domNode, "aria-label", this.params.aria_label || this._lang.PAGING_LABEL);
		dojo.attr(this.domNode, "role", "navigation");
	},
	
	hide: function() {
		this.domNode.style.display = "none";
	},
	
	show: function() {
		for (var i=0,l=this.features.length; i<l; i++) {
			var ap = this.supportedFeatures[this.features[i]];
			if (ap) this[ap].style.display = "";
		}
		this.domNode.style.display = "";
	},
	
	// update all the paging UI
	// should not be used by paging widget but be called by user
	// because we need to handle two paging sync, user need to handle this
	update: function(page, ps) {
		this._itemCount = this.total();
		if (ps) this.pageSize = ps;
		if (this._itemCount != 0) {
			this._currentPage = page;
			for (var i=0,l=this.features.length; i<l; i++) {
				if(this.features[i] == 'info')
					this._setPageInfo();
				else if(this.features[i] == 'nav')
					this._setPageNav();
				else if(this.features[i] == 'list')
					this._setPageList();
				else if(this.features[i] == 'ps')
					this._setPagePS();
				else if(this.features[i] == 'jump')
					this._setPageJumpTo();
			}
			this.show();
		} else {
			this.hide();
		}
		this.cleanDirty();
	},
	
	// hitch: get total count of items
	total: function() {
		return 0;
	},
	
	// hitch: do something after select a page
	onPage: function(page) {},
	
	// hitch: when page size change
	onPageSizeChange: function(ps) {},
	
	cleanDirty: function(){ this._dirty = false;},
	
	_psChange: function(ps) {
		// current impl: go to the first page when ps change
		this.pageSize = ps;
		this._currentPage = 1;
		
		this.onPageSizeChange(ps);
	},
	
	getCurrentPage: function() {
		return this._currentPage;
	},
	
	_total: function() {
		if (this._itemCount == null)
			this._itemCount = this.total();
		return this._itemCount;
	},
	
	_setPageInfo: function() {
		var all = this._total();
		var from = this.pageSize * (this._currentPage - 1) + 1;
		var to = this.pageSize * this._currentPage;
		if (to > all)  to = all;
		var info = dojo.string.substitute(this._lang.PAGING_INFO, [from, to, all]);
		var title = dojo.string.substitute(this._lang.PAGING_INFO_TITLE, [from, to, all]);
		dojo.html.set(this.pageInfoAP, info);
		dojo.attr(this.pageInfoAP, "title", title);
		dojo.attr(this.pageInfoAP, "role", "application");
		dojo.attr(this.pageInfoAP, "aria-label", title);
	},
	
	_setPageNav: function() {
		if (this._hasPrevious()) {
			this.previousLinkAP.style.display = "";
			this.previousTextAP.style.display = "none";
		} else {
			this.previousLinkAP.style.display = "none";
			this.previousTextAP.style.display = "";
		}
		if (this._hasNext()) {
			this.nextLinkAP.style.display = "";
			this.nextTextAP.style.display = "none";
		} else {
			this.nextLinkAP.style.display = "none";
			this.nextTextAP.style.display = "";
		}
	},
	
	_setPageJumpTo: function() {
		var x = dojo.query('[name="jumpToPage_text"]', this.domNode);
		if(!x || x.length == 0) {
			this.pageJumpFormAP.innerHTML = '';
			var inputHtml = '<input type="text" value="' + this._currentPage + '" title="' + this._lang.PAGEING_PAGE_NUM_TITLE + '" name="jumpToPage_text">';
			this.pageJumpFormAP.innerHTML = dojo.string.substitute(this._lang.PAGING_JUMPTO, [inputHtml, '<span name="jumpToPage_total">' + this._pageCount() + '</span>']);
			dojo.create("label", {id: "jumpToPageDesc", className: "lotusOffScreen", innerHTML: this._lang.PAGEING_JUMP_LABEL}, this.pageJumpFormAP, "last");
			dojo.attr(this.pageJumpFormAP, "aria-labelledby", "jumpToPageDesc");
		} else {
			x[0].value=this._currentPage;
			dojo.query('[name="jumpToPage_total"]', this.domNode)[0].innerHTML = this._pageCount();
		}
		if(this._focusJumpBox){
			this._focusJumpBox = false;
			try{
				x[0].focus();
			} catch(err) {}
		}
	},
	
	_setPagePS: function() {
		for (var i=0,l=this.psList.length; i<l; i++) {
			var ps = this.psList[i];
			var ap = this["ps" + ps + "AP"];
			dojo.empty(ap);
			var title = dojo.string.substitute(this._lang.PAGING_PAGE_TITLE3, [ps]);
			var label = dojo.string.substitute(this._lang.PAGING_PAGE_TITLE, [ps]);
			if (ps == this.pageSize) {
				ap.innerHTML = ps;
				dojo.attr(ap, "title", title);
				dojo.attr(ap, "aria-label", label);
				dojo.attr(ap, "aria-disabled", "true");
				dojo.attr(ap, "aria-pressed", "true");
				dojo.attr(ap, "role", "button");
			} else {
				dojo.removeAttr(ap, "title");
				dojo.removeAttr(ap, "aria-label");
				dojo.removeAttr(ap, "aria-disabled");
				dojo.removeAttr(ap, "aria-pressed");
				dojo.removeAttr(ap, "role");
				var f = dojo.hitch(this, function(evt) {
					var ps = parseInt(evt.currentTarget.innerHTML);
					this._psChange(ps);
				});
				dojo.create("a", {href:"javascript:;", role:"button", title:title, 
					"aria-label":label, "aria-pressed":"false", innerHTML:ps, onclick:f}, ap);
			}
		}
	},
	
	_setPageList: function() {
		var ul = document.createElement('ul');
		dojo.addClass(ul, "lotusInlinelist");
		if(this._pageCount() <= 9) {
			for (var i=1, pc=this._pageCount(); i<=pc; i++) {
				var li = dojo.create("li");
				if (i==1) dojo.addClass(li, "lotusFirst");
				if (i == this._currentPage) {
					this._setNonSelectableLi(li, i);
				} else {
					this._setSelectableLi(li, i);
				}
				ul.appendChild(li);
			}
		} else if(this._currentPage <= 3) {
			var pc = this._pageCount();
			
			for (var i=1; i<=5; i++) {
				var li = dojo.create("li");
				if (i==1) dojo.addClass(li, "lotusFirst");
				if (i == this._currentPage) {
					this._setNonSelectableLi(li, i);
				} else {
					this._setSelectableLi(li, i);
				}
				ul.appendChild(li);
			}
			
			var li = dojo.create("li");
			dojo.addClass(li, "lotusLast");
			li.innerHTML = "<nobr>...</nobr>";
			ul.appendChild(li);
			
			var li = dojo.create("li");
			dojo.addClass(li, "lotusLast");
			this._setSelectableLi(li, pc);
			ul.appendChild(li);
		} else if(this._currentPage >= this._pageCount() - 2) {
			var pc = this._pageCount();
			
			var li = dojo.create("li");
			dojo.addClass(li, "lotusFirst");
			this._setSelectableLi(li, 1);
			ul.appendChild(li);
			
			var li = dojo.create("li");
			dojo.addClass(li, "lotusLast");
			li.innerHTML = "<nobr>...</nobr>";
			ul.appendChild(li);
			
			for (var i=pc-4; i<=pc; i++) {
				var li = dojo.create("li");
				if (i==pc-4) dojo.addClass(li, "lotusLast");
				if (i == this._currentPage) {
					this._setNonSelectableLi(li, i);
				} else {
					this._setSelectableLi(li, i);
				}
				ul.appendChild(li);
			}
		} else {
			var pc = this._pageCount();
			
			var li = dojo.create("li");
			dojo.addClass(li, "lotusFirst");
			this._setSelectableLi(li, 1);
			ul.appendChild(li);
			
			var li = dojo.create("li");
			dojo.addClass(li, "lotusLast");
			li.innerHTML = "<nobr>...</nobr>";
			ul.appendChild(li);
			
			for (var i=this._currentPage - 1; i<=this._currentPage + 1; i++) {
				var li = dojo.create("li");
				if (i==this._currentPage - 1) dojo.addClass(li, "lotusLast");
				if (i == this._currentPage) {
					this._setNonSelectableLi(li, i);
				} else {
					this._setSelectableLi(li, i);
				}
				ul.appendChild(li);
			}
			
			var li = dojo.create("li");
			dojo.addClass(li, "lotusLast");
			li.innerHTML = "<nobr>...</nobr>";
			ul.appendChild(li);
			
			var li = dojo.create("li");
			dojo.addClass(li, "lotusLast");
			this._setSelectableLi(li, pc);
			ul.appendChild(li);
		}
		
		var x = dojo.query('ul', this.pageListAP)[0];
		this.pageListAP.replaceChild(ul, x);
		delete x;
	},
	
	_hasNext: function() {
		if (this._currentPage * this.pageSize >= this._total())
			return false;
		else return true;
	},
	
	_hasPrevious: function() {
		if (this._currentPage == 1)
			return false;
		else return true;
	},
	
	_pageCount: function() {
		return Math.ceil(this._total() / this.pageSize);
	},
	
	_selectPage: function(page) {
		if(page < 1 ||  page > this._pageCount() || this._dirty) return;
		this._dirty = true;
		this._currentPage = page;
		this.onPage(page);
	},
	
	_setNonSelectableLi: function(li, i) {
		var title = dojo.string.substitute(this._lang.PAGING_PAGE_TITLE2, [i]);
		dojo.create("span", {innerHTML:i, title:title, "aria-label":title}, li);
	},
	
	_setSelectableLi: function(li, i) {
		var f = dojo.hitch(this, function() { 
			this._selectPage(i);
			this.onPage(i); 
		});
		var title = dojo.string.substitute(this._lang.PAGING_PAGE_TITLE2, [i]);
		dojo.create("a", {href:"javascript:;", innerHTML:i, title:title, "aria-label":title, onclick:f}, li);
	},
	
	_next: function() {
		this._selectPage(this._currentPage + 1);
	},
	
	_previous: function() {
		this._selectPage(this._currentPage - 1);
	},
	
	_jump: function() {
		this._focusJumpBox = true;
		
		var t = dojo.query('[name="jumpToPage_text"]', this.domNode);
		var p = dojo.number.parse(t[0].value);
		if(isNaN(p)) return;
		this._selectPage(p);
	}
});
