describe('TodoView', function() {
  var sut;

  before(function() {
    sut = new TodoView();
    sut.model = {
      toJSON: function() {
        return {
          "content": "Hello World!"
        }
      }
    };
  });

  it("should be an li tag", function() {
    expect(sut.el.tagName).to.be('LI');
  });

  describe("when a user double clicks a todo", function() {
    before(function() {
      sut.$el.trigger('dblclick');
    });

    it("should go into editing mode", function() {
      expect(sut.$el.hasClass('editing')).to.be(true);
    });

    it("should have the contents of the model in the input", function() {
      expect(sut.$el.find('.todo-input').val()).to.be("Hello World!")
    });
  });
});
