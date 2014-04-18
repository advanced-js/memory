var app = app || {};

app.TilesView = Backbone.View.extend({
    el: '#tiles',

    initialize: function( options ) {
        this.collection = new app.Tiles( options.initialTiles );
        this.gameController = options.controller;
        this.render();
    },

    // render tiles by rendering each tile in its collection
    render: function() {
        var items = [];
        this.collection.each(function( item ) {
            items.push( item );
        });
        items = _.shuffle( items ); // put the tiles in random order
        _.each( items, function( item ) {
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
    },

    // events: {
        // 'click .tileContainer': function( e ) {
            // this.gameController.trigger( 'tileSelection', {
                // opt1: this,
                // opt2: e
            // });
        // }
    // }

    // tileSelection: function() {
        // console.log( 'tileSelection in TilesView called' );
        //this.gameController.trigger( 'tileSelection', {
            // opt1: this;
        // });
    // }

});