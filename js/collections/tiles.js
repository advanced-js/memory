var app = app || {};

app.Tiles = Backbone.Collection.extend({

    initialize: function( options ) {
        this.model = app.Tile;
    },

    flippedCount: function() {
        var flippedTiles = this.where({ flipped: true });
        return flippedTiles.length;
    }
});