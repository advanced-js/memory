// View - Errthang you see (Model tells View what to do)

var Memory = window.Memory = window.Memory || {};

Memory.View = function(colors) {
	for(var i = 0; i < 16; ++i ) {
		var markup = '<article class="' + colors[i] + '"></article>';
		$('.container').append(markup);
	}
};

Memory.View.prototype.changeColor = function(elem, color) {
	elem.css('background-color', color);
};

Memory.View.prototype.changeOpacity = function(elem, opacity) {
	elem.css('opacity', opacity);
};