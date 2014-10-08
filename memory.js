var first;
var second;

function storeVal(val) {
    if(!first) {  
        first = val;
    } else if(!second) {
        second = val;
    } else {
        first = second;
        second = val;
    }
}

function isMatch(){
    if(first && second){
        if (first === second) {
            return true;
        }
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
    if(!$obj.hasClass('clicked')){
        var val = $obj.html();
        $obj.addClass('clicked');
        storeVal(val);
        if(second && first) {
            if ( isMatch() ){
                $('.clicked').addClass('match').removeClass('clicked');
                resetGrid();
            } else {
                resetGrid();
            }
        }
    }
    
});