
/*
 * jQuery ruler v1.0
 * Copyright 2012, Alexander Teglund
 * Licensed under the MIT license
 *
 * Date: 2012-01-14
 *
 * TODO: Future options
 * - mousePosition: true/false (default: true - show the exact mouse position n the ruler, follow mouse)
 * - orientation: horizontal/vertical (default: horizontal - change orientation on click)
 * - unit: px, mm, cm, in, em, ex, pt, pc (default: px)
*/

(function($) {
	$.fn.ruler = function(options){
		/* Options and their default values */
		var defaults = {
			minWidth:	30,
			maxWidth:	screen.width, /* window width: $(window).width() */
			width:		300,
			draggable:	true,
			resizable:	true,
			autoResize:	false
		};

		var options = $.extend({}, defaults, options);

		return this.each(function() {
			var ruler = $(this)
				.addClass('ruler')
				.css({
					minWidth: options.minWidth,
					maxWidth: options.maxWidth,
					width: options.width
				});
			var ruler_wrapper = ruler.html('<div class="ruler-wrapper"></div>').find('.ruler-wrapper');
			var class_name = 'ruler-small_line';
			var ruler_drag_active = false;
			var ruler_resize_active = options.autoResize;
			var moveOffsetX = 0;
			var moveOffsetY = 0;
			if(!options.autoResize){
				ruler_wrapper.append('<div class="ruler-resize"></div>');
			}
			for(var i=0;i<=options.maxWidth;i+=2){
				if((i + 2)%10 == 0){
					if((i + 2)%20 == 0){
						class_name = 'ruler-large_line';
					}else{
						class_name = 'ruler-medium_line';
					}
				}else{
					class_name = 'ruler-small_line';
				}
				ruler_wrapper.append('<div class="'+class_name+'" style="left: '+i+'px"></div>');
				if(i%20 == 0){
					ruler_wrapper.append('<div class="ruler-label" style="left: '+i+'px">'+i+'</div>');
				}
			}

			if(options.draggable){
				ruler.addClass('ruler-draggable')
				.bind('mousedown',function(e){
					ruler_drag_active = true;
					moveOffsetX = e.pageX - ruler.offset().left;
					moveOffsetY = e.pageY - ruler.offset().top;
					return false;
				});
			}
			if(options.resizable){
				ruler.find('.ruler-resize').bind('mousedown',function(e){
					ruler_resize_active = true;
					return false;
				});
			}

			if(options.draggable || options.resizable){
				$(document).bind('mousemove',function(e){
					if(options.draggable && ruler_drag_active){
						ruler.css({
							top: e.pageY - moveOffsetY,
							left: e.pageX - moveOffsetX
						});
					}else if(options.resizable && ruler_resize_active){
						ruler.css({
							width: e.pageX - ruler.offset().left
						});
					}
					return false;
				}).bind('mouseup',function(){
					ruler_drag_active = false;
					if(!options.autoResize){
						ruler_resize_active = false;
					}
				});
			}

			ruler.bind('selectstart',function(){
				return false;
			});
		});
	}
})(jQuery);