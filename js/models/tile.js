var app = app || {};

app.Tile = Backbone.Model.extend({
    defaults: {
        value: '',
        resolved: false,
        flipped: false
    },

    initialize: function() {
        this.on( 'change:flipped', function() {
            console.log( 'initialize in Tile model called' );
        });
    },

    toggleFlip: function() {
        console.log( 'toggleFlip in Tile model called' )
        this.set({
            'flipped': ( this.get( 'flipped' ) ? false : true )
        });
    }
});