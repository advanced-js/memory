var app = app || {};

app.GameView = Backbone.View.extend({
    el: '#game',

    initialize: function( options ) {
        this.listenForStart();
    },

    listenForStart: function() {
        this.listenToOnce( app.tilesCollection, 'selected', this.startGame );
    },

    startGame: function() {
        app.gameModel.start();
    }

});