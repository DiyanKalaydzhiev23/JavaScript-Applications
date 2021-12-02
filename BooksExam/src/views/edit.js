import { editTemplate } from "../templates.js";
import { render } from '../../node_modules/lit-html/lit-html.js';
import { getById, update} from "../requests.js";


export async function editPage(ctx) {
    const root = document.getElementById('site-content');
    const id = ctx.pathname.split('/')[2];
    const data = await getById(id);

    render(editTemplate(data), root);

    document.querySelector('.submit').addEventListener('click', (e) => validate(e, id));
}

async function validate(e, id) {
    e.preventDefault();

    const form = document.getElementById('edit-form');
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
    
    await update(id, {
        title: form.title.value,
        description: form.description.value,
        imageUrl: form.imageUrl.value,
        type: form.type.value
    });
}