var app = app || {};

app.MessageDisplayView = Backbone.View.extend({
    el: '#messageDisplay',

    initialize: function( options ) {
        // this.displayMessage( 'Hello' );
    },

    displayMessage: function( message ) {
        var messageModel,
            messageView;

        messageModel = new app.Message({
            content: message
        });

        messageView = new app.MessageView({
            model: messageModel
        });

        this.$el.append( messageView.render().el );
    },


});