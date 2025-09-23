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

dojo.provide("lconn.calendar.RecurrencePicker");
dojo.provide("lconn.calendar.WeekdayPicker");
dojo.require("lconn.calendar.MonthdayPicker");

dojo.declare("lconn.calendar.RecurrencePicker", [dijit._Widget, dijit._Templated], {
	templateString: null,
	templatePath: dojo.moduleUrl('lconn.calendar', 'templates/recPicker.html'),
	
	editor: null,
	
	autoUpdateUntil: true,
	
	_node: function(name) { return dojo.byId(this.id+'-'+name); },
	_dnode: function(name) { return dijit.byId(this.id+'-'+name); },
	
	_setDefaultRepeatDate: function(tabName) {
		var startDate = this.editor._dnode("sdate").getGregorianDate() || new Date();
		      
		var repeatUntil = null;
		   
		// For events that repeat daily, set repeat until date to a week later
		// for weekly events, set it to 12 weeks out
		if (tabName == "daily") {	     
			repeatUntil = dojo.date.add(startDate,'day', 7);
			this._dnode('until').setGregorianDate(repeatUntil); 
		} else if (tabName == 'weekly') {
			repeatUntil = dojo.date.add(startDate,'week', 12);
			this._dnode('until').setGregorianDate(repeatUntil);
		} else if (tabName == 'monthly') {
			repeatUntil = dojo.date.add(startDate,'month', 6);
			this._dnode('until').setGregorianDate(repeatUntil);
		}
		
		var _this = this;
		window.setTimeout(function(){
			_this._dnode('until').invalidMessage = dojo.string.substitute(_this._lang.ENTER_DATE_EXAMPLE, [_this._dnode('until').textbox.value]);
		}, 1);
	},
	
	clear: function() {
		for (var type in this.recurrenceTypes) {
			this.recurrenceTypes[type].clear();
		}
		
		dojo.forEach(dojo.query('select,input', this.domNode), function(input) {
			input.disabled = false;
		});
		
		this.tab('daily', true);
		this.hideRepeatOptions();
		dojo.attr(this._node("recurrenceDisable"), "disabled", false);
	},
	
	setup: function(recObj, enableSelect) {
		var tabName = recObj.freq;
		this.tab(tabName, true);
		
		var intervalSelect = this._node("interval");
		intervalSelect.value = recObj.interval;
		if (tabName != "custom") {
			var recurrenceType = this.recurrenceTypes[tabName];
	        if (recurrenceType) {
		        recurrenceType.setValue(recObj[recurrenceType.valueName]);
		        this.showRepeatOptions();
	        }
		}
		
		this._dnode("until").setGregorianDate(recObj.until);
		if(recObj.until) {
			var _this = this;
			window.setTimeout(function(){
				_this._dnode('until').invalidMessage = dojo.string.substitute(_this._lang.ENTER_DATE_EXAMPLE, [_this._dnode('until').textbox.value]);
			}, 1);
		}
		
		this._toggleRecOptionDisabled(!enableSelect);
	},
	
	value: function() {
		var r = {}; // the final recurrence data
		
		var startDate = this.editor.util.mixDates(
				this.editor._dnode("sdate").getGregorianDate(), this.editor._dnode("stime").getValue());
		var endDate = this.editor.util.mixDates(
				this.editor._dnode("edate").getGregorianDate(), this.editor._dnode("etime").getValue());
		
		var tabName = "none";
		if(this._node("recurrenceDisable").checked) {
			tabName = this._node("rectype").value;
		} 
		var recurrenceType = null;
		if (recurrenceType = this.recurrenceTypes[tabName])
			dojo.mixin(r, recurrenceType.getValue(startDate, endDate));

		// fill in the rest of the recurrence data
		switch(tabName) {
			case "custom":
			case "none": 
				r.custom = [{
					startDate: startDate,
					endDate: endDate
				}].concat(r.custom || new Array());
				r.freq = "custom";

				var rangeEqual = function(left, right) {
					return left.startDate.getTime() == right.startDate.getTime() &&
						left.endDate.getTime() == right.endDate.getTime();
				}

				// make sure there aren't reapeated dates
				r.custom = dojo.filter(r.custom, function(item, i , a) {
					var found = false;
					for (var j = i+1; j < a.length; j++) { 
						if (rangeEqual(item, a[j]) && i != j) {
							found = true;
							break;
						}
					}
					return !found;
				});

				break;
			default: 
				r.freq = recurrenceType && recurrenceType.frequency || tabName;
				r.interval = this._node("interval").value;
				r.until = this._dnode("until").getGregorianDate();
		}
		return r;
	},
	
	// disable recPicker, weekPicker, intervalPicker. Leave until enabled
	_toggleRecOptionDisabled: function(disabled) {
		dojo.attr(this._node("recurrenceDisable"), "disabled", disabled);
		dojo.attr(this._node("rectype"), "disabled", disabled);
		dojo.forEach(dojo.query(".recWeekdayPicker input"), function(node) {
			dojo.attr(node, "disabled", disabled);
		});
		dojo.attr(this._node("interval"), "disabled", disabled);
		dojo.attr(this._node("recByDateType"), "disabled", disabled);
		dojo.attr(this._node("checkByDateMonthly"), "disabled", disabled);
		dojo.attr(this._node("checkByDayMonthly"), "disabled", disabled);
		dojo.attr(this._node("recNthWeek"), "disabled", disabled);
		dojo.attr(this._node("recNthDay"), "disabled", disabled);
	},
	
	/**
	 * Show the recurrence options for specified type
	 * @argument name the name of the recurrence type to show
	 * @argument setPicker if true, set the value of the select box to name
	 */
	tab: function(name, setPicker) {
		var container = this._node('options');
		var rangePickerRow = this._node('rangePickerRow');
		var untilRow = this._node('untilRow');
		var recPicker = this._node('rectype');
		var intervalSelect = this._node('interval');
		
		if (setPicker === true) {
			recPicker.value = (name=="custom"?"none":name);
		}
		
		if(name=="custom")  {
			return;
		}
		
		var recurrenceType = this.recurrenceTypes[name];

		this._setDefaultRepeatDate(name);

		var hideRangePicker = recurrenceType && recurrenceType.hideRangePicker;
		if (!hideRangePicker)
			this.intervalFormaters[name](intervalSelect);

		rangePickerRow.style.display = hideRangePicker ? 'none' : '';
		
		var hideUntil = recurrenceType && recurrenceType.hideEndDate;
		untilRow.style.display = hideUntil ? 'none' : '';
		
		if (recurrenceType && recurrenceType.onTab)
			recurrenceType.onTab();

		dojo.query(".recEntry", this._node('recVaried')).forEach(function (v) {
			if (recurrenceType && (new RegExp(name+"$", "i")).test(v.id)) {
				v.style.display = "";
			} else
				v.style.display = "none";
		});
		
		if(recPicker.value == 'monthly'){
			this.showMessageForByDate();
			if(this._node("checkByDateMonthly").checked){
				this.byDateClicked();
			} else {
				this.byDayClicked();
			}
		}
	},
	
	validate: function(errors) {
		if(!this._node("recurrenceDisable").checked) {
			return;
		}
		
		var _lang = this.editor._lang;
		var tabName = this._node('rectype').value;
		
		var repeatUntil = this._dnode('until');
		var invalidUntil = false;
		if (!repeatUntil.isValid() || !repeatUntil.getGregorianDate()) {
			invalidUntil = true;
		} 
		
		var repeatUntilTime;
		if(!invalidUntil) {
			var v = repeatUntil.getGregorianDate();
			repeatUntilTime = new Date(v.getFullYear(), v.getMonth(), v.getDate(), 23, 59, 59);
		}
		
		if((tabName == "daily" || tabName == "weekly" || tabName == 'monthly') && invalidUntil)
        	errors.push(_lang.UNTIL_DATE);
        
		var _stime = this.editor.util.mixDates(
			this.editor._dnode("sdate").getGregorianDate(), this.editor._dnode("stime").getValue());
		var type = this.editor._getEditType();
        if(!invalidUntil && (tabName == 'daily' || tabName == 'weekly' ||  tabName == 'monthly') 
        		&& _stime > repeatUntilTime
        		&& (type == 'series' || this.editor.isNewEvent))
        	errors.push(_lang.START_DAY_AFTER_UNTIL_DAY);
       
        if (tabName == "daily" || tabName == "weekly" || tabName == 'monthly') {
			var byday = this.recurrenceTypes[tabName].getValue().byday;
			if (byday.length == 0)
				errors.push(_lang.NO_REPEAT_ON);
		}
	},
	
	showRepeatOptions : function(){
		var recPicker = this._node('rectype');
		if(recPicker.value != 'daily' && recPicker.value != 'weekly' && recPicker.value != 'monthly')
			this.clear();
		
		dojo.addClass(this._node("recurrenceEnable"),"lotusHidden");
		this._node("recurrenceDisable").checked = true;
		dojo.removeClass(this._node("recurrenceDisable"),"lotusHidden");
		dojo.removeClass(this._node("options"),"lotusHidden");
		
		try{
			this._node("recurrenceDisable").focus();
		} catch(err){
		}
		
		this._setDefaultRepeatDate(recPicker.value);
		
	},
	toggleRepeatSection : function(){
		if(this._node("recurrenceDisable").checked === true) {
			this.showRepeatOptions();
		} else {
			this.hideRepeatOptions();
		}
	},
	hideRepeatOptions : function(){
		this._node("recurrenceDisable").checked = false;
		dojo.removeClass(this._node("recurrenceEnable"),"lotusHidden");
		dojo.addClass(this._node("recurrenceDisable"),"lotusHidden");
		dojo.addClass(this._node("options"),"lotusHidden");	
		try{
			this._node("recurrenceEnable_link").focus();
		}catch(err){}
	},
	postCreate: function() {
		dojo.parser.parse(this.domNode);
		
		var weekdays = this.editor.data.weekdays;

		this.intervalFormaters = {
			weekly: this.optionMaker(1, 5, this.xNoun(this._lang.WEEK, this._lang.WEEKS))
		};
		
		var _this = this;
		// change recurrence type
		if(!dojo.isFF){
			this._node("rectype").onchange = function() { _this.tab(this.value); };
			this._node("rectype").onkeyup = function() { this.blur(); this.focus(); };
		} else {
			this._node("rectype").onchange = function() { _this.tab(this.value); };
			this._node("rectype").onkeyup = function() { _this.tab(this.value);};
		}
		
		
		// initialize the recurrence pickers
		for (var type in this.recurrenceTypes) {
			var r = this.recurrenceTypes[type];
			if (r.init) r.init(r.recPicker = this);
		}
		
		function _moveRepeatUntilRuleOnStartDateUpdate() {
			if(this.editor._editSource && this.editor._getEditType() == 'series' && this.autoUpdateUntil) {
				var nstartDate = this.editor.util.mixDates(
						this.editor._dnode('sdate').value, this.editor._dnode('stime').value);
				var ostartDate = this.editor._editSource.recurrence.startDate;
				var offset = nstartDate.valueOf() - ostartDate.valueOf();
				var newUntil = new Date(this.editor._editSource.recurrence.until.valueOf() + offset);
				this._dnode('until').setGregorianDate(newUntil);
			}
		}
		
		this.onchangeHandler1 = dojo.connect(this.editor._dnode('sdate'), 'onChange', this, _moveRepeatUntilRuleOnStartDateUpdate);
		this.onchangeHandler2 = dojo.connect(this.editor._dnode('stime'), 'onChange', this, _moveRepeatUntilRuleOnStartDateUpdate);
		
		this._dnode('until').textbox.setAttribute("aria-label", this._lang.REPEATING_UNTIL);
		this._dnode('until').domNode.style.height = '20px';
		dojo.connect(this._dnode('until').textbox, 'onfocus', this, dojo.hitch(this, function(){this.showMessageForByDate();}));
	},
	
	showMessageForByDate: function(){
		if(this._node('rectype').value == 'monthly'){
			var selectedValue = this._node("recByDateType").value;
			if(this.isValidDate(selectedValue)) {
				 if(this.msgWidget) {
					 this.msgWidget.clear();
				 }
				
			} else {
				this.msgWidget = this.msgWidget ||  new lconn.calendar.UIMessage(
						{_lang: lconn.calendar.CalendarData.get()._lang}, this.byDateMessage);
				 this.msgWidget.clear();
				this.msgWidget.add(this._lang.MESSAGE_BY_DATE_SKIPPED, lconn.calendar.UIMessage.msgType.WARNING);
				this.msgWidget.showMessages();
			}
		}
	},
	
	isValidDate:function(selectedValue){
		if(this.editor.isNewEvent){
			var sd = this.editor._dnode('sdate').getGregorianDate(),
				ud = this._dnode('until').getGregorianDate(),
				mths = (ud.getFullYear() - sd.getFullYear()) * 12 + (ud.getMonth() - sd.getMonth()),
				minDays = dojo.date.getDaysInMonth(sd),
				date = sd;
			for(var i=1;i< mths ;i++){
				date = dojo.date.add(date,"month",1);
				var days = dojo.date.getDaysInMonth(date);
				if(minDays > days) minDays = days;
			};
			return selectedValue <= minDays;	
		}else{
			return selectedValue <= dojo.date.getDaysInMonth(this.editor._editSource.startDate);
		}
	},
	
	byDateClicked: function(){
		dojo.attr(this._node("recNthWeek"), "disabled", true);
		dojo.attr(this._node("recNthDay"), "disabled", true);
		dojo.attr(this._node("recByDateType"), "disabled", false);
	},
	
	byDayClicked: function(){
		dojo.attr(this._node("recNthWeek"), "disabled", false);
		dojo.attr(this._node("recNthDay"), "disabled", false);
		dojo.attr(this._node("recByDateType"), "disabled", true);
	},
	
	destroy: function() {
		dojo.disconnect(this.onchangeHandler1);
		dojo.disconnect(this.onchangeHandler2);
		
		if(this.msgWidget){
			this.msgWidget.clear();
		}
		
		this._dnode("until").destroy();
		
		this.inherited(arguments);
	},
	
	/**
	 * any recurrence type that needs special functionality has an entry here
	 * they all follow a simple interface, could be turned into classes in the future
	 * they are indexed by the tab name (from recurrence picker dropdown)
	 *
	 * here is the list of possible entries for a recurrence type
	 * valueName [required:string] the name of the value this type references in the event recurrence object
	 * frequency [optional:string] name to use for frequency in the recurrence object, uses key name by default
	 * hideRangePicker [optional:boolean] hides the range (until) picker, defaults to false
	 * init [optional:function] called when EventEditor is created
	 * onTab [optional:function] called when editor is tabbed to this type
	 * setValue [required:function] called when setting value from prepareForEdit
	 * getValue [required:function] get the value for editor's value method, 
	 * 	returns object to be mixed into event recurrence object
	 * clear [require:function] clear the dom nodes associated with this type
	 *
	 */
	recurrenceTypes: {
	  daily: {
         valueName: 'byday',
         hideRangePicker: true,
         init: function(recPicker) {
            this.picker =
               new lconn.calendar.WeekdayPicker({}, recPicker._node('recDaily'));
            this.touched = false;   
            this.picker.initOnChange();
         },
         onTab: function() {
            if (!this.touched) {
            	this.setValue('SU,MO,TU,WE,TH,FR,SA');
            }
         },
         setValue: function(dayString) {
            this.picker.setValue(dayString);
            this.touched = true; 
         },
         getValue: function() {
            return { byday: this.picker.getValue() };
         },
         clear: function() {
            this.picker.setValue('');
            this.touched = false;   
         }
      },
	  weekly: {
			valueName: 'byday',
			init: function(recPicker) {
				this.picker =
					new lconn.calendar.WeekdayPicker({}, recPicker._node('recWeekly'));
				this.touched = false;	
				this.picker.initOnChange();
			},
			onTab: function() {
				if (!this.touched) {
					var sdate = this.recPicker.editor._dnode('sdate').attr('value');	
					if (sdate) {
						this.setValue(this.recPicker.editor.data.weekdays[sdate.getDay()]);
					}
				}
			},
			setValue: function(dayString) {
				this.picker.setValue(dayString);
				this.touched = true;	
			},
			getValue: function() {
				return { byday: this.picker.getValue() };
			},
			clear: function() {
				this.picker.setValue('');
				this.touched = false;	
			}
	},
	monthly: {
		valueName: 'byday',
		hideRangePicker:true,
		init: function(recPicker) {
			this.picker =
				new lconn.calendar.MonthdayPicker({recNthWeekNode: recPicker._node("recNthWeek"),
												   recNthDay:recPicker._node("recNthDay"),
												   recByDateType:recPicker._node("recByDateType"),
												  checkMonthlyByDate:recPicker._node("checkByDateMonthly"),
												  checkMonthlyByDay:recPicker._node("checkByDayMonthly")
												  });
			this.touched = false;	
			this.picker.initOnChange();
		},
		onTab: function() {
			if (!this.touched) {
				var sdate = this.recPicker.editor._dnode('sdate').attr('value');	
				if (sdate) {
					this.setValue(sdate.getDate());
				}
			}
		},
		setValue: function(dayString) {
			this.picker.setValue(dayString);
			this.touched = true;	
		},
		getValue: function() {
			return { byday: this.picker.getValue() };
		},
		clear: function() {
			this.picker.setValue('');
			this.touched = false;	
		}
	}
	},
	
	/**
	 * returns function that appends single/plural noun to number
	 * needs localization
	 * @argument single the singular form of noun
	 * @argument plural the plural form of noun
	 */
	xNoun: function(single, plural) {
		return function(n) {
			
			return (n == 1 ? single : n+' '+ plural);
		}
	},

	/**
	 * returns a function to generate options in a select box
	 * @argument min the min integer value
	 * @argument max the max value
	 * @argument format function used to format the current integer
	 */
	optionMaker: function(min, max, format) {
		var s = ['', this._lang.REPEAT_FREQUENCY_ONEWEEK, 
		         this._lang.REPEAT_FREQUENCY_TWOWEEKS, this._lang.REPEAT_FREQUENCY_THREEWEEKS,
		         this._lang.REPEAT_FREQUENCY_FOURWEEKS, this._lang.REPEAT_FREQUENCY_FIVEWEEKS];
		
		return function(select, value) {
			// make sure it is empty
			while (select.firstChild)
				select.removeChild(select.firstChild);

			var selectedIndex = 0;
			var increment = 0;
			for (var i = min; i <= max; i++) {
				var o = document.createElement('option');
				o.value = i;
				o.innerHTML = s[i];
				select.appendChild(o);

				if (value == i) selectedIndex = increment;
				increment++;
			}

			select.selectedIndex = selectedIndex;
		};
	}
});

