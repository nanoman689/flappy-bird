var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

// Use variables to make the animation //

PipeGraphicsComponent.prototype.draw = function(context) {
	/* console.log('Drawing Pipe'); */

    var position = this.entity.components.physics.position;

    console.log(position.x + " " + position.y);

    context.save();
    context.translate(position.x, position.y);
    context.fillStyle = "orange";
    context.fillRect(-0.1,-0.1,0.1,0.2);
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;