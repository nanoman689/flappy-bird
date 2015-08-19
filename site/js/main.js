var flappyBird = require('./flappy_bird');



document.addEventListener('DOMContentLoaded', function() {
  // add the start button function here //

  function startGame() {
      console.log("start the game!");
  }

  var app = new flappyBird.FlappyBird();
  window.app = app; /*-- not the best idea --*/
  app.run();
});
