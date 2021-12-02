import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { gamesPlayPage } from './views/gamesPlay.js';
import { allGamesPage } from './views/allGames.js';
import { createPage } from './views/create.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { logout } from './requests.js';
import { navGuestTemplate, navUserTemplate } from './templates.js';


const container = document.getElementById('box');

page('/home', gamesPlayPage);
page('/allGames', allGamesPage)
page('/create', createPage);
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

selectView();
page.start();


export function selectView() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    
    if (userData) {
        render(navUserTemplate(userData), container);

        const logoutBtn = document.querySelector('#user').children[1];
        logoutBtn.addEventListener('click', logout);
    } else {
        render(navGuestTemplate(), container);
    }

    page.redirect('/home');
}