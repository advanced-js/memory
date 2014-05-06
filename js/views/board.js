var app = app || {};

app.BoardView = Backbone.View.extend({
    el: '#board',

    initialize: function( options ) {
        this.collection = new app.Tiles( options.initialTiles );
        _.bindAll( this, 'tileSelection' );
        app.gameController.bind( 'tileSelection', this.tileSelection );
        this.render();
    },

    // render tiles by rendering each tile in its collection
    render: function() {
        var items = [];
        this.collection.each(function( item ) {
            items.push( item );
        });

        // put the tiles in random order
        items = _.shuffle( items );

        _.each( items, function( item ) {
            this.renderTile( item );
        }, this );
    },

    renderTile: function( item ) {
        var tileView = new app.TileView({
            model: item
        });
        this.$el.append( tileView.render().el );
    },

    tileSelection: function( tile ) {
        var selectedTiles;
        if ( tile.isAvailable() ) {
            tile.toggleFlip();
            selectedTiles = this.collection.getSelected();
            if ( selectedTiles.length === 2 ) {
                this.handleTurn( selectedTiles );
            }
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
        function flipBack( tile ) {
            tile.toggleFlip();
        }

        _.each( tiles, flipBack );
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
        return this.collection.resolvedCount() === this.collection.totalCount();
    },

    checkGameStatus: function() {
        if ( this.allTilesResolved() ) {
            this.endGame();
        }
    },

    endGame: function() {
        console.log( 'you win!' );
    }

});