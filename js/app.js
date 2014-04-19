var app = app || {};

$(function() {
    app.gameController = _.extend( {}, Backbone.Events );

    new app.BoardView({
        initialTiles: [
            { value: 'A' }, { value: 'A' },
            { value: 'B' }, { value: 'B' },
            { value: 'C' }, { value: 'C' },
            { value: 'D' }, { value: 'D' },
            { value: 'E' }, { value: 'E' },
            { value: 'F' }, { value: 'F' },
            { value: 'G' }, { value: 'G' },
            { value: 'H' }, { value: 'H' }
        ]
    });
});