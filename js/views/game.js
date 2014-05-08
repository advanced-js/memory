var app = app || {};

app.GameView = Backbone.View.extend({
    el: '#game',

    initialize: function( options ) {
        this.listenToOnce( app.tiles, 'selected', this.startGame );
    },

    startGame: function() {
        app.game.start();
    }

});