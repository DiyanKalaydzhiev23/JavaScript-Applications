import { render } from '../../node_modules/lit-html/lit-html.js';
import { deleteRecord, getById, getCommentForGame } from '../requests.js';
import { detailsTemplate } from '../templates.js';

export async function detailsPage(ctx) {
    const root = document.getElementById('main-content');
    const userData = JSON.parse(sessionStorage.getItem('userData')) || {id: ''};
    const gameId = ctx.pathname.split('/')[2];
    const gameData = await getById(gameId);
    const comments = await getCommentForGame(gameId);

    render(detailsTemplate(gameData, comments, userData), root);

    document.querySelector('#delete').addEventListener('click', async (e) => {
        const confirmation = confirm('Do you really want to delete that game?');
        if (confirmation) await deleteRecord(gameId);
    });
}