"use strict";

const formEl = document.querySelector(".add__notes-form");
const titleInputEl = document.querySelector(".title__input");
const dateInputEl = document.querySelector(".date__input");
const descInputEl = document.querySelector(".desc__input");
const notesContainer = document.querySelector(".notes__container");
const closeFormBtn = document.querySelector(".close__form");
const openFormBtn = document.querySelector(".add__notes-btn");
const overlay = document.getElementById("overlay");

class App {
  #notes = [];
  #editIndex = null;

  constructor() {
    formEl.addEventListener("submit", this._newNotes.bind(this));
    openFormBtn.addEventListener("click", this._showForm.bind(this));
    closeFormBtn.addEventListener("click", this._hideForm.bind(this));

    // Render notes from local
    this._getLocalStorage();

    // Event delegation for delete and edit buttons
    notesContainer.addEventListener(
      "click",
      this._handleNoteActions.bind(this)
    );
  }

  _showForm() {
    formEl.classList.add("show");
    overlay.classList.add("show");
  }

  _hideForm() {
    titleInputEl.value = descInputEl.value = dateInputEl.value = "";
    formEl.classList.remove("show");
    overlay.classList.remove("show");
    this.#editIndex = null;
  }

  _newNotes(e) {
    e.preventDefault();
    const noteTitle = titleInputEl.value;
    const noteDesc = descInputEl.value;
    const noteDate = dateInputEl.value;

    if (!noteTitle && !noteDesc) return;

    const notes = { title: noteTitle, description: noteDesc, date: noteDate };

    if (this.#editIndex !== null) {
      this.#notes[this.#editIndex] = notes;
      this.#editIndex = null;
    } else {
      this.#notes.push(notes);
    }

    // Re-render all notes to reflect changes
    this._renderAllNotes();

    // Hide form + clear fields
    this._hideForm();

    // Save notes to local storage
    this._setLocalStorage();
  }

  _renderNotes(note, index) {
    const html = `
      <li class="notes__item" data-index="${index}">
        <div class="notes__header row">
          <h3 class="notes__title">${note.title}</h3>
          <div class="actions">
            <button class="fa-solid fa-trash-can action__btn action-btn-delete"></button>
            <button class="fa-regular fa-pen-to-square action__btn action-btn-edit"></button>
          </div>
        </div>
        <p class="notes__desc">${note.description}</p>
        <p class="notes__date">${note.date}</p>
      </li>`;
    notesContainer.insertAdjacentHTML("beforeend", html);
  }

  _renderAllNotes() {
    notesContainer.innerHTML = "";

    this.#notes.forEach((note, index) => {
      this._renderNotes(note, index);
    });
  }

  _setLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(this.#notes));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("notes"));

    if (!data) return;

    this.#notes = data;

    this._renderAllNotes();
  }

  _handleNoteActions(e) {
    const target = e.target;
    const noteEl = target.closest(".notes__item");

    if (!noteEl) return;

    const noteIndex = noteEl.dataset.index;

    if (target.classList.contains("action-btn-delete")) {
      this._deleteNote(noteIndex);
    } else if (target.classList.contains("action-btn-edit")) {
      this._editNote(noteIndex);
    }
  }

  _deleteNote(index) {
    const confirmDelete = confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;
    this.#notes.splice(index, 1);

    this._renderAllNotes();

    this._setLocalStorage();
  }

  _editNote(index) {
    const note = this.#notes[index];
    titleInputEl.value = note.title;
    descInputEl.value = note.description;
    dateInputEl.value = note.date;

    this._showForm();

    this.#editIndex = index;
  }
}

const app = new App();
