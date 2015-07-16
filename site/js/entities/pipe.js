var graphicsComponent = require("../components/graphics/pipeGraphic");
var physicsComponent = require("../components/physics/physicsPipe");

var Pipe = function(x,y) {
    console.log("Creating Pipe entity");

    var physics = new physicsComponent.PipePhysicsComponent(this);

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    this.components = {
        graphics: graphics,
        physics: physics
    };

};

exports.Pipe = Pipe;