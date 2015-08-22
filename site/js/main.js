var flappyBird = require('./flappy_bird');

function startGame() {
    console.log("start the game!");
}

document.addEventListener('DOMContentLoaded', function() {
  // add the start button function here //
  var button = document.getElementById('startGame');
  button.addEventListener('click',function () {
    console.log("start the game!");
    var app = new flappyBird.FlappyBird();
    this.style.display="none";
    window.app = app; /*-- not the best idea --*/
    app.run();
  })
});
