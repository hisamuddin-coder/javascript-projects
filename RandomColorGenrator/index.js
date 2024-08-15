const colors = ["green", "red", "rgba(133, 122, 200)", "#f15025"];
const btn = document.querySelector(".btn");
const color = document.querySelector(".color");

btn.addEventListener("click", function () {
  document.body.style.backgroundColor = colors[getRandomNumber()];
  color.textContent = colors[getRandomNumber()];
});

function getRandomNumber() {
  return Math.floor(Math.random() * colors.length);
}
