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
            app.gameController.trigger( 'tileSelection', this.model );
        }
    },

    render: function() {
        console.log( 'render in TileView called');
        // this.el defined in tagName; use $el to access jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    },

    renderFlip: function() {
        console.log( 'renderFlip in TileView called');
        this.$el.find( '.cover' ).fadeToggle( 150 );
    },

    renderResolved: function() {
        console.log( 'do something to mark tiles as resolved' );
        this.$el.addClass( 'resolved' );
    }

    // events: {
        // 'click': 'handleTileSelection'
    // },

    // handleTileSelection: function() {
        // this.model.toggleFlip();
    // }

});