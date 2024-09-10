const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");
const sessionEl = document.getElementById("session");
const elements = document.querySelectorAll(".element");

function updateClock() {
  let date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let session = "AM";
  // format time
  if (hours > 12) {
    hours = hours - 12;
  }
  if (hours > 12) {
    session = "PM";
  }

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let values = [hours, minutes, seconds, session];

  elements.forEach((el, i) => {
    el.innerHTML = values[i];
    setInterval(() => {
      updateClock();
    }, 1000);
  });
}
updateClock();
