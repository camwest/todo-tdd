TodoView = Backbone.View.extend({
  tagName: 'li',

  initialize: function() {
    this.on('stateChange', this.render);
  },

  events: {
    'dblclick': function() {
      this.$el.addClass('editing');
      this.edit();
    }
  },

  edit: function() {
    this.editing = true;
    this.trigger('stateChange');
  },

  render: function() {
    if (this.editing) {
      template = _.template($('#todo-edit').html());
      this.$el.html(template(this.model.toJSON()));
    }

    return this;
  }
});
