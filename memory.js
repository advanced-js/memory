var first;
var second;

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
}

$(".cell").click(function(e){
    var $obj = $(this);
    if( !$obj.hasClass('clicked') && !$obj.hasClass('match') ){
        var val = $obj.html();
        $obj.addClass('clicked');
        storeVal(val);
        if(first && second) {
            if ( isMatch() ){
                $('.clicked').addClass('match');
            }
            resetGrid();
        }
    }
});