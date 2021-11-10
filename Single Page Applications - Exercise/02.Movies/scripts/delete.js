import {userData} from "./movieOperations.js";
import {displayElement} from "./app.js";

async function deleteMovie(e, movieId) {
    const url = `http://localhost:3030/data/movies/${movieId}`;
    const options = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json.',
            'X-Authorization': userData().token
        },
        body: ''
    };

    await fetch(url, options);
    
    e.target.parentNode.parentNode.parentNode.remove();
    
    displayElement('movie');
}

export {deleteMovie};