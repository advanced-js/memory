// YOUR CODE GOES HERE
var createBoard = function(form){
	var rows = form.rows.value;
	var columns = form.columns.value;
	var pairs = (rows*columns)/2;
	//var symbols = [pairs];
	var index=0;
	while (index < pairs){
		var x = Math.floor((Math.random()*(248-33))+33);
		while (x===127){
			var x = Math.floor((Math.random()*(248-33))+33);
		}
		var index
		symbols[index]=String.fromCharCode(x);
		index++;
	}

};

var Box = function(contents){
	this.contents = contents;
	this.open = false;
	this.matched = false;
}

$(function(){
	var clicks = 0,
		firstAnswer,
		secondAnswer;


	$('td').on('click',function(){
		//var el = $(this)[0];
		//console.log(el);
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
	});
});
