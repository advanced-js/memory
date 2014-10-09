(function($) {
	var colors = ['red', 'red', 'orange', 'orange', 'yellow', 'yellow', 'green', 'green', 'blue', 'blue', 'purple', 'purple', 'black', 'black', 'pink', 'pink'];
	var clicked = [];
	var index = 0;
	var colors = _.shuffle(colors);
	for(var i = 0; i < 16; ++i ) {
		var markup = '<article class=" ' + colors[i] + '"></article>';
		$('.container').append(markup);
	}

	$('article').click(function(){
		// console.log(clicked.length);
		if(clicked.length <= 1) {
			var view = this;
			clicked[index] = $.trim($(view).attr('class'));
			var color = $(view).attr('class');

			// console.log(clicked);

			$(view).css('background-color', color);

			// flip flop the index
			if(index === 0) {
				index = 1;
			} else {
				// hide both cards when they are equal
				if(clicked[0] === clicked[1]){
					color = '.' + $.trim(color);
					setTimeout(function(){
						$(color).css('opacity', '0');
					}, 500);
					clicked = [];
				}
				// Flip the cards back
				setTimeout(function(){
					$("." + clicked[0]).css('background-color', '#CCC');
					$(view).css('background-color', '#CCC');
					clicked = [];
				}, 750);
				index = 0;
			}
		} else {
			$('article').click(false);
		}
	});

}(jQuery));