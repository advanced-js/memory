var app = app || {};

app.TilesCollection = Backbone.Collection.extend({

    model: app.TileModel,

    flippedCount: function() {
        var flippedTiles = this.where({ flipped: true });
        return flippedTiles.length;
    },
    
    getSelected: function() {
        return this.where({
            flipped: true,
            resolved: false
        });
    },

    resolvedCount: function() {
        var resolvedTiles = this.where({ resolved: true });
        return resolvedTiles.length;
    },

    totalCount: function() {
        return this.length;
    },

    resetTiles: function() {
        console.log( 'tiles collection reset' );
        _.each(this.models, function( model ) {
            model.reset();
        });
    }
});