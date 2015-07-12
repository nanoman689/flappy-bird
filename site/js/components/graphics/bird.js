var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
};

// Use variables to make the animation //

BirdGraphicsComponent.prototype.move = function(context) {
	this.entity.x = this.entity.x + 1;
}; 

BirdGraphicsComponent.prototype.draw = function(context) {
	context.beginPath();
    context.arc(this.entity.x, this.entity.y, 10, 0, 2 * Math.PI);
    context.fill();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;