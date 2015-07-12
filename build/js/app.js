(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
};

// Use variables to make the animation //

BirdGraphicsComponent.prototype.move = function(context) {
	this.entity.x = this.entity.x + 1;
}; 

BirdGraphicsComponent.prototype.draw = function(context, position, size) {
    context.save();
    context.translate(position.x, position.y);
    context.scale(size, size);
    context.beginPath();
    context.arc(this.entity.x, this.entity.y, 10, 0, 2 * Math.PI);
    context.fill();
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],2:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");

var Bird = function(x,y) {
    console.log("Creating Bird entity");

    this.x = x;
    this.y = y;

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    this.components = {
        graphics: graphics
    };
};

exports.Bird = Bird;
},{"../components/graphics/bird":1}],3:[function(require,module,exports){
var BoxGraphicsComponent = function(entity) {
    this.entity = entity;
};

// Use variables to make the animation //

BoxGraphicsComponent.prototype.draw = function(context) {
	context.beginPath();
    context.rect(20, 20, 150, 100);
    context.stroke();
};

exports.BoxGraphicsComponent = BoxGraphicsComponent;
},{}],4:[function(require,module,exports){
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
},{"./entities/bird":2,"./entities/box":3,"./systems/graphics":6}],5:[function(require,module,exports){
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
    var app = new flappyBird.FlappyBird();
    console.log(app);
    app.run();
});
},{"./flappy_bird":4}],6:[function(require,module,exports){
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

        entity.components.graphics.move(this.context);
        entity.components.graphics.draw(this.context);
    }

    this.context.restore();

    window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;
},{}]},{},[5]);
