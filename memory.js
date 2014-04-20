// YOUR CODE GOES HERE
$(document).ready(function() {
 $('td').click(function() {
 	var thisClass = '.open.'+ $(this).attr('class');
	$(this).addClass('open');
	if ($(thisClass).length == 2) {
		setTimeout( function() { $(thisClass).addClass('match');$(thisClass).removeClass('open'); }, 500);
	} else {
		if ($('.open').length == 2) {
			setTimeout(function() {$('.open').removeClass('open');}, 500);
		}
	}
 })	
 $('.reset').click(function(e){
 	e.preventDefault();
 	$('td').removeClass('open');
 	$('td').removeClass('match');
 })
})
