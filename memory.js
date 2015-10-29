var Memory = { 

    revealedCardVal: null,

    init: function() { 
        // create an array of all the numbers for a 6x6 board
        var numArray = []; 

        for(var i = 1; i <= 18; i++) { 
            numArray.push(i); 
            numArray.push(i); 
        }

        var shuffledNumbers = this.shuffleArray(numArray); 

        this.fillGame(shuffledNumbers); 

        this.addEventListeners(); 

    }, 

    shuffleArray: function(array) { 
        // for reference: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }, 

    fillGame: function(shuffledNums) { 
        var tableEls = ""; 

        for(var i = 0; i < shuffledNums.length; i++) { 
            if((i + 6) % 6 === 0) { 
                tableEls += '<tr><td><span>' + shuffledNums[i] + '</span></td>'; 
            } else if ((i + 1) % 6 === 0) { 
                tableEls += '<td><span>' + shuffledNums[i] + '</span></td></tr>'; 
            } else { 
                tableEls += '<td><span>' + shuffledNums[i] + '</span></td>'; 
            }
        }

        $('#MemoryGame tbody').append(tableEls);
    }, 

    addEventListeners: function() { 
        $('span').on('click', function() { 
            if(!$(this).hasClass('visible') && !$(this).hasClass('disabled')) { 
                $(this).addClass('visible'); 

                if(Memory.revealedCardVal === null) {
                    Memory.firstClick($(this).html()); 
                } else { 
                    Memory.secondClick($(this).html());
                }
            }
        }); 

        $('#Reset').on('click', function() { 
            Memory.reset(); 
        }); 
    }, 

    firstClick: function(revealedVal) { 
        Memory.revealedCardVal = revealedVal; 
    }, 

    secondClick: function(secondCardVal) { 
        Memory.compareVals(secondCardVal); 

        setTimeout(function() { 
            Memory.revealedCardVal = null; 
            $('.visible').removeClass('visible'); 
        }, 600); 
    }, 

    compareVals: function(secondCardVal) { 
        if (secondCardVal === Memory.revealedCardVal) {
            $('.visible').addClass('colorMatched'); 

            setTimeout(function() { 
                $('.colorMatched').addClass('disabled'); 
            }, 500); 

            Memory.isGameOver(); 
        } 
    }, 

    isGameOver: function() { 
        if($('.colorMatched').length == $('td').length) { 
            $('#Message').addClass('show'); 
        }
    }, 

    reset: function() { 
        $('#Message').removeClass('show'); 
        $('#MemoryGame tbody').html(''); 
        
        var numArray = []; 

        for(var i = 1; i <= 18; i++) { 
            numArray.push(i); 
            numArray.push(i); 
        }

        var shuffledNumbers = Memory.shuffleArray(numArray); 

        Memory.fillGame(shuffledNumbers); 
    }
}

Memory.init(); 
