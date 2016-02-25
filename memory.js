var Game = function(boardElements) {
	this.boardElements = boardElements;
	this.tileClass = boardElements.tileHtmlElementClass.substr(1);
	this.maxValue = boardElements.height*boardElements.width/2;
	this.takenValues = "#";
	this.values = null;
	this.clicked1 = null;
	this.clicked2 = null;
	this.remainingMatches = boardElements.height*boardElements.width/2;
};

Game.prototype.taken = function(value) {
	var taken = true;
	var index = this.takenValues.indexOf("#" + value + "#");
	var lastIndex = this.takenValues.lastIndexOf("#" + value + "#");
	if ( index === -1 || index === lastIndex ) {
		taken = false;
	} 
	return taken;
};

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
	for (var i = 0; i < this.boardElements.height; i++) {
		values[i] = [];
		for (var j = 0; j < this.boardElements.width; j++) {
			values[i][j] = this.genValue();
		}
	}
	return values;
};

Game.prototype.genHtml = function() {
	var board = "<table>";
	for (var i = 0; i < this.boardElements.height; i++) {
		board += "<tr>";
		for (var j = 0; j < this.boardElements.width; j++) {
			board += "<td class=\"" + this.tileClass + "\"><div>" + this.values[i][j] + "</div></td>";
		}
		board += "</tr>";
	}
	board += "</table>";
	return board;
};

Game.prototype.unsetClickedTiles = function() {
	this.clicked1.hideTile();
	this.clicked1 = null;
	this.clicked2.hideTile();
	this.clicked2 = null;
};

Game.prototype.removeClickedTiles = function() {
	this.clicked1.removeTile();
	this.clicked1 = null;
	this.clicked2.removeTile();
	this.clicked2 = null;
};

Game.prototype.checkWinner = function() {
	var self = this;
	if ( --self.remainingMatches === 0 ) {
		setTimeout(function () {
			$(self.boardElements.msgHtmlElementId).append("<p>***WINNER***</p>");
		},775);
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

Tile.prototype.sameTileAs = function($tile) {
	return this.$td.is($tile);
};

var setClicked = function($tile) {
	var clicked = new Tile($tile);
	clicked.showTile();
	return clicked;
};

var action = function(event) {
	var $tile = $(this);
	var game = event.data.game;
	if ( game.clicked1 === null ) {
		game.clicked1 = setClicked($tile);
	} else if ( !game.clicked1.sameTileAs($tile) ) {
		game.clicked2 = setClicked($tile);
		if ( game.clicked2.matches(game.clicked1) ) {
			game.removeClickedTiles();
			game.checkWinner();
		} else {
			game.unsetClickedTiles();
		}
	}		
};

Game.prototype.initBoard = function(chgvalues) {
	var self = this;
	if ( chgvalues ) {
		self.takenValues = "#";
		self.values = self.genValues();
	}
	$(self.boardElements.boardHtmlElementId).empty();
	$(self.boardElements.boardHtmlElementId).append(self.genHtml());
	$(self.boardElements.tileHtmlElementClass).click({
		game:self
	},action);
};

var Button = function(type,htmlElementId) {
	this.type = type;
	this.htmlElementId = htmlElementId;
};

Button.prototype.initButton = function(game) {
	var chgvalues = false;
	if ( this.type === "New" ) {
		chgvalues = true;
	}
	$(this.htmlElementId).click(function() {
		$(game.boardElements.msgHtmlElementId).empty();
		game.initBoard(chgvalues);
		game.clicked1 = null;
		game.clicked2 = null;
		game.remainingMatches = game.boardElements.height*game.boardElements.width/2;
	});
};

var gameSetup = function(gameElements) {
	var game = new Game({
		height: gameElements.height,
		width: gameElements.width,
		boardHtmlElementId: gameElements.boardHtmlElementId,
		msgHtmlElementId: gameElements.msgHtmlElementId,
		tileHtmlElementClass: gameElements.tileHtmlElementClass
	});
	game.initBoard(true);
	var newButton = new Button("New",gameElements.newButtonHtmlElementId);
	newButton.initButton(game);
	var resetButton = new Button("Reset",gameElements.resetButtonHtmlElementId);
	resetButton.initButton(game);
};

$(document).ready(function() {
	// Code only works for boards with an even number of tiles
	gameSetup({
		height: 3,
		width: 6,
		boardHtmlElementId: "#board",
		msgHtmlElementId: "#msg",
		tileHtmlElementClass: ".tile",
		newButtonHtmlElementId: "#new" ,
		resetButtonHtmlElementId: "#reset"
	});
	gameSetup({
		height: 4,
		width: 4,
		boardHtmlElementId: "#board2",
		msgHtmlElementId: "#msg2",
		tileHtmlElementClass: ".tile2",
		newButtonHtmlElementId: "#new2" ,
		resetButtonHtmlElementId: "#reset2"
	});
});
