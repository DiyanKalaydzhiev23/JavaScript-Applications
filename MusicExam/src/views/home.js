import { render } from '../../node_modules/lit-html/lit-html.js';
import { homeTemplate } from '../templates.js';


export async function homePage() {
    const root = document.getElementById('main-content');

    render(homeTemplate(), root);
}