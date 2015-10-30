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

