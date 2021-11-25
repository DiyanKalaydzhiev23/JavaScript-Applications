import page from '../../node_modules/page/page.mjs';
import {html, render} from 'https://unpkg.com/lit-html?module';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { loginPage } from './views/login.js';
import { editPage } from './views/edit.js';
import { registerPage } from './views/register.js';


export {
    page,
    html,
    render,
    catalogPage,
    editPage,
    createPage,
    detailsPage,
    loginPage,
    registerPage
};
