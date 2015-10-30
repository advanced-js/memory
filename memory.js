function setUpBoard(){
  var tiles = [
      new Tile("tile1", "A"),
      new Tile("tile2", "B"),
      new Tile("tile3", "B"),
      new Tile("tile4", "C"),

      new Tile("tile5", "C"),
      new Tile("tile6", "E"),
      new Tile("tile7", "E"),
      new Tile("tile8", "G"),

      new Tile("tile9", "F"),
      new Tile("tile10", "G"),
      new Tile("tile11", "F"),
      new Tile("tile12", "A"),

      new Tile("tile13", "D"),
      new Tile("tile14", "D"),
      new Tile("tile15", "H"),
      new Tile("tile16", "H")
    ];
  var theBoard = new Board("board", tiles, 4, 4);
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

