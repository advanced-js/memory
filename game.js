var matchIt = 0;
var arr = [];
var score = 0;

function gotAMatch() {
	setTimeout(function(){
		$('.selected').each(function(){
			$(this).removeClass('selected');
			$(this).addClass('matched');
		});
	},300);
	score++;
	$('#score').html(score);
}

function createRandomArray() {
	//Create an array of randomly shuffled numbers up to the total number of cards
	function shuffledArray(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex ;
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
	arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
	shuffledArray(arr);
	console.log(arr);	
}

function populateAndBindLi() {
	//populate the list items
	$('li').each(function(i){
		$(this).attr('id',i);
		if (arr[i] > 18)
				arr[i] = arr[i]-18;
		$(this).html(arr[i]);
	});
	
	//Bind List Items
	$('li').on('click',function(){
		var i = parseInt($(this).attr('id'));
		$(this).addClass('selected');
		$(this).addClass('animate');
		setTimeout(function(){
			$('.animate').removeClass('animate');
		},200);
		if ($('.selected').length === 1) {
			matchIt = arr[i];
		}
		else if (matchIt === arr[i]) {
			gotAMatch();
	}
		else {
			matchIt = 0;
			setTimeout(function(){
				$('.selected').removeClass('selected');
			}, 1000);
			score--;
			$('#score').html(score);
		}

	});
}

//on document ready
$(function(){
	createRandomArray();
	populateAndBindLi();

	
	
});
