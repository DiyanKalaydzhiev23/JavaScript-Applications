import { render } from 'https://unpkg.com/lit-html?module';
import { addFormTemplate, editFormTemplate } from "./templates.js";
import { loadTable } from "./queries.js";
import { appendForms } from "./dom.js";

const root = document.getElementsByTagName('body')[0];

async function renderAll() {
    render(await loadTable(), root);
    
    const [addForm, editForm] = appendForms(root);
    
    render(addFormTemplate(), addForm);
    render(editFormTemplate(), editForm);
}

document.getElementById('loadBooks', async () => render(await loadTable(), root));
renderAll();

export {renderAll, root};