import { editTemplate } from "../templates.js";
import { render } from '../../node_modules/lit-html/lit-html.js';
import { getMemeById, updateMeme } from "../request.js";
import { notify } from "../notify.js";

export async function editPage(ctx) {
    const root = document.querySelector('main');
    const id = ctx.pathname.split('/')[2];
    const data = await getMemeById(id);

    render(editTemplate(data), root);

    document.querySelector('.registerbtn').addEventListener('click', (e) => validate(e, id));
}

async function validate(e, id) {
    e.preventDefault();

    const form = document.querySelector('form');
    let errorText = '';

    if (form.title.value === '') {
        errorText += 'Title cannot be empty!\n';
    }
    if (form.description.value === '') {
        errorText += 'Description cannot be empty!\n';
    }
    if (form.imageUrl.value === '') {
        errorText += 'Image URL cannot be empty!';
    }

    if (errorText.length > 0) {
        notify(errorText);
        return;
    }

    await updateMeme(
        id,
        form.title.value,
        form.description.value,
        form.imageUrl.value
    );
}