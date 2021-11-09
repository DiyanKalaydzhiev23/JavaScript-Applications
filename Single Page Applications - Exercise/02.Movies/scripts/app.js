import {displayRegister} from "./register.js";
import { displayLogin } from "./login.js";
import { displayAddMovieForm } from "./addMovie.js";
import { displayMovies, getMovies } from "./movieOperations.js";

const addMovieForm = document.getElementById('add-movie');
const movieExample = document.getElementById('movie-example');
const editMovieForm = document.getElementById('edit-movie');

function removeDisplayAll() {
    Array.from(document.getElementsByTagName('section')).forEach(s => {
        s.style.display = 'none';
    });
}

function displayElement(id, remove) {
    if (remove) removeDisplayAll();

    if (id === 'movie') displayMovies();

    const element = document.getElementById(id);
    element.style.display = 'block';
}

function addEvents() {
    const navigation = document.getElementsByClassName('nav-link');
    const addMovieBtn = document.getElementById('add-movie-button');

    navigation[2].addEventListener('click', displayLogin);
    navigation[3].addEventListener('click', displayRegister);
    addMovieBtn.addEventListener('click', displayAddMovieForm);
}

function createError(message, parent) {
    const oldError = parent.querySelector('#error');
    if (oldError) oldError.remove();

    const error = document.createElement('div');

    error.textContent = message;
    error.style.color = 'red';
    error.id = 'error';

    parent.append(error);
}

displayElement('home-page', true);
displayElement('movie');
addEvents();

export {displayElement, createError};