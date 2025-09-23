/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.calendar.MonthdayPicker");

dojo.declare("lconn.calendar.MonthdayPicker", null, {
	domNode: null,
	data: null,

	constructor: function(args) {
		dojo.mixin(this, args);
		lconn.calendar.CalendarData.get().mixin(this);
		this.buildNode();
	}, 

	/**
    * Create the dom node for month day picker, optionally uses a base node
    * @argument baseNode optional node to use to build picker in
    * @return the dom node
    */
	buildNode: function() {
		            
		var w = dojo.cldr.supplemental.getFirstDayOfWeek();
		for (var k = 0; k < this.data.weekdays.length; k++) {
			var weekday = this.data.weekdays[w];
			this.recNthDay.options.add(new Option(this._lang[weekday], weekday ));
			w = (w+1) % this.data.weekdays.length;
		
		}
		dojo.connect(this.recNthDay, "onchange", this, "_checkMaleOrFemale");
		this._checkMaleOrFemale(); // initialize the "recNthWeek" dropdown box
	},
	
	_checkMaleOrFemale: function(){
		var dayOfWeek = this.recNthDay.children[this.recNthDay.selectedIndex],
			vDayOfWeek = dayOfWeek.value;
		var isFemaleWord = false;
		if(dojo.locale.indexOf('pt') != -1){
			if(vDayOfWeek != "SU" && vDayOfWeek != "SA")
				isFemaleWord = true;
		}else if (dojo.locale.indexOf('el') != -1){
			if(vDayOfWeek != "SA")
				isFemaleWord = true;
		}
		if(isFemaleWord){
			this.recNthWeekNode.children[0].text = this._lang.First_WEEK_OF_MONTH;
			this.recNthWeekNode.children[1].text = this._lang.Second_WEEK_OF_MONTH;
			this.recNthWeekNode.children[2].text = this._lang.Third_WEEK_OF_MONTH;
			this.recNthWeekNode.children[3].text = this._lang.Fourth_WEEK_OF_MONTH;
			this.recNthWeekNode.children[4].text = this._lang.LAST_WEEK_OF_MONTH;	
		} else {
			this.recNthWeekNode.children[0].text = this._lang.First_WEEK_OF_MONTH_UNFEMALE;
			this.recNthWeekNode.children[1].text = this._lang.Second_WEEK_OF_MONTH_UNFEMALE;
			this.recNthWeekNode.children[2].text = this._lang.Third_WEEK_OF_MONTH_UNFEMALE;
			this.recNthWeekNode.children[3].text = this._lang.Fourth_WEEK_OF_MONTH_UNFEMALE;
			this.recNthWeekNode.children[4].text = this._lang.LAST_WEEK_OF_MONTH_UNFEMALE;	
		}
	},
	
	initOnChange: function() {
		
	},

	/**
	* Get value of month picker
	* @return example output: 2,WE
	*/
	getValue: function() {
		if(this.checkMonthlyByDate.checked){
			return this.recByDateType.value;
		} else {
			return this.recNthWeekNode.value + "," + this.recNthDay.value;
		}

	},

	/**
	* Set value of month picker
	* @argument dayString sting of days in form: MO,WE,FR
	* @see CalendarData for weekday names
	*/
	setValue: function(dayString) {
		if(!dayString) return;
		var days = isNaN(dayString) ? dayString.split(',') : [new String(dayString)];
		if(days.length == 1) {
			this.checkMonthlyByDate.checked = true;
			this.recByDateType.value = days[0];
		} else if (days.length == 2) {
			this.checkMonthlyByDay.checked = true;
			this.recNthWeekNode.value = days[0];
			this.recNthDay.value = days[1];
		}
	},
	/**
	* Clear any selected days
	*/
	clear: function() { 
		this.recByDateType.selectedIndex = 0;
		this.recNthWeekNode.selectedIndex = 0;
		this.recNthDay.selectedIndex = 0;
		this.checkMonthlyByDate.checked = true;
		
	}
});