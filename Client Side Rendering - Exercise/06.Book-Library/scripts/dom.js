import { editFormTemplate } from './templates.js'; 
import { render } from 'https://unpkg.com/lit-html?module';

function displayEditForm(e) {
    const addForm = document.getElementById('add-form');
    const editForm = document.getElementById('edit-form');

    const title = e.target.parentNode.parentNode.children[0].textContent;
    const author = e.target.parentNode.parentNode.children[1].textContent;
    const id = e.target.parentNode.parentNode.attributes.data_id.value;
    console.log(id);

    addForm.style.display = 'none';
    editForm.style.display = 'block';

    render(editFormTemplate({title, author, id}), editForm);
}

function appendForms(root) {
    const addForm = document.createElement('form');
    const editForm = document.createElement('form');

    addForm.id = 'add-form';
    editForm.id = 'edit-form';

    editForm.style.display = 'none';

    root.append(addForm);
    root.append(editForm);

    return [addForm, editForm];
}

export {displayEditForm, appendForms};
