var fiftyShades = [
                            '#262626', '#292929', '#2B2B2B', '#2E2E2E', '#303030', '#333', '#363636', '#383838', '#3B3B3B', '#3D3D3D',
                            '#404040', '#424242', '#454545', '#474747', '#4A4A4A', '#4D4D4D', '#4F4F4F', '#525252', '#545454', '#555',
                            '#575757', '#595959', '#5C5C5C', '#5E5E5E', '#616161', '#636363', '#666', '#696969', '#6B6B6B', '#6E6E6E',
                            '#707070', '#737373', '#757575', '#777', '#787878', '#7A7A7A', '#7D7D7D', '#7F7F7F', '#828282', '#858585',
                            '#878787', '#888', '#8A8A8A', '#8C8C8C', '#8F8F8F', '#919191', '#949494', '#969696', '#999', '#9C9C9C',
                            '#262626', '#292929', '#2B2B2B', '#2E2E2E', '#303030', '#333', '#363636', '#383838', '#3B3B3B', '#3D3D3D',
                            '#404040', '#424242', '#454545', '#474747', '#4A4A4A', '#4D4D4D', '#4F4F4F', '#525252', '#545454', '#555',
                            '#575757', '#595959', '#5C5C5C', '#5E5E5E', '#616161', '#636363', '#666', '#696969', '#6B6B6B', '#6E6E6E',
                            '#707070', '#737373', '#757575', '#777', '#787878', '#7A7A7A', '#7D7D7D', '#7F7F7F', '#828282', '#858585',
                            '#878787', '#888', '#8A8A8A', '#8C8C8C', '#8F8F8F', '#919191', '#949494', '#969696', '#999', '#9C9C9C'
                          ];

    var APP = APP || {};

    APP.score = APP.score || 0;

    APP.activeCards = [];

      APP.getScore = function(value){
        var points = parseInt(value),
            message;

        APP.score += points;

        (APP.score <= 10) ? message = APP.score + " come on, buddy, pull it together." : message = APP.score + " alight, alight";

        $('.score').html(message);
      }

      APP.determineMatch = function(){
        if(APP.activeCards[0].color === APP.activeCards[1].color){ //MATCH
          alert('Congratulations you won! The board will now be reset');
          APP.getScore(1);
          APP.blackoutActiveCards();
          APP.resetStatus();
        }
        else{ //NO MATCH
          alert('No match, please try again');
          APP.getScore(-1);
          APP.blackoutActiveCards();
          APP.resetStatus();
        }
      };

      APP.blackoutActiveCards = function(){
        var box1 = $('#' + APP.activeCards[0].id);
        var box2 = $('#' + APP.activeCards[1].id);

        setTimeout(function(){
            box1.css('background-color', '#FFF');
            box2.css('background-color', '#FFF');
        }, 1000);
      };

      APP.resetStatus = function(){
        APP.activeCards = [];
      };

      //REVEAL THE BOX's COLOR ON CLICK
      $('.box').click(function setBgToDataColor(){
        $(this).css('background-color', ($(this).attr('data-color')));
      });

      //LOGIC
      $('.box').click(function touchCardsActive(){
        
        //Add the new card to the total active cards
        APP.activeCards.push({
                                color: $(this).attr('data-color'),
                                id: $(this).attr('id')
                            });

        if(APP.activeCards.length >= 2){
          APP.determineMatch();
        }
      });

      APP.setGreys = function(){
        var boxes = $('.box'),
            shadesUsed = [];

        //SET THE BOX IDS
        for(var i = 0; i < boxes.length; i ++){
          boxes[i].id = 'box' + (i + 1);
        }

        //SET THE BOX DATA-COLORS
        for(var i = 0; i < 100; i ++){
            
          var randNum = Math.floor((Math.random() * fiftyShades.length)); //get a random number

          if(_.contains(shadesUsed, fiftyShades[randNum])){
            boxes[i].setAttribute('data-color', fiftyShades[randNum]);//apply this color to the box
            fiftyShades.splice(randNum, 1); //delete the color from the array, only if it has already been used.
          }
          else{
            shadesUsed.push(fiftyShades[randNum]); //save a reference to the color we are using
            boxes[i].setAttribute('data-color', fiftyShades[randNum]);//apply this color to the box
            //don't delete it, continue
          }
        }

      }
      
      APP.setGreys();