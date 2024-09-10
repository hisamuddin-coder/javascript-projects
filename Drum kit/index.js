"use strict";
const buttons = document.querySelectorAll("button");

// Add click buttons
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    let buttonInnerHTML = this.getAttribute("data-sound");
    makeSound(buttonInnerHTML);
  });
}

// Add click document
document.addEventListener("keydown", (event) => {
  const keyPressed = event.key.toLowerCase();

  if (/^[a-z]$/.test(keyPressed)) {
    const button = document.querySelector(`.drum.${keyPressed}`);

    if (button) {
      const sound = button.getAttribute("data-sound");
      let storedSound = sound;
      makeSound(storedSound);
    }
  }
});

function makeSound(soundName) {
  if (soundName) {
    let audio = new Audio(`sounds/${soundName}.mp3`);
    audio.play();
  }
}
