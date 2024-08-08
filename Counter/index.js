let count = 0;
const value = document.querySelector(".value");
const btns = document.querySelectorAll(".btn");

function updateCount(e) {
  if (e === "increase") {
    count++;
  } else if (e === "decrease") {
    count--;
  } else {
    count = 0;
  }
  value.style.color = count > 0 ? "green" : count < 0 ? "red" : "#222";
  value.textContent = count;
}

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    target = e.currentTarget.innerHTML;
    updateCount(target);
  });

  btn.style.backgroundColor = btn.classList.contains("increase")
    ? "green"
    : btn.classList.contains("decrease")
    ? "red"
    : "";
});

document.addEventListener("keydown", (e) => {
  const action =
    e.key === "ArrowRight"
      ? "increase"
      : e.key === "ArrowLeft"
      ? "decrease"
      : null;

  if (action) {
    updateCount(action);
  }
});
