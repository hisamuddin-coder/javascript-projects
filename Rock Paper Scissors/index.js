// selectors
const displayUserResult = document.querySelector(".result-user");
const displayComputerResult = document.querySelector(".result-computer");
const displayUserResultIcons = document.querySelector(".result-user");
const displayComputerResultIcons = document.querySelector(".result-computer");
const displayResultMessage = document.querySelector(".result-message");
const moves = document.querySelectorAll(".move");

const displayScoresWinsElement = document.querySelector(".scores-wins-element");
const displayScoresTiesElement = document.querySelector(".scores-ties-element");
const displayScoresLossesElement = document.querySelector(
  ".scores-losses-element"
);
const displayScores = document.querySelector(".scores");
const resetBtn = document.querySelector(".btn-reset");

const scoresObject = JSON.parse(localStorage.getItem("scores")) || {
  wins: 0,
  ties: 0,
  losses: 0,
};

let randomNumber;

moves.forEach((move) => {
  move.addEventListener("click", () => {
    handlePlayGame(move);
  });
});

resetBtn.addEventListener("click", () => {
  handleReset();
});

const handlePlayGame = function (userSelect) {
  randomNumber = Math.random();
  const computerMove = handleComputerMove();
  const userMove = userSelect.dataset.id;

  const computerMoveIcon = handleMoveIcons(computerMove);
  const userMoveIcon = handleMoveIcons(userMove);

  displayUserResultIcons.innerHTML = `<i class="fa-regular ${userMoveIcon} result-user-icon"></i>`;
  displayComputerResultIcons.innerHTML = `<i class="fa-regular ${computerMoveIcon} result-computer-icon"></i>`;

  displayResultMessage.innerHTML = handleGameResult(userMove);
  handleScoresObject(userMove);
};

const handleComputerMove = function () {
  if (randomNumber < 1 / 3) {
    return "rock";
  } else if (randomNumber < 2 / 3) {
    return "paper";
  }
  return "scissors";
};
const handleMoveIcons = function (move) {
  if (move === "rock") {
    return "fa-hand-back-fist";
  } else if (move === "paper") {
    return "fa-hand";
  } else if (move === "scissors") {
    return `fa-hand-scissors"`;
  }
};
// game logic
const handleGameResult = function (userMove) {
  const computerMove = handleComputerMove();
  if (userMove === computerMove) {
    displayComputerResult.style.backgroundColor = "#90ee90";
    displayUserResult.style.backgroundColor = "#90ee90";
    return "Game Tie.";
  }
  if (
    (userMove === "rock" && computerMove === "scissors") ||
    (userMove === "paper" && computerMove === "rock") ||
    (userMove === "scissors" && computerMove === "paper")
  ) {
    displayComputerResult.style.backgroundColor = "#dc143c";
    displayUserResult.style.backgroundColor = "#90ee90";

    return "You Win the Game!";
  } else {
    displayComputerResult.style.backgroundColor = "#90ee90";
    displayUserResult.style.backgroundColor = "#dc143c";
    return "Computer win the Game!";
  }
};

const handleScoresObject = function (userMove) {
  const scores = handleGameResult(userMove);
  if (scores === "Game Tie.") {
    scoresObject.ties++;
  } else if (scores === "You Win the Game!") {
    scoresObject.wins++;
  } else if (scores === "Computer win the Game!") {
    scoresObject.losses++;
  }
  if (scoresObject.wins < scoresObject.losses) {
    displayScores.style.backgroundColor = "#dc143c";
  } else {
    displayScores.style.backgroundColor = "#90ee90";
  }
  handleScoresDisplay();
  localStorage.setItem("scores", JSON.stringify(scoresObject));
};

const handleScoresDisplay = function () {
  displayScoresWinsElement.textContent = scoresObject.wins;
  displayScoresTiesElement.textContent = scoresObject.ties;
  displayScoresLossesElement.textContent = scoresObject.losses;
};
handleScoresDisplay();

const handleReset = function () {
  for (let key in scoresObject) {
    scoresObject[key] = 0;
  }

  handleScoresDisplay();
  localStorage.setItem("scores", JSON.stringify(scoresObject));

  displayComputerResultIcons.innerHTML = `<i class="fa-regular fa-hand-back-fist result-user-icon"></i>`;

  displayComputerResultIcons.innerHTML = `<i class="fa-regular fa-hand-back-fist result-user-icon"></i>`;

  displayResultMessage.innerHTML = "Let's play";
};
