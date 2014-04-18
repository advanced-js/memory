var app = app || {};

app.GameView = Backbone.View.extend({

    initialize: function( options ) {
        console.log( 'GameView initialized' );
        _.bindAll( this, 'tileSelection' );
        app.gameController.bind( 'tileSelection', this.tileSelection );
        // this.listenToOnce( app.Tile, 'change:flipped', function( options ) {
            // console.log( 'gameView hearing ' );
        // });
    },
 
    tileSelection: function( tile ) {
        console.log( 'tileSelection in GameView called' );
        tile.toggleFlip();
    }

});