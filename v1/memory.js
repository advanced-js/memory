var firstSquare = null;
var secondSquare = null;
var score = 0;
var counter = 0;


$( document ).ready(function() {
  $( "td" ).on('click', function() {

      $(this).css("background-color", "white");
      score ++;
      $('.score').html('' + score);
      
      if(firstSquare === null) {
        firstSquare = $(this);
        firstSquare.html(firstSquare.attr("class"));
      }
      else if(firstSquare != null) {
        console.log($(this).attr("class"));
        console.log(firstSquare.attr("class"));
        secondSquare = $(this);
        secondSquare.html(secondSquare.attr("class"));
        
        if(firstSquare.attr("class") === secondSquare.attr("class")) { 
          score -= 2;
          $('.score').html('' + score); 
          setTimeout(function(){
            firstSquare.css("background-color", "black");
            secondSquare.css("background-color", "black");
            
            firstSquare.addClass(".clicked");
            secondSquare.addClass(".clicked");

          }, 1500);
        }
        
        else
        {
          setTimeout(function() {
            firstSquare.css("background-color", "red");
            secondSquare.css("background-color", "red");
            firstSquare.html("");
            secondSquare.html("");
            firstSquare = null;
            secondSquare = null;
          }, 1500);
        }
      }
  });

  $(".reset").on('click', function() {
    score = 0;
    $('.score').html('' + score);
    $("td").css("background-color", "red");
    $("td").html("");
  });
  
});