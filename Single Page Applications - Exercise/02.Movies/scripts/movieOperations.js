import { displayElement } from './app.js';
import { displayEdit } from './edit.js';
import { deleteMovie } from './delete.js';

function userData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

async function getMovies(searchedAttr, value) {
    const url = 'http://localhost:3030/data/movies';
    const response = await fetch(url);
    const data = await response.json();

    if (searchedAttr) {
        let movie;
        data.forEach(m => {
            if (m[searchedAttr] === value) {
                movie = m;
            }
        });
        return movie;
    }

    return data;
}

async function displayMovies() {
    const data = await getMovies();
    const section = document.getElementsByClassName('card-deck d-flex justify-content-center')[0];
    section.innerHTML = '';
    
    data.forEach(m => {
        let wrapper = document.createElement('div');
        wrapper.className = 'card mb-4';

        wrapper.innerHTML = `
            <img class="card-img-top" src=${m.img}
                alt="Card image cap" width="400">
            <div class="card-body">
                <h4 class="card-title">${m.title}</h4>
            </div>
            <div class="card-footer">
                <a href="#/details/6lOxMFSMkML09wux6sAF">
                    <button type="button" class="btn btn-info">Details</button>
                </a>
            </div>
        `; // won't use innerHTML in real Project *used only for training purposes*
        section.append(wrapper);
        wrapper.querySelector('button').addEventListener('click', details);
    });
}

async function details(e) {
    const movieName = e.target.parentNode.parentNode.parentNode.querySelector('.card-title').textContent;
    const section = document.getElementById('movie-example');
    const movieInfo = await getMovies('title', movieName);

    section.innerHTML = `
        <div class="container">
            <div class="row bg-light text-dark">
                <h1>Movie title: ${movieInfo.title}</h1>

                <div class="col-md-8">
                    <img class="img-thumbnail" src=${movieInfo.img}
                        alt="Movie">
                </div>
                <div class="col-md-4 text-center">
                    <h3 class="my-3 ">Movie Description</h3>
                    <p>${movieInfo.description}</p>
                </div>
            </div>
        </div>
    `;

    const div = section.querySelectorAll('div')[3];

    try {
        if (movieInfo._ownerId === userData().id) {
            const deleteBtn = document.createElement('a');
            const editBtn = document.createElement('a');
    
            deleteBtn.className = 'btn btn-danger';
            editBtn.className = 'btn btn-warning';
    
            deleteBtn.textContent = 'Delete';
            editBtn.textContent = 'Edit';

            deleteBtn.addEventListener('click', (e) => deleteMovie(e, movieInfo._id));
            editBtn.addEventListener('click', () => displayEdit(movieInfo._id));
    
            div.append(deleteBtn);
            div.append(editBtn);
        } else if (await checkIfLiked(movieInfo._id) == undefined) {
            const likeBtn = document.createElement('a');
    
            likeBtn.className = 'btn btn-primary';
            likeBtn.textContent = 'Like';
            
            likeBtn.addEventListener('click', (e) => like(e, movieInfo._id, likeBtn));
            div.append(likeBtn);
        }
    } catch (e) {}

    const likes = document.createElement('span');
    const likesCount = await getLikesForMovie(movieInfo._id)

    likes.className = 'enrolled-span';
    likes.textContent = `Liked ${likesCount}`;
    
    div.append(likes);

    if (section.style.display === 'block') {
        section.style.display = 'none';
    } else {
        displayElement('movie-example');
    }
}

async function checkIfLiked(movieId) {
    const url = 'http://localhost:3030/data/likes';
    const response = await fetch(url);
    const data = await response.json();

    for (let m of data) {
        if (m.movieId === movieId) {
            if (m.likedBy === userData().id) {
                return true;
            }
        }
    }
}

async function getLikesForMovie(movieId) {
    const url = 'http://localhost:3030/data/likes';
    const response = await fetch(url);
    const data = await response.json();
    let likes = 0;

    for (let m of data) {
        if (m.movieId === movieId) {
            likes += 1;
        }
    }

    return likes;
}

async function like(e, movieId, likeBtn) {
    const likes = await getLikesForMovie(movieId) + 1;

    const url = 'http://localhost:3030/data/likes';
    const data = {movieId, likedBy: userData().id};
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json.',
            'X-Authorization': userData().token
        },
        body: JSON.stringify(data)
    };

    await fetch(url, options);
    e.target.parentNode.querySelector('span').textContent = `Liked ${likes}`;
    likeBtn.remove();
}

async function createMovie(title, description, img) {
    const url = 'http://localhost:3030/data/movies';
    const data = {
        title,
        description,
        img
    };
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json.',
            'X-Authorization': `${userData().token}`
        },
        body: JSON.stringify(data)
    }

    await fetch(url, options);

    displayElement('home-page', true);
    displayElement('title');
    displayElement('add-movie-button');
    displayElement('movie');
}


export {displayMovies, createMovie, getMovies, userData};