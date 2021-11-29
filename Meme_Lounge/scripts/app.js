import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { allMemePage } from './views/allMemesPage.js';
import { createPage } from './views/create.js';
import { homePage } from './views/homePage.js';
import { loginPage } from './views/login.js';
import { myProfilePage } from './views/myProfile.js';
import { registerPage } from './views/register.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/editPage.js';
import { navGuestTemplate, navUserTemplate} from './templates.js';
import { logout } from './request.js';

const container = document.getElementById('container');

page('/', homePage);
page('/allMemes', allMemePage);
page('/create', createPage);
page('/login', loginPage);
page('/myProfile', myProfilePage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

selectView();
page.start();

export function selectView() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    
    if (userData) {
        render(navUserTemplate(userData), container);
        page.redirect('/allMemes');

        const logoutBtn = document.querySelector('.profile').children[2];
        logoutBtn.addEventListener('click', logout);
    } else {
        console.log()
        render(navGuestTemplate(), container);
    }
}