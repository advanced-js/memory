var app = app || {};

app.Tile = Backbone.Model.extend({
    defaults: {
        value: '',
        resolved: false,
        flipped: false
    },

    initialize: function() {
        this.on( 'change:flipped', function() {
            console.log( 'app.Tile resigistering change:flipped' );
        });
    },

    toggleFlip: function() {
        this.set({
            'flipped': ( this.get( 'flipped' ) ? false : true )
        });
    }
});