var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

// Use variables to make the animation //

uiGraphicsComponent.prototype.draw = function(context) {
    console.log('Drawing Text');

    var position = this.entity.position;

    context.save();
    context.font="48px serif";
    context.fillStyle = "orange";
    context.fillText("Hello There!", 0.5, 0.5);
    context.restore();

};

exports.uiGraphicsComponent = uiGraphicsComponent;
