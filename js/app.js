var app = app || {};

$(function() {
    var tiles = [
        { value: 'A' }, { value: 'A' },
        { value: 'B' }, { value: 'B' },
        { value: 'C' }, { value: 'C' },
        { value: 'D' }, { value: 'D' },
        { value: 'E' }, { value: 'E' },
        { value: 'F' }, { value: 'F' },
        { value: 'G' }, { value: 'G' },
        { value: 'H' }, { value: 'H' }
    ];

    new app.BoardView( tiles );
});