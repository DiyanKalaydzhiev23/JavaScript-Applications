import { editTemplate } from '../templates.js';
import { getFurnitureById, editFurniture } from '../requests.js';

async function editPage(ctx) {
    ctx.render(editTemplate());

    const id = ctx.path.split('/')[3];
    const data = await getFurnitureById(id);
    const inputs = document.querySelectorAll('input');
    const form = document.querySelector('form');

    for (let i = 0; i < inputs.length - 1; i++) {
        let attribute = Object.keys(data[0])[i+1];
        inputs[i].value = data[0][attribute];
    }

    document.getElementById('submitBtn').addEventListener('click', () => {
        editFurniture(
            form.make.value,
            form.model.value, 
            form.year.value, 
            form.description.value, 
            form.price.value, 
            form.img.value, 
            form.material.value,
            id
        );
    });
}

export {editPage};