const screen = document.getElementById("screen");
const buttons = document.querySelectorAll("button");
let screenValue = "";

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btnValue = e.target.innerText;

    if (btnValue === "CE") {
      screenValue = "";
    } else if (btnValue === "C") {
      screenValue = screenValue.slice(0, -1);
    } else if (btnValue === "=") {
      try {
        screenValue = eval(screenValue).toString();
      } catch (error) {
        screenValue = "Error";
        console.error("Invalid expression:", error);
      }
    } else if (["*", "/", "+", "-"].includes(btnValue)) {
      if (!["*", "/", "+", "-"].includes(screenValue.slice(-1))) {
        screenValue += btnValue;
      }
    } else {
      screenValue += btnValue;
    }

    screen.value = screenValue;
  });
});
