var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require("./systems/input");
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var FlappyBird = function() {
  this.reset();
  this.entities = [new bird.Bird(), new pipe.Pipe({x:0.49,y:0}, {width:0.03, height:0.4}), new pipe.Pipe({x:0.49,y:0.95}, {width:0.03, height:0.3})];
  this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
  this.physics = new physicsSystem.PhysicsSystem(this.entities);
  this.input = new inputSystem.InputSystem(this.entities);
};

FlappyBird.prototype.run = function() {
  this.graphics.run();
  this.physics.run();
  this.input.run();
};

FlappyBird.prototype.reset = function (){
  this.entities = [new bird.Bird(this), new pipe.Pipe({x:0.49,y:0}, {width:0.03, height:0.4}), new pipe.Pipe({x:0.49,y:0.95}, {width:0.03, height:0.3})];
}

exports.FlappyBird = FlappyBird;
