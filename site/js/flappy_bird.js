var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require("./systems/input");

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var CrappyBird = function() {
    this.entities = [new bird.Bird(25,100),new pipe.Pipe(20,10)];
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