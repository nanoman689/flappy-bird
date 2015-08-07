(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CircleCollisionComponent = function(entity, radius) {
    this.entity = entity;
    this.radius = radius;
    this.type = 'circle';
};

CircleCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

CircleCollisionComponent.prototype.collideCircle = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var radiusA = this.radius;
    var radiusB = entity.components.collision.radius;

    var diff = {x: positionA.x - positionB.x,
                y: positionA.y - positionB.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    var radiusSum = radiusA + radiusB;

    return distanceSquared < radiusSum * radiusSum;
};

CircleCollisionComponent.prototype.collideRect = function(entity) {
    var clamp = function(value, low, high) {
        if (value < low) {
            return low;
        }
        if (value > high) {
            return high;
        }
        return value;
    };

    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;
    var sizeB = entity.components.collision.size;

    var closest = {
        x: clamp(positionA.x, positionB.x - sizeB.x / 2,
                 positionB.x + sizeB.x / 2),
        y: clamp(positionA.y, positionB.y - sizeB.y / 2,
                 positionB.y + sizeB.y / 2)
    };


    var radiusA = this.radius;

    var diff = {x: positionA.x - closest.x,
                y: positionA.y - closest.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    return distanceSquared < radiusA * radiusA;
};

exports.CircleCollisionComponent = CircleCollisionComponent;

},{}],2:[function(require,module,exports){
var RectCollisionComponent = function(entity, size) {
    this.entity = entity;
    this.size = size;
    this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
    return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var sizeA = this.size;
    var sizeB = entity.components.collision.size;

    var leftA = positionA.x - sizeA.x / 2;
    var rightA = positionA.x + sizeA.x / 2;
    var bottomA = positionA.y - sizeA.y / 2;
    var topA = positionA.y + sizeA.y / 2;

    var leftB = positionB.x - sizeB.x / 2;
    var rightB = positionB.x + sizeB.x / 2;
    var bottomB = positionB.y - sizeB.y / 2;
    var topB = positionB.y + sizeB.y / 2;

    return !(leftA > rightB || leftB > rightA ||
             bottomA > topB || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;
},{}],3:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
  this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;
  //console.log("Draw the bird at " + position.x + ", " + position.y);

  context.save();
  context.translate(position.x, position.y);
  context.beginPath();
  context.arc(0, 0, 0.02, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
  context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;

},{}],4:[function(require,module,exports){
var LineGraphicsComponent = function(entity) {
    this.entity = entity;
};

LineGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;
    var dimension = this.entity.components.physics.dimension;

    console.log("Draw the line at " + position.x + ", " + position.y);
    context.save();
    context.translate(position.x, position.y);
    context.fillStyle="#FF0000";
    context.fillRect(0, 0, dimension.width, dimension.height);
    context.restore();
};

exports.LineGraphicsComponent = LineGraphicsComponent;

},{}],5:[function(require,module,exports){
var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;
    var dimension = this.entity.components.physics.dimension;

    // console.log("Draw the pipe at " + position.x + ", " + position.y);
    context.save();
    context.translate(position.x, position.y);
    context.fillRect(0, 0, dimension.width, dimension.height);
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;

},{}],6:[function(require,module,exports){
var UiGraphicsComponent = function(entity) {
    this.entity = entity;
};

UiGraphicsComponent.prototype.draw = function(context) {
    console.log('Drawing Text');

    var position = this.entity.position;

    context.font="72px serif";
    context.fillStyle = "orange";
    context.fillText("Hello There!", 0.5, 0.5);

};

exports.UiGraphicsComponent = UiGraphicsComponent;

},{}],7:[function(require,module,exports){
var PhysicsComponent = function(entity) {
  this.entity = entity;

  this.position = {
    x: 0,
    y: 0
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

PhysicsComponent.prototype.update = function(delta) {
  this.velocity.x += this.acceleration.x * delta;
  this.velocity.y += this.acceleration.y * delta;

  this.position.x += this.velocity.x * delta;
  this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;

},{}],8:[function(require,module,exports){
var PhysicsComponent = function(entity) {
  this.entity = entity;

  this.position = {
    x: 0,
    y: 0
  };

  this.dimension = {
    width: 0.05,
    height: 0.2
  };

  this.velocity = {
    x: -0.08,
    y: 0
  };
  this.acceleration = {
    x: 0,
    y: 0
  };
};

PhysicsComponent.prototype.update = function(delta) {
  //this.velocity.x += this.acceleration.x * delta;
  //this.velocity.y += this.acceleration.y * delta;

  this.position.x += this.velocity.x * delta;
  this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;

},{}],9:[function(require,module,exports){
var PhysicsComponent = function(entity) {
  this.entity = entity;

  this.position = {
    x: 0,
    y: 0
  };

  this.dimension = {
    width: 0.1,
    height: 0.2
  };

  this.velocity = {
    x: -0.08,
    y: 0
  };
  this.acceleration = {
    x: 0,
    y: 0
  };
};

PhysicsComponent.prototype.update = function(delta) {
  //this.velocity.x += this.acceleration.x * delta;
  //this.velocity.y += this.acceleration.y * delta;

  this.position.x += this.velocity.x * delta;
  this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;

},{}],10:[function(require,module,exports){
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
  /* this.app.reset(); */
  // window.app.reset();
};

exports.Bird = Bird;

},{"../components/collision/circle":1,"../components/graphics/bird":3,"../components/physics/bird":7}],11:[function(require,module,exports){
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

},{"../components/collision/rect":2,"../components/graphics/line":4,"../components/physics/line":8}],12:[function(require,module,exports){
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

},{"../components/collision/rect":2,"../components/graphics/pipe":5,"../components/physics/pipe":9}],13:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/ui");

var Ui = function(position) {

  var graphics = new graphicsComponent.UiGraphicsComponent(this);
  // physics.position = position;

  this.components = {
    graphics: graphics

  };
};

exports.Ui = Ui;

},{"../components/graphics/ui":6}],14:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require("./systems/input");
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var ui = require('./entities/ui');
var line = require('./entities/line');

var FlappyBird = function() {
  this.entities = [new bird.Bird(), new pipe.Pipe({x:0.49,y:0}, {width:0.03, height:0.4}), new pipe.Pipe({x:0.49,y:0.95}, {width:0.03, height:0.3}),new line.Line({x:0.49,y:0.5}, {width:0.005, height:0.4})];
  this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
  this.physics = new physicsSystem.PhysicsSystem(this.entities);
  this.input = new inputSystem.InputSystem(this.entities);
};

FlappyBird.prototype.run = function() {
  this.graphics.run();
  this.physics.run();
  this.input.run();
};

/* -- Game reset - turned off for now 

FlappyBird.prototype.reset = function (){
//  this.entities = [new bird.Bird(this), new pipe.Pipe({x:0.49,y:0}, {width:0.03, height:0.4}), new pipe.Pipe({x:0.49,y:0.95}, {width:0.03, height:0.3}),new ui.Ui()];
  this.entities.splice(0, this.entities.length);
  this.entities.push(new bird.Bird);
  this.entities.push(new pipe.Pipe(0.49,0.95));
}

*/

exports.FlappyBird = FlappyBird;

},{"./entities/bird":10,"./entities/line":11,"./entities/pipe":12,"./entities/ui":13,"./systems/graphics":17,"./systems/input":18,"./systems/physics":19}],15:[function(require,module,exports){
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
  var app = new flappyBird.FlappyBird();
  // window.app = app; /*-- not the best idea --*/
  app.run();
});

},{"./flappy_bird":14}],16:[function(require,module,exports){
var bird = require("../entities/bird")

var CollisionSystem = function(entities) {
    this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entityA = this.entities[i];
        if (!'collision' in entityA.components) {
            continue;
        }

        for (var j=i+1; j<this.entities.length; j++) {
            var entityB = this.entities[j];
            if (!'collision' in entityB.components) {
                continue;
            }

            if (!entityA.components.collision.collidesWith(entityB)) {
                continue;
            }

            if (entityA.components.collision.onCollision) {
                entityA.components.collision.onCollision(entityB);
            }

            if (entityB.components.collision.onCollision) {
                entityB.components.collision.onCollision(entityA);
            }
        }
    }
    // this.endGame();
};

/* -- game reset -- turned off to check if everything else is working */

CollisionSystem.prototype.endGame =function () {
    for (var i=0; i<this.entities.length; i++) {
        var entityA = this.entities[i];
        if (entityA instanceof bird.Bird) {
            console.log("Bird Song");
            if(entityA.collided){
                  this.entities = [new bird.Bird(25,100)];
                  console.log("Game Reset");
            }
        }
    }
}

exports.CollisionSystem = CollisionSystem;

},{"../entities/bird":10}],17:[function(require,module,exports){
var GraphicsSystem = function(entities) {
    this.entities = entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function() {
    // Run the render loop
    window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function() {
    // Set the canvas to the correct size if the window is resized
    if (this.canvas.width != this.canvas.offsetWidth ||
        this.canvas.height != this.canvas.offsetHeight) {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height);
    this.context.scale(this.canvas.height, -this.canvas.height);

    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'graphics' in entity.components) {
            continue;
        }

        entity.components.graphics.draw(this.context);
    }

    this.context.restore();

    window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;

},{}],18:[function(require,module,exports){
var InputSystem = function(entities) {
  this.entities = entities;

  // Canvas is where we get input from
  this.canvas = document.getElementById('overlay');
};

InputSystem.prototype.run = function() {
  this.canvas.addEventListener('click', this.onClick.bind(this));
};

InputSystem.prototype.onClick = function() {
  var bird = this.entities[0];
  bird.components.physics.velocity.y = 0.7;
};

InputSystem.prototype.onTouch = function() {
  var bird = this.entities[0];
  bird.components.physics.velocity.y = 0.7;
};

exports.InputSystem = InputSystem;

},{}],19:[function(require,module,exports){
var pipe = require('../entities/pipe');
var line = require('../entities/line');
var collisionSystem = require("./collision");

var PhysicsSystem = function(entities) {
    this.entities = entities;
    this.collisionSystem = new collisionSystem.CollisionSystem(entities);
};

PhysicsSystem.prototype.run = function() {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000 /60);
    window.setInterval(this.pipeTick.bind(this), 2000);
    window.setInterval(this.lineTick.bind(this), 2000);
};

PhysicsSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];

        if (!'physics' in entity.components) {
            continue;
        }
        entity.components.physics.update(1/60);
    }
  this.collisionSystem.tick();
};

