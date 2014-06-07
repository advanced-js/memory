// YOUR CODE GOES HERE

$(function(){
	var clicks = 0,
		firstAnswer,
		secondAnswer;


	$('td').on('click',function(){
		var el = $(this)[0];
		console.log(el);
		if ($(this).text() == 'X') {
			clicks++;
			console.log(clicks);
			if (clicks === 1){
				firstAnswer = $(this);
				$(this).text($(this).data('value'));
				console.log($(this).data('value') + " revealed.");
			}
			else if (clicks === 2){
				secondAnswer = $(this);
				$(this).text($(this).data('value'));
				console.log($(this).data('value') + " revealed.");
				setTimeout(function(){
					if (secondAnswer.data('value') !== firstAnswer.data('value')){
						secondAnswer.text('X');
						firstAnswer.text('X');
						console.log("wrong answer");
					} else {
						console.log("Good job. Resetting clicks.");
					}
					clicks = 0;
				},1000);
			}
		} 			
	});
});
