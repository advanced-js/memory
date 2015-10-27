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

var firstClick = null;

function clicked() { 
    $(this).addClass('visible'); 

    if (firstClick == null) {
        // first click
        firstClick = this.innerHTML;
            $(this).addClass('firstClick'); 

    } else {
        // second click
        var secondClick = this.innerHTML; 
            $(this).addClass('secondClick'); 

        if (firstClick == secondClick) {
            
            $('.firstClick, .secondClick').addClass('colorMatched');

        } else {
            //third click
                var thirdClick = this.innerHTML;

                $(this).addClass('thirdClick'); 

                if (firstClick == thirdClick) {

                $('.firstClick, .thirdClick').addClass('colorMatched');

                }
            }
        }
    };
$('span').on('click', clicked);