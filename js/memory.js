$(document).ready(function() {

	(function() {
		'use strict';

		var cardAlreadyShowing = null;
		var totalTries = 0;
		var $boardEl = $('#board');

		/**
		 * Card constructor
		 *
		 * @constructor
		 * @param {string} color The color to make this card
		 */
		var Card = function(color) {
			this.color = color;
		};

		Card.prototype.createEl = function() {
			var thisCard = this;
			this.cardEl = $('<div>')
				.addClass('each-card')
				.data('background-color', this.color)
				.on('click', function () {
					thisCard.showCard();
					if (cardAlreadyShowing) {
						thisCard.checkForMatch(thisCard);
					} else {
						cardAlreadyShowing = thisCard;
					}
				});
			return this.cardEl;
		};

		Card.prototype.showCard = function() {
			this.cardEl.css('background-color', this.cardEl.data('background-color'));
		};

		Card.prototype.hideCard = function() {
			this.cardEl.css('background-color', '#ccc');
		};

		Card.prototype.removeFromPlay = function() {
			this.cardEl.addClass('out-of-play');
		};

		Card.prototype.checkForMatch = function(thisCard) {
			$boardEl.addClass('checking'); // disable clicks while processing
			if (thisCard !== cardAlreadyShowing && thisCard.color === cardAlreadyShowing.color) {
				/* if they clicked on two (different) cards of the same color */
				this.handleMatch(thisCard);
			} else {
				this.handleMismatch(thisCard);
			}
			totalTries++;
			if ($('.out-of-play').length === $('.each-card').length) {
				alert('Congratulations, you won! It took you ' + totalTries + ' tries.');
			}
		};

		Card.prototype.handleMatch = function(thisCard) {
			alert('Hooray, you found a match!');
			thisCard.removeFromPlay();
			cardAlreadyShowing.removeFromPlay();
			cardAlreadyShowing = null;
			$boardEl.removeClass('checking');
		};

		Card.prototype.handleMismatch = function(thisCard) {
			/* show colors for one second, then hide again */
			setTimeout(function() {
				thisCard.hideCard();
				cardAlreadyShowing.hideCard();
				cardAlreadyShowing = null;
				$boardEl.removeClass('checking');
			}, 1000);
		};

		/**
		 * Deck constructor
		 *
		 * @constructor
		 * @param {number} totalCardCount The number of cards to put in the deck
		 */
		var Deck = function(totalCardCount) {
			this.cards = [];
			this.totalCardCount = totalCardCount;
		};

		Deck.prototype.build = function() {
			var color = this.getNextColor();
			for (var i = 0; i < this.totalCardCount; i++) {
				if (i % 2 === 0) {
					color = this.getNextColor();
				}
				this.cards.push(new Card(color));
			}
		};

		Deck.prototype.shuffle = function() {
			/* from http://stackoverflow.com/a/18650169/3557749 */
			this.cards = this.cards.sort(function() {
				return 0.5 - Math.random();
			});
		};

		Deck.prototype.getNextColor = function() {
			var redVal = Math.floor(Math.random() * 256);
			var greenVal = Math.floor(Math.random() * 256);
			var blueVal = Math.floor(Math.random() * 256);
			return 'rgba(' + redVal + ',' + greenVal + ',' + blueVal + ', 0.7)';
		};

		/**
		 * Board constructor
		 *
		 * @constructor
		 * @param {number} size The number of cards on one side of the square
		 */
		var Board = function(size) {
			this.size = size;
			this.cardsShown = [];
			this.totalCardCount = this.size * this.size;
		};

		Board.prototype.dealBoard = function() {
			var deck = new Deck(this.totalCardCount);
			deck.build();
			deck.shuffle();
			for (var i = 0; i < this.size; i++) {
				for (var j = 0; j < this.size; j++) {
					var thisCard = deck.cards.pop();
					$boardEl.append(thisCard.createEl());
				}
				$boardEl.append('<br>');
			}
		};

		var memoryBoard = new Board(4);
		memoryBoard.dealBoard();
	})();
});
