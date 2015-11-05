var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(function() {
  return .5 - Math.random();
});

function table (x, y){  
  document.write("<table border=1>");   
  document.write("<tr style= background-color:red>");
  document.write("</tr>");
  //Creating each row
  for (row=1; row<= x; row++){    
    document.write("<tr>");
    //Creating each column
    for(col=1; col <= y; col++){
      var newClass = nums.pop();
      document.write("<td class=\"" + newClass + "\">" + (" ? ") + "</td>");
    }
    document.write("</tr>");  
  }
  document.write("</table>");
};

table (5, 6); 

var boardIntel = function(theId){
  this.clicked = theId;
  boardIntel.group = [];
};

boardIntel.prototype.pusher = function(){
  $('td').click(function() {
     tdId = this.className;
    this.innerHTML = tdId;
    boardIntel.group.push(tdId);
    console.log(boardIntel.group)
    boardIntel2.matcher();
  });
};

boardIntel.prototype.matcher = function(){
  var x = boardIntel.group;
  if (x[x.length-1] ==  x[x.length-2]){
    var firstTd = x[x.length-1];
    var secondTd= x[x.length-2];
    var matchingCards = document.getElementsByClassName(firstTd);
    var $matchingCards = $(matchingCards);
    $(matchingCards).css('visibility', 'hidden');
    alert("You win!");
    boardIntel.group = [];
  }
};

var boardIntel2 = new boardIntel;
boardIntel2.pusher();