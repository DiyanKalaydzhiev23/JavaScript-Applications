import { render } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../requests.js';
import { allGamesTemplate } from '../templates.js';


export async function allGamesPage() {
    const root = document.getElementById('main-content');
    const games = await getAll();

    render(allGamesTemplate(games), root);
}