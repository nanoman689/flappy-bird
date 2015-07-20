(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
};

// Use variables to make the animation //

BirdGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.beginPath();
    context.arc(0, 0, 0.02, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],2:[function(require,module,exports){
var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

// Use variables to make the animation //

PipeGraphicsComponent.prototype.draw = function(context) {
	/* console.log('Drawing Pipe'); */

    var position = this.entity.position;
    var dimen = this.entity.dimension;

    /*
    console.log(position.x + " " + position.y);
	*/

    context.save();
    context.translate(position.x, position.y);
    context.fillStyle = "orange";
    context.fillRect(0,0,dimen.height,dimen.width);
    context.restore();

};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
var PipePhysicsComponent = function(entity) {
    this.entity = entity;

    this.position = {
        x: 0,
        y: 0
    };
    this.velocity = {
        x: -0.01,
        y: 0
    };
/*
    this.acceleration = {
        x: 0,
        y: 0
    };
*/

};

PipePhysicsComponent.prototype.update = function(delta) {

    /*
    this.velocity.x += this.acceleration.x * delta;

    this.velocity.y += this.acceleration.y * delta;
    
    this.position.x += this.velocity.x * delta;

    this.position.y += this.velocity.y * delta;
    */

    this.entity.position.x += this.velocity.x;

    this.entity.position.y += this.velocity.y;

};

exports.PipePhysicsComponent = PipePhysicsComponent;
},{}],5:[function(require,module,exports){
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
},{"../components/graphics/bird":1,"../components/physics/physics":3}],6:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipeGraphic");
var physicsComponent = require("../components/physics/physicsPipe");

var Pipe = function(xP,yP, h) {
    console.log("Creating Pipe entity");

    var physics = new physicsComponent.PipePhysicsComponent(this);

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);

    this.components = {
        graphics: graphics,
        physics: physics
    };
    this.dimension = {
    	width: 0.1,
    	height: h,
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

exports.Pipe = Pipe;
},{"../components/graphics/pipeGraphic":2,"../components/physics/physicsPipe":4}],7:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require("./systems/input");

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var CrappyBird = function() {
    this.entities = [new bird.Bird(25,100),new pipe.Pipe(0.9, 0.1, 0.1), new pipe.Pipe(0.9, 0.8, 0.1)];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
};

CrappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
};

exports.CrappyBird = CrappyBird;

/*
var physicsComponent = require("./components/physics/physics");

var Bird = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.y = -2;

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);

    this.components = {
        physics: physics,
        graphics: graphics,
    };
};

exports.Bird = Bird;

var pipePhysicsComponent = require("./components/physics/physicsPipe");

var Pipe = function() {
    var physics = new physicsComponent.PipePhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.y = -0;

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);

    this.components = {
        physics: physics,
        graphics: graphics,
    };
};

exports.Pipe = Pipe;

*/
},{"./entities/bird":5,"./entities/pipe":6,"./systems/graphics":9,"./systems/input":10,"./systems/physics":11}],8:[function(require,module,exports){
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
    var app = new flappyBird.CrappyBird();
    console.log(app);
    app.run();
});
},{"./flappy_bird":7}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
var InputSystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
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
},{}],11:[function(require,module,exports){
var pipe = require('../entities/pipe');

var PhysicsSystem = function(entities) {
    this.entities = entities;
};

PhysicsSystem.prototype.run = function() {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000 /60);
    window.setInterval(this.pipeTick.bind(this), 2000);
};

PhysicsSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'physics' in entity.components) {
            continue;
        }

        entity.components.physics.update(1/60);

    }
};

PhysicsSystem.prototype.pipeTick = function(){
  console.log("Create a new pipe");
  
  this.entities.push(new pipe.Pipe(0.9, 0.8, 0.1));
  this.entities.push(new pipe.Pipe(0.9, 0.1, 0.1));

  console.log("Length of array before: " + this.entities.length);
  
  for (var i=0; i < this.entities.length; i++) {
      var entity = this.entities[i];
      console.log(entity);
      if ('position' in entity) {
        if(entity.position.x < -0.5){
          this.entities.splice(i, 1);
        }
      }
  }
  console.log("Length of array after: " + this.entities.length);
}

exports.PhysicsSystem = PhysicsSystem;
},{"../entities/pipe":6}]},{},[8]);
