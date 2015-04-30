var Gameboard = function (size) {
  if (size % 2 !== 0) {
    size ++;
  }
  this.size = size;
  this.piecesArray = new PiecesArray(Math.pow(size, 2)).shuffledPieces();
  this.currentPieces = [];
  this.matchedPieces = 0;
};

Gameboard.prototype.buildBoard = function(){
  var index = 0;

  for (numRow = 0; numRow < this.size; numRow++) {
    $(".gameboard").append("<tr>");

    for (numCell = 0; numCell < this.size; numCell++) {
      var piece = this.piecesArray[index];
      $(".gameboard").append("<td><div class='piece' data-piece-type='" + piece + "'>" + piece + "</div></td>");
      index++;
    }

    $(".gameboard").append("</tr>");
  }
};

Gameboard.prototype.reset = function() {
  this.matchedPieces = 0;
  this.currentPieces = [];
  // hide ALL pieces
  $(".piece").hide();
};

//  todo: PREVENT SHOWING PIECES WHEN HIDE PIECES HASN'T HAPPENED YET
Gameboard.prototype.showPiece = function(piece) {
  piece.show();
  this.currentPieces.push(piece);
};

Gameboard.prototype.hidePieces = function() {
  for (var i = 0; i < this.currentPieces.length; i++) {
    var piece = this.currentPieces[i];
    piece.hide();
  }
  this.currentPieces = [];
};

Gameboard.prototype.checkMatch = function() {
  var match = (this.currentPieces[0].data("piece-type") === this.currentPieces[1].data("piece-type"));
  if (match) {
    $("#message").html("it's a match!");
    this.matchedPieces += 2;
    this.currentPieces = [];
    if (this.matchedPieces === this.piecesArray.length) {
      $("#message").html("you win!");
    }
  } else {
    $("#message").html("sorry, you're wrong");
    var self = this;

    setTimeout (function() {
      self.hidePieces();
      $("#message").html("");
    }, 1000);
  }
};