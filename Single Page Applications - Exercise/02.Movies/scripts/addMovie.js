import { displayElement, createError } from './app.js';
import { createMovie } from './movieOperations.js';

const addForm = document.getElementById('add-movie').children[0];

function displayAddMovieForm() {
    const submitBtn = addForm.querySelector('button');
    submitBtn.addEventListener('click', validate);

    displayElement('add-movie', true);
}

function validate(e) {
    e.preventDefault();

    if (addForm.title.value === '') {
        createError('Title cannot be empty!', addForm);
        return;
    }

    if (addForm.description.value === '') {
        createError('Description cannot be empty!', addForm);
        return;
    }

    if (addForm.imageUrl.value === '') {
        createError('Image URL cannot be empty!', addForm);
        return;
    }

    const oldError = addForm.querySelector('#error');
    if (oldError) oldError.remove();

    createMovie(addForm.title.value, addForm.description.value, addForm.imageUrl.value);
}

export { displayAddMovieForm };