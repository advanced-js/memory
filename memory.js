// YOUR CODE GOES HERE

//This checks the inputed values 
var validate = function(){
	var rows = document.getElementById('rows').value;
	var columns = document.getElementById('columns').value;
	if ((rows*columns)>150){
		document.getElementById('errors').innerHTML = "Yea, this board is too big. Sorry pal.";
	}
	else if(((rows*columns)!=parseInt(rows*columns))||((rows*columns)<1)){
		document.getElementById('errors').innerHTML = "Please enter positive integers";
	}
	else if((rows*columns)%2!=0){
		document.getElementById('errors').innerHTML = "Make sure there's an even number of tiles!";
	}
	else if ((rows*columns)%2===0){
		document.getElementById('errors').innerHTML = "";
		createBoard(rows,columns);
	}
	else{
		document.getElementById('errors').innerHTML = "Please enter valid integers";
	}
}
var createBoard = function(rows,columns){
	var boxes = [];
	var index=0;
	var gameBoard = document.getElementById('game_board');
	
	//create array of all the pairs of symbols
	while (index < ((rows*columns))){
		var x = Math.floor((Math.random()*(248-33))+33);
		while (x===127){
			var x = Math.floor((Math.random()*(248-33))+33);
		}
		console.log("x = "+ x);
		boxes[index] = new Tile(x);
		index++;
		boxes[index] = new Tile(x);//create the second in the pair
		index++;
	}
	shuffle(boxes);
	var tileCount = 0;
	var rowCount = 0;
	var str = "";
	for (i=0;i<rows;i++){
		str += '<tr id="row'+rowCount+'">';
		for (j=0;j<columns;j++){
			str += '<td id="'+boxes[tileCount]+'"></td>';
			tileCount++;
		}
		str += '</tr>';
		rowCount++;
	}
	gameBoard.innerHTML = str;
};

var Tile = function(code){
	this.code = code;
	this.contents = String.fromCharCode(code);
	this.open = false;
	this.matched = false;
}

var Board = function(){

}

$(function(){
	var clicks = 0,
		firstAnswer,
		secondAnswer;

	$('td').on('click',function(){
		//var el = $(this)[0];
		//console.log(el);
		console.log(this.getAttribute('id').contents);})
/*
		if ($(this).text() == '') {
			clicks++;
			console.log(clicks);
			
			if (clicks === 1){
				firstAnswer = $(this);
				$(this).text($(this).data('value'));
			}
			else if (clicks === 2){
				secondAnswer = $(this);
				$(this).text($(this).data('value'));
				setTimeout(function(){
					if (secondAnswer.data('value') !== firstAnswer.data('value')){
						secondAnswer.text('');
						firstAnswer.text('');
					}
					clicks = 0;
				},1000);
			}
		} 			
	});*/
});

//from: https://github.com/coolaj86/knuth-shuffle/blob/master/index.js
function shuffle(array) {
    var currentIndex = array.length
      , temporaryValue
      , randomIndex
      ;

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
  }