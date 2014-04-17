//MemoryBoardController
var MemoryBoardController = function(view, model){
	this.$el = $("#"+view);
	this.model = model;
	this.tiles = this.model.attributes.tiles;
	this.activeTiles = [];

	this.init();
};

MemoryBoardController.prototype = {
	init: function(){
		this.events();
		this.subscribe();
		this.render();
	},
	subscribe: function(){
		Events.broadcaster.on(Events.tileTurnedOver, $.proxy(this.compareTiles, this));
		Events.broadcaster.on(Events.resetGame, $.proxy(this.resetBoard, this));
	},
	events: function(){
		$("#reset", this.$el).on("click", $.proxy(this.reset, this));
	},
	render: function(){
		//Loop through model to create board
		for(var i=0; i < this.tiles.length; i++){
			//create new tile and append it to grid
			var tile = new TileController(this.tiles[i]);
			$("#tiles", this.$el).append(tile.$el);
		}
	},
	compareTiles: function(e, data){
		//If less than 2 tiles are flipped, push this flipped tile to activeTiles array
		if(this.activeTiles.length < 2) this.activeTiles.push(data.id);
		
		//If two tiles are flipped compare their id to see if they match
		if(this.activeTiles.length === 2){
			isMatch = this.activeTiles[0] === this.activeTiles[1];
			if(isMatch) Events.broadcaster.trigger(Events.correctMatch);
			else Events.broadcaster.trigger(Events.incorrectMatch);

			//Trigger event that an attemp was made
			Events.broadcaster.trigger(Events.attemp);

			//Reset activeTiles
			this.activeTiles.length = 0;
		}
	},
	reset: function(){
		//Trigger event that the game has been reset
		Events.broadcaster.trigger(Events.resetGame);
	},
	resetBoard: function(){
		//Reset activeTiles storage
		this.activeTiles.length = 0;
		//Empty out tiles container
		$("#tiles", this.$el).empty();
		//Rerender tiles
		this.render();
	}
};

/**
 * Model of tiles for Memory Game
 */
var MemoryModel = function(data){
	this.attributes = $.extend(true, {}, data);

	this.init();
};

MemoryModel.prototype = {
	init: function(){
		this.duplicateTiles();
		this.randomizeTiles();
	},
	get: function(attr){
		return this.attributes(attr);
	},
	set: function(attr, value){
		this.attributes[attr] = value;
	},
	duplicateTiles: function(){
		var tiles = this.attributes.tiles,
			tilesCopy = [];
		
		//make a copy of the tiles in model
		tiles.forEach(function(tile, index){
			tilesCopy.push(tile);
		});

		//push copied tiles to model
		tilesCopy.forEach(function(tile, index, array){
			tiles.push(tile);
		});
	},
	randomizeTiles: function(){		
		/** Inspired by Fisher–Yates Shuffle algorithm
			url: http://bost.ocks.org/mike/shuffle/
		**/

		var tiles = this.attributes.tiles,
			m = tiles.length, t, i;

		// While there remain elements to shuffle…
		while (m) {
			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = tiles[m];
			tiles[m] = tiles[i];
			tiles[i] = t;
		}		
	}
}

/**
 * Tile class for Memory Game.
 * @param {Object} data The data field is a requred parameter used for providing information about the individual tile.
 */
var TileController = function(data){
	this.id = data.id;
	this.image = data.image;
	this.$el;

	this.init();
};

TileController.prototype = {
	init: function(){
		this.buildTile();
		this.subscribe();
		this.events();
	},
	/**
	 * Events the tile subscribes to
	 */
	subscribe: function(){
		Events.broadcaster.on(Events.correctMatch, $.proxy(this.hideTile, this));
		Events.broadcaster.on(Events.incorrectMatch, $.proxy(this.resetTile, this));
	},
	/**
	 * Dom events the tile listens for
	 */
	events: function(){
		var self = this;
		self.$el.on("click", $.proxy(self.flipTile, self));
	},
	/**
	 * Build tile as a dom object
	 * @return {$Object} A jQuery object of the dom element
	 */
	buildTile: function(){
		var tileFront = '<div class="front"><img src="images/crema-front.png" /></div>',
			tileBack = '<div class="back"><img src="'+ this.image +'" /></div>',
			tile = '<div class="tile">' + tileFront + tileBack + '</div>';
		this.$el = $(tile);
	},
	/**
	 * When a tile is clicked, flip it over to reveal its information
	 */
	flipTile: function(){
		var id = this.id;

		//check that tile hasn't been flipped and that no more than 2 tiles are already flipped
		if(!this.$el.hasClass("active") && $(".tile.active").length < 2){
			this.$el.addClass("active");
			Events.broadcaster.trigger(Events.tileTurnedOver, {"id": id});
		}
	},
	/**
	 * When there is an incorrect match, reset flipped tile to its original state.
	 */
	resetTile: function(){
		var self = this;

		function reset(){
			self.$el.removeClass("active");
		};

		if(this.$el.hasClass("active")) setTimeout(reset, 1000);
	},
	/**
	 * When there is a correct match, hide flipped tile
	 */
	hideTile: function(){
		var self = this;

		function hide(){
			self.$el.addClass("matched");
			self.$el.removeClass("active");
		};

		if(this.$el.hasClass("active")) setTimeout(hide, 1000);
	}
};

