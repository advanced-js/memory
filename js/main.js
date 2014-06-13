define(function (require) {
	var Board = require('classes/board');
	var Tile = require('classes/tile');

	var initialize = function (size) {
		var b = new Board(size);
		b.addTiles();
		b.drawBoard();

		return b;
	};

	var board = null;

	$('#choose-board').click(function () {
		var size = $('#board-select').val();
		$('#message').html('&nbsp;');
		board = initialize(size);
		board.score = 0;
		$('#score').html(board.score);
		$('#game').show();
	});

});