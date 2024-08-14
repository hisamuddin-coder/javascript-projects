"use strict";
const btnFormOpen = document.querySelector(".form__open");
const btnFormClose = document.querySelector(".close__form");
const addTodoFormContinaer = document.querySelector(".add__todo-form");
const todoForm = document.querySelector(".todo__form");

btnFormOpen.addEventListener("click", () => {
  addTodoFormContinaer.style.display = "block";
});
btnFormClose.addEventListener("click", () => {
  addTodoFormContinaer.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  displayStoredTodos();
});

function displayStoredTodos() {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  storedTodos.forEach((todo) => handleDisplayTodoItmes(todo));
}

function saveToLocalStorage(todo) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Display Items
function handleDisplayTodoItmes(data) {
  const todoItems = document.querySelector(".todo__items");
  const listHtml = `
    <li class="todo__item ${data.priority}">
        <!--todo-header-->
        <div class="todo__header flex__center">
          <h2 class="todo__title">${data.title}</h2>
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
        <span class="date">${data.date}</span>
        <span class="time">${data.time}</span>
        <p class="desc">
          ${data.description}
        </p>
    </li>
  `;
  todoItems.insertAdjacentHTML("beforeend", listHtml);
}

// Get data using form
function hendleform(e) {
  e.preventDefault();
  const formData = {
    title: document.querySelector(".title__input").value,
    description: document.querySelector(".description__input").value,
    date: document.querySelector(".date__input").value,
    time: document.querySelector(".time__input").value,
    priority: document.querySelector(".priority__input").value,
  };
  console.log(formData);

  saveToLocalStorage(formData);
  handleDisplayTodoItmes(formData);
  addTodoFormContinaer.style.display = "none";
  e.target.reset();
}

todoForm.addEventListener("submit", hendleform);
