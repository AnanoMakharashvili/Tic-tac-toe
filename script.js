const buttonGrey = document.getElementById("oGrey");
const buttonBlue = document.getElementById("xBlue");
const backgroundX = document.getElementById("backgroundX");
const backgroundO = document.getElementById("backgroundO");
const cpuGameButton = document.getElementById("start-cpu-game-button");
const multiplayerbutton = document.getElementById(
  "start-multiplayer-game-button"
);
const gameContainer = document.getElementById("game-container");
const firstPage = document.getElementById("first-page");
const resultBoxLost = document.getElementById("result-box-lost");
const resultBoxWon = document.getElementById("result-box-won");
const resultTied = document.getElementById("round");
const restartContainer = document.getElementById("restart-game-container");
const gameZone = document.getElementById("game-zone");
const turnStyle = document.getElementById("turn-style");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");
const scoreT = document.getElementById("score-t");
const xButton = document.getElementById("x-btn");
const oButton = document.getElementById("o-btn");
const resultText = document.getElementById("result-text");
const playerTwoWin = document.getElementById("player-two-win");
const iconRestart = document.getElementById("icon-restart");
const quitButton = document.getElementById("quit-btn-won");
const nextButton = document.getElementById("next-btn-won");
const quitButtonLost = document.getElementById("quit-btn-lost");
const nextButtonLost = document.getElementById("next-btn-lost");
const quitButtonTied = document.getElementById("quit-btn-tied");
const nextButtonTied = document.getElementById("next-btn-tied");
const yesRestartButton = document.getElementById("yes-restart-btn");
const cancelRestartButton = document.getElementById("cancel-restart-btn");
const pointer = document.getElementById("pointer");

let isXTurn = true;
let gameResult = null;
let scores = { x: 0, o: 0, t: 0 };
let isCpuGame = false;
let isPlayerTurn = true;
let playerChoiceOnComputerGame = "X";
let isXOrOSelected = false;

cpuGameButton.addEventListener("click", () => {
  if (!isXOrOSelected) return;
  gameContainer.style.display = "block";
  firstPage.style.display = "none";
  resetGame();
  if (playerChoiceOnComputerGame === "O" && isCpuGame) {
    playerChoiceOnComputerGame = "O";
    cpuChoice = "X";
    cpuTurn();
  } else if (playerChoiceOnComputerGame === "X" && isCpuGame) {
    playerChoiceOnComputerGame = "X";
    cpuChoice = "O";
    cpuTurn();
  }
});

multiplayerbutton.addEventListener("click", () => {
  if (!isXOrOSelected) return;
  gameContainer.style.display = "block";
  firstPage.style.display = "none";
  resetGame();
  isCpuGame = false;
  isXTurn = true;
  turnStyle.innerHTML = "<span>X TURN</span>";
});

xButton.addEventListener("click", () => {
  xButton.classList.add("selected");
  buttonGrey.classList.remove("selected");

  buttonBlue.style.display = "block";
  buttonGrey.style.display = "block";

  backgroundX.style.display = "block";
  backgroundO.style.display = "block";
  xButton.style.display = "none";
  oButton.style.display = "none";

  backgroundX.style.backgroundColor = "#a8bfc9";
  backgroundO.style.backgroundColor = "transparent";

  xButton.innerHTML = "X (P1)";
  oButton.innerHTML = "O (P2)";

  xButton.style.backgroundColor = "#A8BFC9";
  oButton.style.backgroundColor = "transparent";

  isPlayerTurn = true;
  isXTurn = true;
  isCpuGame = true;
  isXOrOSelected = true;
  turnStyle.innerHTML = "<span>O TURN</span>";
  clickedOnX = true;
  playerChoiceOnComputerGame = "X";
  cpuChoice = "O";
});

