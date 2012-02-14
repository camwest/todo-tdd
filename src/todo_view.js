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

    'keypress .todo-input': 'keyPressListener',
    'blur .todo-input': 'update',
    'click .todo-destroy': 'destroy'
  },

  keyPressListener: function(event) {
    if (event.keyCode != 13) return;

    this.update();
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

  destroy: function() {
    this.model.clear();
    this.remove();
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