/**
 * Model for scoreBard
 * @param {[type]} data [description]
 */
var ScoreBoardModel = function(data){
	this.defaults = {
		attemps: 0,
		correct: 0,
		score: 0,
		totalOutcome: data.tiles.length
	};
	this.attributes = {};

	this.init();
};

ScoreBoardModel.prototype = {
	init: function(){
		this.setDefaults();
	},
	set: function(attr, value){
		this.attributes[attr] = value;
		this.events.trigger('change');
	},
	get: function(attr){
		return this.attributes[attr];
	},
	setDefaults: function(){
		for(key in this.defaults){
			this.attributes[key] = this.defaults[key];
		}
	},
	events: $(new Object)
};

/**
 * Score board controller
 * @param {Object} model Required parameter to set model for controller
 */
var ScoreBoardController = function(view, model){
	this.$el = $("#"+view);
	this.model = model;

	this.init();
};

ScoreBoardController.prototype = {
	init: function(){
		this.subscribe();
		this.events();
	},
	subscribe: function(){
		Events.broadcaster.on(Events.attemp, $.proxy(this.updateAttemps, this));
		Events.broadcaster.on(Events.correctMatch, $.proxy(this.updateCorrect, this));
		Events.broadcaster.on(Events.resetGame, $.proxy(this.reset, this));
	},
	events: function(){
		var self = this;

		$(".reset-button", this.$el).on("click", function(){
			self.resetGame();
			self.closeScoreBoard();
		}); 
	},
	render: function(){
		var score = this.model.get('score');
		$("#score", this.$el).html(score);
	},
	openScoreBoard: function(){
		var self = this;
		$("body").addClass("modal-open");
		self.$el.fadeIn(500);
	},
	closeScoreBoard: function(){
		var self = this;
		$("body").removeClass("modal-open");
		self.$el.fadeOut(500);
	},
	updateAttemps: function(){
		console.log("updateAttemps");
		var attemps = this.model.get('attemps');
		this.model.set('attemps', attemps+1);

		//Check to see if all of the tiles have been matched
		if(this.model.get('totalOutcome') === this.model.get('correct')){
			this.updateScore();
		}
	},
	updateCorrect: function(){
		var correct = this.model.get('correct');
		this.model.set('correct', correct+1);
	},
	updateScore: function(){
		var attemps = this.model.get('attemps'),
			correct = this.model.get('correct'),
			wrong = attemps - correct,
			totalOutcome = this.model.get('totalOutcome'),
			efficiency = Math.round((totalOutcome * 100) / attemps) * 100;

		//Set score
		this.model.set('score', efficiency);
		//Render scoreboard
		this.render();
		this.openScoreBoard();
	},
	reset: function(){
		this.model.setDefaults();
	},
	resetGame: function(){
		//Trigger event that the game has been reset
		Events.broadcaster.trigger(Events.resetGame);
	}
}

/**
 * Event object used for publishing/subscribing
 */
var Events = {
	"tileTurnedOver": "tileTurnedOver",
	"correctMatch": "correctMatch",
	"incorrectMatch": "incorrectMatch",
	"attemp": "attemp",
	"resetGame": "resetGame",
	"broadcaster": $(new Object())
};

/**
 * Memory data
 */
var memoryData = {
	tiles: [
		{
			"id": "001",
			"image": "images/crema-black-white.jpg"
		},
		{
			"id": "002",
			"image": "images/crema-blue-cream.jpg"
		},
		{
			"id": "003",
			"image": "images/crema-brown-cream.jpg"
		},
		{
			"id": "004",
			"image": "images/crema-green-black.jpg"
		},
		{
			"id": "005",
			"image": "images/crema-pink-brown.jpg"
		},
		{
			"id": "006",
			"image": "images/crema-red-white.jpg"
		},
		{
			"id": "007",
			"image": "images/crema-white-black.jpg"
		},
		{
			"id": "008",
			"image": "images/crema-white-black2.jpg"
		},
		{
			"id": "009",
			"image": "images/crema-white-brown.jpg"
		},
		{
			"id": "010",
			"image": "images/crema-yellow-pink.jpg"
		}
	]
}


/**
 * On document ready start up Memory Game
 * @return {[type]} [description]
 */
$(function(){
	//Instantiate models for game
	var memoryModel = new MemoryModel(memoryData);
	var scoreBoardModel = new ScoreBoardModel(memoryData);
	//Instantiate controller for game
	var scoreBoardController = new ScoreBoardController("score-board", scoreBoardModel);
	var memoryBoardController = new MemoryBoardController("memory-game", memoryModel);
});