buttonGrey.addEventListener("click", () => {
  buttonGrey.classList.add("selected");
  xButton.classList.remove("selected");

  buttonBlue.style.display = "block";
  oButton.style.display = "block";
  buttonGrey.style.display = "none";
  xButton.style.display = "block";

  backgroundX.style.display = "block";
  backgroundO.style.display = "block";
  buttonBlue.style.display = "none";

  backgroundX.style.backgroundColor = "transparent";
  backgroundO.style.backgroundColor = "#a8bfc9";

  xButton.innerHTML = "X (P2)";
  oButton.innerHTML = "O (P1)";

  oButton.style.backgroundColor = "#A8BFC9";
  xButton.style.backgroundColor = "transparent";

  isPlayerTurn = false;
  isXTurn = false;
  isCpuGame = true;
  isXOrOSelected = true;
  turnStyle.innerHTML = "<span>X TURN</span>";
  cpuTurn();
  clickedOnX = false;
  playerChoiceOnComputerGame = "O";
  cpuChoice = "X";
});

iconRestart.addEventListener("click", () => {
  restartContainer.style.display = "block";
});

function resetGame() {
  isXTurn = true;
  gameResult = null;
  gameZone.querySelectorAll(".click-style").forEach((cell) => {
    cell.innerHTML = "";
    cell.style.backgroundColor = "";
  });

  turnStyle.textContent = "X TURN";

  resultBoxLost.style.display = "none";
  resultBoxWon.style.display = "none";
  resultTied.style.display = "none";
  restartContainer.style.display = "none";
  quitButton.style.display = "none";
  nextButton.style.display = "none";
  quitButtonLost.style.display = "none";
  nextButtonLost.style.display = "none";
  nextButtonTied.style.display = "none";
  quitButtonTied.style.display = "none";

  if (playerChoiceOnComputerGame === "O") {
    cpuTurn();
    resultText.style.display = "none";
    playerTwoWin.style.display = "block";
  }
}

gameZone.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("click-style") &&
    !event.target.innerHTML &&
    !gameResult
  ) {
    const img = document.createElement("img");
    img.classList.add(isXTurn ? "x-style" : "o-style");
    img.src = isXTurn
      ? "assets/Combined Shape Copy 2 copy.png"
      : "assets/icon-o.svg";
    event.target.appendChild(img);

    updateOutlineStyles();

    checkWinner();

    if (!gameResult) {
      isXTurn = !isXTurn;
      turnStyle.innerHTML = `<span>${isXTurn ? "X" : "O"}</span> TURN`;
      cpuTurn();
    }
  }
});

function updateOutlineStyles() {
  if (!isXTurn) {
    for (let i = 0; i < gameZone.children.length; i++) {
      if (!gameZone.children[i].querySelector("img")) {
        gameZone.children[i].classList.add("xOutline");
        gameZone.children[i].classList.remove("oOutline");
      }
    }
    if (pointer && !pointer.querySelector("img")) {
      pointer.classList.add("xOutline");
      pointer.classList.remove("oOutline");
    }
  } else {
    for (let i = 0; i < gameZone.children.length; i++) {
      if (!gameZone.children[i].querySelector("img")) {
        gameZone.children[i].classList.add("oOutline");
        gameZone.children[i].classList.remove("xOutline");
      }
    }
    if (pointer && !pointer.querySelector("img")) {
      pointer.classList.add("oOutline");
      pointer.classList.remove("xOutline");
    }
  }

  gameZone.addEventListener("click", function (event) {
    if (event.target && event.target.matches(".click-style")) {
      event.target.classList.remove("xOutline");
      event.target.classList.remove("oOutline");
    }
  });
}

function cpuTurn() {
  if (
    (isCpuGame &&
      !isXTurn &&
      !gameResult &&
      playerChoiceOnComputerGame === "X") ||
    (isCpuGame && isXTurn && !gameResult && playerChoiceOnComputerGame === "O")
  ) {
    const cells = Array.from(gameZone.querySelectorAll(".click-style"));
    const emptyCells = cells.filter((cell) => !cell.innerHTML);

    const cpuSymbol = playerChoiceOnComputerGame === "X" ? "O" : "X";
    const playerSymbol = cpuSymbol === "X" ? "O" : "X";

    let bestMove = findBestMove(cells, cpuSymbol);
    if (!bestMove) {
      bestMove = findBestMove(cells, playerSymbol);
    }
    if (!bestMove) {
      bestMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    if (bestMove) {
      bestMove.innerHTML = `<img src='assets/icon-${cpuSymbol.toLowerCase()}.svg' class='${cpuSymbol.toLowerCase()}-style' />`;
      updateOutlineStyles();
      checkWinner();

      isXTurn = !isXTurn;
      turnStyle.innerHTML = `<span>${isXTurn ? "X" : "O"} TURN</span>`;
    }
  }
}

function findBestMove(cells, symbol) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    const values = [cells[a].innerHTML, cells[b].innerHTML, cells[c].innerHTML];

    if (
      values.filter((val) => val.includes(`${symbol.toLowerCase()}-style`))
        .length === 2 &&
      values.includes("")
    ) {
      return cells[line[values.indexOf("")]];
    }
  }
  return null;
}

