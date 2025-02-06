var failSound = new Audio("fail.wav");
var startSound = new Audio("start.wav");
var moveSound = new Audio("move.wav");

var gameRunning = false;
var fenInput = document.getElementById("fen_input");
var playAs = document.getElementById("playAs");
var boardDom = document.getElementsByClassName("chess_board")[0];

function resetFen() {
	fenInput.value = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
}

function start() {
	
	applyFen(fenInput.value);
	toMove = playAs.value == "White" ? "w" : "b";
	if(playAs.value == "White") {

	}

	if(!gameRunning) {
		if(playAs.value == "Black") {
			startGame();
		}
		gameRunning = true;
	}

	updateBoardDom();
	startSound.play();
	startVoice();

}