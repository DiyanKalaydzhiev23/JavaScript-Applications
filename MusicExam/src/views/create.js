import { render } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../requests.js';
import { createTemplate } from '../templates.js';
import { validate } from '../app.js';


export function createPage() {
    const root = document.getElementById('main-content');
    
    render(createTemplate(), root);

    document.querySelector('.add-album').addEventListener('click', (e) =>  validate(e, create));
}
