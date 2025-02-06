const coords = [
	"A8","B8","C8","D8","E8","F8","G8","H8",
	"A7","B7","C7","D7","E7","F7","G7","H7",
	"A6","B6","C6","D6","E6","F6","G6","H6",
	"A5","B5","C5","D5","E5","F5","G5","H5",
	"A4","B4","C4","D4","E4","F4","G4","H4",
	"A3","B3","C3","D3","E3","F3","G3","H3",
	"A2","B2","C2","D2","E2","F2","G2","H2",
	"A1","B1","C1","D1","E1","F1","G1","H1",
];
const grammar = `#JSGF V1.0; grammar coords; public <coords> = ${coords.join(
" | ",
)};`;

const recognition = new webkitSpeechRecognition();
const speechRecognitionList = new webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;

function say(text) {
	let utterance = new SpeechSynthesisUtterance(text.replace(">", " to "));
	speechSynthesis.speak(utterance);
}

var move;
function startVoice() {

	recognition.continuous = true;
	recognition.start();
	recognition.onresult = (event) => {

		move = event.results[event.results.length - 1][0].transcript;

		setTimeout(() => {

			if(move == "" || move == " " || move == "wow") return;

			move = move.toUpperCase();

			if(move.startsWith(" ")) {
				move = move.substr(1,move.length)
			}

			move = move.split("'").join("");
			move = move.split("WHATS ON").join("W");
			move = move.split("WHAT IS ON").join("W");
			move = move.split("WHAT IS").join("W");
			move = move.split("WHATS").join("W");
			move = move.split("CHEAT").join("G");
			move = move.split("WHAT").join("W");
			move = move.split("GOING").join("A1");
			move = move.split("I").join("A");
			move = move.split("ONE").join("1");
			move = move.split("TWO").join("2");
			move = move.split("THREE").join("3");
			move = move.split("FOUR").join("4");
			move = move.split("FOR").join("4");
			move = move.split("FIVE").join("5");
			move = move.split("SIX").join("6");
			move = move.split("SEX").join("6");
			move = move.split("HAVE").join("F");
			move = move.split("SEVEN").join("7");
			move = move.split("EIGHT").join("8");
			move = move.split("FAVE").join("5");
			move = move.split("THEY").join("A");
			move = move.split("WANT").join("1");
			move = move.split("S").join("F");
			// move = move.split("IWENT").join("A1");
			move = move.split(" ").join("");
			move = move.split("BEFORE").join("B4");
			move = move.split("BEE").join("B");
			move = move.split("FOR").join("4");
			move = move.split("DOYOUWANT").join("D1");
			move = move.split("DO").join("D");
			move = move.split("BE").join("B");
			move = move.split("SEE").join("C");
			move = move.split("SHE").join("G");
			move = move.split("THE").join("D");
			move = move.split("DYOU").join("D");
			move = move.split("HE").join("E");
			move = move.split("A ").join("A");
			move = move.replace(" TO ", ">");
			move = move.replace("TO", ">");
			move = move.toUpperCase();

			if(move.startsWith("W")) {
				move = move.replace("W", "");
				move = move.replace(" ", "");
				var x = getArrayCoords(move).column;
				var y = getArrayCoords(move).row;
				var piece = getPiece(x, y);


				if(piece != "") {
					var text = move.substr(0, 1) + "-" + move.substr(1, 1) + " is A ";
					if(getColor(x, y) == "w") text += "white";
					if(getColor(x, y) == "b") text += "black";
					if(piece.toUpperCase() == "R") text += "rook";
					if(piece.toUpperCase() == "N") text += "knite";
					if(piece.toUpperCase() == "B") text += "bishop";
					if(piece.toUpperCase() == "Q") text += "queen";
					if(piece.toUpperCase() == "K") text += "king";
					if(piece.toUpperCase() == "P") text += "pawn";
				} else {
					text = "No piece occupies " + move;
				}
				

				say(text);
				return;
			}

			if(move.length == 5 && move[2] == "2") {
				move = move.substr(0, 2) + ">" + move.substr(3, 4);
			}

			if(move.includes(">")) {
				var from = move.split(">")[0];
				var to = move.split(">")[1];
				if(from[0] == "8") move = "A" + move.substr(1, move.length);
				if(to[0] == "8") move = move.substr(0, 3) + "A" + move.substr(move.length-1, 1);
			} else {

			}

			if(!validateSimpleMove(move)) {
				failSound.play();
				return;
			}

			iMove(move.split(">")[0], move.split(">")[1]);
			startGame();
			
		}, 200);	
	};

}

function getArrayCoords(coord) {
	
	var column = coord[0].toUpperCase();
	var row = Number(coord[1]);
	var column = "ABCDEFGH".indexOf(column) + 1;

	return {
		column: column - 1,
		x: column - 1,
		row: row - 1,
		y: row - 1,
	};

}

function validateSimpleMove(move) {

	// TODO: Hide this from player
	
	if(!move.includes(">")) {
		// say("Not a simple move");
		// console.log("Not a simple move");
		return false;
	}

	var fromX = getArrayCoords(move.split(">")[0]).x;
	var fromY = getArrayCoords(move.split(">")[0]).y;
	var toX = getArrayCoords(move.split(">")[1]).x;
	var toY = getArrayCoords(move.split(">")[1]).y;
	// var toX = move.split(">")[1][0];
	// var toY = move.split(">")[1][1];

	if(getColor(fromX, fromY) != myColor) {
		say("Not your piece");
		console.log("Not your piece");
		return false;
	}

	return true;
}