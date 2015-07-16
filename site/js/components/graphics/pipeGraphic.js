var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

// Use variables to make the animation //

PipeGraphicsComponent.prototype.draw = function(context) {
	console.log('Drawing Pipe');
    var position = this.entity.components.physics.position;
    console.log(position.x + " " + position.y);

    context.save();
    context.translate(position.x, position.y);
    context.fillStyle = "orange";
    context.fillRect(10,10,20,20);
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;