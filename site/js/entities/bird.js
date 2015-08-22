var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/bird");
var collisionComponent = require("../components/collision/circle");
var newScore = 0;
var pipe = require("../entities/pipe");

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
  if (entity instanceof pipe.Pipe){
    console.log('Bird Hit a Pipe!');
    window.app.reset();
  }
  /*-- Bird collision --*/

  /* documentGetElementbyId < to update the score
  console.log("Bird collided with entity:", entity);
  function changeScore(){
    var birdScore = document.getElementById("score");
    var newScoreA = +birdScore.innerHTML;
    console.log(birdScore.innerHTML);
    var newScore = newScoreA + 1;
    birdScore.innerHTML = newScore;
  }
  changeScore();

  console.log(newScore);

  */

  /* this.components.physics.position.y = 0.5; */
  /* this.app.reset(); */
  // window.app.reset();
};

exports.Bird = Bird;
