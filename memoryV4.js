// JavaScript Document

$( document ).ready(function() {
var ABC = {};
	ABC.index = 0;
	ABC.cell1;
	ABC.cell1t;
	ABC.cell2;
	ABC.cell2t;
	ABC.score = 0;
	ABC.turns = 0;
	
	
	card0 = {value:'A'};
	card1 = {value:'B'};
	card2 = {value:'C'};
	card3 = {value:'D'}; 
	card4 = {value:'E'};
	card5 = {value:'F'}; 
	card6 = {value:'G'}; 
	card7 = {value:'H'}; 
	card8 = {value:'A'}; 
	card9 = {value:'B'}; 
	card10 = {value:'C'}; 
	card11 = {value:'D'}; 
	card12 = {value:'E'}; 
	card13 = {value:'F'}; 
	card14 = {value:'G'}; 
	card15 = {value:'H'};
	
	ABC.cardvalues = [card0, card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15];
	shuffleArray(ABC.cardvalues);
	
	
	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	};
	
	
	$('#reset').click(function(){
		ABC.score = 0;
		$('#yourscore').html(ABC.score);
		ABC.turns = 0;
		$('#yourturns').html(ABC.turns);
		ABC.index = 0;
		shuffleArray(ABC.cardvalues);
		$('.board > div').css('background-color', 'black');
		$('.board > div').css('color', 'black');
		
	});


    $('.board').on('click','> div', function () {
      if(ABC.index<2){
            //var cell = (event.target.id);
			var arrayindex = this.id.split('id')[1];
			console.log(arrayindex)
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
								//alert('you found a pair');
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
										if(ABC.score ===8){
											alert('you won!');
										}
								}, 1500);
							}
									
							
							if (ABC.cell1t !== ABC.cell2t) {
								//alert('not a pair');
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




	
	
