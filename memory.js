function orderedTiles(size){
    var letters = [ 
        "A", "B", "C", "D", "E", "F", "G",
        "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", "U",
        "V", "W", "X", "Y", "Z"
    ];
    var tiles = [];
    var next_tile_id = 1;
    var num_distinct_tiles = Math.floor(size/2);
    for (var i=0; i<num_distinct_tiles; i++){
        // cycle through the letters
        var letter_ind = i % letters.length;
        var letter = letters[letter_ind];
        // append twice so we know there are 2 to match
        tiles.push(new Tile("tile"+next_tile_id, letter));
        next_tile_id++;
        tiles.push(new Tile("tile"+next_tile_id, letter));
        next_tile_id++;
    }
    return tiles;
}

function shuffleTiles(tiles){
    for (var i=0; i<tiles.length; i++){
        var swap_ind = Math.floor(Math.random()*tiles.length);
        var old_tile = tiles[swap_ind];
        tiles[swap_ind] = tiles[i];
        tiles[i] = old_tile;
    } 
}

function setUpBoard(size, num_columns, num_rows){
  if (size <= 0 || num_columns*num_rows != size){
    console.log(size + ", " + num_columns + ", " + num_rows + " are invalid parameters");
    return;  
  }
  var tiles = orderedTiles(size);
  shuffleTiles(tiles);
  var theBoard = new Board("board", tiles, num_rows, num_columns);
  theBoard.draw();
  return theBoard;
}

function convertToInt(str){
    var new_int = parseInt(str);
    if (isNaN(new_int)){
        console.log("err: " + str + " is not a number");
        return 0;
    }
    return new_int;
}

$(function() {
    var theGame;
    $('.win-status').hide();
    $('#generate-board-btn').click(
      function(){
        var size = convertToInt($('#board-size').val());
        var num_columns = convertToInt($('#board-num-cols').val());
        var num_rows = convertToInt($('#board-num-rows').val());  
        theGame = new Game(setUpBoard(size, num_columns, num_rows));
        $('.tile').click( 
          function(){
            var clicked_tile = theGame.board.getTile(this.id);
            theGame.startTurn(clicked_tile);
          }
        );
      }  
    );
});

