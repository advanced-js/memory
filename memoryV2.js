$( document ).ready(function() {
  
var index = 0;
var cell1;
var cell1t;
var cell2;
var cell2t;


    $('td').click(function(event){
        if(index<2){
            var cell = (event.target.id);
            if ($('#'+cell).css('background-color') == "rgb(0, 0, 0)"){
                $('#' + cell).css('background-color', 'yellow'); 
                index++;  
                    if (index==1){
                       cell1t = $("#" + cell).text();
                       cell1 = cell;
                        
                        }
                    if (index==2){
                        cell2t = $("#" + cell).text();
                        cell2 = cell;
            
                        
                        
                        
                        if (cell1t === cell2t) {
                            alert('you found a pair');
                            $('#' + cell1).css('background-color', 'grey'); 
                            $('#' + cell1).css('color', 'grey');
                            $('#' + cell2).css('background-color', 'grey');
                            $('#' + cell2).css('color', 'grey');
                            index = 0;
                        
                             }
                        
                        if (cell1t !== cell2t) {
                            alert('not a pair');
                            $('#' + cell1).css('background-color', 'black'); 
                            $('#' + cell2).css('background-color', 'black');
                            index = 0;  
                        
                          }
                      
                   }
            }
        }
        
    });


});