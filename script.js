const board = document.getElementById("board");
const resetButton = document.getElementById("reset");
const statusDisplay = document.getElementById("status");
const winningLineCanvas = document.getElementById("winningLine");

let cells;
let currentPlayer;
let gameActive;
let gameState;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function initializeGame() {
  board.innerHTML = "";
  currentPlayer = "x";
  gameActive = true;
  gameState = Array(9).fill(null);
  statusDisplay.textContent = `player ${currentPlayer.toUpperCase()}'s turn`;
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }

  cells = document.querySelectorAll(".cell");
  winningLineCanvas.width = board.offsetHeight;
  winningLineCanvas.height = board.offsetHeight;
  const ctx = winningLineCanvas.getContext("2d");
  ctx.clearRect(0, 0, winningLineCanvas.width, winningLineCanvas.height);
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.dataset.index);
  if (gameState[clickedCellIndex] !== null || !gameActive) {
    return;
  }
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.classList.add(currentPlayer);
  clickedCell.textContent = currentPlayer.toUpperCase();
  checkResult();
  currentPlayer = currentPlayer === "x" ? "o" : "x";
  if (gameActive) {
    statusDisplay.textContent = `player ${currentPlayer.toUpperCase()}'s turn`;
  }
}

function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      drawWinningLine(a, c);
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `player ${currentPlayer.toUpperCase()} has won!`;
    gameActive = false;
    return;
  }

  const roundDraw = !gameState.includes(null);
  if (roundDraw) {
    statusDisplay.textContent = "it's a draw!";
    gameActive = false;
    return;
  }
}

function drawWinningLine(start, end) {
  const cellSize = 100;
  const cellGap = 10;

  const startX = (start % 3) * (cellSize + cellGap) + cellSize / 2;
  const startY = Math.floor(start / 3) * (cellSize + cellGap) + cellSize / 2;
  const endX = (end % 3) * (cellSize + cellGap) + cellSize / 2;
  const endY = Math.floor(end / 3) * (cellSize + cellGap) + cellSize / 2;

  const ctx = winningLineCanvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "orange";
  ctx.stroke();
}
// ... (rest of the code remains the same)

function handleResetButtonClick() {
    initializeGame();
  }
  
  resetButton.addEventListener("click", handleResetButtonClick);
  
  initializeGame();