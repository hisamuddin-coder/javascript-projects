"use strict";
// Selectors
const startStopBtn = document.querySelector(".startStop");
const resetLapBtn = document.querySelector(".resetLap");
const minUnit = document.querySelector(".minUnit");
const secUnit = document.querySelector(".secUnit");
const msUnit = document.querySelector(".msUnit");
const laps = document.querySelector(".stopwatch__laps");

let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let timeInterval;
let lapCount = 0;

// functions
function handleTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timeInterval);

    // startStop Button
    startStopBtn.textContent = "start";
    startStopBtn.style.backgroundColor = "green";

    // resetLap Button
    resetLapBtn.textContent = "reset";
    resetLapBtn.style.backgroundColor = "orange";
  } else {
    isRunning = true;
    // startStop Button
    startStopBtn.textContent = "stop";
    startStopBtn.style.backgroundColor = "orange";

    // resetLap Button
    resetLapBtn.disabled = false;
    resetLapBtn.textContent = "Lap";
    resetLapBtn.style.backgroundColor = "blue";

    // timer
    startTime = Date.now() - elapsedTime;
    timeInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      handleDisplayTime(elapsedTime);
    }, 10);
  }
}
function handleResetLap() {
  if (resetLapBtn.textContent === "reset") {
    clearInterval(timeInterval);
    isRunning = false;
    elapsedTime = 0;
    handleDisplayTime(elapsedTime);
    lapCount = 0;
    while (laps.firstChild) {
      laps.removeChild(laps.firstChild);
    }
  } else {
    lapCount++;
    const lapTime = `${lapCount} => ${minUnit.textContent} : ${secUnit.textContent} : ${msUnit.textContent}`;
    const lapDiv = document.createElement("div");
    lapDiv.textContent = lapTime;
    laps.appendChild(lapDiv);
  }
}
function handleDisplayTime(t) {
  const min = Math.floor((t % (60 * 60 * 1000)) / (1000 * 60));
  const sec = Math.floor((t % (60 * 1000)) / 1000);
  const ms = Math.floor((t % 1000) / 10);
  // Add 0 before num
  const minutes = min > 9 ? min : "0" + min;
  const seconds = sec > 9 ? sec : "0" + sec;
  const milliSeconds = ms > 9 ? ms : "0" + ms;

  minUnit.textContent = minutes;
  secUnit.textContent = seconds;
  msUnit.textContent = milliSeconds;
}
// handler
startStopBtn.addEventListener("click", handleTimer);
resetLapBtn.addEventListener("click", handleResetLap);
