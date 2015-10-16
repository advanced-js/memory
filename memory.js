var revealed = null;

function clicked() { 
    $(this).addClass('visible'); 

    if (revealed == null) {
        // first click
        revealed = this.innerHTML;  

    } else {
        // second click
        var thisValue = this.innerHTML; 

        if (thisValue == revealed) {
            // change color to yellow and make unclickable
            $('.visible').addClass('colorMatched'); 

            // then start over
            reveal = null; 
            $('.visible').removeClass('visible'); 

        } else { 
            // start over
            reveal = null; 
        }
    }

    console.log(this.innerHTML); 
}; 

$('span').on('click', clicked); 