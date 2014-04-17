var app = app || {};

app.Tile = Backbone.Model.extend({
    defaults: {
        value: '',
        resolved: false
    }
});