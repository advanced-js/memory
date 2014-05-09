var app = app || {};

app.GameModel = Backbone.Model.extend({
    defaults: {
        started: false,
        completed: false,
        turns: 0
    },

    isStarted: function() {
        return this.get( 'started' );
    },

    start: function() {
        this.set( 'started', true );
    },

    completeGame: function() {
        this.set( 'completed', true );
    },

    restart: function() {
        this.set( 'started', false );
        this.set( 'completed', false );
    }
});