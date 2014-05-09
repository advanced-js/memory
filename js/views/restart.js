var app = app || {};

app.RestartView = Backbone.View.extend({
    el: '#restart',

    events: {
        'click': function() {
            this.handleRestart();
        }
    },

    handleRestart: function() {
        this.trigger( 'restart' );
    }

});