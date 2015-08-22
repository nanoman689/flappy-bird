var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require("./systems/input");
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var ui = require('./entities/ui');
var line = require('./entities/line');

var FlappyBird = function() {
  this.entities = [new bird.Bird(), new pipe.Pipe({x:0.49,y:0}, {x:0.03, y:0.4}), new pipe.Pipe({x:0.49,y:0.8}, {x:0.03, y:0.2}), new line.Line({x:0.521,y:0}, {x:0.005, y:1})];
  this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
  this.physics = new physicsSystem.PhysicsSystem(this.entities);
  this.input = new inputSystem.InputSystem(this.entities);
};

FlappyBird.prototype.run = function() {
  this.graphics.run();
  this.physics.run();
  this.input.run();
};

FlappyBird.prototype.removeLine = function (line){
  //-- code to remove the line
  var entities = this.entities;
      for(i = 0; i < entities.length; i++){
        if(line == entities[i]){
          entities.splice(i,1);
          break;
        }
    }
}


/* -- Game reset  --*/

FlappyBird.prototype.reset = function (){
  var endButton = document.getElementById('startGame');
  endButton.innerHTML = "Game Over </br> Click to try again!";
  endButton.style.display="block";

  function resetScore(){

    var birdScore = document.getElementById("score");
    birdScore.innerHTML = 0;

  }

  resetScore();

//  this.entities = [new bird.Bird(this), new pipe.Pipe({x:0.49,y:0}, {width:0.03, height:0.4}), new pipe.Pipe({x:0.49,y:0.95}, {width:0.03, height:0.3}),new ui.Ui()];
//  this.entities.splice(0, this.entities.length);

 this.graphics.stop();

//  delete window.app;
//  this.entities.push(new bird.Bird);
//  this.entities.push(new pipe.Pipe(0.49,0.95));
}

exports.FlappyBird = FlappyBird;
