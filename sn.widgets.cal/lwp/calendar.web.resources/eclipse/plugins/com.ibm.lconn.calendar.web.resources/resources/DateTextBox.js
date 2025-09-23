/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function(){
dojo.provide("lconn.calendar.DateTextBox");
dojo.require("dijit.form.DateTextBox");

dojo.require("dojox.date.islamic");
dojo.require("dojox.date.hebrew");
dojo.require("lconn.core.globalization.BidiDateUtil");

var bidiDateUtil = lconn.core.globalization.BidiDateUtil,
 d = dojo.date,
 dl = d.locale;

var w = {};
// Restores drop down calendar opening up on clicking user input area
// http://dojotoolkit.org/reference-guide/1.8/releasenotes/1.8.html#id45
w.hasDownArrow = false;
w.preamble = function preamble(params){
    this.inherited(arguments);
    if (bidiDateUtil.isHijri()){
        params.datePackage="dojox.date.islamic";
        d = dojox.date.islamic;
    }
    else if (bidiDateUtil.isHebrew()){
        params.datePackage="dojox.date.hebrew";
        d = dojox.date.hebrew;
    }
    dl = d.locale;
}

w.constructor = function constructor(){
    this.inherited(arguments);
    //SPR #SYEE88NL65 - dojo does something wierd with the value, which doesn't work on safari.  Just set it null to begin.
    this.value=null;
};

w.postMixInProperties = function postMixInProperties(){
    this.inherited(arguments);
};

/**
 * Overrid the default isValid function to be less strict about date format
 * @return
 */
w.isValid = function isValid(/*Boolean*/ isFocused){
    //XXX: taking some shortcuts here because we don't use some of the date text box features (range, etc)
    //assume the date is valid if it parses
    return (this._isEmpty(this.textbox.value) && !this.required) || (this.parse(this.textbox.value)!=null);
};

/** Be less strict about the date format for parsing. */
w.parse = function parse(/*String*/ value, /*dojo.date.locale.__FormatOptions*/ constraints){
    //basically going to ignore the constraints and check for each date format
    var retval = null;
    if(value){
        retval = dl.parse(value, {formatLength:'long',selector:'date'});
        if(!retval){
            retval = dl.parse(value, {formatLength:'short',selector:'date'});
        }
        if(!retval){
            retval =dl.parse(value, {formatLength:'medium',selector:'date'});
        }
        if(!retval & /^en/i.test(dojo.locale)){
            //special case for english locale - try to parse with a punctiationless date format for a11y
            var format = bidiDateUtil.getBundle("dateFormat-long").replace(/,/g,"");
            retval = dl.parse(value, {datePattern: format,selector:'date'});
            if(!retval){
                var format = bidiDateUtil.getBundle("dateFormat-medium").replace(/,/g,"");
                retval = dl.parse(value, {datePattern: format,selector:'date'});
            }
        }
    }
    //dojo expects "null" for empty, and undefined for unparsable
    return retval || (this._isEmpty(value) ? null : undefined);
};

w.format = function (/*Date*/ value, /*locale.__FormatOptions*/ constraints){
	// summary:
	//		Formats the value as a Date, according to specified locale (second argument)
	// tags:
	//		protected
	if(!value){ return ''; }
	constraints.formatLength = 'long';
	return this.dateLocaleModule.format(value, constraints);
};

w.getGregorianDate = function() {
	var v = this.value;
	if(!v) return v;
	if(!!v.getTime) {
		return v;
	} else {
		return v.toGregorian();
	}
};

w.setGregorianDate = function(date) {
	var d = date;
	if (bidiDateUtil.isHijri()){
		d = new dojox.date.islamic.Date();
    	d.fromGregorian(date);
    }
    else if (bidiDateUtil.isHebrew()){
    	d = new dojox.date.hebrew.Date();
    	d.fromGregorian(date);
    }
	this.setValue(d);
};

dojo.declare("lconn.calendar.DateTextBox", [dijit.form.DateTextBox], w);
})();