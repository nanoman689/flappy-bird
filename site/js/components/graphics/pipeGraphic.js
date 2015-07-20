var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

// Use variables to make the animation //

PipeGraphicsComponent.prototype.draw = function(context) {
	/* console.log('Drawing Pipe'); */

    var position = this.entity.position;
    var dimen = this.entity.dimension;
    var pipeGraphicPos = context.getImageData(position.x,position.y,1,1);
    /*
    var pipeTime = PhysicsSystem.prototype.tick;
	*/
	var pipeTime = context.prototype.tick;

    console.log(position.x + " " + position.y);
    console.log("pipe position is now" + pipeGraphicPos);


    context.save();
    context.translate(position.x, position.y);
    context.fillStyle = "orange";
    context.fillRect(0,0,dimen.height,dimen.width);
    context.restore();

};

exports.PipeGraphicsComponent = PipeGraphicsComponent;