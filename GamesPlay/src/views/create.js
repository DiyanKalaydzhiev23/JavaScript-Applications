import { render } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../requests.js';
import { createTemplate } from '../templates.js';


export function createPage() {
    const root = document.getElementById('main-content');
    
    render(createTemplate(), root);

    document.querySelector('.submit').addEventListener('click', validate);
}

async function validate(e) {
    e.preventDefault();

    const form = document.getElementById('create');
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
    
    await create({
        title: form.title.value,
        category: form.category.value,
        maxLevel: form.maxLevel.value,
        imageUrl: form.imageUrl.value,
        summary: form.summary.value
    });
}