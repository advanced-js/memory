var app = app || {};

$(function() {
    var tileValues = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ];

    app.generateTiles = function( tileValues ) {
        var tiles = [];
        // For each tileValue, create 2 tile models
        for ( var i = 0, l = tileValues.length; i < l; i += 1 ){
            for ( var j = 0; j < 2; j += 1 ) {
                tiles.push( new app.Tile({
                    value: tileValues[ i ]
                }));
            }
        }
        return tiles;
    };

    new app.BoardView({
        initialTiles: app.generateTiles( tileValues )
    });
});