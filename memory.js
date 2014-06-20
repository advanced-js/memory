// YOUR CODE GOES HERE

// defind the Tile object
var Tile = function(id, value) {
	this.id = id;
	this.value = value;
	this.state = null;
};

Tile.prototype.reveal = function() {
		this.state = 'DISPLAYED';
};
	
Tile.prototype.hide = function() {
		this.state = 'HIDDEN';
};
	
Tile.prototype.matched = function() {
		this.state = 'MATCHED';
};

// end of Tile object definition

// defind the Board object
var Board = function(size) {
	this.size = size;
	this.tiles = [];
	this.cTiles = [];
};

// symbols borrowed from https://github.com/zenahirsch/memory/
Board.prototype.symbols = [
		'&#9742;', '&#9792;', '&#9794;', '&#9733;', '&#9824;', '&#9827;', '&#9775;', '&#9822;',
		'&#9730;', '&#10084;', '&#9986;', '&#9873;', '&#9773;', '&#65533;', '&#63819;', '&#63498;',
		'&#63499;', '&#9829;', '&#9830;', '&#9834;', '&#10016;', '&#10003;', '&#10007;', '&#63491;',
		'&#8540;', '&#8531;', '&#8859;', '&#9651;',	'&#1590;', '&#1334;', '&#936;', '&#9762;', 
		'&#43742;',	'&#12354;'
	];
	
Board.prototype.score = 0;

Board.prototype.populate = function() {
	// declare variables
	var i,
		id = 0,
		numOfPairs = (this.size * this.size)/2,
		randInd,
		tempTile;
	
	// initialize tiles
	for (i = 0; i < numOfPairs; i++){
		var t1 = new Tile(id  , this.symbols[i]);	this.tiles.push(t1);
		var t2 = new Tile(id+1, this.symbols[i]);	this.tiles.push(t2);
		id += 2;
	}
	
	// randomize the tiles so the game is more interesting
	for (i = 0; i < this.tiles.length; i++) {
		// pick a random index that's not the current index
		do {
			randInd = Math.floor(Math.random() * this.tiles.length);
		} while (randInd == i);
		
		tempTile = this.tiles[i];
		this.tiles[i] = this.tiles[randInd];
		this.tiles[randInd] = tempTile;
	}
	
	// reset tile id so players can't cheat (view source)
	for (i = 0; i < this.tiles.length; i++) {
		this.tiles[i].id = i; // well, technically id should be private
		this.tiles[i].hide();
	}
};

Board.prototype.checkWin = function() {
	var i;
	
	for (i = 0; i < this.tiles.length; i++) {
		if (this.tiles[i].state !== 'MATCHED') {
			return false;
		}
	}
	
	return true;
};

Board.prototype.goLive = function() {
	var cBoard = this; // grab a hold of this
	var match = 0;

	$('.tile').click(function () {
		var id = $(this).attr('id');
		
		// this looks tedious but it works in the sense that it enforces
		// that NOTHING happens while checking result
		// otherwise, clicking quickly could leave 3 tiles open -> missing check
        // and results in unfinishable games
		if (cBoard.cTiles[0] === undefined) {
            if (cBoard.tiles[id].state === 'HIDDEN') { // if it's HIDDEN, reveal it
                cBoard.tiles[id].reveal();
                $(this).html(cBoard.tiles[id].value);
                cBoard.cTiles.push(cBoard.tiles[id]);
                cBoard.score += 1;
            }
        } else {
            if (cBoard.cTiles[1] === undefined) {
                // if cTiles (current tiles) contains 2 elements, compare them
                if (cBoard.tiles[id].state === 'HIDDEN') {
                    cBoard.tiles[id].reveal();
                    $(this).html(cBoard.tiles[id].value);
                    cBoard.cTiles.push(cBoard.tiles[id]);
                    cBoard.score += 1;
                }

                var Tiles = cBoard.cTiles; // redundant, however makes it easier to refer to current tiles
                if (Tiles[0].value === Tiles[1].value) {
                    cBoard.tiles[Tiles[0].id].matched();
                    $('#app-board').find('td#' + Tiles[0].id).css('background-color', 'lightgreen');
                    cBoard.tiles[Tiles[1].id].matched();
                    $('#app-board').find('td#' + Tiles[1].id).css('background-color', 'lightgreen');
                    match += 2;
                    cBoard.cTiles = [];
                } else {
                    $('#app-board').find('td#' + Tiles[0].id).css('background-color', 'red');
                    $('#app-board').find('td#' + Tiles[1].id).css('background-color', 'red');
                    setTimeout(function () {
                        $('#app-board').find('td#' + Tiles[0].id).html('');
                        $('#app-board').find('td#' + Tiles[0].id).css('background-color', 'lightgray');
                        $('#app-board').find('td#' + Tiles[1].id).html('');
                        $('#app-board').find('td#' + Tiles[1].id).css('background-color', 'lightgray');

                        cBoard.cTiles = [];

                        cBoard.tiles[Tiles[0].id].hide();
                        cBoard.tiles[Tiles[1].id].hide();
                    }, 750);
                }
            }
		}

        $('#app-score').html(Math.floor((match/cBoard.score)*100) + '');
        //$('#app-message').html(match + ' ' + cBoard.score);

		// check if whole board is revealed, this is fired up every time there's a click, is there a way to do this more efficiently? 
		// maybe put this in checkWin with a condition?
		if (cBoard.checkWin()) {
			$('#app-message').html('You won!');
		}

	});
};

Board.prototype.draw = function() {
	var tInd = 0;
	var html = '';

	// constructing row for gameboard
	for (var i = 0; i < this.size; i++) {
		html += '<tr>';
		// constructing column in each row
		for (var x = 0; x < this.size; x++) {
			html += '<td class="tile" id="' + this.tiles[tInd].id + '">' +
				   '</td>';
			tInd += 1;
		}
		html += '</tr>';
	}

	// update table with html code
	$('#app-board').html(html);

	// Add the event listeners
	this.goLive();
};
// end of Board object definition

// actual app
$(function() {	
	$('#app-button').click(function() {
		var size = $('#app-select').val();
		var board = new Board(size);
		
		board.populate();
		board.draw();

        $('#app-score').html('0');
		$('#app-message').html('&nbsp;');
	});
});
// end of file