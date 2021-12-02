import { addBookTemplate } from "../templates.js";
import { render } from '../../node_modules/lit-html/lit-html.js';
import { create } from "../requests.js";


export function createPage() {
    const root = document.getElementById('site-content');

    render(addBookTemplate(), root);

    document.querySelector('.submit').addEventListener('click', validate);
}

async function validate(e) {
    e.preventDefault();

    const form = document.getElementById('create-form');
    let errorText = '';


    if (form.title.value === '') {
        errorText += 'Title cannot be empty!\n';
    }
    if (form.description.value === '') {
        errorText += 'Description cannot be empty!\n';
    }
    if (form.imageUrl.value === '') {
        errorText += 'Image URL cannot be empty!\n';
    }

    if (errorText) {
        alert(errorText);
        return;
    }
    
    await create({
        title: form.title.value,
        description: form.description.value,
        imageUrl: form.imageUrl.value,
        type: form.type.value
    });
}