function checkWinner() {
  const cells = Array.from(gameZone.querySelectorAll(".click-style"));
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winner = null;

  lines.forEach((line) => {
    const [a, b, c] = line;
    if (
      cells[a].innerHTML &&
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[a].innerHTML === cells[c].innerHTML
    ) {
      winner = cells[a].innerHTML.includes("x-style") ? "X" : "O";
      gameResult = `${winner} won`;
      displayResult(gameResult);
      updateScore(gameResult);

      const winColor = winner === "X" ? "#31C3BD" : "#F2B137";
      cells[a].style.backgroundColor = winColor;
      cells[b].style.backgroundColor = winColor;
      cells[c].style.backgroundColor = winColor;

      const winImage =
        winner === "X"
          ? "assets/icon-of-winner-x.svg"
          : "assets/icon-of-winner-o.svg";
      cells[a].querySelector("img").src = winImage;
      cells[b].querySelector("img").src = winImage;
      cells[c].querySelector("img").src = winImage;
    }
  });

  if (!winner && cells.every((cell) => cell.innerHTML !== "")) {
    gameResult = "tie";
    displayResult(gameResult);
    updateScore(gameResult);
  }
}

function displayResult(result) {
  if (result === "X won") {
    resultBoxLost.style.display = "none";
    resultBoxWon.style.display = "block";
    quitButton.style.display = "block";
    nextButton.style.display = "block";
    resultTied.style.display = "none";
  } else if (result === "O won") {
    resultBoxWon.style.display = "none";
    resultBoxLost.style.display = "block";
    quitButtonLost.style.display = "block";
    nextButtonLost.style.display = "block";
    resultTied.style.display = "none";
  } else if (result === "tie") {
    resultBoxWon.style.display = "none";
    resultTied.style.display = "block";
    quitButtonTied.style.display = "block";
    nextButtonTied.style.display = "block";
  }
}

function updateScore(result) {
  if (result === "X won") {
    scores.x += 1;
    scoreX.textContent = scores.x;
  } else if (result === "O won") {
    scores.o += 1;
    scoreO.textContent = scores.o;
  } else if (result === "tie") {
    scores.t += 1;
    scoreT.textContent = scores.t;
  }
}

quitButton.addEventListener("click", () => {
  gameContainer.style.display = "none";
  firstPage.style.display = "block";
  firstPage.style.display = "flex";
  firstPage.style.gap = "17px";
  resetGame();
});

nextButton.addEventListener("click", () => {
  resetGame();
  resultBoxWon.style.display = "none";
  quitButton.style.display = "none";
  nextButton.style.display = "none";
});

quitButtonLost.addEventListener("click", () => {
  gameContainer.style.display = "none";
  firstPage.style.display = "block";
  firstPage.style.display = "flex";
  firstPage.style.gap = "17px";
  resetGame();
});

nextButtonLost.addEventListener("click", () => {
  resetGame();
  resultBoxLost.style.display = "none";
  quitButtonLost.style.display = "none";
  nextButtonLost.style.display = "none";
});

quitButtonTied.addEventListener("click", () => {
  gameContainer.style.display = "none";
  firstPage.style.display = "block";
  firstPage.style.display = "flex";
  firstPage.style.gap = "17px";
  resetGame();
});
nextButtonTied.addEventListener("click", () => {
  resetGame();
  resultTied.style.display = "none";
  quitButtonTied.style.display = "none";
  nextButtonTied.style.display = "none";
});

document.getElementById("yes-restart-btn").addEventListener("click", () => {
  resetGame();
  restartContainer.style.display = "none";
});

document.getElementById("cancel-restart-btn").addEventListener("click", () => {
  restartContainer.style.display = "none";
});
