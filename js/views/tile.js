var app = app || {};

app.TileView = Backbone.View.extend({
    tagName: 'div',
    className: 'tileContainer',
    template: _.template( $( '#tileTemplate' ).html() ),

    initialize: function( options ) {
        this.listenTo( this.model, 'change:flipped', this.renderFlip );
        this.listenTo( this.model, 'change:resolved', this.renderResolved );
    },

    events: {
        'click': function() {
            var tile = this.model;
            if ( tile.isAvailable() ) {
                tile.trigger( 'selected', tile );
            }
        }
    },

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    },

    renderFlip: function() {
        this.$el.find( '.cover' ).fadeToggle( 150 );
        return this;
    },

    renderResolved: function() {
        this.$el.addClass( 'resolved' );
        return this;
    }

});