import { welcomeTemplate } from '../templates.js';
import { render } from '../../node_modules/lit-html/lit-html.js';

export function homePage() {
    const root = document.querySelector('main');
    render(welcomeTemplate(), root);
}