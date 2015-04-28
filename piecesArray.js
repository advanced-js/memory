var PiecesArray = function(numberOfPieces) {
	this.pieceTypes = ["&#x1F601", "&#x1F602", "&#x1F603", "&#x1F604", "&#x1F605", "&#x1F606", "&#x1F609", "&#x1F60A", "&#x1F60B", "&#x1F60C", "&#x1F60D", "&#x1F60F", "&#x1F613", "&#x1F612", "&#x1F614", "&#x1F616", "&#x1F618", "&#x1F61A", "&#x1F61C"];
	this.pieces = [];

	// Choose pieces to fill given number of spaces
	for (i = 0; i < (numberOfPieces / 2); i++) {
		var randomIndex = Math.floor(Math.random() * this.pieceTypes.length);
		var randomPiece = this.pieceTypes[randomIndex];
		this.pieces.push(randomPiece, randomPiece);
		this.pieceTypes.splice(randomIndex, 1);
	}
};

PiecesArray.prototype.shuffledPieces = function() {
    for (var i = this.pieces.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.pieces[i];
        this.pieces[i] = this.pieces[j];
        this.pieces[j] = temp;
    }
    return this.pieces;
};