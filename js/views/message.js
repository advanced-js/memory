var app = app || {};

app.MessageView = Backbone.View.extend({
    el: '#messages',
    template: _.template( $( '#messageTemplate' ).html() ),

    messages: {
        completed: 'You matched all the tiles!',
        restart: 'Select a tile to get started.',
        welcome: 'Welcome to memory, select a tile to get started.'
    },

    initialize: function( options ) {
        this.displayWelcome();
        this.listenTo( app.gameModel, 'change:started', this.removeMessage );
        this.listenTo( app.gameModel, 'change:completed', this.displayCompleted );
        this.listenTo( app.gameModel, 'restart', this.displayRestart );
    },

    displayWelcome: function() {
        this.renderMessage( this.messages.welcome );
    },

    displayCompleted: function() {
        this.renderMessage( this.messages.completed );
    },

    displayRestart: function() {
        this.renderMessage( this.messages.restart );
    },

    removeMessage: function() {
        this.$el.empty();
        return this;
    },

    renderMessage: function( message ) {
        this.removeMessage();
        this.$el.html( this.template({
            content: message
        }));
        return this;
    }

});