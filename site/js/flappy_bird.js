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
