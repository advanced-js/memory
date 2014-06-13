define(function (require) {
	var Board = require('classes/board');

	var initialize = function (size) {
		var b = new Board(size);
		b.addTiles();
		b.drawBoard();

		return b;
	};

	var board = null;

	$('#choose-board').click(function () {
		// Get the size from the select element
		var size = $('#board-select').val();
		board = initialize(size);

		// Reset the message
		$('#message').html('&nbsp;');

		// Reset the score to 0 and display
		board.resetScore();

		// Show the game div
		$('#game').show();
	});

});