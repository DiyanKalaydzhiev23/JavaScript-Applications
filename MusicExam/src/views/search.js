import { render } from '../../node_modules/lit-html/lit-html.js';
import { searchTemplate } from '../templates.js';
import { getByName } from '../requests.js'


export async function searchPage() {
    const userData = JSON.parse(sessionStorage.getItem('userData')) || {id: ''};
    const root = document.getElementById('main-content');

    render(searchTemplate([], false, userData), root);

    document.querySelector('button').addEventListener('click', async () => {
        const searched = document.getElementById('search-input');
        if (searched.value === '') {
            alert('You cannot search empty field!');
            return;
        }

        const albums = await getByName(searched.value);

        render(searchTemplate(albums, true, userData), root);
    });
}