$(document).ready(function() {
  var score = 0;
  var cardOne = 0;
  var cardTwo = 0;
  var cardNum = $(".card").attr("class");
  var a, b;

  $('.card').on('click', function flip() {

    if(cardOne === 0) {
      $(this).addClass('flipped');
      cardOne ++;
      score ++;
      $('.score').html('' + score);
      a = $(this).attr("class");
      aText = $(this).text();
      console.log('test', a);
      console.log('test', aText);

      cardOneIClicked = $(this);

      console.log('CARDONE', cardOne);
      console.log('CARDTWO', cardTwo);
    } 
    else if ((cardOne === 1) && (cardTwo === 0)) {
      $(this).addClass('flipped');
      cardTwo ++;
      score ++;
      $('.score').html('' + score);
      b = $(this).attr("class");
      bText = $(this).text();

      console.log('CARDONE', cardOne);
      console.log('CARDTWO', cardTwo);

      if((a === b) && (aText === bText)) { //if both have class flipped     
        setTimeout(function () {
          score -=2;
          $('.score').html('' + score);
          $('.flipped').addClass('matched');
          $('.matched').removeClass('flipped');
          cardOne = 0;
          cardTwo = 0;
        }, 1500);
      } 
      else {
        setTimeout(function(){
          $('.flipped').removeClass('flipped');
          cardOne = 0;
          cardTwo = 0;
        }, 1500);
      }
    }
    else if ((cardOne !== 0) && (cardTwo !== 0)) {
      alert("STAAAHP!");

    }
  });

  $('.reset-button').on('click', function() {
    score = 0;
    cardOne = 0;
    cardTwo = 0;
    $('.score').html('' + score);
    $('.card').removeClass('flipped');
    $('.card').removeClass('matched');
  });
});

