var graphicsComponent = require("../components/graphics/ui");

var ui = function(position) {

  physics.position = position;

  this.components = {
    graphics: graphics

  };
};

exports.ui = ui;
