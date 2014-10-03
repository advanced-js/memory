(function($) {
	var colors = ['red', 'red', 'orange', 'orange', 'yellow', 'yellow', 'green', 'green', 'blue', 'blue', 'purple', 'purple', 'black', 'black', 'pink', 'pink'];
	var clicked = ['',''];
	var index = 0;
	var colors = _.shuffle(colors);
	var x =0;
	for(var i = 0; i < 16; ++i ) {
		var markup = '<div class="card ' + colors[i] + '"></div>';
		$('.container').append(markup);
	}

	clickCard = function() {
		$('.card').click(function(){
			var color = $(this).attr('class').split(' ')[1];
			var view = this;
			$(this).css('background-color', color);
			clicked[index] = color;

			// flip flop the index
			if(index === 0) {
				index = 1;
			} else {
				// disable click
				$('.card').off('click');

				// hide both cards when they are equal
				if(clicked[0] === clicked[1]){
					color = '.' + color;
					setTimeout(function(){
						$(color).css('opacity', '0');
					}, 500);
				}
				// Timeout
				setTimeout(function(){
					clicked[0] = '.' + clicked[0];
					$(clicked[0]).css('background-color', '#CCC');

					$(view).css('background-color', '#CCC');

					clicked[0] = '';
					clicked[1] = '';

				}, 1000);

				index = 0;
				$('.card').on('click', clickCard);
			}
		});
	};
	
clickCard();
}(jQuery));