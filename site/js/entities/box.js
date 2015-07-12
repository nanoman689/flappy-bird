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