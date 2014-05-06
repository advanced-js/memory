var app = app || {};

app.Tiles = Backbone.Collection.extend({

    model: app.Tile,

    flippedCount: function() {
        var flippedTiles = this.where({ flipped: true });
        return flippedTiles.length;
    }
});