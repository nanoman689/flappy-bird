var bird = require("../entities/bird")

var CollisionSystem = function(entities) {
    this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entityA = this.entities[i];
        if (!'collision' in entityA.components) {
            continue;
        }

        for (var j=i+1; j<this.entities.length; j++) {
            var entityB = this.entities[j];
            if (!'collision' in entityB.components) {
                continue;
            }

            if (!entityA.components.collision.collidesWith(entityB)) {
                continue;
            }

            if (entityA.components.collision.onCollision) {
                entityA.components.collision.onCollision(entityB);
            }

            if (entityB.components.collision.onCollision) {
                entityB.components.collision.onCollision(entityA);
            }
        }
    }
    this.endGame();
};

/* game reset */

CollisionSystem.prototype.endGame =function () {
    for (var i=0; i<this.entities.length; i++) {
        var entityA = this.entities[i];
        if (entityA instanceof bird.Bird) {
            console.log("Bird Song");
            if(entityA.collided){
                    this.entities = [new bird.Bird(25,100)];
                    console.log("Game Reset");
            }
        }
    }    
}

exports.CollisionSystem = CollisionSystem;