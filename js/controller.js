// Controller - click handlers, passes data to model

var Memory = window.Memory = window.Memory || {};

Memory.Controller = function(model, view) {
 	this.model = model;
 	this.clickHandler();
};

Memory.Controller.prototype.clickHandler = function() {
	$('article').click(function(article) {
		this.model.takeGuess(article);
	}.bind(this));
};