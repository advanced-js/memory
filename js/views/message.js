var app = app || {};

app.MessageView = Backbone.View.extend({
    tagName: 'div',
    className: 'message',
    template: _.template( $( '#messageTemplate' ).html() ),

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    },
});