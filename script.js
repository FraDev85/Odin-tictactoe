function createBoard() {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
}

function createPlayer(name, choice) {
  return { name, choice };
}

function checkVictory(board, currentPlayer) {
  let player = currentPlayer.choice;

  for (let i = 0; i < board.length; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    )
      return true;
    if (
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player
    )
      return true;
  }

  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  )
    return true;
  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  )
    return true;

  return false;
}

function makeMove(board, row, col, player) {
  if (board[row][col] === "") {
    board[row][col] = player.choice;
    return true;
  }
  return false;
}

function checkDraw(board) {
  for (let i = 0; i < board.length; i++)
    for (let j = 0; j < board[i].length; j++)
      if (board[i][j] === "") return false;
  return true;
}

function showMessage(text) {
  document.getElementById("message").textContent = text;
}

// --- Setup ---

const player1 = createPlayer("Player", "X");
const player2 = createPlayer("Computer", "O");
let board = createBoard();
let currentPlayer = player1;
let gameOver = false;

const cells = document.querySelectorAll(".cell");

function resetGame() {
  board = createBoard();
  currentPlayer = player1;
  gameOver = false;
  cells.forEach((cell) => (cell.textContent = ""));
  showMessage("");
}

function computerMove() {
  const emptyCells = [];
  cells.forEach((_, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    if (board[row][col] === "") emptyCells.push(index);
  });

  if (emptyCells.length === 0) return;

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const row = Math.floor(randomIndex / 3);
  const col = randomIndex % 3;

  makeMove(board, row, col, player2);
  cells[randomIndex].textContent = player2.choice;

  if (checkVictory(board, player2)) {
    gameOver = true;
    showMessage("Computer Win! 🤖");
  } else if (checkDraw(board)) {
    gameOver = true;
    showMessage("Tied! 🤝");
  } else {
    currentPlayer = player1;
  }
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (gameOver || currentPlayer !== player1) return;

    const row = Math.floor(index / 3);
    const col = index % 3;

    if (!makeMove(board, row, col, player1)) return;
    cell.textContent = player1.choice;

    if (checkVictory(board, player1)) {
      gameOver = true;
      showMessage("You Win! 🎉");
    } else if (checkDraw(board)) {
      gameOver = true;
      showMessage("Tied! 🤝");
    } else {
      currentPlayer = player2;
      setTimeout(computerMove, 400);
    }
  });
});
