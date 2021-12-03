import { render } from '../../node_modules/lit-html/lit-html.js';
import { createComment, deleteRecord, getById, getCommentForGame } from '../requests.js';
import { detailsTemplate } from '../templates.js';


export async function detailsPage(ctx) {
    const root = document.getElementById('main-content');
    const userData = JSON.parse(sessionStorage.getItem('userData')) || {id: ''};
    const gameId = ctx.pathname.split('/')[2];
    const gameData = await getById(gameId);
    const comments = await getCommentForGame(gameId);

    render(detailsTemplate(gameData, comments, userData), root);

    const deleteBtn = document.querySelector('#delete');
    const addCommentBtn = document.querySelector('.submit');
    
    if (deleteBtn) deleteBtn.addEventListener('click', deleteGame);
    if (addCommentBtn) addCommentBtn.addEventListener('click', (e) => addComment(e, gameId));

    async function deleteGame() {
        const confirmation = confirm('Do you really want to delete that game?');
        if (confirmation) await deleteRecord(gameId);
    }
}

async function addComment(e, gameId) {
    e.preventDefault();

    const text = document.querySelector('textarea');
    if (text.value !== '') {
        await createComment({gameId, comment: text.value});
    } 
    text.value = '';
}