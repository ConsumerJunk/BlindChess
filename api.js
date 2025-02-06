async function postChessApi(data = {}) {
    const response = await fetch("https://chess-api.com/v1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

function startGame() {
    postChessApi({ fen: getFen(), depth: 12 }).then((data) => {console.log(data);opponentMove(data.from, data.to)});
}