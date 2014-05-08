var app = app || {};

app.GameView = Backbone.View.extend({
    el: '#game',

    initialize: function( options ) {
        this.listenToOnce( app.tilesCollection, 'selected', this.startGame );
    },

    startGame: function() {
        app.gameModel.start();
    }

});