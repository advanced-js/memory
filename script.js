$('td').click(function() {
  var tdId = this.id;
  clicker(tdId);
});

function clicker(tdId) {
  counter(1,tdId);
};
  
var count = 0;
var tdIdarray = [];
function counter(num, tdId) {
  tdIdarray.push(tdId);
  console.log(tdIdarray);
  count = count + num;
  if ((count % 2) === 0) { 
    tdIdarray[tdIdarray.length-1];
  }
  if(tdIdarray[tdIdarray.length-1] == tdIdarray[tdIdarray.length-2]){
    alert("You win!");
    tdIdarray=[];
  }
  
};