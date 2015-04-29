(function() {
	'use strict';

	var cardAlreadyShowing = null;
	var totalTries = 0;

	var checkForMatch = function(thisCard) {
		$('#board').addClass('checking'); // disable clicks while processing
		if (thisCard !== cardAlreadyShowing && thisCard.color === cardAlreadyShowing.color) {
			/* if they clicked on two (different) cards of the same color */
			handleMatch(thisCard)
		} else {
			handleMismatch(thisCard);
		}
		totalTries++;
		if ($('.out-of-play').length === $('.each-card').length) {
			alert('Congratulations, you won! It took you ' + totalTries + ' tries.');
		}
	};

	var handleMatch = function(thisCard) {
		alert('Hooray, you found a match!');
		thisCard.removeFromPlay();
		cardAlreadyShowing.removeFromPlay();
		cardAlreadyShowing = null;
		$('#board').removeClass('checking');
	};

	var handleMismatch = function(thisCard) {
		/* show colors for one second, then hide again */
		setTimeout(function() {
			thisCard.hideCard();
			cardAlreadyShowing.hideCard();
			cardAlreadyShowing = null;
			$('#board').removeClass('checking');
		}, 1000);
	};

	var getNextColor = function() {
		var redVal = Math.floor(Math.random() * 256);
		var greenVal = Math.floor(Math.random() * 256);
		var blueVal = Math.floor(Math.random() * 256);
		return 'rgba(' + redVal + ',' + greenVal + ',' + blueVal + ', 0.7)';
	};

	/**
	 * Card constructor
	 *
	 * @constructor
	 * @param {string} color The color to make this card
	 */
	var Card = function(color) {
		var thisCard = this;

		this.color = color;
		this.create = function() {
			this.cardEl = $('<div>')
				.addClass('each-card')
				.data('background-color', color)
				.on('click', function () {
					thisCard.showCard();
					if (cardAlreadyShowing) {
						checkForMatch(thisCard);
					} else {
						cardAlreadyShowing = thisCard;
					}
				});
			return this.cardEl;
		};
		this.showCard = function() {
			this.cardEl.css('background-color', this.cardEl.data('background-color'));
		};
		this.hideCard = function() {
			this.cardEl.css('background-color', '#ccc');
		};
		this.removeFromPlay = function() {
			this.cardEl.addClass('out-of-play');
		};
	};

	/**
	 * Deck constructor
	 *
	 * @constructor
	 * @param {number} totalCardCount The number of cards to put in the deck
	 */
	var Deck = function(totalCardCount) {
		this.cards = [];
		this.create = function() {
			var color = getNextColor();
			for (var i = 0; i < totalCardCount; i++) {
				if (i % 2 === 0) {
					color = getNextColor();
				}
				this.cards.push(new Card(color));
			}
		};
		this.shuffle = function() {
			this.cards = this.cards.sort(function() {
		  		return 0.5 - Math.random();
			});
		};
	};

	/**
	 * Board constructor
	 *
	 * @constructor
	 * @param {number} size The number of cards on one side of the square
	 */
	var Board = function(size) {
		this.size = size;
		this.$boardEl = $('#board');
		this.cardsShown = [];
		this.totalCardCount = this.size * this.size;
		this.dealBoard = function() {
			var deck = new Deck(this.totalCardCount);
			deck.create();
			deck.shuffle();
			for (var i = 0; i < size; i++) {
				for (var j = 0; j < size; j++) {
					var thisCard = deck.cards.pop();
					this.$boardEl.append(thisCard.create());
				}
				this.$boardEl.append('<br>');
			}		
		};
	};

	$(document).ready(function() {
		var memoryBoard = new Board(4);
		memoryBoard.dealBoard();
	});

})();