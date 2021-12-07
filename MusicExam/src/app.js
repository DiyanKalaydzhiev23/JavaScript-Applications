import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { homePage } from './views/home.js';
import { searchPage } from './views/search.js'
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { logout } from './requests.js';
import { navGuestTemplate, navUserTemplate } from './templates.js';


const container = document.getElementById('box');

page('/home', homePage);
page('/catalog', catalogPage)
page('/create', createPage);
page('/login', loginPage);
page('/search', searchPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

selectView();
page.start();


export function selectView() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    
    if (userData) {
        render(navUserTemplate(userData), container);

        const logoutBtn = document.querySelector('#logout');
        logoutBtn.addEventListener('click', logout);
    } else {
        render(navGuestTemplate(), container);
    }

    page.redirect('/home');
}


export async function validate(e, func, id) {
    e.preventDefault();

    const name = document.getElementById('name');
    const imgUrl = document.getElementById('imgUrl');
    const price = document.getElementById('price');
    const releaseDate = document.getElementById('releaseDate');
    const artist = document.getElementById('artist');
    const genre = document.getElementById('genre');
    const description = document.getElementById('description');
    let errorText = '';


    if (name.value === '') {
        errorText += 'Title field cannot be empty!\n';
    }
    if (price.value === '') {
        errorText += 'Price field cannot be empty!\n';
    }
    if (releaseDate.value === '') {
        errorText += 'Release date field cannot be empty!\n';
    }
    if (imgUrl.value === '') {
        errorText += 'Image URL field cannot be empty!\n';
    }
    if (artist.value === '') {
        errorText += 'Artist field cannot be empty!\n';
    }
    if (genre.value === '') {
        errorText += 'Genre field cannot be empty!\n';
    }
    if (description.value === '') {
        errorText += 'Description field cannot be empty!\n';
    }


    if (errorText) {
        alert(errorText);
        return;
    }
    
    await func({
        name: name.value,
        imgUrl: imgUrl.value,
        price: price.value,
        releaseDate: releaseDate.value,
        artist: artist.value,
        genre: genre.value,
        description: description.value,
    }, id);
}