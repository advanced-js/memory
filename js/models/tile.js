var app = app || {};

app.Tile = Backbone.Model.extend({
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
    }
});