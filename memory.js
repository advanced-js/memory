$(document).ready(function() {

    var table = $('#container');
    var boxNum = 18;
    var boxSize = 100;
    var enterNum = $("#enterNum");
    var enterSize = $("#enterSize");
    var cardArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var currentArr = [];
    var matchArr = [];
    var clickCount = 0;
    var allClicks = 0;
    var matchCount = 0;

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

    function loadArr(loader){
    	for(var i = 0; i < boxNum / 2; i += 1) {
    	currentArr.push(loader[i]);
    	currentArr.push(loader[i]);
    	}
    }

    var Card = function(size,id) {
        this.size = size;
        this.id = id;
        this.$el = $('<div id="'+id+'" style="width:' + size +'px; line-height:'+ size +'px; height:' + size + 'px;"><figure class="front"></figure><figure class="back">' + id + '</figure></div>');
    };

    Card.prototype.flipCard = function() {
        this.$el.click(function() {
            if (!$(this).hasClass('show')) {
                $(this).toggleClass('show');
                clickCount++;
                allClicks++;
                $('#score').html(allClicks);
                matchArr.push(this);
            if (clickCount > 1) {
                if (matchArr[0].id === matchArr[1].id) {
                    clickCount = 0;
                    matchArr=[];
                    matchCount++;
                    if(matchCount === boxNum / 2){
                        alert("You Win!");
                    }
                    return;
                }
                if (matchArr[0].id !== matchArr[1].id) {
                    var tempCard = matchArr[0];
                    var tempCard1 = matchArr[1];
                    setTimeout(function() {
                        $(tempCard).removeClass('show');
                        $(tempCard1).removeClass('show');
                        },800);
                    clickCount = 0;
                    matchArr=[];
                    }
                }
            }
        });
    };

    function createCards() {
        var cards = [];
        for (var i = 0; i < boxNum; i += 1) {
            cards[i] = new Card(boxSize,currentArr[i]);
        }
        return cards.shuffle();
    }

    function reBuild(){
        allClicks = 0;
        $('#score').html(allClicks);
        boxSize = $('#enterSize').val();
        boxNum = $('#enterNum').val();
        defaultVal($(enterNum));
        defaultVal($(enterSize));
        loadArr(cardArr.shuffle());
        create = createCards();
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

    $(enterNum).on("change", function() {
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

    $(enterSize).on("change", function() {
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

    $("#btn").click(function() {
        $('#container div').remove();
        setTimeout(function() {
            reBuild();
        },500);
    });

    loadArr(cardArr.shuffle());
    var create = createCards();
    parseCards(create);

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
    }

});
