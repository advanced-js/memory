var app = app || {};

app.RestartView = Backbone.View.extend({
    el: '#restart',
    
    initialize: function( options ) {
        //this.listenTo( this.model, 'change:flipped', this.renderFlip );
        //this.listenTo( this.model, 'change:resolved', this.renderResolved );
    },

    events: {
        'click': function() {
            this.restart();
        }
    },

    restart: function() {
        console.log( 'restart called' );
        app.boardView.reset();
    }


});