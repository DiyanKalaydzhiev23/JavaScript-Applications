import {html, render} from 'https://unpkg.com/lit-html?module';

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
const root = document.getElementById('menu');
const submitBtn = document.getElementById('addBtn');

const optionsTemplate = (options) => html`
    ${options.map(o => html`<option>${o.text}</option>`)}
`;

async function renderOptions(root) {
    const response = await fetch(url);
    const data = await response.json();
    const result = optionsTemplate(Object.values(data));

    render(result, root);
}

async function addItem() {
    const text = document.getElementById('itemText').value;
    const data = {text};
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json.'},
        body: JSON.stringify(data)
    }

    await fetch(url, options);

    renderOptions(root);
}

submitBtn.addEventListener('click', addItem);
renderOptions(root);