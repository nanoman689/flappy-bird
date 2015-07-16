var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
    var app = new flappyBird.CrappyBird();
    console.log(app);
    app.run();
});