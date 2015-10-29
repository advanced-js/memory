var Game = function(board){
  this.board = board;
};

Game.prototype = {
  // tests all activated tile(s) if it matches with the clicked tile
  findAnyMatch: function(clicked_tile){
    var matched_tile;
    this.board.allActivatedTiles().forEach(
        function(tile){
          if (tile.id !== clicked_tile.id && tile.value_matches(clicked_tile)){
            matched_tile = tile;
          }
        }
    );
    return matched_tile;
  },

  findAndRecordAnyMatch: function(clicked_tile){
     var matched_tile = this.findAnyMatch(clicked_tile);
     if (matched_tile !== undefined){
      console.log("match!");
      matched_tile.recordMatch();
      clicked_tile.recordMatch();
    }else{
      console.log("no match!");
    }
  },

  isSecondTurn: function(){
    return this.board.allActivatedTiles().length > 1;
  },

  // start the turn when a tile is clicked
  startTurn: function(clicked_tile){
    if (clicked_tile.shouldIgnoreClicks()){
        return;
    }
    // freeze to prevent click actions from happening
    this.board.allTiles().forEach( function(tile){ tile.freeze();} );
    clicked_tile.activate();
    clicked_tile.updateDomObj();
    if (this.isSecondTurn()) {
      this.findAndRecordAnyMatch(clicked_tile);
    }
    this.endTurn();
  },
  
  endTurn: function(){
   if (this.isSecondTurn()){
      this.endRound();
    }else{
      // unfreeze and update at the end of the turn
      this.board.allTiles().forEach(
          function(tile){ 
            tile.updateDomObj();
            tile.unfreeze();
          }
      );
    }
  },

  // at the end of a round, deactivate + unfreeze tiles
  // also test for a win
  endRound: function(){
    theGame = this;
    // set timeout so user has time to see result
    setTimeout(function(){
        theGame.board.allTiles().forEach(
          function(tile){
            tile.deactivate();
            tile.updateDomObj();
            tile.unfreeze();
          }
        );
        theGame.testWin();
    }, 500);
  },

  // test for the win case, where all tiles have been matched
  // show win status if it's a win, otherwise do nothing
  testWin: function(){
    var matched_tiles = this.board.allMatchedTiles();
    if (matched_tiles.length === this.board.size){
      $(".win-status").show();
    }
  }

};

var Board = function(id, tiles, num_rows, num_columns){
  this.id = id;
  this.tiles = tiles;
  this.size = tiles.length;
  this.num_rows = num_rows;
  this.num_columns = num_columns;
};

Board.prototype = {
  
  // returns a list of all Tiles that have matched with another
  allMatchedTiles: function(){
    return this.tiles.filter( function(tile){ return tile.matched; });
  },

  // returns a list of all Tiles that are activated
  allActivatedTiles: function() {
    return this.tiles.filter( function(tile){ return tile.activated; });
  },

  // returns all tiles
  allTiles: function() {
    return this.tiles;
  },

  // get the tile with this id
  getTile: function(tile_id){
    return this.tiles.find( function(tile){ return tile.id == tile_id; }); 
  },

  // draws the board as a table
  draw: function(){
    var table = $("<table>");
    var tiles_added = 0;
    for (var r=0; r<this.num_rows; r++){
      if (tiles_added >= this.size){
        break;
      }
      var row = $("<tr>");
      for (var c=0; c<this.num_columns; c++){
        if (tiles_added >= this.size){
          break;
        }
        var tile = this.tiles[tiles_added];
        row.append("<td><button id='"+tile.id+"' class='tile'/></td>");
        tiles_added++;
      }
      table.append(row);
    }
    $("#"+this.id).append(table);
  }
};

var Tile = function(id, value){
  this.id = id; 
  this.value = value;
  this.activated = false;
  this.matched = false;
  this.frozen = false;
};

Tile.prototype = {
  value_matches: function(other_tile){
    return this.value === other_tile.value;
  },
  activate: function(){
    this.activated = true;
  },
  deactivate: function(){
    this.activated = false;
  },
  recordMatch: function(){
    this.matched = true;
  },
  freeze: function() {
    this.frozen = true;
  },
  unfreeze: function(){
    this.frozen = false;
  },
  activateDomObj: function(){
    $("#"+this.id).text(this.value);
    return true;
  },
  deactivateDomObj: function(){
    $("#"+this.id).text("");
    return true;
  },
  hideDomObj: function(){
    $("#"+this.id).css("visibility", "hidden");
  },
  updateDomObj: function(){
    if (this.activated){
      this.activateDomObj();
    }else{
      this.deactivateDomObj();
    }
    if (this.matched){
      this.hideDomObj();
    }
  },
  shouldIgnoreClicks: function(){
    // if matched - out of the game ; if frozen - can't click for now
    return this.matched || this.frozen;
  }
};

$(function() {
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
    var theGame = new Game(theBoard);
    $('.win-status').hide();
    $('.tile').click( 
      function(){
        var tile_id = $(this).attr("id");
        var clicked_tile = theGame.board.getTile(tile_id);
        theGame.startTurn(clicked_tile);
      }
    );
});

