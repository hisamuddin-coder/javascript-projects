const items = document.querySelectorAll(".item-counter");

function countdown() {
  const now = new Date().getTime();
  const endDate = new Date("2025-08-08T19:50:59").getTime();
  const timeLeft = endDate - now;

  // calculation
  const oneDay = 24 * 60 * 60 * 1000; // ms in one day
  const oneHour = 60 * 60 * 1000; // ms in one hour
  const oneMinute = 60 * 1000; // ms in one minute
  const oneSecond = 1000; // ms

  let days = Math.floor(timeLeft / oneDay);
  let hours = Math.floor((timeLeft % oneDay) / oneHour);
  let minutes = Math.floor((timeLeft % oneHour) / oneMinute);
  let seconds = Math.floor((timeLeft % oneMinute) / oneSecond);

  const values = [days, hours, minutes, seconds];
  // format

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }
  items.forEach((e, i) => {
    e.innerHTML = format(values[i]);
  });
  if (timeLeft < 0) {
    clearInterval(countdownTimer);
    items.forEach((e, i) => {
      e.innerHTML = format((values[i] = 0));
    });
  }
}
let countdownTimer = setInterval(countdown, 1000);
countdown();
