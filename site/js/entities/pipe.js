var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/pipe");
var collisionComponent = require("../components/collision/rect");


var Pipe = function(position, dimension) {

  var graphics = new graphicsComponent.PipeGraphicsComponent(this);
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position = position;
  physics.dimension = dimension;
  physics.acceleration.y = 0;

  var collision = new collisionComponent.RectCollisionComponent(this, physics.dimension);
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    graphics: graphics,
    physics: physics,
    collision:collision
  };
};

Pipe.prototype.onCollision = function(entity) {
  console.log("Pipe collided with entity:", entity);
};

exports.Pipe = Pipe;
