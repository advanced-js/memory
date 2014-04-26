//data for tiles
var data = {
    tiles: [{
        "id": "01",
        "image": "images/lexus.png"
    }, {
        "id": "02",
        "image": "images/infiniti.png"
    }, {
        "id": "03",
        "image": "images/bmw.png"
    }, {
        "id": "04",
        "image": "images/audi.png"
    }, {
        "id": "05",
        "image": "images/maserati.png"
    }, {
        "id": "06",
        "image": "images/lambo.png"
    }, {
        "id": "07",
        "image": "images/ferrari.png"
    }, {
        "id": "08",
        "image": "images/lr.png"
    }, {
        "id": "09",
        "image": "images/porsche.png"
    }, {
        "id": "10",
        "image": "images/bentley.png"
    }, {
        "id": "01",
        "image": "images/lexus.png"
    }, {
        "id": "02",
        "image": "images/infiniti.png"
    }, {
        "id": "03",
        "image": "images/bmw.png"
    }, {
        "id": "04",
        "image": "images/audi.png"
    }, {
        "id": "05",
        "image": "images/maserati.png"
    }, {
        "id": "06",
        "image": "images/lambo.png"
    }, {
        "id": "07",
        "image": "images/ferrari.png"
    }, {
        "id": "08",
        "image": "images/lr.png"
    }, {
        "id": "09",
        "image": "images/porsche.png"
    }, {
        "id": "10",
        "image": "images/bentley.png"
    }]
};
var selectedTiles = {};
var numWrong = 0;
var numCorrect = 0;
var MemoryGame = function(){
    this.init();
};

    //initialize memory game
    MemoryGame.prototype.init = function () {
        this.randomTiles(data.tiles);
        this.addTiles(data.tiles);
    },
    //randomizes tile object
    MemoryGame.prototype.randomTiles = function (tileArr) {
        var i = tileArr.length;
        if (i == 0) return false;
        while (--i) {
            var j = Math.floor(Math.random() * (i + 1));
            var tempi = tileArr[i];
            var tempj = tileArr[j];
            tileArr[i] = tempj;
            tileArr[j] = tempi;
        }
    };
    //append tiles based on length of tile object
    MemoryGame.prototype.addTiles = function (tiles) {
        for (var i = 0; i < tiles.length; i++) {
            var tileOff = '<div class="off"><img src="images/steeringwheel.png" /></div>';
            var tileOn = '<div class="on"><img src="' + tiles[i].image + '" /></div>';
            var tile = '<div class="tile" data-id="' + tiles[i].id + '"">' + tileOff + tileOn + '</div>';
            $("#tiles").append(tile);
        }
    };
    // select tiles and prepare tiles for compare
    MemoryGame.prototype.selectTile = function (selected) {
        if (!$(selected).hasClass("active") && $("#memory #tiles .tile.active").length < 2) {
            $(selected).addClass("active");

        }
        if ($("#memory #tiles .tile.active").length >= 2) {
            $("#memory #tiles .tile.active").each(function (index) {
                index++;
                selectedTiles['id' + index] = $(this).attr('data-id');
            });
            this.compareTiles(selectedTiles);
        }
    };
    //compare two tiles 
    MemoryGame.prototype.compareTiles = function (selectedIds) {
        if (selectedIds.id1 == selectedIds.id2) {
            setTimeout(this.hideCorrect, 1000);
            numCorrect++;
            $('#scorekeeper #numCorrect span').text(numCorrect);
            selectedTiles = {};
        } else {
            setTimeout(this.resetWrong, 500);
            numWrong++;
            $('#scorekeeper #numWrong span').text(numWrong);
            selectedTiles = {};
        }
    };
    //functionality for correct tiles selected
    MemoryGame.prototype.hideCorrect = function () {
        $("#memory #tiles .tile.active").addClass('correct');
        $("#memory #tiles .tile.active").removeClass('active');
    };
    //functionality to reset wrong tiles selected
    MemoryGame.prototype.resetWrong = function () {
        $("#memory #tiles .tile").removeClass('active');
    };
    //reset the game
    MemoryGame.prototype.resetGame = function () {
        numCorrect = 0;
        numWrong = 0;
        $('#scorekeeper #numCorrect span').text(numCorrect);
        $('#scorekeeper #numWrong span').text(numWrong);
        selectedTiles = {};
        $("#memory #tiles .tile").remove();
        var memory_game = new MemoryGame;
        $("#memory #tiles .tile").on("click", function () {
            memory_game.selectTile($(this));
        });

    };



$(document).ready(function () {
    var memory_game = new MemoryGame;
    
    $("#memory #tiles .tile").on("click", function () {
        memory_game.selectTile($(this));
    });
    $("#startover").on("click", function () {
        memory_game.resetGame();
    });
});