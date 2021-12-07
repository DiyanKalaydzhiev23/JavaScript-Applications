import { render } from '../../node_modules/lit-html/lit-html.js';
import { getById, update } from '../requests.js';
import { editTemplate } from '../templates.js';
import { validate } from '../app.js';


export async function editPage(ctx) {
    const root = document.getElementById('main-content');
    const albumId = ctx.pathname.split('/')[2];
    const data = await getById(albumId);

    render(editTemplate(data), root);

    document.querySelector('.edit-album').addEventListener('click', (e) =>  validate(e, update, albumId));
}
