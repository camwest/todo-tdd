AppView = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this, 'addOne', 'addTodos');

    Todos.on('reset', this.addTodos);
    Todos.fetch();
  },

  addTodos: function() {
    Todos.each(this.addOne);
  },

  addOne: function(todo) {
    console.log(this);
    var view = new TodoView({ model: todo });
    this.$('#todo-list').append(view.render().el);
  }
});
