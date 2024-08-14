"use strict";

const formOpenBtn = document.querySelector(".todo__btn");
const formCloseBtn = document.querySelector(".close__form");
const todos = document.querySelector(".todo__container");

// Display Todo Form
formOpenBtn.addEventListener("click", () => {
  todos.classList.add("display");
  formOpenBtn.style.display = "none";
});
formCloseBtn.addEventListener("click", () => {
  todos.classList.remove("display");
  formOpenBtn.style.display = "block";
});

// Render data
function renderTodoItem(data) {
  const todoItmes = document.querySelector(".todo__itmes");
  const html = `
  <li class="todo__item ${data.priority}">
    <div class="todo__header flex__center">
      <h2 class="title">${data.title}</h2>
      <div class="todo__icons flex__center">
        <button
          class="fa-solid fa-check todo__icon todo__icon-complete"
        ></button>
        <button
          class="fa-regular fa-trash-can todo__icon todo__icon-delete"
        ></button>
        <button
          class="fa-solid fa-pen todo__icon todo__icon-edit"
        ></button>
      </div>
    </div>
    <p class="desc">
      ${data.description}
    </p>
  </li>
  `;
  todoItmes.insertAdjacentHTML("beforeend", html);
}

// Get Data
const todoForm = document.querySelector(".todo__form");
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    title: document.querySelector(".title__input").value,
    description: document.querySelector(".description__input").value,
    date: document.querySelector(".date__input").value,
    time: document.querySelector(".time__input").value,
    priority: document.querySelector(".priority__input").value,
  };
  console.log(formData);

  renderTodoItem(formData);
  e.target.reset();
  todos.classList.remove("display");
  formOpenBtn.style.display = "block";
});
