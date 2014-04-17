var app = app || {};

app.BoardView = Backbone.View.extend({
    el: '#board',

    initialize: function( initialTiles ) {
        this.collection = new app.Tiles( initialTiles );
        this.render();
    },

    // render tiles by rendering each tile in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderTile( item );
        }, this );
    },

    // render a tile by creating a TileView and appending the
    // element it renders to the tiles' element
    renderTile: function( item ) {
        var tileView = new app.TileView({
            model: item
        });
        this.$el.append( tileView.render().el );
    }
});