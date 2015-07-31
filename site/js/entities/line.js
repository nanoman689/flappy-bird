var graphicsComponent = require("../components/graphics/line");
var physicsComponent = require("../components/physics/line");
var collisionComponent = require("../components/collision/rect");


var Line = function(position, dimension) {

  var graphics = new graphicsComponent.LineGraphicsComponent(this);
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

Line.prototype.onCollision = function(entity) {
  console.log("Line collided with entity:", entity);
};

exports.Line = Line;
