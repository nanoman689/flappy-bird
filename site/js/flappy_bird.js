var graphicsSystem = require('./systems/graphics');
var bird = require('./entities/bird');
var box = require('./entities/box');

var FlappyBird = function() {
    this.entities = [new bird.Bird(50,50), new bird.Bird(100,40)];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
};

var FlappyBox = function (){
	this.entities = [new box.Box()];
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
}

FlappyBird.prototype.run = function() {
    this.graphics.run();
};

FlappyBox.prototype.run = function () {
	this.graphics.run();
}

exports.FlappyBird = FlappyBird;
exports.FlappyBox = FlappyBox;