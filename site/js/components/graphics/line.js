var LineGraphicsComponent = function(entity) {
    this.entity = entity;
};

LineGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;
    var dimension = this.entity.components.physics.dimension;

    // console.log("Draw the line at " + position.x + ", " + position.y);
    context.save();
    context.translate(position.x, position.y);
    context.fillStyle="#FF0000";
    context.fillRect(0, 0, dimension.x, dimension.y);
    context.restore();
};

exports.LineGraphicsComponent = LineGraphicsComponent;
