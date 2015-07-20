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