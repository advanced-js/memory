var app = app || {};

app.BoardView = Backbone.View.extend({
    el: '#board',

    initialize: function( initialTiles ) {
        this.collection = new app.Tiles( initialTiles );
        this.render();
    },

    // render library by rendering each book in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderTile( item );
        }, this );
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderBook: function( item ) {
        var bookView = new app.BookView({
            model: item
        });
        this.$el.append( bookView.render().el );
    }
});