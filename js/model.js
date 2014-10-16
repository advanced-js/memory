/* Model - holds the state of the game
*
* 1. Which tiles are what color (grid configuration)
* 2. Which tiles still exist
* 3. Which tiles are flipped over
*
*/

var Memory = window.Memory = window.Memory || {};

Memory.Model = function() {
	this.colors = _.shuffle(['red', 'red', 'orange', 'orange', 'yellow', 'yellow', 'green', 'green', 'blue', 'blue', 'purple', 'purple', 'black', 'black', 'pink', 'pink']);
	this.clicked = [];
	this.view = new Memory.View(this.colors);
};

Memory.Model.prototype.takeGuess = function(guess) {
	var clicked = this.clicked;
	if (clicked.length < 2) {
		var card = guess.target;
		clicked.push(card.className);
		this.view.changeColor($(card), card.className);

		if (clicked.length === 2) {
			if (clicked[0] === clicked[1]) {
				setTimeout(function(){
					this.view.changeOpacity($('.' + card.className), 0)
				}.bind(this), 500);
			}
			setTimeout(function() {
				this.view.changeColor($('.' + clicked[0]), '#CCC');
				this.view.changeColor($('.' + clicked[1]), '#CCC');
				this.clicked = [];
			}.bind(this), 750);
		}
	}
}

Memory.Model.prototype.resetBoard = function(colors) {
	
	$('.container').empty();
	console.log(this);
	$(this).empty();
	console.log(this);
};







