// JavaScript Document
//current issues: the second function under validate won't call, or if added in doc.ready nothing loads
// I could also change the on click to the jquery vs html

var totalcards;
var cardobjs= [];
//need to read through this to shuffle


function validate() {
    errorMsg = "";


    var rows = document.getElementById('row').value; 
    if (rows =='' || isNaN(rows)) {     
        errorMsg = "yes";
    }

    var cols = document.getElementById('col').value; 
    if (cols =='' || isNaN(cols)) {          		      
        errorMsg = "yes";
    }

	var totalcards = calcCards(rows, cols); 
    if (totalcards ==0 || totalcards%2 !== 0 ){          		        
        errorMsg = "yes";
    }

    if (errorMsg != '') {                                   	    
        document.getElementById("outputcalc").innerHTML = "Enter valid numeric values";
    	return(false);
    }

    

    document.getElementById("outputcalc").innerHTML = 'Total Memory Cards ' + totalcards;
	newCards(totalcards);
	
	
	
};








	
function calcCards(rows, cols) {
    var rows = rows;					
    var cols = cols;					
    var totalcards =  rows * cols;   
    return(totalcards);
};



function Cards(value, divid){
	this.value = value;
	$('#board').append('<div class = card id='+divid+'>');
	
};

function newCards(num){
	for(i=0; i<(num); i=i+2){
		var cardval = i;
		var id1 = 'id'+i;
		var id2 = 'id'+(i+1);
		//window["Card"+i] = new Cards(cardval, id1);
		cardobjs[i] = new Cards(cardval, id1);
		
		//["Object"+i].id = id1;
		//window["Card"+(i+1)] = new Cards(cardval, id2);
		cardobjs[i+1] = new Cards(cardval, id2);
		//["Object"+i].id = id2;
		
	}
	

};







$('.card').click(function(event){
	  alert('you clicked a memory card');
});




/*
function newCards(num){
	for(i=0; i<(num/2); i++){
		$('#board').append('<div class=card>');
	}

};
	
function assignClass(num){
	var divs = document.getElementsByClassName("card");
		for(i=0; i<(num/2); i++) {
		var idi = "id"+i;
		divs[0].class = idi;   
		}	
		console.log('it worked');
};
*/	




	
	



