var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
  var app = new flappyBird.FlappyBird();
  // window.app = app; /*-- not the best idea --*/
  app.run();
});
