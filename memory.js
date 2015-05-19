(function() {

    var prevSquareVal,
        currentSquareVal,
        clickCount = 0;

    var Board = function(size) {
        this.size = size;
    };

    Board.prototype.createSquares = function() {
        var table = document.createElement("table");
        for (var i = 0; i < this.size; i++) {
            var newRow = table.insertRow();
            for (var j = 0; j < this.size; j++) {
                var newCell = newRow.insertCell();
                var span = document.createElement("span");
                newCell.appendChild(span);
                span.className = "text";
            }
            table.appendChild(newRow);
        }
        document.body.appendChild(table);
        this.checkMatches();
    };

    Board.prototype.createDupArrays = function() {
        var spans = document.querySelectorAll("span");
        var spanList = Array.prototype.slice.call(spans);
        var spanLengthHalved = spanList.length / 2;

        this.numbers = [];
        this.dupNumbers = [];

        for (var i = 1; i <= spanLengthHalved; i++) {
            this.numbers.push(i);
        }
        this.dupNumbers = this.numbers.slice(0);
    };

    Board.prototype.shuffle = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    Board.prototype.randomizeBoard = function() {
        var numbers = this.shuffle(this.numbers);
        var dupNumbers = this.shuffle(this.dupNumbers);
        var joinedNumbers = numbers.concat(dupNumbers);
        var spans = document.getElementsByTagName("span");

        for (var i = 0; i < joinedNumbers.length; i++) {
            spans[i].textContent = joinedNumbers[i];
        }
    };

    Board.prototype.addingWhite = function() {
        clickCount++;
        $(this).addClass("changeWhite");
        console.log(clickCount);
    };

    Board.prototype.tilesDoMatch = function() {
        $(".changeWhite .text").addClass("popUp");
        $(".popUp").parent().css({
            "border": "none",
            "pointer-events": "none"
        });
        $(".popUp").parent().removeClass("changeWhite");
    };

    Board.prototype.tilesDontMatch = function() {
        setTimeout(function() {
            $("td").removeClass("changeWhite");
        }, 1300);
    };

    Board.prototype.checkMatches = function() {
        $("table").on("click", "td", function() {
            if (!$(this).hasClass("changeWhite")) {

                this.addingWhite();

                if (clickCount === 1) {
                    prevSquareVal = $(this).text();
                }

                if (clickCount === 2) {
                    currentSquareVal = $(this).text();
                    clickCount = 0;
                }

                if (prevSquareVal === currentSquareVal) {
                    this.tilesDoMatch();
                } else {
                    this.tilesDontMatch();
                }
            }
        });

    };


    var board = new Board(4);
    console.log(board);
    board.createSquares();
    board.createDupArrays();
    board.randomizeBoard();
    // board.checkMatches();

})();