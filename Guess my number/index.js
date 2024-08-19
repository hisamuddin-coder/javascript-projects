"use strict";
const checkBtn = document.querySelector(".check");
const playBtn = document.querySelector(".play__btn");
const guessNumber = document.querySelector(".guess__number");
const message = document.querySelector(".message");
const secretNumber = document.querySelector(".secret__number");
const highscoreNumber = document.querySelector(".highscore");
const scoreNumber = document.querySelector(".score");

let secretDigit = Math.floor(Math.random() * 20) + 1;
let scoreDigit = 20;
let highscoreDigit = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

function startGuess() {
  const guess = +guessNumber.value;

  if (!guess) {
    message.textContent = "🚫 No Number!";

    // Guess is correct
  } else if (guess === secretDigit) {
    message.textContent = "🎉 Correct Number!";
    secretNumber.textContent = secretDigit;
    document.querySelector("body").style.backgroundColor = " #76abae";
    secretNumber.style.backgroundColor = "#66FF00";

    if (scoreDigit > highscoreDigit) {
      highscoreDigit = scoreDigit;
      highscoreNumber.textContent = highscoreDigit;
    }
    checkBtn.disabled = true;
    playBtn.style.display = "block";
    // Guess is wrong
  } else if (guess !== secretDigit) {
    if (scoreDigit > 1) {
      message.textContent = guess > secretDigit ? "📈 Too High" : " 📉 To Low!";
      scoreDigit--;
      scoreNumber.textContent = scoreDigit;
    } else {
      message.textContent = "💣 You Lost The Game!";
      scoreNumber.textContent = 0;
    }
  }
}
function newGame() {
  scoreDigit = 20;
  secretDigit = Math.floor(Math.random() * 20) + 1;
  message.textContent = "Start guessing...";
  scoreNumber.textContent = scoreDigit;
  secretNumber.textContent = "?";
  guessNumber.value = "";
  document.querySelector("body").style.backgroundColor = "#31363f";
  secretNumber.style.backgroundColor = "#dc143c";
  checkBtn.disabled = false;
  playBtn.style.display = "none";
}
checkBtn.addEventListener("click", startGuess);
playBtn.addEventListener("click", newGame);
