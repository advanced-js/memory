// YOUR CODE GOES HERE
$(document).ready(function () {
    $('div').click(function () {
        $(this).hide();
        $(this).next().show();
    });

});
