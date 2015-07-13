var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');

var bird = require('./entities/bird');

var CrappyBird = function() {
    this.entities = [new bird.Bird()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
};

CrappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
};

exports.CrappyBird = CrappyBird;

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