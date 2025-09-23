/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

(function() {
	dojo.provide("lconn.calendar.ckeditor");
	dojo.require("lconn.core.ckeditor");
	
	lconn.calendar.ckeditor = {
		doInitCKEditorConfig: function(opts) {
			dojo.mixin(opts, {
				toolbar: [
				      	{ name: 'tools',		items :['Undo','Redo','MenuPaste','LotusSpellChecker','IbmPermanentPen']},
				    	{ name: 'styles',		items :['Font','FontSize','Bold','Italic','Underline','Strike','TextColor','BGColor','CopyFormatting']},
				    	{ name: 'paragraph',	items :['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock', 'NumberedList','BulletedList','Indent','Outdent','BidiLtr','BidiRtl','Language']},
				    	{ name: 'insert',		items :['Table','Image','Embed','MenuLink','Anchor','Smiley']}
				    ],
				language : djConfig.locale,
				resize_enabled : false,
				height : '10em',
				toolbarCanCollapse : false,
				ibmMentionDisabled : false,
			
				/* Do not disable browser native spell checker highlighting */
				disableNativeSpellChecker  :  false,
			
				/* Update for background color */
				dialog_backgroundCoverColor  :  'black',
				dialog_backgroundCoverOpacity  :  0.3		
			});
			opts.menus.link = {buttonClass:"cke_button_link", commands:["link","linkToFiles","bookmark"]};
		}	
	};
	
})();
