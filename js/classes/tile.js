define(function () {

	var Tile = function(board, id, value) {
		this.id = id;
		this.board = board;
		this.value = value;

		this.state = 'HIDDEN';
	};

	// Is the tile HIDDEN, DISPLAYED, or MATCHED?
	Tile.prototype.state = null;

	// Display the tile if it isn't already
	// Change state to DISPLAYED and add to the board's displayedTiles array
	Tile.prototype.displayTile = function () {
		if (this.board.displayedTiles.length < 2 && this.state !== 'DISPLAYED') {
			this.state = 'DISPLAYED';
			this.board.displayedTiles.push(this);
			$(this.cell).html(this.value);
		}
	};

	// Change the tile's state back to HIDDEN
	Tile.prototype.hideTile = function () {
		this.state = 'HIDDEN';
		$(this.cell).html('');
	};

	// Change the tile's state to MATCHED
	Tile.prototype.markMatched = function () {
		this.state = 'MATCHED';
	};

	return Tile;
});