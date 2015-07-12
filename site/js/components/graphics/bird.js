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