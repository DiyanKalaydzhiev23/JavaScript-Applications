import { render } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../requests.js';
import { homeTemplate } from '../templates.js';

export async function gamesPlayPage() {
    const root = document.getElementById('main-content');
    const games = await getAll();

    render(homeTemplate(games), root);
}