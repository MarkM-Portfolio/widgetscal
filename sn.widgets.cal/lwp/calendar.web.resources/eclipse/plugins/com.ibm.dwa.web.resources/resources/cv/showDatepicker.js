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

dojo.provide("dwa.cv.showDatepicker");
dojo.require("dwa.common.commonProperty");
dojo.require("dwa.date.datepick");

dojo.setObject("dwa.cv.showDatepicker", function(/*dwa.cv.calendarView*/ oParent, /*DomNode*/ oTarget, /*Boolean?*/ bCentering, /*String?*/ sTargetProp){
		dwa.common.commonProperty.get('p-e-calendarview-navigate').setValue(oParent.oCalendar.getISO8601String());
		var sId = oParent.sId + '-calendar-datepick';
		var oWidget = dijit.byId(sId);
		if(!oWidget){
			var oDatePickNode = dojo.doc.createElement("DIV");
			oDatePickNode.id = sId;
			oDatePickNode.setAttribute("com_ibm_dwa_datepick_focus_on_close", oParent.sId + '-navigator-current');
			oDatePickNode.setAttribute("com_ibm_dwa_misc_observes_calendar", "p-e-calendarview-currentselected");
			oDatePickNode.setAttribute("com_ibm_dwa_misc_observes_calendar_navigate", "p-e-calendarview-navigate");
			oDatePickNode.setAttribute("com_ibm_dwa_ui_datepick_dropdown", "true");
			oDatePickNode.style.cssText = "width:8.5em;height:8.1em;border:1px solid black;";
			oDatePickNode.className = "s-basicpanel";
			oParent.domNode.appendChild(oDatePickNode);
			oWidget = new dwa.date.datepick(null, oDatePickNode);
			oParent.datePicker = oWidget;
			oWidget.startup();
			if(bCentering){
				oWidget.domNode.style[oParent.isLeftToRight() ? "left" : "right"] = (dojo.marginBox(oTarget).w - dojo.marginBox(oWidget.domNode).w) / 2 + "px";
			}
		}
		dijit.popup.open({
			popup: oWidget,
			parent: oParent,
			around: oTarget
		});
		oWidget.focusToBody();
	});
