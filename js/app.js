var app = app || {};

$(function() {

    var gameController = _.extend( {}, Backbone.Events ),
        speed = 2000,
        tiles = [
            { value: 'A' }, { value: 'A' },
            { value: 'B' }, { value: 'B' },
            { value: 'C' }, { value: 'C' },
            { value: 'D' }, { value: 'D' },
            { value: 'E' }, { value: 'E' },
            { value: 'F' }, { value: 'F' },
            { value: 'G' }, { value: 'G' },
            { value: 'H' }, { value: 'H' }
        ];

    new app.TilesView({
        controller: gameController,
        initialTiles: tiles
    });
    
    new app.GameView({
        controller: gameController,
        speed: speed
    });
});