TodoView = Backbone.View.extend({
  tagName: 'li',

  initialize: function() {
    this.on('stateChange', this.render);
  },

  events: {
    'dblclick': 'edit',
    'click .check': function() {
      this.model.toggle();
    },

    'keypress .todo-input': 'update',
    'blur .todo-input': 'update'
  },

  edit: function() {
    this.$el.addClass('editing');
    this.editing = true;
    this.trigger('stateChange');
  },

  update: function() {
    this.model.save({ content: this.$el.find('.todo-input').val() });
    this.stopEditing();
  },

  stopEditing: function() {
    this.$el.removeClass('editing');
    this.editing = false;
    this.trigger('stateChange');
  },

  render: function() {
    var state = "";

    if (this.editing) {
      state = "edit";
    } else {
      state = "normal";
    }

    var template = _.template($('#todo-' + state).html());
    this.$el.html(template(this.model.toJSON()));

    return this;
  }
});
