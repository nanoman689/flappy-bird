var graphicsComponent = require("../components/graphics/pipeGraphic");
var physicsComponent = require("../components/physics/physicsPipe");
var collisionComponent = require("../components/collision/rect");

var Pipe = function(xP,yP,pipeWidth) {
    console.log("Creating Pipe entity");

    var physics = new physicsComponent.PipePhysicsComponent(this);

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);

    var collision = new collisionComponent.RectCollisionComponent(this, 0.02);

    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        graphics: graphics,
        physics: physics,
        collision: collision
    };
    this.dimension = {
    	width: 0.2,
    	height: 0.1,
    }

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

Pipe.prototype.onCollision = function(entity) {
    console.log("Pipe collided with entity:", entity);
};

exports.Pipe = Pipe;