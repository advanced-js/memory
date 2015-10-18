var content_array = ['A','A','K','K','Q','Q','J','J','10','10','9','9','8','8','7','7','6','6','5','5','4','4','3','3'];
var values = [];
var card_ids = [];
var cards_flipped = 0;


//Fisher Yates Shuffle Modern Algorithm
Array.prototype.cardShuffle = function() {
	var i = this.length, j, temp;
	while (--i > 0) {
		j = Math.floor(Math.random()*(i+1));
		temp = this[j];
		this[j] = this[i];
		this [i] = temp;
	}
}


function newGame(){
	cards_flipped = 0;
	var output = '';
	content_array.cardShuffle();
	for(var i = 0; i < content_array.length; i++){
		output += '<div id="card_'+i+'" onclick="flipcard(this,\''+content_array[i]+'\')"></div>';
	}
	document.getElementById('gameboard').innerHTML = output;
}


function flipcard(card,val){
	if(card.innerHTML == "" && values.length < 2){
		card.style.background = '#FFF';
		card.innerHTML = val;

		if(values.length == 0){
			values.push(val);
			card_ids.push(card.id);

		} else if(values.length == 1){
			values.push(val);
			card_ids.push(card.id);

			if(values[0] == values[1]){
				cards_flipped += 2;

				values = [];
				card_ids = [];

				if(cards_flipped == content_array.length){
					alert("You win! Click 'New Game' to play again.");
				}
			} else {
				function tryAgain(){
					var card_1 = document.getElementById(card_ids[0]);
					var card_2 = document.getElementById(card_ids[1]);
					card_1.style.background = 'url(cards/cardback.png) no-repeat';
					card_1.innerHTML = "";
					card_2.style.background = 'url(cards/cardback.png) no-repeat';
					card_2.innerHTML = "";
					values = [];
					card_ids = [];
				}
				setTimeout(tryAgain, 1000);
			}
		}
	}
}

