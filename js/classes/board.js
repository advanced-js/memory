define(['./tile'], function (Tile) {

	var Board = function (size) {
		this.size = size;

		this.tiles = [];
		this.displayedTiles = [];
	};

	Board.prototype.symbols = [
		'&#9742;',
		'&#9792;',
		'&#9794;',
		'&#9733;',
		'&#9824;',
		'&#9827;',
		'&#9775;',
		'&#9822;',
		'&#9730;',
		'&#10084;',
		'&#9986;',
		'&#9873;',
		'&#9773;',
		'&#65533;',
		'&#63819;',
		'&#63498;',
		'&#63499;',
		'&#9829;',
		'&#9830;',
		'&#9834;',
		'&#10016;',
		'&#10003;',
		'&#10007;',
		'&#63491;',
		'&#8540;',
		'&#8531;',
		'&#8859;',
		'&#9651;',
		'&#1590;',
		'&#1334;',
		'&#936;',
		'&#9762;',
		'&#43742;',
		'&#12354;'
	];

	// The current score
	Board.prototype.score = 0;

	// Is the board IN_PROGRESS or COMPLETE?
	Board.prototype.state = null;

	// The tiles contained in this board
	Board.prototype.tiles = null;

	// The two tiles to compare
	Board.prototype.displayedTiles = null;

	// This is the Fisher-Yates Shuffle, which I found here:
	// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	Board.prototype.shuffleTiles = function shuffle (array) {
		var currentIndex = array.length, 
			temporaryValue,
		    randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
			    randomIndex = Math.floor(Math.random() * currentIndex);
			    currentIndex -= 1;

			    // And swap it with the current element.
			    temporaryValue = array[currentIndex];
			    array[currentIndex] = array[randomIndex];
			    array[randomIndex] = temporaryValue;
		  	}

		return array;
	};

	// Add the tiles to the board, in pairs of duplicate values
	// Then, shuffle them
	Board.prototype.addTiles = function () {
		var numPairs = (this.size * this.size) / 2; 
		var id = 0;

		for (var i = 0; i < numPairs; i++) {
			var t1 = new Tile(this, id, this.symbols[i]); // first tile of the pair
			var t2 = new Tile(this, id + 1, this.symbols[i]); // second tile of the pair
			this.tiles.push(t1);
			this.tiles.push(t2);
			id += 2;
		}

		// Shuffle the tiles
		this.shuffleTiles(this.tiles);
	};

	// Register event listeners to the board
	Board.prototype.registerEvents = function () {
		var that = this;
		$('.tile').click(function () {
			var id = $(this).attr('id');

			// If the tile is already MATCHED, stop everything
			if (that.tiles[id].state === 'MATCHED') {
				return;
			}

			// If it's a legitimate guess, display the tile, then
			// increase the score and update the scoreboard
			if (that.tiles[id].state === 'HIDDEN') {
				that.tiles[id].displayTile();
				that.score++;
				$('#score').html(that.score);
			}

			// If the player is doing poorly, taunt them
			if (that.score > 50) {
				$('#message').html('Come on, you can do better than that!');
			}

			// If there are two displayed tiles, compare them
			if (that.displayedTiles.length === 2) {
				that.compareTiles();
			}

			// Check if the game has been won
			if (that.checkWin()) {
				$('#message').html('Congratulations, you can remember things!');
			}

		});
	};

	// Draw the board on the page
	Board.prototype.drawBoard = function () {
		var tilesIndex = 0;
		var str = '';

		// Build the rows of the table
		for (var i = 0; i < this.size; i++) {
			str += '<tr>';
			for (var x = 0; x < this.size; x++) {
				str += '<td class="tile" id="' + this.tiles[tilesIndex].id + '">' +
					   '</td>';

				tilesIndex++;
			}
			str += '</tr>';
		}

		// Put the rows in the table element
		$('#board').html(str);

		// Add the event listeners
		this.registerEvents();

		// Loop through td elements with class 'tile' and
		// set the 'cell' prop of each tile object to that td element
		var cells = $('.tile');
		for (var i = 0; i < cells.length; i++) {
			this.tiles[+cells[i].id].cell = cells[i];
		}
	};

	// Compare both tiles in displayedTiles and see if they match
	Board.prototype.compareTiles = function () {
		var tiles = this.displayedTiles;

		// If the tiles match, set state to MATCHED, change background-color,
		// and clear out displayedTiles for the next guess
		if (tiles[0].value === tiles[1].value) {
			for (var i = 0; i < tiles.length; i++) {
				tiles[i].markMatched();
				$(tiles[i].cell).css('background-color', 'lightblue');
				this.displayedTiles = [];
			}
		} else {
			setTimeout(function () { // Wait a little bit before hiding the tiles
				tiles[0].hideTile();
				tiles[1].hideTile();
				$(tiles[0].cell).css('background-color', 'lightgray');
				$(tiles[1].cell).css('background-color', 'lightgray');
			}, 700);

			// Set the color to red before the timeout 
			for (var i = 0; i < tiles.length; i++) {
				$(tiles[i].cell).css('background-color', 'red');
			}

			// Clear displayedTiles for the next guess
			this.displayedTiles = [];
		}
	};

	// Check to see if the game has been won
	Board.prototype.checkWin = function () {
		var tiles = this.tiles;
		for (var i = 0; i < tiles.length; i++) {
			if (tiles[i].state != 'MATCHED') {
				return false;
			}
		}

		return true;
	};

	return Board;
});