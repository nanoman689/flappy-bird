/*-- http://i.imgur.com/0rBYFEp.jpg?1 --*/

var BackGroundComponent = function(entity) {
  this.entity = entity;
};

BackGroundComponent.prototype.draw = function(context) {
  //var position = this.entity.components.physics.position;

  context.save();
  context.drawImage("http://i.imgur.com/0rBYFEp.jpg?1",0,0);
  context.restore();
};

exports.BackGroundComponent = BackGroundComponent;
