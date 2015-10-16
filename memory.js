$(function() {
	var lastClicked;

	$('td').click(function(){
		if (lastClicked === undefined){
			// first click
			lastClicked = $(this).text();
		}else if (lastClicked === $(this).text()){
			// second click - match
			console.log("match!");
		} else {
			// second click - no match
			console.log("no match!");
			lastClicked = undefined;
		}
	});
});

