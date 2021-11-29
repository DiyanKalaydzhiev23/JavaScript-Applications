import { createTemplate } from '../templates.js';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { createMeme } from '../request.js';
import { notify } from '../notify.js';


export function createPage() {
    const root = document.querySelector('main');

    render(createTemplate(), root);

    document.querySelector('.registerbtn').addEventListener('click', validate);
}

async function validate(e) {
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

    if (errorText) {
        notify(errorText);
        return;
    }

    await createMeme(form.title.value, form.description.value, form.imageUrl.value);
}