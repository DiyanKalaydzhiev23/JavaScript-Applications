import { render } from '../../node_modules/lit-html/lit-html.js';
import { getById, update } from '../requests.js';
import { editTemplate } from '../templates.js';

export async function editPage(ctx) {
    const root = document.getElementById('main-content');
    const gameId = ctx.pathname.split('/')[2];
    const data = await getById(gameId);

    render(editTemplate(data), root);

    document.querySelector('.submit').addEventListener('click', (e) =>  validate(e, gameId));
}

async function validate(e, gameId) {
    e.preventDefault();

    const form = document.getElementById('edit');
    let errorText = '';


    if (form.title.value === '') {
        errorText += 'Title cannot be empty!\n';
    }
    if (form.category.value === '') {
        errorText += 'Category cannot be empty!\n';
    }
    if (form.maxLevel.value === '') {
        errorText += 'Levels cannot be empty!\n';
    }
    if (form.imageUrl.value === '') {
        errorText += 'Image URL cannot be empty!\n';
    }
    if (form.summary.value === '') {
        errorText += 'Summary cannot be empty!\n';
    }

    if (errorText) {
        alert(errorText);
        return;
    }
    
    await update
    (gameId, {
        title: form.title.value,
        category: form.category.value,
        maxLevel: form.maxLevel.value,
        imageUrl: form.imageUrl.value,
        summary: form.summary.value
    });
}