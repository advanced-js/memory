var app = app || {};

app.BoardView = Backbone.View.extend({
    el: '#board',

    initialize: function( options ) {
        this.tilesCollection = app.tilesCollection;
        this.render();
        this.listenTo( this.tilesCollection, 'selected', this.tileSelection );
    },

    render: function() {
        var shuffledTiles = [],
            tilesArray = [];

        this.tilesCollection.each( function( tile ) {
            tilesArray.push( tile );
        });

        // put the tiles in random order
        shuffledTiles = _.shuffle( tilesArray );

        _.each( shuffledTiles, function( tile ) {
            this.renderTile( tile );
        }, this );
    },

    renderTile: function( tile ) {
        var tileView = new app.TileView({
            model: tile
        });

        this.$el.append( tileView.render().el );
    },

    reset: function() {
        this.$el.empty();
        this.tilesCollection.resetTiles();
        this.render();        
    },

    flip: function( tile ) {
        tile.toggleFlip();
    },

    tileSelection: function( tile ) {
        var selectedTiles;

        this.flip( tile );
        selectedTiles = this.tilesCollection.getSelected();
        if ( selectedTiles.length === 2 ) {
            this.handleTurn( selectedTiles );
        }
    },

     areMatch: function( tiles ) {
        var a = tiles[0],
            b = tiles[1];
        return a.get( 'value' ) === b.get( 'value' );
    },
 
    handleSuccessfulMatch: function( tiles ) {
        function markAsResolved( tile ) {
            tile.set( 'resolved', true );
        }

        _.each( tiles, markAsResolved ); 
    },

    handleUnsuccessfulMatch: function( tiles ) {
        _.each( tiles, this.flip );
    },

    handleTurn: function( tiles ) {

        if ( this.areMatch( tiles ) ) {
            this.handleSuccessfulMatch( tiles );
        } else {
            this.handleUnsuccessfulMatch( tiles );
        }
        
        this.checkGameStatus();
    },

    allTilesResolved: function() {
        return this.tilesCollection.resolvedCount() === this.tilesCollection.totalCount();
    },

    checkGameStatus: function() {
        if ( this.allTilesResolved() ) {
            this.endGame();
        }
    },

    endGame: function() {
        app.gameModel.end();
    }

});