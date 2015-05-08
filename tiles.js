//(function(){

//$(document).ready(function(){
    var Tile = function (){
        this.inner = '#48895e',
        this.outer = '#34495e',
        this.current = this.outer
        this.height = 200,
        this.width =  200,
        this.element = function() {
            var div = document.createElement("div");
            $(div).css('background-color', this.current);
            $(div).css('height', this.height).css('width', this.width).css('margin', 2);
            return div;
        };
    };
    

    Tile.prototype = {
      build: function() {
            var div = document.createElement("div");
            $(div).css('height', this.height).css('width', this.width).css('margin', 2);
            $(div).css('background-color', this.current)
            return div;
        },
      toggleColor: function() {
        if (this.current === this.inner) {
            this.current = this.outer;
        } else {
            this.current = this.inner;
        }
      },
      changeColor: function() {
        this.toggleColor();
        return this.build();
      },
      delayChangeColor: function() {
        this.toggleColor();
        setTimeout('this.changeColor()', 2000);
      }
    }

    var assignTile = function(cell, div) {
      $(cell).html(div);
    }

    var Board = function() {
      var thisBoard = this;
      this.tds = $('td'),
      this.scape = {},
      this.selected = {},
      this.buildScape = function () {
        for (i = 0; i < this.tds.length; i++) {
          var tile = new Tile;
          var element = tile.element();
          assignTile(this.tds[i], element );
          var prop = $(this.tds[i]).attr('id');
          thisBoard.scape[prop] = tile;
        }
      },
      this.resetScape = function () {
        var keys = Object.keys(this.scape);
        for (var key in this.scape) {
          assignTile(this.tds[i], element );
          var prop = $(this.tds[i]).attr('id');
          thisBoard.scape[prop] = tile;
        }
      },
      this.listen = function () {
        $('td').mousedown( function () {
          var id = $(this).attr('id');
          var cell = this;
          //thisBoard.flipTile(id, cell);
          thisBoard.flipFlop(id, cell);
        })
      }, 
      this.flipTile = function (id, cell) {
        var div = thisBoard.scape[id].changeColor(); 
        assignTile(cell, div);
      },
      this.flipFlop = function (id, cell) {
        thisBoard.flipTile(id, cell);  
        //thisBoard.checkForDups(id);
        setTimeout(function () {
          thisBoard.checkForDups(id);
        }, 1000);
        setTimeout(function () {
          var div = thisBoard.scape[id].changeColor();  
          assignTile(cell, div);
        }, 1500);
        //thisBoard.selected = { 'color': color, 'id': id } 
      }, 
      this.checkForDups = function (currentId) {
        if ( thisBoard.scape[currentId].current == thisBoard.selected.color ) {
          alert("Congratulations you have a match!")
          $('#' + currentId).remove();
          var previousId = thisBoard.selected.id
          $('#' + previousId).remove();

        } else {
          var color = thisBoard.scape[currentId].current;
          thisBoard.selected = { 'color': color, 'id': currentId }; 
        }
      }
    }
  




    var board = new Board;
    board.buildScape();
    board.listen();


//});
//})();

