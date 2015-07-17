var graphicsComponent = require("../components/graphics/pipeGraphic");
var physicsComponent = require("../components/physics/physicsPipe");

var Pipe = function(xP,yP) {
    console.log("Creating Pipe entity");

    var physics = new physicsComponent.PipePhysicsComponent(this);

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);

    this.components = {
        graphics: graphics,
        physics: physics
    };


    this.position = {
        x: xP,
        y: yP
    };
    this.velocity = {
        x: 0,
        y: 0
    };
    this.acceleration = {
        x: 0,
        y: 0
    };


};

exports.Pipe = Pipe;