// YOUR CODE GOES HERE

$(document).ready(function() {

	var selectedCells = [];
	var $cells = $('#grid td');		//console.log($cells.length);

	$('#grid').on('click', '.not-found', doTDClick);


	function doTDClick() {
		// $(this) is the <td>		console.log("id="+$(this).attr('id'));
		var $span = $(this).find('span');
		$span.removeClass('hidden');
		$(this).removeClass('not-found');
		selectedCells.push($(this));
		console.log("selectedCells...");
		console.log(selectedCells);

		if (selectedCells.length === 2) {
			if (selectedCells[0].text() === selectedCells[1].text()) {
				console.log("YAY");
				selectedCells[0].addClass('found');
				selectedCells[1].addClass('found');
				selectedCells = [];
				if (isGameOver()) {alert("WIN!"); document.location.reload();}
			} else {
				console.log("BOO");
				$('#grid').off('click', '.not-found', doTDClick);		//no clicking allowed until 1000mx	//OFF
				setTimeout(function () {
					for (var i = 0; i < selectedCells.length; i++) {
						selectedCells[i].find('span').addClass('hidden');
						selectedCells[i].addClass('not-found');
						console.log(i);
					}
					selectedCells = [];
					$('#grid').on('click', '.not-found', doTDClick);	//clicking allowed again	//ON
					//isGameOver();	duh, no need
				}, 1000);
			}
		}		
	}

	function isGameOver() {		//console.log("isGameOver...");
		var found_cntr = 0;
		for (var i=0; i<$cells.length; i++) {
			//console.log($cells[i]);
			//console.log($($cells[i]));
			//console.log($cells[i].hasClass('found'));			//Uncaught TypeError: undefined is not a function 
			//console.log($($cells[i]).hasClass('found'));		//hmmm... why is $() necessary?
			if ( $($cells[i]).hasClass('found') ) {found_cntr++;}
		}
		if (found_cntr === $cells.length) {return true;}
		return false;
	}

});