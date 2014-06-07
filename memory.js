// YOUR CODE GOES HERE


$(document).ready(function() {

	var selectedCells = [];
	var $cells = $('.hidden');

	$('table').on('click', '.not-found', function () {
		var $span = $(this).find('span');
		$span.removeClass('hidden');
		$(this).removeClass('not-found');
		selectedCells.push($span);
		console.log(selectedCells);

		if (selectedCells.length === 2) {
			if (selectedCells[0].text() === selectedCells[1].text()) {
				console.log("YAY");
				selectedCells[0].addClass('found');
				selectedCells[1].addClass('found');
				selectedCells = [];
			} else {
				setTimeout(function () {
					for (var i = 0; i < selectedCells.length; i++) {
						selectedCells[i].addClass('hidden');
						selectedCells[i].parent().addClass('not-found');
						console.log(i);
					}
					selectedCells = [];
				}, 1000);
			}
		}
		console.log(isGameOver());
	});

	function isGameOver() {
		var bool=true
		var $cells = $('#grid tr td');
		
		//console.log($($cells[0]).hasClass('found'));
		
		for (var i=0; i<$cells.length; i++) {
			if (!$($cells[i]).hasClass('found')) {
				bool = false;
			}
			//console.log($($cells[i]).hasClass('found'));
		}

		return bool;
	}














});