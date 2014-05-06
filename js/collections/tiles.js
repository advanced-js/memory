var app = app || {};

app.Tiles = Backbone.Collection.extend({

    model: app.Tile,

    flippedCount: function() {
        var flippedTiles = this.where({ flipped: true });
        return flippedTiles.length;
    },

    resolvedCount: function() {
        var resolvedTiles = this.where({ resolved: true });
        return resolvedTiles.length;
    },
    
    totalCount: function() {
        return this.length;
    }
});