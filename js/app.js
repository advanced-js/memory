var app = app || {};

$( function() {
    var tileValues = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ];

    app.generateTiles = function( tileValues ) {
        var tiles = [];
        // For each tileValue, create 2 tile models
        for ( var i = 0, l = tileValues.length; i < l; i += 1 ){
            for ( var j = 0; j < 2; j += 1 ) {
                tiles.push( new app.TileModel({
                    value: tileValues[ i ]
                }));
            }
        }
        return tiles;
    };

    app.tilesCollection = new app.TilesCollection( app.generateTiles( tileValues ) );
    app.gameModel = new app.GameModel();
    app.gameView = new app.GameView();
    app.messageView = new app.MessageView();
    app.boardView = new app.BoardView();
    app.restart = new app.RestartView();
});