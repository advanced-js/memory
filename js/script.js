var Click = (function() {
  this.numClicks = 0;
  this.arr = [];
});

var clickTd = new Click();

$("td").click(function(e) {
  var _this = this;
  var tdClass = $(_this).children().attr('class');
  var child = $(_this).children();
  $(child).show();
  setTimeout(function(){
  clickTd.incrementClicks();
  clickTd.addToArr(tdClass);
}, 500);
});

Click.prototype.incrementClicks = function() {
  this.numClicks++;
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
    $('.' + this.arr[this.arr.length - 1]).hide();
    $('.' + this.arr[this.arr.length - 2]).hide();
  }
}
Click.prototype.resetPiece = function() {
  $('.status').empty();
  $('.status').append('<p>Sorry Wrong</p>');
}
Click.prototype.removePiece = function() {
  $('.status').empty();
  $('.status').append('<p>You got a match!</p>');
  $('.' + this.arr[this.arr.length - 1]).parent().css('visibility', 'hidden');
  $('.' + this.arr[this.arr.length - 2]).parent().css('visibility', 'hidden');
}
