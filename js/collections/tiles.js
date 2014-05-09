var app = app || {};

app.TilesCollection = Backbone.Collection.extend({

    model: app.TileModel,

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
        _.each(this.models, function( model ) {
            model.reset();
        });
    }
});