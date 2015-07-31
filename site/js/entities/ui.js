var graphicsComponent = require("../components/graphics/ui");

var Ui = function(position) {

  var graphics = new graphicsComponent.UiGraphicsComponent(this);
  // physics.position = position;

  this.components = {
    graphics: graphics

  };
};

exports.Ui = Ui;
