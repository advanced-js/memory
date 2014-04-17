var app = app || {};

$(function() {
    var tiles = [
        { value: 'A' },
        { value: 'B' },
        { value: 'C' },
        { value: 'D' },
        { value: 'E' },
        { value: 'F' },
        { value: 'G' },
        { value: 'H' }
    ];

    new app.BoardView( tiles );
});