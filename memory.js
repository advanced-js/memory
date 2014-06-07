// YOUR CODE GOES HERE
$(function(){
    var firstClk, secondClk;

    $('td').on('click',function(){
        if (firstClk === undefined){
            firstClk = $(this);
            firstClk.text(firstClk.data('value'));
        } else {
            if ((secondClk === undefined) && ($(this).data('id') !== firstClk.data('id'))) {
                secondClk = $(this);
                secondClk.text(secondClk.data('value'));

                setTimeout(function(){
                    if (firstClk.data('value') !== secondClk.data('value')){
                        firstClk.text('X');
                        secondClk.text('X');
                    }
                    firstClk = undefined;
                    secondClk = undefined;
                },1000);
            }
        }
    });
});