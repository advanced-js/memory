var app = app || {};

app.MessageView = Backbone.View.extend({
    el: '#messages',
    template: _.template( $( '#messageTemplate' ).html() ),

    messages: {
        welcome: 'Welcome to memory. Select a tile to get started',
        win: 'You win!'
    },

    initialize: function( options ) {
        this.displayWelcome();
        this.listenToOnce( app.game, 'change:started', this.removeMessage );
        this.listenToOnce( app.game, 'change:ended', this.displayWin );
    },

    displayWelcome: function() {
        this.displayMessage( this.messages.welcome );
    },

    displayWin: function() {
        this.displayMessage( this.messages.win );
    },

    removeMessage: function() {
        this.$el.empty();
    },

    displayMessage: function( message ) {
        this.removeMessage();
        this.$el.html( this.template( message ) );
    }

});