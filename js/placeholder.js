/*!
 * jQuery Placeholder plugin
 *
 * This plugin is used to support the HTML5 placeholder attribute on most non-HTML5-compliant browsers.
 * 
 * Usage: $.Placeholder.init({ color : "rgb(0,0,0)" });
 * 
 * Date: Sept 2011
 * Author: Otacon (byf1987_at_gmail.com)
 * Project page: https://code.google.com/p/jquery-placeholder-js/
 * Version: 1.1
 * Changelog: 
	1.0 Initial release
	1.1	Updated the code to meet jQuery plugin format. Enabled parameterized init.
 * Tested on: Chrome 10.0; IE6 (IETester); IE8 (IETester)
 * Known Issues: 
 * 	Placeholder for Password is currently not supported
 */
//modify:add password support
(function($){ 
	$.Placeholder = {
		settings : {
			color : "rgb(172,168,153)", // darkGrey does not work in ie
			dataName : "original-font-color" // the name of the data tag used by this module
		},
		
		// -- Bind event to components --
		init : function(settings){
			// Merge default settings with the ones provided
			if(settings)
			{
				$.extend($.Placeholder.settings, settings);
			}
			
			// -- Util Methods --	
			var getContent = function(element){
				return $(element).val();		
			};
		
			var setContent = function(element, content){
				$(element).val(content);		
			};
			
			var getPlaceholder = function(element){
				return $(element).attr("placeholder");
			};
			
			var isContentEmpty = function(element){
				var content = getContent(element);
				return (content.length === 0) || content == getPlaceholder(element);
			};
				
			var setPlaceholderStyle = function(element){
				$(element).data($.Placeholder.settings.dataName, $(element).css("color"));
				$(element).css("color", $.Placeholder.settings.color);		
			};
			
			var clearPlaceholderStyle = function(element){
				$(element).css("color", $(element).data($.Placeholder.settings.dataName));		
				$(element).removeData($.Placeholder.settings.dataName);
			};
			
			var showPlaceholder = function(element){
				setContent(element, getPlaceholder(element));
				setPlaceholderStyle(element);	
			};
			
			var hidePlaceholder = function(element){
				if($(element).data($.Placeholder.settings.dataName)){
					setContent(element, "");
					clearPlaceholderStyle(element);
				}
			};
			
			// -- Event Handlers --
			var inputFocused = function(){
				if(isContentEmpty(this)){
					hidePlaceholder(this);
					setPos(this,0);
				}else{
					setPos(this,this.value.length);
				}
			};
			
			var inputBlurred = function(){
				if(isContentEmpty(this)){
					showPlaceholder(this);
				}
			};
			
			var parentFormSubmitted = function(){
				if(isContentEmpty(this)){
					hidePlaceholder(this);		
				}	
			};
			
			var setPos = function(text,pos){
				var start = end = pos;
				if(text.setSelectionRange){
					text.focus();
					setTimeout(function(){text.setSelectionRange(start,end);});
				}else if(text.createTextRange){
					var range = text.createTextRange();
					range.collapse(true);
					range.moveEnd('character',end);
					range.moveStart('character',start);
					range.select();
				}
			};
			
			// -- Execution --
			$("textarea, input[type='text']").filter("[placeholder]").each(function(index, element){
				if($(element).attr("placeholder")){
					$(element).focus(inputFocused);
					$(element).blur(inputBlurred);
					$(element).bind("parentformsubmitted", parentFormSubmitted);
					
					// triggers show place holder on module init
					$(element).trigger("blur");
					// triggers form submitted event on parent form submit
					$(element).parents("form").submit(function(){
						$(element).trigger("parentformsubmitted");
					});
				}
			});
			$("input[type='password']").filter("[placeholder]").each(function(index, element){
				var _ = $(this);
				var clone = $('<input type="text" />').attr({"clone":"password"}).addClass($("#password").attr("class")).val($(this).attr("placeholder")).css({color:$.Placeholder.settings.color,display:"none"}).attr('tabindex',$("#password").attr("tabindex"));
				$(this).parent().append(clone);
				if(_.val()==""){
					$(this).css("display","none");
					clone.css("display","");
				}
				clone.focus(function(){
					if(_.val()==""){
						_.css("display","");
						$(this).css("display","none");
						setTimeout(function(){
							_.focus();
						});
					}
				});
				_.focus(function(){
					var $this = $(this).get(0);
					setPos($this,$(this).val().length);
				});
				$(this).blur(function(){
					if(_.val()==""){
						clone.css("display","");
						$(this).css("display","none");
					}
				});
				//与focus配对使用
				window.onbeforeunload = function(){
					/*if(document.activeElement){
						document.activeElement.blur();
					}*/
				};
			});
			return this;
		}
	}
})(jQuery);
//$.Placeholder plugin
$.Placeholder.init();