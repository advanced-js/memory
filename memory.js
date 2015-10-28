//THIS IS OUR ORIGINAL IN-CLASS PAIR EFFORT

// var revealed = null;

// function clicked() { 
//     $(this).addClass('visible'); 

//     if (revealed == null) {
//         // first click
//         revealed = this.innerHTML;  

//     } else {
//         // second click
//         var thisValue = this.innerHTML; 

//         if (thisValue == revealed) {
//             // change color to yellow and make unclickable
//             $('.visible').addClass('colorMatched'); 

//             // then start over
//             reveal = null; 
//             $('.visible').removeClass('visible'); 

//         } else { 
//             // start over
//             reveal = null; 
//        }
//    }

//     console.log(this.innerHTML); 
// }; 

// $('span').on('click', clicked);  

//My completed version of in-class assignment:
//MEMORY V2

var firstClick = null;
var secondClick = null;

function clicked() {

    $(this).addClass('visible');

    if (firstClick === null) {

    // first click

         firstClick = this.innerHTML;

         $(this).addClass('firstClick');

     } else {

     // second click

    secondClick = this.innerHTML;

     $(this).addClass('secondClick');

 }

 if (firstClick === secondClick) {

    $('.firstClick, .secondClick').addClass('colorMatched');

} else {

    var timeoutID = setTimeout(function(){$('td').addClass('frozen');},2000);

    var altTimeoutID = setTimeout(function(){$('#buttonDiv').show();},1000);

}

}

function reset() {

    $('*').removeClass();

    $('#buttonDiv').hide();

    firstClick = null;
    secondClick = null;

}

$('span').on('click', clicked);

//Thanks to pair partner Marianne for reset button idea