var revealed = null;

function clicked() { 
    if(!$(this).hasClass('visible') && !$(this).hasClass('disabled')) { 
        // only fire if what we clicked on is not already visible or disabled!
        $(this).addClass('visible'); 

        if (revealed == null) {
            console.log('first click'); 

            // first click
            revealed = this.innerHTML; 

        } else {
            console.log('second click'); 

            // second click
            var thisValue = this.innerHTML; 

            // if there's a match!
            if (thisValue == revealed) {
                // change color to yellow and make unclickable
                $('.visible').addClass('colorMatched'); 

                setTimeout(function() { 
                // remove fancy yellow color
                    $('.colorMatched').addClass('disabled'); 
                }, 500); 
            } 

            setTimeout(function() { 
                // after half a second, start over again!
                revealed = null; 
                $('.visible').removeClass('visible'); 
            }, 500); 
        }
    }
}; 

$('span').on('click', clicked); 

// array of numbers