var Click = (function() {
  this.numClicks = 0;
  this.arr = [];
});

var clickTd = new Click();


Click.prototype.incrementClicks = function() {
  this.numClicks++;
  $('.clickCount').empty();
  $('.clickCount').append("Clicks: "+this.numClicks);
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
}
Click.prototype.resetPiece = function() {
  $('.status').empty();
  // $('.status').append('<p>Sorry Wrong</p>');
  $('.' + this.arr[this.arr.length - 1]).hide();
  $('.' + this.arr[this.arr.length - 2]).hide();
}
Click.prototype.removePiece = function() {
  $('.status').empty();
  // $('.status').append('<p>You got a match!</p>');
  $('.' + this.arr[this.arr.length - 1]).parent().css('visibility', 'hidden');
  $('.' + this.arr[this.arr.length - 2]).parent().css('visibility', 'hidden');
}



//array play
var colorArr = ["blue", "red", "green", "pink", "black", "orange", "purple", "gray", "white", "turquoise", "Chartreuse", "LightSkyBlue", "PeachPuff", "yellow"];

var num = 4;
if (num % 2 === 0) {
  pickColors(num, colorArr)
} else {
  var addOne = num + 1;
  pickColors(addOne, colorArr);
}

function pickColors(num, array) {
  var size = num * num / 2;
  console.log(size);
  pickedColors = [];
  for (var i = 0; i < size; i++) {
    pickedColors.push(array[i], array[i]);
  }
  console.log(pickedColors);
  shuffleColors(pickedColors);
}
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleColors(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  console.log(array);
  buildBoard(array);
}

function buildBoard(shuffledColors) {
  var board = "";
  var index = 0;
  for (var x = 0; x < num; x++) {
    board += "<tr>";
    for (var i = 0; i < num; i++) {
      board += '<td><div class="' + shuffledColors[index] + '" style="background-color: ' + shuffledColors[index] + '"></div></td>';
      index++;
    }
    board += "</tr>"
    console.log(board);
  }
  $("table").append(board);
}
//Start With click
$("td").click(function(e) {
  var _this = this;
  var tdClass = $(_this).children().attr('class');
  var child = $(_this).children();
  $(child).show();
  setTimeout(function() {
    clickTd.incrementClicks();
    clickTd.addToArr(tdClass);
  }, 500);
});
