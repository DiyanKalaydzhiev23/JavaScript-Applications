import { displayElement } from "./app.js";
import { userData, displayMovies} from "./movieOperations.js";

function displayEdit(movieId) {
    const section = document.getElementById('edit-movie');
    displayElement('edit-movie', true);
    section.querySelector('button').addEventListener('click', (e) => updateMovie(e, movieId, section.children[0]));
}

async function updateMovie(e, movieId, editForm) {
    e.preventDefault();

    const url = `http://localhost:3030/data/movies/${movieId}`;
    const data = {
        title: editForm.title.value,
        description: editForm.description.value,
        img: editForm.imageUrl.value
    };
    const options = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json.',
            'X-Authorization': userData().token
        },
        body: JSON.stringify(data)
    }

    await fetch(url, options);

    displayElement('home-page', true);
    displayElement('title');
    displayElement('movie');
}

export {displayEdit};