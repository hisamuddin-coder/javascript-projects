"use strict";

const gameContainer = document.querySelector(".game-container");
const resultContainer = document.querySelector(".restults-container ");
const questionEl = document.getElementById("question");
const totalQuestionEl = document.querySelectorAll(".total-questions");
const optionInputLabels = document.querySelectorAll(".option-input-label");
const optionInputs = document.querySelectorAll(".option-input");
const scoreEl = document.querySelectorAll(".score");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", function () {
  document.querySelector(".game-container").classList.remove("hidden");
  document.querySelector(".start-container").classList.add("hidden");
});

let score = 0;
let currentQuestionIndex = 0;
let questions = [];

// Fetch data from API
const fetchQuestions = async function () {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&category=18&type=multiple"
    );
    const data = await response.json();

    questions = data.results.map((questionData) => {
      return {
        question: questionData.question,
        answers: shuffleAnswers([
          ...questionData.incorrect_answers,
          questionData.correct_answer,
        ]),
        correctAnswer: questionData.correct_answer,
      };
    });

    startQuiz();
  } catch (err) {
    console.error("Failed to fetch questions: ", err);
  }
};

const shuffleAnswers = function (answers) {
  return answers.sort(() => Math.random() - 0.5);
};

// Start the Quiz
const startQuiz = function () {
  score = 0;
  const totalQuestion = questions.length;
  totalQuestionEl.forEach((e) => {
    e.innerText = totalQuestion;
  });
  currentQuestionIndex = 0;
  showQuestion();
};

const showQuestion = function () {
  resetOptions();
  const currentQuestion = questions[currentQuestionIndex];

  questionEl.innerText = currentQuestion.question;

  currentQuestion.answers.forEach((answer, index) => {
    optionInputLabels[index].textContent = answer;
  });

  optionInputs.forEach((optionInput, index) => {
    optionInput.onclick = () =>
      handleAnswerSelection(
        currentQuestion.answers[index],
        currentQuestion.correctAnswer
      );
  });
};

const resetOptions = function () {
  optionInputs.forEach((input) => (input.checked = false));
};

// Handle answer selection
const handleAnswerSelection = function (selectedAnswer, correctAnswer) {
  currentQuestionIndex++;
  if (selectedAnswer === correctAnswer) {
    score++;
    showQuestion();
    scoreEl.forEach((s) => {
      s.innerText = score;
    });
  }
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
};

// Finish the quiz
const finishQuiz = function () {
  gameContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
};

fetchQuestions();
