(function($) {

	var MemoryGame = function() {
	this.colors = ['AA26FF', 'AA26FF', 'AAE4FF', 'AAE4FF', 'AAE457', 'AAE457', 'DB3270', 'DB3270', '2BDB93', '2BDB93', 'FF0000', 'FF0000', '000000', '000000', '1784FF', '1784FF'];
	this.clicked = [];
	this.index = 0;
	this.score = 0;

}; // end memory game

MemoryGame.prototype.shuffleColors = function() {
	this.colors = _.shuffle(this.colors);
};
MemoryGame.prototype.renderBoard = function() {
	this.shuffleColors();
	for(var i = 0; i < 16; ++i ) {
		var markup = '<article class="' + this.colors[i] + '"></article>';
		$('.container').append(markup);
	}
};
MemoryGame.prototype.updateScore = function() {
	this.score += 10;
};
MemoryGame.prototype.showScore = function() {
	$('.score').empty()
			   .append(this.score);
};

MemoryGame.prototype.registerEvents = function() {
	var view = this;
	$('article').click(function() {
		// You can't click on empty items
		if($(this).css('opacity') === '0') {
			return;
		}

		if(view.clicked.length <= 1) {
			view.clicked[view.index] = $(this).attr('class');
			var color = $(this).attr('class');
			$(this).css('background-color', '#' + color);

			// flip flop the index
			if(view.index === 0) {
				view.index = 1;
			} else {
				// hide both cards when they are equal
				if(view.clicked[0] === view.clicked[1]){
					color = '.' + color;
					setTimeout(function(){
						$(color).css('opacity', '0');
					}, 500);
					view.clicked = [];
					view.updateScore();
					view.showScore();
				}
				var self = this;
				// Flip the cards back
				setTimeout(function(){
					$("." + view.clicked[0]).css('background-color', '#CCC');
					$(self).css('background-color', '#CCC');
					view.clicked = [];
				}, 750);
				view.index = 0;
			}
		} else {
			$('article').click(false);
		}
	});
};
var game = new MemoryGame();
	game.renderBoard();
	game.showScore();
	game.registerEvents();

}(jQuery));