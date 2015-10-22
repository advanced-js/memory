$.fn.activate = function(){
    this.addClass("activated");
    this.text(this.val());
    return this;
};

$.fn.deactivate = function(){
    this.removeClass("activated");
    this.text("");
    return this;
};

$.fn.match = function(){
    this.addClass("matched");
    return this;
};

$.fn.freeze = function(){
    this.addClass("frozen");
    return this;
};

$.fn.unfreeze = function(){
    this.removeClass("frozen");
    return this;
};

function endRound(){
    // set timeout so user has time to see result
    setTimeout(function(){
        $('.matched').css("visibility", "hidden");
        $('.activated').deactivate();
        $('.tile').unfreeze();
        testWin();
    }, 500);
}

function testWin(){
    var tiles = $('.tile');
    var any_not_matched = false;
    for (var i=0; i<tiles.length; i++){
        var tile = tiles[i];
        if (!$(tile).hasClass("matched")){
            any_not_matched = true;
            break;
        }
    }
    if (!any_not_matched){
        $(".win-status").show();
    }
}

function testForMatch(clicked_tile, active_tiles){
    var matched_tile;
    for (var i=0; i<active_tiles.length; i++){
        var tile = active_tiles[i];
        if ($(tile).val() === $(clicked_tile).val()){
            matched_tile = tile;
        }
    }
    if (matched_tile !== undefined){
        console.log("match!");
        $(matched_tile).match();
        $(clicked_tile).match();
    }else{
        console.log("no match!");
    }
}

function tileOnClick(){
    if ($(this).hasClass("matched") || $(this).hasClass("frozen")){
        // out of the game - ignore
        return;
    }
    var endThisRound = false;
    // freeze to prevent click actions from happening
    $('.tile').freeze();
    if ($(this).hasClass("activated")){
        // second click - can't match with itself
        endThisRound = true;
    }else{
        var active_tiles = $('.activated');
        $(this).activate();
        if (active_tiles.length !== 0) {		
            // second click - may be a match
            testForMatch(this, active_tiles);
            endThisRound = true;
        }
    }
    if (endThisRound){
        endRound();
    }else{
        $('.tile').unfreeze();
    }
}

$(function() {
    $('.win-status').hide();
    $('.tile').click(tileOnClick);
});

