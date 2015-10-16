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
