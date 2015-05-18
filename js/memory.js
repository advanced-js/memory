// function createGame(){
// 	new squareFactory()
// }
var squareFactory;
(squareFactory = function squareFactory(){
	var squareObjects = []
	this.squareElements = $('.square');
	this.squareObjects = squareObjects;
	this.initSquareObjects = function initSquareObjects() {
		for (var idx in this.squareElements) {
			var square = this.squareElements[idx];

			var object = new squareObject(square);
			object.setClickEvent();
			this.squareObjects.push(object)
		};
	}
})()

function squareObject(element){
	this.elementId = element.id;
	this.el = $('#'+ this.elementId);
	this.setClickEvent = function setClickEvent(){
	 	$(this.el).on('click', function (){
	 		switchClass(this);
		});
	};
};

function switchClass(object){
	newClass = $(object).data('type');
	$(object).removeClass('square');
	$(object).addClass(newClass);
}


// var newSquares = [];
// var doSequence();
// var chosenObjects = [];
// var newClass;
// for (var square in squares){
// 	var newSquare = new Square(square)
// 	newSquares.push(newSquare)
// }

// $('.square').on('click', function(){
// 	switchClass(this)
	
// 	// need a setTimeout for toggling
// 	checkMatch(this);
// })

// function switchClass(object){
// 	newClass = object.data('type');
// 	this.removeClass('red');
// 	this.addClass(newClass);
// }

// function checkMatch(newObject) {
// 	chosenObjects.push(newObject)
// 	if(chosenObjects.length == 2){
// 		var firstObject = chosenObjects[0]
// 		if(firstObject.data('type') == object.data('type')){
// 			switchClass(firstObject)
// 		} else {
// 			setTimeout(10, function(){
// 				newObject.removeClass(newClass);
// 				newObject.addClass('red');
// 			})
// 		}
// 		chosenObjects = []

// 	}
// }

// // on click, display change class, then change back