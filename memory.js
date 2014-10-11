var firstSquare = null;
var secondSquare = null;
var counter = 0;

$( document ).ready(function() {
  $( "td" ).bind({
    click: function() {

      $(this).css("background-color", "white");
      counter ++;
      $('.counter').html('' + counter);
      
      if(firstSquare === null)
      {
        firstSquare = $(this);
        firstSquare.html(firstSquare.attr("class"));
      }
      else if(firstSquare != null)
      {
        console.log($(this).attr("class"));
        console.log(firstSquare.attr("class"));
        secondSquare = $(this);
        secondSquare.html(secondSquare.attr("class"));
        
        if(firstSquare.attr("class") === secondSquare.attr("class"))
        {
          counter -= 2;
          $('.counter').html('' + counter); 
          setTimeout(function(){
            firstSquare.css("background-color", "black");
            secondSquare.css("background-color", "black");
          
            firstSquare = null;
            secondSquare = null;
          }, 1500);
        }
        
        else
        {
          setTimeout(function()
          {
            firstSquare.css("background-color", "red");
            secondSquare.css("background-color", "red");
            firstSquare.html("");
            secondSquare.html("");
            firstSquare = null;
            secondSquare = null;
          }, 1500);
        }
      }
    }
  });
  
});