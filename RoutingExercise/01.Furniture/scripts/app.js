import { page }  from './lib.js';
import {render} from './lib.js';
import { catalogPage } from './lib.js';
import { createPage } from './lib.js';
import { detailsPage } from './lib.js';
import { loginPage } from './lib.js';
import { editPage } from './lib.js';
import { registerPage } from './lib.js';


const root = document.querySelector('div.container');
const logoutBtn = document.getElementById('logoutBtn');

page(decorateContext);
page('/01.Furniture/', catalogPage);
page('/01.Furniture/details/:id', detailsPage);
page('/01.Furniture/create', createPage);
page('/01.Furniture/edit/:id', editPage);
page('/01.Furniture/login', loginPage);
page('/01.Furniture/register', registerPage);
page('/01.Furniture/my-furniture', catalogPage);

page.start();
logoutBtn.addEventListener('click', logout);

async function logout() {
    const url = 'http://localhost:3030/users/logout';

    await fetch(url);

    sessionStorage.clear()
    window.location.href = '/01.Furniture/';
}

function displayNavigation() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const userView = document.getElementById('user');
    const guestView = document.getElementById('guest'); 

    if (!userData) {
        guestView.style.display = 'inline';
        userView.style.display = 'none';
    } else {
        guestView.style.display = 'none';
        userView.style.display = 'inline';
    }
}

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.redirect = (url) => page.redirect(url);
    next();
}

displayNavigation();

export { displayNavigation };