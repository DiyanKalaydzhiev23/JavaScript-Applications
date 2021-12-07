import { render } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../requests.js';
import { catalogTemplate } from '../templates.js';


export async function catalogPage() {
    const userData = JSON.parse(sessionStorage.getItem('userData')) || {id : ''};
    const root = document.getElementById('main-content');
    const albums = await getAll();

    render(catalogTemplate(albums, userData), root);
}