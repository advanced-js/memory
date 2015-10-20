$('td').click(function() {
  var _this = this;
  var tdId = $(_this).attr('class');
  clicker(tdId);
});

function clicker(tdId) {
  counter(1, tdId);
}
var count = 0;
var tdIdarray = [];

function counter(num, tdId) {
  tdIdarray.push(tdId);
  console.log(tdIdarray);
  count = count + num;
  console.log(count);
  if ((count % 2) === 0) {
    if (tdIdarray[tdIdarray.length - 1] === tdIdarray[tdIdarray.length - 2]) {
      console.log("match");
      $('.' + tdIdarray[tdIdarray.length - 1]).css('visibility', 'hidden');
      $('.' + tdIdarray[tdIdarray.length - 2]).css('visibility', 'hidden');
      $('.status').empty();
      $('.status').append('<p>You got a match!</p>');
    } else {
      console.log("no match");
      $('.status').empty();
      $('.status').append('<p>Sorry no match</p>');
    }

  }
}


var Click = (function() {
  this.numClicks = 0;
});

var clickTd = new Click();

var ClickArr = (function() {
  this.arr = [];
  console.log("This is the og arr: " + this.arr);
});

var clickToArr = new ClickArr();

$("td").click(function(e) {
  clickTd.incrementClicks();
  var _this = this;
  var tdId = $(_this).attr('class');
  clickToArr.pushArr(tdId);
  // pieces.addToArr();
});


Click.prototype.incrementClicks = function() {
  this.numClicks++;
  console.log("There have been: " + this.numClicks + " clicks");
  if ((this.numClicks % 2) === 0) {
    //check.checkCurrent();
    console.log("EVEN NUM");
  }
};

ClickArr.prototype.pushArr = function(tdId) {
  this.arr.push(tdId);
  console.log("This is the elements name: " + tdId);
  console.log("This is the array: " + this.arr);
  console.log("This is the arr length: " + this.arr.length);
  console.log("This is the last element: " + this.arr[this.arr.length - 1]);
};
