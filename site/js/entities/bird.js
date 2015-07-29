var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/bird");
var collisionComponent = require("../components/collision/circle");


var Bird = function(fb_app) {
  this.app = fb_app;
  var graphics = new graphicsComponent.BirdGraphicsComponent(this);
  var physics = new physicsComponent.PhysicsComponent(this);
  physics.position.y = 0.5;
  physics.position.x = 0;
  physics.acceleration.y = -2;

  var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
  collision.onCollision = this.onCollision.bind(this);

  this.components = {
    graphics: graphics,
    physics: physics,
    collision:collision
  };
};

Bird.prototype.onCollision = function(entity) {
  console.log("Bird collided with entity:", entity);
  /* this.components.physics.position.y = 0.5; */
  this.app.reset();
};

exports.Bird = Bird;
