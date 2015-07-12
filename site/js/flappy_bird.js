var graphicsSystem = require('./systems/graphics');
var bird = require('./entities/bird');

var FlappyBird = function() {
    this.entities = [new bird.Bird(50,50)];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
};

FlappyBird.prototype.run = function() {
    this.graphics.run();
};

exports.FlappyBird = FlappyBird;