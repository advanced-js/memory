$(document).ready(function() {

	var Game = function(height,width) {
		this.height = height;
		this.width = width;
		this.maxValue = height*width/2;
		this.takenValues = "#";
		this.values = null;
		this.clicked1 = null;
		this.clicked2 = null;
		this.remainingMatches = height*width/2;
	};

	Game.prototype.taken = function(value) {
		var taken = true;
		var index = this.takenValues.indexOf("#" + value + "#");
		var lastIndex = this.takenValues.lastIndexOf("#" + value + "#");
		if ( index === -1 || index === lastIndex ) {
			taken = false;
		} 
		return taken;
	}

	Game.prototype.genValue = function() {
		var found = false;
		var value = -1;
		while ( !found ) {
			value = Math.floor(Math.random()*this.maxValue);
			if ( !this.taken(value) ) {
				found = true;
				this.takenValues += value + "#";
			}
		}
	    return value;
	};

	Game.prototype.genValues = function() {
		var values = [];
		for (var i = 0; i < this.height; i++) {
			values[i] = [];
			for (var j = 0; j < this.width; j++) {
				values[i][j] = this.genValue();
			}
		}
		return values;
	};

	Game.prototype.genHtml = function() {
		var board = "<table>";
		for (var i = 0; i < this.height; i++) {
			board += "<tr>";
			for (var j = 0; j < this.width; j++) {
				board += "<td class=\"tile\"><div>" + this.values[i][j] + "</div></td>";
			}
			board += "</tr>";
		}
		board += "</table>";
		return board;
	};

	Game.prototype.initBoard = function() {
		this.values = this.genValues();
		$('#board').append(this.genHtml());
	};

	Game.prototype.checkWinner = function() {
		if ( this.remainingMatches === 0 ) {
			$("#msg").append("<p>***WINNER***</p>");
		}
	};

	var Tile = function($td) {
		this.$td = $td;
		this.$div = $td.find('div');
		this.value = $td.find('div').text();
	};

	Tile.prototype.matches = function(tile) {
		var match = false;
		if ( this.value === tile.value ) {
			match = true;
		}
		return match;
	};

	Tile.prototype.showTile = function() {
		this.$div.css('opacity','1');
	};

	Tile.prototype.hideTile = function() {
		this.$div.animate({opacity: 0},750);
	};

	Tile.prototype.removeTile = function() {
		this.$td.fadeOut(750);
	};

	Game.prototype.setClicked1 = function($tile) {
		game.clicked1 = new Tile($tile);
		game.clicked1.showTile();
	}

	Game.prototype.setClicked2 = function($tile) {
		game.clicked2 = new Tile($tile);
		game.clicked2.showTile();
	}

	var action = function() {
		var $tile = $(this);
		if ( game.clicked1 === null ) {
			game.setClicked1($tile);
		} else if ( !game.clicked1.$td.is($tile) ) {
			game.setClicked2($tile);
			if ( game.clicked2.matches(game.clicked1) ) {
				game.remainingMatches--;
				game.clicked1.removeTile();
				game.clicked2.removeTile();
				game.checkWinner();
			} else {
				game.clicked1.hideTile();
				game.clicked2.hideTile();
			}
			game.clicked1 = null;
			game.clicked2 = null;
		}
	};

	// Code only works for boards with an even number of tiles
	var game = new Game(4,8);
	game.initBoard();
	$('.tile').click(action);
	$('button').click(function() {
		$('#msg').empty();
		$('#board').empty();
		$('#board').append(game.genHtml());
		game.clicked1 = null;
		game.clicked2 = null;
		game.remainingMatches = game.height*game.width/2;
		$('.tile').click(action);
	});

});
