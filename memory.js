// YOUR CODE GOES HERE
$(document).ready(function(){
 var pair=[];
 $("td").click(
 	function(){
 		
 		$(this).addClass("exposed",2000);

 		pair.push(this.innerHTML);
 		//$(this).addClass(this.innerHTML);
 		//console.log(pair);
 		
 		if (pair.length==2){
 			if (pair[0]==pair[1]) {
 				setTimeout(function(){
 					$(".exposed").addClass('removed');
 				console.log("match");
 				},700)
 				
 			}else {
 				setTimeout(function(){
 					$(".exposed").removeClass('exposed');
 					console.log("no match");}
 					,700)	
 			}
 		pair.length=0;	
 		} 
 	});

});