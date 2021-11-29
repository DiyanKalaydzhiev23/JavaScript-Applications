import { detailsTemplate } from "../templates.js";
import { render } from '../../node_modules/lit-html/lit-html.js';
import { getMemeById, deleteMeme } from "../request.js";

export async function detailsPage(ctx) {
    const root = document.querySelector('main');
    const userId = JSON.parse(sessionStorage.getItem('userData')) || {id: ''};
    const id = ctx.pathname.split('/')[2];
    const data = await getMemeById(id);

    render(detailsTemplate(data, userId.id === data._ownerId), root);

    document.querySelector('.danger').addEventListener('click', () => {
        const doIt = confirm('Do you really want to delete the meme?');

        if (doIt) deleteMeme(id);
    });
}