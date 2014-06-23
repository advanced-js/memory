
// Array holds all the contents that hides under the cards. Array used to dyamically create all cards
var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];

//Empty array used to store memory values
var memory_values = [];

//Empty array that stores memory tile ids
var memory_tile_ids = [];

//Variable for total tiles flipped
var tiles_flipped = 0;

//Variable keeping score
var tries = 0;

//Anonymous Method used to shuffle the memory board
Array.prototype.memory_tile_shuffle = function () {
    //Gets the length of the array
    var i = this.length, j, temp;
    
    //Loops until the array is parsed
    while (--i > 0) 
    {
        //Generates Random number ranging from 1 to i
        j = Math.floor(Math.random() * (i + 1));
    
        //Copies the tile value to temp value
        temp = this[j];

        //Copies the tile value from this[i] into this[j]
        this[j] = this[i];

        //Copies the temp value into this[i]
        this[i] = temp;
    }
}

//Function generates a new board
function newBoard() 
{
    //Resets score to 0 each time the newBoard is created
    tries = 0;

    //Resets the tiles_flipped value to 0, each time a new board is generated
    tiles_flipped = 0;

    //Increments the score onscreen
    tries_txt.innerHTML = tries;

    if (tiles_flipped != 0) {
        tiles_flipped_txt.innerHTML = Math.floor((tiles_flipped / (tries - 1)) * 100);
    }
    else {
        tiles_flipped_txt.innerHTML = 0;
    }

    //Empty variable created for the output
    var output = '';

    //Shuffle the Memory array 
    memory_array.memory_tile_shuffle();

    //Loop runs over the length of memory_array to add to the output variable all of the divs representing those cards
    for (var i = 0; i < memory_array.length; i++) 
    {
        //Each div gets a id of a dynamic tile number, starting with tile_0. Upon clicking, the memoryFlipTile is called.   
        output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
    }

    document.getElementById('memory_board').innerHTML = output;
}

//Each card, when flipped, runs this Function to flips tiles. 
//Has an argument of the div id and the data for each cards
function memoryFlipTile(tile, val) {
    //Checks if the tile is empty and memory_values length is less than 2
    if (tile.innerHTML == "" && memory_values.length < 2) {
        //If Yes, do everythig below.

        //Increments the score
            tries += 1;

        //Increments the score onscreen
            tries_txt.innerHTML = tries;

        if (tiles_flipped != 0) {
            tiles_flipped_txt.innerHTML = Math.floor((tiles_flipped / (tries - 1)) * 100);
        }
        else {
                tiles_flipped_txt.innerHTML = 0;
        }

            //change the card background White
        tile.style.background = '#FFF';

        //Sets the value to innerHTML of the card/tile
        tile.innerHTML = val;

        //If the memory values is 0, push the value and tile id into the memory_values and memory_tile_ids arrays
        if (memory_values.length == 0) 
        {
            /*Stores the arrays hold values representing the card/tile and its value into the arrays*/

            //Pushes/Stores the value under the card, into the memory_value array
            memory_values.push(val);
            //Pushes/Stores the tile id into the memory_tile_ids array
            memory_tile_ids.push(tile.id);
        }
        else if (memory_values.length == 1) 
        {//Fires if 1 card has already been clicked, is flipped over and user is clicking the 2nd tile/card
            //Pushes/Stores the value under the 2nd card, into the memory_value array
            memory_values.push(val);
            //Pushes/Stores the tile id of the 2nd card into the memory_tile_ids array
            memory_tile_ids.push(tile.id);
        
            //Compares whether the values in the 2 flipped tiles match
            if (memory_values[0] == memory_values[1]) {
                //Fires if both tiles match
                //Increments the tiles_flipped counter
                tiles_flipped += 2;

                //Clear both arrays
                memory_values = [];
                memory_tile_ids = [];

                //Check to see if the whole board is cleared
                if (tiles_flipped == memory_array.length) {
                    alert("Board cleared... generating new board");
                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
                }
            }
            else {
                function flip2Back() {
                    //Flip the 2 tiles back over
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = '#DDD';
                    tile_1.innerHTML = "";
                    tile_2.style.background = '#DDD';
                    tile_2.innerHTML = "";

                    //Clear both arrays
                    memory_values = [];
                    memory_tile_ids = [];
                }
                //If the flipped cards don't match, they are both flipped back in 700 ms
                setTimeout(flip2Back, 700);
            }
        }
    }
}
