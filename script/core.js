const gameStatusPlayer = document.querySelector(".game-status-player");
const gamePoints = document.querySelectorAll(".game-points");
const gameReset = document.querySelector(".game-reset");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winMessage = () => `Player ${currentPlayer} has won!`;
const currentPlayerTurn = () => `Turn ${currentPlayer}`;

gameStatusPlayer.innerHTML = currentPlayerTurn();

gameReset.style.cursor = "not-allowed";
gameReset.style.background = "#72A8EE";
gameReset.disabled = true;

gamePoints.forEach((point) => point.addEventListener("click", gamePointClick));
gameReset.addEventListener("click", restartGame);

function gamePointClick(clickedCellEvent) {
  const clickedPoint = clickedCellEvent.target;
  const clickedPointIndex = parseInt(
    clickedPoint.getAttribute("data-game-points-index")
  );

  if (gameState[clickedPointIndex] !== "" || !gameActive) {
    return;
  }

  pointPlayed(clickedPoint, clickedPointIndex);
  resultGame();
}

function pointPlayed(clickedPoint, clickedPointIndex) {
  gameState[clickedPointIndex] = currentPlayer;
  clickedPoint.innerHTML = currentPlayer;
}

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function resultGame() {
  let gameRoundWon = false;

  for (let i = 0; i <= 7; i += 1) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      gameRoundWon = true;
      break;
    }
  }

  if (gameRoundWon) {
    gameStatusPlayer.innerHTML = winMessage();
    const instance = basicLightbox.create(
      `<div class="game-modal-overlay animate__bounceIn">
          <div class="winner-modal-window animate__bounceIn">
            <h1 class="game-status-title">Player - ${currentPlayer} is winner</h1>
          </div>
        </div>`,
      {
        onShow: (instance) => {
          document.addEventListener("keydown", onCloseModal);
        },
        onClose: (instance) => {
          document.removeEventListener("keydown", onCloseModal);
        },
      }
    );
    instance.show();
    gameActive = false;

    function onCloseModal(evt) {
      if (evt.code === "Escape") {
        instance.close();
      }
    }
    restartGame();
    return;
  }

  let gameRoundDraw = !gameState.includes("");
  if (gameRoundDraw) {
    const instance = basicLightbox.create(
      `<div class="game-modal-overlay animate__bounceIn">
          <div class="winner-modal-window animate__bounceIn">
            <h1 class="game-status-title">Game finished in a draw!</h1>
          </div>
        </div>`,
      {
        onShow: (instance) => {
          document.addEventListener("keydown", onCloseModal);
        },
        onClose: (instance) => {
          document.removeEventListener("keydown", onCloseModal);
        },
      }
    );
    instance.show();
    gameActive = false;

    function onCloseModal(evt) {
      if (evt.code === "Escape") {
        instance.close();
      }
    }
    restartGame();
    gameActive = false;
    return;
  }

  gamePlayerChange();
}

function gamePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatusPlayer.innerHTML = currentPlayerTurn();
  if (currentPlayer) {
    gameReset.style.cursor = "pointer";
    gameReset.disabled = false;
    gameReset.style.background = "#1f79ee";
  }
}

function restartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameStatusPlayer.innerHTML = currentPlayerTurn();
  gamePoints.forEach((point) => (point.innerHTML = ""));
  if (!gameActive === false) {
    gameReset.style.cursor = "not-allowed";
    gameReset.disabled = true;
    gameReset.style.background = "#72A8EE";
  }
}
