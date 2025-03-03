const buttonOne = document.getElementById("button-one");
const buttonTwo = document.getElementById("button-two");
const gameContainer = document.getElementById("game-container");
const firstPage = document.getElementById("first-page");
const resultBoxLost = document.getElementById("result-box-lost");
const resultBoxWon = document.getElementById("result-box-won");
const restartContainer = document.getElementById("restart-game-container");
const gameZone = document.getElementById("game-zone");
const turnStyle = document.getElementById("turn-style");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");
const scoreT = document.getElementById("score-t");
const xButton = document.getElementById("x-btn");
const oButton = document.getElementById("o-btn");
const buttonBack = document.getElementById("o-player-style");

let isXTurn = true;
let gameResult = null;
let scores = { x: 0, o: 0, t: 0 };

buttonOne.addEventListener("click", () => {
  gameContainer.style.display = "block";
  firstPage.style.display = "none";
  resetGame();
});

buttonTwo.addEventListener("click", () => {
  gameContainer.style.display = "block";
  firstPage.style.display = "none";
  resetGame();
});

xButton.addEventListener("click", () => {
  xButton.classList.add("selected");
  oButton.classList.remove("selected");
});

oButton.addEventListener("click", () => {
  oButton.classList.add("selected");
  xButton.classList.remove("selected");
});

function resetGame() {
  isXTurn = true;
  gameResult = null;
  gameZone.querySelectorAll(".click-style").forEach((cell) => {
    cell.innerHTML = "";
  });
  turnStyle.textContent = "X  TURN";
  resultBoxLost.style.display = "none";
  resultBoxWon.style.display = "none";
  restartContainer.style.display = "none";
}

gameZone.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("click-style") &&
    !event.target.innerHTML &&
    !gameResult
  ) {
    event.target.innerHTML = isXTurn
      ? "<img src='assets/Combined Shape Copy 2 copy.png' class='x-style' />"
      : "<img src='assets/icon-o.svg' class='o-style' />";
    checkWinner();
    isXTurn = !isXTurn;
    turnStyle.innerHTML = `<span>${isXTurn ? "X" : "O"}</span> TURN`;
  }
});

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

  lines.forEach((line) => {
    const [a, b, c] = line;

    if (
      cells[a].innerHTML &&
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[a].innerHTML === cells[c].innerHTML
    ) {
      const winner = cells[a].innerHTML.includes("x-style") ? "X" : "O";
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
}

function displayResult(result) {
  if (result === "won") {
    resultBoxLost.style.display = "none";
    resultBoxWon.style.display = "block";
  } else if (result === "lost") {
    resultBoxWon.style.display = "none";
    resultBoxLost.style.display = "block";
  } else if (result === "tie") {
    resultBoxLost.style.display = "none";
    resultBoxWon.style.display = "none";
    restartContainer.style.display = "block";
  }
}

function updateScore(result) {
  if (result === "won") {
    scores.x += 1;
    scoreX.textContent = scores.x;
  } else if (result === "lost") {
    scores.o += 1;
    scoreO.textContent = scores.o;
  } else if (result === "tie") {
    scores.t += 1;
    scoreT.textContent = scores.t;
  }
}

document.getElementById("yes-restart-btn").addEventListener("click", () => {
  resetGame();
  restartContainer.style.display = "none";
});

document.getElementById("cancel-restart-btn").addEventListener("click", () => {
  restartContainer.style.display = "none";
});
