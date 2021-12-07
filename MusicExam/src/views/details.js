import { render } from '../../node_modules/lit-html/lit-html.js';
import { deleteRecord, getById } from '../requests.js';
import { detailsTemplate } from '../templates.js';


export async function detailsPage(ctx) {
    const root = document.getElementById('main-content');
    const userData = JSON.parse(sessionStorage.getItem('userData')) || {id: ''};
    const albumId = ctx.pathname.split('/')[2];
    const albumData = await getById(albumId);

    render(detailsTemplate(albumData, userData), root);

    const deleteBtn = document.querySelector('.remove');
    if (deleteBtn) deleteBtn.addEventListener('click', deleteGame);

    async function deleteGame() {
        const confirmation = confirm('Do you really want to delete that game?');
        if (confirmation) await deleteRecord(albumId);
    }
}
