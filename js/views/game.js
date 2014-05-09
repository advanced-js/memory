var app = app || {};

app.GameView = Backbone.View.extend({
    el: '#game',

    initialize: function( options ) {
        this.listenForStart();
        this.listenTo( app.restart, 'restart', this.handleRestart );
    },

    listenForStart: function() {
        this.listenToOnce( app.tilesCollection, 'selected', this.startGame );
    },

    startGame: function() {
        app.gameModel.start();
    },

    handleRestart: function() {
        app.gameModel.restart();
        this.listenForStart();
    }

});