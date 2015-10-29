var maxRow = Math.floor((Math.random() * 10) + 1);
var maxCol = Math.floor((Math.random() * 10) + 1);

function table (x, y){  
  var idNo = Math.floor((Math.random() * 5) + 2);
  var idNo2 = Math.floor((Math.random() * 2) + 1);
  document.write("<table border=1>");   
  document.write("<tr style= background-color:red>");
  document.write("</tr>");
  for (row=1; row<= x; row++){    
    document.write("<tr>");

    for(col=1; col <= y; col++){
      if (col <= 1){
          document.write("<td>" + (" ? ") + "</td>");
      }
      else {
        $( "tr td:nth-child(odd)" ).attr("id", idNo);
  $( "tr td:nth-child(even)" ).attr("id", idNo2); 
        document.write("<td = idNo>" + (" ? ") + "</td>");
      }
    }
    document.write("</tr>");  
  }
  document.write("</table>");
};

table (10, 10); //User can also enter maxRow and maxCol for random table size.


var boardIntel = function(theId){
  this.clicked = theId;
  boardIntel.group = [];
  };

boardIntel.prototype.pusher = function(){
  $('td').click(function() {
  var tdId = this.id;
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
    document.getElementById(firstTd).style.visibility = "hidden";
    alert("You win!");
    boardIntel.group = [];
  }
};

var boardIntel2 = new boardIntel;
boardIntel2.pusher();