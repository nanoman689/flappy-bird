var graphicsComponent = require("../components/graphics/bird");

var Bird = function(x,y) {
    console.log("Creating Bird entity");

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    this.components = {
        graphics: graphics
    };
};

exports.Bird = Bird;