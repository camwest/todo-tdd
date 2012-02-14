describe('TodoView', function() {
  var sut;

  function todoContent() {
    return sut.$el.find('.todo-content').html();
  }

  function enterEvent() {
    return jQuery.Event('keypress', { keyCode: 13 });
  }

  function editing() {
    return sut.$el.hasClass('editing');
  }

  beforeEach(function() {
    sut = new TodoView();
    sut.model = {
      toggled: false,
      cleared: false,
      content: "Hello World!",

      toJSON: function() {
        return {
          "content": this.content
        }
      },

      toggle: function() {
        this.toggled = true;
      },

      save: function(options) {
        this.content = options.content;
      },

      clear: function() {
        this.cleared = true;
      }
    };
  });

  it("is an li tag", function() {
    expect(sut.el.tagName).to.be('LI');
  });

  describe("#render", function() {
    beforeEach(function() {
      sut.render();
    })

    it("has model content in the label", function() {
      expect(todoContent()).to.be("Hello World!");
    });
  });

  describe("clicking the checkbox", function() {
    beforeEach(function() {
      sut.render();
      sut.$el.find('.check').trigger('click');
    });

    it ("toggles the Todo", function() {
      expect(sut.model.toggled).to.be(true);
    });
  });

  describe("double clicking", function() {
    beforeEach(function() {
      sut.$el.trigger('dblclick');
    });

    it("goes into editing mode", function() {
      expect(editing()).to.be(true);
    });

    it("has the contents of the model in the input", function() {
      expect(sut.$el.find('.todo-input').val()).to.be("Hello World!")
    });

    it("focuses the input");

    function itSavesTheInput(message) {
      it("updates the Todo with the contents of the input", function() {
        expect(todoContent()).to.be(message);
      });

      it("takes the template out of editing mode", function() {
        expect(editing()).to.be(false);
      });
    }

    describe("then pressing ENTER", function() {
      beforeEach(function() {
        var input = sut.$el.find('.todo-input');

        input.val('Hello World Edited!');
        input.trigger(enterEvent());
      });

      itSavesTheInput('Hello World Edited!');
    });

    describe("then blurring the input", function() {
      beforeEach(function() {
        var input = sut.$el.find('.todo-input');
        input.val('Hello World Blurred!');
        input.blur();
      });

      itSavesTheInput('Hello World Blurred!');
    });

    describe("pressing any other key", function() {
      beforeEach(function() {
        var input = sut.$el.find('.todo-input');
        input.val('Hello World Other Keys!');
        input.trigger( jQuery.Event('keypress', { keyCode: 80 }) );
      });

      it("keeps the view in editing mode", function() {
        expect(editing()).to.be(true);
      });
    });
  });

  describe("clicking destroy", function() {
    beforeEach(function() {
      sut.render();
      $(document.body).append(sut.el);

      sut.$el.find('.todo-destroy').trigger('click');
    });

    it("clears the Todo", function() {
      expect(sut.model.cleared).to.be(true);
    });

    it("removes the view from the DOM", function() {
      expect($(document.body).find(sut.$el).length).to.be(0);
    });
  });

});
