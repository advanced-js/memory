var app = app || {};

app.RestartView = Backbone.View.extend({
    el: '#restart',

    events: {
        'click': function() {
            this.restart();
        }
    },

    restart: function() {
        app.gameModel.trigger( 'restart' );
    }

});