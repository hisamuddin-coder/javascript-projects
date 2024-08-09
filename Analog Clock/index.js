"use strict";
const hour = document.getElementById("hour");
const minutes = document.getElementById("min");
const seconds = document.getElementById("sec");

function updateClock() {
  const now = new Date();

  const hr = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  const ms = now.getMilliseconds();
  // rotate

  let hrRotate = 30 * hr + (1 / 2) * min + (1 / 120) * sec;
  let minRotate = 6 * min + (1 / 10) * sec;
  let secRotate = 6 * sec + (9 / 25) * ms;

  hour.style.transform = `rotate(${hrRotate}deg)`;
  minutes.style.transform = `rotate(${minRotate}deg)`;
  seconds.style.transform = `rotate(${secRotate}deg)`;
}
updateClock();
setInterval(updateClock, 1000);
