(function($) {
	$.fn.ruler = function(){
		/*
		Settings
		- min-width: 30
		- default-width: 300
		- draggable: true/false (default: true)
		- resizable: true/false (default: true)
		- auto-resize: true/false (default: false)

		Future
		- deafult-rientation: horizontal/vertical (default: horizontal)
		- unit: px, mm, cm, in, em (default: px)
		*/
		return this.each(function() {
			var ruler = $(this).addClass('ruler');
			var width = $(window).width();
			var ruler_wrapper = ruler.html('<div class="ruler-wrapper"></div>').find('.ruler-wrapper');
			var class_name = 'ruler-two_px';
			var ruler_drag_active = false;
			var moveOffsetX = 0;
			var moveOffsetY = 0;
			for(var i=0;i<=width;i+=2){
				if((i + 2)%10 == 0){
					if((i + 2)%20 == 0){
						class_name = 'ruler-ten_px ruler-twenty_px';
					}else{
						class_name = 'ruler-ten_px';
					}
				}else{
					class_name = 'ruler-two_px';
				}
				ruler_wrapper.append('<div class="'+class_name+'" style="left: '+i+'px"></div>');
				if(i%20 == 0){
					//class_name = 'ten_px';
					ruler_wrapper.append('<div class="ruler-label" style="left: '+i+'px">'+i+'</div>');
				}
			}
			ruler.bind('mousedown',function(e){
				ruler_drag_active = true;
				moveOffsetX = e.pageX - ruler.offset().left;
				moveOffsetY = e.pageY - ruler.offset().top;
			}).bind('selectstart',function(){
				return false;
			});

			$(document).bind('mousemove',function(e){
				if(ruler_drag_active){
					//console.log('y: '+e.offsetY+' x: '+e.offsetX);
					//console.log(e);
					//console.log(e.pageX+' offset: '+ruler.offset().left);
					ruler.css({
						top: e.pageY - moveOffsetY,
						left: e.pageX - moveOffsetX
					});
				}
				return false;
			}).bind('mouseup',function(){
				ruler_drag_active = false;
			});
			//ruler.draggable();
			//ruler.resizable({ handles: 'e' });
		});
	}
})(jQuery);