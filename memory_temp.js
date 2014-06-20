// YOUR CODE GOES HERE

$(function(){
	var clicks = 0,
		answers = {};

	$('td').on('click',function(){
		if ($(this) !== answers[answers.length]) {
			answers.push($(this));
		}

		if (answers.length === 1){
			$(answers[0]).text($(this).data('value'));
			console.log($(this).data('value') + " revealed.");
		} else if (answers.length === 2){
			$(answers[1]).text($(this).data('value'));
			console.log($(this).data('value') + " revealed.");
			setTimeout(function(){
				if ($(answers[1]).data('value') !== $(answers[0]).data('value')){
					$(answers[1]).text('X');
					$(answers[0]).text('X');
					console.log("wrong answer");
				} else {
					console.log("Good job. Resetting clicks.");
				}
				answers = {};
			},1000);
		}
	});
});
