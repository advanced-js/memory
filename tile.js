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

