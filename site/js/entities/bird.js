var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");

var Bird = function(x,y) {
    console.log("Creating Bird entity");

    var physics = new physicsComponent.PhysicsComponent(this);

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    this.components = {
        graphics: graphics,
        physics: physics
    };

};

exports.Bird = Bird;