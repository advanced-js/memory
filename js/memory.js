(function() {
	var Card = function(color) {
		this.color = color;
		this.cardEl = $('<div>').addClass('each-card').data('background-color', color);
		this.create = function() {
			return this.cardEl;
		};
		this.show = function() {
			this.cardEl.css('background-color', this.data('background-color'));

		};
		this.hide = function() {
			this.cardEl.css('background-color', '#ccc');
		};
	};

	var Board = function(size) {
		/* size represents number of cards on one side of the square */
		this.size = size;
		this.board = $('#board');
		this.cards = [];
		this.cardsShowing = [];
		this.totalCardCount = this.size * this.size;
		this.createDeck = function() {
			var newCard;
			var color = getRandomColor();
			var totalCardCount = size * size;	
			for (var i = 0; i < this.totalCardCount; i++) {
				if (!(i % 2)) {
					color = getRandomColor();
				}
				newCard = new Card(color);
				newCard.cardEl.on('click', function() {
					$(this).css('background-color', $(this).data('background-color'));
				});
				this.cards.push(newCard);
			}
		};
		this.shuffleDeck = function() {
			this.cards = this.cards.sort(function() {
		  		return .5 - Math.random();
			});
		};
		this.dealBoard = function() {
			this.createDeck();
			this.shuffleDeck();
			for (var i = 0; i < size; i++) {
				for (var j = 0; j < size; j++) {
					var thisCard = this.cards.pop();
					this.board.append(thisCard.create());
				}
				this.board.append('<br>');
			}		
		};
	};

	var getRandomColor = function() {
		var redVal = Math.floor(Math.random() * 255);
		var greenVal = Math.floor(Math.random() * 255);
		var blueVal = Math.floor(Math.random() * 255);
		var opacity = 0.5;
		return 'rgba(' + redVal + ',' + greenVal + ',' + blueVal + ',' + opacity + ')';
	};

	$(document).ready(function() {
		var memoryBoard = new Board(4);
		memoryBoard.dealBoard();
	});

})();