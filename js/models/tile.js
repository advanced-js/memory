var app = app || {};

app.TileModel = Backbone.Model.extend({
    defaults: {
        value: '',
        resolved: false,
        flipped: false
    },

    isAvailable: function() {
        return !( this.get( 'flipped' ) || this.get( 'resolved' ) );
    },

    toggleFlip: function() {
        this.set({
            'flipped': ( this.get( 'flipped' ) ? false : true )
        });
    },

    reset: function() {
        console.log( 'tile reset called' );
        this.set( 'resolved', false );
        this.set( 'flipped', false );
    }
});