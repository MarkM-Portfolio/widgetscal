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

dojo.provide("dwa.date.showCalendarListPicker");

dojo.setObject("dwa.date.showCalendarListPicker", function(/*dwa.date.monthpick | dwa.date.yearpick*/ cls, /*String*/ type, /*String*/ offset){
		return function(/*dwa.date.datepick*/ oParent, /*DomNode*/ oTarget, /*String*/ sAlignDefault){
			var sId = oParent.sId + "-" + type + "pick";
			var oWidget = dijit.byId(sId);
			if(!oWidget){
				var oPickerNode = dojo.doc.createElement('DIV');
				oPickerNode.setAttribute("id", sId);
				oPickerNode.setAttribute("com_ibm_dwa_ui_" + type + "pick_startOffset", offset);
				oPickerNode.setAttribute("com_ibm_dwa_misc_observes_calendar", 
					(oParent.com_ibm_dwa_misc_observes_calendar_navigate ? oParent.com_ibm_dwa_misc_observes_calendar_navigate : oParent.com_ibm_dwa_misc_observes_calendar));
				dojo.doc.body.appendChild(oPickerNode);
				oWidget = oParent[type + "Picker"] = new cls(null, oPickerNode);
				oWidget.startup();
			}else{
				oWidget.refresh();
			}
			dijit.popup.open({
				popup: oWidget,
				parent: oParent,
				around: oTarget,
				onCancel: function(){dijit.popup.close(oWidget);}
			});
			var top = Math.max(-1 * dojo.position(oTarget).y - dojo.marginBox(oTarget).h,
				-1 * (dojo.marginBox(oTarget).h + dojo.marginBox(oWidget.menu.domNode).h) / 2);
			oWidget.domNode.style.cssText = "position:relative;"
				 + sAlignDefault + ":" + dojo.marginBox(oTarget).w + "px;top:" + top + "px;";
			oParent.connect(oWidget, "entrySelected", function(){dijit.popup.close(oWidget);});
			oParent.connect(oParent, "navigate", function(){dijit.popup.close(oWidget);});
		};
	});
