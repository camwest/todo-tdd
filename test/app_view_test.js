if (!window.hasOwnProperty("Todos")) {
  Todos = {}
}

fetched = false;

Todos.fetch = function() {
  fetched = true;
}

Todos.each = function(callback) {
  var emptyModel = {
    toJSON: function() {
      return {
        content: "Blah!"
      }
    }
  };

  //just fake a single
  callback(emptyModel);
}


_.extend(Todos, Backbone.Events);

describe('AppView', function() {
  var sut;

  beforeEach(function() {
    sut = new AppView({ el: $('#todoapp') });
  });

  afterEach(function() {
    $('#todo-list').html('');
  });

  it("uses the pre-filled todoapp view", function() {
    expect(sut.el).to.be($('#todoapp')[0]);
  });

  it("fetches a list of todos", function() {
    expect(fetched).to.be(true);
  });

  it("renders the items in the collection when the collection is reset", function() {
    Todos.trigger('reset');

    expect($('#todo-list > li').length).to.be(1);
  });
});
