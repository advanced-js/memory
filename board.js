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

  // clears the board - removes table
  clear: function(){
    $("#"+this.id).html("");    
  },

  // draws the board as a table
  draw: function(){
    this.clear();
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

