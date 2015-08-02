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

//  Something is wrong here. Turning this on gives an error that 'x' can not be defined in the physics.line section

//    this.collisionSystem.tick();
};

PhysicsSystem.prototype.lineTick = function(){

  console.log("Create a new line");

  this.entities.push(new line.Line(0.9, 0.8, 0.2, 0.1));

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
