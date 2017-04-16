// Controller - click handlers, passes data to model

var Memory = window.Memory = window.Memory || {};

Memory.Controller = function() {
 	this.createModel();
 	this.clickHandler();
};

Memory.Controller.prototype.createModel = function() {
	this.model = new Memory.Model();
}

Memory.Controller.prototype.clickHandler = function() {
	$(document).on( 'click', 'article', function(article) {
		this.model.takeGuess( article );
	}.bind(this) );
	$(document).on( 'click', 'button', function(){
		this.model.view.$el.empty();
		this.model = new Memory.Model();
	}.bind(this) );
};
