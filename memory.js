$( function() {

    var first;
    var second;
    var $board = $('#board');
    var $score = $('#score');
    var $scoreValue = $('#scoreValue');

    var score = 0;

    function generateBoard(values){
        var arr = [];
        var uniqueValues = values / 2;
        for (i=0; i < uniqueValues ; i++){
            arr.push(i);
            arr.push(i);
        }
        arr = _.shuffle(arr); //randomize values
        for (i=0; i < values; i++){
            $board.append("<div class='col-md-2 col-sm-4 col-xs-6 cell'>" + arr[i] + "</div>"); 
        }
        enableClick();
    }

    function storeVal(val) {
        if( !first ) {  
            first = val;
        } else {
            second = val;
        } 
    }

    function isMatch(){
        if ( first === second ) {
            return true;
        }
        return false;
    }

    function resetGrid(){
        $('.clicked').removeClass('clicked');
        first = null;
        second = null;
        enableClick();
    }

    function incrementScore(){
        score = score + 1;
        $scoreValue.html(score);
    }

    function clickHandler(event){
        var $obj = $(this);
        //only allow clicks on cells that are not already matched or clicked
        if( !$obj.hasClass('clicked') && !$obj.hasClass('match') ){
            incrementScore();
            var val = $obj.html();
            $obj.addClass('clicked');
            storeVal(val);
            if(first && second) { //check for match if 2 different cells are clicked
                disableClick(); //disable any clicks to allow processing
                if ( isMatch() ){
                    $('.clicked').addClass('match');
                    resetGrid(); //allow immediate next click
                } else {
                    //allow user to see mismatch for 1.5 seconds
                    setTimeout(resetGrid, 1500); 
                }
            }
        }
    }

    function enableClick(){
        $board.on('click', '.cell', clickHandler);
    }

    function disableClick(){
        $board.off('click', '.cell', clickHandler);
    }
    
    $("#generateBtn").click(function(e){
        var gridSize = $("#gridSizeInput").val();
        if (gridSize && gridSize % 2 === 0 && gridSize > 0){
            generateBoard(gridSize);
            $(this).prop("disabled",true);
            $("#resetBtn").show();
            $score.show();
        } else {
            alert('Please enter valid value!');
        }
    });

    $("#resetBtn").click(function(e){
        $board.empty();
        $("#generateBtn").prop("disabled", false);
        $(this).hide();
        score = 0;
        $score.hide();
        $scoreValue.html(score);
    });

});