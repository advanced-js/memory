$(document).ready(function() {

    var table = $('#container');
    var numberOfBoxes = 18;
    var boxSize = 100;
    var enterNum = $("#enterNum");
    var enterSize = $("#enterSize");
    var cardArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var currentArr = [];
    var matchArr = [];
    var clickCount = 0;
    var allClicks = 0;
    var matchCount = 0;
    var run = false;

    // Shuffle function from here: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    Array.prototype.shuffle = function() {
      var i = this.length, j, temp;
      if (i === 0) { return this; }
      while (--i) {
         j = Math.floor(Math.random() * (i + 1));
         temp = this[i];
         this[i] = this[j];
         this[j] = temp;
      }
      return this;
    };

    var Card = function(size,id) {
        this.size = size;
        this.id = id;
        this.$el = $('<div id="' + id + '" style="width:' + size + 'px; line-height:' + size + 'px; height:' + size + 'px;">' +
                    '<figure class="front"></figure>' +
                    '<figure class="back">' + id + '</figure>' +
                    '</div>');
        this.$el.bind('click', this.flipCard);
    };

    Card.prototype.flipCard = function() {
        if (run && !$(this).hasClass('show')) {
            $(this).toggleClass('show');
            clickCount++;
            allClicks++;
            $('#score').html(allClicks);
            matchArr.push(this);
        }
        if (clickCount > 1 && matchArr[0].id === matchArr[1].id) {
            cardMatch();
            checkForWin();
        } else if (clickCount > 1 && matchArr[0].id !== matchArr[1].id) {
            noMatch();
        }
    };

    function cardMatch() {
        clickCount = 0;
        matchArr=[];
        matchCount++;
    }

    function noMatch() {
        var tempCard = matchArr[0];
        var tempCard1 = matchArr[1];
        setTimeout(function() {
            $(tempCard).removeClass('show');
            $(tempCard1).removeClass('show');
            },675);
        clickCount = 0;
        matchArr=[];
    }

    function checkForWin() {
        if(matchCount === numberOfBoxes / 2) {
            alert("You Win!");
        }
    }

    function createCards(loader) {
        for(var i = 0; i < numberOfBoxes / 2; i += 1) {
            currentArr.push(loader[i]);
            currentArr.push(loader[i]);
        }
        var cards = [];
        for (var j = 0; j < numberOfBoxes; j += 1) {
            cards[j] = new Card(boxSize,currentArr[j]);
        }
        return cards.shuffle();
    }

    function reBuild(){
        run = false;
        matchCount = 0;
        allClicks = 0;
        $('#score').html(allClicks);
        boxSize = $('#enterSize').val();
        numberOfBoxes = $('#enterNum').val();
        defaultVal($(enterNum));
        defaultVal($(enterSize));
        create = createCards(cardArr.shuffle());
        parseCards(create);
    }

    function defaultVal(input){
        var defaultValue = input.val();
        input.focus(function() {
            if(input.val() === defaultValue) {
                input.val("");
            }
        }).blur(function(){
            if(input.val().length === 0) {
                input.val(defaultValue);
            }
        });
    }

    $(enterNum).on("change", function minMaxCardNum() {
        var val = Math.abs(parseInt(this.value, 10) || 1);
        if (val > 26 ){
            val = 26;
            this.value = val;
            alert("Number of cards was reduced to 26");
        } else if (val < 8) {
            val = 8;
            this.value = val;
            alert("Number of cards was raised to 8");
        }
        if (val % 2 !== 0) {
            alert("Please enter an even number between 8 and 26");
        }
    });

    $(enterSize).on("change", function minMaxCardSize() {
        var val = Math.abs(parseInt(this.value, 10) || 1);
        if ( val > 100){
            val = 100;
            this.value = val;
            alert("Card size was reduced to 100");
        } else if (val < 50) {
            val = 50;
            this.value = val;
            alert("Card size was raised to 50");
        }
    });

    $("#btn").click(function resetButton() {
        $('#container div').remove();
        setTimeout(function() {
            reBuild();
        },500);
    });

    function parseCards(split){
        var splitCard = split;
        $(table).css('width', (boxSize * 6) + 124);
        allClicks = 0;
        $('#score').html(allClicks);
        defaultVal($(enterNum));
        defaultVal($(enterSize));
        for (i = 0; i < splitCard.length; i += 1) {
            $(table).append(splitCard[i].$el);
            splitCard[i].flipCard();
        }
        run = true;
    }

    parseCards(createCards(cardArr.shuffle()));

});
