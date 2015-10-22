var revealed = null;

// functions

function clicked() { 
    if(!$(this).hasClass('visible') && !$(this).hasClass('disabled')) { 
        // only fire if what we clicked on is not already visible or disabled!
        $(this).addClass('visible'); 

        if (revealed === null) {
            // first click
            revealed = this.innerHTML; 

        } else {
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

                // is the game over? 
                if($('.colorMatched').length == $('td').length) { 
                    $('#Message').addClass('show'); 
                }
            } 

            setTimeout(function() { 
                // after half a second, start over again!
                revealed = null; 
                $('.visible').removeClass('visible'); 
            }, 500); 
        }
    }
}


function reset() { 
    $('span').removeClass('visible').removeClass('colorMatched').removeClass('disabled'); 
    $('#Message').removeClass('show'); 
}

// event listeners

$('span').on('click', clicked); 

$('#Reset').on('click', reset); 