dojo.declare("lconn.calendar.WeekdayPicker", null, {
	domNode: null,
	data: null,

	constructor: function(args, baseNode) {
		dojo.mixin(this, args);
		lconn.calendar.CalendarData.get().mixin(this);
		this.buildNode(baseNode);
	}, 

	/**
    * Create the dom node for week picker, optionally uses a base node
    * @argument baseNode optional node to use to build picker in
    * @return the dom node
    */
	buildNode: function(baseNode) {
		var c = baseNode || document.createElement('div'); 
		var id = 'wp_'+(new Date().getTime());
		      
		var pickerLabel = document.createElement('td');
		dojo.addClass(pickerLabel, 'recEntryFormLabel');
		pickerLabel.innerHTML = '<label id="'+id+ '-on" class="repeatLabelPicker">'+this._lang.ON+'</label>';
		c.appendChild(pickerLabel);
		      
		var nodes = [];
		var labelNodes = [];
		var selectionNodes = [];
		       
		var parentTD = document.createElement('td');
		var table = document.createElement('table');
//		table.style.width = '1px';
		table.style.width = 'auto';
		dojo.addClass(table, "lotusTable");
		dojo.addClass(table, "recWeekdayPicker");
		dojo.addClass(table, "dijitInlineTable");
		table.setAttribute("role", "presentation");
		
		var labelRow = table.insertRow(0);
		
		var selectionRow = table.insertRow(1);
		selectionRow.setAttribute("role", "group");
		selectionRow.setAttribute("aria-label", this._lang.REPEATING_ON);
		      
		var w = dojo.cldr.supplemental.getFirstDayOfWeek();
		for (var k = 0; k < this.data.weekdays.length; k++) {
			var weekday = this.data.weekdays[w];
			var wid = id+'-'+weekday;
			var headerID = "header_"+ wid;
			selectionCell = selectionRow.insertCell(k);
			selectionCell.innerHTML = '<input role="checkbox" aria-checked="false" weekday="'+weekday+'" type="checkbox" id="'+wid+'" aria-label="' + this._lang[weekday + "_FULL"] + '" />';
			labelCell = document.createElement('td');
			labelRow.appendChild(labelCell);
			labelCell.innerHTML = '<label style="text-align:center;">'+this._lang[weekday]+'</label>&nbsp;';
			w = (w+1) % this.data.weekdays.length;
		
		}
		parentTD.appendChild(table);
		c.appendChild(parentTD);

		this.id = id;
		return this.domNode = c;
	},
	
	initOnChange: function() {
		dojo.query('input', this.domNode).forEach(function(input) {
			dojo.connect(input ,'click', function(){
				input.setAttribute("aria-checked", input.checked);
			});
		});
	},

	/**
	* Get value of weekday picker
	* @return example output: TU,WE
	*/
	getValue: function() {
		var days = [];
		dojo.query('input', this.domNode).forEach(function(i) {
			if (i.checked) days.push(i.getAttribute('weekday'));
		});

		return days.join(',');
	},

	/**
	* Set value of weekday picker
	* @argument dayString sting of days in form: MO,WE,FR
	* @see CalendarData for weekday names
	*/
	setValue: function(dayString) {
		var days = dayString.split(',');
		dojo.query('input', this.domNode).forEach(function(input) {
			var checked = false;
			for (var i = 0; i < days.length; i++) {
				if (input.getAttribute('weekday') == days[i]) {
					checked = true;
					break;
				} else checked = false;
			}
			input.checked = checked;
			input.setAttribute("aria-checked", checked);
		});
	},

	/**
	* Clear any selected days
	*/
	clear: function() { this.setValue(''); }
});