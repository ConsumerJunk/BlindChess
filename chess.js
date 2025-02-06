myColor = "b";
var boardDom = document.getElementsByClassName("chess_board")[0];

var board = [
	["R","N","B","Q","K","B","N","R"],
	["P","P","P","P","P","P","P","P"],
	["","","","","","","",""],
	["","","","","","","",""],
	["","","","","","","",""],
	["","","","","","","",""],
	["p","p","p","p","p","p","p","p"],
	["r","n","b","q","k","b","n","r"],
];

var whiteKCastle = true;
var whiteQCastle = true;
var blackKCastle = true;
var blackQCastle = true;
var toMove = "w";
var enPassant = "-";
var movesSinceCapture = 3;
var totalMoves = 8;

function applyFen(fen) {

	fen = fen.split(" ");
	fenRows = fen[0].split("/");
	toMove = fen[1];
	
	whiteKCastle = fen[2].includes("K");
	whiteQCastle = fen[2].includes("Q");
	blackKCastle = fen[2].includes("k");
	blackQCastle = fen[2].includes("q");

	enPassant = fen[3];

	movesSinceCapture = fen[4];
	totalMoves = fen[5];

	for(var boardX = 0; boardX < 8; boardX++) {
		for(var y = 0; y < 8; y++) {
			board[y][boardX] = "";
		}
	}

	for(var y = fenRows.length - 1; y >= 0; y--) {	
		
		var row = fenRows[y];

		var boardX = 0;
		for(var fenRowIndex = 0; fenRowIndex < row.length; fenRowIndex++) {

			// Skip blank spaces
			if("12345678".includes(row[fenRowIndex])) {
				boardX += Number(row[fenRowIndex]);
			} else {
				board[y][boardX] = row[fenRowIndex];
				boardX++;
			}
			
				
		}

	};

}

function getFen() {

	var fen = "";

	for(var y = board.length - 1; y >= 0; y--){

		var row = board[y];
		var spaces = 0;
		var fenRow = "";

		for(var x = 0; x < row.length; x++) {

			if(row[x] == "") {

				spaces++; 

			} else {

				if(spaces > 0) {
					fenRow += spaces + row[x];
					spaces = 0;
				} else {
					fenRow += row[x];
				}

			}

		}

		if(spaces != 0) fenRow += ("" + spaces);

		fen += fenRow + "/";

	}

	fen = fen.substring(0, fen.length - 1);

	fen += " " + toMove;
	
	if(whiteKCastle || whiteQCastle || blackKCastle || blackQCastle) {
		fen += " ";
		if(whiteKCastle) fen += "K";
		if(whiteQCastle) fen += "Q";
		if(blackKCastle) fen += "k";
		if(blackQCastle) fen += "q";
	} else {
		fen += " -"
	}
	
	fen += " " + enPassant;
	fen += " " + movesSinceCapture;
	fen += " " + totalMoves;

	return fen;
	
}

function updateBoardDom() {

	for(var y = 0; y < 8; y++) {
		for(var x = 0; x < 8; x++) {
			
			var dom = boardDom.getElementsByClassName("board_row")[7-y].getElementsByClassName("tile")[x];
			dom.classList.remove("black");
			dom.classList.remove("white");
			if(getColor(x, y) == "w") dom.classList.add("white");
			if(getColor(x, y) == "b") dom.classList.add("black");

		}
	}

}

function getColor(column, row) {
	var piece = getPiece(column, row);
	if(piece.toUpperCase() == "") return null;
	if(piece.toUpperCase() == piece) return "w";
	if(piece.toUpperCase() != piece) return "b";	
	return null;
}

function getPiece(column, row) {
	return board[row][column];
}

function opponentMove(from, to) {

	toMove = (toMove == "b" ? "w" : "b");
	totalMoves++;
	movesSinceCapture++;

	var text = from.toUpperCase() + ">" + to.toUpperCase();

	var fromObj = getArrayCoords(from);
	var toObj = getArrayCoords(to);
	var piece = board[fromObj.y][fromObj.x];
	board[fromObj.y][fromObj.x] = "";
	board[toObj.y][toObj.x] = piece;
	say(text);
	
	console.log("Opponent: " + text + " (" + piece + ")");

	updateBoardDom();

}

function iMove(from, to) {

	toMove = (toMove == "b" ? "w" : "b");
	totalMoves++;
	movesSinceCapture++;

	var text = from.toUpperCase() + ">" + to.toUpperCase();

	var fromObj = getArrayCoords(from);
	var toObj = getArrayCoords(to);
	var piece = board[fromObj.y][fromObj.x];
	board[fromObj.y][fromObj.x] = "";
	board[toObj.y][toObj.x] = piece;

	moveSound.play();

	console.log("Me: " + text);

	updateBoardDom();
	
}