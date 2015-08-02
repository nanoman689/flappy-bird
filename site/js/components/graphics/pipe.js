var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;
    var dimension = this.entity.components.physics.dimension;

    // console.log("Draw the pipe at " + position.x + ", " + position.y);
    context.save();
    context.translate(position.x, position.y);
    context.fillRect(0, 0, dimension.width, dimension.height);
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
