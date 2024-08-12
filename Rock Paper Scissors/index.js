const displayMove = document.querySelectorAll(".display__move");
const displayMoveUser = document.querySelector(".display__move-user");
const displayMoveComp = document.querySelector(".display__move-comp");
const resultMessage = document.querySelector(".result__message");
const moveBtns = document.querySelectorAll(".move-btn");
const rockMoveBtns = document.querySelector(".rock-move");
const paperMoveBtns = document.querySelector(".paper-move");
const scissorsMoveBtns = document.querySelector(".scissors-move");
const scoreWin = document.querySelector(".score__win");
const scoreTie = document.querySelector(".score__tie");
const scoreLoss = document.querySelector(".score__loss");
const resetBtn = document.querySelector(".reset");

let randomNumber;
moveBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    playGame(btn);
  });
});

function playGame(userSelect) {
  randomNumber = Math.random();
  const computerMove = renderComputerMove();
  const userMove = userSelect.dataset.id;
  const userMoveIcon = getMoveIcon(userMove);
  const computerMoveIcon = getMoveIcon(computerMove);
  displayMoveUser.innerHTML = `<span class="user__move-element">${userMoveIcon}</span>`;
  displayMoveComp.innerHTML = `<span class="comp__move-element">${computerMoveIcon}</span>`;
}

function renderComputerMove() {
  if (randomNumber < 1 / 3) {
    return "rock";
  } else if (randomNumber < 2 / 3) {
    return "paper";
  }
  return "scissors";
}
function getMoveIcon(move) {
  if (move === "rock") {
    return "👊";
  } else if (move === "paper") {
    return "🫱";
  } else if (move === "scissors") {
    return "✌️";
  }
}
function makeResult(userMove) {
  const computerMove = renderComputerMove();
  if (userMove === computerMove) {
    return "Tie.";
  }
  if (
    (userMove === "rock" && computerMove === "scissors") ||
    (userMove === "paper" && computerMove === "rock") ||
    (userMove === "scissors" && computerMove === "paper")
  ) {
    return "You won.";
  }
  return "Computer won.";
}
