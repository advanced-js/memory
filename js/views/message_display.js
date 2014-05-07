var app = app || {};

app.MessageDisplayView = Backbone.View.extend({
    el: '#messageDisplay',

    initialize: function( options ) {
        this.displayWelcome();
        this.listenTo( app.game, 'change:started', this.removeMessage );
        this.listenTo( app.game, 'change:ended', this.displayWin );
    },

    messages: {
        welcome: new app.Message({
            content: 'Welcome to memory. Select a tile to get started'
        }),
        win: new app.Message({
            content: 'You win!'
        })
    },

    displayWelcome: function() {
        this.display( this.messages.welcome );
    },

    displayWin: function() {
        this.display( this.messages.win );
    },

    removeMessage: function() {
        this.$el.empty();
    },

    display: function( message ) {
        var messageView = new app.MessageView({
            model: message
        });

        this.removeMessage();

        this.$el.append( messageView.render().el );
    },


});