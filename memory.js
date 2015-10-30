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

function setUpBoard(){
  var tiles = orderedTiles(100);
  shuffleTiles(tiles);
  var theBoard = new Board("board", tiles, 10, 10);
  theBoard.draw();
  return theBoard;
}

$(function() {
    var theGame = new Game(setUpBoard());
    $('.win-status').hide();
    $('.tile').click( 
      function(){
        var clicked_tile = theGame.board.getTile(this.id);
        theGame.startTurn(clicked_tile);
      }
    );
});

