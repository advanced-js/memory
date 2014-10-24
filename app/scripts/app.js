
var app = angular.module('memoryApp', [
    'ngAnimate'
  ]);


app.factory('game', function(){
		var game = new Game(4);
    game.getNumberPairs();
    var nums = game.numberPairs;
    var cards = game.numberPairs.length;
    
    return game;
});

app.controller('GameControl', function GameControl($scope, game){
	$scope.game = game;
});

app.directive('flipcard', function() {
  return {
    restrict: 'E',
    // templateUrl: '../directives/card.html',
    scope: {},
    link: function($scope, $elem, $attrs) {

      // flipping effect
      var flip = function() {
        $elem.toggleClass('flipped');
      };
    }
  };
});

var Card = function(number) {
	this.number = number;
	this.flipped = false;
};

var Game = function(cardAmount){
		this.cardAmount = cardAmount;
		this.numberPairs = [];
		this.player = "player 1";
		this.playerOneScore = 0;
		this.playerTwoScore = 0;
		this.flipCount = 0;
		this.firstCard = "";
		this.match = false;
		this.firstCardValue = "";
		this.secondCard = "";
		this.secondCardValue = "";
};


Game.prototype.takeTurn = function($scope){
	if (this.player === "player 1"){
		if (this.match === true){
			this.playerOneScore = ++this.playerOneScore;
			this.player = "player 2";
			this.flipCount = 0;
			this.firstCard = "";
			this.secondCard = "";
			this.match = false;
			if ($('.flipped').length === $('flipcard').length){
					alert('Game Over');
			}
		}
		else {
			this.player = "player 2";
			this.flipCount = 0;
			console.log('player 2 turn');
			this.firstCard.classList.remove('flipped');
			this.secondCard.classList.remove('flipped');
			this.firstCard = "";
			this.secondCard = "";			
		}
	}
	else {
		if (this.match === true){
			this.playerTwoScore = ++this.playerTwoScore;
			this.player = "player 1";
			this.flipCount = 0;
			console.log('player 1 turn');
			this.firstCard = "";
			this.secondCard = "";
			this.match = false;
			if ($('.flipped').length === $('flipcard').length){
					alert('Game Over');
			}
		}
		else {
			this.player = "player 1";
			this.flipCount = 0;
			console.log('player 1 turn');
			this.firstCard.classList.remove('flipped');
			this.secondCard.classList.remove('flipped');
			this.firstCard = "";
			this.secondCard = "";
		}
	}
};

Game.prototype.getNumberPairs = function() {


	for(var i=0; i<this.cardAmount; i++){
		this.numberPairs.push(i);
		this.numberPairs.push(i);        
	}

	function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
	}

	shuffle(this.numberPairs);
};


Game.prototype.flipCard = function($scope){

	if(this.flipCount === 0) {
		event.currentTarget.classList.add('flipped');
		this.firstCard = event.currentTarget;
		this.firstCardValue = this.firstCard.textContent.trim();
		this.flipCount++;
	}
	else if(this.flipCount === 1) {
		event.currentTarget.classList.add('flipped');
		this.secondCard = event.currentTarget;
		this.secondCardValue = this.secondCard.textContent.trim();
		this.flipCount++;

		if (this.firstCardValue === this.secondCardValue){
			alert('match!');
			this.flipCount = 0;
			this.match = true;
			this.takeTurn();
		}
		else {
			this.flipCount = 0;
			alert('no match: Next Player');
			this.takeTurn();
		}
	}
	
};


