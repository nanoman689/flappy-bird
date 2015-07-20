var PipePhysicsComponent = function(entity) {
    this.entity = entity;

    this.position = {
        x: 0,
        y: 0
    };
    this.velocity = {
        x: -0.01,
        y: 0
    };
/*
    this.acceleration = {
        x: 0,
        y: 0
    };
*/

};

PipePhysicsComponent.prototype.update = function(delta) {

    /*
    this.velocity.x += this.acceleration.x * delta;

    this.velocity.y += this.acceleration.y * delta;
    
    this.position.x += this.velocity.x * delta;

    this.position.y += this.velocity.y * delta;
    */

    this.entity.position.x += this.velocity.x;

    this.entity.position.y += this.velocity.y;

};

exports.PipePhysicsComponent = PipePhysicsComponent;