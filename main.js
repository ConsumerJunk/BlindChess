var failSound = new Audio("fail.wav");
var startSound = new Audio("start.wav");
var moveSound = new Audio("move.wav");

var gameRunning = false;

function start() {
    if(!gameRunning) {
        startGame();
        gameRunning = true;
    }
    startSound.play();
    startVoice();
}