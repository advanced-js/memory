var app = app || {};

app.GameModel = Backbone.Model.extend({
    defaults: {
        started: false,
        ended: false,
        turns: 0
    },

    isStarted: function() {
        return this.get( 'started' );
    },

    start: function() {
        this.set( 'started', true );
    },

    end: function() {
        this.set( 'ended', true );
    }
});