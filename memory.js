var content = ['blk10','blk10','blkace','blkace','blkjack','blkjack','blkjoker','blkjoker','blkking','blkking','blkqueen','blkqueen','red10','red10','redace','redace','redjack','redjack','redjoker','redjoker','redking','redking','redqueen','redqueen'];
var values = [];
var card_ids = [];
var cardsFlipped = 0;

//Fisher Yates Shuffle Modern Algorithm
Array.prototype.cardShuffle = function() {
	var i = this.length, j, temp;
	while (--i > 0) {
		j = Math.floor(Math.random()*(i+1));
		temp = this[j];
		this[j] = this[i];
		this [i] = temp;
	}
};

//function called when page is refreshed or 'New Game' button is pressed
function newGame(){
	cardsFlipped = 0;
	var output = '';
	content.cardShuffle();
	for(var i = 0; i < content.length; i++){
		output += '<div id="card_'+i+'" onclick="playGame(this,\''+content[i]+'\')"></div>';
	}
	document.getElementById('gameboard').innerHTML = output;
}

//incorrect match, flip back over
function tryAgain(){
	var card1 = document.getElementById(card_ids[0]);
	var card2 = document.getElementById(card_ids[1]);
	card1.style.background = 'url(cards/cardback.png) no-repeat';
	card1.innerHTML = "";
	card2.style.background = 'url(cards/cardback.png) no-repeat';
	card2.innerHTML = "";
	values = [];
	card_ids = [];
};


function playGame(card,val){
	if(card.innerHTML === "" && values.length < 2){
		card.style.background = 'url(cards/'+ val +'.png) no-repeat';

		if(values.length === 0){
			values.push(val);
			card_ids.push(card.id);

		} else if(values.length == 1){
			values.push(val);
			card_ids.push(card.id);

			if(values[0] == values[1]){
				cardsFlipped += 2;

				values = [];
				card_ids = [];

            	//checks if all matches are complete and game is over
            	if(cardsFlipped == content.length){
            		alert("You win! Click 'New Game' to play again!");
            	}
			} else { 
				setTimeout(tryAgain, 1000);
			}
		}
	}
}

//studied Adam Khoury's array programming tutorials