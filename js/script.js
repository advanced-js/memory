var Click = (function() {
  this.numClicks = 0;
  this.arr = [];
});

var clickTd = new Click();

//Start With click
$('body').on('click', 'td', (function(e) {
  var _this = this;
  var tdClass = $(_this).children().attr('class');
  var child = $(_this).children();
  $(child).show();
  setTimeout(function() {
    clickTd.incrementClicks();
    clickTd.addToArr(tdClass);
  }, 500);
}));

Click.prototype.incrementClicks = function() {
  this.numClicks++;
  $('.clickCount').empty();
  $('.clickCount').append("Clicks: " + this.numClicks);
};

Click.prototype.addToArr = function(tdClass) {
  this.arr.push(tdClass);
  if ((this.numClicks % 2) === 0) {
    clickTd.checkGame();
  }
};

Click.prototype.checkGame = function() {
  if (this.arr[this.arr.length - 1] === this.arr[this.arr.length - 2]) {
    clickTd.removePiece();
  } else {
    clickTd.resetPiece();
  }
};
Click.prototype.resetPiece = function() {
  $('.status').empty();
  // $('.status').append('<p>Sorry Wrong</p>');
  $('.' + this.arr[this.arr.length - 1]).hide();
  $('.' + this.arr[this.arr.length - 2]).hide();
};
Click.prototype.removePiece = function() {
  $('.status').empty();
  // $('.status').append('<p>You got a match!</p>');
  $('.' + this.arr[this.arr.length - 1]).parent().css('visibility', 'hidden');
  $('.' + this.arr[this.arr.length - 2]).parent().css('visibility', 'hidden');
};



//Building board
var BuildGame = function(num) {
  this.num = num;
  this.checkEvenBoard(num);
};
//Start build board process
$(".btn").click(function() {
  var num;
  num = $("input").val();
  var newBoard = new BuildGame(num);
});
BuildGame.prototype.checkEvenBoard = function(num) {
  if (this.num % 2 === 0) {
    this.pickArrayColors(this.num);
  } else {
    this.num++;
    this.pickArrayColors(this.num);
  }
};

BuildGame.prototype.pickArrayColors = function(num) {
  var colorArr = ["blue", "red", "green", "pink", "black", "orange", "purple", "gray", "white", "turquoise", "Chartreuse", "LightSkyBlue", "PeachPuff", "yellow", "lightGreen", "hotPink", "indigo", "navy"];
  var size = (this.num * this.num) / 2;
  var pickedColors = [];
  for (var i = 0; i < size; i++) {
    pickedColors.push(colorArr[i], colorArr[i]);
  }
  this.shuffleColors(this.num, pickedColors);
};
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
BuildGame.prototype.shuffleColors = function(num, array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    //swap I and J
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  this.buildBoard(this.num, array);
};

BuildGame.prototype.buildBoard = function(num, shuffledColors) {
  var board = "";
  var index = 0;
  for (var x = 0; x < num; x++) {
    board += "<tr>";
    for (var i = 0; i < num; i++) {
      board += '<td><div class="' + shuffledColors[index] + '" style="background-color: ' + shuffledColors[index] + '"></div></td>';
      index++;
    }
    board += "</tr>";
  }
  $("table").append(board);
};