PhysicsSystem.prototype.lineTick = function(){

  console.log("Create a new line");
  this.entities.push(new line.Line(0.49, 0.95));
  for (var i=0; i < this.entities.length; i++) {
    var entity = this.entities[i];
    console.log(entity);

    /* removes the extra pipe */

    if ('entities.physics.position' in entity) {
      if(entity.position.x < -0.5){
        this.entities.splice(i, 1);
      }
    }
  }
}


PhysicsSystem.prototype.pipeTick = function(){
  console.log("Create a new pipe");

  /*
  var randomWidth = Math.floor(Math.random() * (0.5 - 0.25 + 1)) + 0.25;

  console.log(randomWidth + "is now this tall");

  */

  // this.entities.push(new pipe.Pipe(0.9, 0.8, 0.2, 0.1));
  // this.entities.push(new pipe.Pipe(0.9, 0.1, 0.2, 0.1));

  console.log("Length of array before: " + this.entities.length);

  for (var i=0; i < this.entities.length; i++) {
      var entity = this.entities[i];
      console.log(entity);

      /* removes the extra pipe */

      if ('position' in entity) {
        if(entity.position.x < -0.5){
          this.entities.splice(i, 1);
        }
      }
  }
  console.log("Length of array after: " + this.entities.length);
}

exports.PhysicsSystem = PhysicsSystem;

},{"../entities/line":11,"../entities/pipe":12,"./collision":16}]},{},[15]);
