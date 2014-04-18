var app = app || {};

app.GameView = Backbone.View.extend({

    initialize: function( options ) {
        console.log( 'GameView initialized' );
        _.bindAll( this, 'tileSelection' );
        options.controller.bind( 'tileSelection', this.tileSelection );
        // this.listenToOnce( app.Tile, 'change:flipped', function( options ) {
            // console.log( 'gameView hearing ' );
        // });
    },
 
    tileSelection: function( options ) {
        console.log( 'tileSelection in GameView called' );
    }

});