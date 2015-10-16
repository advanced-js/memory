$(function() {
	var lastClicked;

	$('td').click(function(){
		if (lastClicked === undefined){
			// first click
			lastClicked = this;
		}else if (this != lastClicked && $(lastClicked).text() === $(this).text()){		
			// second click - match
			console.log("match!");
			$(lastClicked).css("visibility","hidden");
			$(this).css("visibility", "hidden");

		} else {
			// second click - no match
			console.log("no match!");
			lastClicked = undefined;
		}
	});
});

