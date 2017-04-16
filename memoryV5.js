// JavaScript Document
var ABC = {};
$( document ).ready(function() {

	ABC.index = 0;
	ABC.cell1 = '';
	ABC.cell1t = '';
	ABC.cell2 = '';
	ABC.cell2t = '';
	ABC.score = 0;
	ABC.turns = 0;
	ABC.totalcards = 0;
	ABC.rows = 0;
	ABC.cols = 0;
	ABC.cardvalues = [];
	
	
//function to shuffle the memory cards
	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
	
//reset function to clear the board, scores	, and card value array
	$('#reset').click(function(){
		ABC.score = 0;
		$('#yourscore').html(ABC.score);
		ABC.turns = 0;
		$('#yourturns').html(ABC.turns);
		ABC.index = 0;
		ABC.rows = 0;
		ABC.cols = 0;
		ABC.cardvalues = [];
		$('.board > div').remove();
		$('form').find("input[type=text], textarea").val("");
		$('#outputcalc').html('');
		
	});


//function to validate inputs from the form and then create the memory cards if validation passes. 
//This runs when the user clicks 'go'
	$('#go').click(function(){
		validate();
	});


	function validate() {
		var msg ='';
		errorMsg = '';
	
		ABC.rows = document.getElementById('row').value;
		if (ABC.rows ==='' || isNaN(ABC.rows)) { 
			msg = '*Enter valid numeric values'; 
			$('#rowe').html(msg).css('color', 'red');   
			errorMsg = "yes";
		}
		if (ABC.rows !=='' && Number.isInteger(ABC.rows)) { 
			$('#rowe').html('');
		}
	
	
		ABC.cols = document.getElementById('col').value;
		if (ABC.cols ==='' || isNaN(ABC.cols)) {  
			msg = '*Enter valid numeric values'; 
			$('#cole').html(msg).css('color', 'red');       		      
			errorMsg = "yes";
		}
		if (ABC.cols !=='' && Number.isInteger(ABC.rows)) { 
			$('#cole').html('');
		}
		
		
		if (ABC.cols>10) {  
			msg = '*Max columns is 10, please enter a smaller number';
			$('#cole').html(msg).css('color', 'red');        		      
			errorMsg = "yes";
		}
		if (ABC.cols <=10) { 
			$('#cole').html('');
		}
	
		
		if (ABC.rows>10) {  
			msg = '*Max rows is 10, please enter a smaller number';
			$('#rowe').html(msg).css('color', 'red');        		      
			errorMsg = "yes";
		}
		if (ABC.rows <=10) { 
			$('#rowe').html('');
		}
	
	
		
		ABC.totalcards = ABC.rows *ABC.cols;
		if (ABC.totalcards ===0 || ABC.totalcards%2 !== 0 ){         		        
			errorMsg = 'yes';
			msg = '*product not % 2';
			$('#outputcalce').html(msg).css('color', 'red'); 
				
		}
		if (ABC.totalcards !==0 && ABC.totalcards%2 === 0 ){ 
		$('#outputcalce').html('');
		}
		
		
	
		if (errorMsg !== '') { 
			$('#outputcalc').html('Fixes needed').css('color', 'red');
			return(false);
		}
	
		$('#outputcalc').html(ABC.totalcards).css('color', 'black');
		newCards(ABC.totalcards);
		shuffleArray(ABC.cardvalues);			
	}




//a card object
	function Cards(value, divclass, divid){
		this.value = value;
		$('.board').append('<div class='+divclass+' id='+divid+'>');
		
	}



//function that creates a pair of new cards with the same value
//this also generates the id for the new divs being created
//and assigns a special class 'left-square' for when a div should start a new row (based on form  column inputs)
	function newCards(num){
		for(i=0; i<(num); i=i+2){
			var cardval = i;
			var firstid = 'id'+i;
			var secondid = 'id'+(i+1);
			var cardrow1;
			var cardrow2;
				if(i%ABC.cols===0){
					cardrow1 = 'left-square';
				}
				else {
					cardrow1 = 'reg-square';
				}
				if((i+1)%ABC.cols===0){
					cardrow2 = 'left-square';
				}
				else {
					cardrow2 = 'reg-square';
				}
			ABC.cardvalues[i] = new Cards(cardval, cardrow1, firstid);
			ABC.cardvalues[i+1] = new Cards(cardval, cardrow2, secondid);
			
		}
		
	
	}

//memory logic from V2/V4 with some changes
//this keeps track of the index (1st or second click)
//it changes the background color of the div on click and shows a value of the memory card - only if it is not already flipped
//it keeps track of the value of the card for the first and second clicks
//if this was your second click on a turn then it will also determine if you found a pair or not and if you win the game
//even if you don't find a pair it will track your #of turns
    $('.board').on('click','> div', function () {
      if(ABC.index<2){
			var arrayindex = this.id.split('id')[1];
            if ($(this).css('background-color') == "rgb(0, 0, 0)"){
                $(this).css('background-color', 'yellow'); 
                ABC.index++;  
                    if (ABC.index==1){
                       ABC.cell1t = ABC.cardvalues[arrayindex].value;
                       ABC.cell1 = this.id;
					   $('#'+this.id).html(ABC.cell1t);
					   console.log(ABC.cell1t);
                        }
						
                    if (ABC.index==2){
                        ABC.cell2t = ABC.cardvalues[arrayindex].value;
                        ABC.cell2 = this.id;
						$('#'+this.id).html(ABC.cell2t);
						 console.log(ABC.cell2t);
						 
              
                        
							if (ABC.cell1t === ABC.cell2t) {
								setTimeout(function(){
									$('#' + ABC.cell1).css('background-color', 'grey'); 
									$('#' + ABC.cell1).css('color', 'grey');
									$('#' + ABC.cell2).css('background-color', 'grey');
									$('#' + ABC.cell2).css('color', 'grey');
									ABC.index = 0;
									ABC.score++;
									ABC.turns++;
									$('#yourscore').html(ABC.score);
									$('#yourturns').html(ABC.turns);
										if(ABC.score === ABC.totalcards/2){
											alert('you won!');
										}
								}, 1500);
							}
									
							
							if (ABC.cell1t !== ABC.cell2t) {
								setTimeout(function(){
									$('#' + ABC.cell1).css('background-color', 'black'); 
									$('#' + ABC.cell2).css('background-color', 'black');
									ABC.index = 0;  
									ABC.turns++;
									$('#yourturns').html(ABC.turns);
								}, 1500);
							  }
						  
					  
					  
			}
  		}
 	 }
        
    });
	
	
	
});

