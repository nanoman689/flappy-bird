var UiGraphicsComponent = function(entity) {
    this.entity = entity;
};

UiGraphicsComponent.prototype.draw = function(context) {
    console.log('Drawing Text');

    var position = this.entity.position;

    context.font="72px serif";
    context.fillStyle = "orange";
    context.fillText("Hello There!", 0.5, 0.5);

};

exports.UiGraphicsComponent = UiGraphicsComponent;
